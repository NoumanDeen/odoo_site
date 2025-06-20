/*
  # Blog System Data Population

  1. Categories
    - Insert 3 main blog categories (Awareness, Consideration, Decision)
    - Add translations for both Arabic and English

  2. Tags
    - Insert common blog tags for content organization
    - Add translations for both languages

  3. Sample Posts
    - Insert 25 placeholder blog posts across all categories
    - Add full translations with realistic content
    - Link posts with appropriate tags

  4. Relationships
    - Connect posts with categories and tags
    - Set up proper foreign key relationships
*/

-- Insert blog categories
INSERT INTO blog_categories (id, slug) VALUES
  ('11111111-1111-1111-1111-111111111111', 'awareness'),
  ('22222222-2222-2222-2222-222222222222', 'consideration'),
  ('33333333-3333-3333-3333-333333333333', 'decision')
ON CONFLICT (slug) DO NOTHING;

-- Insert category translations
INSERT INTO blog_category_translations (category_id, lang, name) VALUES
  ('11111111-1111-1111-1111-111111111111', 'ar', 'مرحلة الوعي'),
  ('11111111-1111-1111-1111-111111111111', 'en', 'Awareness Stage'),
  ('22222222-2222-2222-2222-222222222222', 'ar', 'مرحلة البحث والمقارنة'),
  ('22222222-2222-2222-2222-222222222222', 'en', 'Consideration Stage'),
  ('33333333-3333-3333-3333-333333333333', 'ar', 'مرحلة اتخاذ القرار'),
  ('33333333-3333-3333-3333-333333333333', 'en', 'Decision Stage')
ON CONFLICT (category_id, lang) DO NOTHING;

-- Insert blog tags
INSERT INTO blog_tags (id, slug) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'erp'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'odoo'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'business-solutions'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'digital-transformation'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'implementation'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'saudi-arabia'),
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'automation'),
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'productivity')
ON CONFLICT (slug) DO NOTHING;

-- Insert tag translations
INSERT INTO blog_tag_translations (tag_id, lang, name) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ar', 'أنظمة تخطيط الموارد'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'en', 'ERP'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ar', 'أودو'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'en', 'Odoo'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'ar', 'حلول الأعمال'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'en', 'Business Solutions'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'ar', 'التحول الرقمي'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'en', 'Digital Transformation'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ar', 'التنفيذ'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'en', 'Implementation'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'ar', 'المملكة العربية السعودية'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'en', 'Saudi Arabia'),
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'ar', 'الأتمتة'),
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'en', 'Automation'),
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'ar', 'الإنتاجية'),
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'en', 'Productivity')
ON CONFLICT (tag_id, lang) DO NOTHING;

-- Insert placeholder blog posts (25 posts across 3 categories)
INSERT INTO blog_posts (id, category_id, slug, image_url) VALUES
  -- Awareness Stage (8 posts)
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'what-is-erp-system', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'),
  ('a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'signs-your-business-needs-erp', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'),
  ('a3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'benefits-of-erp-for-small-business', 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'),
  ('a4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'digital-transformation-saudi-arabia', 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'),
  ('a5555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'common-business-challenges', 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'),
  ('a6666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'erp-vs-spreadsheets', 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg'),
  ('a7777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'business-process-automation', 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg'),
  ('a8888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'inventory-management-basics', 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg'),
  
  -- Consideration Stage (9 posts)
  ('b1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'odoo-vs-sap-comparison', 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg'),
  ('b2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'odoo-features-overview', 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg'),
  ('b3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'erp-for-construction-companies', 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg'),
  ('b4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'erp-for-manufacturing', 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg'),
  ('b5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'cloud-vs-onpremise-erp', 'https://images.pexels.com/photos/3184421/pexels-photo-3184421.jpeg'),
  ('b6666666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'erp-integration-capabilities', 'https://images.pexels.com/photos/3184440/pexels-photo-3184440.jpeg'),
  ('b7777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 'odoo-modules-explained', 'https://images.pexels.com/photos/3184458/pexels-photo-3184458.jpeg'),
  ('b8888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'erp-roi-calculation', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'),
  ('b9999999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', 'choosing-right-erp-system', 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg'),
  
  -- Decision Stage (8 posts)
  ('c1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'odoo-implementation-process', 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg'),
  ('c2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'odoo-pricing-guide-saudi', 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg'),
  ('c3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'erp-implementation-timeline', 'https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg'),
  ('c4444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 'odoo-training-best-practices', 'https://images.pexels.com/photos/3184308/pexels-photo-3184308.jpeg'),
  ('c5555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'data-migration-to-odoo', 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg'),
  ('c6666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'odoo-support-maintenance', 'https://images.pexels.com/photos/3184314/pexels-photo-3184314.jpeg'),
  ('c7777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'erp-project-success-factors', 'https://images.pexels.com/photos/3184320/pexels-photo-3184320.jpeg'),
  ('c8888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333', 'post-implementation-optimization', 'https://images.pexels.com/photos/3184323/pexels-photo-3184323.jpeg')
ON CONFLICT (slug) DO NOTHING;

-- Insert placeholder post translations (Arabic)
INSERT INTO blog_post_translations (post_id, lang, title, content, meta_description, keywords) VALUES
  -- Awareness Stage - Arabic
  ('a1111111-1111-1111-1111-111111111111', 'ar', 'ما هو نظام تخطيط موارد المؤسسة (ERP)؟', 
   '<h2>مقدمة عن أنظمة ERP</h2><p>نظام تخطيط موارد المؤسسة (ERP) هو حل برمجي متكامل يساعد الشركات على إدارة عملياتها اليومية بكفاءة أكبر. يجمع هذا النظام جميع العمليات التجارية في منصة واحدة موحدة.</p><h2>فوائد أنظمة ERP</h2><p>تشمل الفوائد الرئيسية لأنظمة ERP تحسين الكفاءة التشغيلية، وتقليل التكاليف، وتحسين اتخاذ القرارات من خلال البيانات الدقيقة والمحدثة.</p><h2>كيف تعمل أنظمة ERP</h2><p>تعمل أنظمة ERP من خلال دمج جميع العمليات التجارية في قاعدة بيانات مركزية واحدة، مما يسمح للأقسام المختلفة بالوصول إلى نفس المعلومات والعمل بتناغم.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'تعرف على ما هو نظام تخطيط موارد المؤسسة ERP وكيف يمكن أن يساعد شركتك على تحسين الكفاءة وزيادة الأرباح.',
   'ERP, تخطيط موارد المؤسسة, أنظمة إدارة الأعمال, أودو, السعودية'),
  
  ('a2222222-2222-2222-2222-222222222222', 'ar', 'علامات تدل على أن شركتك تحتاج إلى نظام ERP',
   '<h2>التحديات الشائعة في الأعمال</h2><p>عندما تواجه شركتك صعوبات في تتبع المخزون، أو تجد صعوبة في الحصول على تقارير دقيقة، فقد يكون الوقت مناسباً للتفكير في نظام ERP.</p><h2>علامات الحاجة لنظام ERP</h2><p>من أهم العلامات: استخدام جداول بيانات متعددة، صعوبة في التواصل بين الأقسام، وقضاء وقت مفرط في المهام الإدارية.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'اكتشف العلامات التي تدل على أن شركتك تحتاج إلى نظام ERP لتحسين العمليات وزيادة الكفاءة.',
   'علامات الحاجة لـ ERP, تحديات الأعمال, تحسين العمليات, أودو السعودية'),

  ('a3333333-3333-3333-3333-333333333333', 'ar', 'فوائد أنظمة ERP للشركات الصغيرة والمتوسطة',
   '<h2>لماذا تحتاج الشركات الصغيرة لـ ERP</h2><p>الشركات الصغيرة والمتوسطة تواجه تحديات فريدة في إدارة مواردها المحدودة. أنظمة ERP تساعد هذه الشركات على تحقيق أقصى استفادة من مواردها.</p><h2>الفوائد المباشرة</h2><p>تشمل توفير الوقت، تقليل الأخطاء، تحسين خدمة العملاء، وزيادة الشفافية في العمليات.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'تعرف على كيف يمكن لأنظمة ERP أن تساعد الشركات الصغيرة والمتوسطة في السعودية على النمو والتطور.',
   'ERP للشركات الصغيرة, فوائد ERP, الشركات المتوسطة, أودو السعودية'),

  ('a4444444-4444-4444-4444-444444444444', 'ar', 'التحول الرقمي في المملكة العربية السعودية',
   '<h2>رؤية السعودية 2030 والتحول الرقمي</h2><p>تسعى المملكة العربية السعودية إلى تحقيق التحول الرقمي الشامل كجزء من رؤية 2030، مما يتطلب من الشركات تبني التقنيات الحديثة.</p><h2>دور أنظمة ERP في التحول الرقمي</h2><p>أنظمة ERP تلعب دوراً محورياً في رحلة التحول الرقمي للشركات السعودية.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'اكتشف كيف تساهم أنظمة ERP في تحقيق أهداف التحول الرقمي في المملكة العربية السعودية.',
   'التحول الرقمي السعودية, رؤية 2030, ERP السعودية, التقنيات الحديثة'),

  ('a5555555-5555-5555-5555-555555555555', 'ar', 'التحديات التجارية الشائعة وحلولها',
   '<h2>التحديات الأكثر شيوعاً</h2><p>تواجه الشركات تحديات متنوعة مثل إدارة المخزون، تتبع المبيعات، وإدارة العلاقات مع العملاء.</p><h2>الحلول المتاحة</h2><p>أنظمة ERP توفر حلولاً شاملة لهذه التحديات من خلال الأتمتة والتكامل.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'تعرف على أهم التحديات التجارية الشائعة وكيف يمكن لأنظمة ERP حلها بفعالية.',
   'التحديات التجارية, حلول الأعمال, إدارة المخزون, أتمتة العمليات'),

  ('a6666666-6666-6666-6666-666666666666', 'ar', 'أنظمة ERP مقابل جداول البيانات',
   '<h2>قيود جداول البيانات</h2><p>رغم أن جداول البيانات مفيدة، إلا أنها تصبح محدودة عندما تنمو الشركة وتزداد تعقيداً.</p><h2>مزايا أنظمة ERP</h2><p>أنظمة ERP توفر دقة أكبر، أمان أفضل، وقدرة على التعامل مع كميات كبيرة من البيانات.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'مقارنة شاملة بين استخدام جداول البيانات وأنظمة ERP في إدارة الأعمال.',
   'ERP مقابل Excel, جداول البيانات, إدارة البيانات, أنظمة الأعمال'),

  ('a7777777-7777-7777-7777-777777777777', 'ar', 'أتمتة العمليات التجارية',
   '<h2>ما هي أتمتة العمليات</h2><p>أتمتة العمليات التجارية تعني استخدام التقنية لتنفيذ المهام المتكررة تلقائياً، مما يوفر الوقت ويقلل الأخطاء.</p><h2>فوائد الأتمتة</h2><p>تشمل زيادة الكفاءة، تحسين الدقة، وتوفير الوقت للتركيز على المهام الاستراتيجية.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'تعرف على كيفية أتمتة العمليات التجارية وتحسين كفاءة شركتك باستخدام أنظمة ERP.',
   'أتمتة العمليات, الكفاءة التشغيلية, تحسين الإنتاجية, أودو الأتمتة'),

  ('a8888888-8888-8888-8888-888888888888', 'ar', 'أساسيات إدارة المخزون',
   '<h2>أهمية إدارة المخزون</h2><p>إدارة المخزون الفعالة ضرورية لنجاح أي عمل تجاري، حيث تؤثر على التكاليف وخدمة العملاء.</p><h2>التحديات الشائعة</h2><p>تشمل نفاد المخزون، الإفراط في التخزين، وصعوبة تتبع حركة البضائع.</p><p>إذا كنت تفكر في تطبيق أودو لشركتك، <a href="#contact">تواصل معنا الآن</a> للحصول على عرض أسعار مخصص للتنفيذ.</p>',
   'تعلم أساسيات إدارة المخزون وكيف يمكن لأنظمة ERP تحسين عمليات المخزون في شركتك.',
   'إدارة المخزون, تتبع البضائع, تحسين المخزون, أنظمة المخزون');

-- Insert placeholder post translations (English)
INSERT INTO blog_post_translations (post_id, lang, title, content, meta_description, keywords) VALUES
  -- Awareness Stage - English
  ('a1111111-1111-1111-1111-111111111111', 'en', 'What is an ERP System?', 
   '<h2>Introduction to ERP Systems</h2><p>An Enterprise Resource Planning (ERP) system is an integrated software solution that helps businesses manage their daily operations more efficiently. This system brings together all business processes into one unified platform.</p><h2>Benefits of ERP Systems</h2><p>Key benefits of ERP systems include improved operational efficiency, reduced costs, and better decision-making through accurate and up-to-date data.</p><h2>How ERP Systems Work</h2><p>ERP systems work by integrating all business processes into a single central database, allowing different departments to access the same information and work in harmony.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Learn what an ERP system is and how it can help your company improve efficiency and increase profits.',
   'ERP, Enterprise Resource Planning, business management systems, Odoo, Saudi Arabia'),
  
  ('a2222222-2222-2222-2222-222222222222', 'en', 'Signs Your Business Needs an ERP System',
   '<h2>Common Business Challenges</h2><p>When your company faces difficulties tracking inventory or struggles to get accurate reports, it might be time to consider an ERP system.</p><h2>Signs You Need ERP</h2><p>Key indicators include: using multiple spreadsheets, difficulty communicating between departments, and spending excessive time on administrative tasks.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Discover the signs that indicate your business needs an ERP system to improve operations and increase efficiency.',
   'ERP needs assessment, business challenges, process improvement, Odoo Saudi Arabia'),

  ('a3333333-3333-3333-3333-333333333333', 'en', 'ERP Benefits for Small and Medium Businesses',
   '<h2>Why Small Businesses Need ERP</h2><p>Small and medium businesses face unique challenges in managing their limited resources. ERP systems help these companies maximize their resource utilization.</p><h2>Direct Benefits</h2><p>Benefits include time savings, error reduction, improved customer service, and increased transparency in operations.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Learn how ERP systems can help small and medium businesses in Saudi Arabia grow and develop.',
   'ERP for small business, ERP benefits, medium enterprises, Odoo Saudi Arabia'),

  ('a4444444-4444-4444-4444-444444444444', 'en', 'Digital Transformation in Saudi Arabia',
   '<h2>Saudi Vision 2030 and Digital Transformation</h2><p>Saudi Arabia aims to achieve comprehensive digital transformation as part of Vision 2030, requiring companies to adopt modern technologies.</p><h2>Role of ERP in Digital Transformation</h2><p>ERP systems play a pivotal role in the digital transformation journey of Saudi companies.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Discover how ERP systems contribute to achieving digital transformation goals in Saudi Arabia.',
   'Saudi digital transformation, Vision 2030, ERP Saudi Arabia, modern technologies'),

  ('a5555555-5555-5555-5555-555555555555', 'en', 'Common Business Challenges and Solutions',
   '<h2>Most Common Challenges</h2><p>Companies face various challenges such as inventory management, sales tracking, and customer relationship management.</p><h2>Available Solutions</h2><p>ERP systems provide comprehensive solutions to these challenges through automation and integration.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Learn about the most common business challenges and how ERP systems can solve them effectively.',
   'business challenges, business solutions, inventory management, process automation'),

  ('a6666666-6666-6666-6666-666666666666', 'en', 'ERP vs Spreadsheets',
   '<h2>Spreadsheet Limitations</h2><p>While spreadsheets are useful, they become limited when companies grow and become more complex.</p><h2>ERP Advantages</h2><p>ERP systems provide greater accuracy, better security, and the ability to handle large amounts of data.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Comprehensive comparison between using spreadsheets and ERP systems in business management.',
   'ERP vs Excel, spreadsheets, data management, business systems'),

  ('a7777777-7777-7777-7777-777777777777', 'en', 'Business Process Automation',
   '<h2>What is Process Automation</h2><p>Business process automation means using technology to execute repetitive tasks automatically, saving time and reducing errors.</p><h2>Benefits of Automation</h2><p>Benefits include increased efficiency, improved accuracy, and freeing up time to focus on strategic tasks.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Learn how to automate business processes and improve your company efficiency using ERP systems.',
   'process automation, operational efficiency, productivity improvement, Odoo automation'),

  ('a8888888-8888-8888-8888-888888888888', 'en', 'Inventory Management Basics',
   '<h2>Importance of Inventory Management</h2><p>Effective inventory management is essential for any business success, as it affects costs and customer service.</p><h2>Common Challenges</h2><p>Challenges include stockouts, overstocking, and difficulty tracking goods movement.</p><p>If you''re considering Odoo for your business, <a href="#contact">contact us now</a> to get a personalized implementation quote.</p>',
   'Learn inventory management basics and how ERP systems can improve inventory operations in your company.',
   'inventory management, goods tracking, inventory optimization, inventory systems');

-- Insert some blog post tags relationships
INSERT INTO blog_post_tags (post_id, tag_id) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('a1111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
  ('a2222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('a2222222-2222-2222-2222-222222222222', 'ffffffff-ffff-ffff-ffff-ffffffffffff'),
  ('a3333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('a3333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
  ('a4444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd'),
  ('a4444444-4444-4444-4444-444444444444', 'ffffffff-ffff-ffff-ffff-ffffffffffff'),
  ('a5555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('a5555555-5555-5555-5555-555555555555', 'cccccccc-cccc-cccc-cccc-cccccccccccc'),
  ('a6666666-6666-6666-6666-666666666666', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('a7777777-7777-7777-7777-777777777777', 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1'),
  ('a7777777-7777-7777-7777-777777777777', 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2'),
  ('a8888888-8888-8888-8888-888888888888', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('b1111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('b1111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('b2222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('b2222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc')
ON CONFLICT (post_id, tag_id) DO NOTHING;