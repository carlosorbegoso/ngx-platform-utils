import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FeatureDetection } from '../models/feature-detection.model';

@Injectable({ providedIn: 'root' })
export class FeatureDetectionService {

    private readonly platformId = inject(PLATFORM_ID);

    private readonly _features = signal<FeatureDetection>({
        webGL: false,
        webGL2: false,
        webRTC: false,
        serviceWorker: false,
        webWorker: false,
        sharedWorker: false,
        webSocket: false,
        webAssembly: false,
        notifications: false,
        geolocation: false,
        bluetooth: false,
        usb: false,
        vibration: false,
        share: false,
        clipboard: false,
        speechRecognition: false,
        speechSynthesis: false,
        intersectionObserver: false,
        resizeObserver: false,
        mutationObserver: false,
    });

    public readonly features = this._features.asReadonly();

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this._features.set(this.detect());
        }
    }

    has(feature: keyof FeatureDetection): boolean {
        return this._features()[feature];
    }

    private detect(): FeatureDetection {
        const w = globalThis as unknown as Record<string, unknown>;
        const n = navigator as unknown as Record<string, unknown>;

        return {
            webGL: this.testWebGL('webgl'),
            webGL2: this.testWebGL('webgl2'),
            webRTC: 'RTCPeerConnection' in w,
            serviceWorker: 'serviceWorker' in n,
            webWorker: 'Worker' in w,
            sharedWorker: 'SharedWorker' in w,
            webSocket: 'WebSocket' in w,
            webAssembly: 'WebAssembly' in w,
            notifications: 'Notification' in w,
            geolocation: 'geolocation' in n,
            bluetooth: 'bluetooth' in n,
            usb: 'usb' in n,
            vibration: 'vibrate' in n,
            share: 'share' in n,
            clipboard: 'clipboard' in n,
            speechRecognition: 'SpeechRecognition' in w || 'webkitSpeechRecognition' in w,
            speechSynthesis: 'speechSynthesis' in w,
            intersectionObserver: 'IntersectionObserver' in w,
            resizeObserver: 'ResizeObserver' in w,
            mutationObserver: 'MutationObserver' in w,
        };
    }

    private testWebGL(context: string): boolean {
        try {
            const canvas = document.createElement('canvas');
            return !!canvas.getContext(context);
        } catch {
            return false;
        }
    }
}
