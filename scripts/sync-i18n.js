const fs = require('fs');
const path = require('path');

const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];
const messagesDir = path.join(__dirname, '..', 'messages');

const translations = {
  Hero: {
    "PDF to Word": {
      en: "PDF to Word",
      ar: "PDF إلى Word",
      de: "PDF in Word",
      es: "PDF a Word",
      fr: "PDF en Word",
      id: "PDF ke Word",
      pt: "PDF para Word",
      ru: "PDF в Word",
      tr: "PDF'den Word'e",
      zh: "PDF 转 Word"
    },
    "Convert PDF documents to editable Word files instantly": {
      en: "Convert PDF documents to editable Word files instantly.",
      ar: "تحويل مستندات PDF إلى ملفات Word قابلة للتعديل فورًا.",
      de: "Konvertieren Sie PDF-Dokumente sofort in bearbeitbare Word-Dateien.",
      es: "Convierte documentos PDF a archivos Word editables al instante.",
      fr: "Convertissez instantanément des documents PDF en fichiers Word modifiables.",
      id: "Ubah dokumen PDF menjadi file Word yang dapat diedit secara instan.",
      pt: "Converta documentos PDF em arquivos Word editáveis instantaneamente.",
      ru: "Мгновенно преобразуйте документы PDF в редактируемые файлы Word.",
      tr: "PDF belgelerini anında düzenlenebilir Word dosyalarına dönüştürün.",
      zh: "立即将 PDF 文档转换为可编辑的 Word 文件。"
    },
    "Word to PDF": {
      en: "Word to PDF",
      ar: "Word إلى PDF",
      de: "Word in PDF",
      es: "Word a PDF",
      fr: "Word en PDF",
      id: "Word ke PDF",
      pt: "Word para PDF",
      ru: "Word в PDF",
      tr: "Word'den PDF'ye",
      zh: "Word 转 PDF"
    },
    "Convert Microsoft Word documents to professional PDF files in browser": {
      en: "Convert Microsoft Word documents to professional PDF files in browser.",
      ar: "تحويل مستندات Microsoft Word إلى ملفات PDF احترافية في المتصفح.",
      de: "Konvertieren Sie Microsoft Word-Dokumente im Browser in professionelle PDF-Dateien.",
      es: "Convierte documentos de Microsoft Word a archivos PDF profesionales en el navegador.",
      fr: "Convertissez des documents Microsoft Word en fichiers PDF professionnels dans votre navigateur.",
      id: "Ubah dokumen Microsoft Word menjadi file PDF profesional di browser.",
      pt: "Converta documentos do Microsoft Word em arquivos PDF profissionais no navegador.",
      ru: "Преобразуйте документы Microsoft Word в профессиональные файлы PDF в браузере.",
      tr: "Microsoft Word belgelerini tarayıcıda profesyonel PDF dosyalarına dönüştürün.",
      zh: "在浏览器中将 Microsoft Word 文档转换为专业的 PDF 文件。"
    },
    "Word to HTML": {
      en: "Word to HTML",
      ar: "Word إلى HTML",
      de: "Word in HTML",
      es: "Word a HTML",
      fr: "Word en HTML",
      id: "Word ke HTML",
      pt: "Word para HTML",
      ru: "Word в HTML",
      tr: "Word'den HTML'e",
      zh: "Word 转 HTML"
    },
    "Convert Word documents into clean HTML5 code with live preview": {
      en: "Convert Word documents into clean HTML5 code with live preview.",
      ar: "تحويل مستندات Word إلى كود HTML5 نظيف مع معاينة مباشرة.",
      de: "Konvertieren Sie Word-Dokumente in sauberen HTML5-Code mit Live-Vorschau.",
      es: "Convierte documentos Word en código HTML5 limpio con vista previa en vivo.",
      fr: "Convertissez des documents Word en code HTML5 propre avec aperçu en direct.",
      id: "Ubah dokumen Word menjadi kode HTML5 bersih dengan pratinjau langsung.",
      pt: "Converta documentos Word em código HTML5 limpo com pré-visualização ao vivo.",
      ru: "Преобразуйте документы Word в чистый код HTML5 с предварительным просмотром.",
      tr: "Word belgelerini canlı önizlemeyle temiz HTML5 koduna dönüştürün.",
      zh: "将 Word 文档转换为带有实时预览的干净 HTML5 代码。"
    },
    "PDF to HTML": {
      en: "PDF to HTML",
      ar: "PDF إلى HTML",
      de: "PDF in HTML",
      es: "PDF a HTML",
      fr: "PDF en HTML",
      id: "PDF ke HTML",
      pt: "PDF para HTML",
      ru: "PDF в HTML",
      tr: "PDF'den HTML'e",
      zh: "PDF 转 HTML"
    },
    "Transform multi-page PDF documents into structured HTML webpages": {
      en: "Transform multi-page PDF documents into structured HTML webpages.",
      ar: "تحويل مستندات PDF متعددة الصفحات إلى صفحات ويب HTML منظمة.",
      de: "Verwandeln Sie mehrseitige PDF-Dokumente in strukturierte HTML-Webseiten.",
      es: "Transforma documentos PDF de varias páginas en páginas web HTML estructuradas.",
      fr: "Transformez des documents PDF multi-pages en pages Web HTML structurées.",
      id: "Ubah dokumen PDF multi-halaman menjadi halaman web HTML terstruktur.",
      pt: "Transforme documentos PDF de várias páginas em páginas da web HTML estruturadas.",
      ru: "Преобразуйте многостраничные PDF-документы в структурированные веб-страницы HTML.",
      tr: "Çok sayfalı PDF belgelerini yapılandırılmış HTML web sayfalarına dönüştürün.",
      zh: "将多页 PDF 文档转换为结构化的 HTML 网页。"
    },
    "Data Formatter": {
      en: "Data Formatter",
      ar: "منسق البيانات",
      de: "Daten-Formatierer",
      es: "Formateador de datos",
      fr: "Formateur de données",
      id: "Format Data",
      pt: "Formatador de Dados",
      ru: "Форматирование данных",
      tr: "Veri Biçimlendirici",
      zh: "数据格式化工具"
    },
    "Format, validate, and convert between JSON, XML, YAML, and CSV in browser": {
      en: "Format, validate, and convert between JSON, XML, YAML, and CSV in browser.",
      ar: "تنسيق البيانات والتحقق منها والتحويل بين JSON و XML و YAML و CSV في المتصفح.",
      de: "Formatieren, validieren und konvertieren Sie im Browser zwischen JSON, XML, YAML und CSV.",
      es: "Formatea, valida y convierte entre JSON, XML, YAML y CSV en el navegador.",
      fr: "Formatez, validez et convertissez entre JSON, XML, YAML et CSV dans le navigateur.",
      id: "Format, validasi, dan konversi antara JSON, XML, YAML, dan CSV di browser.",
      pt: "Formate, valide e converta entre JSON, XML, YAML e CSV no navegador.",
      ru: "Форматируйте, проверяйте и преобразуйте между JSON, XML, YAML и CSV в браузере.",
      tr: "Tarayıcıda JSON, XML, YAML ve CSV arasında biçimlendirme, doğrulama ve dönüştürme yapın.",
      zh: "在浏览器中对 JSON、XML、YAML 和 CSV 进行格式化、验证和互相转换。"
    },
    "Lightning Fast": {
      en: "Lightning Fast",
      ar: "سريع كالبرق",
      de: "Blitzschnell",
      es: "Ultrarrápido",
      fr: "Ultra rapide",
      id: "Sangat Cepat",
      pt: "Ultrarrápido",
      ru: "Molnienosno",
      tr: "Işık Hızında",
      zh: "极速体验"
    },
    "Processing": {
      en: "Processing",
      ar: "معالجة",
      de: "Verarbeitung",
      es: "Procesamiento",
      fr: "Traitement",
      id: "Pemrosesan",
      pt: "Processamento",
      ru: "Обработка",
      tr: "İşleme",
      zh: "本地处理"
    },
    "100% Secure": {
      en: "100% Secure",
      ar: "آمن 100%",
      de: "100% Sicher",
      es: "100% Seguro",
      fr: "100% Sécurisé",
      id: "100% Aman",
      pt: "100% Seguro",
      ru: "100% Безопасно",
      tr: "%100 Güvenli",
      zh: "100% 安全"
    },
    "Private & Safe": {
      en: "Private & Safe",
      ar: "خاص وآمن",
      de: "Privat & Sicher",
      es: "Privado y seguro",
      fr: "Privé et sûr",
      id: "Pribadi & Aman",
      pt: "Privado e Seguro",
      ru: "Конфиденциально",
      tr: "Gizli ve Güvenli",
      zh: "私密安全"
    },
    "Browser Based": {
      en: "Browser Based",
      ar: "يعمل على المتصفح",
      de: "Browserbasiert",
      es: "Basado en navegador",
      fr: "Basé sur le navigateur",
      id: "Berbasis Browser",
      pt: "Baseado no Navegador",
      ru: "В браузере",
      tr: "Tarayıcı Tabanlı",
      zh: "基于浏览器"
    },
    "No Install": {
      en: "No Install",
      ar: "بدون تثبيت",
      de: "Keine Installation",
      es: "Sin instalación",
      fr: "Sans installation",
      id: "Tanpa Instalasi",
      pt: "Sem Instalação",
      ru: "Без установки",
      tr: "Kurulum Yok",
      zh: "无需安装"
    },
    "Forever Free": {
      en: "Forever Free",
      ar: "مجاني دائمًا",
      de: "Dauerhaft kostenlos",
      es: "Gratis para siempre",
      fr: "Gratuit pour toujours",
      id: "Gratis Selamanya",
      pt: "Gratuito para Sempre",
      ru: "Бесплатно всегда",
      tr: "Sonsuza Dek Ücretsiz",
      zh: "永久免费"
    },
    "No Watermark": {
      en: "No Watermark",
      ar: "بدون علامة مائية",
      de: "Ohne Wasserzeichen",
      es: "Sin marca de agua",
      fr: "Sans filigrane",
      id: "Tanpa Watermark",
      pt: "Sem Marca D'água",
      ru: "Без водяных знаков",
      tr: "Filigransız",
      zh: "无水印"
    }
  },
  ToolContent: {
    whatIs: {
      en: "What is {toolName}?",
      ar: "ما هو {toolName}؟",
      de: "Was ist {toolName}?",
      es: "¿Qué es {toolName}?",
      fr: "Qu'est-ce que {toolName} ?",
      id: "Apa itu {toolName}?",
      pt: "O que é {toolName}?",
      ru: "Что такое {toolName}?",
      tr: "{toolName} nedir?",
      zh: "什么是 {toolName}？"
    },
    keyFeatures: {
      en: "Key Features",
      ar: "الميزات الرئيسية",
      de: "Hauptmerkmale",
      es: "Características principales",
      fr: "Caractéristiques principales",
      id: "Fitur Utama",
      pt: "Recursos Principais",
      ru: "Основные возможности",
      tr: "Ana Özellikler",
      zh: "主要特点"
    },
    howItWorks: {
      en: "How It Works",
      ar: "كيف يعمل",
      de: "Wie es funktioniert",
      es: "Cómo funciona",
      fr: "Comment ça marche",
      id: "Cara Kerja",
      pt: "Como Funciona",
      ru: "Как это работает",
      tr: "Nasıl Çalışır",
      zh: "工作原理"
    },
    commonUseCases: {
      en: "Common Use Cases",
      ar: "حالات الاستخدام الشائعة",
      de: "Häufige Anwendungsfälle",
      es: "Casos de uso comunes",
      fr: "Cas d'utilisation fréquents",
      id: "Studi Kasus Umum",
      pt: "Casos de Uso Comuns",
      ru: "Частые сценарии использования",
      tr: "Yaygın Kullanım Alanları",
      zh: "常见应用场景"
    },
    supportedFormats: {
      en: "Supported Formats",
      ar: "الصيغ المدعومة",
      de: "Unterstützte Formate",
      es: "Formatos admitidos",
      fr: "Formats pris en charge",
      id: "Format yang Didukung",
      pt: "Formatos Suportados",
      ru: "Поддерживаемые форматы",
      tr: "Desteklenen Formatlar",
      zh: "支持的格式"
    },
    privacyAndSecurity: {
      en: "Privacy & Security",
      ar: "الخصوصية والأمان",
      de: "Datenschutz & Sicherheit",
      es: "Privacidad y seguridad",
      fr: "Confidentialité et sécurité",
      id: "Privasi & Keamanan",
      pt: "Privacidade e Segurança",
      ru: "Конфиденциальность и безопасность",
      tr: "Gizlilik ve Güvenlik",
      zh: "隐私与安全"
    },
    proTips: {
      en: "Pro Tips",
      ar: "نصائح احترافية",
      de: "Profi-Tipps",
      es: "Consejos profesionales",
      fr: "Conseils de pro",
      id: "Tips Pro",
      pt: "Dicas Profissionais",
      ru: "Советы экспертов",
      tr: "İpuçları",
      zh: "实用技巧"
    },
    faq: {
      en: "Frequently Asked Questions",
      ar: "الأسئلة الشائعة",
      de: "Häufig gestellte Fragen",
      es: "Preguntas frecuentes",
      fr: "Foire aux questions",
      id: "Pertanyaan yang Sering Diajukan",
      pt: "Perguntas Frequentes",
      ru: "Часто задаваемые вопросы",
      tr: "Sıkça Sorulan Sorular",
      zh: "常见问题解答"
    },
    faqSubtitle: {
      en: "Common questions about {toolName}",
      ar: "أسئلة شائعة حول {toolName}",
      de: "Häufige Fragen zu {toolName}",
      es: "Preguntas comunes sobre {toolName}",
      fr: "Questions fréquentes sur {toolName}",
      id: "Pertanyaan umum tentang {toolName}",
      pt: "Dúvidas comuns sobre {toolName}",
      ru: "Частые вопросы о {toolName}",
      tr: "{toolName} hakkında sık sorulan sorular",
      zh: "关于 {toolName} 的常见疑问"
    },
    updated: {
      en: "Updated:",
      ar: "تم التحديث:",
      de: "Aktualisiert:",
      es: "Actualizado:",
      fr: "Mis à jour :",
      id: "Diperbarui:",
      pt: "Atualizado:",
      ru: "Обновлено:",
      tr: "Güncellendi:",
      zh: "更新时间："
    },
    byAuthor: {
      en: "By ConvertAllNow Team",
      ar: "بواسطة فريق ConvertAllNow",
      de: "Vom ConvertAllNow Team",
      es: "Por el equipo de ConvertAllNow",
      fr: "Par l'équipe ConvertAllNow",
      id: "Oleh Tim ConvertAllNow",
      pt: "Pela Equipe ConvertAllNow",
      ru: "Команда ConvertAllNow",
      tr: "ConvertAllNow Ekibi Tarafından",
      zh: "ConvertAllNow 团队"
    },
    badgeText: {
      en: "100% Free · No Signup · Browser-Based",
      ar: "مجاني 100٪ · بدون تسجل · يعتمد على المتصفح",
      de: "100% Kostenlos · Keine Anmeldung · Browserbasiert",
      es: "100% Gratis · Sin registro · Basado en navegador",
      fr: "100% Gratuit · Sans inscription · En ligne",
      id: "100% Gratis · Tanpa Daftar · Berbasis Browser",
      pt: "100% Grátis · Sem Cadastro · No Navegador",
      ru: "100% Бесплатно · Без регистрации · В браузере",
      tr: "%100 Ücretsiz · Kayıtsız · Tarayıcı Tabanlı",
      zh: "100% 免费 · 无需注册 · 浏览器即用"
    }
  },
  RelatedTools: {
    title: {
      en: "Related Tools",
      ar: "أدوات ذات صلة",
      de: "Ähnliche Werkzeuge",
      es: "Herramientas relacionadas",
      fr: "Outils connexes",
      id: "Alat Terkait",
      pt: "Ferramentas Relacionadas",
      ru: "Похожие инструменты",
      tr: "İlgili Araçlar",
      zh: "相关工具"
    },
    viewAll: {
      en: "View all {category}",
      ar: "عرض جميع أدوات {category}",
      de: "Alle {category} anzeigen",
      es: "Ver todas las herramientas de {category}",
      fr: "Voir tous les outils {category}",
      id: "Lihat semua {category}",
      pt: "Ver todas as ferramentas de {category}",
      ru: "Посмотреть все {category}",
      tr: "Tüm {category} araçlarını gör",
      zh: "查看所有 {category}"
    }
  },
  CategoryHubs: {
    pdfTitle: {
      en: "Free PDF Tools Online",
      ar: "أدوات PDF مجانية عبر الإنترنت",
      de: "Kostenlose PDF-Tools online",
      es: "Herramientas PDF gratuitas en línea",
      fr: "Outils PDF gratuits en ligne",
      id: "Alat PDF Gratis Online",
      pt: "Ferramentas PDF Gratuitas Online",
      ru: "Бесплатные онлайн-инструменты PDF",
      tr: "Ücretsiz Çevrimiçi PDF Araçları",
      zh: "免费在线 PDF 工具"
    },
    pdfSubtitle: {
      en: "Merge, convert, compress, protect, and edit PDF files — all free, all browser-based, no signup required. Your files never leave your device.",
      ar: "دمج، تحويل، ضغط، حماية وتعديل ملفات PDF - كلها مجانية وعلى المتصفح وبدون تسجيل. ملفاتك لا تغادر جهازك أبداً.",
      de: "PDF-Dateien zusammenfügen, konvertieren, komprimieren, schützen und bearbeiten – kostenlos, browserbasiert, ohne Anmeldung.",
      es: "Combina, convierte, comprime, protege y edita archivos PDF: todo gratis, en el navegador y sin registro.",
      fr: "Fusionnez, convertissez, compressez, protégez et modifiez des fichiers PDF — gratuit, en ligne, sans inscription.",
      id: "Gabung, konversi, kompres, lindungi, dan edit file PDF — gratis, di browser, tanpa daftar.",
      pt: "Junte, converta, comprima, proteja e edite arquivos PDF — gratuito, no navegador, sem cadastro.",
      ru: "Объединяйте, конвертируйте, сжимайте, защищайте и редактируйте PDF — бесплатно и прямо в браузере.",
      tr: "PDF dosyalarını birleştirin, dönüştürün, sıkıştırın, koruyun ve düzenleyin — ücretsiz, tarayıcıda, kayıtsız.",
      zh: "合并、转换、压缩、保护和编辑 PDF 文件——全免费、基于浏览器、无需注册。"
    },
    imageTitle: {
      en: "Free Image Tools Online",
      ar: "أدوات الصور المجانية عبر الإنترنت",
      de: "Kostenlose Bild-Tools online",
      es: "Herramientas de imagen gratuitas en línea",
      fr: "Outils d'image gratuits en ligne",
      id: "Alat Gambar Gratis Online",
      pt: "Ferramentas de Imagem Gratuitas Online",
      ru: "Бесплатные онлайн-инструменты для изображений",
      tr: "Ücretsiz Çevrimiçi Görsel Araçları",
      zh: "免费在线图片工具"
    },
    imageSubtitle: {
      en: "Compress, convert, resize, edit, and remove backgrounds from images — all free, all in your browser, no upload to servers.",
      ar: "ضغط، تحويل، تغيير حجم، تعديل وإزالة الخلفية من الصور - مجاناً وفي متصفحك دون رفع الملفات.",
      de: "Bilder komprimieren, konvertieren, skalieren, bearbeiten und Hintergrund entfernen – kostenlos im Browser.",
      es: "Comprime, convierte, redimensiona, edita y elimina fondos de imágenes: gratis y en tu navegador.",
      fr: "Compressez, convertissez, redimensionnez, éditez et supprimez l'arrière-plan des images — gratuitement dans votre navigateur.",
      id: "Kompres, konversi, ubah ukuran, edit, dan hapus latar belakang gambar — gratis di browser Anda.",
      pt: "Comprima, converta, redimensione, edite e remova o fundo de imagens — grátis no seu navegador.",
      ru: "Сжимайте, конвертируйте, меняйте размер, редактируйте и удаляйте фон изображений бесплатно в браузере.",
      tr: "Görselleri sıkıştırın, dönüştürün, yeniden boyutlandırın, düzenleyin ve arka planını kaldırın.",
      zh: "压缩、转换、重置大小、编辑图片以及 AI 消除背景——全免费、浏览器即用。"
    },
    videoTitle: {
      en: "Free Video & Audio Tools Online",
      ar: "أدوات الفيديو والصوت المجانية عبر الإنترنت",
      de: "Kostenlose Video- & Audio-Tools online",
      es: "Herramientas de video y audio gratuitas en línea",
      fr: "Outils vidéo et audio gratuits en ligne",
      id: "Alat Video & Audio Gratis Online",
      pt: "Ferramentas de Vídeo e Áudio Gratuitas Online",
      ru: "Бесплатные онлайн-инструменты для видео и аудио",
      tr: "Ücretsiz Çevrimiçi Video ve Ses Araçları",
      zh: "免费在线音视频工具"
    },
    videoSubtitle: {
      en: "Compress, trim, convert, and extract audio from videos — powered by FFmpeg WebAssembly. No upload to servers, no signup, completely private.",
      ar: "ضغط، قص، تحويل واستخراج الصوت من الفيديو - مدعوم بـ FFmpeg WebAssembly. بدون رفع للملفات، آمن وخاص.",
      de: "Videos komprimieren, schneiden, konvertieren und Audio extrahieren – mit FFmpeg WebAssembly. Vollständig privat.",
      es: "Comprime, recorta, convierte y extrae audio de videos con FFmpeg WebAssembly. Privacidad total.",
      fr: "Compressez, coupez, convertissez et extrayez l'audio des vidéos — propulsé par FFmpeg WebAssembly.",
      id: "Kompres, potong, konversi, dan ekstrak audio dari video — didukung oleh FFmpeg WebAssembly.",
      pt: "Comprima, corte, converta e extraia áudio de vídeos — com tecnologia FFmpeg WebAssembly.",
      ru: "Сжимайте, обрезайте, конвертируйте и извлекайте звук из видео с помощью FFmpeg WebAssembly.",
      tr: "Videoları sıkıştırın, kırpın, dönüştürün ve ses çıkarın — FFmpeg WebAssembly ile desteklenir.",
      zh: "压缩、剪輯、转换视频以及提取音频——由 FFmpeg WebAssembly 驱动，安全私密。"
    },
    archiveTitle: {
      en: "Free Archive & ZIP Tools Online",
      ar: "أدوات الأرشيف و ZIP المجانية عبر الإنترنت",
      de: "Kostenlose Archiv- & ZIP-Tools online",
      es: "Herramientas de archivo y ZIP gratuitas en línea",
      fr: "Outils d'archive et ZIP gratuits en ligne",
      id: "Alat Arsip & ZIP Gratis Online",
      pt: "Ferramentas de Arquivo e ZIP Gratuitas Online",
      ru: "Бесплатные онлайн-инструменты для архивов и ZIP",
      tr: "Ücretsiz Çevrimiçi Arşiv ve ZIP Araçları",
      zh: "免费在线压缩包与 ZIP 工具"
    },
    archiveSubtitle: {
      en: "Create, extract, edit, convert, and secure ZIP archives — all browser-based. Supports ZIP, RAR, 7Z, TAR, GZ, BZ2, XZ, and ISO formats.",
      ar: "إنشاء، استخراج، تعديل، تحويل وحماية أرشيفات ZIP - في المتصفح. يدعم صيغ ZIP, RAR, 7Z, TAR, GZ وغيرها.",
      de: "ZIP-Archive erstellen, entpacken, bearbeiten, konvertieren und sichern – unterstützt ZIP, RAR, 7Z, TAR, etc.",
      es: "Crea, extrae, edita, convierte y asegura archivos ZIP en el navegador. Compatible con ZIP, RAR, 7Z, TAR, etc.",
      fr: "Créez, extrayez, modifiez, convertissez et sécurisez des archives ZIP — prend en charge ZIP, RAR, 7Z, TAR, etc.",
      id: "Buat, ekstrak, edit, konversi, dan amankan arsip ZIP di browser. Mendukung ZIP, RAR, 7Z, TAR, dll.",
      pt: "Crie, extraia, edite, converta e proteja arquivos ZIP no navegador. Suporta ZIP, RAR, 7Z, TAR, etc.",
      ru: "Создавайте, извлекайте, редактируйте и конвертируйте архивы ZIP. Поддерживает ZIP, RAR, 7Z, TAR и др.",
      tr: "ZIP arşivleri oluşturun, çıkarın, düzenleyin, dönüştürün ve koruyun. ZIP, RAR, 7Z, TAR destekler.",
      zh: "创建、解压、编辑、转换和加密 ZIP 压缩包——支持 ZIP、RAR、7Z、TAR、GZ 等格式。"
    }
  },
  Sitemap: {
    title: {
      en: "Sitemap",
      ar: "خريطة الموقع",
      de: "Sitemap",
      es: "Mapa del sitio",
      fr: "Plan du site",
      id: "Peta Situs",
      pt: "Mapa do Site",
      ru: "Карта сайта",
      tr: "Site Haritası",
      zh: "网站地图"
    },
    subtitle: {
      en: "A complete directory of all tools and pages on ConvertAllNow.",
      ar: "دليل كامل لجميع الأدوات والصفحات على ConvertAllNow.",
      de: "Ein vollständiges Verzeichnis aller Tools und Seiten auf ConvertAllNow.",
      es: "Un directorio completo de todas las herramientas y páginas de ConvertAllNow.",
      fr: "Un répertoire complet de tous les outils et pages de ConvertAllNow.",
      id: "Direktori lengkap semua alat dan halaman di ConvertAllNow.",
      pt: "Um diretório completo de todas as ferramentas e páginas no ConvertAllNow.",
      ru: "Полный каталог всех инструментов и страниц ConvertAllNow.",
      tr: "ConvertAllNow üzerindeki tüm araçların ve sayfaların eksiksiz dizini.",
      zh: "ConvertAllNow 上所有工具与页面的完整目录。"
    },
    generalPages: {
      en: "General Pages",
      ar: "الصفحات العامة",
      de: "Allgemeine Seiten",
      es: "Páginas generales",
      fr: "Pages générales",
      id: "Halaman Umum",
      pt: "Páginas Gerais",
      ru: "Основные страницы",
      tr: "Genel Sayfalar",
      zh: "通用页面"
    },
    viewCategory: {
      en: "View Category →",
      ar: "عرض الفئة ←",
      de: "Kategorie anzeigen →",
      es: "Ver categoría →",
      fr: "Voir la catégorie →",
      id: "Lihat Kategori →",
      pt: "Ver Categoria →",
      ru: "Смотреть категорию →",
      tr: "Kategoriyi Gör →",
      zh: "查看分类 →"
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(messagesDir, `${loc}.json`);
  let content = {};
  if (fs.existsSync(filePath)) {
    content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  // Populate translation keys
  Object.keys(translations).forEach(ns => {
    if (!content[ns]) content[ns] = {};
    Object.keys(translations[ns]).forEach(key => {
      const translationObj = translations[ns][key];
      content[ns][key] = translationObj[loc] || translationObj['en'];
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  console.log(`Updated ${loc}.json successfully.`);
});
