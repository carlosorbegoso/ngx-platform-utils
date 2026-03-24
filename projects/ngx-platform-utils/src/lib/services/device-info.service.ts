import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DeviceInfo } from '../models/device-info.model';
import { PLATFORM_CONFIG } from '../models/platform-config.model';

@Injectable({ providedIn: 'root' })
export class DeviceInfoService {

    private readonly platformId = inject(PLATFORM_ID);
    private readonly destroyRef = inject(DestroyRef);
    private readonly config     = inject(PLATFORM_CONFIG);

    private readonly _deviceInfo = signal<DeviceInfo>({
        type: 'desktop',
        orientation: 'landscape',
        screenSize: 'lg',
        isTouch: false,
        isRetina: false,
        pixelRatio: 1,
    });

    public readonly deviceInfo    = this._deviceInfo.asReadonly();
    public readonly isMobile      = computed(() => this._deviceInfo().type === 'mobile');
    public readonly isTablet      = computed(() => this._deviceInfo().type === 'tablet');
    public readonly isDesktop     = computed(() => this._deviceInfo().type === 'desktop');
    public readonly isSmallScreen = computed(() => this._deviceInfo().type !== 'desktop');
    public readonly isPortrait    = computed(() => this._deviceInfo().orientation === 'portrait');
    public readonly isLandscape   = computed(() => this._deviceInfo().orientation === 'landscape');
    public readonly screenSize    = computed(() => this._deviceInfo().screenSize);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.update();
            this.setupResizeListener();
            this.setupOrientationListener();
        }
    }

    private setupResizeListener(): void {
        const observer = new ResizeObserver(() => this.update());
        observer.observe(document.documentElement);
        this.destroyRef.onDestroy(() => observer.disconnect());
    }

    private setupOrientationListener(): void {
        if (!('orientation' in globalThis)) return;

        const handler = () => setTimeout(() => this.update(), 100);
        globalThis.addEventListener('orientationchange', handler);
        this.destroyRef.onDestroy(() =>
            globalThis.removeEventListener('orientationchange', handler)
        );
    }

    private update(): void {
        const width  = window.innerWidth;
        const height = window.innerHeight;

        this._deviceInfo.set({
            type: this.getDeviceType(width),
            orientation: width > height ? 'landscape' : 'portrait',
            screenSize: this.getScreenSize(width),
            isTouch: this.detectTouch(),
            isRetina: this.detectRetina(),
            pixelRatio: window.devicePixelRatio ?? 1,
        });
    }

    private detectTouch(): boolean {
        return 'ontouchstart' in globalThis || navigator.maxTouchPoints > 0;
    }

    private detectRetina(): boolean {
        return (window.devicePixelRatio ?? 1) > 1;
    }

    private getDeviceType(width: number): 'mobile' | 'tablet' | 'desktop' {
        if (width < this.config.deviceBreakpoints.MOBILE_MAX) return 'mobile';
        if (width < this.config.deviceBreakpoints.TABLET_MAX) return 'tablet';
        return 'desktop';
    }

    private getScreenSize(width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
        const bp = this.config.breakpoints;
        if (width < bp.SM)  return 'xs';
        if (width < bp.MD)  return 'sm';
        if (width < bp.LG)  return 'md';
        if (width < bp.XL)  return 'lg';
        if (width < bp.XXL) return 'xl';
        return '2xl';
    }
}
