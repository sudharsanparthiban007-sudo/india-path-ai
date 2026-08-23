-- ============================================================================
-- Supabase Migration: Create payments table with Row Level Security (RLS)
-- ============================================================================

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

-- Create index on stripe_payment_intent_id for fast webhook lookups
CREATE INDEX IF NOT EXISTS idx_payments_stripe_pi ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 1. Policy: Authenticated users can view only their own payment records
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  USING (
    -- User ID match or Supabase auth UID
    user_id::text = auth.uid()::text
    OR user_id IN (
      SELECT id FROM "User" WHERE email = auth.jwt()->>'email'
    )
  );

-- 2. Policy: Service role (Edge Functions, Webhooks, Server API) has full access
DROP POLICY IF EXISTS "Service role can manage all payments" ON payments;
CREATE POLICY "Service role can manage all payments"
  ON payments
  FOR ALL
  USING (
    auth.role() = 'service_role' OR auth.role() = 'postgres' OR current_user = 'postgres'
  )
  WITH CHECK (
    auth.role() = 'service_role' OR auth.role() = 'postgres' OR current_user = 'postgres'
  );
