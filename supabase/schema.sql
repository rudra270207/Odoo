-- ========================================================
-- GLOBETROTTER SUPABASE POSTGRES DATABASE SCHEMA & RLS POLICIES
-- ========================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  city TEXT,
  country TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TRIPS TABLE
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  destination TEXT,
  start_date TEXT,
  end_date TEXT,
  cover_image TEXT,
  budget NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRIP SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.trip_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date_range TEXT,
  budget NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.trip_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cost NUMERIC DEFAULT 0,
  type TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- ROW LEVEL SECURITY POLICIES
-- ========================================================

-- USERS POLICIES
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- TRIPS POLICIES
CREATE POLICY "Users can view their own trips"
  ON public.trips FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips"
  ON public.trips FOR DELETE
  USING (auth.uid() = user_id);

-- TRIP SECTIONS POLICIES
CREATE POLICY "Users can view sections of their trips"
  ON public.trip_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id = trip_sections.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert sections to their trips"
  ON public.trip_sections FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id = trip_sections.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update sections of their trips"
  ON public.trip_sections FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id = trip_sections.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete sections of their trips"
  ON public.trip_sections FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.trips
      WHERE trips.id = trip_sections.trip_id AND trips.user_id = auth.uid()
    )
  );

-- ACTIVITIES POLICIES
CREATE POLICY "Users can view activities of their sections"
  ON public.activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.trip_sections
      JOIN public.trips ON trips.id = trip_sections.trip_id
      WHERE trip_sections.id = activities.section_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert activities to their sections"
  ON public.activities FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.trip_sections
      JOIN public.trips ON trips.id = trip_sections.trip_id
      WHERE trip_sections.id = activities.section_id AND trips.user_id = auth.uid()
    )
  );

-- ========================================================
-- AUTOMATIC USER SYNC TRIGGER FROM AUTH.USERS
-- ========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, city, country, bio)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'city', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', ''),
    COALESCE(NEW.raw_user_meta_data->>'bio', '')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, public.users.name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists & create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
