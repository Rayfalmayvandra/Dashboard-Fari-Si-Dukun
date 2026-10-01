// ══════════════════════════════════════════════════════════════
// ⚡ HALAMAN 3: TEMP & HUMID PAGE — Detail Suhu & Kelembapan
// ══════════════════════════════════════════════════════════════
//
// 🎯 TUGAS PESERTA:
//    Susun halaman detail suhu & kelembapan menggunakan komponen yang tersedia.
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
//    - getTempStatus(temp) → [text, variant]
//    - getHumidStatus(humidity) → [text, variant]
//    - getHHI(temp, humidity) → string
//
// 💡 TIPS:
//    - Chart detail gunakan prop wide={true} pada ChartPanel
//    - Gunakan className "detail-stats-row" untuk 2 StatCard
//    - Gunakan className "three-col-grid" untuk 3 InsightCard
//
// ══════════════════════════════════════════════════════════════

// ── Import komponen dari panitia (uncomment yang dibutuhkan) ──
// import { PageSectionBar, Badge, ChartPanel, StatCard, InsightCard } from '../ui';
// import { getTempStatus, getHumidStatus, getHHI } from '../../utils/helpers';
// import { getSharedOptions, createDataset } from '../../utils/chartConfig';
// import { useMemo } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Thermometer, Droplets, Sun, Wind, Cloud, LineChart } from 'lucide-react';

/**
 * Props yang diterima dari App.jsx:
 * @param {object} props
 * @param {object} props.sensor    - Data sensor { temp, humidity, pH, rain, reservoir }
 * @param {object} props.chartData - Data chart { labels, tempData, humidData, phData, reservoirData }
 */
export default function TempHumidPage({ sensor, chartData }) {
  // ╔══════════════════════════════════════════════════╗
  // ║  TODO: Susun halaman Suhu & Kelembapan!         ║
  // ║                                                  ║
  // ║  Petunjuk:                                       ║
  // ║  1. Tampilkan PageSectionBar + Badge "DHT22"     ║
  // ║  2. ChartPanel wide dengan chart Line            ║
  // ║  3. 2 StatCard (Suhu + Kelembapan)               ║
  // ║  4. 3 InsightCard (tips iklim mikro)             ║
  // ╚══════════════════════════════════════════════════╝

  return (
    <div className="slide-inner">
      {/* 
        ========================================
        TODO 1: PageSectionBar
        ========================================
        Contoh:
        <PageSectionBar
          icon={<Thermometer size={20} />}
          title="Suhu &amp; Kelembapan"
          rightContent={<Badge variant="blue">DHT22 Sensor</Badge>}
        />
      */}

      {/* 
        ========================================
        TODO 2: ChartPanel (wide)
        ========================================
        Contoh:
        <ChartPanel
          icon={<LineChart size={22} />}
          iconClass="temp"
          title="Grafik Detail Suhu &amp; Kelembapan"
          subtitle="Riwayat 10 pembacaan iklim mikro"
          legends={[
            { label: 'Suhu (°C)', className: 'legend-temp' },
            { label: 'RH (%)', className: 'legend-humid' },
          ]}
          wide={true}
        >
          <Line data={chartDataMemo} options={options} />
        </ChartPanel>
      */}

      {/* 
        ========================================
        TODO 3: 2 StatCard
        ========================================
        Contoh:
        <div className="detail-stats-row">
          <StatCard
            icon={<Thermometer size={26} />}
            iconBgClass="temp-bg"
            label="Suhu Udara Saat Ini"
            value={sensor.temp.toFixed(1)}
            unit="°C"
            badgeText={tempStatusText}
            badgeVariant={tempBadgeVariant}
            progressValue={Math.min(100, (sensor.temp / 40) * 100)}
            progressColor="temp"
            rangeMin="Min: 24°C"
            rangeMax="Max: 34°C"
          />
          <!-- StatCard kelembapan serupa -->
        </div>
      */}

      {/* 
        ========================================
        TODO 4: 3 InsightCard
        ========================================
        Contoh:
        <div className="three-col-grid">
          <InsightCard icon={<Sun size={22} />} iconClass="sun" title="Suhu Optimal">
            Rentang ideal: <strong>24-30°C</strong>. Saat ini <strong>{sensor.temp.toFixed(1)}°C</strong> zona aman.
          </InsightCard>
          <!-- 2 InsightCard lagi -->
        </div>
      */}

      {/* Hapus teks ini setelah selesai mengerjakan */}
      <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
        <h2>🏗️ Halaman Suhu & Kelembapan — Belum Disusun</h2>
        <p>Buka file <code>TempHumidPage.jsx</code> dan ikuti instruksi TODO di dalamnya.</p>
      </div>
    </div>
  );
}
