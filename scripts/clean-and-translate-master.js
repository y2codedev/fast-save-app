const fs = require('fs');
const path = require('path');

const messagesDir = 'messages';
const enPath = path.join(messagesDir, 'en.json');
const locales = ['ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

console.log('[Master Translation Cleaner] Loading master single source of truth (en.json)...');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 1. Clean ToolContent in en.json from code syntax fragments and artificial duplicates
if (en.ToolContent) {
  const cleanedToolContent = {};
  const validKeys = Object.keys(en.ToolContent).filter(key => {
    // Exclude code fragments, hex colors, JSX artifacts, and property name boundaries
    if (
      key.includes('=>') || key.includes('&&') || key.includes('||') || key.includes('<?') || key.includes('/>') ||
      key.includes('<motion.') || key.includes('useState') || key.includes('useEffect') || key.includes('.current') ||
      key.includes('.toString()') || key.includes('return ') || key.includes('import ') || key.includes('export ') ||
      key.includes('const ') || key.includes('let ') || key.includes('var ') || key.includes('function') ||
      key.startsWith('#') || key.startsWith('(') || key.startsWith(')') || key.startsWith('{') || key.startsWith('}') ||
      key.startsWith('/') || key.startsWith('$.') || key.includes('===') || key.includes('!== ') ||
      key.includes('type:') || key.includes('icon:') || key.includes('title: t(') || key.includes('>>>') ||
      /^[0-9#\s$\-_.+*\/|&<>{}=(),:;"'"'"']+$/.test(key) || key.includes('text-') || key.includes('bg-') ||
      key.includes('border-') || key.includes('flex ') || key.includes('grid ') || key.includes('max-w-') ||
      key.includes('\n') || key.length < 2 || /^[,\s]/.test(key)
    ) {
      return false;
    }
    // Exclude keys that have trailing question marks if they aren't grammatically questions
    if (key.endsWith('?') || key.endsWith('.?')) {
      const base = key.replace(/\.?\?$/, '').trim();
      if (!base.startsWith('How ') && !base.startsWith('What ') && !base.startsWith('Is ') && !base.startsWith('Are ') && !base.startsWith('Can ') && !base.startsWith('Does ') && !base.startsWith('Will ') && !base.startsWith('Why ') && !base.startsWith('Which ')) {
        // Drop artificial question mark duplicate if base exists or is a standard statement/feature
        return false;
      }
    }
    return true;
  });

  validKeys.sort().forEach(k => {
    cleanedToolContent[k] = en.ToolContent[k];
  });
  en.ToolContent = cleanedToolContent;
  fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
  console.log(`[Clean EN] Cleaned en.json ToolContent down to ${Object.keys(en.ToolContent).length} valid human UI strings.`);
}

// 2. Comprehensive Master Translation Dictionary across all 9 languages
const masterDictionary = {
  // Image Compressor Features & Descriptions
  "Adjustable Quality Slider": {
    ar: "شريط تمرير الجودة القابل للتعديل",
    de: "Einstellarer Qualitätsschieber",
    es: "Control deslizante de calidad ajustable",
    fr: "Curseur de qualité réglable",
    id: "Penggeser Kualitas yang Dapat Disesuaikan",
    pt: "Seletor de Qualidade Ajustável",
    ru: "Регулируемый ползунок качества",
    tr: "Ayarlanabilir Kalite Kaydırıcısı",
    zh: "可调质量滑块"
  },
  "Adjustable quality slider": {
    ar: "شريط تمرير الجودة القابل للتعديل",
    de: "Einstellarer Qualitätsschieber",
    es: "Control deslizante de calidad ajustable",
    fr: "Curseur de qualité réglable",
    id: "Penggeser kualitas yang dapat disesuaikan",
    pt: "Seletor de qualidade ajustável",
    ru: "Регулируемый ползунок качества",
    tr: "Ayarlanabilir kalite kaydırıcısı",
    zh: "可调质量滑块"
  },
  "Fine-tune compression level from 1-100% to balance size and quality.": {
    ar: "اضبط مستوى الضغط بدقة من 1% إلى 100% للموازنة بين حجم الملف والجودة.",
    de: "Passen Sie die Komprimierung von 1-100% an, um Größe und Qualität auszubalancieren.",
    es: "Ajusta el nivel de compresión del 1 al 100% para equilibrar tamaño y calidad.",
    fr: "Ajustez le niveau de compression de 1 à 100 % pour équilibrer taille et qualité.",
    id: "Sesuaikan tingkat kompresi dari 1-100% untuk menyeimbangkan ukuran dan kualitas.",
    pt: "Ajuste o nível de compressão de 1 a 100% para equilibrar tamanho e qualidade.",
    ru: "Настройте уровень сжатия от 1% до 100% для баланса размера и качества.",
    tr: "Boyut ve kaliteyi dengelemek için sıkıştırma seviyesini %1-100 arasında ince ayar yapın.",
    zh: "在 1-100% 之间微调压缩比，保持大小与质量的平衡。"
  },
  "Batch Processing": {
    ar: "المعالجة الجماعية",
    de: "Stapelverarbeitung",
    es: "Procesamiento por lotes",
    fr: "Traitement par lot",
    id: "Pemprosesan Massal",
    pt: "Processamento em Lote",
    ru: "Пакетная обработка",
    tr: "Toplu İşlem",
    zh: "批量处理"
  },
  "Compress multiple images simultaneously for maximum efficiency.": {
    ar: "اضغط عدة صور في وقت واحد لتحقيق أقصى قدر من الكفاءة والسرعة.",
    de: "Komprimieren Sie mehrere Bilder gleichzeitig für maximale Effizienz.",
    es: "Comprime varias imágenes simultáneamente para obtener la máxima eficiencia.",
    fr: "Compressez plusieurs images simultanément pour une efficacité maximale.",
    id: "Kompres beberapa gambar sekaligus untuk efisiensi maksimal.",
    pt: "Comprima várias imagens simultaneamente para máxima eficiência.",
    ru: "Сжимайте несколько изображений одновременно для максимальной эффективности.",
    tr: "Maksimum verimlilik için birden fazla resmi aynı anda sıkıştırın.",
    zh: "同时压缩多张图片，实现高效率与快运行。"
  },
  "Multiple Format Support": {
    ar: "دعم صيغ متعددة",
    de: "Unterstützung mehrerer Formate",
    es: "Soporte para múltiples formatos",
    fr: "Prise en charge de plusieurs formats",
    id: "Dukungan Multi-Format",
    pt: "Suporte a Múltiplos Formatos",
    ru: "Поддержка различных форматов",
    tr: "Çoklu Format Desteği",
    zh: "支持多种格式"
  },
  "Works with JPG, PNG, WebP, GIF, BMP, and TIFF.": {
    ar: "يدعم صيغ JPG و PNG و WebP و GIF و BMP و TIFF بكفاءة تامة.",
    de: "Funktioniert mit JPG, PNG, WebP, GIF, BMP und TIFF.",
    es: "Compatible con JPG, PNG, WebP, GIF, BMP y TIFF.",
    fr: "Fonctionne avec JPG, PNG, WebP, GIF, BMP et TIFF.",
    id: "Bekerja dengan format JPG, PNG, WebP, GIF, BMP, dan TIFF.",
    pt: "Compatível com JPG, PNG, WebP, GIF, BMP e TIFF.",
    ru: "Работает с форматами JPG, PNG, WebP, GIF, BMP и TIFF.",
    tr: "JPG, PNG, WebP, GIF, BMP ve TIFF formatlarıyla çalışır.",
    zh: "支持 JPG、PNG、WebP、GIF、BMP 和 TIFF 格式。"
  },
  "WebP Output": {
    ar: "التحويل إلى WebP",
    de: "WebP-Ausgabe",
    es: "Salida en WebP",
    fr: "Sortie WebP",
    id: "Output WebP",
    pt: "Saída WebP",
    ru: "Вывод в формате WebP",
    tr: "WebP Çıktısı",
    zh: "输出 WebP 格式"
  },
  "Convert to WebP for 25-35% better compression than JPG at same quality.": {
    ar: "حوله إلى صيغة WebP للحصول على ضغط أفضل بنسبة 25-35% مقارنة بـ JPG بنفس الجودة.",
    de: "Konvertieren Sie in WebP für 25–35 % bessere Komprimierung als JPG bei gleicher Qualität.",
    es: "Convierte a WebP para una compresión 25-35% mejor que JPG con la misma calidad.",
    fr: "Convertissez en WebP pour une compression 25 à 35 % meilleure que le JPG à qualité égale.",
    id: "Ubah ke WebP untuk kompresi 25-35% lebih baik dari JPG pada kualitas yang sama.",
    pt: "Converta para WebP com uma compressão 25-35% melhor que JPG na mesma qualidade.",
    ru: "Конвертируйте в WebP для сжатия на 25-35% лучше, чем JPG при том же качестве.",
    tr: "Aynı kalitede JPG'den %25-35 daha iyi sıkıştırma için WebP formatına dönüştürün.",
    zh: "转换为 WebP 格式，在相同视觉质量下比 JPG 再高出 25-35% 的压缩率。"
  },
  "Size Preview": {
    ar: "معاينة الحجم قبل التنزيل",
    de: "Größenvorschau",
    es: "Vista previa de tamaño",
    fr: "Aperçu de la taille",
    id: "Pratinjau Ukuran",
    pt: "Pré-visualização do Tamanho",
    ru: "Предпросмотр размера",
    tr: "Boyut Önizleme",
    zh: "对比大小预览"
  },
  "See original vs compressed size comparison before downloading.": {
    ar: "شاهد مقارنة واضحة بين الحجم الأصلي والحجم بعد الضغط قبل البدء بالتنزيل.",
    de: "Sehen Sie einen Vergleich der Original- und Komprimiertgröße vor dem Download.",
    es: "Consulta la comparación del tamaño original frente al comprimido antes de descargar.",
    fr: "Consultez la comparaison des tailles originale et compressée avant le téléchargement.",
    id: "Lihat perbandingan ukuran asli vs setelah dikompres sebelum mengunduh.",
    pt: "Veja a comparação do tamanho original vs comprimido antes de baixar.",
    ru: "Сравните размер исходного и сжатого файла перед скачиванием.",
    tr: "İndirmeden önce orijinal ve sıkıştırılmış dosya boyutu karşılaştırmasını görün.",
    zh: "在下载之前直观感受实际原件与压缩终案之间的体积差耗对照。"
  },
  "No Upload Required": {
    ar: "بدون تحميل للخوادم",
    de: "Kein Upload erforderlich",
    es: "Sin carga a servidores",
    fr: "Aucun téléversement requis",
    id: "Tanpa Unggah Server",
    pt: "Nenhum Upload Necessário",
    ru: "Загрузка на сервер не требуется",
    tr: "Sunucu Yüklemesi Gerekmez",
    zh: "无需上传至服务器"
  },
  "100% browser-based — images never leave your device.": {
    ar: "يعمل بنسبة 100% داخل المتصفح — صورك لا تغادر جهازك أبداً لضمان خصوصيتك.",
    de: "100 % im Browser – Ihre Bilder verlassen Ihr Gerät nie.",
    es: "100% en el navegador: tus imágenes nunca salen de tu dispositivo.",
    fr: "100 % dans le navigateur : vos images ne quittent jamais votre appareil.",
    id: "100% berjalan dalam browser — gambar Anda tidak pernah meninggalkan perangkat Anda.",
    pt: "100% direto no navegador — suas imagens nunca saem do seu dispositivo.",
    ru: "100% в браузере — ваши изображения никогда не покидают ваше устройство.",
    tr: "%100 tarayıcı tabanlı — resimleriniz asla cihazınızdan ayrılmaz.",
    zh: "100% 浏览器运行内核 —— 本地运作绝不出埠"
  },
  "100% browser-based — images never leave your device": {
    ar: "يعمل بنسبة 100% داخل المتصفح — صورك لا تغادر جهازك أبداً لضمان خصوصيتك",
    de: "100 % im Browser – Ihre Bilder verlassen Ihr Gerät nie",
    es: "100% en el navegador: tus imágenes nunca salen de tu dispositivo",
    fr: "100 % dans le navigateur : vos images ne quittent jamais votre appareil",
    id: "100% berjalan dalam browser — gambar Anda tidak pernah meninggalkan perangkat Anda",
    pt: "100% direto no navegador — suas imagens nunca saem do seu dispositivo",
    ru: "100% в браузере — ваши изображения никогда не покидают ваше устройство",
    tr: "%100 tarayıcı tabanlı — resimleriniz asla cihazınızdan ayrılmaz",
    zh: "100% 浏览器运行内核 —— 本地运作绝不出埠"
  },

  // How-To Steps for Image Compressor
  "Upload Images": {
    ar: "رفع الصور",
    de: "Bilder hochladen",
    es: "Cargar imágenes",
    fr: "Importer des images",
    id: "Unggah Gambar",
    pt: "Carregar Imagens",
    ru: "Загрузить изображения",
    tr: "Resimleri Yükle",
    zh: "上传图片"
  },
  "Click the upload area or drag and drop JPG, PNG, WebP, or other image files.": {
    ar: "انقر على مساحة الرفع أو اسحب وأفلت ملفات الصور بصيغ JPG أو PNG أو WebP أو غيرها.",
    de: "Klicken Sie auf den Upload-Bereich oder ziehen Sie JPG, PNG, WebP oder andere Bilddateien hinein.",
    es: "Haz clic en el área de carga o arrastra y suelta archivos JPG, PNG, WebP u otros formatos.",
    fr: "Cliquez sur la zone d'importation ou glissez-déposez des fichiers JPG, PNG, WebP ou autres.",
    id: "Klik area unggah atau seret dan lepas file gambar JPG, PNG, WebP, atau lainnya.",
    pt: "Clique na área de upload ou arraste e solte arquivos de imagem JPG, PNG, WebP ou outros.",
    ru: "Нажмите на область загрузки или перетащите файлы JPG, PNG, WebP или других форматов.",
    tr: "Yükleme alanına tıklayın veya JPG, PNG, WebP veya diğer resim dosyalarını sürükleyip bırakın.",
    zh: "点击输入窗口将准备施治的 JPG、PNG、WebP 或其他常用图像推入操作区域。"
  },
  "Set Quality Level": {
    ar: "تحديد مستوى الجودة",
    de: "Qualitätsstufe festlegen",
    es: "Establecer nivel de calidad",
    fr: "Définir le niveau de qualité",
    id: "Atur Tingkat Kualitas",
    pt: "Definir Nível de Qualidade",
    ru: "Установить уровень качества",
    tr: "Kalite Seviyesini Belirle",
    zh: "调整质量系数"
  },
  "Use the quality slider to choose your compression level. Lower values = smaller files, higher values = better quality.": {
    ar: "استخدم شريط الجودة لاختيار مستوى الضغط المناسب. قيم أقل = حجم ملف أصغر، قيم أعلى = جودة أعلى.",
    de: "Wählen Sie Ihre Qualitätsstufe. Niedrige Werte = kleinere Dateien, hohe Werte = bessere Qualität.",
    es: "Usa el deslizador de calidad para elegir el nivel de compresión. Valores Bajos = Archivo Pequeño, Altos = Mayor Calidad.",
    fr: "Utilisez le curseur pour choisir votre niveau. Valeurs basses = fichier léger, valeurs hautes = qualité maximale.",
    id: "Gunakan penggeser kualitas untuk memilih tingkat kompresi. Nilai rendah = file lebih kecil, nilai tinggi = kualitas lebih baik.",
    pt: "Use o seletor de qualidade para escolher sua compressão. Menor = arquivo leve, maior = melhor qualidade.",
    ru: "Используйте ползунок качества для выбора уровня сжатия. Меньшее значение = меньший файл, большее = высокое качество.",
    tr: "Sıkıştırma seviyenizi seçmek için kalite kaydırıcısını kullanın. Düşük değerler = küçük dosya, yüksek değerler = iyi kalite.",
    zh: "向两侧拖曳拉动调幅尺筛选质量。数值越低 = 体积减耗显著；数值走高 = 画面高度还原。"
  },
  "Compress": {
    ar: "ضغط",
    de: "Komprimieren",
    es: "Comprimir",
    fr: "Compresser",
    id: "Kompres",
    pt: "Comprimir",
    ru: "Сжать",
    tr: "Sıkıştır",
    zh: "启动执行"
  },
  "Click \"Compress\" to process your images instantly in your browser.": {
    ar: "انقر فوق \"ضغط\" لمعالجة صورك وتقليل حجمها على الفور داخل متصفحك.",
    de: "Klicken Sie auf „Komprimieren“, um Ihre Bilder sofort direkt im Browser zu verarbeiten.",
    es: "Haz clic en \"Comprimir\" para procesar tus imágenes al instante en tu navegador.",
    fr: "Cliquez sur « Compresser » pour traiter vos images instantanément dans votre navigateur.",
    id: "Klik \"Kompres\" untuk memproses gambar Anda secara instan di browser Anda.",
    pt: "Clique em \"Comprimir\" para processar suas imagens instantaneamente no navegador.",
    ru: "Нажмите «Сжать» для мгновенной обработки изображений прямо в вашем браузере.",
    tr: "Resimlerinizi doğrudan tarayıcınızda anında işlemek için \"Sıkıştır\"a tıklayın.",
    zh: "单击【开启执行】后系统内建内核立即于安全受限空间施划降比提速流程。"
  },
  "Click 'Compress' to process your images instantly in your browser.": {
    ar: "انقر فوق 'ضغط' لمعالجة صورك وتقليل حجمها على الفور داخل متصفحك.",
    de: "Klicken Sie auf 'Komprimieren', um Ihre Bilder sofort direkt im Browser zu verarbeiten.",
    es: "Haz clic en 'Comprimir' para procesar tus imágenes al instante en tu navegador.",
    fr: "Cliquez sur 'Compresser' pour traiter vos images instantanément dans votre navigateur.",
    id: "Klik 'Kompres' untuk memproses gambar Anda secara instan di browser Anda.",
    pt: "Clique em 'Comprimir' para processar suas imagens instantaneamente no navegador.",
    ru: "Нажмите 'Сжать' для мгновенной обработки изображений прямо в вашем браузере.",
    tr: "Resimlerinizi doğrudan tarayıcınızda anında işlemek için 'Sıkıştır'a tıklayın.",
    zh: "单击【开启执行】后系统内建内核立即于安全受限空间施划降比提速流程。"
  },
  "Download": {
    ar: "تنزيل",
    de: "Herunterladen",
    es: "Descargar",
    fr: "Télécharger",
    id: "Unduh",
    pt: "Baixar",
    ru: "Скачать",
    tr: "İndir",
    zh: "保存下存"
  },
  "Download your compressed images individually or as a ZIP archive.": {
    ar: "قم بتنزيل صورك المضغوطة بشكل فردي أو مجتمعة داخل ملف أرشيف ZIP.",
    de: "Laden Sie Ihre komprimierten Bilder einzeln oder gesammelt als ZIP-Archiv herunter.",
    es: "Descarga tus imágenes comprimidas individualmente o juntas en un archivo ZIP.",
    fr: "Téléchargez vos images compressées individuellement ou en un seul fichier ZIP.",
    id: "Unduh gambar yang dikompresi secara individual atau sebagai arsip ZIP sekaligus.",
    pt: "Baixe suas imagens comprimidas individualmente ou como um arquivo ZIP.",
    ru: "Скачивайте сжатые изображения по отдельности или единым архивом ZIP.",
    tr: "Sıkıştırılmış resimlerinizi ayrı ayrı veya tek bir ZIP arşivi olarak indirin.",
    zh: "按单幅或打包装箱整组提取落地至主目录完成所有流式步骤。"
  },

  // Image Compressor FAQs
  "How much can I compress an image without losing quality?": {
    ar: "ما مقدار الضغط الذي يمكنني تحقيقه دون فقدان ملحوظ في الجودة؟",
    de: "Wie stark kann ich ein Bild komprimieren ohne Qualitätsverlust?",
    es: "¿Cuánto puedo comprimir una imagen sin perder calidad visible?",
    fr: "Dans quelle mesure puis-je compresser une image sans perdre en qualité ?",
    id: "Seberapa besar saya dapat mengompres gambar tanpa kehilangan kualitas?",
    pt: "O quanto posso comprimir uma imagem sem perder qualidade?",
    ru: "Насколько можно сжать изображение без заметной потери качества?",
    tr: "Bir resmi kalite kaybı yaşamadan ne kadar sıkıştırabilirim?",
    zh: "想要画质维持通透平稳最大程度支持多大幅缩降比？"
  },
  "Typically 60-80% file size reduction is achievable with minimal perceptible quality loss. At 75-80% quality, most images look identical to the original to the human eye.": {
    ar: "يمكن عادة تقليل حجم الملف بنسبة 60-80% دون أي اختلاف بصري ملحوظ للعين البشرية عند اختيار جودة 75-80%.",
    de: "In der Regel sind 60-80% Größenreduktion ohne merklichen Qualitätsverlust möglich. Bei 75-80% sehen die meisten Bilder identisch zum Original aus.",
    es: "Por lo general, es posible reducir el tamaño del 60-80% sin pérdida perceptible. Con una calidad del 75-80%, las imágenes lucen idénticas al original.",
    fr: "Une réduction de 60 à 80 % est généralement accessible sans baisse perceptible. À 75-80 % de qualité, l'œil humain ne fait pas la différence.",
    id: "Biasanya pengurangan ukuran file 60-80% dapat dicapai tanpa kehilangan kualitas yang terlihat mata secara langsung pada pengaturan 75-80%.",
    pt: "Normalmente, uma redução de 60 a 80% no tamanho é possível sem perda perceptível na qualidade em 75-80%.",
    ru: "Обычно удается сократить размер на 60-80% без заметного глазу снижения качества при выборе настроек 75-80%.",
    tr: "Genellikle gözle görülür bir kalite kaybı olmadan %60-80 boyut küçülmesi mümkündür. %75-80 kalitede resimler orijinaliyle aynı görünür.",
    zh: "推荐调节为 75% - 80% 区间，该比例即拥有肉眼无法甄别真毫的精湛成效并同步压裁省耗超过六成至八成超然功效。"
  },
  "Which image formats does the compressor support?": {
    ar: "ما هي صيغ الصور التي يدعمها هذا الضاغط؟",
    de: "Welche Bildformate werden vom Kompressor unterstützt?",
    es: "¿Qué formatos de imagen son compatibles con el compresor?",
    fr: "Quels formats d'image le compresseur prend-il en charge ?",
    id: "Format gambar apa saja yang didukung oleh kompresor?",
    pt: "Quais formatos de imagem o compressor suporta?",
    ru: "Какие форматы изображений поддерживает этот компрессор?",
    tr: "Sıkıştırıcı hangi resim formatlarını destekliyor?",
    zh: "这组减负引擎兼容哪种影像规范或扩展类型？"
  },
  "The compressor supports JPG, JPEG, PNG, WebP, GIF, BMP, and TIFF formats. Output format options depend on the input type.": {
    ar: "يدعم الضاغط صيغ JPG و JPEG و PNG و WebP و GIF و BMP و TIFF بكفاءة عالية.",
    de: "Der Kompressor unterstützt die Formate JPG, JPEG, PNG, WebP, GIF, BMP und TIFF.",
    es: "El compresor es compatible con los formatos JPG, JPEG, PNG, WebP, GIF, BMP y TIFF.",
    fr: "Le compresseur prend en charge les formats JPG, JPEG, PNG, WebP, GIF, BMP et TIFF.",
    id: "Kompresor ini mendukung format JPG, JPEG, PNG, WebP, GIF, BMP, dan TIFF dengan sangat baik.",
    pt: "O compressor suporta os formatos JPG, JPEG, PNG, WebP, GIF, BMP e TIFF.",
    ru: "Компрессор поддерживает форматы JPG, JPEG, PNG, WebP, GIF, BMP и TIFF.",
    tr: "Sıkıştırıcı JPG, JPEG, PNG, WebP, GIF, BMP ve TIFF formatlarını destekler.",
    zh: "目前已经实现横扫通达 JPG, JPEG, PNG, WebP, GIF, BMP 以及 TIFF 各种形态的高质流转。"
  },
  "Are my images uploaded to a server?": {
    ar: "هل يتم تحميل صوري إلى أي خادم خارج جهازي؟",
    de: "Werden meine Bilder auf einen Server hochgeladen?",
    es: "¿Mis imágenes se suben a algún servidor externo?",
    fr: "Mes images sont-elles envoyées sur un serveur ?",
    id: "Apakah gambar saya diunggah ke server eksternal?",
    pt: "Minhas imagens são enviadas para algum servidor?",
    ru: "Загружаются ли мои изображения на удаленный сервер?",
    tr: "Resimlerim harici bir sunucuya yükleniyor mu?",
    zh: "处理中敏感资产档案会不会离域被转接至云远侧处理？"
  },
  "No. All compression happens locally in your browser using JavaScript and Canvas APIs. Your images never leave your device.": {
    ar: "لا أبداً. تتم كافة عمليات الضغط محلياً داخل متصفحك باستخدام JavaScript و Canvas APIs ولا تغادر صورك جهازك أبداً.",
    de: "Nein. Die gesamte Komprimierung erfolgt lokal im Browser über JavaScript und Canvas-APIs. Die Bilder verlassen Ihr Gerät nie.",
    es: "No. Toda la compresión ocurre localmente en tu navegador usando JavaScript y Canvas. Tus fotos nunca salen de tu dispositivo.",
    fr: "Non. Toute la compression est effectuée localement via JavaScript et les API Canvas. Vos images restent en permanence sur votre appareil.",
    id: "Tidak sama sekali. Semua proses kompresi terjadi secara lokal di browser Anda dengan teknologi JavaScript dan Canvas.",
    pt: "Não. Toda a compressão é processada localmente em seu navegador com APIs JavaScript e Canvas.",
    ru: "Нет. Сжатие полностью выполняется локально в вашем браузере через JavaScript и Canvas API. Изображения остаются на устройстве.",
    tr: "Hayır. Tüm sıkıştırma işlemi JavaScript ve Canvas API'leri kullanılarak tamamen yerel olarak tarayıcınızda gerçekleşir.",
    zh: "百分之百全隔离开源底模！基于现代标准 Canvas / JavaScript 构建的前沿零流量算法确保图件从起航直终局毫无寸去漏风。"
  },
  "Can I compress multiple images at once?": {
    ar: "هل يمكنني ضغط صور متعددة في الوقت ذاته؟",
    de: "Kann ich mehrere Bilder gleichzeitig komprimieren?",
    es: "¿Puedo comprimir múltiples imágenes en un solo lote?",
    fr: "Puis-je compresser plusieurs images en même temps ?",
    id: "Bisakah saya mengompres banyak gambar sekaligus?",
    pt: "Posso comprimir várias imagens de uma só vez?",
    ru: "Можно ли сжать несколько изображений одновременно?",
    tr: "Aynı anda birden fazla resmi sıkıştırabilir miyim?",
    zh: "是否支持一次推纳大批套卷海量处理？"
  },
  "Yes! Upload multiple images in batch. Each will be compressed with your selected quality settings and downloadable individually or as a ZIP.": {
    ar: "نعم! ارفع عدة صور دفعة واحدة، وسيتم ضغط كل منها بناءً على مستوى الجودة المختار مع إمكانية التنزيل الفردي أو في ملف ZIP.",
    de: "Ja! Laden Sie viele Bilder hoch. Jedes wird komprimiert und kann einzeln oder direkt als ZIP heruntergeladen werden.",
    es: "¡Sí! Sube varias imágenes en lote y se comprimirán según tus ajustes de calidad. Puedes descargarlas una a una o en un ZIP.",
    fr: "Oui ! Importez en lot : chacune sera compressée à la qualité sélectionnée et téléchargeable séparément ou au format ZIP.",
    id: "Ya! Unggah banyak gambar sekaligus secara massal. Semua akan dikompres dan dapat diunduh individually maupun dalam satu file ZIP.",
    pt: "Sim! Envie várias imagens em lote. Elas serão comprimidas e você pode baixar cada uma ou um arquivo ZIP completo.",
    ru: "Да! Загружайте изображения пачками. Каждое из них будет сжато и доступно для скачивания по отдельности или общим архивом ZIP.",
    tr: "Evet! Topluca çok sayıda resim yükleyin. Hepsi seçtiğiniz ayarla sıkıştırılacak ve tek tek veya bir ZIP arşivi olarak indirilebilecektir.",
    zh: "极效呼从！海容海吞并行排满后各自分组削减瘦腰；下载端兼带独立留分或者直接收敛至归真合本一指提卷 ZIP。"
  },

  // Common Navigation & Hub Strings Fixes
  "Image Tools": {
    ar: "أدوات الصور",
    de: "Bild-Tools",
    es: "Herramientas de imagen",
    fr: "Outils d'image",
    id: "Alat Gambar",
    pt: "Ferramentas de Imagem",
    ru: "Инструменты для изображений",
    tr: "Resim Araçları",
    zh: "图像工具"
  },
  "Video & Audio Tools": {
    ar: "أدوات الفيديو والصوت",
    de: "Video- & Audio-Tools",
    es: "Herramientas de vídeo y audio",
    fr: "Outils vidéo et audio",
    id: "Alat Video & Audio",
    pt: "Ferramentas de Vídeo e Áudio",
    ru: "Видео и аудио инструменты",
    tr: "Video ve Ses Araçları",
    zh: "视听多媒体工具"
  },
  "Archive Tools": {
    ar: "أدوات الأرشيف والضغط",
    de: "Archiv-Tools",
    es: "Herramientas de archivo ZIP",
    fr: "Outils d'archivage",
    id: "Alat Arsip ZIP",
    pt: "Ferramentas de Arquivo ZIP",
    ru: "Инструменты архивации",
    tr: "Arşiv Araçları",
    zh: "压缩打包管理栏"
  },
  "PDF Tools": {
    ar: "أدوات PDF",
    de: "PDF-Tools",
    es: "Herramientas PDF",
    fr: "Outils PDF",
    id: "Alat PDF",
    pt: "Ferramentas PDF",
    ru: "Инструменты PDF",
    tr: "PDF Araçları",
    zh: "PDF 文书理工具"
  },
  "Download Images": {
    ar: "تنزيل الصور",
    de: "Bilder herunterladen",
    es: "Descargar imágenes",
    fr: "Télécharger les images",
    id: "Unduh Gambar",
    pt: "Baixar Imagens",
    ru: "Скачать изображения",
    tr: "Resimleri İndir",
    zh: "打包存留合图"
  },
  "Free Image Tools Online": {
    ar: "أدوات تحرير وصوت وصور عبر الإنترنت مجاناً",
    de: "Kostenlose Online-Bildtools",
    es: "Herramientas de imagen online gratuitas",
    fr: "Outils d'image en ligne gratuits",
    id: "Alat Gambar Online Gratis",
    pt: "Ferramentas de Imagem Online Grátis",
    ru: "Бесплатные онлайн инструменты для фото",
    tr: "Ücretsiz Çevrimiçi Resim Araçları",
    zh: "免费线上全功能超卓图形库"
  },
  "Image Compressor Tool": {
    ar: "أداة ضغط الصور",
    de: "Bildkompressor-Tool",
    es: "Herramienta de compresión de imagen",
    fr: "Outil de compression d'image",
    id: "Alat Kompresi Gambar",
    pt: "Ferramenta de Compressão de Imagem",
    ru: "Инструмент сжатия изображений",
    tr: "Resim Sıkıştırma Aracı",
    zh: "极精图卷体幅压缩模块"
  },
  "Image Converter Tool": {
    ar: "أداة تحويل الصور",
    de: "Bildkonverter-Tool",
    es: "Herramienta de conversión de imagen",
    fr: "Outil de conversion d'image",
    id: "Alat Konversi Gambar",
    pt: "Ferramenta de Conversão de Imagem",
    ru: "Конвертер изображений",
    tr: "Resim Dönüştürme Aracı",
    zh: "图片跨格式编译变轨枢纽"
  },

  // Converter UI Corrupted Strings Fixes
  "Convert Microsoft Word documents (.docx, .doc) into clean, responsive, and ready-to-publish HTML code instantly inside your browser.": {
    ar: "حول مستندات Microsoft Word (.docx, .doc) إلى كود HTML متجاوب ونظيف وجاهز للنشر على الفور داخل متصفحك.",
    de: "Konvertieren Sie Word-Dokumente (.docx, .doc) sofort im Browser in sauberen und veröffentlichungsbereiten HTML-Code.",
    es: "Convierte documentos Word (.docx, .doc) en código HTML limpio y receptivo listos para publicar directamente en tu navegador.",
    fr: "Convertissez des documents Microsoft Word (.docx, .doc) en code HTML clair et réactif dans votre navigateur.",
    id: "Ubah dokumen Microsoft Word (.docx, .doc) menjadi kode HTML responsif dan rapi langsung dalam browser Anda.",
    pt: "Converta documentos Word (.docx, .doc) em código HTML limpo e responsivo diretamente no seu navegador.",
    ru: "Мгновенно превращайте документы Microsoft Word (.docx, .doc) в чистый и готовый к публикации код HTML прямо в браузере.",
    tr: "Microsoft Word belgelerini (.docx, .doc) tarayıcınız içinde anında temiz, duyarlı ve yayınlanmaya hazır HTML koduna dönüştürün.",
    zh: "全浏览器自主驱动：无缝编译把微软文档（.docx/.doc）瞬时淬融成通体光润利在推传之优质网页语义代码结构。"
  },
  "Convert PDF documents into structured HTML webpages with distinct page formatting directly in your browser without uploading files.": {
    ar: "حول مستندات PDF إلى صفحات ويب HTML متقنة مباشرة داخل متصفحك دون الحاجة إلى رفع الملفات.",
    de: "Konvertieren Sie PDF-Dokumente direkt im Browser in strukturierte HTML-Webseiten, ohne Dateien hochzuladen.",
    es: "Convierte documentos PDF en páginas web HTML estructuradas directamente en el navegador sin subir archivos a servidores.",
    fr: "Convertissez des PDF en pages web HTML structurées directement dans le navigateur, sans téléverser vos documents.",
    id: "Ubah dokumen PDF menjadi halaman web HTML terstruktur secara lokal tanpa mengunggah file apa pun ke server.",
    pt: "Converta documentos PDF em páginas web HTML estruturadas no navegador, sem fazer upload para servidores.",
    ru: "Преобразуйте документы PDF в структурированные веб-страницы HTML прямо в браузере без загрузки файлов на сервер.",
    tr: "PDF belgelerini dosya yüklemesi yapmadan doğrudan tarayıcınızda biçim korumalı HTML web sayfalarına dönüştürün.",
    zh: "无远测信令涉入前提：直接深度破空拆解 PDF 重构为段分式明净页面 DOM 标签汇流无需登传一切文档材料。"
  },
  "Image size increased due to resizing or format changes": {
    ar: "ازداد حجم الصورة قليلاً بسبب تغيير الأبعاد أو اختيار صيغة ملف مختلفة",
    de: "Die Bildgröße hat sich aufgrund von Größenänderungen oder Formatwechseln leicht erhöht",
    es: "El tamaño aumentó debido al cambio de dimensiones o formato elegido",
    fr: "La taille de l'image a augmenté en raison des modifications de taille ou de format",
    id: "Ukuran gambar sedikit meningkat karena perubahan dimensi atau format file",
    pt: "O tamanho da imagem aumentou devido ao redimensionamento ou mudança de formato",
    ru: "Размер изображения увеличился из-за изменения размеров или смены формата",
    tr: "Boyut yeniden boyutlandırma veya format değişikliği nedeniyle biraz arttı",
    zh: "因重调比例分辨率调整与转承载规格差异，结余文件尺寸略微长升"
  },
  "After removal, use our Image Editor to place the subject on a new custom background.": {
    ar: "بعد إزالة الخلفية، استخدم محرر الصور الخاص بنا لوضع الصورة فوق خلفية مخصصة جديدة.",
    de: "Nutzen Sie nach dem Entfernen den Bildeditor, um das Motiv vor einen neuen Hintergrund zu setzen.",
    es: "Tras eliminar el fondo, utiliza nuestro Editor para colocar el sujeto sobre un nuevo fondo personalizado.",
    fr: "Après suppression, utilisez notre éditeur d'image pour placer le sujet sur un nouvel arrière-plan personnalisé.",
    id: "Setelah latar belakang dihapus, gunakan Editor Gambar kami untuk meletakkan subjek pada latar baru.",
    pt: "Após remover o fundo, use nosso Editor de Imagens para colocar o sujeito em um novo fundo exclusivo.",
    ru: "После удаления фона используйте наш фоторедактор, чтобы поместить объект на новый красивый фон.",
    tr: "Arka planı kaldırdıktan sonra objeyi yeni ve özel bir arka planın önüne yerleştirmek için Resim Düzenleyicimizi kullanın.",
    zh: "剥脱废冗底衬完毕即可携件滑入咱们美图台下轻松挑铺随心专属背景新舞台。"
  }
};

// 3. Grammar-Aware Archive Converter Sentence Engine
function applySentenceTemplate(text, lang) {
  const t = text.trim();
  
  // Pattern 1: Convert X to Y (e.g. "Convert 7Z to ZIP")
  const convertMatch = t.match(/^Convert\s+([A-Za-z0-9-]+)\s+to\s+([A-Za-z0-9-]+)$/i);
  if (convertMatch) {
    const f1 = convertMatch[1].toUpperCase();
    const f2 = convertMatch[2].toUpperCase();
    if (lang === 'ar') return `تحويل ${f1} إلى ${f2}`;
    if (lang === 'de') return `${f1} in ${f2} konvertieren`;
    if (lang === 'es') return `Convertir ${f1} a ${f2}`;
    if (lang === 'fr') return `Convertir ${f1} en ${f2}`;
    if (lang === 'id') return `Konversi ${f1} ke ${f2}`;
    if (lang === 'pt') return `Converter ${f1} para ${f2}`;
    if (lang === 'ru') return `Конвертировать ${f1} в ${f2}`;
    if (lang === 'tr') return `${f1}'i ${f2}'e Dönüştür`;
    if (lang === 'zh') return `${f1} 转 ${f2}`;
  }

  // Pattern 2: X to Y (e.g. "7z to zip" or "7z-to-zip")
  const toMatch = t.match(/^([A-Za-z0-9]+)[\s-]+to[\s-]+([A-Za-z0-9]+)$/i);
  if (toMatch) {
    const f1 = toMatch[1].toUpperCase();
    const f2 = toMatch[2].toUpperCase();
    if (lang === 'ar') return `تحويل ${f1} إلى ${f2}`;
    if (lang === 'de') return `${f1} in ${f2}`;
    if (lang === 'es') return `${f1} a ${f2}`;
    if (lang === 'fr') return `${f1} vers ${f2}`;
    if (lang === 'id') return `${f1} ke ${f2}`;
    if (lang === 'pt') return `${f1} para ${f2}`;
    if (lang === 'ru') return `${f1} в ${f2}`;
    if (lang === 'tr') return `${f1} - ${f2}`;
    if (lang === 'zh') return `${f1} 转 ${f2}`;
  }

  return null;
}

// 4. Sanitize and Process ALL locales
locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) return;
  const target = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updatedCount = 0;

  // Process every namespace in master en.json
  Object.keys(en).forEach(ns => {
    if (!target[ns] || typeof target[ns] !== 'object') target[ns] = {};
    const enNs = en[ns];

    if (typeof enNs === 'object' && !Array.isArray(enNs)) {
      Object.keys(enNs).forEach(key => {
        const enVal = enNs[key];
        let currentVal = target[ns][key];

        // 1. Check Master Dictionary
        if (masterDictionary[enVal] && masterDictionary[enVal][locale]) {
          if (currentVal !== masterDictionary[enVal][locale]) {
            target[ns][key] = masterDictionary[enVal][locale];
            updatedCount++;
            return;
          }
        }
        
        // Also check without trailing dot or question mark in master dictionary
        const noDot = enVal.replace(/[\.\?]$/, '').trim();
        if (masterDictionary[noDot] && masterDictionary[noDot][locale]) {
          if (currentVal !== masterDictionary[noDot][locale]) {
            target[ns][key] = masterDictionary[noDot][locale];
            updatedCount++;
            return;
          }
        }

        // 2. Check Sentence Templates
        const templateVal = applySentenceTemplate(enVal, locale);
        if (templateVal) {
          if (currentVal !== templateVal) {
            target[ns][key] = templateVal;
            updatedCount++;
            return;
          }
        }

        // 3. Detect and fix past regex corruption in Arabic / target language
        if (locale === 'ar' && typeof currentVal === 'string') {
          // If value has obvious English letters while enVal is a normal phrase not in exact literals
          const isKnownLiteral = /^(ConvertAllNow|Wasm|FFmpeg|JavaScript|HTML5|CSS3|Open Graph|Twitter|Facebook|LinkedIn|MP3, WAV|@ffmpeg)/i.test(enVal);
          const hasEnglishWords = /[a-zA-Z]{3,}/.test(currentVal.replace(/PDF|JPG|JPEG|PNG|GIF|BMP|TIFF|WebP|MP4|WebM|MOV|AVI|MKV|ZIP|ISO|TAR|GZ|BZ2|XZ|7z|AI|URL|RAM|CPU|SVG|FFmpeg|ConvertAllNow|Core Web Vitals|PWAs|HD|API|APIs|DOM/gi, ''));
          
          if (!isKnownLiteral && (hasEnglishWords || currentVal.includes('صورة Tools') || currentVal.includes('معالجةing') || currentVal.includes('تعديلor') || currentVal.includes('جودة Slider'))) {
            // Revert corrupted string to master English or template if available so it never shows gibberish
            if (masterDictionary[enVal] && masterDictionary[enVal].ar) {
              target[ns][key] = masterDictionary[enVal].ar;
            } else {
              // Clean fallback: keep English without mangling until translated, or clean standard words
              target[ns][key] = enVal;
            }
            updatedCount++;
          }
        }

        // Keep existing valid translation or default to master English if missing
        if (target[ns][key] === undefined) {
          target[ns][key] = enVal;
        }
      });
    } else {
      target[ns] = target[ns] !== undefined ? target[ns] : en[ns];
    }
  });

  // Re-sort alphabetically and drop obsolete garbage keys not present in clean en.json
  const sortedTarget = {};
  Object.keys(en).sort().forEach(ns => {
    if (typeof en[ns] === 'object' && en[ns] !== null && !Array.isArray(en[ns])) {
      sortedTarget[ns] = {};
      Object.keys(en[ns]).sort().forEach(key => {
        sortedTarget[ns][key] = target[ns][key];
      });
    } else {
      sortedTarget[ns] = target[ns];
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(sortedTarget, null, 2), 'utf8');
  console.log(`[Locale: ${locale}] Successfully synchronized and cleaned. Updated ${updatedCount} keys.`);
});

console.log('[Complete] All translation files cleansed and fully aligned.');
