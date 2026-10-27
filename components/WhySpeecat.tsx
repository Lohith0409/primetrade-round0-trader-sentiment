import React from "react";
import { Zap, ShieldCheck, Clock, MapPin, IndianRupee, Sparkles } from "lucide-react";

export default function WhySpeecat() {
  const features = [
    {
      icon: <IndianRupee className="w-6 h-6 text-speedcat-green" />,
      title: "Transparent Pricing in INR (₹)",
      description:
        "Clear hourly rates with zero hidden booking charges. See off-peak and peak rates upfront before reserving.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-speedcat-green" />,
      title: "Hyderabad-Wide Coverage",
      description:
        "From Gachibowli to Secunderabad, Madhapur to LB Nagar — discover top badminton courts, turfs, clubs, and pickleball arenas in your neighborhood.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-speedcat-green" />,
      title: "Verified Facility & Club Details",
      description:
        "Every listing highlights verified surfaces (BWF Teak Wood, Yonex synthetic, FIFA AstroTurf, ITF Clay), club rules, and player amenities.",
    },
    {
      icon: <Zap className="w-6 h-6 text-speedcat-green" />,
      title: "Active Clubs & Community Games",
      description:
        "Join Hyderabad sports clubs, sign up for weekly running and badminton sessions, or host games with players matching your skill level.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-speedcat-green uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Hyderabad Players</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-speedcat-navy">
            Why Sports Enthusiasts Choose Speedcat
          </h2>
          <p className="text-sm text-slate-500">
            A seamless experience from venue discovery and clubs to court checkout
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 hover:bg-white border border-slate-200/90 hover:border-speedcat-green/50 rounded-2xl p-6 transition-all hover:shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-speedcat-green/10 flex items-center justify-center mb-4 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-speedcat-navy group-hover:text-speedcat-green transition-colors mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
