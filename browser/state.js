// TEST ONLY (ALT-6914): the shared visible state of the browser test pages.
// Each page keeps one plain object; every change is shown as a status line
// (#status) and as JSON (#state-json, window.__pageState), so a check can read
// what happened from the page itself. Nothing is sent anywhere.
const pageState = { page: document.body.dataset.page, events: [] };

function now() {
  return new Date().toISOString().replace(/\.\d+Z$/, "Z");
}

function show(status) {
  if (status) document.getElementById("status").textContent = status;
  document.getElementById("state-json").textContent = JSON.stringify(pageState, null, 2);
  window.__pageState = pageState;
}

function record(event, extra) {
  pageState.events.push(Object.assign({ event: event, at: now() }, extra || {}));
  pageState.last = event;
}
