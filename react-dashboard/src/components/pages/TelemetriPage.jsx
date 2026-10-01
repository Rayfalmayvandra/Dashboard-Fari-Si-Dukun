// ══════════════════════════════════════════════════════════════
// ⚡ HALAMAN 2: TELEMETRI PAGE — Monitoring Sensor Real-Time
// ══════════════════════════════════════════════════════════════
//
// 🎯 TUGAS PESERTA:
//    Susun halaman telemetri yang menampilkan 5 kartu sensor
//    dan 2 grafik live chart.
//
// 📦 KOMPONEN YANG TERSEDIA (dari Panitia):
//    - PageSectionBar   → Bar judul section
//    - SensorCard       → Kartu sensor individual
//    - ChartPanel       → Wrapper chart dengan header & legend
//    - Badge            → Badge status
//    - StatusIndicator  → Dot status
//
// 📊 DATA SENSOR yang tersedia di props.sensor:
//    { temp, humidity, pH, rain, reservoir }
//
// 📈 DATA CHART yang tersedia di props.chartData:
//    { labels, tempData, humidData, phData, reservoirData }
//
// 🔧 HELPER FUNCTIONS (dari utils/helpers.js):
//    - getSensorBadge(key, value) → [text, variant]
//    - getProgressWidth(key, value) → number
//    - getProgressColor(key) → string
//    - formatSensorValue(key, value) → string
//
// 💡 TIPS:
//    - Gunakan className "sensor-grid" untuk layout 5 kartu sensor
//    - Gunakan className "two-col-grid" untuk 2 chart berdampingan
//    - Import { Line } from 'react-chartjs-2' untuk chart
//    - Import { getSharedOptions, createDataset } dari utils/chartConfig
//
// ══════════════════════════════════════════════════════════════

// ── Import komponen dari panitia (uncomment yang dibutuhkan) ──
// import { PageSectionBar, SensorCard, ChartPanel } from '../ui';
// import { getSensorBadge, getProgressWidth, getProgressColor, formatSensorValue } from '../../utils/helpers';
// import { getSharedOptions, createDataset } from '../../utils/chartConfig';
// import { useMemo } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Activity, Thermometer, Droplets, FlaskConical,
//   CloudRain, Waves, LineChart, TrendingUp,
// } from 'lucide-react';

// ── Daftar 5 sensor IoT ──
// const SENSORS = [
//   { key: 'temp',      label: 'Suhu Udara',  unit: '°C', source: 'DHT22',        icon: Thermometer, iconClass: 'temp' },
//   { key: 'humidity',  label: 'Kelembapan',  unit: '%',  source: 'DHT22',        icon: Droplets,    iconClass: 'humid' },
//   { key: 'pH',        label: 'pH Tanah',    unit: 'pH', source: 'Electro Probe', icon: FlaskConical, iconClass: 'ph' },
//   { key: 'rain',      label: 'Curah Hujan', unit: '%',  source: 'Raindrop',     icon: CloudRain,   iconClass: 'rain' },
//   { key: 'reservoir', label: 'Reservoir',   unit: '%',  source: 'HC-SR04',      icon: Waves,       iconClass: 'water' },
// ];

/**
 * Props yang diterima dari App.jsx:
 * @param {object} props
 * @param {object} props.sensor    - Data sensor { temp, humidity, pH, rain, reservoir }
 * @param {object} props.chartData - Data chart { labels, tempData, humidData, phData, reservoirData }
 */
export default function TelemetriPage({ sensor, chartData }) {
  // ╔══════════════════════════════════════════════════╗
  // ║  TODO: Susun halaman telemetri di sini!         ║
  // ║                                                  ║
  // ║  Petunjuk:                                       ║
  // ║  1. Tampilkan PageSectionBar                     ║
  // ║  2. Render 5 SensorCard dalam "sensor-grid"      ║
  // ║  3. Render 2 ChartPanel dalam "two-col-grid"    ║
  // ║     - Chart Suhu & Kelembapan                    ║
  // ║     - Chart pH & Reservoir                       ║
  // ╚══════════════════════════════════════════════════╝

  return (
    <div className="slide-inner">
      {/* 
        ========================================
        TODO 1: Tambahkan PageSectionBar
        ========================================
        Contoh:
        <PageSectionBar
          icon={<Activity size={20} />}
          title="Telemetri Sensor Real-Time"
          rightContent={
            <div className="countdown-chip">
              <div className="glow-dot xs"></div>
              <span className="countdown-text">Live 5 Sensor IoT</span>
            </div>
          }
        />
      */}

      {/* 
        ========================================
        TODO 2: Render 5 SensorCard
        ========================================
        Contoh (loop SENSORS array):
        <div className="sensor-grid">
          {SENSORS.map((s) => {
            const [badgeText, badgeVariant] = getSensorBadge(s.key, sensor[s.key]);
            return (
              <SensorCard
                key={s.key}
                label={s.label}
                value={formatSensorValue(s.key, sensor[s.key])}
                unit={s.unit}
                source={s.source}
                icon={<s.icon size={22} />}
                iconClass={s.iconClass}
                badgeText={badgeText}
                badgeVariant={badgeVariant}
                progressValue={getProgressWidth(s.key, sensor[s.key])}
                progressColor={getProgressColor(s.key)}
              />
            );
          })}
        </div>
      */}

      {/* 
        ========================================
        TODO 3: Render 2 ChartPanel
        ========================================
        Contoh (Suhu & Kelembapan):
        <div className="two-col-grid">
          <ChartPanel
            icon={<LineChart size={22} />}
            iconClass="temp"
            title="Suhu & Kelembapan"
            subtitle="10 pembacaan terakhir"
            legends={[
              { label: 'Suhu', className: 'legend-temp' },
              { label: 'RH%', className: 'legend-humid' },
            ]}
          >
            <Line data={tempHumChartData} options={tempHumOptions} />
          </ChartPanel>

          <!-- Chart pH & Reservoir serupa -->
        </div>
      */}

      {/* Hapus teks ini setelah selesai mengerjakan */}
      <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
        <h2>🏗️ Halaman Telemetri — Belum Disusun</h2>
        <p>Buka file <code>TelemetriPage.jsx</code> dan ikuti instruksi TODO di dalamnya.</p>
      </div>
    </div>
  );
}
