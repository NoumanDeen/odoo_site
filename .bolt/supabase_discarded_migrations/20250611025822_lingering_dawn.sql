/*
  # Create multilingual FAQ system

  1. New Tables
    - `faq_categories`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `faq_category_translations`
      - `category_id` (uuid, foreign key)
      - `lang` (text)
      - `name` (text)
      - Primary key: (category_id, lang)
    - `faq_questions`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `order_index` (integer)
      - `created_at` (timestamp)
    - `faq_question_translations`
      - `question_id` (uuid, foreign key)
      - `lang` (text)
      - `question` (text)
      - `answer` (text)
      - Primary key: (question_id, lang)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated write access

  3. Initial Data
    - Sample categories and questions in both Arabic and English
*/

-- Enable uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create faq_categories table
CREATE TABLE IF NOT EXISTS public.faq_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faq_category_translations table
CREATE TABLE IF NOT EXISTS public.faq_category_translations (
  category_id UUID REFERENCES public.faq_categories(id) ON DELETE CASCADE,
  lang TEXT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY (category_id, lang)
);

-- Create faq_questions table
CREATE TABLE IF NOT EXISTS public.faq_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.faq_categories(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create faq_question_translations table
CREATE TABLE IF NOT EXISTS public.faq_question_translations (
  question_id UUID REFERENCES public.faq_questions(id) ON DELETE CASCADE,
  lang TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  PRIMARY KEY (question_id, lang)
);

-- Enable Row Level Security
ALTER TABLE public.faq_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_question_translations ENABLE ROW LEVEL SECURITY;

-- Create policies for faq_categories
CREATE POLICY "Allow public read access to faq_categories"
  ON public.faq_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to faq_categories"
  ON public.faq_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to faq_categories"
  ON public.faq_categories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to faq_categories"
  ON public.faq_categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for faq_category_translations
CREATE POLICY "Allow public read access to faq_category_translations"
  ON public.faq_category_translations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to faq_category_translations"
  ON public.faq_category_translations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to faq_category_translations"
  ON public.faq_category_translations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to faq_category_translations"
  ON public.faq_category_translations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for faq_questions
CREATE POLICY "Allow public read access to faq_questions"
  ON public.faq_questions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to faq_questions"
  ON public.faq_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to faq_questions"
  ON public.faq_questions
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to faq_questions"
  ON public.faq_questions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for faq_question_translations
CREATE POLICY "Allow public read access to faq_question_translations"
  ON public.faq_question_translations
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert access to faq_question_translations"
  ON public.faq_question_translations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access to faq_question_translations"
  ON public.faq_question_translations
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete access to faq_question_translations"
  ON public.faq_question_translations
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert initial categories
INSERT INTO public.faq_categories (slug) VALUES
  ('general'),
  ('technical'),
  ('implementation'),
  ('pricing'),
  ('support')
ON CONFLICT (slug) DO NOTHING;

-- Insert category translations
INSERT INTO public.faq_category_translations (category_id, lang, name) VALUES
  ((SELECT id FROM public.faq_categories WHERE slug = 'general'), 'en', 'General Questions'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'general'), 'ar', 'أسئلة عامة'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'technical'), 'en', 'Technical Support'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'technical'), 'ar', 'الدعم الفني'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'implementation'), 'en', 'Implementation Process'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'implementation'), 'ar', 'عملية التنفيذ'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'pricing'), 'en', 'Pricing & Licensing'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'pricing'), 'ar', 'الأسعار والتراخيص'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'support'), 'en', 'Support & Training'),
  ((SELECT id FROM public.faq_categories WHERE slug = 'support'), 'ar', 'الدعم والتدريب')
ON CONFLICT (category_id, lang) DO NOTHING;

-- Insert sample questions for General category
INSERT INTO public.faq_questions (category_id, order_index) VALUES
  ((SELECT id FROM public.faq_categories WHERE slug = 'general'), 1),
  ((SELECT id FROM public.faq_categories WHERE slug = 'general'), 2),
  ((SELECT id FROM public.faq_categories WHERE slug = 'general'), 3);

-- Insert sample questions for Technical category
INSERT INTO public.faq_questions (category_id, order_index) VALUES
  ((SELECT id FROM public.faq_categories WHERE slug = 'technical'), 1),
  ((SELECT id FROM public.faq_categories WHERE slug = 'technical'), 2);

-- Insert sample questions for Implementation category
INSERT INTO public.faq_questions (category_id, order_index) VALUES
  ((SELECT id FROM public.faq_categories WHERE slug = 'implementation'), 1),
  ((SELECT id FROM public.faq_categories WHERE slug = 'implementation'), 2);

-- Insert sample questions for Pricing category
INSERT INTO public.faq_questions (category_id, order_index) VALUES
  ((SELECT id FROM public.faq_categories WHERE slug = 'pricing'), 1),
  ((SELECT id FROM public.faq_categories WHERE slug = 'pricing'), 2);

-- Insert sample questions for Support category
INSERT INTO public.faq_questions (category_id, order_index) VALUES
  ((SELECT id FROM public.faq_categories WHERE slug = 'support'), 1),
  ((SELECT id FROM public.faq_categories WHERE slug = 'support'), 2);

-- Insert question translations for General category
DO $$
DECLARE
  general_q1_id UUID;
  general_q2_id UUID;
  general_q3_id UUID;
BEGIN
  -- Get question IDs for general category
  SELECT id INTO general_q1_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'general') 
  AND order_index = 1;
  
  SELECT id INTO general_q2_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'general') 
  AND order_index = 2;
  
  SELECT id INTO general_q3_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'general') 
  AND order_index = 3;

  -- Insert translations
  INSERT INTO public.faq_question_translations (question_id, lang, question, answer) VALUES
    (general_q1_id, 'en', 'What is Odoo?', 'Odoo is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, manufacturing, warehouse, project management, and more. It''s designed to help businesses streamline their operations and improve efficiency.'),
    (general_q1_id, 'ar', 'ما هو أودو؟', 'أودو هو مجموعة من تطبيقات الأعمال مفتوحة المصدر التي تغطي جميع احتياجات شركتك: إدارة علاقات العملاء، التجارة الإلكترونية، المحاسبة، التصنيع، إدارة المستودعات، إدارة المشاريع، والمزيد. تم تصميمه لمساعدة الشركات على تبسيط عملياتها وتحسين الكفاءة.'),
    
    (general_q2_id, 'en', 'How can I book a free consultation?', 'You can book a free consultation by filling out the contact form on our website, calling us directly, or contacting us via WhatsApp. Our team will schedule a convenient time to discuss your business needs and how Odoo can help you grow.'),
    (general_q2_id, 'ar', 'كيف يمكنني حجز استشارة مجانية؟', 'يمكنك حجز استشارة مجانية عن طريق ملء نموذج الاتصال على موقعنا الإلكتروني، أو الاتصال بنا مباشرة، أو التواصل معنا عبر الواتساب. سيقوم فريقنا بجدولة وقت مناسب لمناقشة احتياجات عملك وكيف يمكن لأودو أن يساعدك على النمو.'),
    
    (general_q3_id, 'en', 'Why choose Odoo Implementer as your partner?', 'We are real users of Odoo ERP before becoming certified implementers. This gives us unique insights into the challenges and solutions that businesses face. As an official Odoo partner in Saudi Arabia, we provide localized support and understand the specific needs of businesses in the region.'),
    (general_q3_id, 'ar', 'لماذا تختار أودو إمبلمنتور كشريك لك؟', 'نحن مستخدمون حقيقيون لنظام أودو ERP قبل أن نصبح منفذين معتمدين. هذا يمنحنا رؤى فريدة حول التحديات والحلول التي تواجهها الشركات. كشريك أودو الرسمي في المملكة العربية السعودية، نقدم دعمًا محليًا ونفهم الاحتياجات المحددة للشركات في المنطقة.')
  ON CONFLICT (question_id, lang) DO NOTHING;
END $$;

-- Insert question translations for Technical category
DO $$
DECLARE
  tech_q1_id UUID;
  tech_q2_id UUID;
BEGIN
  SELECT id INTO tech_q1_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'technical') 
  AND order_index = 1;
  
  SELECT id INTO tech_q2_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'technical') 
  AND order_index = 2;

  INSERT INTO public.faq_question_translations (question_id, lang, question, answer) VALUES
    (tech_q1_id, 'en', 'Do you provide technical support?', 'Yes, we provide comprehensive technical support including 24/7 assistance, regular system maintenance, updates, and quick issue resolution. Our support team consists of certified Odoo experts who understand both the technical and business aspects of the system.'),
    (tech_q1_id, 'ar', 'هل تقدمون الدعم الفني؟', 'نعم، نحن نقدم دعمًا فنيًا شاملاً يشمل المساعدة على مدار الساعة طوال أيام الأسبوع، والصيانة الدورية للنظام، والتحديثات، وحل المشاكل بسرعة. يتكون فريق الدعم لدينا من خبراء أودو معتمدين يفهمون الجوانب التقنية والتجارية للنظام.'),
    
    (tech_q2_id, 'en', 'Can you integrate Odoo with our existing systems?', 'Absolutely! We specialize in system integration and can connect Odoo with your existing accounting systems, e-commerce platforms, APIs, and other business applications. We ensure smooth data flow and improved operational efficiency across all your systems.'),
    (tech_q2_id, 'ar', 'هل يمكنكم دمج أودو مع أنظمتنا الحالية؟', 'بالطبع! نحن متخصصون في تكامل الأنظمة ويمكننا ربط أودو بأنظمتكم المحاسبية الحالية، ومنصات التجارة الإلكترونية، وواجهات برمجة التطبيقات، وتطبيقات الأعمال الأخرى. نضمن تدفق البيانات بسلاسة وتحسين الكفاءة التشغيلية عبر جميع أنظمتكم.')
  ON CONFLICT (question_id, lang) DO NOTHING;
END $$;

-- Insert question translations for Implementation category
DO $$
DECLARE
  impl_q1_id UUID;
  impl_q2_id UUID;
BEGIN
  SELECT id INTO impl_q1_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'implementation') 
  AND order_index = 1;
  
  SELECT id INTO impl_q2_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'implementation') 
  AND order_index = 2;

  INSERT INTO public.faq_question_translations (question_id, lang, question, answer) VALUES
    (impl_q1_id, 'en', 'How long does Odoo implementation take?', 'The implementation timeline varies depending on your business complexity and requirements. Typically, a basic implementation takes 4-8 weeks, while more complex customizations may take 3-6 months. We provide a detailed timeline after analyzing your specific needs during the consultation phase.'),
    (impl_q1_id, 'ar', 'كم من الوقت يستغرق تنفيذ أودو؟', 'يختلف الجدول الزمني للتنفيذ حسب تعقيد عملك ومتطلباتك. عادة، يستغرق التنفيذ الأساسي 4-8 أسابيع، بينما قد تستغرق التخصيصات الأكثر تعقيدًا 3-6 أشهر. نقدم جدولاً زمنيًا مفصلاً بعد تحليل احتياجاتك المحددة خلال مرحلة الاستشارة.'),
    
    (impl_q2_id, 'en', 'What is included in the implementation process?', 'Our implementation process includes needs analysis, system customization, data migration from your existing systems, user training, testing, go-live support, and post-implementation assistance. We ensure a smooth transition with minimal disruption to your business operations.'),
    (impl_q2_id, 'ar', 'ما الذي يشمله عملية التنفيذ؟', 'تشمل عملية التنفيذ لدينا تحليل الاحتياجات، وتخصيص النظام، ونقل البيانات من أنظمتكم الحالية، وتدريب المستخدمين، والاختبار، ودعم بدء التشغيل، والمساعدة بعد التنفيذ. نضمن انتقالاً سلسًا مع أقل قدر من التعطيل لعمليات عملكم.')
  ON CONFLICT (question_id, lang) DO NOTHING;
END $$;

-- Insert question translations for Pricing category
DO $$
DECLARE
  price_q1_id UUID;
  price_q2_id UUID;
BEGIN
  SELECT id INTO price_q1_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'pricing') 
  AND order_index = 1;
  
  SELECT id INTO price_q2_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'pricing') 
  AND order_index = 2;

  INSERT INTO public.faq_question_translations (question_id, lang, question, answer) VALUES
    (price_q1_id, 'en', 'How much does Odoo cost?', 'Odoo offers flexible pricing options including a free Community version and paid Enterprise versions. Enterprise pricing starts from $31.10 per user per month. Implementation costs vary based on your specific requirements. Contact us for a detailed quote tailored to your business needs.'),
    (price_q1_id, 'ar', 'كم تكلف أودو؟', 'تقدم أودو خيارات تسعير مرنة تشمل إصدار مجتمعي مجاني وإصدارات مؤسسية مدفوعة. يبدأ تسعير المؤسسة من 31.10 دولار لكل مستخدم شهريًا. تختلف تكاليف التنفيذ حسب متطلباتكم المحددة. اتصلوا بنا للحصول على عرض أسعار مفصل مصمم خصيصًا لاحتياجات عملكم.'),
    
    (price_q2_id, 'en', 'Are there any hidden costs?', 'No, we believe in transparent pricing. All costs including licensing, implementation, training, and ongoing support are clearly outlined in our proposals. We provide detailed breakdowns so you know exactly what you''re paying for with no surprises.'),
    (price_q2_id, 'ar', 'هل هناك أي تكاليف خفية؟', 'لا، نحن نؤمن بالتسعير الشفاف. جميع التكاليف بما في ذلك الترخيص والتنفيذ والتدريب والدعم المستمر موضحة بوضوح في مقترحاتنا. نقدم تفاصيل مفصلة حتى تعرفوا بالضبط ما تدفعون مقابله دون مفاجآت.')
  ON CONFLICT (question_id, lang) DO NOTHING;
END $$;

-- Insert question translations for Support category
DO $$
DECLARE
  support_q1_id UUID;
  support_q2_id UUID;
BEGIN
  SELECT id INTO support_q1_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'support') 
  AND order_index = 1;
  
  SELECT id INTO support_q2_id FROM public.faq_questions 
  WHERE category_id = (SELECT id FROM public.faq_categories WHERE slug = 'support') 
  AND order_index = 2;

  INSERT INTO public.faq_question_translations (question_id, lang, question, answer) VALUES
    (support_q1_id, 'en', 'Do you provide training for our team?', 'Yes, we provide comprehensive training programs for both end-users and administrators. Our training includes hands-on sessions, custom documentation, and ongoing support to ensure your team can effectively use all Odoo features relevant to your business.'),
    (support_q1_id, 'ar', 'هل تقدمون التدريب لفريقنا؟', 'نعم، نحن نقدم برامج تدريبية شاملة للمستخدمين النهائيين والمديرين على حد سواء. يشمل تدريبنا جلسات عملية، ووثائق مخصصة، ودعم مستمر لضمان قدرة فريقكم على استخدام جميع ميزات أودو ذات الصلة بعملكم بفعالية.'),
    
    (support_q2_id, 'en', 'What kind of ongoing support do you offer?', 'We offer various support packages including 24/7 technical assistance, regular system health checks, updates and maintenance, user support, and priority response for critical issues. Our goal is to ensure your Odoo system continues to serve your business effectively.'),
    (support_q2_id, 'ar', 'ما نوع الدعم المستمر الذي تقدمونه؟', 'نقدم حزم دعم متنوعة تشمل المساعدة التقنية على مدار الساعة طوال أيام الأسبوع، وفحوصات صحة النظام الدورية، والتحديثات والصيانة، ودعم المستخدمين، والاستجابة ذات الأولوية للمشاكل الحرجة. هدفنا هو ضمان استمرار نظام أودو في خدمة عملكم بفعالية.')
  ON CONFLICT (question_id, lang) DO NOTHING;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_faq_categories_slug ON public.faq_categories(slug);
CREATE INDEX IF NOT EXISTS idx_faq_category_translations_lang ON public.faq_category_translations(lang);
CREATE INDEX IF NOT EXISTS idx_faq_questions_category_order ON public.faq_questions(category_id, order_index);
CREATE INDEX IF NOT EXISTS idx_faq_question_translations_lang ON public.faq_question_translations(lang);