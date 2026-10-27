# Speedcat — Sports Booking, Community & Clubs Platform (Hyderabad)

**Tagline:** *Find Your Game. Book Your Court.*

Speedcat is a modern, responsive sports booking and athletic community platform built for Hyderabad, Telangana, India.

---

## What's New in Speedcat

### 1. Brand Renaming: Speedcat
- User-facing brand upgraded from Speecat to **Speedcat**.
- Navigation bar logo updated to **SPEEDCAT**.
- Consistent page titles, browser tab metadata, footers, demo banners, buttons, and system notifications.

### 2. Full Clubs System
- **Clubs Discovery (`/clubs`)**:
  - Search by club name, sport, or locality.
  - Category filters: *Running, Cycling, Badminton, Fitness, Swimming, Tennis, Social Activities, Cricket*.
  - Activity pricing filter: *All, Free Only, Paid Only*.
  - Tab views for *Active Clubs* vs *Upcoming Club Sessions*.
- **Individual Club Pages (`/clubs/[slug]`)**:
  - Club name, cover image, verified badge, locality & meeting point.
  - Organiser card with avatar, role, and verified credentials.
  - Interactive **Join Club** and **Leave Club** buttons with instant state persistence.
  - Tabbed sections:
    - *Upcoming Events*: Interactive event registration cards.
    - *About & Guidelines*: Detailed club description, club rules, and community guidelines.
    - *Members*: Registered roster showing roles (Host, Moderator, Member).
- **Organiser Dashboard (`/clubs/organizer`)**:
  - Switch between managed clubs (e.g. *Hyderabad Runners Club, Hyderabad Social Sports & Bouldering Club*).
  - **Schedule New Event Modal**:
    - Single and recurring events (e.g. *"Weekly every Saturday"*).
    - Participant capacity, ticket price in ₹ (with 0 for Free events).
    - Venue, date, time window, registration deadline, and cancellation policy.
  - **Attendee Management & QR Check-in**:
    - List of attendees filtered by event.
    - Unique QR check-in codes (e.g. `SPD-REG-101-RAHUL`).
    - One-click *Check-in Pass* / *Undo Check-in* toggle.
    - Cancellation & demo refund tracking.
  - **Revenue & Analytics**:
    - **Configurable Speedcat Platform Fee Slider** (0% to 15%, default 5%).
    - **Gross Ticket Sales (₹)**: Total amount collected from confirmed registrations.
    - **Speedcat Platform Fees (₹)**: Platform commission calculated dynamically (e.g. ₹15 on a ₹300 ticket at 5%).
    - **Net Organiser Payout (₹)**: Gross Sales minus Speedcat Platform Fees.
    - Operational metrics: *Total Registrations, Actual Attendance Rate (%), Cancellations, Repeat Participation Rate (%)*.
- **Admin Dashboard (`/dashboard/admin`)**:
  - Review and approve pending clubs.
  - Suspend/activate clubs.
  - Moderate flagged events and cancellations.
  - Sports venue directory preview management with CSV import/export.

---

## Running the Application Locally

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation & Execution Commands

```powershell
# 1. Install dependencies
npm.cmd install

# 2. Build for production (verifies all routes and types)
npm.cmd run build

# 3. Start production server
npm.cmd run start
```

Or for development with hot-reloading:

```powershell
npm.cmd run dev
```

The application will be live at:
`http://localhost:3000`

---

## Key Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero search, popular sports, featured venues, and community highlights |
| `/explore` | Sports venue directory preview with locality, sport, and price filters |
| `/venue/[slug]` | Individual venue preview page with court slot selection and receipt preview |
| `/clubs` | Clubs discovery and upcoming club sessions directory |
| `/clubs/[slug]` | Dedicated club page with join/leave, member roster, and upcoming events |
| `/clubs/organizer` | Organiser hub: event creation, QR check-ins, configurable fee revenue analytics |
| `/games` | Community games matchmaking and skill matching |
| `/games/[id]` | Game lobby with attendee management, group chat, and automatic friends |
| `/host-game` | Multi-step form to host community sports matches |
| `/friends` | Connected sports friends with automatic post-game additions |
| `/profile` | Player profile with per-sport skill ratings and sportsmanship score |
| `/dashboard/admin` | Central administration: clubs & event moderation and venue directory |

---

## Disclaimer

All venue listings, clubs, and events are representative demonstration previews for Hyderabad, Telangana. Listings do not imply official partnership or commercial affiliation with Speedcat. Bookings and ticket check-ins operate in 100% risk-free prototype mode.
