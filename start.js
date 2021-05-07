import { once } from 'effection';
import { main } from '@effection/node';

import { createServer } from 'http';

main(function*() {
  let server = createServer();
  server.listen();

  try {
    yield once(server, 'listening');
    console.log(`--> server listening on http://localhost:${server.address().port}`);

    yield;
  } finally {
    console.log("\n--> shutting down")
    server.close();
  }
})
