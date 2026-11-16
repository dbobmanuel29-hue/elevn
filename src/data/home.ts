const pexels = (id: number, w: number, h: number, ext = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const SPOTLIGHT_SLUG = "onyx-leather-trench";
export const SPOTLIGHT_DETAIL_IMAGE = pexels(36782412, 800, 1000);
export const HERO_PICK_SLUG = "noir-tailored-blazer";
export const STUDIO_IMAGE = pexels(9595286, 1000, 1200);

export type LookSeed = {
  id: string;
  title: string;
  caption: string;
  image: string;
  slugs: string[];
  hotspots: { x: number; y: number }[];
};

export const LOOKS: LookSeed[] = [
  {
    id: "studio-hours",
    title: "The modern gentleman",
    caption: "Look 01 · Refined menswear for every day",
    image: pexels(6764698, 900, 1200),
    slugs: ["tailored-wool-overcoat", "studio-pinstripe-blazer", "field-utility-jacket"],
    hotspots: [
      { x: 52, y: 36 },
      { x: 46, y: 58 },
      { x: 50, y: 78 },
    ],
  },
  {
    id: "after-dark",
    title: "The off-duty edit",
    caption: "Look 02 · Womenswear with an edge",
    image: pexels(6995886, 900, 1200),
    slugs: ["noir-moto-jacket", "sand-wide-leg-trouser", "atelier-poplin-shirt"],
    hotspots: [
      { x: 50, y: 32 },
      { x: 48, y: 70 },
      { x: 50, y: 14 },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The overcoat is the first thing I have bought in years that felt made for me. Heavy where it should be, soft where it counts.",
    name: "Tobi A.",
    city: "Lagos",
    piece: "Tailored Wool Overcoat",
  },
  {
    quote:
      "Finally a label that cuts for real bodies and real heat. The poplin shirt has not left rotation since it arrived.",
    name: "Ijeoma N.",
    city: "Abuja",
    piece: "Atelier Poplin Shirt",
  },
  {
    quote:
      "Packaging, fabric, fit — everything felt considered. It arrived next day and looked better than the photos.",
    name: "Daniel K.",
    city: "London",
    piece: "Onyx Leather Trench",
  },
];

export const PRESS = ["The Lagos Edit", "Mode Afrika", "Form Journal", "Noir Magazine", "Style Weekly"];

export const COMMUNITY = [
  { image: pexels(7624882, 700, 700), handle: "@amaka.o", caption: "Poplin, pressed" },
  { image: pexels(3027173, 700, 700), handle: "@kunle_fits", caption: "Overcoat season" },
  { image: pexels(2602628, 700, 700), handle: "@ren.ade", caption: "Stairs, Surulere" },
  { image: pexels(20175055, 700, 700), handle: "@dee.wears", caption: "Moto, mid-day" },
  { image: pexels(37688098, 700, 700), handle: "@ola.frames", caption: "Monochrome mood" },
  { image: pexels(8667730, 700, 700), handle: "@zee.knits", caption: "Rib knit, Sunday" },
];

export const SERVICES = [
  {
    number: "01",
    title: "Personal styling",
    copy: "A 45-minute session in the studio or over video. Leave with a wardrobe plan, not a sales pitch.",
    cta: "Book a styling session",
  },
  {
    number: "02",
    title: "Alterations",
    copy: "Complimentary hem and sleeve adjustments on all tailoring, finished in-house within three days.",
    cta: "Ask about alterations",
  },
  {
    number: "03",
    title: "Gifting",
    copy: "Wrapped in recycled lime paper with a handwritten note. Gift receipts included, prices hidden.",
    cta: "Send a gift",
  },
];

export const CRAFT = [
  {
    number: "01",
    title: "Fabric",
    copy: "Traceable wool, organic cotton and vegetable-tanned leather from mills we visit in person.",
  },
  {
    number: "02",
    title: "Construction",
    copy: "Bound seams, bar-tacked stress points and buttons sewn on a shank. Built to be repaired, not replaced.",
  },
  {
    number: "03",
    title: "Fit",
    copy: "Every block is tested on five bodies through a full day of movement before it reaches the cutting table.",
  },
];
