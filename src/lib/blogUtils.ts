import { createSlug, ensureUniqueSlug } from './slugify';
import { supabase } from './supabase';
import type { BlogPost } from './supabase';

/**
 * Generates a unique SEO-friendly slug for a blog post
 * @param title The post title
 * @param lang The language ('ar' or 'en')
 * @returns A unique slug
 */
export async function generateUniqueSlug(title: string, lang: 'ar' | 'en'): Promise<string> {
  // Generate the base slug
  const baseSlug = createSlug(title, lang);
  
  // Fetch existing slugs to ensure uniqueness
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug');
  
  const existingSlugs = posts ? posts.map(post => post.slug) : [];
  
  // Ensure the slug is unique
  return ensureUniqueSlug(baseSlug, existingSlugs);
}

/**
 * Creates a new blog post with translations
 * @param postData The blog post data
 * @param translations Translations for the post
 * @param tagIds Optional array of tag IDs to associate with the post
 * @returns The created post ID and slug
 */
export async function createBlogPost(
  postData: {
    slug: string;
    category_id: string;
    image_url: string;
    author_name?: string;
  },
  translations: {
    ar?: {
      title: string;
      content: string;
      meta_description: string;
      keywords: string;
    };
    en?: {
      title: string;
      content: string;
      meta_description: string;
      keywords: string;
    };
  },
  tagIds: string[] = []
): Promise<{ id: string; slug: string }> {
  try {
    // Insert the post
    const { data: postData, error: postError } = await supabase
      .from('blog_posts')
      .insert([
        { 
          slug: postData.slug,
          category_id: postData.category_id,
          image_url: postData.image_url,
          author_name: postData.author_name || 'ToDoOps Team'
        }
      ])
      .select();
      
    if (postError) throw postError;
    
    const post_id = postData[0].id;
    
    // Insert translations
    const translationInserts = [];
    
    if (translations.ar) {
      translationInserts.push({
        post_id,
        lang: 'ar',
        title: translations.ar.title,
        content: translations.ar.content,
        meta_description: translations.ar.meta_description,
        keywords: translations.ar.keywords
      });
    }
    
    if (translations.en) {
      translationInserts.push({
        post_id,
        lang: 'en',
        title: translations.en.title,
        content: translations.en.content,
        meta_description: translations.en.meta_description,
        keywords: translations.en.keywords
      });
    }
    
    if (translationInserts.length > 0) {
      const { error: translationError } = await supabase
        .from('blog_post_translations')
        .insert(translationInserts);
        
      if (translationError) throw translationError;
    }
    
    // Insert tags if any were provided
    if (tagIds.length > 0) {
      const tagInserts = tagIds.map(tag_id => ({
        post_id,
        tag_id
      }));
      
      const { error: tagError } = await supabase
        .from('blog_post_tags')
        .insert(tagInserts);
        
      if (tagError) throw tagError;
    }
    
    return { id: post_id, slug: postData[0].slug };
    
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

/**
 * Updates an existing blog post and its translations
 * @param postId The ID of the post to update
 * @param postData The updated blog post data
 * @param translations Updated translations for the post
 * @param tagIds Optional array of tag IDs to associate with the post
 * @returns The updated post slug
 */
export async function updateBlogPost(
  postId: string,
  postData: {
    slug?: string;
    category_id?: string;
    image_url?: string;
    author_name?: string;
  },
  translations?: {
    ar?: {
      title?: string;
      content?: string;
      meta_description?: string;
      keywords?: string;
    };
    en?: {
      title?: string;
      content?: string;
      meta_description?: string;
      keywords?: string;
    };
  },
  tagIds?: string[]
): Promise<{ slug: string }> {
  try {
    // Update the post
    const updateData: any = {};
    if (postData.slug) updateData.slug = postData.slug;
    if (postData.category_id) updateData.category_id = postData.category_id;
    if (postData.image_url) updateData.image_url = postData.image_url;
    if (postData.author_name) updateData.author_name = postData.author_name;
    
    if (Object.keys(updateData).length > 0) {
      const { error: postError } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId);
        
      if (postError) throw postError;
    }
    
    // Update translations
    if (translations) {
      if (translations.ar) {
        const arUpdate: any = {};
        if (translations.ar.title) arUpdate.title = translations.ar.title;
        if (translations.ar.content) arUpdate.content = translations.ar.content;
        if (translations.ar.meta_description) arUpdate.meta_description = translations.ar.meta_description;
        if (translations.ar.keywords) arUpdate.keywords = translations.ar.keywords;
        
        if (Object.keys(arUpdate).length > 0) {
          const { error: arError } = await supabase
            .from('blog_post_translations')
            .update(arUpdate)
            .eq('post_id', postId)
            .eq('lang', 'ar');
            
          if (arError) throw arError;
        }
      }
      
      if (translations.en) {
        const enUpdate: any = {};
        if (translations.en.title) enUpdate.title = translations.en.title;
        if (translations.en.content) enUpdate.content = translations.en.content;
        if (translations.en.meta_description) enUpdate.meta_description = translations.en.meta_description;
        if (translations.en.keywords) enUpdate.keywords = translations.en.keywords;
        
        if (Object.keys(enUpdate).length > 0) {
          const { error: enError } = await supabase
            .from('blog_post_translations')
            .update(enUpdate)
            .eq('post_id', postId)
            .eq('lang', 'en');
            
          if (enError) throw enError;
        }
      }
    }
    
    // Update tags if provided
    if (tagIds !== undefined) {
      // First delete existing tags
      const { error: deleteTagsError } = await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', postId);
        
      if (deleteTagsError) throw deleteTagsError;
      
      // Then insert new tags if any were provided
      if (tagIds.length > 0) {
        const tagInserts = tagIds.map(tag_id => ({
          post_id: postId,
          tag_id
        }));
        
        const { error: tagError } = await supabase
          .from('blog_post_tags')
          .insert(tagInserts);
          
        if (tagError) throw tagError;
      }
    }
    
    // Get the updated slug
    const { data: post } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('id', postId)
      .single();
    
    return { slug: post?.slug || postData.slug || '' };
    
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}