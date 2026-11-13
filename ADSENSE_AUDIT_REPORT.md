# ConvertAllNow AdSense Approval and Technical SEO Audit

Audit date: November 13, 2026 (Asia/Kolkata)  
Scope: repository, production build, and a local HTTP crawl of the built application  
Site: https://convertallnow.com/

This audit improves technical quality and policy readiness. It does **not** guarantee Google AdSense approval or Google indexing. AdSense makes its own site-level decision, and Google may select a different canonical despite technically valid signals.

## Executive summary

The audit confirmed several material problems: Google advertising and analytics scripts loaded before the visitor's consent choice; retired social-download URLs returned HTTP 200 soft-404 pages in Next.js streaming mode; those retired URLs were still linked from navigation and the all-tools hub; the associated resolver API remained callable; legal/privacy copy still advertised retired downloaders; sitemap and WebPage structured data published synthetic modification dates; the image optimizer allowed every remote hostname; and the production dependency audit initially reported 21 advisories, including four critical findings.

The implemented fixes consent-gate Google scripts, remove retired downloaders from navigation, return explicit `410 Gone` responses, retire the resolver API, clean up policy copy, remove synthetic dates, narrow the image optimizer's attack surface, update Next.js, remove unused downloader dependencies, and update safe transitive dependencies. A 68-route HTTP audit now passes with zero failures.

The follow-up content crawl found a broader review risk than the original technical crawl: the XML sitemap exposed 470 URLs across ten locales even though 238 of 423 non-English tool pages contained substantial English copy, several legal/directory pages were exact cross-locale duplicates, four JavaScript-heavy converters had no server-rendered H1, and the archive cluster contained many near-template pages. For the next AdSense review, the public/indexable surface is now deliberately limited to 35 reviewed English URLs. Unfinished locale URLs permanently redirect to their English equivalents, repetitive archive utilities remain usable but are `noindex, follow`, and the HTML directory is noindex and absent from the XML sitemap. This is a quality-control measure, not a claim that multilingual publishing is undesirable; each locale can return after native-language editorial and functional review.

AdSense approval still cannot be guaranteed. Google makes the decision using its own crawl, account history, policy systems, and traffic/content assessment. Do not resubmit immediately after deployment: allow Google to recrawl the smaller site surface, confirm the redirects and sitemap in Search Console, and finish the account-side consent steps described below.

## Search Console evidence supplied November 13, 2026

The three screenshots are point-in-time Google reports, not three defects that should all be forced into the index. Representative production URLs were checked on November 13 to separate expected exclusions from actionable content issues.

1. **Alternative page with proper canonical tag — 122 URLs.**
   - The visible examples are `www.convertallnow.com` URLs. Live checks showed a single permanent redirect from `https://www.convertallnow.com/...` to the equivalent `https://convertallnow.com/...` URL, while the non-www page returned HTTP 200 with a self-referencing canonical.
   - This is expected duplicate consolidation, not an indexing failure. The examples were last crawled on August 6, so Google may later reclassify them as “Page with redirect.” Do not add `www` variants to the sitemap or request indexing for them.

2. **Discovered – currently not indexed — 113 URLs.**
   - The report says validation passed and its graph fell from roughly 600 affected pages to 113. That is meaningful progress.
   - Visible examples are Arabic locale pages with no crawl date, including `/ar/file-privacy-security`, `/ar/pdf-to-jpg`, `/ar/pdf-tools`, and `/ar/protect-pdf`. This points to crawl prioritization and locale/content-quality review, not a robots or canonical emergency.
   - Keep indexable URLs in the sitemap only when they have working tools, localized visible content, and useful internal links. A complete CSV export is still needed before deciding whether any individual page should be improved, retained as `noindex`, or retired.

3. **Crawled – currently not indexed — 59 URLs.**
   - This bucket contains mixed causes. `www` examples such as `/tr/md-converter` and `/ru/photo` now redirect and should be allowed to age out. `/ar/gz-to-zip` is deliberately `noindex, follow`, so it should not be submitted for indexing or treated as a failed fix.
   - Indexable localized examples such as `/id/create-zip` and `/es/protect-pdf` return HTTP 200 with self-canonicals, but their rendered headings or copy are partly English/generic. These are the actionable group: verify the converter, add language-appropriate tool-specific guidance, and reduce template duplication before asking Google to recrawl.

4. **Concrete content correction from the examples.**
   - The live `/es/photo` page was indexable but its title overemphasized SVG, while supporting copy claimed passport cropping, filters, and photo enhancements that the actual tool does not offer.
   - Fix: `/photo` now describes the implemented raster format conversion, batch workflow, and raster-to-SVG tracing; unsupported claims were removed; SVG input type and 5 MB limits are enforced; and SEO title/description text was corrected in all ten locale catalogs.

Recommended Search Console handling after this release: submit the 35-URL sitemap once and let the old locale reports age out through the new permanent redirects. Leave normal redirects, alternate canonicals, and intentional `noindex` URLs alone. Use “Validate fix” only for a group whose underlying cause was actually changed; it does not force Google to index a URL.

## Follow-up content-quality hardening

- Published locales are temporarily limited to English. `/es`, `/fr/photo`, and `/ar/pdf-tools` were explicitly verified as HTTP 308 redirects to `/`, `/photo`, and `/pdf-tools`; the same middleware rule covers all nine unfinished locale prefixes while preserving the remaining path and query string.
- The XML sitemap now contains 35 canonical English URLs instead of 470 mixed-quality locale URLs. It excludes every intentional noindex tool, the noindex HTML directory, retired downloaders, and withdrawn tools.
- Twenty-three archive routes with highly repetitive templates are now `noindex, follow`. They remain reachable for users and internal discovery but are withheld from search and AdSense landing-page inventory until they have distinct, tested value.
- The four client-only converter interfaces now expose one server-rendered H1 for crawlers and assistive technology. Their animated visual title is no longer a second semantic H1 after hydration.
- ZIP converter headings now use each tool's configured name instead of generating generic `ZIP to ZIP` headings.
- The language switcher is hidden while only English has passed editorial review.
- About and Contact now identify Y2Code as the operator of ConvertAllNow, resolving the brand/support-domain ambiguity.
- Homepage and site-guidance claims were softened where performance, capacity, device support, or privacy depends on the source file, browser, and hardware.

## 1. Confirmed issues and supporting evidence

### Critical/high priority

1. **Consent choice did not control Google scripts.**
   - Evidence: `src/app/[locale]/layout.tsx` loaded AdSense and Google Analytics globally before `CookieConsent` could record a choice. `src/components/ui/CookieConsent.tsx` only stored the choice; it did not enable or disable either script.
   - Risk: the interface promised a choice that had no technical effect, creating a privacy/transparency problem. Ad code also loaded on routes outside the allowlist in `src/lib/advertising.ts`.
   - Fix: AdSense and Analytics now load only after an `accepted` choice. Declining leaves both scripts disabled. Ad inventory is still limited by `ADS_ENABLED`, `AD_PATHS`, and the presence of a slot ID.

2. **Retired downloader URLs were soft 404s.**
   - Evidence: the first built-site crawl found `/ig-downloader`, `/fb-video`, `/snapchat`, and `/es/ig-downloader` returning HTTP 200 with only 22–29 words and no useful main content. Calling `notFound()` inside the streamed route did not change the response status.
   - Risk: this directly matches Google's soft-404 definition: an error/empty page served with HTTP 200. The previous redirects also pointed to a broad video-tools page rather than a close replacement.
   - Fix: middleware now returns `410 Gone`, `X-Robots-Tag: noindex, follow`, a small explanatory HTML page, and a current-tools link for localized and unlocalized retired downloader paths.

3. **Retired/copyright-sensitive tools were still promoted internally.**
   - Evidence: `src/constants/data.ts` included an "IG Downloader" navigation group; `src/components/sections/AllToolsHub.tsx` listed an Instagram Downloader; `src/app/[locale]/(root)/terms/page.tsx` and `file-privacy-security/page.tsx` described active Instagram, Facebook, and Snapchat downloaders.
   - Risk: misleading navigation, links to unavailable content, and unnecessary copyright-sensitive positioning. Google AdSense policies specifically prohibit deceptive navigation and links to nonexistent content.
   - Fix: removed live internal promotion and replaced the stale legal/privacy statements with accurate file-processing and third-party-rights language.

4. **The retired resolver API remained active.**
   - Evidence: `src/app/api/download/route.ts` forwarded arbitrary supported social URLs to `NEXT_PUBLIC_API_URL`, even though the public downloader pages were withdrawn.
   - Risk: an undocumented external-content resolver remained available and contradicted the site's local-processing positioning.
   - Fix: `/api/download` now returns `410 Gone` and makes no upstream request. Unused `axios` and `ytdl-core` dependencies were removed.

5. **Production dependency security findings.**
   - Evidence: the initial `npm audit --omit=dev` result reported 21 production advisories: 2 moderate, 15 high, and 4 critical.
   - Fix: applied non-breaking audit updates, upgraded Next.js from 15.3.8 to 15.5.29, and forced the transitive `tar` package to a patched 7.5.21+ release. The current production audit reports 6 advisories: 1 moderate, 5 high, and 0 critical.
   - Remaining: PDF.js, `@imgly/background-removal`/Zod, and Next.js 16-related transitive findings require breaking migrations or a major framework upgrade. They were not force-applied without converter regression testing.

### Medium priority

6. **Synthetic freshness signals.**
   - Evidence: `WebPageSchema` used the current date as `dateModified` on every request, and `sitemap.xml` assigned one hard-coded `lastmod` date to every URL.
   - Risk: inaccurate structured data and sitemap signals can reduce trust in the dates rather than improve crawling.
   - Fix: `dateModified` is emitted only when a caller supplies a real date; synthetic sitemap `lastmod` values were removed.

7. **Unrestricted image-optimizer host allowlist.**
   - Evidence: `next.config.ts` allowed `https` images from hostname `**`.
   - Risk: unnecessary remote image optimization surface and weaker control of third-party content. Current tools use local/blob images; the only external-thumbnail consumer belonged to the retired downloader flow.
   - Fix: removed the wildcard remote pattern.

8. **Overstated or stale trust claims.**
   - Evidence: tool copy included phrases such as "100% Privacy Guaranteed" and "complete privacy guaranteed"; About copy across locales claimed active URL-resolution downloaders, temporary server files, and an inaccurate tool count.
   - Fix: replaced the strongest absolute claims with verifiable statements about where selected file content is processed, documented supporting WASM/model downloads, and removed stale downloader/tool-count claims from every locale catalog.

9. **Incorrect build tracing root after the Next.js update.**
   - Evidence: Next.js detected a parent-directory lockfile and inferred `/Users/yatish` as the workspace root.
   - Risk: oversized or incomplete standalone deployment tracing.
   - Fix: set `outputFileTracingRoot` to the application working directory.

## 2. Potential AdSense compliance risks

These are risks requiring editorial or account-level verification, not confirmed rejection reasons.

- **Near-template archive pages:** many archive routes use the same `CommonContent` structure with only format names changed. Twenty-three are now intentionally `noindex`; they should be individually tested and given tool-specific limitations, examples, and troubleshooting before any are returned to the sitemap.
- **Localization quality:** the nine unfinished non-English locale prefixes now redirect to English. The catalog files are retained for future work, but a locale must not be republished until native-language editorial review confirms that its metadata, headings, legal text, guidance, and tool UI are complete and natural.
- **Support operations:** About and Contact now explain that Y2Code operates ConvertAllNow. The `support@y2code.com` mailbox still must be monitored and capable of handling privacy and user-support requests.
- **Operational claims:** response-time claims, free commercial use, format support, maximum file sizes, "frame-accurate" editing, and no-watermark statements must be manually verified against each converter. Do not retain claims merely because they are favorable.
- **Ad placement:** when ads are eventually enabled, verify on mobile and desktop that no ad resembles or sits too close to upload, convert, or download controls. Current code labels display units as "Advertisement" and limits inventory, but live Auto Ads settings can change placement.
- **Consent management:** the implemented first-party choice controls scripts, but a custom banner is not evidence of a Google-certified CMP. Before enabling personalized ads for the EEA, UK, or Switzerland, configure a Google-certified CMP through AdSense Privacy & messaging (or another certified provider), publish the message, and test consent signals in production.
- **Dependency migrations:** remaining high advisories should be resolved through planned PDF.js and background-removal migrations with malicious-file and output regression tests.
- **No blog audit was possible:** the repository contains no blog routes or article registry. Do not advertise a blog or include nonexistent article URLs in Search Console/sitemaps.

## 3. Files changed

- Advertising/consent: `src/lib/advertising.ts`, `src/components/AdvertisingScript.tsx`, `src/components/AnalyticsScript.tsx`, `src/components/AdsenseAd.tsx`, `src/components/ui/CookieConsent.tsx`, `src/app/[locale]/layout.tsx`
- Retired tools/API/crawl behavior: `src/middleware.ts`, `src/app/robots.ts`, `src/app/api/download/route.ts`, the three retired downloader route pages, `src/constants/data.ts`, `src/components/sections/AllToolsHub.tsx`
- SEO/structured data: `src/app/sitemap.xml/route.ts`, `src/components/seo/WebPageSchema.tsx`, `next.config.ts`
- Trust/content: About entries in all `messages/*.json` catalogs, `terms/page.tsx`, `file-privacy-security/page.tsx`, `merge-pdf/page.tsx`, `video-compressor/page.tsx`, and `audio/page.tsx`
- Security/dependencies: `package.json`, `package-lock.json`
- Verification: `scripts/audit-site.mjs`
- Follow-up review surface: `src/i18n/routing.ts`, `src/middleware.ts`, `src/lib/constants.ts`, `src/app/sitemap.xml/route.ts`, `src/app/[locale]/(root)/sitemap/page.tsx`, `src/components/sections/Navbar.tsx`, `src/components/sections/ZipToolConverter.tsx`, `src/components/sections/HomeSEOContent.tsx`, the four client-only converter pages/components, and `messages/en.json`

## 4. Technical fixes completed

- Consent-gated AdSense and Google Analytics loading.
- Preserved AdSense ownership verification through the metadata publisher account and root `ads.txt` while keeping ad delivery opt-in.
- Converted retired downloader URLs to crawlable `410 Gone` responses instead of blocked/temporary/soft-404 behavior.
- Retired the external resolver API.
- Removed internal links to the Instagram downloader from navigation and the all-tools hub.
- Kept intentional noindex directives for the thin archive set and kept those URLs out of the XML sitemap.
- Removed inaccurate global sitemap `lastmod` and request-time `dateModified` values.
- Removed unrestricted remote image optimization.
- Scoped standalone output tracing to this repository.
- Updated Next.js and safe dependency versions; removed unused downloader dependencies.
- Kept canonical and reciprocal hreflang generation through the shared locale-aware helpers.

## 5. Content improvements completed

- Replaced absolute privacy guarantees with specific, testable local-processing explanations.
- Removed descriptions of retired social-media download functionality from legal and privacy pages.
- Reframed third-party-rights terms around user-provided file content.
- Added accurate disclosure that supporting WebAssembly engines or models may be downloaded while selected file content stays local.
- Removed inaccurate numerical tool-count and temporary-server-file claims from About copy in every locale catalog.

## 6. Test results

- `npm exec tsc -- --noEmit`: passed.
- `npm run build`: passed on Next.js 15.5.29 after network access was allowed for `next/font`.
- Built-site audit after follow-up hardening: 68 routes checked; 0 failures; 35 sitemap URLs.
- Server HTML: every audited HTTP 200 page has a canonical, the expected English/x-default hreflang set, and a server-rendered H1.
- Indexing controls: no intentional noindex URL appears in the XML sitemap; repetitive archive tools return `X-Robots-Tag: noindex, follow`; the HTML directory emits meta noindex.
- Locale consolidation: representative Spanish, French, and Arabic paths return HTTP 308 to the matching English URL.
- Browser consent test: before a choice, zero Google scripts and zero AdSense units were present; after acceptance, Analytics loaded, while AdSense remained absent because delivery was disabled.
- Retired downloader paths: verified `410 Gone` for default and prefixed locale examples.
- Retired API: verified HTTP 410.
- Sitemap: HTTP 200; retired downloader and withdrawn ZIP-to-RAR/ISO URLs absent.
- robots.txt: rendering assets not blocked; sitemap declaration present.
- Canonicals: present on all indexable routes tested, including `/es` and `/es/privacy`.
- Ad code: no server-rendered ad unit or delivery script on audited pages with delivery disabled/without consent.
- ads.txt: publisher ID `pub-1504999187644497` matches code metadata client ID `ca-pub-1504999187644497`.
- Message catalogs: all ten JSON files parse successfully.
- Production dependency audit after fixes: 0 critical, 5 high, 1 moderate.
- `git diff --check`: passed after line-ending cleanup.

The repository's `npm run lint` script invokes `next lint`, which is not a supported Next.js 15 verifier. TypeScript and the production compiler were used instead; migrating to ESLint CLI remains a maintenance task.

## 7. Remaining manual tasks

1. Export Search Console indexing examples as CSV for every reported reason. Without exact URLs, the supplied totals cannot be mapped to route behavior.
2. Test every converter with a valid file, invalid file, empty file, practical maximum-size file, reset/retry, and downloaded-output validation. Prioritize the indexable archive tools, PDF-to-DOCX, protected PDF/ZIP tools, and large FFmpeg tools.
3. Review the 23 intentionally noindexed archive routes. Keep them noindex until they offer distinct demand, working format behavior, original guidance, and validated output; retire them with 410 if there is no user value.
4. Rewrite genuinely untranslated locale prose with native-language editorial review. Do not re-enable locale routing or mass-generate near-identical SEO text until each locale passes a full crawl and human review.
5. Confirm `support@y2code.com` is monitored; the site now discloses the Y2Code/ConvertAllNow relationship.
6. Complete breaking dependency migrations for `pdfjs-dist` and `@imgly/background-removal`, then rerun malicious-file, worker, and conversion-output tests.
7. In AdSense, publish a Google-certified consent message for the EEA/UK/Switzerland before enabling personalized ads. This is an account-side step and cannot be completed by repository code alone.
8. After deployment, wait for Google to recrawl the reduced sitemap and redirects (often at least one to two weeks) before requesting another AdSense review. Confirm the live deployment first; local test results do not prove the server has the new commit.
9. Replace the legacy `next lint` script with an ESLint CLI configuration.
10. Review production Core Web Vitals in Search Console/CrUX. Local build sizes indicate especially heavy first loads for image-to-PDF, merge/split/protect/unlock PDF, and middleware; real-user data is required before optimizing.
11. Verify live server/CDN redirects for HTTP→HTTPS and www→non-www. The repository contains middleware and sample Nginx configuration, but deployment behavior was not changed or deployed.
12. Validate production consent behavior and ad placement in all target jurisdictions and viewport sizes before enabling `NEXT_PUBLIC_ADS_ENABLED=true`.

## 8. Google Search Console actions required

1. Export URL examples for all nine supplied indexing categories.
2. Resubmit the updated XML sitemap only after deployment.
3. Use URL Inspection on representative URLs:
   - `/`, `/merge-pdf`, `/create-zip`, `/about`, `/privacy`
   - one prefixed locale route such as `/es/merge-pdf` (expect a permanent redirect to `/merge-pdf`)
   - one intentional noindex route such as `/rar-to-zip`
   - one retired route such as `/ig-downloader` (expect 410)
4. Confirm Google's rendered HTML contains the main heading/content and can load `_next`, WASM, and worker assets.
5. For "Google chose different canonical," compare user-declared and Google-selected canonical URL pairs. Old unfinished locale URLs should now consolidate through redirects rather than compete as near-duplicate pages.
6. For "Crawled/Discovered – currently not indexed," inspect indexable pages for working tools, unique visible content, and internal links. Do not request indexing for intentional noindex, redirects, 404, or 410 URLs.
7. Mark validation only for issue groups whose exported URLs are actually fixed. Normal alternate-canonical and redirect exclusions do not need to become indexed.

## 9. Recommended conditions before AdSense resubmission

- Deploy these changes and complete a fresh production crawl.
- Ensure the Policy Center and AdSense Sites page show no unresolved account/site action.
- Keep ads disabled until consent behavior, placement, and reviewed route inventory are verified in production.
- Publish and test a Google-certified consent message for the EEA, UK, and Switzerland before enabling personalized ads there.
- Resolve or formally risk-accept the remaining high dependency advisories after testing the required breaking upgrades.
- Manually verify every indexable converter works and its claims match observed behavior.
- Improve or keep noindex on template-like archive pages; do not expand the sitemap for index count alone.
- Resolve broken/soft-404 examples from the Search Console export and wait for Google to recrawl them.
- Confirm About, Contact, Privacy, Terms, ads.txt, publisher ID, and support mailbox are accurate and operational.
- Submit only after the site has a stable period without broken routes, misleading navigation, or placeholder/thin content.

## Policy and technical references

- Google AdSense programme policies: https://support.google.com/adsense/answer/48182
- Google ad placement policies: https://support.google.com/adsense/answer/1346295
- Google Publisher Policies overview: https://support.google.com/adsense/answer/10008391
- Google ads.txt troubleshooting: https://support.google.com/adsense/answer/12171244
- Google Search soft-404 guidance: https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
