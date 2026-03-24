export interface NetworkConnection {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
    addEventListener?(type: string, listener: EventListener): void;
    removeEventListener?(type: string, listener: EventListener): void;
}

declare global {
    interface Navigator {
        connection?: NetworkConnection;
        deviceMemory?: number;
    }
}
