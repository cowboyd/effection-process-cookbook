import execa from 'execa';

(async function main() {
  try {
    let clean = execa('npm run clean');
    clean.stdout.pipe(process.stdout)
    await clean;

    let build = execa('npm run build');
    build.stdout.pipe(process.stdout)
    await build;

    let server = execa('node', ['start.js']);
    server.stdout.pipe(process.stdout)
    await server

    console.log('server process quit expectedly');
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})()


async function sh(command, args) {
  let proc = execa(command, args);
}
