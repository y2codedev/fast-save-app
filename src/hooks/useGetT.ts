'use client';

import React from 'react';
import { useLocale, useMessages, useTranslations } from 'next-intl';

export function useGetT() {
  const locale = useLocale();
  const messages = (useMessages() || {}) as Record<string, any>;
  const tContent = useTranslations('ToolContent');

  return (key?: string | React.ReactNode | any): any => {
    if (!key || typeof key !== 'string') return key;
    if (locale === 'en') return key;

    const namespaces = [
      messages?.ToolContent,
      messages?.RelatedTools,
      messages?.Navigation,
      messages?.Footer,
      messages?.Common,
      messages?.ConverterUI,
      messages?.Index,
      messages?.CategoryHubs,
      messages?.FileUploader,
      messages?.TopHeader,
      messages?.Hero,
      messages?.Steps,
      messages?.Form,
      messages?.Explore,
    ];

    const clean = key.trim();
    const noDot = clean.replace(/\.$/, '');
    const withDot = noDot + '.';
    const noQ = clean.replace(/\?$/, '');
    const withQ = noQ + '?';
    const withArabicQ = noQ + '؟';
    const noEllipsis = clean.replace(/\.\.\.$/, '');
    const withEllipsis = noEllipsis + '...';

    const candidates = [
      key,
      clean,
      noDot,
      withDot,
      noQ,
      withQ,
      withArabicQ,
      noEllipsis,
      withEllipsis,
    ];

    for (const ns of namespaces) {
      if (!ns || typeof ns !== 'object') continue;
      for (const cand of candidates) {
        if (ns[cand] && typeof ns[cand] === 'string') {
          return ns[cand];
        }
      }
    }

    try {
      if (tContent.has(key)) return tContent(key);
    } catch {
      // Ignore Next-Intl dot splitting or missing key throw
    }

    return key;
  };
}
