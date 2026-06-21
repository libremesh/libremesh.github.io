# Translating LibreMesh docs

Thanks for helping translate the LibreMesh website. This page is a quick reference for contributors. Keep it short — most of what we need is just consistency.

## How translations are organized

Each non-English language has its own folder under `docs/`:

```
docs/
├─ es/          # Español
├─ pt-BR/       # Português (Brasil)
└─ ...          # English (the source of truth) lives at docs/ root
```

The folder mirrors the English tree. To start a new page in Spanish, copy the English file into `docs/es/...` and translate it. Keep the same filename, same front matter keys, same heading levels.

## What to translate, what to leave alone

**Translate:**
- Headings, body prose, UI strings, link titles.
- The English `title:` in the front matter.

**Keep in English (do not translate):**
- `Batman-adv`, `Babel`, `BMX7`, `OLSR` — protocol names.
- `LiMe`, `LibreMesh`, `OpenWrt`, `LuCI`, `lime-app`, `thisnode.info`, `anygw`, `sysupgrade`, `factory` image, `squashfs-sysupgrade` — product / firmware terms.
- CLI commands, file paths, package names, code blocks.
- Brand names: `GitHub`, `Mastodon`, `Matrix`, `PeerTube`.

**Tone:** direct, second person ("you"), no marketing speak. Match the English source's register — the original is intentionally plain.

## What about pages that aren't translated yet?

We **link out** to the English version with a small hint. For example, in `docs/es/getting-started.md`:

```md
Consulta la página [Conectarse al router (en)](/guide/connecting)
```

The `(en)` / `(em)` suffix tells the reader the link goes to English. This keeps the localized page readable without forcing you to translate every internal link.

Do not invent `/es/...` paths for pages that don't exist in Spanish yet — they will 404.

## Adding a new language

1. Add a new `docs/<lang>/` folder.
2. Add a `locales` entry in `docs/.vitepress/config.mts` with `label`, `lang`, `link`, and a `themeConfig` with localized `nav` and `sidebar`. Mirror the structure of the existing `es` / `pt-BR` entries.
3. Add the language code to the detection list in `docs/.vitepress/theme/LanguageBanner.vue` (`pickLocale` and `messages`) so first-visit visitors see the suggestion.
4. Add the new locale to this guide's "What to keep in English" list if it introduces new untranslated brand terms.

## First-visit language toast

`LanguageBanner.vue` reads `navigator.language` and, on the first visit (no `localStorage` entry), shows a non-intrusive toast in the bottom-right corner suggesting the localized site. It is mounted via the `page-bottom` slot in `theme/index.ts` and uses `position: fixed`, so it never touches the nav and never shifts layout on mobile.

The user choice is stored under `libremesh-lang-pref`:

- `dismissed` — they declined; do not show again.
- `es` / `pt-BR` — they accepted; the stored value is informational only (the actual locale is determined by the URL the user navigates to via the language switcher in the nav).

If the user accepts the toast from a page that has a translated counterpart (e.g. they are on `/guide/connecting` and accept the Spanish toast), they land on the matching `/es/guide/connecting` — not the locale home. The mapping lives in `translatedPaths` inside the component; add new entries there when a new page gets translated in both languages.

## Submitting a translation PR

1. Translate the file (or create a new one) under the locale directory.
2. Run `pnpm install && pnpm build` locally to make sure nothing breaks. The build also catches broken links to pages that don't exist yet — see "What about pages that aren't translated yet?" above.
3. Open a PR against `main`. A native speaker should review before merge.
4. If you translated a new English page (so the page now exists in both English and your language), add an entry to the `translatedPaths` map in `LanguageBanner.vue` so the toast can take the reader directly to the translated version.

## Reviewing a translation PR

A native speaker should review every translation PR before merge. Things to check:

- Technical accuracy against the English source.
- Glossary consistency with the list above.
- No broken links: every link should either point to an existing `/<lang>/...` path or carry the `(en)` / `(em)` hint.
- The build still passes: `pnpm install && pnpm build`.
