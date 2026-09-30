// ── HomePage ──────────────────────────────
// Dashboard utama: Prediksi ML & Kontrol Aktuator

import {
  Sparkles, Brain, CheckCircle2, MessageSquareText,
  Settings2, GitFork, Power, ShieldCheck,
} from 'lucide-react';

function getBadgeClass(status) {
  if (status === 'Sangat Layak') return 'badge-green';
  if (status === 'Cukup Layak') return 'badge-amber';
  return 'badge-red';
}

export default function HomePage({
  sensor, mlResult, actuator, mode, countdownSeconds,
  toggleControlMode, toggleManualActuator,
}) {
  const m = Math.floor(countdownSeconds / 60);
  const s = countdownSeconds % 60;
  const countdownText = `Pembaruan: ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const lastUpdate = new Date().toLocaleTimeString('id-ID');

  return (
    <div className="slide-inner">
      {/* Hero Header */}
      <div className="hero-header">
        <div className="hero-tag">
          <div className="glow-dot xs"></div>
          <span>Smart Agriculture IoT &amp; Machine Learning</span>
        </div>
        <h1 className="hero-title">
          Dashboard Fari <span className="hero-highlight">Si Dukun Tanaman</span>
        </h1>
        <p className="hero-sub">
          Sistem IoT berbasis ESP32 dan Machine Learning untuk pemanenan air hujan otomatis dan rekomendasi tanaman terbaik.
        </p>
      </div>

      <div className="page-section-bar">
        <h2 className="section-title">
          <Sparkles size={20} />
          Prediksi ML &amp; Kontrol Aktuator
        </h2>
        <div className="countdown-chip">
          <div className="glow-dot xs"></div>
          <span className="countdown-text">{countdownText}</span>
        </div>
      </div>

      <div className="two-col-grid">
        {/* Machine Learning Panel */}
        <MLPanel mlResult={mlResult} />

        {/* Actuator Control Panel */}
        <ActuatorPanel
          actuator={actuator}
          mode={mode}
          toggleControlMode={toggleControlMode}
          toggleManualActuator={toggleManualActuator}
          lastUpdate={lastUpdate}
        />
      </div>
    </div>
  );
}

// ── ML Panel Sub-component ──────────────
function MLPanel({ mlResult }) {
  return (
    <div className="panel-nature">
      <div className="panel-header">
        <div className="panel-header-left">
          <div className="panel-icon-box">
            <Brain size={22} />
          </div>
          <div>
            <h3 className="panel-title">Prediksi Machine Learning</h3>
            <p className="panel-sub">Klasifikasi Kesesuaian Lahan Tanam</p>
          </div>
        </div>
        <span className={`badge ${getBadgeClass(mlResult.statusKondisi)}`}>
          <CheckCircle2 size={13} />
          <span>{mlResult.statusKondisi}</span>
        </span>
      </div>

      <div className="ml-rec-box">
        <div className="ml-rec-left">
          <span className="ml-rec-label">Rekomendasi Tanaman Terbaik</span>
          <h4 className="ml-crop-name">{mlResult.namaTanaman}</h4>
        </div>
        <div className="ml-rec-right">
          <span className="ml-rec-label">Akurasi Model</span>
          <div className="ml-accuracy-row">
            <span className="ml-accuracy-val">{mlResult.akurasiPercent.toFixed(1)}</span>
            <span className="ml-accuracy-unit">%</span>
          </div>
        </div>
      </div>

      <div className="progress-track ml-accuracy-progress">
        <div
          className="progress-fill ph"
          style={{ width: `${mlResult.akurasiPercent}%` }}
        ></div>
      </div>

      <div className="ml-reason-wrap">
        <div className="ml-reason-header">
          <MessageSquareText size={16} />
          <span className="ml-reason-label">Analisis &amp; Alasan</span>
        </div>
        <p className="ml-reason-text">{mlResult.alasanLogis}</p>
      </div>

      <div className="ml-alt-wrap">
        <span className="ml-alt-label">Alternatif Tanaman:</span>
        <div className="ml-alt-chips">
          {mlResult.alternatives.map((alt, i) => (
            <span key={i} className="badge badge-gray">{alt}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Actuator Panel Sub-component ────────
function ActuatorPanel({ actuator, mode, toggleControlMode, toggleManualActuator, lastUpdate }) {
  const isAuto = mode === 'AUTO';
  const isManual = mode === 'MANUAL';

  return (
    <div className="card p-7 flex-col-card">
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
      <div className="mode-toggle-row">
        <div>
          <span className="mode-toggle-title">Mode Kendali</span>
          <span className={`mode-toggle-sub ${isManual ? 'manual-active' : ''}`}>
            {isAuto ? 'Otomatis oleh ESP32' : 'Manual — Kontrol pengguna aktif'}
          </span>
        </div>
        <div
          className={`toggle-track ${isAuto ? 'on' : 'off'}`}
          onClick={toggleControlMode}
        >
          <div className="toggle-knob"></div>
        </div>
      </div>

      {/* Servo Gate */}
      <div className="actuator-card">
        <div className="actuator-header">
          <div className="actuator-icon rain">
            <GitFork size={19} />
          </div>
          <div>
            <h4 className="actuator-title">Servo Gerbang Parit</h4>
            <p className="actuator-sub">Pemanenan Air Hujan</p>
          </div>
          <span className={`badge ${actuator.servo === 'TERBUKA' ? 'badge-green' : 'badge-gray'}`}>
            {actuator.servo}
          </span>
        </div>
        <div className="actuator-footer">
          <span className="actuator-info">
            Sudut: <strong>{actuator.servo === 'TERBUKA' ? '90° (Tampung)' : '0° (Buang)'}</strong>
          </span>
          <button
            onClick={() => toggleManualActuator('servo')}
            disabled={isAuto}
            className={`btn-actuator ${isAuto ? 'disabled' : 'active'}`}
          >
            Toggle
          </button>
        </div>
      </div>

      {/* Irrigation Pump */}
      <div className="actuator-card">
        <div className="actuator-header">
          <div className="actuator-icon ph">
            <Power size={19} />
          </div>
          <div>
            <h4 className="actuator-title">Pompa Irigasi</h4>
            <p className="actuator-sub">Relay Module</p>
          </div>
          <span className={`badge ${actuator.pump === 'AKTIF' ? 'badge-green' : 'badge-gray'}`}>
            {actuator.pump === 'AKTIF' ? 'AKTIF' : 'NON-AKTIF'}
          </span>
        </div>
        <div className="actuator-footer">
          <span className="actuator-info">
            Debit:{' '}
            <strong className={actuator.pump === 'AKTIF' ? 'cell-actuator-active' : 'actuator-flow-text'}>
              {actuator.pump === 'AKTIF' ? '12.5 L/min' : '0 L/menit'}
            </strong>
          </span>
          <button
            onClick={() => toggleManualActuator('pump')}
            disabled={isAuto}
            className={`btn-actuator ${isAuto ? 'disabled' : 'active'}`}
          >
            Toggle
          </button>
        </div>
      </div>

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
