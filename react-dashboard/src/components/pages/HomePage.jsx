// ══════════════════════════════════════════════════════════════
// ⚡ HALAMAN 1: HOME PAGE — Dashboard Utama
// ══════════════════════════════════════════════════════════════
//
// 🎯 TUGAS PESERTA:
//    Susun halaman utama dashboard menggunakan komponen yang tersedia.
//    Halaman ini menampilkan: Hero Header, Prediksi ML, dan Kontrol Aktuator.
//
// 📦 KOMPONEN YANG TERSEDIA (dari Panitia):
//    - HeroHeader       → Header hero dengan judul & deskripsi
//    - PageSectionBar   → Bar judul section
//    - CountdownChip    → Chip countdown timer
//    - MLPredictionPanel → Panel prediksi ML (sudah lengkap)
//    - ActuatorControlPanel → Panel kontrol aktuator (sudah lengkap)
//
// 💡 TIPS:
//    - Gunakan className "two-col-grid" untuk layout 2 kolom
//    - Gunakan className "slide-inner" sebagai wrapper utama
//    - Peserta BEBAS menggunakan komponen panitia atau membuat sendiri
//
// ══════════════════════════════════════════════════════════════

// ── Import komponen dari panitia (uncomment yang dibutuhkan) ──
// import { HeroHeader, PageSectionBar, CountdownChip } from '../ui';
// import { MLPredictionPanel, ActuatorControlPanel } from '../panels';
// import { Sparkles } from 'lucide-react';

/**
 * Props yang diterima dari App.jsx:
 * @param {object} props
 * @param {object} props.sensor          - Data sensor { temp, humidity, pH, rain, reservoir }
 * @param {object} props.mlResult        - Hasil ML { namaTanaman, akurasiPercent, statusKondisi, alasanLogis, alternatives }
 * @param {object} props.actuator        - Status aktuator { servo, pump }
 * @param {string} props.mode            - Mode kendali: 'AUTO' | 'MANUAL'
 * @param {number} props.countdownSeconds - Sisa detik countdown
 * @param {function} props.toggleControlMode   - Toggle Auto/Manual
 * @param {function} props.toggleManualActuator - Toggle servo/pump manual
 */
export default function HomePage({
  sensor, mlResult, actuator, mode, countdownSeconds,
  toggleControlMode, toggleManualActuator,
}) {
  // ╔══════════════════════════════════════════╗
  // ║  TODO: Susun halaman utama di sini!     ║
  // ║                                          ║
  // ║  Petunjuk:                               ║
  // ║  1. Tampilkan HeroHeader                 ║
  // ║  2. Tampilkan PageSectionBar + Countdown ║
  // ║  3. Buat layout 2 kolom:                 ║
  // ║     - Kiri:  MLPredictionPanel            ║
  // ║     - Kanan: ActuatorControlPanel         ║
  // ╚══════════════════════════════════════════╝

  return (
    <div className="slide-inner">
      {/* 
        ========================================
        TODO 1: Tambahkan HeroHeader di sini
        ========================================
        Contoh:
        <HeroHeader />
      */}

      {/* 
        ========================================
        TODO 2: Tambahkan PageSectionBar di sini
        ========================================
        Contoh:
        <PageSectionBar
          icon={<Sparkles size={20} />}
          title="Prediksi ML &amp; Kontrol Aktuator"
          rightContent={<CountdownChip seconds={countdownSeconds} />}
        />
      */}

      {/* 
        ========================================
        TODO 3: Buat layout 2 kolom di sini
        ========================================
        Contoh:
        <div className="two-col-grid">
          <MLPredictionPanel mlResult={mlResult} />
          <ActuatorControlPanel
            actuator={actuator}
            mode={mode}
            toggleControlMode={toggleControlMode}
            toggleManualActuator={toggleManualActuator}
          />
        </div>
      */}

      {/* Hapus teks ini setelah selesai mengerjakan */}
      <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
        <h2>🏗️ Halaman Home — Belum Disusun</h2>
        <p>Buka file <code>HomePage.jsx</code> dan ikuti instruksi TODO di dalamnya.</p>
      </div>
    </div>
  );
}
