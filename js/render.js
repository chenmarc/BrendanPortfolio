/*
  RENDER.JS — turns content.js into page markup.
  You shouldn't need to edit this file to change content.
*/


/* ---------- Helpers ---------- */

/** Pull the 11-character video ID out of any common YouTube URL. */
function getVideoId(url) {
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : "";
}

/** YouTube's full-size thumbnail. main.js swaps in a smaller one if missing. */
function thumbnail(id) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.25v.01M12 17v-6.5M12 13.5c0-1.8 1.1-3 2.5-3s2.5 1 2.5 3V17"/></svg>`,
  youtube:  `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10.25 9.25v5.5L15 12z" class="fill"/></svg>`,
  instagram:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.25" cy="6.75" r="0.6" class="fill"/></svg>`
};


/* ---------- Header icons ---------- */

function renderSocial(el) {
  el.innerHTML = SOCIAL.filter((s) => s.url && ICONS[s.icon]).map((s) => `
    <li><a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${ICONS[s.icon]}</a></li>`
  ).join("");
}


/* ---------- Demo reel ----------
   A muted, looping YouTube player sized to fill the frame like a
   background video. "Watch with sound" opens it in the full viewer.
   Visitors who've asked their device to reduce motion get a still frame
   and a play button instead of autoplay. */

function renderReel(el) {
  const id = getVideoId(REEL);
  if (!id) { el.hidden = true; return; }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = `autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1&disablekb=1`;

  el.innerHTML = `
    <div class="reel__frame">
      ${reduceMotion
        ? `<img src="${thumbnail(id)}" alt="" data-fallback>`
        : `<iframe src="https://www.youtube-nocookie.com/embed/${id}?${params}"
                   title="Demo reel" tabindex="-1" aria-hidden="true"
                   allow="autoplay; encrypted-media; picture-in-picture"></iframe>`}
    </div>
    <button class="reel__sound" type="button" data-video-id="${id}" data-title="Demo reel">
      Watch with sound
    </button>`;
}


/* ---------- Projects ---------- */

function projectTile(project) {
  const id = getVideoId(project.youtube);
  if (!id) return "";
  return `
    <li>
      <button class="tile" type="button" data-video-id="${id}" data-title="${esc(project.title)}">
        <span class="tile__frame">
          <img src="${thumbnail(id)}" alt="" loading="lazy" decoding="async" data-fallback>
        </span>
        <span class="tile__title">${esc(project.title)}</span>
      </button>
    </li>`;
}

function renderProjects(el) {
  el.innerHTML = CATEGORIES.map((cat) => {
    const projects = PROJECTS.filter((p) => p.category === cat.id);
    if (!projects.length) return "";
    return `
      <section class="category" aria-labelledby="cat-${cat.id}">
        <h2 id="cat-${cat.id}">${esc(cat.title)}</h2>
        <ul class="grid">${projects.map(projectTile).join("")}</ul>
      </section>`;
  }).join("");
}


/* ---------- Stills Archive ---------- */

function renderStills(el) {
  el.innerHTML = STILLS.map((still) => `
    <li>
      <button class="tile tile--still" type="button"
              data-image="${esc(still.src)}" data-title="${esc(still.project)}" data-alt="${esc(still.alt)}">
        <span class="tile__frame">
          <img src="${esc(still.src)}" alt="${esc(still.alt)}" loading="lazy" decoding="async">
        </span>
        <span class="tile__title">${esc(still.project)}</span>
      </button>
    </li>`).join("");
}


/* ---------- About: email ---------- */

function renderEmail(el) {
  el.innerHTML = `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>`;
}
