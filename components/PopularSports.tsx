"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles,
  Footprints,
  Shield,
  CircleDot,
  Activity,
  Dribbble,
  Disc,
  Waves,
  Trophy
} from "lucide-react";
import { getSportsList } from "@/lib/venues";
import { SportType } from "@/types/venue";

const SPORT_ICONS: Record<SportType, string> = {
  Badminton: "🏸",
  Football: "⚽",
  Cricket: "🏏",
  Tennis: "🎾",
  Pickleball: "🏓",
  Basketball: "🏀",
  "Table Tennis": "🏓",
  Swimming: "🏊",
  "Multi-Sport": "🏟️",
};

export default function PopularSports() {
  const sports = getSportsList();

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-speecat-green uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sports Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-speecat-navy">
              Explore by Sport
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select your favorite game to find Hyderabad’s best courts and turfs
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-speecat-green hover:text-speecat-green-600 group"
          >
            <span>View All Hyderabad Sports</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {sports.map((item) => (
            <Link
              key={item.name}
              href={`/explore?sport=${encodeURIComponent(item.name)}`}
              className="bg-slate-50/70 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-speecat-green/50 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all group hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform">
                {SPORT_ICONS[item.name] || "🏅"}
              </div>

              <h3 className="font-bold text-sm sm:text-base text-speecat-navy group-hover:text-speecat-green transition-colors">
                {item.name}
              </h3>

              <div className="mt-1.5 text-[11px] font-semibold text-slate-500 bg-white border border-slate-200/80 px-2 py-0.5 rounded-full">
                {item.count} {item.count === 1 ? "Venue" : "Venues"}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
