// ── HistoryPage ──────────────────────────
// Log riwayat telemetri dengan tabel & pagination

import { ScrollText, Radio } from 'lucide-react';

export default function HistoryPage({
  paginatedHistory, history,
  historyPage, totalPages,
  historyStart, historyEnd,
  prevHistoryPage, nextHistoryPage,
}) {
  return (
    <div className="slide-inner">
      <div className="page-section-bar">
        <h2 className="section-title">
          <ScrollText size={20} />
          Log Riwayat Telemetri
        </h2>
        <div className="countdown-chip">
          <div className="glow-dot xs"></div>
          <span className="countdown-text">Maks. 10 per Halaman</span>
        </div>
      </div>

      <div className="card history-card">
        {/* Panel Header */}
        <div className="panel-header history-panel-header">
          <div className="panel-header-left">
            <div className="panel-icon-box history-icon-box">
              <ScrollText size={22} />
            </div>
            <div>
              <h3 className="panel-title">Tabel Riwayat Lengkap</h3>
              <p className="panel-sub">Rekam Jejak Pembacaan Sensor &amp; Kontrol ESP32</p>
            </div>
          </div>
          <div className="badge badge-amber">
            <Radio size={13} />
            <span>Live Stream</span>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Suhu / RH</th>
                <th>pH</th>
                <th>Rain / Reservoir</th>
                <th>Servo</th>
                <th>Pompa</th>
                <th>ML Rekomendasi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-empty-row">
                    Belum ada data riwayat telemetri
                  </td>
                </tr>
              ) : (
                paginatedHistory.map((row, idx) => (
                  <tr key={`${row.time}-${idx}`}>
                    <td className="cell-time">{row.time}</td>
                    <td className="cell-temphum">{row.tempHum}</td>
                    <td className="cell-ph">{row.pH}</td>
                    <td className="cell-rainres">{row.rainRes}</td>
                    <td className={row.servo === 'TERBUKA' ? 'cell-actuator-active' : 'cell-actuator-inactive'}>
                      {row.servo}
                    </td>
                    <td className={row.pump === 'AKTIF' ? 'cell-actuator-active' : 'cell-actuator-inactive'}>
                      {row.pump}
                    </td>
                    <td>
                      <span className="badge badge-green">{row.crop}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="pagination-bar">
          <div className="pagination-info">
            {history.length > 0
              ? `Menampilkan ${historyStart + 1}-${historyEnd} dari ${history.length} data`
              : '0 data'}
          </div>
          <div className="pagination-buttons">
            <button
              className="btn-page"
              onClick={prevHistoryPage}
              disabled={historyPage <= 1}
            >
              &larr; Sebelumnya
            </button>
            <span className="pagination-badge">
              Halaman {historyPage} / {totalPages}
            </span>
            <button
              className="btn-page"
              onClick={nextHistoryPage}
              disabled={historyPage >= totalPages}
            >
              Berikutnya &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
