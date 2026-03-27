'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { sprayLogs } from '@/data/mockData';

const statusConfig = {
    completed: { icon: CheckCircle2, class: 'badge-completed', label: 'Completed' },
    pending: { icon: Clock, class: 'badge-pending', label: 'Pending' },
    failed: { icon: XCircle, class: 'badge-failed', label: 'Failed' },
};

export default function SprayLogTable() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="glass-card gradient-border p-5"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] tracking-wide">
                    Precision Spray Logs
                </h3>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">
                    {sprayLogs.length} events today
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Time</th>
                            <th>Zone</th>
                            <th>Agent</th>
                            <th>Volume</th>
                            <th>Trigger</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sprayLogs.map((log, i) => {
                            const status = statusConfig[log.status];
                            const StatusIcon = status.icon;
                            return (
                                <motion.tr
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + i * 0.05 }}
                                >
                                    <td className="font-mono text-[var(--color-accent-cyan)] text-xs">
                                        {log.id}
                                    </td>
                                    <td className="font-mono text-xs">{log.timestamp.split(' ')[1]}</td>
                                    <td>{log.zone}</td>
                                    <td>
                                        <span className="text-[var(--color-accent-green)]">{log.sprayType}</span>
                                    </td>
                                    <td className="font-mono">{log.volumeMl} ml</td>
                                    <td className="text-xs">{log.trigger}</td>
                                    <td>
                                        <span className={`badge ${status.class}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {status.label}
                                        </span>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
