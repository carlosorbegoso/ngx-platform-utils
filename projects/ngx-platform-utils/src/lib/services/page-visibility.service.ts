import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VisibilityState } from '../models/page-visibility.model';

@Injectable({ providedIn: 'root' })
export class PageVisibilityService {

    private readonly platformId = inject(PLATFORM_ID);
    private readonly destroyRef = inject(DestroyRef);

    private readonly _state = signal<VisibilityState>('visible');

    public readonly state     = this._state.asReadonly();
    public readonly isVisible = computed(() => this._state() === 'visible');
    public readonly isHidden  = computed(() => this._state() === 'hidden');

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.update();
            this.setupListener();
        }
    }

    private update(): void {
        this._state.set(document.visibilityState as VisibilityState);
    }

    private setupListener(): void {
        const handler = () => this.update();
        document.addEventListener('visibilitychange', handler);
        this.destroyRef.onDestroy(() => document.removeEventListener('visibilitychange', handler));
    }
}
