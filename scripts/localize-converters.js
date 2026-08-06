import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const converterUI = {
  badgeBrowser: {
    en: "Browser-Based Document Converter",
    ar: "محول المستندات القائم على المتصفح",
    de: "Browser-basierter Dokumentenkonverter",
    es: "Convertidor de documentos basado en navegador",
    fr: "Convertisseur de documents dans le navigateur",
    id: "Pengubah Dokumen Berbasis Browser",
    pt: "Conversor de documentos baseado no navegador",
    ru: "Конвертер документов в браузере",
    tr: "Tarayıcı Tabanlı Belge Dönüştürücü",
    zh: "基于浏览器的文档转换器"
  },
  wordToPdfTitle: {
    en: "Word to PDF Converter",
    ar: "محول Word إلى PDF",
    de: "Word in PDF Konverter",
    es: "Convertidor de Word a PDF",
    fr: "Convertisseur Word en PDF",
    id: "Pengubah Word ke PDF",
    pt: "Conversor de Word para PDF",
    ru: "Конвертер Word в PDF",
    tr: "Word'den PDF'ye Dönüştürücü",
    zh: "Word 转 PDF 转换器"
  },
  wordToPdfSubtitle: {
    en: "Convert Microsoft Word documents (.docx) to professional PDF files instantaneously in your browser with zero data uploads.",
    ar: "تحويل مستندات Microsoft Word (.docx) إلى ملفات PDF احترافية فورًا في متصفحك دون تحميل البيانات.",
    de: "Konvertieren Sie Microsoft Word-Dokumente (.docx) sofort im Browser in professionelle PDF-Dateien ohne Daten-Uploads.",
    es: "Convierte documentos de Microsoft Word (.docx) a archivos PDF profesionales al instante en tu navegador sin subir datos.",
    fr: "Convertissez des documents Microsoft Word (.docx) en fichiers PDF professionnels instantanément dans votre navigateur sans téléversement de données.",
    id: "Ubah dokumen Microsoft Word (.docx) menjadi file PDF profesional secara instan di browser Anda tanpa mengunggah data.",
    pt: "Converta documentos do Microsoft Word (.docx) em arquivos PDF profissionais instantaneamente no seu navegador sem enviar dados.",
    ru: "Преобразуйте документы Microsoft Word (.docx) в профессиональные файлы PDF мгновенно в вашем браузере без загрузки данных.",
    tr: "Microsoft Word belgelerini (.docx) veri yüklemesi yapmadan tarayıcınızda anında profesyonel PDF dosyalarına dönüştürün.",
    zh: "在浏览器中将 Microsoft Word 文档 (.docx) 立即转换为专业的 PDF 文件，无需上传任何数据。"
  },
  stepUploadWord: {
    en: "Upload Word",
    ar: "رفع Word",
    de: "Word hochladen",
    es: "Subir Word",
    fr: "Téléverser Word",
    id: "Unggah Word",
    pt: "Enviar Word",
    ru: "Загрузить Word",
    tr: "Word Yükle",
    zh: "上传 Word"
  },
  stepConvert: {
    en: "Convert",
    ar: "تحويل",
    de: "Konvertieren",
    es: "Convertir",
    fr: "Convertir",
    id: "Ubah",
    pt: "Converter",
    ru: "Конвертировать",
    tr: "Dönüştür",
    zh: "转换"
  },
  stepDownloadPdf: {
    en: "Download PDF",
    ar: "تنزيل PDF",
    de: "PDF herunterladen",
    es: "Descargar PDF",
    fr: "Télécharger le PDF",
    id: "Unduh PDF",
    pt: "Baixar PDF",
    ru: "Скачать PDF",
    tr: "PDF İndir",
    zh: "下载 PDF"
  },
  stepUploadPdf: {
    en: "Upload PDF",
    ar: "رفع PDF",
    de: "PDF hochladen",
    es: "Subir PDF",
    fr: "Téléverser le PDF",
    id: "Unggah PDF",
    pt: "Enviar PDF",
    ru: "Загрузить PDF",
    tr: "PDF Yükle",
    zh: "上传 PDF"
  },
  stepDownloadWord: {
    en: "Download Word",
    ar: "تنزيل Word",
    de: "Word herunterladen",
    es: "Descargar Word",
    fr: "Télécharger Word",
    id: "Unduh Word",
    pt: "Baixar Word",
    ru: "Скачать Word",
    tr: "Word İndir",
    zh: "下载 Word"
  },
  uploadLabelWord: {
    en: "Upload Microsoft Word File (.docx or .doc)",
    ar: "رفع ملف Microsoft Word (.docx أو .doc)",
    de: "Microsoft Word-Datei hochladen (.docx oder .doc)",
    es: "Subir archivo de Microsoft Word (.docx o .doc)",
    fr: "Téléverser un fichier Microsoft Word (.docx ou .doc)",
    id: "Unggah File Microsoft Word (.docx atau .doc)",
    pt: "Enviar arquivo do Microsoft Word (.docx ou .doc)",
    ru: "Загрузить файл Microsoft Word (.docx или .doc)",
    tr: "Microsoft Word Dosyası Yükle (.docx veya .doc)",
    zh: "上传 Microsoft Word 文件 (.docx 或 .doc)"
  },
  uploadLabelPdf: {
    en: "Upload PDF Document (.pdf)",
    ar: "رفع مستند PDF (.pdf)",
    de: "PDF-Dokument hochladen (.pdf)",
    es: "Subir documento PDF (.pdf)",
    fr: "Téléverser un document PDF (.pdf)",
    id: "Unggah Dokumen PDF (.pdf)",
    pt: "Enviar documento PDF (.pdf)",
    ru: "Загрузить PDF-документ (.pdf)",
    tr: "PDF Belgesi Yükle (.pdf)",
    zh: "上传 PDF 文档 (.pdf)"
  },
  dragDropWord: {
    en: "Drag & drop your Word file or",
    ar: "اسحب وأفلت ملف Word الخاص بك أو",
    de: "Ziehen Sie Ihre Word-Datei hierher oder",
    es: "Arrastra y suelta tu archivo de Word o",
    fr: "Glissez-déposez votre fichier Word ou",
    id: "Seret & lepas file Word Anda atau",
    pt: "Arraste e solte seu arquivo Word ou",
    ru: "Перетащите файл Word или",
    tr: "Word dosyanızı sürükleyip bırakın veya",
    zh: "拖放您的 Word 文件或"
  },
  dragDropPdf: {
    en: "Drag & drop your PDF file or",
    ar: "اسحب وأفلت ملف PDF الخاص بك أو",
    de: "Ziehen Sie Ihre PDF-Datei hierher oder",
    es: "Arrastra y suelta tu archivo PDF o",
    fr: "Glissez-déposez votre fichier PDF ou",
    id: "Seret & lepas file PDF Anda atau",
    pt: "Arraste e solte seu arquivo PDF ou",
    ru: "Перетащите файл PDF или",
    tr: "PDF dosyanızı sürükleyip bırakın veya",
    zh: "拖放您的 PDF 文件或"
  },
  browse: {
    en: "browse",
    ar: "تصفح",
    de: "durchsuchen",
    es: "examinar",
    fr: "parcourir",
    id: "telusuri",
    pt: "procurar",
    ru: "обзор",
    tr: "göz at",
    zh: "浏览"
  },
  supportedDocxMax: {
    en: "Supported formats: DOCX & DOC (Max 30MB)",
    ar: "التنسيقات المدعومة: DOCX و DOC (بحد أقصى 30 ميجابايت)",
    de: "Unterstützte Formate: DOCX & DOC (Max. 30 MB)",
    es: "Formatos admitidos: DOCX y DOC (Máx. 30 MB)",
    fr: "Formats pris en charge : DOCX et DOC (Max 30 Mo)",
    id: "Format yang didukung: DOCX & DOC (Maks 30MB)",
    pt: "Formatos suportados: DOCX e DOC (Máx. 30 MB)",
    ru: "Поддерживаемые форматы: DOCX и DOC (макс. 30 МБ)",
    tr: "Desteklenen biçimler: DOCX ve DOC (Maks. 30 MB)",
    zh: "支持的格式：DOCX 和 DOC（最大 30MB）"
  },
  supportedPdfMax: {
    en: "Supported formats: PDF (Max 50MB)",
    ar: "التنسيقات المدعومة: PDF (بحد أقصى 50 ميجابايت)",
    de: "Unterstützte Formate: PDF (Max. 50 MB)",
    es: "Formatos admitidos: PDF (Máx. 50 MB)",
    fr: "Formats pris en charge : PDF (Max 50 Mo)",
    id: "Format yang didukung: PDF (Maks 50MB)",
    pt: "Formatos suportados: PDF (Máx. 50 MB)",
    ru: "Поддерживаемые форматы: PDF (макс. 50 МБ)",
    tr: "Desteklenen biçimler: PDF (Maks. 50 MB)",
    zh: "支持的格式：PDF（最大 50MB）"
  },
  clientSideNotice: {
    en: "⚡ 100% Client-Side & Private • No documents leave your computer",
    ar: "⚡ 100% محلي وخاص • لا تغادر أي مستندات جهازك",
    de: "⚡ 100% Client-Seitig & Privat • Keine Dokumente verlassen Ihren Computer",
    es: "⚡ 100% en el cliente y privado • Ningún documento sale de tu ordenador",
    fr: "⚡ 100% dans le navigateur et privé • Aucun document ne quitte votre ordinateur",
    id: "⚡ 100% Sisi Klien & Privat • Tidak ada dokumen yang meninggalkan komputer Anda",
    pt: "⚡ 100% no cliente e privado • Nenhum documento sai do seu computador",
    ru: "⚡ 100% локально и конфиденциально • Ни один документ не покидает ваш компьютер",
    tr: "⚡ %100 İstemci Tarafı ve Gizli • Hiçbir belge bilgisayarınızdan çıkmaz",
    zh: "⚡ 100% 客户端私密处理 • 没有任何文档离开您的电脑"
  },
  whyUseTitleWord: {
    en: "Why Use Browser Word ➡ PDF?",
    ar: "لماذا استخدام محول Word ⬅ PDF في المتصفح؟",
    de: "Warum Browser-Word ➡ PDF nutzen?",
    es: "¿Por qué usar Word ➡ PDF en el navegador?",
    fr: "Pourquoi utiliser Word ➡ PDF dans le navigateur ?",
    id: "Mengapa Menggunakan Word ➡ PDF Browser?",
    pt: "Por que usar Word ➡ PDF no navegador?",
    ru: "Зачем использовать Word ➡ PDF в браузере?",
    tr: "Neden Tarayıcıda Word ➡ PDF Kullanılmalı?",
    zh: "为什么使用浏览器端 Word ➡ PDF？"
  },
  whyUseTitlePdf: {
    en: "Why Use Browser PDF ➡ Word?",
    ar: "لماذا استخدام محول PDF ⬅ Word في المتصفح؟",
    de: "Warum Browser-PDF ➡ Word nutzen?",
    es: "¿Por qué usar PDF ➡ Word en el navegador?",
    fr: "Pourquoi utiliser PDF ➡ Word dans le navigateur ?",
    id: "Mengapa Menggunakan PDF ➡ Word Browser?",
    pt: "Por que usar PDF ➡ Word no navegador?",
    ru: "Зачем использовать PDF ➡ Word в браузере?",
    tr: "Neden Tarayıcıda PDF ➡ Word Kullanılmalı?",
    zh: "为什么使用浏览器端 PDF ➡ Word？"
  },
  localFormatting: {
    en: "Local Formatting",
    ar: "تنسيق محلي",
    de: "Lokale Formatierung",
    es: "Formato Local",
    fr: "Formatage Local",
    id: "Format Lokal",
    pt: "Formatação Local",
    ru: "Локальное форматирование",
    tr: "Yerel Biçimlendirme",
    zh: "本地格式化"
  },
  localFormattingDesc: {
    en: "Parses Word font styling and tables locally in Javascript",
    ar: "تحليل أنماط خطوط وجداول Word محليًا في Javascript",
    de: "Analysiert Word-Schriftarten und Tabellen lokal in Javascript",
    es: "Analiza estilos de fuentes y tablas de Word localmente en Javascript",
    fr: "Analyse les styles de polices et tableaux Word localement en Javascript",
    id: "Menganalisis gaya font dan tabel Word secara lokal di Javascript",
    pt: "Analisa estilos de fontes e tabelas do Word localmente em Javascript",
    ru: "Обрабатывает стили шрифтов и таблицы Word локально в Javascript",
    tr: "Word yazı tipi stillerini ve tablolarını Javascript'te yerel olarak işler",
    zh: "在 JavaScript 中本地解析 Word 字体样式和表格"
  },
  zeroCloudStorage: {
    en: "Zero Cloud Storage",
    ar: "بدون تخزين سحابي",
    de: "Kein Cloud-Speicher",
    es: "Cero Almacenamiento en la Nube",
    fr: "Zéro Stockage dans le Nuage",
    id: "Nol Penyimpanan Awan",
    pt: "Zero Armazenamento em Nuvem",
    ru: "Без облачного хранения",
    tr: "Sıfır Bulut Depolama",
    zh: "零云端存储"
  },
  zeroCloudStorageDesc: {
    en: "Confidential corporate contracts and letters stay on your machine",
    ar: "تبقى العقود والخطابات المؤسسية السرية على جهازك",
    de: "Vertrauliche Verträge und Briefe bleiben auf Ihrem Gerät",
    es: "Los contratos y cartas confidenciales permanecen en tu equipo",
    fr: "Les contrats et courriers confidentiels restent sur votre machine",
    id: "Kontrak dan surat perusahaan rahasia tetap berada di mesin Anda",
    pt: "Contratos e cartas confidenciais permanecem na sua máquina",
    ru: "Конфиденциальные корпоративные договоры и письма остаются на вашей машине",
    tr: "Gizli kurumsal sözleşmeler ve mektuplar cihazınızda kalır",
    zh: "保密的机密合同和信件始终留在您的机器上"
  },
  noServerDelays: {
    en: "No Server Delays",
    ar: "بدون تأخير الخادم",
    de: "Keine Serververzögerung",
    es: "Sin Retrasos en el Servidor",
    fr: "Aucun Retard de Serveur",
    id: "Tanpa Penundaan Server",
    pt: "Sem Atrasos no Servidor",
    ru: "Без задержек сервера",
    tr: "Sunucu Gecikmesi Yok",
    zh: "无服务器延迟"
  },
  noServerDelaysDesc: {
    en: "Converts instantaneously without uploading large doc files over internet",
    ar: "تحويل فوري دون تحميل ملفات المستندات الكبيرة عبر الإنترنت",
    de: "Konvertiert sofort, ohne große Dokumente über das Internet hochzuladen",
    es: "Convierte instantáneamente sin subir archivos grandes por internet",
    fr: "Convertit instantanément sans téléverser de gros fichiers sur Internet",
    id: "Mengonversi secara instan tanpa mengunggah file besar melalui internet",
    pt: "Converte instantaneamente sem enviar arquivos grandes pela internet",
    ru: "Преобразует мгновенно без загрузки больших файлов через интернет",
    tr: "Büyük belgeleri internete yüklemeden anında dönüştürür",
    zh: "无需在互联网上上传大型文档文件即可瞬间转换"
  },
  pdfReadyTitle: {
    en: "PDF Ready for Download!",
    ar: "ملف PDF جاهز للتنزيل!",
    de: "PDF bereit zum Download!",
    es: "¡PDF Listo para Descargar!",
    fr: "PDF Prêt à être Téléchargé !",
    id: "PDF Siap Diunduh!",
    pt: "PDF Pronto para Download!",
    ru: "PDF готов к скачиванию!",
    tr: "PDF İndirmeye Hazır!",
    zh: "PDF 已准备好下载！"
  },
  pdfReadyDesc: {
    en: "Your Word document has been compiled into a high-resolution PDF.",
    ar: "تم تجميع مستند Word الخاص بك في ملف PDF عالي الدقة.",
    de: "Ihr Word-Dokument wurde in ein hochauflösendes PDF kompiliert.",
    es: "Tu documento de Word se ha compilado en un PDF de alta resolución.",
    fr: "Votre document Word a été compilé en un PDF haute résolution.",
    id: "Dokumen Word Anda telah dikompilasi menjadi PDF resolusi tinggi.",
    pt: "Seu documento do Word foi compilado em um PDF de alta resolução.",
    ru: "Ваш документ Word скомпилирован в PDF высокого разрешения.",
    tr: "Word belgeniz yüksek çözünürlüklü bir PDF'ye dönüştürüldü.",
    zh: "您的 Word 文档已编译为高分辨率 PDF。"
  },
  pdfCompiledSuccess: {
    en: "PDF Compiled Successfully",
    ar: "تم تجميع PDF بنجاح",
    de: "PDF erfolgreich kompiliert",
    es: "PDF Compilado con Éxito",
    fr: "PDF Compilé avec Succès",
    id: "PDF Berhasil Dikompilasi",
    pt: "PDF Compilado com Sucesso",
    ru: "PDF успешно скомпилирован",
    tr: "PDF Başarıyla Derlendi",
    zh: "PDF 编译成功"
  },
  pdfCompiledSuccessDesc: {
    en: "Your layout, fonts, and styling have been formatted into an industry-standard PDF.",
    ar: "تم تنسيق تخطيطك وخطوطك وأنماطك في ملف PDF قياسي.",
    de: "Layout, Schriftarten und Stile wurden in ein Standard-PDF formatiert.",
    es: "Tu diseño, fuentes y estilos se han formateado en un PDF estándar.",
    fr: "Votre mise en page, polices et styles ont été formatés en un PDF standard.",
    id: "Tata letak, font, dan gaya Anda telah diformat menjadi PDF standar.",
    pt: "Seu layout, fontes e estilos foram formatados em um PDF padrão.",
    ru: "Ваш макет, шрифты и стили отформатированы в стандартный PDF.",
    tr: "Düzeniniz, yazı tipleriniz ve stilleriniz standart bir PDF'ye dönüştürüldü.",
    zh: "您的排版、字体和样式已格式化为标准 PDF。"
  },
  downloadPdfBtn: {
    en: "Download PDF",
    ar: "تنزيل PDF",
    de: "PDF herunterladen",
    es: "Descargar PDF",
    fr: "Télécharger le PDF",
    id: "Unduh PDF",
    pt: "Baixar PDF",
    ru: "Скачать PDF",
    tr: "PDF İndir",
    zh: "下载 PDF"
  },
  downloadWordBtn: {
    en: "Download Word",
    ar: "تنزيل Word",
    de: "Word herunterladen",
    es: "Descargar Word",
    fr: "Télécharger Word",
    id: "Unduh Word",
    pt: "Baixar Word",
    ru: "Скачать Word",
    tr: "Word İndir",
    zh: "下载 Word"
  },
  convertAnother: {
    en: "Convert Another",
    ar: "تحويل ملف آخر",
    de: "Weitere Datei konvertieren",
    es: "Convertir Otro",
    fr: "Convertir un autre",
    id: "Ubah Lainnya",
    pt: "Converter Outro",
    ru: "Конвертировать еще",
    tr: "Başka Birini Dönüştür",
    zh: "转换另一个"
  },
  convertingBtn: {
    en: "Converting...",
    ar: "جاري التحويل...",
    de: "Konvertierung...",
    es: "Convertida...",
    fr: "Conversion en cours...",
    id: "Mengonversi...",
    pt: "Convertendo...",
    ru: "Конвертация...",
    tr: "Dönüştürülüyor...",
    zh: "正在转换..."
  },
  convertWordToPdfBtn: {
    en: "Convert Word to PDF",
    ar: "تحويل Word إلى PDF",
    de: "Word in PDF umwandeln",
    es: "Convertir Word a PDF",
    fr: "Convertir Word en PDF",
    id: "Ubah Word ke PDF",
    pt: "Converter Word para PDF",
    ru: "Конвертировать Word в PDF",
    tr: "Word'ü PDF'ye Dönüştür",
    zh: "将 Word 转换为 PDF"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ConverterUI) json.ConverterUI = {};

  for (const [key, valMap] of Object.entries(converterUI)) {
    json.ConverterUI[key] = valMap[lang] || valMap['en'];
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated ConverterUI in ${lang}.json`);
});
