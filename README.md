# Bazaar Buddy – Real-Time Shop Status Tracker for Local Markets

## Table of Contents
1. [Problem Statement](#1-problem-statement)
2. [Solution Overview](#2-solution-overview)
3. [Use Cases](#3-use-cases)
4. [System Architecture](#4-system-architecture)
   - [4.1 Backend (FastAPI + SQLAlchemy)](#41-backend-fastapi--sqlalchemy)
   - [4.2 Frontend (React + Normal CSS)](#42-frontend-react--normal-css)
5. [Database Schema](#5-database-schema)
6. [API Endpoints](#6-api-endpoints)
7. [Frontend Features](#7-frontend-features)
8. [Deployment Guide](#8-deployment-guide)
9. [Troubleshooting & Common Errors](#9-troubleshooting--common-errors)
10. [Future Enhancements](#10-Future-Enhancement)
11. [Credits](#10-credits)

## 1. Problem Statement
Local markets often lack a real-time, digital way for customers to know which shops are open, their timings, and details. Shopkeepers also need a simple way to update their shop status and information without technical complexity.

## 2. Solution Overview
Bazaar Buddy is a full-stack web application that allows:

- **Customers** to view real-time status, timings, and details of local shops.
- **Shopkeepers** to manage their shop info, status, and timings via an admin dashboard.
- **Admins** to register/login securely and manage their own shops.

### Key Features:
- Real-time shop status (open/closed)
- Shop details: image, name, owner, location, timings, contact, Google Maps link
- Search by name/location
- Shopkeeper dashboard for CRUD operations
- Secure authentication (JWT + bcrypt)
- Image upload for shops
- Responsive, user-friendly UI (normal CSS, no frameworks)

## 3. Use Cases
- **Customer:** Wants to find open shops nearby, see timings, and get directions.
- **Shopkeeper:** Wants to update shop status (open/closed), timings, and details easily.
- **Admin:** Registers/logs in to manage their own shop(s).

## 4. System Architecture

### 4.1 Backend (FastAPI + SQLAlchemy)
- RESTful API with endpoints for authentication, shop CRUD, and user management
- JWT-based authentication
- Passwords hashed with bcrypt
- Image upload and static file serving
- Database: MySQL (dev) / PostgreSQL (prod, via Supabase)
- Hosted on Render.com

### 4.2 Frontend (React + Normal CSS)
- React app (Vite)
- Axios for API calls
- React Router for navigation and protected routes
- Context API for authentication state
- Responsive design with normal CSS (no frameworks)
- Hosted on Vercel

## 5. Database Schema

### Table: users
- id (int, PK)
- email (str, unique)
- hashed_password (str)

### Table: shops
- id (int, PK)
- name (str)
- owner_id (int, FK to users.id)
- owner_name (str)
- location (str)
- status (bool, open/closed)
- open_time (str)
- close_time (str)
- flexible_timing (bool)
- mobile_number (str, optional)
- google_maps_url (str, optional)
- last_updated (datetime)
- image_url (str, path to static image)

## 6. API Endpoints

- `POST   /auth/register`         : Register new shopkeeper
- `POST   /auth/login`            : Login, returns JWT
- `GET    /users/me`              : Get current user info
- `GET    /shops`                 : List/search shops (by name/location/status/owner)
- `POST   /shops`                 : Create shop (with image upload)
- `GET    /shops/{shop_id}`       : Get shop by ID
- `PUT    /shops/{shop_id}`       : Update shop (only by owner)
- `DELETE /shops/{shop_id}`       : Delete shop (only by owner)

## 7. Frontend Features

### Public Homepage:
- List all shops with image, name, owner, location, status, timings, contact, map link, last updated
- Search bar (by name/location)
- Responsive, mobile-first layout
- Color-coded status badges (open/closed)
- Lazy-load images, skeleton loaders

### Admin Panel (Shopkeeper Dashboard):
- Register/Login (JWT stored in localStorage)
- Dashboard: view/edit own shops, update status/timings/details, delete shop
- Image upload for shop
- Logout
- Protected routes (React Router)
- Conditional navbar links (Home, Register, Login, Dashboard, Logout)

### Styling:
- Only normal CSS (no frameworks)
- Mobile responsive, color theme, simple animations
- Square images on cards (`aspect-ratio: 1/1`)

## 8. Deployment Guide

### Backend (Render + Supabase):
- Push backend code to GitHub
- Create new Web Service on Render, connect repo
- Set environment variables:
  - `DATABASE_URL` (from Supabase, use PostgreSQL connection string)
  - `JWT_SECRET_KEY`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Ensure `static/images` directory exists
- Pin `bcrypt==3.2.0` in requirements.txt for compatibility
- Redeploy after changes

### Frontend (Vercel):
- Push frontend code to GitHub
- Import project in Vercel, deploy
- Set API base URL in code to Render backend URL
- Add `vercel.json` for SPA routing if needed

## 9. Troubleshooting & Common Errors

- **CORS errors:** Ensure CORSMiddleware is at the top of FastAPI app, with correct `allow_origins` (Vercel and localhost URLs)
- **502 Bad Gateway:** Check Render logs for dependency or DB errors; pin bcrypt version, check start command
- **Mixed Content (images):** Use HTTPS backend URLs in production, never localhost
- **Image not loading:** Ensure image is uploaded to deployed backend, and `image_url` is correct
- **Database connection errors:** Double-check Supabase credentials, URL-encode special characters in password
- **Tables not created:** Run `create_tables.py` with models imported
- **File persistence on Render:** Uploaded images may be lost after redeploy; use cloud storage for production

## 10. Future Enhancements
----------------------
- **Cloud Storage for Images:** Integrate AWS S3, Supabase Storage, or similar for persistent image uploads.
- **Shop Reviews & Ratings:** Allow customers to leave reviews and rate shops.
- **Real-Time Status Updates:** Use WebSockets for instant shop status changes across all clients.
- **Push Notifications:** Notify users when favorite shops open/close or update timings.
- **Shop Categories & Filters:** Add categories (e.g., grocery, pharmacy) and advanced filtering.
- **Analytics Dashboard:** Provide shopkeepers with analytics on visits, searches, and customer engagement.
- **Multi-language Support:** Add support for multiple languages for broader accessibility.
- **Progressive Web App (PWA):** Enable offline access and installable app features.
- **Admin Superuser Panel:** For platform-wide management, abuse reporting, and moderation.
- **Map View:** Show all shops on an interactive map for easier discovery.
- **User Accounts for Customers:** Allow customers to save favorite shops and preferences.
- **Accessibility Improvements:** Ensure WCAG compliance for users with disabilities.
- **SMS/WhatsApp Integration:** Allow shopkeepers to send updates to customers via messaging apps.

## 11. Credits
- **Project by:** Rahul Kumar Parida
- **Stack:** FastAPI, SQLAlchemy, PostgreSQL, React, Vite, Axios, Render, Vercel
- **Try My WebApp Bazzar Buddy:** https://bazzar-buddy-local-shops-status.vercel.app/

**Thank You**