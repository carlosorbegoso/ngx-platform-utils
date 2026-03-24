import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import '../models/global-types';
import { DeviceCapabilities, GpuInfo } from '../models/device-capabilities.model';

@Injectable({ providedIn: 'root' })
export class DeviceCapabilitiesService {

    private readonly platformId = inject(PLATFORM_ID);

    private readonly _capabilities = signal<DeviceCapabilities>({
        memory: null,
        cpuCores: null,
        maxTouchPoints: 0,
        gpu: { vendor: null, renderer: null },
    });

    public readonly capabilities = this._capabilities.asReadonly();

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this._capabilities.set(this.detect());
        }
    }

    private detect(): DeviceCapabilities {
        return {
            memory: navigator.deviceMemory ?? null,
            cpuCores: navigator.hardwareConcurrency ?? null,
            maxTouchPoints: navigator.maxTouchPoints ?? 0,
            gpu: this.detectGpu(),
        };
    }

    private detectGpu(): GpuInfo {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
            if (!gl || !(gl instanceof WebGLRenderingContext)) return { vendor: null, renderer: null };

            const ext = gl.getExtension('WEBGL_debug_renderer_info');
            if (!ext) return { vendor: null, renderer: null };

            return {
                vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) as string,
                renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string,
            };
        } catch {
            return { vendor: null, renderer: null };
        }
    }
}
