import { supabase } from './supabase';
export { normalizeArabicText } from './supabase';

// Types for our Blog system
export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface BlogTag {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
  keywords: string;
  published_at: string;
  image_url: string;
  author_name: string;
  created_at: string;
  category?: BlogCategory;
  tags?: BlogTag[];
}

export interface BlogData {
  categories: BlogCategory[];
  posts: BlogPost[];
  tags: BlogTag[];
  totalPosts?: number;
}

// Cache for blog data to avoid repeated requests
const blogCache = new Map<string, { data: BlogData; timestamp: number }>();
const blogPostCache = new Map<string, { data: BlogPost | null; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch all blog posts for a specific language
export async function fetchAllBlogPosts(lang: 'ar' | 'en'): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        category_id,
        slug,
        published_at,
        image_url,
        author_name,
        created_at,
        blog_post_translations!inner(title, content, meta_description, keywords),
        blog_categories(id, slug, blog_category_translations(name)),
        blog_post_tags(
          blog_tags(
            id,
            slug,
            blog_tag_translations(name)
          )
        )
      `)
      .eq('blog_post_translations.lang', lang)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    // Transform posts data
    const posts: BlogPost[] = (data || []).map(post => {
      const translation = post.blog_post_translations[0];
      const category = post.blog_categories ? {
        id: post.blog_categories.id || '',
        slug: post.blog_categories.slug || '',
        name: post.blog_categories.blog_category_translations[0]?.name || '',
        created_at: ''
      } : undefined;

      // Transform tags for this post
      const postTags: BlogTag[] = (post.blog_post_tags || []).map((pt: any) => ({
        id: pt.blog_tags.id,
        slug: pt.blog_tags.slug,
        name: pt.blog_tags.blog_tag_translations[0]?.name || '',
        created_at: ''
      }));

      return {
        id: post.id,
        category_id: post.category_id,
        slug: post.slug,
        title: translation?.title || '',
        content: translation?.content || '',
        meta_description: translation?.meta_description || '',
        keywords: translation?.keywords || '',
        published_at: post.published_at,
        image_url: post.image_url,
        author_name: post.author_name,
        created_at: post.created_at,
        category,
        tags: postTags
      };
    });

    return posts;
  } catch (error) {
    console.error('Error in fetchAllBlogPosts:', error);
    return [];
  }
}

// Fetch blog data for a specific language with optional pagination and filters
export async function fetchBlogData(
  lang: 'ar' | 'en', 
  page: number = 0, 
  pageSize: number = 0,
  filters: {
    categorySlug?: string;
    tagSlug?: string;
    search?: string;
  } = {}
): Promise<BlogData> {
  // Generate a cache key that includes pagination and filter parameters
  const filterKey = JSON.stringify(filters);
  const cacheKey = `blog_${lang}_p${page}_s${pageSize}_${filterKey}`;
  const cached = blogCache.get(cacheKey);
  
  // Return cached data if it's still fresh
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    // Fetch categories and tags first (these are smaller datasets)
    const [categoriesResponse, tagsResponse] = await Promise.all([
      // Fetch categories with translations
      supabase
        .from('blog_categories')
        .select(`
          id,
          slug,
          created_at,
          blog_category_translations!inner(name)
        `)
        .eq('blog_category_translations.lang', lang)
        .order('slug'),
      
      // Fetch tags with translations
      supabase
        .from('blog_tags')
        .select(`
          id,
          slug,
          created_at,
          blog_tag_translations!inner(name)
        `)
        .eq('blog_tag_translations.lang', lang)
        .order('slug')
    ]);

    const { data: categoriesData, error: categoriesError } = categoriesResponse;
    const { data: tagsData, error: tagsError } = tagsResponse;

    if (categoriesError) {
      console.error('Error fetching blog categories:', categoriesError);
      throw categoriesError;
    }

    if (tagsError) {
      console.error('Error fetching blog tags:', tagsError);
      throw tagsError;
    }

    // Transform categories data
    const categories: BlogCategory[] = (categoriesData || []).map(cat => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.blog_category_translations[0]?.name || '',
      created_at: cat.created_at
    }));

    // Transform tags data
    const tags: BlogTag[] = (tagsData || []).map(tag => ({
      id: tag.id,
      slug: tag.slug,
      name: tag.blog_tag_translations[0]?.name || '',
      created_at: tag.created_at
    }));

    // Build the query for posts
    let query = supabase
      .from('blog_posts')
      .select(`
        id,
        category_id,
        slug,
        published_at,
        image_url,
        author_name,
        created_at,
        blog_post_translations!inner(title, content, meta_description, keywords),
        blog_categories(id, slug, blog_category_translations(name)),
        blog_post_tags(blog_tags(id, slug, blog_tag_translations(name)))
      `, { count: 'exact' })
      .eq('blog_post_translations.lang', lang)
      .order('published_at', { ascending: false });

    // Apply filters if provided
    if (filters.categorySlug) {
      query = query.eq('blog_categories.slug', filters.categorySlug);
    }

    if (filters.tagSlug) {
      query = query.eq('blog_post_tags.blog_tags.slug', filters.tagSlug);
    }

    if (filters.search) {
      const searchTerm = `%${filters.search}%`;
      query = query.or(`title.ilike.${searchTerm},content.ilike.${searchTerm}`, { foreignTable: 'blog_post_translations' });
    }

    // Apply pagination if both page and pageSize are provided
    if (page >= 0 && pageSize > 0) {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
    }

    // Execute the query
    const { data: postsData, error: postsError, count } = await query;

    if (postsError) {
      console.error('Error fetching blog posts:', postsError);
      throw postsError;
    }

    // Transform posts data
    const posts: BlogPost[] = (postsData || []).map(post => {
      const translation = post.blog_post_translations[0];
      const category = post.blog_categories ? {
        id: post.blog_categories.id || '',
        slug: post.blog_categories.slug || '',
        name: post.blog_categories.blog_category_translations[0]?.name || '',
        created_at: ''
      } : undefined;

      // Transform tags for this post
      const postTags: BlogTag[] = (post.blog_post_tags || []).map((pt: any) => ({
        id: pt.blog_tags.id,
        slug: pt.blog_tags.slug,
        name: pt.blog_tags.blog_tag_translations[0]?.name || '',
        created_at: ''
      }));

      return {
        id: post.id,
        category_id: post.category_id,
        slug: post.slug,
        title: translation?.title || '',
        content: translation?.content || '',
        meta_description: translation?.meta_description || '',
        keywords: translation?.keywords || '',
        published_at: post.published_at,
        image_url: post.image_url,
        author_name: post.author_name,
        created_at: post.created_at,
        category,
        tags: postTags
      };
    });

    const result = {
      categories,
      posts,
      tags,
      totalPosts: count || posts.length
    };

    // Cache the result
    blogCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Error in fetchBlogData:', error);
    
    // Return cached data if available, even if stale
    if (cached) {
      return cached.data;
    }
    
    return {
      categories: [],
      posts: [],
      tags: [],
      totalPosts: 0
    };
  }
}

// Fetch a single blog post by slug with caching
export async function fetchBlogPostBySlug(slug: string, lang: 'ar' | 'en'): Promise<BlogPost | null> {
  const cacheKey = `blog_post_${slug}_${lang}`;
  const cached = blogPostCache.get(cacheKey);
  
  // Return cached data if it's still fresh
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    const { data: postData, error: postError } = await supabase
      .from('blog_posts')
      .select(`
        id,
        category_id,
        slug,
        published_at,
        image_url,
        author_name,
        created_at,
        blog_post_translations!inner(title, content, meta_description, keywords),
        blog_categories(id, slug, blog_category_translations(name)),
        blog_post_tags(blog_tags(id, slug, blog_tag_translations(name)))
      `)
      .eq('slug', slug)
      .eq('blog_post_translations.lang', lang)
      .single();

    if (postError) {
      console.error('Error fetching blog post:', postError);
      return null;
    }

    if (!postData) {
      return null;
    }

    const translation = postData.blog_post_translations[0];
    const category = postData.blog_categories ? {
      id: postData.blog_categories.id,
      slug: postData.blog_categories.slug,
      name: postData.blog_categories.blog_category_translations[0]?.name || '',
      created_at: ''
    } : undefined;

    const tags: BlogTag[] = (postData.blog_post_tags || []).map((pt: any) => ({
      id: pt.blog_tags.id,
      slug: pt.blog_tags.slug,
      name: pt.blog_tags.blog_tag_translations[0]?.name || '',
      created_at: ''
    }));

    const result: BlogPost = {
      id: postData.id,
      category_id: postData.category_id,
      slug: postData.slug,
      title: translation?.title || '',
      content: translation?.content || '',
      meta_description: translation?.meta_description || '',
      keywords: translation?.keywords || '',
      published_at: postData.published_at,
      image_url: postData.image_url,
      author_name: postData.author_name,
      created_at: postData.created_at,
      category,
      tags
    };

    // Cache the result
    blogPostCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Error in fetchBlogPostBySlug:', error);
    
    // Return cached data if available, even if stale
    if (cached) {
      return cached.data;
    }
    
    return null;
  }
}

// Fetch related blog posts (same category, excluding current post)
export async function fetchRelatedPosts(postId: string, categoryId: string, lang: 'ar' | 'en', limit: number = 3): Promise<BlogPost[]> {
  try {
    const { data: postsData, error: postsError } = await supabase
      .from('blog_posts')
      .select(`
        id,
        category_id,
        slug,
        published_at,
        image_url,
        author_name,
        created_at,
        blog_post_translations!inner(title, meta_description, keywords),
        blog_post_tags(blog_tags(id, slug, blog_tag_translations(name)))
      `)
      .eq('category_id', categoryId)
      .neq('id', postId)
      .eq('blog_post_translations.lang', lang)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (postsError) {
      console.error('Error fetching related posts:', postsError);
      return [];
    }

    return (postsData || []).map(post => {
      const translation = post.blog_post_translations[0];
      const tags: BlogTag[] = (post.blog_post_tags || []).map((pt: any) => ({
        id: pt.blog_tags.id,
        slug: pt.blog_tags.slug,
        name: pt.blog_tags.blog_tag_translations[0]?.name || '',
        created_at: ''
      }));

      return {
        id: post.id,
        category_id: post.category_id,
        slug: post.slug,
        title: translation?.title || '',
        content: '',
        meta_description: translation?.meta_description || '',
        keywords: translation?.keywords || '',
        published_at: post.published_at,
        image_url: post.image_url,
        author_name: post.author_name,
        created_at: post.created_at,
        tags
      };
    });
  } catch (error) {
    console.error('Error in fetchRelatedPosts:', error);
    return [];
  }
}

// Clear cache functions for manual cache invalidation
export function clearBlogCache() {
  blogCache.clear();
  blogPostCache.clear();
  console.log('Blog cache cleared successfully');
}