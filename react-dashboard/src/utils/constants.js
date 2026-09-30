// ── Pages Registry ──────────────────────
export const PAGES = [
  { id: 'home',      title: 'Dashboard Fari Si Dukun Tanaman', sub: 'Prediksi Machine Learning & Kontrol Aktuator' },
  { id: 'telemetri', title: 'Telemetri Sensor Real-Time',      sub: 'Monitoring 5 sensor IoT lapangan' },
  { id: 'temphumid', title: 'Suhu & Kelembapan',               sub: 'DHT22 — Monitoring iklim mikro' },
  { id: 'phwater',   title: 'pH Tanah & Reservoir',            sub: 'Elektroda pH & HC-SR04' },
  { id: 'history',   title: 'Log Riwayat Telemetri',           sub: 'Rekam jejak pembacaan sensor' },
];

// ── Initial State ──────────────────────
export const INITIAL_SENSOR = { temp: 28.5, humidity: 72, pH: 6.5, rain: 45, reservoir: 68 };

export const INITIAL_ML = {
  namaTanaman: 'Cabai Merah (Capsicum Annuum)',
  akurasiPercent: 90.9,
  statusKondisi: 'Sangat Layak',
  alasanLogis: 'Suhu dan pasokan air moderat ideal untuk perkembangan bunga & pembentukan buah Cabai.',
  alternatives: ['Tomat (85%)', 'Terong (80%)'],
};

export const INITIAL_ACTUATOR = { servo: 'TERBUKA', pump: 'OFF' };

export const UPDATE_INTERVAL = 1800000; // 30 minutes
export const ITEMS_PER_PAGE = 10;
