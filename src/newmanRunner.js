/* eslint-disable no-console */
import { run } from 'newman';

import { setGauge } from './prometheus';

import collection from './collections/collection';

const environment = [
  {
    key: 'baseUrl',
    value: process.env.BASEURL,
  },
  {
    key: 'username',
    value: process.env.USERNAME,
  },
  {
    key: 'password',
    value: process.env.PASSWORD,
  },
];

const newmanIteration = () => {
  run({
    collection, environment,
  }, (err) => {
    if (err) { throw err; }
  })
    .on('done', (err, summary) => {
      if (err) {
        setGauge({ service: 'Collection', assertion: 'Run status' }, 0);
      } else {
        setGauge({ service: 'Collection', assertion: 'Run status' }, 1);
        const assertions = summary.run.executions.reduce((a, v) => (
          [
            ...a,
            ...v.assertions ? v.assertions.map((e) => {
              if (e.error) {
                console.log(`${v.item.name} | ${e.assertion} | ${e.error.message}`);
              }
              return {
                service: v.item.name,
                assertion: e.assertion,
                passed: !e.error,
                responseTime: v.response.responseTime,
              };
            }) : [],
          ]), []);
        assertions.forEach((e) => {
          setGauge({
            service: e.service,
            assertion: e.assertion,
          }, e.passed ? e.responseTime : -1);
        });
      }
    });
};

const newmanRunner = (interval) => {
  newmanIteration();
  setInterval(newmanIteration, interval);
};


export default newmanRunner;
