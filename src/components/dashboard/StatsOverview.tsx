'use client';

import { motion } from 'framer-motion';
import { Bug, Heart, SprayCan, Leaf, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { statsData } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
    bug: Bug,
    heart: Heart,
    'spray-can': SprayCan,
    leaf: Leaf,
};

const trendIconMap = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
};

export default function StatsOverview() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statsData.map((stat, index) => {
                const Icon = iconMap[stat.icon] || Bug;
                const TrendIcon = trendIconMap[stat.trend || 'stable'];
                const trendColor =
                    stat.trend === 'up'
                        ? stat.label === 'BPH Detected'
                            ? 'text-[var(--color-accent-red)]'
                            : 'text-[var(--color-accent-green)]'
                        : stat.trend === 'down'
                            ? stat.label === 'BPH Detected'
                                ? 'text-[var(--color-accent-green)]'
                                : 'text-[var(--color-accent-red)]'
                            : 'text-[var(--color-text-muted)]';

                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="glass-card gradient-border p-5 relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div
                            className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl"
                            style={{ background: stat.color }}
                        />

                        {/* Icon */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                        >
                            <Icon className="w-5 h-5" style={{ color: stat.color }} />
                        </div>

                        {/* Label */}
                        <p className="text-xs text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">
                            {stat.label}
                        </p>

                        {/* Value */}
                        <div className="flex items-baseline gap-2">
                            <motion.span
                                className="text-3xl font-bold"
                                style={{ color: stat.color }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                {typeof stat.value === 'number'
                                    ? stat.value.toLocaleString()
                                    : stat.value}
                            </motion.span>
                            {stat.unit && (
                                <span className="text-sm text-[var(--color-text-muted)]">{stat.unit}</span>
                            )}
                        </div>

                        {/* Trend */}
                        {stat.trendValue && (
                            <div className={`flex items-center gap-1 mt-2 text-xs ${trendColor}`}>
                                <TrendIcon className="w-3.5 h-3.5" />
                                <span>{stat.trendValue}</span>
                                <span className="text-[var(--color-text-muted)] ml-1">vs yesterday</span>
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
