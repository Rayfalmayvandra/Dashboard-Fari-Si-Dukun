// ══════════════════════════════════════════════════════════════
// ⚡ APP.JSX — Template Starter Aplikasi
// ══════════════════════════════════════════════════════════════
//
// 🎯 TUGAS PESERTA:
//    File ini adalah SHELL utama aplikasi. Di sini peserta menghubungkan
//    komponen layout dan halaman-halaman yang sudah disusun.
//
//    File ini SUDAH SIAP JALAN. Peserta hanya perlu menyelesaikan
//    file halaman di folder components/pages/.
//
// 📦 YANG SUDAH DISIAPKAN PANITIA:
//    ✅ Layout: AnimatedBackground, Sidebar, Topbar, Footer
//    ✅ Hook: useDashboard (state management lengkap)
//    ✅ Navigasi sliding antar halaman
//    ✅ Semua props sudah terhubung ke halaman
//
// 💡 PESERTA FOKUS DI: components/pages/ (5 halaman)
//
// ══════════════════════════════════════════════════════════════

import { useRef, useEffect } from 'react';
import useDashboard from './hooks/useDashboard';

// ── Layout (dari Panitia) ────────────────────
import { AnimatedBackground, Sidebar, Topbar, Footer } from './components/layout';

// ── Pages (TUGAS PESERTA) ────────────────────
import HomePage from './components/pages/HomePage';
import TelemetriPage from './components/pages/TelemetriPage';
import TempHumidPage from './components/pages/TempHumidPage';
import PhWaterPage from './components/pages/PhWaterPage';
import HistoryPage from './components/pages/HistoryPage';

export default function App() {
  const dashboard = useDashboard();
  const slideTimeoutRef = useRef(null);
  const slidesRef = useRef([]);

  // Handle slide visibility after transition
  useEffect(() => {
    clearTimeout(slideTimeoutRef.current);

    // Make all slides visible during animation
    slidesRef.current.forEach(el => {
      if (el) el.style.visibility = 'visible';
    });

    slideTimeoutRef.current = setTimeout(() => {
      slidesRef.current.forEach((el, idx) => {
        if (!el) return;
        if (idx !== dashboard.currentPageIndex) {
          el.style.visibility = 'hidden';
        } else {
          el.style.visibility = 'visible';
          el.scrollTop = 0;
        }
      });
    }, 540);

    return () => clearTimeout(slideTimeoutRef.current);
  }, [dashboard.currentPageIndex]);

  // ── Halaman-halaman yang perlu disusun peserta ──
  const pages = [
    {
      id: 'home',
      content: (
        <HomePage
          sensor={dashboard.sensor}
          mlResult={dashboard.mlResult}
          actuator={dashboard.actuator}
          mode={dashboard.mode}
          countdownSeconds={dashboard.countdownSeconds}
          toggleControlMode={dashboard.toggleControlMode}
          toggleManualActuator={dashboard.toggleManualActuator}
        />
      ),
    },
    {
      id: 'telemetri',
      content: (
        <TelemetriPage
          sensor={dashboard.sensor}
          chartData={dashboard.chartData}
        />
      ),
    },
    {
      id: 'temphumid',
      content: (
        <TempHumidPage
          sensor={dashboard.sensor}
          chartData={dashboard.chartData}
        />
      ),
    },
    {
      id: 'phwater',
      content: (
        <PhWaterPage
          sensor={dashboard.sensor}
          chartData={dashboard.chartData}
        />
      ),
    },
    {
      id: 'history',
      content: (
        <HistoryPage
          paginatedHistory={dashboard.paginatedHistory}
          history={dashboard.history}
          historyPage={dashboard.historyPage}
          totalPages={dashboard.totalPages}
          historyStart={dashboard.historyStart}
          historyEnd={dashboard.historyEnd}
          prevHistoryPage={dashboard.prevHistoryPage}
          nextHistoryPage={dashboard.nextHistoryPage}
        />
      ),
    },
  ];

  return (
    <>
      <AnimatedBackground />

      {/* Sidebar — conditionally rendered */}
      {dashboard.sidebarOpen && (
        <Sidebar
          currentPage={dashboard.currentPage}
          navigate={dashboard.navigate}
          closeSidebar={dashboard.closeSidebar}
        />
      )}

      {/* Main App Wrapper */}
      <div
        className={`app-wrapper ${dashboard.sidebarOpen ? 'sidebar-shifted' : ''}`}
        style={dashboard.sidebarOpen ? { transform: 'translateX(var(--sidebar-w))' } : undefined}
      >
        <Topbar
          pageTitle={dashboard.currentPageMeta.title}
          pageSub={dashboard.currentPageMeta.sub}
          toggleSidebar={dashboard.toggleSidebar}
        />

        <main className="viewport-container">
          <div
            className="pages-track"
            style={{ transform: `translateX(-${dashboard.currentPageIndex * 20}%)` }}
          >
            {pages.map((page, idx) => (
              <section
                key={page.id}
                ref={el => slidesRef.current[idx] = el}
                className={`page-slide ${idx === dashboard.currentPageIndex ? 'active-slide' : ''}`}
              >
                {page.content}
              </section>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
