import { sleep } from 'effection';
import { main, on, daemon, exec, ProcessResult } from '@effection/node';

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

  let { stdout } = yield daemon('node start.js');


  yield stdout.forEach(output => console.log(output));
  //<- daemon exits when generator finishes.
}

function *sh(command: string): Operation<void> {
  let process = yield exec(command);
  yield process.stdout.forEach(output => console.log(output));
}
