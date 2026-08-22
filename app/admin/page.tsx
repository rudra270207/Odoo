'use client';

import React, { useState } from 'react';
import { Shield, Users, MapPin, Activity, TrendingUp, MoreVertical, Search, Check, AlertCircle, FileText } from 'lucide-react';
import { ToolBar } from '@/components/ToolBar';
import { StatCard } from '@/components/StatCard';
import { UserTrendsChart, PopularCitiesChart, PopularActivitiesChart } from '@/components/admin/ChartWrappers';
import { MOCK_ADMIN_USERS, MOCK_POPULAR_CITIES, MOCK_POPULAR_ACTIVITIES } from '@/lib/mockData';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'cities' | 'activities' | 'trends'>('users');
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All Status');
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');

  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Title Header */}
      <div className="bg-gradient-to-r from-ocean-800 via-ocean-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-coral-400 text-xs font-semibold border border-white/10 inline-block mb-2">
            System Administration & Analytics
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">
            GlobeTrotter Admin Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Platform user management, regional popularity indexes, and booking trends
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ● System Operational 99.9%
          </span>
        </div>
      </div>

      {/* Overview StatCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Users"
          value="12,480"
          change="+18.4%"
          isPositive={true}
          icon={<Users className="w-5 h-5 text-ocean-700" />}
          subtitle="Active monthly travelers"
          accentColor="teal"
        />

        <StatCard
          title="Total Expeditions Booked"
          value="35,420"
          change="+24.2%"
          isPositive={true}
          icon={<Activity className="w-5 h-5 text-coral-500" />}
          subtitle="Across 120+ destinations"
          accentColor="coral"
        />

        <StatCard
          title="Top Destination"
          value="Kyoto, Japan"
          change="+32%"
          isPositive={true}
          icon={<MapPin className="w-5 h-5 text-amber-500" />}
          subtitle="1,420 itineraries created"
          accentColor="teal"
        />

        <StatCard
          title="Platform Conversion Rate"
          value="4.85%"
          change="+0.6%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-slate-700" />}
          subtitle="Search to trip creation"
          accentColor="slate"
        />
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
        placeholder="Filter admin records by query..."
      />

      {/* 4 Interactive Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'users' ? 'bg-ocean-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Manage Users ({users.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cities')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'cities' ? 'bg-ocean-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4 text-coral-500" />
          <span>Popular Cities</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('activities')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'activities' ? 'bg-ocean-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-500" />
          <span>Popular Activities</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'trends' ? 'bg-ocean-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span>User Trends & Analytics</span>
        </button>
      </div>

      {/* Tab 1: MANAGE USERS */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-base text-slate-900">
              User Accounts Directory
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredUsers.length} users
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Trips Built</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-ocean-700 text-white font-bold flex items-center justify-center text-[10px]">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="p-4 text-slate-500">{u.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ocean-50 text-ocean-700">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 font-bold">{u.trips}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{u.joined}</td>
                    <td className="p-4 text-right">
                      <button className="p-1 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-800">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: POPULAR CITIES */}
      {activeTab === 'cities' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h2 className="font-heading font-extrabold text-base text-slate-900">
              Popular Destination Cities (Trips Planned)
            </h2>
            <PopularCitiesChart />
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h2 className="font-heading font-extrabold text-base text-slate-900">
              Top Cities Breakdown
            </h2>
            <div className="space-y-3 text-xs">
              {MOCK_POPULAR_CITIES.map((c, idx) => (
                <div key={c.city} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="font-bold text-slate-900">#{idx + 1} {c.city}, {c.country}</p>
                    <p className="text-[11px] text-slate-400">Rating: {c.rating} / 5.0</p>
                  </div>
                  <span className="font-extrabold font-heading text-ocean-700 text-sm">
                    {c.tripsCount} trips
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: POPULAR ACTIVITIES */}
      {activeTab === 'activities' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h2 className="font-heading font-extrabold text-base text-slate-900">
              Activity Category Distribution
            </h2>
            <PopularActivitiesChart />
          </div>

          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h2 className="font-heading font-extrabold text-base text-slate-900">
              Activity Insights & Summary
            </h2>
            <div className="space-y-3">
              {MOCK_POPULAR_ACTIVITIES.map((act) => (
                <div key={act.category} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{act.category}</span>
                    <span className="text-coral-600">{act.value}% of all activities</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${act.value * 2}%`, backgroundColor: act.fill }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: USER TRENDS & ANALYTICS */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-4">
            <h2 className="font-heading font-extrabold text-base text-slate-900">
              Monthly User Growth & Booking Trends Timeline
            </h2>
            <UserTrendsChart />
          </div>

          {/* Descriptive Text Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 space-y-3">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-ocean-700" />
              <span>Platform Executive Growth Summary</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traveler registrations surged by 38% during Q2 2026, driven by high demand for coastal Mediterranean itineraries and autumn Japanese shrine expeditions. Total trip bookings reached an all-time peak of 3,540 in August 2026.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
