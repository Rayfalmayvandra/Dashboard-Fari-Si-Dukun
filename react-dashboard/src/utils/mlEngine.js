// ── ML Recommendation Engine ──────────────
// Klasifikasi kesesuaian lahan tanam berdasarkan parameter sensor

import { round1 } from './sensorSimulator';

export function runMLRecommendationEngine(temp, humidity, pH, rain) {
  let n = '', a = 90, s = 'Sangat Layak', r = '', alt = [];

  if (rain > 50 && pH >= 5.8 && pH <= 7.2) {
    n = 'Padi (Oryza Sativa)';
    a = round1(94 + Math.random() * 4);
    r = `Intensitas hujan tinggi (${rain}%) dan pH tanah (${pH}) sangat cocok untuk genangan air sawah & pertumbuhan fase vegetatif Padi.`;
    alt = ['Jagung (82%)', 'Tebu (75%)'];
  } else if (rain <= 35 && humidity < 75 && pH >= 6.0 && pH <= 7.2) {
    n = 'Jagung (Zea Mays)';
    a = round1(91 + Math.random() * 5);
    r = `Curah hujan rendah (${rain}%) dan kelembapan ${humidity}% mendukung lahan kering ideal untuk pertumbuhan bulir Jagung.`;
    alt = ['Kedelai (86%)', 'Kacang Tanah (79%)'];
  } else if (rain <= 25 && temp >= 27 && pH >= 6.0 && pH <= 7.0) {
    n = 'Bawang Merah (Allium Cepa)';
    a = round1(88 + Math.random() * 6);
    r = `Suhu hangat (${temp}°C) dengan curah hujan rendah mencegah pembusukan umbi Bawang Merah.`;
    alt = ['Cabai (84%)', 'Tomat (78%)'];
  } else if (rain > 30 && rain <= 60 && temp >= 24 && temp <= 30) {
    n = 'Cabai Merah (Capsicum Annuum)';
    a = round1(89 + Math.random() * 5);
    r = `Suhu (${temp}°C) dan pasokan air moderat ideal untuk perkembangan bunga & pembentukan buah Cabai.`;
    alt = ['Tomat (85%)', 'Terong (80%)'];
  } else if (pH < 5.8) {
    n = 'Kedelai (Glycine Max)';
    a = round1(82 + Math.random() * 6);
    s = 'Cukup Layak';
    r = `Tanah agak asam (pH ${pH}). Kedelai memiliki toleransi tinggi pada pH di bawah netral. Disarankan pengapuran dolomit.`;
    alt = ['Kacang Hijau (78%)', 'Ubi Kayu (72%)'];
  } else {
    n = 'Tomat (Solanum Lycopersicum)';
    a = round1(84 + Math.random() * 5);
    s = 'Cukup Layak';
    r = `Kombinasi parameter tanah dan udara berada pada rentang moderat yang cocok untuk tanaman hortikultura Tomat.`;
    alt = ['Terong (81%)', 'Kangkung (76%)'];
  }

  return { namaTanaman: n, akurasiPercent: a, statusKondisi: s, alasanLogis: r, alternatives: alt };
}
