// ── TelemetriPage ──────────────────────────
// Halaman telemetri sensor real-time: 5 sensor cards + 2 live charts

import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Activity, Thermometer, Droplets, FlaskConical,
  CloudRain, Waves, LineChart, TrendingUp,
} from 'lucide-react';
import { getSharedOptions, createDataset } from '../../utils/chartConfig';

const SENSORS = [
  { key: 'temp', label: 'Suhu Udara', unit: '°C', source: 'DHT22', icon: Thermometer, iconClass: 'temp' },
  { key: 'humidity', label: 'Kelembapan', unit: '%', source: 'DHT22', icon: Droplets, iconClass: 'humid' },
  { key: 'pH', label: 'pH Tanah', unit: 'pH', source: 'Electro Probe', icon: FlaskConical, iconClass: 'ph' },
  { key: 'rain', label: 'Curah Hujan', unit: '%', source: 'Raindrop', icon: CloudRain, iconClass: 'rain' },
  { key: 'reservoir', label: 'Reservoir', unit: '%', source: 'HC-SR04', icon: Waves, iconClass: 'water' },
];

function getSensorBadge(key, value) {
  switch (key) {
    case 'temp':
      if (value > 32) return ['Panas', 'badge-amber'];
      if (value < 25) return ['Sejuk', 'badge-blue'];
      return ['Optimal', 'badge-green'];
    case 'humidity':
      if (value > 80) return ['Sangat Lembap', 'badge-blue'];
      if (value < 55) return ['Kering', 'badge-amber'];
      return ['Lembap', 'badge-blue'];
    case 'pH':
      if (value < 5.5) return ['Asam', 'badge-red'];
      if (value > 7.5) return ['Basa', 'badge-amber'];
      return ['Netral', 'badge-green'];
    case 'rain':
      if (value > 60) return ['Deras', 'badge-blue'];
      if (value > 20) return ['Gerimis', 'badge-blue'];
      return ['Cerah', 'badge-amber'];
    case 'reservoir':
      if (value < 30) return ['Rendah', 'badge-red'];
      if (value > 85) return ['Penuh', 'badge-teal'];
      return ['Aman', 'badge-green'];
    default:
      return ['—', 'badge-gray'];
  }
}

function getProgressWidth(key, value) {
  switch (key) {
    case 'temp': return Math.min(100, (value / 40) * 100);
    case 'humidity': return value;
    case 'pH': return (value / 14) * 100;
    case 'rain': return value;
    case 'reservoir': return value;
    default: return 0;
  }
}

function getProgressClass(key) {
  const map = { temp: 'temp', humidity: 'humid', pH: 'ph', rain: 'rain', reservoir: 'water' };
  return map[key] || 'temp';
}

function formatValue(key, value) {
  if (key === 'temp' || key === 'pH') return value.toFixed(1);
  return value;
}

export default function TelemetriPage({ sensor, chartData }) {
  // Chart data for Temp & Humidity
  const tempHumChartData = useMemo(() => ({
    labels: chartData.labels,
    datasets: [
      { ...createDataset('Suhu', 'rgb(255,152,0)', 'y'), data: chartData.tempData },
      { ...createDataset('RH%', 'rgb(33,150,243)', 'y1'), data: chartData.humidData },
    ],
  }), [chartData.labels, chartData.tempData, chartData.humidData]);

  const tempHumOptions = useMemo(() => getSharedOptions('Suhu (°C)', 20, 40, 'RH (%)', 40, 100), []);

  // Chart data for pH & Water
  const phWaterChartData = useMemo(() => ({
    labels: chartData.labels,
    datasets: [
      { ...createDataset('pH', 'rgb(76,175,80)', 'y'), data: chartData.phData },
      { ...createDataset('Level', 'rgb(0,150,136)', 'y1'), data: chartData.reservoirData },
    ],
  }), [chartData.labels, chartData.phData, chartData.reservoirData]);

  const phWaterOptions = useMemo(() => getSharedOptions('pH', 4, 8.5, 'Level (%)', 0, 100), []);

  return (
    <div className="slide-inner">
      <div className="page-section-bar">
        <h2 className="section-title">
          <Activity size={20} />
          Telemetri Sensor Real-Time
        </h2>
        <div className="countdown-chip">
          <div className="glow-dot xs"></div>
          <span className="countdown-text">Live 5 Sensor IoT</span>
        </div>
      </div>

      {/* 5 Sensor Cards */}
      <div className="sensor-grid">
        {SENSORS.map((s) => {
          const Icon = s.icon;
          const value = sensor[s.key];
          const [badgeText, badgeClass] = getSensorBadge(s.key, value);
          return (
            <div key={s.key} className="card p-5">
              <div className="sensor-card-header">
                <span className="sensor-label">{s.label}</span>
                <div className={`sensor-icon-box ${s.iconClass}`}>
                  <Icon size={22} />
                </div>
              </div>
              <div className="sensor-value-row">
                <span className="sensor-value">{formatValue(s.key, value)}</span>
                <span className="sensor-unit">{s.unit}</span>
              </div>
              <div className="sensor-footer">
                <span className="sensor-source">{s.source}</span>
                <span className={`badge ${badgeClass}`}>{badgeText}</span>
              </div>
              <div className="progress-track mt-3">
                <div
                  className={`progress-fill ${getProgressClass(s.key)}`}
                  style={{ width: `${getProgressWidth(s.key, value)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 Live Charts */}
      <div className="two-col-grid">
        <div className="card p-6">
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="sensor-icon-box temp chart-header-icon">
                <LineChart size={22} />
              </div>
              <div>
                <h3 className="chart-title">Suhu &amp; Kelembapan</h3>
                <p className="chart-sub">10 pembacaan terakhir</p>
              </div>
            </div>
            <div className="chart-legend">
              <span className="legend-item legend-temp"><span className="legend-dot"></span>Suhu</span>
              <span className="legend-item legend-humid"><span className="legend-dot"></span>RH%</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={tempHumChartData} options={tempHumOptions} />
          </div>
        </div>

        <div className="card p-6">
          <div className="chart-header">
            <div className="chart-header-left">
              <div className="sensor-icon-box ph chart-header-icon">
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 className="chart-title">pH Tanah &amp; Reservoir</h3>
                <p className="chart-sub">10 pembacaan terakhir</p>
              </div>
            </div>
            <div className="chart-legend">
              <span className="legend-item legend-ph"><span className="legend-dot"></span>pH</span>
              <span className="legend-item legend-water"><span className="legend-dot"></span>Level%</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={phWaterChartData} options={phWaterOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
