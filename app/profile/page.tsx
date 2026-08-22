'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Globe, Camera, Edit3, Save, CheckCircle2, ArrowRight, Bookmark, Compass, Award } from 'lucide-react';
import { MOCK_USER, MOCK_PREPLANNED_TEMPLATES, MOCK_TRIPS } from '@/lib/mockData';

export default function ProfilePage() {
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [phone, setPhone] = useState(MOCK_USER.phone);
  const [city, setCity] = useState(MOCK_USER.city);
  const [country, setCountry] = useState(MOCK_USER.country);
  const [bio, setBio] = useState(MOCK_USER.bio);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const completedTrips = MOCK_TRIPS.filter((t) => t.status === 'Completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar with Ring */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-ocean-700 via-emerald-500 to-coral-500 shadow-md">
              <img
                src={MOCK_USER.avatar}
                alt={name}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <button className="absolute bottom-1 right-1 p-2 rounded-full bg-coral-500 text-white shadow-xs hover:scale-105 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Bio Header Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="font-heading font-extrabold text-2xl text-slate-900">{name}</h1>
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-ocean-50 text-ocean-700 border border-ocean-200">
                {MOCK_USER.role} Traveler
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-coral-500" />
              <span>{city}, {country} • Joined {MOCK_USER.joinedDate}</span>
            </p>

            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              "{bio}"
            </p>
          </div>

        </div>

        {/* Travel Stats Quick Grid */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="block font-heading font-extrabold text-xl text-ocean-700">{MOCK_USER.tripsCount}</span>
            <span className="block text-[11px] text-slate-500 font-medium">Trips Planned</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="block font-heading font-extrabold text-xl text-coral-600">{MOCK_USER.countriesVisited}</span>
            <span className="block text-[11px] text-slate-500 font-medium">Countries Visited</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="block font-heading font-extrabold text-xl text-emerald-700">64</span>
            <span className="block text-[11px] text-slate-500 font-medium">Total Days Traveled</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="block font-heading font-extrabold text-xl text-amber-600">48.2k</span>
            <span className="block text-[11px] text-slate-500 font-medium">Miles Logged</span>
          </div>
        </div>
      </div>

      {/* Editable User Details Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-ocean-700" />
              <span>Edit Account Details & Preferences</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Update your personal profile, email, phone number, and location
            </p>
          </div>

          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              Profile Updated!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City & Country</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700"
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700"
                />
              </div>
            </div>

          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Traveler Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-ocean-700 hover:bg-ocean-800 text-white font-semibold text-xs shadow-xs flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* "Preplanned Trips" Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-coral-500" />
              <span>Preplanned Trips & Saved Templates</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Saved itinerary structures you can clone into a new trip anytime
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_PREPLANNED_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 space-y-3 flex flex-col justify-between"
            >
              <div className={`h-24 rounded-xl bg-gradient-to-tr ${tmpl.gradient} p-3 flex flex-col justify-between text-white shadow-xs`}>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/30 w-fit">
                  Template
                </span>
                <span className="text-xs font-semibold">{tmpl.destination}</span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">{tmpl.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                  <span>Duration: {tmpl.duration}</span>
                  <span>•</span>
                  <span>Avg: {tmpl.avgBudget}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {tmpl.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/trips/new"
                  className="px-3 py-1.5 rounded-xl bg-coral-50 text-coral-600 hover:bg-coral-500 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  <span>View / Clone</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "Previous Trips" Row */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-ocean-700" />
              <span>Previous Trips History</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Review completed itineraries and travel memories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {completedTrips.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5 space-y-3">
              <div className={`h-24 rounded-xl bg-gradient-to-tr ${t.gradient} p-3 text-white flex flex-col justify-between`}>
                <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-semibold w-fit">
                  {t.country}
                </span>
                <span className="text-xs font-semibold">{t.startDate} to {t.endDate}</span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-sm text-slate-900">{t.title}</h3>
                <p className="text-xs text-slate-500">{t.destination} • ${t.spent} spent</p>
              </div>

              <Link
                href={`/trips/${t.id}/itinerary`}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-ocean-50 text-slate-700 hover:text-ocean-700 font-semibold text-xs text-center block transition-colors"
              >
                View Itinerary
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
