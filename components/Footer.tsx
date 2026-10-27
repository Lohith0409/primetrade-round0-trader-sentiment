import React from "react";
import Link from "next/link";
import { Zap, MapPin, Shield, Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-speedcat-navy-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-speedcat-green flex items-center justify-center text-speedcat-navy shadow-sm">
                <Zap className="w-5 h-5 fill-speedcat-navy text-speedcat-navy" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                SPEED<span className="text-speedcat-green">CAT</span>
              </span>
            </div>
            
            <p className="text-sm font-medium text-speedcat-green">
              Find Your Game. Book Your Court.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hyderabad’s premier sports booking preview platform and active clubs network. Discover badminton academies, football turfs, box cricket arenas, running groups, and tennis courts across Telangana with transparent pricing and verified facility details.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-speedcat-green shrink-0" />
              <span>Gachibowli • Madhapur • Kondapur • Hyderabad, TS</span>
            </div>
          </div>

          {/* Quick Sports Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Popular Sports
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/explore?sport=Badminton" className="hover:text-speedcat-green transition-colors">
                  Badminton Courts
                </Link>
              </li>
              <li>
                <Link href="/explore?sport=Football" className="hover:text-speedcat-green transition-colors">
                  Football Turfs (5v5 & 7v7)
                </Link>
              </li>
              <li>
                <Link href="/explore?sport=Cricket" className="hover:text-speedcat-green transition-colors">
                  Box Cricket Arenas
                </Link>
              </li>
              <li>
                <Link href="/explore?sport=Tennis" className="hover:text-speedcat-green transition-colors">
                  Tennis (Clay & Hard)
                </Link>
              </li>
              <li>
                <Link href="/explore?sport=Pickleball" className="hover:text-speedcat-green transition-colors">
                  Pickleball Courts
                </Link>
              </li>
              <li>
                <Link href="/explore?sport=Swimming" className="hover:text-speedcat-green transition-colors">
                  Swimming Pools
                </Link>
              </li>
            </ul>
          </div>

          {/* Hyderabad Localities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Top Localities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/explore?locality=Gachibowli" className="hover:text-speedcat-green transition-colors">
                  Gachibowli
                </Link>
              </li>
              <li>
                <Link href="/explore?locality=Madhapur" className="hover:text-speedcat-green transition-colors">
                  Madhapur & HITEC City
                </Link>
              </li>
              <li>
                <Link href="/explore?locality=Kondapur" className="hover:text-speedcat-green transition-colors">
                  Kondapur
                </Link>
              </li>
              <li>
                <Link href="/explore?locality=Kukatpally" className="hover:text-speedcat-green transition-colors">
                  Kukatpally & Miyapur
                </Link>
              </li>
              <li>
                <Link href="/explore?locality=Jubilee%20Hills" className="hover:text-speedcat-green transition-colors">
                  Jubilee & Banjara Hills
                </Link>
              </li>
              <li>
                <Link href="/explore?locality=Secunderabad" className="hover:text-speedcat-green transition-colors">
                  Secunderabad & Uppal
                </Link>
              </li>
            </ul>
          </div>

          {/* Dashboards & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Clubs & Community
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/clubs" className="hover:text-speedcat-green transition-colors font-semibold text-white">
                  Explore Clubs
                </Link>
              </li>
              <li>
                <Link href="/clubs/organizer" className="hover:text-speedcat-green transition-colors">
                  Organiser Dashboard
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-speedcat-green transition-colors">
                  Find Games (Community)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-speedcat-green transition-colors">
                  Admin Control Panel
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-speedcat-green transition-colors">
                  About Speedcat
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-speedcat-green transition-colors">
                  Support & FAQs
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Demo Disclaimer & Legal */}
        <div className="pt-8 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-200">
                Important Preview Directory Notice
              </p>
              <p className="text-slate-400 leading-relaxed">
                Venue and club information, images, pricing, and operating hours are presented solely as a realistic website prototype demonstration for Hyderabad, India. Listings do not imply an official partnership, authorization, or commercial affiliation with Speedcat. The booking interface is a preview simulation and does not process real reservations or collect financial payments.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>
              © {new Date().getFullYear()} Speedcat Hyderabad. All rights reserved. Prices displayed in Indian Rupees (₹).
            </p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-speedcat-green fill-speedcat-green" /> for sports enthusiasts in Hyderabad
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
