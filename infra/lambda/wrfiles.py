"""Key derivation and metadata rules for the file store.

Shared by every component that has to turn a filename into a published key:
the publish script an engineer runs, the promote Lambda that acts on an
approved inbox object, and the tests for both. ADR 0001 D4 defines the key
shape; this module is its only implementation, so the two upload routes
cannot drift apart.

Deliberately dependency-free (stdlib only) so the Lambda zip needs no build
step and the publish script runs on a bare interpreter.
"""

from __future__ import annotations

import hashlib
import posixpath
import re

# The six Docusaurus plugin instances. A key's first segment must be one of
# these: it is structural, unlike the taxonomy below it (ADR 0001 D4).
SECTIONS = ("robot", "solution", "peripheral", "system", "tutorial", "support")

UPLOAD_DIR = "_upload"

# Extensions we are willing to publish. Anything else is held and reported
# rather than guessed at — an unknown type is usually a mistake, and the
# store serves executable payloads where guessing is not acceptable.
CONTENT_TYPES = {
    ".pdf": "application/pdf",
    ".zip": "application/zip",
    ".gz": "application/gzip",
    ".tgz": "application/gzip",
    ".xz": "application/x-xz",
    ".bin": "application/octet-stream",
    ".hex": "application/octet-stream",
    ".csv": "text/csv; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".json": "application/json",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
}

# A published key is immutable (D4), so it can be cached indefinitely. The
# index is the one mutable object in the bucket and must not be.
IMMUTABLE_CACHE = "public, max-age=31536000, immutable"
INDEX_CACHE = "public, max-age=60, must-revalidate"
INDEX_KEY = "index.json"

_SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
_VERSION = re.compile(r"^v(\d+(?:\.\d+)*)$")


class NameError_(ValueError):
    """A filename that does not parse. Reported, never guessed at."""


def _slug(value: str, field: str) -> str:
    if not _SLUG.match(value):
        raise NameError_(
            f"{field} must be lowercase alphanumeric with single hyphens, got {value!r}"
        )
    return value


def split_ext(name: str) -> tuple[str, str]:
    """Split off the extension, treating `.tar.gz` as one."""
    lower = name.lower()
    if lower.endswith(".tar.gz"):
        return name[: -len(".tar.gz")], ".gz"
    dot = name.rfind(".")
    if dot <= 0:
        raise NameError_(f"{name!r} has no extension")
    return name[:dot], name[dot:].lower()


def content_type_for(ext: str) -> str:
    try:
        return CONTENT_TYPES[ext.lower()]
    except KeyError:
        raise NameError_(
            f"extension {ext!r} is not in the publishable set; add it to "
            "CONTENT_TYPES deliberately rather than letting it default"
        ) from None


def parse_flat_name(name: str) -> dict:
    """Parse the flat-inbox notation.

    `robot__wr65__user-manual__en__v2.3.pdf` — the same segments an engineer
    spells as directories, for a drop zone that has no path to carry them.
    """
    stem, ext = split_ext(name)
    parts = stem.split("__")
    if len(parts) != 5:
        raise NameError_(
            f"expected section__product__kind__lang__vVERSION{ext}, got {name!r}"
        )
    section, product, kind, lang, version = parts
    if section not in SECTIONS:
        raise NameError_(f"section must be one of {SECTIONS}, got {section!r}")
    m = _VERSION.match(version)
    if not m:
        raise NameError_(f"version must look like v2.3, got {version!r}")
    return {
        "section": section,
        "product": _slug(product, "product"),
        "kind": _slug(kind, "kind"),
        "lang": _slug(lang, "lang"),
        "version": m.group(1),
        "ext": ext,
    }


def key_from_flat_name(name: str) -> str:
    """`robot__wr65__user-manual__en__v2.3.pdf` -> `robot/wr65/wr65-user-manual-en-v2.3.pdf`."""
    f = parse_flat_name(name)
    filename = f"{f['product']}-{f['kind']}-{f['lang']}-v{f['version']}{f['ext']}"
    return f"{f['section']}/{f['product']}/{filename}"


def key_from_upload_path(path: str) -> str:
    """Derive the published key from a path under an `_upload/` directory.

    The local tree is a literal preview of the bucket, so the key is just the
    path with the `_upload/` root removed. Enforcing the shape here is what
    makes the directory structure load-bearing rather than advisory — nothing
    else can, because `_upload/` is gitignored and CI never sees it.
    """
    parts = [p for p in path.replace("\\", "/").split("/") if p and p != "."]
    if UPLOAD_DIR not in parts:
        raise NameError_(f"{path!r} is not under a {UPLOAD_DIR}/ directory")
    rel = parts[parts.index(UPLOAD_DIR) + 1 :]
    if len(rel) != 3:
        raise NameError_(
            f"expected {UPLOAD_DIR}/<section>/<product>/<file>, got "
            f"{UPLOAD_DIR}/{'/'.join(rel)}"
        )
    section, product, filename = rel
    if section not in SECTIONS:
        raise NameError_(f"section must be one of {SECTIONS}, got {section!r}")
    _slug(product, "product")
    stem, ext = split_ext(filename)
    content_type_for(ext)
    if not stem.startswith(f"{product}-"):
        raise NameError_(
            f"{filename!r} should start with the product slug {product!r} so a "
            "filename stays meaningful once detached from its directory"
        )
    return posixpath.join(section, product, filename)


def metadata_for(key: str) -> dict:
    """The object metadata a published key implies.

    Kept derivable from the key alone so that re-deriving it later — during a
    re-index, or a migration to another store — cannot disagree with what was
    set at promotion time.
    """
    section, product, filename = key.split("/")
    stem, _ext = split_ext(filename)
    rest = stem[len(product) + 1 :]
    lang = version = ""
    m = re.search(r"-([a-z]{2}(?:-[a-z]+)?)-v(\d+(?:\.\d+)*)$", rest)
    if m:
        lang, version = m.group(1), m.group(2)
        rest = rest[: m.start()]
    return {
        "section": section,
        "product": product,
        "kind": rest,
        "lang": lang,
        "version": version,
    }


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: str, chunk: int = 1 << 20) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for block in iter(lambda: fh.read(chunk), b""):
            h.update(block)
    return h.hexdigest()


def key_from_inbox_key(inbox_key: str) -> str:
    """Derive the published key from wherever an object landed in the inbox.

    The inbox accepts both notations because it has two front doors. A script
    uploading from the repository already knows the destination and writes the
    path form; a technician dragging one file onto the S3 console has no path
    to work with and uses the flat `__` form. Both resolve here, so the two
    routes cannot produce different keys for the same document.

    Note what this deliberately is *not*: an earlier draft keyed inbox objects
    by content hash, which made overwrites impossible by construction. That
    cannot work for the console route — a person dragging a file cannot
    compute a digest — so overwrite safety comes from versioning on the inbox
    bucket instead, and the digest is computed at promotion.
    """
    rel = inbox_key.split("/", 1)[1] if inbox_key.startswith("inbox/") else inbox_key
    if "/" in rel:
        return key_from_upload_path(f"{UPLOAD_DIR}/{rel}")
    return key_from_flat_name(rel)


def index_entry(key: str, head: dict, base_url: str) -> dict:
    """One record in `index.json`.

    Prefers the metadata stored on the object — that is what an approver
    approved — and falls back to re-deriving it from the key, so an object
    written by hand during the initial bulk load still indexes correctly.
    """
    meta = head.get("Metadata", {})
    derived = metadata_for(key)
    last = head.get("LastModified")
    return {
        "key": key,
        "url": f"{base_url}/{key}",
        "section": meta.get("section") or derived["section"],
        "product": meta.get("product") or derived["product"],
        "kind": meta.get("kind") or derived["kind"],
        "lang": meta.get("lang") or derived["lang"],
        "version": meta.get("version") or derived["version"],
        "sha256": meta.get("sha256", ""),
        "bytes": head.get("ContentLength", 0),
        "contentType": head.get("ContentType", ""),
        "updated": last.isoformat() if last is not None else "",
    }


def is_content_key(key: str) -> bool:
    """The index describes documents, not its own bookkeeping."""
    return key != INDEX_KEY and not key.endswith(".sha256")
