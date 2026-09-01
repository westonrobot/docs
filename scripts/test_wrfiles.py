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
            w.key_from_upload_path("robot/_upload/solution/fleet/fleet-guide-en-v1.pdf"),
            "solution/fleet/fleet-guide-en-v1.pdf",
        )


class Extensions(unittest.TestCase):
    def test_tar_gz_is_one_extension(self):
        self.assertEqual(w.split_ext("wr65-sdk-en-v2.3.tar.gz"), ("wr65-sdk-en-v2.3", ".gz"))
        self.assertEqual(
            w.key_from_upload_path("_upload/robot/wr65/wr65-sdk-en-v2.3.tar.gz"),
            "robot/wr65/wr65-sdk-en-v2.3.tar.gz",
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
