// ── Chart Configuration ──────────────────
// Shared Chart.js options and dataset factory for consistent styling

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Set global defaults
ChartJS.defaults.color = '#6e6e62';
ChartJS.defaults.borderColor = '#e5e5dc';
ChartJS.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
ChartJS.defaults.font.size = 12;

export function getSharedOptions(y1Label, y1Min, y1Max, y2Label, y2Min, y2Max) {
  return {
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
        usePointStyle: true,
      },
    },
    elements: {
      point: { radius: 5.5, hoverRadius: 8.5, borderWidth: 2.5, backgroundColor: '#ffffff' },
      line: { borderWidth: 3.2 },
    },
    scales: {
      x: {
        grid: { color: '#f4f4ee', lineWidth: 1 },
        ticks: { font: { size: 12, family: 'JetBrains Mono' }, color: '#9c9c8e' },
      },
      y: {
        position: 'left',
        title: { display: true, text: y1Label, color: '#6e6e62', font: { size: 13, weight: '700' } },
        min: y1Min,
        max: y1Max,
        grid: { color: '#f4f4ee', lineWidth: 1 },
        ticks: { font: { size: 12 } },
      },
      y1: {
        position: 'right',
        title: { display: true, text: y2Label, color: '#6e6e62', font: { size: 13, weight: '700' } },
        min: y2Min,
        max: y2Max,
        grid: { drawOnChartArea: false },
        ticks: { font: { size: 12 } },
      },
    },
  };
}

export function createDataset(label, color, yAxisID = 'y') {
  return {
    label,
    data: [],
    borderColor: color,
    backgroundColor: color.replace(')', ',0.08)').replace('rgb', 'rgba'),
    tension: 0.4,
    fill: true,
    yAxisID,
  };
}

export const MAX_CHART_POINTS = 10;
