import { main, daemon } from '@effection/node';

main(function*() {
  let process = yield daemon('node start.js');

  yield process.stdout.forEach(data => console.log(data));
})
