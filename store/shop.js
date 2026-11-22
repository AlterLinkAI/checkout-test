// TEST ONLY (ALT-6422): a look-alike store account, made-up data, nothing
// is sold or stored anywhere but this browser's own localStorage.
const ORDERS = [
  { n: "T-1005", date: "2026-11-20", status: "Delivered", items: "Test kettle" },
  { n: "T-1004", date: "2026-11-18", status: "Cancelled", items: "Test lamp" },
  { n: "T-1003", date: "2026-11-15", status: "Delivered", items: "Test cable, test charger" },
  { n: "T-1002", date: "2026-11-12", status: "Delivered", items: "Test mug" },
  { n: "T-1001", date: "2026-11-02", status: "Delivered", items: "Test notebook" },
];
const signedIn = () => localStorage.getItem("testshop.signedIn") === "1";

function header() {
  // The "Sign in" button is in the header for everyone, signed in or not,
  // as on many real stores. Signed in shows only in the account menu.
  const h = document.getElementById("header");
  h.innerHTML =
    '<a href="index.html">Test Store</a> &middot; ' +
    '<a href="signin.html">Sign in or register, my account</a> &middot; ' +
    '<a href="orders.html">My orders</a>' +
    (signedIn() ? ' &middot; <span id="account">Hello, Test Shopper</span>' : "");
}
