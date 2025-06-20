/**
 * Utility functions for generating SEO-friendly slugs for blog posts
 * Handles both Arabic and English content with specific rules for each language
 */

/**
 * Normalizes Arabic text by replacing all forms of alif with plain alif
 * @param text The Arabic text to normalize
 */
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  
  // Replace all forms of alif (أ, إ, آ) with plain alif (ا)
  return text
    .replace(/[أإآ]/g, 'ا')
    // Remove diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '');
}

/**
 * Creates an SEO-friendly slug from Arabic text
 * @param text The Arabic text to slugify
 */
export function slugifyArabic(text: string): string {
  if (!text) return '';
  
  // Normalize Arabic text first (replace alifs and remove diacritics)
  const normalized = normalizeArabicText(text);
  
  return normalized
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove punctuation and special characters
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\-]/g, '')
    // Remove filler words (common Arabic words that don't add SEO value)
    .replace(/(\-من\-|\-في\-|\-على\-|\-عن\-|\-الى\-|\-مع\-)/g, '-')
    // Remove duplicate hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Creates an SEO-friendly slug from English text
 * @param text The English text to slugify
 */
export function slugifyEnglish(text: string): string {
  if (!text) return '';
  
  return text
    // Convert to lowercase
    .toLowerCase()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove punctuation and special characters
    .replace(/[^\w\-]+/g, '')
    // Remove duplicate hyphens
    .replace(/-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Creates an SEO-friendly slug based on the language
 * @param text The text to slugify
 * @param lang The language ('ar' for Arabic, 'en' for English)
 */
export function createSlug(text: string, lang: 'ar' | 'en'): string {
  if (!text) return '';
  
  return lang === 'ar' ? slugifyArabic(text) : slugifyEnglish(text);
}

/**
 * Ensures a slug is unique by appending a number if necessary
 * @param baseSlug The original slug
 * @param existingSlugs Array of existing slugs to check against
 */
export function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}