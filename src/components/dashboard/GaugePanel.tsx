'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';
import { currentTelemetry } from '@/data/mockData';

interface GaugeConfig {
    title: string;
    value: number;
    min: number;
    max: number;
    unit: string;
    color: string;
    thresholds?: { value: number; color: string }[];
}

const gauges: GaugeConfig[] = [
    {
        title: 'Temperature',
        value: currentTelemetry.temperature,
        min: 20,
        max: 45,
        unit: '°C',
        color: '#ff3366',
        thresholds: [
            { value: 30, color: '#ffaa00' },
            { value: 35, color: '#ff3366' },
        ],
    },
    {
        title: 'Humidity',
        value: currentTelemetry.humidity,
        min: 40,
        max: 100,
        unit: '%',
        color: '#00e5ff',
        thresholds: [
            { value: 85, color: '#ffaa00' },
            { value: 95, color: '#ff3366' },
        ],
    },
    {
        title: 'Light Intensity',
        value: currentTelemetry.lightIntensity,
        min: 0,
        max: 1000,
        unit: 'lux',
        color: '#a855f7',
    },
];

function GaugeMeter({ config, delay }: { config: GaugeConfig; delay: number }) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });

        const isWarning =
            config.thresholds && config.value >= config.thresholds[0].value;
        const isCritical =
            config.thresholds &&
            config.thresholds[1] &&
            config.value >= config.thresholds[1].value;

        const activeColor = isCritical
            ? '#ff3366'
            : isWarning
                ? '#ffaa00'
                : config.color;

        const option: echarts.EChartsOption = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 220,
                    endAngle: -40,
                    min: config.min,
                    max: config.max,
                    radius: '90%',
                    progress: {
                        show: true,
                        width: 14,
                        roundCap: true,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 1, y2: 0,
                                colorStops: [
                                    { offset: 0, color: `${activeColor}88` },
                                    { offset: 1, color: activeColor },
                                ],
                            },
                            shadowColor: `${activeColor}40`,
                            shadowBlur: 15,
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            width: 14,
                            color: [[1, 'rgba(100, 200, 255, 0.08)']],
                        },
                        roundCap: true,
                    },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    pointer: { show: false },
                    anchor: { show: false },
                    title: { show: false },
                    detail: {
                        valueAnimation: true,
                        fontSize: 28,
                        fontWeight: 700,
                        fontFamily: 'Inter, sans-serif',
                        color: activeColor,
                        offsetCenter: [0, '0%'],
                        formatter: `{value}${config.unit}`,
                    },
                    data: [{ value: config.value }],
                },
            ],
        };

        chart.setOption(option);

        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.dispose();
        };
    }, [config]);

    const isWarning =
        config.thresholds && config.value >= config.thresholds[0].value;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="glass-card gradient-border p-4 flex flex-col items-center"
        >
            <div ref={chartRef} className="w-full h-40" />
            <p className="text-sm text-[var(--color-text-secondary)] -mt-2">{config.title}</p>
            {isWarning && (
                <span className="text-[10px] bg-[rgba(255,170,0,0.15)] text-[var(--color-accent-amber)] px-2 py-0.5 rounded-full mt-1 font-semibold">
                    ⚠ ABOVE THRESHOLD
                </span>
            )}
        </motion.div>
    );
}

export default function GaugePanel() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gauges.map((g, i) => (
                <GaugeMeter key={g.title} config={g} delay={0.2 + i * 0.15} />
            ))}
        </div>
    );
}
