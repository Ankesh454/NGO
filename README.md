# 🌟 Samarpan Foundation — NGO Management & Donation Platform

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?logo=razorpay)](https://razorpay.com/)
[![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448C5?logo=cloudinary)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready, full-stack web platform built for **Samarpan Foundation**, a non-profit organization dedicated to Child Education, Senior Citizen Support, Community Welfare, and Animal Rescue Aid.

The platform provides a responsive, public-facing portal for donors, volunteers, and beneficiaries alongside a comprehensive **Admin Operations Dashboard** for managing donations, media, volunteer submissions, and inquiries.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
  - [Public Portal](#1-public-portal)
  - [Admin Management Portal](#2-admin-management-portal)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start & Installation](#-quick-start--installation)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Setup](#step-by-step-setup)
- [⚙️ Environment Variables](#️-environment-variables)
- [📡 API Documentation](#-api-documentation)
- [📱 Responsiveness & UI/UX](#-responsiveness--uiux)
- [🚢 Deployment Guide](#-deployment-guide)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

### 1. Public Portal
- **🏠 Hero & Mission Overview:** Dynamic hero section highlighting recent drives, impact statistics, and video/photo showcases.
- **📊 Real-time Impact Calculator:** Interactive impact estimation widget allowing potential donors to see exactly how their contributions provide meals, school supplies, or medical care.
- **💳 Secure Razorpay Donations:** Seamless checkout integration supporting UPI, Net Banking, Cards, and Wallets with real-time verification and receipt logging.
- **🙋 Volunteer & "Join Us" Portal:** Form for onboarding volunteers with customizable cause preferences, contact details, and interest areas.
- **📩 Interactive Contact Form:** Direct inquiries routed to the database with server-side validation and rate limiting.
- **🖼️ Auto-Optimized Media Gallery:** Responsive gallery powered by Cloudinary with on-the-fly WebP/AVIF compression and category filters.

### 2. Admin Management Portal
- **🔐 Secure Authentication:** JWT-based role authentication with HTTP-only cookie support and route-level protection (`/admin/*`).
- **📊 Operations Dashboard:** High-level metrics tracking total funds raised, verified donor counts, incoming queries, and applicant volume.
- **💳 Donations & Payments Hub:**
  - Real-time Razorpay payment verification tracking.
  - Quick cause filtering (`Education`, `Senior Care`, `Community Welfare`, `Animal Care`).
  - Search by donor name, email, or transaction ID.
  - Transaction detail modal with complete Razorpay payment reference.
  - Single-click **Export to CSV**.
- **📩 Contact Queries Manager:**
  - Status tracking pills (`All`, `Pending`, `Read`, `Replied`).
  - Search across names, messages, and emails.
  - CSV export for reporting.
- **👥 Volunteer Applications:**
  - Review applicant credentials, phone, availability, and background.
  - Change status (`Pending`, `Approved`, `Rejected`).
  - Applicant records export.
- **📸 Cloudinary Media Manager:**
  - Direct image and video uploads with automatic compression to next-gen formats (WebP, AVIF, H.264).
  - Media delete handling with database sync.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite 7
- **Routing:** React Router DOM v7 (Lazy-loaded code-splitting with suspense boundaries)
- **Styling:** Tailwind CSS v4 & Vanilla CSS
- **Animations:** Framer Motion & React CountUp
- **Icons:** React Icons (FontAwesome, Feather)
- **Notifications & Modals:** React Hot Toast, React Modal
- **SEO & Performance:** React Helmet Async, `@vercel/speed-insights`

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** MongoDB Atlas with Mongoose 9
- **Authentication:** JSON Web Tokens (JWT) & BcryptJS password hashing
- **Media Storage & CDN:** Cloudinary SDK with Multer & Streamifier
- **Payments:** Razorpay Node SDK
- **Security & Utilities:** Helmet, Express Rate Limit, Express Validator, Morgan, Nodemailer

---

## 📁 Project Structure

```text
NGO/
├── package.json              # Workspace root scripts (concurrently runner)
├── backend/                  # Express REST API Server
│   ├── src/
│   │   ├── config/           # Database (Mongoose) & Cloudinary configuration
│   │   ├── controllers/      # Route logic (Auth, Donations, Contact, Gallery, JoinUs)
│   │   ├── middlewares/      # Auth guard, file upload (Multer), error handlers
│   │   ├── models/           # Mongoose schemas (Admin, Donation, Contact, JoinUs, Gallery)
│   │   ├── routes/           # Express router definitions
│   │   ├── app.js            # Express app setup, CORS, Helmet, Rate limiter
│   │   └── server.js         # HTTP server entry point
│   ├── createAdmin.js        # CLI utility script to seed an administrator
│   └── package.json
│
└── frontend/                 # React + Vite Client Application
    ├── public/               # Static assets & favicon
    ├── src/
    │   ├── admin/            # Admin application module
    │   │   ├── components/   # AdminLayout, Responsive Sidebar, ProtectedRoute, Modal
    │   │   ├── pages/        # Dashboard, Donations, Contacts, JoinUs, Gallery, Login
    │   │   └── services/     # Axios client with interceptors for admin endpoints
    │   ├── components/       # Public site components (Home, Calculator, Gallery, Common)
    │   │   ├── common/       # Navbar, Footer, Loader, Buttons
    │   │   ├── gallery/      # GalleryPreview
    │   │   ├── Home/         # Hero, AboutPreview, ImpactCalculator, WorkPreview
    │   │   └── ourWork/      # ImpactStats
    │   ├── layouts/          # Main public layout with responsive navigation
    │   ├── pages/            # Public pages (Home, About, OurWork, Donate, Gallery, Contact, JoinUs)
    │   ├── routes/           # AppRoutes configuration with React.lazy
    │   ├── utils/            # CSV exporter, Cloudinary URL optimizer
    │   ├── index.css         # Tailwind CSS v4 configuration & theme breakpoints
    │   └── main.jsx          # React DOM root entry
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI (or local MongoDB instance)
- [Cloudinary](https://cloudinary.com/) account (for media storage)
- [Razorpay](https://razorpay.com/) test/live API keys

### Step-by-Step Setup

#### 1. Clone the repository
```bash
git clone https://github.com/Ankesh454/NGO.git
cd NGO
```

#### 2. Install dependencies
Install all root, backend, and frontend dependencies in one command:
```bash
npm run install:all
```
*(Or manually run `npm install` inside both `/backend` and `/frontend`)*

#### 3. Configure environment variables
Create `.env` files in both `backend` and `frontend` directories using the templates below.

#### 4. Seed an Admin Account
Initialize your administrator credentials in MongoDB:
```bash
npm run create-admin
```

#### 5. Run the platform locally
Run both backend and frontend concurrently with a single command from the project root:
```bash
npm run dev
```

The apps will be available at:
- 🌐 **Frontend:** `http://localhost:5173`
- 🛡️ **Admin Portal:** `http://localhost:5173/admin/login`
- ⚙️ **Backend API:** `http://localhost:5001`

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)

```env
# Server
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/samarpan_ngo?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Media Storage
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Seed Admin (Used by createAdmin.js)
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@samarpan.org
ADMIN_PASSWORD=YourSecurePassword123
```

### Frontend Configuration (`frontend/.env`)

```env
# Backend Base API Endpoint
VITE_API_BASE_URL=http://localhost:5001
```

---

## 📡 API Documentation

### Public Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/contact` | Submit a general contact inquiry |
| `POST` | `/api/join-us` | Submit a volunteer application |
| `GET`  | `/api/gallery` | Retrieve published gallery photos and videos |
| `POST` | `/api/donations/order` | Initialize a Razorpay payment order |
| `POST` | `/api/donations/verify` | Verify payment signature and record donation |

### Admin Endpoints *(Requires `Authorization: Bearer <token>`)*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate admin credentials and generate JWT |
| `GET`  | `/api/auth/me` | Fetch currently authenticated admin profile |
| `GET`  | `/api/donations` | List all verified donor transactions |
| `GET`  | `/api/contact` | Retrieve all incoming contact inquiries |
| `PATCH`| `/api/contact/:id` | Update contact inquiry status (`Replied`, `Read`) |
| `GET`  | `/api/join-us` | Retrieve volunteer membership applications |
| `PATCH`| `/api/join-us/:id` | Update volunteer status (`Approved`, `Rejected`) |
| `POST` | `/api/gallery/upload` | Upload media with auto-compression to Cloudinary |
| `DELETE`| `/api/gallery/:id` | Delete media asset from Cloudinary and database |

---

## 📱 Responsiveness & UI/UX

- **Mobile First & Adaptive Layouts:** Designed to scale effortlessly across standard viewports from 320px mobile devices to 4K displays.
- **Admin Mobile Drawer:** Persistent desktop sidebar gracefully collapses into an accessible, animated touch-friendly slide-over drawer on mobile screens (`< 1024px`).
- **Data Protection on Mobile:** Tables utilize horizontal scroll wrappers with sticky action controls to prevent content clipping.
- **Fluid Typography:** Headings and numerical statistics dynamically scale to prevent line breaks or layout breaking.
- **Glassmorphism & Micro-animations:** Polished cards with subtle borders, hover lift transitions, and active feedback states.

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel)
1. Push your repository to GitHub.
2. Link the repository to [Vercel](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Configure Build Command: `npm run build` and Output Directory: `dist`.
5. Add Environment Variable:
   - `VITE_API_BASE_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com`).
6. Deploy!

### Backend Deployment (Render / Railway)
1. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
2. Set **Root Directory** to `backend`.
3. Set Build Command: `npm install` and Start Command: `npm start`.
4. Add all environment variables from `backend/.env` (including `MONGO_URI`, `JWT_SECRET`, `CLOUD_*`, and `RAZORPAY_*`).
5. Ensure `FRONTEND_URL` points to your deployed Vercel domain.

---

## 🤝 Contributing

Contributions are welcomed to help empower non-profit operations!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ for <b>Samarpan Foundation</b> & communities in need.
</p>
