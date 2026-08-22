'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Heart, MessageSquare, Bookmark, Share2, Compass, TrendingUp, MapPin, Award, Plus, Check } from 'lucide-react';
import { ToolBar } from '@/components/ToolBar';
import { MOCK_COMMUNITY_POSTS, CommunityPost } from '@/lib/mockData';

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Status');
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[id];
      setPosts((pList) =>
        pList.map((p) => (p.id === id ? { ...p, likes: isLiked ? p.likes + 1 : p.likes - 1 } : p))
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const toggleSave = (id: string) => {
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Community Banner */}
      <div className="bg-gradient-to-r from-ocean-800 via-ocean-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-coral-400 text-xs font-semibold border border-white/10 inline-block mb-2">
            Wanderlust Community Feed
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">
            Real Traveler Itineraries & Trail Stories
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Explore shared trip logs from experienced wanderers and save their templates directly to your profile.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Post creation modal opened!')}
          className="px-5 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow flex items-center gap-1.5 shrink-0 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Share Your Trip</span>
        </button>
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
        placeholder="Filter posts by keyword, destination, or hashtag..."
      />

      {/* Main Grid: 12 Cols (8 cols feed + 4 cols desktop side panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Vertical Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-5 sm:p-6 space-y-4 hover:shadow-soft-lg transition-all"
            >
              
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-ocean-200 shadow-xs"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-900">
                      {post.author.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {post.author.handle} • {post.timeAgo}
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-ocean-50 text-ocean-700 text-xs font-semibold">
                  <MapPin className="w-3 h-3 text-coral-500" />
                  {post.destination}
                </span>
              </div>

              {/* Shared Trip Card Hero Preview */}
              <div className={`h-48 rounded-2xl bg-gradient-to-tr ${post.gradient} p-4 text-white flex flex-col justify-between shadow-xs relative overflow-hidden`}>
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-[10px] font-bold uppercase tracking-wider">
                    Shared Itinerary Card
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-lg leading-snug drop-shadow-xs">
                    {post.title}
                  </h4>
                  <p className="text-xs text-white/90 font-medium mt-0.5">
                    Destination: {post.destination}
                  </p>
                </div>
              </div>

              {/* Post Description */}
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-semibold text-ocean-700 bg-ocean-50 px-2.5 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions Row */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      likedPosts[post.id] ? 'text-rose-600' : 'hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts[post.id] ? 'fill-rose-600' : ''}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 hover:text-ocean-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} Comments</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSave(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                      savedPosts[post.id]
                        ? 'bg-coral-50 text-coral-600 border-coral-200 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{savedPosts[post.id] ? 'Saved to Profile' : 'Save Itinerary'}</span>
                  </button>

                  <button
                    type="button"
                    className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
                    title="Share post"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column: Desktop Side Info Panel (4 cols) */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          
          {/* Widget 1: Trending Destinations */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-5 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-coral-500" />
              <span>Trending Destinations</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800">1. Positano & Amalfi</span>
                <span className="text-ocean-700 font-semibold">1,420 trips</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800">2. Kyoto Shrines</span>
                <span className="text-ocean-700 font-semibold">1,280 trips</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800">3. Swiss Matterhorn</span>
                <span className="text-ocean-700 font-semibold">980 trips</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-800">4. Reykjavik Glaciers</span>
                <span className="text-ocean-700 font-semibold">840 trips</span>
              </div>
            </div>
          </div>

          {/* Widget 2: Active Travelers Leaderboard */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-5 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Top Travel Contributors</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ocean-700 text-white font-bold text-xs flex items-center justify-center">
                  #1
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-slate-900">Elena Rostova</p>
                  <p className="text-slate-400">28 Public Itineraries</p>
                </div>
                <button className="px-2.5 py-1 rounded-lg bg-ocean-50 text-ocean-700 text-xs font-semibold">
                  Follow
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-coral-500 text-white font-bold text-xs flex items-center justify-center">
                  #2
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-slate-900">Kenji Takahashi</p>
                  <p className="text-slate-400">19 Public Itineraries</p>
                </div>
                <button className="px-2.5 py-1 rounded-lg bg-ocean-50 text-ocean-700 text-xs font-semibold">
                  Follow
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center">
                  #3
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-slate-900">Marcus Vance</p>
                  <p className="text-slate-400">15 Public Itineraries</p>
                </div>
                <button className="px-2.5 py-1 rounded-lg bg-ocean-50 text-ocean-700 text-xs font-semibold">
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Widget 3: Guidelines Card */}
          <div className="bg-cream-100 rounded-3xl p-5 border border-slate-200 text-xs space-y-2">
            <h4 className="font-heading font-bold text-slate-900">🌟 GlobeTrotter Community Guidelines</h4>
            <p className="text-slate-600 leading-relaxed">
              Share authentic travel tips, keep budgets realistic, and credit local guides whenever publishing public itineraries.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
