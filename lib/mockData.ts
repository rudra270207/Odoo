export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  avatar: string;
  bio: string;
  tripsCount: number;
  countriesVisited: number;
  milesLogged: number;
  role: 'User' | 'Admin' | 'Guide';
  joinedDate: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  location: string;
  category: 'Sightseeing' | 'Culinary' | 'Adventure' | 'Relaxation' | 'Transit';
  intensity: 'Low' | 'Moderate' | 'High';
  cost: number;
  notes?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  summary: string;
  totalDistanceKm: number;
  totalSteps: number;
  activities: ActivityItem[];
}

export interface TripSection {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  activitiesCount: number;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  country: string;
  region: string;
  startDate: string;
  endDate: string;
  status: 'Ongoing' | 'Upcoming' | 'Completed';
  budget: number;
  spent: number;
  travelersCount: number;
  gradient: string;
  coverEmoji: string;
  sections?: TripSection[];
  itineraryDays?: ItineraryDay[];
}

export interface SuggestionItem {
  id: string;
  title: string;
  location: string;
  region: string;
  category: 'Adventure' | 'Culinary' | 'Sightseeing' | 'Relaxation' | 'Culture';
  rating: number;
  reviewsCount: number;
  price: number;
  gradient: string;
  tag: string;
  description: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  timeAgo: string;
  title: string;
  destination: string;
  gradient: string;
  description: string;
  likes: number;
  commentsCount: number;
  savedCount: number;
  tags: string[];
}

export interface CalendarEventPill {
  id: string;
  tripId: string;
  tripTitle: string;
  destination: string;
  status: 'Ongoing' | 'Upcoming' | 'Completed';
  gradient: string;
}

// Mock User Data
export const MOCK_USER: UserProfile = {
  id: 'user-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@globetrotter.io',
  phone: '+1 (555) 234-5678',
  city: 'Barcelona',
  country: 'Spain',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  bio: 'Passionate photographer & slow-travel enthusiast exploring coastal towns and hidden mountain trails across Europe and Asia.',
  tripsCount: 14,
  countriesVisited: 22,
  milesLogged: 48200,
  role: 'User',
  joinedDate: 'March 2024',
};

// Mock Regional Selections
export const MOCK_REGIONAL_SELECTIONS = [
  {
    id: 'reg-1',
    name: 'Amalfi Riviera',
    country: 'Italy',
    gradient: 'from-teal-600 via-emerald-600 to-cyan-500',
    tag: 'Coastal Luxury',
    tripsPlanned: 340,
  },
  {
    id: 'reg-2',
    name: 'Kyoto Sanctuaries',
    country: 'Japan',
    gradient: 'from-orange-500 via-amber-500 to-red-500',
    tag: 'Heritage & Zen',
    tripsPlanned: 520,
  },
  {
    id: 'reg-3',
    name: 'Swiss Alpine Trails',
    country: 'Switzerland',
    gradient: 'from-slate-700 via-teal-800 to-cyan-900',
    tag: 'Mountain Hike',
    tripsPlanned: 290,
  },
  {
    id: 'reg-4',
    name: 'Santorini Sunset Bay',
    country: 'Greece',
    gradient: 'from-teal-500 via-cyan-500 to-orange-400',
    tag: 'Island Getaway',
    tripsPlanned: 610,
  },
  {
    id: 'reg-5',
    name: 'Reykjavik Glaciers',
    country: 'Iceland',
    gradient: 'from-teal-800 via-cyan-700 to-slate-900',
    tag: 'Nordic Wonders',
    tripsPlanned: 180,
  },
];

// Mock Trips Data
export const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-1',
    title: 'Amalfi Coast Dream & Positano Cliffside Walk',
    destination: 'Positano & Amalfi',
    country: 'Italy',
    region: 'Europe',
    startDate: '2026-08-20',
    endDate: '2026-08-28',
    status: 'Ongoing',
    budget: 3200,
    spent: 1840,
    travelersCount: 2,
    gradient: 'from-teal-700 via-teal-600 to-orange-400',
    coverEmoji: '🍋',
    sections: [
      {
        id: 'sec-1',
        title: 'Arrival & Naples Pizza Tasting',
        description: 'Flight check-in, ferry transfer to Sorrento & evening street food trail.',
        startDate: '2026-08-20',
        endDate: '2026-08-22',
        budget: 950,
        activitiesCount: 5,
      },
      {
        id: 'sec-2',
        title: 'Path of the Gods Hike & Cliffside Dinners',
        description: 'Guided trail walk from Bomerano to Nocelle with local wine tasting.',
        startDate: '2026-08-23',
        endDate: '2026-08-25',
        budget: 1250,
        activitiesCount: 6,
      },
      {
        id: 'sec-3',
        title: 'Capri Private Boat Charter & Grottos',
        description: 'Full day excursion to Blue Grotto & Faraglioni rocks.',
        startDate: '2026-08-26',
        endDate: '2026-08-28',
        budget: 1000,
        activitiesCount: 4,
      },
    ],
    itineraryDays: [
      {
        dayNumber: 1,
        date: '2026-08-20',
        title: 'Arrival in Naples & Ferry to Positano',
        summary: 'Check into hotel, explore cliffside alleyways & sunset aperitivo at Franco’s Bar.',
        totalDistanceKm: 8.4,
        totalSteps: 12400,
        activities: [
          {
            id: 'act-1',
            title: 'Express Ferry Transfer to Positano Port',
            time: '10:30 AM',
            location: 'Naples Beverello Port',
            category: 'Transit',
            intensity: 'Low',
            cost: 45,
            notes: 'Pre-booked ticket with baggage voucher.',
          },
          {
            id: 'act-2',
            title: 'Hotel Check-in & Terrace Refreshment',
            time: '01:00 PM',
            location: 'Hotel Eden Roc Positano',
            category: 'Relaxation',
            intensity: 'Low',
            cost: 0,
          },
          {
            id: 'act-3',
            title: 'Historical Village Center Walking Tour',
            time: '04:00 PM',
            location: 'Piazza dei Mulini',
            category: 'Sightseeing',
            intensity: 'Moderate',
            cost: 25,
          },
          {
            id: 'act-4',
            title: 'Sunset Aperitivo & Seafood Dinner',
            time: '07:30 PM',
            location: 'Ristorante La Sponda',
            category: 'Culinary',
            intensity: 'Low',
            cost: 130,
          },
        ],
      },
      {
        dayNumber: 2,
        date: '2026-08-21',
        title: 'Path of the Gods (Sentiero degli Dei) Trek',
        summary: 'Breathtaking 7km cliffside trail high above the Tyrrhenian Sea followed by beach relaxation.',
        totalDistanceKm: 14.2,
        totalSteps: 19800,
        activities: [
          {
            id: 'act-5',
            title: 'Early Bus to Bomerano Trailhead',
            time: '07:30 AM',
            location: 'Positano Bus Stop',
            category: 'Transit',
            intensity: 'Low',
            cost: 10,
          },
          {
            id: 'act-6',
            title: 'Guided Path of the Gods Cliff Trek',
            time: '08:30 AM',
            location: 'Sentiero degli Dei',
            category: 'Adventure',
            intensity: 'High',
            cost: 60,
            notes: 'Wear sturdy hiking boots & carry 2L water.',
          },
          {
            id: 'act-7',
            title: 'Rustic Lemon Grove Lunch in Nocelle',
            time: '01:00 PM',
            location: 'Trattoria Santa Croce',
            category: 'Culinary',
            intensity: 'Low',
            cost: 55,
          },
          {
            id: 'act-8',
            title: 'Fornillo Beach Lounging & Swimming',
            time: '04:30 PM',
            location: 'Spiaggia del Fornillo',
            category: 'Relaxation',
            intensity: 'Low',
            cost: 40,
          },
        ],
      },
      {
        dayNumber: 3,
        date: '2026-08-22',
        title: 'Capri Island Boat Charter & Blue Grotto',
        summary: 'Cruising around Capri island, swimming in secluded bays and chairlift to Mount Solaro.',
        totalDistanceKm: 11.0,
        totalSteps: 14500,
        activities: [
          {
            id: 'act-9',
            title: 'Private Gozzo Boat Charter Departure',
            time: '09:00 AM',
            location: 'Positano Main Pier',
            category: 'Adventure',
            intensity: 'Moderate',
            cost: 250,
          },
          {
            id: 'act-10',
            title: 'Blue Grotto & Faraglioni Rocks Swim',
            time: '11:30 AM',
            location: 'Capri Coastal Waters',
            category: 'Sightseeing',
            intensity: 'Moderate',
            cost: 30,
          },
          {
            id: 'act-11',
            title: 'Anacapri Chairlift to Mount Solaro Viewpoint',
            time: '03:00 PM',
            location: 'Piazza Vittoria Anacapri',
            category: 'Sightseeing',
            intensity: 'Low',
            cost: 14,
          },
        ],
      },
    ],
  },
  {
    id: 'trip-2',
    title: 'Kyoto & Nara Autumn Sanctuary Expedition',
    destination: 'Kyoto & Nara',
    country: 'Japan',
    region: 'Asia',
    startDate: '2026-10-10',
    endDate: '2026-10-18',
    status: 'Upcoming',
    budget: 4500,
    spent: 900,
    travelersCount: 1,
    gradient: 'from-orange-500 via-amber-500 to-rose-600',
    coverEmoji: '🍁',
    sections: [
      {
        id: 'sec-4',
        title: 'Arashiyama Bamboo Grove & Tenryu-ji Temple',
        description: 'Morning walk through bamboo forests & traditional tea ceremonies.',
        startDate: '2026-10-10',
        endDate: '2026-10-13',
        budget: 1800,
        activitiesCount: 7,
      },
      {
        id: 'sec-5',
        title: 'Fushimi Inari Shrine & Gion Geisha District',
        description: 'Hike 10,000 torii gates and enjoy kaiseki dining.',
        startDate: '2026-10-14',
        endDate: '2026-10-18',
        budget: 2700,
        activitiesCount: 8,
      },
    ],
  },
  {
    id: 'trip-3',
    title: 'Swiss Alps Glacier Express & Matterhorn Trek',
    destination: 'Zermatt & St. Moritz',
    country: 'Switzerland',
    region: 'Europe',
    startDate: '2026-12-01',
    endDate: '2026-12-07',
    status: 'Upcoming',
    budget: 5200,
    spent: 1500,
    travelersCount: 2,
    gradient: 'from-slate-700 via-teal-800 to-cyan-900',
    coverEmoji: '🏔️',
  },
  {
    id: 'trip-4',
    title: 'Iceland Ring Road Northern Lights Safari',
    destination: 'Reykjavik & Vik',
    country: 'Iceland',
    region: 'Europe',
    startDate: '2025-11-05',
    endDate: '2025-11-14',
    status: 'Completed',
    budget: 3800,
    spent: 3720,
    travelersCount: 3,
    gradient: 'from-teal-800 via-cyan-700 to-slate-900',
    coverEmoji: '🌌',
  },
  {
    id: 'trip-5',
    title: 'Santorini & Milos Aegean Cyclades Cruise',
    destination: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    startDate: '2025-06-12',
    endDate: '2025-06-20',
    status: 'Completed',
    budget: 3100,
    spent: 3050,
    travelersCount: 2,
    gradient: 'from-teal-500 via-cyan-500 to-orange-400',
    coverEmoji: '🏛️',
  },
  {
    id: 'trip-6',
    title: 'Patagonia W-Trek Glacier Hiking Odyssey',
    destination: 'Torres del Paine',
    country: 'Chile',
    region: 'South America',
    startDate: '2025-02-10',
    endDate: '2025-02-22',
    status: 'Completed',
    budget: 4800,
    spent: 4760,
    travelersCount: 2,
    gradient: 'from-emerald-700 via-teal-800 to-slate-900',
    coverEmoji: '⛺',
  },
];

// Mock Suggestions Grid Data (for /trips/new and /search)
export const MOCK_SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'sug-1',
    title: 'Sea Kayaking through Emerald Sea Caves',
    location: 'Phuket & Phang Nga Bay',
    region: 'Southeast Asia',
    category: 'Adventure',
    rating: 4.9,
    reviewsCount: 320,
    price: 85,
    gradient: 'from-teal-600 via-emerald-500 to-cyan-400',
    tag: 'Trending Adventure',
    description: 'Glide through hidden lagoons and limestone sea caves with local guides.',
  },
  {
    id: 'sug-2',
    title: 'Tuscan Hilltop Vineyard Wine & Truffle Tasting',
    location: 'Chianti, Florence',
    region: 'Europe',
    category: 'Culinary',
    rating: 4.95,
    reviewsCount: 480,
    price: 140,
    gradient: 'from-orange-600 via-amber-600 to-rose-500',
    tag: 'Gourmet Pick',
    description: 'Sommelier-led tasting of vintage Chianti Classico paired with fresh black truffle pasta.',
  },
  {
    id: 'sug-3',
    title: 'Sunrise Hot Air Balloon Over Cappadocian Valleys',
    location: 'Cappadocia',
    region: 'Middle East',
    category: 'Sightseeing',
    rating: 4.88,
    reviewsCount: 890,
    price: 220,
    gradient: 'from-orange-500 via-rose-500 to-purple-600',
    tag: 'Bucket List',
    description: 'Float over fairy chimneys as dawn illuminates the dramatic Anatolian landscape.',
  },
  {
    id: 'sug-4',
    title: 'Baden-Baden Thermal Mineral Spa Day',
    location: 'Baden-Baden',
    region: 'Europe',
    category: 'Relaxation',
    rating: 4.75,
    reviewsCount: 195,
    price: 95,
    gradient: 'from-teal-700 via-cyan-600 to-emerald-400',
    tag: 'Wellness & Spa',
    description: 'Immerse in historic 19th-century Roman thermal baths and aromatic saunas.',
  },
  {
    id: 'sug-5',
    title: 'Kyoto Arashiyama Morning Zen Meditation',
    location: 'Kyoto',
    region: 'Asia',
    category: 'Culture',
    rating: 4.92,
    reviewsCount: 260,
    price: 60,
    gradient: 'from-amber-600 via-emerald-600 to-teal-700',
    tag: 'Cultural Heritage',
    description: 'Private morning Zen meditation session with a Buddhist monk in a dry landscape garden.',
  },
  {
    id: 'sug-6',
    title: 'Glacier Express Scenic Train Journey',
    location: 'St. Moritz to Zermatt',
    region: 'Europe',
    category: 'Sightseeing',
    rating: 4.98,
    reviewsCount: 710,
    price: 180,
    gradient: 'from-slate-700 via-teal-800 to-cyan-800',
    tag: 'Scenic Railway',
    description: 'Panoramic glass-roof rail tour across 291 bridges and 91 tunnels through the Alps.',
  },
];

// Mock Preplanned Templates (for Profile & Quick Clone)
export const MOCK_PREPLANNED_TEMPLATES = [
  {
    id: 'template-1',
    title: '7-Day Coastal Amalfi & Capri Getaway',
    destination: 'Amalfi Coast, Italy',
    duration: '7 Days',
    avgBudget: '$2,800',
    gradient: 'from-teal-600 to-orange-400',
    tags: ['Coastal', 'Gastronomy', 'Relaxation'],
  },
  {
    id: 'template-2',
    title: '10-Day Golden Route Japan Autumn Trail',
    destination: 'Tokyo, Kyoto, Osaka',
    duration: '10 Days',
    avgBudget: '$3,600',
    gradient: 'from-orange-500 to-rose-600',
    tags: ['Culture', 'Shrines', 'Street Food'],
  },
  {
    id: 'template-3',
    title: '5-Day Iceland Northern Lights Express',
    destination: 'Reykjavik & Golden Circle',
    duration: '5 Days',
    avgBudget: '$2,200',
    gradient: 'from-slate-800 to-teal-600',
    tags: ['Nature', 'Aurora', 'Hot Springs'],
  },
];

// Mock Community Posts
export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      handle: '@elena_travels',
    },
    timeAgo: '2 hours ago',
    title: 'Hidden Gem Hike: Sentiero degli Dei from Bomerano',
    destination: 'Positano, Italy',
    gradient: 'from-teal-600 via-emerald-600 to-orange-400',
    description: 'If you are visiting Amalfi Coast, skip the crowded coastal buses and take the high trail! The views over Positano from Nocelle are completely unmatched. Make sure to stop at the lemon slush stand halfway through!',
    likes: 142,
    commentsCount: 28,
    savedCount: 64,
    tags: ['Hiking', 'AmalfiCoast', 'Photography'],
  },
  {
    id: 'post-2',
    author: {
      name: 'Kenji Takahashi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      handle: '@kenji_explores',
    },
    timeAgo: '5 hours ago',
    title: 'Early Morning Bamboo Forest in Arashiyama',
    destination: 'Kyoto, Japan',
    gradient: 'from-orange-500 via-amber-500 to-teal-700',
    description: 'Pro tip: Arrive at Arashiyama Bamboo Grove by 6:30 AM before tour buses land. The rustling wind through bamboo stalks in complete morning silence is pure magic.',
    likes: 289,
    commentsCount: 45,
    savedCount: 112,
    tags: ['Kyoto', 'SoloTravel', 'Peaceful'],
  },
  {
    id: 'post-3',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      handle: '@marcus_vance',
    },
    timeAgo: '1 day ago',
    title: 'Glacier Kayaking under the Midnight Sun',
    destination: 'Jökulsárlón, Iceland',
    gradient: 'from-slate-800 via-teal-700 to-cyan-500',
    description: 'Paddling past floating icebergs in silent glacial lagoons was the single best experience of my 10-day Ring Road expedition!',
    likes: 410,
    commentsCount: 52,
    savedCount: 180,
    tags: ['Iceland', 'Glaciers', 'Adventure'],
  },
];

// Mock Calendar Trips & Multi-pill Events
export const MOCK_CALENDAR_EVENTS: Record<string, CalendarEventPill[]> = {
  '2026-08-20': [
    { id: 'c-1', tripId: 'trip-1', tripTitle: 'Amalfi Coast Dream', destination: 'Positano', status: 'Ongoing', gradient: 'bg-teal-700 text-white' }
  ],
  '2026-08-21': [
    { id: 'c-2', tripId: 'trip-1', tripTitle: 'Amalfi Coast Dream', destination: 'Positano', status: 'Ongoing', gradient: 'bg-teal-700 text-white' },
    { id: 'c-3', tripId: 'event-1', tripTitle: 'Flight to Naples', destination: 'NAP Airport', status: 'Ongoing', gradient: 'bg-orange-500 text-white' }
  ],
  '2026-08-22': [
    { id: 'c-4', tripId: 'trip-1', tripTitle: 'Amalfi Coast Dream', destination: 'Positano', status: 'Ongoing', gradient: 'bg-teal-700 text-white' }
  ],
  '2026-08-23': [
    { id: 'c-5', tripId: 'trip-1', tripTitle: 'Amalfi Coast Dream', destination: 'Positano', status: 'Ongoing', gradient: 'bg-teal-700 text-white' }
  ],
  '2026-08-24': [
    { id: 'c-6', tripId: 'trip-1', tripTitle: 'Amalfi Coast Dream', destination: 'Positano', status: 'Ongoing', gradient: 'bg-teal-700 text-white' }
  ],
  '2026-08-25': [
    { id: 'c-7', tripId: 'trip-1', tripTitle: 'Amalfi Coast Dream', destination: 'Positano', status: 'Ongoing', gradient: 'bg-teal-700 text-white' }
  ],
  '2026-08-26': [
    { id: 'c-8', tripId: 'trip-1', tripTitle: 'Capri Charter', destination: 'Capri Island', status: 'Ongoing', gradient: 'bg-cyan-600 text-white' },
    { id: 'c-9', tripId: 'event-2', tripTitle: 'Hotel Sunset Party', destination: 'Sorrento', status: 'Ongoing', gradient: 'bg-amber-600 text-white' }
  ],
  '2026-10-10': [
    { id: 'c-10', tripId: 'trip-2', tripTitle: 'Kyoto Sanctuary', destination: 'Kyoto', status: 'Upcoming', gradient: 'bg-orange-600 text-white' }
  ],
  '2026-10-11': [
    { id: 'c-11', tripId: 'trip-2', tripTitle: 'Kyoto Sanctuary', destination: 'Kyoto', status: 'Upcoming', gradient: 'bg-orange-600 text-white' },
    { id: 'c-12', tripId: 'event-3', tripTitle: 'Tea Ceremony Slot', destination: 'Gion', status: 'Upcoming', gradient: 'bg-teal-800 text-white' }
  ],
  '2026-12-01': [
    { id: 'c-13', tripId: 'trip-3', tripTitle: 'Swiss Alps Glacier', destination: 'Zermatt', status: 'Upcoming', gradient: 'bg-slate-700 text-white' }
  ],
};

// Mock Admin Dashboard Data
export const MOCK_ADMIN_USERS = [
  { id: 'u-1', name: 'Alex Rivera', email: 'alex.rivera@globetrotter.io', role: 'User', trips: 14, status: 'Active', joined: 'Mar 2024' },
  { id: 'u-2', name: 'Elena Rostova', email: 'elena@travelvibes.org', role: 'Guide', trips: 28, status: 'Active', joined: 'Jan 2024' },
  { id: 'u-3', name: 'Kenji Takahashi', email: 'kenji@kyoto-guide.jp', role: 'User', trips: 9, status: 'Active', joined: 'Apr 2024' },
  { id: 'u-4', name: 'Marcus Vance', email: 'marcus@nordic.is', role: 'Admin', trips: 32, status: 'Active', joined: 'Nov 2023' },
  { id: 'u-5', name: 'Sophia Chen', email: 'sophia@bayarea.com', role: 'User', trips: 4, status: 'Inactive', joined: 'May 2024' },
];

export const MOCK_POPULAR_CITIES = [
  { city: 'Kyoto', country: 'Japan', tripsCount: 1420, rating: 4.95 },
  { city: 'Positano', country: 'Italy', tripsCount: 1280, rating: 4.92 },
  { city: 'Santorini', country: 'Greece', tripsCount: 1150, rating: 4.89 },
  { city: 'Zermatt', country: 'Switzerland', tripsCount: 980, rating: 4.91 },
  { city: 'Reykjavik', country: 'Iceland', tripsCount: 840, rating: 4.86 },
  { city: 'Cappadocia', country: 'Turkey', tripsCount: 760, rating: 4.88 },
];

export const MOCK_POPULAR_ACTIVITIES = [
  { category: 'Sightseeing & Shrines', value: 38, fill: '#0F766E' },
  { category: 'Hiking & Trails', value: 26, fill: '#F97316' },
  { category: 'Culinary & Wine', value: 20, fill: '#14B8A6' },
  { category: 'Coastal & Boat Charters', value: 16, fill: '#F59E0B' },
];

export const MOCK_USER_TRENDS = [
  { month: 'Jan', newUsers: 450, totalBookings: 890 },
  { month: 'Feb', newUsers: 620, totalBookings: 1120 },
  { month: 'Mar', newUsers: 840, totalBookings: 1450 },
  { month: 'Apr', newUsers: 910, totalBookings: 1680 },
  { month: 'May', newUsers: 1150, totalBookings: 2100 },
  { month: 'Jun', newUsers: 1420, totalBookings: 2650 },
  { month: 'Jul', newUsers: 1680, totalBookings: 3100 },
  { month: 'Aug', newUsers: 1950, totalBookings: 3540 },
];
