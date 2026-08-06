import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const templateMap = {
  // Generic How To Steps & Descriptions
  "Select or drag and drop your file into the tool.": {
    ar: "اختر ملفك أو قم بسحبه وإفلاته داخل الأداة.",
    de: "Wählen Sie Ihre Datei aus oder ziehen Sie sie per Drag & Drop in das Tool.",
    es: "Selecciona o arrastra y suelta tu archivo en la herramienta.",
    fr: "Sélectionnez ou glissez-déposez votre fichier dans l'outil.",
    id: "Pilih atau seret dan lepas berkas Anda ke dalam alat.",
    pt: "Selecione ou arraste e solte seu arquivo na ferramenta.",
    ru: "Выберите или перетащите файл в инструмент.",
    tr: "Dosyanızı seçin veya araca sürükleyip bırakın.",
    zh: "选择或拖放您的文件到工具中。"
  },
  "Click the action button to begin processing. Wait a few moments.": {
    ar: "انقر على زر الإجراء لبدء المعالجة. انتظر بضع لحظات.",
    de: "Klicken Sie auf die Schaltfläche, um die Verarbeitung zu starten. Warten Sie einen Moment.",
    es: "Haz clic en el botón de acción para comenzar el procesamiento. Espera unos momentos.",
    fr: "Cliquez sur le bouton d'action pour lancer le traitement. Patientez quelques instants.",
    id: "Klik tombol tindakan untuk memulai pemrosesan. Tunggu beberapa saat.",
    pt: "Clique no botão de ação para iniciar o processamento. Aguarde alguns momentos.",
    ru: "Нажмите кнопку действия, чтобы начать обработку. Подождите несколько секунд.",
    tr: "İşlemi başlatmak için düğmeye tıklayın. Birkaç saniye bekleyin.",
    zh: "点击操作按钮开始处理。请稍等片刻。"
  },
  "Once completed, download your newly processed file directly to your device.": {
    ar: "بمجرد الانتهاء، قم بتنزيل ملفك المعالج الجديد مباشرة إلى جهازك.",
    de: "Laden Sie nach Abschluss Ihre neu verarbeitete Datei direkt auf Ihr Gerät herunter.",
    es: "Una vez completado, descarga tu nuevo archivo procesado directamente a tu dispositivo.",
    fr: "Une fois terminé, téléchargez votre fichier traité directement sur votre appareil.",
    id: "Setelah selesai, unduh berkas yang baru diproses langsung ke perangkat Anda.",
    pt: "Assim que concluído, baixe seu novo arquivo processado diretamente no seu dispositivo.",
    ru: "После завершения скачайте обработанный файл непосредственно на ваше устройство.",
    tr: "Tamamlandığında, yeni işlenmiş dosyanızı doğrudan cihazınıza indirin.",
    zh: "完成后，直接将新处理的文件下载到您的设备。"
  },
  "Supports all standard formats.": {
    ar: "يدعم جميع التنسيقات القياسية.",
    de: "Unterstützt alle Standardformate.",
    es: "Admite todos los formatos estándar.",
    fr: "Prend en charge tous les formats standard.",
    id: "Mendukung semua format standar.",
    pt: "Suporta todos os formatos padrão.",
    ru: "Поддерживает все стандартные форматы.",
    tr: "Tüm standart formatları destekler.",
    zh: "支持所有标准格式。"
  },
  "Your files are completely safe. All processing happens in your browser and files are never uploaded to any server.": {
    ar: "ملفاتك آمنة تماماً. تتم جميع عمليات المعالجة داخل متصفحك ولا يتم تحميل الملفات إلى أي خادم أبداً.",
    de: "Ihre Dateien sind absolut sicher. Die gesamte Verarbeitung erfolgt in Ihrem Browser und Dateien werden niemals hochgeladen.",
    es: "Tus archivos están completamente seguros. Todo el procesamiento se realiza en tu navegador y los archivos nunca se cargan en ningún servidor.",
    fr: "Vos fichiers sont totalement en sécurité. Tout le traitement se fait dans votre navigateur et les fichiers ne sont jamais téléversés sur un serveur.",
    id: "Berkas Anda sangat aman. Semua pemrosesan terjadi di browser Anda dan berkas tidak pernah diunggah ke server mana pun.",
    pt: "Seus arquivos estão totalmente seguros. Todo o processamento ocorre no seu navegador e os arquivos nunca são enviados para nenhum servidor.",
    ru: "Ваши файлы в полной безопасности. Вся обработка происходит в вашем браузере, и файлы никогда не загружаются на сервер.",
    tr: "Dosyalarınız tamamen güvendedir. Tüm işlemler tarayıcınızda gerçekleşir ve dosyalar asla bir sunucuya yüklenmez.",
    zh: "您的文件绝对安全。所有处理过程均在您的浏览器中完成，文件绝不会被上传到任何服务器。"
  },
  "Fast Local Processing": {
    ar: "معالجة محلية سريعة",
    de: "Schnelle lokale Verarbeitung",
    es: "Procesamiento Local Rápido",
    fr: "Traitement Local Rapide",
    ru: "Быстрая локальная обработка",
    zh: "快速本地处理"
  },
  "Processing occurs entirely in your web browser with zero server uploads.": {
    ar: "تتم المعالجة بالكامل داخل متصفح الويب الخاص بك بدون أي تحميل للخوادم.",
    de: "Die Verarbeitung erfolgt vollständig in Ihrem Webbrowser ohne Server-Uploads.",
    es: "El procesamiento ocurre completamente en tu navegador web sin cargas al servidor.",
    fr: "Le traitement s'effectue entièrement dans votre navigateur web sans aucun téléversement.",
    ru: "Обработка происходит полностью в вашем веб-браузере без загрузки на сервер.",
    zh: "处理完全在您的网页浏览器中进行，零服务器上传。"
  },
  "Complete Privacy Guaranteed": {
    ar: "خصوصية تامة مضمونة",
    de: "Vollständige Privatsphäre garantiert",
    es: "Privacidad Completa Garantizada",
    fr: "Confidentialité Totale Garantie",
    ru: "Гарантия полной конфиденциальности",
    zh: "保证完全隐私"
  },
  "Your sensitive documents and data never leave your local device.": {
    ar: "مستنداتك وبياناتك الحساسة لا تغادر جهازك المحلي أبداً.",
    de: "Ihre vertraulichen Dokumente und Daten verlassen niemals Ihr lokales Gerät.",
    es: "Tus documentos y datos confidenciales nunca salen de tu dispositivo local.",
    fr: "Vos documents et données sensibles ne quittent jamais votre appareil local.",
    ru: "Ваши конфиденциальные документы и данные никогда не покидают ваше локальное устройство.",
    zh: "您的敏感文档和数据绝不会离开您的本地设备。"
  },
  "Universal Compatibility": {
    ar: "توافق عالمي",
    de: "Universelle Kompatibilität",
    es: "Compatibilidad Universal",
    fr: "Compatibilité Universelle",
    ru: "Универсальная совместимость",
    zh: "通用兼容性"
  },
  "Works smoothly across desktop, tablet, and mobile platforms without software installation.": {
    ar: "يعمل بسلاسة عبر أجهزة الكمبيوتر والأجهزة اللوحية والمحمول دون تثبيت برامج.",
    de: "Läuft reibungslos auf Desktop, Tablet und Smartphone ohne Softwareinstallation.",
    es: "Funciona perfectamente en computadoras, tabletas y dispositivos móviles sin instalar software.",
    fr: "Fonctionne de manière fluide sur ordinateur, tablette et mobile sans installation de logiciel.",
    ru: "Работает плавно на ПК, планшетах и мобильных устройствах без установки программ.",
    zh: "在台式机、平板电脑和移动设备上顺畅工作，无需安装软件。"
  },
  "Select File": {
    ar: "تحديد الملف",
    de: "Datei auswählen",
    es: "Seleccionar archivo",
    fr: "Sélectionner le fichier",
    ru: "Выбрать файл",
    zh: "选择文件"
  },
  "Process File": {
    ar: "معالجة الملف",
    de: "Datei verarbeiten",
    es: "Procesar archivo",
    fr: "Traiter le fichier",
    ru: "Обработать файл",
    zh: "处理文件"
  },
  "Download Output": {
    ar: "تنزيل الناتج",
    de: "Ausgabe herunterladen",
    es: "Descargar resultado",
    fr: "Télécharger le résultat",
    ru: "Скачать результат",
    zh: "下载输出文件"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [rawKey, valMap] of Object.entries(templateMap)) {
    const val = valMap[lang] || valMap['ar'] || rawKey;
    const cleanKey = rawKey.trim().replace(/\.$/, '');
    const cleanVal = val.trim().replace(/\.$/, '');

    json.ToolContent[rawKey] = val;
    json.ToolContent[cleanKey] = cleanVal;
    json.ToolContent[cleanKey + '.'] = cleanVal + '.';
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved template translations in ${lang}.json`);
});
