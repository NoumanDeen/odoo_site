/*
  # Fix Blog Categories and Structure

  1. Categories
    - Create proper blog categories with consistent slugs
    - Add translations for both Arabic and English

  2. Fix Existing Data
    - Update existing posts to use the correct category IDs
    - Ensure consistent category structure
*/

-- First, let's create the correct categories with proper slugs
INSERT INTO blog_categories (id, slug, created_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'awareness', now()),
  ('22222222-2222-2222-2222-222222222222', 'consideration', now()),
  ('33333333-3333-3333-3333-333333333333', 'decision', now()),
  ('44444444-4444-4444-4444-444444444444', 'erp-basics', now()),
  ('55555555-5555-5555-5555-555555555555', 'odoo-features', now()),
  ('66666666-6666-6666-6666-666666666666', 'industry-solutions', now()),
  ('77777777-7777-7777-7777-777777777777', 'implementation-guide', now())
ON CONFLICT (slug) DO NOTHING;

-- Add translations for all categories
INSERT INTO blog_category_translations (category_id, lang, name) VALUES
  -- Arabic translations
  ('11111111-1111-1111-1111-111111111111', 'ar', 'مرحلة الوعي'),
  ('22222222-2222-2222-2222-222222222222', 'ar', 'مرحلة البحث والمقارنة'),
  ('33333333-3333-3333-3333-333333333333', 'ar', 'مرحلة اتخاذ القرار'),
  ('44444444-4444-4444-4444-444444444444', 'ar', 'أساسيات ERP'),
  ('55555555-5555-5555-5555-555555555555', 'ar', 'ميزات أودو'),
  ('66666666-6666-6666-6666-666666666666', 'ar', 'حلول القطاعات'),
  ('77777777-7777-7777-7777-777777777777', 'ar', 'دليل التنفيذ'),
  
  -- English translations
  ('11111111-1111-1111-1111-111111111111', 'en', 'Awareness Stage'),
  ('22222222-2222-2222-2222-222222222222', 'en', 'Consideration Stage'),
  ('33333333-3333-3333-3333-333333333333', 'en', 'Decision Stage'),
  ('44444444-4444-4444-4444-444444444444', 'en', 'ERP Basics'),
  ('55555555-5555-5555-5555-555555555555', 'en', 'Odoo Features'),
  ('66666666-6666-6666-6666-666666666666', 'en', 'Industry Solutions'),
  ('77777777-7777-7777-7777-777777777777', 'en', 'Implementation Guide')
ON CONFLICT (category_id, lang) DO UPDATE SET
  name = EXCLUDED.name;

-- Update existing posts to use the correct category IDs
UPDATE blog_posts
SET category_id = CASE
  WHEN slug LIKE 'what-is-erp%' OR slug LIKE 'signs-business%' OR slug LIKE 'benefits-erp%' THEN (SELECT id FROM blog_categories WHERE slug = 'awareness')
  WHEN slug LIKE 'odoo-vs-%' OR slug LIKE 'odoo-features%' OR slug LIKE 'choosing-right%' THEN (SELECT id FROM blog_categories WHERE slug = 'consideration')
  WHEN slug LIKE 'odoo-implementation%' OR slug LIKE 'erp-implementation%' THEN (SELECT id FROM blog_categories WHERE slug = 'decision')
  ELSE category_id
END
WHERE category_id IS NOT NULL;