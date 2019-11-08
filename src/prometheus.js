import { Registry, Gauge, collectDefaultMetrics } from 'prom-client';

const register = new Registry();

if (process.env.INTERNAL_METRICS) {
  collectDefaultMetrics({ timeout: process.env.POLLING_INTERVAL || 10000, register });
}

const gauge = new Gauge({
  name: 'perseus_health_check',
  help: 'Perseus Health Check',
  registers: [register],
  labelNames: ['service', 'assertion'],
});

export const setGauge = (options, value) => gauge.set(options, value);

export const getMetrics = () => register.metrics();
