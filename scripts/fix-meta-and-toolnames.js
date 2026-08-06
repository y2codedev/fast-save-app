import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const metaTranslations = {
  badgeText: {
    en: "100% Free & Secure",
    ar: "مجاني وآمن 100%",
    de: "100% Kostenlos & Sicher",
    es: "100% Gratis y Seguro",
    fr: "100% Gratuit et Sécurisé",
    id: "100% Gratis & Aman",
    pt: "100% Gratuito e Seguro",
    ru: "100% Бесплатно и Безопасно",
    tr: "%100 Ücretsiz ve Güvenli",
    zh: "100% 免费且安全"
  },
  byAuthor: {
    en: "By ConvertAllNow Team",
    ar: "بواسطة فريق ConvertAllNow",
    de: "Vom ConvertAllNow Team",
    es: "Por el equipo de ConvertAllNow",
    fr: "Par l'équipe ConvertAllNow",
    id: "Oleh Tim ConvertAllNow",
    pt: "Pela equipe ConvertAllNow",
    ru: "От команды ConvertAllNow",
    tr: "ConvertAllNow Ekibi Tarafından",
    zh: "由 ConvertAllNow 团队提供"
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
  privacyAndSecurity: {
    en: "Privacy & Security",
    ar: "الخصوصية والأمان",
    de: "Datenschutz & Sicherheit",
    es: "Privacidad y Seguridad",
    fr: "Confidentialité et Sécurité",
    id: "Privasi & Keamanan",
    pt: "Privacidade e Segurança",
    ru: "Конфиденциальность и Безопасность",
    tr: "Gizlilik ve Güvenlik",
    zh: "隐私与安全"
  },
  proTips: {
    en: "Pro Tips",
    ar: "نصائح احترافية",
    de: "Profi-Tipps",
    es: "Consejos Pro",
    fr: "Conseils de Pro",
    id: "Tips Pro",
    pt: "Dicas Pro",
    ru: "Советы экспертов",
    tr: "İpuçları",
    zh: "实用技巧"
  },
  commonUseCases: {
    en: "Common Use Cases",
    ar: "حالات الاستخدام الشائعة",
    de: "Häufige Anwendungsfälle",
    es: "Casos de Uso Comunes",
    fr: "Cas d'utilisation courants",
    id: "Kasus Penggunaan Umum",
    pt: "Casos de Uso Comuns",
    ru: "Частые сценарии использования",
    tr: "Yaygın Kullanım Alanları",
    zh: "常见应用场景"
  },
  supportedFormats: {
    en: "Supported Formats",
    ar: "الصيغ المدعومة",
    de: "Unterstützte Formate",
    es: "Formatos Admitidos",
    fr: "Formats pris en charge",
    id: "Format yang Didukung",
    pt: "Formatos Suportados",
    ru: "Поддерживаемые форматы",
    tr: "Desteklenen Formatlar",
    zh: "支持的格式"
  },
  faq: {
    en: "Frequently Asked Questions",
    ar: "الأسئلة الشائعة",
    de: "Häufig gestellte Fragen",
    es: "Preguntas Frecuentes",
    fr: "Foire Aux Questions",
    id: "Pertanyaan yang Sering Diajukan",
    pt: "Perguntas Frequentes",
    ru: "Часто задаваемые вопросы",
    tr: "Sıkça Sorulan Sorular",
    zh: "常见问题解答"
  },
  faqSubtitle: {
    en: "Frequently asked questions about {toolName}.",
    ar: "الأسئلة الشائعة حول {toolName}.",
    de: "Häufig gestellte Fragen zu {toolName}.",
    es: "Preguntas frecuentes sobre {toolName}.",
    fr: "Questions fréquemment posées sur {toolName}.",
    id: "Pertanyaan yang sering diajukan tentang {toolName}.",
    pt: "Perguntas frequentes sobre {toolName}.",
    ru: "Часто задаваемые вопросы о {toolName}.",
    tr: "{toolName} hakkında sıkça sorulan sorular.",
    zh: "关于 {toolName} 的常见问题。"
  },
  whatIs: {
    en: "What is {toolName}?",
    ar: "ما هو {toolName}؟",
    de: "Was ist {toolName}?",
    es: "¿Qué es {toolName}?",
    fr: "Qu'est-ce que {toolName} ?",
    id: "Apa itu {toolName}?",
    pt: "O que é {toolName}?",
    ru: "Что такое {toolName}?",
    tr: "{toolName} Nedir?",
    zh: "什么是 {toolName}？"
  },

  // Tool Names Map
  "Video Compressor": {
    en: "Video Compressor",
    ar: "ضاغط الفيديو",
    de: "Videokompressor",
    es: "Compresor de Video",
    fr: "Compresseur Vidéo",
    id: "Kompresor Video",
    pt: "Compressor de Vídeo",
    ru: "Видеокомпрессор",
    tr: "Video Sıkıştırıcı",
    zh: "视频压缩器"
  }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.ToolContent) json.ToolContent = {};

  for (const [key, map] of Object.entries(metaTranslations)) {
    json.ToolContent[key] = map[lang] || map['en'];
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated meta translations in ${lang}.json`);
});
