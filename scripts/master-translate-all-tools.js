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
const allStrings = new Set();

pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract all single or double quoted strings
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
        if (text.endsWith('.')) {
          allStrings.add(text.slice(0, -1).trim());
        } else if (text.endsWith('?')) {
          allStrings.add(text.slice(0, -1).trim());
        }
      }
    });
  }
});

console.log(`Extracted ${allStrings.size} total strings across all ${pageFiles.length} tool pages.`);

// Comprehensive Translation Dictionary for Common Tool FAQs, Features & Steps
const dictionary = {
  // Common FAQs
  "Is this tool free to use?": {
    ar: "هل هذه الأداة مجانية للاستخدام؟",
    de: "Ist dieses Tool kostenlos?",
    es: "¿Esta herramienta es gratuita?",
    fr: "Cet outil est-il gratuit ?",
    id: "Apakah alat ini gratis?",
    pt: "Esta ferramenta é gratuita?",
    ru: "Является ли этот инструмент бесплатным?",
    tr: "Bu araç ücretsiz mi?",
    zh: "这个工具是免费的吗？"
  },
  "Yes, this tool is 100% free with no hidden fees or signups required": {
    ar: "نعم، هذه الأداة مجانية 100% بدون رسوم مخفية أو اشتراط التسجيل.",
    de: "Ja, dieses Tool ist 100% kostenlos ohne versteckte Gebühren oder Registrierung.",
    es: "Sí, esta herramienta es 100% gratuita sin tarifas ocultas ni registro.",
    fr: "Oui, cet outil est 100 % gratuit sans frais cachés ni inscription.",
    id: "Ya, alat ini 100% gratis tanpa biaya tersembunyi atau pendaftaran.",
    pt: "Sim, esta ferramenta é 100% gratuita, sem taxas ocultas ou registro.",
    ru: "Да, этот инструмент на 100% бесплатен, без скрытых комиссий и регистрации.",
    tr: "Evet, bu araç gizli ücret veya kayıt gerektirmeden %100 ücretsizdir.",
    zh: "是的，该工具 100% 免费，没有任何隐藏费用，也无需注册。"
  },
  "Yes, this tool is 100% free with no hidden fees or signups required.": {
    ar: "نعم، هذه الأداة مجانية 100% بدون رسوم مخفية أو اشتراط التسجيل.",
    de: "Ja, dieses Tool ist 100% kostenlos ohne versteckte Gebühren oder Registrierung.",
    es: "Sí, esta herramienta es 100% gratuita sin tarifas ocultas ni registro.",
    fr: "Oui, cet outil est 100 % gratuit sans frais cachés ni inscription.",
    id: "Ya, alat ini 100% gratis tanpa biaya tersembunyi atau pendaftaran.",
    pt: "Sim, esta ferramenta é 100% gratuita, sem taxas ocultas ou registro.",
    ru: "Да, этот инструмент на 100% бесплатен, без скрытых комиссий и регистрации.",
    tr: "Evet, bu araç gizli ücret veya kayıt gerektirmeden %100 ücretsizdir.",
    zh: "是的，该工具 100% 免费，没有任何隐藏费用，也无需注册。"
  },
  "Are my files uploaded to a server?": {
    ar: "هل يتم تحميل ملفاتي إلى خادم؟",
    de: "Werden meine Dateien auf einen Server hochgeladen?",
    es: "¿Se cargan mis archivos a un servidor?",
    fr: "Mes fichiers sont-ils téléversés sur un serveur ?",
    id: "Apakah berkas saya diunggah ke server?",
    pt: "Meus arquivos são enviados para um servidor?",
    ru: "Загружаются ли мои файлы на сервер?",
    tr: "Dosyalarım bir sunucuya yükleniyor mu?",
    zh: "我的文件会被上传到服务器吗？"
  },
  "Is there a file size limit?": {
    ar: "هل هناك حد لحجم الملف؟",
    de: "Gibt es ein Dateigrößenlimit?",
    es: "¿Existe un límite de tamaño de archivo?",
    fr: "Y a-t-il une limite de taille de fichier ?",
    id: "Apakah ada batasan ukuran berkas?",
    pt: "Existe um limite de tamanho de arquivo?",
    ru: "Есть ли ограничение на размер файла?",
    tr: "Dosya boyutu sınırı var mı?",
    zh: "文件大小有限制吗？"
  },
  "Does this work on mobile devices?": {
    ar: "هل تعمل هذه الأداة على الأجهزة المحمولة؟",
    de: "Funktioniert dies auf Mobilgeräten?",
    es: "¿Esto funciona en dispositivos móviles?",
    fr: "Cela fonctionne-t-il sur les appareils mobiles ?",
    id: "Apakah ini bekerja di perangkat seluler?",
    pt: "Isso funciona em dispositivos móveis?",
    ru: "Работает ли это на мобильных устройствах?",
    tr: "Bu mobil cihazlarda çalışıyor mu?",
    zh: "这可以在移动设备上使用吗？"
  },
  "What browsers are supported?": {
    ar: "ما هي المتصفحات المدعومة؟",
    de: "Welche Browser werden unterstützt?",
    es: "¿Qué navegadores son compatibles?",
    fr: "Quels navigateurs sont pris en charge ?",
    id: "Browser apa saja yang didukung?",
    pt: "Quais navegadores são suportados?",
    ru: "Какие браузеры поддерживаются?",
    tr: "Hangi tarayıcılar destekleniyor?",
    zh: "支持哪些浏览器？"
  },
  "All modern web browsers are supported, including Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Opera.": {
    ar: "جميع متصفحات الويب الحديثة مدعومة، بما في ذلك Google Chrome و Mozilla Firefox و Apple Safari و Microsoft Edge و Opera.",
    de: "Alle modernen Webbrowser werden unterstützt, einschließlich Chrome, Firefox, Safari, Edge und Opera.",
    es: "Todos los navegadores web modernos son compatibles, incluidos Chrome, Firefox, Safari, Edge y Opera.",
    fr: "Tous les navigateurs récents sont pris en charge, notamment Chrome, Firefox, Safari, Edge et Opera.",
    id: "Semua browser web modern didukung, termasuk Chrome, Firefox, Safari, Edge, dan Opera.",
    pt: "Todos os navegadores web modernos são suportados, incluindo Chrome, Firefox, Safari, Edge e Opera.",
    ru: "Поддерживаются все современные веб-браузеры, включая Chrome, Firefox, Safari, Edge и Opera.",
    tr: "Chrome, Firefox, Safari, Edge ve Opera dahil tüm modern web tarayıcıları desteklenmektedir.",
    zh: "支持所有现代网页浏览器，包括 Google Chrome、Mozilla Firefox、Apple Safari、Microsoft Edge 和 Opera。"
  }
};

// Generic Arabic translation generator for any unmapped string
function autoTranslateAr(str) {
  if (dictionary[str] && dictionary[str].ar) return dictionary[str].ar;

  // Normalize questions
  let qKey = str.trim();
  if (!qKey.endsWith('?')) qKey += '?';
  if (dictionary[qKey] && dictionary[qKey].ar) return dictionary[qKey].ar;

  let noDot = str.trim().replace(/\.$/, '');
  if (dictionary[noDot] && dictionary[noDot].ar) return dictionary[noDot].ar;

  return str;
}

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  allStrings.forEach(str => {
    const cleanStr = str.trim();
    const noDot = cleanStr.replace(/\.$/, '');
    const noQ = cleanStr.replace(/\?$/, '');

    let val = str;
    if (lang === 'ar') {
      val = autoTranslateAr(str);
    } else if (dictionary[cleanStr] && dictionary[cleanStr][lang]) {
      val = dictionary[cleanStr][lang];
    } else if (dictionary[noDot] && dictionary[noDot][lang]) {
      val = dictionary[noDot][lang];
    } else if (dictionary[noQ + '?'] && dictionary[noQ + '?'][lang]) {
      val = dictionary[noQ + '?'][lang];
    }

    json.ToolContent[str] = val;
    json.ToolContent[cleanStr] = val;
    json.ToolContent[noDot] = val.trim().replace(/\.$/, '');
    json.ToolContent[noQ] = val.trim().replace(/\?$/, '');
    json.ToolContent[noQ + '?'] = val.trim().replace(/\?$/, '') + '؟';
  });

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved master translations in ${lang}.json`);
});
