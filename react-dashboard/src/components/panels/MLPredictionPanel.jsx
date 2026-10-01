// ══════════════════════════════════════════════
// 🧠 MLPredictionPanel — Panel Prediksi Machine Learning
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Panel gabungan yang menampilkan hasil prediksi ML: tanaman rekomendasi,
// akurasi model, alasan logis, dan alternatif tanaman.
// Terdiri dari komponen Badge dan ProgressBar.
//
// ── Contoh Penggunaan ──────────────────────────
//   <MLPredictionPanel mlResult={dashboard.mlResult} />
//
// ── Props ───────────────────────────────────────
//   mlResult : object — hasil dari ML engine
//     - namaTanaman    : string
//     - akurasiPercent : number
//     - statusKondisi  : string ('Sangat Layak' / 'Cukup Layak')
//     - alasanLogis    : string
//     - alternatives   : string[]
// ══════════════════════════════════════════════

import { Brain, CheckCircle2, MessageSquareText } from 'lucide-react';
import { Badge, ProgressBar } from '../ui';
import { getMLBadgeVariant } from '../../utils/helpers';

/**
 * @param {{ mlResult: object }} props
 */
export default function MLPredictionPanel({ mlResult }) {
  return (
    <div className="panel-nature">
      {/* Header */}
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
        <Badge
          variant={getMLBadgeVariant(mlResult.statusKondisi)}
          icon={<CheckCircle2 size={13} />}
        >
          {mlResult.statusKondisi}
        </Badge>
      </div>

      {/* Recommendation Box */}
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

      {/* Accuracy Progress Bar */}
      <ProgressBar
        value={mlResult.akurasiPercent}
        colorClass="ph"
        className="ml-accuracy-progress"
      />

      {/* Reason */}
      <div className="ml-reason-wrap">
        <div className="ml-reason-header">
          <MessageSquareText size={16} />
          <span className="ml-reason-label">Analisis &amp; Alasan</span>
        </div>
        <p className="ml-reason-text">{mlResult.alasanLogis}</p>
      </div>

      {/* Alternatives */}
      <div className="ml-alt-wrap">
        <span className="ml-alt-label">Alternatif Tanaman:</span>
        <div className="ml-alt-chips">
          {mlResult.alternatives.map((alt, i) => (
            <Badge key={i} variant="gray">{alt}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
