import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShop, updateShop } from '../api/shop';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ShopEdit() {
  const { id } = useParams();
  const { user } = useAuth();
  const [shop, setShop] = useState(null);
  const [form, setForm] = useState({
    name: '',
    owner_name: '',
    location: '',
    open_time: '',
    close_time: '',
    flexible_timing: false,
    mobile_number: '',
    google_maps_url: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getShop(id)
      .then(data => {
        setShop(data);
        setForm({
          name: data.name || '',
          owner_name: data.owner_name || '',
          location: data.location || '',
          open_time: data.open_time || '',
          close_time: data.close_time || '',
          flexible_timing: data.flexible_timing || false,
          mobile_number: data.mobile_number || '',
          google_maps_url: data.google_maps_url || '',
          image_url: data.image_url || ''
        });
      })
      .catch(() => setError('Shop not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await updateShop(id, form);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to update shop.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  if (!shop) return null;

  // Only allow editing if the logged-in user is the owner
  if (user?.id !== shop.owner_id) {
    return <div>You are not authorized to edit this shop.</div>;
  }

  return (
    <div className="p-4" style={{ maxWidth: 500, margin: '0 auto' }}>
      <h1 className="mb-4">Edit Shop</h1>
      <form onSubmit={handleSubmit} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1em', background: '#fff', padding: '1em', borderRadius: 8 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Shop Name" required />
        <input name="owner_name" value={form.owner_name} onChange={handleChange} placeholder="Shopkeeper Name" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <div style={{ display: 'flex', gap: '1em' }}>
          <input name="open_time" value={form.open_time} onChange={handleChange} placeholder="Opening Time (e.g. 8:00 AM)" required />
          <input name="close_time" value={form.close_time} onChange={handleChange} placeholder="Closing Time (e.g. 8:00 PM)" required />
        </div>
        <label>
          <input type="checkbox" name="flexible_timing" checked={form.flexible_timing} onChange={handleChange} />
          Flexible Timing
        </label>
        <input name="mobile_number" value={form.mobile_number} onChange={handleChange} placeholder="Mobile Number" />
        <input name="google_maps_url" value={form.google_maps_url} onChange={handleChange} placeholder="Google Maps URL" />
        {error && <div className="text-red text-sm">{error}</div>}
        <button type="submit" className="bg-blue rounded p-4" style={{ border: 'none', fontWeight: 'bold' }}>Update Shop</button>
      </form>
    </div>
  );
}