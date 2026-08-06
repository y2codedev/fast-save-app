import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const fullFaqsAndSteps = {
  // How To Step Texts (exact strings from page.tsx)
  "Click the upload area or drag and drop your video file. Supports MP4, WebM, MOV, AVI, MKV, and more.": {
    ar: "انقر على منطقة الرفع أو اسحب وأفلت ملف الفيديو الخاص بك. يدعم MP4 و WebM و MOV و AVI و MKV والمزيد.",
    de: "Klicken Sie auf den Upload-Bereich oder ziehen Sie Ihre Videodatei per Drag & Drop hinein. Unterstützt MP4, WebM, MOV, AVI, MKV und mehr.",
    es: "Haz clic en el área de carga o arrastra y suelta tu archivo de video. Admite MP4, WebM, MOV, AVI, MKV y más.",
    fr: "Cliquez sur la zone de téléversement ou glissez-déposez votre fichier vidéo. Prend en charge MP4, WebM, MOV, AVI, MKV, etc.",
    ru: "Нажмите на область загрузки или перетащите видеофайл. Поддерживает MP4, WebM, MOV, AVI, MKV и другие.",
    zh: "点击上传区域或拖放您的视频文件。支持 MP4、WebM、MOV、AVI、MKV 等。"
  },
  "Choose your quality setting. Lower quality = smaller file size. For most uses, \"Medium\" or \"High\" quality works best.": {
    ar: "اختر إعداد الجودة. جودة أقل = حجم ملف أصغر. معظم الاستخدامات تناسبها الجودة المتوسطة أو العالية.",
    de: "Wählen Sie Ihre Qualitätseinstellung. Geringere Qualität = kleinere Dateigröße. Für die meisten Zwecke eignet sich \"Mittel\" oder \"Hoch\".",
    es: "Elige tu configuración de calidad. Menor calidad = menor tamaño de archivo. Para la mayoría de los usos, la calidad \"Media\" o \"Alta\" funciona mejor.",
    fr: "Choisissez votre paramètre de qualité. Qualité inférieure = fichier plus petit. Pour la plupart des utilisations, la qualité \"Moyenne\" ou \"Haute\" convient le mieux.",
    ru: "Выберите настройку качества. Ниже качество = меньше размер файла. Для большинства задач лучше всего подходит \"Среднее\" или \"Высокое\" качество.",
    zh: "选择您的质量设置。较低的质量 = 较小的文件体积。对于大多数用途，“中等”或“高”质量效果最佳。"
  },
  "Click \"Compress Video\". FFmpeg processes the video entirely in your browser — this may take a minute depending on file size.": {
    ar: "انقر على \"ضغط الفيديو\". يقوم FFmpeg بمعالجة الفيديو بالكامل داخل متصفحك — قد يستغرق ذلك دقيقة حسب حجم الملف.",
    de: "Klicken Sie auf \"Video komprimieren\". FFmpeg verarbeitet das Video vollständig im Browser — dies kann je nach Dateigröße eine Minute dauern.",
    es: "Haz clic en \"Comprimir Video\". FFmpeg procesa el video completamente en tu navegador; esto puede tomar un minuto según el tamaño del archivo.",
    fr: "Cliquez sur \"Compresser la Vidéo\". FFmpeg traite la vidéo entièrement dans votre navigateur — cela peut prendre une minute selon la taille.",
    ru: "Нажмите \"Сжать видео\". FFmpeg обрабатывает видео полностью в вашем браузере — это может занять минуту в зависимости от размера файла.",
    zh: "点击“压缩视频”。FFmpeg 完全在您的浏览器中处理视频 — 根据文件大小，这可能需要一分钟。"
  },
  "Once complete, click \"Download\" to save the compressed MP4 to your device.": {
    ar: "بمجرد الانتهاء، انقر على \"تنزيل\" لحفظ ملف MP4 المضغوط على جهازك.",
    de: "Klicken Sie nach Abschluss auf \"Herunterladen\", um die komprimierte MP4-Datei auf Ihrem Gerät zu speichern.",
    es: "Una vez completado, haz clic en \"Descargar\" para guardar el archivo MP4 comprimido en tu dispositivo.",
    fr: "Une fois terminé, cliquez sur \"Télécharger\" pour enregistrer le fichier MP4 compressé sur votre appareil.",
    ru: "После завершения нажмите \"Скачать\", чтобы сохранить сжатый файл MP4 на вашем устройстве.",
    zh: "完成后，点击“下载”将压缩后的 MP4 保存到您的设备。"
  },

  // Video Compressor FAQs
  "How much will my video be compressed?": {
    ar: "ما مدى نسبة ضغط الفيديو الخاص بي؟",
    de: "Wie stark wird mein Video komprimiert?",
    es: "¿Cuánto se comprimirá mi video?",
    fr: "À quel point ma vidéo sera-t-elle compressée ?",
    ru: "Насколько уменьшится размер моего видео?",
    zh: "我的视频会被压缩多少？"
  },
  "Compression ratio depends on the original quality and your settings. Typically 50-80% size reduction is achievable. The quality slider lets you control the trade-off.": {
    ar: "تعتمد نسبة الضغط على الجودة الأصلية وإعداداتك. عادةً يمكنك تحقيق تقليل في الحجم بنسبة 50-80%. يتيح لك شريط التمرير التحكم في التوازن بين الجودة والحجم.",
    de: "Das Kompressionsverhältnis hängt von der Originalqualität und Ihren Einstellungen ab. In der Regel ist eine Größenreduzierung um 50–80 % möglich.",
    es: "La relación de compresión depende de la calidad original y tu configuración. Por lo general, se logra una reducción del 50-80%.",
    fr: "Le taux de compression dépend de la qualité d'origine et de vos paramètres. Une réduction de 50 à 80 % est généralement réalisable.",
    ru: "Коэффициент сжатия зависит от исходного качества и ваших настроек. Обычно достигается уменьшение размера на 50-80%.",
    zh: "压缩率取决于原始质量和您的设置。通常可以实现 50-80% 的体积拆减。质量滑块让您自由控制平衡。"
  },
  "Will compressed video lose quality?": {
    ar: "هل سيفقد الفيديو المضغوط جودته؟",
    de: "Verliert das komprimierte Video an Qualität?",
    es: "¿Perderá calidad el video comprimido?",
    fr: "La vidéo compressée perdra-t-elle en qualité ?",
    ru: "Потеряет ли сжатое видео в качестве?",
    zh: "压缩后的视频会损失画质吗？"
  },
  "Some quality loss occurs with any lossy compression, but at moderate settings (CRF 23-28), the visual difference is minimal to imperceptible in most videos.": {
    ar: "يحدث بعض الملاحظة في الجودة مع أي ضغط، ولكن مع الإعدادات المعتدلة (CRF 23-28)، يكون الفرق البصري ضئيلاً للغاية أو غير ملحوظ في معظم الفيديوهات.",
    de: "Bei jeder verlustbehafteten Komprimierung kommt es zu leichten Qualitätsverlusten, bei mittleren Einstellungen ist der Unterschied jedoch kaum wahrnehmbar.",
    es: "Se produce cierta pérdida de calidad con cualquier compresión, pero con configuraciones moderadas (CRF 23-28), la diferencia visual es mínima.",
    fr: "Toute compression entraîne une légère perte, mais avec des paramètres modérés (CRF 23-28), la différence visuelle est minime.",
    ru: "Некоторая потеря качества происходит при любом сжатии, но при умеренных настройках (CRF 23-28) визуальная разница минимальна.",
    zh: "任何有损压缩都会有微小的画质损失，但在中等设置下（CRF 23-28），在大多数视频中肉眼几乎无法察觉到差异。"
  },
  "How long does video compression take?": {
    ar: "كم من الوقت تستغرق عملية ضغط الفيديو؟",
    de: "Wie lange dauert die Videokomprimierung?",
    es: "¿Cuánto tiempo toma la compresión de video?",
    fr: "Combien de temps prend la compression vidéo ?",
    ru: "Сколько времени занимает сжатие видео?",
    zh: "视频压缩需要多长时间？"
  },
  "Processing time depends on video length, resolution, and your device's CPU speed. A 1-minute HD video typically takes 30-120 seconds to compress.": {
    ar: "يعتمد وقت المعالجة على طول الفيديو والدقة وسرعة معالج جهازك. يستغرق فيديو HD مدته دقيقة واحدة عادةً من 30 إلى 120 ثانية للضغط.",
    de: "Die Verarbeitungszeit hängt von Videolänge, Auflösung und CPU-Geschwindigkeit ab.",
    es: "El tiempo de procesamiento depende de la duración del video, la resolución y la velocidad de la CPU.",
    fr: "Le temps de traitement dépend de la durée de la vidéo, de la résolution et de la vitesse du processeur.",
    ru: "Время обработки зависит от длины видео, разрешения и скорости процессора вашего устройства.",
    zh: "处理时间取决于视频长度、分辨率和设备的 CPU 速度。1 分钟的高清视频通常需要 30-120 秒完成压缩。"
  },
  "Can I compress video for WhatsApp or email?": {
    ar: "هل يمكنني ضغط الفيديو لواتساب أو البريد الإلكتروني؟",
    de: "Kann ich Videos für WhatsApp oder E-Mail komprimieren?",
    es: "¿Puedo comprimir video para WhatsApp o correo electrónico?",
    fr: "Puis-je compresser une vidéo pour WhatsApp ou un e-mail ?",
    ru: "Могу ли я сжать видео для WhatsApp или электронной почты?",
    zh: "我可以为 WhatsApp 或电子邮件压缩视频吗？"
  },
  "Yes! WhatsApp has a 16MB limit. Set a lower quality to ensure your compressed video meets size requirements for sharing via messaging apps or email.": {
    ar: "نعم! حد واتساب هو 16 ميجابايت. اضبط جودة أقل لضمان استيفاء الفيديو المضغوط لمتطلبات الحجم للمشاركة عبر تطبيقات المراسلة أو البريد الإلكتروني.",
    de: "Ja! WhatsApp hat ein Limit von 16 MB. Stellen Sie eine niedrigere Qualität ein, um das Limit einzuhalten.",
    es: "¡Sí! WhatsApp tiene un límite de 16 MB. Establece una calidad más baja para cumplir con los requisitos.",
    fr: "Oui ! WhatsApp a une limite de 16 Mo. Réglez une qualité inférieure pour respecter la limite.",
    ru: "Да! У WhatsApp лимит 16 МБ. Установите более низкое качество, чтобы соответствовать требованиям.",
    zh: "是的！WhatsApp 有 16MB 的限制。设置较低的质量以确保压缩后的视频符合分享的大小要求。"
  },
  "Does compressed video work on all devices?": {
    ar: "هل يعمل الفيديو المضغوط على جميع الأجهزة؟",
    de: "Funktioniert das komprimierte Video auf allen Geräten?",
    es: "¿Funciona el video comprimido en todos los dispositivos?",
    fr: "La vidéo compressée fonctionne-t-elle sur tous les appareils ?",
    ru: "Работает ли сжатое видео на всех устройствах?",
    zh: "压缩后的视频可以在所有设备上播放吗？"
  },
  "Yes. Output is in MP4 (H.264) format, which is supported universally on iOS, Android, Windows, macOS, and all web browsers.": {
    ar: "نعم. الإخراج بصيغة MP4 (H.264) المدعومة عالمياً على iOS و Android و Windows و macOS وجميع متصفحات الويب.",
    de: "Ja. Die Ausgabe erfolgt im MP4 (H.264)-Format, das universell auf iOS, Android, Windows, macOS und allen Browsern unterstützt wird.",
    es: "Sí. La salida es en formato MP4 (H.264), compatible de forma universal en iOS, Android, Windows, macOS y todos los navegadores.",
    fr: "Oui. La sortie est au format MP4 (H.264), pris en charge universellement sur iOS, Android, Windows, macOS et tous les navigateurs.",
    ru: "Да. Выходной формат MP4 (H.264) универсально поддерживается на iOS, Android, Windows, macOS и во всех браузерах.",
    zh: "是的。输出格式为 MP4 (H.264)，在 iOS、Android、Windows、macOS 和所有网页浏览器上均受通用支持。"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [rawKey, valMap] of Object.entries(fullFaqsAndSteps)) {
    const val = valMap[lang] || valMap['ar'] || rawKey;
    json.ToolContent[rawKey] = val;

    // Normalize keys: add both with and without trailing dot
    const cleanKey = rawKey.trim().replace(/\.$/, '');
    const cleanVal = val.trim().replace(/\.$/, '');

    json.ToolContent[cleanKey] = cleanVal;
    json.ToolContent[cleanKey + '.'] = cleanVal + '.';
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved 100% complete FAQs and Steps in ${lang}.json`);
});
