import React, { useState } from 'react';
import { register as registerApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerApi(email, password);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Registration failed. Email may already be in use.');
    }
  };

  return (
    <div className="p-4" style={{ maxWidth: 400, margin: '0 auto' }}>
      <h1 className="mb-4">Shopkeeper Register</h1>
      <form onSubmit={handleSubmit} className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="p-4 rounded shadow" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="p-4 rounded shadow" />
        {error && <div className="text-red text-sm">{error}</div>}
        {success && <div className="text-green text-sm">{success}</div>}
        <button type="submit" className="bg-green rounded p-4" style={{ border: 'none', fontWeight: 'bold' }}>Register</button>
      </form>
    </div>
  );
}