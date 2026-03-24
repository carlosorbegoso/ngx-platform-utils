import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ScreenMediaQueryService } from './screen-media-query.service';
import { setupJsdomMocks } from '../testing/jsdom-mocks';

describe('ScreenMediaQueryService', () => {
    beforeAll(() => setupJsdomMocks());

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(ScreenMediaQueryService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should return a readonly signal from matchMedia', () => {
        const service = setup();
        const result = service.matchMedia('(min-width: 768px)');
        expect(typeof result()).toBe('boolean');
    });

    it('should cache the same query', () => {
        const service = setup();
        const a = service.matchMedia('(min-width: 1024px)');
        const b = service.matchMedia('(min-width: 1024px)');
        expect(a).toBe(b);
    });

    it('should support minWidth shortcut', () => {
        const service = setup();
        const result = service.minWidth('MD');
        expect(typeof result()).toBe('boolean');
    });

    it('should support maxWidth shortcut', () => {
        const service = setup();
        const result = service.maxWidth('LG');
        expect(typeof result()).toBe('boolean');
    });

    it('should support between shortcut', () => {
        const service = setup();
        const result = service.between('SM', 'LG');
        expect(typeof result()).toBe('boolean');
    });

    it('should return false signal on server platform', () => {
        const service = setup('server');
        const result = service.matchMedia('(min-width: 768px)');
        expect(result()).toBe(false);
    });
});
