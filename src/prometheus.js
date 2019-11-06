import { Registry, Gauge } from 'prom-client';

const register = new Registry();

const gauge = new Gauge({
  name: 'perseus_health_check',
  help: 'Perseus Health Check',
  registers: [register],
  labelNames: ['service', 'assertion'],
});

export const setGauge = (options, value) => gauge.set(options, value);

export const getMetrics = () => register.metrics();
