---
name: fast-save-development
description: Build, modify, or debug conversion tools and site features in the ConvertAllNow (fast-save-app) repository. Use for work on its Next.js routes, browser-based media or archive processing, internationalization, SEO, navigation, and related tool registries.
---

# Fast Save Development

Work with the repository's existing patterns before introducing a new abstraction. Inspect the closest tool in the same category and reuse its page composition, converter UI, error handling, and download behavior where they fit.

## Architecture

- The app uses Next.js 15 App Router, React 18, TypeScript, Tailwind CSS, and `next-intl`.
- Localized pages live under `src/app/[locale]/(root)/<route>/`.
- Interactive converters normally live in `src/components/sections/` and must use `"use client"` when they depend on browser APIs, files, canvas, workers, or React client hooks.
- Shared route metadata and structured data helpers live in `src/lib/seo.ts` and `src/components/seo/`.
- The navigation and sitemap tool registry is `src/lib/constants.ts`; related-tool and keyword registries are in `src/lib/seo.ts`.
- Translation catalogs are `messages/<locale>.json`. Supported locales come from `src/i18n/routing.ts`; do not maintain a separate locale list.
- WASM-heavy work may use `src/workers/`, `public/wasm/`, `src/lib/zip-tools.ts`, and `src/utils/load-ffmpeg.ts`.

## Adding or Changing a Tool

Trace every integration point rather than treating a route as self-contained:

1. Inspect a working sibling tool in the same category.
2. Put browser processing in a client component and keep the localized route page server-rendered when practical.
3. For a new route, add the localized page under `src/app/[locale]/(root)/`, then register it in `ALL_TOOLS` in `src/lib/constants.ts` so navigation and the generated sitemap can discover it.
4. Add its keyword and related-tool entries in `src/lib/seo.ts` when the page uses those registries. Use the route slug as the key.
5. Add user-facing strings and an SEO namespace to every locale catalog. Keep namespace/key shapes identical across catalogs. Do not run a bulk translation script unless the requested change requires it and its behavior has been inspected first.
6. Build metadata with `getCanonicalUrl`, `getAlternateLanguages`, and `getOgLocale`. Preserve the default-English no-prefix URL behavior.
7. Include only structured data that the visible page supports. Reuse `SchemaMarkup`, `WebPageSchema`, `BreadcrumbSchema`, `HowToSchema`, and `FAQSchema` as applicable.
8. If the tool needs `SharedArrayBuffer`, FFmpeg, or 7z WASM, update the localized and unlocalized COOP/COEP route coverage in `next.config.ts`. Remember that `src/middleware.ts` also sets these headers broadly; check both locations before changing header behavior.

## File Processing Constraints

- Prefer local browser processing when the selected libraries make it feasible; do not claim that files stay on-device if code sends them to an API.
- Validate file type, size, empty input, and invalid options before expensive work. Surface actionable errors and always restore loading/progress state on failure.
- Revoke object URLs, terminate workers, and release large buffers when no longer needed.
- Avoid importing Node-only modules into client bundles. The webpack config intentionally disables several Node fallbacks.
- Preserve output extensions, MIME types, and download filenames consistently with the actual generated format.
- Do not silently reduce quality, discard pages/files, or alter security settings to make conversion succeed.

## Localization and Links

- Use `next-intl` translations for visible converter UI and SEO metadata. A temporary English-only string is not a completed localization change.
- Use navigation exports from `src/i18n/routing.ts` for internal links when locale preservation matters.
- Keep catalog JSON valid and avoid dotted translation keys unless their nesting behavior in `src/i18n/request.ts` is intentional.
- When adding a locale, update routing and every message catalog dependency, then verify canonical, alternate, middleware matcher, and header patterns.

## Verification

Run the smallest checks that cover the change, then broaden when risk warrants it:

```bash
npx tsc --noEmit
npm run build
```

The Next.js config currently has `typescript.ignoreBuildErrors: true`, so a successful production build does not replace the explicit TypeScript check. `npm run lint` invokes `next lint`, which is not a reliable verifier for this Next.js version unless the repository's lint setup is updated.

For converter changes, also exercise one valid file, one rejected file, reset/retry behavior, and the downloaded artifact in a browser. For localized or SEO work, check English plus at least one prefixed locale and verify canonical/hreflang output.

Do not fix unrelated pre-existing type or build failures. Report them distinctly from failures caused by the requested change.
