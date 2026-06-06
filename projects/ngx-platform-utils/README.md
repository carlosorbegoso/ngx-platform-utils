# ngx-platform-utils

[![npm version](https://img.shields.io/npm/v/ngx-platform-utils.svg)](https://www.npmjs.com/package/ngx-platform-utils)
[![npm downloads](https://img.shields.io/npm/dm/ngx-platform-utils.svg)](https://www.npmjs.com/package/ngx-platform-utils)
[![license](https://img.shields.io/npm/l/ngx-platform-utils.svg)](https://github.com/carlosorbegoso/ngx-platform-utils/blob/main/LICENSE)

A comprehensive Angular library for platform detection using **Signals**. Detect browser, OS, device, network, user preferences, capabilities, features, and more — all reactive and SSR-safe.

Built for **Angular 22+** with native Signals. No RxJS required.

## Installation

```bash
npm install ngx-platform-utils
```

## Quick Start

All services are `providedIn: 'root'` — no module imports needed.

### Using the Facade (recommended)

```typescript
import { Component, inject } from '@angular/core';
import { PlatformService } from 'ngx-platform-utils';

@Component({
  selector: 'app-root',
  template: `
    @if (platform.device.isMobile()) {
      <app-mobile-nav />
    } @else {
      <app-desktop-nav />
    }

    @if (platform.preferences.isDarkMode()) {
      <div class="dark-theme">...</div>
    }

    @if (!platform.network.online()) {
      <div class="offline-banner">You are offline</div>
    }
  `
})
export class AppComponent {
  readonly platform = inject(PlatformService);
}
```

### Using Individual Services

```typescript
import { inject } from '@angular/core';
import { BrowserDetectorService, DeviceInfoService } from 'ngx-platform-utils';

export class MyComponent {
  private browser = inject(BrowserDetectorService);
  private device  = inject(DeviceInfoService);

  isChrome  = this.browser.isChrome;    // Signal<boolean>
  isMobile  = this.device.isMobile;     // Signal<boolean>
}
```

## Services

### PlatformService (Facade)

Unified access to all services:

| Property       | Service                      | Description                    |
|----------------|------------------------------|--------------------------------|
| `device`       | `DeviceInfoService`          | Screen size, orientation, type |
| `browser`      | `BrowserDetectorService`     | Browser name, version, engine  |
| `os`           | `OsDetectorService`          | Operating system detection     |
| `network`      | `NetworkInfoService`         | Online/offline, connection     |
| `preferences`  | `UserPreferencesService`     | Dark mode, reduced motion      |
| `capabilities` | `DeviceCapabilitiesService`  | Memory, CPU, GPU               |
| `visibility`   | `PageVisibilityService`      | Tab active/inactive            |
| `storage`      | `StorageAvailabilityService` | localStorage, cookies, etc.    |
| `features`     | `FeatureDetectionService`    | WebGL, WebRTC, SW, etc.        |
| `mediaQuery`   | `ScreenMediaQueryService`    | Custom media queries           |

```typescript
platform.isBrowser  // true in browser
platform.isServer   // true in SSR
```

### DeviceInfoService

Reactive device information with automatic updates on resize/orientation change.

```typescript
const device = inject(DeviceInfoService);

device.deviceInfo()    // Signal<DeviceInfo>
device.isMobile()      // Signal<boolean>
device.isTablet()      // Signal<boolean>
device.isDesktop()     // Signal<boolean>
device.isSmallScreen() // Signal<boolean> (mobile or tablet)
device.isPortrait()    // Signal<boolean>
device.isLandscape()   // Signal<boolean>
device.screenSize()    // Signal<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>
```

### BrowserDetectorService

```typescript
const browser = inject(BrowserDetectorService);

browser.browserInfo()    // Signal<BrowserInfo>
browser.name()           // Signal<BrowserName>  ('chrome' | 'firefox' | 'safari' | 'edge' | ...)
browser.version()        // Signal<string>
browser.engine()         // Signal<BrowserEngine> ('blink' | 'gecko' | 'webkit' | ...)
browser.isChrome()       // Signal<boolean>
browser.isFirefox()      // Signal<boolean>
browser.isSafari()       // Signal<boolean>
browser.isEdge()         // Signal<boolean>
browser.isChromiumBased() // Signal<boolean>
```

### OsDetectorService

```typescript
const os = inject(OsDetectorService);

os.osInfo()    // Signal<OsInfo>
os.name()      // Signal<OsName> ('windows' | 'macos' | 'linux' | 'ios' | 'android' | ...)
os.version()   // Signal<string>
os.isMobile()  // Signal<boolean>
os.isDesktop() // Signal<boolean>
os.isIOS()     // Signal<boolean>
os.isAndroid() // Signal<boolean>
os.isWindows() // Signal<boolean>
os.isMacOS()   // Signal<boolean>
os.isLinux()   // Signal<boolean>
```

### NetworkInfoService

Reactive network status — updates on online/offline and connection changes.

```typescript
const network = inject(NetworkInfoService);

network.networkInfo() // Signal<NetworkInfo>
network.online()      // Signal<boolean>
```

`NetworkInfo` includes: `online`, `type` (`'4g' | '3g' | '2g' | 'slow-2g' | 'unknown'`), `downlink`, `rtt`, `saveData`.

### UserPreferencesService

Reactive user OS preferences — updates when user changes system settings.

```typescript
const prefs = inject(UserPreferencesService);

prefs.preferences()        // Signal<UserPreferences>
prefs.colorScheme()        // Signal<ColorScheme> ('dark' | 'light' | 'no-preference')
prefs.isDarkMode()         // Signal<boolean>
prefs.isLightMode()        // Signal<boolean>
prefs.reducedMotion()      // Signal<boolean>
prefs.highContrast()       // Signal<boolean>
prefs.reducedTransparency() // Signal<boolean>
prefs.forcedColors()       // Signal<boolean>
```

### DeviceCapabilitiesService

```typescript
const caps = inject(DeviceCapabilitiesService);

caps.capabilities() // Signal<DeviceCapabilities>
// { memory: number | null, cpuCores: number | null, maxTouchPoints: number, gpu: GpuInfo }
```

### PageVisibilityService

Reactive page visibility — updates when tab becomes active/inactive.

```typescript
const vis = inject(PageVisibilityService);

vis.state()     // Signal<'visible' | 'hidden'>
vis.isVisible() // Signal<boolean>
vis.isHidden()  // Signal<boolean>
```

### StorageAvailabilityService

```typescript
const storage = inject(StorageAvailabilityService);

storage.availability() // Signal<StorageAvailability>
// { localStorage: boolean, sessionStorage: boolean, cookies: boolean, indexedDB: boolean }
```

### FeatureDetectionService

```typescript
const features = inject(FeatureDetectionService);

features.features()          // Signal<FeatureDetection>
features.has('webGL')        // boolean
features.has('serviceWorker') // boolean
features.has('webRTC')       // boolean
```

Available features: `webGL`, `webGL2`, `webRTC`, `serviceWorker`, `webWorker`, `sharedWorker`, `webSocket`, `webAssembly`, `notifications`, `geolocation`, `bluetooth`, `usb`, `vibration`, `share`, `clipboard`, `speechRecognition`, `speechSynthesis`, `intersectionObserver`, `resizeObserver`, `mutationObserver`.

### ScreenMediaQueryService

Reactive media queries with signal-based results and query caching.

```typescript
const mq = inject(ScreenMediaQueryService);

// Custom queries
const isWide = mq.matchMedia('(min-width: 1200px)');  // Signal<boolean>

// Breakpoint shortcuts
const isMd = mq.minWidth('MD');       // Signal<boolean> - min-width: 768px
const isSm = mq.maxWidth('SM');       // Signal<boolean> - max-width: 639px
const isMdLg = mq.between('MD', 'XL'); // Signal<boolean> - 768px to 1279px
```

## Configuration

Customize breakpoints via `providePlatformConfig`:

```typescript
// app.config.ts
import { providePlatformConfig } from 'ngx-platform-utils';

export const appConfig = {
  providers: [
    providePlatformConfig({
      breakpoints: {
        XS: 0,
        SM: 480,   // default: 640
        MD: 768,
        LG: 1024,
        XL: 1280,
        XXL: 1536,
      },
      deviceBreakpoints: {
        MOBILE_MAX: 600,  // default: 768
        TABLET_MAX: 900,  // default: 1024
      },
    }),
  ],
};
```

Default breakpoints follow Tailwind CSS conventions.

## SSR Support

All services are **SSR-safe**. On the server, they return sensible defaults:
- Device: `desktop`, `landscape`, `lg`
- Browser/OS: `unknown`
- Network: `online: true`
- Preferences: `no-preference`, all false
- Features: all false
- Storage: all false
- Visibility: `visible`

## Models

All interfaces are exported for use in your code:

```typescript
import type {
  DeviceInfo,
  BrowserInfo, BrowserName, BrowserEngine,
  OsInfo, OsName,
  NetworkInfo, ConnectionType,
  UserPreferences, ColorScheme,
  DeviceCapabilities, GpuInfo,
  VisibilityState,
  StorageAvailability,
  FeatureDetection,
  PlatformConfig, PlatformBreakpoints, PlatformDeviceBreakpoints,
} from 'ngx-platform-utils';
```

## Requirements

- Angular 22+
- TypeScript 5.9+

## Migrating from 1.x to 2.0

`2.0.0` only raises the supported Angular version — **there are no public API changes**.
Every service, signal and model works exactly as in `1.x`.

- **Angular 22+** is now required (`peerDependencies` moved to `^22.0.0`).
- If you are still on Angular 21 or earlier, stay on the `1.x` line:
  ```bash
  npm install ngx-platform-utils@^1
  ```
- To upgrade, update Angular to 22 first (`ng update @angular/core @angular/cli`),
  then bump the library:
  ```bash
  npm install ngx-platform-utils@^2
  ```

No code changes are needed in your app after upgrading.

## License

[MIT](https://github.com/carlosorbegoso/ngx-platform-utils/blob/main/LICENSE) © Carlos Orbegoso Loayza
