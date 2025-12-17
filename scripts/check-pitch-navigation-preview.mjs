import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

function waitForServer(proc) {
  return new Promise((resolvePromise, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview server start timeout')), 30000);
    proc.stdout.on('data', (data) => {
      const text = data.toString();
      process.stdout.write(text);
      if (text.includes('http://')) {
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
        reject(new Error(`Preview server exited with code ${code}`));
      }
    });
  });
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const projectRoot = resolve(__dirname, '..');

  const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '5005'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    await waitForServer(server);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', (msg) => console.log('[console]', msg.type(), msg.text()));
    page.on('pageerror', (err) => console.log('[pageerror]', err));

    await page.goto('http://127.0.0.1:5005/invest/pitch', { waitUntil: 'networkidle' });
    const indicator = page.locator('footer').locator('text=Slide');
    await indicator.waitFor({ state: 'visible', timeout: 15000 });
    const initialText = await indicator.innerText();
    await page.locator('footer button:has-text("Next")').click();
    await page.waitForTimeout(700);
    const afterText = await indicator.innerText();
    console.log('Initial indicator:', initialText);
    console.log('After indicator:', afterText);

    await browser.close();

    if (!/Slide\s*1/.test(initialText)) {
      throw new Error(`Expected starting slide to be 1 but got: ${initialText}`);
    }
    if (!/Slide\s*2/.test(afterText)) {
      throw new Error(`Expected to advance to slide 2 but got: ${afterText}`);
    }

    console.log('Preview navigation smoke test passed.');
  } finally {
    server.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
