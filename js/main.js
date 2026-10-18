/*
  MAIN.JS
    1. Fills every <... data-render="name"> element using render.js
    2. Swaps in a smaller YouTube thumbnail when the full-size one is missing
    3. The viewer: clicking a project or still opens it full-screen
*/

const RENDERERS = {
  "social": renderSocial,
  "reel": renderReel,
  "projects": renderProjects,
  "stills": renderStills,
  "email": renderEmail
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-render]").forEach((el) => {
    const render = RENDERERS[el.dataset.render];
    if (render) render(el);
  });
  initImageFallbacks();
  initViewer();
});


/* ---------- 2. Thumbnail fallbacks ---------- */

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


/* ---------- 3. Viewer ----------
   Any button with data-video-id (a project, or the reel's "Watch with
   sound") or data-image (a still) opens here. Closing removes the
   player, which stops playback. */

function initViewer() {
  const dialog = document.createElement("dialog");
  dialog.className = "viewer";
  dialog.setAttribute("aria-label", "Viewer");
  dialog.innerHTML = `
    <button class="viewer__close" type="button" aria-label="Close">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>
    </button>
    <div class="viewer__media"></div>
    <p class="viewer__title"></p>`;
  document.body.appendChild(dialog);

  const media = dialog.querySelector(".viewer__media");
  const title = dialog.querySelector(".viewer__title");
  let opener = null;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-video-id], [data-image]");
    if (!trigger) return;
    opener = trigger;

    if (trigger.dataset.videoId) {
      media.className = "viewer__media viewer__media--video";
      media.innerHTML = `<iframe
        src="https://www.youtube-nocookie.com/embed/${trigger.dataset.videoId}?autoplay=1&rel=0&playsinline=1"
        title="${trigger.dataset.title || "Video"}"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
    } else {
      media.className = "viewer__media viewer__media--image";
      const img = document.createElement("img");
      img.src = trigger.dataset.image;
      img.alt = trigger.dataset.alt || "";
      media.replaceChildren(img);
    }

    title.textContent = trigger.dataset.title || "";
    dialog.showModal();
  });

  dialog.querySelector(".viewer__close").addEventListener("click", () => dialog.close());

  // Clicking the dark area outside the media closes the viewer.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    media.replaceChildren();
    if (opener) opener.focus();
  });
}
