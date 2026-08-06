import fs from 'fs';
import path from 'path';

// Extract tools and categories from seo.ts
const seoContent = fs.readFileSync(path.join(process.cwd(), 'src/lib/seo.ts'), 'utf-8');

// We will append missing RELATED_TOOLS
const missingRelatedTools = [
  // PDF
  `  'md-converter': [
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Images to PDF' },
  ],`,
  `  'word-to-pdf': [
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word to HTML' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF' },
  ],`,
  `  'word-to-html': [
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF' },
  ],`,
  `  'pdf-to-html': [
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word to HTML' },
    { name: 'PDF to Word', path: '/pdf-to-docx', desc: 'Convert PDF to Word' },
    { name: 'Word to PDF', path: '/word-to-pdf', desc: 'Convert Word to PDF' },
    { name: 'Merge PDF', path: '/merge-pdf', desc: 'Combine multiple PDFs' },
  ],`,
  // Dev
  `  'data-formatter': [
    { name: 'Markdown to PDF', path: '/md-converter', desc: 'Markdown to PDF' },
    { name: 'Word to HTML', path: '/word-to-html', desc: 'Convert Word to HTML' },
    { name: 'PDF to HTML', path: '/pdf-to-html', desc: 'Convert PDF to HTML' },
  ],`,
  // Image
  `  'image-to-svg': [
    { name: 'Image Converter', path: '/photo', desc: 'Convert image formats' },
    { name: 'Remove Background', path: '/bg-remover', desc: 'AI background removal' },
    { name: 'Image Compressor', path: '/image-compressor', desc: 'Reduce image size' },
    { name: 'Image to PDF', path: '/image-to-pdf', desc: 'Convert images to PDF' },
  ],`,
  // Video / Social
  `  'fb-video': [
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram videos' },
    { name: 'Snapchat Downloader', path: '/snapchat', desc: 'Download Snapchat videos' },
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Compress videos' },
  ],`,
  `  'snapchat': [
    { name: 'IG Downloader', path: '/ig-downloader', desc: 'Download Instagram videos' },
    { name: 'FB Video Downloader', path: '/fb-video', desc: 'Download Facebook videos' },
    { name: 'Video Trimmer', path: '/video-trimmer', desc: 'Cut and trim videos' },
    { name: 'Video Compressor', path: '/video-compressor', desc: 'Compress videos' },
  ],`,
  // ZIP tools
  `  'edit-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],`,
  `  'merge-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
  ],`,
  `  'split-zip': [
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
  ],`,
  `  'view-zip': [
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'Edit ZIP', path: '/edit-zip', desc: 'Modify ZIP contents' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password to ZIP' },
  ],`,
  `  'protect-zip': [
    { name: 'Unlock ZIP', path: '/unlock-zip-file', desc: 'Remove ZIP password' },
    { name: 'Protect PDF', path: '/protect-pdf', desc: 'Add password to PDF' },
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
  ],`,
  `  'unlock-zip-file': [
    { name: 'Protect ZIP', path: '/protect-zip', desc: 'Add password to ZIP' },
    { name: 'Unlock PDF', path: '/unlock-pdf', desc: 'Remove PDF password' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
  ],`
];

const archiveFormats = ['rar', '7z', 'tar', 'tar-gz', 'tar-bz2', 'tar-xz', 'gz', 'bz2', 'xz', 'iso'];
archiveFormats.forEach(fmt => {
  missingRelatedTools.push(`  '${fmt}-to-zip': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Merge ZIP', path: '/merge-zip', desc: 'Combine ZIP archives' },
  ],`);
  missingRelatedTools.push(`  'zip-to-${fmt}': [
    { name: 'Create ZIP', path: '/create-zip', desc: 'Create ZIP archives' },
    { name: 'Unzip ZIP', path: '/unzip-zip', desc: 'Extract ZIP files' },
    { name: 'View ZIP', path: '/view-zip', desc: 'Inspect ZIP contents' },
    { name: 'Split ZIP', path: '/split-zip', desc: 'Split ZIP archives' },
  ],`);
});

const relatedToolsEndIndex = seoContent.indexOf('};', seoContent.indexOf('export const RELATED_TOOLS'));
if (relatedToolsEndIndex !== -1) {
  const newContent = seoContent.slice(0, relatedToolsEndIndex) + missingRelatedTools.join('\n') + '\n' + seoContent.slice(relatedToolsEndIndex);
  fs.writeFileSync(path.join(process.cwd(), 'src/lib/seo.ts'), newContent, 'utf-8');
  console.log('Successfully injected missing RELATED_TOOLS');
}

// -------------------------------------------------------------
// Now auto-generate ToolContentSection for all missing pages
// -------------------------------------------------------------
const rootDir = path.join(process.cwd(), 'src/app/[locale]/(root)');
const dirs = fs.readdirSync(rootDir);

const importsString = `import SchemaMarkup, { createToolSchema } from '@/components/sections/SchemaMarkup';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import WebPageSchema from '@/components/seo/WebPageSchema';
import ToolLayoutWithAds from '@/components/sections/ToolLayoutWithAds';
import ToolContentSection from '@/components/sections/ToolContentSection';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
`;

function generateSchemaAndContent(slug) {
  let name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  let intro = `${name} is a free online tool to process your files securely in your browser. Our tool ensures your data remains private while delivering fast results.`;
  
  if (slug.includes('to-zip')) intro = `Convert your ${slug.split('-to-')[0].toUpperCase()} archives to standard ZIP format instantly. ZIP files are universally supported and easier to share.`;
  if (slug.includes('zip-to')) intro = `Convert your standard ZIP files to ${slug.split('-to-')[1].toUpperCase()} archives securely in your browser.`;

  return `
const faqs = [
  { question: 'Is this tool free to use?', answer: 'Yes, this tool is 100% free with no hidden fees or signups required.' },
  { question: 'Are my files uploaded to a server?', answer: 'No. All processing happens locally in your web browser. Your files never leave your device, ensuring total privacy.' },
  { question: 'Is there a file size limit?', answer: 'Since processing happens in your browser, the limit depends on your device RAM, usually supporting files up to several hundred megabytes.' },
  { question: 'Does this work on mobile devices?', answer: 'Yes! The tool works seamlessly on both desktop and mobile browsers.' },
  { question: 'What browsers are supported?', answer: 'We support all modern browsers including Chrome, Safari, Firefox, and Edge.' },
];

const howToSteps = [
  { name: 'Upload File', text: 'Select or drag and drop your file into the tool.' },
  { name: 'Process', text: 'Click the action button to begin processing. Wait a few moments.' },
  { name: 'Download', text: 'Once completed, download your newly processed file directly to your device.' },
];

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: '${name}', href: '/${slug}' },
  ];
  const relatedTools = RELATED_TOOLS['${slug}'] || [];
`;
}

dirs.forEach(dir => {
  const pagePath = path.join(rootDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  let content = fs.readFileSync(pagePath, 'utf-8');
  if (content.includes('ToolContentSection')) return; // Already has it
  
  console.log('Adding content to:', dir);
  
  // Basic injection: Add imports if missing
  if (!content.includes('ToolContentSection')) {
    content = content.replace(/import { Metadata } from 'next';/, importsString + "import { Metadata } from 'next';");
  }
  
  // Get Category Name for layout
  let catName = 'Online Tools';
  let catPath = '/';
  if (dir.includes('pdf') || dir.includes('md') || dir.includes('word')) { catName = 'PDF Tools'; catPath = '/pdf-tools'; }
  if (dir.includes('video') || dir.includes('audio') || dir.includes('ig-') || dir.includes('fb-') || dir.includes('snapchat')) { catName = 'Video & Audio Tools'; catPath = '/video-tools'; }
  if (dir.includes('zip')) { catName = 'Archive Tools'; catPath = '/archive-tools'; }
  if (dir === 'image-editor' || dir === 'photo' || dir === 'image-to-svg') { catName = 'Image Tools'; catPath = '/image-tools'; }

  // We need to rewrite the JSX return. 
  // Let's find the main component return
  const returnRegex = /return \(\s*<>([\s\S]*?)<\/>\s*\);/;
  const match = content.match(returnRegex);
  
  if (match) {
    const originalJsx = match[1];
    let customToolTag = originalJsx.match(/<([A-Z][a-zA-Z0-9]+)\s*\/>/);
    if (!customToolTag) customToolTag = originalJsx.match(/<([A-Z][a-zA-Z0-9]+) /);
    const toolComponent = customToolTag ? `<${customToolTag[1]} />` : '{/* Tool Component */}';

    const schemaGen = generateSchemaAndContent(dir);
    
    // Inject schema definitions right before return
    content = content.replace(/return \(/, schemaGen + '\n  return (');
    
    const newJsx = `
      <SchemaMarkup data={schemaData} />
      <HowToSchema name={\`How to \${t('title')}\`} description={t('description')} steps={howToSteps} totalTime="PT1M" />
      <FAQSchema faqs={faqs} />
      <WebPageSchema title={t('title')} description={t('description')} path="/${dir}" locale={locale} breadcrumb={breadcrumbItems} />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <ToolLayoutWithAds
        relatedTools={relatedTools}
        relatedToolsTitle="Related Tools"
        categoryName="${catName}"
        categoryPath="${catPath}"
      >
        <div className="flex flex-col space-y-6 pb-12">
          <VisualBreadcrumb items={breadcrumbItems} />
          ${toolComponent}
          <ToolContentSection
            toolName={t('title')}
            introduction={
              <>
                <p>
                  {t('title')} is a free online tool to process your files securely in your browser. Our tool ensures your data remains private while delivering fast results. No installation or registration is required.
                </p>
                <p className="mt-3">
                  This tool operates entirely on your device using advanced web technologies. This means your files are never uploaded to our servers, eliminating privacy risks and avoiding file size limits typically imposed by cloud services.
                </p>
              </>
            }
            features={[
              { title: '100% Free & Unlimited', description: 'Use the tool as many times as you want without any restrictions or fees.' },
              { title: 'Private & Secure', description: 'All processing happens locally in your browser. Your files never leave your device.' },
              { title: 'No Installation', description: 'Works directly in Chrome, Safari, Firefox, and Edge on any device.' },
              { title: 'Fast Processing', description: 'Leverages your device\\'s hardware for near-instant results.' },
            ]}
            howToSteps={howToSteps}
            faqs={faqs}
            supportedFormats="Supports all standard formats."
            privacyNote="Your files are completely safe. All processing happens in your browser and files are never uploaded to any server."
          />
        </div>
      </ToolLayoutWithAds>`;
      
      content = content.replace(returnRegex, `return (\n    <>${newJsx}\n    </>\n  );`);
      
      // Also ensure RELATED_TOOLS is imported
      if (!content.includes('RELATED_TOOLS')) {
        content = content.replace(/import { getCanonicalUrl/, "import { getCanonicalUrl, RELATED_TOOLS");
      }
      
      fs.writeFileSync(pagePath, content, 'utf-8');
  }
});
