# frontend-reference-repo

A runnable reference skeleton based on `libedus-dao-ui-new/liberdus-token-ui`.

It keeps the same CSS, layout structure, wallet wiring, and contract integration pattern so you can reuse it as a model when creating new UIs.

## Included

- Same CSS system and component styling (`css/`)
- Same SPA tab structure (`index.html`, `js/components/`)
- Same wallet + network scaffolding (`js/wallet/`)
- Same contract integration pattern (`js/contracts/contract-manager.js`)
- Working reference contract + ABI so the example can run immediately

## Run Locally

Use any static server (ES modules require HTTP, not `file://`).

```bash
cd frontend-reference-repo
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Use As a Template

1. Copy this repo (or start from it).
2. Replace contract address/network in `js/config.js`.
3. Replace ABI in `abi.json`.
4. Update contract calls in `js/contracts/contract-manager.js` and any tab logic that depends on contract methods.

See `CONTRACT_REPLACEMENT.md` for the full checklist.
