import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrowserEngine, BrowserInfo, BrowserName } from '../models/browser-info.model';

@Injectable({ providedIn: 'root' })
export class BrowserDetectorService {

    private readonly platformId = inject(PLATFORM_ID);

    private readonly _browserInfo = signal<BrowserInfo>({
        name: 'unknown',
        version: '',
        majorVersion: 0,
        engine: 'unknown',
        isChromiumBased: false,
    });

    public readonly browserInfo     = this._browserInfo.asReadonly();
    public readonly name            = computed(() => this._browserInfo().name);
    public readonly version         = computed(() => this._browserInfo().version);
    public readonly engine          = computed(() => this._browserInfo().engine);
    public readonly isChrome        = computed(() => this._browserInfo().name === 'chrome');
    public readonly isFirefox       = computed(() => this._browserInfo().name === 'firefox');
    public readonly isSafari        = computed(() => this._browserInfo().name === 'safari');
    public readonly isEdge          = computed(() => this._browserInfo().name === 'edge');
    public readonly isChromiumBased = computed(() => this._browserInfo().isChromiumBased);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this._browserInfo.set(this.detect());
        }
    }

    private detect(): BrowserInfo {
        const ua = navigator.userAgent;
        const { name, version } = this.parseBrowser(ua);
        const engine = this.detectEngine(ua);
        const majorVersion = parseInt(version.split('.')[0], 10) || 0;

        return { name, version, majorVersion, engine, isChromiumBased: engine === 'blink' };
    }

    private parseBrowser(ua: string): { name: BrowserName; version: string } {
        const tests: { name: BrowserName; regex: RegExp }[] = [
            { name: 'edge',    regex: /Edg(?:e|A|iOS)?\/(\S+)/ },
            { name: 'opera',   regex: /OPR\/(\S+)/ },
            { name: 'samsung', regex: /SamsungBrowser\/(\S+)/ },
            { name: 'chrome',  regex: /Chrome\/(\S+)/ },
            { name: 'firefox', regex: /Firefox\/(\S+)/ },
            { name: 'safari',  regex: /Version\/(\S+).*Safari/ },
            { name: 'ie',      regex: /(?:MSIE |Trident.*rv:)(\S+)/ },
        ];

        for (const { name, regex } of tests) {
            const match = ua.match(regex);
            if (match) return { name, version: match[1] };
        }

        return { name: 'unknown', version: '' };
    }

    private detectEngine(ua: string): BrowserEngine {
        if (ua.includes('Trident')) return 'trident';
        if (ua.includes('Firefox')) return 'gecko';
        if (ua.includes('AppleWebKit')) {
            return ua.includes('Chrome') ? 'blink' : 'webkit';
        }
        return 'unknown';
    }
}
