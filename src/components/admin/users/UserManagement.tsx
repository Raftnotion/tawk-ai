import React from 'react';
import { Card } from '../../shared/Card';
import { FilterBar } from '../filters/FilterBar';
import { useSearch } from '../../../hooks/useSearch';
import { useFilter } from '../../../hooks/useFilter';
import { UsersList } from './UsersList';
import type { User } from '../../../types';

// Mock users data with proper typing
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2024-03-01'),
  },
];

export function UserManagement() {
  // Search functionality
  const { searchTerm, setSearchTerm, filteredItems: searchedUsers } = useSearch<User>(
    mockUsers,
    ['name', 'email']
  );

  // Status filter functionality
  const { filter: statusFilter, setFilter: setStatusFilter, filteredItems: finalUsers } = useFilter<User>(
    searchedUsers,
    'status'
  );

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">User Management</h2>
        </div>

        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <UsersList users={finalUsers} />
      </div>
    </Card>
  );
}