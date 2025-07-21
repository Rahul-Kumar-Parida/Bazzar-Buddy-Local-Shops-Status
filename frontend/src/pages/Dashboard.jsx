import React, { useEffect, useState } from 'react';
import { getShops, deleteShop, createShop, updateShop } from '../api/shop';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const { user } = useAuth();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    owner_name: '',
    location: '',
    open_time: '',
    flexible_timing: false,
    mobile_number: '',
    google_maps_url: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      getShops({ owner_id: user.id })
        .then(setShops)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this shop?')) {
      await deleteShop(id);
      setShops(shops.filter(s => s.id !== id));
    }
  };

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
    }));
  };

  const handleToggleStatus = async (shop) => {
    const updated = await updateShop(shop.id, { status: !shop.status });
    setShops(shops => shops.map(s => s.id === shop.id ? updated : s));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('owner_name', form.owner_name);
      formData.append('location', form.location);
      formData.append('open_time', form.open_time);
      formData.append('flexible_timing', form.flexible_timing);
      formData.append('mobile_number', form.mobile_number);
      formData.append('google_maps_url', form.google_maps_url);
      if (form.image) formData.append('image', form.image);

      const newShop = await createShop(formData, true);
      setShops([...shops, newShop]);
      setForm({
        name: '',
        owner_name: '',
        location: '',
        open_time: '',
        flexible_timing: false,
        mobile_number: '',
        google_maps_url: '',
        image: null
      });
    } catch (err) {
      setError('Failed to create shop.');
    }
  };

  if (!user) return <div>Please log in.</div>;

  return (
    <div>
      <form onSubmit={handleSubmit} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1em', marginBottom: '2em', background: '#fff', padding: '1em', borderRadius: 8 }}>
        <h2>Add New Shop</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Shop Name" required />
        <input name="owner_name" value={form.owner_name} onChange={handleChange} placeholder="Shopkeeper Name" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <input name="open_time" value={form.open_time} onChange={handleChange} placeholder="Opening Time" />
        <label>
          <input type="checkbox" name="flexible_timing" checked={form.flexible_timing} onChange={handleChange} />
          Flexible Timing
        </label>
        <input name="mobile_number" value={form.mobile_number} onChange={handleChange} placeholder="Mobile Number" />
        <input name="google_maps_url" value={form.google_maps_url} onChange={handleChange} placeholder="Google Maps URL" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        {error && <div className="text-red text-sm">{error}</div>}
        <button type="submit" className="bg-green rounded p-4" style={{ border: 'none', fontWeight: 'bold' }}>Save Shop</button>
      </form>
      {loading ? <LoadingSpinner /> : (
        <div>
          {shops.length === 0 ? (
            <div className="text-center text-sm" style={{ color: '#888' }}>No shops found.</div>
          ) : (
            shops.map(shop => (
              <div key={shop.id} className="shop-card fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold' }}>{shop.name}</span>
                  <div style={{ display: 'flex', gap: '1em' }}>
                    <button onClick={() => handleToggleStatus(shop)} className={shop.status ? "bg-green" : "bg-red"} style={{ border: 'none', fontWeight: 'bold', borderRadius: 8, padding: '0.5em 1em' }}>
                      {shop.status ? "Mark Closed" : "Mark Open"}
                    </button>
                    <button onClick={() => navigate(`/shop/${shop.id}/edit`)} className="bg-blue rounded p-4" style={{ border: 'none', fontWeight: 'bold' }}>Edit</button>
                    <button onClick={() => handleDelete(shop.id)} className="bg-red rounded p-4" style={{ border: 'none', fontWeight: 'bold' }}>Delete</button>
                  </div>
                </div>
                <div className="text-sm">Status: {shop.status ? 'Open' : 'Closed'}</div>
                <div className="text-xs" style={{ color: '#888' }}>Last updated: {new Date(shop.last_updated).toLocaleString()}</div>
                {shop.image_url && <img src={shop.image_url} alt={shop.name} className="shop-image" />}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}