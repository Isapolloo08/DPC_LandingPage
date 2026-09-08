export interface MinistryPhoto {
  url: string;
  caption: string;
  tag?: string;
}

export interface Ministry {
  id: string;
  name: string;
  tagline: string;
  ageBracket: string;
  ageRange: string;
  iconName: string;
  color: string;
  description: string;
  schedule: string;
  location: string;
  leader: string;
  leaderTitle: string;
  activities: string[];
  keyVerse: string;
  keyVerseRef: string;
  stats: {
    membersCount: number;
    activeGroups: number;
  };
  eventPhotos?: MinistryPhoto[];
}

export interface ChurchEvent {
  id: string;
  title: string;
  category: 'Worship' | 'Youth' | 'Fellowship' | 'Discipleship' | 'Outreach' | 'Retreat';
  date: string;
  time: string;
  location: string;
  description: string;
  speakerOrLeader?: string;
  badge?: string;
  featured?: boolean;
  registrationOpen?: boolean;
  maxAttendees?: number;
  currentRsvp?: number;
}

export interface LifeGroup {
  id: string;
  name: string;
  demographic: string;
  locationTown: string;
  specificArea: string;
  meetingSchedule: string;
  currentBook: string;
  leader: string;
  contactNumber: string;
  format: 'In-person' | 'Hybrid' | 'Online';
  isAcceptingNewMembers: boolean;
}

export interface DiscipleshipBook {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  badge: string;
  studyDurationWeeks: number;
  recommendedFor: string;
  coverAccent: string;
}

export interface ServiceSchedule {
  name: string;
  day: string;
  time: string;
  description: string;
  targetAudience: string;
  badge?: string;
  isMainWorship?: boolean;
}

export interface VideoChapter {
  timeSeconds: number;
  timeLabel: string;
  title: string;
}

export interface VideoOrientation {
  id: string;
  title: string;
  subtitle: string;
  category: 'general' | 'ministry' | 'facilities' | 'camp';
  categoryLabel: string;
  ministryId?: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  youtubeId?: string;
  featured?: boolean;
  targetAudience?: string;
  leader?: string;
  description: string;
  keyHighlights: string[];
  chapters?: VideoChapter[];
}

export interface PrayerRequest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category: 'Healing & Health' | 'Family & Marriage' | 'Spiritual Growth' | 'Guidance & Career' | 'Thanksgiving & Praise' | 'Grief & Comfort';
  request: string;
  isConfidential: boolean; // Pastoral team only vs congregation prayer chain
  isAnonymous: boolean;
  dateSubmitted: string;
}
