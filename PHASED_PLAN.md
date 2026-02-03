# Frontend Reference Repo - General Phased Plan

## Purpose

This repo is a reusable vanilla-JS frontend template based on `libedus-dao-ui-new/liberdus-token-ui`.

Use it when you want to spin up a new dApp UI quickly while preserving:

- the same visual system (CSS tokens/layout/components)
- the same wallet connection flow
- the same project structure and initialization pattern

---

## How to Use This Repo

1. Copy this repo for your new frontend.
2. Run it immediately to confirm baseline works.
3. Replace contract/network configuration.
4. Adapt contract-facing tabs and component logic.
5. Keep shared skeleton files unchanged unless you have a clear reason.

---

## Keep These Files Exactly the Same (First Pass)

These are the core skeleton files. Keep them unchanged while you adapt business logic.

### Shell + Styling

- `index.html` (IDs/classes/container structure)
- `css/base.css`
- `css/header.css`
- `css/tabs.css`
- `css/wallet-popup.css`
- `css/notifications.css`

### App Initialization + Shared UX

- `js/app.js` (load order pattern)
- `js/components/header.js` (connect button wiring pattern)
- `js/components/tab-bar.js` (tab activation model)
- `js/components/toast-manager.js`

### Wallet + Network Foundation

- `js/wallet/metamask-connector.js`
- `js/wallet/wallet-manager.js`
- `js/wallet/network-manager.js`
- `js/wallet/wallet-popup.js`

### Shared Utilities

- `js/utils/read-only-provider.js`
- `js/utils/multicall-service.js`
- `js/utils/transaction-helpers.js`
- `libs/ethers.umd.min.js`

> Note: If you change IDs/class names in `index.html`, you must update component selectors. Avoid this early.

---

## Files You Should Customize for a New Frontend

### Always Customize

- `js/config.js` (chain, RPC, explorer, contract address)
- `abi.json` (new contract ABI)
- `assets/logo.png` (branding)
- `README.md` (project-specific setup notes)

### Usually Customize

- `js/contracts/contract-manager.js` (contract methods/events)
- `js/components/proposals-tab.js`
- `js/components/proposal-detail-modal.js`
- `js/components/propose-tab.js`
- `js/components/bridge-tab.js`
- `js/components/parameters-tab.js`

---

## Phased Adaptation Plan

## Phase 0 - Baseline Copy

**Goal:** New repo starts from a known good baseline.

Tasks:
- [ ] Copy this repo into the new project
- [ ] Install/prepare any required static serving tooling
- [ ] Run locally and verify UI loads

Deliverable:
- [ ] Skeleton UI runs unchanged

## Phase 1 - Branding + Static Content

**Goal:** Update branding without touching architecture.

Tasks:
- [ ] Replace logo and app name text
- [ ] Update any footer/header copy
- [ ] Keep CSS tokens/layout structure intact

Deliverable:
- [ ] Rebranded UI with original behavior

## Phase 2 - Network + Contract Swap

**Goal:** Point the app to the new chain/contract safely.

Tasks:
- [ ] Update `js/config.js`
- [ ] Replace `abi.json`
- [ ] Update `js/contracts/contract-manager.js` to match ABI
- [ ] Verify read calls work in browser console/UI

Deliverable:
- [ ] App reads from new contract

## Phase 3 - Feature Mapping (Tab by Tab)

**Goal:** Adapt each tab to the new product requirements.

Tasks:
- [ ] Proposals/events tab logic mapped to new events
- [ ] Detail modal fields/actions mapped
- [ ] Form tabs mapped to new write methods
- [ ] Parameters tab mapped to new read-only metadata

Deliverable:
- [ ] End-to-end feature parity for required tabs

## Phase 4 - QA + Hardening

**Goal:** Ensure stable behavior in real wallets/networks.

Tasks:
- [ ] Verify connect/disconnect/account change flows
- [ ] Verify wrong-network handling
- [ ] Verify loading/error toasts
- [ ] Verify mobile layout at common breakpoints

Deliverable:
- [ ] Release-ready frontend skeleton variant

---

## Handoff Checklist (For Another Engineer)

Before handoff, confirm:

- [ ] "Keep same" files are unchanged or intentionally documented
- [ ] Contract/network replacements are complete
- [ ] All customized files are listed in PR description
- [ ] Local run steps are in `README.md`
- [ ] Known limitations/TODOs are documented

---

## Run Locally

```bash
cd frontend-reference-repo
python3 -m http.server 8080
```

Open `http://localhost:8080`.
