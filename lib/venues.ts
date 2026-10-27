import initialVenuesData from "@/data/venues.json";
import { Venue, SportType, HyderabadLocality } from "@/types/venue";

export const LOCAL_STORAGE_KEY = "speecat_venues_custom";
export const BOOKINGS_STORAGE_KEY = "speecat_demo_bookings";

export const INITIAL_VENUES: Venue[] = initialVenuesData as Venue[];

export function getVenues(): Venue[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const custom: Venue[] = JSON.parse(stored);
        // Merge without duplicates
        const customIds = new Set(custom.map((v) => v.id));
        const filteredInitial = INITIAL_VENUES.filter((v) => !customIds.has(v.id));
        return [...custom, ...filteredInitial];
      }
    } catch {
      // Fallback to static data
    }
  }
  return INITIAL_VENUES;
}

export function saveVenues(venues: Venue[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(venues));
    } catch (err) {
      console.error("Error saving venues to localStorage", err);
    }
  }
}

export function getVenueBySlug(slug: string): Venue | undefined {
  const venues = getVenues();
  return venues.find((v) => v.slug.toLowerCase() === slug.toLowerCase() || v.id.toLowerCase() === slug.toLowerCase());
}

export function getFeaturedVenues(): Venue[] {
  const venues = getVenues();
  return venues.filter((v) => v.isFeatured);
}

export function getSportsList(): { name: SportType; count: number; icon: string }[] {
  const venues = getVenues();
  const sportsMap: Record<SportType, number> = {
    Badminton: 0,
    Football: 0,
    Cricket: 0,
    Tennis: 0,
    Pickleball: 0,
    Basketball: 0,
    "Table Tennis": 0,
    Swimming: 0,
    "Multi-Sport": 0,
  };

  venues.forEach((v) => {
    if (sportsMap[v.sport] !== undefined) {
      sportsMap[v.sport] += 1;
    }
    v.sportsAvailable?.forEach((sp) => {
      if (sp !== v.sport && sportsMap[sp] !== undefined) {
        sportsMap[sp] += 1;
      }
    });
  });

  return [
    { name: "Badminton", count: sportsMap["Badminton"], icon: "Shuttlecock" },
    { name: "Football", count: sportsMap["Football"], icon: "Footprints" },
    { name: "Cricket", count: sportsMap["Cricket"], icon: "Shield" },
    { name: "Tennis", count: sportsMap["Tennis"], icon: "CircleDot" },
    { name: "Pickleball", count: sportsMap["Pickleball"], icon: "Activity" },
    { name: "Basketball", count: sportsMap["Basketball"], icon: "Dribbble" },
    { name: "Table Tennis", count: sportsMap["Table Tennis"], icon: "Disc" },
    { name: "Swimming", count: sportsMap["Swimming"], icon: "Waves" },
    { name: "Multi-Sport", count: sportsMap["Multi-Sport"], icon: "Trophy" },
  ];
}

export const HYDERABAD_LOCALITIES: HyderabadLocality[] = [
  "Gachibowli",
  "Kondapur",
  "Madhapur",
  "Hitech City",
  "Kukatpally",
  "Miyapur",
  "Manikonda",
  "Jubilee Hills",
  "Banjara Hills",
  "Secunderabad",
  "Uppal",
  "LB Nagar",
  "Financial District",
];

export function getLocalitiesWithCounts(): { name: HyderabadLocality; count: number }[] {
  const venues = getVenues();
  return HYDERABAD_LOCALITIES.map((loc) => {
    const count = venues.filter((v) => v.locality.toLowerCase() === loc.toLowerCase()).length;
    return { name: loc, count };
  });
}

export function formatPrice(price: number | null): string {
  if (price === null || price === undefined || isNaN(price)) {
    return "Price/details to be confirmed";
  }
  return `₹${price.toLocaleString("en-IN")}/hr`;
}

export function parseCsvToVenues(csvText: string): Venue[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
  const newVenues: Venue[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV splitter that handles quotes
    const values: string[] = [];
    let insideQuotes = false;
    let currentValue = "";

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"' && (c === 0 || line[c - 1] !== "\\")) {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    const getVal = (colName: string) => {
      const idx = headers.indexOf(colName);
      if (idx !== -1 && values[idx]) {
        return values[idx].replace(/^"|"$/g, "").trim();
      }
      return "";
    };

    const name = getVal("name") || getVal("venue name");
    if (!name) continue;

    const sport = (getVal("sport") || "Badminton") as SportType;
    const locality = (getVal("locality") || "Gachibowli") as HyderabadLocality;
    const priceRaw = getVal("price") || getVal("priceperhour");
    const price = priceRaw && !isNaN(Number(priceRaw)) ? Number(priceRaw) : null;
    const address = getVal("address") || `${locality}, Hyderabad, Telangana`;
    const hours = getVal("hours") || getVal("openinghours") || "06:00 AM - 10:00 PM";
    const amenities = (getVal("amenities") || "Parking, Drinking Water, Changing Rooms")
      .split(";")
      .map((a) => a.trim());

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newVenue: Venue = {
      id: `imported-${Date.now()}-${i}`,
      name,
      slug,
      sport,
      sportsAvailable: [sport],
      locality,
      city: "Hyderabad",
      address,
      mapQuery: `${name} ${locality} Hyderabad`,
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(`${name} ${locality} Hyderabad`)}`,
      coordinates: { lat: 17.44, lng: 78.38 },
      pricePerHour: price,
      isPriceVerified: price !== null,
      priceNote: price ? "Imported sample listing" : "Price/details to be confirmed",
      rating: 4.5,
      reviewCount: 20,
      environment: "Indoor",
      featuredImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
      ],
      amenities: amenities.length > 0 ? amenities : ["Parking", "Drinking Water"],
      openingHours: hours,
      isOpenVerified: true,
      courtsCount: 2,
      courts: [
        { id: `c1-${i}`, name: "Court 1", type: "Standard Court", surface: "Synthetic", pricePerHour: price },
        { id: `c2-${i}`, name: "Court 2", type: "Standard Court", surface: "Synthetic", pricePerHour: price },
      ],
      description: `Sports venue located in ${locality}, Hyderabad. Imported demo listing for Speedcat directory preview.`,
      rules: ["Proper sports shoes required", "Adhere to booked slot timings"],
      verificationBadge: "Preview Listing",
    };

    newVenues.push(newVenue);
  }

  return newVenues;
}
