export type ColorScheme = 'dark' | 'light' | 'no-preference';

export interface UserPreferences {
    colorScheme: ColorScheme;
    reducedMotion: boolean;
    highContrast: boolean;
    reducedTransparency: boolean;
    forcedColors: boolean;
}
