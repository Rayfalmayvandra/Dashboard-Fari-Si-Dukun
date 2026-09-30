// ── useDashboard Hook ──────────────────────
// Centralized state management for the entire dashboard

import { useState, useEffect, useCallback, useRef } from 'react';
import { simulateSensorData, evaluateActuatorAutoControl } from '../utils/sensorSimulator';
import { runMLRecommendationEngine } from '../utils/mlEngine';
import { PAGES, INITIAL_SENSOR, INITIAL_ML, INITIAL_ACTUATOR, UPDATE_INTERVAL, ITEMS_PER_PAGE } from '../utils/constants';
import { MAX_CHART_POINTS } from '../utils/chartConfig';

function seedInitialHistory() {
  const crops = ['Cabai', 'Padi', 'Jagung', 'Tomat', 'Bawang', 'Kedelai'];
  const now = new Date();
  const records = [];
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

    records.push({
      time: timeStr,
      tempHum: `${t} / ${h}`,
      pH: p,
      rainRes: `${r}% / ${w}%`,
      servo: s,
      pump: pu,
      crop: c,
    });
  }
  return records;
}

export default function useDashboard() {
  // ── Core State ──────────────────────
  const [mode, setMode] = useState('AUTO');
  const [sensor, setSensor] = useState(INITIAL_SENSOR);
  const [actuator, setActuator] = useState(INITIAL_ACTUATOR);
  const [mlResult, setMlResult] = useState(INITIAL_ML);
  const [history, setHistory] = useState(() => seedInitialHistory());
  const [historyPage, setHistoryPage] = useState(1);

  // ── Navigation State ────────────────
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Chart Data State ────────────────
  const [chartData, setChartData] = useState({
    labels: [],
    tempData: [],
    humidData: [],
    phData: [],
    reservoirData: [],
  });

  // ── Countdown State ─────────────────
  const [countdownSeconds, setCountdownSeconds] = useState(1800);

  // ── Refs for interval callbacks ─────
  const modeRef = useRef(mode);
  const sensorRef = useRef(sensor);
  const actuatorRef = useRef(actuator);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { sensorRef.current = sensor; }, [sensor]);
  useEffect(() => { actuatorRef.current = actuator; }, [actuator]);

  // ── Full Cycle ──────────────────────
  const runFullCycle = useCallback(() => {
    const newSensor = simulateSensorData(sensorRef.current, actuatorRef.current);
    const newML = runMLRecommendationEngine(newSensor.temp, newSensor.humidity, newSensor.pH, newSensor.rain);

    let newActuator = actuatorRef.current;
    if (modeRef.current === 'AUTO') {
      newActuator = evaluateActuatorAutoControl(newSensor.rain, newSensor.humidity, newSensor.reservoir);
    }

    setSensor(newSensor);
    setMlResult(newML);
    setActuator(newActuator);

    // Update chart data
    const timeLabel = new Date().toLocaleTimeString('id-ID', { minute: '2-digit', second: '2-digit' });
    setChartData(prev => {
      const labels = [...prev.labels, timeLabel];
      const tempData = [...prev.tempData, newSensor.temp];
      const humidData = [...prev.humidData, newSensor.humidity];
      const phData = [...prev.phData, newSensor.pH];
      const reservoirData = [...prev.reservoirData, newSensor.reservoir];

      if (labels.length > MAX_CHART_POINTS) {
        labels.shift();
        tempData.shift();
        humidData.shift();
        phData.shift();
        reservoirData.shift();
      }

      return { labels, tempData, humidData, phData, reservoirData };
    });

    // Add history log
    const shortCrop = newML.namaTanaman.split(' ')[0];
    setHistory(prev => {
      const newEntry = {
        time: new Date().toLocaleTimeString('id-ID'),
        tempHum: `${newSensor.temp.toFixed(1)} / ${newSensor.humidity}`,
        pH: newSensor.pH.toFixed(1),
        rainRes: `${newSensor.rain}% / ${newSensor.reservoir}%`,
        servo: newActuator.servo,
        pump: newActuator.pump,
        crop: shortCrop,
      };
      const updated = [newEntry, ...prev];
      if (updated.length > 50) updated.pop();
      return updated;
    });

    setCountdownSeconds(1800);
  }, []);

  // ── Initialize & intervals ──────────
  useEffect(() => {
    runFullCycle();
    const dataInterval = setInterval(runFullCycle, UPDATE_INTERVAL);
    const countdownInterval = setInterval(() => {
      setCountdownSeconds(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(countdownInterval);
    };
  }, [runFullCycle]);

  // ── Navigation ──────────────────────
  const navigate = useCallback((pageId) => {
    setCurrentPage(pageId);
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // ── Mode Toggle ─────────────────────
  const toggleControlMode = useCallback(() => {
    setMode(prev => {
      const next = prev === 'AUTO' ? 'MANUAL' : 'AUTO';
      if (next === 'AUTO') {
        const s = sensorRef.current;
        const newAct = evaluateActuatorAutoControl(s.rain, s.humidity, s.reservoir);
        setActuator(newAct);
      }
      return next;
    });
  }, []);

  // ── Manual Actuator Toggle ──────────
  const toggleManualActuator = useCallback((device) => {
    if (modeRef.current !== 'MANUAL') return;
    setActuator(prev => {
      if (device === 'servo') {
        return { ...prev, servo: prev.servo === 'TERBUKA' ? 'TERTUTUP' : 'TERBUKA' };
      }
      if (device === 'pump') {
        return { ...prev, pump: prev.pump === 'AKTIF' ? 'OFF' : 'AKTIF' };
      }
      return prev;
    });
  }, []);

  // ── History Pagination ──────────────
  const totalPages = Math.max(1, Math.ceil(history.length / ITEMS_PER_PAGE));
  const safeHistoryPage = Math.min(historyPage, totalPages);
  const historyStart = (safeHistoryPage - 1) * ITEMS_PER_PAGE;
  const historyEnd = Math.min(historyStart + ITEMS_PER_PAGE, history.length);
  const paginatedHistory = history.slice(historyStart, historyEnd);

  const prevHistoryPage = useCallback(() => {
    setHistoryPage(prev => Math.max(1, prev - 1));
  }, []);

  const nextHistoryPage = useCallback(() => {
    setHistoryPage(prev => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // ── Page Index ──────────────────────
  const currentPageIndex = PAGES.findIndex(p => p.id === currentPage);
  const currentPageMeta = PAGES[currentPageIndex] || PAGES[0];

  return {
    // State
    mode,
    sensor,
    actuator,
    mlResult,
    chartData,
    countdownSeconds,
    currentPage,
    currentPageIndex,
    currentPageMeta,
    sidebarOpen,

    // History
    history,
    paginatedHistory,
    historyPage: safeHistoryPage,
    totalPages,
    historyStart,
    historyEnd,

    // Actions
    navigate,
    toggleSidebar,
    closeSidebar,
    toggleControlMode,
    toggleManualActuator,
    prevHistoryPage,
    nextHistoryPage,
  };
}
