import React from 'react';

const API_BASE_URL = "https://bazzar-buddy-local-shops-status.onrender.com"; // Change if your backend is hosted elsewhere

export default function ShopCard({ shop }) {
  // Format opening/closing time
  const timing = shop.open_time && shop.close_time
    ? `${shop.open_time} to ${shop.close_time}`
    : shop.open_time || 'N/A';

  return (
    <div className="shop-card fade-in">
      <style>{`
        .shop-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          padding: 1.2em;
          margin-bottom: 1.5em;
          display: flex;
          flex-direction: column;
          gap: 0.7em;
          animation: fadeIn 0.7s ease;
          transition: box-shadow 0.2s;
        }
        .shop-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.16);
        }
        .shop-image {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 0.7em;
          background: #f3f4f6;
        }
        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 0.95em;
          background: #d1fae5;
          color: #065f46;
        }
        .status-badge.closed {
          background: #fee2e2;
          color: #991b1b;
        }
        .shop-info {
          display: flex;
          flex-direction: column;
          gap: 0.2em;
        }
        .shop-label {
          font-weight: 500;
          color: #555;
        }
        .shop-value {
          font-weight: 400;
          color: #222;
        }
        .shop-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9em;
          color: #888;
        }
        @media (max-width: 600px) {
          .shop-card {
            padding: 0.7em;
            font-size: 14px;
          }
          .shop-image {
            height: auto;
          }
        }
      `}</style>
      {shop.image_url && (
        <img
          src={shop.image_url.startsWith('http') ? shop.image_url : API_BASE_URL + shop.image_url}
          alt={shop.name}
          className="shop-image"
        />
      )}
      <div className="shop-header">
        <h2 style={{ margin: 0 }}>{shop.name}</h2>
        <span className={`status-badge${shop.status ? '' : ' closed'}`}>
          {shop.status ? 'Open' : 'Closed'}
        </span>
      </div>
      <div className="shop-info">
        <div>
          <span className="shop-label">Shopkeeper:</span>{' '}
          <span className="shop-value">{shop.owner_name}</span>
        </div>
        <div>
          <span className="shop-label">Location:</span>{' '}
          <span className="shop-value">{shop.location}</span>
        </div>
        <div>
          <span className="shop-label">Mobile:</span>{' '}
          <span className="shop-value">{shop.mobile_number || 'N/A'}</span>
        </div>
        <div>
          <span className="shop-label">Opening Time:</span>{' '}
          <span className="shop-value">
            {timing} {shop.flexible_timing ? '(Flexible)' : '(Fixed)'}
          </span>
        </div>
      </div>
      <div className="shop-footer">
        <span>Last updated: {new Date(shop.last_updated).toLocaleString()}</span>
        {shop.google_maps_url && (
          <a href={shop.google_maps_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Map
          </a>
        )}
      </div>
    </div>
  );
}