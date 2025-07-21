import api from './axios';

export const getShops = async (params) => {
  const res = await api.get('/shops', { params });
  return res.data;
};

export const getShop = async (id) => {
  const res = await api.get(`/shops/${id}`);
  return res.data;
};

export const createShop = async (shop, isFormData = false) => {
  const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  const res = await api.post('/shops', shop, config);
  return res.data;
};

export const updateShop = async (id, shop) => {
  const res = await api.put(`/shops/${id}`, shop);
  return res.data;
};

export const deleteShop = async (id) => {
  const res = await api.delete(`/shops/${id}`);
  return res.data;
};