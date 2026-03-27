export interface TelemetryData {
    time: string;
    temperature: number;
    humidity: number;
    lightIntensity: number;
}

export interface PestCount {
    time: string;
    bph: number;
    beneficial: number;
}

export interface SprayLog {
    id: string;
    timestamp: string;
    zone: string;
    sprayType: string;
    volumeMl: number;
    trigger: string;
    status: 'completed' | 'pending' | 'failed';
}

export interface Alert {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: string;
    isActive: boolean;
}

export interface StatsData {
    label: string;
    value: number | string;
    unit?: string;
    trend?: 'up' | 'down' | 'stable';
    trendValue?: string;
    icon: string;
    color: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}
