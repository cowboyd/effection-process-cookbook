import { main, on, Operation, sleep } from 'effection';
import { daemon, exec, Process } from '@effection/process';

import { watch } from 'chokidar';

main(function*(scope) {
  let watcher = watch('./src/**/*.ts', { ignoreInitial: true, ignored: 'dist' });
  try {
    let process = yield scope.spawn(start);

    yield on(watcher, 'all').forEach(function*() {
      process.halt();
      process = yield scope.spawn(function*() {
        yield sleep(10);
        yield scope.spawn(start);
      });
    });
  } finally {
    watcher.close();
  }
});

function* start() {
  yield sh("npm run clean");

  yield sh("npm run build");

  let { stdout }: Process = yield daemon('node start.js');


  yield stdout.forEach(output => console.log(output));
}

function *sh(command: string): Operation<void> {
  let process: Process = yield exec(command);
  yield process.stdout.forEach(output => console.log(output));
}
