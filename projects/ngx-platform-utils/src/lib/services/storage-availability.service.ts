import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StorageAvailability } from '../models/storage-availability.model';

@Injectable({ providedIn: 'root' })
export class StorageAvailabilityService {

    private readonly platformId = inject(PLATFORM_ID);

    private readonly _availability = signal<StorageAvailability>({
        localStorage: false,
        sessionStorage: false,
        cookies: false,
        indexedDB: false,
    });

    public readonly availability  = this._availability.asReadonly();

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this._availability.set({
                localStorage: this.testStorage('localStorage'),
                sessionStorage: this.testStorage('sessionStorage'),
                cookies: this.testCookies(),
                indexedDB: this.testIndexedDB(),
            });
        }
    }

    private testStorage(type: 'localStorage' | 'sessionStorage'): boolean {
        try {
            const storage = window[type];
            const key = '__ngx_platform_test__';
            storage.setItem(key, 'test');
            storage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    private testCookies(): boolean {
        try {
            document.cookie = '__ngx_platform_test__=1;SameSite=Strict';
            const result = document.cookie.includes('__ngx_platform_test__');
            document.cookie = '__ngx_platform_test__=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Strict';
            return result;
        } catch {
            return false;
        }
    }

    private testIndexedDB(): boolean {
        return typeof indexedDB !== 'undefined';
    }
}
