import React from 'react';

export default function NotFound() {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>404</h1>
      <p style={{ fontSize: '1.2em' }}>Page not found</p>
    </div>
  );
}