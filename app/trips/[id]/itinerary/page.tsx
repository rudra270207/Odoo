'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Calendar, MapPin, Footprints, DollarSign, Activity, Edit3, Share2, ArrowLeft, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { ToolBar } from '@/components/ToolBar';
import { DayAccordion } from '@/components/DayAccordion';
import { MOCK_TRIPS } from '@/lib/mockData';

export default function TripItineraryPage({ params }: { params: { id: string } }) {
  const trip = MOCK_TRIPS[0]; // Primary mock trip (Amalfi Coast Dream)
  const itineraryDays = trip.itineraryDays || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Status');
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');

  // Metrics accumulators
  const totalDistance = itineraryDays.reduce((acc, d) => acc + d.totalDistanceKm, 0);
  const totalSteps = itineraryDays.reduce((acc, d) => acc + d.totalSteps, 0);
  const totalCost = itineraryDays.reduce((acc, d) => acc + d.activities.reduce((a, c) => a + c.cost, 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb Nav & Title Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <Link
            href="/trips"
            className="flex items-center gap-1.5 text-xs font-semibold text-ocean-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Trips</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/trips/${params.id || 'trip-1'}/build`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Sections</span>
            </Link>

            <button
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-coral-50 text-coral-600 hover:bg-coral-100 text-xs font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Plan</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-ocean-50 text-ocean-700 border border-ocean-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-ocean-700 animate-ping"></span>
              {trip.status} Trip • {trip.country}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              {trip.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-ocean-700" />
              <span>{trip.startDate} to {trip.endDate} • {trip.travelersCount} Travelers</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Budget</span>
              <span className="font-heading font-extrabold text-xl text-slate-900">${trip.budget.toLocaleString()}</span>
            </div>
            <div className="text-right pl-3 border-l border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Logged Spent</span>
              <span className="font-heading font-extrabold text-xl text-coral-600">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ToolBar Integration */}
      <ToolBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        placeholder="Filter daily timeline activities by key term..."
      />

      {/* 2-Column Stats Panel: Physical Activity vs Expense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Physical Activity Column */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-4 border-t-4 border-t-ocean-700">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-ocean-50 text-ocean-700">
                <Footprints className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Physical Activity Metrics
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
              Moderate Fitness
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="block font-heading font-extrabold text-lg text-ocean-700">{totalDistance.toFixed(1)} km</span>
              <span className="block text-[11px] text-slate-500 font-medium">Total Distance</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="block font-heading font-extrabold text-lg text-ocean-700">{totalSteps.toLocaleString()}</span>
              <span className="block text-[11px] text-slate-500 font-medium">Total Steps</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="block font-heading font-extrabold text-lg text-ocean-700">350 m</span>
              <span className="block text-[11px] text-slate-500 font-medium">Elevation Gain</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Trail Intensity Progress</span>
              <span>65% Trekking</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-ocean-700 h-full w-[65%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Expense Breakdown Column */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-4 border-t-4 border-t-coral-500">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-coral-50 text-coral-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Expense & Cost Breakdown
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-coral-50 text-coral-600 text-xs font-bold">
              Under Budget
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="block font-heading font-extrabold text-lg text-coral-600">${totalCost}</span>
              <span className="block text-[11px] text-slate-500 font-medium">Itinerary Cost</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="block font-heading font-extrabold text-lg text-emerald-700">${trip.budget - totalCost}</span>
              <span className="block text-[11px] text-slate-500 font-medium">Remaining</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="block font-heading font-extrabold text-lg text-slate-800">${(totalCost / 3).toFixed(0)}</span>
              <span className="block text-[11px] text-slate-500 font-medium">Avg / Day</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Budget Usage ({((totalCost / trip.budget) * 100).toFixed(0)}%)</span>
              <span>${totalCost} of ${trip.budget}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-coral-500 h-full rounded-full" style={{ width: `${(totalCost / trip.budget) * 100}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Day Accordions Timeline Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-ocean-700" />
            <span>Day-by-Day Timeline Accordions ({itineraryDays.length} Days)</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Expand accordion to view activity schedules & notes
          </span>
        </div>

        {itineraryDays.map((day, idx) => (
          <DayAccordion key={day.dayNumber} day={day} isDefaultOpen={idx === 0} />
        ))}
      </div>

    </div>
  );
}
