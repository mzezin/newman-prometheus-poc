import express from 'express';

import { getMetrics } from './prometheus';
import newmanRunner from './newmanRunner';


const app = express();

app.get('/prometheus', (req, res) => {
  res.end(getMetrics());
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}! \nPrometheus endpoint is avaliable at http://localhost:${port}/prometheus`);
  newmanRunner();
});
