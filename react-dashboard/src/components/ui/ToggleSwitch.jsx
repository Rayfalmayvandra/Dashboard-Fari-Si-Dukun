// ══════════════════════════════════════════════
// 🔀 ToggleSwitch — Komponen Toggle Auto/Manual
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Komponen ini menampilkan switch toggle untuk berpindah antara
// mode AUTO dan MANUAL. Dilengkapi label dan deskripsi.
//
// ── Contoh Penggunaan ──────────────────────────
//   <ToggleSwitch
//     isOn={mode === 'AUTO'}
//     label="Mode Kendali"
//     descriptionOn="Otomatis oleh ESP32"
//     descriptionOff="Manual — Kontrol pengguna aktif"
//     onToggle={toggleControlMode}
//   />
//
// ── Props ───────────────────────────────────────
//   isOn           : boolean — apakah dalam posisi ON (AUTO)
//   label          : string — label utama
//   descriptionOn  : string — deskripsi saat ON
//   descriptionOff : string — deskripsi saat OFF
//   onToggle       : function — callback toggle
// ══════════════════════════════════════════════

/**
 * @param {{
 *   isOn: boolean,
 *   label?: string,
 *   descriptionOn?: string,
 *   descriptionOff?: string,
 *   onToggle: () => void
 * }} props
 */
export default function ToggleSwitch({
  isOn = true,
  label = 'Mode Kendali',
  descriptionOn = 'Otomatis oleh ESP32',
  descriptionOff = 'Manual — Kontrol pengguna aktif',
  onToggle,
}) {
  return (
    <div className="mode-toggle-row">
      <div>
        <span className="mode-toggle-title">{label}</span>
        <span className={`mode-toggle-sub ${!isOn ? 'manual-active' : ''}`}>
          {isOn ? descriptionOn : descriptionOff}
        </span>
      </div>
      <div
        className={`toggle-track ${isOn ? 'on' : 'off'}`}
        onClick={onToggle}
      >
        <div className="toggle-knob"></div>
      </div>
    </div>
  );
}
