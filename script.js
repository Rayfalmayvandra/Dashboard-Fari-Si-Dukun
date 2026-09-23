// ==========================================
// DASHBOARD FARI SI DUKUN TANAMAN v2.0
// ==========================================

// ── Pages Registry ─────────────────────────
const PAGES = [
    { id: 'home',      title: 'Dashboard Fari Si Dukun Tanaman', sub: 'Prediksi Machine Learning & Kontrol Aktuator' },
    { id: 'telemetri', title: 'Telemetri Sensor Real-Time',      sub: 'Monitoring 5 sensor IoT lapangan' },
    { id: 'temphumid', title: 'Suhu & Kelembapan',             sub: 'DHT22 — Monitoring iklim mikro' },
    { id: 'phwater',   title: 'pH Tanah & Reservoir',          sub: 'Elektroda pH & HC-SR04' },
    { id: 'history',   title: 'Log Riwayat Telemetri',         sub: 'Rekam jejak pembacaan sensor' }
];

// ── State ─────────────────────────────────
const state = {
    mode: 'AUTO',
    sensor: { temp: 28.5, humidity: 72, pH: 6.5, rain: 45, reservoir: 68 },
    actuator: { servo: 'TERBUKA', pump: 'OFF' },
    mlResult: {
        namaTanaman: 'Cabai Merah (Capsicum Annuum)',
        akurasiPercent: 90.9,
        statusKondisi: 'Sangat Layak',
        alasanLogis: 'Suhu dan pasokan air moderat ideal untuk perkembangan bunga & pembentukan buah Cabai.',
        alternatives: ['Tomat (85%)', 'Terong (80%)']
    },
    history: [],
    historyPage: 1,
    itemsPerPage: 10,
    chartTempHum: null,
    chartPhWater: null,
    chartTempHumDetail: null,
    chartPhWaterDetail: null,
    maxChartPoints: 10,
    countdownSeconds: 1800,
    countdownTimer: null,
    currentPage: 'home',
    slideTimeout: null,
    UPDATE_INTERVAL: 1800000 // 30 minutes
};

// ── 1. Init ───────────────────────────────
function initDashboard() {
    if (window.lucide) lucide.createIcons();

    updateClock();
    setInterval(updateClock, 1000);

    seedInitialHistory();
    initCharts();
    runFullCycle();

    setInterval(runFullCycle, state.UPDATE_INTERVAL);
    state.countdownSeconds = 1800;
    startCountdown();
}

// Seed initial history records so pagination has multiple pages to browse
function seedInitialHistory() {
    const crops = ['Cabai', 'Padi', 'Jagung', 'Tomat', 'Bawang', 'Kedelai'];
    const now = new Date();
    for (let i = 24; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 180000);
        const timeStr = time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const t = (27 + Math.random() * 3).toFixed(1);
        const h = Math.round(65 + Math.random() * 15);
        const p = (6.2 + Math.random() * 0.7).toFixed(1);
        const r = Math.round(30 + Math.random() * 40);
        const w = Math.round(60 + Math.random() * 20);
        const s = r > 50 ? 'TERBUKA' : 'TERTUTUP';
        const pu = h < 60 ? 'AKTIF' : 'OFF';
        const c = crops[i % crops.length];

        state.history.unshift({
            time: timeStr,
            tempHum: `${t} / ${h}`,
            pH: p,
            rainRes: `${r}% / ${w}%`,
            servo: s,
            pump: pu,
            crop: c
        });
    }
}

function runFullCycle() {
    const s = simulateSensorData();
    state.sensor = s;

    const ml = runMLRecommendationEngine(s.temp, s.humidity, s.pH, s.rain);
    state.mlResult = ml;

    if (state.mode === 'AUTO') {
        evaluateActuatorAutoControl(s.rain, s.humidity, s.reservoir);
    }

    updateUI(state.sensor, state.mlResult, state.actuator);
    updateCharts(state.sensor);
    addHistoryLog(state.sensor, state.mlResult, state.actuator);

    state.countdownSeconds = 1800;
}

function startCountdown() {
    clearInterval(state.countdownTimer);
    state.countdownTimer = setInterval(() => {
        state.countdownSeconds = Math.max(0, state.countdownSeconds - 1);
        const m = Math.floor(state.countdownSeconds / 60);
        const s = state.countdownSeconds % 60;
        const el = document.getElementById('countdown-text');
        if (el) el.textContent = `Pembaruan: ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
}

function updateClock() {
    const el = document.getElementById('realtime-clock');
    if (el) el.textContent = new Date().toLocaleTimeString('id-ID', { hour12: false });
}

// ── 2. Sidebar Navigation & Push Animation ─
function toggleSidebar() {
    if (document.body.classList.contains('sidebar-open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    document.body.classList.add('sidebar-open');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
}

function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

function navigate(pageId) {
    const targetIndex = PAGES.findIndex(p => p.id === pageId);
    if (targetIndex === -1) return;

    const track = document.getElementById('pages-track');
    const slides = document.querySelectorAll('.page-slide');

    // 1. Ensure all slides are visible during horizontal slide
    slides.forEach(s => {
        s.style.visibility = 'visible';
    });

    // 2. Perform smooth horizontal slide
    if (track) {
        track.style.transform = `translateX(-${targetIndex * 20}%)`;
    }

    // 3. Highlight active slide and sidebar item
    slides.forEach((s, idx) => {
        s.classList.toggle('active-slide', idx === targetIndex);
    });

    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeNav = document.getElementById('nav-' + pageId);
    if (activeNav) activeNav.classList.add('active');

    // 4. Update topbar title & subtitle
    const pageMeta = PAGES[targetIndex];
    setText('page-title', pageMeta.title);
    setText('page-subtitle', pageMeta.sub);

    state.currentPage = pageId;
    closeSidebar();

    // 5. When slide finishes, hide inactive slides and reset scroll position
    clearTimeout(state.slideTimeout);
    state.slideTimeout = setTimeout(() => {
        slides.forEach((s, idx) => {
            if (idx !== targetIndex) {
                s.style.visibility = 'hidden';
            } else {
                s.style.visibility = 'visible';
                s.scrollTop = 0;
            }
        });

        // Trigger chart resize in case geometry updated
        if (window.Chart) {
            [state.chartTempHum, state.chartPhWater, state.chartTempHumDetail, state.chartPhWaterDetail].forEach(chart => {
                if (chart) chart.resize();
            });
        }
    }, 540);

    if (window.lucide) lucide.createIcons();
    syncSecondaryPages();
}

// ── 3. Simulate Sensor Data ───────────────
function simulateSensorData() {
    const p = state.sensor;
    let temp      = clamp(p.temp + rand(-0.8, 0.8), 24, 34);
    let humidity   = clamp(Math.round(p.humidity + rand(-3, 3)), 50, 90);
    let pH         = clamp(round1(p.pH + rand(-0.15, 0.15)), 5.0, 7.5);
    let rain       = clamp(Math.round(p.rain + rand(-6, 6)), 0, 100);
    let reservoir  = clamp(Math.round(p.reservoir + rand(-2, 2)), 20, 95);

    if (rain > 50 && state.actuator.servo === 'TERBUKA') reservoir = Math.min(98, reservoir + 1);
    if (state.actuator.pump === 'AKTIF') reservoir = Math.max(15, reservoir - 1);

    return { temp: round1(temp), humidity, pH, rain, reservoir };
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function rand(lo, hi)     { return lo + Math.random() * (hi - lo); }
function round1(v)        { return Math.round(v * 10) / 10; }

// ── 4. ML Recommendation Engine ───────────
function runMLRecommendationEngine(temp, humidity, pH, rain) {
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

// ── 5. Actuator Auto Control ──────────────
function evaluateActuatorAutoControl(rain, humidity, reservoirLevel) {
    if (state.mode !== 'AUTO') return;
    state.actuator.servo = rain > 50 ? 'TERBUKA' : 'TERTUTUP';
    state.actuator.pump = (humidity < 60 && reservoirLevel > 20) ? 'AKTIF' : 'OFF';
}

// ── 6. Update UI ──────────────────────────
function updateUI(sensor, ml, act) {
    // A. Default Dashboard: ML Section
    setText('ml-crop-name', ml.namaTanaman);
    setText('ml-accuracy', ml.akurasiPercent.toFixed(1));
    setWidth('ml-accuracy-bar', ml.akurasiPercent);
    setText('ml-reason', ml.alasanLogis);

    const mlBadge = document.getElementById('ml-status-badge');
    const mlText = document.getElementById('ml-status-text');
    if (mlBadge && mlText) {
        mlText.textContent = ml.statusKondisi;
        mlBadge.className = 'badge ' +
            (ml.statusKondisi === 'Sangat Layak' ? 'badge-green' :
             ml.statusKondisi === 'Cukup Layak'  ? 'badge-amber' : 'badge-red');
    }

    const altEl = document.getElementById('ml-alternatives');
    if (altEl && ml.alternatives) {
        altEl.innerHTML = ml.alternatives.map(a =>
            `<span class="badge badge-gray">${a}</span>`
        ).join('');
    }

    // B. Default Dashboard: Actuator Section
    const servoBadge = document.getElementById('servo-badge');
    const servoAngle = document.getElementById('servo-angle-text');
    if (servoBadge) {
        if (act.servo === 'TERBUKA') {
            servoBadge.className = 'badge badge-green';
            servoBadge.textContent = 'TERBUKA';
            if (servoAngle) servoAngle.textContent = '90° (Tampung)';
        } else {
            servoBadge.className = 'badge badge-gray';
            servoBadge.textContent = 'TERTUTUP';
            if (servoAngle) servoAngle.textContent = '0° (Buang)';
        }
    }

    const pumpBadge = document.getElementById('pump-badge');
    const pumpFlow = document.getElementById('pump-flow-text');
    if (pumpBadge) {
        if (act.pump === 'AKTIF') {
            pumpBadge.className = 'badge badge-green';
            pumpBadge.textContent = 'AKTIF';
            if (pumpFlow) {
                pumpFlow.textContent = '12.5 L/min';
                pumpFlow.className = 'cell-actuator-active';
            }
        } else {
            pumpBadge.className = 'badge badge-gray';
            pumpBadge.textContent = 'NON-AKTIF';
            if (pumpFlow) {
                pumpFlow.textContent = '0 L/menit';
                pumpFlow.className = 'actuator-flow-text';
            }
        }
    }

    setText('last-actuator-update', new Date().toLocaleTimeString('id-ID'));

    // C. Telemetri Sensor Real-Time Page
    setText('val-temp', sensor.temp.toFixed(1));
    setText('val-humidity', sensor.humidity);
    setText('val-ph', sensor.pH.toFixed(1));
    setText('val-rain', sensor.rain);
    setText('val-reservoir', sensor.reservoir);

    setWidth('bar-temp', Math.min(100, (sensor.temp / 40) * 100));
    setWidth('bar-humidity', sensor.humidity);
    setWidth('bar-ph', (sensor.pH / 14) * 100);
    setWidth('bar-rain', sensor.rain);
    setWidth('bar-reservoir', sensor.reservoir);

    setBadge('status-temp-badge',
        sensor.temp > 32 ? ['Panas', 'badge-amber'] :
        sensor.temp < 25 ? ['Sejuk', 'badge-blue'] :
                           ['Optimal', 'badge-green']);

    setBadge('status-rain-badge',
        sensor.rain > 60 ? ['Deras', 'badge-blue'] :
        sensor.rain > 20 ? ['Gerimis', 'badge-blue'] :
                           ['Cerah', 'badge-amber']);

    setBadge('status-reservoir-badge',
        sensor.reservoir < 30 ? ['Rendah', 'badge-red'] :
        sensor.reservoir > 85 ? ['Penuh', 'badge-teal'] :
                                ['Aman', 'badge-green']);

    // D. Sync detail pages
    syncSecondaryPages();
}

function syncSecondaryPages() {
    const s = state.sensor;

    // Page: Suhu & Kelembapan
    setText('th-val-temp', s.temp.toFixed(1));
    setText('th-val-humidity', s.humidity);
    setWidth('th-bar-temp', Math.min(100, (s.temp / 40) * 100));
    setWidth('th-bar-humidity', s.humidity);
    setText('th-insight-temp', s.temp.toFixed(1) + '°C');
    setText('th-insight-humidity', s.humidity + '%');

    const thStatusTemp = document.getElementById('th-status-temp');
    if (thStatusTemp) {
        thStatusTemp.className = 'badge ' + (s.temp > 32 ? 'badge-amber' : s.temp < 25 ? 'badge-blue' : 'badge-green');
        thStatusTemp.textContent = s.temp > 32 ? 'Panas (>32°C)' : s.temp < 25 ? 'Sejuk (<24°C)' : 'Optimal (24-32°C)';
    }

    const thStatusHumid = document.getElementById('th-status-humidity');
    if (thStatusHumid) {
        thStatusHumid.className = 'badge ' + (s.humidity > 80 ? 'badge-blue' : s.humidity < 55 ? 'badge-amber' : 'badge-green');
        thStatusHumid.textContent = s.humidity > 80 ? 'Sangat Lembap' : s.humidity < 55 ? 'Kering' : 'Lembap (>65%)';
    }

    const hhi = s.temp < 27 && s.humidity < 70 ? 'Sangat Baik' :
                s.temp < 30 && s.humidity < 80 ? 'Baik' :
                s.temp < 33 && s.humidity < 85 ? 'Cukup' : 'Kurang Ideal';
    setText('th-hhi', hhi);

    // Page: pH & Reservoir
    setText('pw-val-ph', s.pH.toFixed(1));
    setText('pw-val-reservoir', s.reservoir);
    setWidth('pw-bar-ph', (s.pH / 14) * 100);
    setWidth('pw-bar-reservoir', s.reservoir);
    setText('pw-insight-ph', s.pH.toFixed(1));
    setText('pw-insight-res', s.reservoir + '%');

    const pwStatusPh = document.getElementById('pw-status-ph');
    if (pwStatusPh) {
        pwStatusPh.className = 'badge ' + (s.pH < 5.5 ? 'badge-red' : s.pH > 7.5 ? 'badge-amber' : 'badge-green');
        pwStatusPh.textContent = s.pH < 5.5 ? 'Asam (<5.5)' : s.pH > 7.5 ? 'Basa (>7.5)' : 'Netral (6.0-7.0)';
    }

    const pwStatusRes = document.getElementById('pw-status-reservoir');
    if (pwStatusRes) {
        pwStatusRes.className = 'badge ' + (s.reservoir < 20 ? 'badge-red' : s.reservoir > 85 ? 'badge-teal' : 'badge-green');
        pwStatusRes.textContent = s.reservoir < 20 ? 'Kritis (<20%)' : s.reservoir > 85 ? 'Penuh (>85%)' : 'Aman (>30%)';
    }
}

function setText(id, val) { const e = document.getElementById(id); if (e) e.textContent = val; }
function setWidth(id, pct) { const e = document.getElementById(id); if (e) e.style.width = pct + '%'; }
function setBadge(id, [text, cls]) {
    const e = document.getElementById(id);
    if (e) { e.textContent = text; e.className = 'badge ' + cls; }
}

// ── 7. Charts ─────────────────────────────
function initCharts() {
    Chart.defaults.color = '#6e6e62';
    Chart.defaults.borderColor = '#e5e5dc';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
    Chart.defaults.font.size = 12;

    const sharedOpts = (y1Label, y1Min, y1Max, y2Label, y2Min, y2Max) => ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(36, 36, 30, 0.94)',
                titleFont: { size: 13, family: "'Plus Jakarta Sans', sans-serif", weight: '700' },
                bodyFont: { size: 12.5, family: "'Plus Jakarta Sans', sans-serif" },
                padding: 12,
                cornerRadius: 10,
                displayColors: true,
                boxPadding: 6,
                usePointStyle: true
            }
        },
        elements: {
            point: { radius: 5.5, hoverRadius: 8.5, borderWidth: 2.5, backgroundColor: '#ffffff' },
            line:  { borderWidth: 3.2 }
        },
        scales: {
            x: {
                grid: { color: '#f4f4ee', lineWidth: 1 },
                ticks: { font: { size: 12, family: 'JetBrains Mono' }, color: '#9c9c8e' }
            },
            y: {
                position: 'left',
                title: { display: true, text: y1Label, color: '#6e6e62', font: { size: 13, weight: '700' } },
                min: y1Min, max: y1Max,
                grid: { color: '#f4f4ee', lineWidth: 1 },
                ticks: { font: { size: 12 } }
            },
            y1: {
                position: 'right',
                title: { display: true, text: y2Label, color: '#6e6e62', font: { size: 13, weight: '700' } },
                min: y2Min, max: y2Max,
                grid: { drawOnChartArea: false },
                ticks: { font: { size: 12 } }
            }
        }
    });

    const ds = (label, color) => ({
        label, data: [],
        borderColor: color,
        backgroundColor: color.replace(')', ',0.08)').replace('rgb', 'rgba'),
        tension: 0.4, fill: true
    });

    // 1. Telemetri Temp & Humidity
    const thCanvas = document.getElementById('chartTempHum');
    if (thCanvas) {
        state.chartTempHum = new Chart(thCanvas, {
            type: 'line',
            data: { labels: [], datasets: [
                { ...ds('Suhu', 'rgb(255,152,0)'), yAxisID: 'y' },
                { ...ds('RH%', 'rgb(33,150,243)'), yAxisID: 'y1' }
            ]},
            options: sharedOpts('Suhu (°C)', 20, 40, 'RH (%)', 40, 100)
        });
    }

    // 2. Telemetri pH & Water
    const pwCanvas = document.getElementById('chartPhWater');
    if (pwCanvas) {
        state.chartPhWater = new Chart(pwCanvas, {
            type: 'line',
            data: { labels: [], datasets: [
                { ...ds('pH', 'rgb(76,175,80)'),    yAxisID: 'y' },
                { ...ds('Level', 'rgb(0,150,136)'),  yAxisID: 'y1' }
            ]},
            options: sharedOpts('pH', 4, 8.5, 'Level (%)', 0, 100)
        });
    }

    // 3. Detail Temp & Humidity
    const thDCanvas = document.getElementById('chartTempHumDetail');
    if (thDCanvas) {
        state.chartTempHumDetail = new Chart(thDCanvas, {
            type: 'line',
            data: { labels: [], datasets: [
                { ...ds('Suhu', 'rgb(255,152,0)'), yAxisID: 'y' },
                { ...ds('RH%', 'rgb(33,150,243)'), yAxisID: 'y1' }
            ]},
            options: sharedOpts('Suhu (°C)', 20, 40, 'RH (%)', 40, 100)
        });
    }

    // 4. Detail pH & Water
    const pwDCanvas = document.getElementById('chartPhWaterDetail');
    if (pwDCanvas) {
        state.chartPhWaterDetail = new Chart(pwDCanvas, {
            type: 'line',
            data: { labels: [], datasets: [
                { ...ds('pH', 'rgb(76,175,80)'),    yAxisID: 'y' },
                { ...ds('Level', 'rgb(0,150,136)'),  yAxisID: 'y1' }
            ]},
            options: sharedOpts('pH', 4, 8.5, 'Level (%)', 0, 100)
        });
    }
}

function updateCharts(sensor) {
    const t = new Date().toLocaleTimeString('id-ID', { minute: '2-digit', second: '2-digit' });
    pushChart(state.chartTempHum, t, [sensor.temp, sensor.humidity]);
    pushChart(state.chartPhWater, t, [sensor.pH, sensor.reservoir]);
    pushChart(state.chartTempHumDetail, t, [sensor.temp, sensor.humidity]);
    pushChart(state.chartPhWaterDetail, t, [sensor.pH, sensor.reservoir]);
}

function pushChart(chart, label, values) {
    if (!chart) return;
    chart.data.labels.push(label);
    values.forEach((v, i) => chart.data.datasets[i].data.push(v));
    if (chart.data.labels.length > state.maxChartPoints) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(ds => ds.data.shift());
    }
    chart.update('none');
}

// ── 8. History Log & Pagination ───────────
function addHistoryLog(sensor, ml, act) {
    const shortCrop = ml.namaTanaman.split(' ')[0];

    state.history.unshift({
        time: new Date().toLocaleTimeString('id-ID'),
        tempHum: `${sensor.temp.toFixed(1)} / ${sensor.humidity}`,
        pH: sensor.pH.toFixed(1),
        rainRes: `${sensor.rain}% / ${sensor.reservoir}%`,
        servo: act.servo,
        pump: act.pump,
        crop: shortCrop
    });

    if (state.history.length > 50) state.history.pop();
    renderHistoryTable();
}

function renderHistoryTable() {
    const tbody = document.getElementById('history-table-body');
    if (!tbody) return;

    const total = state.history.length;
    const totalPages = Math.max(1, Math.ceil(total / state.itemsPerPage));
    if (state.historyPage > totalPages) state.historyPage = totalPages;
    if (state.historyPage < 1) state.historyPage = 1;

    const start = (state.historyPage - 1) * state.itemsPerPage;
    const end = Math.min(start + state.itemsPerPage, total);
    const pageItems = state.history.slice(start, end);

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="table-empty-row">Belum ada data riwayat telemetri</td></tr>';
    } else {
        tbody.innerHTML = pageItems.map(r => {
            const scClass = r.servo === 'TERBUKA' ? 'cell-actuator-active' : 'cell-actuator-inactive';
            const pcClass = r.pump  === 'AKTIF'   ? 'cell-actuator-active' : 'cell-actuator-inactive';
            return `<tr>
                <td class="cell-time">${r.time}</td>
                <td class="cell-temphum">${r.tempHum}</td>
                <td class="cell-ph">${r.pH}</td>
                <td class="cell-rainres">${r.rainRes}</td>
                <td class="${scClass}">${r.servo}</td>
                <td class="${pcClass}">${r.pump}</td>
                <td><span class="badge badge-green">${r.crop}</span></td>
            </tr>`;
        }).join('');
    }

    // Pagination info & buttons
    const infoEl = document.getElementById('pagination-info');
    if (infoEl) {
        infoEl.textContent = total > 0 ? `Menampilkan ${start + 1}-${end} dari ${total} data` : '0 data';
    }

    const currEl = document.getElementById('pagination-current');
    if (currEl) {
        currEl.textContent = `Halaman ${state.historyPage} / ${totalPages}`;
    }

    const prevBtn = document.getElementById('btn-prev-page');
    if (prevBtn) prevBtn.disabled = state.historyPage <= 1;

    const nextBtn = document.getElementById('btn-next-page');
    if (nextBtn) nextBtn.disabled = state.historyPage >= totalPages;
}

function prevHistoryPage() {
    if (state.historyPage > 1) {
        state.historyPage--;
        renderHistoryTable();
    }
}

function nextHistoryPage() {
    const totalPages = Math.ceil(state.history.length / state.itemsPerPage);
    if (state.historyPage < totalPages) {
        state.historyPage++;
        renderHistoryTable();
    }
}

// ── 9. Mode & Manual Toggle ───────────────
function toggleControlMode() {
    const track = document.getElementById('btn-toggle-mode');
    const desc  = document.getElementById('mode-desc');
    const btns  = [document.getElementById('btn-servo-manual'), document.getElementById('btn-pump-manual')];

    if (state.mode === 'AUTO') {
        state.mode = 'MANUAL';
        track.classList.remove('on');
        track.classList.add('off');
        desc.textContent = 'Manual — Kontrol pengguna aktif';
        desc.className = 'mode-toggle-sub manual-active';

        btns.forEach(b => {
            if (!b) return;
            b.disabled = false;
            b.className = 'btn-actuator active';
        });
    } else {
        state.mode = 'AUTO';
        track.classList.remove('off');
        track.classList.add('on');
        desc.textContent = 'Otomatis oleh ESP32';
        desc.className = 'mode-toggle-sub';

        btns.forEach(b => {
            if (!b) return;
            b.disabled = true;
            b.className = 'btn-actuator disabled';
        });

        evaluateActuatorAutoControl(state.sensor.rain, state.sensor.humidity, state.sensor.reservoir);
        updateUI(state.sensor, state.mlResult, state.actuator);
    }
}


function toggleManualActuator(device) {
    if (state.mode !== 'MANUAL') return;
    if (device === 'servo') state.actuator.servo = state.actuator.servo === 'TERBUKA' ? 'TERTUTUP' : 'TERBUKA';
    if (device === 'pump')  state.actuator.pump  = state.actuator.pump  === 'AKTIF'   ? 'OFF'      : 'AKTIF';
    updateUI(state.sensor, state.mlResult, state.actuator);
}

// ── Boot ──────────────────────────────────
document.addEventListener('DOMContentLoaded', initDashboard);
