'use client';

import React, { useState } from 'react';
import { X, Check, Compass, Plus, ArrowRight } from 'lucide-react';
import { SuggestionItem, MOCK_TRIPS } from '@/lib/mockData';

interface AddToTripModalProps {
  item: SuggestionItem | null;
  onClose: () => void;
  onSuccess: (tripTitle: string, itemTitle: string) => void;
}

export const AddToTripModal: React.FC<AddToTripModalProps> = ({ item, onClose, onSuccess }) => {
  const [selectedTripId, setSelectedTripId] = useState(MOCK_TRIPS[0].id);
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    const trip = MOCK_TRIPS.find((t) => t.id === selectedTripId);
    setAdded(true);
    setTimeout(() => {
      onSuccess(trip?.title || 'Selected Trip', item.title);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ocean-50 text-ocean-700">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Add to Itinerary
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Choose a trip to append this activity
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Item Preview */}
        <div className={`p-4 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white space-y-1 shadow-sm`}>
          <span className="px-2 py-0.5 rounded bg-black/30 text-[10px] font-semibold uppercase">
            {item.category}
          </span>
          <h4 className="font-heading font-bold text-sm leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-white/90 font-medium">
            {item.location} • ${item.price} per person
          </p>
        </div>

        {/* Select Trip Radio List */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Select Your Target Trip:
          </label>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {MOCK_TRIPS.map((trip) => (
              <label
                key={trip.id}
                onClick={() => setSelectedTripId(trip.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedTripId === trip.id
                    ? 'border-ocean-700 bg-ocean-50/60 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">{trip.title}</p>
                  <p className="text-[11px] text-slate-500">{trip.destination} • {trip.startDate}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedTripId === trip.id ? 'border-ocean-700 bg-ocean-700 text-white' : 'border-slate-300'
                }`}>
                  {selectedTripId === trip.id && <Check className="w-3 h-3" />}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className="px-5 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-coral-glow flex items-center gap-1.5 transition-all"
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Trip!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Confirm & Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
