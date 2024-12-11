import axios from 'axios';
import { User } from '../../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

// Mock users for demo
const MOCK_USERS = {
  admin: {
    id: 'admin-1',
    email: 'admin@tawkai.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    createdAt: new Date('2024-01-01'),
    subscription: {
      plan: 'enterprise' as const,
      status: 'active' as const,
      expiresAt: new Date('2025-01-01'),
    },
  },
  user: {
    id: 'user-1',
    email: 'user@example.com',
    password: 'user123',
    name: 'Demo User',
    role: 'user' as const,
    createdAt: new Date('2024-02-01'),
    subscription: {
      plan: 'pro' as const,
      status: 'active' as const,
      expiresAt: new Date('2024-12-31'),
    },
  },
};

export class AuthService {
  private static TOKEN_KEY = 'auth_token';
  private static USER_KEY = 'auth_user';

  static async login(credentials: LoginCredentials): Promise<User> {
    // Mock authentication
    const mockUser = Object.values(MOCK_USERS).find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    if (!mockUser) {
      throw new Error('Invalid email or password');
    }

    const { password, ...user } = mockUser;
    const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));

    this.setToken(token);
    this.setUser(user);

    return user;
  }

  static async register(data: RegisterData): Promise<User> {
    // Prevent registration with existing emails
    if (Object.values(MOCK_USERS).some(user => user.email === data.email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const user: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      role: 'user',
      createdAt: new Date(),
      subscription: {
        plan: 'free',
        status: 'active',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
      },
    };

    const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));

    this.setToken(token);
    this.setUser(user);

    return user;
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      const user = JSON.parse(userStr);
      // Convert date strings back to Date objects
      user.createdAt = new Date(user.createdAt);
      if (user.subscription) {
        user.subscription.expiresAt = new Date(user.subscription.expiresAt);
      }
      return user;
    } catch {
      return null;
    }
  }

  private static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }
}