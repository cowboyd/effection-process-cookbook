import execa from 'execa';

(async function main() {
  let daemon = execa('node', ['start.js']);
  daemon.stdout.pipe(process.stdout)

  try {
    await daemon;
    console.log('server process quit expectedly');
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})()
