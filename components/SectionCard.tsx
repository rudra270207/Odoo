'use client';

import React from 'react';
import { Calendar, DollarSign, Plus, Trash2, GripVertical, CheckCircle2, Tag } from 'lucide-react';
import { TripSection } from '@/lib/mockData';

interface SectionCardProps {
  section: TripSection;
  index: number;
  onUpdate: (updatedSection: TripSection) => void;
  onDelete: (id: string) => void;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  section,
  index,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 sm:p-6 transition-all duration-200 hover:shadow-soft-lg space-y-4">
      
      {/* Section Header with Number Badge */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-ocean-700 text-white font-heading font-extrabold text-sm flex items-center justify-center shadow-xs">
            0{index + 1}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-ocean-700">
              Itinerary Section
            </span>
            <input
              type="text"
              value={section.title}
              onChange={(e) => onUpdate({ ...section, title: e.target.value })}
              className="w-full text-base sm:text-lg font-heading font-bold text-slate-900 border-b border-transparent hover:border-slate-300 focus:border-ocean-700 focus:outline-none bg-transparent transition-all"
              placeholder="Section Title (e.g. Arrival & Amalfi Coast Exploration)"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onDelete(section.id)}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          title="Delete Section"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          Section Highlights & Notes
        </label>
        <textarea
          rows={2}
          value={section.description}
          onChange={(e) => onUpdate({ ...section, description: e.target.value })}
          className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700 transition-all resize-none"
          placeholder="Brief description of what you plan to accomplish in this section..."
        />
      </div>

      {/* Date Range & Budget Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-cream-50 p-4 rounded-xl border border-slate-200/80">
        
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-ocean-700" />
            <span>Start Date</span>
          </label>
          <input
            type="date"
            value={section.startDate}
            onChange={(e) => onUpdate({ ...section, startDate: e.target.value })}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-700"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-ocean-700" />
            <span>End Date</span>
          </label>
          <input
            type="date"
            value={section.endDate}
            onChange={(e) => onUpdate({ ...section, endDate: e.target.value })}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-ocean-700"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-coral-500" />
            <span>Allocated Budget ($)</span>
          </label>
          <input
            type="number"
            value={section.budget}
            onChange={(e) => onUpdate({ ...section, budget: Number(e.target.value) || 0 })}
            className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-coral-500"
            placeholder="Budget amount"
          />
        </div>

      </div>

      {/* Activities Summary Bar */}
      <div className="flex items-center justify-between pt-2 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <CheckCircle2 className="w-4 h-4 text-ocean-700" />
          <span>{section.activitiesCount || 3} Planned Activities</span>
        </div>

        <button
          type="button"
          onClick={() => onUpdate({ ...section, activitiesCount: (section.activitiesCount || 3) + 1 })}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ocean-50 text-ocean-700 hover:bg-ocean-100 font-semibold text-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Activity</span>
        </button>
      </div>

    </div>
  );
};
