'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, DollarSign, ArrowRight, Share2, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { Trip } from '@/lib/mockData';

interface TripCardProps {
  trip: Trip;
  onDelete?: (id: string) => void;
  onDuplicate?: (trip: Trip) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onDelete, onDuplicate }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Status Badge Styling
  const getStatusBadge = () => {
    switch (trip.status) {
      case 'Ongoing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-ocean-50 text-ocean-700 border border-ocean-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-ocean-700 animate-ping"></span>
            Ongoing
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-coral-50 text-coral-600 border border-coral-200">
            Upcoming
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      
      {/* Gradient Hero Placeholder */}
      <div className={`h-40 w-full bg-gradient-to-tr ${trip.gradient} p-4 flex flex-col justify-between relative overflow-hidden`}>
        {/* Subtle decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        <div className="absolute left-1/2 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

        {/* Top bar over gradient */}
        <div className="flex items-center justify-between z-10">
          {getStatusBadge()}
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 rounded-full bg-slate-900/30 hover:bg-slate-900/50 backdrop-blur-md flex items-center justify-center text-white transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-30 animate-in fade-in duration-150"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <Link
                  href={`/trips/${trip.id}/build`}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit Plan</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    onDuplicate?.(trip);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Duplicate Trip</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete?.(trip.id);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Delete Trip</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom tag over gradient */}
        <div className="flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1 border border-white/20">
            <span>{trip.coverEmoji || '🌍'}</span>
            <span>{trip.country}</span>
          </span>
          <span className="text-white/90 text-xs font-semibold drop-shadow-xs">
            ${trip.budget.toLocaleString()} Budget
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-ocean-700 font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{trip.destination}</span>
          </div>

          <h3 className="font-heading font-bold text-base text-slate-900 line-clamp-1 group-hover:text-ocean-700 transition-colors">
            {trip.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{trip.startDate} to {trip.endDate}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-xl">
            <Users className="w-3.5 h-3.5 text-ocean-700" />
            <span>{trip.travelersCount} Traveler{trip.travelersCount > 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-xl">
            <DollarSign className="w-3.5 h-3.5 text-coral-500" />
            <span>${trip.spent?.toLocaleString() || 0} spent</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-1 flex items-center justify-between gap-2">
          <Link
            href={`/trips/${trip.id}/itinerary`}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-ocean-50 text-slate-700 hover:text-ocean-700 font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={`/trips/${trip.id}/build`}
            className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-ocean-700 text-white font-medium text-xs transition-colors"
            title="Edit Section Plan"
          >
            Build
          </Link>
        </div>

      </div>

    </div>
  );
};
