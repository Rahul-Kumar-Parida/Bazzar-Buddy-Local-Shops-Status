import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    if (loading) return null;

    return (
        <nav className="navbar">
            <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #2563eb;
          color: #fff;
          padding: 0.5em 1.5em;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5em;
        }
        .navbar-title {
          font-size: 1.3em;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .navbar-links {
          display: flex;
          gap: 1.2em;
          align-items: center;
        }
        .navbar-link {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .navbar-link:hover {
          color: #a5b4fc;
        }
        .navbar-btn {
          background: none;
          border: none;
          color: #fff;
          font-weight: 500;
          cursor: pointer;
          font-size: 1em;
        }
        .navbar-btn:hover {
          color: #a5b4fc;
        }
        @media (max-width: 700px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5em;
            padding: 0.7em 1em;
          }
          .navbar-links {
            gap: 0.7em;
          }
        }
      `}</style>
            <div className="navbar-logo">
                {/* Inline React SVG logo */}
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: 'block' }}
                >
                    <circle cx="18" cy="18" r="16" fill="#222" />
                    <g>
                        <ellipse cx="18" cy="18" rx="10" ry="4.5" stroke="#61dafb" strokeWidth="2" fill="none" />
                        <ellipse cx="18" cy="18" rx="4.5" ry="10" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(60 18 18)" />
                        <ellipse cx="18" cy="18" rx="4.5" ry="10" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(120 18 18)" />
                        <circle cx="18" cy="18" r="2.5" fill="#61dafb" />
                    </g>
                </svg>
                <span className="navbar-title">Bazaar Buddy</span>
            </div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                {!user && <Link to="/register" className="navbar-link">Admin Register</Link>}
                {!user && <Link to="/login" className="navbar-link">Admin Login</Link>}
                {user && <Link to="/dashboard" className="navbar-link">Admin Dashboard</Link>}
                {user && <button onClick={handleLogout} className="navbar-btn">Logout</button>}
            </div>
        </nav>
    );
}