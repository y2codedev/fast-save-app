import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const translations = {
  // Features
  "100% Free & Unlimited": {
    en: "100% Free & Unlimited",
    ar: "مجاني 100% وبدون حدود",
    de: "100% Kostenlos & Unbegrenzt",
    es: "100% Gratis e Ilimitado",
    fr: "100% Gratuit et Illimité",
    id: "100% Gratis & Tanpa Batas",
    pt: "100% Grátis e Ilimitado",
    ru: "100% Бесплатно и без ограничений",
    tr: "%100 Ücretsiz ve Sınırsız",
    zh: "100% 免费且无限制"
  },
  "Use the tool as many times as you want without any restrictions or fees.": {
    en: "Use the tool as many times as you want without any restrictions or fees.",
    ar: "استخدم الأداة بقدر ما تريد دون أي قيود أو رسوم.",
    de: "Nutzen Sie das Tool so oft Sie möchten, ohne Einschränkungen oder Gebühren.",
    es: "Usa la herramienta tantas veces como quieras sin restricciones ni tarifas.",
    fr: "Utilisez l'outil autant de fois que vous le souhaitez sans restriction ni frais.",
    id: "Gunakan alat sebanyak yang Anda inginkan tanpa batasan atau biaya.",
    pt: "Use a ferramenta quantas vezes quiser sem restrições ou taxas.",
    ru: "Используйте инструмент столько раз, сколько хотите, без каких-либо ограничений и платы.",
    tr: "Aracı herhangi bir kısıtlama veya ücret olmadan dilediğiniz kadar kullanın.",
    zh: "无限次使用该工具，没有任何限制或费用。"
  },
  "Private & Secure": {
    en: "Private & Secure",
    ar: "خاص وآمن",
    de: "Privat & Sicher",
    es: "Privado y Seguro",
    fr: "Privé et Sécurisé",
    id: "Privat & Aman",
    pt: "Privado e Seguro",
    ru: "Конфиденциально и безопасно",
    tr: "Gizli ve Güvenli",
    zh: "私密与安全"
  },
  "All processing happens locally in your browser. Your files never leave your device.": {
    en: "All processing happens locally in your browser. Your files never leave your device.",
    ar: "تتم جميع المعالجات محليًا في متصفحك. لا تغادر ملفاتك جهازك أبداً.",
    de: "Alle Verarbeitungen erfolgen lokal in Ihrem Browser. Ihre Dateien verlassen Ihr Gerät nie.",
    es: "Todo el procesamiento se realiza localmente en tu navegador. Tus archivos nunca salen de tu dispositivo.",
    fr: "Tout le traitement se fait localement dans votre navigateur. Vos fichiers ne quittent jamais votre appareil.",
    id: "Semua pemrosesan terjadi secara lokal di browser Anda. File Anda tidak pernah meninggalkan perangkat Anda.",
    pt: "Todo o processamento ocorre localmente no seu navegador. Seus arquivos nunca saem do seu dispositivo.",
    ru: "Вся обработка происходит локально в вашем браузере. Ваши файлы никогда не покидают ваше устройство.",
    tr: "Tüm işlemler yerel olarak tarayıcınızda gerçekleşir. Dosyalarınız asla cihazınızdan çıkmaz.",
    zh: "所有处理均在您的浏览器本地进行。您的文件绝不会离开您的设备。"
  },
  "No Installation": {
    en: "No Installation",
    ar: "بدون تثبيت",
    de: "Keine Installation",
    es: "Sin Instalación",
    fr: "Sans Installation",
    id: "Tanpa Instalasi",
    pt: "Sem Instalação",
    ru: "Без установки",
    tr: "Kurulum Gerektirmez",
    zh: "无需安装"
  },
  "Works directly in Chrome, Safari, Firefox, and Edge on any device.": {
    en: "Works directly in Chrome, Safari, Firefox, and Edge on any device.",
    ar: "يعمل مباشرة في Chrome و Safari و Firefox و Edge على أي جهاز.",
    de: "Funktioniert direkt in Chrome, Safari, Firefox und Edge auf jedem Gerät.",
    es: "Funciona directamente en Chrome, Safari, Firefox y Edge en cualquier dispositivo.",
    fr: "Fonctionne directement dans Chrome, Safari, Firefox et Edge sur n'importe quel appareil.",
    id: "Bekerja langsung di Chrome, Safari, Firefox, dan Edge di perangkat apa pun.",
    pt: "Funciona diretamente no Chrome, Safari, Firefox e Edge em qualquer dispositivo.",
    ru: "Работает непосредственно в Chrome, Safari, Firefox и Edge на любом устройстве.",
    tr: "Herhangi bir cihazda doğrudan Chrome, Safari, Firefox ve Edge'de çalışır.",
    zh: "在任何设备上的 Chrome、Safari、Firefox 和 Edge 中直接运行。"
  },
  "Fast Processing": {
    en: "Fast Processing",
    ar: "معالجة سريعة",
    de: "Schnelle Verarbeitung",
    es: "Procesamiento Rápido",
    fr: "Traitement Rapide",
    id: "Pemrosesan Cepat",
    pt: "Processamento Rápido",
    ru: "Быстрая обработка",
    tr: "Hızlı İşleme",
    zh: "快速处理"
  },
  "Leverages your device's hardware for near-instant results.": {
    en: "Leverages your device's hardware for near-instant results.",
    ar: "يستفيد من أجهزة جهازك للحصول على نتائج شبه فورية.",
    de: "Nützt die Hardware Ihres Geräts für fast sofortige Ergebnisse.",
    es: "Aprovecha el hardware de tu dispositivo para obtener resultados casi instantáneos.",
    fr: "Exploite le matériel de votre appareil pour des résultats quasi instantanés.",
    id: "Memanfaatkan perangkat keras Anda untuk hasil yang hampir instan.",
    pt: "Aproveita o hardware do seu dispositivo para resultados quase instantâneos.",
    ru: "Использует аппаратные средства вашего устройства для почти мгновенных результатов.",
    tr: "Neredeyse anında sonuçlar için cihazınızın donanımından yararlanır.",
    zh: "利用您设备的硬件以获得近乎立竿见影的效果。"
  },
  // How To Steps
  "Upload File": {
    en: "Upload File",
    ar: "رفع الملف",
    de: "Datei hochladen",
    es: "Subir Archivo",
    fr: "Téléverser le fichier",
    id: "Unggah File",
    pt: "Enviar Arquivo",
    ru: "Загрузить файл",
    tr: "Dosya Yükle",
    zh: "上传文件"
  },
  "Select or drag and drop your file into the tool.": {
    en: "Select or drag and drop your file into the tool.",
    ar: "حدد ملفك أو اسحبه وأفلطه في الأداة.",
    de: "Wählen Sie Ihre Datei aus oder ziehen Sie sie per Drag & Drop in das Tool.",
    es: "Selecciona o arrastra y suelta tu archivo en la herramienta.",
    fr: "Sélectionnez ou glissez-déposez votre fichier dans l'outil.",
    id: "Pilih atau seret dan lepas file Anda ke dalam alat.",
    pt: "Selecione ou arraste e solte seu arquivo na ferramenta.",
    ru: "Выберите или перетащите файл в инструмент.",
    tr: "Dosyanızı seçin veya araca sürükleyip bırakın.",
    zh: "选择或拖放您的文件到工具中。"
  },
  "Process": {
    en: "Process",
    ar: "معالجة",
    de: "Verarbeiten",
    es: "Procesar",
    fr: "Traiter",
    id: "Proses",
    pt: "Processar",
    ru: "Обработка",
    tr: "İşle",
    zh: "处理"
  },
  "Click the action button to begin processing. Wait a few moments.": {
    en: "Click the action button to begin processing. Wait a few moments.",
    ar: "انقر على زر الإجراء لبدء المعالجة. انتظر لحظات.",
    de: "Klicken Sie auf die Schaltfläche, um die Verarbeitung zu starten. Warten Sie einen Moment.",
    es: "Haz clic en el botón de acción para comenzar el procesamiento. Espera unos momentos.",
    fr: "Cliquez sur le bouton d'action pour commencer le traitement. Patientez quelques instants.",
    id: "Klik tombol tindakan untuk memulai pemrosesan. Tunggu beberapa saat.",
    pt: "Clique no botão de ação para iniciar o processamento. Aguarde alguns momentos.",
    ru: "Нажмите кнопку действия, чтобы начать обработку. Подождите несколько секунд.",
    tr: "İşlemi başlatmak için eylem düğmesine tıklayın. Birkaç saniye bekleyin.",
    zh: "点击操作按钮开始处理。稍等片刻。"
  },
  "Download": {
    en: "Download",
    ar: "تنزيل",
    de: "Herunterladen",
    es: "Descargar",
    fr: "Télécharger",
    id: "Unduh",
    pt: "Baixar",
    ru: "Скачать",
    tr: "İndir",
    zh: "下载"
  },
  "Once completed, download your newly processed file directly to your device.": {
    en: "Once completed, download your newly processed file directly to your device.",
    ar: "بمجرد الانتهاء، قم بتنزيل ملفك المعالج مباشرة إلى جهازك.",
    de: "Laden Sie nach Abschluss Ihre neu verarbeitete Datei direkt auf Ihr Gerät herunter.",
    es: "Una vez completado, descarga tu archivo procesado directamente a tu dispositivo.",
    fr: "Une fois terminé, téléchargez votre fichier traité directement sur votre appareil.",
    id: "Setelah selesai, unduh file baru Anda langsung ke perangkat Anda.",
    pt: "Depois de concluído, baixe seu arquivo processado diretamente no seu dispositivo.",
    ru: "После завершения скачайте обработанный файл непосредственно на ваше устройство.",
    tr: "Tamamlandığında, yeni işlenen dosyanızı doğrudan cihazınıza indirin.",
    zh: "完成后，直接将新处理的文件下载到您的设备。"
  },
  // FAQs
  "Is this tool free to use?": {
    en: "Is this tool free to use?",
    ar: "هل هذه الأداة مجانية للاستخدام؟",
    de: "Ist dieses Tool kostenlos?",
    es: "¿Esta herramienta es gratuita?",
    fr: "Cet outil est-il gratuit ?",
    id: "Apakah alat ini gratis untuk digunakan?",
    pt: "Esta ferramenta é gratuita para usar?",
    ru: "Этот инструмент бесплатен?",
    tr: "Bu aracı kullanmak ücretsiz mi?",
    zh: "这个工具是免费使用的吗？"
  },
  "Yes, this tool is 100% free with no hidden fees or signups required.": {
    en: "Yes, this tool is 100% free with no hidden fees or signups required.",
    ar: "نعم، هذه الأداة مجانية 100% بدون أي رسوم خفية أو تسجيل مطلوب.",
    de: "Ja, dieses Tool ist 100% kostenlos ohne versteckte Gebühren oder Registrierung.",
    es: "Sí, esta herramienta es 100% gratuita sin tarifas ocultas ni registro requerido.",
    fr: "Oui, cet outil est 100 % gratuit, sans frais cachés ni inscription requise.",
    id: "Ya, alat ini 100% gratis tanpa biaya tersembunyi atau pendaftaran.",
    pt: "Sim, esta ferramenta é 100% gratuita sem taxas ocultas ou registro necessário.",
    ru: "Да, этот инструмент на 100% бесплатен, без скрытых платежей и необходимости регистрации.",
    tr: "Evet, bu araç %100 ücretsizdir, hiçbir gizli ücret veya kayıt gerektirmez.",
    zh: "是的，此工具100%免费，没有任何隐藏费用或注册要求。"
  },
  "Are my files uploaded to a server?": {
    en: "Are my files uploaded to a server?",
    ar: "هل يتم تحميل ملفاتي إلى خادم؟",
    de: "Werden meine Dateien auf einen Server hochgeladen?",
    es: "¿Mis archivos se suben a un servidor?",
    fr: "Mes fichiers sont-ils téléchargés sur un serveur ?",
    id: "Apakah file saya diunggah ke server?",
    pt: "Meus arquivos são enviados para um servidor?",
    ru: "Загружаются ли мои файлы на сервер?",
    tr: "Dosyalarım bir sunucuya yükleniyor mu?",
    zh: "我的文件会上传到服务器吗？"
  },
  "No. All processing happens locally in your web browser. Your files never leave your device, ensuring total privacy.": {
    en: "No. All processing happens locally in your web browser. Your files never leave your device, ensuring total privacy.",
    ar: "لا. تتم جميع المعالجات محليًا في متصفح الويب الخاص بك. لا تغادر ملفاتك جهازك أبداً، مما يضمن الخصوصية التامة.",
    de: "Nein. Alle Verarbeitungen erfolgen lokal in Ihrem Browser. Ihre Dateien verlassen Ihr Gerät nie.",
    es: "No. Todo el procesamiento ocurre localmente en tu navegador. Tus archivos nunca salen de tu dispositivo.",
    fr: "Non. Tout le traitement se fait localement dans votre navigateur. Vos fichiers ne quittent jamais votre appareil.",
    id: "Tidak. Semua pemrosesan terjadi secara lokal di browser Anda. File Anda tidak pernah meninggalkan perangkat Anda.",
    pt: "Não. Todo o processamento ocorre localmente no seu navegador. Seus arquivos nunca saem do seu dispositivo.",
    ru: "Нет. Вся обработка происходит локально в вашем браузере. Ваши файлы никогда не покидают ваше устройство.",
    tr: "Hayır. Tüm işlemler yerel olarak tarayıcınızda gerçekleşir. Tam gizlilik sağlanır.",
    zh: "不会。所有处理都在您的浏览器本地完成。您的文件绝不会离开您的设备。"
  },
  "Is there a file size limit?": {
    en: "Is there a file size limit?",
    ar: "هل هناك حد لحجم الملف؟",
    de: "Gibt es eine Dateigrößenbeschränkung?",
    es: "¿Hay un límite de tamaño de archivo?",
    fr: "Y a-t-il une limite de taille de fichier ?",
    id: "Apakah ada batasan ukuran file?",
    pt: "Existe um limite de tamanho de arquivo?",
    ru: "Есть ли ограничение на размер файла?",
    tr: "Dosya boyutu sınırı var mı?",
    zh: "有文件大小限制吗？"
  },
  "Since processing happens in your browser, the limit depends on your device RAM, usually supporting files up to several hundred megabytes.": {
    en: "Since processing happens in your browser, the limit depends on your device RAM, usually supporting files up to several hundred megabytes.",
    ar: "نظرًا لأن المعالجة تتم في متصفحك، فإن الحد يعتمد على ذاكرة جهازك (RAM)، وعادة ما تدعم الملفات حتى عدة مئات من الميجابايت.",
    de: "Da die Verarbeitung in Ihrem Browser erfolgt, hängt das Limit vom Arbeitsspeicher Ihres Geräts ab.",
    es: "Dado que el procesamiento ocurre en tu navegador, el límite depende de la memoria RAM de tu dispositivo.",
    fr: "Puisque le traitement se fait dans votre navigateur, la limite dépend de la mémoire RAM de votre appareil.",
    id: "Karena pemrosesan terjadi di browser Anda, batasnya tergantung pada RAM perangkat Anda.",
    pt: "Como o processamento ocorre no seu navegador, o limite depende da RAM do seu dispositivo.",
    ru: "Поскольку обработка происходит в браузере, лимит зависит от ОЗУ вашего устройства.",
    tr: "İşlem tarayıcınızda gerçekleştiğinden, sınır cihazınızın RAM'ine bağlıdır.",
    zh: "由于在浏览器中处理，限制取决于您的设备内存，通常支持几百兆字节的文件。"
  },
  "Does this work on mobile devices?": {
    en: "Does this work on mobile devices?",
    ar: "هل يعمل هذا على الأجهزة المحمولة؟",
    de: "Funktioniert das auf Mobilgeräten?",
    es: "¿Funciona en dispositivos móviles?",
    fr: "Cela fonctionne-t-il sur les appareils mobiles ?",
    id: "Apakah ini bekerja di perangkat seluler?",
    pt: "Isso funciona em dispositivos móveis?",
    ru: "Работает ли это на мобильных устройствах?",
    tr: "Bu mobil cihazlarda çalışıyor mu?",
    zh: "这在移动设备上有用吗？"
  },
  "Yes! The tool works seamlessly on both desktop and mobile browsers.": {
    en: "Yes! The tool works seamlessly on both desktop and mobile browsers.",
    ar: "نعم! تعمل الأداة بسلاسة على متصفحات سطح المكتب والمحمول.",
    de: "Ja! Das Tool funktioniert nahtlos auf allen Desktop- und Mobil-Browsern.",
    es: "¡Sí! La herramienta funciona perfectamente en navegadores de escritorio y móviles.",
    fr: "Oui ! L'outil fonctionne parfaitement sur les navigateurs de bureau et mobiles.",
    id: "Ya! Alat ini bekerja dengan mulus di browser desktop dan seluler.",
    pt: "Sim! A ferramenta funciona perfeitamente em navegadores desktop e móveis.",
    ru: "Да! Инструмент отлично работает как в настольных, так и в мобильных браузерах.",
    tr: "Evet! Araç hem masaüstü hem de mobil tarayıcılarda sorunsuz çalışır.",
    zh: "是的！该工具在桌面和移动浏览器上都能无缝运行。"
  },
  "What browsers are supported?": {
    en: "What browsers are supported?",
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
  "We support all modern browsers including Chrome, Safari, Firefox, and Edge.": {
    en: "We support all modern browsers including Chrome, Safari, Firefox, and Edge.",
    ar: "ندعم جميع المتصفحات الحديثة بما في ذلك Chrome و Safari و Firefox و Edge.",
    de: "Wir unterstützen alle modernen Browser einschließlich Chrome, Safari, Firefox und Edge.",
    es: "Admitimos todos los navegadores modernos, incluidos Chrome, Safari, Firefox y Edge.",
    fr: "Nous prenons en charge tous les navigateurs modernes, notamment Chrome, Safari, Firefox et Edge.",
    id: "Kami mendukung semua browser modern termasuk Chrome, Safari, Firefox, dan Edge.",
    pt: "Suportamos todos os navegadores modernos, incluindo Chrome, Safari, Firefox e Edge.",
    ru: "Мы поддерживаем все современные браузеры, включая Chrome, Safari, Firefox и Edge.",
    tr: "Chrome, Safari, Firefox ve Edge dahil tüm modern tarayıcıları destekliyoruz.",
    zh: "我们支持所有现代浏览器，包括 Chrome、Safari、Firefox 和 Edge。"
  },
  // Privacy note
  "Your files are completely safe. All processing happens in your browser and files are never uploaded to any server.": {
    en: "Your files are completely safe. All processing happens in your browser and files are never uploaded to any server.",
    ar: "ملفاتك آمنة تمامًا. تتم جميع المعالجات في متصفحك ولا يتم تحميل الملفات أبداً إلى أي خادم.",
    de: "Ihre Dateien sind absolut sicher. Alle Verarbeitungen erfolgen in Ihrem Browser.",
    es: "Tus archivos están completamente seguros. Todo el procesamiento ocurre en tu navegador.",
    fr: "Vos fichiers sont totalement en sécurité. Tout le traitement se fait dans votre navigateur.",
    id: "File Anda benar-benar aman. Semua pemrosesan terjadi di browser Anda.",
    pt: "Seus arquivos estão completamente seguros. Todo o processamento ocorre no seu navegador.",
    ru: "Ваши файлы в полной безопасности. Вся обработка происходит в вашем браузере.",
    tr: "Dosyalarınız tamamen güvendedir. Tüm işlemler tarayıcınızda gerçekleşir.",
    zh: "您的文件绝对安全。所有处理都在您的浏览器中进行。"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [key, valMap] of Object.entries(translations)) {
    json.ToolContent[key] = valMap[lang] || valMap['en'];
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated ToolContent in ${lang}.json`);
});
