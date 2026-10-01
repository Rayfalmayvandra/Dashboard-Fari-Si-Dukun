// ══════════════════════════════════════════════════════════════
// ⚡ HALAMAN 4: PH & WATER PAGE — Detail pH Tanah & Reservoir
// ══════════════════════════════════════════════════════════════
//
// 🎯 TUGAS PESERTA:
//    Susun halaman detail pH tanah & reservoir air.
//    Halaman ini menampilkan: chart detail, stat cards, dan insight cards.
//
// 📦 KOMPONEN YANG TERSEDIA (dari Panitia):
//    - PageSectionBar → Bar judul section
//    - Badge          → Badge status
//    - ChartPanel     → Wrapper chart (gunakan prop wide={true})
//    - StatCard       → Kartu statistik besar
//    - InsightCard    → Kartu insight/tip
//
// 🔧 HELPER FUNCTIONS (dari utils/helpers.js):
//    - getPhStatus(pH) → [text, variant]
//    - getResStatus(reservoir) → [text, variant]
//
// 💡 TIPS:
//    - Struktur mirip TempHumidPage, cukup ganti data sensor
//    - InsightCard bisa pakai variant: 'acid', 'neutral', 'reservoir'
//
// ══════════════════════════════════════════════════════════════

// ── Import komponen dari panitia (uncomment yang dibutuhkan) ──
// import { PageSectionBar, Badge, ChartPanel, StatCard, InsightCard } from '../ui';
// import { getPhStatus, getResStatus } from '../../utils/helpers';
// import { getSharedOptions, createDataset } from '../../utils/chartConfig';
// import { useMemo } from 'react';
// import { Line } from 'react-chartjs-2';
// import { FlaskConical, Waves, TrendingUp, CheckCircle, Droplets } from 'lucide-react';

/**
 * Props yang diterima dari App.jsx:
 * @param {object} props
 * @param {object} props.sensor    - Data sensor { temp, humidity, pH, rain, reservoir }
 * @param {object} props.chartData - Data chart { labels, tempData, humidData, phData, reservoirData }
 */
export default function PhWaterPage({ sensor, chartData }) {
  // ╔══════════════════════════════════════════════════╗
  // ║  TODO: Susun halaman pH & Reservoir!            ║
  // ║                                                  ║
  // ║  Petunjuk:                                       ║
  // ║  1. PageSectionBar + Badge "Elektroda & HC-SR04" ║
  // ║  2. ChartPanel wide (pH & Level)                 ║
  // ║  3. 2 StatCard (pH + Reservoir)                  ║
  // ║  4. 3 InsightCard (tips pH & reservoir)          ║
  // ╚══════════════════════════════════════════════════╝

  return (
    <div className="slide-inner">
      {/* 
        ========================================
        TODO 1: PageSectionBar
        ========================================
        Contoh:
        <PageSectionBar
          icon={<FlaskConical size={20} />}
          title="pH Tanah &amp; Reservoir"
          rightContent={<Badge variant="green">Elektroda &amp; HC-SR04</Badge>}
        />
      */}

      {/* 
        ========================================
        TODO 2: ChartPanel wide (pH & Reservoir)
        ========================================
        Contoh:
        <ChartPanel
          icon={<TrendingUp size={22} />}
          iconClass="ph"
          title="Grafik pH Tanah &amp; Level Reservoir"
          subtitle="Riwayat 10 pembacaan nutrisi dan penampungan"
          legends={[
            { label: 'pH', className: 'legend-ph' },
            { label: 'Level (%)', className: 'legend-water' },
          ]}
          wide={true}
        >
          <Line data={chartDataMemo} options={options} />
        </ChartPanel>
      */}

      {/* 
        ========================================
        TODO 3: 2 StatCard (pH + Reservoir)
        ========================================
        Contoh:
        <div className="detail-stats-row">
          <StatCard
            icon={<FlaskConical size={26} />}
            iconBgClass="ph-bg"
            label="pH Tanah Saat Ini"
            value={sensor.pH.toFixed(1)}
            unit="pH"
            badgeText={phStatusText}
            badgeVariant={phBadgeVariant}
            progressValue={(sensor.pH / 14) * 100}
            progressColor="ph"
            rangeMin="Asam: <5.5"
            rangeMax="Basa: >7.5"
          />
          <!-- StatCard reservoir serupa -->
        </div>
      */}

      {/* 
        ========================================
        TODO 4: 3 InsightCard
        ========================================
        Contoh:
        <div className="three-col-grid">
          <InsightCard icon={<FlaskConical size={22} />} title="pH Asam (<6.0)" variant="acid">
            Bila masam, tambahkan <strong>dolomit</strong> untuk menaikkan pH ke zona optimal.
          </InsightCard>
          <InsightCard icon={<CheckCircle size={22} />} title="pH Netral (6.0-7.0)" variant="neutral">
            pH <strong>{sensor.pH.toFixed(1)}</strong> sangat baik untuk Padi, Jagung, Cabai.
          </InsightCard>
          <InsightCard icon={<Droplets size={22} />} title={`Reservoir ${sensor.reservoir}%`} variant="reservoir">
            Cadangan air memadai. Irigasi siap otomatis saat dibutuhkan.
          </InsightCard>
        </div>
      */}

      {/* Hapus teks ini setelah selesai mengerjakan */}
      <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
        <h2>🏗️ Halaman pH & Reservoir — Belum Disusun</h2>
        <p>Buka file <code>PhWaterPage.jsx</code> dan ikuti instruksi TODO di dalamnya.</p>
      </div>
    </div>
  );
}
