import {} from 'dotenv/config';

import Koa from 'koa';

import { getMetrics } from './prometheus';
import newmanRunner from './newmanRunner';

const app = new Koa();

app.use((ctx) => {
  const endpoint = process.env.ENDPOINT_NAME || 'prometheus';
  if (ctx.path === `/${endpoint}`) {
    ctx.body = getMetrics();
  }
});

app.listen(process.env.PORT || 3000);
newmanRunner(process.env.POLLING_INTERVAL || 10000);
