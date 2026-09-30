// ── Topbar ──────────────────────────────
// Top navigation bar with page title, ESP32 status, and real-time clock

import { useState, useEffect } from 'react';
import { Menu, Clock } from 'lucide-react';

export default function Topbar({ pageTitle, pageSub, toggleSidebar }) {
  const [clock, setClock] = useState('00:00:00');

  useEffect(() => {
    const updateClock = () => {
      setClock(new Date().toLocaleTimeString('id-ID', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Menu Sidebar"
          title="Buka Menu Navigasi"
        >
          <Menu size={22} />
        </button>
        <div className="topbar-title-area">
          <span className="topbar-page-title">{pageTitle}</span>
          <span className="topbar-page-sub">{pageSub}</span>
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-chip">
          <div className="status-indicator">
            <span className="status-ping"></span>
            <span className="status-dot"></span>
          </div>
          <span className="topbar-chip-text">ESP32</span>
        </div>
        <div className="topbar-chip">
          <Clock size={16} className="topbar-chip-icon" />
          <span className="topbar-clock">{clock}</span>
          <span className="topbar-clock-wib">WIB</span>
        </div>
      </div>
    </header>
  );
}
