'use client';

import {useRouter, usePathname} from '@/i18n/routing';
import {useLocale} from 'next-intl';
import {useTransition} from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const languages = [
  { code: 'en', name: 'EN', flagCode: 'us' },
  { code: 'es', name: 'ES', flagCode: 'es' },
  { code: 'fr', name: 'FR', flagCode: 'fr' },
  { code: 'ar', name: 'AR', flagCode: 'sa' },
  { code: 'zh', name: 'ZH', flagCode: 'cn' },
  { code: 'pt', name: 'PT', flagCode: 'pt' },
  { code: 'id', name: 'ID', flagCode: 'id' },
  { code: 'ru', name: 'RU', flagCode: 'ru' },
  { code: 'de', name: 'DE', flagCode: 'de' },
  { code: 'tr', name: 'TR', flagCode: 'tr' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  };

  return (
    <div className="relative inline-block text-start">
      <Menu>
        <MenuButton 
          disabled={isPending}
          className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 sm:py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors border border-gray-200 dark:border-gray-700"
        >
          <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.5/flags/4x3/${currentLang.flagCode}.svg`} width="20" alt={currentLang.name} className="rounded-[2px] shadow-sm" />
          <span>{currentLang.name}</span>
        </MenuButton>

        <MenuItems 
          transition
          className="absolute end-0 z-50 mt-2 w-32 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="p-1 h-60 overflow-y-auto custom-scrollbar">
            {languages.map((lang) => (
              <MenuItem key={lang.code}>
                <button
                  onClick={() => onSelectChange(lang.code)}
                  className="data-[focus]:bg-indigo-50 dark:data-[focus]:bg-indigo-900/30 data-[focus]:text-indigo-700 dark:data-[focus]:text-indigo-300 text-gray-700 dark:text-gray-200 flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors font-semibold"
                >
                  <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/4.1.5/flags/4x3/${lang.flagCode}.svg`} width="20" alt={lang.name} className="me-2.5 rounded-[2px] shadow-sm" />
                  {lang.name}
                </button>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
