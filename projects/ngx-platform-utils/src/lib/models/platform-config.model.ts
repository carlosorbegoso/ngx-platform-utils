import { InjectionToken } from '@angular/core';
import { BREAKPOINTS, DEVICE_BREAKPOINTS } from './breakpoints.const';

export interface PlatformBreakpoints {
    XS: number;
    SM: number;
    MD: number;
    LG: number;
    XL: number;
    XXL: number;
}

export interface PlatformDeviceBreakpoints {
    MOBILE_MAX: number;
    TABLET_MAX: number;
}

export interface PlatformConfig {
    breakpoints: PlatformBreakpoints;
    deviceBreakpoints: PlatformDeviceBreakpoints;
}

export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
    breakpoints: { ...BREAKPOINTS },
    deviceBreakpoints: { ...DEVICE_BREAKPOINTS },
};

export const PLATFORM_CONFIG = new InjectionToken<PlatformConfig>('PLATFORM_CONFIG', {
    providedIn: 'root',
    factory: () => DEFAULT_PLATFORM_CONFIG,
});
