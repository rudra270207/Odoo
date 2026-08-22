'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { MOCK_USER } from '@/lib/mockData';

export default function LoginPage() {
  const router = Router();
  const [email, setEmail] = useState('alex.rivera@globetrotter.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cream-50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Top Logo & Card Wrapper */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg p-8 sm:p-10 space-y-6 relative overflow-hidden">
          
          {/* Decorative Teal Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-ocean-700 via-ocean-500 to-coral-500"></div>

          {/* Centered Avatar Logo */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-ocean-700 via-ocean-500 to-coral-500 shadow-lg text-white mx-auto">
              <Compass className="w-9 h-9 animate-pulse" />
            </div>
            
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-slate-900">
                Welcome Back
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Log in to access your travel itineraries & saved trips
              </p>
            </div>
          </div>

          {/* User Preview Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <img
              src={MOCK_USER.avatar}
              alt={MOCK_USER.name}
              className="w-10 h-10 rounded-full object-cover border border-ocean-200"
            />
            <div className="flex-1 text-left text-xs">
              <p className="font-bold text-slate-900">{MOCK_USER.name}</p>
              <p className="text-slate-500 truncate">{MOCK_USER.email}</p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-ocean-50 text-ocean-700">
              Demo Active
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700 transition-all"
                  placeholder="alex.rivera@globetrotter.io"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean-700 transition-all"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-ocean-700 focus:ring-ocean-700 border-slate-300"
                />
                <span>Remember me</span>
              </label>

              <a href="#" className="font-semibold text-coral-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow flex items-center justify-center gap-2 transition-all hover:shadow-lg"
            >
              {loading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <span>Sign In to GlobeTrotter</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Signup Footer Link */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            Don’t have an account yet?{' '}
            <Link href="/register" className="font-bold text-ocean-700 hover:underline">
              Register now
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
