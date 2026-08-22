'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Plus, Sparkles, MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { ToolBar } from '@/components/ToolBar';
import { TripCard } from '@/components/TripCard';
import { MOCK_TRIPS, Trip } from '@/lib/mockData';

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Status');
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'upcoming' | 'completed'>('all');

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGroup = selectedGroup === 'All Status' || t.status === selectedGroup;
    const matchesFilter = selectedFilter === 'All Regions' || t.region === selectedFilter;

    if (activeTab === 'ongoing') return matchesSearch && matchesFilter && t.status === 'Ongoing';
    if (activeTab === 'upcoming') return matchesSearch && matchesFilter && t.status === 'Upcoming';
    if (activeTab === 'completed') return matchesSearch && matchesFilter && t.status === 'Completed';

    return matchesSearch && matchesGroup && matchesFilter;
  });

  const ongoingTrips = filteredTrips.filter((t) => t.status === 'Ongoing');
  const upcomingTrips = filteredTrips.filter((t) => t.status === 'Upcoming');
  const completedTrips = filteredTrips.filter((t) => t.status === 'Completed');

  const handleDeleteTrip = (id: string) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  const handleDuplicateTrip = (dup: Trip) => {
    const newTrip: Trip = { ...dup, id: `trip-${Date.now()}`, title: `${dup.title} (Copy)` };
    setTrips([newTrip, ...trips]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title & Action */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-ocean-700" />
            <span>My Trips Hub</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your ongoing expeditions, upcoming plans, and past travel memories
          </p>
        </div>

        <Link
          href="/trips/new"
          className="px-5 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
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
        placeholder="Search all trips by destination or country..."
      />

      {/* Tab Filter Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Trips ({filteredTrips.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ongoing')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'ongoing' ? 'bg-ocean-700 text-white shadow-xs' : 'text-ocean-700 bg-ocean-50 hover:bg-ocean-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-ocean-700 animate-pulse"></span>
          Ongoing ({ongoingTrips.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'upcoming' ? 'bg-coral-500 text-white shadow-xs' : 'text-coral-600 bg-coral-50 hover:bg-coral-100'
          }`}
        >
          Upcoming ({upcomingTrips.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'completed' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          Completed ({completedTrips.length})
        </button>
      </div>

      {/* 3 Grouped Sections View */}
      <div className="space-y-10">
        
        {/* SECTION 1: ONGOING TRIPS */}
        {(activeTab === 'all' || activeTab === 'ongoing') && ongoingTrips.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-ocean-100">
              <span className="w-3 h-3 rounded-full bg-ocean-700 animate-ping"></span>
              <h2 className="font-heading font-extrabold text-lg text-ocean-700">
                Ongoing Expeditions (Active Now)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onDelete={handleDeleteTrip}
                  onDuplicate={handleDuplicateTrip}
                />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: UPCOMING TRIPS */}
        {(activeTab === 'all' || activeTab === 'upcoming') && upcomingTrips.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-coral-100">
              <Clock className="w-5 h-5 text-coral-500" />
              <h2 className="font-heading font-extrabold text-lg text-coral-600">
                Upcoming Planned Trips
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onDelete={handleDeleteTrip}
                  onDuplicate={handleDuplicateTrip}
                />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: COMPLETED TRIPS */}
        {(activeTab === 'all' || activeTab === 'completed') && completedTrips.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-slate-500" />
              <h2 className="font-heading font-extrabold text-lg text-slate-700">
                Past & Completed Adventures
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onDelete={handleDeleteTrip}
                  onDuplicate={handleDuplicateTrip}
                />
              ))}
            </div>
          </section>
        )}

        {/* Fallback Empty */}
        {filteredTrips.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-slate-800">No trips found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no trips matching your search criteria in this group.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
