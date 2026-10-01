# Brendan Kesterson: portfolio site

A static site in plain HTML, CSS, and JavaScript. No frameworks, no
build step. It runs on GitHub Pages as-is.

## Pages

- **Work** (`index.html`): the videos, one after another, nothing else
- **About** (`about.html`): one paragraph, currently placeholder words
- **Contact** (`contact.html`): email, LinkedIn, YouTube, currently placeholders

## Editing

| To change | Edit |
|---|---|
| Add, remove, or reorder videos | `js/content.js` → `VIDEOS` |
| Email, LinkedIn, YouTube links | `js/content.js` → `CONTACT` |
| About paragraph | `about.html` |
| Colors, type, spacing | `css/variables.css` |

### Adding a video

Paste its YouTube link as a new line in `VIDEOS` in `js/content.js`:

```js
const VIDEOS = [
  "https://www.youtube.com/watch?v=yTj7HgodvdY",
  "https://www.youtube.com/watch?v=NEW_VIDEO_ID",
  ...
];
```

List order is page order. Any YouTube link format works.

### Contact links

Each entry in `CONTACT` has a `label` (shown on the left), `text` (the
link text), and `url`. For email, the url starts with `mailto:`. Delete
an entry to hide it.

## How the videos load

Each video shows its YouTube thumbnail and a play button. The YouTube
player itself loads only when someone presses play, so the page stays
fast however many videos are on it.

## Files

```
index.html  about.html  contact.html
js/content.js     ← videos and contact links
js/render.js      builds the video list and contact list
js/main.js        starts rendering; loads a player on press
css/              variables, base, layout, components
assets/images/    favicon
```

## Running locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` in
this folder and visit http://localhost:8000.

## Deploying to GitHub Pages

1. Push the contents of this folder to a GitHub repository, with
   `index.html` at the top level.
2. On GitHub: **Settings → Pages**, set Source to "Deploy from a branch",
   choose `main` and `/ (root)`, and save.
3. The site appears at `https://USERNAME.github.io/REPO/` within a minute
   or two. Later pushes update it automatically.
