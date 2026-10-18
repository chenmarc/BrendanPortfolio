/*
  CONTENT.JS — the only file you need to edit for the site's content.
  ===================================================================

  Everything that appears on the site comes from the lists below:
    SITE        name and email
    SOCIAL      the LinkedIn / YouTube / Instagram icons in the header
    REEL        the demo reel that auto-plays at the top of Projects
    CATEGORIES  the sections on the Projects page, in order
    PROJECTS    every video in the Projects grid
    STILLS      every image in the Stills Archive

  Any YouTube link format works (watch?v=, youtu.be/, shorts/, embed/).
*/


/* ---------- Site details ---------- */

const SITE = {
  name: "Brendan Kesterson",
  email: "placeholder@placeholder.com"   // TODO: real email (shown on About)
};


/* ---------- Header icons ----------
   TODO: replace the placeholder links. `icon` must be one of:
   "linkedin", "youtube", "instagram". */

const SOCIAL = [
  { label: "LinkedIn",  icon: "linkedin",  url: "https://www.linkedin.com/in/placeholder" },
  { label: "YouTube",   icon: "youtube",   url: "https://www.youtube.com/@placeholder" },
  { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/placeholder" }
];


/* ---------- Demo reel ----------
   Plays automatically, muted and looping, at the top of the Projects page.
   TODO: replace with the real reel. This is one of the project videos,
   used as a stand-in until the reel's link is ready. */

const REEL = "https://www.youtube.com/watch?v=yTj7HgodvdY";


/* ---------- Project sections ----------
   Sections appear on the Projects page in this order. A section with no
   projects in it is hidden automatically. */

const CATEGORIES = [
  { id: "narrative",   title: "Narrative Film" },
  { id: "freelance",   title: "Freelance Work" },
  { id: "documentary", title: "Documentary Film" }
];


/* ---------- Projects ----------
   Add a project by copying one line. `category` must match an id above.
   The title appears when someone hovers over the thumbnail.

   TODO: real titles, and check each category. These were assigned
   without knowing which video belongs where. */

const PROJECTS = [
  { title: "Project title", category: "narrative",   youtube: "https://www.youtube.com/watch?v=yTj7HgodvdY" },
  { title: "Project title", category: "narrative",   youtube: "https://www.youtube.com/watch?v=0YlwgpSw4c0" },
  { title: "Project title", category: "freelance",   youtube: "https://www.youtube.com/watch?v=LC2PFbM26wg" },
  { title: "Project title", category: "freelance",   youtube: "https://www.youtube.com/watch?v=t2gv7S7A6as" },
  { title: "Project title", category: "documentary", youtube: "https://www.youtube.com/watch?v=FNajKWpBdNY" }
];


/* ---------- Stills Archive ----------
   Put image files in assets/images/stills/ and add one line each.
   `project` appears on hover; `alt` describes the image for screen readers.
   Stills keep their own shape (16:9, 2.39:1, etc.) inside each frame.

   Export as JPG, about 2400 px wide, around 80% quality.

   TODO: replace these placeholders with real stills. */

const STILLS = [
  { src: "assets/images/stills/placeholder-01.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-02.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-03.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-04.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-05.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-06.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-07.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-08.svg", project: "Project title", alt: "Placeholder still" },
  { src: "assets/images/stills/placeholder-09.svg", project: "Project title", alt: "Placeholder still" }
];
