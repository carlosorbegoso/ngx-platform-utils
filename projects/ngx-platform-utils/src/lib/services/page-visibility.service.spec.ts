import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { PageVisibilityService } from './page-visibility.service';

describe('PageVisibilityService', () => {

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(PageVisibilityService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect visibility on browser platform', () => {
        const service = setup();
        expect(['visible', 'hidden']).toContain(service.state());
        expect(typeof service.isVisible()).toBe('boolean');
        expect(typeof service.isHidden()).toBe('boolean');
    });

    it('should have consistent state', () => {
        const service = setup();
        expect(service.isVisible()).not.toBe(service.isHidden());
    });

    it('should default to visible on server platform', () => {
        const service = setup('server');
        expect(service.state()).toBe('visible');
        expect(service.isVisible()).toBe(true);
        expect(service.isHidden()).toBe(false);
    });
});
