// ══════════════════════════════════════════════════════════════
// ⚡ HALAMAN 5: HISTORY PAGE — Log Riwayat Telemetri
// ══════════════════════════════════════════════════════════════
//
// 🎯 TUGAS PESERTA:
//    Susun halaman riwayat telemetri yang menampilkan tabel data
//    sensor dengan pagination.
//
// 📦 KOMPONEN YANG TERSEDIA (dari Panitia):
//    - PageSectionBar → Bar judul section
//    - Badge          → Badge status
//    - DataTable      → Tabel data reusable
//    - PaginationBar  → Kontrol paginasi
//
// 💡 TIPS:
//    - Gunakan className "history-card" untuk wrapper card
//    - DataTable menerima columns, data, dan renderRow callback
//    - PaginationBar menghandle tombol prev/next
//
// ══════════════════════════════════════════════════════════════

// ── Import komponen dari panitia (uncomment yang dibutuhkan) ──
// import { PageSectionBar, Badge, DataTable, PaginationBar } from '../ui';
// import { ScrollText, Radio } from 'lucide-react';

/**
 * Props yang diterima dari App.jsx:
 * @param {object} props
 * @param {object[]} props.paginatedHistory - Data riwayat halaman aktif
 * @param {object[]} props.history          - Seluruh data riwayat
 * @param {number}   props.historyPage      - Halaman aktif
 * @param {number}   props.totalPages       - Total halaman
 * @param {number}   props.historyStart     - Index awal data halaman ini
 * @param {number}   props.historyEnd       - Index akhir data halaman ini
 * @param {function} props.prevHistoryPage  - Navigasi ke halaman sebelumnya
 * @param {function} props.nextHistoryPage  - Navigasi ke halaman berikutnya
 */
export default function HistoryPage({
  paginatedHistory, history,
  historyPage, totalPages,
  historyStart, historyEnd,
  prevHistoryPage, nextHistoryPage,
}) {
  // ╔══════════════════════════════════════════════════╗
  // ║  TODO: Susun halaman History di sini!           ║
  // ║                                                  ║
  // ║  Petunjuk:                                       ║
  // ║  1. PageSectionBar                               ║
  // ║  2. Card wrapper dengan panel header             ║
  // ║  3. DataTable dengan 7 kolom                     ║
  // ║  4. PaginationBar                                ║
  // ╚══════════════════════════════════════════════════╝

  // Daftar kolom tabel:
  // const TABLE_COLUMNS = ['Waktu', 'Suhu / RH', 'pH', 'Rain / Reservoir', 'Servo', 'Pompa', 'ML Rekomendasi'];

  return (
    <div className="slide-inner">
      {/* 
        ========================================
        TODO 1: PageSectionBar
        ========================================
        Contoh:
        <PageSectionBar
          icon={<ScrollText size={20} />}
          title="Log Riwayat Telemetri"
          rightContent={
            <div className="countdown-chip">
              <div className="glow-dot xs"></div>
              <span className="countdown-text">Maks. 10 per Halaman</span>
            </div>
          }
        />
      */}

      {/* 
        ========================================
        TODO 2: Card + Panel Header + DataTable + PaginationBar
        ========================================
        Contoh:
        <div className="card history-card">
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
            <Badge variant="amber" icon={<Radio size={13} />}>Live Stream</Badge>
          </div>

          <DataTable
            columns={TABLE_COLUMNS}
            data={paginatedHistory}
            emptyMessage="Belum ada data riwayat telemetri"
            renderRow={(row, idx) => (
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
                <td><Badge variant="green">{row.crop}</Badge></td>
              </tr>
            )}
          />

          <PaginationBar
            currentPage={historyPage}
            totalPages={totalPages}
            totalItems={history.length}
            startItem={historyStart}
            endItem={historyEnd}
            onPrev={prevHistoryPage}
            onNext={nextHistoryPage}
          />
        </div>
      */}

      {/* Hapus teks ini setelah selesai mengerjakan */}
      <div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
        <h2>🏗️ Halaman History — Belum Disusun</h2>
        <p>Buka file <code>HistoryPage.jsx</code> dan ikuti instruksi TODO di dalamnya.</p>
      </div>
    </div>
  );
}
