import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import http from 'node:http';

function waitForServer(proc) {
  return new Promise((resolvePromise, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server start timeout')), 30000);
    proc.stdout.on('data', (data) => {
      const text = data.toString();
      process.stdout.write(text);
      if (text.includes('Local') || text.includes('http://')) {
        clearTimeout(timeout);
        resolvePromise();
      }
    });
    proc.stderr.on('data', (data) => process.stderr.write(data));
    proc.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
    proc.on('exit', (code) => {
      if (code !== null && code !== 0) {
        clearTimeout(timeout);
        reject(new Error(`Dev server exited with code ${code}`));
      }
    });
  });
}

function fetchHtml() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: 4323,
      path: '/invest/pitch',
      method: 'GET',
      headers: {
        'Accept': 'text/html'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk.toString(); });
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const projectRoot = resolve(__dirname, '..');

  const devServer = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4323'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    await waitForServer(devServer);
    const { status, data } = await fetchHtml();
    console.log('Status:', status);
    const scriptTags = data.match(/<script[^>]*>/g) || [];
    console.log('Script tags:');
    for (const tag of scriptTags) {
      console.log(tag);
    }
  } finally {
    devServer.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
