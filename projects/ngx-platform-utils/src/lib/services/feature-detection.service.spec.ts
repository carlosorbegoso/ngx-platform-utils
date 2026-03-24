import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { FeatureDetectionService } from './feature-detection.service';

describe('FeatureDetectionService', () => {

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(FeatureDetectionService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect features on browser platform', () => {
        const service = setup();
        const features = service.features();
        expect(typeof features.webGL).toBe('boolean');
        expect(typeof features.serviceWorker).toBe('boolean');
        expect(typeof features.webSocket).toBe('boolean');
        expect(typeof features.webAssembly).toBe('boolean');
        expect(typeof features.intersectionObserver).toBe('boolean');
        expect(typeof features.resizeObserver).toBe('boolean');
    });

    it('should support has() method', () => {
        const service = setup();
        expect(typeof service.has('webGL')).toBe('boolean');
        expect(typeof service.has('serviceWorker')).toBe('boolean');
        expect(typeof service.has('webSocket')).toBe('boolean');
    });

    it('should return all false on server platform', () => {
        const service = setup('server');
        const features = service.features();
        const allFalse = Object.values(features).every(v => v === false);
        expect(allFalse).toBe(true);
    });
});
