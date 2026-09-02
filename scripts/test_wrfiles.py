"""Tests for key derivation.

The boundaries that matter are the ones where a bad name must be *refused*
rather than guessed at: an unknown extension, a wrong directory depth, a
section that is not one of the six. A store that serves firmware cannot
afford a helpful default.

Run: python3 -m unittest discover -s scripts -t scripts
"""

import unittest

import wrfiles as w


class BothRoutesAgree(unittest.TestCase):
    """The engineer's directories and the technician's `__` segments are one
    convention in two notations; if they ever disagree the store gains two
    copies of the same document under different keys."""

    def test_same_key(self):
        flat = w.key_from_flat_name("robot__wr65__user-manual__en__v2.3.pdf")
        path = w.key_from_upload_path("_upload/robot/wr65/wr65-user-manual-en-v2.3.pdf")
        self.assertEqual(flat, path)
        self.assertEqual(flat, "robot/wr65/wr65-user-manual-en-v2.3.pdf")

    def test_metadata_round_trips(self):
        key = w.key_from_flat_name("peripheral__manifold-pocket__datasheet__zh__v1.pdf")
        self.assertEqual(
            w.metadata_for(key),
            {
                "section": "peripheral",
                "product": "manifold-pocket",
                "kind": "datasheet",
                "lang": "zh",
                "version": "1",
            },
        )


class FlatNameIsRefusedNotGuessed(unittest.TestCase):
    def test_wrong_segment_count(self):
        with self.assertRaises(w.NameError_):
            w.parse_flat_name("wr65__manual__en__v2.3.pdf")

    def test_unknown_section(self):
        with self.assertRaises(w.NameError_):
            w.parse_flat_name("robots__wr65__manual__en__v2.3.pdf")

    def test_version_without_v(self):
        with self.assertRaises(w.NameError_):
            w.parse_flat_name("robot__wr65__manual__en__2.3.pdf")

    def test_uppercase_product(self):
        with self.assertRaises(w.NameError_):
            w.parse_flat_name("robot__WR65__manual__en__v2.3.pdf")

    def test_no_extension(self):
        with self.assertRaises(w.NameError_):
            w.parse_flat_name("robot__wr65__manual__en__v2")


class UploadPathIsRefusedNotGuessed(unittest.TestCase):
    def test_too_shallow(self):
        with self.assertRaises(w.NameError_):
            w.key_from_upload_path("_upload/robot/wr65-manual-en-v2.3.pdf")

    def test_too_deep_keeps_the_old_taxonomy_out(self):
        # `_upload/robot/manipulator/wr65/…` is the shape D4 was amended away
        # from; accepting it would quietly reintroduce the category segment.
        with self.assertRaises(w.NameError_):
            w.key_from_upload_path("_upload/robot/manipulator/wr65/wr65-manual-en-v2.3.pdf")

    def test_not_under_upload(self):
        with self.assertRaises(w.NameError_):
            w.key_from_upload_path("robot/wr65/wr65-manual-en-v2.3.pdf")

    def test_filename_must_carry_the_product(self):
        with self.assertRaises(w.NameError_):
            w.key_from_upload_path("_upload/robot/wr65/manual-en-v2.3.pdf")

    def test_nested_under_a_section_dir(self):
        self.assertEqual(
            w.key_from_upload_path("robot/_upload/solution/fleet/fleet-user-manual-en-v1.pdf"),
            "solution/fleet/fleet-user-manual-en-v1.pdf",
        )


class Extensions(unittest.TestCase):
    def test_tar_gz_is_one_extension(self):
        self.assertEqual(w.split_ext("wr65-sdk-manual-en-v2.3.tar.gz"), ("wr65-sdk-manual-en-v2.3", ".gz"))
        self.assertEqual(
            w.key_from_upload_path("_upload/robot/wr65/wr65-sdk-manual-en-v2.3.tar.gz"),
            "robot/wr65/wr65-sdk-manual-en-v2.3.tar.gz",
        )

    def test_unknown_extension_is_refused(self):
        with self.assertRaises(w.NameError_):
            w.content_type_for(".exe")
        with self.assertRaises(w.NameError_):
            w.key_from_upload_path("_upload/robot/wr65/wr65-tool-en-v1.exe")

    def test_known_types(self):
        self.assertEqual(w.content_type_for(".PDF"), "application/pdf")
        self.assertEqual(w.content_type_for(".mp4"), "video/mp4")


class Digests(unittest.TestCase):
    def test_stable(self):
        self.assertEqual(w.sha256_bytes(b"x"), w.sha256_bytes(b"x"))
        self.assertNotEqual(w.sha256_bytes(b"x"), w.sha256_bytes(b"y"))


if __name__ == "__main__":
    unittest.main()


class IndexEntries(unittest.TestCase):
    KEY = "robot/wr65/wr65-user-manual-en-v2.3.pdf"

    def test_prefers_stored_metadata(self):
        head = {
            "Metadata": {"kind": "service-manual", "sha256": "abc", "product": "wr65"},
            "ContentLength": 12,
            "ContentType": "application/pdf",
        }
        e = w.index_entry(self.KEY, head, "https://download.westonrobot.net")
        self.assertEqual(e["kind"], "service-manual")  # stored wins over derived
        self.assertEqual(e["sha256"], "abc")
        self.assertEqual(e["url"], f"https://download.westonrobot.net/{self.KEY}")

    def test_falls_back_to_the_key(self):
        # The initial bulk load writes objects by hand; they must still index.
        e = w.index_entry(self.KEY, {}, "https://download.westonrobot.net")
        self.assertEqual(e["kind"], "user-manual")
        self.assertEqual(e["lang"], "en")
        self.assertEqual(e["version"], "2.3")
        self.assertEqual(e["updated"], "")

    def test_bookkeeping_is_not_content(self):
        self.assertFalse(w.is_content_key("index.json"))
        self.assertFalse(w.is_content_key(f"{KEY_SIDECAR}"))
        self.assertTrue(w.is_content_key(self.KEY))


KEY_SIDECAR = "robot/wr65/wr65-user-manual-en-v2.3.pdf.sha256"


class TheVersionTailIsRequiredWhenPublishing(unittest.TestCase):
    """Every other naming rule is machine-checked; this one used to be
    convention, so a file without it published and then rendered with a blank
    version and language — visible to a customer and to nobody else."""

    def test_missing_lang_and_version_is_refused(self):
        with self.assertRaises(w.NameError_) as cm:
            w.key_from_upload_path("_upload/robot/scout-mini/scout-mini-manual.pdf")
        self.assertIn("missing the language and version", str(cm.exception))

    def test_missing_only_the_version_is_refused(self):
        with self.assertRaises(w.NameError_):
            w.key_from_upload_path("_upload/robot/scout-mini/scout-mini-manual-en.pdf")

    def test_a_well_formed_name_still_passes(self):
        self.assertEqual(
            w.key_from_upload_path(
                "static/_upload/robot/scout-mini/scout-mini-user-manual-en-v2.0.1.pdf"),
            "robot/scout-mini/scout-mini-user-manual-en-v2.0.1.pdf")

    def test_multipart_language_tags_pass(self):
        self.assertEqual(
            w.metadata_for(w.key_from_upload_path(
                "_upload/robot/scout-mini/scout-mini-user-manual-zh-hans-v1.pdf"))["lang"],
            "zh-hans")

    def test_metadata_for_stays_lenient(self):
        # An object written into the bucket by hand must still index.
        m = w.metadata_for("robot/scout-mini/scout-mini-manual.pdf")
        self.assertEqual(m["kind"], "manual")
        self.assertEqual((m["lang"], m["version"]), ("", ""))


class KindAndLanguageAreControlledVocabularies(unittest.TestCase):
    """Free text here is how a store ends up holding cad, CAD, STP and STL for
    the same thing — at which point `<Downloads kind="…">` stops being usable
    and the Document column reads inconsistently."""

    def key(self, name):
        return w.key_from_upload_path(f"_upload/robot/scout-mini/{name}")

    def test_a_listed_kind_passes(self):
        self.assertTrue(self.key("scout-mini-user-manual-en-v2.0.pdf"))
        self.assertTrue(self.key("scout-mini-cad-en-v1.zip"))

    def test_case_variants_are_refused(self):
        for n in ("scout-mini-CAD-en-v1.pdf", "scout-mini-User-Manual-en-v1.pdf"):
            with self.assertRaises(w.NameError_):
                self.key(n)

    def test_a_near_synonym_is_refused(self):
        # `manual` vs `user-manual` is the split the vocabulary exists to stop.
        with self.assertRaises(w.NameError_) as cm:
            self.key("scout-mini-manual-en-v1.pdf")
        self.assertIn("not one of", str(cm.exception))

    def test_an_invented_format_kind_is_refused(self):
        # STEP and STL are formats, carried by the extension; the kind is `cad`.
        with self.assertRaises(w.NameError_):
            self.key("scout-mini-STP-en-v1.zip")

    def test_cn_is_refused_in_favour_of_zh(self):
        with self.assertRaises(w.NameError_) as cm:
            self.key("scout-mini-user-manual-cn-v1.pdf")
        self.assertIn("'zh'", str(cm.exception))

    def test_chinese_script_variants_pass(self):
        for lang in ("zh", "zh-hans", "zh-hant"):
            self.assertTrue(self.key(f"scout-mini-user-manual-{lang}-v1.pdf"))

    def test_metadata_for_stays_lenient_about_vocabulary(self):
        # A bulk-loaded object with an off-vocabulary kind must still index,
        # or it would be in the store and invisible to every page.
        self.assertEqual(
            w.metadata_for("robot/scout-mini/scout-mini-CAD-en-v1.pdf")["kind"], "CAD")
