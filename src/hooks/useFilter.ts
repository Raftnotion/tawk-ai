import { useState, useCallback } from 'react';

export function useFilter<T>(
  items: T[],
  filterField: keyof T
) {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = useCallback(() => {
    if (filter === 'all') return items;
    
    return items.filter(item => 
      String(item[filterField]).toLowerCase() === filter.toLowerCase()
    );
  }, [items, filter, filterField]);

  return {
    filter,
    setFilter,
    filteredItems: filteredItems(),
  };
}