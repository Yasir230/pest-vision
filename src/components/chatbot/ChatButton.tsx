'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
    onClick: () => void;
    isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
    if (isOpen) return null;

    return (
        <motion.button
            onClick={onClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            style={{
                background: 'linear-gradient(135deg, #00e5ff, #0088cc)',
                boxShadow: '0 0 30px rgba(0, 229, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
        >
            <MessageCircle className="w-6 h-6 text-white" />

            {/* Pulse ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--color-accent-cyan)]"
                animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                }}
            />
        </motion.button>
    );
}
