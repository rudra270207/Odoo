# GlobeTrotter Full-Stack Deployment Guide

This guide walks you through deploying **GlobeTrotter** to [Vercel](https://vercel.com) with [Supabase](https://supabase.com) and [Stripe](https://stripe.com).

---

## 1. Supabase Setup (Database & Authentication)

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and sign in.
   - Create a new project named `globetrotter`.

2. **Run SQL Schema**:
   - In your Supabase dashboard, open the **SQL Editor**.
   - Copy the contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
   - This creates `users`, `trips`, `trip_sections`, `activities` tables, RLS policies, and the automatic user creation trigger.

3. **Configure Auth Callback URL**:
   - In Supabase, go to **Authentication -> URL Configuration**.
   - Set Site URL to your domain (e.g. `https://your-app.vercel.app` or `http://localhost:3000`).
   - Add `https://your-app.vercel.app/auth/callback` to **Redirect URLs**.

4. **Copy API Keys**:
   - Go to **Project Settings -> API**.
   - Copy `Project URL`, `anon public` key, and `service_role` key.

---

## 2. Stripe Test Mode Setup

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com) and toggle **Test mode**.
2. Go to **Developers -> API keys**.
3. Copy your `Publishable key` (`pk_test_...`) and `Secret key` (`sk_test_...`).

---

## 3. GitHub Push & Vercel Deployment

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Full-stack GlobeTrotter with Supabase & Stripe"
   git push origin main
   ```

2. **Import Repository in Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository (`GlobeTrotter` / `Odoo`).

3. **Add Environment Variables in Vercel**:
   In the Vercel project configuration dashboard, add the following environment variables:

   | Variable Name | Description |
   | :--- | :--- |
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase `anon` public key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase `service_role` key |
   | `STRIPE_SECRET_KEY` | Your Stripe secret key (`sk_test_...`) |
   | `STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (`pk_test_...`) |
   | `NEXT_PUBLIC_SITE_URL` | Production URL (e.g. `https://globetrotter.vercel.app`) |

4. **Deploy**:
   - Click **Deploy**. Vercel will build and deploy your application automatically.

---

## 4. Verification

- Visit `https://your-app.vercel.app/login` to test passwordless OTP authentication.
- Visit `/trips/new` to create a trip in your live Supabase database.
- Visit `/trips/trip-1/build` and click **Pay $150 Deposit** to test the Stripe Checkout test mode redirect.
