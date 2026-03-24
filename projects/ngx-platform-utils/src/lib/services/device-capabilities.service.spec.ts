import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { DeviceCapabilitiesService } from './device-capabilities.service';

describe('DeviceCapabilitiesService', () => {

    function setup(platformId = 'browser') {
        TestBed.configureTestingModule({
            providers: [{ provide: PLATFORM_ID, useValue: platformId }],
        });
        return TestBed.inject(DeviceCapabilitiesService);
    }

    it('should be created', () => {
        expect(setup()).toBeTruthy();
    });

    it('should detect capabilities on browser platform', () => {
        const service = setup();
        const caps = service.capabilities();
        expect(typeof caps.maxTouchPoints).toBe('number');
        expect(caps.gpu).toBeDefined();
        expect(caps.gpu).toHaveProperty('vendor');
        expect(caps.gpu).toHaveProperty('renderer');
    });

    it('should return null defaults on server platform', () => {
        const service = setup('server');
        const caps = service.capabilities();
        expect(caps.memory).toBeNull();
        expect(caps.cpuCores).toBeNull();
        expect(caps.maxTouchPoints).toBe(0);
        expect(caps.gpu.vendor).toBeNull();
        expect(caps.gpu.renderer).toBeNull();
    });
});
