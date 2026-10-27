"use client";

import React, { useState } from "react";
import { Info, X, ShieldAlert } from "lucide-react";

export default function PreviewBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs sm:text-sm text-amber-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded text-xs uppercase tracking-wide">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
            Preview Directory
          </span>
          <p className="font-medium text-amber-900 leading-snug">
            Venue and club information is displayed for demonstration. Listings do not imply a partnership with Speedcat.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-700 hover:text-amber-950 p-1 rounded-md transition-colors shrink-0"
          title="Dismiss notification"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
