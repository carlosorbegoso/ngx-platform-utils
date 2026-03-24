import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ColorScheme, UserPreferences } from '../models/user-preferences.model';

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {

    private readonly platformId = inject(PLATFORM_ID);
    private readonly destroyRef = inject(DestroyRef);

    private readonly _preferences = signal<UserPreferences>({
        colorScheme: 'no-preference',
        reducedMotion: false,
        highContrast: false,
        reducedTransparency: false,
        forcedColors: false,
    });

    public readonly preferences        = this._preferences.asReadonly();
    public readonly colorScheme        = computed(() => this._preferences().colorScheme);
    public readonly isDarkMode         = computed(() => this._preferences().colorScheme === 'dark');
    public readonly isLightMode        = computed(() => this._preferences().colorScheme === 'light');
    public readonly reducedMotion      = computed(() => this._preferences().reducedMotion);
    public readonly highContrast       = computed(() => this._preferences().highContrast);
    public readonly reducedTransparency = computed(() => this._preferences().reducedTransparency);
    public readonly forcedColors       = computed(() => this._preferences().forcedColors);

    private readonly queries = new Map<string, MediaQueryList>();

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.update();
            this.setupListeners();
        }
    }

    private update(): void {
        this._preferences.set({
            colorScheme: this.getColorScheme(),
            reducedMotion: this.matches('(prefers-reduced-motion: reduce)'),
            highContrast: this.matches('(prefers-contrast: more)'),
            reducedTransparency: this.matches('(prefers-reduced-transparency: reduce)'),
            forcedColors: this.matches('(forced-colors: active)'),
        });
    }

    private getColorScheme(): ColorScheme {
        if (this.matches('(prefers-color-scheme: dark)'))  return 'dark';
        if (this.matches('(prefers-color-scheme: light)')) return 'light';
        return 'no-preference';
    }

    private matches(query: string): boolean {
        return window.matchMedia(query).matches;
    }

    private setupListeners(): void {
        const mediaQueries = [
            '(prefers-color-scheme: dark)',
            '(prefers-color-scheme: light)',
            '(prefers-reduced-motion: reduce)',
            '(prefers-contrast: more)',
            '(prefers-reduced-transparency: reduce)',
            '(forced-colors: active)',
        ];

        const handler = () => this.update();

        for (const query of mediaQueries) {
            const mql = window.matchMedia(query);
            mql.addEventListener('change', handler);
            this.queries.set(query, mql);
        }

        this.destroyRef.onDestroy(() => {
            for (const mql of this.queries.values()) {
                mql.removeEventListener('change', handler);
            }
            this.queries.clear();
        });
    }
}
