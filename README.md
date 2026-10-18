# Brendan Kesterson: portfolio site

A static site in plain HTML, CSS, and JavaScript. No frameworks, no
build step. It runs on GitHub Pages as-is.

## Pages

- **Projects** (`index.html`, the homepage): demo reel playing muted at
  the top, then Narrative Film, Freelance Work, and Documentary Film
  grids. Hovering a thumbnail shows its title; clicking plays it with
  sound in a full-screen viewer.
- **Stills Archive** (`stills.html`): a grid of stills; click to enlarge.
- **About** (`about.html`): portrait, description, and email.

The header on every page has LinkedIn, YouTube, and Instagram icons.

## Editing content

Almost everything lives in **`js/content.js`**:

| To change | Edit in `js/content.js` |
|---|---|
| Demo reel | `REEL` (a YouTube link) |
| Add a project | `PROJECTS`: copy a line, set `title`, `category`, `youtube` |
| Section names or order | `CATEGORIES` |
| Add a still | `STILLS`: add the image to `assets/images/stills/`, then a line |
| Email | `SITE.email` |
| LinkedIn / YouTube / Instagram | `SOCIAL` |

Two things are edited in the HTML instead:

- About text and portrait: `about.html` (portrait file goes in
  `assets/images/about/`)
- Page names in the header: the `<nav>` in each `.html` file

### Adding a project

```js
{ title: "Title shown on hover", category: "narrative", youtube: "https://www.youtube.com/watch?v=..." },
```

`category` is `narrative`, `freelance`, or `documentary`. List order is
grid order. A section with no projects is hidden.

## Image sizes

| Image | Shape | Size |
|---|---|---|
| Stills | any (16:9, 2.39:1, …), shown uncropped | about 2400 px wide |
| Portrait | 4:5 | 1200 × 1500 px or larger |

Export JPGs at around 80% quality. Project thumbnails come from YouTube
automatically; set a custom thumbnail on YouTube to change one.

## Notes on video

- The reel auto-plays muted on loop, as browsers only allow silent
  autoplay. "Watch with sound" opens it in the viewer with audio.
  YouTube briefly shows its own title overlay when the reel starts;
  YouTube doesn't allow fully removing it.
- Visitors whose device is set to reduce motion see a still frame
  instead of the auto-playing reel.
- Project videos load only when clicked, so the grid stays fast.

## Files

```
index.html  stills.html  about.html
js/content.js     ← all content
js/render.js      builds the markup from content.js
js/main.js        starts rendering; the full-screen viewer
css/              variables (colors, type, spacing), base, layout, components
assets/images/    favicon, stills/, about/
```

## Running locally

Run `python3 -m http.server 8000` in this folder and visit
http://localhost:8000. (Opening `index.html` directly also works, but
some browsers block YouTube embeds on `file://` pages.)

## Deploying to GitHub Pages

1. Push the contents of this folder to a GitHub repository, with
   `index.html` at the top level.
2. On GitHub: **Settings → Pages**, set Source to "Deploy from a branch",
   choose `main` and `/ (root)`, and save.
3. The site appears at `https://USERNAME.github.io/REPO/` within a minute
   or two. Later pushes update it automatically.
