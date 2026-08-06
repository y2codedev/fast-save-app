import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const enPath = path.join(messagesDir, 'en.json');

console.log('[Build Master English] Loading existing en.json...');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const arabicRegex = /[\u0600-\u06FF]/;

// 1. Clean ToolContent and any other namespaces in en.json where values got corrupted with Arabic characters
function cleanEnglishValues(obj, pathPrefix = '') {
  for (const [k, v] of Object.entries(obj)) {
    const currentPath = pathPrefix ? `${pathPrefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      cleanEnglishValues(v, currentPath);
    } else if (typeof v === 'string') {
      if (arabicRegex.test(v) || v.endsWith('؟')) {
        // If it is under ToolContent or a known sentence key, the English key IS the English value!
        if (pathPrefix === 'ToolContent') {
          obj[k] = k.replace(/؟$/, '?');
        } else if (pathPrefix === 'Navigation' && k === 'All ZIP tools') {
          obj[k] = 'All ZIP tools';
        } else {
          obj[k] = k.replace(/؟$/, '?');
        }
        console.log(`  [Cleaned] ${currentPath}: "${v}" -> "${obj[k]}"`);
      }
    }
  }
}
cleanEnglishValues(en);

// 2. Ensure all known namespaces across any language dictionary are in en.json
const allFiles = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');
allFiles.forEach(file => {
  const dict = JSON.parse(fs.readFileSync(path.join(messagesDir, file), 'utf8'));
  for (const ns in dict) {
    if (!en[ns]) {
      console.log(`[Build Master English] Adding missing namespace '${ns}' from ${file} to en.json`);
      en[ns] = {};
    }
    // If it's a known small namespace like Metadata or PdfToDocx, ensure English has keys
    if (typeof dict[ns] === 'object' && dict[ns] !== null) {
      for (const key in dict[ns]) {
        if (en[ns][key] === undefined) {
          if (ns === 'Metadata') {
            if (key === 'title') en[ns][key] = 'ConvertAllNow - Free Online Media & PDF Tools';
            if (key === 'description') en[ns][key] = 'Edit, convert, compress, and merge PDF, Video, Audio, and Images instantly in your browser. 100% free and secure suite.';
          } else if (ns === 'PdfToDocx') {
            // Check ConverterUI for equivalent or use key as text
            if (en.ConverterUI && en.ConverterUI[key]) {
              en[ns][key] = en.ConverterUI[key];
            } else if (key === 'titleBadge') {
              en[ns][key] = 'PDF to Word Converter';
            } else if (key === 'titleMain') {
              en[ns][key] = 'Convert PDF';
            } else if (key === 'titleHighlight') {
              en[ns][key] = 'to DOCX File';
            } else {
              en[ns][key] = key;
            }
          } else if (!arabicRegex.test(String(dict[ns][key]))) {
            en[ns][key] = dict[ns][key];
          } else {
            en[ns][key] = key;
          }
          console.log(`  [Added Missing Key] ${ns}.${key}: "${en[ns][key]}"`);
        }
      }
    }
  }
});

// 3. Ensure all UI hardcoded strings from our project scan are present in en.json under ToolContent & ConverterUI
const uiStrings = [
  // General UI & Actions
  "Ready to edit in Microsoft Word",
  "In-Browser PDF Layout Engine",
  "PDF to",
  "HTML Converter",
  "Convert PDF documents into structured HTML webpages with distinct page formatting directly in your browser without uploading files.",
  "Upload PDF Document (.pdf)",
  "Drag & drop your PDF file or",
  "browse",
  "Supported format: PDF (Max 35MB)",
  "PDF Document Ready",
  "Converting to HTML...",
  "Convert to HTML Now",
  "Different File",
  "HTML Webpage Ready!",
  "Your PDF has been transformed into structured HTML with custom page styling.",
  "Download .html File",
  "Convert Another File",
  "Live Web Preview",
  "Raw HTML Source",
  "Live Document Previewer",
  "After conversion, preview your multi-page PDF layout as a styled web document or copy the complete HTML5 markup directly to your clipboard.",
  "Only single .pdf file is supported.",
  "No readable text or tables found in document.",
  "Browser-Based HTML Engine",
  "Word to",
  "Convert Microsoft Word documents (.docx, .doc) into clean, responsive, and ready-to-publish HTML code instantly inside your browser.",
  "Upload Microsoft Word File (.docx or .doc)",
  "Drag & drop your Word file or",
  "Supported formats: DOCX & DOC (Max 30MB)",
  "Word Document Ready",
  "Generating HTML...",
  "HTML Ready for Publishing!",
  "Your Word document has been converted to responsive, professional HTML code.",
  "Interactive Preview & Code Viewer",
  "Once converted, you can preview your webpage layout directly here and copy the generated HTML code with one click.",
  "Document contained no renderable text or tables.",
  "Converting to PDF...",
  "Convert to PDF Now",
  "Drag & drop files or",
  "Select Maximum Volume Part Size",
  "Add More Files",
  "No files remaining in this archive.",
  "Choose Different File",
  "ZIP Contents",
  "Split Archive Complete!",
  "Download",
  "Process Another File",
  "Upload to Start",
  "Your converted file will appear here",
  "Features",
  "Privacy & Security Guarantee:",
  "Setting up local secure processor...",
  "Compressing...",
  "Download GIF",
  "Convert Another",
  "Success! Reduced file size by",
  "File size increased by",
  "Excellent compression!",
  "Good compression",
  "Moderate compression",
  "Image size increased due to resizing or format changes",
  "This feature is coming soon — stay tuned!",
  "Share",
  "Home",
  "Close",
  "Advertisement",
  "Tool Categories",
  "All Tools",
  "PDF Tools",
  "Image Tools",
  "Video & Audio Tools",
  "Archive Tools",
  "By Author",
  "Updated on",
  "Verified Local Tool",
  // Universal tool intro text
  "This tool operates entirely on your device using advanced web technologies. This means your files are never uploaded to our servers, eliminating privacy risks and avoiding file size limits typically imposed by cloud services."
];

if (!en.ToolContent) en.ToolContent = {};
if (!en.ConverterUI) en.ConverterUI = {};

uiStrings.forEach(str => {
  if (!en.ToolContent[str]) {
    en.ToolContent[str] = str;
  }
  if (!en.ConverterUI[str]) {
    en.ConverterUI[str] = str;
  }
});

// 4. Extract all content strings from all tool pages in src/app/[locale]/(root)/
const rootToolsDir = path.join(process.cwd(), 'src', 'app', '[locale]', '(root)');
function extractFromPage(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Match string literals in faqs, features, howToSteps, useCases, tips, privacyNote
  const stringMatches = content.match(/["']([^"']{3,200})["']/g);
  if (stringMatches) {
    stringMatches.forEach(m => {
      const clean = m.replace(/^["']/, '').replace(/["']$/, '').trim();
      // Filter out code symbols, Tailwind classes, URLs, file extensions alone
      if (
        clean.length > 3 && 
        !clean.includes('className') && 
        !clean.startsWith('http') && 
        !clean.startsWith('/') &&
        !clean.includes('text-') &&
        !clean.includes('bg-') &&
        !clean.includes('flex ') &&
        !clean.includes('grid ') &&
        !clean.includes('===') &&
        !clean.includes('-->') &&
        /[a-zA-Z]/.test(clean) &&
        !clean.match(/^[a-z0-9-]+$/) // skip slugs/ids like 'video-trimmer'
      ) {
        if (!en.ToolContent[clean]) {
          en.ToolContent[clean] = clean;
        }
      }
    });
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file === 'page.tsx' || file.endsWith('Converter.tsx') || file.endsWith('.tsx')) {
      extractFromPage(fullPath);
    }
  });
}

scanDir(rootToolsDir);
scanDir(path.join(process.cwd(), 'src', 'components'));

// Sort namespaces and keys alphabetically
const sortedEn = {};
Object.keys(en).sort().forEach(ns => {
  if (typeof en[ns] === 'object' && en[ns] !== null && !Array.isArray(en[ns])) {
    sortedEn[ns] = {};
    Object.keys(en[ns]).sort().forEach(key => {
      sortedEn[ns][key] = en[ns][key];
    });
  } else {
    sortedEn[ns] = en[ns];
  }
});

fs.writeFileSync(enPath, JSON.stringify(sortedEn, null, 2), 'utf8');

let totalKeys = 0;
Object.values(sortedEn).forEach(ns => {
  if (typeof ns === 'object') totalKeys += Object.keys(ns).length;
  else totalKeys++;
});
console.log(`[Build Master English] Complete! en.json saved as single source of truth with ${totalKeys} keys across ${Object.keys(sortedEn).length} namespaces.`);
