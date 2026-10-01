/*
  MAIN.JS — fills each page's data-render slots, and loads a YouTube
  player only when someone presses play.
*/

const RENDERERS = {
  "videos": renderVideos,
  "contact": renderContact
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-render]").forEach((el) => {
    const render = RENDERERS[el.dataset.render];
    if (render) render(el);
  });
  initImageFallbacks();
  initPlayers();
});

/* Not every video has a full-resolution thumbnail; fall back to the
   standard one, which always exists. */
function initImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const swap = () => {
      if (img.src.includes("/maxresdefault.jpg")) {
        img.src = img.src.replace("/maxresdefault.jpg", "/hqdefault.jpg");
      }
    };
    img.addEventListener("error", swap);
    if (img.complete && img.naturalWidth === 0) swap();
  });
}

function initPlayers() {
  document.querySelectorAll(".player").forEach((button) => {
    button.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.videoId}` +
        "?autoplay=1&rel=0&playsinline=1";
      iframe.title = "YouTube video player";
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
