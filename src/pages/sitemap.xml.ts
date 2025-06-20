import { supabase } from '../lib/supabase';
import { fetchBlogData } from '../lib/blog';

interface SitemapItem {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export async function GET() {
  // Create sitemap items array
  const items: SitemapItem[] = [];

  // Add static pages
  const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/en', priority: 0.9 },
    { url: '/about-us', priority: 0.8 },
    { url: '/en/about-us', priority: 0.8 },
    { url: '/services', priority: 0.8 },
    { url: '/en/services', priority: 0.8 },
    { url: '/contact', priority: 0.8 },
    { url: '/en/contact', priority: 0.8 },
    { url: '/faq', priority: 0.7 },
    { url: '/en/faq', priority: 0.7 },
    { url: '/industries', priority: 0.7 },
    { url: '/en/industries', priority: 0.7 },
    { url: '/odoo-apps', priority: 0.7 },
    { url: '/en/odoo-apps', priority: 0.7 },
    { url: '/blog', priority: 0.8 },
    { url: '/en/blog', priority: 0.8 },
  ];

  items.push(...staticPages);

  try {
    // Fetch blog data for both languages
    const [arBlogData, enBlogData] = await Promise.all([
      fetchBlogData('ar'),
      fetchBlogData('en')
    ]);

    // Add blog categories
    arBlogData.categories.forEach(category => {
      items.push({
        url: `/blog/category/${category.slug}`,
        changefreq: 'weekly',
        priority: 0.7
      });
    });

    enBlogData.categories.forEach(category => {
      items.push({
        url: `/en/blog/category/${category.slug}`,
        changefreq: 'weekly',
        priority: 0.7
      });
    });

    // Add individual blog posts
    arBlogData.posts.forEach(post => {
      const lastmod = new Date(post.published_at).toISOString().split('T')[0];
      
      items.push({
        url: `/blog/${post.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.6
      });
    });

    enBlogData.posts.forEach(post => {
      const lastmod = new Date(post.published_at).toISOString().split('T')[0];
      
      items.push({
        url: `/en/blog/${post.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.6
      });
    });
  } catch (error) {
    console.error('Error fetching blog data for sitemap:', error);
  }

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${items.map(item => `  <url>
    <loc>https://todoops.com${item.url}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
    ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ''}
    ${item.priority !== undefined ? `<priority>${item.priority.toFixed(1)}</priority>` : ''}
    <xhtml:link 
      rel="alternate" 
      hreflang="ar" 
      href="https://todoops.com${item.url.startsWith('/en/') ? item.url.replace('/en', '') : item.url}" 
    />
    <xhtml:link 
      rel="alternate" 
      hreflang="en" 
      href="https://todoops.com${!item.url.startsWith('/en/') && item.url !== '/' ? '/en' + item.url : (item.url === '/' ? '/en' : item.url)}" 
    />
    <xhtml:link 
      rel="alternate" 
      hreflang="x-default" 
      href="https://todoops.com${item.url.startsWith('/en/') ? item.url.replace('/en', '') : item.url}" 
    />
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}