import execa from 'execa';

(async function main() {
  let result = execa('node', ['start.js'])
  result.stdout.pipe(process.stdout);
  await result;
  throw new Error('node start.js quit unexpectedly');
})()

setTimeout(() => {}, 300000000);

/**
 * Pros:
 *
 * 1. kills the child process when we exit by hitting `CTRL-C`
 * 2. does it on windows too.
 * 3. waits until child process exits
 *
 * Cons:
 *
 * 1. if there is an error, the process exits immetehangs instead of exiting with an stack trace
 * 2. if the process exits successfully, the process hangs instead of exiting with an error (because node start is a daemon and should never quit.)
 *
 */

//1. does not propagate errors properly. If there is an error in startup, the process hangs.
