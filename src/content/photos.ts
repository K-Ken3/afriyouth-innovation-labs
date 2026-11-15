export type Photo = {
  src: string;
  alt: string;
  credit: string;
  width: number;
  height: number;
};

/**
 * Photography supplied on the Image & Photography page of the AfriYouth brand
 * guidelines. These are brand-direction images, not photographs of named
 * staff, partners or participants.
 */
export const photos = {
  electronicsLab: {
    src: "/photos/brand-electronics-lab.jpg",
    alt: "A young woman in glasses soldering components at a brightly lit workbench.",
    credit: "AfriYouth brand guidelines",
    width: 2000,
    height: 1334,
  },
  researcherVr: {
    src: "/photos/brand-researcher-vr.jpg",
    alt: "A researcher wearing a virtual-reality headset while writing at a desk in a bright office.",
    credit: "AfriYouth brand guidelines",
    width: 1335,
    height: 2000,
  },
  youngInnovatorVr: {
    src: "/photos/brand-young-innovator-vr.jpg",
    alt: "A young person wearing a virtual-reality headset beside a table of electronic components.",
    credit: "AfriYouth brand guidelines",
    width: 1333,
    height: 2000,
  },
  solarFieldTeam: {
    src: "/photos/brand-solar-field-team.jpg",
    alt: "Three engineers in hard hats reviewing a tablet beneath a solar-panel canopy.",
    credit: "AfriYouth brand guidelines",
    width: 1500,
    height: 998,
  },
  circuitWork: {
    src: "/photos/brand-circuit-work.jpg",
    alt: "A young person in glasses soldering a circuit board under warm task lighting.",
    credit: "AfriYouth brand guidelines",
    width: 2000,
    height: 1143,
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
