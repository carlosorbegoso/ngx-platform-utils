import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import '../models/global-types';
import { ConnectionType, NetworkInfo } from '../models/network-info.model';

@Injectable({ providedIn: 'root' })
export class NetworkInfoService {

    private readonly platformId  = inject(PLATFORM_ID);
    private readonly destroyRef  = inject(DestroyRef);

    private readonly _networkInfo = signal<NetworkInfo>({
        online: true,
        type: 'unknown',
        downlink: null,
        rtt: null,
        saveData: false,
    });

    public readonly networkInfo = this._networkInfo.asReadonly();
    public readonly online      = computed(() => this._networkInfo().online);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.update();
            this.setupListeners();
        }
    }

    private update(): void {
        const conn = navigator.connection;
        const isOnline = navigator.onLine;

        this._networkInfo.set({
            online: isOnline,
            type: (conn?.effectiveType as ConnectionType) ?? 'unknown',
            downlink: conn?.downlink ?? null,
            rtt: conn?.rtt ?? null,
            saveData: conn?.saveData ?? false,
        });
    }

    private setupListeners(): void {
        const handler = () => this.update();

        window.addEventListener('online', handler);
        window.addEventListener('offline', handler);

        const conn = navigator.connection;
        conn?.addEventListener?.('change', handler);

        this.destroyRef.onDestroy(() => {
            window.removeEventListener('online', handler);
            window.removeEventListener('offline', handler);
            conn?.removeEventListener?.('change', handler);
        });
    }
}
