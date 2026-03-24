import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { BrowserDetectorService } from './browser-detector.service';

describe('BrowserDetectorService', () => {

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(BrowserDetectorService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect browser info on browser platform', () => {
        const service = setup();
        const info = service.browserInfo();
        expect(info.name).toBeDefined();
        expect(info.engine).toBeDefined();
        expect(info.version).toBeDefined();
        expect(typeof info.majorVersion).toBe('number');
        expect(typeof info.isChromiumBased).toBe('boolean');
    });

    it('should return unknown on server platform', () => {
        const service = setup('server');
        expect(service.name()).toBe('unknown');
        expect(service.version()).toBe('');
        expect(service.engine()).toBe('unknown');
    });

    it('should expose computed shortcuts', () => {
        const service = setup();
        expect(typeof service.isChrome()).toBe('boolean');
        expect(typeof service.isFirefox()).toBe('boolean');
        expect(typeof service.isSafari()).toBe('boolean');
        expect(typeof service.isEdge()).toBe('boolean');
        expect(typeof service.isChromiumBased()).toBe('boolean');
    });
});
