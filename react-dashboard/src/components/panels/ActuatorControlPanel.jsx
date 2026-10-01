// ══════════════════════════════════════════════
// ⚙️ ActuatorControlPanel — Panel Kontrol Aktuator
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Panel gabungan yang menampilkan toggle mode (Auto/Manual)
// dan 2 kartu aktuator (Servo + Pompa). Terdiri dari
// ToggleSwitch, ActuatorCard, dan StatusIndicator.
//
// ── Contoh Penggunaan ──────────────────────────
//   <ActuatorControlPanel
//     actuator={dashboard.actuator}
//     mode={dashboard.mode}
//     toggleControlMode={dashboard.toggleControlMode}
//     toggleManualActuator={dashboard.toggleManualActuator}
//   />
//
// ── Props ───────────────────────────────────────
//   actuator            : { servo: string, pump: string }
//   mode                : 'AUTO' | 'MANUAL'
//   toggleControlMode   : function
//   toggleManualActuator: (device: string) => void
// ══════════════════════════════════════════════

import { Settings2, GitFork, Power, ShieldCheck } from 'lucide-react';
import { ActuatorCard, ToggleSwitch } from '../ui';

/**
 * @param {{
 *   actuator: { servo: string, pump: string },
 *   mode: string,
 *   toggleControlMode: () => void,
 *   toggleManualActuator: (device: string) => void
 * }} props
 */
export default function ActuatorControlPanel({
  actuator, mode,
  toggleControlMode, toggleManualActuator,
}) {
  const isAuto = mode === 'AUTO';
  const lastUpdate = new Date().toLocaleTimeString('id-ID');

  return (
    <div className="card p-7 flex-col-card">
      {/* Panel Header */}
      <div className="panel-header actuator-panel-header">
        <div className="panel-header-left">
          <div className="panel-icon-box">
            <Settings2 size={22} />
          </div>
          <div>
            <h3 className="panel-title">Kontrol Aktuator</h3>
            <p className="panel-sub">Otomasi &amp; Pemanenan Air</p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <ToggleSwitch
        isOn={isAuto}
        onToggle={toggleControlMode}
      />

      {/* Servo Gate */}
      <ActuatorCard
        icon={<GitFork size={19} />}
        iconClass="rain"
        title="Servo Gerbang Parit"
        subtitle="Pemanenan Air Hujan"
        badgeText={actuator.servo}
        badgeVariant={actuator.servo === 'TERBUKA' ? 'green' : 'gray'}
        infoLabel="Sudut"
        infoValue={actuator.servo === 'TERBUKA' ? '90° (Tampung)' : '0° (Buang)'}
        onToggle={() => toggleManualActuator('servo')}
        disabled={isAuto}
      />

      {/* Irrigation Pump */}
      <ActuatorCard
        icon={<Power size={19} />}
        iconClass="ph"
        title="Pompa Irigasi"
        subtitle="Relay Module"
        badgeText={actuator.pump === 'AKTIF' ? 'AKTIF' : 'NON-AKTIF'}
        badgeVariant={actuator.pump === 'AKTIF' ? 'green' : 'gray'}
        infoLabel="Debit"
        infoValue={actuator.pump === 'AKTIF' ? '12.5 L/min' : '0 L/menit'}
        infoClass={actuator.pump === 'AKTIF' ? 'cell-actuator-active' : 'actuator-flow-text'}
        onToggle={() => toggleManualActuator('pump')}
        disabled={isAuto}
      />

      {/* Footer */}
      <div className="actuator-footer-bar">
        <span className="actuator-interlock">
          <ShieldCheck size={16} />
          Interlock Active
        </span>
        <span className="actuator-timestamp">{lastUpdate}</span>
      </div>
    </div>
  );
}
