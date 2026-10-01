// ══════════════════════════════════════════════
// 📡 SensorCard — Kartu Sensor Individual
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan data sensor individual dengan icon, value,
// badge status, dan progress bar. Digunakan di halaman Telemetri.
//
// ── Contoh Penggunaan ──────────────────────────
//   import { Thermometer } from 'lucide-react';
//
//   <SensorCard
//     label="Suhu Udara"
//     value={28.5}
//     unit="°C"
//     source="DHT22"
//     icon={<Thermometer size={22} />}
//     iconClass="temp"
//     badgeText="Optimal"
//     badgeVariant="green"
//     progressValue={71.25}
//     progressColor="temp"
//   />
//
// ── Props ───────────────────────────────────────
//   label         : string — nama sensor
//   value         : number | string — nilai sensor
//   unit          : string — satuan (°C, %, pH, dll)
//   source        : string — sumber sensor (DHT22, HC-SR04, dll)
//   icon          : ReactNode — ikon lucide-react
//   iconClass     : string — CSS class warna ikon (temp/humid/ph/rain/water)
//   badgeText     : string — teks badge status
//   badgeVariant  : string — varian warna badge
//   progressValue : number — persentase progress bar (0-100)
//   progressColor : string — CSS class warna progress
// ══════════════════════════════════════════════

import Badge from './Badge';
import ProgressBar from './ProgressBar';

/**
 * @param {{
 *   label: string,
 *   value: number | string,
 *   unit: string,
 *   source: string,
 *   icon: React.ReactNode,
 *   iconClass: string,
 *   badgeText: string,
 *   badgeVariant: string,
 *   progressValue: number,
 *   progressColor: string
 * }} props
 */
export default function SensorCard({
  label, value, unit, source,
  icon, iconClass = 'temp',
  badgeText, badgeVariant = 'green',
  progressValue = 0, progressColor = 'temp',
}) {
  return (
    <div className="card p-5">
      <div className="sensor-card-header">
        <span className="sensor-label">{label}</span>
        <div className={`sensor-icon-box ${iconClass}`}>
          {icon}
        </div>
      </div>
      <div className="sensor-value-row">
        <span className="sensor-value">{value}</span>
        <span className="sensor-unit">{unit}</span>
      </div>
      <div className="sensor-footer">
        <span className="sensor-source">{source}</span>
        <Badge variant={badgeVariant}>{badgeText}</Badge>
      </div>
      <ProgressBar value={progressValue} colorClass={progressColor} className="mt-3" />
    </div>
  );
}
