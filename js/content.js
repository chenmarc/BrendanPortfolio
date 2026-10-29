/*
  CONTENT.JS — the only file you need to edit for the site's content.
  ===================================================================

    SOCIAL      the LinkedIn / YouTube / Instagram icons in the header
    REEL        the demo reel that auto-plays at the top of Projects
    CATEGORIES  the sections on the Projects page, in order
    PROJECTS    every video in the Projects grid
    STILLS      every image on the Stills page, in order
    ABOUT       the About page: photo, description, email

  Any YouTube link format works (watch?v=, youtu.be/, shorts/, embed/).
*/


/* ---------- Header icons ----------
   `icon` must be "linkedin", "youtube", or "instagram".
   `handle` is the link text shown on the About page. */

const SOCIAL = [
  { label: "LinkedIn",  icon: "linkedin",  handle: "Brendan Kesterson", url: "https://www.linkedin.com/in/brendan-kesterson-22063a24b/" },
  { label: "YouTube",   icon: "youtube",   handle: "@B_Borderless",     url: "https://www.youtube.com/@B_Borderless" },
  { label: "Instagram", icon: "instagram", handle: "@b_borderless_",    url: "https://www.instagram.com/b_borderless_/" }
];


/* ---------- Demo reel ----------
   Plays automatically, muted and looping, at the top of Projects. */

const REEL = "https://youtu.be/eAFqgfoAOGs";


/* ---------- Project sections ----------
   Shown in this order. A section with no projects is hidden. */

const CATEGORIES = [
  { id: "narrative",   title: "Narrative Film" },
  { id: "freelance",   title: "Freelance Work" },
  { id: "documentary", title: "Documentary Film" }
];


/* ---------- Projects ----------
   One line per video. `category` must match an id above.
   The title appears when someone hovers over the thumbnail. */

const PROJECTS = [
  { title: "Blood and Ash Trailer", category: "narrative", youtube: "https://youtu.be/bQ8Ka11HBqk" },
  { title: "Bodacious",             category: "narrative", youtube: "https://youtu.be/ARXyO38aNAg" },
  { title: "Whiskey Priest",        category: "narrative", youtube: "https://youtu.be/TDgXP2ldb_E" }
];


/* ---------- Stills ----------
   File names of the images in assets/images/, in display order.
   Names are case-sensitive on GitHub Pages: "Yes_1.jpg" and
   "yes_1.jpg" are different files, so each name here must match the
   file exactly. */

const STILLS_FOLDER = "assets/images/";

const STILLS = [
  "Yes_1.jpg",
  "Yes_2.jpg",
  "Yes_3.jpg",
  "yes_4.jpg",
  "yes_5.jpg",
  "yes_6.jpg",
  "yes_7.jpg",
  "yes_8.jpg",
  "yes_9.jpg",
  "Yes_10.jpg",
  "yes_11.jpg",
  "yes_12.jpg",
  "yes_13.jpg",
  "yes_14.jpg",
  "yes_15.jpg",
  "yes_16.jpg",
  "yes_17.jpg",
  "yes_18.jpg",
  "maybe_6.jpg",
  "maybe_7.jpg"
];


/* ---------- About ----------
   photo:  e.g. "assets/images/brendan.jpg" (portrait, 4:5, ~1200 x 1500 px).
           While empty, the page shows text only.
   email:  shown above the social links. While empty, it's hidden.
   bio:    one string per paragraph. */

const ABOUT = {
  photo: "",
  photoAlt: "Brendan Kesterson",
  email: "",
  bio: [
    "Brendan Kesterson is a camera operator working across narrative film, freelance work, and documentary."
  ]
};
