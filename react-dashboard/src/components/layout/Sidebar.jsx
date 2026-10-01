// ── Sidebar ──────────────────────────────
// DISEDIAKAN OLEH PANITIA LOMBA
// Left navigation sidebar with page links and system status

import {
  Sprout, X, LayoutDashboard, Activity,
  Thermometer, FlaskConical, ScrollText,
} from 'lucide-react';
import { PAGES } from '../../utils/constants';
import { StatusIndicator } from '../ui';

const NAV_ICONS = {
  home: LayoutDashboard,
  telemetri: Activity,
  temphumid: Thermometer,
  phwater: FlaskConical,
  history: ScrollText,
};

const ICON_CLASSES = {
  home: 'homeicon',
  telemetri: 'realtime',
  temphumid: 'temphumid',
  phwater: 'phwater',
  history: 'historyicon',
};

export default function Sidebar({ currentPage, navigate, closeSidebar }) {
  return (
    <>
      {/* Overlay */}
      <div className="sidebar-overlay active" onClick={closeSidebar}></div>

      {/* Sidebar Panel */}
      <aside className="sidebar open">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigate('home')}>
            <div className="sidebar-logo-icon">
              <Sprout size={24} color="#ffffff" strokeWidth={2.5} />
            </div>
            <div>
              <span className="sidebar-logo-name">Fari</span>
              <span className="sidebar-logo-sub">Si Dukun Tanaman</span>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={closeSidebar} aria-label="Tutup Menu">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="sidebar-section-label">NAVIGASI HALAMAN</div>
        <nav className="sidebar-nav">
          {PAGES.map((page) => {
            const Icon = NAV_ICONS[page.id];
            return (
              <a
                key={page.id}
                className={`sidebar-item ${currentPage === page.id ? 'active' : ''}`}
                onClick={() => navigate(page.id)}
              >
                <div className={`sidebar-item-icon ${ICON_CLASSES[page.id]}`}>
                  <Icon size={20} />
                </div>
                <div className="sidebar-item-text">
                  <span className="sidebar-item-title">{page.title}</span>
                  <span className="sidebar-item-sub">{page.sub}</span>
                </div>
              </a>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="sidebar-section-label mt-4">STATUS SISTEM</div>
        <div className="sidebar-status">
          <div className="sidebar-status-row">
            <StatusIndicator variant="ping" />
            <span className="sidebar-status-label">ESP32 Connected</span>
          </div>
          <div className="sidebar-status-row">
            <StatusIndicator variant="glow" size="sm" />
            <span className="sidebar-status-label">ML Engine Active</span>
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <span className="sidebar-footer-text">Fari Smart Farming v2.0</span>
          <span className="sidebar-footer-sub">IoT ESP32 · ML Engine</span>
        </div>
      </aside>
    </>
  );
}
