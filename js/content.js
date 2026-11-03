/*
  CONTENT.JS — the only file you need to edit for the site's content.
  ===================================================================

    SOCIAL      LinkedIn / YouTube / Instagram (header icons + About Me)
    REEL        the demo reel that auto-plays at the top of Projects
    PROJECTS    every video in the Projects grid
    STILLS      every image on the Stills page, in order
    ABOUT       the About Me page: photo, description, email

  Any YouTube link format works (watch?v=, youtu.be/, shorts/, embed/).
*/


/* ---------- Social links ----------
   Shown as icons in the header and as links on About Me.
   `icon` must be "linkedin", "youtube", or "instagram".
   `handle` is the link text on About Me. */

const SOCIAL = [
  { label: "LinkedIn",  icon: "linkedin",  handle: "Brendan Kesterson", url: "https://www.linkedin.com/in/brendan-kesterson-22063a24b/" },
  { label: "YouTube",   icon: "youtube",   handle: "@B_Borderless",     url: "https://www.youtube.com/@B_Borderless" },
  { label: "Instagram", icon: "instagram", handle: "@b_borderless_",    url: "https://www.instagram.com/b_borderless_/" }
];


/* ---------- Demo reel ----------
   Plays automatically, muted and looping, at the top of Projects. */

const REEL = "https://www.youtube.com/watch?v=E7TyR8BJIfg";


/* ---------- Projects ----------
   Every video in the Projects grid, in display order. Add a project by
   copying one line; the title appears when someone hovers over it. */

const PROJECTS = [
  { title: "Blood and Ash Trailer", youtube: "https://youtu.be/bQ8Ka11HBqk" },
  { title: "Bodacious",             youtube: "https://youtu.be/ARXyO38aNAg" },
  { title: "Whiskey Priest",        youtube: "https://youtu.be/TDgXP2ldb_E" },
  { title: "UO International Business & Economics Club 2026 Black Tie Dinner", youtube: "https://www.youtube.com/watch?v=yTj7HgodvdY" },
  { title: "CINE 425 Advanced Lighting Techniques Final Projects",              youtube: "https://www.youtube.com/watch?v=0YlwgpSw4c0" },
  { title: "The Revival of Retro - JCOM 220 Documentary Project",               youtube: "https://www.youtube.com/watch?v=LC2PFbM26wg" },
  { title: "Unspool - Product Design Debut",                                    youtube: "https://www.youtube.com/watch?v=t2gv7S7A6as" },
  { title: "Don’t Sweat it - UO Weightlifting Club",                            youtube: "https://www.youtube.com/watch?v=FNajKWpBdNY" },
  { title: "Harmony - Guitar Short",                                            youtube: "https://www.youtube.com/watch?v=QZfTDFe9uIM" }
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


/* ---------- About Me ----------
   photo:  the portrait shown beside the text (in assets/images/).
   email:  shown above the social links.
   bio:    one string per paragraph. */

const ABOUT = {
  photo: "assets/images/profilephoto.jpg",
  photoAlt: "Brendan Kesterson",
  email: "Brendankesterson1@gmail.com",
  bio: [
    "I’m someone who took the saying, “Take only pictures and leave only footprints.” to heart. My passion for filmmaking stems from the joy of capturing the scenes and people around me in order to share the stories they hold. I find deep importance in natural elements of our world, and the best way I’ve found to embrace that appreciation is through watching from a respectful distance, ideally through a camera lens. My experience in video is diverse, ranging from a study of narrative film in college, filming outdoor recreation, and documentary work. If you have stories to share, exciting moments you want captured, or just a friendly face to collaborate with, consider me the ideal applicant for the job."
  ]
};
