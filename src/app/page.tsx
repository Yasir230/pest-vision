'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ParticleBackground from '@/components/layout/ParticleBackground';
import StatsOverview from '@/components/dashboard/StatsOverview';
import SprayLogTable from '@/components/dashboard/SprayLogTable';
import AlertPanel from '@/components/dashboard/AlertPanel';
import ChatButton from '@/components/chatbot/ChatButton';
import ChatPanel from '@/components/chatbot/ChatPanel';
import { useChat } from '@/hooks/useChat';

// Dynamic imports for ECharts components (SSR disabled)
const GaugePanel = dynamic(() => import('@/components/dashboard/GaugePanel'), { ssr: false });
const PestTrendChart = dynamic(() => import('@/components/dashboard/PestTrendChart'), { ssr: false });
const RadarOverview = dynamic(() => import('@/components/dashboard/RadarOverview'), { ssr: false });

export default function DashboardPage() {
  const { messages, isLoading, isOpen, sendMessage, toggleChat, clearChat } = useChat();

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      {/* Global Notification */}
      <div
        id="coming-soon-notify"
        className="fixed top-20 right-6 z-[60] px-4 py-2 bg-[rgba(8,15,35,0.9)] border border-[rgba(0,229,255,0.3)] rounded-lg text-xs font-medium text-[var(--color-accent-cyan)] shadow-[0_0_20px_rgba(0,229,255,0.1)] opacity-0 transition-opacity pointer-events-none backdrop-blur-md"
      >
        Fitur segera hadir!
      </div>

      {/* Main Layout */}
      <div className="relative z-10 max-w-[1920px] mx-auto min-h-screen border-x border-[var(--color-border-glass)] shadow-2xl bg-[rgba(5,10,24,0.2)]">
        <Header />

        <div className="flex">
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 space-y-5 overflow-x-hidden">
            {/* Section: KPI Stats */}
            <section>
              <StatsOverview />
            </section>

            {/* Section: Gauges */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full bg-[var(--color-accent-cyan)]" />
                <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-widest">
                  Live Telemetry
                </h2>
              </div>
              <GaugePanel />
            </section>

            {/* Section: Charts Row */}
            <section className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              <div className="xl:col-span-3">
                <PestTrendChart />
              </div>
              <div className="xl:col-span-2">
                <RadarOverview />
              </div>
            </section>

            {/* Section: Table + Alerts */}
            <section className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              <div className="xl:col-span-3">
                <SprayLogTable />
              </div>
              <div className="xl:col-span-2">
                <AlertPanel />
              </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-[10px] text-[var(--color-text-muted)] tracking-wider">
              <p>PEST-VISION Command Center v2.0 — Universitas Pendidikan Indonesia (2026)</p>
              <p className="mt-1">International Future Leaders Competition (IFLC) • Sustainable Technology for Modern Agriculture</p>
            </footer>
          </main>
        </div>
      </div>

      {/* Chat */}
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
      <ChatPanel
        isOpen={isOpen}
        onClose={toggleChat}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
        onClearChat={clearChat}
      />
    </div>
  );
}
