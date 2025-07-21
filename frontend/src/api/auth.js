import api from './axios';

export const login = async (email, password) => {
  const res = await api.post('/auth/login', new URLSearchParams({ username: email, password }));
  return res.data;
};

export const register = async (email, password) => {
  const res = await api.post('/auth/register', { email, password });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/users/me');
  return res.data;
};