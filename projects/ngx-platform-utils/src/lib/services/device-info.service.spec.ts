import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { DeviceInfoService } from './device-info.service';
import { setupJsdomMocks } from '../testing/jsdom-mocks';

describe('DeviceInfoService', () => {
    beforeAll(() => setupJsdomMocks());

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(DeviceInfoService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect device info on browser platform', () => {
        const service = setup();
        const info = service.deviceInfo();
        expect(['mobile', 'tablet', 'desktop']).toContain(info.type);
        expect(['portrait', 'landscape']).toContain(info.orientation);
        expect(['xs', 'sm', 'md', 'lg', 'xl', '2xl']).toContain(info.screenSize);
        expect(typeof info.isTouch).toBe('boolean');
        expect(typeof info.isRetina).toBe('boolean');
        expect(typeof info.pixelRatio).toBe('number');
    });

    it('should return desktop defaults on server platform', () => {
        const service = setup('server');
        expect(service.deviceInfo().type).toBe('desktop');
        expect(service.isDesktop()).toBe(true);
        expect(service.isMobile()).toBe(false);
    });

    it('should expose computed layout signals', () => {
        const service = setup();
        expect(typeof service.isMobile()).toBe('boolean');
        expect(typeof service.isTablet()).toBe('boolean');
        expect(typeof service.isDesktop()).toBe('boolean');
        expect(typeof service.isSmallScreen()).toBe('boolean');
        expect(typeof service.isPortrait()).toBe('boolean');
        expect(typeof service.isLandscape()).toBe('boolean');
        expect(service.screenSize()).toBeDefined();
    });
});
