# Repo Features Reference

This file summarizes the core implementation patterns in this repo so it can be reused as a reference when creating new UIs.

## 1) Cache

### RPC-level read cache
- File: `js/utils/read-only-provider.js`
- The shared read-only provider wraps `provider.send()` with a TTL cache.
- Cached methods include:
  - `eth_chainId` (24h)
  - `eth_blockNumber` (1.5s)
  - `eth_getCode` (60s)
  - `eth_call` (10s)
  - `eth_getLogs` (10s)
- Cache keys are normalized and hashed for large payloads.
- In-flight deduplication prevents duplicate concurrent RPC calls for the same key.
- Cache is bounded with `maxEntries` (default `500`).

### Proposals UI cache (localStorage)
- File: `js/components/proposals-tab.js`
- Proposal event data is cached in localStorage with:
  - TTL: `5 minutes` (`cacheTtlMs`)
  - cap: `500` items (`cacheMaxItems`)
  - schema versioning (`_cacheSchemaVersion`)
- Cache key includes chain + contract address to avoid cross-network/address collisions.
- On load, cache is restored for fast first paint, then refreshed in background when needed.

### Contract parameters cache
- File: `js/contracts/contract-manager.js`
- Common contract reads are cached in memory (`_parametersCache`) with a short TTL (`15s`).
- In-flight batch requests are deduplicated via `_parametersBatchPromise`.

## 2) Cache Busting / Invalidation

### Manual cache clear
- Files: `index.html`, `js/components/proposals-tab.js`
- The footer `Clear cache` button triggers `_clearCacheAndReload()`, which removes proposal cache and resets proposal state.

### Automatic invalidation triggers
- File: `js/contracts/contract-manager.js`
- Contract parameter cache is invalidated when wallet/network connection state changes (`updateConnections()`).
- ABI is fetched with `fetch('./abi.json', { cache: 'no-cache' })` to avoid stale browser-cached ABI artifacts.

### Version-based busting
- File: `js/components/proposals-tab.js`
- `_cacheSchemaVersion` is built into the storage key and payload checks. Bumping it invalidates older stored cache formats.

## 3) Batching

### Multicall batching
- Files: `js/utils/multicall-service.js`, `js/contracts/contract-manager.js`
- `MulticallService` batches many reads into one RPC via Multicall2 `tryAggregate`.
- `ContractManager.getParametersBatch()` batches common header/parameter reads.
- `ContractManager.getOperationsBatch(operationIds)` batches operation status reads.

### Batch fallback strategy
- File: `js/contracts/contract-manager.js`
- If multicall is unavailable/fails, code falls back to individual reads.
- Operation fallback uses a small concurrency cap (`mapWithConcurrencySettled(..., 4, ...)`) to reduce RPC pressure.

## 4) Wallet Management

### Layered wallet architecture
- Files: `js/wallet/metamask-connector.js`, `js/wallet/wallet-manager.js`, `js/wallet/network-manager.js`
- `MetaMaskConnector`: low-level EIP-1193/MetaMask interactions with EIP-6963-first provider discovery and legacy fallback.
- `WalletManager`: app-level wallet state (provider, signer, address, chain), connect/disconnect, restoration, event dispatch.
- `NetworkManager`: Polygon network requirements and tx gating.

### Connection persistence and restore
- File: `js/wallet/wallet-manager.js`
- Last wallet connection metadata is stored in localStorage (`liberdus_token_ui_wallet_connection`).
- On startup, `checkPreviousConnection()` attempts non-interactive restore via `eth_accounts`.
- Restore and network switch calls use the resolved EIP-1193 provider (not hard-wired `window.ethereum`).

### Event-driven sync
- Files: `js/wallet/wallet-manager.js`, `js/contracts/contract-manager.js`, `js/components/header.js`, `js/wallet/wallet-popup.js`
- Wallet lifecycle emits DOM events:
  - `walletConnected`
  - `walletDisconnected`
  - `walletAccountChanged`
  - `walletChainChanged`
- UI and contract wiring subscribe to these events to stay in sync.

### Tx gating and network enforcement
- File: `js/wallet/network-manager.js`
- Transactions are enabled only when:
  - wallet is connected, and
  - chain ID matches `CONFIG.NETWORK.CHAIN_ID` (Polygon in this repo).
- UI elements marked with `data-requires-tx="true"` are automatically enabled/disabled.

## Quick Reuse Checklist

- Keep `read-only-provider` singleton + RPC cache wrapper.
- Keep `ContractManager` parameter batching and operation batching pattern.
- Keep proposals cache keying by schema + chain + contract.
- Keep wallet event names and listener wiring unchanged for predictable integration.
- Update `js/config.js` for chain/RPC/contract details when reusing.

## 5) Additional High-Value Features to Copy

1. Lazy tab activation + debounced refresh to reduce background RPC calls.
Files: `js/components/tab-bar.js`, `js/components/proposals-tab.js`, `js/components/parameters-tab.js`, `js/components/propose-tab.js`, `js/components/bridge-tab.js`
2. Event-driven module sync via DOM `CustomEvent` instead of tight coupling.
Files: `js/wallet/wallet-manager.js`, `js/contracts/contract-manager.js`
3. Resilient `eth_getLogs` fallback that recursively splits large block ranges on provider limits.
Files: `js/components/proposals-tab.js`
4. Progressive proposals UX: instant cached restore, later row hydration, and incremental refresh from `lastFetchedBlock`.
Files: `js/components/proposals-tab.js`
5. Fresh provider/signer per write to avoid stale provider/network state.
Files: `js/contracts/contract-manager.js`
6. Transaction UX pipeline (loading -> sent -> confirming -> success/error) with persistent errors.
Files: `js/components/toast-manager.js`, `js/components/proposal-detail-modal.js`, `js/components/bridge-tab.js`
7. Error normalization helpers for RPC/wallet/ethers errors (including user rejection and duplicate signature flows).
Files: `js/utils/transaction-helpers.js`
8. URL hash-based tab routing and keyboard-accessible tab navigation.
Files: `js/components/tab-bar.js`
9. Read-only-first architecture with tx-gated controls using `data-requires-tx`.
Files: `js/wallet/network-manager.js`, `index.html`
10. Deterministic event scan floor using deployment and known-start blocks.
Files: `js/config.js`, `js/components/proposals-tab.js`
