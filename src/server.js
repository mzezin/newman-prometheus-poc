import Koa from 'koa';
import Router from 'koa-router';

import { getMetrics } from './prometheus';
import newmanRunner from './newmanRunner';

const app = new Koa();
const router = new Router();

router.get('/prometheus', ctx => {
  ctx.body = getMetrics();
});

app.use(router.routes());

app.listen(process.env.PORT || 3000);
newmanRunner(process.env.POLLING_INTERVAL);
