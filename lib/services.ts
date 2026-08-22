import { createClient } from '@/lib/supabase/client';
import { MOCK_USER, MOCK_TRIPS, Trip, UserProfile } from '@/lib/mockData';

// Helper to check if Supabase env vars exist
export function isSupabaseConfigured(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
  );
}

// 1. FETCH USER PROFILE
export async function fetchUserProfile(userId?: string): Promise<UserProfile> {
  const supabase = createClient();
  
  if (!isSupabaseConfigured()) {
    return MOCK_USER;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return MOCK_USER;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      return {
        ...MOCK_USER,
        id: user.id,
        email: user.email || MOCK_USER.email,
        name: user.user_metadata?.name || MOCK_USER.name,
      };
    }

    return {
      id: data.id,
      name: data.name || MOCK_USER.name,
      email: data.email || MOCK_USER.email,
      phone: MOCK_USER.phone,
      city: data.city || MOCK_USER.city,
      country: data.country || MOCK_USER.country,
      avatar: MOCK_USER.avatar,
      bio: data.bio || MOCK_USER.bio,
      tripsCount: MOCK_USER.tripsCount,
      countriesVisited: MOCK_USER.countriesVisited,
      milesLogged: MOCK_USER.milesLogged,
      role: 'User',
      joinedDate: 'Recent',
    };
  } catch (err) {
    return MOCK_USER;
  }
}

// 2. UPDATE USER PROFILE
export async function updateUserProfile(profile: Partial<UserProfile>): Promise<boolean> {
  const supabase = createClient();

  if (!isSupabaseConfigured()) return true;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase.from('users').upsert({
      id: user.id,
      email: profile.email || user.email,
      name: profile.name,
      city: profile.city,
      country: profile.country,
      bio: profile.bio,
    });

    return !error;
  } catch (err) {
    return false;
  }
}

// 3. FETCH USER TRIPS LIST
export async function fetchUserTrips(): Promise<Trip[]> {
  const supabase = createClient();

  if (!isSupabaseConfigured()) return MOCK_TRIPS;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return MOCK_TRIPS;

    const { data, error } = await supabase
      .from('trips')
      .select('*, trip_sections(*, activities(*))')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return MOCK_TRIPS;

    return data.map((t: any) => ({
      id: t.id,
      title: t.name,
      destination: t.destination || 'Destination',
      country: 'Travel Spot',
      region: 'Global',
      startDate: t.start_date || '2026-09-01',
      endDate: t.end_date || '2026-09-08',
      status: 'Upcoming',
      budget: Number(t.budget) || 2500,
      spent: 0,
      travelersCount: 2,
      gradient: 'from-teal-700 via-teal-600 to-orange-400',
      coverEmoji: '✈️',
      sections: (t.trip_sections || []).map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description || '',
        startDate: t.start_date || '2026-09-01',
        endDate: t.end_date || '2026-09-08',
        budget: Number(s.budget) || 500,
        activitiesCount: (s.activities || []).length || 3,
      })),
    }));
  } catch (err) {
    return MOCK_TRIPS;
  }
}

// 4. CREATE TRIP IN SUPABASE
export async function createTripInDb(tripData: {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}): Promise<{ success: boolean; id?: string }> {
  const supabase = createClient();

  if (!isSupabaseConfigured()) {
    return { success: true, id: `trip-${Date.now()}` };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false };

    const { data, error } = await supabase
      .from('trips')
      .insert({
        user_id: user.id,
        name: tripData.name,
        destination: tripData.destination,
        start_date: tripData.startDate,
        end_date: tripData.endDate,
        budget: tripData.budget,
      })
      .select()
      .single();

    if (error || !data) return { success: false };

    return { success: true, id: data.id };
  } catch (err) {
    return { success: false };
  }
}

// 5. ADD TRIP SECTION IN SUPABASE
export async function addTripSectionDb(sectionData: {
  tripId: string;
  title: string;
  description: string;
  budget: number;
}): Promise<boolean> {
  const supabase = createClient();

  if (!isSupabaseConfigured()) return true;

  try {
    const { error } = await supabase.from('trip_sections').insert({
      trip_id: sectionData.tripId,
      title: sectionData.title,
      description: sectionData.description,
      budget: sectionData.budget,
    });

    return !error;
  } catch (err) {
    return false;
  }
}
