import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

// Helper to convert flat keys with dots to nested objects
// This is required because next-intl treats dots in keys as nested paths.
function nestMessages(messages: any) {
  const result: any = {};
  for (const [key, value] of Object.entries(messages)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = nestMessages(value);
    } else {
      const parts = key.split('.');
      let current = result;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      current[parts[parts.length - 1]] = value;
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
