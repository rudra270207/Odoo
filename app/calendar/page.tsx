'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, MapPin, Clock, Plus, ArrowRight, X, Compass, Layers } from 'lucide-react';
import { ToolBar } from '@/components/ToolBar';
import { CalendarGrid } from '@/components/CalendarGrid';
import { CalendarEventPill, MOCK_CALENDAR_EVENTS } from '@/lib/mockData';

export default function CalendarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Status');
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');

  const [selectedDateKey, setSelectedDateKey] = useState<string>('2026-08-21');
  const [selectedPills, setSelectedPills] = useState<CalendarEventPill[]>(
    MOCK_CALENDAR_EVENTS['2026-08-21'] || []
  );

  const handleSelectDate = (dateKey: string, pills: CalendarEventPill[]) => {
    setSelectedDateKey(dateKey);
    setSelectedPills(pills);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Calendar Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ocean-700 to-coral-500 text-white flex items-center justify-center shadow-md">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900">
              Trip Calendar Schedule
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Visualize trip spans, ferry departures, and scheduled events across dates
            </p>
          </div>
        </div>

        <Link
          href="/trips/new"
          className="px-5 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Trip</span>
        </Link>
      </div>

      {/* ToolBar */}
      <ToolBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        placeholder="Filter calendar events by destination or title..."
      />

      {/* Main Grid: 12 Cols (8 cols CalendarGrid + 4 cols Selected Agenda Drawer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: CalendarGrid (8 cols) */}
        <div className="lg:col-span-8">
          <CalendarGrid onSelectDate={handleSelectDate} />
        </div>

        {/* Right Column: Selected Day Agenda Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Selected Agenda</span>
                <h2 className="font-heading font-extrabold text-base text-slate-900">
                  {selectedDateKey}
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-ocean-50 text-ocean-700 text-xs font-bold">
                {selectedPills.length} Scheduled
              </span>
            </div>

            {selectedPills.length > 0 ? (
              <div className="space-y-3">
                {selectedPills.map((pill) => (
                  <div
                    key={pill.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${pill.gradient}`}>
                        {pill.status}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        All-day Event
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        {pill.tripTitle}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-coral-500" />
                        <span>{pill.destination}</span>
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Link
                        href={`/trips/${pill.tripId}/itinerary`}
                        className="text-xs font-bold text-ocean-700 hover:underline flex items-center gap-1"
                      >
                        <span>View Daily Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <Compass className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-700">No events on this date</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Click another date on the calendar or create a new trip schedule.
                </p>
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/trips/new"
                className="w-full py-2.5 rounded-xl bg-ocean-50 text-ocean-700 hover:bg-ocean-100 font-bold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event to {selectedDateKey}</span>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
