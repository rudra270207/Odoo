'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Heart, Globe, Mail, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on login and register screens
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-ocean-500 to-coral-500 flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                Globe<span className="text-coral-500">Trotter</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Design, organize, and share your dream travel itineraries. Seamless trip planning for wanderers worldwide.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <Globe className="w-4 h-4 text-ocean-500" />
              <span className="text-xs">Curated for 120+ destinations</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-wider text-slate-100 font-semibold">
              Explore GlobeTrotter
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-coral-500 transition-colors">Dashboard Overview</Link></li>
              <li><Link href="/trips" className="hover:text-coral-500 transition-colors">My Trips Hub</Link></li>
              <li><Link href="/search" className="hover:text-coral-500 transition-colors">Destination & Activity Finder</Link></li>
              <li><Link href="/community" className="hover:text-coral-500 transition-colors">Community Feed</Link></li>
              <li><Link href="/calendar" className="hover:text-coral-500 transition-colors">Calendar Schedule</Link></li>
            </ul>
          </div>

          {/* Col 3: Account & Admin */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-wider text-slate-100 font-semibold">
              Account & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/profile" className="hover:text-coral-500 transition-colors">User Profile & Bio</Link></li>
              <li><Link href="/trips/new" className="hover:text-coral-500 transition-colors">Plan New Trip Wizard</Link></li>
              <li><Link href="/admin" className="hover:text-coral-500 transition-colors">Admin Analytics Portal</Link></li>
              <li><Link href="/login" className="hover:text-coral-500 transition-colors">Login / Sign In</Link></li>
              <li><Link href="/register" className="hover:text-coral-500 transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-wider text-slate-100 font-semibold">
              Wanderlust Insights
            </h4>
            <p className="text-xs text-slate-400">
              Get weekly secret trail guides, budget tips, and seasonal itinerary templates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-coral-500"
                />
              </div>
              <button
                type="submit"
                className="p-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white transition-colors"
                title="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} GlobeTrotter Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-coral-500 fill-coral-500" />
            <span>for travel lovers worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
