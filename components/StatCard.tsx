'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  subtitle?: string;
  accentColor?: 'teal' | 'coral' | 'slate';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
  accentColor = 'teal',
}) => {
  const borderAccent =
    accentColor === 'coral'
      ? 'border-l-4 border-l-coral-500'
      : accentColor === 'slate'
      ? 'border-l-4 border-l-slate-700'
      : 'border-l-4 border-l-ocean-700';

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 transition-all duration-200 hover:shadow-soft-lg ${borderAccent}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="font-heading font-extrabold text-2xl text-slate-900">
          {value}
        </h3>

        {change && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-[11px] text-slate-400 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
