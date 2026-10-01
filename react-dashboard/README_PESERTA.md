# 🏆 Dashboard Fari Si Dukun Tanaman — Lomba React Component Assembly

## 📋 Deskripsi Lomba

Selamat datang di **Lomba Dashboard IoT React**!

Kamu diberikan sebuah project React yang sudah memiliki:
- ✅ **14 komponen UI** siap pakai (atoms)
- ✅ **2 panel gabungan** (composites)  
- ✅ **4 komponen layout** (sidebar, topbar, footer, background)
- ✅ **State management** lengkap via `useDashboard` hook
- ✅ **Utility functions** (sensor simulator, ML engine, helpers)
- ✅ **Semua CSS styling** sudah siap

**Tugasmu:** Susun **5 halaman** dashboard dengan menghubungkan komponen-komponen yang tersedia.

---

## 🚀 Cara Memulai

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka browser di http://localhost:5173
```

Saat pertama kali buka, kamu akan melihat placeholder "🏗️ Belum Disusun" di setiap halaman. Itu normal — tugasmu adalah mengisi halaman tersebut!

---

## 📂 Struktur Project

```
src/
├── components/
│   ├── ui/                    ← 🧩 KOMPONEN ATOM (siap pakai)
│   │   ├── Badge.jsx          → Label status berwarna
│   │   ├── ProgressBar.jsx    → Bar progress horizontal
│   │   ├── StatusIndicator.jsx → Dot status (ping/glow)
│   │   ├── SensorCard.jsx     → Kartu sensor individual
│   │   ├── StatCard.jsx       → Kartu statistik besar
│   │   ├── InsightCard.jsx    → Kartu insight/tip
│   │   ├── ChartPanel.jsx     → Wrapper chart dengan header
│   │   ├── ActuatorCard.jsx   → Kartu kontrol aktuator
│   │   ├── ToggleSwitch.jsx   → Toggle switch Auto/Manual
│   │   ├── PageSectionBar.jsx → Header section halaman
│   │   ├── CountdownChip.jsx  → Chip countdown timer
│   │   ├── HeroHeader.jsx     → Hero header halaman utama
│   │   ├── PaginationBar.jsx  → Kontrol paginasi
│   │   ├── DataTable.jsx      → Tabel data reusable
│   │   └── index.js           → Barrel export
│   │
│   ├── panels/                ← 🔲 PANEL GABUNGAN (siap pakai)
│   │   ├── MLPredictionPanel.jsx    → Panel prediksi ML lengkap
│   │   ├── ActuatorControlPanel.jsx → Panel kontrol aktuator lengkap
│   │   └── index.js
│   │
│   ├── layout/                ← 📐 LAYOUT (siap pakai)
│   │   ├── AnimatedBackground.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   ├── Footer.jsx
│   │   └── index.js
│   │
│   └── pages/                 ← ⚡ HALAMAN (TUGAS KAMU!)
│       ├── HomePage.jsx       → Dashboard Utama
│       ├── TelemetriPage.jsx  → Monitoring 5 Sensor
│       ├── TempHumidPage.jsx  → Detail Suhu & Kelembapan
│       ├── PhWaterPage.jsx    → Detail pH & Reservoir
│       └── HistoryPage.jsx    → Tabel Riwayat + Pagination
│
├── hooks/
│   └── useDashboard.js        ← 🎛️ State Management (siap pakai)
│
├── utils/
│   ├── constants.js           ← Konstanta & initial state
│   ├── mlEngine.js            ← ML Recommendation Engine
│   ├── sensorSimulator.js     ← Simulator data sensor IoT
│   ├── chartConfig.js         ← Konfigurasi Chart.js
│   └── helpers.js             ← Helper functions (badge, status, format)
│
├── styles/                    ← 🎨 CSS (siap pakai)
│   ├── global.css
│   ├── page-home.css
│   ├── page-telemetri.css
│   ├── page-temphumid.css
│   ├── page-phwater.css
│   └── page-history.css
│
├── App.jsx                    ← 🏠 Shell aplikasi (siap pakai)
└── main.jsx                   ← Entry point
```

---

## 🧩 Cara Menggunakan Komponen

### Import dari barrel export:
```jsx
import { Badge, SensorCard, StatCard, ChartPanel } from '../components/ui';
import { MLPredictionPanel, ActuatorControlPanel } from '../components/panels';
```

### Import individual:
```jsx
import Badge from '../components/ui/Badge';
```

### Import helper functions:
```jsx
import { getSensorBadge, getProgressWidth, formatSensorValue } from '../../utils/helpers';
```

---

## ⚡ Langkah Pengerjaan

### Halaman 1: `HomePage.jsx`
1. Uncomment import yang dibutuhkan
2. Tambahkan `<HeroHeader />`
3. Tambahkan `<PageSectionBar>` + `<CountdownChip>`
4. Buat layout 2 kolom: `<MLPredictionPanel>` + `<ActuatorControlPanel>`
5. Hapus placeholder "Belum Disusun"

### Halaman 2: `TelemetriPage.jsx`
1. Render 5 `<SensorCard>` dalam `<div className="sensor-grid">`
2. Render 2 `<ChartPanel>` dengan `<Line>` chart

### Halaman 3: `TempHumidPage.jsx`
1. `<ChartPanel wide={true}>` untuk grafik detail
2. 2 `<StatCard>` (Suhu + Kelembapan)
3. 3 `<InsightCard>` tips iklim

### Halaman 4: `PhWaterPage.jsx`
1. Mirip TempHumidPage, ganti data sensor ke pH & reservoir

### Halaman 5: `HistoryPage.jsx`
1. `<DataTable>` dengan 7 kolom
2. `<PaginationBar>` untuk navigasi halaman

---

## 📌 Aturan Lomba

1. ✅ **BOLEH** menggunakan semua komponen dari panitia
2. ✅ **BOLEH** membuat komponen sendiri sebagai pengganti
3. ✅ **BOLEH** memodifikasi komponen panitia sesuai kreativitas
4. ❌ **TIDAK BOLEH** mengubah file di folder `hooks/`, `utils/`, `layout/`
5. ❌ **TIDAK BOLEH** mengubah `App.jsx` dan `main.jsx`
6. 🎨 **BOLEH** menambahkan CSS custom

---

## 📊 Data yang Tersedia

### Sensor Data (`props.sensor`)
| Key        | Tipe   | Range   | Deskripsi          |
|------------|--------|---------|---------------------|
| temp       | number | 24-34   | Suhu udara (°C)    |
| humidity   | number | 50-90   | Kelembapan (%)     |
| pH         | number | 5.0-7.5 | pH Tanah           |
| rain       | number | 0-100   | Curah hujan (%)    |
| reservoir  | number | 20-95   | Level air (%)      |

### ML Result (`props.mlResult`)
| Key             | Tipe     | Deskripsi                    |
|-----------------|----------|-------------------------------|
| namaTanaman     | string   | Nama tanaman rekomendasi     |
| akurasiPercent  | number   | Akurasi model (82-98%)       |
| statusKondisi   | string   | "Sangat Layak" / "Cukup Layak" |
| alasanLogis     | string   | Alasan rekomendasi           |
| alternatives    | string[] | Alternatif tanaman           |

### Actuator (`props.actuator`)
| Key   | Tipe   | Values               |
|-------|--------|----------------------|
| servo | string | 'TERBUKA' / 'TERTUTUP' |
| pump  | string | 'AKTIF' / 'OFF'       |

---

## 🎯 Kriteria Penilaian

| Kriteria                    | Bobot |
|-----------------------------|-------|
| Kelengkapan 5 halaman       | 30%   |
| Ketepatan penggunaan komponen | 25% |
| Kreativitas tampilan         | 20%  |
| Kerapihan kode               | 15%  |
| Fitur tambahan (bonus)       | 10%  |

---

**Selamat mengerjakan! 🚀**

*— Panitia Lomba IT*
