import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'src/app/[locale]/(root)');
const dirs = fs.readdirSync(rootDir);

dirs.forEach(dir => {
  const pagePath = path.join(rootDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  
  let content = fs.readFileSync(pagePath, 'utf-8');
  let changed = false;

  // Fix duplicated imports
  if (content.match(/import SchemaMarkup, { createToolSchema } from '@\/components\/sections\/SchemaMarkup';/g)?.length > 1) {
    content = content.replace("import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';\n", "");
    changed = true;
  }
  if (content.match(/import BreadcrumbSchema from '@\/components\/seo\/BreadcrumbSchema';/g)?.length > 1) {
    content = content.replace("import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';\n", "");
    changed = true;
  }
  if (content.match(/import ToolLayoutWithAds from '@\/components\/sections\/ToolLayoutWithAds';/g)?.length > 1) {
    content = content.replace("import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';\n", "");
    changed = true;
  }

  // Ensure RELATED_TOOLS is imported
  const hasImport = /import\s+{[^}]*RELATED_TOOLS[^}]*}\s+from\s+['"]@\/lib\/seo['"]/.test(content);
  if (!hasImport) {
    if (content.includes('getCanonicalUrl')) {
      content = content.replace(/(import\s+{[^}]*getCanonicalUrl[^}]*)}\s+from\s+['"]@\/lib\/seo['"]/, "$1, RELATED_TOOLS } from '@/lib/seo'");
    } else {
      content = "import { RELATED_TOOLS } from '@/lib/seo';\n" + content;
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log('Cleaned up:', dir);
  }
});
