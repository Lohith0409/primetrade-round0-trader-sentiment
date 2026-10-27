"use client";

import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Clock,
  Sparkles
} from "lucide-react";
import { Venue } from "@/types/venue";
import { formatPrice } from "@/lib/venues";

interface VenueCardProps {
  venue: Venue;
  viewMode?: "grid" | "list";
}

export default function VenueCard({ venue, viewMode = "grid" }: VenueCardProps) {
  const isList = viewMode === "list";

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 overflow-hidden venue-card-hover group flex flex-col ${
        isList ? "md:flex-row md:items-center" : ""
      }`}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          isList ? "md:w-72 h-56 md:h-64 shrink-0" : "h-52 w-full"
        }`}
      >
        <img
          src={venue.featuredImage}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="bg-white/95 backdrop-blur-md text-speecat-navy text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-speecat-green" />
            {venue.sport}
          </span>

          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md ${
              venue.verificationBadge === "Verified Public Listing"
                ? "bg-emerald-950/75 text-emerald-300 border border-emerald-400/30"
                : "bg-slate-900/75 text-slate-300 border border-slate-700/30"
            }`}
          >
            {venue.environment}
          </span>
        </div>

        {/* Bottom Image Info: Locality */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-medium drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-speecat-green shrink-0" />
            <span className="truncate">{venue.locality}, Hyd</span>
          </div>

          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md text-amber-300 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{venue.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-300 font-normal">({venue.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Verification indicator */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded inline-flex items-center gap-1 ${
                venue.verificationBadge === "Verified Public Listing"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              {venue.verificationBadge}
            </span>

            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {venue.courtsCount} {venue.courtsCount > 1 ? "Courts" : "Court"}
            </span>
          </div>

          {/* Title */}
          <Link href={`/venue/${venue.slug}`}>
            <h3 className="font-bold text-base sm:text-lg text-speecat-navy group-hover:text-speecat-green transition-colors line-clamp-1">
              {venue.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {venue.description}
          </p>

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {venue.amenities.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
              >
                {amenity}
              </span>
            ))}
            {venue.amenities.length > 3 && (
              <span className="text-[10px] text-slate-400 px-1 py-0.5">
                +{venue.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Starting from
            </div>
            <div className="text-sm sm:text-base font-extrabold text-speecat-navy">
              {venue.pricePerHour ? (
                <span className="text-speecat-green">
                  ₹{venue.pricePerHour.toLocaleString("en-IN")}
                  <span className="text-xs text-slate-500 font-normal"> / hour</span>
                </span>
              ) : (
                <span className="text-xs text-slate-500 font-medium italic">
                  Price to be confirmed
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/venue/${venue.slug}`}
            className="inline-flex items-center gap-1.5 bg-speecat-navy group-hover:bg-speecat-green text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm shrink-0"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
