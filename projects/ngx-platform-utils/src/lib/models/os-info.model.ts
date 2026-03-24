export type OsName = 'windows' | 'macos' | 'linux' | 'ios' | 'android' | 'chromeos' | 'unknown';

export interface OsInfo {
    name: OsName;
    version: string;
    isMobile: boolean;
    isDesktop: boolean;
}
