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

// TEST ONLY (ALT-6424): one made-up product, the item the look-alike pay
// page (../index.html) sells, so the cart and the checkout agree.
const PRODUCTS = [{ id: "item", name: "Test item", price: "7,99 &euro;" }];
const cart = () => JSON.parse(localStorage.getItem("testshop.cart") || "[]");
function addToCart(id) {
  localStorage.setItem("testshop.cart", JSON.stringify(cart().concat([id])));
}
const returned = (n) => localStorage.getItem("testshop.return." + n);

function header() {
  // The "Sign in" button is in the header for everyone, signed in or not,
  // as on many real stores. Signed in shows only in the account menu.
  const h = document.getElementById("header");
  h.innerHTML =
    '<a href="index.html">Test Store</a> &middot; ' +
    '<a href="signin.html">Sign in or register, my account</a> &middot; ' +
    '<a href="orders.html">My orders</a> &middot; ' +
    '<a href="cart.html">Cart (' + cart().length + ")</a>" +
    (signedIn() ? ' &middot; <span id="account">Hello, Test Shopper</span>' : "");
}
