// ══════════════════════════════════════════════
// 🔧 Helpers — Fungsi-Fungsi Pembantu
// ══════════════════════════════════════════════
// DISEDIAKAN OLEH PANITIA LOMBA
//
// Kumpulan fungsi utilitas yang berguna untuk memproses
// data sensor dan menentukan status badge / progress bar.
//
// Peserta BOLEH menggunakan helper ini, atau membuat sendiri.
// ══════════════════════════════════════════════

// ── Sensor Badge Status ─────────────────────
// Menentukan teks dan warna badge berdasarkan tipe sensor dan nilainya.
//
// Contoh:
//   const [text, variant] = getSensorBadge('temp', 28.5);
//   // → ['Optimal', 'green']
//
export function getSensorBadge(key, value) {
  switch (key) {
    case 'temp':
      if (value > 32) return ['Panas', 'amber'];
      if (value < 25) return ['Sejuk', 'blue'];
      return ['Optimal', 'green'];
    case 'humidity':
      if (value > 80) return ['Sangat Lembap', 'blue'];
      if (value < 55) return ['Kering', 'amber'];
      return ['Lembap', 'blue'];
    case 'pH':
      if (value < 5.5) return ['Asam', 'red'];
      if (value > 7.5) return ['Basa', 'amber'];
      return ['Netral', 'green'];
    case 'rain':
      if (value > 60) return ['Deras', 'blue'];
      if (value > 20) return ['Gerimis', 'blue'];
      return ['Cerah', 'amber'];
    case 'reservoir':
      if (value < 30) return ['Rendah', 'red'];
      if (value > 85) return ['Penuh', 'teal'];
      return ['Aman', 'green'];
    default:
      return ['—', 'gray'];
  }
}

// ── Progress Width Calculator ───────────────
// Menghitung persentase lebar progress bar berdasarkan tipe sensor.
//
// Contoh:
//   getProgressWidth('temp', 28.5)   → 71.25
//   getProgressWidth('pH', 6.5)      → 46.43
//
export function getProgressWidth(key, value) {
  switch (key) {
    case 'temp': return Math.min(100, (value / 40) * 100);
    case 'humidity': return value;
    case 'pH': return (value / 14) * 100;
    case 'rain': return value;
    case 'reservoir': return value;
    default: return 0;
  }
}

// ── Progress Color Class ────────────────────
// Mendapatkan CSS class warna progress bar dari tipe sensor.
//
export function getProgressColor(key) {
  const map = { temp: 'temp', humidity: 'humid', pH: 'ph', rain: 'rain', reservoir: 'water' };
  return map[key] || 'temp';
}

// ── Format Value ────────────────────────────
// Memformat nilai sensor sesuai tipenya (desimal untuk temp/pH).
//
export function formatSensorValue(key, value) {
  if (key === 'temp' || key === 'pH') return value.toFixed(1);
  return value;
}

// ── Temperature Status (Detail Page) ────────
export function getTempStatus(temp) {
  if (temp > 32) return ['Panas (>32°C)', 'amber'];
  if (temp < 25) return ['Sejuk (<24°C)', 'blue'];
  return ['Optimal (24-32°C)', 'green'];
}

// ── Humidity Status (Detail Page) ────────
export function getHumidStatus(humidity) {
  if (humidity > 80) return ['Sangat Lembap', 'blue'];
  if (humidity < 55) return ['Kering', 'amber'];
  return ['Lembap (>65%)', 'green'];
}

// ── Heat-Humidity Index ─────────────────────
export function getHHI(temp, humidity) {
  if (temp < 27 && humidity < 70) return 'Sangat Baik';
  if (temp < 30 && humidity < 80) return 'Baik';
  if (temp < 33 && humidity < 85) return 'Cukup';
  return 'Kurang Ideal';
}

// ── pH Status (Detail Page) ─────────────────
export function getPhStatus(pH) {
  if (pH < 5.5) return ['Asam (<5.5)', 'red'];
  if (pH > 7.5) return ['Basa (>7.5)', 'amber'];
  return ['Netral (6.0-7.0)', 'green'];
}

// ── Reservoir Status (Detail Page) ──────────
export function getResStatus(reservoir) {
  if (reservoir < 20) return ['Kritis (<20%)', 'red'];
  if (reservoir > 85) return ['Penuh (>85%)', 'teal'];
  return ['Aman (>30%)', 'green'];
}

// ── ML Badge Class ──────────────────────────
export function getMLBadgeVariant(statusKondisi) {
  if (statusKondisi === 'Sangat Layak') return 'green';
  if (statusKondisi === 'Cukup Layak') return 'amber';
  return 'red';
}
