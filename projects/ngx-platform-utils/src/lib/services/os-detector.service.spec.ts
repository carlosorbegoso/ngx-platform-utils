import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { OsDetectorService } from './os-detector.service';

describe('OsDetectorService', () => {

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(OsDetectorService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect OS info on browser platform', () => {
        const service = setup();
        const info = service.osInfo();
        expect(info.name).toBeDefined();
        expect(typeof info.isMobile).toBe('boolean');
        expect(typeof info.isDesktop).toBe('boolean');
        expect(info.isMobile).not.toBe(info.isDesktop);
    });

    it('should return unknown on server platform', () => {
        const service = setup('server');
        expect(service.name()).toBe('unknown');
        expect(service.isDesktop()).toBe(true);
        expect(service.isMobile()).toBe(false);
    });

    it('should expose OS-specific computed signals', () => {
        const service = setup();
        expect(typeof service.isIOS()).toBe('boolean');
        expect(typeof service.isAndroid()).toBe('boolean');
        expect(typeof service.isWindows()).toBe('boolean');
        expect(typeof service.isMacOS()).toBe('boolean');
        expect(typeof service.isLinux()).toBe('boolean');
    });
});
