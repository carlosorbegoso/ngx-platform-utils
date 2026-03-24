export const BREAKPOINTS = {
    XS: 0,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
} as const;

export const DEVICE_BREAKPOINTS = {
    MOBILE_MAX: BREAKPOINTS.MD,
    TABLET_MAX: BREAKPOINTS.LG,
} as const;
