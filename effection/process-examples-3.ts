import { forever } from 'effection';
import { main, createDaemon, createProcess, ProcessResult } from '@effection/node';

main(function* start() {
  yield sh("npm run clean");

  yield sh("npm run build");

  yield createDaemon('node start.js');

  yield forever;
  //<- daemon exits when generator finishes.
})

function *sh(command: string): Operation<void> {
  let process = yield createProcess(command);
  yield process.join();
}
