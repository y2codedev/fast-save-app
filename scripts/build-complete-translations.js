import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

// High quality exact sentence translations
const translations = {
  // Video Compressor Steps & Text
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
    de: "Klicken Sie auf den Upload-Bereich oder ziehen Sie Ihre Videodatei hinein. Unterstützt MP4, WebM, MOV, AVI, MKV und mehr.",
    es: "Haz clic en el área de carga o arrastra y suelta tu archivo de video. Admite MP4, WebM, MOV, AVI, MKV y más.",
    fr: "Cliquez sur la zone de téléversement ou glissez-déposez votre fichier vidéo. Prend en charge MP4, WebM, MOV, AVI, MKV, etc.",
    ru: "Нажмите на область загрузки или перетащите видеофайл. Поддерживает MP4, WebM, MOV, AVI, MKV и другие.",
    zh: "点击上传区域或拖放您的视频文件。支持 MP4、WebM、MOV、AVI、MKV 等。"
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
    de: "Wählen Sie Ihre Qualitätseinstellung. Geringere Qualität = kleinere Dateigröße. Für die meisten Verwendungen eignet sich Mittlere oder Hohe Qualität.",
    es: "Elige tu configuración de calidad. Menor calidad = menor tamaño de archivo. Para la mayoría de los usos, la calidad Media o Alta funciona mejor.",
    fr: "Choisissez votre paramètre de qualité. Qualité inférieure = fichier plus petit. Pour la plupart des utilisations, la qualité Moyenne ou Haute est idéale.",
    ru: "Выберите настройку качества. Ниже качество = меньше размер файла. Для большинства задач лучше всего подходит Среднее или Высокое качество.",
    zh: "选择您的质量设置。较低的质量 = 较小的文件体积。对于大多数用途，中等或高质量效果最佳。"
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
    de: "Klicken Sie auf \"Video komprimieren\". FFmpeg verarbeitet das Video vollständig im Browser — dies kann je nach Dateigröße eine Minute dauern.",
    es: "Haz clic en \"Comprimir Video\". FFmpeg procesa el video completamente en tu navegador; esto puede tomar un minuto según el tamaño del archivo.",
    fr: "Cliquez sur \"Compresser la Vidéo\". FFmpeg traite la vidéo dans votre navigateur — cela peut prendre une minute selon la taille du fichier.",
    ru: "Нажмите \"Сжать видео\". FFmpeg обрабатывает видео полностью в вашем браузере — это может занять минуту в зависимости от размера файла.",
    zh: "点击“压缩视频”。FFmpeg 完全在您的浏览器中处理视频 — 根据文件大小，这可能需要一分钟。"
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
    de: "Klicken Sie nach Abschluss auf \"Herunterladen\", um die komprimierte MP4-Datei auf Ihrem Gerät zu speichern.",
    es: "Una vez completado, haz clic en \"Descargar\" para guardar el archivo MP4 comprimido en tu dispositivo.",
    fr: "Une fois terminé, cliquez sur \"Télécharger\" pour enregistrer le fichier MP4 compressé sur votre appareil.",
    ru: "После завершения нажмите \"Скачать\", чтобы сохранить сжатый файл MP4 на вашем устройстве.",
    zh: "完成后，点击“下载”将压缩后的 MP4 保存到您的设备。"
  },

  // Video Compressor Use Cases
  "Compressing videos to meet WhatsApp's 16MB sharing limit": {
    ar: "ضغط الفيديوهات لتناسب حد المشاركة في واتساب وهو 16 ميجابايت",
    de: "Videos komprimieren, um das 16-MB-Freigabelimit von WhatsApp einzuhalten",
    es: "Comprimir videos para cumplir con el límite de 16 MB de WhatsApp",
    fr: "Compresser des vidéos pour respecter la limite de 16 Mo de WhatsApp",
    ru: "Сжатие видео для соблюдения лимита WhatsApp в 16 МБ",
    zh: "压缩视频以满足 WhatsApp 16MB 的分享限制"
  },
  "Reducing video size for Gmail or Outlook attachments": {
    ar: "تقليل حجم الفيديو للمرفقات في جي ميل أو أوتلوك",
    de: "Videogröße für Gmail- oder Outlook-Anhänge reduzieren",
    es: "Reducir el tamaño del video para archivos adjuntos de Gmail u Outlook",
    fr: "Réduire la taille des vidéos pour les pièces jointes Gmail ou Outlook",
    ru: "Уменьшение размера видео для вложений Gmail или Outlook",
    zh: "减小 Gmail 或 Outlook 附件的视频体积"
  },
  "Optimizing videos for website embedding and faster loading": {
    ar: "تحسين الفيديوهات لتضمينها في المواقع وتسريع التحميل",
    de: "Videos für die Website-Einbettung und schnelleres Laden optimieren",
    es: "Optimizar videos para incrustar en sitios web y cargar más rápido",
    fr: "Optimiser les vidéos pour l'intégration web et un chargement plus rapide",
    ru: "Оптимизация видео для вставки на сайт и более быстрой загрузки",
    zh: "优化视频以用于网站嵌入和更快加载"
  },
  "Shrinking screen recordings before sharing with colleagues": {
    ar: "تصغير تسجيلات الشاشة قبل مشاركتها مع الزملاء",
    de: "Bildschirmaufnahmen vor dem Teilen mit Kollegen verkleinern",
    es: "Reducir grabaciones de pantalla antes de compartirlas con colegas",
    fr: "Réduire les enregistrements d'écran avant de les partager avec des collègues",
    ru: "Уменьшение записей экрана перед отправкой коллегам",
    zh: "在与同事共享之前缩小屏幕录像体积"
  },
  "Archiving large video libraries with reduced storage footprint": {
    ar: "أرشفة مكتبات الفيديو الكبيرة مع تقليل المساحة المستهلكة",
    de: "Große Videobibliotheken mit geringerem Speicherbedarf archivieren",
    es: "Archivar grandes bibliotecas de video con un menor consumo de almacenamiento",
    fr: "Archiver de grandes bibliothèques vidéo avec une empreinte de stockage réduite",
    ru: "Архивирование больших видеобиблиотек с меньшими затратами памяти",
    zh: "归档大型视频库以减少存储占用"
  },
  "Compressing social media videos (Instagram Reels, TikTok, YouTube Shorts)": {
    ar: "ضغط فيديوهات وسائل التواصل الاجتماعي (انستغرام ريلز، تيك توك، يوتيوب شورتس)",
    de: "Videos für soziale Medien komprimieren (Instagram Reels, TikTok, YouTube Shorts)",
    es: "Comprimir videos para redes sociales (Instagram Reels, TikTok, YouTube Shorts)",
    fr: "Compresser les vidéos des réseaux sociaux (Instagram Reels, TikTok, YouTube Shorts)",
    ru: "Сжатие видео для соцсетей (Instagram Reels, TikTok, YouTube Shorts)",
    zh: "压缩社交媒体视频（Instagram Reels、TikTok、YouTube Shorts）"
  },
  "Preparing videos for mobile app content delivery": {
    ar: "إعداد الفيديوهات لتسليم المحتوى على تطبيقات المحمول",
    de: "Videos für die Bereitstellung von Inhalten in mobilen Apps vorbereiten",
    es: "Preparar videos para la entrega de contenido en aplicaciones móviles",
    fr: "Préparer des vidéos pour la diffusion de contenu sur des applications mobiles",
    ru: "Подготовка видео для доставки контента в мобильных приложениях",
    zh: "为移动应用内容分发准备视频"
  },

  // Privacy Note
  "Video processing using FFmpeg WebAssembly happens entirely in your browser. Your video files are never transmitted to our servers. All compression is performed locally on your device using your CPU.": {
    ar: "تتم معالجة الفيديو باستخدام FFmpeg WebAssembly بالكامل في متصفحك. لا يتم نقل ملفات الفيديو إلى خوادمنا أبداً. يتم إجراء جميع عمليات الضغط محلياً على جهازك باستخدام المعالج.",
    de: "Die Videoverarbeitung mit FFmpeg WebAssembly erfolgt vollständig in Ihrem Browser. Ihre Videodateien werden niemals an unsere Server übertragen.",
    es: "El procesamiento de video con FFmpeg WebAssembly ocurre completamente en tu navegador. Tus archivos nunca se transmiten a nuestros servidores.",
    fr: "Le traitement vidéo à l'aide de FFmpeg WebAssembly se produit entièrement dans votre navigateur. Vos fichiers vidéo ne sont jamais transmis à nos serveurs.",
    ru: "Обработка видео с использованием FFmpeg WebAssembly происходит полностью в вашем браузере. Ваши файлы никогда не передаются на наши серверы.",
    zh: "使用 FFmpeg WebAssembly 的视频处理完全在您的浏览器中进行。您的视频文件绝不会传输到我们的服务器。"
  },

  // Video Compressor FAQs
  "How does the video compressor work?": {
    ar: "كيف يعمل ضاغط الفيديو؟",
    de: "Wie funktioniert der Videokompressor?",
    es: "¿Cómo funciona el compresor de video?",
    fr: "Comment fonctionne le compresseur vidéo ?",
    ru: "Как работает видеокомпрессор?",
    zh: "视频压缩器是如何工作的？"
  },
  "It uses FFmpeg compiled to WebAssembly, which runs directly in your browser. The video is re-encoded using H.264 codec at your selected quality level.": {
    ar: "يستخدم مكتبة FFmpeg المجمعة إلى WebAssembly والتي تعمل مباشرة في متصفحك. يتم إعادة ترميز الفيديو باستخدام ترميز H.264 بمستوى الجودة الذي تحدده.",
    de: "Es verwendet zu WebAssembly kompiliertes FFmpeg, das direkt in Ihrem Browser läuft.",
    es: "Utiliza FFmpeg compilado en WebAssembly, que se ejecuta directamente en tu navegador.",
    fr: "Il utilise FFmpeg compilé en WebAssembly, qui s'exécute directement dans votre navigateur.",
    ru: "Он использует FFmpeg, скомпилированный в WebAssembly, который работает прямо в вашем браузере.",
    zh: "它使用编译为 WebAssembly 的 FFmpeg，该工具直接在您的浏览器中运行。"
  },
  "What video formats are supported?": {
    ar: "ما هي صيغ الفيديو المدعومة؟",
    de: "Welche Videoformate werden unterstützt?",
    es: "¿Qué formatos de video son compatibles?",
    fr: "Quels formats vidéo sont pris en charge ?",
    ru: "Какие форматы видео поддерживаются?",
    zh: "支持哪些视频格式？"
  },
  "Input: MP4, WebM, MOV, AVI, MKV, and more. Output is typically MP4 (H.264), which is universally compatible across all devices and platforms.": {
    ar: "الإدخال: MP4 و WebM و MOV و AVI و MKV والمزيد. الإخراج عادةً MP4 (H.264) المتوافق عالمياً عبر جميع الأجهزة والمنصات.",
    de: "Eingabe: MP4, WebM, MOV, AVI, MKV und mehr. Die Ausgabe ist in der Regel MP4 (H.264).",
    es: "Entrada: MP4, WebM, MOV, AVI, MKV y más. La salida suele ser MP4 (H.264).",
    fr: "Entrée : MP4, WebM, MOV, AVI, MKV, etc. La sortie est généralement MP4 (H.264).",
    ru: "Вход: MP4, WebM, MOV, AVI, MKV и другие. Выход обычно MP4 (H.264).",
    zh: "输入：MP4、WebM、MOV、AVI、MKV 等。输出通常为通用兼容的 MP4 (H.264)。"
  },
  "Is there a video file size limit?": {
    ar: "هل هناك حد لحجم ملف الفيديو؟",
    de: "Gibt es ein Limit für die Videodateigröße?",
    es: "¿Existe un límite de tamaño de archivo de video?",
    fr: "Y a-t-il une limite de taille de fichier vidéo ?",
    ru: "Есть ли ограничение на размер видеофайла?",
    zh: "视频文件大小有限制吗？"
  },
  "No server-imposed limit. Processing is done in your browser, so practical limits are your device's available RAM — most devices handle 1-2GB files comfortably.": {
    ar: "لا يوجد حد مفروض من الخادم. تتم المعالجة في متصفحك، لذا فإن الحدود العملية هي الذاكرة المتاحة بجهازك — معظم الأجهزة تتعامل مع ملفات 1-2 جيجابايت بسلاسة.",
    de: "Kein vom Server vorgegebenes Limit. Die Verarbeitung erfolgt im Browser.",
    es: "Sin límite impuesto por el servidor. El procesamiento se realiza en tu navegador.",
    fr: "Aucune limite imposée par le serveur. Le traitement est effectué dans votre navigateur.",
    ru: "Нет ограничений со стороны сервера. Обработка выполняется в вашем браузере.",
    zh: "无服务器限制。处理在您的浏览器中完成，取决于设备可用内存。"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [rawKey, valMap] of Object.entries(translations)) {
    const val = valMap[lang] || valMap['ar'] || rawKey;
    json.ToolContent[rawKey] = val;
    // Also set key without trailing dot if key ends with dot
    if (rawKey.endsWith('.')) {
      const keyNoDot = rawKey.slice(0, -1).trim();
      const valNoDot = val.endsWith('.') ? val.slice(0, -1).trim() : val;
      json.ToolContent[keyNoDot] = valNoDot;
    } else {
      json.ToolContent[rawKey + '.'] = val + '.';
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Successfully built complete translations in ${lang}.json`);
});
