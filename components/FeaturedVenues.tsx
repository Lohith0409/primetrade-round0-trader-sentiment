"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import VenueCard from "./VenueCard";
import { getVenues } from "@/lib/venues";
import { SportType } from "@/types/venue";

export default function FeaturedVenues() {
  const allVenues = getVenues();
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "Badminton", "Football", "Cricket", "Pickleball", "Tennis"];

  const filteredVenues = allVenues.filter((v) => {
    if (activeTab === "All") return v.isFeatured || v.isPopular;
    return v.sport === activeTab || v.sportsAvailable?.includes(activeTab as SportType);
  }).slice(0, 6);

  return (
    <section className="py-16 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-speecat-green uppercase tracking-wider mb-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Verified Directory Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-speecat-navy">
              Featured Hyderabad Venues
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top-rated sports arenas in Gachibowli, HITEC City, Madhapur, and Jubilee Hills
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === cat
                    ? "bg-speecat-navy text-white shadow-xs"
                    : "text-slate-600 hover:text-speecat-navy hover:bg-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} viewMode="grid" />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-speecat-navy font-bold text-sm px-6 py-3 rounded-xl border border-slate-300 shadow-sm transition-all hover:scale-[1.02]"
          >
            <span>Browse All {allVenues.length} Hyderabad Venues</span>
            <ArrowRight className="w-4 h-4 text-speecat-green" />
          </Link>
        </div>

      </div>
    </section>
  );
}
