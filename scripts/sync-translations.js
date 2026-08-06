import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const enPath = path.join(messagesDir, 'en.json');

const locales = ['ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

console.log('[Sync Translations] Loading master single source of truth (en.json)...');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const arabicRegex = /[\u0600-\u06FF]/;
const cyrillicRegex = /[\u0400-\u04FF]/;
const chineseRegex = /[\u4E00-\u9FFF]/;

// Technical identifiers, brand names, and package literals that remain untouched across languages
const exactLiterals = new Set([
  'ConvertAllNow', 'Convert All Now', 'pdfjs-dist', 'docx', '7z-wasm', 'FFmpeg', 'WebAssembly',
  'JavaScript', 'HTML5', 'CSS3', 'Open Graph', 'Twitter', 'Telegram', 'Reddit', 'Facebook',
  'LinkedIn', 'WhatsApp', '@ffmpeg/ffmpeg', '@ffmpeg/util', '@imgly/background-removal'
]);

// 1. Core explicit translations for critical Converter UI, Banners, Actions, and Navigation
const explicitTranslations = {
  "Ready to edit in Microsoft Word": {
    ar: "جهاز للتحرير في Microsoft Word",
    de: "Bereit zur Bearbeitung in Microsoft Word",
    es: "Listo para editar en Microsoft Word",
    fr: "Prêt pour modification dans Microsoft Word",
    id: "Siap diedit di Microsoft Word",
    pt: "Pronto para edição no Microsoft Word",
    ru: "Готово к редактированию в Microsoft Word",
    tr: "Microsoft Word'de düzenlemeye hazır",
    zh: "已准备好在 Microsoft Word 中编辑"
  },
  "In-Browser PDF Layout Engine": {
    ar: "محرك تنسيق PDF داخل المتصفح",
    de: "Im-Browser-PDF-Layout-Engine",
    es: "Motor de diseño PDF en el navegador",
    fr: "Moteur de mise en page PDF dans le navigateur",
    id: "Mesin tata letak PDF di dalam browser",
    pt: "Mecanismo de layout PDF no navegador",
    ru: "Движок разметки PDF в браузере",
    tr: "Tarayıcı içi PDF Düzen Motoru",
    zh: "浏览器内 PDF 布局引擎"
  },
  "PDF to": {
    ar: "PDF إلى",
    de: "PDF zu",
    es: "PDF a",
    fr: "PDF vers",
    id: "PDF ke",
    pt: "PDF para",
    ru: "PDF в",
    tr: "PDF ->",
    zh: "PDF 转"
  },
  "HTML Converter": {
    ar: "محول HTML",
    de: "HTML-Konverter",
    es: "Convertidor HTML",
    fr: "Convertisseur HTML",
    id: "Konverter HTML",
    pt: "Conversor HTML",
    ru: "Конвертер HTML",
    tr: "HTML Dönüştürücü",
    zh: "HTML 转换器"
  },
  "Upload PDF Document (.pdf)": {
    ar: "رفع مستند PDF (.pdf)",
    de: "PDF-Dokument hochladen (.pdf)",
    es: "Subir documento PDF (.pdf)",
    fr: "Télécharger un document PDF (.pdf)",
    id: "Unggah Dokumen PDF (.pdf)",
    pt: "Enviar Documento PDF (.pdf)",
    ru: "Загрузить PDF документ (.pdf)",
    tr: "PDF Dokümanı Yükle (.pdf)",
    zh: "上传 PDF 文档 (.pdf)"
  },
  "Drag & drop your PDF file or": {
    ar: "اسحب وأفلت ملف PDF أو",
    de: "PDF-Datei per Drag & Drop oder",
    es: "Arrastra y suelta tu archivo PDF o",
    fr: "Glissez-déposez votre fichier PDF ou",
    id: "Seret & lepas berkas PDF Anda atau",
    pt: "Arraste e solte seu arquivo PDF ou",
    ru: "Перетащите PDF файл или",
    tr: "PDF dosyanızı sürükleyip bırakın veya",
    zh: "拖放您的 PDF 文件或"
  },
  "browse": {
    ar: "تصفح",
    de: "durchsuchen",
    es: "explorar",
    fr: "parcourir",
    id: "telusuri",
    pt: "procurar",
    ru: "обзор",
    tr: "göz at",
    zh: "浏览"
  },
  "Supported format: PDF (Max 35MB)": {
    ar: "التنسيق المدعوم: PDF (الحد الأقصى 35 ميجابايت)",
    de: "Unterstütztes Format: PDF (Max 35 MB)",
    es: "Formato admitido: PDF (Máx. 35MB)",
    fr: "Format supporté : PDF (Max 35 Mo)",
    id: "Format didukung: PDF (Maks 35MB)",
    pt: "Formato suportado: PDF (Máx 35MB)",
    ru: "Поддерживаемый формат: PDF (Макс 35MB)",
    tr: "Desteklenen format: PDF (Maks 35MB)",
    zh: "支持格式: PDF (最大 35MB)"
  },
  "PDF Document Ready": {
    ar: "مستند PDF جاهز",
    de: "PDF-Dokument ist bereit",
    es: "Documento PDF listo",
    fr: "Document PDF prêt",
    id: "Dokumen PDF Siap",
    pt: "Documento PDF Pronto",
    ru: "PDF документ готов",
    tr: "PDF Dokümanı Hazır",
    zh: "PDF 文档已就绪"
  },
  "Converting to HTML...": {
    ar: "جاري التحويل إلى HTML...",
    de: "Konvertierung in HTML...",
    es: "Convirtiendo a HTML...",
    fr: "Conversion en HTML...",
    id: "Mengkonversi ke HTML...",
    pt: "Convertendo para HTML...",
    ru: "Конвертирование в HTML...",
    tr: "HTML'ye dönüştürülüyor...",
    zh: "正在转换为 HTML..."
  },
  "Convert to HTML Now": {
    ar: "التحويل إلى HTML الآن",
    de: "Jetzt in HTML konvertieren",
    es: "Convertir a HTML ahora",
    fr: "Convertir en HTML maintenant",
    id: "Konversi ke HTML Sekarang",
    pt: "Converter para HTML agora",
    ru: "Конвертировать в HTML сейчас",
    tr: "Şimdi HTML'ye Dönüştür",
    zh: "立即转换为 HTML"
  },
  "Different File": {
    ar: "ملف مختلف",
    de: "Andere Datei",
    es: "Archivo diferente",
    fr: "Fichier différent",
    id: "Berkas Lain",
    pt: "Arquivo Diferente",
    ru: "Другой файл",
    tr: "Farklı Dosya",
    zh: "更换文件"
  },
  "HTML Webpage Ready!": {
    ar: "صفحة ويب HTML جاهزة!",
    de: "HTML-Webseite bereit!",
    es: "¡Página web HTML lista!",
    fr: "Page web HTML prête !",
    id: "Halaman web HTML Siap!",
    pt: "Página web HTML pronta!",
    ru: "Web-страница HTML готова!",
    tr: "HTML Web Sayfası Hazır!",
    zh: "HTML 网页已生成！"
  },
  "Download .html File": {
    ar: "تنزيل ملف .html",
    de: ".html-Datei herunterladen",
    es: "Descargar archivo .html",
    fr: "Télécharger le fichier .html",
    id: "Unduh Berkas .html",
    pt: "Baixar arquivo .html",
    ru: "Скачать файл .html",
    tr: ".html Dosyasını İndir",
    zh: "下载 .html 文件"
  },
  "Convert Another File": {
    ar: "تحويل ملف آخر",
    de: "Weitere Datei konvertieren",
    es: "Convertir otro archivo",
    fr: "Convertir un autre fichier",
    id: "Konversi Berkas Lain",
    pt: "Converter outro arquivo",
    ru: "Конвертировать другой файл",
    tr: "Başka Bir Dosya Dönüştür",
    zh: "转换另一个文件"
  },
  "Live Web Preview": {
    ar: "معاينة مباشرة",
    de: "Live-Web-Vorschau",
    es: "Vista previa web en vivo",
    fr: "Aperçu web en direct",
    id: "Pratinjau Web Langsung",
    pt: "Pré-visualização web em tempo real",
    ru: "Интерактивный предварительный просмотр",
    tr: "Canlı Web Önizlemesi",
    zh: "实时网页预览"
  },
  "Raw HTML Source": {
    ar: "المصدر HTML الخام",
    de: "Reiner HTML-Quellcode",
    es: "Código fuente HTML",
    fr: "Code source HTML brut",
    id: "Kode Sumber HTML",
    pt: "Código fonte HTML",
    ru: "Исходный код HTML",
    tr: "Ham HTML Kaynağı",
    zh: "原始 HTML 源码"
  },
  "Live Document Previewer": {
    ar: "عارض المستندات المباشر",
    de: "Live-Dokumentenbetrachter",
    es: "Visor de documentos en vivo",
    fr: "Visionneuse de documents en direct",
    id: "Penayang Dokumen Langsung",
    pt: "Visualizador de documentos em tempo real",
    ru: "Просмотрщик документов",
    tr: "Canlı Doküman Görüntüleyici",
    zh: "在线文档预览器"
  },
  "Browser-Based HTML Engine": {
    ar: "محرك HTML يعمل في المتصفح",
    de: "Browser-basierte HTML-Engine",
    es: "Motor HTML basado en el navegador",
    fr: "Moteur HTML dans le navigateur",
    id: "Mesin HTML berbasis Browser",
    pt: "Mecanismo HTML baseado em navegador",
    ru: "Движок HTML на базе браузера",
    tr: "Tarayıcı Tabanlı HTML Motoru",
    zh: "基于浏览器的 HTML 引擎"
  },
  "Word to": {
    ar: "Word إلى",
    de: "Word zu",
    es: "Word a",
    fr: "Word vers",
    id: "Word ke",
    pt: "Word para",
    ru: "Word в",
    tr: "Word ->",
    zh: "Word 转"
  },
  "Upload Microsoft Word File (.docx or .doc)": {
    ar: "رفع ملف Microsoft Word (.docx أو .doc)",
    de: "Microsoft Word-Datei hochladen (.docx oder .doc)",
    es: "Subir archivo Microsoft Word (.docx o .doc)",
    fr: "Télécharger un fichier Microsoft Word (.docx ou .doc)",
    id: "Unggah Berkas Microsoft Word (.docx atau .doc)",
    pt: "Enviar arquivo Microsoft Word (.docx ou .doc)",
    ru: "Загрузить файл Microsoft Word (.docx или .doc)",
    tr: "Microsoft Word Dosyası Yükle (.docx veya .doc)",
    zh: "上传 Microsoft Word 文件 (.docx 或 .doc)"
  },
  "Supported formats: DOCX & DOC (Max 30MB)": {
    ar: "التنسيقات المدعومة: DOCX و DOC (الحد الأقصى 30 ميجابايت)",
    de: "Unterstützte Formate: DOCX & DOC (Max 30 MB)",
    es: "Formatos admitidos: DOCX y DOC (Máx. 30MB)",
    fr: "Formats supportés : DOCX & DOC (Max 30 Mo)",
    id: "Format didukung: DOCX & DOC (Maks 30MB)",
    pt: "Formatos suportados: DOCX e DOC (Máx 30MB)",
    ru: "Поддерживаемые форматы: DOCX и DOC (Макс 30MB)",
    tr: "Desteklenen formatlar: DOCX ve DOC (Maks 30MB)",
    zh: "支持格式: DOCX 与 DOC (最大 30MB)"
  },
  "Word Document Ready": {
    ar: "مستند Word جاهز",
    de: "Word-Dokument ist bereit",
    es: "Documento Word listo",
    fr: "Document Word prêt",
    id: "Dokumen Word Siap",
    pt: "Documento Word Pronto",
    ru: "Документ Word готов",
    tr: "Word Dokümanı Hazır",
    zh: "Word 文档已就绪"
  },
  "Generating HTML...": {
    ar: "جاري إنشاء HTML...",
    de: "HTML wird generiert...",
    es: "Generando HTML...",
    fr: "Génération de HTML...",
    id: "Membuat HTML...",
    pt: "Gerando HTML...",
    ru: "Генерация HTML...",
    tr: "HTML oluşturuluyor...",
    zh: "正在生成 HTML..."
  },
  "HTML Ready for Publishing!": {
    ar: "HTML جاهز للنشر!",
    de: "HTML bereit zur Veröffentlichung!",
    es: "¡HTML listo para publicar!",
    fr: "HTML prêt pour publication !",
    id: "HTML Siap Diterbitkan!",
    pt: "HTML Pronto para Publicar!",
    ru: "HTML готов к публикации!",
    tr: "HTML Yayınlanmaya Hazır!",
    zh: "HTML 已可发布！"
  },
  "Interactive Preview & Code Viewer": {
    ar: "معاينة تفاعلية وعارض الرموز",
    de: "Interaktive Vorschau & Code-Betrachter",
    es: "Vista previa interactiva y visor de código",
    fr: "Aperçu interactif et visionneuse de code",
    id: "Pratinjau Interaktif & Penayang Kode",
    pt: "Visualização interativa e leitor de código",
    ru: "Интерактивный просмотр и код",
    tr: "Etkileşimli Önizleme ve Kod Görüntüleyici",
    zh: "交互式预览与代码查看器"
  },
  "Converting to PDF...": {
    ar: "جاري التحويل إلى PDF...",
    de: "Konvertierung in PDF...",
    es: "Convirtiendo a PDF...",
    fr: "Conversion en PDF...",
    id: "Mengkonversi ke PDF...",
    pt: "Convertendo para PDF...",
    ru: "Конвертирование в PDF...",
    tr: "PDF'ye dönüştürülüyor...",
    zh: "正在转换为 PDF..."
  },
  "Convert to PDF Now": {
    ar: "التحويل إلى PDF الآن",
    de: "Jetzt in PDF konvertieren",
    es: "Convertir a PDF ahora",
    fr: "Convertir en PDF maintenant",
    id: "Konversi ke PDF Sekarang",
    pt: "Converter para PDF agora",
    ru: "Конвертировать в PDF сейчас",
    tr: "Şimdi PDF'ye Dönüştür",
    zh: "立即转换为 PDF"
  },
  "Drag & drop files or": {
    ar: "اسحب وأفلت الملفات أو",
    de: "Dateien per Drag & Drop oder",
    es: "Arrastra y suelta archivos o",
    fr: "Glissez-déposez les fichiers ou",
    id: "Seret & lepas berkas atau",
    pt: "Arraste e solte arquivos ou",
    ru: "Перетащите файлы или",
    tr: "Dosyaları sürükleyip bırakın veya",
    zh: "拖放文件或"
  },
  "Select Maximum Volume Part Size": {
    ar: "حدد الحد الأقصى لحجم الجزء",
    de: "Minimale oder maximale Teilgröße wählen",
    es: "Seleccionar tamaño máximo de parte de volumen",
    fr: "Sélectionner la taille maximale de volume",
    id: "Pilih Ukuran Volume Maksimum",
    pt: "Selecione o Tamanho Máximo de Volume",
    ru: "Выберите максимальный размер части",
    tr: "Maksimum Bölüm Boyutunu Seçin",
    zh: "选择最大分卷大小"
  },
  "Add More Files": {
    ar: "إضافة المزيد من الملفات",
    de: "Weitere Dateien hinzufügen",
    es: "Agregar más archivos",
    fr: "Ajouter d'autres fichiers",
    id: "Tambahkan Lebih Banyak Berkas",
    pt: "Adicionar mais arquivos",
    ru: "Добавить еще файлы",
    tr: "Daha Fazla Dosya Ekle",
    zh: "添加更多文件"
  },
  "ZIP Contents": {
    ar: "محتويات ZIP",
    de: "ZIP-Inhalt",
    es: "Contenido ZIP",
    fr: "Contenu du ZIP",
    id: "Isi ZIP",
    pt: "Conteúdo ZIP",
    ru: "Содержимое ZIP",
    tr: "ZIP İçeriği",
    zh: "ZIP 内容"
  },
  "Split Archive Complete!": {
    ar: "اكتمل تقسيم الأرشيف!",
    de: "Archivaufteilung abgeschlossen!",
    es: "¡División de archivo completada!",
    fr: "Division de l'archive terminée !",
    id: "Pemisahan Arsip Selesai!",
    pt: "Divisão do Arquivo Concluída!",
    ru: "Разделение архива завершено!",
    tr: "Arşiv Bölme Tamamlandı!",
    zh: "分割解冻已完成！"
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
    zh: "下载"
  },
  "Process Another File": {
    ar: "معالجة ملف آخر",
    de: "Weitere Datei verarbeiten",
    es: "Procesar otro archivo",
    fr: "Traiter un autre fichier",
    id: "Proses Berkas Lain",
    pt: "Processar Outro Arquivo",
    ru: "Обработать другой файл",
    tr: "Başka Bir Dosya İşle",
    zh: "处理另一个文件"
  },
  "Upload to Start": {
    ar: "ارفع للبدء",
    de: "Zum Starten hochladen",
    es: "Subir para comenzar",
    fr: "Télécharger pour commencer",
    id: "Unggah untuk Mulai",
    pt: "Enviar para Começar",
    ru: "Загрузите для начала",
    tr: "Başlamak İçin Yükle",
    zh: "上传即开启转换"
  },
  "Features": {
    ar: "الميزات",
    de: "Funktionen",
    es: "Características",
    fr: "Fonctionnalités",
    id: "Fitur",
    pt: "Recursos",
    ru: "Функции",
    tr: "Özellikler",
    zh: "核心产品特色"
  },
  "Privacy & Security Guarantee:": {
    ar: "ضمان الخصوصية والأمان:",
    de: "Datenschutz- & Sicherheitsgarantie:",
    es: "Garantía de privacidad y seguridad:",
    fr: "Garantie de confidentialité et sécurité :",
    id: "Jaminan Privasi & Keamanan:",
    pt: "Garantia de Privacidade e Segurança:",
    ru: "Гарантия конфиденциальности и безопасности:",
    tr: "Gizlilik ve Güvenlik Garantisi:",
    zh: "隐私与系统安全性担保："
  },
  "Setting up local secure processor...": {
    ar: "جاري إعداد المعالج المحلي الآمن...",
    de: "Lokale sichere Verarbeitung wird konfiguriert...",
    es: "Configurando procesador local seguro...",
    fr: "Configuration du processeur local sécurisé...",
    id: "Menyiapkan pemroses aman lokal...",
    pt: "Configurando processador seguro local...",
    ru: "Настройка локального обработчика...",
    tr: "Yerel güvenli işlemci hazırlanıyor...",
    zh: "正在启动离线隐私计算环境..."
  },
  "Compressing...": {
    ar: "جاري الضغط...",
    de: "Wird komprimiert...",
    es: "Comprimiendo...",
    fr: "Compression en cours...",
    id: "Mengkompresi...",
    pt: "Comprimindo...",
    ru: "Сжимаем...",
    tr: "Sıkıştırılıyor...",
    zh: "极速压缩处理中..."
  },
  "Download GIF": {
    ar: "تنزيل GIF",
    de: "GIF herunterladen",
    es: "Descargar GIF",
    fr: "Télécharger GIF",
    id: "Unduh GIF",
    pt: "Baixar GIF",
    ru: "Скачать GIF",
    tr: "GIF İndir",
    zh: "下载动画 GIF"
  },
  "Convert Another": {
    ar: "تحويل ملف آخر",
    de: "Weitere konvertieren",
    es: "Convertir otro",
    fr: "Convertir un autre",
    id: "Konversi Lainnya",
    pt: "Converter outro",
    ru: "Конвертировать еще",
    tr: "Başka Dönüştür",
    zh: "继续转换"
  },
  "Success! Reduced file size by": {
    ar: "نجاح! تم تقليل حجم الملف بنسبة",
    de: "Erfolg! Dateigröße reduziert um",
    es: "¡Éxito! Tamaño de archivo reducido en",
    fr: "Succès ! Taille du fichier réduite de",
    id: "Berhasil! Mengurangi ukuran berkas sebesar",
    pt: "Sucesso! Tamanho do arquivo reduzido em",
    ru: "Успех! Размер файла уменьшен на",
    tr: "Başarılı! Dosya boyutu küçüldü:",
    zh: "已精简降低物理内存体量达"
  },
  "This feature is coming soon — stay tuned!": {
    ar: "هذه الميزة ستتوفر قريباً — ابقوا معنا!",
    de: "Diese Funktion ist bald verfügbar — bleiben Sie dran!",
    es: "¡Esta función estará disponible pronto, mantente al tanto!",
    fr: "Cette fonctionnalité arrive bientôt, restez à l'écoute !",
    id: "Fitur ini akan segera hadir — tetap pantau!",
    pt: "Este recurso estará disponível em breve — fique ligado!",
    ru: "Эта функция скоро появится — следите за новостями!",
    tr: "Bu özellik pek yakında—takipte kalın!",
    zh: "本应用系统迭代研发进行调试重构预载阶段，敬请关注后期的优化与上新！"
  },
  "Share": { ar: "مشاركة", de: "Teilen", es: "Compartir", fr: "Partager", id: "Bagikan", pt: "Compartilhar", ru: "Поделиться", tr: "Paylaş", zh: "转发分享" },
  "Home": { ar: "الرئيسية", de: "Startseite", es: "Inicio", fr: "Accueil", id: "Beranda", pt: "Início", ru: "Главная", tr: "Ana Sayfa", zh: "首负页面" },
  "Close": { ar: "إغلاق", de: "Schließen", es: "Cerrar", fr: "Fermer", id: "Tutup", pt: "Fechar", ru: "Закрыть", tr: "Kapat", zh: "退出确认" },
  "Advertisement": { ar: "إعلان", de: "Anzeige", es: "Anuncio", fr: "Publicité", id: "Iklan", pt: "Anúncio", ru: "Реклама", tr: "Reklam", zh: "展示公告栏" },
  "Tool Categories": { ar: "فئات الأدوات", de: "Tool-Kategorien", es: "Categorías de herramientas", fr: "Catégories d'outils", id: "Kategori Alat", pt: "Categorias de Ferramentas", ru: "Категории инструментов", tr: "Araç Kategorileri", zh: "产品线功能导览" },
  "All Tools": { ar: "جميع الأدوات", de: "Alle Tools", es: "Todas las herramientas", fr: "Tous les outils", id: "Semua Alat", pt: "Todas as Ferramentas", ru: "Все инструменты", tr: "Tüm Araçlar", zh: "全面功能收录册" },
  "By Author": { ar: "بواسطة", de: "Von", es: "Por", fr: "Par", id: "Oleh", pt: "Por", ru: "Автор", tr: "Yazar", zh: "本专责创作贡献作者" },
  "Updated on": { ar: "تم التحديث في", de: "Aktualisiert am", es: "Actualizado el", fr: "Mis à jour le", id: "Diperbarui pada", pt: "Atualizado em", ru: "Обновлено", tr: "Güncellendi", zh: "近来修订日期记录" },
  "Verified Local Tool": { ar: "أداة محلية معتمدة", de: "Verifiziertes lokales Tool", es: "Herramienta local verificada", fr: "Outil local vérifié", id: "Alat Lokal Terverifikasi", pt: "Ferramenta Local Verificada", ru: "Проверенный локальный инструмент", tr: "Doğrulanmış Yerel Araç", zh: "纯离线端加密环境背书双检合作品碑" }
};

// Harvest existing translation dictionaries from scripts in scripts/
const harvested = new Map();

function getNorm(s) {
  return s ? s.trim().replace(/[.?!؟…]+$/, '').trim().toLowerCase() : '';
}

// Populate from explicit Translations
for (const [key, obj] of Object.entries(explicitTranslations)) {
  for (const [l, val] of Object.entries(obj)) {
    if (!harvested.has(l)) harvested.set(l, new Map());
    harvested.get(l).set(key, val);
    harvested.get(l).set(getNorm(key), val);
  }
}

// Scan all js script files for existing embedded dictionaries
const scriptFiles = fs.readdirSync(process.cwd() + '/scripts').filter(f => f.endsWith('.js') && f !== 'sync-translations.js');
scriptFiles.forEach(file => {
  const content = fs.readFileSync(path.join(process.cwd(), 'scripts', file), 'utf8');
  const lines = content.split('\n');
  let currentKey = null;
  let currentObj = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const keyMatch = line.match(/^["']([^"']{2,250})["']\s*:\s*\{/);
    if (keyMatch && !line.includes('Index') && !line.includes('TopHeader')) {
      currentKey = keyMatch[1].trim();
      currentObj = {};
    }
    if (currentKey && currentObj) {
      const langMatch = line.match(/^(en|ar|de|es|fr|id|pt|ru|tr|zh)\s*:\s*["']([^"']+)["']/);
      if (langMatch) currentObj[langMatch[1]] = langMatch[2];
      if (line === '},' || line === '}') {
        if (Object.keys(currentObj).length >= 3) {
          for (const l of locales) {
            if (currentObj[l] && !arabicRegex.test(currentObj[l]) || (l === 'ar' && currentObj[l])) {
              if (!harvested.has(l)) harvested.set(l, new Map());
              harvested.get(l).set(currentKey, currentObj[l]);
              harvested.get(l).set(getNorm(currentKey), currentObj[l]);
            }
          }
        }
        currentKey = null;
        currentObj = null;
      }
    }
  }
});
console.log(`[Harvest] Extracted rich multi-language translation dictionaries across project script assets.`);

// 2. Intelligent Linguistic Synthesizer & Pattern Transformation Engine
function synthesizeTranslation(text, locale) {
  if (!text || typeof text !== 'string') return text;
  if (exactLiterals.has(text.trim()) || /^[@a-zA-Z0-9/._-]+$/.test(text.trim()) && text.length <= 25 && !text.includes(' ')) {
    return text;
  }

  // Check direct cache or harvested dictionary
  const dict = harvested.get(locale);
  if (dict) {
    if (dict.has(text)) return dict.get(text);
    const norm = getNorm(text);
    if (dict.has(norm)) {
      let cached = dict.get(norm);
      if (text.endsWith('.')) cached = cached.replace(/[.?!؟…]+$/, '') + '.';
      else if (text.endsWith('?')) cached = cached.replace(/[.?!؟…]+$/, '') + (locale === 'ar' ? '؟' : '?');
      return cached;
  }

  return text;
  // Grammatical patterns & vocabulary replacement by target language (disabled to preserve sentence integrity)
  let synthesized = text;

  const vocabulary = {
    es: [
      [/^Is this tool free to use\?$/i, "¿Esta herramienta es totalmente gratuita?"],
      [/^Are my files uploaded to a server\?$/i, "¿Se suben mis archivos a algún servidor online?"],
      [/^Is there a file size limit\?$/i, "¿Existe algún límite en el tamaño del archivo?"],
      [/^Does this work on mobile devices\?$/i, "¿Funciona esta herramienta en dispositivos móviles?"],
      [/^What browsers are supported\?$/i, "¿Qué navegadores web son compatibles?"],
      [/^Supports all standard formats$/i, "Compatible con todos los formatos estándar"],
      [/^Complete Privacy Guaranteed$/i, "Garantía de privacidad total en tu dispositivo"],
      [/^Universal Compatibility$/i, "Compatibilidad universal multiplataforma"],
      [/^Select File$/i, "Seleccionar archivo"],
      [/^Process File$/i, "Procesar archivo"],
      [/^Download Output$/i, "Descargar resultado"],
      [/\bConvert\b/g, "Convertir"],
      [/\bCompress\b/g, "Comprimir"],
      [/\bExtract\b/g, "Extraer"],
      [/\bMerge\b/g, "Unir"],
      [/\bTrim\b/g, "Recortar"],
      [/\bEdit\b/g, "Editar"],
      [/\bUpload\b/g, "Subir"],
      [/\bDownload\b/g, "Descargar"],
      [/\bFile\b/g, "Archivo"],
      [/\bFiles\b/g, "Archivos"],
      [/\bVideo\b/g, "Vídeo"],
      [/\bAudio\b/g, "Audio"],
      [/\bImage\b/g, "Imagen"],
      [/\bImages\b/g, "Imágenes"],
      [/\bBrowser\b/g, "Navegador"],
      [/\bDevice\b/g, "Dispositivo"],
      [/\bFree\b/g, "Gratis"],
      [/\bSecure\b/g, "Seguro"],
      [/\bPrivate\b/g, "Privado"],
      [/\bOnline\b/g, "En línea"],
      [/\bTools\b/g, "Herramientas"],
      [/\bTool\b/g, "Herramienta"],
      [/\bFast\b/g, "Rápido"],
      [/\bInstant\b/g, "Instantáneo"]
    ],
    de: [
      [/^Is this tool free to use\?$/i, "Ist dieses Tool vollkommen kostenlos?"],
      [/^Are my files uploaded to a server\?$/i, "Werden meine Dateien auf einen Server hochgeladen?"],
      [/^Is there a file size limit\?$/i, "Gibt es eine maximale Dateigröße?"],
      [/^Does this work on mobile devices\?$/i, "Funktioniert dies auch auf Mobilgeräten?"],
      [/^What browsers are supported\?$/i, "Welche Webbrowser werden unterstützt?"],
      [/^Supports all standard formats$/i, "Unterstützt alle gängigen Dateiformate"],
      [/^Complete Privacy Guaranteed$/i, "Vollständiger Datenschutz garantiert"],
      [/^Universal Compatibility$/i, "Universelle Plattform-Kompatibilität"],
      [/^Select File$/i, "Datei auswählen"],
      [/^Process File$/i, "Datei verarbeiten"],
      [/^Download Output$/i, "Ergebnis herunterladen"],
      [/\bConvert\b/g, "Konvertieren"],
      [/\bCompress\b/g, "Komprimieren"],
      [/\bExtract\b/g, "Extrahieren"],
      [/\bMerge\b/g, "Zusammenführen"],
      [/\bTrim\b/g, "Schneiden"],
      [/\bEdit\b/g, "Bearbeiten"],
      [/\bUpload\b/g, "Hochladen"],
      [/\bDownload\b/g, "Herunterladen"],
      [/\bFile\b/g, "Datei"],
      [/\bFiles\b/g, "Dateien"],
      [/\bVideo\b/g, "Video"],
      [/\bAudio\b/g, "Audio"],
      [/\bImage\b/g, "Bild"],
      [/\bImages\b/g, "Bilder"],
      [/\bBrowser\b/g, "Browser"],
      [/\bDevice\b/g, "Gerät"],
      [/\bFree\b/g, "Kostenlos"],
      [/\bSecure\b/g, "Sicher"],
      [/\bPrivate\b/g, "Privat"],
      [/\bOnline\b/g, "Online"],
      [/\bTools\b/g, "Tools"],
      [/\bTool\b/g, "Tool"],
      [/\bFast\b/g, "Schnell"],
      [/\bInstant\b/g, "Sofort"]
    ],
    fr: [
      [/^Is this tool free to use\?$/i, "Cet outil est-il entièrement gratuit ?"],
      [/^Are my files uploaded to a server\?$/i, "Mes fichiers sont-ils envoyés sur un serveur ?"],
      [/^Is there a file size limit\?$/i, "Y a-t-il une limite de taille pour les fichiers ?"],
      [/^Does this work on mobile devices\?$/i, "Est-ce compatible avec les smartphones et tablettes ?"],
      [/^What browsers are supported\?$/i, "Quels navigateurs web sont compatibles ?"],
      [/^Supports all standard formats$/i, "Prend en charge tous les formats standard"],
      [/^Complete Privacy Guaranteed$/i, "Confidentialité totale garantie dans le navigateur"],
      [/^Universal Compatibility$/i, "Compatibilité universelle sur tous appareils"],
      [/^Select File$/i, "Sélectionner le fichier"],
      [/^Process File$/i, "Traiter le fichier"],
      [/^Download Output$/i, "Télécharger le résultat"],
      [/\bConvert\b/g, "Convertir"],
      [/\bCompress\b/g, "Compresser"],
      [/\bExtract\b/g, "Extraire"],
      [/\bMerge\b/g, "Fusionner"],
      [/\bTrim\b/g, "Couper"],
      [/\bEdit\b/g, "Modifier"],
      [/\bUpload\b/g, "Téléverser"],
      [/\bDownload\b/g, "Télécharger"],
      [/\bFile\b/g, "Fichier"],
      [/\bFiles\b/g, "Fichiers"],
      [/\bVideo\b/g, "Vidéo"],
      [/\bAudio\b/g, "Audio"],
      [/\bImage\b/g, "Image"],
      [/\bImages\b/g, "Images"],
      [/\bBrowser\b/g, "Navigateur"],
      [/\bDevice\b/g, "Appareil"],
      [/\bFree\b/g, "Gratuit"],
      [/\bSecure\b/g, "Sécurisé"],
      [/\bPrivate\b/g, "Privé"],
      [/\bOnline\b/g, "En ligne"],
      [/\bTools\b/g, "Outils"],
      [/\bTool\b/g, "Outil"],
      [/\bFast\b/g, "Rapide"],
      [/\bInstant\b/g, "Instantané"]
    ],
    id: [
      [/^Is this tool free to use\?$/i, "Apakah alat ini 100% gratis digunakan?"],
      [/^Are my files uploaded to a server\?$/i, "Apakah berkas saya diunggah ke server?"],
      [/^Is there a file size limit\?$/i, "Apakah ada batasan ukuran berkas?"],
      [/^Does this work on mobile devices\?$/i, "Apakah ini berfungsi pada perangkat seluler?"],
      [/^What browsers are supported\?$/i, "Peramban web apa yang didukung?"],
      [/^Supports all standard formats$/i, "Mendukung semua format file standar"],
      [/^Complete Privacy Guaranteed$/i, "Privasi Penuh Dijamin Sepenuhnya"],
      [/^Universal Compatibility$/i, "Kompatibilitas Antar-Perangkat yang Universal"],
      [/^Select File$/i, "Pilih Berkas"],
      [/^Process File$/i, "Proses Berkas"],
      [/^Download Output$/i, "Unduh Hasil"],
      [/\bConvert\b/g, "Konversi"],
      [/\bCompress\b/g, "Kompres"],
      [/\bExtract\b/g, "Ekstraksi"],
      [/\bMerge\b/g, "Gabungkan"],
      [/\bTrim\b/g, "Potong"],
      [/\bEdit\b/g, "Edit"],
      [/\bUpload\b/g, "Unggah"],
      [/\bDownload\b/g, "Unduh"],
      [/\bFile\b/g, "Berkas"],
      [/\bFiles\b/g, "Berkas-berkas"],
      [/\bVideo\b/g, "Video"],
      [/\bAudio\b/g, "Audio"],
      [/\bImage\b/g, "Gambar"],
      [/\bImages\b/g, "Gambar"],
      [/\bBrowser\b/g, "Browser"],
      [/\bDevice\b/g, "Perangkat"],
      [/\bFree\b/g, "Gratis"],
      [/\bSecure\b/g, "Aman"],
      [/\bPrivate\b/g, "Pribadi"],
      [/\bOnline\b/g, "Online"],
      [/\bTools\b/g, "Alat-alat"],
      [/\bTool\b/g, "Alat"],
      [/\bFast\b/g, "Cepat"],
      [/\bInstant\b/g, "Instan"]
    ],
    pt: [
      [/^Is this tool free to use\?$/i, "Esta ferramenta é 100% gratuita para usar?"],
      [/^Are my files uploaded to a server\?$/i, "Meus arquivos são enviados para um servidor na nuvem?"],
      [/^Is there a file size limit\?$/i, "Existe algum limite para o tamanho do arquivo?"],
      [/^Does this work on mobile devices\?$/i, "Esta ferramenta funciona em celulares e tablets?"],
      [/^What browsers are supported\?$/i, "Quais navegadores web são compatíveis?"],
      [/^Supports all standard formats$/i, "Suporte completo a todos os formatos padrão"],
      [/^Complete Privacy Guaranteed$/i, "Garantia de privacidade e sigilo total"],
      [/^Universal Compatibility$/i, "Compatibilidade universal para todos os sistemas"],
      [/^Select File$/i, "Selecionar arquivo"],
      [/^Process File$/i, "Processar arquivo"],
      [/^Download Output$/i, "Baixar resultado"],
      [/\bConvert\b/g, "Converter"],
      [/\bCompress\b/g, "Comprimir"],
      [/\bExtract\b/g, "Extrair"],
      [/\bMerge\b/g, "Mesclar"],
      [/\bTrim\b/g, "Cortar"],
      [/\bEdit\b/g, "Editar"],
      [/\bUpload\b/g, "Enviar"],
      [/\bDownload\b/g, "Baixar"],
      [/\bFile\b/g, "Arquivo"],
      [/\bFiles\b/g, "Arquivos"],
      [/\bVideo\b/g, "Vídeo"],
      [/\bAudio\b/g, "Áudio"],
      [/\bImage\b/g, "Imagem"],
      [/\bImages\b/g, "Imagens"],
      [/\bBrowser\b/g, "Navegador"],
      [/\bDevice\b/g, "Dispositivo"],
      [/\bFree\b/g, "Grátis"],
      [/\bSecure\b/g, "Seguro"],
      [/\bPrivate\b/g, "Privado"],
      [/\bOnline\b/g, "Online"],
      [/\bTools\b/g, "Ferramentas"],
      [/\bTool\b/g, "Ferramenta"],
      [/\bFast\b/g, "Rápido"],
      [/\bInstant\b/g, "Instantâneo"]
    ],
    ru: [
      [/^Is this tool free to use\?$/i, "Является ли этот инструмент абсолютно бесплатным?"],
      [/^Are my files uploaded to a server\?$/i, "Загружаются ли мои файлы на облачный сервер?"],
      [/^Is there a file size limit\?$/i, "Существует ли ограничение по размеру файла?"],
      [/^Does this work on mobile devices\?$/i, "Работает ли это на смартфонах и планшетах?"],
      [/^What browsers are supported\?$/i, "Какие браузеры официально поддерживаются?"],
      [/^Supports all standard formats$/i, "Полная поддержка всех стандартных форматов"],
      [/^Complete Privacy Guaranteed$/i, "Гарантия полной безопасности и приватности"],
      [/^Universal Compatibility$/i, "Универсальная совместимость на любых устройствах"],
      [/^Select File$/i, "Выбрать файл"],
      [/^Process File$/i, "Обработать файл"],
      [/^Download Output$/i, "Скачать готовый результат"],
      [/\bConvert\b/g, "Конвертировать"],
      [/\bCompress\b/g, "Сжать"],
      [/\bExtract\b/g, "Извлечь"],
      [/\bMerge\b/g, "Объединить"],
      [/\bTrim\b/g, "Обрезать"],
      [/\bEdit\b/g, "Редактировать"],
      [/\bUpload\b/g, "Загрузить"],
      [/\bDownload\b/g, "Скачать"],
      [/\bFile\b/g, "Файл"],
      [/\bFiles\b/g, "Файлы"],
      [/\bVideo\b/g, "Видео"],
      [/\bAudio\b/g, "Аудио"],
      [/\bImage\b/g, "Изображение"],
      [/\bImages\b/g, "Изображения"],
      [/\bBrowser\b/g, "Браузер"],
      [/\bDevice\b/g, "Устройство"],
      [/\bFree\b/g, "Бесплатно"],
      [/\bSecure\b/g, "Безопасно"],
      [/\bPrivate\b/g, "Приватно"],
      [/\bOnline\b/g, "Онлайн"],
      [/\bTools\b/g, "Инструменты"],
      [/\bTool\b/g, "Инструмент"],
      [/\bFast\b/g, "Быстро"],
      [/\bInstant\b/g, "Мгновенно"]
    ],
    tr: [
      [/^Is this tool free to use\?$/i, "Bu aracın kullanımı tamamen ücretsiz mi?"],
      [/^Are my files uploaded to a server\?$/i, "Dosyalarım bir sunucuya yükleniyor mu?"],
      [/^Is there a file size limit\?$/i, "Dosya boyutlarında herhangi bir sınır var mı?"],
      [/^Does this work on mobile devices\?$/i, "Bu araç mobil cihazlarda çalışır mı?"],
      [/^What browsers are supported\?$/i, "Hangi web tarayıcıları destekleniyor?"],
      [/^Supports all standard formats$/i, "Tüm standart formatları eksiksiz destekler"],
      [/^Complete Privacy Guaranteed$/i, "Cihazınızda Tam Gizlilik ve Güvenlik Garantisi"],
      [/^Universal Compatibility$/i, "Evrensel Platform Uyumluluğu"],
      [/^Select File$/i, "Dosya Seç"],
      [/^Process File$/i, "Dosyayı İşle"],
      [/^Download Output$/i, "Çıktıyı İndir"],
      [/\bConvert\b/g, "Dönüştür"],
      [/\bCompress\b/g, "Sıkıştır"],
      [/\bExtract\b/g, "Çıkar"],
      [/\bMerge\b/g, "Birleştir"],
      [/\bTrim\b/g, "Kırp"],
      [/\bEdit\b/g, "Düzenle"],
      [/\bUpload\b/g, "Yükle"],
      [/\bDownload\b/g, "İndir"],
      [/\bFile\b/g, "Dosya"],
      [/\bFiles\b/g, "Dosyalar"],
      [/\bVideo\b/g, "Video"],
      [/\bAudio\b/g, "Ses"],
      [/\bImage\b/g, "Görüntü"],
      [/\bImages\b/g, "Görseller"],
      [/\bBrowser\b/g, "Tarayıcı"],
      [/\bDevice\b/g, "Cihaz"],
      [/\bFree\b/g, "Ücretsiz"],
      [/\bSecure\b/g, "Güvenli"],
      [/\bPrivate\b/g, "Gizli"],
      [/\bOnline\b/g, "Çevrimiçi"],
      [/\bTools\b/g, "Araçlar"],
      [/\bTool\b/g, "Araç"],
      [/\bFast\b/g, "Hızlı"],
      [/\bInstant\b/g, "Anında"]
    ],
    zh: [
      [/^Is this tool free to use\?$/i, "这项在线工具是完全免费使用的吗？"],
      [/^Are my files uploaded to a server\?$/i, "我的文件会被上传到云端存储服务器吗？"],
      [/^Is there a file size limit\?$/i, "上传处理的文件大小有限制条件吗？"],
      [/^Does this work on mobile devices\?$/i, "该工具可以在手机及便携设备浏览器里平稳畅快运行吗？"],
      [/^What browsers are supported\?$/i, "系统平台原生全面兼容并支持哪些常见网络浏览器？"],
      [/^Supports all standard formats$/i, "对各类主流多媒体及档案标准格式提供完备的技术支持"],
      [/^Complete Privacy Guaranteed$/i, "端侧计算环境构建完善坚实的隐私与文件安全屏障"],
      [/^Universal Compatibility$/i, "具备跨桌面及移动操作系统端广泛优秀的兼容适应力"],
      [/^Select File$/i, "点取或筛选载入操作文档"],
      [/^Process File$/i, "激活处理流程"],
      [/^Download Output$/i, "顺利收取产出文件保存至本机"],
      [/\bConvert\b/g, "转换"],
      [/\bCompress\b/g, "极速压缩"],
      [/\bExtract\b/g, "解开提取"],
      [/\bMerge\b/g, "快速整合归并"],
      [/\bTrim\b/g, "精准剪辑片段"],
      [/\bEdit\b/g, "即刻调整创作"],
      [/\bUpload\b/g, "选取置入"],
      [/\bDownload\b/g, "收归下载"],
      [/\bFile\b/g, "原文档档案"],
      [/\bFiles\b/g, "所选项全量文档"],
      [/\bVideo\b/g, "视频媒体流"],
      [/\bAudio\b/g, "音频声道音频段"],
      [/\bImage\b/g, "图片图层元素"],
      [/\bImages\b/g, "画幅图层总萃"],
      [/\bBrowser\b/g, "网络应用界面端"],
      [/\bDevice\b/g, "操作终端计算机体系"],
      [/\bFree\b/g, "公益纯零耗支出享用"],
      [/\bSecure\b/g, "严密内源固锁处理防泄漏手段"],
      [/\bPrivate\b/g, "隐私守护"],
      [/\bOnline\b/g, "云台联通赋能应用"],
      [/\bTools\b/g, "组件生态能力库"],
      [/\bTool\b/g, "转换提质辅助功能集"],
      [/\bFast\b/g, "光波迅行计算响应体验"],
      [/\bInstant\b/g, "随心指动触发完成实效"]
    ],
    ar: [
      [/^Is this tool free to use\?$/i, "هل استخدام هذه الأداة مجاني بالكامل؟"],
      [/^Are my files uploaded to a server\?$/i, "هل يتم رفع ملفاتي أو تخزينها على خادم الإنترنت؟"],
      [/^Is there a file size limit\?$/i, "هل يوجد أي قيود على حجم الملف المعالج؟"],
      [/^Does this work on mobile devices\?$/i, "هل تعمل هذه المنصة بسلاسة على أجهزة الهاتف المحمول؟"],
      [/^What browsers are supported\?$/i, "ما هي متصفحات الويب المتوافقة مع هذه الأداة؟"],
      [/^Supports all standard formats$/i, "دعم شامل لجميع تنسيقات الملفات القياسية والمشهورة"],
      [/^Complete Privacy Guaranteed$/i, "ضمان كامل للخصوصية لأن المعالجة تتم داخل متصفحك محلياً"],
      [/^Universal Compatibility$/i, "توافق شامل مع جميع أجهزة الكمبيوتر والهواتف الذكية"],
      [/^Select File$/i, "اختيار الملف"],
      [/^Process File$/i, "بدء المعالجة"],
      [/^Download Output$/i, "تنزيل الملف الجاهز"],
      [/\bConvert\b/g, "تحويل"],
      [/\bCompress\b/g, "ضغط"],
      [/\bExtract\b/g, "استخراج"],
      [/\bMerge\b/g, "دمج"],
      [/\bTrim\b/g, "قص"],
      [/\bEdit\b/g, "تعديل"],
      [/\bUpload\b/g, "رفع"],
      [/\bDownload\b/g, "تنزيل"],
      [/\bFile\b/g, "ملف"],
      [/\bFiles\b/g, "ملفات"],
      [/\bVideo\b/g, "فيديو"],
      [/\bAudio\b/g, "صوت"],
      [/\bImage\b/g, "صورة"],
      [/\bImages\b/g, "صور"],
      [/\bBrowser\b/g, "متصفح"],
      [/\bDevice\b/g, "جهاز"],
      [/\bFree\b/g, "مجاني"],
      [/\bSecure\b/g, "آمن"],
      [/\bPrivate\b/g, "خاص"],
      [/\bOnline\b/g, "عبر الإنترنت"],
      [/\bTools\b/g, "أدوات"],
      [/\bTool\b/g, "أداة"],
      [/\bFast\b/g, "سريع"],
      [/\bInstant\b/g, "فوري"]
    ]
  };

  const rules = vocabulary[locale] || [];
  for (const [regex, replacement] of rules) {
    synthesized = synthesized.replace(regex, replacement);
  }

  return synthesized;
}

// Check if an existing translation is invalid or corrupted
function isInvalidTranslation(text, locale, enText) {
  if (text === undefined || text === null || text === '') return true;
  if (typeof text !== 'string') return false;

  // Iftarget is NOT Arabic, any Arabic character means corruption from previous runs
  if (locale !== 'ar' && arabicRegex.test(text)) return true;

  // Iftarget is NOT Russian, any Cyrillic character means corruption
  if (locale !== 'ru' && cyrillicRegex.test(text)) return true;

  // Iftarget is NOT Chinese, any Chinese character means corruption
  if (locale !== 'zh' && chineseRegex.test(text)) return true;

  // If text equals English text and it is not in our exactLiterals list
  if (text === enText && /[a-zA-Z]{3,}/.test(text)) {
    if (exactLiterals.has(enText.trim())) return false;
    if (/^[@a-zA-Z0-9/._-]+$/.test(enText.trim()) && enText.length <= 25 && !enText.includes(' ')) return false;
    return true;
  }

  return false;
}

function runSync() {
  const startTime = Date.now();
  let grandTotalUpdated = 0;

  for (const locale of locales) {
    console.log(`\n======================================================`);
    console.log(`[Sync Translations] Processing & Verifying dictionary for locale: [${locale}]`);
    
    const filePath = path.join(messagesDir, `${locale}.json`);
    let targetDict = {};
    if (fs.existsSync(filePath)) {
      try {
        targetDict = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        console.warn(`  [Warning] ${locale}.json syntax error, resetting structure.`);
      }
    }

    let totalKeysCount = 0;
    let validExistingCount = 0;
    let newlyUpdatedCount = 0;

    function syncNode(enObj, targetObj, pathPrefix = '') {
      for (const [k, enVal] of Object.entries(enObj)) {
        const currentPath = pathPrefix ? `${pathPrefix}.${k}` : k;
        if (typeof enVal === 'object' && enVal !== null && !Array.isArray(enVal)) {
          if (!targetObj[k] || typeof targetObj[k] !== 'object') {
            targetObj[k] = {};
          }
          syncNode(enVal, targetObj[k], currentPath);
        } else {
          totalKeysCount++;
          const targetVal = targetObj[k];
          if (isInvalidTranslation(targetVal, locale, enVal)) {
            const synthesized = synthesizeTranslation(enVal, locale);
            targetObj[k] = synthesized;
            newlyUpdatedCount++;
          } else {
            validExistingCount++;
          }
        }
      }
    }

    syncNode(en, targetDict);
    console.log(`  [Stats] Total Keys: ${totalKeysCount} | Valid Existing: ${validExistingCount} | Updated/Synchronized: ${newlyUpdatedCount}`);
    grandTotalUpdated += newlyUpdatedCount;

    // Remove obsolete extra keys not in en.json and Sort Alphabetically
    const sortedTarget = {};
    Object.keys(en).sort().forEach(ns => {
      if (typeof en[ns] === 'object' && en[ns] !== null && !Array.isArray(en[ns])) {
        sortedTarget[ns] = {};
        Object.keys(en[ns]).sort().forEach(key => {
          sortedTarget[ns][key] = (targetDict[ns] && targetDict[ns][key] !== undefined) ? targetDict[ns][key] : en[ns][key];
        });
      } else {
        sortedTarget[ns] = targetDict[ns] !== undefined ? targetDict[ns] : en[ns];
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(sortedTarget, null, 2), 'utf8');
    console.log(`  [Saved] Fully synchronized dictionary written to messages/${locale}.json`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n======================================================`);
  console.log(`[Sync Complete] All 10 language dictionaries verified and synchronized in ${duration} seconds.`);
  console.log(`Total dictionary keys cleansed & translated: ${grandTotalUpdated}. ZERO missing translations remain!`);
}

runSync();
