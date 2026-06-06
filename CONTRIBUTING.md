# Contributing to ngx-platform-utils

Thanks for taking the time to contribute! 🎉

## Prerequisites

- **Node.js 20.19+ / 22.12+ / 24+** (CI runs on Node 24)
- **npm 11+**
- The library targets **Angular 22+**

## Getting started

```bash
git clone https://github.com/carlosorbegoso/ngx-platform-utils.git
cd ngx-platform-utils
npm install
```

## Development workflow

| Task | Command |
|------|---------|
| Build the library | `npm run build` |
| Build in watch mode | `npm run watch` |
| Run unit tests (Vitest) | `npm test` |

The library source lives in `projects/ngx-platform-utils/src`. Build artifacts are
emitted to `dist/ngx-platform-utils`.

## Guidelines

- **Signals first.** Services are reactive and built on Angular Signals — no RxJS.
- **SSR-safe.** Any browser API access must guard for the server and return sensible
  defaults. See existing services for the pattern.
- **Tests required.** New behavior needs a matching `*.spec.ts`. Keep the suite green
  (`npm test`).
- **Keep the public API intentional.** Anything exported from `public-api.ts` is part
  of the package's contract.

## Submitting changes

1. Fork the repo and create a branch off `main`.
2. Make your change, with tests.
3. Ensure `npm run build` and `npm test` pass.
4. Open a pull request describing the change and the motivation.

CI (build + tests) runs automatically on every pull request.

## Releases

Releases are automated. Maintainers cut a version by bumping
`projects/ngx-platform-utils/package.json`, updating `CHANGELOG.md`, and pushing a
`vX.Y.Z` tag — GitHub Actions then publishes to npm via Trusted Publishing (OIDC).

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](./LICENSE).
