# GlobeTrotter ✈️

**Empowering Personalized Travel Planning**

GlobeTrotter is a full-stack travel planning platform that helps users design, organize, and visualize multi-city trips end-to-end. Instead of juggling spreadsheets and scattered notes, travelers can build day-by-day itineraries, discover cities and activities, track estimated budgets, and share their plans with a community — all in one place.

Built for the **Odoo Hackathon**.

---


---

## Overview

GlobeTrotter turns the complexity of multi-city trip planning into a simple, visual, and collaborative experience. Users can authenticate securely, build itineraries section by section, track budgets in real time, browse activities and destinations, and view their trips on a calendar — all backed by a real database and secure authentication.

---

## Features

- 🔐 **Email OTP Authentication** — passwordless login/signup via Supabase Auth
- 🗺️ **Multi-City Trip Builder** — create trips with custom start/end dates and destinations
- 📅 **Section-Based Itinerary Builder** — add unlimited itinerary sections with dates and budgets
- 🔍 **City & Activity Search** — discover and add activities to a trip
- 💰 **Budget Tracking** — automatic cost breakdown per itinerary day
- 📆 **Calendar View** — visualize all trips on a monthly calendar
- 🌐 **Community Tab** — browse trips and experiences shared by other users
- 📊 **Admin Dashboard** — analytics on users, popular cities, and activity trends
- 📱 **Fully Responsive** — optimized for both mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Authentication | [Supabase Auth](https://supabase.com/auth) (Email OTP) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| Hosting | [Vercel](https://vercel.com/) (Free Tier) |
| Language | TypeScript |

---

## Project Structure

```
Odoo/
├── app/                    # Next.js App Router pages (routes)
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── trips/
│   ├── profile/
│   ├── search/
│   ├── community/
│   ├── calendar/
│   └── admin/
├── components/             # Reusable UI components (Navbar, ToolBar, TripCard, etc.)
├── lib/                    # Utility functions, Supabase client, mock data
├── supabase/
│   └── schema.sql          # Database schema (tables + Row Level Security)
├── middleware.ts           # Route protection for authenticated pages
├── .env.local.example      # Template for required environment variables
├── DEPLOYMENT.md           # Deployment notes
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## Getting Started

If the project's Supabase and Stripe keys are already configured (i.e. `.env.local` already exists in the project), this is all you need:

```bash
cd Odoo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** `.env.local` is not committed to Git (it's git-ignored on purpose, since it holds secret keys). If you're the first person setting this project up, or you're on a fresh clone without `.env.local`, follow [First-Time Backend Setup](#first-time-backend-setup) below once — after that, everyone on the team can just use the three commands above.

**Requirements:** [Node.js](https://nodejs.org/) v18+ and npm (comes with Node.js) installed on your machine.

---

## First-Time Backend Setup

⚠️ **This section is a one-time setup for whoever configures the project's backend — not something every teammate or every user repeats.** Once `.env.local` exists and the database is set up, it stays that way for everyone using that same Supabase project; teammates just need the same `.env.local` file (shared privately, never via GitHub).


## Building for Production

To create an optimized production build:

```bash
npm run build
```

To test the production build locally before deploying:

```bash
npm run start
```

## Team

Built by us for the Odoo Hackathon.

| Name |
|---|---|
| Rudra | 

| Vishvaraj |

| Bhautik |

| Vatsal |

---

THANK YOU!