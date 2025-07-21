import React, { useState } from 'react';
import { login as loginApi, getMe } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { access_token } = await loginApi(email, password);
      localStorage.setItem('token', access_token);
      const user = await getMe();
      login(user, access_token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-4" style={{ maxWidth: 400, margin: '0 auto' }}>
      <h1 className="mb-4">Shopkeeper Login</h1>
      <form onSubmit={handleSubmit} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="p-4 rounded shadow" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="p-4 rounded shadow" />
        {error && <div className="text-red text-sm">{error}</div>}
        <button type="submit" className="bg-blue rounded p-4" style={{ border: 'none', fontWeight: 'bold' }}>Login</button>
      </form>
    </div>
  );
}