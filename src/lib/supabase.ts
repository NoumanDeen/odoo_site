import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable session persistence for better performance
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'Cache-Control': 'max-age=300', // Cache responses for 5 minutes
    },
  },
});

// Types for our FAQ system
export interface FAQCategory {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

export interface FAQQuestion {
  id: string;
  category_id: string;
  order_index: number;
  question: string;
  answer: string;
  created_at: string;
}

export interface FAQData {
  categories: FAQCategory[];
  questionsByCategory: Record<string, FAQQuestion[]>;
}

// Cache for FAQ data to avoid repeated requests
const faqCache = new Map<string, { data: FAQData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch all FAQ data for a specific language with caching
export async function fetchFAQData(lang: 'ar' | 'en'): Promise<FAQData> {
  const cacheKey = `faq_${lang}`;
  const cached = faqCache.get(cacheKey);
  
  // Return cached data if it's still fresh
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  try {
    // Optimize queries by selecting only necessary fields
    const [categoriesResponse, questionsResponse] = await Promise.all([
      // Fetch categories with translations
      supabase
        .from('faq_categories')
        .select(`
          id,
          slug,
          created_at,
          faq_category_translations!inner(name)
        `)
        .eq('faq_category_translations.lang', lang)
        .order('slug'),
      
      // Fetch questions with translations
      supabase
        .from('faq_questions')
        .select(`
          id,
          category_id,
          order_index,
          created_at,
          faq_question_translations!inner(question, answer)
        `)
        .eq('faq_question_translations.lang', lang)
        .order('category_id, order_index')
    ]);

    const { data: categoriesData, error: categoriesError } = categoriesResponse;
    const { data: questionsData, error: questionsError } = questionsResponse;

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      throw categoriesError;
    }

    if (questionsError) {
      console.error('Error fetching questions:', questionsError);
      throw questionsError;
    }

    // Transform categories data
    const categories: FAQCategory[] = (categoriesData || []).map(cat => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.faq_category_translations[0]?.name || '',
      created_at: cat.created_at
    }));

    // Transform and group questions by category
    const questionsByCategory: Record<string, FAQQuestion[]> = {};
    
    (questionsData || []).forEach(q => {
      const question: FAQQuestion = {
        id: q.id,
        category_id: q.category_id,
        order_index: q.order_index,
        question: q.faq_question_translations[0]?.question || '',
        answer: q.faq_question_translations[0]?.answer || '',
        created_at: q.created_at
      };

      // Find category slug for this question
      const category = categories.find(c => c.id === q.category_id);
      if (category) {
        if (!questionsByCategory[category.slug]) {
          questionsByCategory[category.slug] = [];
        }
        questionsByCategory[category.slug].push(question);
      }
    });

    const result = {
      categories,
      questionsByCategory
    };

    // Cache the result
    faqCache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Error in fetchFAQData:', error);
    
    // Return cached data if available, even if stale
    if (cached) {
      return cached.data;
    }
    
    return {
      categories: [],
      questionsByCategory: {}
    };
  }
}

// Normalize Arabic text by replacing all forms of alif with plain alif
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  
  // Replace all forms of alif (أ, إ, آ) with plain alif (ا)
  return text
    .replace(/[أإآ]/g, 'ا')
    // Remove diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '');
}

// Clear cache functions for manual cache invalidation
export function clearFAQCache() {
  faqCache.clear();
}