'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Calendar, MapPin, DollarSign, Users, Sparkles, Plus, Check, ArrowRight } from 'lucide-react';
import { SuggestionCard } from '@/components/SuggestionCard';
import { AddToTripModal } from '@/components/AddToTripModal';
import { MOCK_SUGGESTIONS, SuggestionItem } from '@/lib/mockData';

export default function NewTripPage() {
  const router = useRouter();

  // Form Fields
  const [tripTitle, setTripTitle] = useState(' Amalfi Riviera & Capri Expedition');
  const [destination, setDestination] = useState('Positano & Amalfi, Italy');
  const [startDate, setStartDate] = useState('2026-09-10');
  const [endDate, setEndDate] = useState('2026-09-18');
  const [budget, setBudget] = useState(3500);
  const [travelers, setTravelers] = useState(2);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Coastal', 'Culinary']);

  // Selected Suggestions from 2x3 Grid
  const [selectedSuggestionIds, setSelectedSuggestionIds] = useState<string[]>(['sug-1', 'sug-2']);
  const [activeModalItem, setActiveModalItem] = useState<SuggestionItem | null>(null);

  const availableTags = ['Coastal', 'Culinary', 'Adventure', 'Relaxation', 'Culture', 'Mountain', 'Luxury'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCreateTrip = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/trips/trip-1/build');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-ocean-700 to-coral-500 text-white flex items-center justify-center shadow-md">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900">
              Plan a New Trip Wizard
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Set destination parameters and pick recommended local highlights for your itinerary
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ocean-50 text-ocean-700 border border-ocean-200">
            Step 1 of 2: Trip Parameters
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Trip Creation Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft space-y-6">
          <h2 className="font-heading font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">
            Trip Details & Preferences
          </h2>

          <form onSubmit={handleCreateTrip} className="space-y-4">
            
            {/* Trip Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Trip Name / Title
              </label>
              <input
                type="text"
                required
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                placeholder="e.g. Amalfi Coast & Capri Getaway"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700"
              />
            </div>

            {/* Destination Place */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Destination Place / Country
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-coral-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Positano, Italy"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700"
                />
              </div>
            </div>

            {/* Date Range: Start & End Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-ocean-700" />
                  <span>Start Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-ocean-700" />
                  <span>End Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-ocean-700"
                />
              </div>
            </div>

            {/* Budget & Travelers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-coral-500" />
                  <span>Total Budget ($)</span>
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-coral-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-ocean-700" />
                  <span>Travelers Count</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-ocean-700"
                />
              </div>
            </div>

            {/* Style Tags Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Travel Style Tags
              </label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-ocean-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form CTA */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow flex items-center justify-center gap-2 transition-all hover:shadow-lg"
              >
                <span>Save & Build Detailed Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Suggestions Grid (2x3 Cards Layout) (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-coral-500" />
                <span>Recommended Regional Highlights (2x3 Suggestions)</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Tap 'Add to Trip' to append any activity into your new itinerary
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-coral-50 text-coral-600 text-xs font-bold">
              {selectedSuggestionIds.length} Picked
            </span>
          </div>

          {/* 2x3 Grid of Suggestion Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_SUGGESTIONS.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onAddToTrip={(item) => setActiveModalItem(item)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Add To Trip Modal Dialog */}
      <AddToTripModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onSuccess={(tripTitle, itemTitle) => {
          if (activeModalItem) {
            setSelectedSuggestionIds([...selectedSuggestionIds, activeModalItem.id]);
          }
        }}
      />

    </div>
  );
}
