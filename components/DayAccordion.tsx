'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, MapPin, Footprints, DollarSign, Activity, Compass, Utensils, Navigation, Sun, Sparkles } from 'lucide-react';
import { ItineraryDay, ActivityItem } from '@/lib/mockData';

interface DayAccordionProps {
  day: ItineraryDay;
  isDefaultOpen?: boolean;
}

export const DayAccordion: React.FC<DayAccordionProps> = ({ day, isDefaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const getCategoryIcon = (category: ActivityItem['category']) => {
    switch (category) {
      case 'Culinary':
        return <Utensils className="w-3.5 h-3.5 text-orange-500" />;
      case 'Adventure':
        return <Compass className="w-3.5 h-3.5 text-teal-600" />;
      case 'Transit':
        return <Navigation className="w-3.5 h-3.5 text-cyan-600" />;
      case 'Relaxation':
        return <Sun className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  const getIntensityBadge = (intensity: ActivityItem['intensity']) => {
    switch (intensity) {
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-700">High Intensity</span>;
      case 'Moderate':
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">Moderate</span>;
      case 'Low':
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">Relaxed</span>;
    }
  };

  const dayTotalCost = day.activities.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden transition-all mb-5">
      
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50/80 hover:bg-slate-100/80 transition-colors gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ocean-700 text-white font-heading font-extrabold text-sm flex items-center justify-center shadow-xs">
            D{day.dayNumber}
          </div>
          <div className="text-left">
            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
              {day.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {day.date} — {day.summary}
            </p>
          </div>
        </div>

        {/* Daily Summary Quick Metrics & Accordion Arrow */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 self-end sm:self-center">
          <div className="hidden md:flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="flex items-center gap-1 text-ocean-700">
              <Footprints className="w-3.5 h-3.5" />
              {day.totalDistanceKm} km ({day.totalSteps.toLocaleString()} steps)
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-coral-600">
              <DollarSign className="w-3.5 h-3.5" />
              ${dayTotalCost}
            </span>
          </div>

          <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Accordion Content Timeline */}
      {isOpen && (
        <div className="p-5 sm:p-6 bg-white border-t border-slate-100">
          
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            
            {day.activities.map((activity, idx) => (
              <div key={activity.id} className="relative group">
                
                {/* Timeline Dot */}
                <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-white border-2 border-ocean-700 group-hover:bg-coral-500 group-hover:border-coral-500 transition-colors flex items-center justify-center shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-ocean-700 group-hover:bg-white"></div>
                </div>

                {/* Timeline Row Card */}
                <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs">
                        <Clock className="w-3 h-3 text-ocean-700" />
                        {activity.time}
                      </span>

                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs">
                        {getCategoryIcon(activity.category)}
                        {activity.category}
                      </span>

                      {getIntensityBadge(activity.intensity)}
                    </div>

                    <div className="text-xs font-bold text-slate-900">
                      {activity.cost > 0 ? `$${activity.cost}` : 'Free'}
                    </div>

                  </div>

                  {/* Activity Title & Location */}
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">
                      {activity.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-coral-500" />
                      <span>{activity.location}</span>
                    </div>
                  </div>

                  {activity.notes && (
                    <div className="mt-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/60 font-mono">
                      💡 {activity.notes}
                    </div>
                  )}

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
};
