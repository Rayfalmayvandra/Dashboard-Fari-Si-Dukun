// ══════════════════════════════════════════════
// 🌟 HeroHeader — Header Hero Halaman Utama
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan hero header pada halaman utama dashboard
// dengan tag, judul besar, highlight text, dan subtitle.
//
// ── Contoh Penggunaan ──────────────────────────
//   <HeroHeader
//     tag="Smart Agriculture IoT & Machine Learning"
//     title="Dashboard Fari"
//     highlight="Si Dukun Tanaman"
//     subtitle="Sistem IoT berbasis ESP32 dan Machine Learning..."
//   />
//
// ── Props ───────────────────────────────────────
//   tag       : string — tag label kecil di atas
//   title     : string — judul utama
//   highlight : string — bagian judul yang di-highlight
//   subtitle  : string — deskripsi di bawah judul
// ══════════════════════════════════════════════

import StatusIndicator from './StatusIndicator';

/**
 * @param {{
 *   tag?: string,
 *   title?: string,
 *   highlight?: string,
 *   subtitle?: string
 * }} props
 */
export default function HeroHeader({
  tag = 'Smart Agriculture IoT & Machine Learning',
  title = 'Dashboard Fari',
  highlight = 'Si Dukun Tanaman',
  subtitle = 'Sistem IoT berbasis ESP32 dan Machine Learning untuk pemanenan air hujan otomatis dan rekomendasi tanaman terbaik.',
}) {
  return (
    <div className="hero-header">
      <div className="hero-tag">
        <StatusIndicator variant="glow" size="xs" />
        <span>{tag}</span>
      </div>
      <h1 className="hero-title">
        {title} <span className="hero-highlight">{highlight}</span>
      </h1>
      <p className="hero-sub">{subtitle}</p>
    </div>
  );
}
