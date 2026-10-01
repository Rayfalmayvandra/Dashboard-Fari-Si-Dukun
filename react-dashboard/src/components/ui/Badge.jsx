// ══════════════════════════════════════════════
// 🏷️ Badge — Komponen Status Label
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan label status dengan warna dinamis.
// Cocok digunakan untuk menunjukkan status sensor, aktuator, atau ML.
//
// ── Contoh Penggunaan ──────────────────────────
//   <Badge variant="green">Optimal</Badge>
//   <Badge variant="amber" icon={<AlertTriangle size={13} />}>Warning</Badge>
//   <Badge variant="red">Kritis</Badge>
//
// ── Props ───────────────────────────────────────
//   variant  : 'green' | 'amber' | 'red' | 'blue' | 'teal' | 'gray' (default: 'green')
//   icon     : ReactNode opsional, ikon di sebelah kiri teks
//   children : Teks label yang ditampilkan
//   className: CSS class tambahan (opsional)
// ══════════════════════════════════════════════

/**
 * @param {{ variant?: string, icon?: React.ReactNode, children: React.ReactNode, className?: string }} props
 */
export default function Badge({ variant = 'green', icon, children, className = '' }) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {icon && icon}
      <span>{children}</span>
    </span>
  );
}
