import React from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

export const publicRoutes = [
  <Route key="login" path="login" element={<LoginPage />} />,
  <Route key="register" path="register" element={<RegisterPage />} />,
];