/*
  RENDER.JS — turns the data in content.js into page markup.
  ==========================================================

  You shouldn't need to edit this file to add films or change text.
  Each page has empty placeholders like <div data-render="film-index">,
  and main.js calls the matching function below to fill them in.

  Sections:
    1. Helpers (video IDs, image URLs, titles, escaping)
    2. Shared pieces (frame image, video player, metadata)
    3. Page sections (homepage hero, film index, film page, etc.)
*/


/* =================================================================
   1. HELPERS
   ================================================================= */

/** Pull the 11-character video ID out of any common YouTube URL. */
function getVideoId(url) {
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : "";
}

/** Films in list order, each with its ID and display number attached. */
function allFilms() {
  return FILMS.map((film, i) => ({
    ...film,
    id: getVideoId(film.youtube),
    number: String(i + 1).padStart(2, "0")
  })).filter((film) => film.id);
}

function filmTitle(film) {
  return film.title || `Film ${film.number}`;
}

function filmUrl(film) {
  return `film.html?v=${film.id}`;
}

/* YouTube image URLs. maxresdefault is native 16:9 but doesn't exist for
   every video, so images fall back to hqdefault (see fallbackImage). */
function youtubeImage(id, name) {
  return `https://i.ytimg.com/vi/${id}/${name}.jpg`;
}

function mainStill(film) {
  return film.still || youtubeImage(film.id, "maxresdefault");
}

function filmFrames(film) {
  if (film.stills && film.stills.length) return film.stills;
  // YouTube samples three frames from each video at roughly 25%, 50%, 75%.
  return ["hq1", "hq2", "hq3"].map((name) => youtubeImage(film.id, name));
}

/** Escape text before putting it into HTML. */
function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Short version of a description for index entries: the first sentence. */
function firstSentence(text) {
  if (!text) return "";
  const match = text.match(/^.+?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
}


/* =================================================================
   2. SHARED PIECES
   ================================================================= */

/** A cropped image in a fixed-ratio frame. `shape` is "wide" (2.39:1,
    the cinema crop) or "standard" (16:9). */
function frameImage(src, alt, shape = "standard", loading = "lazy") {
  return `
    <span class="frame frame--${shape}">
      <img src="${esc(src)}" alt="${esc(alt)}" loading="${loading}" decoding="async"
           data-fallback="true">
    </span>`;
}

/** Small definition list of whichever details a film actually has. */
function filmMeta(film, fields = ["year", "role", "format", "location"]) {
  const labels = { year: "Year", role: "Role", format: "Format", location: "Location" };
  const rows = fields
    .filter((key) => film[key])
    .map((key) => `<div><dt>${labels[key]}</dt><dd>${esc(film[key])}</dd></div>`)
    .join("");
  return rows ? `<dl class="meta">${rows}</dl>` : "";
}

/** Click-to-load YouTube player. Nothing from YouTube loads until play. */
function videoPlayer(film) {
  return `
    <button class="player" type="button" data-video-id="${film.id}"
            data-title="${esc(filmTitle(film))}"
            aria-label="Play ${esc(filmTitle(film))}">
      <img src="${esc(mainStill(film))}" alt="" data-fallback="true" decoding="async">
      <span class="player__button" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg>
      </span>
    </button>`;
}


/* =================================================================
   3. PAGE SECTIONS
   ================================================================= */

/* ---------- Homepage: the opening frame ---------- */

/** The film whose frame opens the homepage (SITE.heroFilm, else the first featured). */
function heroFilm(films) {
  return (
    films.find((f) => f.id === SITE.heroFilm) ||
    films.find((f) => f.featured) ||
    films[0]
  );
}

function renderHomeHero(el) {
  const hero = heroFilm(allFilms());
  if (!hero) return;

  el.innerHTML = `
    <a class="hero-frame" href="${filmUrl(hero)}">
      ${frameImage(mainStill(hero), `Frame from ${filmTitle(hero)}`, "wide", "eager")}
    </a>
    <p class="caption container">
      From <a href="${filmUrl(hero)}">${esc(filmTitle(hero))}</a>
    </p>`;
}


/* ---------- Film index (homepage + Work page) ----------
   Entries rotate through three compositions so the index reads like
   an edited sequence rather than a grid of identical cards:
     wide  — full-width cinema crop, text beneath in two columns
     left  — image left, text right
     right — text left, image right
   A film can force one with `layout: "wide" | "left" | "right"`. */

const LAYOUT_CYCLE = ["wide", "left", "right"];

function filmEntry(film, position) {
  const layout = film.layout || LAYOUT_CYCLE[position % LAYOUT_CYCLE.length];
  const shape = layout === "wide" ? "wide" : "standard";
  const summary = firstSentence(film.description);

  return `
    <article class="entry entry--${layout}">
      <a class="entry__image" href="${filmUrl(film)}" tabindex="-1" aria-hidden="true">
        ${frameImage(mainStill(film), "", shape)}
      </a>
      <div class="entry__text">
        <div class="entry__heading">
          <p class="entry__number">${film.number}</p>
          <h3 class="entry__title"><a href="${filmUrl(film)}">${esc(filmTitle(film))}</a></h3>
        </div>
        <div class="entry__details">
          ${filmMeta(film, ["year", "role", "format"])}
          ${summary ? `<p class="entry__summary">${esc(summary)}</p>` : ""}
          <p class="entry__link"><a href="${filmUrl(film)}">Watch the film</a></p>
        </div>
      </div>
    </article>`;
}

/** data-render="film-index". With data-featured (homepage), shows the
    featured films minus the one already used as the opening frame. */
function renderFilmIndex(el) {
  let films = allFilms();
  if (el.hasAttribute("data-featured")) {
    const hero = heroFilm(films);
    const featured = films.filter((f) => f.featured && f !== hero);
    films = featured.length ? featured : films.filter((f) => f !== hero).slice(0, 2);
    // The homepage already opens on a full-width frame, so start this
    // list on a side-by-side composition instead of another wide one.
    el.innerHTML = films.map((film, i) => filmEntry(film, i + 1)).join("");
    return;
  }
  el.innerHTML = films.map((film, i) => filmEntry(film, i)).join("");
}


/* ---------- Single film page (film.html?v=VIDEO_ID) ---------- */

function renderFilmPage(el) {
  const films = allFilms();
  const id = new URLSearchParams(location.search).get("v");
  const index = films.findIndex((f) => f.id === id);

  if (index === -1) {
    el.innerHTML = `
      <div class="container film-missing">
        <h1>Film not found</h1>
        <p>That link doesn't match a film in the index.
           <a href="work.html">See all films</a>.</p>
      </div>`;
    document.title = `Film not found | ${SITE.name}`;
    return;
  }

  const film = films[index];
  const prev = films[index - 1];
  const next = films[index + 1];
  const title = filmTitle(film);
  document.title = `${title} | ${SITE.name}`;

  const credits = (film.credits || [])
    .map((c) => `<div><dt>${esc(c.role)}</dt><dd>${esc(c.name)}</dd></div>`)
    .join("");

  const frames = filmFrames(film)
    .map((src, i) => `<li>${frameImage(src, `Frame ${i + 1} from ${title}`)}</li>`)
    .join("");

  el.innerHTML = `
    <header class="container film-head">
      <p class="film-head__back"><a href="work.html">All films</a></p>
      <h1>${esc(title)}</h1>
      ${filmMeta(film)}
    </header>

    <div class="container film-player">${videoPlayer(film)}</div>

    ${film.description || credits ? `
    <section class="container film-notes">
      ${film.description ? `<div class="film-notes__text"><p>${esc(film.description)}</p></div>` : ""}
      ${credits ? `<dl class="meta meta--stacked film-notes__credits">${credits}</dl>` : ""}
    </section>` : ""}

    <section class="container film-frames" aria-label="Frames from ${esc(title)}">
      <ul class="frames">${frames}</ul>
    </section>

    <nav class="container" aria-label="More films">
      <div class="film-nav">
        <div>${prev ? `<span>Previous</span><a href="${filmUrl(prev)}">${esc(filmTitle(prev))}</a>` : ""}</div>
        <div>${next ? `<span>Next</span><a href="${filmUrl(next)}">${esc(filmTitle(next))}</a>` : ""}</div>
      </div>
    </nav>`;
}


/* ---------- About page: a frame and the film list ---------- */

function renderAboutFrame(el) {
  const films = allFilms();
  // Uses the second featured film (or the first film) so the About page
  // doesn't repeat the homepage's opening image.
  const featured = films.filter((f) => f.featured);
  const film = featured[1] || films[0];
  if (!film) return;
  el.innerHTML = `
    ${frameImage(mainStill(film), `Frame from ${filmTitle(film)}`)}
    <p class="caption">From <a href="${filmUrl(film)}">${esc(filmTitle(film))}</a></p>`;
}

function renderFilmList(el) {
  const rows = allFilms()
    .map((film) => `
      <tr>
        <td><a href="${filmUrl(film)}">${esc(filmTitle(film))}</a></td>
        <td>${esc(film.role || "")}</td>
        <td>${esc(film.year || "")}</td>
      </tr>`)
    .join("");
  el.innerHTML = `
    <table class="film-list">
      <thead><tr><th scope="col">Film</th><th scope="col">Role</th><th scope="col">Year</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}


/* ---------- Contact details (contact page) and footer ---------- */

function activeLinks() {
  return SITE.links.filter((link) => link.url);
}

function renderContact(el) {
  const details = [
    SITE.phone && `<div><dt>Phone</dt><dd><a href="tel:${esc(SITE.phone.replace(/[^\d+]/g, ""))}">${esc(SITE.phone)}</a></dd></div>`,
    SITE.location && `<div><dt>Based in</dt><dd>${esc(SITE.location)}</dd></div>`
  ].filter(Boolean).join("");

  const links = activeLinks()
    .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`)
    .join("");

  el.innerHTML = `
    ${SITE.availability ? `<p class="contact-lead">${esc(SITE.availability)}</p>` : ""}
    <p class="contact-email"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
    ${details ? `<dl class="meta meta--stacked">${details}</dl>` : ""}
    ${links ? `<h2 class="contact-subhead">Elsewhere</h2><ul class="link-list">${links}</ul>` : ""}`;
}

function renderFooter(el) {
  const links = activeLinks()
    .map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`)
    .join("");

  el.innerHTML = `
    <div class="container footer">
      <div>
        <p class="footer__name">${esc(SITE.name)}</p>
        <p>${esc(SITE.role)}${SITE.location ? `, ${esc(SITE.location)}` : ""}</p>
      </div>
      <div>
        <p><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
        ${links ? `<ul class="link-list link-list--inline">${links}</ul>` : ""}
      </div>
      <p class="footer__legal">&copy; ${new Date().getFullYear()} ${esc(SITE.name)}</p>
    </div>`;
}
