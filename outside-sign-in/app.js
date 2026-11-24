// TEST ONLY (ALT-7717): the account result exists only after this browser
// runs JavaScript and submits the sign-in form. Nothing is sent anywhere.
document.getElementById("signin").addEventListener("submit", (e) => {
  e.preventDefault();
  const login = (e.target.login.value || "").replace(/[<>&]/g, "");
  if (!login || !e.target.password.value) {
    document.getElementById("main").insertAdjacentHTML(
      "beforeend",
      '<p class="error" id="err">Enter your email or phone and password.</p>',
    );
    return;
  }
  document.getElementById("main").innerHTML =
    '<h1>Maple Savings test</h1><p id="ok">signed in (test) as ' +
    login +
    "</p><p>Balance: 1,234.56 (made up)</p>";
});
