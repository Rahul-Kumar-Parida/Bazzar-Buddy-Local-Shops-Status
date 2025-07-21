import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <style>{`
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2em 0;
        }
        .loading-spinner .spinner {
          border: 4px solid #e5e7eb;
          border-top: 4px solid #2563eb;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
            <div className="spinner"></div>
        </div>
    );
}