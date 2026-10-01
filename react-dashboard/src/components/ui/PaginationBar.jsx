// ══════════════════════════════════════════════
// 📄 PaginationBar — Kontrol Paginasi Tabel
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan bar paginasi dengan info halaman,
// tombol navigasi, dan badge halaman aktif.
//
// ── Contoh Penggunaan ──────────────────────────
//   <PaginationBar
//     currentPage={2}
//     totalPages={5}
//     totalItems={50}
//     startItem={11}
//     endItem={20}
//     onPrev={() => setPage(p => p - 1)}
//     onNext={() => setPage(p => p + 1)}
//   />
//
// ── Props ───────────────────────────────────────
//   currentPage : number — halaman aktif
//   totalPages  : number — total halaman
//   totalItems  : number — total data keseluruhan
//   startItem   : number — nomor data awal halaman ini
//   endItem     : number — nomor data akhir halaman ini
//   onPrev      : function — callback tombol sebelumnya
//   onNext      : function — callback tombol berikutnya
// ══════════════════════════════════════════════

/**
 * @param {{
 *   currentPage: number,
 *   totalPages: number,
 *   totalItems: number,
 *   startItem: number,
 *   endItem: number,
 *   onPrev: () => void,
 *   onNext: () => void
 * }} props
 */
export default function PaginationBar({
  currentPage = 1, totalPages = 1,
  totalItems = 0, startItem = 0, endItem = 0,
  onPrev, onNext,
}) {
  const info = totalItems > 0
    ? `Menampilkan ${startItem + 1}-${endItem} dari ${totalItems} data`
    : '0 data';

  return (
    <div className="pagination-bar">
      <div className="pagination-info">{info}</div>
      <div className="pagination-buttons">
        <button
          className="btn-page"
          onClick={onPrev}
          disabled={currentPage <= 1}
        >
          &larr; Sebelumnya
        </button>
        <span className="pagination-badge">
          Halaman {currentPage} / {totalPages}
        </span>
        <button
          className="btn-page"
          onClick={onNext}
          disabled={currentPage >= totalPages}
        >
          Berikutnya &rarr;
        </button>
      </div>
    </div>
  );
}
