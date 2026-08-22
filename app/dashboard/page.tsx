'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Compass, Sparkles, MapPin, Globe, Calendar, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { ToolBar } from '@/components/ToolBar';
import { TripCard } from '@/components/TripCard';
import { StatCard } from '@/components/StatCard';
import { MOCK_USER, MOCK_REGIONAL_SELECTIONS, MOCK_TRIPS, Trip } from '@/lib/mockData';

export default function DashboardPage() {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Status');
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');

  // Filter & Sort Logic
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGroup = selectedGroup === 'All Status' || trip.status === selectedGroup;
    const matchesFilter = selectedFilter === 'All Regions' || trip.region === selectedFilter;

    return matchesSearch && matchesGroup && matchesFilter;
  });

  const handleDeleteTrip = (id: string) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  const handleDuplicateTrip = (tripToDup: Trip) => {
    const newTrip: Trip = {
      ...tripToDup,
      id: `trip-${Date.now()}`,
      title: `${tripToDup.title} (Copy)`,
      status: 'Upcoming',
    };
    setTrips([newTrip, ...trips]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-ocean-800 via-ocean-700 to-slate-900 text-white p-6 sm:p-10 shadow-soft-lg overflow-hidden">
        {/* Abstract Background Orbs */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-coral-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-12 w-80 h-80 rounded-full bg-ocean-500/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-coral-400 text-xs font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-coral-500" />
              <span>Welcome back, {MOCK_USER.name}! 🌍</span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
              Where will your next story unfold?
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Organize day-by-day itineraries, track budgets, and explore curated regional selections with your ultimate wanderlust companion.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/trips/new"
                className="px-5 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow flex items-center gap-2 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>+ Plan a New Trip</span>
              </Link>

              <Link
                href="/search"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          {/* Quick Metrics Cards Banner Column */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 min-w-[280px]">
            <div className="text-center space-y-1">
              <span className="block text-2xl font-extrabold font-heading text-coral-400">{MOCK_USER.tripsCount}</span>
              <span className="block text-[11px] text-slate-300 font-medium">Trips Planned</span>
            </div>
            <div className="text-center space-y-1 border-x border-white/10 px-2">
              <span className="block text-2xl font-extrabold font-heading text-ocean-400">{MOCK_USER.countriesVisited}</span>
              <span className="block text-[11px] text-slate-300 font-medium">Countries</span>
            </div>
            <div className="text-center space-y-1">
              <span className="block text-2xl font-extrabold font-heading text-amber-400">48.2k</span>
              <span className="block text-[11px] text-slate-300 font-medium">Miles Logged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Regional Selections Row (5-card row) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-ocean-700" />
              <span>Top Regional Selections</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Handpicked travel corridors with pre-built activity templates
            </p>
          </div>

          <Link href="/search" className="text-xs font-bold text-coral-600 hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Card Grid / Scroll Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {MOCK_REGIONAL_SELECTIONS.map((reg) => (
            <Link
              key={reg.id}
              href={`/search?query=${encodeURIComponent(reg.name)}`}
              className="group relative rounded-2xl p-4 overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between h-44 hover:-translate-y-1"
            >
              {/* Gradient BG */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${reg.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-white text-[10px] font-semibold border border-white/20">
                  {reg.tag}
                </span>
                <span className="text-[10px] text-white/90 font-medium">
                  {reg.tripsPlanned} plans
                </span>
              </div>

              <div className="relative z-10 text-white">
                <p className="text-[11px] text-white/80 font-medium">{reg.country}</p>
                <h3 className="font-heading font-extrabold text-base leading-tight group-hover:text-amber-200 transition-colors">
                  {reg.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main ToolBar Integration */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-lg text-slate-900">
            My Planned Trips & Expeditions
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredTrips.length} of {trips.length} total trips
          </span>
        </div>

        <ToolBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedGroup={selectedGroup}
          onGroupChange={setSelectedGroup}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          placeholder="Filter your trips by name or destination..."
        />

        {/* Trips Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={handleDeleteTrip}
                onDuplicate={handleDuplicateTrip}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-slate-800">No trips matched your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your ToolBar filters or create a new trip itinerary from scratch.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGroup('All Status');
                setSelectedFilter('All Regions');
              }}
              className="px-4 py-2 bg-ocean-700 text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
