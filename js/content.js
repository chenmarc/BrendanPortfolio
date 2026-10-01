/*
  CONTENT.JS — the only file you need to edit to add or change films.
  ===================================================================

  Every page reads from this file. Add a film to FILMS below and it
  automatically appears on the homepage (if featured), the Work page,
  the About page's film list, and gets its own page at
  film.html?v=<video id>. Nothing else needs to change.


  ADDING A FILM
  -------------
  Copy one of the { ... } blocks in FILMS, paste it where you want it in
  the order (the list order is the order on the site), and fill it in.
  Only `youtube` is required — everything else is optional and simply
  doesn't show if left empty.

    {
      youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
      title: "Title of the film",
      year: "2025",
      role: "Camera",                 // your role on it
      format: "Short film",           // short film, documentary, commercial…
      location: "Oregon Coast",
      description: "One to three sentences about the film and how it was shot.",
      featured: true,                 // show it on the homepage
      still: "",                      // optional: your own frame grab (see below)
      stills: [],                     // optional: your own frames for the film page
      credits: []                     // optional: [{ role: "Director", name: "…" }]
    },

  Any YouTube link format works (watch?v=, youtu.be/, shorts/, embed/).


  IMAGES
  ------
  By default every film's image comes straight from YouTube: its
  thumbnail for the main image, and three frames YouTube samples from
  the video for the film page. No files to manage.

  For a better-looking site, export your own frame grabs instead and put
  them in assets/images/stills/ — then point to them:

      still: "assets/images/stills/tidepools-main.jpg",
      stills: [
        "assets/images/stills/tidepools-1.jpg",
        "assets/images/stills/tidepools-2.jpg",
        "assets/images/stills/tidepools-3.jpg"
      ],

  Use 16:9 JPGs, about 2400 px wide for `still` and 1600 px wide for
  `stills`, exported around 80% quality.
*/


/* ---------- Site-wide details (used by the footer, contact page, etc.) ---------- */

const SITE = {
  name: "Brendan Kesterson",
  role: "Camera operator",
  location: "",                            // TODO: your base, e.g. "Portland, Oregon" (hidden while empty)
  email: "hello@brendankesterson.com",     // TODO: your real address
  phone: "",                               // optional; leave "" to hide
  availability: "Available for camera work on short films, documentary, commercials, and music videos. Willing to travel.",

  // Social / profile links. Remove any you don't use; order is display order.
  links: [
    { label: "YouTube", url: "https://www.youtube.com/@B_Borderless" },
    { label: "Instagram", url: "" },       // TODO: add your profile URL, or delete this line
    { label: "Vimeo", url: "" }            // TODO: add your profile URL, or delete this line
  ],

  // Which film opens the homepage. Use its YouTube video ID.
  // Leave "" to use the first featured film.
  heroFilm: ""
};


/* ---------- Films ---------- */
/*
  TODO (Brendan): add each film's title, year, and a sentence or two of
  description. Until a title is filled in, the film shows as "Film 01",
  "Film 02", and so on, in list order.
*/

const FILMS = [
  {
    youtube: "https://www.youtube.com/watch?v=yTj7HgodvdY",
    title: "",
    year: "",
    role: "Camera",
    format: "",
    location: "",
    description: "",
    featured: true
  },
  {
    youtube: "https://www.youtube.com/watch?v=0YlwgpSw4c0",
    title: "",
    year: "",
    role: "Camera",
    format: "",
    location: "",
    description: "",
    featured: true
  },
  {
    youtube: "https://www.youtube.com/watch?v=LC2PFbM26wg",
    title: "",
    year: "",
    role: "Camera",
    format: "",
    location: "",
    description: "",
    featured: true
  },
  {
    youtube: "https://www.youtube.com/watch?v=t2gv7S7A6as",
    title: "",
    year: "",
    role: "Camera",
    format: "",
    location: "",
    description: "",
    featured: true
  },
  {
    youtube: "https://www.youtube.com/watch?v=FNajKWpBdNY",
    title: "",
    year: "",
    role: "Camera",
    format: "",
    location: "",
    description: "",
    featured: false
  }
];
