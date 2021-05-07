import { forever } from 'effection';
import { main, createDaemon, createProcess, ProcessResult } from '@effection/node';

import { watch } from 'chokidar';

main(function*(scope) {
  let watcher = watch('./src/**/*.ts', { ignoreInitial: true, ignored: 'dist' });
  try {
    let process = yield scope.spawn(start);

    yield on(watcher, 'all').forEach(function*() {
      yield process.halt();
      process = yield scope.spawn(start());
    });
  } finally {
    watcher.close();
  }
});

function* start() {
  yield sh("npm run clean");

  yield sh("npm run build");

  let daemon = yield createDaemon('node start.js');


  yield daemon.stdout.forEach(output => console.log(output));
  //<- daemon exits when generator finishes.
}

function *sh(command: string): Operation<void> {
  let process = yield createProcess(command);
  yield process.stdout.forEach(output => console.log(output));
}
