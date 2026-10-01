// ══════════════════════════════════════════════
// 📉 ChartPanel — Panel Wrapper untuk Chart
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini membungkus chart (react-chartjs-2) dengan header,
// judul, subjudul, legend, dan ikon. Digunakan di telemetri dan detail.
//
// ── Contoh Penggunaan ──────────────────────────
//   import { Line } from 'react-chartjs-2';
//   import { LineChart } from 'lucide-react';
//
//   <ChartPanel
//     icon={<LineChart size={22} />}
//     iconClass="temp"
//     title="Suhu & Kelembapan"
//     subtitle="10 pembacaan terakhir"
//     legends={[
//       { label: 'Suhu', className: 'legend-temp' },
//       { label: 'RH%', className: 'legend-humid' },
//     ]}
//     wide={false}
//   >
//     <Line data={chartData} options={options} />
//   </ChartPanel>
//
// ── Props ───────────────────────────────────────
//   icon      : ReactNode — ikon header chart
//   iconClass : string — CSS class warna ikon (temp/ph)
//   title     : string — judul chart
//   subtitle  : string — subjudul chart
//   legends   : Array<{ label: string, className: string }> — items legend
//   wide      : boolean — apakah chart full-width (untuk halaman detail)
//   children  : ReactNode — komponen <Line /> dari react-chartjs-2
// ══════════════════════════════════════════════

/**
 * @param {{
 *   icon: React.ReactNode,
 *   iconClass?: string,
 *   title: string,
 *   subtitle?: string,
 *   legends?: Array<{ label: string, className: string }>,
 *   wide?: boolean,
 *   children: React.ReactNode
 * }} props
 */
export default function ChartPanel({
  icon, iconClass = 'temp',
  title, subtitle = '',
  legends = [],
  wide = false,
  children,
}) {
  return (
    <div className={`card p-6 ${wide ? 'detail-chart-card detail-chart-wide' : ''}`}>
      <div className="chart-header">
        <div className="chart-header-left">
          <div className={`sensor-icon-box ${iconClass} chart-header-icon`}>
            {icon}
          </div>
          <div>
            <h3 className="chart-title">{title}</h3>
            {subtitle && <p className="chart-sub">{subtitle}</p>}
          </div>
        </div>
        {legends.length > 0 && (
          <div className="chart-legend">
            {legends.map((legend, i) => (
              <span key={i} className={`legend-item ${legend.className}`}>
                <span className="legend-dot"></span>
                {legend.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={`chart-wrapper ${wide ? 'detail-chart-wrapper' : ''}`}>
        {children}
      </div>
    </div>
  );
}
