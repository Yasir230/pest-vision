'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as echarts from 'echarts';
import { pestCountData } from '@/data/mockData';

export default function PestTrendChart() {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;
        const chart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(10, 20, 40, 0.9)',
                borderColor: 'rgba(0, 229, 255, 0.2)',
                textStyle: { color: '#e2e8f0', fontSize: 12 },
                axisPointer: {
                    type: 'cross',
                    crossStyle: { color: 'rgba(0, 229, 255, 0.3)' },
                    lineStyle: { color: 'rgba(0, 229, 255, 0.3)' },
                },
            },
            legend: {
                data: ['Brown Planthopper (BPH)', 'Beneficial Insects'],
                top: 5,
                textStyle: { color: '#94a3b8', fontSize: 11 },
                itemWidth: 12,
                itemHeight: 3,
            },
            grid: {
                top: 40,
                left: 10,
                right: 15,
                bottom: 10,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: pestCountData.map((d) => d.time),
                axisLine: { lineStyle: { color: 'rgba(100, 200, 255, 0.1)' } },
                axisLabel: { color: '#64748b', fontSize: 10 },
                axisTick: { show: false },
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisLabel: { color: '#64748b', fontSize: 10 },
                splitLine: { lineStyle: { color: 'rgba(100, 200, 255, 0.05)' } },
            },
            series: [
                {
                    name: 'Brown Planthopper (BPH)',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: { width: 2.5, color: '#ff3366' },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(255, 51, 102, 0.35)' },
                                { offset: 0.5, color: 'rgba(255, 51, 102, 0.1)' },
                                { offset: 1, color: 'rgba(255, 51, 102, 0)' },
                            ],
                        },
                    },
                    emphasis: {
                        lineStyle: { width: 3 },
                        focus: 'series',
                    },
                    data: pestCountData.map((d) => d.bph),
                    animationDuration: 2000,
                    animationEasing: 'cubicInOut',
                },
                {
                    name: 'Beneficial Insects',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: { width: 2.5, color: '#00ff88' },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(0, 255, 136, 0.25)' },
                                { offset: 0.5, color: 'rgba(0, 255, 136, 0.08)' },
                                { offset: 1, color: 'rgba(0, 255, 136, 0)' },
                            ],
                        },
                    },
                    emphasis: {
                        lineStyle: { width: 3 },
                        focus: 'series',
                    },
                    data: pestCountData.map((d) => d.beneficial),
                    animationDuration: 2000,
                    animationDelay: 300,
                    animationEasing: 'cubicInOut',
                },
            ],
            animationDuration: 2000,
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
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card gradient-border p-5"
        >
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] tracking-wide">
                    Pest Population Dynamics
                </h3>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
                    24H timeline
                </span>
            </div>
            <div ref={chartRef} className="w-full h-72" />
        </motion.div>
    );
}
