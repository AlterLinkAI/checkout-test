# checkout-test

TEST ONLY (AlterLink ALT-6067, ALT-6295): a look-alike checkout for live checks of the twin's pay guard. The shop ("Lumen Test Shop") and all data are made up. Nothing is sold, no payment provider is called, and nothing is charged. Pages is switched off and the repo archived after the runs.

`index.html#case=none|total|shop|frame`:

- `total` / `shop`: the total or the shop name changes at the first card input.
- `frame`: the card fields and the Pay sit in a sandboxed frame with an opaque origin.
