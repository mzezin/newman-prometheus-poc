import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, json,
} = format;

const timestampPlaceholder = format((info) => ({ timestamp: null, ...info }));


const logger = createLogger({
  format: combine(
    timestampPlaceholder(),
    timestamp(),
    json(),
  ),
  transports: [
    new transports.Console(),
  ],
//   format: winston.format.json(),
});

export default logger;
