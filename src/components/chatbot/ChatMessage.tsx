'use client';

import { ChatMessage as ChatMessageType } from '@/types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
    message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser
                        ? 'bg-[rgba(0,229,255,0.15)] border border-[rgba(0,229,255,0.3)]'
                        : 'bg-[rgba(0,255,136,0.15)] border border-[rgba(0,255,136,0.3)]'
                    }`}
            >
                {isUser ? (
                    <User className="w-4 h-4 text-[var(--color-accent-cyan)]" />
                ) : (
                    <Bot className="w-4 h-4 text-[var(--color-accent-green)]" />
                )}
            </div>

            {/* Bubble */}
            <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser
                        ? 'bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] text-[var(--color-text-primary)] rounded-tr-sm'
                        : 'bg-[rgba(15,25,50,0.8)] border border-[rgba(100,200,255,0.1)] text-[var(--color-text-secondary)] rounded-tl-sm'
                    }`}
            >
                <div className="chat-markdown whitespace-pre-wrap">{message.content}</div>
                <div className="text-[10px] text-[var(--color-text-muted)] mt-2">
                    {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}
                </div>
            </div>
        </div>
    );
}
