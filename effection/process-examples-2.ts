import { forever } from 'effection';
import { main, createDaemon, createProcess } from '@effection/node';

main(function* start() {
  let clean = yield createProcess('npm run clean');
  yield clean.expect();

  let build = yield createProcess('npm run build');
  yield build.expect();

  yield createDaemon('node start.js');

  yield forever;
  //<- daemon exits when generator finishes.
})
