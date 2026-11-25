"""Stand-ins for core's golden eval cases (ALT-7889) must keep what the real
sites gave those cases. Run: python3 -m unittest discover -s tests

- wait_out_of_band: the status file must not tell the twin it never changes,
  or the twin rightly arms no watch (githubstatus.com said no such thing).
- form_login_sandbox: the practice login must survive a new browser session
  of the same cell, as the real site's session cookie did; sessionStorage
  lives only as long as one tab, so the second turn was sent back to log in.
"""

import json
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


class StatusFile(unittest.TestCase):
    def test_the_status_file_never_says_it_cannot_change(self) -> None:
        data = json.loads((ROOT / "api" / "status.json").read_text())
        note = data.get("note", "").lower()
        for words in ("never change", "static", "does not change", "won't change"):
            self.assertNotIn(words, note)
        self.assertEqual(data["status"]["indicator"], "none")


class SandboxLogin(unittest.TestCase):
    def test_the_login_is_kept_in_a_cookie_not_in_session_storage(self) -> None:
        for page in ("sandbox-login.html", "sandbox-secure.html"):
            text = (ROOT / "browser" / page).read_text()
            self.assertNotIn("sessionStorage", text, page)
            self.assertIn("document.cookie", text, page)

    def test_the_secure_page_checks_the_same_cookie_the_login_sets(self) -> None:
        login = (ROOT / "browser" / "sandbox-login.html").read_text()
        secure = (ROOT / "browser" / "sandbox-secure.html").read_text()
        name = re.search(r"document\.cookie\s*=\s*'([a-z-]+)=1", login)
        self.assertIsNotNone(name)
        self.assertIn(name.group(1) + "=1", secure)
        self.assertIn("must-login", secure)


if __name__ == "__main__":
    unittest.main()


class ConsentFrame(unittest.TestCase):
    """browser_consent_in_iframe (ALT-8043): the real site served its banner
    from a consent platform (Sourcepoint) in a cross-origin frame, with the
    platform's own markup. The stand-in carries that markup, so the cell's
    consent pass meets what it would meet there; bare ids it was never meant
    to know left the case measuring nothing."""

    def test_the_banner_frame_carries_the_platforms_reject_markup(self) -> None:
        frame = (ROOT / "browser" / "consent-frame.html").read_text()
        reject = re.search(r'<button[^>]*id="reject"[^>]*>', frame)
        accept = re.search(r'<button[^>]*id="accept"[^>]*>', frame)
        self.assertIsNotNone(reject)
        self.assertIsNotNone(accept)
        self.assertIn("sp_choice_type_13", reject.group(0))
        self.assertIn("sp_choice_type_11", accept.group(0))

    def test_the_banner_stays_in_an_opaque_origin_frame(self) -> None:
        page = (ROOT / "browser" / "consent.html").read_text()
        frame = re.search(r"<iframe[^>]*>", page)
        self.assertIsNotNone(frame)
        self.assertIn('sandbox="allow-scripts"', frame.group(0))
        self.assertNotIn("allow-same-origin", frame.group(0))
