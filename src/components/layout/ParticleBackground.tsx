'use client';

import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
    hue: number;
}

export default function ParticleBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.3 + 0.05,
            speedX: (Math.random() - 0.5) * 0.02,
            speedY: (Math.random() - 0.5) * 0.02,
            hue: Math.random() > 0.5 ? 185 : 155,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 grid-bg opacity-50" />

            {/* Particles */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity,
                        background: `hsl(${p.hue}, 100%, 70%)`,
                        boxShadow: `0 0 ${p.size * 3}px hsl(${p.hue}, 100%, 70%)`,
                        animation: `float-${p.id % 5} ${20 + Math.random() * 30}s ease-in-out infinite`,
                    }}
                />
            ))}

            {/* Ambient Glow Orbs */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
                style={{
                    background: 'radial-gradient(circle, var(--color-accent-cyan) 0%, transparent 70%)',
                    top: '10%',
                    right: '10%',
                    animation: 'pulse-glow 8s ease-in-out infinite',
                }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-[0.02]"
                style={{
                    background: 'radial-gradient(circle, var(--color-accent-purple) 0%, transparent 70%)',
                    bottom: '20%',
                    left: '5%',
                    animation: 'pulse-glow 12s ease-in-out infinite reverse',
                }}
            />

            <style jsx>{`
        @keyframes float-0 { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(30px, -20px); } 50% { transform: translate(-20px, 30px); } 75% { transform: translate(20px, 20px); } }
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(-25px, 25px); } 66% { transform: translate(25px, -15px); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -30px); } }
        @keyframes float-3 { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(-15px, -20px); } 75% { transform: translate(15px, 25px); } }
        @keyframes float-4 { 0%, 100% { transform: translate(0, 0); } 40% { transform: translate(25px, 15px); } 80% { transform: translate(-20px, -25px); } }
      `}</style>
        </div>
    );
}
