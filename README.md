# Brendan Kesterson: portfolio site

A static site in plain HTML, CSS, and JavaScript. No frameworks, no
build step. It runs on GitHub Pages as-is.

## Pages

- **Projects** (`index.html`, the homepage): the demo reel plays muted on
  loop at the top; below it, projects in a grid by section (Narrative
  Film, Freelance Work, Documentary Film). Hover a thumbnail for its
  title; click to watch with sound in a full-screen viewer.
- **Stills Archive** (`stills.html`): every still, uncropped; click to
  enlarge.
- **About** (`about.html`): description, email, and social links.

The header on every page links to LinkedIn, YouTube, and Instagram.

## Editing

Everything lives in **`js/content.js`**:

| To change | Edit |
|---|---|
| Demo reel | `REEL` |
| Projects | `PROJECTS`: one line each, with `title`, `category`, `youtube` |
| Section names or order | `CATEGORIES` (empty sections are hidden) |
| Stills | `STILLS`: one line each, in display order |
| About text, photo, email | `ABOUT` |
| Social links | `SOCIAL` |

### Adding a project

```js
{ title: "Shown on hover", category: "documentary", youtube: "https://youtu.be/VIDEO_ID" },
```

`category` is `narrative`, `freelance`, or `documentary`.

### Adding a still

Put the image in `assets/images/`, then add a line to `STILLS`:

```js
{ src: "assets/images/yes_19.jpg", alt: "Short description of the image" },
```

File names are case-sensitive on GitHub Pages: `Yes_1.jpg` and
`yes_1.jpg` are different files, so the name in `content.js` must match
exactly. Add `title: "Project name"` to show a title on hover.

### About photo and email

In `ABOUT`, set `photo` (e.g. `"assets/images/brendan.jpg"`, portrait,
4:5, about 1200 × 1500 px) and `email`. Until they're set, the page shows
text and social links only.

## Notes on video

- The reel auto-plays muted (browsers only allow silent autoplay).
  "Watch with sound" opens it in the viewer with audio. YouTube briefly
  shows its own title overlay as the reel starts, which can't be fully
  removed.
- Visitors whose device is set to reduce motion see a still frame
  instead of the auto-playing reel.
- Project videos load only when clicked.

## Running locally

Run `python3 -m http.server 8000` in this folder and visit
http://localhost:8000.

## Deploying to GitHub Pages

1. Push the contents of this folder to a GitHub repository, with
   `index.html` at the top level.
2. On GitHub: **Settings → Pages**, set Source to "Deploy from a branch",
   choose `main` and `/ (root)`, and save.
3. The site appears at `https://USERNAME.github.io/REPO/` within a minute
   or two. Later pushes update it automatically.
