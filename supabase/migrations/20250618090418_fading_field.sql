/*
  # Delete All Blog Articles

  1. Purpose
    - Remove all existing blog posts and related data
    - Keep the blog structure intact (tables, functions, etc.)
    - Prepare for fresh content

  2. Implementation
    - Delete from junction tables first (blog_post_tags)
    - Delete from translation tables (blog_post_translations)
    - Delete from main tables (blog_posts)
    - Keep categories and tags for future use
*/

-- Delete all blog post tags (junction table)
DELETE FROM blog_post_tags;

-- Delete all blog post translations
DELETE FROM blog_post_translations;

-- Delete all blog posts
DELETE FROM blog_posts;

-- Keep categories, tags, and their translations for future use