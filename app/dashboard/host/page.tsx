"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Calendar, 
  Clock, 
  Users, 
  IndianRupee, 
  ShieldCheck, 
  AlertCircle, 
  Plus, 
  CheckCircle2, 
  Settings, 
  Sliders,
  Sparkles
} from "lucide-react";

export default function HostDashboard() {
  const [selectedVenue, setSelectedVenue] = useState("Pullela Gopichand Badminton Academy");
  const [courts, setCourts] = useState([
    { id: "c1", name: "Court 1 - BWF Wooden Flooring", surface: "Teak Wood", rate: 600, status: "Active" },
    { id: "c2", name: "Court 2 - BWF Wooden Flooring", surface: "Teak Wood", rate: 600, status: "Active" },
    { id: "c3", name: "Court 3 - Yonex Synthetic Mat", surface: "Synthetic PVC", rate: 650, status: "Active" },
    { id: "c4", name: "Court 4 - Yonex Synthetic Mat", surface: "Synthetic PVC", rate: 650, status: "Maintenance" },
  ]);

  const [scheduleSlots, setScheduleSlots] = useState([
    { time: "06:00 AM - 07:00 AM", court: "Court 1", player: "Vikram R. (Demo)", status: "Booked" },
    { time: "07:00 AM - 08:00 AM", court: "Court 1", player: "Suresh K. (Demo)", status: "Booked" },
    { time: "08:00 AM - 09:00 AM", court: "Court 2", player: "Coaching Academy", status: "Reserved" },
    { time: "06:00 PM - 07:00 PM", court: "Court 3", player: "Ananya S. (Demo)", status: "Booked" },
    { time: "07:00 PM - 08:00 PM", court: "Court 1", player: "Rohith P. (Demo)", status: "Booked" },
    { time: "08:00 PM - 09:00 PM", court: "Court 2", player: "Available Slot", status: "Open" },
  ]);

  const toggleCourtStatus = (id: string) => {
    setCourts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "Active" ? "Maintenance" : "Active" } : c
      )
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Banner */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">
                  Venue Host Portal Preview
                </h1>
                <span className="bg-blue-900/80 border border-blue-400/40 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Preview Only
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Managing: <span className="text-white font-semibold">{selectedVenue}</span> • Gachibowli, Hyderabad
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sample Date:</span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl font-bold text-white">
              Today (Live Preview)
            </span>
          </div>
        </div>

        {/* Demo Disclaimer Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-amber-800">
              Venue Host Preview Notice:
            </span>{" "}
            This portal is a simulated operational mock-up for sports arena managers in Hyderabad. Speedcat does not claim that any venue has partnered or authorized real bookings through this demonstration.
          </div>
        </div>

        {/* Host Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">Weekly Court Hours</div>
            <div className="text-2xl font-black text-speecat-navy mt-1">42 hrs</div>
            <div className="text-[11px] text-speecat-green font-medium mt-1">+14% vs last week (Demo)</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">Projected Revenue (₹)</div>
            <div className="text-2xl font-black text-speecat-green mt-1">₹25,800</div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">Demo Estimate (₹)</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">Court Occupancy</div>
            <div className="text-2xl font-black text-blue-600 mt-1">78%</div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">Peak 6 PM - 10 PM</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">Configured Courts</div>
            <div className="text-2xl font-black text-speecat-navy mt-1">{courts.length}</div>
            <div className="text-[11px] text-speecat-green font-medium mt-1">
              {courts.filter((c) => c.status === "Active").length} Operational
            </div>
          </div>
        </div>

        {/* Courts Management & Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Courts List Column */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-speecat-navy uppercase tracking-wider">
                Court Inventory ({courts.length})
              </h2>
              <span className="text-[11px] text-slate-400">Click to toggle status</span>
            </div>

            <div className="space-y-3">
              {courts.map((court) => (
                <div
                  key={court.id}
                  className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-speecat-navy">{court.name}</span>
                    <button
                      onClick={() => toggleCourtStatus(court.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                        court.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {court.status}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Surface: {court.surface}</span>
                    <span className="font-bold text-speecat-navy">₹{court.rate}/hr</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule / Slots Column (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-speecat-green" />
                <h2 className="text-sm font-black text-speecat-navy uppercase tracking-wider">
                  Today’s Court Schedule Timeline (Demo)
                </h2>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-semibold">
                6 Slots Scheduled
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {scheduleSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-speecat-navy flex items-center gap-2">
                        <span>{slot.time}</span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          ({slot.court})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Booked by: <span className="font-medium text-speecat-navy">{slot.player}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg self-start sm:self-auto ${
                      slot.status === "Booked"
                        ? "bg-emerald-100 text-emerald-800"
                        : slot.status === "Reserved"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/explore"
                className="text-xs text-speecat-green font-bold hover:underline"
              >
                Browse Public View of This Venue →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
