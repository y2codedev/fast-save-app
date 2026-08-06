import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const tipsMap = {
  "For WhatsApp sharing, aim for a file under 16MB — use the \"Low\" quality preset as a starting point.": {
    ar: "لمشاركة واتساب، استهدف ملفاً يقل حجمه عن 16 ميجابايت — استخدم إعداد الجودة \"منخفضة\" كنقطة بداية.",
    de: "Für das Teilen über WhatsApp empfiehlt sich eine Datei unter 16 MB — nutzen Sie die Einstellung \"Niedrig\" als Ausgangspunkt.",
    es: "Para compartir en WhatsApp, busca un archivo de menos de 16 MB; usa el ajuste de calidad \"Baja\" como punto de partida.",
    fr: "Pour le partage WhatsApp, visitez un fichier de moins de 16 Mo — utilisez le préréglage de qualité \"Basse\" comme point de départ.",
    id: "Untuk berbagi WhatsApp, usahakan file di bawah 16MB — gunakan prasetel kualitas \"Rendah\" sebagai titik awal.",
    pt: "Para compartilhar no WhatsApp, busque um arquivo com menos de 16 MB — use a predefinição de qualidade \"Baixa\" como ponto de partida.",
    ru: "Для отправки через WhatsApp выбирайте файл до 16 МБ — используйте предустановку \"Низкое\" качество.",
    tr: "WhatsApp paylaşımı için 16 MB'ın altında bir dosya hedefleyin — başlangıç noktası olarak \"Düşük\" kalite ayarını kullanın.",
    zh: "对于 WhatsApp 分享，目标是使文件小于 16MB — 使用“低”质量预设作为起点。"
  },
  "Processing is CPU-intensive — close unnecessary browser tabs to speed up compression.": {
    ar: "المعالجة تستهلك موارد المعالج — أغلق تبويبات المتصفح غير الضرورية لتسريع الضغط.",
    de: "Die Verarbeitung ist CPU-intensiv — schließen Sie unnötige Browser-Tabs, um die Komprimierung zu beschleunigen.",
    es: "El procesamiento consume mucha CPU; cierra las pestañas innecesarias del navegador para acelerar la compresión.",
    fr: "Le traitement est gourmand en CPU — fermez les onglets inutiles pour accélérer la compression.",
    id: "Pemrosesan sangat menggunakan CPU — tutup tab browser yang tidak perlu untuk mempercepat kompresi.",
    pt: "O processamento consome muita CPU — feche guias desnecessárias do navegador para acelerar a compressão.",
    ru: "Обработка активно использует процессор — закройте ненужные вкладки браузера для ускорения сжатия.",
    tr: "İşlem CPU yoğundur — sıkıştırmayı hızlandırmak için gereksiz tarayıcı sekmelerini kapatın.",
    zh: "处理过程非常消耗 CPU — 请关闭不必要的浏览器标签页以加快压缩速度。"
  },
  "Longer videos at high resolution will take more time. 4K+ videos may take several minutes.": {
    ar: "الفيديوهات الطويلة ذات الدقة العالية تستغرق وقتاً أطول. فيديوهات 4K+ قد تستغرق عدة دقائق.",
    de: "Längere Videos mit hoher Auflösung dauern länger. 4K+-Videos können mehrere Minuten dauern.",
    es: "Los videos más largos con alta resolución tomarán más tiempo. Los videos en 4K+ pueden tardar varios minutos.",
    fr: "Les vidéos plus longues à haute résolution prendront plus de temps. Les vidéos 4K+ peuvent prendre plusieurs minutes.",
    id: "Video yang lebih panjang dengan resolusi tinggi akan memakan waktu lebih lama. Video 4K+ mungkin memakan waktu beberapa menit.",
    pt: "Vídeos mais longos em alta resolução levarão mais tempo. Vídeos 4K+ podem levar vários minutos.",
    ru: "Более длинные видео с высоким разрешением требуют больше времени. Видео 4K+ может занять несколько минут.",
    tr: "Yüksek çözünürlüklü daha uzun videolar daha fazla zaman alır. 4K+ videolar birkaç dakika sürebilir.",
    zh: "高分辨率的长视频需要更多时间。4K+ 视频可能需要几分钟。"
  },
  "For best results, trim your video first to remove unwanted segments before compressing.": {
    ar: "للحصول على أفضل النتائج، قم بقص الفيديو أولاً لإزالة الأجزاء غير المرغوب فيها قبل الضغط.",
    de: "Für beste Ergebnisse schneiden Sie Ihr Video zuerst zu, um unerwünschte Teile vor der Komprimierung zu entfernen.",
    es: "Para obtener mejores resultados, recorta primero tu video para eliminar segmentos no deseados antes de comprimirlo.",
    fr: "Pour de meilleurs résultats, coupez d'abord votre vidéo pour supprimer les segments indésirables avant de la compresser.",
    id: "Untuk hasil terbaik, pangkas video Anda terlebih dahulu untuk menghapus bagian yang tidak diinginkan sebelum dikompresi.",
    pt: "Para obter melhores resultados, corte seu vídeo primeiro para remover segmentos indesejados antes de comprimir.",
    ru: "Для достижения наилучших результатов сначала обрежьте видео, чтобы удалить ненужные фрагменты перед сжатием.",
    tr: "En iyi sonuçlar için, sıkıştırmadan önce istenmeyen bölümleri kaldırmak üzere videonuzu önce kırpın.",
    zh: "为了获得最佳效果，请在压缩前先剪辑视频以删除不需要的片段。"
  },
  "Try compressing at Medium quality first — if the size is still too large, try Low quality.": {
    ar: "جرب الضغط بالجودة المتوسطة أولاً — إذا كان الحجم كبيراً جداً، جرب الجودة المنخفضة.",
    de: "Versuchen Sie zuerst die Komprimierung mit mittlerer Qualität — ist die Datei noch zu groß, wählen Sie niedrige Qualität.",
    es: "Intenta comprimir con calidad Media primero; si el tamaño aún es demasiado grande, prueba con calidad Baja.",
    fr: "Essayez d'abord de compresser en qualité Moyenne — si la taille est encore trop grande, essayez la qualité Basse.",
    id: "Coba kompresi dengan kualitas Sedang terlebih dahulu — jika ukurannya masih terlalu besar, coba kualitas Rendah.",
    pt: "Tente comprimir com qualidade Média primeiro — se o tamanho ainda for muito grande, tente qualidade Baixa.",
    ru: "Сначала попробуйте сжатие со Средним качеством — если размер все еще велик, попробуйте Низкое качество.",
    tr: "Önce Orta kalitede sıkıştırmayı deneyin — boyut hala çok büyükse, Düşük kaliteyi deneyin.",
    zh: "首先尝试以中等质量压缩 — 如果体积仍然过大，请尝试低质量。"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [rawKey, valMap] of Object.entries(tipsMap)) {
    const val = valMap[lang] || valMap['ar'] || rawKey;
    const cleanKey = rawKey.trim().replace(/\.$/, '');
    const cleanVal = val.trim().replace(/\.$/, '');

    json.ToolContent[rawKey] = val;
    json.ToolContent[cleanKey] = cleanVal;
    json.ToolContent[cleanKey + '.'] = cleanVal + '.';
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved 100% complete Pro Tips in ${lang}.json`);
});
