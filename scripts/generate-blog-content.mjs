import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Validate environment variables
const supabaseUrl = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Environment Variables Check:');
console.log('SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET');
console.log('SUPABASE_ANON_KEY:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NOT SET');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'SET' : 'NOT SET');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Please check your .env file.');
  console.error('Required variables: SUPABASE_URL and SUPABASE_ANON_KEY');
  console.error('');
  console.error('To fix this:');
  console.error('1. Go to your Supabase project dashboard');
  console.error('2. Navigate to Settings > API');
  console.error('3. Copy your Project URL and anon public key');
  console.error('4. Update the .env file with your actual credentials');
  process.exit(1);
}

// Validate Supabase URL format
try {
  new URL(supabaseUrl);
  if (!supabaseUrl.includes('.supabase.co')) {
    throw new Error('Invalid Supabase URL format');
  }
} catch (error) {
  console.error('❌ Invalid Supabase URL format:', supabaseUrl);
  console.error('Expected format: https://your-project-id.supabase.co');
  console.error('Please update your .env file with the correct Supabase URL');
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
  console.error('❌ Missing or invalid OpenAI API key. Please add OPENAI_API_KEY to your .env file.');
  console.error('Get your API key from: https://platform.openai.com/api-keys');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client with improved error handling and connection management
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    },
    fetch: (url, options = {}) => {
      console.log(`🌐 Making request to: ${url.replace(supabaseUrl, '[SUPABASE_URL]')}`);
      
      // Add timeout and connection management
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // Increased to 45 seconds
      
      // Ensure headers are properly set for all requests
      const headers = {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'User-Agent': 'blog-generator/1.0',
        'Connection': 'keep-alive',
        'Keep-Alive': 'timeout=30, max=100',
        ...options.headers
      };
      
      // Ensure body is properly stringified for POST, PATCH, PUT requests
      let body = options.body;
      if (body && typeof body === 'object' && !(body instanceof FormData)) {
        body = JSON.stringify(body);
      }
      
      return fetch(url, {
        ...options,
        headers,
        body,
        signal: controller.signal,
        // Add connection management options
        keepalive: true,
        // Increase timeout for slow connections
        timeout: 45000
      }).then(response => {
        clearTimeout(timeoutId);
        return response;
      }).catch(error => {
        clearTimeout(timeoutId);
        console.error('❌ Fetch error details:', {
          url: url.replace(supabaseUrl, '[SUPABASE_URL]'),
          error: error.message,
          name: error.name,
          cause: error.cause,
          stack: error.stack?.split('\n')[0] // Only first line of stack
        });
        
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please check your internet connection and Supabase project status');
        }
        
        // Handle specific socket errors
        if (error.message.includes('other side closed') || 
            error.message.includes('socket hang up') ||
            error.message.includes('ECONNRESET')) {
          throw new Error('Connection lost - network or server issue detected');
        }
        
        throw error;
      });
    }
  }
});

// Enhanced retry mechanism with exponential backoff and better error handling
async function retryWithBackoff(operation, maxRetries = 5, baseDelay = 2000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await operation();
      if (attempt > 1) {
        console.log(`✅ Operation succeeded on attempt ${attempt}`);
      }
      return result;
    } catch (error) {
      lastError = error;
      
      // Check if this is a retryable error
      const isRetryable = 
        error.message.includes('fetch failed') ||
        error.message.includes('network') ||
        error.message.includes('timeout') ||
        error.message.includes('SocketError') ||
        error.message.includes('other side closed') ||
        error.message.includes('socket hang up') ||
        error.message.includes('ECONNRESET') ||
        error.message.includes('Connection lost') ||
        error.name === 'AbortError' ||
        error.name === 'TypeError';
      
      if (!isRetryable || attempt === maxRetries) {
        console.error(`❌ Operation failed after ${attempt} attempts`);
        throw error;
      }
      
      // Exponential backoff with jitter to avoid thundering herd
      const jitter = Math.random() * 1000;
      const delay = (baseDelay * Math.pow(2, attempt - 1)) + jitter;
      
      console.log(`⚠️ Attempt ${attempt}/${maxRetries} failed, retrying in ${Math.round(delay)}ms...`);
      console.log(`   Error: ${error.message}`);
      
      // Add a longer delay for connection-related errors
      if (error.message.includes('other side closed') || error.message.includes('Connection lost')) {
        console.log('   🔄 Connection issue detected, adding extra delay...');
        await new Promise(resolve => setTimeout(resolve, delay + 3000));
      } else {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

// Define blog topics
const englishTopics = [
  {
    slug: 'odoo-vs-sap-comparison-guide',
    title: 'Odoo vs SAP: A Comprehensive Comparison Guide for Saudi Businesses (2025)',
    category: 'erp-comparison',
    image_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    author_name: 'ToDoOps Team',
    tags: ['odoo', 'erp', 'comparison', 'saudi-arabia']
  },
  {
    slug: 'odoo-vs-oracle-netsuite-which-is-better',
    title: 'Odoo vs Oracle NetSuite: Which ERP is Better for Your Saudi Business?',
    category: 'erp-comparison',
    image_url: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg',
    author_name: 'ToDoOps Team',
    tags: ['odoo', 'erp', 'comparison', 'saudi-arabia']
  },
  {
    slug: 'top-10-odoo-features-for-saudi-businesses',
    title: 'Top 10 Odoo Features That Saudi Businesses Need in 2025',
    category: 'odoo-features',
    image_url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    author_name: 'ToDoOps Team',
    tags: ['odoo', 'business-management', 'saudi-arabia']
  },
  {
    slug: 'odoo-manufacturing-module-complete-guide',
    title: 'Odoo Manufacturing Module: A Complete Guide for Saudi Industries',
    category: 'odoo-features',
    image_url: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
    author_name: 'ToDoOps Team',
    tags: ['odoo', 'manufacturing', 'saudi-arabia']
  },
  {
    slug: 'odoo-implementation-timeline-what-to-expect',
    title: 'Odoo Implementation Timeline: What to Expect When Deploying in Saudi Arabia',
    category: 'implementation-guide',
    image_url: 'https://images.pexels.com/photos/7376/startup-photos.jpg',
    author_name: 'ToDoOps Team',
    tags: ['odoo', 'implementation', 'saudi-arabia']
  }
];

const arabicTopics = [
  {
    slug: 'مقارنة-بين-اودو-وساب-دليل-شامل',
    title: 'مقارنة بين اودو وSAP: دليل شامل للشركات السعودية (2025)',
    category: 'erp-comparison',
    image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    author_name: 'فريق ToDoOps',
    tags: ['odoo', 'erp', 'comparison', 'saudi-arabia']
  },
  {
    slug: 'اودو-مقابل-مايكروسوفت-داينامكس-ايهما-افضل',
    title: 'اودو مقابل مايكروسوفت داينامكس: أيهما أفضل لشركتك السعودية؟',
    category: 'erp-comparison',
    image_url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    author_name: 'فريق ToDoOps',
    tags: ['odoo', 'erp', 'comparison', 'saudi-arabia']
  },
  {
    slug: 'اهم-10-ميزات-في-اودو-للشركات-السعودية',
    title: 'أهم 10 ميزات في اودو تحتاجها الشركات السعودية في 2025',
    category: 'odoo-features',
    image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    author_name: 'فريق ToDoOps',
    tags: ['odoo', 'business-management', 'saudi-arabia']
  },
  {
    slug: 'دليل-شامل-لوحدة-التصنيع-في-اودو',
    title: 'دليل شامل لوحدة التصنيع في اودو للصناعات السعودية',
    category: 'odoo-features',
    image_url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',
    author_name: 'فريق ToDoOps',
    tags: ['odoo', 'manufacturing', 'saudi-arabia']
  },
  {
    slug: 'الجدول-الزمني-لتنفيذ-اودو-ماذا-تتوقع',
    title: 'الجدول الزمني لتنفيذ اودو: ماذا تتوقع عند التطبيق في السعودية',
    category: 'implementation-guide',
    image_url: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg',
    author_name: 'فريق ToDoOps',
    tags: ['odoo', 'implementation', 'saudi-arabia']
  }
];

// Function to test Supabase connection with enhanced error reporting
async function testSupabaseConnection() {
  console.log('🔗 Testing Supabase connection...');
  
  try {
    const result = await retryWithBackoff(async () => {
      const { data, error, status, statusText } = await supabase
        .from('blog_categories')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('❌ Supabase query error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          status,
          statusText
        });
        
        // Provide specific guidance based on error type
        if (error.message.includes('fetch failed') || 
            error.message.includes('network') ||
            error.message.includes('other side closed')) {
          console.error('');
          console.error('🔧 Connection troubleshooting:');
          console.error('1. Check your internet connection stability');
          console.error('2. Verify your Supabase project is active and not paused');
          console.error('3. Confirm your Supabase URL and API key are correct');
          console.error('4. Try accessing your Supabase dashboard to ensure the service is available');
          console.error('5. Check if you are behind a firewall or proxy that might block connections');
        }
        
        throw error;
      }
      
      return { data, error, status, statusText };
    }, 3, 3000); // 3 retries with 3 second base delay for connection test
    
    console.log('✅ Supabase connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed after retries:', {
      name: error.name,
      message: error.message,
      cause: error.cause
    });
    
    if (error.message.includes('timeout') || 
        error.name === 'AbortError' ||
        error.message.includes('Connection lost')) {
      console.error('');
      console.error('🔧 Connection troubleshooting:');
      console.error('1. Check your internet connection stability');
      console.error('2. Verify your Supabase project region and try again');
      console.error('3. Consider running the script during off-peak hours');
      console.error('4. Try connecting to your Supabase dashboard directly');
      console.error('5. Check Supabase status at https://status.supabase.com/');
    }
    
    return false;
  }
}

// Function to generate article content using OpenAI
async function generateArticleContent(topic, language) {
  try {
    console.log(`Generating ${language} content for: ${topic.title}`);
    
    const systemPrompt = language === 'en' 
      ? "You are an expert in Odoo ERP systems and business software implementation in Saudi Arabia. Write a comprehensive, informative article that provides valuable insights for decision-makers considering Odoo ERP. Use proper SEO structure with H2 and H3 headings, paragraphs, bullet points, and internal links. Include specific information relevant to Saudi businesses, such as localization, compliance with local regulations, and integration with Saudi systems. The article should be 1,500 words, professional in tone, and highly informative."
      : "أنت خبير في أنظمة أودو ERP وتنفيذ برامج الأعمال في المملكة العربية السعودية. اكتب مقالاً شاملاً ومفيداً يقدم رؤى قيمة لصناع القرار الذين يفكرون في نظام أودو ERP. استخدم هيكل SEO المناسب مع عناوين H2 وH3 وفقرات ونقاط وروابط داخلية. قم بتضمين معلومات محددة ذات صلة بالشركات السعودية، مثل التوطين والامتثال للوائح المحلية والتكامل مع الأنظمة السعودية. يجب أن يكون المقال 1500 كلمة، بنبرة احترافية، وغني بالمعلومات.";
    
    const userPrompt = language === 'en'
      ? `Write a comprehensive article with the title "${topic.title}". The article should be about Odoo ERP implementation in Saudi Arabia, focusing on the specific topic in the title. Include practical advice, comparisons where relevant, and specific information for Saudi businesses. The primary keyword is "Odoo" and it should be used naturally throughout the article. Include internal links using placeholder URLs like "/services/odoo-implementation" or "/contact". The article should be 1,500 words with proper H2 and H3 headings.`
      : `اكتب مقالاً شاملاً بعنوان "${topic.title}". يجب أن يكون المقال حول تنفيذ نظام أودو ERP في المملكة العربية السعودية، مع التركيز على الموضوع المحدد في العنوان. قم بتضمين نصائح عملية، ومقارنات حيثما كان ذلك مناسباً، ومعلومات محددة للشركات السعودية. الكلمة الرئيسية هي "أودو" ويجب استخدامها بشكل طبيعي في جميع أنحاء المقال. قم بتضمين روابط داخلية باستخدام عناوين URL مثل "/services/odoo-implementation" أو "/contact". يجب أن يكون المقال 1500 كلمة مع عناوين H2 وH3 مناسبة.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    });

    const content = completion.choices[0].message.content;
    
    // Generate meta description and keywords
    const seoPrompt = language === 'en'
      ? `For the article titled "${topic.title}", create:
         1. A compelling meta description of 150-160 characters that includes the primary keyword "Odoo" and encourages clicks
         2. A list of 8-10 relevant SEO keywords separated by commas, including "Odoo", "Saudi Arabia", and other relevant terms`
      : `للمقال بعنوان "${topic.title}"، قم بإنشاء:
         1. وصف ميتا جذاب من 150-160 حرفًا يتضمن الكلمة الرئيسية "أودو" ويشجع على النقر
         2. قائمة من 8-10 كلمات مفتاحية SEO ذات صلة مفصولة بفواصل، بما في ذلك "أودو"، "السعودية"، ومصطلحات أخرى ذات صلة`;

    const seoCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an SEO expert specializing in creating meta descriptions and keyword lists for articles about Odoo ERP and business software." },
        { role: "user", content: seoPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const seoText = seoCompletion.choices[0].message.content;
    const metaDescriptionMatch = seoText.match(/1\.\s*(.*?)(?=\n2\.|\n\n|$)/s);
    const keywordsMatch = seoText.match(/2\.\s*(.*?)(?=\n\n|$)/s);
    
    const metaDescription = metaDescriptionMatch ? metaDescriptionMatch[1].trim() : '';
    const keywords = keywordsMatch ? keywordsMatch[1].trim() : '';

    return {
      content,
      meta_description: metaDescription,
      keywords
    };
  } catch (error) {
    console.error(`Error generating content for ${topic.title}:`, error);
    return {
      content: `<h2>Placeholder Content</h2><p>This is a placeholder for the article "${topic.title}". The content generation failed and will be retried later.</p>`,
      meta_description: `Learn about ${topic.title} in Saudi Arabia. Comprehensive guide for businesses considering Odoo ERP implementation.`,
      keywords: 'odoo, erp, saudi arabia, business software'
    };
  }
}

// Enhanced function to insert a blog post with better error handling
async function insertBlogPost(post) {
  try {
    console.log(`Processing blog post: ${post.slug}`);
    
    // 1. Check if post already exists with enhanced retry
    const existingPost = await retryWithBackoff(async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, slug')
        .eq('slug', post.slug)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking existing post:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      return data;
    }, 5, 2000); // 5 retries with 2 second base delay
    
    let post_id;
    
    if (existingPost) {
      console.log(`Post with slug "${post.slug}" already exists. Updating...`);
      post_id = existingPost.id;
      
      // Update the existing post with enhanced retry
      await retryWithBackoff(async () => {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            category_id: post.category_id,
            image_url: post.image_url,
            author_name: post.author_name
          })
          .eq('id', post_id);
        
        if (error) {
          console.error('Error updating blog post:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        
        return { error };
      }, 5, 2000);
    } else {
      // Insert new post with enhanced retry
      const postData = await retryWithBackoff(async () => {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([{
            category_id: post.category_id,
            slug: post.slug,
            image_url: post.image_url,
            author_name: post.author_name
          }])
          .select();
        
        if (error) {
          console.error('Error inserting blog post:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        
        return data;
      }, 5, 2000);
      
      post_id = postData[0].id;
    }
    
    // 2. Insert or update translations with enhanced retry
    for (const [lang, translation] of Object.entries(post.translations)) {
      // Check if translation exists
      const existingTranslation = await retryWithBackoff(async () => {
        const { data, error } = await supabase
          .from('blog_post_translations')
          .select('post_id, lang')
          .eq('post_id', post_id)
          .eq('lang', lang)
          .maybeSingle();
        
        if (error) {
          console.error(`Error checking ${lang} translation:`, {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        
        return data;
      }, 5, 2000);
      
      if (existingTranslation) {
        // Update existing translation
        await retryWithBackoff(async () => {
          const { error } = await supabase
            .from('blog_post_translations')
            .update({
              title: translation.title,
              content: translation.content,
              meta_description: translation.meta_description,
              keywords: translation.keywords
            })
            .eq('post_id', post_id)
            .eq('lang', lang);
          
          if (error) {
            console.error(`Error updating ${lang} translation:`, {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code
            });
            throw error;
          }
          
          return { error };
        }, 5, 2000);
        
        console.log(`Updated ${lang} translation for post: ${post.slug}`);
      } else {
        // Insert new translation
        await retryWithBackoff(async () => {
          const { error } = await supabase
            .from('blog_post_translations')
            .insert([{
              post_id,
              lang,
              title: translation.title,
              content: translation.content,
              meta_description: translation.meta_description,
              keywords: translation.keywords
            }]);
          
          if (error) {
            console.error(`Error inserting ${lang} translation:`, {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code
            });
            throw error;
          }
          
          return { error };
        }, 5, 2000);
        
        console.log(`Inserted ${lang} translation for post: ${post.slug}`);
      }
    }
    
    // 3. Insert tags with enhanced retry
    if (post.tags && post.tags.length > 0) {
      // First, remove existing tag relationships
      await retryWithBackoff(async () => {
        const { error } = await supabase
          .from('blog_post_tags')
          .delete()
          .eq('post_id', post_id);
        
        // Don't throw error if no existing tags to delete
        if (error && !error.message.includes('No rows found')) {
          console.error('Error removing existing tags:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }
        
        return { error };
      }, 3, 1000); // Fewer retries for delete operation
      
      // Then insert new tag relationships
      for (const tagSlug of post.tags) {
        try {
          const tagData = await retryWithBackoff(async () => {
            const { data, error } = await supabase
              .from('blog_tags')
              .select('id')
              .eq('slug', tagSlug)
              .maybeSingle();
            
            if (error) {
              console.error(`Error fetching tag "${tagSlug}":`, {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
              });
              throw error;
            }
            
            return data;
          }, 3, 1000);
          
          if (!tagData) {
            console.warn(`Tag "${tagSlug}" not found, skipping...`);
            continue;
          }
          
          const tag_id = tagData.id;
          
          await retryWithBackoff(async () => {
            const { error } = await supabase
              .from('blog_post_tags')
              .insert([{
                post_id,
                tag_id
              }]);
            
            if (error) {
              console.error(`Error inserting tag relation for "${tagSlug}":`, {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
              });
              throw error;
            }
            
            return { error };
          }, 3, 1000);
        } catch (error) {
          console.warn(`Failed to process tag "${tagSlug}" after retries, skipping...`);
          // Continue with next tag instead of failing the entire post
          continue;
        }
      }
    }
    
    console.log(`✅ Successfully processed blog post: ${post.slug}`);
    return post_id;
  } catch (error) {
    console.error('❌ Error in insertBlogPost:', {
      name: error.name,
      message: error.message,
      cause: error.cause,
      post_slug: post.slug
    });
    
    // Re-throw connection errors to stop execution
    if (error.message.includes('Connection failed') || 
        error.message.includes('Connection lost') ||
        error.message.includes('other side closed')) {
      throw error;
    }
    
    return null;
  }
}

// Main function to process all blog posts with enhanced error handling
async function processAllBlogPosts() {
  console.log('🚀 Starting blog content generation...');
  
  // Test Supabase connection first
  const connectionSuccess = await testSupabaseConnection();
  if (!connectionSuccess) {
    console.error('❌ Cannot proceed without a working Supabase connection.');
    console.error('');
    console.error('🔧 To fix this issue:');
    console.error('1. Go to your Supabase project dashboard (https://supabase.com/dashboard)');
    console.error('2. Navigate to Settings > API');
    console.error('3. Copy your Project URL and anon public key');
    console.error('4. Update the .env file with your actual credentials:');
    console.error('   SUPABASE_URL=https://your-project-id.supabase.co');
    console.error('   SUPABASE_ANON_KEY=your-actual-anon-key');
    console.error('5. Ensure your Supabase project is active and not paused');
    console.error('6. Check Supabase status at https://status.supabase.com/');
    console.error('');
    process.exit(1);
  }
  
  try {
    // Get all categories with enhanced retry
    const categories = await retryWithBackoff(async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('id, slug');
      
      if (error) {
        console.error('Error fetching categories:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      return data;
    }, 5, 3000);
    
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });
    
    console.log('📋 Available categories:', Object.keys(categoryMap));
    
    // Process English topics
    console.log(`📝 Processing ${englishTopics.length} English blog posts...`);
    for (const topic of englishTopics) {
      const category_id = categoryMap[topic.category];
      if (!category_id) {
        console.error(`Category "${topic.category}" not found for post "${topic.slug}"`);
        continue;
      }
      
      try {
        // Generate content using OpenAI
        const { content, meta_description, keywords } = await generateArticleContent(topic, 'en');
        
        const post = {
          category_id,
          slug: topic.slug,
          image_url: topic.image_url,
          author_name: topic.author_name || 'ToDoOps Team',
          translations: {
            en: {
              title: topic.title,
              content,
              meta_description,
              keywords
            }
          },
          tags: topic.tags
        };
        
        await insertBlogPost(post);
        
        // Add a longer delay between posts to reduce connection stress
        console.log('⏳ Waiting before processing next post...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`❌ Failed to process English topic "${topic.slug}":`, error.message);
        if (error.message.includes('Connection failed') || 
            error.message.includes('Connection lost') ||
            error.message.includes('other side closed')) {
          console.error('🔄 Connection issue detected, stopping execution to prevent further errors');
          throw error; // Re-throw connection errors to stop execution
        }
        // Continue with next topic for other errors
        console.log('⏭️ Continuing with next topic...');
        continue;
      }
    }
    
    // Add a longer break between English and Arabic processing
    console.log('⏸️ Taking a break before processing Arabic posts...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Process Arabic topics
    console.log(`📝 Processing ${arabicTopics.length} Arabic blog posts...`);
    for (const topic of arabicTopics) {
      const category_id = categoryMap[topic.category];
      if (!category_id) {
        console.error(`Category "${topic.category}" not found for post "${topic.slug}"`);
        continue;
      }
      
      try {
        // Generate content using OpenAI
        const { content, meta_description, keywords } = await generateArticleContent(topic, 'ar');
        
        const post = {
          category_id,
          slug: topic.slug,
          image_url: topic.image_url,
          author_name: topic.author_name || 'فريق ToDoOps',
          translations: {
            ar: {
              title: topic.title,
              content,
              meta_description,
              keywords
            }
          },
          tags: topic.tags
        };
        
        await insertBlogPost(post);
        
        // Add a longer delay between posts to reduce connection stress
        console.log('⏳ Waiting before processing next post...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`❌ Failed to process Arabic topic "${topic.slug}":`, error.message);
        if (error.message.includes('Connection failed') || 
            error.message.includes('Connection lost') ||
            error.message.includes('other side closed')) {
          console.error('🔄 Connection issue detected, stopping execution to prevent further errors');
          throw error; // Re-throw connection errors to stop execution
        }
        // Continue with next topic for other errors
        console.log('⏭️ Continuing with next topic...');
        continue;
      }
    }
    
    console.log('🎉 Blog content generation completed successfully!');
  } catch (error) {
    console.error('❌ Fatal error during blog processing:', error.message);
    console.error('');
    console.error('🔧 If this is a connection issue:');
    console.error('1. Check your internet connection stability');
    console.error('2. Verify your Supabase project is active and healthy');
    console.error('3. Confirm your Supabase credentials are correct');
    console.error('4. Check Supabase status at https://status.supabase.com/');
    console.error('5. Try running the script again in a few minutes');
    console.error('6. Consider running during off-peak hours for better connectivity');
    process.exit(1);
  }
}

// Run the main function with global error handling
processAllBlogPosts().catch(error => {
  console.error('❌ Fatal error in processAllBlogPosts:', {
    name: error.name,
    message: error.message,
    cause: error.cause
  });
  
  console.error('');
  console.error('🔧 Troubleshooting steps:');
  console.error('1. Verify your internet connection is stable');
  console.error('2. Check your Supabase project status and credentials');
  console.error('3. Try running the script again after a few minutes');
  console.error('4. If the issue persists, check Supabase status page');
  
  process.exit(1);
});