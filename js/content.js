/*
  CONTENT.JS — the only file you need to edit for the site's content.
  ===================================================================

    SOCIAL      the LinkedIn / YouTube / Instagram icons in the header
    REEL        the demo reel that auto-plays at the top of Projects
    CATEGORIES  the sections on the Projects page, in order
    PROJECTS    every video in the Projects grid
    STILLS      every image in the Stills Archive, in order
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


/* ---------- Stills Archive ----------
   Images live in assets/images/. File names are case-sensitive on
   GitHub Pages ("Yes_1.jpg" and "yes_1.jpg" are different files).
   `alt` describes the image for screen readers.
   Optional: add `title: "Project name"` to show a title on hover. */

const STILLS = [
  { src: "assets/images/Yes_1.jpg",  alt: "Aerial view of a river rushing through a rocky gorge past burned forest" },
  { src: "assets/images/Yes_2.jpg",  alt: "A red classic Mustang parked in an open garage hung with American flags" },
  { src: "assets/images/Yes_3.jpg",  alt: "A man seated on a stone wall, silhouetted against a mountain sunset" },
  { src: "assets/images/yes_4.jpg",  alt: "An artist working at a studio bench surrounded by small landscape paintings" },
  { src: "assets/images/yes_5.jpg",  alt: "A man in a cap and glasses seated for an interview in a video store" },
  { src: "assets/images/yes_6.jpg",  alt: "Rugby players chasing the ball carrier across a field at night" },
  { src: "assets/images/yes_7.jpg",  alt: "Gloved hands turning skewers of meat on a smoking grill" },
  { src: "assets/images/yes_8.jpg",  alt: "A green mountain bike leaning against a tree beside a meadow" },
  { src: "assets/images/yes_9.jpg",  alt: "A man in an olive jacket smiling during an outdoor interview" },
  { src: "assets/images/Yes_10.jpg", alt: "Clouds pouring over steep, forested mountainsides" },
  { src: "assets/images/yes_11.jpg", alt: "Pink rhododendron blossoms with a bumblebee" },
  { src: "assets/images/yes_12.jpg", alt: "A gray jay perched on a post at golden hour" },
  { src: "assets/images/yes_13.jpg", alt: "Two rugby players in a team huddle under floodlights" },
  { src: "assets/images/yes_14.jpg", alt: "A weightlifter holding a barbell overhead before a cheering crowd" },
  { src: "assets/images/yes_15.jpg", alt: "A glaciated volcano rising above forested valleys" },
  { src: "assets/images/yes_16.jpg", alt: "Colored bumper plates on a weightlifting gym floor" },
  { src: "assets/images/yes_17.jpg", alt: "Students in school uniforms gathered around an SUV in a gravel lot" },
  { src: "assets/images/yes_18.jpg", alt: "Low cloud over a forested mountain above a lakeside waterfront" },
  { src: "assets/images/maybe_6.jpg", alt: "Two men in conversation on stage during a Q&A in a cinema" },
  { src: "assets/images/maybe_7.jpg", alt: "A mule looking into the camera in a sunny paddock" }
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
