# Brendan Kesterson: portfolio site

A static portfolio in plain HTML, CSS, and JavaScript. No frameworks, no
build step, nothing to install. It runs on GitHub Pages as-is.

## How it's put together

All films and contact details live in **one file: `js/content.js`**.
The HTML pages are thin shells; `js/render.js` reads `content.js` and
builds the film entries, film pages, footer, and contact details. So a
film is written down once and appears everywhere it should.

```
index.html          Home: opening frame + selected films
work.html           Every film, in list order
film.html           One template for every film (film.html?v=VIDEO_ID)
about.html          Bio + automatic film list
contact.html        Contact details (from content.js)

js/content.js       ← EDIT THIS: site details and the FILMS list
js/render.js        Builds page markup from content.js
js/main.js          Starts rendering, image fallbacks, click-to-play video

css/variables.css   Colors, type sizes, spacing
css/base.css        Default element styles
css/layout.css      Header, footer, page layouts
css/components.css  Film entries, video player, metadata, lists

assets/images/      Favicon, and stills/ for your own frame grabs
```

## Adding a film

Open `js/content.js`, copy one block in `FILMS`, and fill it in:

```js
{
  youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  title: "Title of the film",
  year: "2025",
  role: "Camera",
  format: "Short film",
  location: "Oregon Coast",
  description: "One to three sentences about the film and how it was shot.",
  featured: true
},
```

Only `youtube` is required; empty fields are simply not shown. That one
block gives the film:

- an entry on the Work page (and the homepage, if `featured: true`)
- its own page with an embedded player, frames, and previous/next links
- a row in the About page's film list

List order is display order. The index rotates through three
compositions (full-width cinema crop, image-left, image-right) so it
reads like an edited sequence; to force one, add `layout: "wide"`,
`"left"`, or `"right"` to a film.

Optional extras per film: `credits: [{ role: "Director", name: "…" }]`,
`still` (your own main image), and `stills` (your own frames for the
film page).

## Images

By default images come straight from YouTube: each video's thumbnail is
the main image, and the film page shows three frames YouTube samples from
the video. Nothing to manage.

For the best result, replace them with your own frame grabs. YouTube
thumbnails are often designed covers, and its sampled frames are small.
Export stills from your edit, put them in `assets/images/stills/`, and
point to them:

```js
still: "assets/images/stills/film-name-main.jpg",
stills: [
  "assets/images/stills/film-name-1.jpg",
  "assets/images/stills/film-name-2.jpg",
  "assets/images/stills/film-name-3.jpg"
],
```

| Image | Shape | Size | Notes |
|---|---|---|---|
| `still` (main image) | 16:9 | 2400 × 1350 px | Used full-width; the homepage crops it to 2.39:1, so keep the subject near the vertical center |
| `stills` (film page frames) | 16:9 | 1600 × 900 px | Three per film works best |
| Format | JPG, ~80% quality | aim under 500 KB each | |

## Editing everything else

| To change | Edit |
|---|---|
| Films | `js/content.js` → `FILMS` |
| Email, phone, location, social links, availability line | `js/content.js` → `SITE` |
| Which film opens the homepage | `js/content.js` → `SITE.heroFilm` (a video ID) |
| Homepage intro line | `index.html` |
| Bio | `about.html` |
| Colors, type sizes, spacing | `css/variables.css` |
| Look of film entries, player, lists | `css/components.css` |
| Nav links | the `<header>` in each `.html` file |

## Running locally

Open `index.html` in a browser, or for a setup closer to GitHub Pages:

```
cd site
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Deploying to GitHub Pages

1. Create a GitHub repository and push the **contents** of this folder to
   it, so `index.html` is at the top level:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment**. Set Source to
   "Deploy from a branch", choose `main` and `/ (root)`, and save.
3. The site appears at `https://USERNAME.github.io/REPO/` within a
   minute or two. Every later push updates it automatically.
4. Optional custom domain: **Settings → Pages → Custom domain**, then
   follow GitHub's DNS instructions.

## Still to fill in

- [ ] Title, year, and a one-to-three-sentence description for each of
      the five films (`js/content.js`). Until then they show as Film 01–05.
- [ ] Confirm your role on each film (currently "Camera" for all)
- [ ] Your own frame grabs for each film (see Images above)
- [ ] Email, location, and any Instagram/Vimeo links (`SITE` in `js/content.js`)
- [ ] Review the bio in `about.html`; it's a short draft based on your
      channel's description
- [ ] Optional: credits for any film made with other people
