import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const enPath = path.join(messagesDir, 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const dict = {
  ar: {
    'Dev Tools': 'أدوات المطورين',
    'Data Formatter': 'منسق البيانات',
    'Format JSON, XML, YAML, CSV': 'تنسيق JSON و XML و YAML و CSV',
    'PDF to Word': 'PDF إلى Word',
    'Convert PDF to DOCX': 'تحويل PDF إلى DOCX',
    'Word to PDF': 'Word إلى PDF',
    'Convert DOCX to PDF': 'تحويل DOCX إلى PDF',
    'Word to HTML': 'Word إلى HTML',
    'Convert DOCX to HTML': 'تحويل DOCX إلى HTML',
    'PDF to HTML': 'PDF إلى HTML',
    'Convert PDF to HTML': 'تحويل PDF إلى HTML',
    'Key Features': 'الميزات الرئيسية',
    'How It Works': 'كيف يعمل',
    'Supported Formats': 'التنسيقات المدعومة',
    'Privacy & Security': 'الخصوصية والأمان',
    'Frequently Asked Questions': 'الأسئلة الشائعة',
    'Related Tools': 'أدوات ذات صلة',
    'Tool Categories': 'فئات الأدوات'
  },
  de: {
    'Dev Tools': 'Entwickler-Tools',
    'Data Formatter': 'Datenformatierer',
    'Format JSON, XML, YAML, CSV': 'JSON, XML, YAML, CSV formatieren',
    'PDF to Word': 'PDF in Word',
    'Convert PDF to DOCX': 'PDF in DOCX umwandeln',
    'Word to PDF': 'Word in PDF',
    'Convert DOCX to PDF': 'DOCX in PDF umwandeln',
    'Word to HTML': 'Word in HTML',
    'Convert DOCX to HTML': 'DOCX in HTML umwandeln',
    'PDF to HTML': 'PDF in HTML',
    'Convert PDF to HTML': 'PDF in HTML umwandeln'
  },
  es: {
    'Dev Tools': 'Herramientas de Desarrollador',
    'Data Formatter': 'Formateador de Datos',
    'Format JSON, XML, YAML, CSV': 'Formatear JSON, XML, YAML, CSV',
    'PDF to Word': 'PDF a Word',
    'Convert PDF to DOCX': 'Convertir PDF a DOCX',
    'Word to PDF': 'Word a PDF',
    'Convert DOCX to PDF': 'Convertir DOCX a PDF',
    'Word to HTML': 'Word a HTML',
    'Convert DOCX to HTML': 'Convertir DOCX a HTML',
    'PDF to HTML': 'PDF a HTML',
    'Convert PDF to HTML': 'Convertir PDF a HTML'
  },
  fr: {
    'Dev Tools': 'Outils Développeur',
    'Data Formatter': 'Formateur de Données',
    'Format JSON, XML, YAML, CSV': 'Formater JSON, XML, YAML, CSV',
    'PDF to Word': 'PDF en Word',
    'Convert PDF to DOCX': 'Convertir PDF en DOCX',
    'Word to PDF': 'Word en PDF',
    'Convert DOCX to PDF': 'Convertir DOCX en PDF',
    'Word to HTML': 'Word en HTML',
    'Convert DOCX to HTML': 'Convertir DOCX en HTML',
    'PDF to HTML': 'PDF en HTML',
    'Convert PDF to HTML': 'Convertir PDF en HTML'
  },
  ru: {
    'Dev Tools': 'Инструменты разработчика',
    'Data Formatter': 'Форматирование данных',
    'Format JSON, XML, YAML, CSV': 'Форматирование JSON, XML, YAML, CSV',
    'PDF to Word': 'PDF в Word',
    'Convert PDF to DOCX': 'Преобразовать PDF в DOCX',
    'Word to PDF': 'Word в PDF',
    'Convert DOCX to PDF': 'Преобразовать DOCX в PDF',
    'Word to HTML': 'Word в HTML',
    'Convert DOCX to HTML': 'Преобразовать DOCX в HTML',
    'PDF to HTML': 'PDF в HTML',
    'Convert PDF to HTML': 'Преобразовать PDF в HTML'
  },
  zh: {
    'Dev Tools': '开发者工具',
    'Data Formatter': '数据格式化工具',
    'Format JSON, XML, YAML, CSV': '格式化 JSON, XML, YAML, CSV',
    'PDF to Word': 'PDF 转 Word',
    'Convert PDF to DOCX': '将 PDF 转换为 DOCX',
    'Word to PDF': 'Word 转 PDF',
    'Convert DOCX to PDF': '将 DOCX 转换为 PDF',
    'Word to HTML': 'Word 转 HTML',
    'Convert DOCX to HTML': '将 DOCX 转换为 HTML',
    'PDF to HTML': 'PDF 转 HTML',
    'Convert PDF to HTML': '将 PDF 转换为 HTML'
  }
};

function syncObj(source, target, lang) {
  for (const k in source) {
    if (typeof source[k] === 'object' && source[k] !== null) {
      if (!target[k]) target[k] = {};
      syncObj(source[k], target[k], lang);
    } else {
      if (!target[k]) {
        target[k] = (dict[lang] && dict[lang][k]) ? dict[lang][k] : source[k];
      }
    }
  }
}

locales.forEach(lang => {
  if (lang === 'en') return;
  const filePath = path.join(messagesDir, `${lang}.json`);
  let content = {};
  if (fs.existsSync(filePath)) {
    content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  syncObj(en, content, lang);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  console.log(`Successfully synced ${lang}.json`);
});
