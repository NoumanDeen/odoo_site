/*
  # Add Blog Slug Trigger

  1. Purpose
    - Automatically normalize Arabic slugs by replacing all forms of alif with plain alif
    - Ensure slugs are SEO-friendly and consistent
    - Apply normalization before insert and update operations

  2. Implementation
    - Create a function to normalize Arabic text in slugs
    - Create triggers to call this function before insert and update
    - Apply to blog_posts table
*/

-- Create function to normalize Arabic text in slugs
CREATE OR REPLACE FUNCTION normalize_arabic_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Replace all forms of alif (أ, إ, آ) with plain alif (ا)
  NEW.slug = REGEXP_REPLACE(NEW.slug, '[أإآ]', 'ا', 'g');
  
  -- Remove any diacritics (tashkeel)
  NEW.slug = REGEXP_REPLACE(NEW.slug, '[\u064B-\u065F\u0670]', '', 'g');
  
  -- Remove any duplicate hyphens
  NEW.slug = REGEXP_REPLACE(NEW.slug, '-+', '-', 'g');
  
  -- Remove leading and trailing hyphens
  NEW.slug = REGEXP_REPLACE(NEW.slug, '^-+|-+$', '', 'g');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog_posts table before insert
CREATE TRIGGER normalize_blog_slug_before_insert
BEFORE INSERT ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION normalize_arabic_slug();

-- Create trigger for blog_posts table before update
CREATE TRIGGER normalize_blog_slug_before_update
BEFORE UPDATE ON blog_posts
FOR EACH ROW
WHEN (OLD.slug IS DISTINCT FROM NEW.slug)
EXECUTE FUNCTION normalize_arabic_slug();

-- Add index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_search ON blog_posts USING btree(slug);