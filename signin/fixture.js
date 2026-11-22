// TEST ONLY (ALT-5500): made-up sign-in steps for live checks of the twin.
// Every account, key and number here is made up and published on purpose:
// the pages check codes in this browser and send nothing anywhere.

// The authenticator setup key of the six-box page's test account, and of
// nothing else. RFC 6238, SHA-1, six digits, 30 s.
const BOXES_SEED = "DOBQVQEZ3OVFC532";
// The key the email-code page derives its code from (one code per 10 min).
const MAIL_KEY = "QX7KM4TPLW2RNC5Z";
// The authenticator setup key of the extra-check page's test account
// (ALT-6785), and of nothing else.
const EXTRA_SEED = "TNXPHMA4UT62C3UR";

// The provider's chooser rows: three made-up accounts, the first a work one.
const CHOOSER = [
  { login: "office@lindenworks.example", name: "Rowan Marwick (Linden Works)" },
  { login: "rowan.marwick@example.com", name: "Rowan Marwick" },
  { login: "family.home@example.com", name: "Marwick family" },
];

function b32(seed) {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (const ch of seed.replace(/=+$/, "").toUpperCase()) {
    bits += abc.indexOf(ch).toString(2).padStart(5, "0");
  }
  const out = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < out.length; i++) out[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  return out;
}

async function hotp(seed, counter) {
  const key = await crypto.subtle.importKey(
    "raw", b32(seed), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const msg = new ArrayBuffer(8);
  new DataView(msg).setUint32(4, counter);
  new DataView(msg).setUint32(0, Math.floor(counter / 2 ** 32));
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, msg));
  const o = mac[19] & 15;
  const n = ((mac[o] & 127) << 24) | (mac[o + 1] << 16) | (mac[o + 2] << 8) | mac[o + 3];
  return String(n % 1000000).padStart(6, "0");
}

// A code is right for the step it was asked in or the one before or after.
async function codeOk(seed, code, step) {
  const now = Math.floor(Date.now() / 1000 / step);
  for (const d of [-1, 0, 1]) if ((await hotp(seed, now + d)) === code) return true;
  return false;
}

// A made-up membership number per account, shown only behind the sign-in.
function memberNumber(prefix, login) {
  let h = 7;
  for (const ch of login) h = (h * 31 + ch.charCodeAt(0)) % 1000000;
  return prefix + "-" + String(h).padStart(6, "0");
}

function banner() {
  const d = document.createElement("div");
  d.setAttribute("role", "alert");
  d.style.cssText = "background:#b00020;color:#fff;padding:8px 12px";
  d.textContent = "TEST SITE \u2014 made-up accounts, any made-up password works, nothing is sent anywhere.";
  document.body.prepend(d);
}
