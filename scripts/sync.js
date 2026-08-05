const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, files);
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      files.push(filePath);
    }
  }
  return files;
}

const srcDir = path.join(__dirname, '../src');
const files = getFiles(srcDir);
const namespaces = new Map(); // Map<Namespace, Set<Key>>

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find useTranslations or getTranslations
  const nsRegex = /(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:await\s+)?(?:useTranslations\(['"`](.*?)['"`]\)|getTranslations\(\{(?:[^}]*?)namespace:\s*['"`](.*?)['"`](?:[^}]*?)\}\))/g;
  
  let match;
  const fileNamespaces = [];
  while ((match = nsRegex.exec(content)) !== null) {
    const varName = match[1];
    const ns = match[2] || match[3];
    if (ns) {
      fileNamespaces.push({ varName, ns });
    }
  }

  fileNamespaces.forEach(({ varName, ns }) => {
    // Escape varName for regex
    const escapedVar = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match varName('key') or varName("key") or varName(`key`)
    const callRegex = new RegExp(escapedVar + '\\([\'"\`](.*?)[\'"\`](?:\\s*,|\\))', 'g');
    let callMatch;
    while ((callMatch = callRegex.exec(content)) !== null) {
      let key = callMatch[1];
      if (!namespaces.has(ns)) namespaces.set(ns, new Set());
      namespaces.get(ns).add(key);
    }
  });
});

console.log('Found namespaces and keys:');
namespaces.forEach((keys, ns) => {
  console.log(`- ${ns}: ${keys.size} keys`);
});

const messagesDir = path.join(__dirname, '../messages');
const messageFiles = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

let totalAdded = 0;

messageFiles.forEach(file => {
  const filePath = path.join(messagesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let modified = false;

  namespaces.forEach((keys, ns) => {
    if (!data[ns]) {
      data[ns] = {};
      modified = true;
    }
    keys.forEach(key => {
      // Create nested structure if key contains dots
      const parts = key.split('.');
      let current = data[ns];
      for (let i = 0; i < parts.length - 1; i++) {
        if (typeof current[parts[i]] !== 'object') {
          current[parts[i]] = {};
          modified = true;
        }
        current = current[parts[i]];
      }
      const lastPart = parts[parts.length - 1];
      if (current[lastPart] === undefined) {
        current[lastPart] = key; // Use the full original key text as fallback value
        modified = true;
        totalAdded++;
      }
    });
  });

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  }
});

console.log(`Done syncing translations. Added ${totalAdded} total missing entries.`);
