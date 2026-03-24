import { TestBed } from '@angular/core/testing';
import { PLATFORM_CONFIG } from './models/platform-config.model';
import { providePlatformConfig } from './provide-platform-config';
import { DeviceInfoService } from './services/device-info.service';
import { setupJsdomMocks } from './testing/jsdom-mocks';

describe('providePlatformConfig', () => {
    beforeAll(() => setupJsdomMocks());

    it('should override breakpoints partially', () => {
        TestBed.configureTestingModule({
            providers: [
                providePlatformConfig({
                    breakpoints: { XS: 0, SM: 480, MD: 768, LG: 1024, XL: 1280, XXL: 1536 },
                }),
            ],
        });

        const config = TestBed.inject(PLATFORM_CONFIG);
        expect(config.breakpoints.SM).toBe(480);
        expect(config.breakpoints.MD).toBe(768);
    });

    it('should override device breakpoints', () => {
        TestBed.configureTestingModule({
            providers: [
                providePlatformConfig({
                    deviceBreakpoints: { MOBILE_MAX: 600, TABLET_MAX: 900 },
                }),
            ],
        });

        const config = TestBed.inject(PLATFORM_CONFIG);
        expect(config.deviceBreakpoints.MOBILE_MAX).toBe(600);
        expect(config.deviceBreakpoints.TABLET_MAX).toBe(900);
    });

    it('should keep defaults when no overrides provided', () => {
        TestBed.configureTestingModule({
            providers: [providePlatformConfig({})],
        });

        const config = TestBed.inject(PLATFORM_CONFIG);
        expect(config.breakpoints.SM).toBe(640);
        expect(config.deviceBreakpoints.MOBILE_MAX).toBe(768);
    });

    it('should be used by DeviceInfoService', () => {
        TestBed.configureTestingModule({
            providers: [
                providePlatformConfig({
                    deviceBreakpoints: { MOBILE_MAX: 600, TABLET_MAX: 900 },
                }),
            ],
        });

        const service = TestBed.inject(DeviceInfoService);
        expect(service).toBeTruthy();
    });
});
