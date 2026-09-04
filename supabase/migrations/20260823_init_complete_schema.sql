-- ============================================================================
-- India Path AI — Complete Supabase PostgreSQL Schema & RLS Setup
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- ============================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Points of Interest Table
CREATE TABLE IF NOT EXISTS "PointOfInterest" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- heritage | temple | beach | transit | nature
  city TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  description TEXT NOT NULL,
  "transitInfo" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Trips Table (Generated Itineraries)
CREATE TABLE IF NOT EXISTS "Trip" (
  id SERIAL PRIMARY KEY,
  destination TEXT NOT NULL,
  days INTEGER NOT NULL,
  interests TEXT NOT NULL, -- JSON array string
  itinerary TEXT NOT NULL, -- JSON string
  language TEXT NOT NULL DEFAULT 'en',
  "userId" INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 4. Bookings Table (Monument Passes & Tickets)
CREATE TABLE IF NOT EXISTS "Booking" (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "poiId" INTEGER REFERENCES "PointOfInterest"(id) ON DELETE SET NULL,
  "poiName" TEXT NOT NULL,
  "bookingDate" TEXT NOT NULL,
  "timeSlot" TEXT,
  "ticketCount" INTEGER NOT NULL DEFAULT 1,
  amount DOUBLE PRECISION NOT NULL DEFAULT 100.0,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'confirmed', -- pending | confirmed | cancelled
  "stripeSessionId" TEXT,
  "isTestMode" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 5. Complaints Table
CREATE TABLE IF NOT EXISTS "Complaint" (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  "photoData" TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  "locationNote" TEXT,
  department TEXT NOT NULL DEFAULT 'Tourism Services',
  urgency TEXT NOT NULL DEFAULT 'Medium',
  status TEXT NOT NULL DEFAULT 'Submitted',
  "isMock" BOOLEAN NOT NULL DEFAULT false,
  "userId" INTEGER REFERENCES "User"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. SOS Emergency Incidents Table
CREATE TABLE IF NOT EXISTS "SosIncident" (
  id SERIAL PRIMARY KEY,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  note TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 7. Cultural Events Calendar Table
CREATE TABLE IF NOT EXISTS "CulturalEvent" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  month TEXT NOT NULL,
  season TEXT NOT NULL,
  description TEXT NOT NULL,
  highlight TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 8. Payments Ledger Table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "User"(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  amount DOUBLE PRECISION NOT NULL,
  currency TEXT NOT NULL DEFAULT 'inr',
  status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | failed | cancelled
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 9. Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  poi_id INTEGER NOT NULL REFERENCES "PointOfInterest"(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, poi_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_trips_userId ON "Trip"("userId");
CREATE INDEX IF NOT EXISTS idx_bookings_userId ON "Booking"("userId");
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_pi ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_pois_city ON "PointOfInterest"(city);
CREATE INDEX IF NOT EXISTS idx_events_city_month ON "CulturalEvent"(city, month);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Trip" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Complaint" ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PointOfInterest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CulturalEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SosIncident" ENABLE ROW LEVEL SECURITY;

-- Public read for POIs and Cultural Events
DROP POLICY IF EXISTS "Public read POIs" ON "PointOfInterest";
CREATE POLICY "Public read POIs" ON "PointOfInterest" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read Events" ON "CulturalEvent";
CREATE POLICY "Public read Events" ON "CulturalEvent" FOR SELECT USING (true);

-- User-scoped policies
DROP POLICY IF EXISTS "Users can manage own trips" ON "Trip";
CREATE POLICY "Users can manage own trips" ON "Trip"
  FOR ALL USING ("userId"::text = auth.uid()::text OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'))
  WITH CHECK ("userId"::text = auth.uid()::text OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'));

DROP POLICY IF EXISTS "Users can manage own bookings" ON "Booking";
CREATE POLICY "Users can manage own bookings" ON "Booking"
  FOR ALL USING ("userId"::text = auth.uid()::text OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'))
  WITH CHECK ("userId"::text = auth.uid()::text OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'));

DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments
  FOR ALL USING (user_id::text = auth.uid()::text OR user_id IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'))
  WITH CHECK (user_id::text = auth.uid()::text OR user_id IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'));

DROP POLICY IF EXISTS "Users can manage own favorites" ON favorites;
CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (user_id::text = auth.uid()::text OR user_id IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'))
  WITH CHECK (user_id::text = auth.uid()::text OR user_id IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email'));

DROP POLICY IF EXISTS "Users can manage own complaints" ON "Complaint";
CREATE POLICY "Users can manage own complaints" ON "Complaint"
  FOR ALL USING ("userId"::text = auth.uid()::text OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email') OR "userId" IS NULL)
  WITH CHECK ("userId"::text = auth.uid()::text OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email') OR "userId" IS NULL);
