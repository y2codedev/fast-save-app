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
      messages?.HomeSEO,
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
      messages?.DataFormatter,
      messages?.Navigation,
      messages?.CommonContent,
    ];

    const clean = key.trim();
    const noDot = clean.replace(/\.$/, '');
    const withDot = noDot + '.';
    const noQ = clean.replace(/\?$/, '');
    const withQ = noQ + '?';
    const withArabicQ = noQ + '؟';
    const noEllipsis = clean.replace(/\.\.\.$/, '');
    const withEllipsis = noEllipsis + '...';

    const initialCandidates = [
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

    const candidates = Array.from(
      new Set([
        ...initialCandidates,
        ...initialCandidates.map((c) => (typeof c === 'string' ? c.replace(/\./g, '_') : c)),
        ...initialCandidates.map((c) => (typeof c === 'string' ? c.replace(/\./g, '') : c)),
      ])
    );

    for (const ns of namespaces) {
      if (!ns || typeof ns !== 'object') continue;
      for (const cand of candidates) {
        if (ns[cand] && typeof ns[cand] === 'string') {
          return ns[cand];
        }
      }
    }

    try {
      const safeKey = typeof key === 'string' ? key.replace(/\./g, '_') : key;
      if (tContent.has(safeKey)) return tContent(safeKey);
      if (tContent.has(key)) return tContent(key);
    } catch {
      // Ignore Next-Intl dot splitting or missing key throw
    }

    return key;
  };
}
