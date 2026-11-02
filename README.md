# Brendan Kesterson: portfolio site

A static site in plain HTML, CSS, and JavaScript. No frameworks, no
build step. It runs on GitHub Pages as-is.

## Pages

- **Projects** (`index.html`, the homepage): the demo reel plays muted on
  loop at the top; below it, projects in a grid by section (Narrative
  Film, Freelance Work, Documentary Film). Hover a thumbnail for its
  title; click to watch with sound in a full-screen viewer.
- **Stills** (`stills.html`): every still, uncropped; click to enlarge.
- **About Me** (`about.html`): photo, description, email, and social links.

The header on every page links to LinkedIn, YouTube, and Instagram.

## Editing

Everything lives in **`js/content.js`**:

| To change | Edit |
|---|---|
| Demo reel | `REEL` |
| Projects | `PROJECTS`: one line each, with `title`, `category`, `youtube` |
| Section names or order | `CATEGORIES` (empty sections are hidden) |
| Stills | `STILLS`: one file name per line, in display order |
| About Me text, photo, email | `ABOUT` |
| Social links | `SOCIAL` |

### Adding a project

```js
{ title: "Shown on hover", category: "documentary", youtube: "https://youtu.be/VIDEO_ID" },
```

`category` is `narrative`, `freelance`, or `documentary`.

### Adding a still

Put the image in `assets/images/`, then add its file name to `STILLS`:

```js
const STILLS = [
  "Yes_1.jpg",
  ...
  "yes_19.jpg"
];
```

File names are case-sensitive on GitHub Pages: `Yes_1.jpg` and
`yes_1.jpg` are different files, so the name in `content.js` must match
the file exactly. If an image doesn't appear on the live site, a
mismatched name is almost always the cause.

### About Me photo

The photo is `assets/images/profilephoto.jpg` and is shown at its own
shape. To swap it, replace that file and keep the name. A version at
least 1200 px wide will look sharper on high-resolution screens.

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
3. Keep the `.nojekyll` file in the repo; it tells GitHub Pages to
   serve the files exactly as they are.
4. The site appears at `https://USERNAME.github.io/REPO/` within a minute
   or two. Later pushes update it automatically.

## Custom domain (brendankesterson.com)

The `CNAME` file in the repo root tells GitHub Pages to serve the site
at brendankesterson.com. Keep it in the repo.

DNS records (Namecheap → Domain List → Manage → Advanced DNS):

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | USERNAME.github.io. |

Optional AAAA records (IPv6), Host `@`: 2606:50c0:8000::153,
2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153.

Delete Namecheap's default parking records first (the URL Redirect
record on `@` and the CNAME `www` → parkingpage.namecheap.com).

Then on GitHub: **Settings → Pages → Custom domain**, enter
`brendankesterson.com`, save, wait for the DNS check to pass, and tick
**Enforce HTTPS**.
