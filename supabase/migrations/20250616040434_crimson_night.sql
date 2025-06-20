-- First create the extension for text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add indexes for blog_posts table to improve query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_published_lang ON blog_posts(category_id, published_at DESC);

-- Add indexes for translations to improve language filtering
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_post_id ON blog_post_translations(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_category_translations_category_id ON blog_category_translations(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_tag_translations_tag_id ON blog_tag_translations(tag_id);

-- Add indexes for tag relationships to improve tag filtering
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_tag_id ON blog_post_tags(tag_id);

-- Add text search indexes for title only (which is smaller)
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_title_search ON blog_post_translations USING btree(title);

-- Add function-based index for title with lower case for case-insensitive searches
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_title_lower ON blog_post_translations(lower(title));

-- For content, use MD5 hash as suggested in the error message hint
-- This creates a fixed-size index regardless of content length
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_content_md5 ON blog_post_translations(md5(content));

-- Add index on meta_description which is typically smaller than content
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_meta_description ON blog_post_translations(meta_description);

-- Add index on keywords for better search performance
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_keywords ON blog_post_translations(keywords);