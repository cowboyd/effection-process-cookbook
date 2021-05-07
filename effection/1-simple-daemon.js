import { sleep } from 'effection';
import { main, createDaemon } from '@effection/node';

main(function*() {
  yield createDaemon('node start.js');

  yield sleep();
  //<- daemon exits when generator finishes.
})
