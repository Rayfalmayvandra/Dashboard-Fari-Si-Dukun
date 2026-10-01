// ══════════════════════════════════════════════
// 📊 ProgressBar — Komponen Progress/Bar Visual
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan bar progress horizontal dengan warna sesuai tipe sensor.
//
// ── Contoh Penggunaan ──────────────────────────
//   <ProgressBar value={75} colorClass="temp" />
//   <ProgressBar value={sensor.humidity} colorClass="humid" className="mt-3" />
//
// ── Props ───────────────────────────────────────
//   value      : number (0-100), persentase lebar bar
//   colorClass : 'temp' | 'humid' | 'ph' | 'rain' | 'water' — warna fill bar
//   className  : CSS class tambahan untuk wrapper (opsional)
// ══════════════════════════════════════════════

/**
 * @param {{ value: number, colorClass?: string, className?: string }} props
 */
export default function ProgressBar({ value = 0, colorClass = 'temp', className = '' }) {
  return (
    <div className={`progress-track ${className}`}>
      <div
        className={`progress-fill ${colorClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      ></div>
    </div>
  );
}
