-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_category_translations table
CREATE TABLE IF NOT EXISTS blog_category_translations (
  category_id uuid NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  lang text NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (category_id, lang)
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  slug text UNIQUE NOT NULL,
  published_at timestamptz DEFAULT now(),
  image_url text,
  author_name text DEFAULT 'ToDoOps Team',
  created_at timestamptz DEFAULT now()
);

-- Create blog_post_translations table
CREATE TABLE IF NOT EXISTS blog_post_translations (
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  lang text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  meta_description text,
  keywords text,
  PRIMARY KEY (post_id, lang)
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_tag_translations table
CREATE TABLE IF NOT EXISTS blog_tag_translations (
  tag_id uuid NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  lang text NOT NULL,
  name text NOT NULL,
  PRIMARY KEY (tag_id, lang)
);

-- Create blog_post_tags junction table
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

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

-- Drop triggers if they exist to avoid errors
DROP TRIGGER IF EXISTS normalize_blog_slug_before_insert ON blog_posts;
DROP TRIGGER IF EXISTS normalize_blog_slug_before_update ON blog_posts;

-- Create triggers
CREATE TRIGGER normalize_blog_slug_before_insert
BEFORE INSERT ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION normalize_arabic_slug();

CREATE TRIGGER normalize_blog_slug_before_update
BEFORE UPDATE ON blog_posts
FOR EACH ROW
WHEN (OLD.slug IS DISTINCT FROM NEW.slug)
EXECUTE FUNCTION normalize_arabic_slug();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category_translations_lang ON blog_category_translations(lang);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_published ON blog_posts(category_id, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_lang ON blog_post_translations(lang);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON blog_tags(slug);
CREATE INDEX IF NOT EXISTS idx_blog_tag_translations_lang ON blog_tag_translations(lang);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_post_id_lang ON blog_post_translations(post_id, lang);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_published ON blog_posts(slug, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_title_search ON blog_post_translations USING btree(title);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_title_lower ON blog_post_translations(lower(title));
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_content_md5 ON blog_post_translations(md5(content));
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_meta_description ON blog_post_translations(meta_description);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_keywords ON blog_post_translations(keywords);

-- Enable Row Level Security
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tag_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist to avoid errors
DROP POLICY IF EXISTS "Allow public read access to blog_categories" ON blog_categories;
DROP POLICY IF EXISTS "Allow authenticated insert access to blog_categories" ON blog_categories;
DROP POLICY IF EXISTS "Allow authenticated update access to blog_categories" ON blog_categories;
DROP POLICY IF EXISTS "Allow authenticated delete access to blog_categories" ON blog_categories;

DROP POLICY IF EXISTS "Allow public read access to blog_category_translations" ON blog_category_translations;
DROP POLICY IF EXISTS "Allow authenticated insert access to blog_category_translations" ON blog_category_translations;
DROP POLICY IF EXISTS "Allow authenticated update access to blog_category_translations" ON blog_category_translations;
DROP POLICY IF EXISTS "Allow authenticated delete access to blog_category_translations" ON blog_category_translations;

DROP POLICY IF EXISTS "Allow public read access to blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated insert access to blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated update access to blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated delete access to blog_posts" ON blog_posts;

DROP POLICY IF EXISTS "Allow public read access to blog_post_translations" ON blog_post_translations;
DROP POLICY IF EXISTS "Allow authenticated insert access to blog_post_translations" ON blog_post_translations;
DROP POLICY IF EXISTS "Allow authenticated update access to blog_post_translations" ON blog_post_translations;
DROP POLICY IF EXISTS "Allow authenticated delete access to blog_post_translations" ON blog_post_translations;

DROP POLICY IF EXISTS "Allow public read access to blog_tags" ON blog_tags;
DROP POLICY IF EXISTS "Allow authenticated insert access to blog_tags" ON blog_tags;
DROP POLICY IF EXISTS "Allow authenticated update access to blog_tags" ON blog_tags;
DROP POLICY IF EXISTS "Allow authenticated delete access to blog_tags" ON blog_tags;

DROP POLICY IF EXISTS "Allow public read access to blog_tag_translations" ON blog_tag_translations;
DROP POLICY IF EXISTS "Allow authenticated insert access to blog_tag_translations" ON blog_tag_translations;
DROP POLICY IF EXISTS "Allow authenticated update access to blog_tag_translations" ON blog_tag_translations;
DROP POLICY IF EXISTS "Allow authenticated delete access to blog_tag_translations" ON blog_tag_translations;

DROP POLICY IF EXISTS "Allow public read access to blog_post_tags" ON blog_post_tags;
DROP POLICY IF EXISTS "Allow authenticated insert access to blog_post_tags" ON blog_post_tags;
DROP POLICY IF EXISTS "Allow authenticated update access to blog_post_tags" ON blog_post_tags;
DROP POLICY IF EXISTS "Allow authenticated delete access to blog_post_tags" ON blog_post_tags;

-- Create policies for blog_categories
CREATE POLICY "Allow public read access to blog_categories"
  ON blog_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to blog_categories"
  ON blog_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to blog_categories"
  ON blog_categories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to blog_categories"
  ON blog_categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for blog_category_translations
CREATE POLICY "Allow public read access to blog_category_translations"
  ON blog_category_translations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to blog_category_translations"
  ON blog_category_translations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to blog_category_translations"
  ON blog_category_translations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to blog_category_translations"
  ON blog_category_translations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for blog_posts
CREATE POLICY "Allow public read access to blog_posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to blog_posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to blog_posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to blog_posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for blog_post_translations
CREATE POLICY "Allow public read access to blog_post_translations"
  ON blog_post_translations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to blog_post_translations"
  ON blog_post_translations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to blog_post_translations"
  ON blog_post_translations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to blog_post_translations"
  ON blog_post_translations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for blog_tags
CREATE POLICY "Allow public read access to blog_tags"
  ON blog_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to blog_tags"
  ON blog_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to blog_tags"
  ON blog_tags
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to blog_tags"
  ON blog_tags
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for blog_tag_translations
CREATE POLICY "Allow public read access to blog_tag_translations"
  ON blog_tag_translations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to blog_tag_translations"
  ON blog_tag_translations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to blog_tag_translations"
  ON blog_tag_translations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to blog_tag_translations"
  ON blog_tag_translations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for blog_post_tags
CREATE POLICY "Allow public read access to blog_post_tags"
  ON blog_post_tags
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to blog_post_tags"
  ON blog_post_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to blog_post_tags"
  ON blog_post_tags
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to blog_post_tags"
  ON blog_post_tags
  FOR DELETE
  TO authenticated
  USING (true);