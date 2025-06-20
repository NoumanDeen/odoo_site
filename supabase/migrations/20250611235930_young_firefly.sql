-- Fix the migration by using gen_random_uuid() instead of hardcoded UUIDs
-- This ensures proper UUID generation and avoids foreign key constraint errors

-- Insert blog tags using gen_random_uuid() for proper UUID generation
INSERT INTO blog_tags (id, slug, created_at) VALUES
  (gen_random_uuid(), 'automation', now()),
  (gen_random_uuid(), 'erp', now()),
  (gen_random_uuid(), 'crm', now()),
  (gen_random_uuid(), 'finance', now()),
  (gen_random_uuid(), 'hr', now()),
  (gen_random_uuid(), 'manufacturing', now()),
  (gen_random_uuid(), 'retail', now()),
  (gen_random_uuid(), 'logistics', now()),
  (gen_random_uuid(), 'project-management', now()),
  (gen_random_uuid(), 'odoo', now()),
  (gen_random_uuid(), 'saudi-arabia', now()),
  (gen_random_uuid(), 'انظمة-erp', now()),
  (gen_random_uuid(), 'محاسبة', now()),
  (gen_random_uuid(), 'مبيعات', now()),
  (gen_random_uuid(), 'دعم-فني', now()),
  (gen_random_uuid(), 'business-solutions', now()),
  (gen_random_uuid(), 'implementation', now()),
  (gen_random_uuid(), 'digital-transformation', now()),
  (gen_random_uuid(), 'small-business', now()),
  (gen_random_uuid(), 'enterprise', now())
ON CONFLICT (slug) DO NOTHING;

-- Insert English translations for all tags
-- We need to get the tag IDs first, so we'll use a subquery approach
INSERT INTO blog_tag_translations (tag_id, lang, name)
SELECT id, 'en', 
  CASE slug
    WHEN 'automation' THEN 'Automation'
    WHEN 'erp' THEN 'ERP'
    WHEN 'crm' THEN 'CRM'
    WHEN 'finance' THEN 'Finance'
    WHEN 'hr' THEN 'HR'
    WHEN 'manufacturing' THEN 'Manufacturing'
    WHEN 'retail' THEN 'Retail'
    WHEN 'logistics' THEN 'Logistics'
    WHEN 'project-management' THEN 'Project Management'
    WHEN 'odoo' THEN 'Odoo'
    WHEN 'saudi-arabia' THEN 'Saudi Arabia'
    WHEN 'انظمة-erp' THEN 'ERP Systems'
    WHEN 'محاسبة' THEN 'Accounting'
    WHEN 'مبيعات' THEN 'Sales'
    WHEN 'دعم-فني' THEN 'Technical Support'
    WHEN 'business-solutions' THEN 'Business Solutions'
    WHEN 'implementation' THEN 'Implementation'
    WHEN 'digital-transformation' THEN 'Digital Transformation'
    WHEN 'small-business' THEN 'Small Business'
    WHEN 'enterprise' THEN 'Enterprise'
  END as name
FROM blog_tags
WHERE slug IN (
  'automation', 'erp', 'crm', 'finance', 'hr', 'manufacturing', 'retail', 
  'logistics', 'project-management', 'odoo', 'saudi-arabia', 'انظمة-erp', 
  'محاسبة', 'مبيعات', 'دعم-فني', 'business-solutions', 'implementation', 
  'digital-transformation', 'small-business', 'enterprise'
)
ON CONFLICT (tag_id, lang) DO NOTHING;

-- Insert Arabic translations for all tags
INSERT INTO blog_tag_translations (tag_id, lang, name)
SELECT id, 'ar', 
  CASE slug
    WHEN 'automation' THEN 'الأتمتة'
    WHEN 'erp' THEN 'أنظمة ERP'
    WHEN 'crm' THEN 'إدارة علاقات العملاء'
    WHEN 'finance' THEN 'محاسبة'
    WHEN 'hr' THEN 'الموارد البشرية'
    WHEN 'manufacturing' THEN 'التصنيع'
    WHEN 'retail' THEN 'التجزئة'
    WHEN 'logistics' THEN 'الخدمات اللوجستية'
    WHEN 'project-management' THEN 'إدارة المشاريع'
    WHEN 'odoo' THEN 'أودو'
    WHEN 'saudi-arabia' THEN 'السعودية'
    WHEN 'انظمة-erp' THEN 'أنظمة ERP'
    WHEN 'محاسبة' THEN 'محاسبة'
    WHEN 'مبيعات' THEN 'مبيعات'
    WHEN 'دعم-فني' THEN 'دعم فني'
    WHEN 'business-solutions' THEN 'حلول الأعمال'
    WHEN 'implementation' THEN 'التنفيذ'
    WHEN 'digital-transformation' THEN 'التحول الرقمي'
    WHEN 'small-business' THEN 'الشركات الصغيرة'
    WHEN 'enterprise' THEN 'المؤسسات'
  END as name
FROM blog_tags
WHERE slug IN (
  'automation', 'erp', 'crm', 'finance', 'hr', 'manufacturing', 'retail', 
  'logistics', 'project-management', 'odoo', 'saudi-arabia', 'انظمة-erp', 
  'محاسبة', 'مبيعات', 'دعم-فني', 'business-solutions', 'implementation', 
  'digital-transformation', 'small-business', 'enterprise'
)
ON CONFLICT (tag_id, lang) DO NOTHING;