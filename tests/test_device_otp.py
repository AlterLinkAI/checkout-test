"""ALT-7728: device-otp/ is device/ with a true one-time-code box, and
phone.html holds the code for the #elsewhere case. Run:
python3 -m unittest discover -s tests
"""

import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


class DeviceOtp(unittest.TestCase):
    def test_the_code_box_is_a_one_time_code_box(self) -> None:
        page = (ROOT / "device-otp" / "index.html").read_text()
        box = re.search(r'<input name="otp"[^>]*>', page).group(0)
        self.assertIn('autocomplete="one-time-code"', box)
        self.assertIn('<b id="otp">482915</b>', page)
        self.assertIn('location.hash === "#elsewhere"', page)

    def test_the_phone_page_holds_another_code(self) -> None:
        phone = (ROOT / "device-otp" / "phone.html").read_text()
        self.assertIn("735104", phone)
        self.assertNotIn("482915", phone)


if __name__ == "__main__":
    unittest.main()
