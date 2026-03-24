export interface DeviceCapabilities {
    memory: number | null;
    cpuCores: number | null;
    maxTouchPoints: number;
    gpu: GpuInfo;
}

export interface GpuInfo {
    vendor: string | null;
    renderer: string | null;
}
