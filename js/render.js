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


/* ---------- Demo reel ----------
   Desktop: a muted, looping player sized to fill the frame like a
   background video, with "Watch with sound" to open it with audio.
   Phones and tablets: a normal embedded player that still tries to
   autoplay muted, but has YouTube's controls so it can be tapped to play
   when the device blocks autoplay (e.g. Low Power Mode).
   Visitors who've asked their device to reduce motion get a still frame
   and the "Watch with sound" button instead of autoplay. */

function renderReel(el) {
  const id = getVideoId(REEL);
  if (!id) { el.hidden = true; return; }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const base = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&rel=0&playsinline=1&modestbranding=1`;
  const allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";

  if (touch && !reduceMotion) {
    el.classList.add("reel--touch");
    el.innerHTML = `
      <iframe src="${base}&controls=1" title="Demo reel" allow="${allow}" allowfullscreen></iframe>`;
    return;
  }

  el.innerHTML = `
    <div class="reel__frame">
      ${reduceMotion
        ? `<img src="${thumbnail(id)}" alt="" data-fallback>`
        : `<iframe src="${base}&controls=0&disablekb=1"
                   title="Demo reel" tabindex="-1" aria-hidden="true" allow="${allow}"></iframe>`}
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


/* ---------- Stills ---------- */

function renderStills(el) {
  el.innerHTML = STILLS.map((name) => {
    const src = STILLS_FOLDER + name;
    return `
    <li>
      <button class="tile tile--still" type="button" data-image="${esc(src)}" aria-label="Enlarge still">
        <span class="tile__frame">
          <img src="${esc(src)}" alt="" loading="lazy" decoding="async">
        </span>
      </button>
    </li>`;
  }).join("");
}


/* ---------- About Me ----------
   One centered column: photo, then the description, then contact links. */

function renderAbout(el) {
  const photo = ABOUT.photo
    ? `<figure class="about__photo"><img src="${esc(ABOUT.photo)}" alt="${esc(ABOUT.photoAlt)}"></figure>`
    : "";

  const email = ABOUT.email
    ? `<div><dt>Email</dt><dd><a href="mailto:${esc(ABOUT.email)}">${esc(ABOUT.email)}</a></dd></div>`
    : "";

  const links = SOCIAL.filter((s) => s.url).map((s) => `
    <div><dt>${esc(s.label)}</dt><dd><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.handle || s.label)}</a></dd></div>`
  ).join("");

  el.innerHTML = `
    <h1>About Me</h1>
    ${photo}
    ${ABOUT.bio.map((p) => `<p class="about__bio">${esc(p)}</p>`).join("")}
    <dl class="about__contact">${email}${links}</dl>`;
}
