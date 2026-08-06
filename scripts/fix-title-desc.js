import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'src/app/[locale]/(root)');
const dirs = fs.readdirSync(rootDir);
let count = 0;

dirs.forEach(dir => {
  const file = path.join(rootDir, dir, 'page.tsx');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix invalid ternary expression from previous run if any
    content = content.replace(/const title = typeof config !== "undefined" && config\.toolName \?  : "Online Tool";/g, '');
    content = content.replace(/const description = typeof config !== "undefined" && config\.description \? config\.description : "Free online tool\.";/g, '');
    content = content.replace(/const title = "Online Tool";/g, '');
    content = content.replace(/const description = "Free online tool\.";/g, '');

    const pageFnRegex = /(const Page = async|\bexport default async function\b)/;
    if (pageFnRegex.test(content)) {
      const parts = content.split(pageFnRegex);
      let pageBody = parts[2];

      const usesTitle = /\b(title)\b/.test(pageBody);
      const usesDesc = /\b(description)\b/.test(pageBody);

      const declaresTitle = /const\s+title\s*=/.test(pageBody) || /let\s+title\s*=/.test(pageBody);
      const declaresDesc = /const\s+description\s*=/.test(pageBody) || /let\s+description\s*=/.test(pageBody);

      let additions = '';
      if (usesTitle && !declaresTitle) {
        if (content.includes('config')) {
          additions += '  const title = typeof config !== "undefined" && config.toolName ? `${config.toolName} Converter` : "Online Tool";\n';
        } else {
          additions += '  const title = "Online Tool";\n';
        }
      }
      if (usesDesc && !declaresDesc) {
        if (content.includes('config')) {
          additions += '  const description = typeof config !== "undefined" && config.description ? config.description : "Free online tool.";\n';
        } else {
          additions += '  const description = "Free online tool.";\n';
        }
      }

      if (additions) {
        if (pageBody.includes('const { locale } = await params;')) {
          pageBody = pageBody.replace('const { locale } = await params;', 'const { locale } = await params;\n' + additions);
        } else {
          const firstBraceIndex = pageBody.indexOf('{');
          if (firstBraceIndex !== -1) {
            pageBody = pageBody.slice(0, firstBraceIndex + 1) + '\n' + additions + pageBody.slice(firstBraceIndex + 1);
          }
        }
        content = parts[0] + parts[1] + pageBody;
        fs.writeFileSync(file, content, 'utf8');
        count++;
      } else {
        // Just save cleaned content if invalid ternary was removed
        fs.writeFileSync(file, content, 'utf8');
      }
    }
  }
});

console.log('Successfully fixed title/description in ' + count + ' files.');
