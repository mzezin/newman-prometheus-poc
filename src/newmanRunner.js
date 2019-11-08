/* eslint-disable no-console */
import { run } from 'newman';

import { setGauge } from './prometheus';

import collection from './collections/collection';

const newmanRunner = (interval = 10000) => {
  setInterval(() => {
    run({
      collection,
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
              ...v.assertions.map((e) => (
                {
                  service: v.item.name,
                  assertion: e.assertion,
                  passed: !e.error,
                })),
            ]), []);
          assertions.forEach((e) => {
            setGauge({ service: e.service, assertion: e.assertion }, e.passed ? 1 : 0);
          });
        }
      });
  }, interval);
};


export default newmanRunner;
