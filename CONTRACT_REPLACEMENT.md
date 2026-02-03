# Contract Replacement Guide

Use this checklist when adapting the skeleton for a new contract/project.

## 1) Update contract + network config

Edit `js/config.js`:

- `CONFIG.NETWORK.CHAIN_ID`
- `CONFIG.NETWORK.NAME`
- `CONFIG.NETWORK.RPC_URL`
- `CONFIG.NETWORK.BLOCK_EXPLORER`
- `CONFIG.CONTRACT.ADDRESS`
- Optional scan floor values (`DEPLOYMENT_BLOCK`, `OPERATION_REQUESTED_START_BLOCK`)

## 2) Replace ABI

- Replace `abi.json` with your new contract ABI.

## 3) Update contract manager methods

Edit `js/contracts/contract-manager.js`:

- Keep provider/signer helpers
- Replace/add methods to match your ABI
- Remove methods tied to old events/fields if not needed

## 4) Align UI components with ABI

Common files to update:

- `js/components/proposals-tab.js`
- `js/components/proposal-detail-modal.js`
- `js/components/propose-tab.js`
- `js/components/bridge-tab.js`
- `js/components/parameters-tab.js`

Update event names, field parsing, and action handlers to match your contract.

## 5) Keep reusable skeleton pieces

Usually reusable as-is:

- CSS (`css/*.css`)
- Header + tab shell
- Wallet connection flow (`js/wallet/*`)
- Toast notifications (`js/components/toast-manager.js`)

## 6) Smoke test

1. Run static server
2. Connect wallet
3. Verify network gating
4. Verify read calls load data
5. Send one test transaction (if applicable)

## Notes

This repo intentionally ships with a real reference contract so it can run out of the box as an example.
