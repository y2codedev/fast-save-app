import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

// High quality sentence translation dictionary
const sentenceMap = {
  // Video Compressor
  "FFmpeg WebAssembly": {
    ar: "FFmpeg WebAssembly",
    de: "FFmpeg WebAssembly",
    es: "FFmpeg WebAssembly",
    fr: "FFmpeg WebAssembly",
    ru: "FFmpeg WebAssembly",
    zh: "FFmpeg WebAssembly"
  },
  "Industry-standard video processing runs natively in your browser.": {
    ar: "تتم معالجة الفيديو المعيارية في الصناعة محليًا داخل متصفحك.",
    de: "Branchenübliche Videoverarbeitung läuft nativ in Ihrem Browser.",
    es: "El procesamiento de video estándar funciona de forma nativa en tu navegador.",
    fr: "Le traitement vidéo standard fonctionne nativement dans votre navigateur.",
    ru: "Обработка видео промышленного стандарта выполняется локально в вашем браузере.",
    zh: "行业标准的视频处理在您的浏览器中本地运行。"
  },
  "Industry-standard video processing runs natively in your browser": {
    ar: "تتم معالجة الفيديو المعيارية في الصناعة محليًا داخل متصفحك",
    de: "Branchenübliche Videoverarbeitung läuft nativ in Ihrem Browser",
    es: "El procesamiento de video estándar funciona de forma nativa en tu navegador",
    fr: "Le traitement vidéo standard fonctionne nativement dans votre navigateur",
    ru: "Обработка видео промышленного стандарта выполняется локально в вашем браузере",
    zh: "行业标准的视频处理在您的浏览器中本地运行"
  },
  "Quality Control": {
    ar: "التحكم بالجودة",
    de: "Qualitätskontrolle",
    es: "Control de Calidad",
    fr: "Contrôle de Qualité",
    ru: "Контроль качества",
    zh: "质量控制"
  },
  "Adjustable CRF slider to balance output size and visual quality.": {
    ar: "مؤشر CRF قابل للتعديل للموازنة بين حجم الملف والجودة البصرية.",
    de: "Einstellbarer CRF-Regler zur Abstimmung von Ausgabegröße und Bildqualität.",
    es: "Control deslizante CRF ajustable para equilibrar el tamaño y la calidad visual.",
    fr: "Curseur CRF réglable pour équilibrer taille de fichier et qualité visuelle.",
    ru: "Регулируемый ползунок CRF для баланса между размером и качеством.",
    zh: "可调节的 CRF 滑块，在输出大小和视觉质量之间取得平衡。"
  },
  "Adjustable CRF slider to balance output size and visual quality": {
    ar: "مؤشر CRF قابل للتعديل للموازنة بين حجم الملف والجودة البصرية",
    de: "Einstellbarer CRF-Regler zur Abstimmung von Ausgabegröße und Bildqualität",
    es: "Control deslizante CRF ajustable para equilibrar el tamaño y la calidad visual",
    fr: "Curseur CRF réglable pour équilibrer taille de fichier et qualité visuelle",
    ru: "Регулируемый ползунок CRF для баланса между размером и качеством",
    zh: "可调节的 CRF 滑块，在输出大小和视觉质量之间取得平衡"
  },
  "H.264 Encoding": {
    ar: "ترميز H.264",
    de: "H.264-Kodierung",
    es: "Codificación H.264",
    fr: "Encodage H.264",
    ru: "Кодирование H.264",
    zh: "H.264 编码"
  },
  "Universal MP4 output compatible with all devices and platforms.": {
    ar: "إخراج بصيغة MP4 العالمية المتوافقة مع جميع الأجهزة والمنصات.",
    de: "Universelle MP4-Ausgabe, kompatibel mit allen Geräten und Plattformen.",
    es: "Salida MP4 universal compatible con todos los dispositivos y plataformas.",
    fr: "Sortie MP4 universelle compatible avec tous les appareils et plateformes.",
    ru: "Универсальный формат MP4, совместимый со всеми устройствами и платформами.",
    zh: "通用的 MP4 输出，与所有设备和平台兼容。"
  },
  "Universal MP4 output compatible with all devices and platforms": {
    ar: "إخراج بصيغة MP4 العالمية المتوافقة مع جميع الأجهزة والمنصات",
    de: "Universelle MP4-Ausgabe, kompatibel mit allen Geräten und Plattformen",
    es: "Salida MP4 universal compatible con todos los dispositivos y plataformas",
    fr: "Sortie MP4 universelle compatible avec tous les appareils et plateformes",
    ru: "Универсальный формат MP4, совместимый со всеми устройствами и платформами",
    zh: "通用的 MP4 输出，与所有设备和平台兼容"
  },
  "No Server Upload": {
    ar: "بدون تحميل إلى الخادم",
    de: "Kein Server-Upload",
    es: "Sin Carga al Servidor",
    fr: "Aucun Téléversement sur Serveur",
    ru: "Без загрузки на сервер",
    zh: "无需上传服务器"
  },
  "Video processing is 100% local — complete privacy guaranteed.": {
    ar: "معالجة الفيديو محلية 100% — الخصوصية الكاملة مضمونة.",
    de: "Videoverarbeitung ist 100 % lokal — vollständige Privatsphäre garantiert.",
    es: "El procesamiento de video es 100% local: privacidad total garantizada.",
    fr: "Le traitement vidéo est 100 % local — confidentialité totale garantie.",
    ru: "Обработка видео на 100% локальна — полная конфиденциальность гарантирована.",
    zh: "视频处理 100% 本地化 — 保证完全隐私。"
  },
  "Video processing is 100% local — complete privacy guaranteed": {
    ar: "معالجة الفيديو محلية 100% — الخصوصية الكاملة مضمونة",
    de: "Videoverarbeitung ist 100 % lokal — vollständige Privatsphäre garantiert",
    es: "El procesamiento de video es 100% local: privacidad total garantizada",
    fr: "Le traitement vidéo est 100 % local — confidentialité totale garantie",
    ru: "Обработка видео на 100% локальна — полная конфиденциальность гарантирована",
    zh: "视频处理 100% 本地化 — 保证完全隐私"
  },
  "All Major Formats": {
    ar: "جميع الصيغ الرئيسية",
    de: "Alle Hauptformate",
    es: "Todos los Formatos Principales",
    fr: "Tous les Formats Principaux",
    ru: "Все основные форматы",
    zh: "所有主要格式"
  },
  "Supports MP4, WebM, MOV, AVI, MKV input formats.": {
    ar: "يدعم صيغ الإدخال MP4 و WebM و MOV و AVI و MKV.",
    de: "Unterstützt MP4, WebM, MOV, AVI, MKV Eingabeformate.",
    es: "Admite formatos de entrada MP4, WebM, MOV, AVI, MKV.",
    fr: "Prend en charge les formats d'entrée MP4, WebM, MOV, AVI, MKV.",
    ru: "Поддерживает форматы MP4, WebM, MOV, AVI, MKV.",
    zh: "支持 MP4、WebM、MOV、AVI、MKV 输入格式。"
  },
  "Supports MP4, WebM, MOV, AVI, MKV input formats": {
    ar: "يدعم صيغ الإدخال MP4 و WebM و MOV و AVI و MKV",
    de: "Unterstützt MP4, WebM, MOV, AVI, MKV Eingabeformate",
    es: "Admite formatos de entrada MP4, WebM, MOV, AVI, MKV",
    fr: "Prend en charge les formats d'entrée MP4, WebM, MOV, AVI, MKV",
    ru: "Поддерживает форматы MP4, WebM, MOV, AVI, MKV",
    zh: "支持 MP4、WebM、MOV、AVI、MKV 输入格式"
  },
  "Progress Indicator": {
    ar: "مؤشر التقدم",
    de: "Fortschrittsanzeige",
    es: "Indicador de Progreso",
    fr: "Indicateur de Progression",
    ru: "Индикатор прогресса",
    zh: "进度指示器"
  },
  "Real-time compression progress with estimated time remaining.": {
    ar: "تقدم الضغط في الوقت الفعلي مع تقدير الوقت المتبقي.",
    de: "Echtzeit-Komprimierungsfortschritt mit geschätzter Verbleibzeit.",
    es: "Progreso de compresión en tiempo real con tiempo restante estimado.",
    fr: "Progression de la compression en temps réel avec temps restant estimé.",
    ru: "Прогресс сжатия в реальном времени с оценкой оставшегося времени.",
    zh: "实时压缩进度及预计剩余时间。"
  },
  "Real-time compression progress with estimated time remaining": {
    ar: "تقدم الضغط في الوقت الفعلي مع تقدير الوقت المتبقي",
    de: "Echtzeit-Komprimierungsfortschritt mit geschätzter Verbleibzeit",
    es: "Progreso de compresión en tiempo real con tiempo restante estimado",
    fr: "Progression de la compression en temps réel avec temps restant estimé",
    ru: "Прогресс сжатия в реальном времени с оценкой оставшегося времени",
    zh: "实时压缩进度及预计剩余时间"
  },
  "Upload Video": {
    ar: "رفع الفيديو",
    de: "Video hochladen",
    es: "Subir Video",
    fr: "Téléverser la vidéo",
    ru: "Загрузить видео",
    zh: "上传视频"
  },
  "Click the upload area or drag and drop your video file. Supports MP4, WebM, MOV, AVI, MKV, and more.": {
    ar: "انقر على منطقة الرفع أو اسحب وأفلت ملف الفيديو. يدعم MP4 و WebM و MOV و AVI و MKV والمزيد.",
    de: "Klicken Sie auf den Upload-Bereich oder ziehen Sie Ihre Videodatei hinein.",
    es: "Haz clic en el área de carga o arrastra y suelta tu archivo de video.",
    fr: "Cliquez sur la zone de téléversement ou glissez-déposez votre fichier vidéo.",
    ru: "Нажмите на область загрузки или перетащите видеофайл.",
    zh: "点击上传区域或拖放您的视频文件。"
  },
  "Click the upload area or drag and drop your video file. Supports MP4, WebM, MOV, AVI, MKV, and more": {
    ar: "انقر على منطقة الرفع أو اسحب وأفلت ملف الفيديو. يدعم MP4 و WebM و MOV و AVI و MKV والمزيد",
    de: "Klicken Sie auf den Upload-Bereich oder ziehen Sie Ihre Videodatei hinein",
    es: "Haz clic en el área de carga o arrastra y suelta tu archivo de video",
    fr: "Cliquez sur la zone de téléversement ou glissez-déposez votre fichier vidéo",
    ru: "Нажмите на область загрузки или перетащите видеофайл",
    zh: "点击上传区域或拖放您的视频文件"
  },
  "Set Compression Level": {
    ar: "تحديد مستوى الضغط",
    de: "Kompressionsstufe festlegen",
    es: "Establecer Nivel de Compresión",
    fr: "Définir le Niveau de Compression",
    ru: "Установить уровень сжатия",
    zh: "设置压缩级别"
  },
  "Choose your quality setting. Lower quality = smaller file size. For most uses, \"Medium\" or \"High\" quality works best.": {
    ar: "اختر إعداد الجودة. جودة أقل = حجم ملف أصغر. معظم الاستخدامات تناسبها الجودة المتوسطة أو العالية.",
    de: "Wählen Sie Ihre Qualitätseinstellung. Geringere Qualität = kleinere Dateigröße.",
    es: "Elige tu configuración de calidad. Menor calidad = menor tamaño de archivo.",
    fr: "Choisissez votre paramètre de qualité. Qualité inférieure = fichier plus petit.",
    ru: "Выберите настройку качества. Ниже качество = меньше размер файла.",
    zh: "选择您的质量设置。较低的质量 = 较小的文件体积。"
  },
  "Choose your quality setting. Lower quality = smaller file size. For most uses, \"Medium\" or \"High\" quality works best": {
    ar: "اختر إعداد الجودة. جودة أقل = حجم ملف أصغر. معظم الاستخدامات تناسبها الجودة المتوسطة أو العالية",
    de: "Wählen Sie Ihre Qualitätseinstellung. Geringere Qualität = kleinere Dateigröße",
    es: "Elige tu configuración de calidad. Menor calidad = menor tamaño de archivo",
    fr: "Choisissez votre paramètre de qualité. Qualité inférieure = fichier plus petit",
    ru: "Выберите настройку качества. Ниже качество = меньше размер файла",
    zh: "选择您的质量设置。较低的质量 = 较小的文件体积"
  },
  "Start Compression": {
    ar: "بدء الضغط",
    de: "Komprimierung starten",
    es: "Iniciar Compresión",
    fr: "Démarrer la Compression",
    ru: "Начать сжатие",
    zh: "开始压缩"
  },
  "Click \"Compress Video\". FFmpeg processes the video entirely in your browser — this may take a minute depending on file size.": {
    ar: "انقر على \"ضغط الفيديو\". يقوم FFmpeg بمعالجة الفيديو بالكامل داخل متصفحك — قد يستغرق ذلك دقيقة حسب حجم الملف.",
    de: "Klicken Sie auf \"Video komprimieren\". FFmpeg verarbeitet das Video vollständig im Browser.",
    es: "Haz clic en \"Comprimir Video\". FFmpeg procesa el video completamente en tu navegador.",
    fr: "Cliquez sur \"Compresser la Vidéo\". FFmpeg traite la vidéo dans votre navigateur.",
    ru: "Нажмите \"Сжать видео\". FFmpeg обрабатывает видео полностью в вашем браузере.",
    zh: "点击“压缩视频”。FFmpeg 完全在您的浏览器中处理视频。"
  },
  "Click \"Compress Video\". FFmpeg processes the video entirely in your browser — this may take a minute depending on file size": {
    ar: "انقر على \"ضغط الفيديو\". يقوم FFmpeg بمعالجة الفيديو بالكامل داخل متصفحك — قد يستغرق ذلك دقيقة حسب حجم الملف",
    de: "Klicken Sie auf \"Video komprimieren\". FFmpeg verarbeitet das Video vollständig im Browser",
    es: "Haz clic en \"Comprimir Video\". FFmpeg procesa el video completamente en tu navegador",
    fr: "Cliquez sur \"Compresser la Vidéo\". FFmpeg traite la vidéo dans votre navigateur",
    ru: "Нажмите \"Сжать видео\". FFmpeg обрабатывает видео полностью в вашем браузере",
    zh: "点击“压缩视频”。FFmpeg 完全在您的浏览器中处理视频"
  },
  "Download Result": {
    ar: "تنزيل النتيجة",
    de: "Ergebnis herunterladen",
    es: "Descargar Resultado",
    fr: "Télécharger le Résultat",
    ru: "Скачать результат",
    zh: "下载结果"
  },
  "Once complete, click \"Download\" to save the compressed MP4 to your device.": {
    ar: "بمجرد الانتهاء، انقر على \"تنزيل\" لحفظ ملف MP4 المضغوط على جهازك.",
    de: "Klicken Sie nach Abschluss auf \"Herunterladen\", um die MP4-Datei zu speichern.",
    es: "Una vez completado, haz clic en \"Descargar\" para guardar el archivo MP4.",
    fr: "Une fois terminé, cliquez sur \"Télécharger\" pour enregistrer le fichier MP4.",
    ru: "После завершения нажмите \"Скачать\", чтобы сохранить сжатый файл MP4.",
    zh: "完成后，点击“下载”将压缩后的 MP4 保存到您的设备。"
  },
  "Once complete, click \"Download\" to save the compressed MP4 to your device": {
    ar: "بمجرد الانتهاء، انقر على \"تنزيل\" لحفظ ملف MP4 المضغوط على جهازك",
    de: "Klicken Sie nach Abschluss auf \"Herunterladen\", um die MP4-Datei zu speichern",
    es: "Una vez completado, haz clic en \"Descargar\" para guardar el archivo MP4",
    fr: "Une fois terminé, cliquez sur \"Télécharger\" pour enregistrer le fichier MP4",
    ru: "После завершения нажмите \"Скачать\", чтобы сохранить сжатый файл MP4",
    zh: "完成后，点击“下载”将压缩后的 MP4 保存到您的设备"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [key, valMap] of Object.entries(sentenceMap)) {
    json.ToolContent[key] = valMap[lang] || valMap['ar'] || key;
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated sentenceMap in ${lang}.json`);
});
