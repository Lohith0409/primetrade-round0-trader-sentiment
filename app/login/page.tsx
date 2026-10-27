"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Zap, 
  User, 
  Building2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Info
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("player.hyderabad@speecat.demo");
  const [password, setPassword] = useState("demo12345");
  const [selectedRole, setSelectedRole] = useState<"player" | "host" | "admin">("player");

  const handleQuickLogin = (role: "player" | "host" | "admin") => {
    if (role === "player") {
      router.push("/dashboard/player");
    } else if (role === "host") {
      router.push("/dashboard/host");
    } else {
      router.push("/dashboard/admin");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuickLogin(selectedRole);
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-speecat-navy flex items-center justify-center text-speecat-green shadow-md">
              <Zap className="w-6 h-6 fill-speecat-green text-speecat-green" />
            </div>
            <span className="text-2xl font-black tracking-tight text-speedcat-navy">
              SPEED<span className="text-speedcat-green">CAT</span>
            </span>
          </Link>
          <h2 className="text-xl font-black text-speedcat-navy">
            {tab === "login" ? "Demo Account Access" : "Join Speedcat Hyderabad"}
          </h2>
          <p className="text-xs text-slate-500">
            Preview player bookings, venue management, and administrative directory tools
          </p>
        </div>

        {/* Quick Demo Persona Switcher Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
            <Sparkles className="w-4 h-4 text-speecat-green" />
            <span>1-Click Demo Persona Access</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-snug">
            Choose an account role to immediately explore the corresponding dashboard:
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickLogin("player")}
              className="bg-white hover:bg-emerald-100/60 border border-emerald-300 rounded-xl p-2.5 text-center transition-all group shadow-xs"
            >
              <User className="w-4 h-4 text-speecat-green mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] font-bold text-speecat-navy">Player</div>
              <div className="text-[9px] text-slate-500">Bookings</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("host")}
              className="bg-white hover:bg-blue-50 border border-blue-200 rounded-xl p-2.5 text-center transition-all group shadow-xs"
            >
              <Building2 className="w-4 h-4 text-blue-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] font-bold text-speecat-navy">Venue Host</div>
              <div className="text-[9px] text-slate-500">Courts</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className="bg-white hover:bg-purple-50 border border-purple-200 rounded-xl p-2.5 text-center transition-all group shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] font-bold text-speecat-navy">Admin</div>
              <div className="text-[9px] text-slate-500">CSV Import</div>
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 pb-2">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 text-center pb-2 text-xs font-bold border-b-2 transition-all ${
                tab === "login"
                  ? "border-speecat-green text-speecat-navy"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Sign In (Demo)
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 text-center pb-2 text-xs font-bold border-b-2 transition-all ${
                tab === "register"
                  ? "border-speecat-green text-speecat-navy"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Register (Demo)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="block text-xs font-bold text-speecat-navy mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Karthik Hyderabad"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-speecat-navy"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-speecat-navy mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-speecat-navy focus:outline-none focus:ring-2 focus:ring-speecat-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-speecat-navy mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-speecat-navy focus:outline-none focus:ring-2 focus:ring-speecat-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-speecat-navy mb-1">
                Account Target Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-speecat-navy"
              >
                <option value="player">Player (Demo Bookings)</option>
                <option value="host">Venue Host (Court Management)</option>
                <option value="admin">Admin (Manage Listings & CSV)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-speecat-navy hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{tab === "login" ? "Enter Demo Dashboard" : "Create Demo Profile"}</span>
              <ArrowRight className="w-4 h-4 text-speecat-green" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-400">
              Prototype mode — no actual database accounts are stored.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
