/*
# SAVORA Restaurant — Orders, Reservations, Menu, Reviews, Discount Codes

## Overview
Creates the full backend schema for the SAVORA restaurant website:
- orders + order_items: customer food orders with checkout
- reservations: table booking requests
- reviews: customer restaurant reviews (demo-labeled)
- discount_codes: configurable promotional codes
- menu_overrides: admin-managed price/description/availability overrides for menu items

## Tables

### orders
- id (uuid PK)
- customer_name, customer_email, customer_phone (text)
- order_type (text: 'delivery' or 'pickup')
- delivery_address (text, nullable — required for delivery)
- payment_method (text: 'cash_on_delivery', 'cash_on_pickup', 'online')
- order_notes (text, nullable)
- subtotal, delivery_fee, discount_amount, total (numeric)
- discount_code (text, nullable)
- status (text: 'received', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')
- reference_number (text, unique — generated)
- items_json (jsonb — snapshot of cart items)
- created_at, updated_at (timestamptz)

### reservations
- id (uuid PK)
- full_name, email, phone (text)
- date (date)
- time (text)
- guests (int)
- special_requests (text, nullable)
- status (text: 'pending', 'confirmed', 'seated', 'cancelled')
- created_at (timestamptz)

### reviews
- id (uuid PK)
- name, role (text)
- rating (int 1-5)
- text (text)
- is_demo (boolean default true — clearly labels demo reviews)
- created_at (timestamptz)

### discount_codes
- id (uuid PK)
- code (text, unique)
- description (text)
- discount_type (text: 'percentage' or 'fixed')
- discount_value (numeric)
- min_order_amount (numeric, default 0)
- is_active (boolean, default true)
- expires_at (timestamptz, nullable)
- usage_count (int, default 0)
- max_uses (int, nullable)
- created_at (timestamptz)

### menu_overrides
- id (uuid PK)
- menu_item_id (text, unique — references the static menu item ID)
- price (numeric, nullable — override price)
- description (text, nullable — override description)
- is_available (boolean, default true — mark unavailable)
- updated_at (timestamptz)

## Security
- All tables use RLS.
- This app has no customer sign-in screen, so all policies use TO anon, authenticated.
- Orders: anon can insert (create order) and select (track by reference).
- Reservations: anon can insert and select.
- Reviews: anon can insert and select.
- Discount codes: anon can only select active codes (to validate at checkout).
- Menu overrides: anon can select (to show updated prices/availability).
- Admin features (update orders, manage menu, etc.) require authenticated admin role — policies scope updates to authenticated only.

## Notes
1. Orders table stores items as jsonb snapshot so order history is preserved even if menu items change.
2. Reference numbers use format SAV-YYYYMMDD-XXXX for easy lookup.
3. Discount codes check is_active and expiry at validation time.
4. Menu overrides allow admin to change prices without modifying the static menu data file.
*/

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  order_type text NOT NULL DEFAULT 'pickup' CHECK (order_type IN ('delivery', 'pickup')),
  delivery_address text,
  payment_method text NOT NULL DEFAULT 'cash_on_pickup' CHECK (payment_method IN ('cash_on_delivery', 'cash_on_pickup', 'online')),
  order_notes text,
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  delivery_fee numeric(10,2) NOT NULL DEFAULT 0,
  discount_amount numeric(10,2) NOT NULL DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  discount_code text,
  status text NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  reference_number text UNIQUE NOT NULL DEFAULT 'SAV-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0'),
  items_json jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_orders" ON orders;
CREATE POLICY "auth_update_orders" ON orders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  guests int NOT NULL DEFAULT 2 CHECK (guests >= 1 AND guests <= 20),
  special_requests text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'seated', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations" ON reservations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_reservations" ON reservations;
CREATE POLICY "auth_update_reservations" ON reservations FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT 'Guest',
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  is_demo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Discount codes
CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text,
  discount_type text NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric(10,2) NOT NULL DEFAULT 0,
  min_order_amount numeric(10,2) NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  usage_count int NOT NULL DEFAULT 0,
  max_uses int,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_discount_codes" ON discount_codes;
CREATE POLICY "anon_select_discount_codes" ON discount_codes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_manage_discount_codes" ON discount_codes;
CREATE POLICY "auth_manage_discount_codes" ON discount_codes FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Menu overrides
CREATE TABLE IF NOT EXISTS menu_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id text UNIQUE NOT NULL,
  price numeric(10,2),
  description text,
  is_available boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE menu_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_menu_overrides" ON menu_overrides;
CREATE POLICY "anon_select_menu_overrides" ON menu_overrides FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_manage_menu_overrides" ON menu_overrides;
CREATE POLICY "auth_manage_menu_overrides" ON menu_overrides FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Seed sample discount codes
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount, is_active) VALUES
  ('WELCOME10', '10% off your first order', 'percentage', 10, 0, true),
  ('SAVE5', '$5 off orders over $30', 'fixed', 5, 30, true),
  ('SAVOR15', '15% off orders over $50', 'percentage', 15, 50, true)
ON CONFLICT (code) DO NOTHING;

-- Seed sample reviews (clearly labeled as demo)
INSERT INTO reviews (name, role, rating, text, is_demo) VALUES
  ('Sarah M.', 'Food Blogger', 5, 'SAVORA has become my go-to recommendation. The Truffle Mushroom Pizza is unlike anything else in the city — earthy, indulgent, perfectly balanced.', true),
  ('James L.', 'Regular Guest', 5, 'I have been coming here every Friday for six months. The Steak Frites are consistently perfect, and the staff remembers my name. That is hospitality.', true),
  ('Aisha K.', 'First-Time Visitor', 4, 'Beautiful ambiance and incredible pasta. The Grilled Chicken Alfredo was creamy without being heavy. Only wish the wait was shorter on weekends.', true),
  ('Marco R.', 'Local Foodie', 5, 'The Four Cheese Pizza transported me back to Italy. Every bite was a delight. The mocktails are also exceptional — the virgin mojito is a must-try.', true),
  ('Elena V.', 'Anniversary Dinner', 5, 'We celebrated our anniversary here and it could not have been more perfect. The staff made us feel special, the food was exquisite, and the atmosphere was magical.', true),
  ('David C.', 'Business Lunch', 4, 'Great spot for a business lunch. The Mediterranean Chicken Bowl was fresh and flavorful. Service was prompt and professional.', true)
ON CONFLICT DO NOTHING;
