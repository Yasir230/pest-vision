import { TelemetryData, PestCount, SprayLog, Alert, StatsData } from '@/types';

export const telemetryData: TelemetryData[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0') + ':00';
    const baseTemp = 27 + Math.sin(i * 0.3) * 4 + (Math.random() - 0.5) * 2;
    const baseHumid = 78 + Math.cos(i * 0.25) * 12 + (Math.random() - 0.5) * 5;
    const lightBase = i >= 6 && i <= 18 ? 600 + Math.sin((i - 6) / 12 * Math.PI) * 400 : 10 + Math.random() * 30;
    return {
        time: hour,
        temperature: Math.round(baseTemp * 10) / 10,
        humidity: Math.round(Math.min(98, Math.max(60, baseHumid)) * 10) / 10,
        lightIntensity: Math.round(lightBase),
    };
});

export const pestCountData: PestCount[] = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0') + ':00';
    const nightBoost = (i >= 19 || i <= 5) ? 2.5 : 1;
    const bph = Math.round((15 + Math.sin(i * 0.5) * 12 + Math.random() * 8) * nightBoost);
    const beneficial = Math.round(8 + Math.cos(i * 0.4) * 5 + Math.random() * 4);
    return { time: hour, bph: Math.max(0, bph), beneficial: Math.max(2, beneficial) };
});

export const sprayLogs: SprayLog[] = [
    { id: 'SPR-001', timestamp: '2026-03-27 19:32', zone: 'Plot A7-North', sprayType: 'Metarhizium', volumeMl: 450, trigger: 'BPH Threshold (>40)', status: 'completed' },
    { id: 'SPR-002', timestamp: '2026-03-27 20:15', zone: 'Plot A7-East', sprayType: 'Beauveria', volumeMl: 320, trigger: 'BPH Threshold (>35)', status: 'completed' },
    { id: 'SPR-003', timestamp: '2026-03-27 21:05', zone: 'Plot A7-South', sprayType: 'Metarhizium', volumeMl: 500, trigger: 'BPH Cluster Detected', status: 'completed' },
    { id: 'SPR-004', timestamp: '2026-03-27 21:48', zone: 'Plot A7-West', sprayType: 'Neem Extract', volumeMl: 280, trigger: 'Preventive Cycle', status: 'completed' },
    { id: 'SPR-005', timestamp: '2026-03-27 22:10', zone: 'Plot A7-Center', sprayType: 'Beauveria', volumeMl: 410, trigger: 'BPH Threshold (>45)', status: 'pending' },
    { id: 'SPR-006', timestamp: '2026-03-27 22:35', zone: 'Plot B2-North', sprayType: 'Metarhizium', volumeMl: 360, trigger: 'AI Recommendation', status: 'pending' },
];

export const alerts: Alert[] = [
    {
        id: 'ALT-001',
        severity: 'critical',
        title: 'Vulnerability Window Detected',
        message: 'Temperature exceeded 32°C with humidity >85%. High BPH activity expected in Plot A7-North within 2 hours.',
        timestamp: '2026-03-27 21:45',
        isActive: true,
    },
    {
        id: 'ALT-002',
        severity: 'warning',
        title: 'BPH Population Surge',
        message: 'BPH count in Plot A7-East increased 180% in the last 3 hours. Automated spray cycle initiated.',
        timestamp: '2026-03-27 20:30',
        isActive: true,
    },
    {
        id: 'ALT-003',
        severity: 'warning',
        title: 'Light Trap Anomaly',
        message: 'Trap #3 in Plot A7-South showing reduced capture rate. Sensor calibration recommended.',
        timestamp: '2026-03-27 19:15',
        isActive: true,
    },
    {
        id: 'ALT-004',
        severity: 'info',
        title: 'Beneficial Insect Activity',
        message: 'Spider population in Plot B2 increased 25%. Natural predation contributing to BPH suppression.',
        timestamp: '2026-03-27 18:00',
        isActive: false,
    },
];

export const statsData: StatsData[] = [
    { label: 'BPH Detected', value: 1247, unit: 'today', trend: 'down', trendValue: '-12.3%', icon: 'bug', color: '#ff3366' },
    { label: 'Beneficial Preserved', value: 892, unit: 'insects', trend: 'up', trendValue: '+8.5%', icon: 'heart', color: '#00ff88' },
    { label: 'Spray Events', value: 6, unit: 'today', trend: 'stable', trendValue: '0%', icon: 'spray-can', color: '#00e5ff' },
    { label: 'Pesticide Reduction', value: '91.67', unit: '%', trend: 'up', trendValue: '+2.1%', icon: 'leaf', color: '#a855f7' },
];

export const currentTelemetry = {
    temperature: 31.2,
    humidity: 87.4,
    lightIntensity: 12,
};

export const radarData = [
    { name: 'Temperature', value: 78, max: 100 },
    { name: 'Humidity', value: 87, max: 100 },
    { name: 'BPH Activity', value: 65, max: 100 },
    { name: 'Trap Efficiency', value: 92, max: 100 },
    { name: 'Spray Coverage', value: 85, max: 100 },
    { name: 'Beneficial Ratio', value: 71, max: 100 },
];
