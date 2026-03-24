export interface DeviceInfo {
    type: 'mobile' | 'tablet' | 'desktop';
    orientation: 'portrait' | 'landscape';
    screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    isTouch: boolean;
    isRetina: boolean;
    pixelRatio: number;
}
