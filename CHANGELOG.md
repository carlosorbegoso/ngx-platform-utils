# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2026-06-06

### Added

- Bundle the MIT `LICENSE` file inside the published npm package.

### Fixed

- Normalize `repository.url` to the `git+https://` form (removes the npm
  publish warning).

## [2.0.0] - 2026-06-06

### Changed

- **BREAKING:** Upgraded to **Angular 22**. `peerDependencies` now require
  `@angular/common` and `@angular/core` `^22.0.0`. Projects on Angular 21 or
  earlier should stay on `1.x`.
- Bumped tooling to the Angular 22 line: `@angular/build`, `@angular/cli`,
  `@angular/compiler-cli` and `ng-packagr` to `22.0.0`.
- Bumped TypeScript to `6.0.x`.

### Notes

- No public API changes — all services, signals and models are unchanged.
  This is a major release purely because the supported Angular peer range moved.
- Releases are now published to npm automatically from GitHub Actions using
  npm **Trusted Publishing (OIDC)** with build provenance — no tokens involved.

## [1.0.0] - 2026-06-05

### Added

- Initial release: Angular platform-detection library built on Signals.
- Services: `PlatformService` (facade), `DeviceInfoService`,
  `BrowserDetectorService`, `OsDetectorService`, `NetworkInfoService`,
  `UserPreferencesService`, `DeviceCapabilitiesService`, `PageVisibilityService`,
  `StorageAvailabilityService`, `FeatureDetectionService`, `ScreenMediaQueryService`.
- SSR-safe defaults across all services.
- Configurable breakpoints via `providePlatformConfig`.

[2.0.1]: https://github.com/carlosorbegoso/ngx-platform-utils/releases/tag/v2.0.1
[2.0.0]: https://github.com/carlosorbegoso/ngx-platform-utils/releases/tag/v2.0.0
[1.0.0]: https://github.com/carlosorbegoso/ngx-platform-utils/releases/tag/v1.0.0
