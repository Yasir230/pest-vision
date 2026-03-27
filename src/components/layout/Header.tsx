'use client';

import { useState, useEffect } from 'react';
import { Shield, Radio, MapPin, Clock } from 'lucide-react';

export default function Header() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            const timeStr = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            setTime(`${dateStr} • ${timeStr}`);
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border-glass)] bg-[rgba(5,10,24,0.8)] backdrop-blur-xl sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Shield className="w-8 h-8 text-[var(--color-accent-cyan)]" />
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[var(--color-accent-green)] rounded-full pulse-dot" />
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-wide">
                        <span className="text-[var(--color-accent-cyan)]">PEST</span>
                        <span className="text-[var(--color-text-primary)]">-VISION</span>
                    </h1>
                    <p className="text-[10px] text-[var(--color-text-muted)] -mt-1 tracking-[0.15em] uppercase">
                        Command Center v2.0
                    </p>
                </div>
            </div>

            {/* Center — Status */}
            <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <Radio className="w-3.5 h-3.5 text-[var(--color-accent-green)]" />
                    <span className="text-[var(--color-accent-green)] font-semibold">SYSTEM ONLINE</span>
                </div>
                <div className="w-px h-4 bg-[var(--color-border-glass)]" />
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Subang, West Java — Plot A7</span>
                </div>
            </div>

            {/* Right — Clock */}
            <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span className="font-mono text-[var(--color-accent-cyan)] tracking-wider">{time}</span>
            </div>
        </header>
    );
}
