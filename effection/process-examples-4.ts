import { forever } from 'effection';
import { main, createDaemon, createProcess, ProcessResult } from '@effection/node';

main(function* start() {
  yield sh("npm run clean");

  yield sh("npm run build");

  let daemon = yield createDaemon('node start.js');


  yield daemon.stdout.forEach(output => console.log(output));
  //<- daemon exits when generator finishes.
})

function *sh(command: string): Operation<void> {
  let process = yield createProcess(command);
  yield process.stdout.forEach(output => console.log(output));
}
