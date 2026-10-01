// ══════════════════════════════════════════════
// 📋 PageSectionBar — Header Section Halaman
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan bar header section pada setiap halaman,
// berisi judul section (dengan ikon) dan konten kanan (chip/badge).
//
// ── Contoh Penggunaan ──────────────────────────
//   import { Activity } from 'lucide-react';
//   import Badge from './Badge';
//
//   <PageSectionBar
//     icon={<Activity size={20} />}
//     title="Telemetri Sensor Real-Time"
//     rightContent={<Badge variant="blue">DHT22 Sensor</Badge>}
//   />
//
// ── Props ───────────────────────────────────────
//   icon         : ReactNode — ikon sebelum judul
//   title        : string — judul section
//   rightContent : ReactNode — konten sisi kanan (badge, chip, dll)
// ══════════════════════════════════════════════

/**
 * @param {{
 *   icon: React.ReactNode,
 *   title: string,
 *   rightContent?: React.ReactNode
 * }} props
 */
export default function PageSectionBar({ icon, title, rightContent }) {
  return (
    <div className="page-section-bar">
      <h2 className="section-title">
        {icon}
        {title}
      </h2>
      {rightContent && rightContent}
    </div>
  );
}
