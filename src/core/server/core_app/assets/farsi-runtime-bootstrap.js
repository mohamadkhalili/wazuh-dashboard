(function wazuhFarsiBootstrap(){
'use strict';
const ROOT_CLASS = 'wazuh-rtl';
const WAZUH_APP_SELECTOR = '.wz-app, [data-wz-rtl-app], .application, [data-test-subj="wazuhApp"]';

const TECHNICAL_VALUE_SELECTOR = [
  'code',
  'pre',
  '.euiCode',
  '.wz-technical',
  '[data-wz-ltr]',
].join(',');

const CHART_SELECTOR = [
  '.wazuh-visualization-layout',
  '.wazuh-visualization-chart',
  '.echChart',
  '.visChart',
  '.visualization',
  '[data-wz-rtl-chart]',
].join(',');

const MENU_POPOVER_SELECTOR = '.wz-menu-popover';
const NAVIGATION_FLYOUT_SELECTOR = [
  '.context-nav-wrapper.euiFlyout',
  '.context-nav-wrapper.ouiFlyout',
  "[data-test-subj='collapsibleNav'].euiFlyout",
  "[data-test-subj='collapsibleNav'].ouiFlyout",
  '.wz-rtl-navigation-flyout',
].join(',');
const ANOMALY_OVERVIEW_TITLE_SELECTOR = "[data-test-subj='overviewTitle']";
const ANOMALY_SAMPLE_BUTTON_SELECTOR = [
  "[data-test-subj='createHttpSampleDetectorButton']",
  "[data-test-subj='createECommerceSampleDetectorButton']",
  "[data-test-subj='createHostHealthSampleDetectorButton']",
].join(',');
const THEME_CLASS_PREFIX = 'wz-rtl-theme-';
const GLOBAL_FONT_STYLE_ID = 'wazuh-farsi-global-font';
const GLOBAL_FONT_STYLESHEET_ID = 'wazuh-farsi-font-faces';
const GLOBAL_FONT_FAMILY = '"IRANSansEn", Tahoma, Arial, sans-serif';
const FAVICON_CACHE_VERSION = '20260714-0628';

const PERSIAN_TEXT_MAP = new Map(
  Object.entries({
    'Loading ...': 'در حال بارگذاری ...',
    'Loading...': 'در حال بارگذاری...',
    'Loading…': 'در حال بارگذاری…',
    Loading: 'در حال بارگذاری',
    'Loding...': 'در حال بارگذاری...',
    'Go to home page': 'رفتن به صفحهٔ خانه',
    'Help menu': 'منوی راهنما',
    'Open selectors': 'باز کردن انتخاب‌گرها',
    'Toggle primary navigation': 'باز و بسته کردن منوی اصلی',
    'All actions': 'همه عملیات',
    'Agents by Status': 'Agentها بر اساس وضعیت',
    'Top 5 groups': '۵ گروه برتر',
    'Top 5 OS': '۵ سیستم‌عامل برتر',
    'Next page': 'صفحه بعد',
    'Previous page': 'صفحه قبل',
    'View agent details': 'مشاهده جزئیات Agent',
    'No agent is selected': 'هیچ Agentی انتخاب نشده است',
    'Select agent': 'انتخاب Agent',
    'You need to select an agent to see Security Configuration Assessment inventory.':
      'برای مشاهده موجودی ارزیابی پیکربندی امنیتی باید یک Agent انتخاب کنید.',
    'Agent ID': 'شناسه Agent',
    'Change all filters': 'تغییر همه فیلترها',
    'Date quick select': 'انتخاب سریع تاریخ',
    'See saved queries': 'مشاهده جستجوهای ذخیره‌شده',
    'Toggle legend': 'نمایش یا پنهان کردن راهنما',
    'Search bar button filters': 'فیلترهای نوار جستجو',
    'This container is too small to render the visualization':
      'فضای این بخش برای نمایش نمودار کافی نیست',
    'Integrity checksum changed.': 'مقدار بررسی یکپارچگی تغییر کرده است.',
    'Alerts by action over time': 'هشدارها بر اساس عملیات در طول زمان',
    'Events summary': 'خلاصه رخدادها',
    'Rule distribution': 'توزیع قواعد',
    'Top 5 users': '۵ کاربر برتر',
    'Top user': 'کاربر برتر',
    '- Authentication failure -': '- احراز هویت ناموفق -',
    '- Authentication success -': '- احراز هویت موفق -',
    '- Level 12 or above alerts -': '- هشدارهای سطح ۱۲ یا بالاتر -',
    '- Total -': '- مجموع -',
    'Attacks by technique': 'حملات بر اساس تکنیک',
    'Mitre techniques by agent': 'تکنیک‌های MITRE بر اساس Agent',
    'Top tactics by agent': 'تاکتیک‌های برتر بر اساس Agent',
    'Restart manager': 'راه‌اندازی مجدد Manager',
    'Restart cluster': 'راه‌اندازی مجدد کلاستر',
    'Cluster will be restarted': 'کلاستر راه‌اندازی مجدد خواهد شد',
    'Manager will be restarted': 'Manager راه‌اندازی مجدد خواهد شد',
    'Select node': 'انتخاب گره',
    'Total agents': 'مجموع Agentها',
    'Agents coverage': 'پوشش Agentها',
    'Manager information': 'اطلاعات Manager',
    'Installation path': 'مسیر نصب',
    'Installation type': 'نوع نصب',
    'Last registered agent': 'آخرین Agent ثبت‌شده',
    'Date added': 'تاریخ افزودن',
    'Last keep alive': 'آخرین ارتباط',
    'Edit configuration': 'ویرایش پیکربندی',
    'Server administration': 'مدیریت سرور',
    Capabilities: 'قابلیت‌ها',
    'Local configuration reference': 'مرجع پیکربندی محلی',
    'Cluster configuration': 'پیکربندی کلاستر',
    'Manager configuration': 'پیکربندی Manager',
    'Main configurations': 'پیکربندی‌های اصلی',
    'Global Configuration': 'پیکربندی سراسری',
    'Global and remote settings': 'تنظیمات سراسری و راه دور',
    'Master node configuration': 'پیکربندی گره اصلی',
    'Registration Service': 'سرویس ثبت‌نام',
    'Automatic agent registration service': 'سرویس ثبت‌نام خودکار Agent',
    'Logging settings that apply to the agent': 'تنظیمات ثبت Log مربوط به Agent',
    Communication: 'ارتباطات',
    'Settings related to the connection with the manager': 'تنظیمات ارتباط با Manager',
    'Anti-flooding settings': 'تنظیمات جلوگیری از سرریز',
    'Agent bucket parameters to avoid event flooding':
      'پارامترهای صف Agent برای جلوگیری از سرریز رخدادها',
    Labels: 'برچسب‌ها',
    'User-defined information about the agent included in alerts':
      'اطلاعات تعریف‌شده توسط کاربر درباره Agent که در هشدارها درج می‌شود',
    'Alerts and output management': 'مدیریت هشدارها و خروجی',
    'Settings related to the alerts and their format': 'تنظیمات هشدارها و قالب آن‌ها',
    Integrations: 'یکپارچه‌سازی‌ها',
    'Slack, VirusTotal and PagerDuty integrations with external APIs':
      'یکپارچه‌سازی Slack، VirusTotal و PagerDuty با APIهای خارجی',
    'Auditing and policy monitoring': 'ممیزی و پایش سیاست‌ها',
    'Policy monitoring': 'پایش سیاست‌ها',
    'Configuration to ensure compliance with security policies, standards and hardening guides':
      'پیکربندی برای اطمینان از انطباق با سیاست‌های امنیتی، استانداردها و راهنماهای سخت‌سازی',
    'Configuration assessment and automation of compliance monitoring using SCAP checks':
      'ارزیابی پیکربندی و خودکارسازی پایش انطباق با بررسی‌های SCAP',
    'Configuration assessment using CIS scanner and SCAP checks':
      'ارزیابی پیکربندی با اسکنر CIS و بررسی‌های SCAP',
    'System threats and incident response': 'تهدیدهای سیستم و پاسخ‌گویی به رخداد',
    Vulnerabilities: 'آسیب‌پذیری‌ها',
    'Discover what applications are affected by well-known vulnerabilities':
      'شناسایی برنامه‌های تحت تأثیر آسیب‌پذیری‌های شناخته‌شده',
    'Expose an operating system as a high-performance relational database':
      'ارائه سیستم‌عامل به شکل یک پایگاه‌داده رابطه‌ای پربازده',
    'Inventory data': 'داده‌های موجودی',
    'Gather relevant information about system operating system, hardware, networking and packages':
      'گردآوری اطلاعات سیستم‌عامل، سخت‌افزار، شبکه و پکیج‌های سیستم',
    'Active response': 'پاسخ فعال',
    'Active threat addressing by immediate response': 'مقابله فعال با تهدید از طریق پاسخ فوری',
    Commands: 'فرمان‌ها',
    'Configuration options of the Command wodle': 'گزینه‌های پیکربندی ماژول Command',
    'Docker listener': 'شنونده Docker',
    'Log data analysis': 'تحلیل داده‌های Log',
    'Log collection': 'گردآوری Log',
    'Log analysis from text files, Windows events or syslog outputs':
      'تحلیل Log فایل‌های متنی، رخدادهای Windows یا خروجی‌های syslog',
    'Integrity monitoring': 'پایش یکپارچگی',
    'Identify changes in content, permissions, ownership, and attributes of files':
      'شناسایی تغییرات محتوا، مجوزها، مالکیت و ویژگی‌های فایل‌ها',
    Agentless: 'بدون Agent',
    'Run integrity checks on devices such as routers, firewalls and switches':
      'اجرای بررسی یکپارچگی روی تجهیزاتی مانند روترها، فایروال‌ها و سوئیچ‌ها',
    'Cloud security monitoring': 'پایش امنیت ابری',
    'Security events related to Amazon AWS services, collected directly via AWS API':
      'رخدادهای امنیتی سرویس‌های Amazon AWS که مستقیم از طریق AWS API گردآوری می‌شوند',
    'Azure Logs': 'Logهای Azure',
    'Configuration options of the Azure Logs wodle': 'گزینه‌های پیکربندی ماژول Azure Logs',
    'Configuration options of the Google Cloud Pub/Sub module':
      'گزینه‌های پیکربندی ماژول Google Cloud Pub/Sub',
    'Detect threats targeting GitHub organizations':
      'شناسایی تهدیدهای هدف‌گیرنده سازمان‌های GitHub',
    'Configuration options of the Office 365 module':
      'گزینه‌های پیکربندی ماژول Office 365',
    'Application Not Found': 'برنامه پیدا نشد',
    'Loading application': 'در حال بارگذاری برنامه',
    'No application was found at this URL. Try going back or choosing an app from the menu.':
      'در این نشانی برنامه‌ای پیدا نشد. به صفحه قبل برگردید یا برنامه‌ای از منو انتخاب کنید.',
    '(opens in a new tab or window)': '(در زبانه یا پنجره جدید باز می‌شود)',
    'Open in new window': 'باز کردن در پنجره جدید',
    'Data access and users': 'دسترسی به داده و کاربران',
    'Get Started': 'شروع',
    'Get started with access control': 'شروع کنترل دسترسی',
    Authentication: 'احراز هویت',
    'Authentication and authorization': 'احراز هویت و مجوزدهی',
    'Review authentication and authorization': 'بررسی احراز هویت و مجوزدهی',
    'Backend configuration': 'پیکربندی Backend',
    'Backend type': 'نوع Backend',
    'Domain name': 'نام دامنه',
    'Execution order': 'ترتیب اجرا',
    'HTTP challenge': 'چالش HTTP',
    'HTTP configuration': 'پیکربندی HTTP',
    'HTTP type': 'نوع HTTP',
    'Manage via config.yml': 'مدیریت از طریق config.yml',
    Enabled: 'فعال',
    Disabled: 'غیرفعال',
    True: 'درست',
    False: 'نادرست',
    Roles: 'نقش‌ها',
    Role: 'نقش',
    'Create role': 'ایجاد نقش',
    'Create new role': 'ایجاد نقش جدید',
    'Create roles': 'ایجاد نقش‌ها',
    'Explore existing roles': 'بررسی نقش‌های موجود',
    'Backend roles': 'نقش‌های Backend',
    'Cluster permissions': 'مجوزهای کلاستر',
    'Index permissions': 'مجوزهای ایندکس',
    Reserved: 'رزروشده',
    Customization: 'سفارشی‌سازی',
    'Internal users': 'کاربران داخلی',
    'Create internal user': 'ایجاد کاربر داخلی',
    Username: 'نام کاربری',
    Attributes: 'ویژگی‌ها',
    Current: 'فعلی',
    Permissions: 'مجوزها',
    'All permissions': 'همه مجوزها',
    'All types': 'همه انواع',
    'Action group': 'گروه عملیات',
    'Cluster permission': 'مجوز کلاستر',
    'Index permission': 'مجوز ایندکس',
    'Create action group': 'ایجاد گروه عملیات',
    Expand: 'گسترش',
    Tenants: 'Tenantها',
    'Dashboard multi-tenancy': 'چندمستاجری داشبورد',
    'Configure Multi-tenancy': 'پیکربندی چندمستاجری',
    'Manage Multi-tenancy': 'مدیریت چندمستاجری',
    'Optional: Multi-tenancy': 'اختیاری: چندمستاجری',
    'Map users': 'نگاشت کاربران',
    'Map users to a role': 'نگاشت کاربران به یک نقش',
    'Add backends': 'افزودن Backendها',
    'Audit logs': 'Logهای ممیزی',
    'Audit logging': 'ثبت Log ممیزی',
    'Enable audit logging': 'فعال‌سازی ثبت Log ممیزی',
    'Review Audit Log Configuration': 'بررسی پیکربندی Log ممیزی',
    'Optional: Configure audit logs': 'اختیاری: پیکربندی Logهای ممیزی',
    'Optional: Purge cache': 'اختیاری: پاک‌سازی Cache',
    'Purge cache': 'پاک‌سازی Cache',
    'General settings': 'تنظیمات عمومی',
    'Compliance settings': 'تنظیمات انطباق',
    'Compliance mode': 'حالت انطباق',
    'Attribute settings': 'تنظیمات ویژگی‌ها',
    'Ignore settings': 'تنظیمات نادیده‌گیری',
    'Layer settings': 'تنظیمات لایه',
    'Storage location': 'محل ذخیره‌سازی',
    Configure: 'پیکربندی',
    Read: 'خواندن',
    Write: 'نوشتن',
    'Step 1': 'مرحله ۱',
    'Step 2': 'مرحله ۲',
    'Step 3': 'مرحله ۳',
    'View expression': 'مشاهده عبارت',
    'Config.yml documentation': 'مستندات config.yml',
    Config: 'پیکربندی',
    'This is a search bar. After typing your query, hit enter to filter the results lower in the page.':
      'این نوار جستجو است. پس از نوشتن عبارت، Enter را بزنید تا نتایج پایین صفحه فیلتر شوند.',
    Wazuh: 'Ayyza',
    'Wazuh dashboard': 'Ayyza dashboard',
    'Wazuh Dashboard': 'Ayyza Dashboard',
    'Wazuh API': 'Ayyza API',
    'Wazuh server': 'Ayyza server',
    'Wazuh manager': 'Ayyza manager',
    'Health check': 'بررسی سلامت',
    'Health Check': 'بررسی سلامت',
    'Report created': 'گزارش ساخته شد',
    'Open report': 'باز کردن گزارش',
    'See the reports on': 'گزارش‌ها را ببینید در',
    'Generate report': 'ساخت گزارش',
    Reports: 'گزارش‌ها',
    Inspect: 'بازرسی',
    'Open Inspector for visualization': 'باز کردن بازرس برای تصویرسازی',
    Share: 'اشتراک‌گذاری',
    Open: 'باز کردن',
    Save: 'ذخیره',
    New: 'جدید',
    'View roles and identities': 'مشاهده نقش‌ها و هویت‌ها',
    'Reset password': 'بازنشانی رمز عبور',
    'Log out': 'خروج',
    'Recently viewed': 'اخیراً مشاهده‌شده',
    'No recently viewed items': 'مورد اخیراً مشاهده‌شده‌ای وجود ندارد',
    'View all': 'مشاهده همه',
    Home: 'خانه',
    Overview: 'نمای کلی',
    Explore: 'کاوش',
    Discover: 'کشف',
    Dashboard: 'داشبورد',
    Dashboards: 'داشبوردها',
    Visualize: 'تصویرسازی',
    Reporting: 'گزارش‌گیری',
    Alerting: 'هشداردهی',
    'Anomaly Detection': 'تشخیص ناهنجاری',
    Maps: 'نقشه‌ها',
    Notifications: 'اعلان‌ها',
    Inventory: 'موجودی',
    Events: 'رخدادها',
    'Endpoint security': 'امنیت Endpoint',
    'Endpoint امنیت': 'امنیت Endpoint',
    'Threat intelligence': 'اطلاعات تهدید',
    'Security operations': 'عملیات امنیتی',
    'Cloud security': 'امنیت ابری',
    'Agents management': 'مدیریت Agentها',
    'System inventory': 'موجودی سیستم',
    'Server management': 'مدیریت سرور',
    'Indexer management': 'مدیریت ایندکسر',
    'مدیریت Indexer': 'مدیریت ایندکسر',
    'Index Management': 'مدیریت ایندکس‌ها',
    'Snapshot Management': 'مدیریت اسنپ‌شات‌ها',
    'Dashboard management': 'مدیریت داشبورد',
    'Dashboard Management': 'مدیریت داشبورد',
    'Dashboards Management': 'مدیریت داشبوردها',
    'Dock navigation': 'ثابت کردن منو',
    'Configuration Assessment': 'ارزیابی پیکربندی',
    'Malware Detection': 'تشخیص بدافزار',
    'File Integrity Monitoring': 'پایش یکپارچگی فایل',
    'Threat Hunting': 'جستجوی تهدید',
    'IT Hygiene': 'سلامت فاوری اطلاعات',
    'بهداشت فناوری اطلاعات': 'سلامت فاوری اطلاعات',
    Docker: 'داکر',
    'Amazon Web Services': 'سرویس‌های وب آمازون',
    'Google Cloud': 'ابر گوگل',
    GitHub: 'گیت‌هاب',
    'Office 365': 'آفیس ۳۶۵',
    'Microsoft Graph API': 'API گراف مایکروسافت',
    Cluster: 'کلاستر',
    Statistics: 'آمار',
    Security: 'امنیت',
    'Ruleset test': 'آزمون مجموعه قواعد',
    'Ruleset Test': 'آزمون مجموعه قواعد',
    'RuleSet Test': 'آزمون مجموعه قواعد',
    'RuleSet test': 'آزمون مجموعه قواعد',
    'آزمایش Ruleset': 'آزمون مجموعه قواعد',
    'Test your logs': 'آزمایش Logها',
    'API console': 'کنسول API',
    Refresh: 'تازه‌سازی',
    'Show dates': 'نمایش تاریخ‌ها',
    Today: 'امروز',
    'This week': 'این هفته',
    'Last 15 minutes': '۱۵ دقیقه گذشته',
    'Last 30 minutes': '۳۰ دقیقه گذشته',
    'Last 1 hour': '۱ ساعت گذشته',
    'Last 24 hours': '۲۴ ساعت گذشته',
    'Last 7 days': '۷ روز گذشته',
    'Last 30 days': '۳۰ روز گذشته',
    'Last 90 days': '۹۰ روز گذشته',
    Search: 'جستجو',
    'Search...': 'جستجو…',
    'Search…': 'جستجو…',
    '...Search': 'جستجو…',
    '…Search': 'جستجو…',
    '... Search': 'جستجو…',
    '… Search': 'جستجو…',
    Create: 'ایجاد',
    Generate: 'تولید',
    State: 'وضعیت',
    Type: 'نوع',
    Source: 'منبع',
    Ignored: 'نادیده‌گرفته‌شده',
    Errors: 'خطاها',
    Acknowledged: 'تأییدشده',
    Acknowledge: 'تأیید',
    'View alert details': 'مشاهده جزئیات هشدار',
    'All states': 'همه وضعیت‌ها',
    'All alerts': 'همه هشدارها',
    'All severity levels': 'همه سطوح شدت',
    Destinations: 'مقصدها',
    Destination: 'مقصد',
    Monitors: 'پایشگرها',
    Monitor: 'پایشگر',
    monitor: 'پایشگر',
    Triggers: 'محرک‌ها',
    Trigger: 'محرک',
    trigger: 'محرک',
    Channels: 'کانال‌ها',
    Channel: 'کانال',
    'Email senders': 'فرستنده‌های ایمیل',
    'Email recipient groups': 'گروه‌های گیرنده ایمیل',
    Detectors: 'آشکارسازها',
    Detector: 'آشکارساز',
    'Learn more': 'بیشتر بدانید',
    Info: 'اطلاعات',
    documentation: 'مستندات',
    Documentation: 'مستندات',
    'For additional systems and architectures, please check our':
      'برای سیستم‌ها و معماری‌های بیشتر، لطفاً',
    'Alerts related to file changes, including permissions, content, ownership and attributes':
      'هشدارهای مرتبط با تغییرات فایل، از جمله مجوزها، محتوا، مالکیت و ویژگی‌ها',
    'Alerts related to file changes, including permissions, content, ownership, and attributes':
      'هشدارهای مرتبط با تغییرات فایل، از جمله مجوزها، محتوا، مالکیت و ویژگی‌ها',
    'Alerts related to file changes, including permissions, content, ownership, and attributes.':
      'هشدارهای مرتبط با تغییرات فایل، از جمله مجوزها، محتوا، مالکیت و ویژگی‌ها.',
    'Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy.':
      'معیارهای خدمات اعتماد برای امنیت، دسترس‌پذیری، یکپارچگی پردازش، محرمانگی و حریم خصوصی.',
    'Create your first dashboard': 'اولین داشبورد خود را ایجاد کنید',
    'You can combine data views from any Wazuh dashboard app into one dashboard and see everything in one place.':
      'می‌توانید نماهای دادهٔ برنامه‌های داشبورد Wazuh را در یک داشبورد ترکیب کنید و همه‌چیز را یکجا ببینید.',
    'You can combine data views from any Ayyza dashboard app into one dashboard and see everything in one place.':
      'می‌توانید نماهای دادهٔ برنامه‌های داشبورد Ayyza را در یک داشبورد ترکیب کنید و همه‌چیز را یکجا ببینید.',
    'New to Wazuh dashboard?': 'اگر تازه با داشبورد Wazuh آشنا شده‌اید،',
    'New to Ayyza dashboard?': 'اگر تازه با داشبورد Ayyza آشنا شده‌اید،',
    'Install some sample data': 'چند دادهٔ نمونه نصب کنید',
    'to take a test drive': 'و داشبورد را آزمایش کنید',
    'to take a test drive.': 'و داشبورد را آزمایش کنید.',
    'Create new dashboard': 'ایجاد داشبورد جدید',
    'New Visualization': 'تصویرسازی جدید',
    Area: 'نمودار سطحی',
    'Emphasize the quantity beneath a line chart':
      'مقدار زیر نمودار خطی را برجسته می‌کند',
    Filter: 'فیلتر',
    'Data Table': 'جدول داده',
    'Coordinate Map': 'نقشهٔ مختصات',
    Controls: 'کنترل‌ها',
    'Heat Map': 'نقشهٔ حرارتی',
    Goal: 'هدف',
    Gauge: 'سنجه',
    'Gantt Chart': 'نمودار گانت',
    Markdown: 'متن Markdown',
    Line: 'نمودار خطی',
    'Horizontal Bar': 'نمودار میله‌ای افقی',
    TSVB: 'سازندهٔ سری زمانی TSVB',
    'Region Map': 'نقشهٔ ناحیه‌ای',
    Pie: 'نمودار دایره‌ای',
    Metric: 'شاخص عددی',
    'Vertical Bar': 'نمودار میله‌ای عمودی',
    Vega: 'تصویرسازی Vega',
    Timeline: 'خط زمان',
    'Tag Cloud': 'ابر برچسب',
    'New Data Table / Choose a source': 'جدول دادهٔ جدید / انتخاب منبع',
    Types: 'نوع‌ها',
    Sort: 'مرتب‌سازی',
    Ascending: 'صعودی',
    Descending: 'نزولی',
    'This visualization is experimental and is not subject to the support SLA of official GA features.':
      'این تصویرسازی آزمایشی است و مشمول SLA پشتیبانی قابلیت‌های رسمی GA نیست.',
    'This visualization is experimental and is not subject to the support SLA of official GA features. For feedback, please create an issue in':
      'این تصویرسازی آزمایشی است و مشمول SLA پشتیبانی قابلیت‌های رسمی GA نیست. برای ارسال بازخورد، لطفاً یک issue در',
    'For feedback, please create an issue in':
      'برای ارسال بازخورد، لطفاً یک issue در',
    Options: 'گزینه‌ها',
    Add: 'افزودن',
    'Options list': 'فهرست گزینه‌ها',
    'Report settings': 'تنظیمات گزارش',
    'Report name (e.g Log Traffic Daily Report)':
      'نام گزارش (برای نمونه: گزارش روزانهٔ ترافیک Log)',
    'Valid characters are a-z, A-Z, 0-9, (), [], _ (underscore), - (hyphen) and . (space).':
      'نویسه‌های مجاز شامل a-z، A-Z، 0-9، پرانتز، کروشه، زیرخط، خط تیره و فاصله هستند.',
    'Valid characters are a-z, A-Z, 0-9, (), [], _ (underscore), - (hyphen) and (space).':
      'نویسه‌های مجاز شامل a-z، A-Z، 0-9، پرانتز، کروشه، زیرخط، خط تیره و فاصله هستند.',
    'Description (optional)': 'توضیحات (اختیاری)',
    'Describe this report (e.g Morning daily reports for log traffic)':
      'این گزارش را توضیح دهید (برای نمونه: گزارش روزانهٔ صبحگاهی ترافیک Log)',
    'Report source': 'منبع گزارش',
    Visualization: 'تصویرسازی',
    'Saved search': 'جستجوی ذخیره‌شده',
    Notebook: 'دفترچه',
    'Select dashboard': 'انتخاب داشبورد',
    'Select a dashboard': 'یک داشبورد انتخاب کنید',
    'Time range': 'بازهٔ زمانی',
    'Time range is relative to the report creation date on the report trigger.':
      'بازهٔ زمانی نسبت به تاریخ ایجاد گزارش در زمان فعال‌شدن گزارش محاسبه می‌شود.',
    'File format': 'قالب فایل',
    'Report header and footer': 'سربرگ و پابرگ گزارش',
    'Add header': 'افزودن سربرگ',
    'Add footer': 'افزودن پابرگ',
    'Report trigger': 'اجرای گزارش',
    'On demand': 'درخواستی',
    Schedule: 'زمان‌بندی',
    Cancel: 'انصراف',
    'Monitor details': 'جزئیات پایشگر',
    'Monitor type': 'نوع پایشگر',
    'Composite monitor': 'پایشگر ترکیبی',
    'Composite monitors chain the outputs of different monitor types and focus trigger conditions to reduce alert noise and generate finer results.':
      'پایشگرهای ترکیبی خروجی انواع مختلف پایشگر را زنجیره می‌کنند و با تمرکز شرایط محرک، نویز هشدار را کاهش می‌دهند و نتایج دقیق‌تری تولید می‌کنند.',
    'Per document monitor': 'پایشگر به‌ازای هر سند',
    'Per document monitors run queries that return individual documents matching the trigger conditions.':
      'پایشگرهای سندی کوئری‌هایی را اجرا می‌کنند که اسناد منطبق با شرایط محرک را برمی‌گردانند.',
    'Per cluster metrics monitor': 'پایشگر معیارهای Cluster',
    'Per cluster metrics monitors run API requests to monitor the cluster’s health.':
      'پایشگرهای معیارهای Cluster برای بررسی سلامت Cluster درخواست‌های API را اجرا می‌کنند.',
    'Per bucket monitor': 'پایشگر به‌ازای هر Bucket',
    'Per bucket monitors run a query that evaluates trigger criteria based on aggregated values in the dataset.':
      'پایشگرهای Bucket کوئری‌ای اجرا می‌کنند که معیارهای محرک را بر اساس مقادیر تجمیع‌شدهٔ مجموعه‌داده ارزیابی می‌کند.',
    'Per query monitor': 'پایشگر به‌ازای هر کوئری',
    'Per query monitors run a query and generate alerts based on trigger criteria that match query results.':
      'پایشگرهای کوئری، کوئری را اجرا می‌کنند و بر اساس معیارهای محرک منطبق با نتایج، هشدار می‌سازند.',
    'Monitor defining method': 'روش تعریف پایشگر',
    'Specify the way you want to define your query and triggers':
      'روش تعریف کوئری و محرک‌ها را مشخص کنید',
    'Specify the way you want to define your query and triggers.':
      'روش تعریف کوئری و محرک‌ها را مشخص کنید.',
    'Anomaly detector': 'آشکارساز ناهنجاری',
    'Extraction query editor': 'ویرایشگر کوئری استخراج',
    'Visual editor': 'ویرایشگر دیداری',
    Frequency: 'تناوب',
    'By interval': 'بر اساس فاصلهٔ زمانی',
    'Run every': 'اجرا در هر',
    'Minute(s)': 'دقیقه',
    'Select data': 'انتخاب داده',
    'Select clusters': 'انتخاب Clusterها',
    'Select a local cluster or remote clusters from cross-cluster connections':
      'یک Cluster محلی یا Clusterهای راه‌دور را از اتصال‌های بین‌Cluster انتخاب کنید',
    'Select a local cluster or remote clusters from cross-cluster connections.':
      'یک Cluster محلی یا Clusterهای راه‌دور را از اتصال‌های بین‌Cluster انتخاب کنید.',
    Indices: 'ایندکس‌ها',
    'Select one or more indexes or wildcard patterns':
      'یک یا چند ایندکس یا الگوی wildcard انتخاب کنید',
    'You can use * as a wildcard or date math index resolution in your index pattern.':
      'در الگوی ایندکس می‌توانید از * به‌عنوان wildcard یا از محاسبات تاریخ برای تفکیک ایندکس استفاده کنید.',
    'Time field': 'فیلد زمان',
    'Select a time field': 'یک فیلد زمان انتخاب کنید',
    'Choose the time field you want to use for your x-axis':
      'فیلد زمانی مورد استفاده برای محور x را انتخاب کنید',
    Query: 'کوئری',
    'You must specify an index.': 'باید یک ایندکس مشخص کنید.',
    'No triggers': 'هیچ محرکی وجود ندارد',
    'Add a trigger to define conditions and actions':
      'برای تعریف شرایط و عملیات، یک محرک اضافه کنید',
    'Add a trigger to define conditions and actions.':
      'برای تعریف شرایط و عملیات، یک محرک اضافه کنید.',
    'Add trigger': 'افزودن محرک',
    'No results match your search criteria':
      'هیچ نتیجه‌ای با معیارهای جستجوی شما مطابقت ندارد',
    'No results match your search criteria.':
      'هیچ نتیجه‌ای با معیارهای جستجوی شما مطابقت ندارد.',
    'No results match for this search criteria.':
      'هیچ نتیجه‌ای با معیار جستجوی شما مطابقت ندارد.',
    'TOP 5 GROUPS': '۵ گروه برتر',
    'TOP 5 OS': '۵ سیستم‌عامل برتر',
    'AGENTS BY STATUS': 'Agentها بر اساس وضعیت',
    Pending: 'در انتظار',
    'Never connected': 'هرگز متصل نشده',
    active: 'فعال',
    More: 'بیشتر',
    'More...': 'بیشتر...',
    'Export formatted': 'خروجی قالب‌بندی‌شده',
    'Deploy new agent': 'استقرار Agent جدید',
    'Select the package to download and install on your system':
      'بسته مناسب را برای دانلود و نصب روی سیستم انتخاب کنید',
    'Select the package to download and install on your system:':
      'بسته مناسب را برای دانلود و نصب روی سیستم انتخاب کنید:',
    'For additional systems and architectures, please check our documentation':
      'برای سیستم‌ها و معماری‌های دیگر، مستندات را ببینید',
    'For additional systems and architectures, please check our documentation.':
      'برای سیستم‌ها و معماری‌های دیگر، مستندات را ببینید.',
    'Server address': 'آدرس سرور',
    'Server address:': 'آدرس سرور:',
    'Assign a server address': 'تعیین آدرس سرور',
    'Learn about': 'درباره',
    'Remember server address': 'به‌خاطر سپردن آدرس سرور',
    'Error saving server address configuration':
      'خطا در ذخیره پیکربندی آدرس سرور',
    'This is the address the agent uses to communicate with the server. Enter an IP address or a fully qualified domain name (FQDN).':
      'این آدرسی است که Agent برای ارتباط با سرور استفاده می‌کند. یک آدرس IP یا نام دامنه کامل (FQDN) وارد کنید.',
    'Optional settings': 'تنظیمات اختیاری',
    'Optional settings:': 'تنظیمات اختیاری:',
    'By default, the deployment uses the hostname as the agent name. Optionally, you can use a different agent name in the field below':
      'به‌صورت پیش‌فرض، نام میزبان به‌عنوان نام Agent استفاده می‌شود. در صورت نیاز می‌توانید در فیلد زیر نام دیگری برای Agent وارد کنید',
    'By default, the deployment uses the hostname as the agent name. Optionally, you can use a different agent name in the field below.':
      'به‌صورت پیش‌فرض، نام میزبان به‌عنوان نام Agent استفاده می‌شود. در صورت نیاز می‌توانید در فیلد زیر نام دیگری برای Agent وارد کنید.',
    'Assign an agent name': 'تعیین نام Agent',
    'Agent نام': 'نام Agent',
    'The agent name must be unique. It can’t be changed once the agent has been enrolled':
      'نام Agent باید یکتا باشد و پس از ثبت Agent قابل تغییر نیست',
    'The agent name must be unique. It can’t be changed once the agent has been enrolled.':
      'نام Agent باید یکتا باشد و پس از ثبت Agent قابل تغییر نیست.',
    "The agent name must be unique. It can't be changed once the agent has been enrolled":
      'نام Agent باید یکتا باشد و پس از ثبت Agent قابل تغییر نیست',
    "The agent name must be unique. It can't be changed once the agent has been enrolled.":
      'نام Agent باید یکتا باشد و پس از ثبت Agent قابل تغییر نیست.',
    'Select one or more existing groups': 'یک یا چند گروه موجود را انتخاب کنید',
    Password: 'رمز عبور',
    'The password is required but wasn\'t defined. Please check our':
      'رمز عبور الزامی است اما تعریف نشده است. لطفاً مستندات را بررسی کنید',
    "The password is required but wasn't defined. Please check our":
      'رمز عبور الزامی است اما تعریف نشده است. لطفاً مستندات را بررسی کنید',
    'Run the following commands to download and install the agent':
      'دستورهای زیر را برای دانلود و نصب Agent اجرا کنید',
    'Run the following commands to download and install the agent:':
      'دستورهای زیر را برای دانلود و نصب Agent اجرا کنید:',
    'Please select the operating system and server address':
      'لطفاً سیستم‌عامل و آدرس سرور را انتخاب کنید',
    'Please select the operating system and server address.':
      'لطفاً سیستم‌عامل و آدرس سرور را انتخاب کنید.',
    'Start the agent': 'راه‌اندازی Agent',
    'Start the agent:': 'راه‌اندازی Agent:',
    'Go to endpoints to verify the agent connection':
      'برای بررسی اتصال Agent به Endpointها بروید',
    'Go to endpoints to verify the agent connection:':
      'برای بررسی اتصال Agent به Endpointها بروید:',
    'Back to agent list': 'بازگشت به فهرست Agentها',
    'Add new group': 'افزودن گروه جدید',
    'Add new rules file': 'افزودن فایل قواعد',
    'Manage rules files': 'مدیریت فایل‌های قواعد',
    'Add new decoders file': 'افزودن فایل دیکودرها',
    'Manage decoders files': 'مدیریت فایل‌های دیکودرها',
    'Add new lists file': 'افزودن فایل فهرست',
    'Import files': 'وارد کردن فایل‌ها',
    'Save new group': 'ذخیره گروه جدید',
    'Custom rules': 'قواعد سفارشی',
    'Custom decoders': 'دیکودرهای سفارشی',
    'Custom lists': 'لیست‌های سفارشی',
    Agents: 'Agentها',
    Endpoints: 'Endpointها',
    Summary: 'خلاصه',
    Files: 'فایل‌ها',
    Groups: 'گروه‌ها',
    Rules: 'قواعد',
    Rule: 'قاعده',
    'Ruleها': 'قواعد',
    'Ruleهای': 'قواعد',
    Decoders: 'دیکودرها',
    Decoder: 'دیکودر',
    'Decoderها': 'دیکودرها',
    'Decoderهای': 'دیکودرهای',
    'CDB Lists': 'فهرست‌های CDB',
    'لیست‌های CDB': 'فهرست‌های CDB',
    'From here you can list and check your groups, its agents and files.':
      'از اینجا می‌توانید گروه‌ها، Agentها و فایل‌های آن‌ها را فهرست و بررسی کنید.',
    'From here you can manage your rules':
      'از اینجا می‌توانید قواعد خود را مدیریت کنید',
    'From here you can manage your rules.':
      'از اینجا می‌توانید قواعد خود را مدیریت کنید.',
    'From here you can manage your rules files.':
      'از اینجا می‌توانید فایل‌های قواعد خود را مدیریت کنید.',
    'From here you can manage your decoders':
      'از اینجا می‌توانید دیکودرهای خود را مدیریت کنید',
    'From here you can manage your decoders.':
      'از اینجا می‌توانید دیکودرهای خود را مدیریت کنید.',
    'From here you can manage your decoders files.':
      'از اینجا می‌توانید فایل‌های دیکودرهای خود را مدیریت کنید.',
    'From here you can manage your lists':
      'از اینجا می‌توانید لیست‌های خود را مدیریت کنید',
    'From here you can manage your lists.':
      'از اینجا می‌توانید لیست‌های خود را مدیریت کنید.',
    'From here you can check all your reports.':
      'از اینجا می‌توانید همه گزارش‌های خود را بررسی کنید.',
    'From here you can list and manage your agents':
      'از اینجا می‌توانید Agentهای خود را فهرست و مدیریت کنید.',
    'From here you can list and see your group files, also, you can edit the group configuration':
      'از اینجا می‌توانید فایل‌های گروه را فهرست و مشاهده کنید و پیکربندی گروه را ویرایش کنید.',
    'From here you can manage and configure the API entries. You can also check their connection and status.':
      'از اینجا می‌توانید ورودی‌های API را مدیریت و پیکربندی کنید و اتصال و وضعیت آن‌ها را بررسی کنید.',
    'From here you can see daemon statistics.':
      'از اینجا می‌توانید آمار daemon را ببینید.',
    Name: 'نام',
    'IP address': 'آدرس IP',
    'Group(s)': 'گروه‌ها',
    'Cluster node': 'گره Cluster',
    Version: 'نسخه',
    Status: 'وضعیت',
    Actions: 'عملیات',
    'Configuration checksum': 'Checksum پیکربندی',
    'Regulatory compliance': 'انطباق مقرراتی',
    'Creation time': 'زمان ایجاد',
    'Last Updated': 'آخرین به‌روزرسانی',
    'Last updated': 'آخرین به‌روزرسانی',
    'Schedule details': 'جزئیات زمان‌بندی',
    File: 'فایل',
    'Program name': 'نام برنامه',
    Order: 'ترتیب',
    ID: 'شناسه',
    'Add filter': 'افزودن فیلتر',
    'Check API connection': 'بررسی اتصال API',
    'API connection': 'اتصال API',
    'Check API version': 'بررسی نسخه API',
    'API version': 'نسخه API',
    'Check alerts index pattern': 'بررسی index pattern هشدارها',
    'Alerts index pattern': 'index pattern هشدارها',
    'Check monitoring index pattern': 'بررسی index pattern مانیتورینگ',
    'Monitoring index pattern': 'index pattern مانیتورینگ',
    'Check statistics index pattern': 'بررسی index pattern آمار',
    'Statistics index pattern': 'index pattern آمار',
    'Browse through your security alerts, identifying issues and threats in your environment.':
      'هشدارهای امنیتی را مرور کنید و رخدادها و تهدیدهای محیط خود را شناسایی کنید.',
    'Alerts related to file changes, including permissions, content, ownership and attributes.':
      'هشدارهای مربوط به تغییرات فایل، از جمله مجوزها، محتوا، مالکیت و ویژگی‌ها.',
    'Check indicators of compromise triggered by malware infections or cyberattacks.':
      'شاخص‌های نفوذ ناشی از آلودگی بدافزاری یا حملات سایبری را بررسی کنید.',
    'Discover what applications in your environment are affected by well-known vulnerabilities.':
      'برنامه‌هایی را که در محیط شما تحت تأثیر آسیب‌پذیری‌های شناخته‌شده هستند شناسایی کنید.',
    'Scan your assets as part of a configuration assessment audit.':
      'دارایی‌های خود را به عنوان بخشی از ممیزی ارزیابی پیکربندی اسکن کنید.',
    'Configuration assessment and automation of compliance monitoring using SCAP checks.':
      'ارزیابی پیکربندی و خودکارسازی پایش انطباق با استفاده از بررسی‌های SCAP.',
    'Audit users behavior, monitoring command execution and alerting on access to critical files.':
      'رفتار کاربران، اجرای دستورها و دسترسی به فایل‌های حساس را ممیزی و پایش کنید.',
    'Global security standard for entities that process, store or transmit payment cardholder data.':
      'استاندارد امنیتی جهانی برای سازمان‌هایی که داده‌های کارت پرداخت را پردازش، ذخیره یا منتقل می‌کنند.',
    'Global security standard for entities that process, store, or transmit payment cardholder data.':
      'استاندارد امنیتی جهانی برای سازمان‌هایی که داده‌های کارت پرداخت را پردازش، ذخیره یا منتقل می‌کنند.',
    'Global security standard for entities that process, store or transmit payment cardholder data':
      'استاندارد امنیتی جهانی برای سازمان‌هایی که داده‌های کارت پرداخت را پردازش، ذخیره یا منتقل می‌کنند',
    'Global security standard for entities that process, store, or transmit payment cardholder data':
      'استاندارد امنیتی جهانی برای سازمان‌هایی که داده‌های کارت پرداخت را پردازش، ذخیره یا منتقل می‌کنند',
    'Security events related to your Amazon AWS services, collected directly via AWS API.':
      'رخدادهای امنیتی سرویس‌های Amazon AWS که مستقیم از طریق AWS API جمع‌آوری می‌شوند.',
    'Security events related to your Amazon AWS services, collected directly via AWS API':
      'رخدادهای امنیتی سرویس‌های Amazon AWS که مستقیم از طریق AWS API جمع‌آوری می‌شوند',
    'Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events.':
      'فعالیت containerهای Docker مانند ایجاد، اجرا، شروع، توقف یا pause را پایش و جمع‌آوری کنید.',
    'Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events':
      'فعالیت containerهای Docker مانند ایجاد، اجرا، شروع، توقف یا pause را پایش و جمع‌آوری کنید',
    'Assess system, software, processes, and network layers to detect misconfigurations, unauthorized changes, and anomalies.':
      'سیستم، نرم‌افزار، فرایندها و لایه‌های شبکه را برای کشف پیکربندی نادرست، تغییرات غیرمجاز و ناهنجاری‌ها ارزیابی کنید.',
    'Assess system, software, processes, and network layers to detect misconfigurations, unauthorized changes, and anomalies':
      'سیستم، نرم‌افزار، فرایندها و لایه‌های شبکه را برای کشف پیکربندی نادرست، تغییرات غیرمجاز و ناهنجاری‌ها ارزیابی کنید',
    'Monitoring events from audit logs of your GitHub organizations.':
      'رخدادهای audit log سازمان‌های GitHub خود را پایش کنید.',
    'Monitoring events from audit logs of your GitHub organizations':
      'رخدادهای audit log سازمان‌های GitHub خود را پایش کنید',
    'Security events related to your Google Cloud Platform services, collected directly via GCP API.':
      'رخدادهای امنیتی سرویس‌های Google Cloud Platform که مستقیم از طریق GCP API جمع‌آوری می‌شوند.',
    'Security events related to your Google Cloud Platform services, collected directly via GCP API':
      'رخدادهای امنیتی سرویس‌های Google Cloud Platform که مستقیم از طریق GCP API جمع‌آوری می‌شوند',
    'Security events related to your Microsoft Graph services, collected directly via Microsoft Graph API.':
      'رخدادهای امنیتی سرویس‌های Microsoft Graph که مستقیم از طریق Microsoft Graph API جمع‌آوری می‌شوند.',
    'Security events related to your Microsoft Graph services, collected directly via Microsoft Graph API':
      'رخدادهای امنیتی سرویس‌های Microsoft Graph که مستقیم از طریق Microsoft Graph API جمع‌آوری می‌شوند',
    'Security events related to your Office 365 services.':
      'رخدادهای امنیتی مربوط به سرویس‌های Office 365.',
    'Security events related to your Office 365 services':
      'رخدادهای امنیتی مربوط به سرویس‌های Office 365',
    'Health Insurance Portability and Accountability Act of 1996 (HIPAA) provides data privacy and security provisions for safeguarding medical information.':
      'قانون HIPAA چارچوب حریم خصوصی و امنیت داده‌ها را برای حفاظت از اطلاعات پزشکی فراهم می‌کند.',
    'Health Insurance Portability and Accountability Act of 1996 (HIPAA) provides data privacy and security provisions for safeguarding medical information':
      'قانون HIPAA چارچوب حریم خصوصی و امنیت داده‌ها را برای حفاظت از اطلاعات پزشکی فراهم می‌کند',
    'Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy':
      'معیارهای خدمات اعتماد برای امنیت، دسترس‌پذیری، یکپارچگی پردازش، محرمانگی و حریم خصوصی',
    'General Data Protection Regulation (GDPR) sets guidelines for processing of personal data.':
      'مقررات عمومی حفاظت از داده‌ها که چارچوب پردازش داده‌های شخصی را مشخص می‌کند.',
    'National Institute of Standards and Technology Special Publication 800-53 (NIST 800-53) sets guidelines for federal information systems.':
      'راهنمای NIST برای کنترل‌های امنیتی سامانه‌های اطلاعاتی.',
    'Explore security alerts mapped to adversary tactics and techniques for better threat understanding.':
      'هشدارهای امنیتی نگاشت‌شده به تاکتیک‌ها و تکنیک‌های مهاجمان را برای درک بهتر تهدید بررسی کنید.',
    INFO: 'اطلاع',
    ACTION: 'اقدام',
    WARNING: 'هشدار',
    ERROR: 'خطا',
    'Alerts evolution over time': 'روند هشدارها در طول زمان',
    'Top tactics': 'تاکتیک‌های برتر',
    'Rule level by attack': 'سطح قاعده بر اساس حمله',
    'MITRE attacks by tactic': 'حمله‌های MITRE بر اساس تاکتیک',
    'Rule level by tactic': 'سطح قاعده بر اساس تاکتیک',
    'rule.mitre.tactic: Descending': 'rule.mitre.tactic: نزولی',
    'Password Guessing': 'حدس رمز عبور',
    'Brute Force': 'حمله Brute Force',
    SSH: 'SSH',
    'Stored Data Manipulat': 'دستکاری داده ذخیره‌شده',
    'Stored Data Manipulation': 'دستکاری داده ذخیره‌شده',
    'Valid Accounts': 'حساب‌های معتبر',
    'Credential Access': 'دسترسی به اعتبارنامه',
    'Lateral Movement': 'حرکت جانبی',
    Impact: 'اثرگذاری',
    'Defense Evasion': 'دور زدن دفاع',
    'Privilege Escalation': 'ارتقای دسترسی',
    'Initial Access': 'دسترسی اولیه',
    Persistence: 'ماندگاری',
    'Operating system families': 'خانواده‌های سیستم‌عامل',
    'Operating system': 'سیستم‌عامل',
    'Package types': 'نوع پکیج‌ها',
    'Top 5 endpoints by memory usage': '۵ Endpoint برتر بر اساس مصرف حافظه',
    'Total memory': 'حافظه کل',
    Usage: 'مصرف',
    'Top 5 installed packages': '۵ پکیج نصب‌شده برتر',
    'Top 5 running processes': '۵ فرایند در حال اجرا برتر',
    'Top 5 operating systems': '۵ سیستم‌عامل برتر',
    'Top 5 host CPUs': '۵ پردازنده میزبان برتر',
    'Top 5 destination ports': '۵ پورت مقصد برتر',
    'Top 5 source ports': '۵ پورت مبدا برتر',
    'Processes start time': 'زمان شروع فرایندها',
    'Top 5 rules': '۵ قاعده برتر',
    'Top 5 requirements': '۵ الزام برتر',
    'Top 10 requirements': '۱۰ الزام برتر',
    'Top 5 PCI DSS requirements': '۵ الزام برتر PCI DSS',
    'PCI DSS requirements': 'الزامات PCI DSS',
    'PCI DSS Requirements': 'الزامات PCI DSS',
    'GDPR requirements': 'الزامات GDPR',
    'GDPR Requirements': 'الزامات GDPR',
    'HIPAA requirements': 'الزامات HIPAA',
    'HIPAA Requirements': 'الزامات HIPAA',
    'NIST 800-53 requirements': 'الزامات NIST 800-53',
    'NIST 800-53 Requirements': 'الزامات NIST 800-53',
    'TSC requirements': 'الزامات TSC',
    'TSC Requirements': 'الزامات TSC',
    'Top 5 TSC requirements': '۵ الزام برتر TSC',
    'Requirements over time': 'روند الزامات در زمان',
    'Requirements evolution over time': 'روند تغییرات الزامات در زمان',
    'Requirements distributed by level': 'توزیع الزامات بر اساس سطح',
    'Requirements distribution by level': 'توزیع الزامات بر اساس سطح',
    'Rule level distribution': 'توزیع سطح قاعده',
    'Most common alerts': 'رایج‌ترین هشدارها',
    'Total alerts': 'کل هشدارها',
    'Max rule level': 'بیشترین سطح قاعده',
    'Max rule level detected': 'بیشترین سطح قاعده شناسایی‌شده',
    Requirement: 'الزام',
    'Requirement(s)': 'الزام‌ها',
    Requirements: 'الزامات',
    'Hide requirements with no alerts': 'الزام‌های بدون هشدار را پنهان کن',
    'Filter requirements': 'فیلتر الزامات',
    'There are no results.': 'نتیجه‌ای وجود ندارد.',
    'No reports to display': 'گزارشی برای نمایش وجود ندارد',
    'No report definitions to display': 'تعریف گزارشی برای نمایش وجود ندارد',
    'Report definitions': 'تعریف‌های گزارش',
    'Create report definition': 'ایجاد تعریف گزارش',
    'Create a report definition, or share/download a report from a dashboard, saved search or visualization':
      'یک تعریف گزارش بسازید، یا از داشبورد، جستجوی ذخیره‌شده یا تصویرسازی، گزارش را اشتراک‌گذاری یا دانلود کنید',
    'Create a report definition, or share/download a report from a dashboard, saved search or visualization.':
      'یک تعریف گزارش بسازید، یا از داشبورد، جستجوی ذخیره‌شده یا تصویرسازی، گزارش را اشتراک‌گذاری یا دانلود کنید.',
    'Create a new report definition to get started':
      'برای شروع، یک تعریف گزارش جدید بسازید',
    'To learn more, see': 'برای اطلاعات بیشتر ببینید',
    'Get started with OpenSearch Dashboards reporting':
      'شروع کار با گزارش‌گیری OpenSearch Dashboards',
    'Alerts by triggers': 'هشدارها بر اساس محرک‌ها',
    'Monitor name': 'نام پایشگر',
    Severity: 'شدت',
    'Trigger last updated': 'آخرین به‌روزرسانی محرک',
    'Trigger start time': 'زمان شروع محرک',
    'Trigger name': 'نام محرک',
    'Create monitor': 'ایجاد پایشگر',
    'There are no existing alerts. Create a monitor to add triggers and actions. Once an alarm is triggered, the state will show in this table':
      'هشدار موجودی وجود ندارد. برای افزودن محرک‌ها و عملیات، یک پایشگر بسازید. پس از فعال‌شدن هشدار، وضعیت آن در این جدول نمایش داده می‌شود',
    'There are no existing alerts. Create a monitor to add triggers and actions. Once an alarm is triggered, the state will show in this table.':
      'هشدار موجودی وجود ندارد. برای افزودن محرک‌ها و عملیات، یک پایشگر بسازید. پس از فعال‌شدن هشدار، وضعیت آن در این جدول نمایش داده می‌شود.',
    '... with composite monitors': '... با پایشگرهای ترکیبی',
    '...with composite monitors': '... با پایشگرهای ترکیبی',
    '… with composite monitors': '… با پایشگرهای ترکیبی',
    '…with composite monitors': '… با پایشگرهای ترکیبی',
    '... with composite monitors': '… با پایشگرهای ترکیبی',
    'Last notification time': 'زمان آخرین اعلان',
    'Latest alert': 'آخرین هشدار',
    'There are no existing monitors. Create a monitor to add triggers and actions':
      'پایشگر موجودی وجود ندارد. برای افزودن محرک‌ها و عملیات، یک پایشگر بسازید',
    'There are no existing monitors. Create a monitor to add triggers and actions.':
      'پایشگر موجودی وجود ندارد. برای افزودن محرک‌ها و عملیات، یک پایشگر بسازید.',
    '.There are no existing monitors. Create a monitor to add triggers and actions':
      'پایشگر موجودی وجود ندارد. برای افزودن محرک‌ها و عملیات، یک پایشگر بسازید.',
    '.There are no existing monitors. Create a monitor to add triggers and actions.':
      'پایشگر موجودی وجود ندارد. برای افزودن محرک‌ها و عملیات، یک پایشگر بسازید.',
    'Destinations have become channels in Notifications':
      'مقصدها در اعلان‌ها به کانال تبدیل شده‌اند',
    'Your destinations have been migrated as channels in Notifications, a new centralized place to manage your notification channels. Destinations will be deprecated going forward.':
      'مقصدهای شما به‌عنوان کانال به بخش اعلان‌ها منتقل شده‌اند؛ این بخش محل متمرکز جدید برای مدیریت کانال‌های اعلان است. مقصدها در نسخه‌های بعدی کنار گذاشته می‌شوند.',
    'View in Notifications': 'مشاهده در اعلان‌ها',
    'Create channel': 'ایجاد کانال',
    'No channels to display': 'کانالی برای نمایش وجود ندارد',
    'To send or receive notifications, you will need to create a notification channel':
      'برای ارسال یا دریافت اعلان‌ها باید یک کانال اعلان بسازید',
    'To send or receive notifications, you will need to create a notification channel.':
      'برای ارسال یا دریافت اعلان‌ها باید یک کانال اعلان بسازید.',
    'To send or receive notifications, you will need to create a notification" ".channel':
      'برای ارسال یا دریافت اعلان‌ها باید یک کانال اعلان بسازید.',
    'To send or receive notifications, you will need to create a notification".channel':
      'برای ارسال یا دریافت اعلان‌ها باید یک کانال اعلان بسازید.',
    'To send or receive notifications, you will need to create a notification channel".':
      'برای ارسال یا دریافت اعلان‌ها باید یک کانال اعلان بسازید.',
    'Notification status': 'وضعیت اعلان',
    Now: 'اکنون',
    Relative: 'نسبی',
    Absolute: 'مطلق',
    'Minutes ago': 'دقیقه پیش',
    'Round to the minute': 'گرد کردن به دقیقه',
    'Start date': 'تاریخ شروع',
    'Real-time dashboard': 'داشبورد بی‌درنگ',
    'You have no detectors': 'هیچ آشکارسازی ندارید',
    'Create detector first to detect anomalies in your data.':
      'برای تشخیص ناهنجاری‌ها در داده‌های خود، ابتدا یک آشکارساز ایجاد کنید.',
    'Dashboard will generate insights on the anomalies across all of your detectors.':
      'داشبورد دربارهٔ ناهنجاری‌های همهٔ آشکارسازهای شما بینش ایجاد می‌کند.',
    'Read about': 'دربارهٔ این موضوع بخوانید',
    'Get started with Anomaly detection': 'شروع کار با تشخیص ناهنجاری',
    'Try a sample detector': 'یک آشکارساز نمونه را امتحان کنید',
    'All indices': 'همهٔ ایندکس‌ها',
    'All detector states': 'همهٔ وضعیت‌های آشکارساز',
    'Last started': 'آخرین شروع',
    'Last real-time occurrence': 'آخرین رخداد بی‌درنگ',
    'Anomalies last 24 hours': 'ناهنجاری‌های ۲۴ ساعت گذشته',
    'Historical analysis': 'تحلیل تاریخی',
    'Real-time state': 'وضعیت بی‌درنگ',
    'A detector is an individual anomaly detection task. You can create multiple detectors, and all the detectors can run simultaneously, with each analyzing data from different sources. Create an anomaly detector to get started.':
      'آشکارساز یک وظیفهٔ مستقل تشخیص ناهنجاری است. می‌توانید چندین آشکارساز ایجاد کنید و همهٔ آن‌ها را هم‌زمان اجرا کنید؛ هرکدام داده‌های منابع متفاوتی را تحلیل می‌کنند. برای شروع یک آشکارساز ناهنجاری ایجاد کنید.',
    'Name and description': 'نام و توضیحات',
    'Enter channel name': 'نام کانال را وارد کنید',
    'Description - optional': 'توضیحات — اختیاری',
    'Description -': 'توضیحات —',
    optional: 'اختیاری',
    'What is the purpose of this channel?': 'هدف این کانال چیست؟',
    Configurations: 'پیکربندی‌ها',
    'Channel type': 'نوع کانال',
    'Channel type cannot be changed after the channel is created.':
      'پس از ایجاد کانال، نوع آن قابل تغییر نیست.',
    'Slack webhook URL': 'نشانی Webhook اسلک',
    'Send test message': 'ارسال پیام آزمایشی',
    'Notification channels': 'کانال‌های اعلان',
    'Explore agent': 'بررسی Agent',
    Group: 'گروه',
    'No items found': 'موردی یافت نشد',
    'You need to select an agent to see Integrity Monitoring inventory.':
      'برای مشاهدهٔ موجودی پایش یکپارچگی، باید یک Agent انتخاب کنید.',
    'Checking data source': 'در حال بررسی منبع داده',
    'Under evaluation': 'در حال ارزیابی',
    Evaluated: 'ارزیابی‌شده',
    Framework: 'چارچوب',
    Intelligence: 'هوشمندی',
    'Hide techniques with no alerts': 'تکنیک‌های بدون هشدار پنهان شوند',
    Services: 'سرویس‌ها',
    Identity: 'هویت',
    Network: 'شبکه',
    Processes: 'فرایندها',
    Software: 'نرم‌افزار',
    System: 'سیستم',
    'Advanced filters': 'فیلترهای پیشرفته',
    'Top 10 PCI DSS requirements': '۱۰ الزام برتر PCI DSS',
    'Top 10 agents by alerts count': '۱۰ Agent برتر بر اساس تعداد هشدار',
    'timestamp per 30 minutes': 'زمان ثبت در هر ۳۰ دقیقه',
    'Last alerts': 'آخرین هشدارها',
    'Requirements by agent': 'الزامات به تفکیک Agent',
    'Create detector': 'ایجاد آشکارساز',
    'Anomaly detection': 'تشخیص ناهنجاری',
    'Get started': 'شروع کار',
    'Create your first visualization': 'اولین تصویرسازی خود را بسازید',
    'You can create different visualizations based on your data':
      'می‌توانید بر اساس داده‌های خود تصویرسازی‌های مختلف بسازید',
    'You can create different visualizations based on your data.':
      'می‌توانید بر اساس داده‌های خود تصویرسازی‌های مختلف بسازید.',
    '.You can create different visualizations based on your data':
      'می‌توانید بر اساس داده‌های خود تصویرسازی‌های مختلف بسازید.',
    '.You can create different visualizations based on your data.':
      'می‌توانید بر اساس داده‌های خود تصویرسازی‌های مختلف بسازید.',
    'Create new visualization': 'ایجاد تصویرسازی جدید',
    'The anomaly detection plugin automatically detects anomalies in your data in near real-time using the Random Cut Forest (RCF) algorithm.':
      'پلاگین تشخیص ناهنجاری با الگوریتم Random Cut Forest یا RCF، ناهنجاری‌های داده را تقریباً به‌صورت بی‌درنگ شناسایی می‌کند.',
    'How it works': 'نحوهٔ کار',
    '1. Define your detector': 'مرحله ۱: تعریف آشکارساز',
    '2. Configure your detector': 'مرحله ۲: پیکربندی آشکارساز',
    '3. Preview your detector': 'مرحله ۳: پیش‌نمایش آشکارساز',
    '4. View results': 'مرحله ۴: مشاهده نتایج',
    'Define your detector': 'تعریف آشکارساز',
    'Configure your detector': 'پیکربندی آشکارساز',
    'Preview your detector': 'پیش‌نمایش آشکارساز',
    'View results': 'مشاهده نتایج',
    'Select a data source, set the detector interval, and specify a window delay.':
      'یک منبع داده انتخاب کنید، بازه اجرای آشکارساز را تنظیم کنید و تأخیر پنجره را مشخص کنید.',
    'Choose the fields in your index that you want to check for anomalies. You may also set a category field to see a granular view of anomalies within each entity.':
      'فیلدهای ایندکس را که می‌خواهید برای ناهنجاری بررسی شوند انتخاب کنید. همچنین می‌توانید یک فیلد دسته‌بندی تعیین کنید تا نمای جزئی‌تری از ناهنجاری‌ها برای هر موجودیت ببینید.',
    'After configuring your model, preview your results with sample data to fine-tune your settings.':
      'پس از پیکربندی مدل، نتایج را با داده نمونه پیش‌نمایش کنید تا تنظیمات را دقیق‌تر کنید.',
    'Run your detector to observe results in real-time. You can also enable historical analysis to view anomalies in your data history.':
      'آشکارساز را اجرا کنید تا نتایج را به‌صورت بی‌درنگ ببینید. همچنین می‌توانید تحلیل تاریخی را فعال کنید تا ناهنجاری‌های گذشته داده‌ها را مشاهده کنید.',
    'Start with a sample detector to learn about anomaly detection':
      'برای آشنایی با تشخیص ناهنجاری، با یک آشکارساز نمونه شروع کنید',
    'New to anomaly detection? Get a better understanding of how it works by creating a detector with one of the sample datasets':
      'با تشخیص ناهنجاری آشنا نیستید؟ با ساخت یک آشکارساز بر پایه یکی از مجموعه‌داده‌های نمونه، بهتر با نحوه کار آن آشنا شوید',
    'New to anomaly detection? Get a better understanding of how it works by creating a detector with one of the sample datasets.':
      'با تشخیص ناهنجاری آشنا نیستید؟ با ساخت یک آشکارساز بر پایه یکی از مجموعه‌داده‌های نمونه، بهتر با نحوه کار آن آشنا شوید.',
    '.New to anomaly detection? Get a better understanding of how it works by creating a detector with one of the sample datasets':
      'با تشخیص ناهنجاری آشنا نیستید؟ با ساخت یک آشکارساز بر پایه یکی از مجموعه‌داده‌های نمونه، بهتر با نحوه کار آن آشنا شوید.',
    '.New to anomaly detection? Get a better understanding of how it works by creating a detector with one of the sample datasets.':
      'با تشخیص ناهنجاری آشنا نیستید؟ با ساخت یک آشکارساز بر پایه یکی از مجموعه‌داده‌های نمونه، بهتر با نحوه کار آن آشنا شوید.',
    'Monitor host health': 'پایش سلامت میزبان',
    'Monitor eCommerce orders': 'پایش سفارش‌های فروشگاه آنلاین',
    'Monitor HTTP responses': 'پایش پاسخ‌های HTTP',
    'Detect increases in CPU and memory utilization in an index containing various health metrics from a host':
      'افزایش مصرف CPU و حافظه را در ایندکسی شامل معیارهای مختلف سلامت میزبان شناسایی کنید',
    'Detect increases in CPU and memory utilization in an index containing various health metrics from a host.':
      'افزایش مصرف CPU و حافظه را در ایندکسی شامل معیارهای مختلف سلامت میزبان شناسایی کنید.',
    '.Detect increases in CPU and memory utilization in an index containing various health metrics from a host':
      'افزایش مصرف CPU و حافظه را در ایندکسی شامل معیارهای مختلف سلامت میزبان شناسایی کنید.',
    '.Detect increases in CPU and memory utilization in an index containing various health metrics from a host.':
      'افزایش مصرف CPU و حافظه را در ایندکسی شامل معیارهای مختلف سلامت میزبان شناسایی کنید.',
    'Detect any unusual increase or decrease of orders in an index containing online order data':
      'افزایش یا کاهش غیرعادی سفارش‌ها را در ایندکسی شامل داده سفارش‌های آنلاین شناسایی کنید',
    'Detect any unusual increase or decrease of orders in an index containing online order data.':
      'افزایش یا کاهش غیرعادی سفارش‌ها را در ایندکسی شامل داده سفارش‌های آنلاین شناسایی کنید.',
    '.Detect any unusual increase or decrease of orders in an index containing online order data':
      'افزایش یا کاهش غیرعادی سفارش‌ها را در ایندکسی شامل داده سفارش‌های آنلاین شناسایی کنید.',
    '.Detect any unusual increase or decrease of orders in an index containing online order data.':
      'افزایش یا کاهش غیرعادی سفارش‌ها را در ایندکسی شامل داده سفارش‌های آنلاین شناسایی کنید.',
    'Detect high numbers of error response codes in an index containing HTTP response data':
      'تعداد بالای کدهای پاسخ خطا را در ایندکسی شامل داده پاسخ‌های HTTP شناسایی کنید',
    'Detect high numbers of error response codes in an index containing HTTP response data.':
      'تعداد بالای کدهای پاسخ خطا را در ایندکسی شامل داده پاسخ‌های HTTP شناسایی کنید.',
    '.Detect high numbers of error response codes in an index containing HTTP response data':
      'تعداد بالای کدهای پاسخ خطا را در ایندکسی شامل داده پاسخ‌های HTTP شناسایی کنید.',
    '.Detect high numbers of error response codes in an index containing HTTP response data.':
      'تعداد بالای کدهای پاسخ خطا را در ایندکسی شامل داده پاسخ‌های HTTP شناسایی کنید.',
    'Create health monitor detector': 'ایجاد آشکارساز سلامت میزبان',
    'Create eCommerce orders detector': 'ایجاد آشکارساز سفارش‌های فروشگاه آنلاین',
    'Create HTTP response detector': 'ایجاد آشکارساز پاسخ HTTP',
    'Create map': 'ایجاد نقشه',
    'Create your first map': 'اولین نقشه خود را بسازید',
    Map: 'نقشه',
    Maps: 'نقشه‌ها',
    Layers: 'لایه‌ها',
    'All layers': 'همهٔ لایه‌ها',
    'Default map': 'نقشهٔ پیش‌فرض',
    'OpenSearch map': 'نقشهٔ OpenSearch',
    'Custom map': 'نقشهٔ سفارشی',
    'New layer': 'لایهٔ جدید',
    'Add layer': 'افزودن لایه',
    'Data layer': 'لایهٔ داده',
    'Base layer': 'لایهٔ پایه',
    'Select a layer': 'انتخاب لایه',
    'Select a layer type': 'انتخاب نوع لایه',
    'Layer name': 'نام لایه',
    'Layer style': 'سبک لایه',
    'Layer is hidden': 'لایه پنهان است',
    'Hide layer': 'پنهان کردن لایه',
    'Show layer': 'نمایش لایه',
    'Hide or show layer': 'پنهان یا نمایش دادن لایه',
    'Delete layer': 'حذف لایه',
    'Hide layer control': 'پنهان کردن کنترل لایه‌ها',
    'Show layer control': 'نمایش کنترل لایه‌ها',
    'Collapse layers panel': 'بستن پنل لایه‌ها',
    'Expand layers panel': 'باز کردن پنل لایه‌ها',
    'Drag Handle': 'دستگیرهٔ جابه‌جایی',
    'Move layer up or down': 'جابه‌جایی لایه به بالا یا پایین',
    'layer in the map layers list': 'لایه در فهرست لایه‌های نقشه',
    'Import Vector Map': 'وارد کردن نقشهٔ برداری',
    'Choose custom map type.': 'نوع نقشهٔ سفارشی را انتخاب کنید.',
    'Start creating your map by selecting a layer type.':
      'برای ساخت نقشه، ابتدا یک نوع لایه انتخاب کنید.',
    'Only request data around map extent':
      'فقط داده‌های محدودهٔ قابل‌مشاهدهٔ نقشه دریافت شوند',
    'Use default OpenSearch basemaps.':
      'از نقشه‌های پایهٔ پیش‌فرض OpenSearch استفاده شود.',
    'View points, lines, and polygons on the map.':
      'نقاط، خطوط و چندضلعی‌ها را روی نقشه مشاهده کنید.',
    'Save your map': 'ذخیرهٔ نقشه',
    "There is no map to display, let's create your first map":
      'نقشه‌ای برای نمایش وجود ندارد؛ اولین نقشه را بسازید',
    "There is no map to display, let's create your first map.":
      'نقشه‌ای برای نمایش وجود ندارد؛ اولین نقشه را بسازید.',
    Description: 'توضیح',
    Level: 'سطح',
    'Rule ID': 'شناسه قاعده',
    Agent: 'Agent',
    'Agent name': 'نام Agent',
    Timestamp: 'زمان',
    Timestampt: 'زمان',
    'Last 1 year': '۱ سال گذشته',
    'Go to Settings': 'رفتن به تنظیمات',
    Continue: 'ادامه',
    'sshd: Attempt to login': 'sshd: تلاش برای ورود',
    'Listened ports status': 'وضعیت پورت‌های شنود شده',
    'PAM: User login failed.': 'PAM: ورود کاربر ناموفق بود.',
    'Most common vulnerability score': 'رایج‌ترین امتیاز آسیب‌پذیری',
    'Vulnerability base score': 'امتیاز پایه آسیب‌پذیری',
    'Most vulnerable OS families': 'آسیب‌پذیرترین خانواده‌های سیستم‌عامل',
    'Host OS type': 'نوع سیستم‌عامل میزبان',
    'Vulnerabilities by year of publication':
      'آسیب‌پذیری‌ها بر اساس سال انتشار',
    'Year published': 'سال انتشار',
    'System inventory': 'موجودی سیستم',
    'Serial number': 'شماره سریال',
    'Host name': 'نام میزبان',
    CPU: 'پردازنده',
    Memory: 'حافظه',
    Cores: 'هسته‌ها',
    Compliance: 'انطباق',
    'Top Tactics': 'تاکتیک‌های برتر',
    'Events count evolution': 'روند تعداد رخدادها',
    'Dashboard of Events count evolution': 'داشبورد روند تعداد رخدادها',
    'Security Configuration Assessment': 'ارزیابی پیکربندی امنیتی',
    'Open SCA Scans': 'باز کردن اسکن‌های SCA',
    Policy: 'سیاست',
    'End scan': 'پایان اسکن',
    Passed: 'موفق',
    Failed: 'ناموفق',
    'not applicable': 'نامرتبط',
    'Not applicable': 'نامرتبط',
    Score: 'امتیاز',
    'Vulnerability Detection': 'تشخیص آسیب‌پذیری',
    'Open Vulnerability Detection': 'باز کردن تشخیص آسیب‌پذیری',
    'Top 5 Packages': '۵ پکیج برتر',
    Package: 'پکیج',
    Critical: 'بحرانی',
    High: 'بالا',
    Medium: 'متوسط',
    Low: 'پایین',
    'FIM: Recent events': 'FIM: رخدادهای اخیر',
    'Open FIM': 'باز کردن FIM',
    Time: 'زمان',
    Path: 'مسیر',
    Action: 'عملیات',
    'Rule description': 'توضیح قاعده',
    'Rule Level': 'سطح قاعده',
    'Rule Id': 'شناسه قاعده',
    'Rule level': 'سطح قاعده',
    'No recent events': 'رخداد اخیری وجود ندارد',
    'Integrity checksum changed': 'Checksum یکپارچگی تغییر کرد',
    '.Integrity checksum changed': 'Checksum یکپارچگی تغییر کرد',
    modified: 'تغییر یافته',
    Count: 'تعداد',
    Other: 'سایر',
    Missing: 'ناموجود',
    'timestamp per week': 'زمان بر اساس هفته',
    'Top 10 Alert groups evolution': 'روند ۱۰ گروه هشدار برتر',
    'Top 10 Alert level evolution': 'روند ۱۰ سطح هشدار برتر',
    'Top 5 agents': '۵ Agent برتر',
    'Top 10 MITRE ATT&CKS': '۱۰ مورد برتر MITRE ATT&CK',
    'Alerts evolution - Top 5 agents': 'روند هشدارها - ۵ Agent برتر',
    Alerts: 'هشدارها',
    'Top 5 alerts': '۵ هشدار برتر',
    'Top 5 rule groups': '۵ گروه قاعده برتر',
    'Top 5 PCI DSS Requirements': '۵ الزام برتر PCI DSS',
    'Last 24 hours alerts': 'هشدارهای ۲۴ ساعت گذشته',
    'LAST 24 HOURS ALERTS': 'هشدارهای ۲۴ ساعت گذشته',
    'Agents summary': 'خلاصه Agentها',
    'AGENTS SUMMARY': 'خلاصه Agentها',
    'Low severity': 'شدت پایین',
    'Medium severity': 'شدت متوسط',
    'High severity': 'شدت بالا',
    'Critical severity': 'شدت بحرانی',
    'Rule level 0 to 6': 'سطح قاعده از ۰ تا ۶',
    'Rule level 7 to 11': 'سطح قاعده از ۷ تا ۱۱',
    'Rule level 12 to 14': 'سطح قاعده از ۱۲ تا ۱۴',
    'Rule level 15 or higher': 'سطح قاعده ۱۵ یا بالاتر',
    Active: 'فعال',
    Disconnected: 'قطع اتصال',
    'Go to all agents': 'رفتن به همه Agentها',
    'Deploy new agent': 'استقرار Agent جدید',
    'No agents were added to the manager': 'هیچ Agentی به Manager اضافه نشده است',
    'No agents were added to this manager.':
      'هیچ Agentی به این Manager اضافه نشده است.',
    'Add agents to fleet to start monitoring':
      'برای شروع مانیتورینگ، Agentها را به مجموعه اضافه کنید',
    'This instance has no agents registered.':
      'در این instance هیچ Agentی ثبت نشده است.',
    'Please deploy agents to begin monitoring your endpoints.':
      'برای شروع مانیتورینگ Endpointها، Agentها را مستقر کنید.',
    Back: 'بازگشت',
    Settings: 'تنظیمات',
    'Dev Tools': 'ابزارهای توسعه',
    'Ruleset Test': 'آزمون مجموعه قواعد',
    'Sample Data': 'داده نمونه',
    'Server APIs': 'APIهای سرور',
    'App Settings': 'تنظیمات برنامه',
    About: 'درباره',
    Logs: 'لاگ‌ها',
    'List and filter logs.': 'لاگ‌ها را فهرست و فیلتر کنید.',
    Stats: 'آمار',
    Configuration: 'پیکربندی',
    'No results': 'نتیجه‌ای یافت نشد',
    'No MITRE ATT&CK results were found in the selected time range.':
      'در بازه زمانی انتخاب‌شده نتیجه‌ای برای MITRE ATT&CK یافت نشد.',
    'No SCA scans in this agent': 'برای این Agent اسکن SCA وجود ندارد',
    "You don't have SCA scans in this agent.":
      'برای این Agent اسکن SCA وجود ندارد.',
    'Check your agent settings to generate scans.':
      'برای تولید اسکن‌ها تنظیمات Agent را بررسی کنید.',
    'Not enough hardware or operating system information':
      'اطلاعات سخت‌افزار یا سیستم‌عامل کافی نیست',
  }),
);

const PERSIAN_SEVERITY_PREFIXES = new Map([
  ['Critical', 'بحرانی'],
  ['High', 'بالا'],
  ['Medium', 'متوسط'],
  ['Low', 'پایین'],
]);

const PERSIAN_STATUS_PREFIXES = new Map([
  ['Active', 'فعال'],
  ['Disconnected', 'قطع اتصال'],
  ['Pending', 'در انتظار'],
  ['Never connected', 'هرگز متصل نشده'],
  ['active', 'فعال'],
]);

const HEALTH_LOG_TYPE_LABELS = {
  INFO: 'اطلاع',
  ACTION: 'اقدام',
  WARNING: 'هشدار',
  ERROR: 'خطا',
};

const REGISTER_AGENT_FIELD_LABELS = new Map([
  ['operating system', 'سیستم‌عامل'],
  ['server address', 'آدرس سرور'],
  ['agent name', 'نام Agent'],
  ['one or more existing groups', 'یک یا چند گروه موجود'],
  ['password', 'رمز عبور'],
]);

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

const ENGLISH_MONTH_INDEX = {
  Jan: 0,
  January: 0,
  Feb: 1,
  February: 1,
  Mar: 2,
  March: 2,
  Apr: 3,
  April: 3,
  May: 4,
  Jun: 5,
  June: 5,
  Jul: 6,
  July: 6,
  Aug: 7,
  August: 7,
  Sep: 8,
  Sept: 8,
  September: 8,
  Oct: 9,
  October: 9,
  Nov: 10,
  November: 10,
  Dec: 11,
  December: 11,
};

const PERSIAN_DATE_FORMATTER =
  typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      })
    : null;

function toPersianDigits(value) {
  return String(value).replace(/\d/g, digit => PERSIAN_DIGITS[Number(digit)]);
}

function formatPersianDate(date) {
  if (!PERSIAN_DATE_FORMATTER) {
    return toPersianDigits(date.toISOString().slice(0, 10));
  }

  return PERSIAN_DATE_FORMATTER.format(date);
}

function createUtcDate(year, monthIndex, day) {
  const date = new Date(Date.UTC(year, monthIndex, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== monthIndex ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function translateDisplayDate(value) {
  const isoDate = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDate) {
    const date = createUtcDate(
      Number(isoDate[1]),
      Number(isoDate[2]) - 1,
      Number(isoDate[3]),
    );

    return date ? formatPersianDate(date) : value;
  }

  const slashDate = value.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (slashDate) {
    const date = createUtcDate(
      Number(slashDate[1]),
      Number(slashDate[2]) - 1,
      Number(slashDate[3]),
    );

    return date ? formatPersianDate(date) : value;
  }

  const monthDate = value.match(
    /^(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|Sept|September|Oct|October|Nov|November|Dec|December)\s+(\d{1,2}),\s+(\d{4})(?:\s+@\s+(\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?))?$/,
  );
  if (monthDate) {
    const date = createUtcDate(
      Number(monthDate[3]),
      ENGLISH_MONTH_INDEX[monthDate[1]],
      Number(monthDate[2]),
    );

    if (!date) {
      return value;
    }

    const persianDate = formatPersianDate(date);
    return monthDate[4]
      ? `${persianDate} ساعت ${toPersianDigits(monthDate[4])}`
      : persianDate;
  }

  const isoDateTime = value.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s])(\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?)(?:Z)?$/,
  );
  if (isoDateTime) {
    const date = createUtcDate(
      Number(isoDateTime[1]),
      Number(isoDateTime[2]) - 1,
      Number(isoDateTime[3]),
    );

    return date
      ? `${formatPersianDate(date)} ساعت ${toPersianDigits(isoDateTime[4])}`
      : value;
  }

  return value;
}

function translateYesNo(value) {
  if (value === 'yes') {
    return 'بله';
  }

  if (value === 'no') {
    return 'خیر';
  }

  return value;
}

const HEALTH_LOG_TRANSLATORS = [
  [/^Current API id \[(.+)\]$/, id => `شناسه API فعلی [${id}]`],
  [/^Checking current API id \[(.+)\]\.\.\.$/, id => `در حال بررسی شناسه API فعلی [${id}]...`],
  [/^Set cluster info in cookie$/, () => 'اطلاعات cluster در cookie تنظیم شد'],
  [/^Current API in cookie: \[(.+)\]$/, id => `API فعلی در cookie: [${id}]`],
  [/^Getting API version data\.\.\.$/, () => 'در حال دریافت داده نسخه API...'],
  [/^API version: \[(.+)\]$/, version => `نسخه API: [${version}]`],
  [/^Getting the app version\.\.\.$/, () => 'در حال دریافت نسخه برنامه...'],
  [/^App version: \[(.+)\]$/, version => `نسخه برنامه: [${version}]`],
  [/^Index pattern id in cookie: yes \[(.+)\]$/, id => `شناسه index pattern در cookie: بله [${id}]`],
  [/^Index pattern id in cookie: no$/, () => 'شناسه index pattern در cookie: خیر'],
  [/^Index pattern id in cookie: \[(.+)\]$/, id => `شناسه index pattern در cookie: [${id}]`],
  [/^Getting list of valid index patterns\.\.\.$/, () => 'در حال دریافت فهرست index patternهای معتبر...'],
  [/^Valid index patterns found: (.+)$/, count => `index patternهای معتبر یافت‌شده: ${count}`],
  [/^Found default index pattern with title \[(.+)\]: (yes|no)$/, (title, status) => `index pattern پیش‌فرض با عنوان [${title}] یافت شد: ${translateYesNo(status)}`],
  [/^Checking the app default pattern exists: id \[(.+)\]\.\.\.$/, id => `در حال بررسی وجود pattern پیش‌فرض برنامه: شناسه [${id}]...`],
  [/^Default pattern with id \[(.+)\] exists: (yes|no)$/, (id, status) => `pattern پیش‌فرض با شناسه [${id}] وجود دارد: ${translateYesNo(status)}`],
  [/^Default pattern id \[(.+)\] set as default index pattern$/, id => `شناسه pattern پیش‌فرض [${id}] به عنوان index pattern پیش‌فرض تنظیم شد`],
  [/^Checking the index pattern id \[(.+)\] exists\.\.\.$/, id => `در حال بررسی وجود شناسه index pattern [${id}]...`],
  [/^Checking index pattern id \[(.+)\] exists\.\.\.$/, id => `در حال بررسی وجود شناسه index pattern [${id}]...`],
  [/^Index pattern id exists \[(.+)\]: (yes|no)$/, (id, status) => `شناسه index pattern [${id}] وجود دارد: ${translateYesNo(status)}`],
  [/^Exist index pattern id \[(.+)\]: (yes|no)$/, (id, status) => `شناسه index pattern [${id}] وجود دارد: ${translateYesNo(status)}`],
  [/^Checking if the index pattern id \[(.+)\] exists\.\.\.$/, id => `در حال بررسی وجود شناسه index pattern [${id}]...`],
  [/^Index pattern id \[(.+)\] found: (yes|no) title \[(.+)\]$/, (id, status, title) => `شناسه index pattern [${id}] یافت شد: ${translateYesNo(status)} عنوان [${title}]`],
  [/^Checking if exists a template compatible with the index pattern title \[(.+)\]$/, title => `در حال بررسی وجود template سازگار با عنوان index pattern [${title}]`],
  [/^Template found for the selected index-pattern title \[(.+)\]: (yes|no)$/, (title, status) => `template برای عنوان index-pattern انتخاب‌شده [${title}] یافت شد: ${translateYesNo(status)}`],
  [/^Getting index pattern data \[(.+)\]\.\.\.$/, id => `در حال دریافت داده index pattern [${id}]...`],
  [/^Index pattern data found: \[(yes|no)\]$/, status => `داده index pattern یافت شد: [${translateYesNo(status)}]`],
  [/^Refreshing index pattern fields: title \[(.+)\], id \[(.+)\]\.\.\.$/, (title, id) => `در حال تازه‌سازی فیلدهای index pattern: عنوان [${title}]، شناسه [${id}]...`],
  [/^Refreshed index pattern fields: title \[(.+)\], id \[(.+)\]$/, (title, id) => `فیلدهای index pattern تازه‌سازی شد: عنوان [${title}]، شناسه [${id}]`],
  [/^Getting settings\.\.\.$/, () => 'در حال دریافت تنظیمات...'],
  [/^Check (.+) setting \[(.+)\]: (.+)$/, (source, setting, value) => `بررسی تنظیم ${source} [${setting}]: ${value}`],
  [/^App setting \[(.+)\]: (.+)$/, (setting, value) => `تنظیم برنامه [${setting}]: ${value}`],
  [/^Settings mismatch \[(.+)\]: (yes|no)$/, (setting, status) => `ناهماهنگی تنظیمات [${setting}]: ${translateYesNo(status)}`],
];

function translateHealthCheckLogMessage(message) {
  for (const [pattern, translator] of HEALTH_LOG_TRANSLATORS) {
    const match = message.match(pattern);

    if (match) {
      return translator(...match.slice(1));
    }
  }

  return message;
}

function translateRegisterAgentFieldList(value) {
  return value
    .split(/\s+and\s+/)
    .map(part => REGISTER_AGENT_FIELD_LABELS.get(part.trim()) || part.trim())
    .join(' و ');
}

const DO_NOT_TRANSLATE_PARENT_SELECTOR = [
  'code',
  'pre',
  'textarea',
  'input',
  '.euiCode',
].join(',');

const TRANSLATABLE_ATTRIBUTE_SELECTOR = '[aria-label], [title], [placeholder]';

function ensureGlobalFont() {
  document.documentElement.style.setProperty('--font-text', GLOBAL_FONT_FAMILY);
  document.documentElement.style.setProperty('--oui-font-family', GLOBAL_FONT_FAMILY);

  let stylesheet = document.getElementById(GLOBAL_FONT_STYLESHEET_ID);
  if (!stylesheet) {
    const bootstrapScript = Array.from(document.scripts).find(script =>
      script.src.includes('/farsi-runtime-bootstrap.js'),
    );
    const uiPublicUrl = bootstrapScript
      ? bootstrapScript.src.replace(/\/farsi-runtime-bootstrap\.js(?:\?.*)?$/, '')
      : `${window.location.origin}/ui`;

    stylesheet = document.createElement('link');
    stylesheet.id = GLOBAL_FONT_STYLESHEET_ID;
    stylesheet.rel = 'stylesheet';
    stylesheet.href = `${uiPublicUrl}/fonts/iransans_en/index.css?v=20260713-0700`;
    document.head.appendChild(stylesheet);
  }

  let style = document.getElementById(GLOBAL_FONT_STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = GLOBAL_FONT_STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
    :root {
      --font-text: ${GLOBAL_FONT_FAMILY} !important;
      --oui-font-family: ${GLOBAL_FONT_FAMILY} !important;
    }
    html,
    body,
    body *:not(.fa):not(.fas):not(.far):not(.fab),
    input,
    textarea,
    select,
    option,
    button:not(.fa):not(.fas):not(.far):not(.fab),
    code,
    pre,
    kbd,
    samp,
    svg text {
      font-family: ${GLOBAL_FONT_FAMILY} !important;
    }
    html[dir='rtl'] .euiAccordion__iconWrapper .euiAccordion__icon,
    body.wazuh-rtl .euiAccordion__iconWrapper .euiAccordion__icon,
    .wazuh-rtl .euiAccordion__iconWrapper .euiAccordion__icon,
    html[dir='rtl'] .ouiAccordion__iconWrapper .ouiAccordion__icon,
    body.wazuh-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon,
    .wazuh-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon {
      transform: rotate(180deg) !important;
      transform-origin: center;
    }
    html[dir='rtl'] .euiAccordion__iconWrapper .euiAccordion__icon-isOpen,
    body.wazuh-rtl .euiAccordion__iconWrapper .euiAccordion__icon-isOpen,
    .wazuh-rtl .euiAccordion__iconWrapper .euiAccordion__icon-isOpen,
    html[dir='rtl'] .ouiAccordion__iconWrapper .ouiAccordion__icon-isOpen,
    body.wazuh-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon-isOpen,
    .wazuh-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon-isOpen {
      transform: rotate(90deg) !important;
    }
    .header__homeLoaderNavButton .euiHeaderSectionItemButton__content,
    .header__homeLoaderNavButton .ouiHeaderSectionItemButton__content {
      min-width: 152px !important;
    }
    .header__homeLoaderNavButton .homeIconContainer {
      width: 124px !important;
      height: 40px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .header__homeLoaderNavButton .homeIconContainer .logoImage {
      width: 140px !important;
      height: 40px !important;
      max-width: 140px !important;
      flex: 0 0 140px !important;
      object-fit: contain !important;
    }
  `;
}

function ensureHomeLogo(root = document) {
  queryAllIncludingRoot(
    root,
    '.header__homeLoaderNavButton .homeIconContainer .logoImage',
  ).forEach(logo => {
    if (!(logo instanceof HTMLImageElement) || !logo.src.includes('/ui/logos/')) return;

    const logoUrl = new URL(logo.src, window.location.href);
    const logoDirectory = logoUrl.pathname.slice(0, logoUrl.pathname.indexOf('/ui/logos/') + 10);
    const fileName = logoUrl.pathname.endsWith('_on_dark.svg')
      ? 'wazuh_dashboards_on_dark.svg'
      : 'wazuh_dashboards_on_light.svg';
    logoUrl.pathname = `${logoDirectory}${fileName}`;

    const targetUrl = logoUrl.toString();
    if (logo.src !== targetUrl) logo.src = targetUrl;
    logo.setAttribute('data-test-image-url', targetUrl);
  });
}

function ensureFavicon() {
  const bootstrapScript = Array.from(document.scripts).find(script =>
    script.src.includes('/farsi-runtime-bootstrap.js'),
  );
  const uiPublicUrl = bootstrapScript
    ? bootstrapScript.src.replace(/\/farsi-runtime-bootstrap\.js(?:\?.*)?$/, '')
    : `${window.location.origin}/ui`;
  const faviconUrl = name =>
    `${uiPublicUrl}/favicons/${name}?v=${FAVICON_CACHE_VERSION}`;

  if (!document.querySelector("link[rel='icon'][sizes='192x192']")) {
    const primaryIcon = document.createElement('link');
    primaryIcon.setAttribute('rel', 'icon');
    primaryIcon.setAttribute('type', 'image/png');
    primaryIcon.setAttribute('sizes', '192x192');
    primaryIcon.setAttribute('href', faviconUrl('android-chrome-192x192.png'));
    document.head.prepend(primaryIcon);
  }

  document.querySelectorAll("link[rel*='icon']").forEach(link => {
    const rel = link.getAttribute('rel') || '';
    const sizes = link.getAttribute('sizes') || '';

    if (rel.includes('apple-touch-icon')) {
      link.setAttribute('href', faviconUrl('apple-touch-icon.png'));
      return;
    }
    if (rel.includes('mask-icon')) {
      link.setAttribute('href', faviconUrl('safari-pinned-tab.svg'));
      return;
    }
    if (rel.includes('shortcut')) {
      link.setAttribute('href', faviconUrl('favicon.ico'));
      return;
    }
    if (sizes === '32x32') {
      link.setAttribute('href', faviconUrl('favicon-32x32.png'));
      return;
    }
    if (sizes === '16x16') {
      link.setAttribute('href', faviconUrl('favicon-16x16.png'));
      return;
    }

    link.setAttribute('type', 'image/png');
    link.setAttribute('sizes', '192x192');
    link.setAttribute('href', faviconUrl('android-chrome-192x192.png'));
  });

  document
    .querySelector("link[rel='manifest']")
    ?.setAttribute('href', faviconUrl('manifest.json'));
  document
    .querySelector("meta[name='msapplication-config']")
    ?.setAttribute('content', faviconUrl('browserconfig.xml'));
}

function translateKnownText(value) {
  const trimmed = value.trim();
  const normalized = trimmed.replace(/\s+/g, ' ');
  const translated =
    PERSIAN_TEXT_MAP.get(trimmed) ||
    (normalized !== trimmed ? PERSIAN_TEXT_MAP.get(normalized) : undefined);

  if (translated) {
    return value.replace(trimmed, translated);
  }

  const leadingDot = normalized.match(/^\.(.+)$/);
  if (leadingDot) {
    const body = leadingDot[1].trim();
    const bodyTranslation = PERSIAN_TEXT_MAP.get(body);
    if (bodyTranslation) {
      return value.replace(trimmed, `${bodyTranslation}.`);
    }
  }

  const severityWithCount = normalized.match(/^(Critical|High|Medium|Low)\s+(\d[\d,]*)$/);
  if (severityWithCount) {
    return value.replace(
      trimmed,
      `${PERSIAN_SEVERITY_PREFIXES.get(severityWithCount[1])} ${severityWithCount[2]}`,
    );
  }

  const statusWithCount = normalized.match(/^(Active|Disconnected|Pending|Never connected|active)\s+\((\d[\d,]*)\)$/);
  if (statusWithCount) {
    return value.replace(
      trimmed,
      `${PERSIAN_STATUS_PREFIXES.get(statusWithCount[1])} (${statusWithCount[2]})`,
    );
  }

  const exploreAgentWithCount = normalized.match(/^Explore agent\s*\((\d[\d,]*)\)$/i);
  if (exploreAgentWithCount) {
    return value.replace(
      trimmed,
      `بررسی Agent (${toPersianDigits(exploreAgentWithCount[1])})`,
    );
  }

  const anomalyStepWithNumber = normalized.match(
    /^(Define your detector|Configure your detector|Preview your detector|View results)\s*\.?\s*(\d+)$/,
  );
  if (anomalyStepWithNumber) {
    return value.replace(
      trimmed,
      `${PERSIAN_TEXT_MAP.get(anomalyStepWithNumber[1])} ${toPersianDigits(anomalyStepWithNumber[2])}`,
    );
  }

  const mapLayerOutsideZoom = normalized.match(
    /^Layer is hidden outside of zoom range (.+?)[–-](.+)$/,
  );
  if (mapLayerOutsideZoom) {
    return value.replace(
      trimmed,
      `لایه خارج از محدودهٔ بزرگ‌نمایی ${toPersianDigits(
        mapLayerOutsideZoom[1],
      )} تا ${toPersianDigits(mapLayerOutsideZoom[2])} پنهان است`,
    );
  }

  const mapMaximumLayers = normalized.match(
    /^You've added the maximum number of layers \((\d+)\)\.$/,
  );
  if (mapMaximumLayers) {
    return value.replace(
      trimmed,
      `حداکثر تعداد لایه‌ها (${toPersianDigits(mapMaximumLayers[1])}) افزوده شده است.`,
    );
  }

  const numberedNewMapLayer = normalized.match(/^New layer\s+(\d+)$/);
  if (numberedNewMapLayer) {
    return value.replace(
      trimmed,
      `لایهٔ جدید ${toPersianDigits(numberedNewMapLayer[1])}`,
    );
  }

  const deleteMapLayer = normalized.match(/^Do you want to delete layer\s+(.+?)\?$/);
  if (deleteMapLayer) {
    return value.replace(trimmed, `آیا می‌خواهید لایهٔ ${deleteMapLayer[1]} را حذف کنید؟`);
  }

  const ruleLevelRange = normalized.match(/^Rule level (\d+) to (\d+)$/);
  if (ruleLevelRange) {
    return value.replace(
      trimmed,
      `سطح قاعده از ${ruleLevelRange[1]} تا ${ruleLevelRange[2]}`,
    );
  }

  const ruleLevelOrHigher = normalized.match(/^Rule level (\d+) or higher$/);
  if (ruleLevelOrHigher) {
    return value.replace(
      trimmed,
      `سطح قاعده ${ruleLevelOrHigher[1]} یا بالاتر`,
    );
  }

  const selectedNodeInformation = normalized.match(/^([A-Za-z0-9_.-]+) information$/);
  if (selectedNodeInformation) {
    return value.replace(trimmed, `اطلاعات ${selectedNodeInformation[1]}`);
  }

  const rowsPerPage = normalized.match(/^Rows per page:\s*(\d+)$/);
  if (rowsPerPage) {
    return value.replace(trimmed, `ردیف در هر صفحه: ${rowsPerPage[1]}`);
  }

  const nextPage = normalized.match(/^Next page(?:,\s*(\d+))?$/);
  if (nextPage) {
    return value.replace(
      trimmed,
      nextPage[1] ? `صفحه بعد، ${toPersianDigits(nextPage[1])}` : 'صفحه بعد',
    );
  }

  const tableSummary = normalized.match(
    /^This table contains ([\d,]+) rows out of ([\d,]+) rows; Page ([\d,]+) of ([\d,]+)\.$/,
  );
  if (tableSummary) {
    return value.replace(
      trimmed,
      `این جدول ${toPersianDigits(tableSummary[1])} ردیف از ${toPersianDigits(tableSummary[2])} ردیف را نشان می‌دهد؛ صفحه ${toPersianDigits(tableSummary[3])} از ${toPersianDigits(tableSummary[4])}.`,
    );
  }

  const dashboardPanel = normalized.match(/^Dashboard panel(?::\s*(.+))?$/);
  if (dashboardPanel) {
    const title = dashboardPanel[1]
      ? translateKnownText(dashboardPanel[1])
      : '';
    return value.replace(
      trimmed,
      title ? `پنل داشبورد: ${title}` : 'پنل داشبورد',
    );
  }

  const panelOptions = normalized.match(/^Panel options(?: for (.+))?$/);
  if (panelOptions) {
    const title = panelOptions[1] ? translateKnownText(panelOptions[1]) : '';
    return value.replace(
      trimmed,
      title ? `گزینه‌های پنل ${title}` : 'گزینه‌های پنل',
    );
  }

  const chartCell = normalized.match(/^Row:\s*(\d+),\s*Column:\s*(\d+):$/);
  if (chartCell) {
    return value.replace(
      trimmed,
      `ردیف ${toPersianDigits(chartCell[1])}، ستون ${toPersianDigits(chartCell[2])}:`,
    );
  }

  const pleaseSelect = normalized.match(/^Please select the (.+)\.$/);
  if (pleaseSelect) {
    return value.replace(
      trimmed,
      `لطفاً ${translateRegisterAgentFieldList(pleaseSelect[1])} را انتخاب کنید.`,
    );
  }

  const fieldsWithErrors = normalized.match(
    /^There are fields with errors\. Please verify them: (.+)\.$/,
  );
  if (fieldsWithErrors) {
    return value.replace(
      trimmed,
      `برخی فیلدها خطا دارند. لطفاً بررسی کنید: ${translateRegisterAgentFieldList(fieldsWithErrors[1])}.`,
    );
  }

  const entityWithCount = normalized.match(/^(Agents|Groups|Rules|Decoders|CDB Lists|Reports|Report definitions|Channels|Monitors|Alerts|Detectors|Triggers)\s+\(([\d,]+)\)$/);
  if (entityWithCount) {
    const labels = {
      Agents: 'Agentها',
      Groups: 'گروه‌ها',
      Rules: 'قواعد',
      Decoders: 'دیکودرها',
      'CDB Lists': 'فهرست‌های CDB',
      Reports: 'گزارش‌ها',
      'Report definitions': 'تعریف‌های گزارش',
      Channels: 'کانال‌ها',
      Monitors: 'پایشگرها',
      Alerts: 'هشدارها',
      Detectors: 'آشکارسازها',
      Triggers: 'محرک‌ها',
    };

    return value.replace(
      trimmed,
      `${labels[entityWithCount[1]]} (${entityWithCount[2]})`,
    );
  }

  const leadingCountEntity = normalized.match(/^\(([\d,]+)\)\s+(Report definitions|Channels|Monitors|Alerts|Detectors|Reports)$/);
  if (leadingCountEntity) {
    const labels = {
      'Report definitions': 'تعریف‌های گزارش',
      Channels: 'کانال‌ها',
      Monitors: 'پایشگرها',
      Alerts: 'هشدارها',
      Detectors: 'آشکارسازها',
      Reports: 'گزارش‌ها',
    };

    return value.replace(
      trimmed,
      `${labels[leadingCountEntity[2]]} (${leadingCountEntity[1]})`,
    );
  }

  const topGroups = normalized.match(/^TOP\s+(\d+)\s+GROUPS$/);
  if (topGroups) {
    return value.replace(trimmed, `${topGroups[1]} گروه برتر`);
  }

  const topOs = normalized.match(/^TOP\s+(\d+)\s+OS$/);
  if (topOs) {
    return value.replace(trimmed, `${topOs[1]} سیستم‌عامل برتر`);
  }

  const requirementWithCode = normalized.match(/^Requirement ([A-Za-z0-9_.-]+)$/);
  if (requirementWithCode) {
    return value.replace(trimmed, `الزام ${requirementWithCode[1]}`);
  }

  const healthLog = normalized.match(/^(INFO|ACTION|WARNING|ERROR):\s*(.+)$/);
  if (healthLog) {
    return value.replace(
      trimmed,
      `${HEALTH_LOG_TYPE_LABELS[healthLog[1]]}: ${translateHealthCheckLogMessage(healthLog[2])}`,
    );
  }

  const translatedHealthMessage = translateHealthCheckLogMessage(normalized);
  if (translatedHealthMessage !== normalized) {
    return value.replace(trimmed, translatedHealthMessage);
  }

  const translatedDate = translateDisplayDate(normalized);
  if (translatedDate !== normalized) {
    return value.replace(trimmed, translatedDate);
  }

  return value;
}

function queryAllIncludingRoot(root, selector) {
  const nodes = [];

  if (root instanceof Element && root.matches(selector)) {
    nodes.push(root);
  }

  root.querySelectorAll(selector).forEach(node => nodes.push(node));

  return nodes;
}

function findClosestPanelByText(root, texts) {
  const textSet = new Set(texts);
  const candidates = queryAllIncludingRoot(
    root,
    '.euiPanel .euiText, .euiPanel .ouiText, .ouiPanel .euiText, .ouiPanel .ouiText',
  );

  for (const candidate of candidates) {
    if (textSet.has(candidate.textContent.trim())) {
      return candidate.closest('.euiPanel, .ouiPanel');
    }
  }

  return null;
}

function shouldSkipTextNode(node) {
  const parent = node.parentElement;
  if (parent?.closest('.health-check')) {
    return false;
  }

  return !parent || Boolean(parent.closest(DO_NOT_TRANSLATE_PARENT_SELECTOR));
}

function translateElementAttributes(root) {
  queryAllIncludingRoot(root, TRANSLATABLE_ATTRIBUTE_SELECTOR).forEach(node => {
    ['aria-label', 'title', 'placeholder'].forEach(attribute => {
      const value = node.getAttribute(attribute);

      if (!value) {
        return;
      }

      const translated = translateKnownText(value);
      if (translated !== value) {
        node.setAttribute(attribute, translated);
      }
    });
  });
}

function translateVisibleTexts(root = document) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue?.trim() || shouldSkipTextNode(node)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  const nodes = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach(node => {
    const translated = translateKnownText(node.nodeValue);
    if (translated !== node.nodeValue) {
      node.nodeValue = translated;
    }
  });

  translateElementAttributes(root);
}

function markTechnicalValues(root = document) {
  queryAllIncludingRoot(root, TECHNICAL_VALUE_SELECTOR).forEach(node => {
    node.setAttribute('dir', 'ltr');
    node.classList.add('wz-ltr-isolate');
  });
}

function markCharts(root = document) {
  queryAllIncludingRoot(root, CHART_SELECTOR).forEach(node => {
    node.setAttribute('dir', 'ltr');
    node.classList.add('wz-ltr-isolate');
    node.setAttribute('data-wz-rtl-chart', 'true');
  });
}

function markMenuPopovers(root = document) {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(max-width: 767px)').matches;

  queryAllIncludingRoot(root, MENU_POPOVER_SELECTOR).forEach(node => {
    node.setAttribute('dir', 'rtl');
    node.classList.add('wz-rtl-menu-popover');
    node.style.setProperty('left', 'auto', 'important');
    node.style.setProperty(
      'right',
      isMobile ? '-1px' : 'var(--wz-rtl-menu-anchor-offset)',
      'important',
    );
  });
}

function markNavigationFlyouts(root = document) {
  queryAllIncludingRoot(root, NAVIGATION_FLYOUT_SELECTOR).forEach(node => {
    node.setAttribute('dir', 'rtl');
    node.classList.add('wz-rtl-navigation-flyout');
    node.setAttribute('data-wz-rtl-navigation-flyout', 'true');
    node.style.setProperty('left', 'auto', 'important');
    node.style.setProperty('right', '0', 'important');

    node.querySelectorAll('.searchBarIcon').forEach(child => {
      child.style.setProperty('left', 'auto', 'important');
      child.style.setProperty('right', '0', 'important');
    });

    node
      .querySelectorAll(
        '.euiFlyout__closeButton--outside, .ouiFlyout__closeButton--outside',
      )
      .forEach(child => {
        child.style.setProperty('left', '0', 'important');
        child.style.setProperty('right', 'auto', 'important');
        child.style.setProperty(
          'transform',
          'translateX(calc(-100% - 24px))',
          'important',
        );
      });
  });
}

function markAnomalyDetectionOverview(root = document) {
  queryAllIncludingRoot(root, ANOMALY_OVERVIEW_TITLE_SELECTOR).forEach(title => {
    title.classList.add('wz-ad-overview-title');

    const header = title.closest('.euiPageHeader, .ouiPageHeader');
    if (!header) {
      return;
    }

    header.classList.add('wz-ad-overview-header');
    const row = title.closest('.euiFlexGroup, .ouiFlexGroup');
    row?.classList.add('wz-ad-overview-header-row');
    header
      .querySelector("[data-test-subj='add_detector']")
      ?.classList.add('wz-ad-overview-create-button');

    const description = header.nextElementSibling;
    if (description?.matches('.euiText, .ouiText')) {
      description.classList.add('wz-ad-overview-description');
    }
  });

  const workflowPanel = findClosestPanelByText(root, [
    'How it works',
    'نحوه کار',
    'نحوهٔ کار',
  ]);
  workflowPanel?.classList.add('wz-ad-workflow-panel');

  queryAllIncludingRoot(root, ANOMALY_SAMPLE_BUTTON_SELECTOR).forEach(button => {
    const card = button.closest('.euiCard, .ouiCard');
    card?.classList.add('wz-ad-sample-card');
    card
      ?.closest('.euiPanel, .ouiPanel')
      ?.classList.add('wz-ad-sample-panel');
  });
}

function markWazuhApps(root = document) {
  queryAllIncludingRoot(root, WAZUH_APP_SELECTOR).forEach(node => {
    node.setAttribute('dir', 'rtl');
    node.classList.add(ROOT_CLASS);
    node.setAttribute('data-wz-rtl-app', 'true');
    markTechnicalValues(node);
    markCharts(node);
    markMenuPopovers(node);
    markNavigationFlyouts(node);
    markAnomalyDetectionOverview(node);
    translateVisibleTexts(node);
  });
}

function scanWazuhRtl(root = document) {
  ensureHomeLogo(root);
  markWazuhApps(root);
  markTechnicalValues(root);
  markCharts(root);
  markMenuPopovers(root);
  markNavigationFlyouts(root);
  markAnomalyDetectionOverview(root);
  translateVisibleTexts(root);
}

function applyDocumentRtl() {
  const themeClass =
    typeof window !== 'undefined' && window.__osdThemeTag__?.endsWith('dark')
      ? `${THEME_CLASS_PREFIX}dark`
      : `${THEME_CLASS_PREFIX}light`;

  document.documentElement.setAttribute('dir', 'rtl');
  ensureFavicon();
  ensureGlobalFont();
  document.documentElement.classList.add(ROOT_CLASS);
  document.documentElement.classList.remove(
    `${THEME_CLASS_PREFIX}dark`,
    `${THEME_CLASS_PREFIX}light`,
  );
  document.documentElement.classList.add(themeClass);
  document.body && document.body.classList.add(ROOT_CLASS);
}

function clearDocumentRtl() {
  document.documentElement.classList.remove(ROOT_CLASS);
  document.documentElement.classList.remove(
    `${THEME_CLASS_PREFIX}dark`,
    `${THEME_CLASS_PREFIX}light`,
  );
  document.body && document.body.classList.remove(ROOT_CLASS);
}


let __wazuhFarsiObserver;
function __wazuhFarsiEnable() {
  applyDocumentRtl();
  document.documentElement.setAttribute('lang', 'fa-IR');
  scanWazuhRtl(document);
  if (!__wazuhFarsiObserver && 'MutationObserver' in window) {
    __wazuhFarsiObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' && mutation.target.parentElement) {
          scanWazuhRtl(mutation.target.parentElement);
          continue;
        }

        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            scanWazuhRtl(node);
          } else if (node instanceof Text && node.parentElement) {
            scanWazuhRtl(node.parentElement);
          }
        }
      }
    });
    const target = document.body || document.documentElement;
    __wazuhFarsiObserver.observe(target, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
}
window.WazuhFarsiBootstrap = { scan: scanWazuhRtl, enable: __wazuhFarsiEnable };
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', __wazuhFarsiEnable, { once: true });
} else {
  __wazuhFarsiEnable();
}

})();
