import type { APIRoute } from 'astro';
import { createSlug, ensureUniqueSlug } from '../../lib/slugify';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { title, lang } = body;
    
    if (!title || !lang) {
      return new Response(
        JSON.stringify({ 
          error: 'Title and language are required' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate the base slug
    const baseSlug = createSlug(title, lang as 'ar' | 'en');
    
    // Fetch existing slugs to ensure uniqueness
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug');
    
    const existingSlugs = posts ? posts.map(post => post.slug) : [];
    
    // Ensure the slug is unique
    const uniqueSlug = ensureUniqueSlug(baseSlug, existingSlugs);
    
    return new Response(
      JSON.stringify({ slug: uniqueSlug }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error generating slug:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate slug' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};