# Brendan Kesterson — Portfolio Website

A simple, fast, static portfolio site. Plain HTML, CSS, and a small amount
of vanilla JavaScript — no build step, no frameworks, no dependencies to
install. It's built to be deployed on **GitHub Pages** and easy to keep
updated without touching code you don't need to.

## Contents

- [File structure](#file-structure)
- [Running it locally](#running-it-locally)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Editing the site](#editing-the-site)
- [Media & content checklist](#media--content-checklist)
- [Design notes](#design-notes)

---

## File structure

```
site/
├── index.html              Home page
├── work.html                Work / portfolio index
├── about.html                About page (bio, kit, credits)
├── contact.html              Contact page
├── css/
│   ├── variables.css        Colors, fonts, spacing — the design tokens
│   ├── base.css              Reset + default element styling
│   ├── layout.css            Header, footer, section & page layout
│   └── components.css       Buttons, project rows, video player, etc.
├── js/
│   └── main.js               Mobile nav, click-to-load video, deep links
├── assets/
│   └── images/
│       ├── favicon.svg
│       └── placeholders/    Labeled stand-ins for every real photo/still
└── README.md                 This file
```

Every page repeats the same header and footer markup — there's no
templating system, since that would need a build step. If you add a fifth
page, copy the header/footer from an existing one.

## Running it locally

No install required. Two options:

1. **Just open it.** Double-click `index.html` and it'll open in your
   browser. (The click-to-load video embeds and deep links from the
   homepage to a project on the Work page both work fine this way.)
2. **Or serve it** (closer to how GitHub Pages serves it, and needed if
   you ever add code that's picky about `file://` URLs):
   ```
   cd site
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Create a new GitHub repository (public, unless you have GitHub Pro/Team
   for a private Pages site).
2. Push the contents of this `site/` folder to the repository's root —
   i.e. `index.html` should sit at the top level of the repo, not inside
   a subfolder.
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a
   branch," pick the `main` branch and the `/ (root)` folder, then **Save**.
5. GitHub will give you a URL, typically
   `https://<your-username>.github.io/<your-repo>/`. It can take a minute
   or two to go live the first time.
6. **Custom domain (optional):** if you buy a domain, add it under
   **Settings → Pages → Custom domain**, and follow GitHub's DNS
   instructions. This also generates a `CNAME` file in your repo — don't
   delete it.

Because this is a static site with no build process, every push to `main`
updates the live site automatically within a minute or so.

## Editing the site

| To change...              | Edit this                                                              |
|----------------------------|-------------------------------------------------------------------------|
| Text on any page           | The `.html` file for that page — all copy is plain text in the markup |
| A project entry            | The matching `<details class="work-row">` block in `work.html` (each one is commented and self-contained — copy one to add a new project) |
| The 3 homepage teasers      | The `.teaser-grid` block in `index.html`                               |
| Photos / stills             | Swap the file in `assets/images/` and point the matching `<img src>` at it — keep the same filename to avoid editing HTML at all |
| Video embeds (reel/projects)| Add the YouTube or Vimeo ID to the relevant `data-embed-id="..."` attribute — see the comment at the top of `js/main.js` |
| Contact info & socials      | `contact.html`, plus the footer block (repeated in every page) |
| Colors, fonts, spacing      | `css/variables.css` — one change here updates the whole site |
| Nav links, header, footer   | Repeated at the top/bottom of every `.html` file — update each one |

Nothing here requires a build step: edit a file, save it, refresh the
browser (or push to GitHub).

## Media & content checklist

Everything below is currently a clearly-labeled placeholder. Here's what
to gather to replace it:

### Videos
- [ ] **Showreel** — 60–120 seconds, your strongest and most varied work
      first. Host it on YouTube or Vimeo (Vimeo tends to look cleaner and
      ad-free for a portfolio) and grab its video ID for `index.html`.
- [ ] **Individual project clips**, if you want them — full scenes,
      trailers, or behind-the-scenes clips per project, hosted the same
      way.
- [ ] A **cover frame** (a still from the video) for each: 1600×900px,
      JPG.

### Photography
- [ ] **Headshot** — portrait orientation, 1200×1500px or larger, plain
      or on-set background, well and evenly lit.
- [ ] **Hero photo** for the homepage — a strong behind-the-scenes or
      on-set image of you operating camera, landscape orientation,
      1600×1000px or larger.
- [ ] **Project thumbnails** — one representative frame per project,
      1200×900px (4:3).
- [ ] **Project stills** — 2 more images per project for the expanded
      gallery (frame grabs, BTS, or setup photos), roughly 1350×900px
      (3:2).

General guidance: export photos as JPG at around 80% quality (keeps file
size reasonable without visible artifacts) unless the image has flat
color or text, in which case PNG is fine. Keep individual images under
roughly 400KB where you can — it keeps the site fast.

### Project information (per project, for `work.html`)
- [ ] Title
- [ ] Your role (Camera Operator, 1st AC, Steadicam Operator, etc.)
- [ ] Format/category (short film, commercial, music video, etc.)
- [ ] Year
- [ ] One or two sentences describing the project and your contribution
- [ ] Credits: director, cinematographer, production company/client

### Biography & credits (for `about.html`)
- [ ] Two or three paragraphs of biography
- [ ] Camera bodies, lenses, and support gear you operate
- [ ] A selected credits list (title, role, year)
- [ ] Union status / representation, if applicable

### Contact
- [ ] Email address
- [ ] Phone number (optional)
- [ ] City/location
- [ ] Social links you actually keep current — Instagram, Vimeo, LinkedIn,
      IMDb, etc.

## Design notes

The visual approach is a "camera report" — the paper log sheets a camera
department fills out on set — rather than the more common dark
"cinema screen" look: warm paper tones, dark ink, a single grease-pencil
red used only for interactive things (links, the record dot, focus
states), hairline rules instead of cards or shadows, and a serif
(Fraunces) paired with a monospace (IBM Plex Mono) for anything
report-like — metadata, nav, form labels. The work index reads like a
ledger of shots rather than a hover-zoom image grid, which keeps the
focus on real information: role, format, year, credits.
