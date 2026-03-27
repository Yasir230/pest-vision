'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';
import { alerts } from '@/data/mockData';

const severityConfig = {
    critical: {
        icon: AlertTriangle,
        bg: 'rgba(255, 51, 102, 0.08)',
        border: 'rgba(255, 51, 102, 0.25)',
        color: 'var(--color-accent-red)',
        glow: 'glow-red',
        label: 'CRITICAL',
    },
    warning: {
        icon: AlertCircle,
        bg: 'rgba(255, 170, 0, 0.08)',
        border: 'rgba(255, 170, 0, 0.25)',
        color: 'var(--color-accent-amber)',
        glow: 'glow-amber',
        label: 'WARNING',
    },
    info: {
        icon: Info,
        bg: 'rgba(0, 229, 255, 0.06)',
        border: 'rgba(0, 229, 255, 0.2)',
        color: 'var(--color-accent-cyan)',
        glow: 'glow-cyan',
        label: 'INFO',
    },
};

export default function AlertPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="glass-card gradient-border p-5"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] tracking-wide">
                    Early Warning System
                </h3>
                <span className="text-[10px] bg-[rgba(255,51,102,0.15)] text-[var(--color-accent-red)] px-2.5 py-1 rounded-full font-semibold">
                    {alerts.filter((a) => a.isActive).length} ACTIVE
                </span>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {alerts.map((alert, i) => {
                    const config = severityConfig[alert.severity];
                    const Icon = config.icon;
                    return (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            className={`p-3.5 rounded-xl border transition-all duration-300 ${alert.isActive ? 'hover:scale-[1.01]' : 'opacity-50'
                                }`}
                            style={{
                                background: config.bg,
                                borderColor: config.border,
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className="mt-0.5 p-1.5 rounded-lg shrink-0"
                                    style={{ background: `${config.border}` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: config.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className="text-[10px] font-bold tracking-wider"
                                            style={{ color: config.color }}
                                        >
                                            {config.label}
                                        </span>
                                        {alert.isActive && (
                                            <span
                                                className="w-1.5 h-1.5 rounded-full pulse-dot"
                                                style={{ background: config.color, color: config.color }}
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                                        {alert.title}
                                    </p>
                                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                        {alert.message}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[var(--color-text-muted)]">
                                        <Clock className="w-3 h-3" />
                                        <span>{alert.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
