import React from 'react';

export default function StatusBadge({ status }) {
  return (
    <span className={status ? "open-badge" : "closed-badge"}>
      {status ? "Open" : "Closed"}
      <style>{`
        .open-badge {
          background: #d1fae5;
          color: #065f46;
          border-radius: 4px;
          padding: 2px 8px;
          font-weight: bold;
          font-size: 0.9em;
          margin-left: 8px;
        }
        .closed-badge {
          background: #fee2e2;
          color: #991b1b;
          border-radius: 4px;
          padding: 2px 8px;
          font-weight: bold;
          font-size: 0.9em;
          margin-left: 8px;
        }
      `}</style>
    </span>
  );
}