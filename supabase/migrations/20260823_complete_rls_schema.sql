-- ============================================================================
-- Supabase Schema & Row Level Security (RLS) Migration
-- Sets up Users, Trips, Favorites, Payments, Bookings, and Complaints with RLS
-- ============================================================================

-- 1. Payments Table
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

-- 2. Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  poi_id INTEGER NOT NULL REFERENCES "PointOfInterest"(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, poi_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_pi ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Trip" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Complaint" ENABLE ROW LEVEL SECURITY;

-- ─── 1. Payments RLS ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  USING (
    user_id::text = auth.uid()::text
    OR user_id IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
  );

DROP POLICY IF EXISTS "Service role can manage payments" ON payments;
CREATE POLICY "Service role can manage payments"
  ON payments
  FOR ALL
  USING (auth.role() = 'service_role' OR auth.role() = 'postgres' OR current_user = 'postgres')
  WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'postgres' OR current_user = 'postgres');

-- ─── 2. Favorites RLS ────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can manage own favorites" ON favorites;
CREATE POLICY "Users can manage own favorites"
  ON favorites
  FOR ALL
  USING (
    user_id::text = auth.uid()::text
    OR user_id IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
  )
  WITH CHECK (
    user_id::text = auth.uid()::text
    OR user_id IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
  );

-- ─── 3. Trips RLS ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can view own trips" ON "Trip";
CREATE POLICY "Users can view own trips"
  ON "Trip"
  FOR ALL
  USING (
    "userId"::text = auth.uid()::text
    OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
  )
  WITH CHECK (
    "userId"::text = auth.uid()::text
    OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
  );

-- ─── 4. Bookings RLS ─────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can view own bookings" ON "Booking";
CREATE POLICY "Users can view own bookings"
  ON "Booking"
  FOR ALL
  USING (
    "userId"::text = auth.uid()::text
    OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
  )
  WITH CHECK (
    "userId"::text = auth.uid()::text
    OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
  );

-- ─── 5. Complaints RLS ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can view own complaints" ON "Complaint";
CREATE POLICY "Users can view own complaints"
  ON "Complaint"
  FOR ALL
  USING (
    "userId"::text = auth.uid()::text
    OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
    OR "userId" IS NULL
  )
  WITH CHECK (
    "userId"::text = auth.uid()::text
    OR "userId" IN (SELECT id FROM "User" WHERE email = auth.jwt()->>'email')
    OR "userId" IS NULL
  );
