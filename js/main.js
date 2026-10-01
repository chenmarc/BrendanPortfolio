/*
  MAIN.JS — wires everything up when a page loads.
  ================================================
    1. Fills every <... data-render="name"> element using render.js
    2. Swaps in a fallback image if a YouTube thumbnail size is missing
    3. Loads the YouTube player only when someone presses play
*/

const RENDERERS = {
  "home-hero": renderHomeHero,
  "film-index": renderFilmIndex,
  "film-page": renderFilmPage,
  "about-frame": renderAboutFrame,
  "film-list": renderFilmList,
  "contact": renderContact,
  "footer": renderFooter
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-render]").forEach((el) => {
    const render = RENDERERS[el.dataset.render];
    if (render) render(el);
  });

  initImageFallbacks();
  initPlayers();
});


/* ---------- Image fallbacks ----------
   Not every YouTube video has a full-resolution thumbnail
   (maxresdefault). When one is missing, use the always-available
   hqdefault instead. If a frame can't load at all, hide its slot. */

function initImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const handle = () => {
      if (img.src.includes("/maxresdefault.jpg")) {
        img.src = img.src.replace("/maxresdefault.jpg", "/hqdefault.jpg");
      } else {
        const slot = img.closest("li") || img.closest(".frame");
        if (slot) slot.hidden = true;
      }
    };
    img.addEventListener("error", handle);
    // The image may have failed before this listener was attached.
    if (img.complete && img.naturalWidth === 0) handle();
  });
}


/* ---------- Click-to-load player ---------- */

function initPlayers() {
  document.querySelectorAll(".player").forEach((button) => {
    button.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src =
        `https://www.youtube-nocookie.com/embed/${button.dataset.videoId}` +
        `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      iframe.title = button.dataset.title || "Video";
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      iframe.allowFullscreen = true;

      const wrapper = document.createElement("div");
      wrapper.className = "player player--playing";
      wrapper.appendChild(iframe);
      button.replaceWith(wrapper);
      iframe.focus();
    }, { once: true });
  });
}
