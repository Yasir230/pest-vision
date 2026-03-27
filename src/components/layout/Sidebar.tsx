'use client';

import {
    LayoutDashboard,
    Bug,
    SprayCan,
    AlertTriangle,
    Settings,
    Leaf,
    Target,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Bug, label: 'Pest Analytics', active: false },
    { icon: SprayCan, label: 'Spray Logs', active: false },
    { icon: AlertTriangle, label: 'Alerts', active: false },
    { icon: Target, label: 'Traps', active: false },
    { icon: Settings, label: 'Settings', active: false },
];

const sdgBadges = [
    { number: 2, label: 'Zero Hunger', color: '#DDA63A' },
    { number: 9, label: 'Innovation', color: '#FD6925' },
    { number: 12, label: 'Responsible', color: '#BF8B2E' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.aside
            animate={{ width: collapsed ? 64 : 220 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="hidden lg:flex flex-col h-[calc(100vh-64px)] border-r border-[var(--color-border-glass)] bg-[rgba(5,10,24,0.6)] backdrop-blur-xl sticky top-16 overflow-hidden"
        >
            {/* Nav */}
            <nav className="flex-1 py-4 px-2 space-y-1">
                {navItems.map((item) => (
                    <div
                        key={item.label}
                        className={`sidebar-link ${item.active ? 'active' : ''}`}
                        title={collapsed ? item.label : undefined}
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="whitespace-nowrap overflow-hidden"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>

            {/* SDG Badges */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-t border-[var(--color-border-glass)] p-4"
                    >
                        <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 flex items-center gap-1.5">
                            <Leaf className="w-3 h-3" /> SDG Alignment
                        </p>
                        <div className="flex gap-2">
                            {sdgBadges.map((sdg) => (
                                <div
                                    key={sdg.number}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                                    style={{ background: sdg.color }}
                                    title={`SDG ${sdg.number}: ${sdg.label}`}
                                >
                                    {sdg.number}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center justify-center h-10 border-t border-[var(--color-border-glass)] text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
            >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </motion.aside>
    );
}
