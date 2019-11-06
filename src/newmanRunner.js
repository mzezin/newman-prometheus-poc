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
          console.error('collection run encountered an error.');
        } else {
          console.log('collection run completed.');
          const assertions = summary.run.executions.reduce((a, v) => (
            [
              ...a,
              ...v.assertions.map(e => (
                {
                  service: v.item.name,
                  assertion: e.assertion,
                  passed: !e.error,
                })),
            ]), []);
          assertions.forEach((e) => {
            setGauge({ service: e.service, assertion: e.assertion }, e.passed ? 1 : 0);
          });
          console.log(JSON.stringify(assertions, null, 4));
        }
      });
  }, interval);
};


export default newmanRunner;
