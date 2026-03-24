import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { StorageAvailabilityService } from './storage-availability.service';

describe('StorageAvailabilityService', () => {

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(StorageAvailabilityService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect storage availability on browser platform', () => {
        const service = setup();
        const avail = service.availability();
        expect(typeof avail.localStorage).toBe('boolean');
        expect(typeof avail.sessionStorage).toBe('boolean');
        expect(typeof avail.cookies).toBe('boolean');
        expect(typeof avail.indexedDB).toBe('boolean');
    });

    it('should return all false on server platform', () => {
        const service = setup('server');
        const avail = service.availability();
        expect(avail.localStorage).toBe(false);
        expect(avail.sessionStorage).toBe(false);
        expect(avail.cookies).toBe(false);
        expect(avail.indexedDB).toBe(false);
    });
});
