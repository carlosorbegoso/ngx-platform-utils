import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { NetworkInfoService } from './network-info.service';

describe('NetworkInfoService', () => {

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(NetworkInfoService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect network info on browser platform', () => {
        const service = setup();
        const info = service.networkInfo();
        expect(typeof info.online).toBe('boolean');
        expect(info.type).toBeDefined();
        expect(typeof info.saveData).toBe('boolean');
    });

    it('should expose online computed signal', () => {
        const service = setup();
        expect(typeof service.online()).toBe('boolean');
    });

    it('should return default values on server platform', () => {
        const service = setup('server');
        expect(service.online()).toBe(true);
        expect(service.networkInfo().type).toBe('unknown');
    });
});
