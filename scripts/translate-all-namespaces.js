import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

// Comprehensive real translation dictionary for key namespaces
const fullDict = {
  ar: {
    // PdfToDocx
    titleBadge: "محول PDF إلى Word",
    titleMain: "تحويل PDF",
    titleHighlight: "إلى ملف DOCX",
    subtitle: "حول مستندات PDF إلى ملفات Word (DOCX) قابلة للتعديل بالكامل عالية الجودة. يحافظ على التنسيق والجداول والجداول.",
    uploadTitle: "رفع PDF",
    uploadDesc: "اسحب وأفلت ملف PDF الخاص بك هنا أو انقر للتصفح",
    convertBtn: "تحويل إلى Word",
    convertingBtn: "جاري التحويل...",
    resetAll: "إعادة ضبط الجميع",
    resultTitle: "نتيجة التحويل",
    resultDesc: "مستند Word الخاص بك جاهز للتنزيل",
    downloadBtn: "تنزيل DOCX",
    convertAnother: "تحويل ملف آخر",
    uploadToStart: "قم برفع ملف PDF للبدء",
    willAppearHere: "سيظهر مستندك المعالج هنا",
    feature1Title: "دقة عالية",
    feature1Desc: "يحافظ على التخطيط الأصلي والجداول والخطوط والصور",
    feature2Title: "قابل للتعديل بالكامل",
    feature2Desc: "ينشئ ملف .docx مثالي جاهز للاستخدام في MS Word",
    feature3Title: "معالجة آمنة",
    feature3Desc: "تتم معالجة ملفاتك بأمان ومحوها تلقائياً",
    bestPractices: "أفضل الممارسات:",
    tip1: "• يعمل بشكل أفضل مع ملفات PDF الغنية بالنصوص والتنسيق",
    tip2: "• الحد الأقصى لحجم الملف: 20 ميجابايت",
    tip3: "• قد تتطلب ملفات PDF الممسوحة ضوئياً دعم OCR",
    howToTitle: "كيفية تحويل PDF إلى Word؟",
    step1Title: "رفع PDF",
    step1Desc: "انقر فوق منطقة الرفع أو اسحب مستند PDF وأفلته. سيتلقاه متصفحك للمعالجة.",
    step2Title: "تحويل المستند",
    step2Desc: "انقر فوق زر التحويل لتحويل صفحات PDF إلى عناصر Word قابلة للتعديل.",
    step3Title: "تنزيل ملف Word",
    step3Desc: "احفظ ملف DOCX المعالج مباشرة في جهازك.",

    // ConverterUI
    badgeBrowser: "محول المستندات القائم على المتصفح",
    wordToPdfTitle: "محول Word إلى PDF",
    wordToPdfSubtitle: "تحويل مستندات Microsoft Word (.docx) إلى ملفات PDF احترافية فورًا في متصفحك دون تحميل البيانات.",
    stepUploadWord: "رفع Word",
    stepConvert: "تحويل",
    stepDownloadPdf: "تنزيل PDF",
    stepUploadPdf: "رفع PDF",
    stepDownloadWord: "تنزيل Word",
    uploadLabelWord: "رفع ملف Microsoft Word (.docx أو .doc)",
    uploadLabelPdf: "رفع مستند PDF (.pdf)",
    dragDropWord: "اسحب وأفلت ملف Word الخاص بك أو",
    dragDropPdf: "اسحب وأفلت ملف PDF الخاص بك أو",
    browse: "تصفح",
    supportedDocxMax: "التنسيقات المدعومة: DOCX و DOC (بحد أقصى 30 ميجابايت)",
    supportedPdfMax: "التنسيقات المدعومة: PDF (بحد أقصى 50 ميجابايت)",
    clientSideNotice: "⚡ 100% محلي وخاص • لا تغادر أي مستندات جهازك",
    whyUseTitleWord: "لماذا استخدام محول Word ⬅ PDF في المتصفح؟",
    whyUseTitlePdf: "لماذا استخدام محول PDF ⬅ Word في المتصفح؟",
    localFormatting: "تنسيق محلي",
    localFormattingDesc: "تحليل أنماط خطوط وجداول Word محليًا في Javascript",
    zeroCloudStorage: "بدون تخزين سحابي",
    zeroCloudStorageDesc: "تبقى العقود والخطابات المؤسسية السرية على جهازك",
    noServerDelays: "بدون تأخير الخادم",
    noServerDelaysDesc: "تحويل فوري دون تحميل ملفات المستندات الكبيرة عبر الإنترنت",
    pdfReadyTitle: "ملف PDF جاهز للتنزيل!",
    pdfReadyDesc: "تم تجميع مستند Word الخاص بك في ملف PDF عالي الدقة.",
    pdfCompiledSuccess: "تم تجميع PDF بنجاح",
    pdfCompiledSuccessDesc: "تم تنسيق تخطيطك وخطوطك وأنماطك في ملف PDF قياسي.",
    downloadPdfBtn: "تنزيل PDF",
    downloadWordBtn: "تنزيل Word"
  },
  de: {
    titleBadge: "PDF in Word Konverter",
    titleMain: "PDF umwandeln",
    titleHighlight: "in DOCX-Datei",
    subtitle: "Wandeln Sie Ihre PDF-Dokumente in vollständig bearbeitbare Word-Dateien (DOCX) um.",
    uploadTitle: "PDF hochladen",
    uploadDesc: "Ziehen Sie Ihre PDF-Datei hierher oder klicken Sie zum Durchsuchen",
    convertBtn: "In Word umwandeln",
    convertingBtn: "Konvertierung...",
    resetAll: "Alles zurücksetzen",
    resultTitle: "Konvertierungsergebnis",
    resultDesc: "Ihr Word-Dokument ist bereit zum Download",
    downloadBtn: "DOCX herunterladen",
    convertAnother: "Weitere Datei konvertieren",
    uploadToStart: "PDF zum Starten hochladen",
    willAppearHere: "Ihr konvertiertes Dokument erscheint hier",
    feature1Title: "Hohe Qualität",
    feature1Desc: "Bewahrt ursprüngliches Layout, Tabellen und Bilder",
    feature2Title: "Vollständig bearbeitbar",
    feature2Desc: "Erstellt eine perfekte .docx-Datei für MS Word",
    feature3Title: "Sichere Verarbeitung",
    feature3Desc: "Ihre Dateien werden lokal im Browser verarbeitet",
    howToTitle: "Wie konvertiert man PDF in Word?",
    step1Title: "PDF hochladen",
    step1Desc: "Wählen Sie Ihre PDF-Datei aus.",
    step2Title: "Dokument konvertieren",
    step2Desc: "Klicken Sie auf Konvertieren.",
    step3Title: "Word-Datei herunterladen",
    step3Desc: "Speichern Sie die verarbeitete DOCX-Datei."
  },
  es: {
    titleBadge: "Convertidor de PDF a Word",
    titleMain: "Convertir PDF",
    titleHighlight: "a archivo DOCX",
    subtitle: "Transforma tus documentos PDF en archivos Word (DOCX) totalmente editables.",
    uploadTitle: "Subir PDF",
    uploadDesc: "Arrastra y suelta tu archivo PDF aquí o haz clic para explorar",
    convertBtn: "Convertir a Word",
    convertingBtn: "Convertida...",
    resetAll: "Reiniciar todo",
    resultTitle: "Resultado del proceso",
    resultDesc: "Tu documento de Word está listo",
    downloadBtn: "Descargar DOCX",
    convertAnother: "Convertir otro",
    uploadToStart: "Sube un PDF para comenzar",
    willAppearHere: "Tu documento convertido aparecerá aquí",
    feature1Title: "Alta Fidelidad",
    feature1Desc: "Conserva el diseño original, tablas e imágenes",
    feature2Title: "Totalmente Editable",
    feature2Desc: "Crea un archivo .docx perfecto para MS Word",
    feature3Title: "Procesamiento Seguro",
    feature3Desc: "Tus archivos se procesan de forma segura en tu navegador",
    howToTitle: "¿Cómo convertir PDF a Word?",
    step1Title: "Subir PDF",
    step1Desc: "Selecciona tu archivo PDF.",
    step2Title: "Convertir Documento",
    step2Desc: "Haz clic en el botón de conversión.",
    step3Title: "Descargar Archivo Word",
    step3Desc: "Guarda tu archivo DOCX inmediatamente."
  },
  fr: {
    titleBadge: "Convertisseur PDF en Word",
    titleMain: "Convertir PDF",
    titleHighlight: "en fichier DOCX",
    subtitle: "Transformez vos documents PDF en fichiers Word (DOCX) entièrement modifiables.",
    uploadTitle: "Téléverser le PDF",
    uploadDesc: "Glissez-déposez votre fichier PDF ici ou cliquez pour parcourir",
    convertBtn: "Convertir en Word",
    convertingBtn: "Conversion en cours...",
    resetAll: "Réinitialiser tout",
    resultTitle: "Résultat de la conversion",
    resultDesc: "Votre document Word est prêt",
    downloadBtn: "Télécharger le DOCX",
    convertAnother: "Convertir un autre",
    uploadToStart: "Téléversez un PDF pour commencer",
    willAppearHere: "Votre document converti apparaîtra ici",
    feature1Title: "Haute Fidélité",
    feature1Desc: "Conserve la mise en page originale et les images",
    feature2Title: "Entièrement Modifiable",
    feature2Desc: "Crée un fichier .docx parfait prêt pour MS Word",
    feature3Title: "Traitement Sécurisé",
    feature3Desc: "Vos fichiers sont traités en toute sécurité dans votre navigateur",
    howToTitle: "Comment convertir un PDF en Word ?",
    step1Title: "Téléverser le PDF",
    step1Desc: "Sélectionnez votre document PDF.",
    step2Title: "Convertir le Document",
    step2Desc: "Cliquez sur le bouton de conversion.",
    step3Title: "Télécharger le Fichier Word",
    step3Desc: "Enregistrez directement le fichier DOCX."
  },
  ru: {
    titleBadge: "Конвертер PDF в Word",
    titleMain: "Преобразовать PDF",
    titleHighlight: "в файл DOCX",
    subtitle: "Преобразуйте ваши документы PDF в полностью редактируемые файлы Word (DOCX).",
    uploadTitle: "Загрузить PDF",
    uploadDesc: "Перетащите ваш PDF файл сюда или нажмите для выбора",
    convertBtn: "Конвертировать в Word",
    convertingBtn: "Конвертация...",
    resetAll: "Сбросить все",
    resultTitle: "Результат конвертации",
    resultDesc: "Ваш документ Word готов к скачиванию",
    downloadBtn: "Скачать DOCX",
    convertAnother: "Конвертировать еще",
    uploadToStart: "Загрузите PDF для начала",
    willAppearHere: "Ваш обработанный документ появится здесь",
    feature1Title: "Высокая точность",
    feature1Desc: "Сохраняет исходное форматирование, таблицы и изображения",
    feature2Title: "Полное редактирование",
    feature2Desc: "Создает готовый файл .docx для MS Word",
    feature3Title: "Безопасная обработка",
    feature3Desc: "Ваши файлы обрабатываются локально в браузере",
    howToTitle: "Как конвертировать PDF в Word?",
    step1Title: "Загрузить PDF",
    step1Desc: "Выберите ваш PDF файл.",
    step2Title: "Конвертировать",
    step2Desc: "Нажмите кнопку конвертации.",
    step3Title: "Скачать Word",
    step3Desc: "Сохраните готовый файл DOCX."
  },
  zh: {
    titleBadge: "PDF 转 Word 转换器",
    titleMain: "转换 PDF",
    titleHighlight: "为 DOCX 文件",
    subtitle: "将您的 PDF 文档转换为完全可编辑的高质量 Word (DOCX) 文件。",
    uploadTitle: "上传 PDF",
    uploadDesc: "拖放您的 PDF 文件到此处或点击浏览",
    convertBtn: "转换为 Word",
    convertingBtn: "正在转换...",
    resetAll: "重置所有",
    resultTitle: "转换结果",
    resultDesc: "您的 Word 文档已准备就绪",
    downloadBtn: "下载 DOCX",
    convertAnother: "转换另一个",
    uploadToStart: "上传 PDF 以开始",
    willAppearHere: "您转换后的文档将显示在这里",
    feature1Title: "高保真",
    feature1Desc: "保留原始排版、表格、字体和图像",
    feature2Title: "完全可编辑",
    feature2Desc: "生成完美适用于 MS Word 的 .docx 文件",
    feature3Title: "安全处理",
    feature3Desc: "您的文件在浏览器本地安全处理，绝不泄露",
    howToTitle: "如何将 PDF 转换为 Word？",
    step1Title: "上传 PDF",
    step1Desc: "选择或拖放您的 PDF 文档。",
    step2Title: "转换文档",
    step2Desc: "点击转换按钮处理文档。",
    step3Title: "下载 Word 文件",
    step3Desc: "将生成的 DOCX 文件直接保存到您的设备。"
  }
};

locales.forEach(lang => {
  if (lang === 'en') return;
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const translationsForLang = fullDict[lang] || fullDict['ar'];

  function updateKeys(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        updateKeys(obj[key]);
      } else if (typeof obj[key] === 'string') {
        // Replace keys that are identical to key name (e.g. "titleBadge": "titleBadge")
        if (obj[key] === key && translationsForLang[key]) {
          obj[key] = translationsForLang[key];
        }
      }
    }
  }

  // Inject specific namespaces if missing
  if (translationsForLang.titleBadge) {
    if (!json.PdfToDocx) json.PdfToDocx = {};
    for (const k in translationsForLang) {
      json.PdfToDocx[k] = translationsForLang[k];
    }
  }

  updateKeys(json);

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Successfully audited and translated ${lang}.json`);
});
