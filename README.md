# LP Staking Frontend Reference Scaffold

This folder is a starter reference repo plan for building another frontend with the same structure and CSS approach as `lib-lp-staking-frontend`.

## Goal
- Mirror the current project layout so new repos can start from a known, working structure.
- Reuse styling patterns (global CSS, component/section styles, utility classes).
- Keep JS modules organized similarly for faster migration and easier maintenance.

## Proposed starter structure
```text
lp-staking-reference-repo/
├── index.html
├── assets/
├── css/
│   ├── base.css
│   ├── components.css
│   ├── pages.css
│   └── utilities.css
├── js/
│   ├── app.js
│   ├── config/
│   ├── contracts/
│   ├── services/
│   ├── ui/
│   └── utils/
├── libs/
├── admin/
├── tools/
└── README.md
```

## Notes for migration
1. Start by copying shared layout and typography rules from current `css/`.
2. Bring over reusable UI blocks first (cards, buttons, forms, modals).
3. Port contract and wallet modules under `js/contracts/` and `js/services/`.
4. Keep environment/network config isolated in `js/config/`.
5. Validate page parity after each section migration (instead of big-bang copy).

## Next step
When you bring this folder into your other workspace, we can scaffold actual files and map each one to its source in `lib-lp-staking-frontend`.
