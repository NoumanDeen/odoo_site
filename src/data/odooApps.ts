import type { Industry } from './industries';

// Define types for Odoo app categories and apps
export interface OdooAppCategory {
  slug: string;
  icon: string;
  ar: {
    name: string;
    shortDescription: string;
    fullDescription: string;
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  en: {
    name: string;
    shortDescription: string;
    fullDescription: string;
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  subApps?: OdooApp[];
}

export interface OdooApp {
  slug: string;
  icon: string;
  ar: {
    name: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    benefits: Array<{
      title: string;
      description: string;
    }>;
    useCases: Array<{
      title: string;
      description: string;
    }>;
    faq?: Array<{
      question: string;
      answer: string;
    }>;
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    structuredData: any;
  };
  en: {
    name: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    benefits: Array<{
      title: string;
      description: string;
    }>;
    useCases: Array<{
      title: string;
      description: string;
    }>;
    faq?: Array<{
      question: string;
      answer: string;
    }>;
    seo: {
      title: string;
      description: string;
      keywords: string;
    };
    structuredData: any;
  };
  subApps?: OdooApp[];
}

// Define Odoo app categories
export const odooAppCategories: OdooAppCategory[] = [
  {
    slug: 'sales',
    icon: 'sales',
    ar: {
      name: 'المبيعات',
      shortDescription: 'إدارة المبيعات وعلاقات العملاء وتحسين أداء فريق المبيعات',
      fullDescription: `
        <h2>إدارة المبيعات الشاملة مع أودو</h2>
        <p>تطبيقات المبيعات من أودو توفر حلاً متكاملاً لإدارة دورة المبيعات بالكامل، من العملاء المحتملين إلى العملاء الدائمين. تساعد هذه التطبيقات فرق المبيعات على تحسين الكفاءة، زيادة المبيعات، وتعزيز رضا العملاء.</p>
        
        <p>مع تطبيقات المبيعات من أودو، يمكنك تتبع العملاء المحتملين، إدارة الفرص، إنشاء عروض الأسعار والطلبات، وتحليل أداء المبيعات بدقة. كما توفر هذه التطبيقات أدوات متقدمة لإدارة علاقات العملاء (CRM) تساعد في بناء علاقات أقوى مع العملاء وزيادة ولائهم.</p>
        
        <h2>تطبيقات المبيعات الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>إدارة علاقات العملاء (CRM)</strong> - تتبع العملاء المحتملين وإدارة الفرص وتحسين معدلات التحويل</li>
          <li><strong>المبيعات</strong> - إدارة عروض الأسعار والطلبات والفواتير</li>
          <li><strong>نقاط البيع (POS)</strong> - حل متكامل للمبيعات في المتاجر الفعلية</li>
          <li><strong>الاشتراكات</strong> - إدارة الإيرادات المتكررة ونماذج الاشتراك</li>
          <li><strong>التسعير المتقدم</strong> - إنشاء وإدارة استراتيجيات تسعير معقدة</li>
          <li><strong>التوقعات</strong> - التنبؤ بالمبيعات المستقبلية بناءً على البيانات التاريخية</li>
          <li><strong>الولاء</strong> - إدارة برامج ولاء العملاء والمكافآت</li>
          <li><strong>التجارة الإلكترونية</strong> - متجر إلكتروني متكامل مع نظام المبيعات</li>
        </ul>
        
        <h2>مزايا تطبيقات المبيعات من أودو</h2>
        <p>تتميز تطبيقات المبيعات من أودو بالعديد من المزايا التي تساعد الشركات على تحسين أدائها في السوق:</p>
        <ul>
          <li>رؤية شاملة لدورة المبيعات بالكامل</li>
          <li>أتمتة المهام المتكررة وتوفير الوقت</li>
          <li>تحسين التعاون بين فرق المبيعات والتسويق والدعم</li>
          <li>تقارير وتحليلات متقدمة لاتخاذ قرارات أفضل</li>
          <li>تكامل سلس مع وحدات أودو الأخرى مثل المخزون والمحاسبة</li>
          <li>واجهة سهلة الاستخدام تقلل من وقت التدريب</li>
          <li>إمكانية الوصول من أي مكان عبر الإنترنت</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات المبيعات الشركات السعودية؟</h2>
        <p>تواجه الشركات في المملكة العربية السعودية تحديات فريدة في إدارة المبيعات، مثل التعامل مع متطلبات الفوترة الإلكترونية، ضريبة القيمة المضافة، والتكامل مع المنصات الحكومية. تطبيقات المبيعات من أودو مصممة لتلبية هذه المتطلبات المحلية مع توفير أفضل الممارسات العالمية في إدارة المبيعات.</p>
        
        <p>سواء كنت تدير شركة صغيرة أو متوسطة أو كبيرة، يمكن لتطبيقات المبيعات من أودو أن تساعدك في تحسين عمليات البيع، زيادة الإيرادات، وبناء علاقات أقوى مع عملائك.</p>
      `,
      seo: {
        title: 'تطبيقات المبيعات في أودو | حلول إدارة المبيعات وعلاقات العملاء - ToDoOps',
        description: 'اكتشف تطبيقات المبيعات المتكاملة في أودو لإدارة المبيعات وعلاقات العملاء بكفاءة. حلول شاملة لتحسين أداء فريق المبيعات وزيادة الإيرادات.',
        keywords: 'أودو المبيعات, CRM أودو, نقاط البيع, إدارة علاقات العملاء, المبيعات السعودية, أودو POS'
      }
    },
    en: {
      name: 'Sales',
      shortDescription: 'Manage sales, customer relationships, and improve sales team performance',
      fullDescription: `
        <h2>Comprehensive Sales Management with Odoo</h2>
        <p>Odoo Sales applications provide an integrated solution for managing the entire sales cycle, from leads to repeat customers. These applications help sales teams improve efficiency, increase sales, and enhance customer satisfaction.</p>
        
        <p>With Odoo Sales applications, you can track leads, manage opportunities, create quotes and orders, and analyze sales performance with precision. These applications also provide advanced Customer Relationship Management (CRM) tools that help build stronger customer relationships and increase loyalty.</p>
        
        <h2>Key Sales Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Customer Relationship Management (CRM)</strong> - Track leads, manage opportunities, and improve conversion rates</li>
          <li><strong>Sales</strong> - Manage quotes, orders, and invoices</li>
          <li><strong>Point of Sale (POS)</strong> - Integrated solution for physical store sales</li>
          <li><strong>Subscriptions</strong> - Manage recurring revenue and subscription models</li>
          <li><strong>Advanced Pricing</strong> - Create and manage complex pricing strategies</li>
          <li><strong>Forecasting</strong> - Predict future sales based on historical data</li>
          <li><strong>Loyalty</strong> - Manage customer loyalty programs and rewards</li>
          <li><strong>eCommerce</strong> - Online store integrated with the sales system</li>
        </ul>
        
        <h2>Benefits of Odoo Sales Applications</h2>
        <p>Odoo Sales applications offer numerous advantages that help companies improve their market performance:</p>
        <ul>
          <li>Comprehensive visibility of the entire sales cycle</li>
          <li>Automation of repetitive tasks and time savings</li>
          <li>Improved collaboration between sales, marketing, and support teams</li>
          <li>Advanced reports and analytics for better decision-making</li>
          <li>Seamless integration with other Odoo modules such as inventory and accounting</li>
          <li>User-friendly interface that reduces training time</li>
          <li>Accessibility from anywhere via the internet</li>
        </ul>
        
        <h2>How Do Sales Applications Help Saudi Companies?</h2>
        <p>Companies in Saudi Arabia face unique challenges in sales management, such as dealing with e-invoicing requirements, VAT, and integration with government platforms. Odoo Sales applications are designed to meet these local requirements while providing global best practices in sales management.</p>
        
        <p>Whether you run a small, medium, or large company, Odoo Sales applications can help you improve sales processes, increase revenue, and build stronger relationships with your customers.</p>
      `,
      seo: {
        title: 'Odoo Sales Applications | Sales Management & CRM Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated sales applications for efficient sales and customer relationship management. Comprehensive solutions to improve sales team performance and increase revenue.',
        keywords: 'Odoo Sales, Odoo CRM, Point of Sale, customer relationship management, Saudi sales, Odoo POS'
      }
    }
  },
  {
    slug: 'finance',
    icon: 'finance',
    ar: {
      name: 'المالية',
      shortDescription: 'إدارة المحاسبة والمالية بكفاءة مع تقارير مالية متقدمة',
      fullDescription: `
        <h2>إدارة مالية متكاملة مع أودو</h2>
        <p>تطبيقات المالية من أودو توفر حلاً شاملاً لإدارة جميع الجوانب المالية والمحاسبية لشركتك. تم تصميم هذه التطبيقات لتبسيط العمليات المالية المعقدة وتوفير رؤية واضحة للوضع المالي للشركة في أي وقت.</p>
        
        <p>مع تطبيقات المالية من أودو، يمكنك إدارة الحسابات الدائنة والمدينة، إعداد التقارير المالية، تتبع الميزانيات، إدارة الأصول، وأتمتة العمليات المحاسبية المتكررة. كما توفر هذه التطبيقات امتثالاً كاملاً للمعايير المحاسبية المحلية والدولية.</p>
        
        <h2>تطبيقات المالية الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>المحاسبة</strong> - إدارة دفتر الأستاذ العام والحسابات الدائنة والمدينة</li>
          <li><strong>الفواتير</strong> - إنشاء وإدارة الفواتير والمدفوعات</li>
          <li><strong>المصروفات</strong> - تتبع وإدارة مصروفات الموظفين</li>
          <li><strong>إدارة الأصول</strong> - تتبع الأصول والاستهلاك</li>
          <li><strong>الميزانيات</strong> - إنشاء وتتبع الميزانيات المالية</li>
          <li><strong>التقارير المالية</strong> - تقارير مالية متقدمة وقابلة للتخصيص</li>
          <li><strong>الضرائب</strong> - إدارة ضريبة القيمة المضافة والامتثال الضريبي</li>
          <li><strong>التدقيق</strong> - أدوات للتدقيق المالي والرقابة الداخلية</li>
        </ul>
        
        <h2>مزايا تطبيقات المالية من أودو</h2>
        <p>تتميز تطبيقات المالية من أودو بالعديد من المزايا التي تساعد الشركات على تحسين إدارتها المالية:</p>
        <ul>
          <li>أتمتة العمليات المحاسبية المتكررة وتوفير الوقت</li>
          <li>دقة أكبر في البيانات المالية وتقليل الأخطاء</li>
          <li>رؤية شاملة للوضع المالي للشركة في الوقت الفعلي</li>
          <li>تقارير مالية متقدمة لاتخاذ قرارات أفضل</li>
          <li>تكامل سلس مع وحدات أودو الأخرى مثل المبيعات والمشتريات</li>
          <li>امتثال للمعايير المحاسبية المحلية والدولية</li>
          <li>أمان متقدم لحماية البيانات المالية الحساسة</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات المالية الشركات السعودية؟</h2>
        <p>تواجه الشركات في المملكة العربية السعودية متطلبات مالية وضريبية خاصة، مثل الامتثال لضريبة القيمة المضافة، الفوترة الإلكترونية، والتقارير المالية وفق المعايير المحلية. تطبيقات المالية من أودو مصممة لتلبية هذه المتطلبات المحلية مع توفير أفضل الممارسات العالمية في الإدارة المالية.</p>
        
        <p>سواء كنت تدير شركة صغيرة أو متوسطة أو كبيرة، يمكن لتطبيقات المالية من أودو أن تساعدك في تبسيط العمليات المالية، تحسين الدقة، وتوفير الوقت والجهد في إدارة الجوانب المالية لشركتك.</p>
      `,
      seo: {
        title: 'تطبيقات المالية في أودو | حلول المحاسبة والإدارة المالية - ToDoOps',
        description: 'اكتشف تطبيقات المالية المتكاملة في أودو لإدارة المحاسبة والمالية بكفاءة. حلول شاملة للفواتير، المصروفات، الأصول، والتقارير المالية المتقدمة.',
        keywords: 'أودو المالية, محاسبة أودو, الفواتير, إدارة المالية, ضريبة القيمة المضافة, التقارير المالية'
      }
    },
    en: {
      name: 'Finance',
      shortDescription: 'Efficiently manage accounting and finance with advanced financial reporting',
      fullDescription: `
        <h2>Integrated Financial Management with Odoo</h2>
        <p>Odoo Finance applications provide a comprehensive solution for managing all financial and accounting aspects of your company. These applications are designed to simplify complex financial operations and provide a clear view of the company's financial position at any time.</p>
        
        <p>With Odoo Finance applications, you can manage accounts payable and receivable, prepare financial reports, track budgets, manage assets, and automate recurring accounting processes. These applications also provide full compliance with local and international accounting standards.</p>
        
        <h2>Key Finance Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Accounting</strong> - Manage general ledger, accounts payable, and accounts receivable</li>
          <li><strong>Invoicing</strong> - Create and manage invoices and payments</li>
          <li><strong>Expenses</strong> - Track and manage employee expenses</li>
          <li><strong>Asset Management</strong> - Track assets and depreciation</li>
          <li><strong>Budgeting</strong> - Create and track financial budgets</li>
          <li><strong>Financial Reporting</strong> - Advanced and customizable financial reports</li>
          <li><strong>Taxes</strong> - Manage VAT and tax compliance</li>
          <li><strong>Audit</strong> - Tools for financial auditing and internal control</li>
        </ul>
        
        <h2>Benefits of Odoo Finance Applications</h2>
        <p>Odoo Finance applications offer numerous advantages that help companies improve their financial management:</p>
        <ul>
          <li>Automation of recurring accounting processes and time savings</li>
          <li>Greater accuracy in financial data and reduced errors</li>
          <li>Comprehensive view of the company's financial position in real-time</li>
          <li>Advanced financial reports for better decision-making</li>
          <li>Seamless integration with other Odoo modules such as sales and purchasing</li>
          <li>Compliance with local and international accounting standards</li>
          <li>Advanced security to protect sensitive financial data</li>
        </ul>
        
        <h2>How Do Finance Applications Help Saudi Companies?</h2>
        <p>Companies in Saudi Arabia face specific financial and tax requirements, such as VAT compliance, e-invoicing, and financial reporting according to local standards. Odoo Finance applications are designed to meet these local requirements while providing global best practices in financial management.</p>
        
        <p>Whether you run a small, medium, or large company, Odoo Finance applications can help you simplify financial operations, improve accuracy, and save time and effort in managing the financial aspects of your company.</p>
      `,
      seo: {
        title: 'Odoo Finance Applications | Accounting & Financial Management Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated finance applications for efficient accounting and financial management. Comprehensive solutions for invoicing, expenses, assets, and advanced financial reporting.',
        keywords: 'Odoo Finance, Odoo Accounting, Invoicing, Financial Management, VAT, Financial Reporting'
      }
    }
  },
  {
    slug: 'inventory',
    icon: 'inventory',
    ar: {
      name: 'المخزون والتصنيع',
      shortDescription: 'إدارة المخزون والمستودعات والإنتاج بكفاءة عالية',
      fullDescription: `
        <h2>إدارة متكاملة للمخزون والتصنيع مع أودو</h2>
        <p>تطبيقات المخزون والتصنيع من أودو توفر حلاً شاملاً لإدارة سلسلة التوريد بالكامل، من المواد الخام إلى المنتجات النهائية. تساعد هذه التطبيقات الشركات على تحسين كفاءة المخزون، تقليل التكاليف، وتحسين عمليات الإنتاج.</p>
        
        <p>مع تطبيقات المخزون والتصنيع من أودو، يمكنك تتبع المخزون في الوقت الفعلي، إدارة المستودعات المتعددة، تخطيط الإنتاج، وتتبع تكاليف التصنيع بدقة. كما توفر هذه التطبيقات أدوات متقدمة للتنبؤ بالطلب وتخطيط الاحتياجات من المواد.</p>
        
        <h2>تطبيقات المخزون والتصنيع الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>إدارة المخزون</strong> - تتبع المخزون في الوقت الفعلي وإدارة المستودعات</li>
          <li><strong>التصنيع</strong> - تخطيط وتنفيذ أوامر الإنتاج</li>
          <li><strong>الصيانة</strong> - إدارة صيانة المعدات والآلات</li>
          <li><strong>الجودة</strong> - ضمان جودة المنتجات والعمليات</li>
          <li><strong>المشتريات</strong> - إدارة طلبات الشراء والموردين</li>
          <li><strong>إدارة المستودعات</strong> - تنظيم المستودعات وعمليات التخزين</li>
          <li><strong>الشحن</strong> - إدارة عمليات الشحن والتسليم</li>
          <li><strong>تخطيط الاحتياجات من المواد (MRP)</strong> - التخطيط المتقدم للإنتاج والمواد</li>
        </ul>
        
        <h2>مزايا تطبيقات المخزون والتصنيع من أودو</h2>
        <p>تتميز تطبيقات المخزون والتصنيع من أودو بالعديد من المزايا التي تساعد الشركات على تحسين إدارة سلسلة التوريد:</p>
        <ul>
          <li>رؤية شاملة للمخزون في جميع المواقع في الوقت الفعلي</li>
          <li>تقليل تكاليف المخزون وتجنب نفاد المخزون</li>
          <li>تحسين كفاءة الإنتاج وتقليل وقت التوقف</li>
          <li>تتبع دقيق لتكاليف التصنيع وتحسين الربحية</li>
          <li>تكامل سلس مع وحدات أودو الأخرى مثل المبيعات والمشتريات</li>
          <li>تخطيط أفضل للإنتاج والمواد</li>
          <li>تحسين جودة المنتجات وتقليل الهدر</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات المخزون والتصنيع الشركات السعودية؟</h2>
        <p>تواجه الشركات الصناعية في المملكة العربية السعودية تحديات خاصة في إدارة المخزون والإنتاج، مثل تعدد المواقع، تعقيد سلاسل التوريد، والحاجة للامتثال للمعايير المحلية. تطبيقات المخزون والتصنيع من أودو مصممة لمواجهة هذه التحديات وتحسين كفاءة العمليات.</p>
        
        <p>سواء كنت تدير مصنعاً صغيراً أو شركة صناعية كبيرة، يمكن لتطبيقات المخزون والتصنيع من أودو أن تساعدك في تحسين إدارة المخزون، تبسيط عمليات الإنتاج، وزيادة الكفاءة التشغيلية لشركتك.</p>
      `,
      seo: {
        title: 'تطبيقات المخزون والتصنيع في أودو | حلول إدارة سلسلة التوريد - ToDoOps',
        description: 'اكتشف تطبيقات المخزون والتصنيع المتكاملة في أودو لإدارة المستودعات والإنتاج بكفاءة. حلول شاملة لتحسين سلسلة التوريد وتقليل التكاليف.',
        keywords: 'أودو المخزون, أودو التصنيع, إدارة المستودعات, سلسلة التوريد, الإنتاج, MRP, الصيانة'
      }
    },
    en: {
      name: 'Inventory & Manufacturing',
      shortDescription: 'Efficiently manage inventory, warehouses, and production',
      fullDescription: `
        <h2>Integrated Inventory and Manufacturing Management with Odoo</h2>
        <p>Odoo Inventory and Manufacturing applications provide a comprehensive solution for managing the entire supply chain, from raw materials to finished products. These applications help companies improve inventory efficiency, reduce costs, and enhance production processes.</p>
        
        <p>With Odoo Inventory and Manufacturing applications, you can track inventory in real-time, manage multiple warehouses, plan production, and accurately track manufacturing costs. These applications also provide advanced tools for demand forecasting and material requirements planning.</p>
        
        <h2>Key Inventory and Manufacturing Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Inventory Management</strong> - Real-time inventory tracking and warehouse management</li>
          <li><strong>Manufacturing</strong> - Planning and execution of production orders</li>
          <li><strong>Maintenance</strong> - Management of equipment and machinery maintenance</li>
          <li><strong>Quality</strong> - Ensuring product and process quality</li>
          <li><strong>Purchase</strong> - Managing purchase orders and suppliers</li>
          <li><strong>Warehouse Management</strong> - Organizing warehouses and storage operations</li>
          <li><strong>Shipping</strong> - Managing shipping and delivery operations</li>
          <li><strong>Material Requirements Planning (MRP)</strong> - Advanced planning for production and materials</li>
        </ul>
        
        <h2>Benefits of Odoo Inventory and Manufacturing Applications</h2>
        <p>Odoo Inventory and Manufacturing applications offer numerous advantages that help companies improve supply chain management:</p>
        <ul>
          <li>Comprehensive real-time visibility of inventory across all locations</li>
          <li>Reduced inventory costs and prevention of stockouts</li>
          <li>Improved production efficiency and reduced downtime</li>
          <li>Accurate tracking of manufacturing costs and improved profitability</li>
          <li>Seamless integration with other Odoo modules such as sales and purchasing</li>
          <li>Better planning for production and materials</li>
          <li>Improved product quality and reduced waste</li>
        </ul>
        
        <h2>How Do Inventory and Manufacturing Applications Help Saudi Companies?</h2>
        <p>Industrial companies in Saudi Arabia face specific challenges in inventory and production management, such as multiple locations, complex supply chains, and the need to comply with local standards. Odoo Inventory and Manufacturing applications are designed to address these challenges and improve operational efficiency.</p>
        
        <p>Whether you run a small factory or a large industrial company, Odoo Inventory and Manufacturing applications can help you improve inventory management, streamline production processes, and increase the operational efficiency of your company.</p>
      `,
      seo: {
        title: 'Odoo Inventory & Manufacturing Applications | Supply Chain Management Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated inventory and manufacturing applications for efficient warehouse and production management. Comprehensive solutions to improve supply chain and reduce costs.',
        keywords: 'Odoo Inventory, Odoo Manufacturing, Warehouse Management, Supply Chain, Production, MRP, Maintenance'
      }
    }
  },
  {
    slug: 'hr',
    icon: 'hr',
    ar: {
      name: 'الموارد البشرية',
      shortDescription: 'إدارة شاملة للموظفين، الحضور، الإجازات، وكشوف المرتبات',
      fullDescription: `
        <h2>إدارة متكاملة للموارد البشرية مع أودو</h2>
        <p>تطبيقات الموارد البشرية من أودو توفر حلاً شاملاً لإدارة جميع جوانب رأس المال البشري في شركتك. تساعد هذه التطبيقات الشركات على تبسيط عمليات الموارد البشرية، تحسين تجربة الموظفين، وزيادة الإنتاجية.</p>
        
        <p>مع تطبيقات الموارد البشرية من أودو، يمكنك إدارة دورة حياة الموظف بالكامل، من التوظيف إلى التقاعد، بما في ذلك إدارة الحضور، الإجازات، كشوف المرتبات، تقييم الأداء، والتطوير المهني.</p>
        
        <h2>تطبيقات الموارد البشرية الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>الموارد البشرية</strong> - إدارة معلومات الموظفين والهيكل التنظيمي</li>
          <li><strong>التوظيف</strong> - إدارة عملية التوظيف من الإعلان إلى التعيين</li>
          <li><strong>الحضور</strong> - تتبع حضور وانصراف الموظفين</li>
          <li><strong>الإجازات</strong> - إدارة طلبات الإجازات والغياب</li>
          <li><strong>كشوف المرتبات</strong> - حساب الرواتب والبدلات والخصومات</li>
          <li><strong>تقييم الأداء</strong> - إدارة عمليات تقييم أداء الموظفين</li>
          <li><strong>التدريب</strong> - تخطيط وتنفيذ برامج تدريب الموظفين</li>
          <li><strong>المصروفات</strong> - إدارة مصروفات الموظفين والسفر</li>
        </ul>
        
        <h2>مزايا تطبيقات الموارد البشرية من أودو</h2>
        <p>تتميز تطبيقات الموارد البشرية من أودو بالعديد من المزايا التي تساعد الشركات على تحسين إدارة الموارد البشرية:</p>
        <ul>
          <li>أتمتة العمليات الإدارية وتقليل الأعمال الورقية</li>
          <li>تحسين دقة بيانات الموظفين وسهولة الوصول إليها</li>
          <li>تبسيط عمليات الحضور والإجازات وكشوف المرتبات</li>
          <li>تحسين تجربة الموظفين من خلال بوابة الخدمة الذاتية</li>
          <li>تكامل سلس مع وحدات أودو الأخرى مثل المحاسبة والمشاريع</li>
          <li>تقارير وتحليلات متقدمة للموارد البشرية</li>
          <li>امتثال للقوانين واللوائح المحلية</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات الموارد البشرية الشركات السعودية؟</h2>
        <p>تواجه الشركات في المملكة العربية السعودية متطلبات خاصة في إدارة الموارد البشرية، مثل الامتثال لنظام العمل السعودي، متطلبات السعودة، والتكامل مع أنظمة مثل مدد وقوى. تطبيقات الموارد البشرية من أودو مصممة لتلبية هذه المتطلبات المحلية مع توفير أفضل الممارسات العالمية في إدارة الموارد البشرية.</p>
        
        <p>سواء كنت تدير شركة صغيرة أو متوسطة أو كبيرة، يمكن لتطبيقات الموارد البشرية من أودو أن تساعدك في تبسيط عمليات الموارد البشرية، تحسين تجربة الموظفين، وزيادة الإنتاجية في شركتك.</p>
      `,
      seo: {
        title: 'تطبيقات الموارد البشرية في أودو | حلول إدارة الموظفين والرواتب - ToDoOps',
        description: 'اكتشف تطبيقات الموارد البشرية المتكاملة في أودو لإدارة الموظفين، الحضور، الإجازات، وكشوف المرتبات. حلول شاملة لتحسين إدارة رأس المال البشري.',
        keywords: 'أودو الموارد البشرية, كشوف المرتبات, إدارة الموظفين, الحضور, التوظيف, تقييم الأداء, نظام العمل السعودي'
      }
    },
    en: {
      name: 'Human Resources',
      shortDescription: 'Comprehensive management of employees, attendance, leaves, and payroll',
      fullDescription: `
        <h2>Integrated Human Resources Management with Odoo</h2>
        <p>Odoo Human Resources applications provide a comprehensive solution for managing all aspects of human capital in your company. These applications help companies streamline HR processes, improve employee experience, and increase productivity.</p>
        
        <p>With Odoo HR applications, you can manage the entire employee lifecycle, from recruitment to retirement, including attendance management, leave management, payroll, performance evaluation, and professional development.</p>
        
        <h2>Key Human Resources Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Human Resources</strong> - Manage employee information and organizational structure</li>
          <li><strong>Recruitment</strong> - Manage the recruitment process from job posting to hiring</li>
          <li><strong>Attendance</strong> - Track employee check-ins and check-outs</li>
          <li><strong>Time Off</strong> - Manage leave requests and absences</li>
          <li><strong>Payroll</strong> - Calculate salaries, allowances, and deductions</li>
          <li><strong>Appraisals</strong> - Manage employee performance evaluation processes</li>
          <li><strong>Training</strong> - Plan and implement employee training programs</li>
          <li><strong>Expenses</strong> - Manage employee expenses and travel</li>
        </ul>
        
        <h2>Benefits of Odoo Human Resources Applications</h2>
        <p>Odoo HR applications offer numerous advantages that help companies improve human resources management:</p>
        <ul>
          <li>Automation of administrative processes and reduction of paperwork</li>
          <li>Improved accuracy of employee data and ease of access</li>
          <li>Streamlined attendance, leave, and payroll processes</li>
          <li>Enhanced employee experience through self-service portal</li>
          <li>Seamless integration with other Odoo modules such as accounting and projects</li>
          <li>Advanced HR reports and analytics</li>
          <li>Compliance with local laws and regulations</li>
        </ul>
        
        <h2>How Do Human Resources Applications Help Saudi Companies?</h2>
        <p>Companies in Saudi Arabia face specific requirements in human resources management, such as compliance with Saudi labor law, Saudization requirements, and integration with systems like MUDAD and QIWA. Odoo HR applications are designed to meet these local requirements while providing global best practices in human resources management.</p>
        
        <p>Whether you run a small, medium, or large company, Odoo HR applications can help you streamline HR processes, improve employee experience, and increase productivity in your company.</p>
      `,
      seo: {
        title: 'Odoo Human Resources Applications | Employee & Payroll Management Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated human resources applications for managing employees, attendance, leaves, and payroll. Comprehensive solutions to improve human capital management.',
        keywords: 'Odoo HR, Payroll, Employee Management, Attendance, Recruitment, Performance Appraisal, Saudi Labor Law'
      }
    }
  },
  {
    slug: 'marketing',
    icon: 'marketing',
    ar: {
      name: 'التسويق',
      shortDescription: 'إدارة حملات التسويق، التسويق الإلكتروني، ووسائل التواصل الاجتماعي',
      fullDescription: `
        <h2>إدارة متكاملة للتسويق مع أودو</h2>
        <p>تطبيقات التسويق من أودو توفر حلاً شاملاً لإدارة جميع أنشطة التسويق لشركتك. تساعد هذه التطبيقات الشركات على تخطيط وتنفيذ وتحليل حملاتها التسويقية بكفاءة عالية، مما يؤدي إلى زيادة العائد على الاستثمار التسويقي.</p>
        
        <p>مع تطبيقات التسويق من أودو، يمكنك إدارة حملات البريد الإلكتروني، التسويق عبر وسائل التواصل الاجتماعي، التسويق بالمحتوى، وحملات الإعلانات المدفوعة. كما توفر هذه التطبيقات أدوات متقدمة لتحليل أداء الحملات وتتبع العملاء المحتملين.</p>
        
        <h2>تطبيقات التسويق الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>التسويق عبر البريد الإلكتروني</strong> - إنشاء وإدارة حملات البريد الإلكتروني</li>
          <li><strong>التسويق عبر وسائل التواصل الاجتماعي</strong> - إدارة حسابات التواصل الاجتماعي والمحتوى</li>
          <li><strong>أتمتة التسويق</strong> - أتمتة العمليات التسويقية المتكررة</li>
          <li><strong>إدارة الحملات</strong> - تخطيط وتنفيذ وتحليل الحملات التسويقية</li>
          <li><strong>تحليلات التسويق</strong> - قياس وتحليل أداء الأنشطة التسويقية</li>
          <li><strong>إدارة العملاء المحتملين</strong> - تتبع وتصنيف العملاء المحتملين</li>
          <li><strong>التسويق بالمحتوى</strong> - إنشاء وإدارة المحتوى التسويقي</li>
          <li><strong>الاستبيانات</strong> - إنشاء وإدارة استبيانات العملاء</li>
        </ul>
        
        <h2>مزايا تطبيقات التسويق من أودو</h2>
        <p>تتميز تطبيقات التسويق من أودو بالعديد من المزايا التي تساعد الشركات على تحسين أنشطتها التسويقية:</p>
        <ul>
          <li>تكامل جميع قنوات التسويق في منصة واحدة</li>
          <li>أتمتة المهام التسويقية المتكررة وتوفير الوقت</li>
          <li>تحسين استهداف العملاء المحتملين</li>
          <li>قياس دقيق لأداء الحملات التسويقية</li>
          <li>تكامل سلس مع وحدات أودو الأخرى مثل المبيعات وخدمة العملاء</li>
          <li>تحسين العائد على الاستثمار التسويقي</li>
          <li>تخصيص الرسائل التسويقية حسب شرائح العملاء</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات التسويق الشركات السعودية؟</h2>
        <p>تواجه الشركات في المملكة العربية السعودية تحديات خاصة في التسويق، مثل التسويق باللغة العربية، مراعاة الخصوصيات الثقافية، والامتثال للوائح المحلية. تطبيقات التسويق من أودو مصممة لتلبية هذه المتطلبات المحلية مع توفير أفضل الممارسات العالمية في التسويق الرقمي.</p>
        
        <p>سواء كنت تدير شركة صغيرة أو متوسطة أو كبيرة، يمكن لتطبيقات التسويق من أودو أن تساعدك في تحسين فعالية حملاتك التسويقية، زيادة الوصول إلى العملاء المحتملين، وتحقيق أهداف نمو شركتك.</p>
      `,
      seo: {
        title: 'تطبيقات التسويق في أودو | حلول التسويق الرقمي والحملات - ToDoOps',
        description: 'اكتشف تطبيقات التسويق المتكاملة في أودو لإدارة الحملات التسويقية، التسويق الإلكتروني، ووسائل التواصل الاجتماعي. حلول شاملة لتحسين العائد على الاستثمار التسويقي.',
        keywords: 'أودو التسويق, التسويق الإلكتروني, وسائل التواصل الاجتماعي, حملات تسويقية, تسويق المحتوى, أتمتة التسويق'
      }
    },
    en: {
      name: 'Marketing',
      shortDescription: 'Manage marketing campaigns, email marketing, and social media',
      fullDescription: `
        <h2>Integrated Marketing Management with Odoo</h2>
        <p>Odoo Marketing applications provide a comprehensive solution for managing all marketing activities for your company. These applications help companies plan, execute, and analyze their marketing campaigns efficiently, leading to increased return on marketing investment.</p>
        
        <p>With Odoo Marketing applications, you can manage email campaigns, social media marketing, content marketing, and paid advertising campaigns. These applications also provide advanced tools for analyzing campaign performance and tracking leads.</p>
        
        <h2>Key Marketing Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Email Marketing</strong> - Create and manage email campaigns</li>
          <li><strong>Social Marketing</strong> - Manage social media accounts and content</li>
          <li><strong>Marketing Automation</strong> - Automate repetitive marketing processes</li>
          <li><strong>Campaign Management</strong> - Plan, execute, and analyze marketing campaigns</li>
          <li><strong>Marketing Analytics</strong> - Measure and analyze marketing activities performance</li>
          <li><strong>Lead Management</strong> - Track and qualify leads</li>
          <li><strong>Content Marketing</strong> - Create and manage marketing content</li>
          <li><strong>Surveys</strong> - Create and manage customer surveys</li>
        </ul>
        
        <h2>Benefits of Odoo Marketing Applications</h2>
        <p>Odoo Marketing applications offer numerous advantages that help companies improve their marketing activities:</p>
        <ul>
          <li>Integration of all marketing channels in one platform</li>
          <li>Automation of repetitive marketing tasks and time savings</li>
          <li>Improved targeting of potential customers</li>
          <li>Accurate measurement of marketing campaign performance</li>
          <li>Seamless integration with other Odoo modules such as sales and customer service</li>
          <li>Improved return on marketing investment</li>
          <li>Customization of marketing messages according to customer segments</li>
        </ul>
        
        <h2>How Do Marketing Applications Help Saudi Companies?</h2>
        <p>Companies in Saudi Arabia face specific challenges in marketing, such as marketing in Arabic, considering cultural specificities, and complying with local regulations. Odoo Marketing applications are designed to meet these local requirements while providing global best practices in digital marketing.</p>
        
        <p>Whether you run a small, medium, or large company, Odoo Marketing applications can help you improve the effectiveness of your marketing campaigns, increase reach to potential customers, and achieve your company's growth goals.</p>
      `,
      seo: {
        title: 'Odoo Marketing Applications | Digital Marketing & Campaign Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated marketing applications for managing marketing campaigns, email marketing, and social media. Comprehensive solutions to improve return on marketing investment.',
        keywords: 'Odoo Marketing, Email Marketing, Social Media, Marketing Campaigns, Content Marketing, Marketing Automation'
      }
    }
  },
  {
    slug: 'website',
    icon: 'website',
    ar: {
      name: 'الموقع الإلكتروني',
      shortDescription: 'إنشاء وإدارة مواقع إلكترونية ومتاجر إلكترونية متكاملة مع نظام ERP',
      fullDescription: `
        <h2>إدارة متكاملة للمواقع الإلكترونية مع أودو</h2>
        <p>تطبيقات الموقع الإلكتروني من أودو توفر حلاً شاملاً لإنشاء وإدارة المواقع الإلكترونية والمتاجر الإلكترونية المتكاملة مع نظام ERP. تساعد هذه التطبيقات الشركات على بناء تواجد رقمي قوي وتوسيع نطاق أعمالها عبر الإنترنت.</p>
        
        <p>مع تطبيقات الموقع الإلكتروني من أودو، يمكنك إنشاء موقع إلكتروني احترافي، متجر إلكتروني، مدونة، منتدى، أو منصة تعلم إلكتروني دون الحاجة لمهارات برمجية متقدمة. كما توفر هذه التطبيقات تكاملاً كاملاً مع باقي وحدات أودو مثل المخزون والمبيعات.</p>
        
        <h2>تطبيقات الموقع الإلكتروني الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>بناء المواقع الإلكترونية</strong> - إنشاء وتصميم المواقع الإلكترونية بسهولة</li>
          <li><strong>التجارة الإلكترونية</strong> - إنشاء وإدارة متجر إلكتروني متكامل</li>
          <li><strong>المدونة</strong> - نشر وإدارة محتوى المدونة</li>
          <li><strong>المنتدى</strong> - إنشاء وإدارة منتدى للمناقشات</li>
          <li><strong>التعلم الإلكتروني</strong> - إنشاء وإدارة دورات تدريبية عبر الإنترنت</li>
          <li><strong>الدردشة المباشرة</strong> - توفير دعم مباشر للزوار والعملاء</li>
          <li><strong>الاستبيانات</strong> - إنشاء وإدارة استبيانات للزوار</li>
          <li><strong>تحسين محركات البحث (SEO)</strong> - تحسين ظهور الموقع في نتائج البحث</li>
        </ul>
        
        <h2>مزايا تطبيقات الموقع الإلكتروني من أودو</h2>
        <p>تتميز تطبيقات الموقع الإلكتروني من أودو بالعديد من المزايا التي تساعد الشركات على تحسين تواجدها الرقمي:</p>
        <ul>
          <li>سهولة إنشاء وإدارة المواقع الإلكترونية دون الحاجة لمهارات برمجية</li>
          <li>تصميم متجاوب يعمل على جميع الأجهزة (الجوال، اللوحي، الحاسوب)</li>
          <li>تكامل كامل مع باقي وحدات أودو مثل المخزون والمبيعات</li>
          <li>تحديث المنتجات والأسعار تلقائياً من نظام ERP</li>
          <li>أدوات متقدمة لتحسين محركات البحث (SEO)</li>
          <li>خيارات دفع متعددة تناسب السوق السعودي</li>
          <li>أمان متقدم لحماية بيانات العملاء والمعاملات</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات الموقع الإلكتروني الشركات السعودية؟</h2>
        <p>مع النمو المتسارع للتجارة الإلكترونية في المملكة العربية السعودية، تحتاج الشركات إلى حلول متكاملة لإدارة تواجدها الرقمي. تطبيقات الموقع الإلكتروني من أودو توفر حلاً متكاملاً يلبي متطلبات السوق السعودي، مثل دعم اللغة العربية، خيارات الدفع المحلية، والامتثال للوائح التجارة الإلكترونية.</p>
        
        <p>سواء كنت تدير شركة صغيرة تبحث عن موقع إلكتروني بسيط، أو شركة كبيرة تحتاج إلى متجر إلكتروني متكامل، يمكن لتطبيقات الموقع الإلكتروني من أودو أن تساعدك في بناء تواجد رقمي قوي وتوسيع نطاق أعمالك عبر الإنترنت.</p>
      `,
      seo: {
        title: 'تطبيقات الموقع الإلكتروني في أودو | حلول المواقع والتجارة الإلكترونية - ToDoOps',
        description: 'اكتشف تطبيقات الموقع الإلكتروني المتكاملة في أودو لإنشاء وإدارة المواقع والمتاجر الإلكترونية. حلول شاملة متكاملة مع نظام ERP لتعزيز تواجدك الرقمي.',
        keywords: 'أودو الموقع الإلكتروني, التجارة الإلكترونية, بناء المواقع, المدونة, المنتدى, التعلم الإلكتروني, الدردشة المباشرة'
      }
    },
    en: {
      name: 'Website',
      shortDescription: 'Create and manage websites and e-commerce stores integrated with ERP',
      fullDescription: `
        <h2>Integrated Website Management with Odoo</h2>
        <p>Odoo Website applications provide a comprehensive solution for creating and managing websites and e-commerce stores integrated with the ERP system. These applications help companies build a strong digital presence and expand their business online.</p>
        
        <p>With Odoo Website applications, you can create a professional website, e-commerce store, blog, forum, or e-learning platform without the need for advanced programming skills. These applications also provide full integration with other Odoo modules such as inventory and sales.</p>
        
        <h2>Key Website Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Website Builder</strong> - Easily create and design websites</li>
          <li><strong>eCommerce</strong> - Create and manage an integrated online store</li>
          <li><strong>Blog</strong> - Publish and manage blog content</li>
          <li><strong>Forum</strong> - Create and manage a discussion forum</li>
          <li><strong>eLearning</strong> - Create and manage online courses</li>
          <li><strong>Live Chat</strong> - Provide direct support to visitors and customers</li>
          <li><strong>Surveys</strong> - Create and manage visitor surveys</li>
          <li><strong>Search Engine Optimization (SEO)</strong> - Improve website visibility in search results</li>
        </ul>
        
        <h2>Benefits of Odoo Website Applications</h2>
        <p>Odoo Website applications offer numerous advantages that help companies improve their digital presence:</p>
        <ul>
          <li>Easy creation and management of websites without programming skills</li>
          <li>Responsive design that works on all devices (mobile, tablet, computer)</li>
          <li>Full integration with other Odoo modules such as inventory and sales</li>
          <li>Automatic update of products and prices from the ERP system</li>
          <li>Advanced tools for search engine optimization (SEO)</li>
          <li>Multiple payment options suitable for the Saudi market</li>
          <li>Advanced security to protect customer data and transactions</li>
        </ul>
        
        <h2>How Do Website Applications Help Saudi Companies?</h2>
        <p>With the rapid growth of e-commerce in Saudi Arabia, companies need integrated solutions to manage their digital presence. Odoo Website applications provide an integrated solution that meets the requirements of the Saudi market, such as Arabic language support, local payment options, and compliance with e-commerce regulations.</p>
        
        <p>Whether you run a small company looking for a simple website, or a large company needing an integrated e-commerce store, Odoo Website applications can help you build a strong digital presence and expand your business online.</p>
      `,
      seo: {
        title: 'Odoo Website Applications | Website & eCommerce Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated website applications for creating and managing websites and e-commerce stores. Comprehensive solutions integrated with ERP to enhance your digital presence.',
        keywords: 'Odoo Website, eCommerce, Website Builder, Blog, Forum, eLearning, Live Chat'
      }
    }
  },
  {
    slug: 'productivity',
    icon: 'productivity',
    ar: {
      name: 'الإنتاجية',
      shortDescription: 'تحسين التعاون وإدارة المشاريع والمهام والوثائق',
      fullDescription: `
        <h2>تعزيز الإنتاجية والتعاون مع أودو</h2>
        <p>تطبيقات الإنتاجية من أودو توفر حلاً متكاملاً لتحسين التعاون وإدارة المشاريع والمهام والوثائق في شركتك. تساعد هذه التطبيقات الفرق على العمل بكفاءة أكبر، تحسين التواصل، وزيادة الإنتاجية الإجمالية.</p>
        
        <p>مع تطبيقات الإنتاجية من أودو، يمكنك إدارة المشاريع، تتبع المهام، تنظيم الاجتماعات، إدارة الوثائق، والتعاون في الوقت الفعلي مع أعضاء الفريق. كما توفر هذه التطبيقات أدوات متقدمة لتحليل الوقت والإنتاجية.</p>
        
        <h2>تطبيقات الإنتاجية الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>إدارة المشاريع</strong> - تخطيط وتنفيذ ومتابعة المشاريع</li>
          <li><strong>المهام</strong> - إدارة وتتبع المهام اليومية</li>
          <li><strong>الدردشة</strong> - التواصل الفوري بين أعضاء الفريق</li>
          <li><strong>الاجتماعات</strong> - جدولة وإدارة الاجتماعات</li>
          <li><strong>الوثائق</strong> - إدارة وتنظيم ومشاركة الوثائق</li>
          <li><strong>تتبع الوقت</strong> - تسجيل وتحليل الوقت المستغرق في المهام</li>
          <li><strong>الملاحظات</strong> - إنشاء وتنظيم الملاحظات والأفكار</li>
          <li><strong>التقويم</strong> - إدارة المواعيد والأحداث</li>
        </ul>
        
        <h2>مزايا تطبيقات الإنتاجية من أودو</h2>
        <p>تتميز تطبيقات الإنتاجية من أودو بالعديد من المزايا التي تساعد الشركات على تحسين كفاءة العمل:</p>
        <ul>
          <li>تحسين التعاون والتواصل بين أعضاء الفريق</li>
          <li>تنظيم أفضل للمشاريع والمهام</li>
          <li>تقليل الوقت المستغرق في المهام الإدارية</li>
          <li>تتبع دقيق لتقدم المشاريع والمهام</li>
          <li>تكامل سلس مع وحدات أودو الأخرى</li>
          <li>إمكانية العمل عن بُعد والوصول من أي مكان</li>
          <li>تحليلات متقدمة للإنتاجية واستخدام الوقت</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات الإنتاجية الشركات السعودية؟</h2>
        <p>مع التوجه المتزايد نحو العمل المرن والعمل عن بُعد في المملكة العربية السعودية، تحتاج الشركات إلى أدوات فعالة للتعاون وإدارة المشاريع. تطبيقات الإنتاجية من أودو توفر حلاً متكاملاً يدعم اللغة العربية ويلبي احتياجات الشركات السعودية في تحسين الإنتاجية والتعاون.</p>
        
        <p>سواء كنت تدير فريقاً صغيراً أو شركة كبيرة متعددة الأقسام، يمكن لتطبيقات الإنتاجية من أودو أن تساعدك في تحسين التعاون، تنظيم العمل، وزيادة الإنتاجية الإجمالية لفريقك.</p>
      `,
      seo: {
        title: 'تطبيقات الإنتاجية في أودو | حلول التعاون وإدارة المشاريع - ToDoOps',
        description: 'اكتشف تطبيقات الإنتاجية المتكاملة في أودو لتحسين التعاون وإدارة المشاريع والمهام والوثائق. حلول شاملة لزيادة كفاءة العمل وإنتاجية الفريق.',
        keywords: 'أودو الإنتاجية, إدارة المشاريع, المهام, التعاون, الوثائق, تتبع الوقت, العمل عن بعد'
      }
    },
    en: {
      name: 'Productivity',
      shortDescription: 'Improve collaboration and manage projects, tasks, and documents',
      fullDescription: `
        <h2>Enhancing Productivity and Collaboration with Odoo</h2>
        <p>Odoo Productivity applications provide an integrated solution for improving collaboration and managing projects, tasks, and documents in your company. These applications help teams work more efficiently, improve communication, and increase overall productivity.</p>
        
        <p>With Odoo Productivity applications, you can manage projects, track tasks, organize meetings, manage documents, and collaborate in real-time with team members. These applications also provide advanced tools for analyzing time and productivity.</p>
        
        <h2>Key Productivity Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Project Management</strong> - Plan, execute, and monitor projects</li>
          <li><strong>Tasks</strong> - Manage and track daily tasks</li>
          <li><strong>Discuss</strong> - Instant communication between team members</li>
          <li><strong>Meetings</strong> - Schedule and manage meetings</li>
          <li><strong>Documents</strong> - Manage, organize, and share documents</li>
          <li><strong>Timesheet</strong> - Record and analyze time spent on tasks</li>
          <li><strong>Notes</strong> - Create and organize notes and ideas</li>
          <li><strong>Calendar</strong> - Manage appointments and events</li>
        </ul>
        
        <h2>Benefits of Odoo Productivity Applications</h2>
        <p>Odoo Productivity applications offer numerous advantages that help companies improve work efficiency:</p>
        <ul>
          <li>Improved collaboration and communication between team members</li>
          <li>Better organization of projects and tasks</li>
          <li>Reduced time spent on administrative tasks</li>
          <li>Accurate tracking of project and task progress</li>
          <li>Seamless integration with other Odoo modules</li>
          <li>Ability to work remotely and access from anywhere</li>
          <li>Advanced analytics for productivity and time usage</li>
        </ul>
        
        <h2>How Do Productivity Applications Help Saudi Companies?</h2>
        <p>With the increasing trend towards flexible work and remote work in Saudi Arabia, companies need effective tools for collaboration and project management. Odoo Productivity applications provide an integrated solution that supports Arabic language and meets the needs of Saudi companies in improving productivity and collaboration.</p>
        
        <p>Whether you manage a small team or a large multi-department company, Odoo Productivity applications can help you improve collaboration, organize work, and increase the overall productivity of your team.</p>
      `,
      seo: {
        title: 'Odoo Productivity Applications | Collaboration & Project Management Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated productivity applications for improving collaboration and managing projects, tasks, and documents. Comprehensive solutions to increase work efficiency and team productivity.',
        keywords: 'Odoo Productivity, Project Management, Tasks, Collaboration, Documents, Timesheet, Remote Work'
      }
    }
  },
  {
    slug: 'services',
    icon: 'services',
    ar: {
      name: 'الخدمات',
      shortDescription: 'إدارة الخدمات، الدعم الفني، وخدمة العملاء',
      fullDescription: `
        <h2>إدارة متكاملة للخدمات مع أودو</h2>
        <p>تطبيقات الخدمات من أودو توفر حلاً شاملاً لإدارة جميع جوانب تقديم الخدمات وخدمة العملاء في شركتك. تساعد هذه التطبيقات الشركات على تحسين جودة الخدمة، زيادة رضا العملاء، وتحسين كفاءة فرق الدعم والخدمة.</p>
        
        <p>مع تطبيقات الخدمات من أودو، يمكنك إدارة طلبات الخدمة، تذاكر الدعم الفني، اتفاقيات مستوى الخدمة، جدولة الفنيين، وقياس رضا العملاء. كما توفر هذه التطبيقات أدوات متقدمة لتحليل أداء الخدمة وتحسينها.</p>
        
        <h2>تطبيقات الخدمات الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>مكتب المساعدة</strong> - إدارة تذاكر الدعم الفني وطلبات المساعدة</li>
          <li><strong>الخدمة الميدانية</strong> - إدارة الفنيين والزيارات الميدانية</li>
          <li><strong>اتفاقيات مستوى الخدمة (SLA)</strong> - إدارة ومراقبة اتفاقيات مستوى الخدمة</li>
          <li><strong>قاعدة المعرفة</strong> - إنشاء وإدارة قاعدة معرفية للعملاء والموظفين</li>
          <li><strong>الدردشة المباشرة</strong> - توفير دعم فوري للعملاء عبر الدردشة</li>
          <li><strong>استبيانات الرضا</strong> - قياس وتحليل رضا العملاء</li>
          <li><strong>إدارة الأصول</strong> - تتبع وإدارة أصول العملاء</li>
          <li><strong>الفوترة الزمنية</strong> - فوترة الخدمات بناءً على الوقت المستغرق</li>
        </ul>
        
        <h2>مزايا تطبيقات الخدمات من أودو</h2>
        <p>تتميز تطبيقات الخدمات من أودو بالعديد من المزايا التي تساعد الشركات على تحسين تقديم الخدمات:</p>
        <ul>
          <li>تحسين سرعة الاستجابة لطلبات العملاء</li>
          <li>تنظيم أفضل لعمليات الدعم والخدمة</li>
          <li>تتبع دقيق لمستويات الخدمة والالتزام بالاتفاقيات</li>
          <li>تحسين تخصيص الموارد وجدولة الفنيين</li>
          <li>تكامل سلس مع وحدات أودو الأخرى مثل المبيعات والمخزون</li>
          <li>قياس وتحليل رضا العملاء</li>
          <li>تحسين مستمر لجودة الخدمة</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات الخدمات الشركات السعودية؟</h2>
        <p>مع زيادة أهمية خدمة العملاء كعامل تنافسي في السوق السعودي، تحتاج الشركات إلى أدوات فعالة لإدارة الخدمات وتحسين تجربة العملاء. تطبيقات الخدمات من أودو توفر حلاً متكاملاً يدعم اللغة العربية ويلبي توقعات العملاء في المملكة العربية السعودية.</p>
        
        <p>سواء كنت تدير شركة خدمات صغيرة أو قسم خدمة عملاء في شركة كبيرة، يمكن لتطبيقات الخدمات من أودو أن تساعدك في تحسين جودة الخدمة، زيادة رضا العملاء، وتعزيز ولائهم لعلامتك التجارية.</p>
      `,
      seo: {
        title: 'تطبيقات الخدمات في أودو | حلول الدعم الفني وخدمة العملاء - ToDoOps',
        description: 'اكتشف تطبيقات الخدمات المتكاملة في أودو لإدارة الدعم الفني وخدمة العملاء. حلول شاملة لتحسين جودة الخدمة وزيادة رضا العملاء.',
        keywords: 'أودو الخدمات, الدعم الفني, خدمة العملاء, مكتب المساعدة, الخدمة الميدانية, اتفاقيات مستوى الخدمة, قاعدة المعرفة'
      }
    },
    en: {
      name: 'Services',
      shortDescription: 'Manage services, technical support, and customer service',
      fullDescription: `
        <h2>Integrated Service Management with Odoo</h2>
        <p>Odoo Services applications provide a comprehensive solution for managing all aspects of service delivery and customer service in your company. These applications help companies improve service quality, increase customer satisfaction, and enhance the efficiency of support and service teams.</p>
        
        <p>With Odoo Services applications, you can manage service requests, support tickets, service level agreements, technician scheduling, and measure customer satisfaction. These applications also provide advanced tools for analyzing and improving service performance.</p>
        
        <h2>Key Services Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Helpdesk</strong> - Manage support tickets and help requests</li>
          <li><strong>Field Service</strong> - Manage technicians and field visits</li>
          <li><strong>Service Level Agreements (SLA)</strong> - Manage and monitor service level agreements</li>
          <li><strong>Knowledge Base</strong> - Create and manage a knowledge base for customers and employees</li>
          <li><strong>Live Chat</strong> - Provide immediate support to customers via chat</li>
          <li><strong>Satisfaction Surveys</strong> - Measure and analyze customer satisfaction</li>
          <li><strong>Asset Management</strong> - Track and manage customer assets</li>
          <li><strong>Timesheet Invoicing</strong> - Invoice services based on time spent</li>
        </ul>
        
        <h2>Benefits of Odoo Services Applications</h2>
        <p>Odoo Services applications offer numerous advantages that help companies improve service delivery:</p>
        <ul>
          <li>Improved response time to customer requests</li>
          <li>Better organization of support and service processes</li>
          <li>Accurate tracking of service levels and adherence to agreements</li>
          <li>Improved resource allocation and technician scheduling</li>
          <li>Seamless integration with other Odoo modules such as sales and inventory</li>
          <li>Measurement and analysis of customer satisfaction</li>
          <li>Continuous improvement of service quality</li>
        </ul>
        
        <h2>How Do Services Applications Help Saudi Companies?</h2>
        <p>With the increasing importance of customer service as a competitive factor in the Saudi market, companies need effective tools to manage services and improve customer experience. Odoo Services applications provide an integrated solution that supports Arabic language and meets customer expectations in Saudi Arabia.</p>
        
        <p>Whether you run a small service company or a customer service department in a large company, Odoo Services applications can help you improve service quality, increase customer satisfaction, and enhance loyalty to your brand.</p>
      `,
      seo: {
        title: 'Odoo Services Applications | Technical Support & Customer Service Solutions - ToDoOps',
        description: 'Discover Odoo\'s integrated services applications for managing technical support and customer service. Comprehensive solutions to improve service quality and increase customer satisfaction.',
        keywords: 'Odoo Services, Technical Support, Customer Service, Helpdesk, Field Service, Service Level Agreements, Knowledge Base'
      }
    }
  },
  {
    slug: 'customization',
    icon: 'customization',
    ar: {
      name: 'التخصيص',
      shortDescription: 'تخصيص وتطوير حلول أودو حسب احتياجات عملك الفريدة',
      fullDescription: `
        <h2>تخصيص وتطوير أودو حسب احتياجاتك</h2>
        <p>تطبيقات التخصيص من أودو توفر إمكانيات واسعة لتعديل وتطوير النظام ليتناسب تماماً مع احتياجات عملك الفريدة. تساعد هذه التطبيقات الشركات على تحقيق أقصى استفادة من نظام أودو من خلال تخصيصه ليعكس عملياتها وإجراءاتها الخاصة.</p>
        
        <p>مع تطبيقات التخصيص من أودو، يمكنك تعديل نماذج البيانات، إنشاء تقارير مخصصة، تطوير واجهات مستخدم جديدة، وإضافة وظائف خاصة بعملك. كما توفر هذه التطبيقات أدوات للمطورين لتوسيع وظائف النظام الأساسية.</p>
        
        <h2>تطبيقات التخصيص الرئيسية في أودو</h2>
        <p>تشمل هذه الفئة التطبيقات التالية:</p>
        <ul>
          <li><strong>استوديو أودو</strong> - تخصيص النظام بدون برمجة</li>
          <li><strong>تطوير الوحدات</strong> - إنشاء وحدات جديدة خاصة بعملك</li>
          <li><strong>مصمم التقارير</strong> - إنشاء تقارير مخصصة</li>
          <li><strong>مصمم النماذج</strong> - تخصيص نماذج إدخال البيانات</li>
          <li><strong>مصمم سير العمل</strong> - إنشاء وتخصيص سير العمل والعمليات</li>
          <li><strong>واجهة برمجة التطبيقات (API)</strong> - التكامل مع أنظمة خارجية</li>
          <li><strong>أدوات المطورين</strong> - أدوات متقدمة لتطوير وتوسيع النظام</li>
          <li><strong>التخصيص المرئي</strong> - تخصيص مظهر وتجربة المستخدم</li>
        </ul>
        
        <h2>مزايا تطبيقات التخصيص من أودو</h2>
        <p>تتميز تطبيقات التخصيص من أودو بالعديد من المزايا التي تساعد الشركات على تحقيق أقصى استفادة من النظام:</p>
        <ul>
          <li>مرونة عالية في تخصيص النظام حسب احتياجات العمل</li>
          <li>إمكانية تخصيص النظام بدون مهارات برمجية متقدمة</li>
          <li>تطوير وظائف خاصة تميز عملك عن المنافسين</li>
          <li>تكامل سلس مع الأنظمة الخارجية والتطبيقات الأخرى</li>
          <li>تحسين كفاءة العمليات من خلال أتمتة سير العمل المخصص</li>
          <li>تقارير مخصصة توفر رؤى قيمة لاتخاذ القرارات</li>
          <li>تحسين تجربة المستخدم وزيادة تبني النظام</li>
        </ul>
        
        <h2>كيف تساعد تطبيقات التخصيص الشركات السعودية؟</h2>
        <p>تتميز الشركات في المملكة العربية السعودية بعمليات وإجراءات خاصة تتوافق مع متطلبات السوق المحلي والتشريعات المحلية. تطبيقات التخصيص من أودو تمكن هذه الشركات من تعديل النظام ليتوافق تماماً مع هذه المتطلبات الخاصة، مثل دعم اللغة العربية، التقويم الهجري، ومتطلبات الفوترة الإلكترونية.</p>
        
        <p>سواء كنت تحتاج إلى تعديلات بسيطة في النظام أو تطوير وحدات مخصصة بالكامل، يمكن لتطبيقات التخصيص من أودو أن تساعدك في تحقيق أقصى استفادة من النظام وتلبية احتياجات عملك الفريدة.</p>
      `,
      seo: {
        title: 'تطبيقات التخصيص في أودو | حلول تطوير وتخصيص نظام ERP - ToDoOps',
        description: 'اكتشف تطبيقات التخصيص في أودو لتعديل وتطوير النظام حسب احتياجات عملك الفريدة. حلول شاملة لتخصيص النماذج، التقارير، وسير العمل.',
        keywords: 'أودو التخصيص, تطوير أودو, تخصيص ERP, استوديو أودو, تطوير الوحدات, مصمم التقارير, واجهة برمجة التطبيقات'
      }
    },
    en: {
      name: 'Customization',
      shortDescription: 'Customize and develop Odoo solutions according to your unique business needs',
      fullDescription: `
        <h2>Customizing and Developing Odoo According to Your Needs</h2>
        <p>Odoo Customization applications provide extensive capabilities to modify and develop the system to perfectly match your unique business needs. These applications help companies maximize the benefits of the Odoo system by customizing it to reflect their specific operations and procedures.</p>
        
        <p>With Odoo Customization applications, you can modify data models, create custom reports, develop new user interfaces, and add functions specific to your business. These applications also provide tools for developers to extend the core system functions.</p>
        
        <h2>Key Customization Applications in Odoo</h2>
        <p>This category includes the following applications:</p>
        <ul>
          <li><strong>Odoo Studio</strong> - Customize the system without programming</li>
          <li><strong>Module Development</strong> - Create new modules specific to your business</li>
          <li><strong>Report Designer</strong> - Create custom reports</li>
          <li><strong>Form Builder</strong> - Customize data entry forms</li>
          <li><strong>Workflow Designer</strong> - Create and customize workflows and processes</li>
          <li><strong>Application Programming Interface (API)</strong> - Integration with external systems</li>
          <li><strong>Developer Tools</strong> - Advanced tools for developing and extending the system</li>
          <li><strong>Visual Customization</strong> - Customize appearance and user experience</li>
        </ul>
        
        <h2>Benefits of Odoo Customization Applications</h2>
        <p>Odoo Customization applications offer numerous advantages that help companies maximize the benefits of the system:</p>
        <ul>
          <li>High flexibility in customizing the system according to business needs</li>
          <li>Ability to customize the system without advanced programming skills</li>
          <li>Development of special functions that distinguish your business from competitors</li>
          <li>Seamless integration with external systems and other applications</li>
          <li>Improved process efficiency through custom workflow automation</li>
          <li>Custom reports that provide valuable insights for decision-making</li>
          <li>Improved user experience and increased system adoption</li>
        </ul>
        
        <h2>How Do Customization Applications Help Saudi Companies?</h2>
        <p>Companies in Saudi Arabia are characterized by special operations and procedures that comply with local market requirements and local legislation. Odoo Customization applications enable these companies to modify the system to fully comply with these special requirements, such as Arabic language support, Hijri calendar, and e-invoicing requirements.</p>
        
        <p>Whether you need simple modifications to the system or fully custom module development, Odoo Customization applications can help you maximize the benefits of the system and meet your unique business needs.</p>
      `,
      seo: {
        title: 'Odoo Customization Applications | ERP Development & Customization Solutions - ToDoOps',
        description: 'Discover Odoo\'s customization applications for modifying and developing the system according to your unique business needs. Comprehensive solutions for customizing forms, reports, and workflows.',
        keywords: 'Odoo Customization, Odoo Development, ERP Customization, Odoo Studio, Module Development, Report Designer, API'
      }
    }
  }
];

// Helper function to get Odoo app icon
export function getOdooAppIcon(iconType: string): string {
  const icons: Record<string, string> = {
    sales: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>',
    finance: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
    inventory: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>',
    hr: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656.126-1.283.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>',
    marketing: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>',
    website: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>',
    productivity: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>',
    services: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>',
    customization: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>',
    default: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>'
  };
  
  return icons[iconType] || icons.default;
}

// Helper function to get app category by slug
export function getAppCategoryBySlug(slug: string): OdooAppCategory | undefined {
  return odooAppCategories.find(category => category.slug === slug);
}

// Helper function to get main apps by category slug
export function getMainAppsByCategorySlug(categorySlug: string): OdooApp[] {
  const category = getAppCategoryBySlug(categorySlug);
  return category?.subApps || [];
}

// Helper function to get main app by slug
export function getMainAppBySlug(appSlug: string): OdooApp | undefined {
  for (const category of odooAppCategories) {
    if (category.subApps) {
      const app = category.subApps.find(app => app.slug === appSlug);
      if (app) return app;
    }
  }
  return undefined;
}