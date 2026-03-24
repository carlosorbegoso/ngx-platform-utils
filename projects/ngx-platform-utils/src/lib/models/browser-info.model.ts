export type BrowserName = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'samsung' | 'ie' | 'unknown';

export type BrowserEngine = 'blink' | 'gecko' | 'webkit' | 'trident' | 'unknown';

export interface BrowserInfo {
    name: BrowserName;
    version: string;
    majorVersion: number;
    engine: BrowserEngine;
    isChromiumBased: boolean;
}
