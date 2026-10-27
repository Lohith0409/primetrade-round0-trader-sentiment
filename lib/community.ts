import { 
  PlayerProfile, 
  CommunityGame, 
  Friendship, 
  ChatMessage, 
  PostGameRatingSubmission, 
  SpeecatNotification,
  SkillLevel,
  SKILL_LEVEL_SCORES
} from "@/types/community";
import { SportType } from "@/types/venue";

export const STORAGE_CURRENT_USER = "speecat_current_user_id";
export const STORAGE_PLAYERS = "speecat_community_players";
export const STORAGE_GAMES = "speecat_community_games";
export const STORAGE_FRIENDS = "speecat_community_friends";
export const STORAGE_CHATS = "speecat_community_chats";
export const STORAGE_RATINGS = "speecat_community_ratings";
export const STORAGE_NOTIFICATIONS = "speecat_community_notifications";

// Initial Profiles
export const INITIAL_PLAYERS: PlayerProfile[] = [
  {
    id: "player-rohith",
    name: "Rohith Player",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate badminton and cricket player based in Gachibowli. Love competitive weekend games and meeting local sports enthusiasts!",
    city: "Hyderabad",
    locality: "Gachibowli",
    favoriteSports: ["Badminton", "Cricket", "Football", "Pickleball"],
    sportSkills: {
      Badminton: {
        selfAssessed: "Intermediate",
        communityLevel: "Intermediate",
        ratingsCount: 8,
        distribution: { Beginner: 0, Amateur: 1, Intermediate: 5, Advanced: 2, Professional: 0 },
      },
      Cricket: {
        selfAssessed: "Intermediate",
        communityLevel: "Intermediate",
        ratingsCount: 5,
        distribution: { Beginner: 0, Amateur: 1, Intermediate: 3, Advanced: 1, Professional: 0 },
      },
      Football: {
        selfAssessed: "Amateur",
        ratingsCount: 2,
        distribution: { Beginner: 1, Amateur: 1, Intermediate: 0, Advanced: 0, Professional: 0 },
      },
      Pickleball: {
        selfAssessed: "Beginner",
        ratingsCount: 0,
        distribution: { Beginner: 0, Amateur: 0, Intermediate: 0, Advanced: 0, Professional: 0 },
      },
    },
    sportsmanship: {
      overallScore: 4.9,
      totalReviews: 12,
      punctuality: 4.9,
      teamwork: 5.0,
      fairPlay: 4.8,
      communication: 4.9,
      reliability: 4.8,
    },
    gamesPlayed: 14,
    gamesHosted: 3,
    friendsCount: 4,
    availability: {
      weekdays: ["07:00 PM - 10:00 PM"],
      weekends: ["06:00 AM - 10:00 AM", "05:00 PM - 09:00 PM"],
    },
    isPublic: true,
    contactPrivacy: "friends_only",
    createdAt: "2026-08-15T10:00:00Z",
  },
  {
    id: "player-rahul",
    name: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Badminton tournament player and weekend host. Looking for high intensity rallies!",
    city: "Hyderabad",
    locality: "Gachibowli",
    favoriteSports: ["Badminton", "Tennis"],
    sportSkills: {
      Badminton: {
        selfAssessed: "Advanced",
        communityLevel: "Advanced",
        ratingsCount: 15,
        distribution: { Beginner: 0, Amateur: 0, Intermediate: 3, Advanced: 11, Professional: 1 },
      },
      Tennis: {
        selfAssessed: "Intermediate",
        communityLevel: "Intermediate",
        ratingsCount: 4,
        distribution: { Beginner: 0, Amateur: 1, Intermediate: 3, Advanced: 0, Professional: 0 },
      },
    },
    sportsmanship: {
      overallScore: 4.8,
      totalReviews: 16,
      punctuality: 4.8,
      teamwork: 4.9,
      fairPlay: 5.0,
      communication: 4.7,
      reliability: 4.8,
    },
    gamesPlayed: 28,
    gamesHosted: 12,
    friendsCount: 18,
    availability: {
      weekdays: ["06:00 AM - 08:00 AM"],
      weekends: ["06:00 AM - 11:00 AM"],
    },
    isPublic: true,
    contactPrivacy: "friends_only",
    createdAt: "2026-06-10T10:00:00Z",
  },
  {
    id: "player-priya",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Weekend badminton enthusiast and pickleball explorer. Playing for fun and fitness!",
    city: "Hyderabad",
    locality: "Kondapur",
    favoriteSports: ["Badminton", "Pickleball"],
    sportSkills: {
      Badminton: {
        selfAssessed: "Intermediate",
        communityLevel: "Intermediate",
        ratingsCount: 9,
        distribution: { Beginner: 0, Amateur: 2, Intermediate: 6, Advanced: 1, Professional: 0 },
      },
      Pickleball: {
        selfAssessed: "Amateur",
        ratingsCount: 3,
        distribution: { Beginner: 1, Amateur: 2, Intermediate: 0, Advanced: 0, Professional: 0 },
      },
    },
    sportsmanship: {
      overallScore: 5.0,
      totalReviews: 10,
      punctuality: 5.0,
      teamwork: 5.0,
      fairPlay: 5.0,
      communication: 4.9,
      reliability: 5.0,
    },
    gamesPlayed: 18,
    gamesHosted: 4,
    friendsCount: 11,
    availability: {
      weekdays: ["06:30 PM - 09:30 PM"],
      weekends: ["07:00 AM - 11:00 AM"],
    },
    isPublic: true,
    contactPrivacy: "friends_only",
    createdAt: "2026-07-01T10:00:00Z",
  },
  {
    id: "player-arjun",
    name: "Arjun Reddy",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Football turf playmaker & box cricket batter in Madhapur / HITEC City.",
    city: "Hyderabad",
    locality: "Madhapur",
    favoriteSports: ["Football", "Cricket"],
    sportSkills: {
      Football: {
        selfAssessed: "Advanced",
        communityLevel: "Advanced",
        ratingsCount: 12,
        distribution: { Beginner: 0, Amateur: 0, Intermediate: 2, Advanced: 9, Professional: 1 },
      },
      Cricket: {
        selfAssessed: "Intermediate",
        communityLevel: "Intermediate",
        ratingsCount: 7,
        distribution: { Beginner: 0, Amateur: 1, Intermediate: 5, Advanced: 1, Professional: 0 },
      },
    },
    sportsmanship: {
      overallScore: 4.7,
      totalReviews: 15,
      punctuality: 4.6,
      teamwork: 4.8,
      fairPlay: 4.8,
      communication: 4.7,
      reliability: 4.6,
    },
    gamesPlayed: 24,
    gamesHosted: 8,
    friendsCount: 14,
    availability: {
      weekdays: ["08:00 PM - 11:00 PM"],
      weekends: ["06:00 PM - 11:00 PM"],
    },
    isPublic: true,
    contactPrivacy: "public",
    createdAt: "2026-06-20T10:00:00Z",
  },
  {
    id: "player-ananya",
    name: "Ananya Rao",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate about pickleball and swimming in Kondapur. Active morning player!",
    city: "Hyderabad",
    locality: "Kondapur",
    favoriteSports: ["Pickleball", "Swimming", "Badminton"],
    sportSkills: {
      Pickleball: {
        selfAssessed: "Intermediate",
        communityLevel: "Intermediate",
        ratingsCount: 6,
        distribution: { Beginner: 0, Amateur: 1, Intermediate: 4, Advanced: 1, Professional: 0 },
      },
      Swimming: {
        selfAssessed: "Advanced",
        ratingsCount: 1,
        distribution: { Beginner: 0, Amateur: 0, Intermediate: 0, Advanced: 1, Professional: 0 },
      },
    },
    sportsmanship: {
      overallScore: 4.9,
      totalReviews: 7,
      punctuality: 4.9,
      teamwork: 5.0,
      fairPlay: 4.9,
      communication: 4.8,
      reliability: 4.9,
    },
    gamesPlayed: 9,
    gamesHosted: 2,
    friendsCount: 7,
    availability: {
      weekdays: ["06:00 AM - 08:30 AM"],
      weekends: ["07:00 AM - 10:00 AM"],
    },
    isPublic: true,
    contactPrivacy: "friends_only",
    createdAt: "2026-08-01T10:00:00Z",
  },
];

// Initial Hyderabad Games
export const INITIAL_GAMES: CommunityGame[] = [
  {
    id: "game-hyd-101",
    sport: "Badminton",
    title: "Weekend Doubles Match — Need 2 Solid Players",
    description: "Looking for 2 intermediate or advanced badminton players for 2 hours of competitive doubles at Gopichand Academy. Teak wood BWF court.",
    matchFormat: "Doubles",
    venueId: "pgba-gachibowli",
    venueName: "Pullela Gopichand Badminton Academy",
    locality: "Gachibowli",
    venueAddress: "ISB Road, Near Gachibowli Stadium, Hyderabad",
    isVenueConfirmed: true,
    courtName: "Court 1 - BWF Wooden Flooring",
    date: "2026-10-26",
    startTime: "07:00 PM",
    endTime: "09:00 PM",
    durationHours: 2,
    joiningDeadline: "2026-10-26T16:00:00",
    playersNeeded: 4,
    maxGroupSize: 4,
    participants: [
      {
        playerId: "player-rahul",
        name: "Rahul Verma",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Advanced",
        role: "host",
        joinedAt: "2026-10-23T10:00:00Z",
      },
      {
        playerId: "player-priya",
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Intermediate",
        role: "player",
        joinedAt: "2026-10-23T11:30:00Z",
      },
    ],
    joinRequests: [],
    skillRequirement: {
      type: "range",
      minLevel: "Intermediate",
      maxLevel: "Advanced",
      displayText: "Intermediate to Advanced",
    },
    hostId: "player-rahul",
    hostName: "Rahul Verma",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    costPerPlayer: 300,
    isSplitCost: true,
    equipmentNotes: "Mavis 350 shuttles provided. Bring your own racquets and non-marking shoes.",
    visibility: "public",
    rules: ["Non-marking shoes mandatory", "Please arrive 10 minutes prior", "Sporty & friendly attitude"],
    status: "Open",
    attendanceConfirmed: false,
    actualAttendees: [],
    createdAt: "2026-10-23T09:00:00Z",
  },
  {
    id: "game-hyd-102",
    sport: "Football",
    title: "5v5 Floodlight Friendly Match (AstroTurf)",
    description: "Friday night football under floodlights at AstroPark Madhapur. Fast-paced, friendly 5-a-side match. Bibs and match balls provided.",
    matchFormat: "Team Match",
    venueId: "astropark-madhapur",
    venueName: "AstroPark Football & Cricket Turf",
    locality: "Madhapur",
    venueAddress: "Behind Inorbit Mall, Madhapur, Hyderabad",
    isVenueConfirmed: true,
    courtName: "Main Arena (5v5 Pitch)",
    date: "2026-10-27",
    startTime: "08:30 PM",
    endTime: "10:00 PM",
    durationHours: 1.5,
    joiningDeadline: "2026-10-27T18:00:00",
    playersNeeded: 10,
    maxGroupSize: 10,
    participants: [
      {
        playerId: "player-arjun",
        name: "Arjun Reddy",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Advanced",
        role: "host",
        joinedAt: "2026-10-23T12:00:00Z",
      },
      {
        playerId: "player-rohith",
        name: "Rohith Player",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Amateur",
        role: "player",
        joinedAt: "2026-10-23T14:00:00Z",
      },
    ],
    joinRequests: [],
    skillRequirement: {
      type: "range",
      minLevel: "Amateur",
      maxLevel: "Advanced",
      displayText: "Amateur to Advanced",
    },
    hostId: "player-arjun",
    hostName: "Arjun Reddy",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    costPerPlayer: 180,
    isSplitCost: true,
    equipmentNotes: "Turf trainers or rubber studs only. Metal studs strictly prohibited.",
    visibility: "public",
    rules: ["Zero slide tackles", "Respect referee calls", "Bring water bottle"],
    status: "Open",
    attendanceConfirmed: false,
    actualAttendees: [],
    createdAt: "2026-10-23T11:00:00Z",
  },
  {
    id: "game-hyd-103",
    sport: "Cricket",
    title: "Late Night Box Cricket — 8v8 Thriller",
    description: "Calling all cricket lovers! High-energy box cricket tournament match at The Pitch Kukatpally. Tennis balls and heavy bats provided.",
    matchFormat: "Team Match",
    venueId: "the-pitch-kukatpally",
    venueName: "The Pitch Box Cricket & Sports Hub",
    locality: "Kukatpally",
    venueAddress: "KPHB Colony Phase 3, Kukatpally, Hyderabad",
    isVenueConfirmed: true,
    courtName: "Pitch Alpha (8v8 Box Cricket)",
    date: "2026-10-28",
    startTime: "09:00 PM",
    endTime: "11:00 PM",
    durationHours: 2,
    joiningDeadline: "2026-10-28T17:00:00",
    playersNeeded: 12,
    maxGroupSize: 14,
    participants: [
      {
        playerId: "player-arjun",
        name: "Arjun Reddy",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Intermediate",
        role: "host",
        joinedAt: "2026-10-22T15:00:00Z",
      },
    ],
    joinRequests: [],
    skillRequirement: {
      type: "open",
      displayText: "Open to All Skill Levels",
    },
    hostId: "player-arjun",
    hostName: "Arjun Reddy",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    costPerPlayer: 150,
    isSplitCost: true,
    equipmentNotes: "Bats and tennis cricket balls included.",
    visibility: "public",
    rules: ["Overarm bowling", "Direct hit is out", "No spikes"],
    status: "Open",
    attendanceConfirmed: false,
    actualAttendees: [],
    createdAt: "2026-10-22T14:00:00Z",
  },
  {
    id: "game-hyd-104",
    sport: "Pickleball",
    title: "Morning Pickleball Social & Practice",
    description: "Relaxed Sunday morning pickleball session in Kondapur. Perfect for intermediate players looking to practice dinks and third shot drops.",
    matchFormat: "Doubles",
    venueId: "playall-pickleball-kondapur",
    venueName: "PlayAll Pickleball Club & Academy",
    locality: "Kondapur",
    venueAddress: "Near Botanical Gardens Road, Kondapur, Hyderabad",
    isVenueConfirmed: true,
    courtName: "Pickleball Court 1",
    date: "2026-10-29",
    startTime: "06:30 AM",
    endTime: "08:00 AM",
    durationHours: 1.5,
    joiningDeadline: "2026-10-28T21:00:00",
    playersNeeded: 4,
    maxGroupSize: 4,
    participants: [
      {
        playerId: "player-ananya",
        name: "Ananya Rao",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Intermediate",
        role: "host",
        joinedAt: "2026-10-23T16:00:00Z",
      },
      {
        playerId: "player-priya",
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Amateur",
        role: "player",
        joinedAt: "2026-10-23T18:00:00Z",
      },
    ],
    joinRequests: [],
    skillRequirement: {
      type: "range",
      minLevel: "Beginner",
      maxLevel: "Intermediate",
      displayText: "Beginner to Intermediate",
    },
    hostId: "player-ananya",
    hostName: "Ananya Rao",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    costPerPlayer: 170,
    isSplitCost: true,
    equipmentNotes: "Paddles available for borrow if you don't have one.",
    visibility: "public",
    rules: ["Court shoes required", "Fair play & encouragement"],
    status: "Open",
    attendanceConfirmed: false,
    actualAttendees: [],
    createdAt: "2026-10-23T15:00:00Z",
  },
  {
    id: "game-hyd-105",
    sport: "Badminton",
    title: "Gachibowli Evening Badminton Doubles (Completed Match)",
    description: "Fast-paced Friday badminton match at Gopichand Academy. Match completed successfully! Please rate your fellow players.",
    matchFormat: "Doubles",
    venueId: "pgba-gachibowli",
    venueName: "Pullela Gopichand Badminton Academy",
    locality: "Gachibowli",
    venueAddress: "ISB Road, Gachibowli, Hyderabad",
    isVenueConfirmed: true,
    courtName: "Court 2 - Teak Wood",
    date: "2026-10-23",
    startTime: "07:00 PM",
    endTime: "09:00 PM",
    durationHours: 2,
    joiningDeadline: "2026-10-23T16:00:00",
    playersNeeded: 4,
    maxGroupSize: 4,
    participants: [
      {
        playerId: "player-rahul",
        name: "Rahul Verma",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Advanced",
        role: "host",
        joinedAt: "2026-10-22T10:00:00Z",
        attended: true,
      },
      {
        playerId: "player-rohith",
        name: "Rohith Player",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Intermediate",
        role: "player",
        joinedAt: "2026-10-22T12:00:00Z",
        attended: true,
      },
      {
        playerId: "player-priya",
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        sportSkill: "Intermediate",
        role: "player",
        joinedAt: "2026-10-22T13:00:00Z",
        attended: true,
      },
    ],
    joinRequests: [],
    skillRequirement: {
      type: "range",
      minLevel: "Intermediate",
      maxLevel: "Advanced",
      displayText: "Intermediate to Advanced",
    },
    hostId: "player-rahul",
    hostName: "Rahul Verma",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    costPerPlayer: 300,
    isSplitCost: true,
    visibility: "public",
    rules: ["Non-marking shoes"],
    status: "Completed",
    attendanceConfirmed: true,
    actualAttendees: ["player-rahul", "player-rohith", "player-priya"],
    createdAt: "2026-10-22T08:00:00Z",
  },
];

// Initial Friendships (generated from past games)
export const INITIAL_FRIENDS: Friendship[] = [
  {
    id: "friendship-1",
    playerId1: "player-rohith",
    playerId2: "player-rahul",
    connectedAt: "2026-10-23T21:05:00Z",
    connectedViaGameId: "game-hyd-105",
    gamesPlayedTogether: 4,
    lastGameDate: "2026-10-23",
  },
  {
    id: "friendship-2",
    playerId1: "player-rohith",
    playerId2: "player-priya",
    connectedAt: "2026-10-23T21:05:00Z",
    connectedViaGameId: "game-hyd-105",
    gamesPlayedTogether: 3,
    lastGameDate: "2026-10-23",
  },
  {
    id: "friendship-3",
    playerId1: "player-rohith",
    playerId2: "player-arjun",
    connectedAt: "2026-10-15T20:00:00Z",
    connectedViaGameId: "game-hyd-past-01",
    gamesPlayedTogether: 2,
    lastGameDate: "2026-10-15",
  },
];

// Initial Chat Messages
export const INITIAL_CHATS: Record<string, ChatMessage[]> = {
  "game-hyd-101": [
    {
      id: "msg-1",
      gameId: "game-hyd-101",
      senderId: "system",
      senderName: "Speedcat System",
      senderAvatar: "",
      content: "Game group chat created. Only accepted players can read and post messages here.",
      timestamp: "2026-10-23T10:00:00Z",
      isSystem: true,
    },
    {
      id: "msg-2",
      gameId: "game-hyd-101",
      senderId: "player-rahul",
      senderName: "Rahul Verma",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      content: "Hey guys! I have reserved Court 1 Teak Wood. I'll bring two new Mavis 350 shuttles. Please be there by 6:50 PM so we can start promptly!",
      timestamp: "2026-10-23T10:15:00Z",
      isAnnouncement: true,
    },
    {
      id: "msg-3",
      gameId: "game-hyd-101",
      senderId: "player-priya",
      senderName: "Priya Sharma",
      senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      content: "Awesome Rahul! I'll be there right on time. Looking forward to the game!",
      timestamp: "2026-10-23T11:35:00Z",
    },
  ],
  "game-hyd-105": [
    {
      id: "msg-past-1",
      gameId: "game-hyd-105",
      senderId: "player-rahul",
      senderName: "Rahul Verma",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      content: "Great match tonight everyone! Super intense rallies. Hope to play again soon!",
      timestamp: "2026-10-23T21:10:00Z",
    },
    {
      id: "msg-past-2",
      gameId: "game-hyd-105",
      senderId: "player-rohith",
      senderName: "Rohith Player",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      content: "Gg guys! That last set was insane. Let's do this every Friday!",
      timestamp: "2026-10-23T21:15:00Z",
    },
  ],
};

// Initial Notifications
export const INITIAL_NOTIFICATIONS: SpeecatNotification[] = [
  {
    id: "notif-1",
    recipientId: "player-rohith",
    title: "Rate Your Fellow Players!",
    message: "Your badminton match at Gopichand Academy was completed. Rate Rahul and Priya on skill and sportsmanship.",
    type: "rate_players",
    link: "/games/game-hyd-105",
    read: false,
    createdAt: "2026-10-23T21:05:00Z",
  },
  {
    id: "notif-2",
    recipientId: "player-rohith",
    title: "New Sports Friends Added! 🤝",
    message: "You, Rahul Verma, and Priya Sharma have been automatically added to each other's Speedcat Friends list after completing your game.",
    type: "friend_added",
    link: "/friends",
    read: false,
    createdAt: "2026-10-23T21:05:00Z",
  },
  {
    id: "notif-3",
    recipientId: "player-rohith",
    title: "Game Confirmed: 5v5 Football Turf",
    message: "Arjun Reddy confirmed your spot for 5v5 Football at AstroPark Madhapur on Oct 27.",
    type: "request_accepted",
    link: "/games/game-hyd-102",
    read: true,
    createdAt: "2026-10-23T14:05:00Z",
  },
];

// Helper Functions
function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getCurrentUserId(): string {
  if (isClient()) {
    return localStorage.getItem(STORAGE_CURRENT_USER) || "player-rohith";
  }
  return "player-rohith";
}

export function setCurrentUserId(playerId: string | null) {
  if (isClient()) {
    if (playerId) {
      localStorage.setItem(STORAGE_CURRENT_USER, playerId);
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER);
    }
    window.dispatchEvent(new Event("speecat_auth_changed"));
  }
}

export function getCurrentUser(): PlayerProfile | null {
  const currentId = getCurrentUserId();
  if (!currentId) return null;
  const players = getAllPlayers();
  return players.find((p) => p.id === currentId) || null;
}

export function getAllPlayers(): PlayerProfile[] {
  if (isClient()) {
    try {
      const stored = localStorage.getItem(STORAGE_PLAYERS);
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return INITIAL_PLAYERS;
}

export function savePlayers(players: PlayerProfile[]) {
  if (isClient()) {
    try {
      localStorage.setItem(STORAGE_PLAYERS, JSON.stringify(players));
    } catch {}
  }
}

export function getPlayerById(id: string): PlayerProfile | null {
  const players = getAllPlayers();
  return players.find((p) => p.id === id) || null;
}

export function updatePlayerProfile(updated: Partial<PlayerProfile> & { id: string }): PlayerProfile {
  const players = getAllPlayers();
  const index = players.findIndex((p) => p.id === updated.id);
  if (index !== -1) {
    players[index] = { ...players[index], ...updated };
    savePlayers(players);
    return players[index];
  }
  throw new Error("Player not found");
}

export function getAllGames(): CommunityGame[] {
  if (isClient()) {
    try {
      const stored = localStorage.getItem(STORAGE_GAMES);
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return INITIAL_GAMES;
}

export function saveGames(games: CommunityGame[]) {
  if (isClient()) {
    try {
      localStorage.setItem(STORAGE_GAMES, JSON.stringify(games));
      window.dispatchEvent(new Event("speecat_games_changed"));
    } catch {}
  }
}

export function getGameById(id: string): CommunityGame | null {
  const games = getAllGames();
  return games.find((g) => g.id === id) || null;
}

export function createGame(gameData: Omit<CommunityGame, "id" | "createdAt" | "participants" | "joinRequests" | "status" | "attendanceConfirmed" | "actualAttendees">): CommunityGame {
  const games = getAllGames();
  const host = getPlayerById(gameData.hostId);
  const hostSportSkill = host?.sportSkills[gameData.sport]?.selfAssessed || "Intermediate";

  const newGame: CommunityGame = {
    ...gameData,
    id: `game-hyd-${Date.now()}`,
    participants: [
      {
        playerId: gameData.hostId,
        name: gameData.hostName,
        avatar: gameData.hostAvatar,
        sportSkill: hostSportSkill,
        role: "host",
        joinedAt: new Date().toISOString(),
      },
    ],
    joinRequests: [],
    status: "Open",
    attendanceConfirmed: false,
    actualAttendees: [],
    createdAt: new Date().toISOString(),
  };

  const updated = [newGame, ...games];
  saveGames(updated);

  // System chat message
  addChatMessage(newGame.id, {
    senderId: "system",
    senderName: "Speecat System",
    senderAvatar: "",
    content: `Game "${newGame.title}" created by ${newGame.hostName}. Confirmed players can chat here!`,
    isSystem: true,
  });

  return newGame;
}

export function requestToJoinGame(gameId: string, playerId: string, note?: string): CommunityGame {
  const games = getAllGames();
  const game = games.find((g) => g.id === gameId);
  if (!game) throw new Error("Game not found");

  if (game.status !== "Open") {
    throw new Error("Game is not open for new join requests");
  }

  // Prevent joining own game
  if (game.hostId === playerId) {
    throw new Error("You are already the host of this game");
  }

  // Prevent duplicate join
  if (game.participants.some((p) => p.playerId === playerId)) {
    throw new Error("You are already a confirmed participant in this game");
  }

  if (game.joinRequests.some((r) => r.playerId === playerId && r.status === "pending")) {
    throw new Error("You have already sent a join request for this game");
  }

  const applicant = getPlayerById(playerId);
  if (!applicant) throw new Error("Player profile not found");

  const relevantSkill = applicant.sportSkills[game.sport]?.selfAssessed || "Beginner";

  game.joinRequests.push({
    playerId,
    name: applicant.name,
    avatar: applicant.avatar,
    sportSkill: relevantSkill,
    note,
    requestedAt: new Date().toISOString(),
    status: "pending",
  });

  saveGames(games);

  // Send notification to host
  sendNotification({
    recipientId: game.hostId,
    title: "New Join Request!",
    message: `${applicant.name} (${relevantSkill} at ${game.sport}) requested to join "${game.title}".`,
    type: "join_request",
    link: `/games/${game.id}`,
  });

  return game;
}

export function respondToJoinRequest(gameId: string, playerId: string, accept: boolean): CommunityGame {
  const games = getAllGames();
  const game = games.find((g) => g.id === gameId);
  if (!game) throw new Error("Game not found");

  const reqIndex = game.joinRequests.findIndex((r) => r.playerId === playerId && r.status === "pending");
  if (reqIndex === -1) throw new Error("Request not found");

  const req = game.joinRequests[reqIndex];
  req.status = accept ? "accepted" : "declined";

  if (accept) {
    // Check if space exists
    if (game.participants.length >= game.maxGroupSize) {
      throw new Error("Game is already full");
    }

    game.participants.push({
      playerId: req.playerId,
      name: req.name,
      avatar: req.avatar,
      sportSkill: req.sportSkill,
      role: "player",
      joinedAt: new Date().toISOString(),
    });

    if (game.participants.length >= game.maxGroupSize) {
      game.status = "Full";
    }

    // System chat message
    addChatMessage(game.id, {
      senderId: "system",
      senderName: "Speedcat System",
      senderAvatar: "",
      content: `${req.name} has been accepted into the game! Welcome!`,
      isSystem: true,
    });

    // Notify player
    sendNotification({
      recipientId: playerId,
      title: "Join Request Accepted! 🏸",
      message: `Your request to join "${game.title}" was accepted by the host. Check the game chat!`,
      type: "request_accepted",
      link: `/games/${game.id}`,
    });
  } else {
    // Notify player of decline
    sendNotification({
      recipientId: playerId,
      title: "Join Request Update",
      message: `Your request to join "${game.title}" could not be accommodated by the host.`,
      type: "request_declined",
      link: `/games/${game.id}`,
    });
  }

  saveGames(games);
  return game;
}

/**
 * Crucial Function: Marks game completed and AUTOMATICALLY adds fellow confirmed participants
 * as friends on Speedcat, while creating rating prompts!
 */
export function markGameCompleted(gameId: string, hostId: string, actualAttendeeIds: string[]): CommunityGame {
  const games = getAllGames();
  const game = games.find((g) => g.id === gameId);
  if (!game) throw new Error("Game not found");

  if (game.hostId !== hostId) {
    throw new Error("Only the game host can finalize completion");
  }

  game.status = "Completed";
  game.attendanceConfirmed = true;
  game.actualAttendees = actualAttendeeIds;

  // Mark attended flag in participants list
  game.participants.forEach((p) => {
    p.attended = actualAttendeeIds.includes(p.playerId);
  });

  saveGames(games);

  // AUTOMATIC FRIENDSHIP CREATION
  // For every pair of confirmed attendees, create friendship if not already existing
  const friends = getAllFriendships();
  let newFriendshipsCount = 0;

  for (let i = 0; i < actualAttendeeIds.length; i++) {
    for (let j = i + 1; j < actualAttendeeIds.length; j++) {
      const p1 = actualAttendeeIds[i];
      const p2 = actualAttendeeIds[j];

      const exists = friends.some(
        (f) =>
          (f.playerId1 === p1 && f.playerId2 === p2) ||
          (f.playerId1 === p2 && f.playerId2 === p1)
      );

      if (!exists) {
        friends.push({
          id: `friend-${p1}-${p2}-${Date.now()}`,
          playerId1: p1,
          playerId2: p2,
          connectedAt: new Date().toISOString(),
          connectedViaGameId: game.id,
          gamesPlayedTogether: 1,
          lastGameDate: game.date,
        });
        newFriendshipsCount++;
      } else {
        // Increment games together
        const existing = friends.find(
          (f) =>
            (f.playerId1 === p1 && f.playerId2 === p2) ||
            (f.playerId1 === p2 && f.playerId2 === p1)
        );
        if (existing) {
          existing.gamesPlayedTogether += 1;
          existing.lastGameDate = game.date;
        }
      }
    }
  }

  saveFriendships(friends);

  // Send notifications to all actual attendees:
  actualAttendeeIds.forEach((playerId) => {
    // Rate players notification
    sendNotification({
      recipientId: playerId,
      title: "Rate Your Fellow Players!",
      message: `"${game.title}" was marked as completed. Rate your fellow players' skill and sportsmanship!`,
      type: "rate_players",
      link: `/games/${game.id}`,
    });

    // Friendship notification if new friends were added
    if (newFriendshipsCount > 0) {
      sendNotification({
        recipientId: playerId,
        title: "New Sports Friends Added! 🤝",
        message: `You and your fellow players from "${game.title}" have been automatically added to each other's Friends list!`,
        type: "friend_added",
        link: `/friends`,
      });
    }
  });

  return game;
}

export function cancelGame(gameId: string, reason: string): CommunityGame {
  const games = getAllGames();
  const game = games.find((g) => g.id === gameId);
  if (!game) throw new Error("Game not found");

  game.status = "Cancelled";
  game.cancellationReason = reason;

  saveGames(games);

  // Notify participants
  game.participants.forEach((p) => {
    if (p.playerId !== game.hostId) {
      sendNotification({
        recipientId: p.playerId,
        title: "Game Cancelled",
        message: `"${game.title}" on ${game.date} was cancelled by the host: "${reason}".`,
        type: "game_cancelled",
        link: `/games/${game.id}`,
      });
    }
  });

  return game;
}

// Friendships Storage & Retrieval
export function getAllFriendships(): Friendship[] {
  if (isClient()) {
    try {
      const stored = localStorage.getItem(STORAGE_FRIENDS);
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return INITIAL_FRIENDS;
}

export function saveFriendships(friends: Friendship[]) {
  if (isClient()) {
    try {
      localStorage.setItem(STORAGE_FRIENDS, JSON.stringify(friends));
    } catch {}
  }
}

export function getFriendsForPlayer(playerId: string): { friend: PlayerProfile; relationship: Friendship }[] {
  const friendships = getAllFriendships();
  const allPlayers = getAllPlayers();

  const playerFriendships = friendships.filter(
    (f) => f.playerId1 === playerId || f.playerId2 === playerId
  );

  const results: { friend: PlayerProfile; relationship: Friendship }[] = [];

  playerFriendships.forEach((rel) => {
    const friendId = rel.playerId1 === playerId ? rel.playerId2 : rel.playerId1;
    const friend = allPlayers.find((p) => p.id === friendId);
    if (friend) {
      results.push({ friend, relationship: rel });
    }
  });

  return results;
}

export function removeFriend(playerId: string, friendId: string) {
  let friendships = getAllFriendships();
  friendships = friendships.filter(
    (f) =>
      !(
        (f.playerId1 === playerId && f.playerId2 === friendId) ||
        (f.playerId1 === friendId && f.playerId2 === playerId)
      )
  );
  saveFriendships(friendships);
}

// Group Chat Storage & Retrieval
export function getChatMessages(gameId: string): ChatMessage[] {
  if (isClient()) {
    try {
      const stored = localStorage.getItem(`${STORAGE_CHATS}_${gameId}`);
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return INITIAL_CHATS[gameId] || [];
}

export function addChatMessage(gameId: string, messageData: Omit<ChatMessage, "id" | "gameId" | "timestamp">): ChatMessage {
  const current = getChatMessages(gameId);
  const newMsg: ChatMessage = {
    ...messageData,
    id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    gameId,
    timestamp: new Date().toISOString(),
  };
  const updated = [...current, newMsg];

  if (isClient()) {
    try {
      localStorage.setItem(`${STORAGE_CHATS}_${gameId}`, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("speecat_chat_message", { detail: { gameId } }));
    } catch {}
  }

  return newMsg;
}

// Ratings Storage & Logic
export function getAllRatings(): PostGameRatingSubmission[] {
  if (isClient()) {
    try {
      const stored = localStorage.getItem(STORAGE_RATINGS);
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return [];
}

export function saveRatings(ratings: PostGameRatingSubmission[]) {
  if (isClient()) {
    try {
      localStorage.setItem(STORAGE_RATINGS, JSON.stringify(ratings));
    } catch {}
  }
}

export function submitPlayerRating(submission: Omit<PostGameRatingSubmission, "id" | "createdAt">): PostGameRatingSubmission {
  // Disallow rating oneself
  if (submission.raterPlayerId === submission.ratedPlayerId) {
    throw new Error("You cannot rate yourself");
  }

  const ratings = getAllRatings();

  // Prevent duplicate rating for the same game, rater, and rated player
  const exists = ratings.some(
    (r) =>
      r.gameId === submission.gameId &&
      r.raterPlayerId === submission.raterPlayerId &&
      r.ratedPlayerId === submission.ratedPlayerId
  );

  if (exists) {
    throw new Error("You have already submitted a rating for this player for this game");
  }

  const newRating: PostGameRatingSubmission = {
    ...submission,
    id: `rating-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  ratings.push(newRating);
  saveRatings(ratings);

  // Update recipient's profile rating distribution and sportsmanship score
  const players = getAllPlayers();
  const targetPlayer = players.find((p) => p.id === submission.ratedPlayerId);

  if (targetPlayer) {
    // 1. Update Sport Skill Rating
    if (!targetPlayer.sportSkills[submission.sport]) {
      targetPlayer.sportSkills[submission.sport] = {
        selfAssessed: "Beginner",
        ratingsCount: 0,
        distribution: { Beginner: 0, Amateur: 0, Intermediate: 0, Advanced: 0, Professional: 0 },
      };
    }

    const sportRating = targetPlayer.sportSkills[submission.sport]!;
    sportRating.ratingsCount += 1;
    sportRating.distribution[submission.skillLevel] =
      (sportRating.distribution[submission.skillLevel] || 0) + 1;

    // Calculate community level if enough ratings (e.g. 3+)
    let maxCount = -1;
    let dominantLevel: SkillLevel = sportRating.selfAssessed;
    (Object.keys(sportRating.distribution) as SkillLevel[]).forEach((lvl) => {
      if (sportRating.distribution[lvl] > maxCount) {
        maxCount = sportRating.distribution[lvl];
        dominantLevel = lvl;
      }
    });
    sportRating.communityLevel = dominantLevel;

    // 2. Update Sportsmanship
    const sm = targetPlayer.sportsmanship;
    const total = sm.totalReviews;
    const newTotal = total + 1;
    sm.punctuality = Number(((sm.punctuality * total + submission.punctuality) / newTotal).toFixed(1));
    sm.teamwork = Number(((sm.teamwork * total + submission.teamwork) / newTotal).toFixed(1));
    sm.fairPlay = Number(((sm.fairPlay * total + submission.fairPlay) / newTotal).toFixed(1));
    sm.reliability = Number(((sm.reliability * total + submission.reliability) / newTotal).toFixed(1));
    sm.overallScore = Number(
      ((sm.punctuality + sm.teamwork + sm.fairPlay + sm.communication + sm.reliability) / 5).toFixed(1)
    );
    sm.totalReviews = newTotal;

    savePlayers(players);
  }

  return newRating;
}

// Notifications Storage & Logic
export function getAllNotifications(): SpeecatNotification[] {
  if (isClient()) {
    try {
      const stored = localStorage.getItem(STORAGE_NOTIFICATIONS);
      if (stored) return JSON.parse(stored);
    } catch {}
  }
  return INITIAL_NOTIFICATIONS;
}

export function saveNotifications(notifs: SpeecatNotification[]) {
  if (isClient()) {
    try {
      localStorage.setItem(STORAGE_NOTIFICATIONS, JSON.stringify(notifs));
      window.dispatchEvent(new Event("speecat_notifications_changed"));
    } catch {}
  }
}

export function getNotificationsForPlayer(playerId: string): SpeecatNotification[] {
  const notifs = getAllNotifications();
  return notifs
    .filter((n) => n.recipientId === playerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function sendNotification(notifData: Omit<SpeecatNotification, "id" | "createdAt" | "read">): SpeecatNotification {
  const notifs = getAllNotifications();
  const newNotif: SpeecatNotification = {
    ...notifData,
    id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  const updated = [newNotif, ...notifs];
  saveNotifications(updated);
  return newNotif;
}

export function markNotificationAsRead(id: string) {
  const notifs = getAllNotifications();
  const n = notifs.find((item) => item.id === id);
  if (n) {
    n.read = true;
    saveNotifications(notifs);
  }
}

export function markAllNotificationsAsRead(playerId: string) {
  const notifs = getAllNotifications();
  notifs.forEach((n) => {
    if (n.recipientId === playerId) n.read = true;
  });
  saveNotifications(notifs);
}
