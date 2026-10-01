// ══════════════════════════════════════════════
// 📊 DataTable — Tabel Data Reusable
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan tabel data dengan header kustom
// dan render row dinamis. Digunakan di halaman History.
//
// ── Contoh Penggunaan ──────────────────────────
//   <DataTable
//     columns={['Waktu', 'Suhu / RH', 'pH', 'Rain / Reservoir', 'Servo', 'Pompa', 'ML Rekomendasi']}
//     data={paginatedHistory}
//     renderRow={(row, idx) => (
//       <tr key={idx}>
//         <td className="cell-time">{row.time}</td>
//         <td>{row.tempHum}</td>
//         ...
//       </tr>
//     )}
//     emptyMessage="Belum ada data riwayat telemetri"
//   />
//
// ── Props ───────────────────────────────────────
//   columns      : string[] — nama kolom header
//   data         : any[] — data yang akan dirender
//   renderRow    : (row, index) => ReactNode — fungsi render per baris
//   emptyMessage : string — pesan saat data kosong
// ══════════════════════════════════════════════

/**
 * @param {{
 *   columns: string[],
 *   data: any[],
 *   renderRow: (row: any, index: number) => React.ReactNode,
 *   emptyMessage?: string
 * }} props
 */
export default function DataTable({
  columns = [],
  data = [],
  renderRow,
  emptyMessage = 'Belum ada data',
}) {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty-row">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => renderRow(row, idx))
          )}
        </tbody>
      </table>
    </div>
  );
}
