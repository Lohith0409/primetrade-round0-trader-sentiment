import { HyderabadLocality } from "./venue";

export type ClubCategory =
  | "Running"
  | "Cycling"
  | "Badminton"
  | "Fitness"
  | "Swimming"
  | "Tennis"
  | "Social Activities"
  | "Cricket";

export const ALL_CLUB_CATEGORIES: ClubCategory[] = [
  "Running",
  "Cycling",
  "Badminton",
  "Fitness",
  "Swimming",
  "Tennis",
  "Social Activities",
  "Cricket",
];

export interface ClubMember {
  playerId: string;
  name: string;
  avatar: string;
  role: "organizer" | "moderator" | "member";
  joinedAt: string;
}

export interface Club {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: ClubCategory;
  locality: HyderabadLocality;
  meetingPoint: string;
  coverImage: string;
  logoImage: string;
  organizerId: string;
  organizerName: string;
  organizerAvatar: string;
  organizerRole: string;
  memberCount: number;
  members: ClubMember[];
  rules: string[];
  verified: boolean;
  status: "active" | "pending_review" | "suspended";
  upcomingEventsCount: number;
  featured: boolean;
  createdAt: string;
  communityGuidelines: string[];
}

export type EventStatus = "scheduled" | "in_progress" | "completed" | "cancelled";

export interface ClubEvent {
  id: string;
  clubId: string;
  clubName: string;
  clubSlug: string;
  title: string;
  description: string;
  category: ClubCategory;
  venueName: string;
  locality: HyderabadLocality;
  address: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "06:00 AM - 07:30 AM"
  isRecurring: boolean;
  recurrencePattern?: string; // e.g. "Weekly every Saturday"
  capacity: number;
  registeredCount: number;
  price: number; // 0 for free, INR for paid
  registrationDeadline: string;
  cancellationPolicy: string;
  organizerId: string;
  organizerName: string;
  organizerAvatar: string;
  status: EventStatus;
  coverImage: string;
  equipmentRequirements?: string;
  actualAttendanceCount?: number;
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  clubId: string;
  clubName: string;
  playerId: string;
  playerName: string;
  playerEmail: string;
  playerPhone: string;
  ticketPrice: number;
  platformFeeRate: number; // e.g. 0.05 (5%)
  platformFee: number; // e.g. ₹15 for ₹300
  grossTotal: number; // ticketPrice
  netOrganizerEarnings: number; // grossTotal - platformFee
  status: "confirmed" | "cancelled" | "checked_in";
  registeredAt: string;
  qrCode: string; // e.g. "SPD-EVT-749102"
  checkInTime?: string;
  cancellationTime?: string;
  refundStatus?: "not_applicable" | "refunded_demo";
}

export interface OrganizerRevenueAnalytics {
  totalRegistrations: number;
  confirmedRegistrations: number;
  cancelledRegistrations: number;
  actualAttendance: number;
  attendanceRate: number; // percentage
  grossTicketSales: number; // in INR
  speedcatPlatformFees: number; // in INR
  netOrganizerEarnings: number; // in INR
  platformFeePercentage: number; // e.g. 5
  repeatParticipationRate: number; // percentage
}
