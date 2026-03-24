export type ConnectionType = '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';

export interface NetworkInfo {
    online: boolean;
    type: ConnectionType;
    downlink: number | null;
    rtt: number | null;
    saveData: boolean;
}

