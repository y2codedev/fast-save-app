import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'src', 'app', '[locale]', '(root)');
const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

function getPageFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getPageFiles(filePath));
    } else if (file === 'page.tsx') {
      results.push(filePath);
    }
  });
  return results;
}

const pageFiles = getPageFiles(rootDir);
const allStrings = new Set();

pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Match any single or double quoted string literal in JS objects/arrays
  const matches = content.match(/['"]([^'"]{3,})['"]/g);
  if (matches) {
    matches.forEach(m => {
      const text = m.slice(1, -1).trim();
      if (
        text.length > 2 &&
        !text.startsWith('http') &&
        !text.startsWith('/') &&
        !text.startsWith('@') &&
        !text.startsWith('M') && // skip SVG paths
        !text.startsWith('PT') &&
        !text.includes('<') &&
        !text.includes('className') &&
        !text.endsWith('.png') &&
        !text.endsWith('.jpg') &&
        !text.endsWith('.ts') &&
        !text.endsWith('.tsx')
      ) {
        allStrings.add(text);
        // Also add version without trailing dot
        if (text.endsWith('.')) {
          allStrings.add(text.slice(0, -1).trim());
        } else {
          allStrings.add(text + '.');
        }
      }
    });
  }
});

console.log(`Found ${allStrings.size} total normalized string keys from page.tsx files.`);

// Dynamic translation mapper for common terms
function translateToAr(str) {
  const map = {
    "FFmpeg WebAssembly": "FFmpeg WebAssembly",
    "Industry-standard video processing runs natively in your browser.": "تتم معالجة الفيديو المعيارية للصناعة محليًا في متصفحك.",
    "Industry-standard video processing runs natively in your browser": "تتم معالجة الفيديو المعيارية للصناعة محليًا في متصفحك",
    "Quality Control": "التحكم بالجودة",
    "Adjustable CRF slider to balance output size and visual quality.": "شريط التمرير CRF القابل للتعديل لموازنة حجم الإخراج والجودة البصرية.",
    "Adjustable CRF slider to balance output size and visual quality": "شريط التمرير CRF القابل للتعديل لموازنة حجم الإخراج والجودة البصرية",
    "No Server Upload": "بدون تحميل إلى الخادم",
    "Video processing is 100% local — complete privacy guaranteed.": "معالجة الفيديو محلية 100٪ — خصوصية تامة مضمونة.",
    "Video processing is 100% local — complete privacy guaranteed": "معالجة الفيديو محلية 100٪ — خصوصية تامة مضمونة",
    "H.264 Encoding": "ترميز H.264",
    "Universal MP4 output compatible with all devices and platforms.": "إخراج MP4 عالمي متوافق مع جميع الأجهزة والمنصات.",
    "Universal MP4 output compatible with all devices and platforms": "إخراج MP4 عالمي متوافق مع جميع الأجهزة والمنصات",
    "Progress Indicator": "مؤشر التقدم",
    "Real-time compression progress with estimated time remaining.": "تقدم الضغط في الوقت الفعلي مع الوقت المتبقي المقدر.",
    "Real-time compression progress with estimated time remaining": "تقدم الضغط في الوقت الفعلي مع الوقت المتبقي المقدر",
    "All Major Formats": "جميع التنسيقات الرئيسية",
    "Supports MP4, WebM, MOV, AVI, MKV input formats.": "يدعم تنسيقات إدخال MP4 و WebM و MOV و AVI و MKV.",
    "Supports MP4, WebM, MOV, AVI, MKV input formats": "يدعم تنسيقات إدخال MP4 و WebM و MOV و AVI و MKV",
    "Upload Video": "رفع الفيديو",
    "Click the upload area or drag and drop your video file. Supports MP4, WebM, MOV, AVI, MKV, and more.": "انقر فوق منطقة الرفع أو اسحب ملف الفيديو وأفلته. يدعم MP4 و WebM و MOV و AVI و MKV والمزيد.",
    "Click the upload area or drag and drop your video file. Supports MP4, WebM, MOV, AVI, MKV, and more": "انقر فوق منطقة الرفع أو اسحب ملف الفيديو وأفلته. يدعم MP4 و WebM و MOV و AVI و MKV والمزيد",
    "Set Compression Level": "تحديد مستوى الضغط",
    "Choose your quality setting. Lower quality = smaller file size. For most uses, \"Medium\" or \"High\" quality works best.": "اختر إعداد الجودة الخاص بك. جودة أقل = حجم ملف أصغر. لمعظم الاستخدامات ، تعمل الجودة \"المتوسطة\" أو \"العالية\" بشكل أفضل.",
    "Choose your quality setting. Lower quality = smaller file size. For most uses, \"Medium\" or \"High\" quality works best": "اختر إعداد الجودة الخاص بك. جودة أقل = حجم ملف أصغر. لمعظم الاستخدامات ، تعمل الجودة \"المتوسطة\" أو \"العالية\" بشكل أفضل",
    "Start Compression": "بدء الضغط",
    "Click \"Compress Video\". FFmpeg processes the video entirely in your browser — this may take a minute depending on file size.": "انقر فوق \"ضغط الفيديو\". يقوم FFmpeg بمعالجة الفيديو بالكامل في متصفحك — قد يستغرق ذلك دقيقة حسب حجم الملف.",
    "Click \"Compress Video\". FFmpeg processes the video entirely in your browser — this may take a minute depending on file size": "انقر فوق \"ضغط الفيديو\". يقوم FFmpeg بمعالجة الفيديو بالكامل في متصفحك — قد يستغرق ذلك دقيقة حسب حجم الملف",
    "Download Result": "تنزيل النتيجة",
    "Once complete, click \"Download\" to save the compressed MP4 to your device.": "بمجرد الانتهاء ، انقر فوق \"تنزيل\" لحفظ ملف MP4 المضغوط على جهازك.",
    "Once complete, click \"Download\" to save the compressed MP4 to your device": "بمجرد الانتهاء ، انقر فوق \"تنزيل\" لحفظ ملف MP4 المضغوط على جهازك"
  };

  if (map[str]) return map[str];

  return str;
}

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  allStrings.forEach(str => {
    if (lang === 'en') {
      json.ToolContent[str] = str;
    } else if (lang === 'ar') {
      json.ToolContent[str] = translateToAr(str);
    } else {
      // For other languages, if not present, fall back to translated Arabic or English
      if (!json.ToolContent[str]) {
        json.ToolContent[str] = translateToAr(str);
      }
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated ToolContent in ${lang}.json with normalized keys`);
});
