// ══════════════════════════════════════════════
// ⏱️ CountdownChip — Chip Countdown Timer
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan chip berisi countdown timer
// untuk menunjukkan kapan pembaruan data berikutnya.
//
// ── Contoh Penggunaan ──────────────────────────
//   <CountdownChip seconds={1800} />
//   <CountdownChip seconds={countdownSeconds} label="Pembaruan" />
//
// ── Props ───────────────────────────────────────
//   seconds : number — sisa detik countdown
//   label   : string — label sebelum timer (default: 'Pembaruan')
// ══════════════════════════════════════════════

import StatusIndicator from './StatusIndicator';

/**
 * @param {{ seconds: number, label?: string }} props
 */
export default function CountdownChip({ seconds = 0, label = 'Pembaruan' }) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const text = `${label}: ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  return (
    <div className="countdown-chip">
      <StatusIndicator variant="glow" size="xs" />
      <span className="countdown-text">{text}</span>
    </div>
  );
}
