// ── Footer ──────────────────────────────
// DISEDIAKAN OLEH PANITIA LOMBA
// Site footer with credits

import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <Sprout size={18} className="footer-icon" />
          <span>&copy; 2026 Dashboard Fari Si Dukun Tanaman &mdash; IoT ESP32 &amp; Machine Learning</span>
        </div>
        <span className="footer-right">Chart.js &middot; Lucide Icons &middot; React</span>
      </div>
    </footer>
  );
}
