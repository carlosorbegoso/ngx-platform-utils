import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OsInfo, OsName } from '../models/os-info.model';

const MOBILE_OS: ReadonlySet<OsName> = new Set(['ios', 'android']);

@Injectable({ providedIn: 'root' })
export class OsDetectorService {

    private readonly platformId = inject(PLATFORM_ID);

    private readonly _osInfo = signal<OsInfo>({
        name: 'unknown',
        version: '',
        isMobile: false,
        isDesktop: true,
    });

    public readonly osInfo    = this._osInfo.asReadonly();
    public readonly name      = computed(() => this._osInfo().name);
    public readonly version   = computed(() => this._osInfo().version);
    public readonly isMobile  = computed(() => this._osInfo().isMobile);
    public readonly isDesktop = computed(() => this._osInfo().isDesktop);
    public readonly isIOS     = computed(() => this._osInfo().name === 'ios');
    public readonly isAndroid = computed(() => this._osInfo().name === 'android');
    public readonly isWindows = computed(() => this._osInfo().name === 'windows');
    public readonly isMacOS   = computed(() => this._osInfo().name === 'macos');
    public readonly isLinux   = computed(() => this._osInfo().name === 'linux');

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this._osInfo.set(this.detect());
        }
    }

    private detect(): OsInfo {
        const ua = navigator.userAgent;
        const { name, version } = this.parseOs(ua);
        const isMobile = MOBILE_OS.has(name);

        return { name, version, isMobile, isDesktop: !isMobile };
    }

    private parseOs(ua: string): { name: OsName; version: string } {
        if (/CrOS/.test(ua)) {
            const match = ua.match(/CrOS\s\S+\s([\d.]+)/);
            return { name: 'chromeos', version: match?.[1] ?? '' };
        }
        if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
            const match = ua.match(/OS (\d+[_.\d]*)/);
            return { name: 'ios', version: (match?.[1] ?? '').replace(/_/g, '.') };
        }
        if (/Android/.test(ua)) {
            const match = ua.match(/Android\s([\d.]+)/);
            return { name: 'android', version: match?.[1] ?? '' };
        }
        if (/Windows/.test(ua)) {
            const match = ua.match(/Windows NT ([\d.]+)/);
            return { name: 'windows', version: match?.[1] ?? '' };
        }
        if (/Mac OS X/.test(ua)) {
            const match = ua.match(/Mac OS X ([\d_]+)/);
            return { name: 'macos', version: (match?.[1] ?? '').replace(/_/g, '.') };
        }
        if (/Linux/.test(ua)) {
            return { name: 'linux', version: '' };
        }

        return { name: 'unknown', version: '' };
    }
}
