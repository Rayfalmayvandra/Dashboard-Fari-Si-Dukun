// ══════════════════════════════════════════════
// 📈 StatCard — Kartu Statistik Besar
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan statistik sensor dalam format besar
// dengan ikon, value, badge, progress, dan range min-max.
// Digunakan di halaman detail (TempHumid, PhWater).
//
// ── Contoh Penggunaan ──────────────────────────
//   import { Thermometer } from 'lucide-react';
//
//   <StatCard
//     icon={<Thermometer size={26} />}
//     iconBgClass="temp-bg"
//     label="Suhu Udara Saat Ini"
//     value={28.5}
//     unit="°C"
//     badgeText="Optimal (24-32°C)"
//     badgeVariant="green"
//     progressValue={71.25}
//     progressColor="temp"
//     rangeMin="Min: 24°C"
//     rangeMax="Max: 34°C"
//   />
//
// ── Props ───────────────────────────────────────
//   icon          : ReactNode — ikon besar
//   iconBgClass   : string — CSS class background ikon (temp-bg/humid-bg/ph-bg/water-bg)
//   label         : string — label deskripsi
//   value         : number | string — nilai utama
//   unit          : string — satuan
//   badgeText     : string — teks badge status
//   badgeVariant  : string — varian badge
//   progressValue : number — persentase bar (0-100)
//   progressColor : string — CSS class warna progress
//   rangeMin      : string — label rentang bawah
//   rangeMax      : string — label rentang atas
// ══════════════════════════════════════════════

import Badge from './Badge';
import ProgressBar from './ProgressBar';

/**
 * @param {{
 *   icon: React.ReactNode,
 *   iconBgClass: string,
 *   label: string,
 *   value: number | string,
 *   unit: string,
 *   badgeText: string,
 *   badgeVariant: string,
 *   progressValue: number,
 *   progressColor: string,
 *   rangeMin: string,
 *   rangeMax: string
 * }} props
 */
export default function StatCard({
  icon, iconBgClass = 'temp-bg',
  label, value, unit,
  badgeText, badgeVariant = 'green',
  progressValue = 0, progressColor = 'temp',
  rangeMin = '', rangeMax = '',
}) {
  return (
    <div className="card big-stat-card">
      <div className={`big-stat-icon ${iconBgClass}`}>
        {icon}
      </div>
      <div className="big-stat-label">{label}</div>
      <div className="big-stat-value-row">
        <span className="big-stat-value">{value}</span>
        <span className="big-stat-unit">{unit}</span>
      </div>
      <Badge variant={badgeVariant}>{badgeText}</Badge>
      <ProgressBar value={progressValue} colorClass={progressColor} className="big-stat-progress" />
      <div className="big-stat-range">
        <span>{rangeMin}</span>
        <span>{rangeMax}</span>
      </div>
    </div>
  );
}
