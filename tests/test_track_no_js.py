"""ALT-6424: the track page must give its answer to a reader that runs no
JavaScript (a page fetch read only "No parcel for this order"). Its plain
HTML list must agree with ORDERS in store/shop.js. Run:
python3 -m unittest discover -s tests
"""

import datetime
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


class TrackWithoutJs(unittest.TestCase):
    def test_plain_html_names_every_order_as_shop_js_does(self) -> None:
        js = (ROOT / "store" / "shop.js").read_text()
        html = (ROOT / "store" / "track.html").read_text()
        static = html.split("<script>")[0]
        orders = re.findall(r'n: "(T-\d+)", date: "([\d-]+)", status: "(\w+)"', js)
        self.assertTrue(orders)
        for n, date, status in orders:
            if status == "Delivered":
                day = datetime.date.fromisoformat(date) + datetime.timedelta(days=1)
                line = f"Order {n}: parcel delivered on {day}. Tracking number: TEST-{n[2:]}."
            else:
                line = f"Order {n}: cancelled, no parcel."
            self.assertIn(line, static)


if __name__ == "__main__":
    unittest.main()
