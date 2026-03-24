import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_CONFIG } from '../models/platform-config.model';

@Injectable({ providedIn: 'root' })
export class ScreenMediaQueryService {

    private readonly platformId  = inject(PLATFORM_ID);
    private readonly destroyRef  = inject(DestroyRef);
    private readonly config      = inject(PLATFORM_CONFIG);
    private readonly activeQueries = new Map<string, { signal: ReturnType<typeof signal<boolean>>; mql: MediaQueryList }>();

    readonly minWidth = (breakpoint: keyof typeof this.config.breakpoints) => {
        const px = this.config.breakpoints[breakpoint];
        return this.matchMedia(`(min-width: ${px}px)`);
    };

    readonly maxWidth = (breakpoint: keyof typeof this.config.breakpoints) => {
        const px = this.config.breakpoints[breakpoint] - 1;
        return this.matchMedia(`(max-width: ${px}px)`);
    };

    readonly between = (min: keyof typeof this.config.breakpoints, max: keyof typeof this.config.breakpoints) => {
        const minPx = this.config.breakpoints[min];
        const maxPx = this.config.breakpoints[max] - 1;
        return this.matchMedia(`(min-width: ${minPx}px) and (max-width: ${maxPx}px)`);
    };

    matchMedia(query: string) {
        const existing = this.activeQueries.get(query);
        if (existing) return existing.signal.asReadonly();

        if (!isPlatformBrowser(this.platformId)) {
            const fallback = signal(false);
            return fallback.asReadonly();
        }

        const mql = window.matchMedia(query);
        const matches = signal(mql.matches);

        const handler = (e: MediaQueryListEvent) => matches.set(e.matches);
        mql.addEventListener('change', handler);

        this.activeQueries.set(query, { signal: matches, mql });

        this.destroyRef.onDestroy(() => {
            mql.removeEventListener('change', handler);
            this.activeQueries.delete(query);
        });

        return matches.asReadonly();
    }
}
