import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeviceInfoService } from './device-info.service';
import { BrowserDetectorService } from './browser-detector.service';
import { OsDetectorService } from './os-detector.service';
import { NetworkInfoService } from './network-info.service';
import { UserPreferencesService } from './user-preferences.service';
import { DeviceCapabilitiesService } from './device-capabilities.service';
import { PageVisibilityService } from './page-visibility.service';
import { StorageAvailabilityService } from './storage-availability.service';
import { FeatureDetectionService } from './feature-detection.service';
import { ScreenMediaQueryService } from './screen-media-query.service';

@Injectable({ providedIn: 'root' })
export class PlatformService {

    private readonly platformId = inject(PLATFORM_ID);

    public readonly device       = inject(DeviceInfoService);
    public readonly browser      = inject(BrowserDetectorService);
    public readonly os           = inject(OsDetectorService);
    public readonly network      = inject(NetworkInfoService);
    public readonly preferences  = inject(UserPreferencesService);
    public readonly capabilities = inject(DeviceCapabilitiesService);
    public readonly visibility   = inject(PageVisibilityService);
    public readonly storage      = inject(StorageAvailabilityService);
    public readonly features     = inject(FeatureDetectionService);
    public readonly mediaQuery   = inject(ScreenMediaQueryService);

    get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    get isServer(): boolean {
        return !this.isBrowser;
    }
}
