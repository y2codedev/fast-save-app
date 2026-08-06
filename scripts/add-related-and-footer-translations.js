import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const cardTranslations = {
  // Headings and Category Names
  "Related Video & Audio Tools": {
    en: "Related Video & Audio Tools",
    ar: "أدوات الفيديو والصوت ذات الصلة",
    de: "Verwandte Video- & Audio-Tools",
    es: "Herramientas de Video y Audio Relacionadas",
    fr: "Outils Vidéo & Audio Associés",
    id: "Alat Video & Audio Terkait",
    pt: "Ferramentas de Vídeo e Áudio Relacionadas",
    ru: "Похожие видео и аудио инструменты",
    tr: "İlgili Video ve Ses Araçları",
    zh: "相关视频与音频工具"
  },
  "Related Image Tools": {
    en: "Related Image Tools",
    ar: "أدوات الصور ذات الصلة",
    de: "Verwandte Bild-Tools",
    es: "Herramientas de Imagen Relacionadas",
    fr: "Outils Image Associés",
    id: "Alat Gambar Terkait",
    pt: "Ferramentas de Imagem Relacionadas",
    ru: "Похожие инструменты для изображений",
    tr: "İlgili Görsel Araçları",
    zh: "相关图片工具"
  },
  "Related PDF Tools": {
    en: "Related PDF Tools",
    ar: "أدوات PDF ذات الصلة",
    de: "Verwandte PDF-Tools",
    es: "Herramientas de PDF Relacionadas",
    fr: "Outils PDF Associés",
    id: "Alat PDF Terkait",
    pt: "Ferramentas de PDF Relacionadas",
    ru: "Похожие PDF инструменты",
    tr: "İlgili PDF Araçları",
    zh: "相关 PDF 工具"
  },
  "Related Archive Tools": {
    en: "Related Archive Tools",
    ar: "أدوات الأرشيف ذات الصلة",
    de: "Verwandte Archiv-Tools",
    es: "Herramientas de Archivo Relacionadas",
    fr: "Outils d'Archivage Associés",
    id: "Alat Arsip Terkait",
    pt: "Ferramentas de Arquivo Relacionadas",
    ru: "Похожие архивные инструменты",
    tr: "İlgili Arşiv Araçları",
    zh: "相关压缩包工具"
  },
  "Video & Audio Tools": {
    en: "Video & Audio Tools",
    ar: "أدوات الفيديو والصوت",
    de: "Video- & Audio-Tools",
    es: "Herramientas de Video y Audio",
    fr: "Outils Vidéo & Audio",
    id: "Alat Video & Audio",
    pt: "Ferramentas de Vídeo e Áudio",
    ru: "Видео и аудио инструменты",
    tr: "Video ve Ses Araçları",
    zh: "视频与音频工具"
  },
  "Image Tools": {
    en: "Image Tools",
    ar: "أدوات الصور",
    de: "Bild-Tools",
    es: "Herramientas de Imagen",
    fr: "Outils Image",
    id: "Alat Gambar",
    pt: "Ferramentas de Imagem",
    ru: "Инструменты для изображений",
    tr: "Görsel Araçları",
    zh: "图片工具"
  },
  "PDF Tools": {
    en: "PDF Tools",
    ar: "أدوات PDF",
    de: "PDF-Tools",
    es: "Herramientas de PDF",
    fr: "Outils PDF",
    id: "Alat PDF",
    pt: "Ferramentas de PDF",
    ru: "Инструменты PDF",
    tr: "PDF Araçları",
    zh: "PDF 工具"
  },
  "Archive Tools": {
    en: "Archive Tools",
    ar: "أدوات الأرشيف",
    de: "Archiv-Tools",
    es: "Herramientas de Archivo",
    fr: "Outils d'Archivage",
    id: "Alat Arsip",
    pt: "Ferramentas de Arquivo",
    ru: "Архивные инструменты",
    tr: "Arşiv Araçları",
    zh: "压缩包工具"
  },
  "All Tools": {
    en: "All Tools",
    ar: "جميع الأدوات",
    de: "Alle Tools",
    es: "Todas las Herramientas",
    fr: "Tous les Outils",
    id: "Semua Alat",
    pt: "Todas as Ferramentas",
    ru: "Все инструменты",
    tr: "Tüm Araçlar",
    zh: "所有工具"
  },
  "Tool Categories": {
    en: "Tool Categories",
    ar: "فئات الأدوات",
    de: "Werkzeugkategorien",
    es: "Categorías de Herramientas",
    fr: "Catégories d'Outils",
    id: "Kategori Alat",
    pt: "Categorias de Ferramentas",
    ru: "Категории инструментов",
    tr: "Araç Kategorileri",
    zh: "工具分类"
  },

  // Tool Titles & Descriptions
  "Audio Trimmer": {
    en: "Audio Trimmer",
    ar: "مقص الصوت",
    de: "Audio-Trimmer",
    es: "Recortador de Audio",
    fr: "Coupeur Audio",
    id: "Pemotong Audio",
    pt: "Cortador de Áudio",
    ru: "Аудио триммер",
    tr: "Ses Kırpıcı",
    zh: "音频剪辑器"
  },
  "Cut audio files": {
    en: "Cut audio files",
    ar: "قص وتعديل ملفات الصوت",
    de: "Audiodateien schneiden",
    es: "Cortar archivos de audio",
    fr: "Couper des fichiers audio",
    id: "Potong berkas audio",
    pt: "Cortar arquivos de áudio",
    ru: "Обрезка аудиофайлов",
    tr: "Ses dosyalarını kırpın",
    zh: "剪辑音频文件"
  },
  "Audio Converter": {
    en: "Audio Converter",
    ar: "محول الصوت",
    de: "Audio-Konverter",
    es: "Convertidor de Audio",
    fr: "Convertisseur Audio",
    id: "Konverter Audio",
    pt: "Conversor de Áudio",
    ru: "Конвертер аудио",
    tr: "Ses Dönüştürücü",
    zh: "音频转换器"
  },
  "Extract audio from video": {
    en: "Extract audio from video",
    ar: "استخراج الصوت من الفيديو",
    de: "Audio aus Video extrahieren",
    es: "Extraer audio de video",
    fr: "Extraire l'audio d'une vidéo",
    id: "Ekstrak audio dari video",
    pt: "Extrair áudio do vídeo",
    ru: "Извлечение аудио из видео",
    tr: "Videodan ses çıkarın",
    zh: "从视频提取音频"
  },
  "Video to GIF": {
    en: "Video to GIF",
    ar: "فيديو إلى GIF",
    de: "Video in GIF",
    es: "Video a GIF",
    fr: "Vidéo en GIF",
    id: "Video ke GIF",
    pt: "Vídeo para GIF",
    ru: "Видео в GIF",
    tr: "Videodan GIF'e",
    zh: "视频转 GIF"
  },
  "Convert video to GIF": {
    en: "Convert video to GIF",
    ar: "تحويل الفيديو إلى GIF",
    de: "Video in GIF umwandeln",
    es: "Convertir video a GIF",
    fr: "Convertir une vidéo en GIF",
    id: "Konversi video ke GIF",
    pt: "Converter vídeo para GIF",
    ru: "Конвертация видео в GIF",
    tr: "Videoyu GIF'e dönüştürün",
    zh: "将视频转换为 GIF"
  },
  "Video Trimmer": {
    en: "Video Trimmer",
    ar: "مقص الفيديو",
    de: "Video-Trimmer",
    es: "Recortador de Video",
    fr: "Coupeur Vidéo",
    id: "Pemotong Video",
    pt: "Cortador de Vídeo",
    ru: "Видео триммер",
    tr: "Video Kırpıcı",
    zh: "视频剪辑器"
  },
  "Cut and trim videos": {
    en: "Cut and trim videos",
    ar: "قص وتعديل مقاطع الفيديو",
    de: "Videos schneiden und trimmen",
    es: "Cortar y recortar videos",
    fr: "Couper et rogner des vidéos",
    id: "Potong dan pangkas video",
    pt: "Cortar e aparar vídeos",
    ru: "Обрезка и тримминг видео",
    tr: "Videoları kesin ve kırpın",
    zh: "剪辑并裁剪视频"
  },
  "Create ZIP": {
    en: "Create ZIP",
    ar: "إنشاء ZIP",
    de: "ZIP erstellen",
    es: "Crear ZIP",
    fr: "Créer un ZIP",
    id: "Buat ZIP",
    pt: "Criar ZIP",
    ru: "Создать ZIP",
    tr: "ZIP Oluştur",
    zh: "创建 ZIP"
  },
  "Compress files to ZIP": {
    en: "Compress files to ZIP",
    ar: "ضغط الملفات في أرشيف ZIP",
    de: "Dateien in ZIP komprimieren",
    es: "Comprimir archivos a ZIP",
    fr: "Compresser des fichiers en ZIP",
    id: "Kompres berkas ke ZIP",
    pt: "Compactar arquivos para ZIP",
    ru: "Сжатие файлов в ZIP",
    tr: "Dosyaları ZIP'e sıkıştırın",
    zh: "将文件压缩为 ZIP"
  },
  "IG Downloader": {
    en: "IG Downloader",
    ar: "تنزيل من إنستغرام",
    de: "IG-Downloader",
    es: "Descargador de IG",
    fr: "Téléchargeur IG",
    id: "Pengunduh IG",
    pt: "Baixador do IG",
    ru: "Скачать из Instagram",
    tr: "IG İndirici",
    zh: "Instagram 下载器"
  },
  "Download Instagram videos": {
    en: "Download Instagram videos",
    ar: "تنزيل مقاطع فيديو إنستغرام",
    de: "Instagram-Videos herunterladen",
    es: "Descargar videos de Instagram",
    fr: "Télécharger des vidéos Instagram",
    id: "Unduh video Instagram",
    pt: "Baixar vídeos do Instagram",
    ru: "Скачивание видео из Instagram",
    tr: "Instagram videolarını indirin",
    zh: "下载 Instagram 视频"
  },
  "Image Compressor": {
    en: "Image Compressor",
    ar: "ضغط الصور",
    de: "Bildkompressor",
    es: "Compresor de Imagen",
    fr: "Compresseur d'Image",
    id: "Kompresor Gambar",
    pt: "Compressor de Imagem",
    ru: "Компрессор изображений",
    tr: "Görsel Sıkıştırıcı",
    zh: "图片压缩器"
  },
  "Reduce image size": {
    en: "Reduce image size",
    ar: "تقليل حجم الصور",
    de: "Bildgröße reduzieren",
    es: "Reducir el tamaño de imagen",
    fr: "Réduire la taille des images",
    id: "Kurangi ukuran gambar",
    pt: "Reduzir tamanho da imagem",
    ru: "Уменьшение размера изображений",
    tr: "Görsel boyutunu küçültün",
    zh: "压缩图片体积"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [key, map] of Object.entries(cardTranslations)) {
    const val = map[lang] || map['en'];
    json.ToolContent[key] = val;
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved Related Tools card translations in ${lang}.json`);
});
