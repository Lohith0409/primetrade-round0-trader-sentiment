"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import { getLocalitiesWithCounts } from "@/lib/venues";

export default function LocalityBrowser() {
  const localities = getLocalitiesWithCounts();

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-speecat-green uppercase tracking-wider mb-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>Hyderabad Neighborhoods</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-speecat-navy">
              Browse Venues by Locality
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Find sports courts and grounds nearest to your home or office
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-bold text-speecat-green hover:text-speecat-green-600 flex items-center gap-1"
          >
            <span>View All Areas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Localities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {localities.map((item) => (
            <Link
              key={item.name}
              href={`/explore?locality=${encodeURIComponent(item.name)}`}
              className="group bg-slate-50 hover:bg-slate-900 border border-slate-200/90 hover:border-slate-800 rounded-xl p-3.5 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 group-hover:bg-speecat-green text-speecat-green-700 group-hover:text-speecat-navy flex items-center justify-center shrink-0 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs sm:text-sm font-bold text-speecat-navy group-hover:text-white transition-colors truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 group-hover:text-slate-400 font-medium">
                    {item.count > 0 ? `${item.count} venues` : "Available"}
                  </div>
                </div>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-speecat-green group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
