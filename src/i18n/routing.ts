import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

// AdSense review mode: only English is public until every translated route has
// completed native-language editorial review. Keep the legacy list solely for
// permanent URL consolidation in middleware.
export const locales = ['en'] as const;
export const legacyLocales = ['es', 'fr', 'zh', 'pt', 'id', 'ru', 'de', 'tr', 'ar'] as const;
export const defaultLocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  alternateLinks: false,
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
