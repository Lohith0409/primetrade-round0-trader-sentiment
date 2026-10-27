"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock
} from "lucide-react";
import { CommunityGame, SKILL_LEVEL_BADGE_COLORS } from "@/types/community";
import { getCurrentUser } from "@/lib/community";

interface GameCardProps {
  game: CommunityGame;
  onRequestJoin?: (gameId: string) => void;
}

export default function GameCard({ game, onRequestJoin }: GameCardProps) {
  const currentUser = getCurrentUser();
  const confirmedCount = game.participants.length;
  const spotsLeft = Math.max(0, game.maxGroupSize - confirmedCount);
  const isHost = currentUser?.id === game.hostId;
  const isJoined = game.participants.some((p) => p.playerId === currentUser?.id);
  const isPending = game.joinRequests?.some(
    (r) => r.playerId === currentUser?.id && r.status === "pending"
  );

  const skillBadge = game.skillRequirement.level
    ? SKILL_LEVEL_BADGE_COLORS[game.skillRequirement.level]
    : { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" };

  const sportEmoji: Record<string, string> = {
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

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group">
      
      {/* Top Bar: Sport, Format, Status */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">{sportEmoji[game.sport] || "🏅"}</span>
            <span className="text-xs font-black uppercase tracking-wider text-speecat-navy">
              {game.sport}
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">• {game.matchFormat}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {game.visibility === "invite-only" && (
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Invite
              </span>
            )}
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                game.status === "Open"
                  ? "bg-emerald-100 text-emerald-800"
                  : game.status === "Full"
                  ? "bg-amber-100 text-amber-800"
                  : game.status === "Completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {game.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/games/${game.id}`}>
          <h3 className="font-extrabold text-base sm:text-lg text-speecat-navy group-hover:text-speecat-green transition-colors line-clamp-1">
            {game.title}
          </h3>
        </Link>

        {/* Venue & Locality */}
        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
          <MapPin className="w-3.5 h-3.5 text-speecat-green shrink-0" />
          <span className="truncate">{game.venueName} • {game.locality}, Hyd</span>
        </div>
      </div>

      {/* Date, Time, Skill & Player Requirements */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
        
        {/* Schedule */}
        <div className="flex flex-wrap items-center gap-3 text-slate-700 font-medium">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-speecat-green" />
            <span>{game.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-speecat-green" />
            <span>{game.startTime} ({game.durationHours}h)</span>
          </div>
        </div>

        {/* Skill Requirement Pill */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Skill:
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${skillBadge.bg} ${skillBadge.text} ${skillBadge.border}`}
          >
            {game.skillRequirement.displayText}
          </span>
        </div>

        {/* Spots & Confirmed Players */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-speecat-navy">
              {confirmedCount}/{game.maxGroupSize} Players
            </span>
            <span className="text-slate-500 text-[11px]">
              ({spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"})
            </span>
          </div>

          {game.costPerPlayer ? (
            <div className="text-right font-black text-speecat-green text-xs">
              ₹{game.costPerPlayer} <span className="font-normal text-slate-400 text-[10px]">/ player</span>
            </div>
          ) : (
            <div className="text-right text-[11px] font-semibold text-emerald-700">
              Free to Join
            </div>
          )}
        </div>

        {/* Host Info Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={game.hostAvatar}
              alt={game.hostName}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="text-xs">
              <span className="text-slate-400 text-[10px] block">Hosted by</span>
              <span className="font-bold text-speecat-navy truncate max-w-[120px] block">
                {game.hostName}
              </span>
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Host: {game.participants[0]?.sportSkill || "Intermediate"}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <Link
          href={`/games/${game.id}`}
          className="text-xs font-bold text-slate-600 hover:text-speecat-navy flex items-center gap-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {isHost ? (
          <Link
            href={`/games/${game.id}`}
            className="bg-purple-100 text-purple-900 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-purple-200 transition-colors"
          >
            Manage Game
          </Link>
        ) : isJoined ? (
          <Link
            href={`/games/${game.id}`}
            className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Joined (Chat)</span>
          </Link>
        ) : isPending ? (
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl">
            Request Pending
          </span>
        ) : spotsLeft === 0 || game.status !== "Open" ? (
          <span className="bg-slate-100 text-slate-400 text-xs font-bold px-3 py-1.5 rounded-xl">
            Game Full
          </span>
        ) : (
          <Link
            href={`/games/${game.id}`}
            className="bg-speecat-navy hover:bg-speecat-green text-white text-xs font-black px-3.5 py-1.5 rounded-xl transition-all shadow-xs"
          >
            Request to Join
          </Link>
        )}
      </div>

    </div>
  );
}
