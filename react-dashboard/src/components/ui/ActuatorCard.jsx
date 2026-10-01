// ══════════════════════════════════════════════
// ⚙️ ActuatorCard — Kartu Kontrol Aktuator
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan kartu kontrol untuk satu aktuator
// (Servo/Pompa) dengan badge status dan tombol toggle.
//
// ── Contoh Penggunaan ──────────────────────────
//   import { GitFork } from 'lucide-react';
//
//   <ActuatorCard
//     icon={<GitFork size={19} />}
//     iconClass="rain"
//     title="Servo Gerbang Parit"
//     subtitle="Pemanenan Air Hujan"
//     badgeText="TERBUKA"
//     badgeVariant="green"
//     infoLabel="Sudut"
//     infoValue="90° (Tampung)"
//     onToggle={() => toggleManualActuator('servo')}
//     disabled={mode === 'AUTO'}
//   />
//
// ── Props ───────────────────────────────────────
//   icon         : ReactNode — ikon aktuator
//   iconClass    : string — CSS class warna (rain/ph)
//   title        : string — nama aktuator
//   subtitle     : string — deskripsi
//   badgeText    : string — teks status badge
//   badgeVariant : string — varian badge (green/gray)
//   infoLabel    : string — label informasi tambahan
//   infoValue    : string — nilai informasi
//   infoClass    : string — CSS class untuk info value
//   onToggle     : function — callback toggle
//   disabled     : boolean — disabled state tombol
// ══════════════════════════════════════════════

import Badge from './Badge';

/**
 * @param {{
 *   icon: React.ReactNode,
 *   iconClass?: string,
 *   title: string,
 *   subtitle?: string,
 *   badgeText: string,
 *   badgeVariant?: string,
 *   infoLabel: string,
 *   infoValue: string,
 *   infoClass?: string,
 *   onToggle: () => void,
 *   disabled?: boolean
 * }} props
 */
export default function ActuatorCard({
  icon, iconClass = 'rain',
  title, subtitle = '',
  badgeText, badgeVariant = 'green',
  infoLabel, infoValue, infoClass = '',
  onToggle,
  disabled = false,
}) {
  return (
    <div className="actuator-card">
      <div className="actuator-header">
        <div className={`actuator-icon ${iconClass}`}>
          {icon}
        </div>
        <div>
          <h4 className="actuator-title">{title}</h4>
          {subtitle && <p className="actuator-sub">{subtitle}</p>}
        </div>
        <Badge variant={badgeVariant}>{badgeText}</Badge>
      </div>
      <div className="actuator-footer">
        <span className="actuator-info">
          {infoLabel}: <strong className={infoClass}>{infoValue}</strong>
        </span>
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`btn-actuator ${disabled ? 'disabled' : 'active'}`}
        >
          Toggle
        </button>
      </div>
    </div>
  );
}
