import { useState, useCallback } from 'react';

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  filterFn?: (item: T) => boolean
) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useCallback(() => {
    return items.filter(item => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchFields.some(field => {
          const value = String(item[field]).toLowerCase();
          return value.includes(searchLower);
        });
        if (!matchesSearch) return false;
      }

      // Apply additional filter if provided
      if (filterFn) {
        return filterFn(item);
      }

      return true;
    });
  }, [items, searchTerm, searchFields, filterFn]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredItems(),
  };
}