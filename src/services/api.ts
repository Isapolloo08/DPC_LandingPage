import { Ministry, ChurchEvent } from '../types/church';
import { MINISTRIES_DATA } from '../data/ministriesData';
import { EVENTS_DATA } from '../data/eventsData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export interface BackendMinistry {
  id: number | string;
  name: string;
  min_age: number | null;
  max_age: number | null;
  description: string | null;
  color: string | null;
  active_members_count?: number;
  today_checkins_count?: number;
  coordinators?: Array<{ id: number; name: string; email: string }>;
  volunteers?: Array<{ id: number; name: string; email: string }>;
}

export interface BackendAnnouncement {
  id: number | string;
  title: string;
  body: string;
  is_pinned?: boolean;
  created_at?: string;
  ministry_id?: number | null;
  ministry_name?: string | null;
  ministry_color?: string | null;
  author_name?: string | null;
  author_role?: string | null;
}

export interface BackendEvent {
  id: number | string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  ministry_id: number | null;
  ministry_name?: string | null;
  ministry_color?: string | null;
  creator_name?: string | null;
  rsvp_count?: number;
}

// Icon mapper for backend ministry names
const getMinistryIconName = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('kinder') || lower.includes('seed') || lower.includes('toddler')) return 'Baby';
  if (lower.includes('elementary') || lower.includes('kid') || lower.includes('covenant')) return 'Sparkles';
  if (lower.includes('high') || lower.includes('teen') || lower.includes('ignite')) return 'Flame';
  if (lower.includes('youth') || lower.includes('college') || lower.includes('campus')) return 'Compass';
  if (lower.includes('young') || lower.includes('pro') || lower.includes('career')) return 'Briefcase';
  if (lower.includes('junior') || lower.includes('adult') || lower.includes('parent') || lower.includes('couple')) return 'HeartHandshake';
  if (lower.includes('old') || lower.includes('senior') || lower.includes('saint') || lower.includes('golden')) return 'Crown';
  return 'Church';
};

// Gradient color mapper
const getMinistryGradient = (color: string | null, index: number): string => {
  const defaultGradients = [
    'from-amber-400 to-yellow-500',
    'from-emerald-400 to-teal-500',
    'from-orange-500 to-rose-600',
    'from-cyan-400 to-blue-600',
    'from-indigo-500 to-purple-600',
    'from-amber-500 to-orange-600',
    'from-dpc-gold-400 to-amber-600',
  ];
  return defaultGradients[index % defaultGradients.length];
};

/**
 * Fetch Ministries from Backend API with fallback to local static data
 */
export async function fetchMinistries(): Promise<{ data: Ministry[]; isLive: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/ministries`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawMinistries: BackendMinistry[] = await res.json();

    if (!Array.isArray(rawMinistries) || rawMinistries.length === 0) {
      return { data: MINISTRIES_DATA, isLive: false };
    }

    // Merge backend data with rich landing page metadata
    const mergedMinistries: Ministry[] = rawMinistries.map((bm, idx) => {
      // Find matching local preset for additional rich fields (verse, photos, etc.)
      const localMatch = MINISTRIES_DATA.find(
        (m) =>
          m.name.toLowerCase().includes(bm.name.toLowerCase()) ||
          m.ageBracket.toLowerCase().includes(bm.name.toLowerCase()) ||
          m.id.toLowerCase() === String(bm.id).toLowerCase()
      ) || MINISTRIES_DATA[idx % MINISTRIES_DATA.length];

      const ageRange =
        bm.min_age !== null && bm.max_age !== null
          ? `Ages ${bm.min_age} – ${bm.max_age}`
          : bm.min_age !== null
          ? `Ages ${bm.min_age}+`
          : localMatch.ageRange;

      const coordinator = bm.coordinators && bm.coordinators.length > 0
        ? bm.coordinators[0].name
        : localMatch.leader;

      return {
        id: String(bm.id),
        name: bm.name,
        tagline: localMatch.tagline || `${bm.name} Discipleship Ministry`,
        ageBracket: bm.name,
        ageRange,
        iconName: getMinistryIconName(bm.name),
        color: getMinistryGradient(bm.color, idx),
        description: bm.description || localMatch.description,
        schedule: localMatch.schedule,
        location: localMatch.location,
        leader: coordinator,
        leaderTitle: localMatch.leaderTitle,
        activities: localMatch.activities,
        keyVerse: localMatch.keyVerse,
        keyVerseRef: localMatch.keyVerseRef,
        stats: {
          membersCount:
            typeof bm.active_members_count === 'number'
              ? bm.active_members_count
              : typeof bm.active_members_count === 'string'
              ? parseInt(bm.active_members_count, 10) || 0
              : localMatch.stats.membersCount,
          activeGroups: localMatch.stats.activeGroups,
        },
        eventPhotos: localMatch.eventPhotos,
      };
    });

    return { data: mergedMinistries, isLive: true };
  } catch (err) {
    console.info('Using local fallback for ministries (Backend offline or unreachable):', err);
    return { data: MINISTRIES_DATA, isLive: false };
  }
}

/**
 * Fetch Announcements from Backend API
 */
export async function fetchAnnouncements(): Promise<{ data: BackendAnnouncement[]; isLive: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/communications/announcements`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: BackendAnnouncement[] = await res.json();
    return { data: Array.isArray(data) ? data : [], isLive: true };
  } catch (err) {
    console.info('Using local fallback for announcements:', err);
    return { data: [], isLive: false };
  }
}

/**
 * Fetch Events from Backend API with fallback to local static data
 */
export async function fetchEvents(): Promise<{ data: ChurchEvent[]; isLive: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/events`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rawEvents: BackendEvent[] = await res.json();

    if (!Array.isArray(rawEvents) || rawEvents.length === 0) {
      return { data: EVENTS_DATA, isLive: false };
    }

    const mappedEvents: ChurchEvent[] = rawEvents.map((be, idx) => {
      const startDate = new Date(be.start_time);
      const formattedDate = isNaN(startDate.getTime())
        ? be.start_time
        : startDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

      const formattedTime = isNaN(startDate.getTime())
        ? '9:00 AM'
        : startDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });

      // Category derivation
      const category: ChurchEvent['category'] = be.ministry_name?.toLowerCase().includes('youth')
        ? 'Youth'
        : idx % 3 === 0
        ? 'Worship'
        : idx % 3 === 1
        ? 'Discipleship'
        : 'Fellowship';

      return {
        id: String(be.id),
        title: be.title,
        category,
        date: formattedDate,
        time: formattedTime,
        location: be.location || 'DPC Main Sanctuary, Daet',
        description: be.description || 'Join us for this church gathering and fellowship in Christ.',
        speakerOrLeader: be.creator_name || 'Pastoral Ministry Team',
        badge: be.ministry_name || undefined,
        featured: idx === 0,
        registrationOpen: true,
        maxAttendees: 150,
        currentRsvp: be.rsvp_count || 0,
      };
    });

    return { data: mappedEvents, isLive: true };
  } catch (err) {
    console.info('Using local fallback for events:', err);
    return { data: EVENTS_DATA, isLive: false };
  }
}
