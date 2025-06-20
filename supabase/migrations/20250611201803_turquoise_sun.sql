/*
  # Create Blog Schema

  1. New Tables
    - `blog_categories`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `blog_category_translations`
      - `category_id` (uuid, foreign key)
      - `lang` (text)
      - `name` (text)
    - `blog_posts`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `slug` (text, unique)
      - `published_at` (timestamp)
      - `image_url` (text)
      - `author_name` (text)
      - `created_at` (timestamp)
    - `blog_post_translations`
      - `post_id` (uuid, foreign key)
      - `lang` (text)
      - `title` (text)
      - `content` (text)
      - `meta_description` (text)
      - `keywords` (text)
    - `blog_tags`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `blog_tag_translations`
      - `tag_id` (uuid, foreign key)
      - `lang` (text)
      - `name` (text)
    - `blog_post_tags`
      - `post_id` (uuid, foreign key)
      - `tag_id` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated write access
*/

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
  author_name text DEFAULT 'Odoo Implementer Team',
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category_translations_lang ON blog_category_translations(lang);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_published ON blog_posts(category_id, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_lang ON blog_post_translations(lang);
CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON blog_tags(slug);
CREATE INDEX IF NOT EXISTS idx_blog_tag_translations_lang ON blog_tag_translations(lang);

-- Enable Row Level Security
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tag_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

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