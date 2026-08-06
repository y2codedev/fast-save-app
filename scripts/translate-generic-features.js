import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const genericFeaturesMap = {
  "All processing happens locally in your browser. Your files never leave your device.": {
    ar: "تتم جميع عمليات المعالجة محلياً في متصفحك. لا تغادر ملفاتك جهازك أبداً.",
    de: "Die gesamte Verarbeitung erfolgt lokal in Ihrem Browser. Ihre Dateien verlassen niemals Ihr Gerät.",
    es: "Todo el procesamiento se realiza localmente en tu navegador. Tus archivos nunca salen de tu dispositivo.",
    fr: "Tout le traitement se produit localement dans votre navigateur. Vos fichiers ne quittent jamais votre appareil.",
    id: "Semua pemrosesan terjadi secara lokal di browser Anda. Berkas Anda tidak pernah meninggalkan perangkat Anda.",
    pt: "Todo o processamento ocorre localmente no seu navegador. Seus arquivos nunca saem do seu dispositivo.",
    ru: "Вся обработка происходит локально в вашем браузере. Ваши файлы никогда не покидают ваше устройство.",
    tr: "Tüm işlemler yerel olarak tarayıcınızda gerçekleşir. Dosyalarınız asla cihazınızdan ayrılmaz.",
    zh: "所有处理均在您的浏览器中本地完成。您的文件绝不会离开您的设备。"
  },
  "Use the tool as many times as you want without any restrictions or fees.": {
    ar: "استخدم الأداة أي عدد تريد من المرات دون أي قيود أو رسوم.",
    de: "Nutzen Sie das Tool so oft Sie möchten, ohne Einschränkungen oder Gebühren.",
    es: "Usa la herramienta tantas veces como quieras sin restricciones ni tarifas.",
    fr: "Utilisez l'outil autant de fois que vous le souhaitez sans restriction ni frais.",
    id: "Gunakan alat ini sebanyak yang Anda inginkan tanpa batasan atau biaya.",
    pt: "Use a ferramenta quantas vezes quiser sem restrições ou taxas.",
    ru: "Используйте инструмент сколько угодно раз без каких-либо ограничений и платы.",
    tr: "Aracı herhangi bir kısıtlama veya ücret olmadan istediğiniz kadar kullanın.",
    zh: "随心所欲多次使用此工具，没有数量限制或任何费用。"
  },
  "Leverages your device's hardware for near-instant results.": {
    ar: "يستخدم موارد جهازك للحصول على نتائج شبه فورية.",
    de: "Nutzt die Hardware Ihres Geräts für nahezu sofortige Ergebnisse.",
    es: "Aprovecha el hardware de tu dispositivo para obtener resultados casi instantáneos.",
    fr: "Exploite le matériel de votre appareil pour des résultats quasi instantanés.",
    id: "Memanfaatkan perangkat keras Anda untuk hasil yang hampir instan.",
    pt: "Aproveita o hardware do seu dispositivo para resultados quase instantâneos.",
    ru: "Использует аппаратные ресурсы вашего устройства для почти мгновенных результатов.",
    tr: "Neredeyse anında sonuçlar için cihazınızın donanımından yararlanır.",
    zh: "充分利用您的设备硬件性能，提供近乎立竿见影的处理结果。"
  },
  "Works directly in Chrome, Safari, Firefox, and Edge on any device.": {
    ar: "يعمل مباشرة في Chrome و Safari و Firefox و Edge على أي جهاز.",
    de: "Funktioniert direkt in Chrome, Safari, Firefox und Edge auf jedem Gerät.",
    es: "Funciona directamente en Chrome, Safari, Firefox y Edge en cualquier dispositivo.",
    fr: "Fonctionne directement dans Chrome, Safari, Firefox et Edge sur n'importe quel appareil.",
    id: "Bekerja langsung di Chrome, Safari, Firefox, dan Edge di perangkat apa pun.",
    pt: "Funciona diretamente no Chrome, Safari, Firefox e Edge em qualquer dispositivo.",
    ru: "Работает непосредственно в Chrome, Safari, Firefox и Edge на любом устройстве.",
    tr: "Herhangi bir cihazda Chrome, Safari, Firefox ve Edge'de doğrudan çalışır.",
    zh: "直接在任何设备上的 Chrome、Safari、Firefox 和 Edge 中稳定运行。"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [rawKey, valMap] of Object.entries(genericFeaturesMap)) {
    const val = valMap[lang] || valMap['ar'] || rawKey;
    const cleanKey = rawKey.trim().replace(/\.$/, '');
    const cleanVal = val.trim().replace(/\.$/, '');

    json.ToolContent[rawKey] = val;
    json.ToolContent[cleanKey] = cleanVal;
    json.ToolContent[cleanKey + '.'] = cleanVal + '.';
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Saved generic feature translations in ${lang}.json`);
});
