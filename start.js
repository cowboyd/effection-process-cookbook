import { spawn, once, onEmit, Deferred } from 'effection';
import { main } from '@effection/node';


import { createServer } from 'http';

main(function*() {
  let server = createServer();
  server.listen(process.env.PORT);

  try {
    yield once(server, 'listening');
    console.log(`--> server listening on http://localhost:${server.address().port}`);

    let subscription = yield onEmit(server, 'request');
    while (true) {
      let next = yield subscription.next();
      let [request, response] = next.value;
      try {
        if (request.headers['x-error']) {
          throw new Error(request.headers['x-error']);
        } else if (request.headers['x-complete']) {
          return;
        } else {
          response.end("Ok\n");
        }
      } finally {
        request.destroy();
      }
    }
  } finally {
    console.log("\n--> shutting down")
    server.close();
  }
})
