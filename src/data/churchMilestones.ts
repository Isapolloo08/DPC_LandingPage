import { CHURCH_INFO } from "./churchInfo";

export interface ChurchMilestone {
  id: string;
  year: number | null;
  title: string;
  description: string;
  photo?: { src: string; alt: string; caption?: string };
  isDraft: boolean;
  isPresent?: boolean;
}

// Layout preview only. Unknown years and events must be confirmed before publication.
export const CHURCH_MILESTONES_PREVIEW: ChurchMilestone[] = [
  {
    id: "founding",
    year: CHURCH_INFO.foundedYear,
    title: "Daet Presbyterian Church begins",
    description: "Since 2007, we’ve gathered in Daet to worship Jesus, care for one another, and share His love.",
    isDraft: false,
  },
  ...Array.from({ length: 4 }, (_, index): ChurchMilestone => ({
    id: `draft-${index + 1}`,
    year: null,
    title: "Milestone details to be added",
    description: "The year, event, and historical photo for this chapter will be added after confirmation.",
    isDraft: true,
  })),
  {
    id: "today",
    year: null,
    title: "One church family",
    description: CHURCH_INFO.tagline + ".",
    isDraft: false,
    isPresent: true,
  },
];
