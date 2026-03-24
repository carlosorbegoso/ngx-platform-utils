import { Provider } from '@angular/core';
import { DEFAULT_PLATFORM_CONFIG, PLATFORM_CONFIG, PlatformConfig } from './models/platform-config.model';

export function providePlatformConfig(config: Partial<PlatformConfig>): Provider {
    return {
        provide: PLATFORM_CONFIG,
        useValue: {
            breakpoints: { ...DEFAULT_PLATFORM_CONFIG.breakpoints, ...config.breakpoints },
            deviceBreakpoints: { ...DEFAULT_PLATFORM_CONFIG.deviceBreakpoints, ...config.deviceBreakpoints },
        },
    };
}
