'use client';

import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Layers, LayoutGrid, List, X, Check } from 'lucide-react';

interface ToolBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedGroup?: string;
  onGroupChange?: (group: string) => void;
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
  selectedSort?: string;
  onSortChange?: (sort: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  groupOptions?: string[];
  filterOptions?: string[];
  sortOptions?: string[];
  placeholder?: string;
}

export const ToolBar: React.FC<ToolBarProps> = ({
  searchQuery = '',
  onSearchChange,
  selectedGroup = 'All Status',
  onGroupChange,
  selectedFilter = 'All Regions',
  onFilterChange,
  selectedSort = 'Date (Newest)',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  groupOptions = ['All Status', 'Ongoing', 'Upcoming', 'Completed'],
  filterOptions = ['All Regions', 'Europe', 'Asia', 'South America', 'Middle East'],
  sortOptions = ['Date (Newest)', 'Date (Oldest)', 'Title (A-Z)', 'Budget (High to Low)', 'Popularity'],
  placeholder = 'Search items...',
}) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [groupMenuOpen, setGroupMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const hasActiveFilters = selectedGroup !== 'All Status' || selectedFilter !== 'All Regions' || searchQuery !== '';

  const clearAllFilters = () => {
    onSearchChange?.('');
    onGroupChange?.('All Status');
    onFilterChange?.('All Regions');
    onSortChange?.('Date (Newest)');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm mb-6 space-y-3">
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-700 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns Group */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Group By Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setGroupMenuOpen(!groupMenuOpen);
                setFilterMenuOpen(false);
                setSortMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl border transition-all ${
                selectedGroup !== 'All Status'
                  ? 'bg-ocean-50 text-ocean-700 border-ocean-200 font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-ocean-700" />
              <span>Group: {selectedGroup}</span>
            </button>

            {groupMenuOpen && (
              <div
                className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 animate-in fade-in duration-150"
                onMouseLeave={() => setGroupMenuOpen(false)}
              >
                {groupOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onGroupChange?.(option);
                      setGroupMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-ocean-50 hover:text-ocean-700 flex items-center justify-between"
                  >
                    <span>{option}</span>
                    {selectedGroup === option && <Check className="w-3.5 h-3.5 text-ocean-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setFilterMenuOpen(!filterMenuOpen);
                setGroupMenuOpen(false);
                setSortMenuOpen(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl border transition-all ${
                selectedFilter !== 'All Regions'
                  ? 'bg-coral-50 text-coral-600 border-coral-200 font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-coral-500" />
              <span>Filter: {selectedFilter}</span>
            </button>

            {filterMenuOpen && (
              <div
                className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 animate-in fade-in duration-150"
                onMouseLeave={() => setFilterMenuOpen(false)}
              >
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onFilterChange?.(option);
                      setFilterMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-coral-50 hover:text-coral-600 flex items-center justify-between"
                  >
                    <span>{option}</span>
                    {selectedFilter === option && <Check className="w-3.5 h-3.5 text-coral-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSortMenuOpen(!sortMenuOpen);
                setGroupMenuOpen(false);
                setFilterMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-xl bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>Sort: {selectedSort}</span>
            </button>

            {sortMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 animate-in fade-in duration-150"
                onMouseLeave={() => setSortMenuOpen(false)}
              >
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onSortChange?.(option);
                      setSortMenuOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                  >
                    <span>{option}</span>
                    {selectedSort === option && <Check className="w-3.5 h-3.5 text-ocean-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Mode Toggle (Optional Grid/List) */}
          {onViewModeChange && (
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 ml-auto sm:ml-0">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-ocean-700 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-ocean-700 shadow-2xs' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 text-[11px] font-medium">Active filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
              Search: "{searchQuery}"
              <button onClick={() => onSearchChange?.('')} className="hover:text-slate-900"><X className="w-3 h-3" /></button>
            </span>
          )}

          {selectedGroup !== 'All Status' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ocean-50 text-ocean-700 font-medium">
              Group: {selectedGroup}
              <button onClick={() => onGroupChange?.('All Status')} className="hover:text-ocean-900"><X className="w-3 h-3" /></button>
            </span>
          )}

          {selectedFilter !== 'All Regions' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-coral-50 text-coral-600 font-medium">
              Region: {selectedFilter}
              <button onClick={() => onFilterChange?.('All Regions')} className="hover:text-coral-800"><X className="w-3 h-3" /></button>
            </span>
          )}

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-[11px] text-slate-500 hover:text-coral-600 underline font-medium ml-auto"
          >
            Clear all
          </button>
        </div>
      )}

    </div>
  );
};
