import { main, daemon, exec, Process } from '@effection/node';

main(function* start() {
  let clean: Process = yield exec('npm run clean');
  yield clean.stdout.forEach(data => { process.stdout.write(data) });

  let build: Process = yield exec('npm run build');
  yield build.stdout.forEach(data => { process.stdout.write(data) })

  yield daemon('node start.js');

  yield;
  //<- daemon exits when generator finishes.
})
