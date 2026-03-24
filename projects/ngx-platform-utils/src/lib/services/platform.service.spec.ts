import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { PlatformService } from './platform.service';
import { setupJsdomMocks } from '../testing/jsdom-mocks';

describe('PlatformService', () => {
    beforeAll(() => setupJsdomMocks());

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(PlatformService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should expose all sub-services', () => {
        const service = setup();
        expect(service.device).toBeTruthy();
        expect(service.browser).toBeTruthy();
        expect(service.os).toBeTruthy();
        expect(service.network).toBeTruthy();
        expect(service.preferences).toBeTruthy();
        expect(service.capabilities).toBeTruthy();
        expect(service.visibility).toBeTruthy();
        expect(service.storage).toBeTruthy();
        expect(service.features).toBeTruthy();
        expect(service.mediaQuery).toBeTruthy();
    });

    it('should detect browser platform', () => {
        const service = setup('browser');
        expect(service.isBrowser).toBe(true);
        expect(service.isServer).toBe(false);
    });

    it('should detect server platform', () => {
        const service = setup('server');
        expect(service.isBrowser).toBe(false);
        expect(service.isServer).toBe(true);
    });
});
