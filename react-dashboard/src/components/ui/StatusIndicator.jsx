// ══════════════════════════════════════════════
// 🟢 StatusIndicator — Komponen Dot Status
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan dot indikator status (connected/active)
// dengan animasi ping pulse. Ada 2 variant: 'ping' dan 'glow'.
//
// ── Contoh Penggunaan ──────────────────────────
//   <StatusIndicator />                           ← default: ping dot
//   <StatusIndicator variant="glow" size="sm" />  ← glow dot kecil
//   <StatusIndicator variant="glow" size="xs" />  ← glow dot sangat kecil
//
// ── Props ───────────────────────────────────────
//   variant : 'ping' | 'glow' (default: 'ping')
//   size    : 'xs' | 'sm' | 'md' — ukuran dot (default: 'md', hanya untuk glow)
// ══════════════════════════════════════════════

/**
 * @param {{ variant?: 'ping' | 'glow', size?: 'xs' | 'sm' | 'md' }} props
 */
export default function StatusIndicator({ variant = 'ping', size = 'md' }) {
  if (variant === 'glow') {
    return <div className={`glow-dot ${size}`}></div>;
  }

  return (
    <div className="status-indicator">
      <span className="status-ping"></span>
      <span className="status-dot"></span>
    </div>
  );
}
