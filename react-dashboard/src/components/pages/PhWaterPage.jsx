// ── PhWaterPage ──────────────────────────
// Halaman detail pH Tanah & Reservoir Air

import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  FlaskConical, Waves, TrendingUp, CheckCircle, Droplets,
} from 'lucide-react';
import { getSharedOptions, createDataset } from '../../utils/chartConfig';

function getPhStatus(pH) {
  if (pH < 5.5) return ['Asam (<5.5)', 'badge-red'];
  if (pH > 7.5) return ['Basa (>7.5)', 'badge-amber'];
  return ['Netral (6.0-7.0)', 'badge-green'];
}

function getResStatus(reservoir) {
  if (reservoir < 20) return ['Kritis (<20%)', 'badge-red'];
  if (reservoir > 85) return ['Penuh (>85%)', 'badge-teal'];
  return ['Aman (>30%)', 'badge-green'];
}

export default function PhWaterPage({ sensor, chartData }) {
  const chartDataMemo = useMemo(() => ({
    labels: chartData.labels,
    datasets: [
      { ...createDataset('pH', 'rgb(76,175,80)', 'y'), data: chartData.phData },
      { ...createDataset('Level', 'rgb(0,150,136)', 'y1'), data: chartData.reservoirData },
    ],
  }), [chartData.labels, chartData.phData, chartData.reservoirData]);

  const options = useMemo(() => getSharedOptions('pH', 4, 8.5, 'Level (%)', 0, 100), []);

  const [phStatusText, phBadgeClass] = getPhStatus(sensor.pH);
  const [resStatusText, resBadgeClass] = getResStatus(sensor.reservoir);

  return (
    <div className="slide-inner">
      <div className="page-section-bar">
        <h2 className="section-title">
          <FlaskConical size={20} />
          pH Tanah &amp; Reservoir
        </h2>
        <span className="badge badge-green">Elektroda &amp; HC-SR04</span>
      </div>

      {/* Wide Chart */}
      <div className="card p-6 detail-chart-card detail-chart-wide">
        <div className="chart-header">
          <div className="chart-header-left">
            <div className="sensor-icon-box ph chart-header-icon">
              <TrendingUp size={22} />
            </div>
            <div>
              <h3 className="chart-title">Grafik pH Tanah &amp; Level Reservoir</h3>
              <p className="chart-sub">Riwayat 10 pembacaan nutrisi dan penampungan</p>
            </div>
          </div>
          <div className="chart-legend">
            <span className="legend-item legend-ph"><span className="legend-dot"></span>pH</span>
            <span className="legend-item legend-water"><span className="legend-dot"></span>Level (%)</span>
          </div>
        </div>
        <div className="chart-wrapper detail-chart-wrapper">
          <Line data={chartDataMemo} options={options} />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="detail-stats-row">
        <div className="card big-stat-card">
          <div className="big-stat-icon ph-bg">
            <FlaskConical size={26} />
          </div>
          <div className="big-stat-label">pH Tanah Saat Ini</div>
          <div className="big-stat-value-row">
            <span className="big-stat-value">{sensor.pH.toFixed(1)}</span>
            <span className="big-stat-unit">pH</span>
          </div>
          <span className={`badge ${phBadgeClass}`}>{phStatusText}</span>
          <div className="progress-track big-stat-progress">
            <div
              className="progress-fill ph"
              style={{ width: `${(sensor.pH / 14) * 100}%` }}
            ></div>
          </div>
          <div className="big-stat-range"><span>Asam: &lt;5.5</span><span>Basa: &gt;7.5</span></div>
        </div>

        <div className="card big-stat-card">
          <div className="big-stat-icon water-bg">
            <Waves size={26} />
          </div>
          <div className="big-stat-label">Level Reservoir</div>
          <div className="big-stat-value-row">
            <span className="big-stat-value">{sensor.reservoir}</span>
            <span className="big-stat-unit">%</span>
          </div>
          <span className={`badge ${resBadgeClass}`}>{resStatusText}</span>
          <div className="progress-track big-stat-progress">
            <div
              className="progress-fill water"
              style={{ width: `${sensor.reservoir}%` }}
            ></div>
          </div>
          <div className="big-stat-range"><span>Kritis: &lt;20%</span><span>Penuh: 100%</span></div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="three-col-grid">
        <div className="card insight-card acid">
          <FlaskConical size={22} className="insight-icon" />
          <h4 className="insight-title">pH Asam (&lt;6.0)</h4>
          <p className="insight-text">
            Bila masam, tambahkan <strong>dolomit</strong> untuk menaikkan pH ke zona optimal.
          </p>
        </div>
        <div className="card insight-card neutral">
          <CheckCircle size={22} className="insight-icon" />
          <h4 className="insight-title">pH Netral (6.0-7.0)</h4>
          <p className="insight-text">
            pH <strong>{sensor.pH.toFixed(1)}</strong> sangat baik untuk Padi, Jagung, Cabai.
          </p>
        </div>
        <div className="card insight-card reservoir">
          <Droplets size={22} className="insight-icon" />
          <h4 className="insight-title">Reservoir {sensor.reservoir}%</h4>
          <p className="insight-text">
            Cadangan air memadai. Irigasi siap otomatis saat dibutuhkan.
          </p>
        </div>
      </div>
    </div>
  );
}
