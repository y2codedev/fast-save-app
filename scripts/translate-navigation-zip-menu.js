import fs from 'fs';
import path from 'path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar', 'de', 'es', 'fr', 'id', 'pt', 'ru', 'tr', 'zh'];

const navZipTranslations = {
  "All ZIP tools": {
    en: "All ZIP tools",
    ar: "جميع أدوات ZIP",
    de: "Alle ZIP-Tools",
    es: "Todas las herramientas ZIP",
    fr: "Tous les outils ZIP",
    id: "Semua Alat ZIP",
    pt: "Todas as ferramentas ZIP",
    ru: "Все инструменты ZIP",
    tr: "Tüm ZIP Araçları",
    zh: "所有 ZIP 工具"
  },
  "CONVERT TO ZIP": {
    en: "CONVERT TO ZIP",
    ar: "التحويل إلى ZIP",
    de: "IN ZIP UMWANDELN",
    es: "CONVERTIR A ZIP",
    fr: "CONVERTIR EN ZIP",
    id: "KONVERSI KE ZIP",
    pt: "CONVERTER PARA ZIP",
    ru: "КОНВЕРТИРОВАТЬ В ZIP",
    tr: "ZIP'E DÖNÜŞTÜR",
    zh: "转换为 ZIP"
  },
  "CONVERT FROM ZIP": {
    en: "CONVERT FROM ZIP",
    ar: "التحويل من ZIP",
    de: "AUS ZIP UMWANDELN",
    es: "CONVERTIR DESDE ZIP",
    fr: "CONVERTIR DEPUIS ZIP",
    id: "KONVERSI DARI ZIP",
    pt: "CONVERTER DE ZIP",
    ru: "КОНВЕРТИРОВАТЬ ИЗ ZIP",
    tr: "ZIP'TEN DÖNÜŞTÜR",
    zh: "从 ZIP 转换"
  },
  "ORGANIZE ZIP": {
    en: "ORGANIZE ZIP",
    ar: "تنظيم ملفات ZIP",
    de: "ZIP ORGANISIEREN",
    es: "ORGANIZAR ZIP",
    fr: "ORGANISER ZIP",
    id: "ORGANISASI ZIP",
    pt: "ORGANIZAR ZIP",
    ru: "ОРГАНИЗАЦИЯ ZIP",
    tr: "ZIP DÜZENLE",
    zh: "管理 ZIP"
  },
  "ZIP SECURITY": {
    en: "ZIP SECURITY",
    ar: "أمان وقفل ZIP",
    de: "ZIP-SICHERHEIT",
    es: "SEGURIDAD DE ZIP",
    fr: "SÉCURITÉ ZIP",
    id: "KEAMANAN ZIP",
    pt: "SEGURANÇA DO ZIP",
    ru: "БЕЗОПАСНОСТЬ ZIP",
    tr: "ZIP GÜVENLİĞİ",
    zh: "ZIP 加密与安全"
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
  "Create new ZIP archive": {
    en: "Create new ZIP archive",
    ar: "إنشاء أرشيف مضغوط جديد",
    de: "Neues ZIP-Archiv erstellen",
    es: "Crear un nuevo archivo ZIP",
    fr: "Créer une nouvelle archive ZIP",
    id: "Buat arsip ZIP baru",
    pt: "Criar novo arquivo ZIP",
    ru: "Создать новый ZIP-архив",
    tr: "Yeni ZIP arşivi oluştur",
    zh: "创建全新的 ZIP 压缩包"
  },
  "Unzip ZIP": {
    en: "Unzip ZIP",
    ar: "فك ضغط ZIP",
    de: "ZIP entpacken",
    es: "Descomprimir ZIP",
    fr: "Décompresser ZIP",
    id: "Ekstrak ZIP",
    pt: "Descompactar ZIP",
    ru: "Распаковать ZIP",
    tr: "ZIP Çıkar",
    zh: "解压 ZIP"
  },
  "Extract ZIP files": {
    en: "Extract ZIP files",
    ar: "استخراج جميع ملفات ZIP",
    de: "ZIP-Dateien entpacken",
    es: "Extraer archivos del ZIP",
    fr: "Extraire les fichiers du ZIP",
    id: "Ekstrak berkas ZIP",
    pt: "Extrair arquivos ZIP",
    ru: "Извлечь файлы из ZIP",
    tr: "ZIP dosyalarını çıkarın",
    zh: "解压提取 ZIP 文件"
  },
  "Edit ZIP": {
    en: "Edit ZIP",
    ar: "تعديل ZIP",
    de: "ZIP bearbeiten",
    es: "Editar ZIP",
    fr: "Modifier ZIP",
    id: "Edit ZIP",
    pt: "Editar ZIP",
    ru: "Редактировать ZIP",
    tr: "ZIP Düzenle",
    zh: "编辑 ZIP"
  },
  "Modify ZIP contents": {
    en: "Modify ZIP contents",
    ar: "تعديل وإضافة ملفات في ZIP",
    de: "ZIP-Inhalte ändern",
    es: "Modificar contenido del ZIP",
    fr: "Modifier le contenu du ZIP",
    id: "Ubah konten ZIP",
    pt: "Modificar conteúdo do ZIP",
    ru: "Изменение содержимого ZIP",
    tr: "ZIP içeriğini değiştirin",
    zh: "修改 ZIP 内部文件"
  },
  "Merge ZIP": {
    en: "Merge ZIP",
    ar: "دمج ملفات ZIP",
    de: "ZIP zusammenfügen",
    es: "Combinar ZIP",
    fr: "Fusionner ZIP",
    id: "Gabung ZIP",
    pt: "Mesclar ZIP",
    ru: "Объединить ZIP",
    tr: "ZIP Birleştir",
    zh: "合并 ZIP"
  },
  "Combine ZIP files": {
    en: "Combine ZIP files",
    ar: "دمج عدة أرشيفات ZIP في ملف واحد",
    de: "Mehrere ZIP-Dateien zusammenführen",
    es: "Combinar varios archivos ZIP",
    fr: "Combiner plusieurs fichiers ZIP",
    id: "Gabungkan berkas ZIP",
    pt: "Combinar arquivos ZIP",
    ru: "Объединение ZIP-файлов",
    tr: "ZIP dosyalarını birleştirin",
    zh: "合并多个 ZIP 压缩包"
  },
  "Split ZIP": {
    en: "Split ZIP",
    ar: "تقسيم ZIP",
    de: "ZIP teilen",
    es: "Dividir ZIP",
    fr: "Partager ZIP",
    id: "Bagi ZIP",
    pt: "Dividir ZIP",
    ru: "Разделить ZIP",
    tr: "ZIP Böl",
    zh: "分割 ZIP"
  },
  "Divide ZIP archives": {
    en: "Divide ZIP archives",
    ar: "تقسيم أرشيف ZIP إلى أجزاء أصغر",
    de: "ZIP-Archive aufteilen",
    es: "Dividir archivos ZIP en partes",
    fr: "Diviser les archives ZIP",
    id: "Bagi arsip ZIP",
    pt: "Dividir arquivos ZIP",
    ru: "Разделение ZIP-архива",
    tr: "ZIP arşivlerini bölün",
    zh: "将 ZIP 压缩包拆分为多卷"
  },
  "View ZIP": {
    en: "View ZIP",
    ar: "معاينة ZIP",
    de: "ZIP anzeigen",
    es: "Ver ZIP",
    fr: "Voir ZIP",
    id: "Lihat ZIP",
    pt: "Ver ZIP",
    ru: "Просмотреть ZIP",
    tr: "ZIP Görüntüle",
    zh: "预览 ZIP"
  },
  "Inspect ZIP contents": {
    en: "Inspect ZIP contents",
    ar: "استكشاف محتويات ZIP",
    de: "ZIP-Inhalte durchsuchen",
    es: "Inspeccionar contenido del ZIP",
    fr: "Inspecter le contenu du ZIP",
    id: "Periksa konten ZIP",
    pt: "Inspecionar conteúdo do ZIP",
    ru: "Просмотр содержимого ZIP",
    tr: "ZIP içeriğini inceleyin",
    zh: "查看 ZIP 内部目录与文件"
  },
  "Protect ZIP": {
    en: "Protect ZIP",
    ar: "حماية ZIP",
    de: "ZIP schützen",
    es: "Proteger ZIP",
    fr: "Protéger ZIP",
    id: "Lindungi ZIP",
    pt: "Proteger ZIP",
    ru: "Защитить ZIP",
    tr: "ZIP Koru",
    zh: "加密 ZIP"
  },
  "Add password to ZIP": {
    en: "Add password to ZIP",
    ar: "إضافة كلمة مرور لتشفير ZIP",
    de: "Passwort zu ZIP hinzufügen",
    es: "Agregar contraseña al ZIP",
    fr: "Ajouter un mot de passe au ZIP",
    id: "Tambah kata sandi ke ZIP",
    pt: "Adicionar senha ao ZIP",
    ru: "Добавить пароль к ZIP-архиву",
    tr: "ZIP'e şifre ekleyin",
    zh: "给 ZIP 设置密码保护"
  },
  "Unlock ZIP": {
    en: "Unlock ZIP",
    ar: "فك كلمة مرور ZIP",
    de: "ZIP entsperren",
    es: "Desbloquear ZIP",
    fr: "Déverrouiller ZIP",
    id: "Buka ZIP",
    pt: "Desbloquear ZIP",
    ru: "Разблокировать ZIP",
    tr: "ZIP Kilidini Aç",
    zh: "解密 ZIP"
  },
  "Remove ZIP password": {
    en: "Remove ZIP password",
    ar: "إزالة كلمة المرور من ZIP",
    de: "ZIP-Passwort entfernen",
    es: "Eliminar contraseña de ZIP",
    fr: "Supprimer le mot de passe ZIP",
    id: "Hapus kata sandi ZIP",
    pt: "Remover senha do ZIP",
    ru: "Снять пароль с ZIP-архива",
    tr: "ZIP şifresini kaldırın",
    zh: "移除 ZIP 的密码"
  },
  "RAR format": { en: "RAR format", ar: "تنسيق RAR" },
  "7Z format": { en: "7Z format", ar: "تنسيق 7Z" },
  "TAR format": { en: "TAR format", ar: "تنسيق TAR" },
  "GZ format": { en: "GZ format", ar: "تنسيق GZ" },
  "BZ2 format": { en: "BZ2 format", ar: "تنسيق BZ2" },
  "XZ format": { en: "XZ format", ar: "تنسيق XZ" },
  "ISO format": { en: "ISO format", ar: "تنسيق ISO" },
  "Convert RAR format": { en: "Convert RAR format", ar: "تحويل تنسيق RAR" },
  "Convert 7Z format": { en: "Convert 7Z format", ar: "تحويل تنسيق 7Z" },
  "Convert TAR format": { en: "Convert TAR format", ar: "تحويل تنسيق TAR" },
  "Convert GZ format": { en: "Convert GZ format", ar: "تحويل تنسيق GZ" },
  "Convert BZ2 format": { en: "Convert BZ2 format", ar: "تحويل تنسيق BZ2" },
  "Convert XZ format": { en: "Convert XZ format", ar: "تحويل تنسيق XZ" },
  "Convert ISO format": { en: "Convert ISO format", ar: "تحويل تنسيق ISO" }
};

locales.forEach(lang => {
  const filePath = path.join(messagesDir, `${lang}.json`);
  if (!fs.existsSync(filePath)) return;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!json.Navigation) json.Navigation = {};

  for (const [key, map] of Object.entries(navZipTranslations)) {
    json.Navigation[key] = map[lang] || map['ar'] || map['en'];
  }

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated Navigation ZIP menu keys in ${lang}.json`);
});
