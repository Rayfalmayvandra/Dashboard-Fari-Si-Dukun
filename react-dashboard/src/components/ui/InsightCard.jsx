// ══════════════════════════════════════════════
// 💡 InsightCard — Kartu Insight/Tip
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan kartu informasi insight/tips
// dengan ikon dan teks penjelasan. Digunakan di halaman detail.
//
// ── Contoh Penggunaan ──────────────────────────
//   import { Sun } from 'lucide-react';
//
//   <InsightCard
//     icon={<Sun size={22} />}
//     iconClass="sun"
//     title="Suhu Optimal"
//     variant="neutral"
//   >
//     Rentang ideal: <strong>24-30°C</strong>. Saat ini <strong>28.5°C</strong> zona aman.
//   </InsightCard>
//
// ── Props ───────────────────────────────────────
//   icon      : ReactNode — ikon insight
//   iconClass : string — CSS class warna ikon (sun/wind/cloud/dll)
//   title     : string — judul insight
//   variant   : '' | 'acid' | 'neutral' | 'reservoir' — varian warna card
//   children  : ReactNode — konten teks insight
// ══════════════════════════════════════════════

/**
 * @param {{
 *   icon: React.ReactNode,
 *   iconClass?: string,
 *   title: string,
 *   variant?: string,
 *   children: React.ReactNode
 * }} props
 */
export default function InsightCard({ icon, iconClass = '', title, variant = '', children }) {
  return (
    <div className={`card insight-card ${variant}`}>
      {icon && <span className={`insight-icon ${iconClass}`}>{icon}</span>}
      <h4 className="insight-title">{title}</h4>
      <p className="insight-text">{children}</p>
    </div>
  );
}
