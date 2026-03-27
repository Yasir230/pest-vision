'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';
import { radarData } from '@/data/mockData';

export default function RadarOverview() {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });

        const option: echarts.EChartsOption = {
            radar: {
                indicator: radarData.map((d) => ({
                    name: d.name,
                    max: d.max,
                })),
                shape: 'polygon',
                splitNumber: 4,
                axisName: {
                    color: '#64748b',
                    fontSize: 10,
                },
                splitArea: {
                    areaStyle: {
                        color: [
                            'rgba(0, 229, 255, 0.02)',
                            'rgba(0, 229, 255, 0.04)',
                            'rgba(0, 229, 255, 0.02)',
                            'rgba(0, 229, 255, 0.04)',
                        ],
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(100, 200, 255, 0.08)',
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(100, 200, 255, 0.1)',
                    },
                },
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: radarData.map((d) => d.value),
                            name: 'Field Status',
                            lineStyle: {
                                color: '#00e5ff',
                                width: 2,
                            },
                            areaStyle: {
                                color: {
                                    type: 'radial',
                                    x: 0.5, y: 0.5, r: 0.5,
                                    colorStops: [
                                        { offset: 0, color: 'rgba(0, 229, 255, 0.4)' },
                                        { offset: 1, color: 'rgba(0, 229, 255, 0.05)' },
                                    ],
                                },
                            },
                            symbol: 'circle',
                            symbolSize: 6,
                            itemStyle: {
                                color: '#00e5ff',
                                borderColor: '#050a18',
                                borderWidth: 2,
                                shadowColor: 'rgba(0, 229, 255, 0.5)',
                                shadowBlur: 10,
                            },
                        },
                    ],
                    animationDuration: 1500,
                    animationEasing: 'elasticOut',
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
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="glass-card gradient-border p-5"
        >
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] tracking-wide">
                    Field Status Radar
                </h3>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
                    Multi-sensor
                </span>
            </div>
            <div ref={chartRef} className="w-full h-72" />
        </motion.div>
    );
}
