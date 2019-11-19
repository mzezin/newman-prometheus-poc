import {} from 'dotenv/config';

import Koa from 'koa';

import logger from './logger';
import { getMetrics } from './prometheus';
import newmanRunner from './newmanRunner';

try {
  const app = new Koa();

  app.use((ctx) => {
    const endpoint = process.env.ENDPOINT_NAME || 'prometheus';
    if (ctx.path === `/${endpoint}`) {
      ctx.body = getMetrics();
    }
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => logger.info(`Server listening on ${port}`));
  newmanRunner(process.env.POLLING_INTERVAL || 10000);
} catch (err) {
  logger.log('error', {
    type: 'General error',
    message: err,
  });
}
