'use client';

import React from 'react';
import { Star, MapPin, Plus, Tag, ArrowUpRight } from 'lucide-react';
import { SuggestionItem } from '@/lib/mockData';

interface SuggestionCardProps {
  suggestion: SuggestionItem;
  onAddToTrip?: (suggestion: SuggestionItem) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, onAddToTrip }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
      
      {/* Gradient Thumbnail Placeholder */}
      <div className={`h-36 w-full bg-gradient-to-tr ${suggestion.gradient} p-3 flex flex-col justify-between relative`}>
        <div className="flex items-center justify-between z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide border border-white/20">
            {suggestion.tag}
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold shadow-2xs">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{suggestion.rating}</span>
          </div>
        </div>

        <div className="z-10">
          <span className="text-white text-xs font-medium backdrop-blur-xs px-2 py-0.5 rounded bg-black/20">
            ${suggestion.price} per person
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-ocean-700 font-medium mb-1">
            <MapPin className="w-3 h-3" />
            <span>{suggestion.location}</span>
          </div>
          
          <h4 className="font-heading font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-ocean-700 transition-colors">
            {suggestion.title}
          </h4>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {suggestion.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400">
            {suggestion.category}
          </span>

          <button
            type="button"
            onClick={() => onAddToTrip?.(suggestion)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-coral-50 hover:bg-coral-500 text-coral-600 hover:text-white font-semibold text-xs transition-all duration-200"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Trip</span>
          </button>
        </div>

      </div>

    </div>
  );
};
