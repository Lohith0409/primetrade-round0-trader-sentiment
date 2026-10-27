"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  MapPin, 
  Trophy, 
  Calendar, 
  PlusCircle, 
  UserMinus, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Send,
  CheckCircle2,
  Lock
} from "lucide-react";
import { 
  getCurrentUser, 
  getFriendsForPlayer, 
  removeFriend, 
  getAllGames, 
  sendNotification 
} from "@/lib/community";
import { PlayerProfile, Friendship, SKILL_LEVEL_BADGE_COLORS } from "@/types/community";
import { SportType } from "@/types/venue";

export default function FriendsPage() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [friendsList, setFriendsList] = useState<{ friend: PlayerProfile; relationship: Friendship }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("All");

  // Invite modal state
  const [inviteModalFriend, setInviteModalFriend] = useState<PlayerProfile | null>(null);
  const [selectedGameIdToInvite, setSelectedGameIdToInvite] = useState<string>("");
  const [inviteSent, setInviteSent] = useState(false);

  const loadFriends = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setFriendsList(getFriendsForPlayer(user.id));
    }
  };

  useEffect(() => {
    loadFriends();

    const handleAuth = () => loadFriends();
    window.addEventListener("speecat_auth_changed", handleAuth);
    return () => window.removeEventListener("speecat_auth_changed", handleAuth);
  }, []);

  const hostedGames = useMemo(() => {
    if (!currentUser) return [];
    return getAllGames().filter((g) => g.hostId === currentUser.id && g.status === "Open");
  }, [currentUser]);

  const handleRemoveFriend = (friendId: string) => {
    if (!currentUser) return;
    if (confirm("Remove this player from your friends list?")) {
      removeFriend(currentUser.id, friendId);
      loadFriends();
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !inviteModalFriend || !selectedGameIdToInvite) return;

    const game = getAllGames().find((g) => g.id === selectedGameIdToInvite);
    if (!game) return;

    sendNotification({
      recipientId: inviteModalFriend.id,
      title: "Game Invitation from a Friend! 🏅",
      message: `${currentUser.name} invited you to play ${game.sport} at ${game.venueName} on ${game.date}!`,
      type: "friend_invite",
      link: `/games/${game.id}`,
    });

    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setInviteModalFriend(null);
    }, 1500);
  };

  const filteredFriends = useMemo(() => {
    return friendsList.filter(({ friend }) => {
      if (searchTerm.trim()) {
        const t = searchTerm.toLowerCase();
        const matchName = friend.name.toLowerCase().includes(t);
        const matchLoc = friend.locality.toLowerCase().includes(t);
        if (!matchName && !matchLoc) return false;
      }
      if (selectedSport !== "All") {
        if (!friend.favoriteSports.includes(selectedSport as SportType)) return false;
      }
      return true;
    });
  }, [friendsList, searchTerm, selectedSport]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Banner */}
        <div className="bg-speecat-navy rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Automated Community Connections</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                My Speedcat Sports Friends
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Fellow players you actually played with in completed Hyderabad matches are automatically added here. Invite them to your next game in one click!
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-700/80 p-4 rounded-2xl text-center shrink-0">
              <div className="text-3xl font-black text-speecat-green">{friendsList.length}</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">Connected Friends</div>
            </div>
          </div>
        </div>

        {/* Essential Rule Callout Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-speecat-green shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-speecat-navy">Speedcat Automatic Friends Rule: </span>
            When you complete a game and attendance is verified by the host, everyone who genuinely participated is automatically added to each other's friends list. Private contact details (phone, email) are kept hidden unless you choose to share them.
          </div>
        </div>

        {/* Filters Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search friends by name or locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-speecat-navy focus:outline-none focus:ring-2 focus:ring-speecat-green"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-bold uppercase">Sport in common:</span>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-speecat-navy"
            >
              <option value="All">All Sports</option>
              <option value="Badminton">Badminton</option>
              <option value="Football">Football</option>
              <option value="Cricket">Cricket</option>
              <option value="Tennis">Tennis</option>
              <option value="Pickleball">Pickleball</option>
            </select>
          </div>
        </div>

        {/* Friends Grid */}
        {filteredFriends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends.map(({ friend, relationship }) => {
              // Sports in common
              const commonSports = currentUser
                ? friend.favoriteSports.filter((s) => currentUser.favoriteSports.includes(s))
                : friend.favoriteSports;

              return (
                <div
                  key={friend.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Top Row: Avatar & Bio */}
                    <div className="flex items-start gap-3.5">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400/40 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <Link href={`/profile/${friend.id}`}>
                          <h3 className="font-extrabold text-base text-speecat-navy hover:text-speecat-green transition-colors truncate">
                            {friend.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-speecat-green shrink-0" />
                          <span className="truncate">{friend.locality}, Hyderabad</span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-bold mt-1">
                          ★ {friend.sportsmanship.overallScore.toFixed(1)} Sportsmanship
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {friend.bio}
                    </p>

                    {/* Common Sports & Skill Levels */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Sport Skill Levels
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {commonSports.map((sp) => {
                          const skill = friend.sportSkills[sp]?.selfAssessed || "Intermediate";
                          const badge = SKILL_LEVEL_BADGE_COLORS[skill] || {
                            bg: "bg-slate-100",
                            text: "text-slate-700",
                            border: "border-slate-200",
                          };
                          return (
                            <span
                              key={sp}
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${badge.bg} ${badge.text} ${badge.border}`}
                            >
                              {sp}: {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Match History Stats */}
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Games Played Together:</span>
                        <span className="font-bold text-speecat-navy">{relationship.gamesPlayedTogether} matches</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Game Played:</span>
                        <span className="font-semibold text-speecat-navy">{relationship.lastGameDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setInviteModalFriend(friend)}
                      className="flex-1 bg-speecat-navy hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-speecat-green" />
                      <span>Invite to Game</span>
                    </button>

                    <Link
                      href={`/profile/${friend.id}`}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition-colors"
                      title="View Profile"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => handleRemoveFriend(friend.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Remove Friend"
                    >
                      <UserMinus className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-speecat-navy">No friends found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Play games with local players in Hyderabad! Once a game is completed and verified, your fellow players will automatically appear on your friends list.
              </p>
            </div>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 bg-speecat-green text-speecat-navy font-black text-xs px-5 py-2.5 rounded-xl shadow-xs"
            >
              <span>Explore Active Community Games</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>

      {/* INVITE FRIEND TO GAME MODAL */}
      {inviteModalFriend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-base text-speecat-navy">
                Invite {inviteModalFriend.name} to a Game
              </h3>
              <button onClick={() => setInviteModalFriend(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            {inviteSent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-speecat-green mx-auto" />
                <h4 className="font-bold text-sm text-speecat-navy">Invitation Sent!</h4>
                <p className="text-xs text-slate-600">
                  {inviteModalFriend.name} has been notified and can confirm their spot!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
                {hostedGames.length > 0 ? (
                  <div className="space-y-2">
                    <label className="block font-bold text-speecat-navy">
                      Choose an open game you are hosting:
                    </label>
                    <div className="space-y-2">
                      {hostedGames.map((g) => (
                        <label
                          key={g.id}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedGameIdToInvite === g.id
                              ? "border-speecat-green bg-emerald-50/50 shadow-xs"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="invite_game"
                            value={g.id}
                            checked={selectedGameIdToInvite === g.id}
                            onChange={(e) => setSelectedGameIdToInvite(e.target.value)}
                            className="mt-0.5 text-speecat-green accent-speecat-green"
                          />
                          <div>
                            <div className="font-bold text-speecat-navy">{g.title}</div>
                            <div className="text-[11px] text-slate-500">
                              {g.sport} • {g.date} • {g.startTime} • {g.venueName}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center space-y-2">
                    <p className="text-slate-600 font-medium">You don't have any open hosted games right now.</p>
                    <Link
                      href="/host-game"
                      className="inline-block bg-speecat-navy text-white text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      Host a New Game First
                    </Link>
                  </div>
                )}

                {hostedGames.length > 0 && (
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setInviteModalFriend(null)}
                      className="bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedGameIdToInvite}
                      className="bg-speecat-green hover:bg-speecat-green-600 disabled:opacity-50 text-speecat-navy text-xs font-black px-5 py-2 rounded-xl shadow-xs"
                    >
                      Send Friend Invitation
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
