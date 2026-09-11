import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// Helper to convert flat keys with dots to nested objects
// This is required because next-intl treats dots in keys as nested paths.
function nestMessages(messages: any) {
  const result: any = {};
  for (const [key, value] of Object.entries(messages)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const safeNamespaceKey = key.includes('.') ? key.replace(/\./g, '_') : key;
      result[safeNamespaceKey] = nestMessages(value);
    } else {
      // Only nest keys that are valid short dot-separated identifiers (e.g. "Index.title")
      const isSimpleIdentifierKey = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(key);

      if (!isSimpleIdentifierKey) {
        // next-intl reserves dots for nested paths and rejects the entire
        // namespace when a sentence-style or extension key contains one.
        // Those legacy entries are display-text fallbacks handled by useGetT;
        // omit them here so valid semantic translation keys remain usable.
        if (!key.includes('.')) result[key] = value;
      } else {
        const parts = key.split('.');
        let current = result;
        let canNest = true;

        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (current[part] && typeof current[part] !== 'object') {
            canNest = false;
            break;
          }
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }

        if (canNest && typeof current === 'object' && current !== null) {
          current[parts[parts.length - 1]] = value;
        }
      }
    }
  }
  return result;
}

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages: nestMessages(messages)
  };
});
