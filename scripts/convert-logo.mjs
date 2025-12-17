import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../public/icons/qdaria/QDaria_logo_teal.png');
const outputPath = join(__dirname, '../public/logomark.webp');

try {
  await sharp(inputPath)
    .resize(400, 400, { fit: 'inside' })
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log('✓ Successfully created logomark.webp');
} catch (error) {
  console.error('Error converting image:', error);
  process.exit(1);
}
