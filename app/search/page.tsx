'use client';

import React, { useState } from 'react';
import { Search, MapPin, Star, Plus, Filter, Compass, ArrowRight, Check } from 'lucide-react';
import { ToolBar } from '@/components/ToolBar';
import { AddToTripModal } from '@/components/AddToTripModal';
import { MOCK_SUGGESTIONS, SuggestionItem } from '@/lib/mockData';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Status');
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');
  const [categoryTag, setCategoryTag] = useState('All Categories');
  const [activeModalItem, setActiveModalItem] = useState<SuggestionItem | null>(null);

  const categories = ['All Categories', 'Adventure', 'Culinary', 'Sightseeing', 'Relaxation', 'Culture'];

  const filteredResults = MOCK_SUGGESTIONS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedFilter === 'All Regions' || item.region === selectedFilter;
    const matchesCategory = categoryTag === 'All Categories' || item.category === categoryTag;

    return matchesSearch && matchesRegion && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-ocean-800 via-ocean-700 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-soft-lg space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="px-3 py-1 rounded-full bg-white/10 text-coral-400 text-xs font-semibold border border-white/10 inline-block">
            Global Search Engine
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight">
            Discover Experiences & Destinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Browse thousands of verified sea caves, mountain treks, vineyard tours, and cultural workshops
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryTag(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                categoryTag === cat
                  ? 'bg-coral-500 text-white shadow-coral-glow'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
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
        placeholder="Type a location, activity name, or landmark (e.g. Kayaking, Kyoto, Chianti)..."
      />

      {/* Vertical Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-lg text-slate-900">
            Search Results ({filteredResults.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Showing top curated activities
          </span>
        </div>

        <div className="space-y-4">
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg p-5 transition-all duration-200 flex flex-col md:flex-row items-stretch gap-5"
            >
              {/* Gradient Thumbnail */}
              <div className={`h-40 md:h-auto md:w-56 rounded-xl bg-gradient-to-tr ${item.gradient} p-4 flex flex-col justify-between text-white shrink-0 shadow-xs`}>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-[10px] font-semibold uppercase">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 bg-white/90 text-slate-900 px-2 py-0.5 rounded-full text-xs font-bold">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold bg-black/30 px-2 py-1 rounded">
                    ${item.price} / person
                  </span>
                </div>
              </div>

              {/* Detail Info */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-ocean-700 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-coral-500" />
                    <span>{item.location} • {item.region}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold">
                      Category: {item.category}
                    </span>
                    <span>{item.reviewsCount} reviews</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModalItem(item)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Trip</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Add To Trip Modal */}
      <AddToTripModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onSuccess={() => {}}
      />

    </div>
  );
}
