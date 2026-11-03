export type Photo = {
  src: string;
  alt: string;
  credit: string;
  width: number;
  height: number;
};

/**
 * Licensed placeholder photography (Pexels). These images illustrate context
 * only; they are not AfriYouth staff, partners or participants, and will be
 * replaced with official photography.
 */
export const photos = {
  teamConversation: {
    src: "/photos/team-conversation.jpg",
    alt: "Four colleagues in conversation around a table in a bright office.",
    credit: "Ninthgrid / Pexels",
    width: 3840,
    height: 2560,
  },
  designWorkshop: {
    src: "/photos/design-workshop.jpg",
    alt: "Two colleagues arranging sticky notes on a workshop wall.",
    credit: "Vitaly Gariev / Pexels",
    width: 3840,
    height: 2160,
  },
  teamLaptop: {
    src: "/photos/team-laptop.jpg",
    alt: "Four colleagues reviewing work together around a laptop.",
    credit: "PICHA Stock / Pexels",
    width: 3840,
    height: 2560,
  },
  meetingPresentation: {
    src: "/photos/meeting-presentation.jpg",
    alt: "A colleague presenting on a tablet to a small seated team.",
    credit: "PICHA Stock / Pexels",
    width: 3840,
    height: 2560,
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;