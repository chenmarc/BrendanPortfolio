# Brendan Kesterson: portfolio site

A static site in plain HTML, CSS, and JavaScript. No frameworks, no
build step. It runs on GitHub Pages as-is.

## Pages

- **Projects** (`index.html`, the homepage): the demo reel plays at the
  top; below it, every project in one grid. Hover a thumbnail for its
  title; click to watch with sound in a full-screen viewer.
The header on every page has the name, the page links, and LinkedIn,
YouTube, and Instagram icons.

- **Stills** (`stills.html`): every still, uncropped; click to enlarge.
- **About Me** (`about.html`): photo, then description, then email and
  social links, in one centered column.


## Editing

Everything lives in **`js/content.js`**:

| To change | Edit |
|---|---|
| Demo reel | `REEL` |
| Projects | `PROJECTS`: one line each, with `title` and `youtube` |
| Stills | `STILLS`: one file name per line, in display order |
| About Me text, photo, email | `ABOUT` |
| Social links (header icons + About Me) | `SOCIAL` |

### Adding a project

Add a line to the end of `PROJECTS` (list order is grid order):

```js
{ title: "Shown on hover", youtube: "https://www.youtube.com/watch?v=VIDEO_ID" },
```

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

- On desktop the reel auto-plays muted as a background video (browsers
  only allow silent autoplay); "Watch with sound" opens it with audio.
- On phones and tablets the reel is a normal player: it still tries to
  autoplay muted, and has YouTube's controls so it can be tapped to play
  when the phone blocks autoplay (e.g. Low Power Mode). YouTube briefly
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

This site is a project repo on the chenmarc account, which also serves
marcchen.net from chenmarc.github.io. Each repo's custom domain is set
in that repo, so this setup doesn't affect marcchen.net.

The `CNAME` file in the repo root (containing `brendankesterson.com`)
tells GitHub Pages to serve this repo at that domain. Keep it.

DNS records (Namecheap → Domain List → Manage → Advanced DNS for
brendankesterson.com). Delete the default parking records first (the
URL Redirect record on `@` and CNAME `www` → parkingpage.namecheap.com):

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | chenmarc.github.io. |

The CNAME value is the account's github.io host only, never a repo path;
DNS can't point at paths. GitHub picks the repo from the custom domain
set in that repo's Pages settings.

Then in this repo: **Settings → Pages → Custom domain**, enter
`brendankesterson.com`, save, wait for the DNS check, and tick
**Enforce HTTPS**.
