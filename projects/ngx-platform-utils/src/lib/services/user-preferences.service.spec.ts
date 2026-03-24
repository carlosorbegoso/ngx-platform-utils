import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { UserPreferencesService } from './user-preferences.service';
import { setupJsdomMocks } from '../testing/jsdom-mocks';

describe('UserPreferencesService', () => {
    beforeAll(() => setupJsdomMocks());

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(UserPreferencesService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect user preferences on browser platform', () => {
        const service = setup();
        const prefs = service.preferences();
        expect(['dark', 'light', 'no-preference']).toContain(prefs.colorScheme);
        expect(typeof prefs.reducedMotion).toBe('boolean');
        expect(typeof prefs.highContrast).toBe('boolean');
        expect(typeof prefs.reducedTransparency).toBe('boolean');
        expect(typeof prefs.forcedColors).toBe('boolean');
    });

    it('should expose computed shortcuts', () => {
        const service = setup();
        expect(typeof service.isDarkMode()).toBe('boolean');
        expect(typeof service.isLightMode()).toBe('boolean');
        expect(typeof service.reducedMotion()).toBe('boolean');
        expect(typeof service.highContrast()).toBe('boolean');
    });

    it('should return defaults on server platform', () => {
        const service = setup('server');
        expect(service.colorScheme()).toBe('no-preference');
        expect(service.isDarkMode()).toBe(false);
        expect(service.reducedMotion()).toBe(false);
    });
});
