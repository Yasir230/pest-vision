'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types';
import ChatMessage from './ChatMessage';

interface ChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
    messages: ChatMessageType[];
    isLoading: boolean;
    onSendMessage: (text: string) => void;
    onClearChat: () => void;
}

const suggestedQuestions = [
    'Apa itu wereng cokelat (BPH)?',
    'Bagaimana cara kerja light trap?',
    'Kapan vulnerability window terjadi?',
    'Apa itu Metarhizium anisopliae?',
];

export default function ChatPanel({
    isOpen,
    onClose,
    messages,
    isLoading,
    onSendMessage,
    onClearChat,
}: ChatPanelProps) {
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSend = () => {
        if (!inputText.trim() || isLoading) return;
        onSendMessage(inputText.trim());
        setInputText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[420px] h-[85vh] sm:h-[600px] sm:rounded-2xl overflow-hidden flex flex-col chat-panel"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(0,229,255,0.1)]">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-[rgba(0,255,136,0.15)] border border-[rgba(0,255,136,0.3)] flex items-center justify-center">
                                    <Sparkles className="w-4.5 h-4.5 text-[var(--color-accent-green)]" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--color-accent-green)] rounded-full border-2 border-[#080f23]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                                    Sasya AI 🌾
                                </h3>
                                <p className="text-[10px] text-[var(--color-accent-green)]">Agricultural Expert</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClearChat}
                                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-accent-amber)] hover:bg-[rgba(255,170,0,0.1)] transition-all cursor-pointer"
                                title="Clear chat"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] hover:bg-[rgba(255,51,102,0.1)] transition-all cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-16 h-16 rounded-full bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] flex items-center justify-center mb-4">
                                    <Sparkles className="w-8 h-8 text-[var(--color-accent-green)]" />
                                </div>
                                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                                    Halo! Saya Sasya 🌾
                                </h4>
                                <p className="text-xs text-[var(--color-text-muted)] mb-6 max-w-[260px]">
                                    Asisten AI pertanian Anda. Tanyakan tentang hama, pengelolaan tanaman, atau data lapangan.
                                </p>
                                <div className="grid grid-cols-1 gap-2 w-full max-w-[300px]">
                                    {suggestedQuestions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => onSendMessage(q)}
                                            className="text-left text-xs px-3 py-2.5 rounded-xl bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.1)] text-[var(--color-text-secondary)] hover:bg-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.2)] hover:text-[var(--color-accent-cyan)] transition-all cursor-pointer"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
                        )}

                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-[rgba(0,255,136,0.15)] border border-[rgba(0,255,136,0.3)] flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-[var(--color-accent-green)]" />
                                </div>
                                <div className="bg-[rgba(15,25,50,0.8)] border border-[rgba(100,200,255,0.1)] rounded-2xl rounded-tl-sm px-4 py-3">
                                    <div className="flex gap-1.5">
                                        <div className="typing-dot" />
                                        <div className="typing-dot" />
                                        <div className="typing-dot" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Bar */}
                    <div className="p-4 border-t border-[rgba(0,229,255,0.1)]">
                        <div className="flex items-center gap-2 bg-[rgba(15,25,50,0.6)] border border-[rgba(100,200,255,0.1)] rounded-xl px-4 py-2 focus-within:border-[rgba(0,229,255,0.3)] transition-colors">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tanya Sasya tentang pertanian..."
                                className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim() || isLoading}
                                className="p-2 rounded-lg text-[var(--color-accent-cyan)] hover:bg-[rgba(0,229,255,0.1)] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[9px] text-[var(--color-text-muted)] text-center mt-2">
                            Powered by Google Gemini 2.0 Flash • PEST-VISION AI
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
