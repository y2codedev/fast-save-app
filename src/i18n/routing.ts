import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es', 'fr', 'zh', 'pt', 'id', 'ru', 'de', 'tr', 'ar'];
export const defaultLocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
