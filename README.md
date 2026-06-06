# ngx-platform-utils — workspace

[![npm version](https://img.shields.io/npm/v/ngx-platform-utils.svg)](https://www.npmjs.com/package/ngx-platform-utils)
[![CI](https://github.com/carlosorbegoso/ngx-platform-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosorbegoso/ngx-platform-utils/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/ngx-platform-utils.svg)](./LICENSE)

This is the Angular workspace for **[ngx-platform-utils](https://www.npmjs.com/package/ngx-platform-utils)** — a
comprehensive platform-detection library built on Angular **Signals** (browser, OS, device,
network, user preferences, capabilities, page visibility, storage and web features — all
reactive and SSR-safe).

The library source lives in [`projects/ngx-platform-utils`](./projects/ngx-platform-utils).

## Using the library

```bash
npm install ngx-platform-utils
```

📖 **Full usage docs:** [library README](./projects/ngx-platform-utils/README.md)

## Developing in this repo

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Build the library | `npm run build` |
| Build (watch) | `npm run watch` |
| Run unit tests | `npm test` |

Build output is emitted to `dist/ngx-platform-utils`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). CI (build + tests) runs on every push and PR.

## Releases

Automated via GitHub Actions: bump `projects/ngx-platform-utils/package.json`, update
[`CHANGELOG.md`](./CHANGELOG.md), then push a `vX.Y.Z` tag — the workflow publishes to npm
using Trusted Publishing (OIDC) with build provenance. No tokens required.

## License

[MIT](./LICENSE) © Carlos Orbegoso Loayza
