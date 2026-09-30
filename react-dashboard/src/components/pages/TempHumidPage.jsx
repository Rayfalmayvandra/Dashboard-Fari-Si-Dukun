// ── TempHumidPage ──────────────────────────
// Halaman detail Suhu & Kelembapan: chart detail, stat cards, insights

import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Thermometer, Droplets, Sun, Wind, Cloud, LineChart,
} from 'lucide-react';
import { getSharedOptions, createDataset } from '../../utils/chartConfig';

function getTempStatus(temp) {
  if (temp > 32) return ['Panas (>32°C)', 'badge-amber'];
  if (temp < 25) return ['Sejuk (<24°C)', 'badge-blue'];
  return ['Optimal (24-32°C)', 'badge-green'];
}

function getHumidStatus(humidity) {
  if (humidity > 80) return ['Sangat Lembap', 'badge-blue'];
  if (humidity < 55) return ['Kering', 'badge-amber'];
  return ['Lembap (>65%)', 'badge-green'];
}

function getHHI(temp, humidity) {
  if (temp < 27 && humidity < 70) return 'Sangat Baik';
  if (temp < 30 && humidity < 80) return 'Baik';
  if (temp < 33 && humidity < 85) return 'Cukup';
  return 'Kurang Ideal';
}

export default function TempHumidPage({ sensor, chartData }) {
  const chartDataMemo = useMemo(() => ({
    labels: chartData.labels,
    datasets: [
      { ...createDataset('Suhu', 'rgb(255,152,0)', 'y'), data: chartData.tempData },
      { ...createDataset('RH%', 'rgb(33,150,243)', 'y1'), data: chartData.humidData },
    ],
  }), [chartData.labels, chartData.tempData, chartData.humidData]);

  const options = useMemo(() => getSharedOptions('Suhu (°C)', 20, 40, 'RH (%)', 40, 100), []);

  const [tempStatusText, tempBadgeClass] = getTempStatus(sensor.temp);
  const [humidStatusText, humidBadgeClass] = getHumidStatus(sensor.humidity);
  const hhi = getHHI(sensor.temp, sensor.humidity);

  return (
    <div className="slide-inner">
      <div className="page-section-bar">
        <h2 className="section-title">
          <Thermometer size={20} />
          Suhu &amp; Kelembapan
        </h2>
        <span className="badge badge-blue">DHT22 Sensor</span>
      </div>

      {/* Wide Chart */}
      <div className="card p-6 detail-chart-card detail-chart-wide">
        <div className="chart-header">
          <div className="chart-header-left">
            <div className="sensor-icon-box temp chart-header-icon">
              <LineChart size={22} />
            </div>
            <div>
              <h3 className="chart-title">Grafik Detail Suhu &amp; Kelembapan</h3>
              <p className="chart-sub">Riwayat 10 pembacaan iklim mikro</p>
            </div>
          </div>
          <div className="chart-legend">
            <span className="legend-item legend-temp"><span className="legend-dot"></span>Suhu (°C)</span>
            <span className="legend-item legend-humid"><span className="legend-dot"></span>RH (%)</span>
          </div>
        </div>
        <div className="chart-wrapper detail-chart-wrapper">
          <Line data={chartDataMemo} options={options} />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="detail-stats-row">
        <div className="card big-stat-card">
          <div className="big-stat-icon temp-bg">
            <Thermometer size={26} />
          </div>
          <div className="big-stat-label">Suhu Udara Saat Ini</div>
          <div className="big-stat-value-row">
            <span className="big-stat-value">{sensor.temp.toFixed(1)}</span>
            <span className="big-stat-unit">°C</span>
          </div>
          <span className={`badge ${tempBadgeClass}`}>{tempStatusText}</span>
          <div className="progress-track big-stat-progress">
            <div
              className="progress-fill temp"
              style={{ width: `${Math.min(100, (sensor.temp / 40) * 100)}%` }}
            ></div>
          </div>
          <div className="big-stat-range"><span>Min: 24°C</span><span>Max: 34°C</span></div>
        </div>

        <div className="card big-stat-card">
          <div className="big-stat-icon humid-bg">
            <Droplets size={26} />
          </div>
          <div className="big-stat-label">Kelembapan Relatif</div>
          <div className="big-stat-value-row">
            <span className="big-stat-value">{sensor.humidity}</span>
            <span className="big-stat-unit">%</span>
          </div>
          <span className={`badge ${humidBadgeClass}`}>{humidStatusText}</span>
          <div className="progress-track big-stat-progress">
            <div
              className="progress-fill humid"
              style={{ width: `${sensor.humidity}%` }}
            ></div>
          </div>
          <div className="big-stat-range"><span>Min: 50%</span><span>Max: 90%</span></div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="three-col-grid">
        <div className="card insight-card">
          <Sun size={22} className="insight-icon sun" />
          <h4 className="insight-title">Suhu Optimal</h4>
          <p className="insight-text">
            Rentang ideal: <strong>24-30°C</strong>. Saat ini <strong>{sensor.temp.toFixed(1)}°C</strong> zona aman.
          </p>
        </div>
        <div className="card insight-card">
          <Wind size={22} className="insight-icon wind" />
          <h4 className="insight-title">Kelembapan Udara</h4>
          <p className="insight-text">
            Kelembapan <strong>{sensor.humidity}%</strong> mendukung transpirasi tanaman.
          </p>
        </div>
        <div className="card insight-card">
          <Cloud size={22} className="insight-icon cloud" />
          <h4 className="insight-title">Indeks Kenyamanan</h4>
          <p className="insight-text">
            Kondisi mikro iklim: <strong>{hhi}</strong>. Pertumbuhan vegetatif optimal.
          </p>
        </div>
      </div>
    </div>
  );
}
