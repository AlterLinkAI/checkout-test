# checkout-test

TEST ONLY (AlterLink ALT-6067, ALT-6295, ALT-5436): a look-alike checkout for live checks of the twin's pay guard. The shop ("Lumen Test Shop") and all data are made up. Nothing is sold, no payment provider is called, and nothing is charged. Pages is switched off and the repo archived after the runs.

`index.html#case=none|total|shop|frame`:

- `total` / `shop`: the total or the shop name changes at the first card input.
- `frame`: the card fields and the Pay sit in a sandboxed frame with an opaque origin.

`timer.html#case=total|shop&ms=4000`: the total or the shop changes a few seconds after the last card input, between the read and the press (the pay gate itself must refuse).

`bank.html#approve=90|never`: after Pay the bank asks the owner to approve the payment in his bank app (`bank-wait.html`). It approves by itself 90 s (or N s) after Pay and then shows "Payment received" with an order number, or never approves. The state lives in the address, so a reload shows the same step.
