import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

function waitForServer(proc) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Dev server did not start in time'));
    }, 30000);

    proc.stdout.on('data', (data) => {
      const text = data.toString();
      process.stdout.write(text);
      if (text.includes('Local') || text.includes('http://')) {
        clearTimeout(timeout);
        resolve();
      }
    });

    proc.stderr.on('data', (data) => {
      const text = data.toString();
      if (text) {
        // Forward stderr for visibility
        process.stderr.write(text);
      }
    });

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

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const projectRoot = resolve(__dirname, '..');

  const devServer = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4323'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    await waitForServer(devServer);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', (msg) => console.log('[console]', msg.type(), msg.text()));
    page.on('pageerror', (err) => console.log('[pageerror]', err));
    await page.goto('http://127.0.0.1:4323/invest/pitch', { waitUntil: 'networkidle' });

    const nextButton = page.locator('footer button:has-text("Next")');
   await nextButton.waitFor({ state: 'visible', timeout: 15000 });

    const indicator = page.locator('footer').locator('text=Slide');
    await indicator.waitFor({ state: 'visible', timeout: 15000 });

    const initialText = await indicator.innerText();
    console.log('Initial indicator:', initialText);

   await nextButton.click();
   await page.waitForTimeout(700);
    const nextDisabled = await nextButton.evaluate((el) => el.hasAttribute('disabled'));
    console.log('Next button disabled after click:', nextDisabled);
    const afterText = await indicator.innerText();

    await browser.close();

    if (!/Slide\s*1/.test(initialText)) {
      throw new Error(`Expected starting slide to be 1 but got: ${initialText}`);
    }
    if (!/Slide\s*2/.test(afterText)) {
      throw new Error(`Expected to advance to slide 2 but got: ${afterText}`);
    }

    console.log('Navigation smoke test passed: Next button advances slides.');
  } finally {
    devServer.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
