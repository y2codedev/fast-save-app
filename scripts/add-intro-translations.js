import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const intros = {
  introP1: {
    en: "{toolName} is a free online tool to process your files securely in your browser. Our tool ensures your data remains private while delivering fast results. No installation or registration is required.",
    ar: "{toolName} هي أداة مجانية عبر الإنترنت لمعالجة ملفاتك بأمان في متصفحك. تضمن أداتنا بقاء بياناتك خاصة مع تقديم نتائج سريعة. لا يلزم التثبيت أو التسجيل.",
    de: "{toolName} ist ein kostenloses Online-Tool zur sicheren Verarbeitung Ihrer Dateien in Ihrem Browser. Unser Tool stellt sicher, dass Ihre Daten privat bleiben.",
    es: "{toolName} es una herramienta gratuita en línea para procesar sus archivos de forma segura en su navegador. Nuestra herramienta garantiza que sus datos se mantengan privados.",
    fr: "{toolName} est un outil en ligne gratuit pour traiter vos fichiers en toute sécurité dans votre navigateur. Notre outil garantit la confidentialité de vos données.",
    id: "{toolName} adalah alat online gratis untuk memproses file Anda dengan aman di browser Anda. Alat kami memastikan data Anda tetap pribadi.",
    pt: "{toolName} é uma ferramenta online gratuita para processar seus arquivos com segurança em seu navegador. Nossa ferramenta garante que seus dados permaneçam privados.",
    ru: "{toolName} — это бесплатный онлайн-инструмент для безопасной обработки ваших файлов в браузере. Наш инструмент гарантирует конфиденциальность ваших данных.",
    tr: "{toolName}, dosyalarınızı tarayıcınızda güvenle işlemek için ücretsiz bir çevrimiçi araçtır. Aracımız verilerinizin gizli kalmasını sağlar.",
    zh: "{toolName} 是一个免费的在线工具，可在浏览器中安全地处理您的文件。我们的工具确保您的数据保持私密，同时提供快速的结果。"
  },
  introP2: {
    en: "This tool operates entirely on your device using advanced web technologies. This means your files are never uploaded to our servers, eliminating privacy risks and avoiding file size limits typically imposed by cloud services.",
    ar: "تعمل هذه الأداة بالكامل على جهازك باستخدام تقنيات الويب المتقدمة. هذا يعني عدم تحميل ملفاتك أبدًا إلى خوادمنا، مما يلغي مخاطر الخصوصية وتجنب قيود حجم الملفات.",
    de: "Dieses Tool läuft vollständig auf Ihrem Gerät mit fortschrittlichen Webtechnologien. Ihre Dateien werden nie auf unsere Server hochgeladen.",
    es: "Esta herramienta funciona completamente en tu dispositivo utilizando tecnologías web avanzadas. Tus archivos nunca se suben a nuestros servidores.",
    fr: "Cet outil fonctionne entièrement sur votre appareil grâce à des technologies web avancées. Vos fichiers ne sont jamais téléchargés sur nos serveurs.",
    id: "Alat ini beroperasi sepenuhnya di perangkat Anda menggunakan teknologi web canggih. File Anda tidak pernah diunggah ke server kami.",
    pt: "Esta ferramenta opera inteiramente no seu dispositivo usando tecnologias web avançadas. Seus arquivos nunca são enviados para nossos servidores.",
    ru: "Этот инструмент работает полностью на вашем устройстве с использованием передовых веб-технологий. Ваши файлы никогда не загружаются на наши серверы.",
    tr: "Bu araç, gelişmiş web teknolojilerini kullanarak tamamen cihazınızda çalışır. Dosyalarınız asla sunucularımıza yüklenmez.",
    zh: "该工具利用先进的 Web 技术完全在您的设备上运行。这意味着您的文件绝不会上传到我们的服务器。"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  json.ToolContent.introP1 = intros.introP1[lang] || intros.introP1['en'];
  json.ToolContent.introP2 = intros.introP2[lang] || intros.introP2['en'];

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated introP1/introP2 in ${lang}.json`);
});
