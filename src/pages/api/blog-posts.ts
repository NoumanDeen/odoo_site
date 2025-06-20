import type { APIRoute } from 'astro';
import { fetchBlogData } from '../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '6'); // Default to 6 posts per page
    const lang = url.searchParams.get('lang') as 'ar' | 'en' || 'ar';
    const stage = url.searchParams.get('stage') || undefined;
    const topic = url.searchParams.get('topic') || undefined;
    const tagsParam = url.searchParams.get('tags');
    const tags = tagsParam ? tagsParam.split(',') : undefined;
    const search = url.searchParams.get('search') || undefined;

    // Debug log for API request
    console.log(`[API DEBUG] Fetching blog posts with page=${page}, pageSize=${pageSize}, lang=${lang}`);
    console.log(`[API DEBUG] Filters: stage=${stage}, topic=${topic}, tags=${tags?.join(',')}, search=${search}`);

    // Fetch blog data with pagination and filters
    const blogData = await fetchBlogData(lang, page, pageSize, {
      stage,
      topic,
      tags,
      search
    });

    console.log(`[API DEBUG] Fetched ${blogData.posts.length} posts out of ${blogData.totalPosts} total`);

    // Return only the necessary data to reduce payload size
    return new Response(
      JSON.stringify({
        posts: blogData.posts.map(post => ({
          ...post,
          // Trim content to reduce payload size
          content: post.content ? post.content.substring(0, 150) + '...' : ''
        })),
        totalPosts: blogData.totalPosts
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=60, stale-while-revalidate=300' // Cache for 1 minute, allow stale content for 5 minutes
        }
      }
    );
  } catch (error) {
    console.error('Error in blog-posts API:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch blog posts',
        posts: [],
        totalPosts: 0
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};