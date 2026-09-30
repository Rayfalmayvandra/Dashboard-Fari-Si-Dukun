// ── Sensor Simulator ──────────────────────
// Simulates realistic IoT sensor readings with gradual drift

export function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export function rand(lo, hi) {
  return lo + Math.random() * (hi - lo);
}

export function round1(v) {
  return Math.round(v * 10) / 10;
}

export function simulateSensorData(prevSensor, actuator) {
  const p = prevSensor;
  let temp = clamp(p.temp + rand(-0.8, 0.8), 24, 34);
  let humidity = clamp(Math.round(p.humidity + rand(-3, 3)), 50, 90);
  let pH = clamp(round1(p.pH + rand(-0.15, 0.15)), 5.0, 7.5);
  let rain = clamp(Math.round(p.rain + rand(-6, 6)), 0, 100);
  let reservoir = clamp(Math.round(p.reservoir + rand(-2, 2)), 20, 95);

  if (rain > 50 && actuator.servo === 'TERBUKA') reservoir = Math.min(98, reservoir + 1);
  if (actuator.pump === 'AKTIF') reservoir = Math.max(15, reservoir - 1);

  return { temp: round1(temp), humidity, pH, rain, reservoir };
}

export function evaluateActuatorAutoControl(rain, humidity, reservoirLevel) {
  const servo = rain > 50 ? 'TERBUKA' : 'TERTUTUP';
  const pump = (humidity < 60 && reservoirLevel > 20) ? 'AKTIF' : 'OFF';
  return { servo, pump };
}
