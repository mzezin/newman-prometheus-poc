/* eslint-disable no-console */
import { run } from 'newman';

import { setGauge } from './prometheus';
import logger from './logger';
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

const timeoutRequest = process.env.TIMEOUT || 500;

const newmanIteration = () => {
  run({
    collection, environment, timeoutRequest,
  }, (err) => {
    if (err) { throw err; }
  })
    .on('done', (err, summary) => {
      if (err) {
        setGauge({ service: 'Collection', assertion: 'Run status' }, 0);
        logger.log('error',
          {
            type: 'Collection error',
            message: err,
          });
      } else {
        setGauge({ service: 'Collection', assertion: 'Run status' }, 1);
        const assertions = summary.run.executions.reduce((a, v) => (
          [
            ...a,
            ...v.assertions ? v.assertions.map((e) => {
              if (e.error) {
                logger.log('error',
                  {
                    type: 'Request error',
                    request: v.item.name,
                    testCase: e.assertion,
                    message: e.error.message,
                  });
              }
              return {
                service: v.item.name,
                assertion: e.assertion,
                passed: !e.error,
              };
            }) : [],
          ]), []);
        assertions.forEach((e) => {
          setGauge({
            service: e.service,
            assertion: e.assertion,
          }, e.passed ? 1 : 0);
        });
      }
    });
};

const newmanRunner = (interval) => {
  newmanIteration();
  setInterval(newmanIteration, interval);
};


export default newmanRunner;
