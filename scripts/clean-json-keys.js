import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

function cleanObj(obj) {
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!key || key.trim() === '' || key.endsWith('.')) continue;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      newObj[key] = cleanObj(value);
    } else {
      newObj[key] = value;
    }
  }
  return newObj;
}

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const cleaned = cleanObj(json);
  fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), 'utf8');
  console.log(`Cleaned keys in ${lang}.json`);
});
