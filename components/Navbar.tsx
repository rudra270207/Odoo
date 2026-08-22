'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Shield,
  Search,
  Plus,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { MOCK_USER } from '@/lib/mockData';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hide Navbar completely on auth screens for a clean standalone login/register experience
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', href: '/trips', icon: Briefcase },
    { name: 'Explore', href: '/search', icon: Compass },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  const isActive = (path: string) => {
    return pathname === path || (path !== '/dashboard' && pathname.startsWith(path));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ocean-700 via-ocean-500 to-coral-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-ocean-700 transition-colors whitespace-nowrap">
                  Globe<span className="text-coral-500">Trotter</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1 whitespace-nowrap">
                  Travel Planner
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Icons & Single-Line No Wrap */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                      active
                        ? 'bg-ocean-50 text-ocean-700 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 shrink-0 ${active ? 'text-ocean-700' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Middle: Global Search Input */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search trips, cities, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs bg-slate-100/90 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-700 focus:bg-white transition-all"
            />
            <kbd className="hidden lg:inline-block absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200">
              ⌘K
            </kbd>
          </div>

          {/* Right: Actions, Notifications & Avatar Dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Plan a Trip CTA Button with Fixed Single-Line Layout */}
            <Link
              href="/trips/new"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow transition-all duration-200 hover:shadow-lg whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Plan a Trip</span>
            </Link>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coral-500 ring-2 ring-white"></span>
            </button>

            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ocean-700 to-coral-500 p-0.5 shadow-sm shrink-0">
                  <img
                    src={MOCK_USER.avatar}
                    alt={MOCK_USER.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{MOCK_USER.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{MOCK_USER.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-ocean-50 text-ocean-700 rounded-full">
                      {MOCK_USER.role} Member
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-ocean-700"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile & Preferences</span>
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-ocean-700"
                    >
                      <Shield className="w-4 h-4 text-slate-400" />
                      <span>Admin Analytics</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <Link
                      href="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search trips, destinations..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl"
            />
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap ${
                    active
                      ? 'bg-ocean-50 text-ocean-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4 text-ocean-700" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/trips/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-coral-500 text-white font-semibold text-xs text-center shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Plan a New Trip</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
