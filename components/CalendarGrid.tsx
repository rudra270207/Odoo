'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Plus } from 'lucide-react';
import { MOCK_CALENDAR_EVENTS, CalendarEventPill } from '@/lib/mockData';

interface CalendarGridProps {
  onSelectDate?: (dateStr: string, pills: CalendarEventPill[]) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ onSelectDate }) => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // 0-indexed: 7 = August

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in August 2026 (31 days, starts on Saturday -> 6 blank cells)
  const getDaysArray = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    // Padding before 1st day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    // Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  };

  const daysGrid = getDaysArray();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDateKey = (dayNum: number) => {
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
      
      {/* Calendar Header Navigation */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-ocean-700 text-white shadow-xs">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-lg text-slate-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Click any date cell to view scheduled trip itineraries
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCurrentYear(2026);
              setCurrentMonth(7);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50"
          >
            Today
          </button>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-100/60 text-center py-2 text-xs font-semibold text-slate-600">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Month Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr gap-px bg-slate-200">
        {daysGrid.map((day, idx) => {
          if (day === null) {
            return (
              <div key={`blank-${idx}`} className="bg-slate-50/50 min-h-[100px] p-2"></div>
            );
          }

          const dateKey = formatDateKey(day);
          const pills = MOCK_CALENDAR_EVENTS[dateKey] || [];
          const isToday = day === 22 && currentMonth === 7 && currentYear === 2026;

          return (
            <div
              key={dateKey}
              onClick={() => onSelectDate?.(dateKey, pills)}
              className={`bg-white min-h-[110px] p-2 transition-all hover:bg-ocean-50/30 cursor-pointer flex flex-col justify-between group ${
                isToday ? 'ring-2 ring-ocean-700 ring-inset bg-ocean-50/20' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    isToday ? 'bg-ocean-700 text-white' : 'text-slate-700 group-hover:text-ocean-700'
                  }`}
                >
                  {day}
                </span>

                {pills.length > 0 && (
                  <span className="text-[10px] font-semibold text-slate-400">
                    {pills.length} event{pills.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Multi-pill List inside Day Cell */}
              <div className="space-y-1 overflow-y-auto max-h-[75px] pr-0.5">
                {pills.map((pill) => (
                  <div
                    key={pill.id}
                    className={`px-2 py-1 rounded-lg text-[10px] font-semibold truncate shadow-xs flex items-center justify-between gap-1 ${pill.gradient}`}
                    title={`${pill.tripTitle} (${pill.destination})`}
                  >
                    <span className="truncate">{pill.tripTitle}</span>
                    <span className="text-[9px] opacity-90 hidden sm:inline">{pill.destination}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
