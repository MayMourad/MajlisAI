# Majlis AI — Showcase Website

A bilingual (Arabic/English) marketing site for **Majlis AI**, a family coordination agent built for the **Sandooq Al Watan Agentic AI Summer Program 2026** (Wave 1, Al Dhafra, Abu Dhabi), created in celebration of the UAE's **Year of Family 2026**.

Majlis AI turns a single Arabic or English family request — "we're planning Friday lunch at grandma's" — into an organized, bilingual action plan: assigned tasks, translated instructions, timing alerts, and a family-connection prompt. This site explains the problem it solves, how the agent's pipeline works, and lets visitors try the **real, live** intake form.

Built for: the judging panel, mentors, and families who want to understand and try the agent. No login required.

## How the agent works

```
Google Form  →  Google Sheets  →  Apps Script  →  Gemini API  →  plan logged back to the Sheet
```

1. **Trigger:** a family member submits a coordination request, in Arabic or English, through a Google Form.
2. **AI processing:** Google Apps Script sends the request to the Gemini API, which works from the Majlis AI system instruction.
3. **Output:** the agent produces a bilingual event summary, a task distribution, translated helper notes and a family conversation prompt.
4. **Storage:** the complete plan is logged automatically to the family Google Sheet.

This repository holds the **showcase website only**. The operational Apps Script project and its configuration are maintained privately and are not part of this repository. Requests submitted through the live form are processed by Gemini and stored in the team's Google Sheet, so don't submit personal details you wouldn't want stored.

## What's inside

```
MajlisAI/
├── index.html     # single-page site, all sections
├── styles.css     # palette, layout, animations, RTL rules
├── script.js      # EN/AR translations, language toggle, scroll animations
├── favicon.svg    # gold/purple "AI" glyph favicon
└── README.md
```

Pure HTML/CSS/JS — no framework, no build step, no npm install. It runs by opening a file or serving static assets, and deploys to GitHub Pages with zero configuration.

## Preview locally

Easiest: just double-click `index.html` and it opens in your browser.

Or serve it (recommended, avoids any local file/iframe quirks):

```bash
npx serve .
```

Then open the URL it prints (usually `http://localhost:3000`).

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `majlis-ai-website`) and push this folder's contents to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Majlis AI showcase site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
5. Wait a minute, then your site is live at:
   `https://<your-username>.github.io/<your-repo>/`
6. (Optional) Add a custom domain under the same Pages settings and follow GitHub's DNS instructions.

## Important: keep the Google Form public

The **Live Demo** section embeds the real Majlis AI Google Form in an iframe. For it to keep working for site visitors, the form's sharing setting must remain:

> **Anyone with the link can respond**

If this is changed to restricted access, the embedded form will show an error instead of the intake form. No API key is stored anywhere in this site — the only "live" functionality is the embedded Google Form itself, which is intentional (the AI processing happens server-side via Apps Script + Gemini, not in the browser).

## Editing content later (non-developer friendly)

- **All English/Arabic copy** lives in one place: the `TRANSLATIONS` object near the top of `script.js`. Find the line with the text you want to change (each key has an `en:` and `ar:` value) and edit it directly — no HTML editing required for text changes.
- **Colors** are CSS variables at the top of `styles.css` (`--gold`, `--purple`, `--bg`, etc.) — change them once and they apply everywhere.
- **Team credits** are in the footer of `index.html` (search for `footer-credits`).
- **The sample demo input** (EN/AR) is also in `TRANSLATIONS` under `demo.sampleEn`.

## Accessibility & performance notes

- Semantic HTML5 landmarks, proper heading hierarchy, skip-to-content link, keyboard-navigable nav and language toggle.
- Respects `prefers-reduced-motion`: decorative orb/particle/scroll animations are disabled for users who request reduced motion.
- Language choice persists via `localStorage` and flips the whole page to `dir="rtl"` with an Arabic font stack (Noto Kufi Arabic / Cairo) when Arabic is active.
- Fonts are loaded from Google Fonts via `<link>` (with `preconnect`) rather than blocking `@import`.
- The Google Form iframe uses `loading="lazy"`.

## Credits

- **May Ahmed Mourad** — Team Lead & Developer
- **Fatema Suhail Al Mazrouei** — Prompt Designer
- **Shaden Ahmed Mourad** — Knowledge Curator
- **Lujain Ahmed Mourad** — Tester & Pitch Designer
- **Mentor:** Ms. May Taha

ADNOC Schools MZ - Al Dhafra, Abu Dhabi · Built for the Sandooq Al Watan Agentic AI Summer Program 2026 · Proudly part of the UAE's Year of Family.
