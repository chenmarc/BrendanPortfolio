/*
  MAIN.JS
  =======
  Three small, independent behaviors. Nothing here is required for the
  site to work — it's all progressive enhancement:

    1. Mobile nav toggle (the hamburger button on small screens)
    2. Click-to-load video embeds (keeps YouTube/Vimeo out of the page
       until someone actually presses play, so the page loads fast)
    3. Deep-linking from the homepage's "Selected work" teaser straight
       to the matching project row on work.html
*/

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initVideoFacades();
  openLinkedProjectRow();
});

/* ---------- 1. Mobile nav toggle ---------- */

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
  });

  // Close the menu after choosing a link, so it doesn't stay open
  // when the new page loads.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  function setNavOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.setAttribute("data-open", String(open));
  }
}

/* ---------- 2. Click-to-load video embeds ---------- */
/*
  Add a facade with:
    <button class="video-facade"
            data-provider="youtube"   (or "vimeo")
            data-embed-id="dQw4w9WgXcQ"
            data-title="Brendan Kesterson — 2026 Reel">
      <img src="..." alt="...">
      <span class="video-facade__play"> ... </span>
    </button>

  Leave data-embed-id empty until you have a real video — clicking an
  empty facade shows a reminder instead of a broken embed.
*/

function initVideoFacades() {
  document.querySelectorAll(".video-facade").forEach((facade) => {
    facade.addEventListener("click", () => loadEmbed(facade), { once: true });
  });
}

function loadEmbed(facade) {
  const provider = facade.dataset.provider;
  const embedId = (facade.dataset.embedId || "").trim();
  const title = facade.dataset.title || "Video";

  if (!embedId) {
    facade.setAttribute("aria-disabled", "true");
    facade.innerHTML = `
      <div class="video-facade__note">
        <p>No video connected yet. Add a YouTube or Vimeo ID to this
        facade's <code>data-embed-id</code> attribute to make it play.</p>
      </div>
    `;
    return;
  }

  let src = "";
  if (provider === "youtube") {
    src = `https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1&rel=0`;
  } else if (provider === "vimeo") {
    src = `https://player.vimeo.com/video/${embedId}?autoplay=1`;
  } else {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "video-embed";

  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = title;
  iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
  iframe.allowFullscreen = true;
  iframe.loading = "lazy";

  wrapper.appendChild(iframe);
  facade.replaceWith(wrapper);
}

/* ---------- 3. Deep-link to a project row on work.html ---------- */
/*
  The homepage's "Selected work" teasers link to e.g. work.html#project-01.
  If that project's <details> row exists on the page, open it and
  scroll it into view instead of leaving the visitor to find it.
*/

function openLinkedProjectRow() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (!target || target.tagName !== "DETAILS") return;

  target.open = true;
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
