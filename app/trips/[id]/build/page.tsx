'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Plus, Save, ArrowRight, DollarSign, Calendar, MapPin, CreditCard, Layers } from 'lucide-react';
import { SectionCard } from '@/components/SectionCard';
import { MOCK_TRIPS, TripSection } from '@/lib/mockData';
import { addTripSectionDb } from '@/lib/services';

export default function TripBuildPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const trip = MOCK_TRIPS[0];

  const [sections, setSections] = useState<TripSection[]>(
    trip.sections || [
      {
        id: 'sec-1',
        title: 'Arrival & Naples Pizza Tasting',
        description: 'Flight check-in, ferry transfer to Sorrento & evening street food trail.',
        startDate: '2026-08-20',
        endDate: '2026-08-22',
        budget: 950,
        activitiesCount: 5,
      },
      {
        id: 'sec-2',
        title: 'Path of the Gods Hike & Cliffside Dinners',
        description: 'Guided trail walk from Bomerano to Nocelle with local wine tasting.',
        startDate: '2026-08-23',
        endDate: '2026-08-25',
        budget: 1250,
        activitiesCount: 6,
      },
      {
        id: 'sec-3',
        title: 'Capri Private Boat Charter & Grottos',
        description: 'Full day excursion to Blue Grotto & Faraglioni rocks.',
        startDate: '2026-08-26',
        endDate: '2026-08-28',
        budget: 1000,
        activitiesCount: 4,
      },
    ]
  );

  const [savedNotice, setSavedNotice] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const totalAllocatedBudget = sections.reduce((acc, curr) => acc + (curr.budget || 0), 0);

  const handleUpdateSection = (updated: TripSection) => {
    setSections(sections.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleAddSection = async () => {
    const nextNum = sections.length + 1;
    const newSec: TripSection = {
      id: `sec-${Date.now()}`,
      title: `Section ${nextNum}: Coastal Excursion & Sightseeing`,
      description: 'Customize activities, sightseeing schedules and transit details.',
      startDate: '2026-08-29',
      endDate: '2026-08-31',
      budget: 800,
      activitiesCount: 3,
    };

    setSections([...sections, newSec]);

    await addTripSectionDb({
      tripId: params.id || 'trip-1',
      title: newSec.title,
      description: newSec.description,
      budget: newSec.budget,
    });
  };

  // Stripe Checkout Session Trigger
  const handleStripeCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: params.id || 'trip-1',
          tripName: trip.title,
          amount: 150,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Stripe test mode redirect simulated!');
        setCheckoutLoading(false);
      }
    } catch (err) {
      alert('Redirecting to test checkout flow...');
      setCheckoutLoading(false);
    }
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      router.push(`/trips/${params.id || 'trip-1'}/itinerary`);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-ocean-700 font-semibold">
            <MapPin className="w-4 h-4 text-coral-500" />
            <span>{trip.destination} • {trip.country}</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900">
            {trip.title}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Organize itinerary sections, allocate budget, and secure your trip deposit
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right min-w-[180px]">
            <span className="text-[10px] font-semibold text-slate-500 block uppercase">
              Allocated Budget
            </span>
            <span className="font-heading font-extrabold text-xl text-coral-600">
              ${totalAllocatedBudget.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 block font-medium">
              Target: ${trip.budget.toLocaleString()}
            </span>
          </div>

          {/* Stripe Test Mode Trigger CTA */}
          <button
            type="button"
            onClick={handleStripeCheckout}
            disabled={checkoutLoading}
            className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <CreditCard className="w-4 h-4 text-coral-500" />
            <span>{checkoutLoading ? 'Redirecting to Stripe...' : 'Pay $150 Deposit (Stripe)'}</span>
          </button>
        </div>
      </div>

      {/* Sections List Banner */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-ocean-700" />
          <span>Itinerary Section Blocks ({sections.length})</span>
        </h2>

        <button
          type="button"
          onClick={handleAddSection}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ocean-50 text-ocean-700 hover:bg-ocean-100 font-bold text-xs border border-ocean-200 transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Another Section</span>
        </button>
      </div>

      {/* Stacked Numbered Section Cards */}
      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <SectionCard
            key={sec.id}
            section={sec}
            index={idx}
            onUpdate={handleUpdateSection}
            onDelete={handleDeleteSection}
          />
        ))}
      </div>

      {/* Bottom Action bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-dashed border-ocean-700 text-ocean-700 hover:bg-ocean-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Another Section</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleStripeCheckout}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-coral-500" />
            <span>Pay Deposit</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs shadow-coral-glow flex items-center gap-2 transition-all hover:shadow-lg"
          >
            {savedNotice ? (
              <span>Saving Plan...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Preview Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
