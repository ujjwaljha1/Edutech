// client/src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import axios from 'axios';
// client/src/hooks/useAuth.js
import config from '../Config'

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${config.backendUrl}/api/auth/verifyToken`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('isCEO');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', userData.isAdmin);
    localStorage.setItem('isCEO', userData.isCEO);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isCEO');
    setUser(null);
  };

  return { user, loading, login, logout };
};