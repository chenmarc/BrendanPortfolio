/*
  RENDER.JS — builds the video list and contact links from content.js.
  You shouldn't need to edit this file.
*/

/** Pull the 11-character video ID out of any common YouTube URL. */
function getVideoId(url) {
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : "";
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* Each video shows its YouTube thumbnail with a play button. The real
   YouTube player only loads when it's pressed (see main.js), which keeps
   the page fast with many videos on it. */
function renderVideos(el) {
  el.innerHTML = VIDEOS.map(getVideoId).filter(Boolean).map((id, i) => `
    <li>
      <button class="player" type="button" data-video-id="${id}" aria-label="Play video ${i + 1}">
        <img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt=""
             ${i === 0 ? "" : 'loading="lazy"'} decoding="async" data-fallback>
        <span class="player__button" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg>
        </span>
      </button>
    </li>`).join("");
}

function renderContact(el) {
  el.innerHTML = CONTACT.map((c) => {
    const external = c.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    return `<div><dt>${esc(c.label)}</dt><dd><a href="${esc(c.url)}"${external}>${esc(c.text)}</a></dd></div>`;
  }).join("");
}
