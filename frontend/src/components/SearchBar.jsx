import React from 'react';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <style>{`
        .search-bar {
          width: 100%;
          max-width: 400px;
          margin-bottom: 1em;
        }
        .search-input {
          width: 100%;
          padding: 0.8em 1em;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 1em;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: border 0.2s;
        }
        .search-input:focus {
          border: 1.5px solid #2563eb;
          outline: none;
        }
      `}</style>
    </div>
  );
}