import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import type { LoginCredentials } from '../types';

interface UseLoginFormProps {
  isAdminLogin: boolean;
}

export function useLoginForm({ isAdminLogin }: UseLoginFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(credentials);

      // For admin login page
      if (isAdminLogin) {
        if (user.role !== 'admin') {
          setError("You don't have permission to access the admin area.");
          return;
        }
        navigate('/admin', { replace: true });
      } 
      // For regular login page
      else {
        if (user.role === 'admin') {
          setError("Please use the admin login page.");
          return;
        }
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}