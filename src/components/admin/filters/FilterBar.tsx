import React from 'react';
import { SearchBar } from '../search/SearchBar';
import { StatusFilter } from './StatusFilter';

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function FilterBar({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search by name, email..."
        />
      </div>
      <div className="w-full sm:w-48">
        <StatusFilter
          value={statusFilter}
          onChange={onStatusFilterChange}
        />
      </div>
    </div>
  );
}