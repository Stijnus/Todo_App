import React from 'react';
import { Filter, Search } from 'lucide-react';

interface FilterBarProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function FilterBar({ filter, onFilterChange, searchTerm, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
            transition-all duration-200 placeholder-gray-400
          "
        />
      </div>
      
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="
            pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
            transition-all duration-200 appearance-none bg-white
          "
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
    </div>
  );
}
