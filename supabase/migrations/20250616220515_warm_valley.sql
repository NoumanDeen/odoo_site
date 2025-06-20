/*
  # Add Missing Blog Post Translations

  1. Purpose
    - Ensure all blog posts have translations in both Arabic and English
    - Add placeholder translations for posts that are missing either language
    - Maintain consistent content structure across all posts

  2. Implementation
    - Identify posts missing translations
    - Generate placeholder content for each missing translation
    - Insert translations with appropriate metadata
    - Preserve existing translations
*/

-- First, let's create a temporary table to identify which posts are missing translations
CREATE TEMP TABLE missing_translations AS
WITH all_posts AS (
  SELECT id FROM blog_posts
),
ar_translations AS (
  SELECT post_id FROM blog_post_translations WHERE lang = 'ar'
),
en_translations AS (
  SELECT post_id FROM blog_post_translations WHERE lang = 'en'
),
missing_ar AS (
  SELECT id AS post_id, 'ar' AS lang
  FROM all_posts
  WHERE id NOT IN (SELECT post_id FROM ar_translations)
),
missing_en AS (
  SELECT id AS post_id, 'en' AS lang
  FROM all_posts
  WHERE id NOT IN (SELECT post_id FROM en_translations)
)
SELECT * FROM missing_ar
UNION
SELECT * FROM missing_en;

-- Now insert placeholder translations for Arabic
INSERT INTO blog_post_translations (post_id, lang, title, content, meta_description, keywords)
SELECT 
  post_id,
  'ar',
  -- Generate title based on the post slug
  CASE 
    WHEN p.slug LIKE '%erp%' THEN 'نظام تخطيط موارد المؤسسات (ERP) للشركات السعودية'
    WHEN p.slug LIKE '%odoo%' THEN 'أودو: الحل المتكامل لإدارة الأعمال في السعودية'
    WHEN p.slug LIKE '%implementation%' THEN 'دليل تنفيذ أودو في الشركات السعودية'
    WHEN p.slug LIKE '%saudi%' THEN 'حلول أودو المخصصة للسوق السعودي'
    ELSE 'مقال حول أنظمة إدارة الأعمال في السعودية'
  END,
  -- Generate content with proper HTML structure
  '<h2>مقدمة</h2>
  <p>تواجه الشركات في المملكة العربية السعودية تحديات فريدة في إدارة عملياتها اليومية. مع التحول الرقمي المتسارع ورؤية 2030، أصبح من الضروري الاعتماد على أنظمة متكاملة لإدارة موارد المؤسسات.</p>
  
  <h2>التحديات الرئيسية</h2>
  <p>من أهم التحديات التي تواجه الشركات السعودية:</p>
  <ul>
    <li>إدارة العمليات المتعددة بكفاءة</li>
    <li>الامتثال للمتطلبات التنظيمية المحلية</li>
    <li>تكامل البيانات بين الأقسام المختلفة</li>
    <li>تحسين اتخاذ القرارات بناءً على معلومات دقيقة</li>
  </ul>
  
  <h2>الحلول المتاحة</h2>
  <p>توفر أنظمة تخطيط موارد المؤسسات (ERP) مثل أودو حلولاً متكاملة تساعد الشركات على:</p>
  <ul>
    <li>أتمتة العمليات اليومية</li>
    <li>تحسين التواصل بين الأقسام</li>
    <li>توفير رؤية شاملة لأداء الشركة</li>
    <li>تقليل الأخطاء وزيادة الكفاءة</li>
  </ul>
  
  <h2>الخطوات التالية</h2>
  <p>للاستفادة القصوى من أنظمة ERP، ننصح باتباع الخطوات التالية:</p>
  <ol>
    <li>تقييم احتياجات شركتك الحالية</li>
    <li>اختيار النظام المناسب لحجم ونوع عملك</li>
    <li>التخطيط الجيد لعملية التنفيذ</li>
    <li>تدريب الموظفين على استخدام النظام</li>
    <li>المتابعة المستمرة وتحسين الأداء</li>
  </ol>
  
  <p>للمزيد من المعلومات حول كيفية تطبيق أودو في شركتك، يرجى <a href="/contact">التواصل معنا</a> للحصول على استشارة مجانية.</p>',
  -- Meta description
  'تعرف على كيفية تحسين أداء شركتك في السعودية باستخدام أنظمة إدارة الأعمال المتكاملة. حلول مخصصة للسوق السعودي.',
  -- Keywords
  'ERP, أودو, السعودية, إدارة الأعمال, تخطيط موارد المؤسسات, التحول الرقمي, رؤية 2030'
FROM missing_translations mt
JOIN blog_posts p ON mt.post_id = p.id
WHERE mt.lang = 'ar';

-- Insert placeholder translations for English
INSERT INTO blog_post_translations (post_id, lang, title, content, meta_description, keywords)
SELECT 
  post_id,
  'en',
  -- Generate title based on the post slug
  CASE 
    WHEN p.slug LIKE '%erp%' THEN 'ERP Systems for Saudi Businesses'
    WHEN p.slug LIKE '%odoo%' THEN 'Odoo: Integrated Business Management Solution in Saudi Arabia'
    WHEN p.slug LIKE '%implementation%' THEN 'Odoo Implementation Guide for Saudi Companies'
    WHEN p.slug LIKE '%saudi%' THEN 'Customized Odoo Solutions for the Saudi Market'
    ELSE 'Article on Business Management Systems in Saudi Arabia'
  END,
  -- Generate content with proper HTML structure
  '<h2>Introduction</h2>
  <p>Companies in Saudi Arabia face unique challenges in managing their daily operations. With accelerating digital transformation and Vision 2030, it has become essential to rely on integrated enterprise resource planning systems.</p>
  
  <h2>Key Challenges</h2>
  <p>Some of the main challenges facing Saudi companies include:</p>
  <ul>
    <li>Efficiently managing multiple operations</li>
    <li>Complying with local regulatory requirements</li>
    <li>Integrating data between different departments</li>
    <li>Improving decision-making based on accurate information</li>
  </ul>
  
  <h2>Available Solutions</h2>
  <p>Enterprise Resource Planning (ERP) systems like Odoo provide integrated solutions that help companies:</p>
  <ul>
    <li>Automate daily operations</li>
    <li>Improve communication between departments</li>
    <li>Provide a comprehensive view of company performance</li>
    <li>Reduce errors and increase efficiency</li>
  </ul>
  
  <h2>Next Steps</h2>
  <p>To maximize the benefits of ERP systems, we recommend following these steps:</p>
  <ol>
    <li>Assess your company''s current needs</li>
    <li>Choose the system appropriate for your business size and type</li>
    <li>Plan well for the implementation process</li>
    <li>Train employees on using the system</li>
    <li>Continuous monitoring and performance improvement</li>
  </ol>
  
  <p>For more information on how to implement Odoo in your company, please <a href="/en/contact">contact us</a> for a free consultation.</p>',
  -- Meta description
  'Learn how to improve your company''s performance in Saudi Arabia using integrated business management systems. Customized solutions for the Saudi market.',
  -- Keywords
  'ERP, Odoo, Saudi Arabia, business management, enterprise resource planning, digital transformation, Vision 2030'
FROM missing_translations mt
JOIN blog_posts p ON mt.post_id = p.id
WHERE mt.lang = 'en';

-- Clean up the temporary table
DROP TABLE missing_translations;

-- Add additional indexes to improve blog performance
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_post_id_lang ON blog_post_translations(post_id, lang);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug_published ON blog_posts(slug, published_at DESC);

-- Update statistics to ensure the query planner uses the new indexes
ANALYZE blog_posts;
ANALYZE blog_post_translations;
ANALYZE blog_post_tags;