import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'src', 'app', '[locale]', '(root)');
const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

// Recursively find all page.tsx files
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
const extractedStrings = new Set();

pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract title: '...', description: '...', name: '...', text: '...', question: '...', answer: '...'
  const matches = content.match(/['"](title|description|name|text|question|answer)['"]\s*:\s*['"]([^'"]+)['"]/g);
  if (matches) {
    matches.forEach(m => {
      const valMatch = m.match(/:\s*['"]([^'"]+)['"]/);
      if (valMatch && valMatch[1] && valMatch[1].trim().length > 1) {
        // Skip code symbols or URLs
        const text = valMatch[1].trim();
        if (!text.startsWith('http') && !text.startsWith('/') && !text.startsWith('@')) {
          extractedStrings.add(text);
        }
      }
    });
  }

  // Extract strings inside arrays like ['string1', 'string2']
  const arrayMatches = content.match(/\[\s*['"]([^'"]+)['"]\s*(,\s*['"]([^'"]+)['"]\s*)*\]/g);
  if (arrayMatches) {
    arrayMatches.forEach(am => {
      const strMatches = am.match(/['"]([^'"]+)['"]/g);
      if (strMatches) {
        strMatches.forEach(sm => {
          const text = sm.replace(/['"]/g, '').trim();
          if (text.length > 1 && !text.startsWith('http') && !text.startsWith('/') && !text.startsWith('@')) {
            extractedStrings.add(text);
          }
        });
      }
    });
  }
});

console.log(`Extracted ${extractedStrings.size} unique strings across all tool pages.`);

// Translation dictionary generator/mapper
const globalDict = {
  ar: {
    "FFmpeg WebAssembly": "FFmpeg WebAssembly",
    "Industry-standard video processing runs natively in your browser": "تتم معالجة الفيديو المعيارية للصناعة محليًا في متصفحك",
    "Quality Control": "التحكم بالجودة",
    "Adjustable CRF slider to balance output size and visual quality": "شريط التمرير CRF القابل للتعديل لموازنة حجم الإخراج والجودة البصرية",
    "No Server Upload": "بدون تحميل إلى الخادم",
    "Video processing is 100% local — complete privacy guaranteed": "معالجة الفيديو محلية 100٪ — خصوصية تامة مضمونة",
    "H.264 Encoding": "ترميز H.264",
    "Universal MP4 output compatible with all devices and platforms": "إخراج MP4 عالمي متوافق مع جميع الأجهزة والمنصات",
    "Progress Indicator": "مؤشر التقدم",
    "Real-time compression progress with estimated time remaining": "تقدم الضغط في الوقت الفعلي مع الوقت المتبقي المقدر",
    "All Major Formats": "جميع التنسيقات الرئيسية",
    "Supports MP4, WebM, MOV, AVI, MKV input formats": "يدعم تنسيقات إدخال MP4 و WebM و MOV و AVI و MKV",
    "Upload Video": "رفع الفيديو",
    "Click the upload area or drag and drop your video file. Supports MP4, WebM, MOV, AVI, MKV, and more": "انقر فوق منطقة الرفع أو اسحب ملف الفيديو وأفلته. يدعم MP4 و WebM و MOV و AVI و MKV والمزيد",
    "Set Compression Level": "تحديد مستوى الضغط",
    "Choose your quality setting. Lower quality = smaller file size. For most uses, \"Medium\" or \"High\" quality works best": "اختر إعداد الجودة الخاص بك. جودة أقل = حجم ملف أصغر. لمعظم الاستخدامات ، تعمل الجودة \"المتوسطة\" أو \"العالية\" بشكل أفضل",
    "Start Compression": "بدء الضغط",
    "Click \"Compress Video\". FFmpeg processes the video entirely in your browser — this may take a minute depending on file size": "انقر فوق \"ضغط الفيديو\". يقوم FFmpeg بمعالجة الفيديو بالكامل في متصفحك — قد يستغرق ذلك دقيقة حسب حجم الملف",
    "Download Result": "تنزيل النتيجة",
    "Once complete, click \"Download\" to save the compressed MP4 to your device": "بمجرد الانتهاء ، انقر فوق \"تنزيل\" لحفظ ملف MP4 المضغوط على جهازك",
    "Browser Processing": "معالجة المتصفح",
    "Precise Trimming": "تقطيع دقيق",
    "Set exact start and end timestamps for pixel-perfect video cuts": "حدد طوابع زمنية دقيقة للبدء والنهاية لتقطيع الفيديو بدقة",
    "Instant Preview": "معاينة فورية",
    "Preview your trimmed video clip before downloading": "معاينة مقطع الفيديو المقطع قبل التنزيل",
    "Extract Audio Track": "استخراج المسار الصوتي",
    "High Quality MP3": "MP3 عالي الجودة",
    "Fast Audio Trimming": "قص الصوت السريع",
    "Cut audio files instantly in your browser": "قص ملفات الصوت فورًا في متصفحك",
    "Browser Zip Technology": "تقنية ZIP في المتصفح",
    "Create, extract, and convert ZIP archives 100% locally": "إنشاء واستخراج وتحويل أرشيفات ZIP محليًا بنسبة 100٪",
    "Multi-Format Support": "دعم متعدد التنسيقات",
    "Supports ZIP, RAR, 7Z, TAR, GZ, BZ2, XZ, and ISO": "يدعم ZIP و RAR و 7Z و TAR و GZ و BZ2 و XZ و ISO",
    "Fast Batch Conversion": "تحويل دفعة سريع",
    "Convert multiple archive files in parallel": "تحويل ملفات أرشيف متعددة بالتوازي",
    "PDF Merger & Editor": "دمج ومحرر PDF",
    "Combine, unlock, protect, and convert PDF documents": "دمج وفتح وحماية وتحويل مستندات PDF",
    "Image Compression & Resizing": "ضغط وإعادة حجم الصور",
    "Reduce image size while keeping crystal clear quality": "تقليل حجم الصورة مع الحفاظ على جودة فائقة الوضوح"
  },
  de: {
    "FFmpeg WebAssembly": "FFmpeg WebAssembly",
    "Industry-standard video processing runs natively in your browser": "Branchenübliche Videoverarbeitung läuft nativ in Ihrem Browser",
    "Quality Control": "Qualitätskontrolle",
    "Adjustable CRF slider to balance output size and visual quality": "Einstellbarer CRF-Regler zur Abstimmung von Ausgabegröße und Bildqualität",
    "No Server Upload": "Kein Server-Upload",
    "Video processing is 100% local — complete privacy guaranteed": "Videoverarbeitung ist 100% lokal — vollständige Privatsphäre garantiert",
    "Upload Video": "Video hochladen",
    "Set Compression Level": "Kompressionsstufe festlegen",
    "Start Compression": "Komprimierung starten",
    "Download Result": "Ergebnis herunterladen"
  },
  es: {
    "FFmpeg WebAssembly": "FFmpeg WebAssembly",
    "Industry-standard video processing runs natively in your browser": "El procesamiento de video estándar de la industria se ejecuta nativamente en su navegador",
    "Quality Control": "Control de Calidad",
    "Adjustable CRF slider to balance output size and visual quality": "Deslizador CRF ajustable para equilibrar el tamaño y la calidad visual",
    "No Server Upload": "Sin Carga al Servidor",
    "Video processing is 100% local — complete privacy guaranteed": "El procesamiento de video es 100% local: privacidad completa garantizada",
    "Upload Video": "Subir Video",
    "Set Compression Level": "Establecer Nivel de Compresión",
    "Start Compression": "Iniciar Compresión",
    "Download Result": "Descargar Resultado"
  },
  fr: {
    "FFmpeg WebAssembly": "FFmpeg WebAssembly",
    "Industry-standard video processing runs natively in your browser": "Le traitement vidéo standard fonctionne nativement dans votre navigateur",
    "Quality Control": "Contrôle de Qualité",
    "Adjustable CRF slider to balance output size and visual quality": "Curseur CRF réglable pour équilibrer taille et qualité visuelle",
    "No Server Upload": "Aucun Téléversement sur Serveur",
    "Video processing is 100% local — complete privacy guaranteed": "Le traitement vidéo est 100 % local — confidentialité totale garantie",
    "Upload Video": "Téléverser la Vidéo",
    "Set Compression Level": "Définir le Niveau de Compression",
    "Start Compression": "Lancer la Compression",
    "Download Result": "Télécharger le Résultat"
  },
  ru: {
    "FFmpeg WebAssembly": "FFmpeg WebAssembly",
    "Industry-standard video processing runs natively in your browser": "Обработка видео промышленного стандарта выполняется локально в вашем браузере",
    "Quality Control": "Контроль качества",
    "Adjustable CRF slider to balance output size and visual quality": "Регулируемый ползунок CRF для баланса размера и качества",
    "No Server Upload": "Без загрузки на сервер",
    "Video processing is 100% local — complete privacy guaranteed": "Обработка видео на 100% локальна — полная конфиденциальность гарантирована",
    "Upload Video": "Загрузить видео",
    "Set Compression Level": "Установить уровень сжатия",
    "Start Compression": "Начать сжатие",
    "Download Result": "Скачать результат"
  },
  zh: {
    "FFmpeg WebAssembly": "FFmpeg WebAssembly",
    "Industry-standard video processing runs natively in your browser": "行业标准的视频处理在您的浏览器中本地运行",
    "Quality Control": "质量控制",
    "Adjustable CRF slider to balance output size and visual quality": "可调节的 CRF 滑块，在输出大小和视觉质量之间取得平衡",
    "No Server Upload": "无服务器上传",
    "Video processing is 100% local — complete privacy guaranteed": "视频处理100%本地化 — 保证完全隐私",
    "Upload Video": "上传视频",
    "Set Compression Level": "设置压缩级别",
    "Start Compression": "开始压缩",
    "Download Result": "下载结果"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  const langDict = globalDict[lang] || globalDict['ar'];

  extractedStrings.forEach(str => {
    // If key not translated, map using dictionary or fallback
    if (!json.ToolContent[str] || json.ToolContent[str] === str) {
      json.ToolContent[str] = (langDict && langDict[str]) ? langDict[str] : (lang === 'en' ? str : (globalDict.ar[str] || str));
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated ${extractedStrings.size} page strings in ${lang}.json`);
});
