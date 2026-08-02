(function ayyzaFarsiBootstrap() {
  'use strict';
  const ROOT_CLASS = 'ayyza-rtl';
  const AYYZA_APP_SELECTOR =
    '.wz-app, [data-wz-rtl-app], .application, [data-test-subj="ayyzaApp"]';

  const TECHNICAL_VALUE_SELECTOR = [
    'code',
    'pre',
    '.euiCode',
    '.wz-technical',
    '[data-wz-ltr]',
  ].join(',');

  const CHART_SELECTOR = [
    '.ayyza-visualization-layout',
    '.ayyza-visualization-chart',
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
  const GLOBAL_FONT_STYLE_ID = 'ayyza-farsi-global-font';
  const GLOBAL_FONT_STYLESHEET_ID = 'ayyza-farsi-font-faces';
  const GLOBAL_FONT_FAMILY = '"IRANSansEn", Tahoma, Arial, sans-serif';
  const FAVICON_CACHE_VERSION = '20260718-rtl';
  const LEGACY_LATIN_BRAND = ['wa', 'zuh'].join('');
  const LEGACY_LATIN_BRAND_TEST = new RegExp(LEGACY_LATIN_BRAND, 'i');
  const LEGACY_LATIN_BRAND_REPLACE = new RegExp(LEGACY_LATIN_BRAND, 'gi');
  const LEGACY_PERSIAN_BRANDS = [
    [1608, 1575, 1586, 1608, 1607],
    [1608, 1575, 1586, 1608, 1581],
    [1608, 1586, 1608, 1607],
    [1608, 1575, 1586, 1575, 1607],
  ].map((characters) => String.fromCharCode(...characters));

  const PERSIAN_TEXT_MAP = new Map(
    Object.entries({
      'Loading ...': 'در حال بارگذاری ...',
      'Loading...': 'در حال بارگذاری...',
      'Loading…': 'در حال بارگذاری…',
      Loading: 'در حال بارگذاری',
      'Chart type:': 'نوع نمودار:',
      'bar chart': 'نمودار میله‌ای',
      'line chart': 'نمودار خطی',
      'area chart': 'نمودار ناحیه‌ای',
      'Rows per page': 'تعداد ردیف در هر صفحه',
      'Rows per page:': 'تعداد ردیف در هر صفحه:',
      'Loding...': 'در حال بارگذاری...',
      Error: 'خطا',
      Warning: 'هشدار',
      Success: 'موفق',
      SUCCESS: 'موفق',
      Close: 'بستن',
      'Close this dialog': 'بستن این پنجره',
      'Dismiss notification': 'بستن اعلان',
      Dismiss: 'بستن',
      Retry: 'تلاش دوباره',
      'Try again': 'تلاش دوباره',
      'See the full error': 'مشاهده جزئیات کامل خطا',
      'View full error': 'مشاهده جزئیات کامل خطا',
      'Copy error details': 'کپی جزئیات خطا',
      'Error unexpected': 'خطای غیرمنتظره',
      'Unexpected error': 'خطای غیرمنتظره',
      'Unknown error': 'خطای ناشناخته',
      Unknown: 'ناشناخته',
      'Something went wrong.': 'مشکلی رخ داد.',
      'Something went wrong': 'مشکلی رخ داد',
      'Server did not respond': 'سرور پاسخ نداد',
      'Server not ready yet.': 'سرور هنوز آماده نیست.',
      'Server could not be recovered.': 'بازیابی سرور ممکن نشد.',
      'API is not reachable. Reason: timeout.': 'دسترسی به API ممکن نیست. دلیل: پایان زمان انتظار.',
      'Missing parameters': 'پارامترهای لازم ارسال نشده‌اند',
      'Invalid parameters': 'پارامترها نامعتبر هستند',
      'Invalid section': 'بخش انتخاب‌شده نامعتبر است',
      'No config available': 'هیچ پیکربندی‌ای در دسترس نیست',
      'No context': 'اطلاعات زمینه‌ای موجود نیست',
      'No message': 'پیامی موجود نیست',
      'Error parsing query': 'خطا در تحلیل عبارت جستجو',
      'Error getting configuration, using default values.':
        'دریافت پیکربندی ناموفق بود؛ مقادیر پیش‌فرض استفاده می‌شوند.',
      'Default API has been updated.': 'API پیش‌فرض به‌روزرسانی شد.',
      'Please set up API credentials.': 'لطفاً اطلاعات اتصال API را تنظیم کنید.',
      'Conflict with the dashboard version': 'تعارض نسخه داشبورد',
      'Conflict with the Ayyza dashboard version': 'تعارض نسخه داشبورد Ayyza',
      'The version of the dashboard in your browser does not correspond with the app version installed in dashboard. Please, clear your browser cache. For more info check the full error.':
        'نسخه داشبورد در مرورگر با نسخه نصب‌شده یکسان نیست. لطفاً cache مرورگر را پاک کنید و جزئیات کامل خطا را ببینید.',
      'The version of the dashboard in your browser': 'نسخه داشبورد در مرورگر شما',
      'does not correspond with the version installed in dashboard':
        'با نسخه نصب‌شده در داشبورد یکسان نیست',
      'Please, clear your browser cache following these steps.':
        'لطفاً cache مرورگر را طبق مراحل زیر پاک کنید.',
      'If the error persists, restart dashboard as well.':
        'اگر خطا ادامه داشت، سرویس داشبورد را نیز راه‌اندازی مجدد کنید.',
      'For more information check our troubleshooting section':
        'برای اطلاعات بیشتر، بخش رفع اشکال را ببینید',
      'Steps to clear cache:': 'مراحل پاک‌کردن cache:',
      'Open the Dev tools of your browser (Press F12).': 'ابزار توسعه مرورگر را با F12 باز کنید.',
      'Go to the "Network" tab.': 'وارد زبانه «Network» شوید.',
      'Check the "Disable cache" option.': 'گزینه «Disable cache» را فعال کنید.',
      'Reload the page (Press F5).': 'صفحه را با F5 دوباره بارگذاری کنید.',
      'This message should not be displayed again.': 'این پیام نباید دوباره نمایش داده شود.',
      'Go to home page': 'رفتن به صفحهٔ خانه',
      'Help menu': 'منوی راهنما',
      'Open selectors': 'باز کردن انتخاب‌گرها',
      'Toggle primary navigation': 'باز و بسته کردن منوی اصلی',
      'All actions': 'همه عملیات',
      'Agents by Status': ' رابط‌های سرور بر اساس وضعیت',
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
      'Total agents': 'مجموع  رابط‌های سرور',
      'Agents coverage': 'پوشش  رابط‌های سرور',
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
      'Configuration options of the Office 365 module': 'گزینه‌های پیکربندی ماژول Office 365',
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
      Ayyza: 'Ayyza',
      'Ayyza dashboard': 'Ayyza dashboard',
      'Ayyza Dashboard': 'Ayyza Dashboard',
      'Ayyza API': 'Ayyza API',
      'Ayyza server': 'Ayyza server',
      'Ayyza manager': 'Ayyza manager',
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
      'Agents management': 'مدیریت  رابط‌های سرور',
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
      'You can combine data views from any Ayyza dashboard app into one dashboard and see everything in one place.':
        'می‌توانید نماهای دادهٔ برنامه‌های داشبورد Ayyza را در یک داشبورد ترکیب کنید و همه‌چیز را یکجا ببینید.',
      'You can combine data views from any Ayyza dashboard app into one dashboard and see everything in one place.':
        'می‌توانید نماهای دادهٔ برنامه‌های داشبورد Ayyza را در یک داشبورد ترکیب کنید و همه‌چیز را یکجا ببینید.',
      'New to Ayyza dashboard?': 'اگر تازه با داشبورد Ayyza آشنا شده‌اید،',
      'New to Ayyza dashboard?': 'اگر تازه با داشبورد Ayyza آشنا شده‌اید،',
      'Install some sample data': 'چند دادهٔ نمونه نصب کنید',
      'to take a test drive': 'و داشبورد را آزمایش کنید',
      'to take a test drive.': 'و داشبورد را آزمایش کنید.',
      'Create new dashboard': 'ایجاد داشبورد جدید',
      'Syntax options': 'گزینه‌های نگارش',
      'OpenSearch Dashboards Query Language': 'زبان پرس‌وجوی داشبورد Ayyza',
      'The OpenSearch Dashboards Query Language (DQL) offers a simplified query syntax and support for scripted fields.':
        'زبان پرس‌وجوی داشبورد Ayyza (DQL) نگارشی ساده برای پرس‌وجو و پشتیبانی از فیلدهای اسکریپتی فراهم می‌کند.',
      'The OpenSearch Dashboards Query Language (DQL) offers a simplified query syntax and support for scripted fields. If you turn off DQL, OpenSearch Dashboards uses Lucene.':
        'زبان پرس‌وجوی داشبورد Ayyza (DQL) نگارشی ساده برای پرس‌وجو و پشتیبانی از فیلدهای اسکریپتی فراهم می‌کند. اگر DQL را غیرفعال کنید، داشبورد Ayyza از Lucene استفاده می‌کند.',
      On: 'فعال',
      Off: 'غیرفعال',
      Style: 'سبک',
      Ranges: 'بازه‌ها',
      'Add range': 'افزودن بازه',
      Discard: 'انصراف',
      Update: 'به‌روزرسانی',
      'Panel settings': 'تنظیمات پنل',
      Results: 'نتایج',
      Event: 'رخداد',
      'Start time': 'زمان شروع',
      Duration: 'مدت‌زمان',
      'View number of results': 'تعداد نتایج قابل نمایش',
      'Results ordered by descending start time.':
        'نتایج بر اساس زمان شروع به‌صورت نزولی مرتب شده‌اند.',
      'Gantt chart allows you to compare schedules of the selected field.':
        'نمودار گانت امکان مقایسهٔ زمان‌بندی‌های فیلد انتخاب‌شده را فراهم می‌کند.',
      'Select a timestamp field to represent the beginning of a schedule.':
        'یک فیلد زمانی برای نمایش آغاز زمان‌بندی انتخاب کنید.',
      'Value of duration field must be a time interval that can be added to the start timestamp field.':
        'مقدار فیلد مدت‌زمان باید یک بازهٔ زمانی قابل افزودن به فیلد زمان شروع باشد.',
      'No data': 'داده‌ای وجود ندارد',
      'Specify data to plot the chart using the Data & Options panel on the right.':
        'برای رسم نمودار، داده‌ها را از پنل «داده و گزینه‌ها» در سمت راست مشخص کنید.',
      'New Visualization': 'تصویرسازی جدید',
      Area: 'نمودار سطحی',
      'Emphasize the quantity beneath a line chart': 'مقدار زیر نمودار خطی را برجسته می‌کند',
      Filter: 'فیلتر',
      'Data Table': 'جدول داده',
      'Coordinate Map': 'نقشهٔ مختصات',
      Controls: 'کنترل‌ها',
      'Heat Map': 'نقشهٔ حرارتی',
      Goal: 'هدف',
      Gauge: 'سنجه',
      'Gantt Chart': 'نمودار گانت',
      Markdown: 'متن نشانه‌گذاری',
      Line: 'نمودار خطی',
      'Horizontal Bar': 'نمودار میله‌ای افقی',
      TSVB: 'سازندهٔ سری زمانی',
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
      'For feedback, please create an issue in': 'برای ارسال بازخورد، لطفاً یک issue در',
      Options: 'گزینه‌ها',
      Add: 'افزودن',
      'Options list': 'فهرست گزینه‌ها',
      'Report settings': 'تنظیمات گزارش',
      'Report name (e.g Log Traffic Daily Report)':
        'نام گزارش (برای نمونه: گزارش روزانهٔ ترافیک Log)',
      'Valid characters are a-z, A-Z, 0-9, (), [], _ (underscore), - (hyphen) and . (space).':
        'نویسه‌های مجاز شامل حروف کوچک و بزرگ لاتین، رقم‌ها، پرانتز، کروشه، زیرخط، خط تیره و فاصله هستند.',
      'Valid characters are a-z, A-Z, 0-9, (), [], _ (underscore), - (hyphen) and (space).':
        'نویسه‌های مجاز شامل حروف کوچک و بزرگ لاتین، رقم‌ها، پرانتز، کروشه، زیرخط، خط تیره و فاصله هستند.',
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
      'Per cluster metrics monitor': 'پایشگر معیارهای کلاستر',
      'Per cluster metrics monitors run API requests to monitor the cluster’s health.':
        'پایشگرهای معیارهای کلاستر برای بررسی سلامت کلاستر درخواست‌های رابط برنامه‌نویسی را اجرا می‌کنند.',
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
      'Select clusters': 'انتخاب کلاسترها',
      'Select a local cluster or remote clusters from cross-cluster connections':
        'یک کلاستر محلی یا کلاسترهای راه‌دور را از اتصال‌های بین‌کلاستری انتخاب کنید',
      'Select a local cluster or remote clusters from cross-cluster connections.':
        'یک کلاستر محلی یا کلاسترهای راه‌دور را از اتصال‌های بین‌کلاستری انتخاب کنید.',
      Indices: 'ایندکس‌ها',
      'Select one or more indexes or wildcard patterns':
        'یک یا چند ایندکس یا الگوی دارای نویسهٔ عام انتخاب کنید',
      'You can use * as a wildcard or date math index resolution in your index pattern.':
        'در الگوی ایندکس می‌توانید از * به‌عنوان نویسهٔ عام یا از محاسبات تاریخ برای تفکیک ایندکس استفاده کنید.',
      'Time field': 'فیلد زمان',
      'Select a time field': 'یک فیلد زمان انتخاب کنید',
      'Choose the time field you want to use for your x-axis':
        'فیلد زمانی مورد استفاده برای محور افقی را انتخاب کنید',
      Query: 'کوئری',
      'You must specify an index.': 'باید یک ایندکس مشخص کنید.',
      'No triggers': 'هیچ محرکی وجود ندارد',
      'Add a trigger to define conditions and actions':
        'برای تعریف شرایط و عملیات، یک محرک اضافه کنید',
      'Add a trigger to define conditions and actions.':
        'برای تعریف شرایط و عملیات، یک محرک اضافه کنید.',
      'Add trigger': 'افزودن محرک',
      'Failed to run the trigger': 'اجرای محرک ناموفق بود',
      'Failed to run trigger': 'اجرای محرک ناموفق بود',
      'Remove trigger': 'حذف محرک',
      'New trigger': 'محرک جدید',
      'Severity level': 'سطح شدت',
      'All severities': 'همهٔ سطوح شدت',
      '(Highest) 1': '(بالاترین) ۱',
      '(High) 2': '(بالا) ۲',
      '(Medium) 3': '(متوسط) ۳',
      '(Low) 4': '(پایین) ۴',
      '(Lowest) 5': '(پایین‌ترین) ۵',
      'Trigger condition': 'شرط محرک',
      'Trigger conditions': 'شرایط محرک',
      'IS ABOVE': 'بالاتر از',
      'IS BELOW': 'پایین‌تر از',
      'IS EQUAL TO': 'برابر با',
      'IS NOT EQUAL TO': 'نابرابر با',
      'There is no data for the current selections': 'برای انتخاب‌های فعلی داده‌ای وجود ندارد',
      'There is no data for the current selections.': 'برای انتخاب‌های فعلی داده‌ای وجود ندارد.',
      'Define actions when trigger conditions are met':
        'عملیاتی را تعریف کنید که هنگام برقرارشدن شرایط محرک اجرا شوند',
      'Define actions when trigger conditions are met.':
        'عملیاتی را تعریف کنید که هنگام برقرارشدن شرایط محرک اجرا شوند.',
      'There are no existing channels. Add a channel to create an action':
        'کانالی وجود ندارد. برای ایجاد عملیات، یک کانال اضافه کنید',
      'There are no existing channels. Add a channel to create an action.':
        'کانالی وجود ندارد. برای ایجاد عملیات، یک کانال اضافه کنید.',
      'Manage channels': 'مدیریت کانال‌ها',
      'Add another trigger': 'افزودن محرک دیگر',
      'Select a detector': 'یک آشکارساز انتخاب کنید',
      'Define how often the monitor collects data and how often you may receive alerts. We recommend setting this frequency to two times the detector interval to avoid missing anomalous results from delayed processing time.':
        'مشخص کنید پایشگر هر چند وقت یک‌بار داده جمع‌آوری کند و هشدارها با چه تناوبی دریافت شوند. پیشنهاد می‌شود این تناوب دو برابر فاصلهٔ اجرای آشکارساز باشد تا نتایج ناهنجاری بر اثر تأخیر پردازش از دست نروند.',
      "There aren't any options available": 'هیچ گزینه‌ای در دسترس نیست',
      Daily: 'روزانه',
      Weekly: 'هفتگی',
      Monthly: 'ماهانه',
      'Custom cron expression': 'عبارت زمان‌بندی سفارشی',
      Hours: 'ساعت',
      Days: 'روز',
      Workflow: 'گردش کار',
      'Delegate monitors': 'پایشگرهای زیرمجموعه',
      'Delegate two or more monitors to run as part of this workflow. The order in which you select the monitors determines their order in the workflow. The monitor types per query, per bucket, and per document are supported.':
        'دو یا چند پایشگر را برای اجرا در این گردش کار اضافه کنید. ترتیب انتخاب پایشگرها، ترتیب آن‌ها را در گردش کار تعیین می‌کند. پایشگرهای سطح پرس‌وجو، سطح باکت و سطح سند پشتیبانی می‌شوند.',
      'Select a monitor': 'یک پایشگر انتخاب کنید',
      'Add another monitor': 'افزودن پایشگر دیگر',
      'Triggers define the conditions that determine when a composite monitor should generate its own alert':
        'محرک‌ها شرایطی را تعریف می‌کنند که تعیین می‌کند پایشگر ترکیبی چه زمانی هشدار خود را ایجاد کند',
      'Triggers define the conditions that determine when a composite monitor should generate its own alert.':
        'محرک‌ها شرایطی را تعریف می‌کنند که تعیین می‌کند پایشگر ترکیبی چه زمانی هشدار خود را ایجاد کند.',
      Index: 'ایندکس',
      'Select an index': 'یک ایندکس انتخاب کنید',
      'Select indices': 'ایندکس‌ها را انتخاب کنید',
      'Must specify an index': 'باید یک ایندکس مشخص کنید',
      'Must specify an index.': 'باید یک ایندکس مشخص کنید.',
      'You can use a * as a wildcard or date math index resolution in your index pattern':
        'در الگوی ایندکس می‌توانید از * به‌عنوان نویسهٔ عام یا از محاسبات تاریخ برای تفکیک ایندکس استفاده کنید',
      'You can use a * as a wildcard or date math index resolution in your index pattern.':
        'در الگوی ایندکس می‌توانید از * به‌عنوان نویسهٔ عام یا از محاسبات تاریخ برای تفکیک ایندکس استفاده کنید.',
      'Select one local cluster or remote clusters from the cluster connections.':
        'یک کلاستر محلی یا کلاسترهای راه‌دور را از اتصال‌های کلاستر انتخاب کنید.',
      'Request type': 'نوع درخواست',
      'Specify a request type to monitor cluster metrics such as health, JVM, and CPU usage.':
        'برای پایش معیارهای کلاستر مانند سلامت، JVM و مصرف CPU یک نوع درخواست مشخص کنید.',
      'Select an API': 'یک رابط برنامه‌نویسی انتخاب کنید',
      'Loading API options': 'در حال بارگذاری گزینه‌های رابط برنامه‌نویسی',
      'Preview query': 'پیش‌نمایش پرس‌وجو',
      Response: 'پاسخ',
      Edit: 'ویرایش',
      Enable: 'فعال‌سازی',
      Disable: 'غیرفعال‌سازی',
      Delete: 'حذف',
      Active: 'فعال',
      Completed: 'تکمیل‌شده',
      Deleted: 'حذف‌شده',
      Muted: 'بی‌صدا',
      'Destinations (deprecated)': 'مقصدها (منسوخ)',
      'Destinations pending for migration': 'مقصدهای در انتظار انتقال',
      'Destinations that are pending migration will continue to work':
        'مقصدهایی که در انتظار انتقال هستند همچنان کار خواهند کرد',
      'Destinations that are pending migration will continue to work.':
        'مقصدهایی که در انتظار انتقال هستند همچنان کار خواهند کرد.',
      'All type': 'همهٔ انواع',
      'Destination name': 'نام مقصد',
      'Destination type': 'نوع مقصد',
      'Loading destinations...': 'در حال بارگذاری مقصدها...',
      '"To send or receive notifications, you will need to create a notification channel."':
        'برای ارسال یا دریافت اعلان‌ها باید یک کانال اعلان بسازید.',
      'Create recipient group': 'ایجاد گروه گیرندگان',
      'Recipient groups': 'گروه‌های گیرندگان',
      'Email addresses': 'نشانی‌های ایمیل',
      'No recipient groups to display': 'گروه گیرنده‌ای برای نمایش وجود ندارد',
      'Use an email group to manage a list of email addresses you frequently send at a time. You can select recipient groups when configuring email channels.':
        'با گروه ایمیل، نشانی‌هایی را که معمولاً هم‌زمان برایشان پیام می‌فرستید مدیریت کنید. هنگام پیکربندی کانال ایمیل می‌توانید گروه‌های گیرندگان را انتخاب کنید.',
      'You have no email group set up': 'هیچ گروه ایمیلی تنظیم نشده است',
      'Use an email group to manage a list of email addresses you frequently send to at the same time. You can create as many email groups as needed and use them together with individual email addresses when specifying recipients.':
        'با گروه ایمیل، نشانی‌هایی را که معمولاً هم‌زمان برایشان پیام می‌فرستید مدیریت کنید. می‌توانید به تعداد لازم گروه بسازید و هنگام تعیین گیرندگان، آن‌ها را همراه نشانی‌های تکی به‌کار ببرید.',
      'Configure recipient group': 'پیکربندی گروه گیرندگان',
      'Enter recipient group name': 'نام گروه گیرندگان را وارد کنید',
      'The name must contain 2 to 50 characters. Valid characters are A-Z, a-z, 0-9, (_) underscore, (-) hyphen and unicode characters.':
        'نام باید بین ۲ تا ۵۰ نویسه باشد. حروف لاتین، اعداد، زیرخط، خط تیره و نویسه‌های یونیکد مجاز هستند.',
      'Describe the purpose of the channel': 'هدف کانال را توضیح دهید',
      'Describe the purpose of the channel.': 'هدف کانال را توضیح دهید.',
      'What is the purpose of this recipient group?': 'هدف این گروه گیرندگان چیست؟',
      Emails: 'ایمیل‌ها',
      'Select or type in one or more email addresses':
        'یک یا چند نشانی ایمیل را انتخاب یا وارد کنید',
      'Select or type in one or more email addresses.':
        'یک یا چند نشانی ایمیل را انتخاب یا وارد کنید.',
      'SMTP senders': 'فرستنده‌های SMTP',
      'Create SMTP sender': 'ایجاد فرستندهٔ SMTP',
      'Encryption method': 'روش رمزنگاری',
      Port: 'درگاه',
      Host: 'میزبان',
      'Outbound email address': 'نشانی ایمیل خروجی',
      'No SMTP senders to display': 'فرستندهٔ SMTP برای نمایش وجود ندارد',
      'Set up an outbound email server by creating a sender. You will select a sender when configuring email channels.':
        'با ایجاد یک فرستنده، سرور ایمیل خروجی را راه‌اندازی کنید. هنگام پیکربندی کانال‌های ایمیل، فرستنده را انتخاب خواهید کرد.',
      'SES senders': 'فرستنده‌های SES',
      'Create SES sender': 'ایجاد فرستندهٔ SES',
      'Role ARN': 'ARN نقش',
      'AWS region': 'ناحیهٔ AWS',
      'No SES senders to display': 'فرستندهٔ SES برای نمایش وجود ندارد',
      'No results match your search criteria': 'هیچ نتیجه‌ای با معیارهای جستجوی شما مطابقت ندارد',
      'No results match your search criteria.': 'هیچ نتیجه‌ای با معیارهای جستجوی شما مطابقت ندارد.',
      'No results match for this search criteria.':
        'هیچ نتیجه‌ای با معیار جستجوی شما مطابقت ندارد.',
      'No Results': 'نتیجه‌ای یافت نشد',
      'Try selecting a different data source, expanding your time range or modifying the query & filters.':
        'یک منبع دادهٔ دیگر انتخاب کنید، بازهٔ زمانی را گسترش دهید یا عبارت جستجو و فیلترها را تغییر دهید.',
      'Try selecting a different data source, expanding your time range or modifying the query & filters':
        'یک منبع دادهٔ دیگر انتخاب کنید، بازهٔ زمانی را گسترش دهید یا عبارت جستجو و فیلترها را تغییر دهید.',
      'Sample data': 'داده‌های نمونه',
      'Add sample data with events to the modules':
        'داده‌های رویدادی نمونه را به ماژول‌ها اضافه کنید',
      'These actions require permissions on the managed indices.':
        'این عملیات به مجوز دسترسی به ایندکس‌های مدیریت‌شده نیاز دارد.',
      'Sample security information': 'اطلاعات امنیتی نمونه',
      'Sample malware detection': 'تشخیص بدافزار نمونه',
      'Sample تشخیص بدافزار': 'تشخیص بدافزار نمونه',
      'Sample threat detection and response': 'تشخیص و پاسخ‌گویی به تهدید نمونه',
      'Sample system inventory': 'موجودی سیستم نمونه',
      'Sample vulnerability detection inventory': 'موجودی تشخیص آسیب‌پذیری نمونه',
      'Add data': 'افزودن داده',
      'Adding data': 'در حال افزودن داده',
      'Remove data': 'حذف داده',
      'Removing data': 'در حال حذف داده',
      Installed: 'نصب‌شده',
      'TOP 5 GROUPS': '۵ گروه برتر',
      'TOP 5 OS': '۵ سیستم‌عامل برتر',
      'AGENTS BY STATUS': ' رابط‌های سرور بر اساس وضعیت',
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
      'Error saving server address configuration': 'خطا در ذخیره پیکربندی آدرس سرور',
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
      "The password is required but wasn't defined. Please check our":
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
      'Back to agent list': 'بازگشت به فهرست  رابط‌های سرور',
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
      Agents: ' رابط‌های سرور',
      Endpoints: 'Endpointها',
      Summary: 'خلاصه',
      Files: 'فایل‌ها',
      Groups: 'گروه‌ها',
      Rules: 'قواعد',
      Rule: 'قاعده',
      Ruleها: 'قواعد',
      Ruleهای: 'قواعد',
      Decoders: 'دیکودرها',
      Decoder: 'دیکودر',
      Decoderها: 'دیکودرها',
      Decoderهای: 'دیکودرهای',
      'CDB Lists': 'فهرست‌های CDB',
      'لیست‌های CDB': 'فهرست‌های CDB',
      'From here you can list and check your groups, its agents and files.':
        'از اینجا می‌توانید گروه‌ها،  رابط‌های سرور و فایل‌های آن‌ها را فهرست و بررسی کنید.',
      'From here you can manage your rules': 'از اینجا می‌توانید قواعد خود را مدیریت کنید',
      'From here you can manage your rules.': 'از اینجا می‌توانید قواعد خود را مدیریت کنید.',
      'From here you can manage your rules files.':
        'از اینجا می‌توانید فایل‌های قواعد خود را مدیریت کنید.',
      'From here you can manage your decoders': 'از اینجا می‌توانید دیکودرهای خود را مدیریت کنید',
      'From here you can manage your decoders.': 'از اینجا می‌توانید دیکودرهای خود را مدیریت کنید.',
      'From here you can manage your decoders files.':
        'از اینجا می‌توانید فایل‌های دیکودرهای خود را مدیریت کنید.',
      'From here you can manage your lists': 'از اینجا می‌توانید لیست‌های خود را مدیریت کنید',
      'From here you can manage your lists.': 'از اینجا می‌توانید لیست‌های خود را مدیریت کنید.',
      'From here you can check all your reports.':
        'از اینجا می‌توانید همه گزارش‌های خود را بررسی کنید.',
      'From here you can list and manage your agents':
        'از اینجا می‌توانید  رابط‌های سروری خود را فهرست و مدیریت کنید.',
      'From here you can list and see your group files, also, you can edit the group configuration':
        'از اینجا می‌توانید فایل‌های گروه را فهرست و مشاهده کنید و پیکربندی گروه را ویرایش کنید.',
      'From here you can manage and configure the API entries. You can also check their connection and status.':
        'از اینجا می‌توانید ورودی‌های API را مدیریت و پیکربندی کنید و اتصال و وضعیت آن‌ها را بررسی کنید.',
      'From here you can see daemon statistics.': 'از اینجا می‌توانید آمار daemon را ببینید.',
      Name: 'نام',
      'IP address': 'آدرس IP',
      'Group(s)': 'گروه‌ها',
      'Cluster node': 'گره کلاستر',
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
      'Create a new report definition to get started': 'برای شروع، یک تعریف گزارش جدید بسازید',
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
      'To send or receive notifications, you': 'برای ارسال یا دریافت اعلان‌ها باید',
      'will need to create a notification': 'یک کانال اعلان',
      'notification channel': 'کانال اعلان',
      'channel.': 'بسازید.',
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
      'Slack webhook URL': 'نشانی دریافت رویداد اسلک',
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
        'پلاگین تشخیص ناهنجاری با الگوریتم جنگل برش تصادفی، ناهنجاری‌های داده را تقریباً به‌صورت بی‌درنگ شناسایی می‌کند.',
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
      'Monitor HTTP responses': 'پایش پاسخ‌های وب',
      'Detect increases in CPU and memory utilization in an index containing various health metrics from a host':
        'افزایش مصرف پردازنده و حافظه را در ایندکسی شامل معیارهای مختلف سلامت میزبان شناسایی کنید',
      'Detect increases in CPU and memory utilization in an index containing various health metrics from a host.':
        'افزایش مصرف پردازنده و حافظه را در ایندکسی شامل معیارهای مختلف سلامت میزبان شناسایی کنید.',
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
        'تعداد بالای کدهای پاسخ خطا را در ایندکسی شامل داده پاسخ‌های وب شناسایی کنید',
      'Detect high numbers of error response codes in an index containing HTTP response data.':
        'تعداد بالای کدهای پاسخ خطا را در ایندکسی شامل داده پاسخ‌های وب شناسایی کنید.',
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
      'Only request data around map extent': 'فقط داده‌های محدودهٔ قابل‌مشاهدهٔ نقشه دریافت شوند',
      'Use default OpenSearch basemaps.': 'از نقشه‌های پایهٔ پیش‌فرض OpenSearch استفاده شود.',
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
      'Vulnerabilities by year of publication': 'آسیب‌پذیری‌ها بر اساس سال انتشار',
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
      'Agents summary': 'خلاصه عامل‌ها',
      'AGENTS SUMMARY': 'خلاصه عامل‌ها',
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
      'Go to all agents': 'رفتن به همه عامل‌ها',
      'Deploy new agent': 'استقرار عامل جدید',
      'No agents were added to the manager': 'هیچ عاملی به مدیریت عامل‌ها اضافه نشده است',
      'No agents were added to this manager.': 'هیچ عاملی به این مدیریت عامل‌ها اضافه نشده است.',
      'Add agents to fleet to start monitoring': 'برای شروع پایش، عامل‌ها را به مجموعه اضافه کنید',
      'This instance has no agents registered.': 'در این نمونه هیچ عاملی ثبت نشده است.',
      'Please deploy agents to begin monitoring your endpoints.':
        'برای شروع پایش امنیت پایانه، عامل‌ها را مستقر کنید.',
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
      "You don't have SCA scans in this agent.": 'برای این Agent اسکن SCA وجود ندارد.',
      'Check your agent settings to generate scans.':
        'برای تولید اسکن‌ها تنظیمات Agent را بررسی کنید.',
      'Not enough hardware or operating system information':
        'اطلاعات سخت‌افزار یا سیستم‌عامل کافی نیست',
      Private: 'خصوصی',
      'View roles and identities': 'مشاهده نقش‌ها و هویت‌ها',
      'Switch tenants': 'تغییر فضای کاری',
      Users: 'کاربران',
      Groups: 'گروه‌ها',
      GitHub: 'گیت‌هاب',
      'Module configuration': 'پیکربندی ماژول',
      'Error fetching the module configuration': 'خطا در دریافت پیکربندی ماژول',
      'Module Unavailable': 'ماژول در دسترس نیست',
      Organizations: 'سازمان‌ها',
      Organization: 'سازمان',
      Actors: 'عامل‌ها',
      Actor: 'عامل',
      Repositories: 'مخزن‌ها',
      Repository: 'مخزن',
      'Saved Queries': 'جستجوهای ذخیره‌شده',
      'There are no saved queries.': 'هیچ جستجوی ذخیره‌شده‌ای وجود ندارد.',
      'Save query text and filters that you want to use again.':
        'متن جستجو و فیلترهایی را ذخیره کنید که می‌خواهید دوباره استفاده کنید.',
      'Save current query': 'ذخیره جستجوی فعلی',
      'No filters found': 'فیلتری پیدا نشد',
      'Loading filters': 'در حال بارگذاری فیلترها',
      Filters: 'فیلترها',
      'Enable all': 'فعال‌کردن همه',
      'Disable all': 'غیرفعال‌کردن همه',
      'Pin all': 'سنجاق‌کردن همه',
      'Unpin all': 'برداشتن سنجاق همه',
      'Invert inclusion': 'معکوس‌کردن شمول',
      'Invert enabled/disabled': 'معکوس‌کردن وضعیت فعال/غیرفعال',
      'Remove all': 'حذف همه',
      'Filter for value': 'فیلتر بر اساس این مقدار',
      'Filter out value': 'حذف این مقدار از نتایج',
      'Select data': 'انتخاب داده',
      'Select an available data source and choose a query language to use for running queries. You can use the data dropdown or use the enhanced data selector to select data.':
        'یک منبع داده موجود و زبان پرس‌وجو را برای اجرای جستجو انتخاب کنید. می‌توانید از فهرست داده یا انتخاب‌گر پیشرفته داده استفاده کنید.',
      'Learn more about query languages': 'آشنایی بیشتر با زبان‌های پرس‌وجو',
      'SQL documentation': 'مستندات SQL',
      'PPL documentation': 'مستندات PPL',
      'Lucene documentation': 'مستندات Lucene',
      'DQL documentation': 'مستندات DQL',
      Searching: 'در حال جستجو',
      'Export Formatted': 'خروجی قالب‌بندی‌شده',
      'Reset view': 'بازنشانی نما',
      Columns: 'ستون‌ها',
      Density: 'تراکم',
      'Full screen': 'تمام‌صفحه',
      Sorting: 'مرتب‌سازی',
      'Select all rows': 'انتخاب همه ردیف‌ها',
      'Metric Aggregations': 'تجمیع‌های شاخص',
      'Parent Pipeline Aggregations': 'تجمیع‌های خط لوله والد',
      'Sibling pipeline aggregations': 'تجمیع‌های خط لوله هم‌سطح',
      'Moving Avg': 'میانگین متحرک',
      'Serial Diff': 'تفاضل متوالی',
      'Average Bucket': 'میانگین بازه‌ها',
      'Max Bucket': 'بیشینه بازه‌ها',
      'Min Bucket': 'کمینه بازه‌ها',
      'Sum Bucket': 'مجموع بازه‌ها',
      'Unique Count': 'تعداد یکتا',
      'Percentile Ranks': 'رتبه‌های صدکی',
      Percentiles: 'صدک‌ها',
      'Standard Deviation': 'انحراف معیار',
      'Top Hit': 'مقدار برتر',
      Everything: 'همه داده‌ها',
      Terms: 'مقدارهای یکتا',
      Aggregation: 'تجمیع',
      Data: 'داده',
      'Data Source': 'منبع داده',
      _source: 'منبع',
      source_: 'منبع',
      Annotations: 'حاشیه‌نویسی‌ها',
      Metrics: 'شاخص‌ها',
      'Group by': 'گروه‌بندی بر اساس',
      'Time Series': 'سری زمانی',
      Metric: 'شاخص عددی',
      'Top N': 'برترین‌ها',
      Gauge: 'سنجه',
      Markdown: 'markdown',
      Table: 'جدول',
      Label: 'برچسب',
      Rows: 'تعداد ردیف‌ها',
      'Column label': 'برچسب ستون',
      'Group by field': 'فیلد گروه‌بندی',
      'Add a field to start': 'برای شروع یک فیلد اضافه کنید',
      'Drag a field to the configuration panel to generate a visualization.':
        'برای ساخت تصویرسازی، یک فیلد را به پنل پیکربندی بکشید.',
      'Click or drop to add': 'برای افزودن کلیک کنید یا فیلد را اینجا رها کنید',
      'Categorical Fields': 'فیلدهای دسته‌ای',
      'Numerical Fields': 'فیلدهای عددی',
      'Legend position': 'موقعیت راهنما',
      'Show tooltip': 'نمایش راهنمای شناور',
      'Y-axis': 'محور عمودی',
      'X-axis': 'محور افقی',
      'Split series': 'تفکیک سری‌ها',
      'Split chart': 'تفکیک نمودار',
      'For the table visualization you need to define a field to group by using a terms aggregation.':
        'برای تصویرسازی جدول باید با تجمیع مقدارهای یکتا، یک فیلد برای گروه‌بندی تعیین کنید.',
      'Click the button below to create an annotation data source.':
        'برای ایجاد منبع دادهٔ حاشیه‌نویسی، دکمهٔ زیر را بزنید.',
      'Add data source': 'افزودن منبع داده',
      'Data sources': 'منابع داده',
      'The following variables can be used in the Markdown by using the Handlebar (mustache) syntax.':
        'متغیرهای زیر را می‌توان با نگارش Handlebars (mustache) در markdown استفاده کرد.',
      'Click here for documentation': 'مشاهدهٔ مستندات',
      'on the available expressions.': 'برای عبارت‌های در دسترس.',
      'There is also a special variable named': 'همچنین متغیر ویژه‌ای با نام',
      'which you can use to access the entire tree. This is useful for creating lists with data from a group by:':
        'وجود دارد که با آن می‌توانید به کل درخت دسترسی پیدا کنید. این متغیر برای ساخت فهرست از داده‌های گروه‌بندی‌شده کاربرد دارد:',
      'There is also a special variable named _all which you can use to access the entire tree. This is useful for creating lists with data from a group by:':
        'متغیر ویژهٔ _all امکان دسترسی به کل درخت را می‌دهد و برای ساخت فهرست از داده‌های گروه‌بندی‌شده کاربرد دارد:',
      Value: 'مقدار',
      'Seconds ago': 'ثانیه پیش',
      'Minutes ago': 'دقیقه پیش',
      'Hours ago': 'ساعت پیش',
      'Days ago': 'روز پیش',
      'Weeks ago': 'هفته پیش',
      'Months ago': 'ماه پیش',
      'Years ago': 'سال پیش',
      'Seconds from now': 'ثانیه بعد',
      'Minutes from now': 'دقیقه بعد',
      'Hours from now': 'ساعت بعد',
      'Days from now': 'روز بعد',
      'Weeks from now': 'هفته بعد',
      'Months from now': 'ماه بعد',
      'Years from now': 'سال بعد',
      'Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.':
        'تنظیم زمان روی «اکنون» باعث می‌شود در هر تازه‌سازی، این زمان برابر زمان تازه‌سازی قرار گیرد.',
      'Set start date and time to now': 'تنظیم تاریخ و زمان شروع روی اکنون',
      'Set end date and time to now': 'تنظیم تاریخ و زمان پایان روی اکنون',
      'Start date': 'تاریخ شروع',
      'End date': 'تاریخ پایان',
      'User has no administrator role in the selected API connection.':
        'کاربر در اتصال رابط برنامه‌نویسی انتخاب‌شده نقش مدیر ندارد.',
      'Most active users': 'فعال‌ترین کاربران',
      'Files added': 'فایل‌های افزوده‌شده',
      'Files modified': 'فایل‌های تغییریافته',
      'Files deleted': 'فایل‌های حذف‌شده',
      'No results found': 'نتیجه‌ای پیدا نشد',
      'No data to display for the selected metrics': 'داده‌ای برای شاخص‌های انتخاب‌شده وجود ندارد.',
      'The changes will be automatically applied.': 'تغییرات به‌صورت خودکار اعمال می‌شوند.',
      'Auto apply': 'اعمال خودکار',
      'Listened ports status (netstat) changed (new port opened or closed).':
        'وضعیت پورت‌های در حال شنود (netstat) تغییر کرد (پورتی باز یا بسته شد).',
      'Systemd: Service exited due to a failure.': 'Systemd: سرویس به‌دلیل خطا متوقف شد.',
      'syslog: User authentication failure.': 'syslog: احراز هویت کاربر ناموفق بود.',
      'unix_chkpwd: Password check failed.': 'unix_chkpwd: بررسی گذرواژه ناموفق بود.',
      'Ensure /tmp is configured.': 'اطمینان دهید /tmp پیکربندی شده است.',
      'Ensure mounting of FAT filesystems is limited.':
        'اطمینان دهید mount شدن فایل‌سیستم‌های FAT محدود شده است.',
      'Ensure nodev option set on /tmp partition.':
        'اطمینان دهید گزینه nodev روی پارتیشن /tmp تنظیم شده است.',
      'CIS Distribution Independent Linux Benchmark v2.0.0.':
        'معیار مستقل توزیع لینوکس CIS نسخه ۲.۰.۰',
      'CIS Distribution Independent Linux Benchmark v2.0.0':
        'معیار مستقل توزیع لینوکس CIS نسخه ۲.۰.۰',
      Checks: 'بررسی‌ها',
      Title: 'عنوان',
      Target: 'هدف',
      Result: 'نتیجه',
    })
  );

  // Visualization plugins such as Gantt and custom maps are installed as
  // prebuilt packages, so their messages are not available to the core fa-IR
  // catalog. Translate their late-mounted React UI in the shared bootstrap.
  const VISUALIZATION_PERSIAN_TEXT_MAP = new Map(
    Object.entries({
      'This visualization allows you to create a Gantt chart.':
        'این تصویرسازی به شما امکان می‌دهد یک نمودار گانت ایجاد کنید.',
      'Create map visualization with multiple layers':
        'یک تصویرسازی نقشه با چندین لایه ایجاد کنید.',
      'Select a visualization type': 'یک نوع تصویرسازی انتخاب کنید',
      'Start creating your visualization by selecting a type for that visualization.':
        'برای شروع ساخت تصویرسازی، نوع آن را انتخاب کنید.',
      'Start creating your visualization by selecting a type for that visualization. Hit escape to close this modal. Hit Tab key to go further.':
        'برای شروع ساخت تصویرسازی، نوع آن را انتخاب کنید. برای بستن این پنجره کلید Escape و برای رفتن به بخش بعد کلید Tab را بزنید.',
      'New Gantt Chart': 'نمودار گانت جدید',
      'New Tag Cloud': 'ابر برچسب جدید',
      'New ابر واژه': 'ابر واژه جدید',
      'New Data Table': 'جدول داده جدید',
      'New جدول داده': 'جدول داده جدید',
      'New Gauge': 'سنجه جدید',
      'New سنجه': 'سنجه جدید',
      'New Metric': 'شاخص عددی جدید',
      'New شاخص عددی': 'شاخص عددی جدید',
      'New Heat Map': 'نقشه حرارتی جدید',
      'New نقشه حرارتی': 'نقشه حرارتی جدید',
      'New Coordinate Map': 'نقشه مختصات جدید',
      'New نقشه مختصات': 'نقشه مختصات جدید',
      'New Region Map': 'نقشه ناحیه‌ای جدید',
      'New نقشه ناحیه‌ای': 'نقشه ناحیه‌ای جدید',
      'New Line': 'نمودار خطی جدید',
      'New نمودار خطی': 'نمودار خطی جدید',
      'New Pie': 'نمودار دایره‌ای جدید',
      'New نمودار دایره‌ای': 'نمودار دایره‌ای جدید',
      'New Area': 'نمودار سطحی جدید',
      'New نمودار سطحی': 'نمودار سطحی جدید',
      'New Horizontal Bar': 'نمودار میله‌ای افقی جدید',
      'New نمودار میله‌ای افقی': 'نمودار میله‌ای افقی جدید',
      'New Vertical Bar': 'نمودار میله‌ای عمودی جدید',
      'New نمودار میله‌ای عمودی': 'نمودار میله‌ای عمودی جدید',
      'New Goal': 'هدف جدید',
      'New هدف': 'هدف جدید',
      'Choose a source': 'انتخاب منبع',
      'Specify data to plot the chart using the Data & Options panel':
        'داده‌های موردنظر برای رسم نمودار را از پنل «داده و گزینه‌ها»',
      'on the right.': 'در سمت راست مشخص کنید.',
      'No data matching the selected filter.': 'داده‌ای مطابق فیلتر انتخاب‌شده وجود ندارد.',
      Position: 'موقعیت',
      Left: 'چپ',
      Right: 'راست',
      Top: 'بالا',
      Bottom: 'پایین',
      'Show Y-axis line': 'نمایش خط محور عمودی',
      'Show Y-axis label': 'نمایش برچسب محور عمودی',
      'Show X-axis line': 'نمایش خط محور افقی',
      'Show X-axis label': 'نمایش برچسب محور افقی',
      'Scale type': 'نوع مقیاس',
      Auto: 'خودکار',
      Linear: 'خطی',
      Log: 'لگاریتمی',
      'Time format': 'قالب زمان',
      'hh:mm:ss.SSS (12 hours)': 'hh:mm:ss.SSS (۱۲ ساعته)',
      'MM/DD hh:mm:ss (12 hours)': 'MM/DD hh:mm:ss (۱۲ ساعته)',
      'MM/DD/YY hh:mm (12 hours)': 'MM/DD/YY hh:mm (۱۲ ساعته)',
      'hh:mm:ss.SSS (24 hours)': 'hh:mm:ss.SSS (۲۴ ساعته)',
      'MM/DD hh:mm:ss (24 hours)': 'MM/DD hh:mm:ss (۲۴ ساعته)',
      'MM/DD/YY hh:mm (24 hours)': 'MM/DD/YY hh:mm (۲۴ ساعته)',
      Legend: 'راهنما',
      'Show legend': 'نمایش راهنما',
      Orientation: 'جهت',
      Vertical: 'عمودی',
      Horizontal: 'افقی',
      Grid: 'شبکه',
      'Show Y-axis grids': 'نمایش خطوط شبکهٔ محور عمودی',
      'Show X-axis grids': 'نمایش خطوط شبکهٔ محور افقی',
      Colors: 'رنگ‌ها',
      Color: 'رنگ',
      'Edit as Query DSL': 'ویرایش به‌صورت Query DSL',
      'Edit filter': 'ویرایش فیلتر',
      Operator: 'عملگر',
      Field: 'فیلد',
      Waiting: 'در انتظار',
      'Select a field first': 'ابتدا یک فیلد انتخاب کنید',
      'Create custom label?': 'ایجاد برچسب سفارشی؟',
      'Custom label': 'برچسب سفارشی',
      'OpenSearch Query DSL expression': 'عبارت DSL پرس‌وجوی OpenSearch',
      'Configure maps to use a custom map source.':
        'برای استفاده از منبع نقشهٔ سفارشی، نقشه‌ها را پیکربندی کنید.',
      Documents: 'اسناد',
      'View points, lines, and polygons on the map.':
        'نقاط، خطوط و چندضلعی‌ها را روی نقشه مشاهده کنید.',
      'View points, lines, and shapes on a map.':
        'نقاط، خطوط و شکل‌ها را روی نقشه مشاهده کنید.',
      'Index pattern': 'الگوی ایندکس',
      'Select index pattern': 'انتخاب الگوی ایندکس',
      Required: 'الزامی',
      'Geospatial field': 'فیلد مکانی',
      'Select data field': 'انتخاب فیلد داده',
      'Number of documents': 'تعداد اسناد',
      'Must between 1 and 10000': 'مقدار باید بین ۱ و ۱۰۰۰۰ باشد',
      'Only request data around map extent':
        'فقط داده‌های محدودهٔ قابل‌مشاهدهٔ نقشه دریافت شوند',
      'Only request data results for the visible map extent':
        'فقط نتایج دادهٔ محدودهٔ قابل‌مشاهدهٔ نقشه دریافت شوند',
      'Apply global filters': 'اعمال فیلترهای سراسری',
      Tooltips: 'راهنماهای ابزار',
      'Enable tooltips': 'فعال‌سازی راهنماهای ابزار',
      'Tooltip fields': 'فیلدهای راهنمای ابزار',
      'Layer style': 'سبک لایه',
      Points: 'نقطه‌ها',
      Lines: 'خط‌ها',
      Polygons: 'چندضلعی‌ها',
      'Fill color': 'رنگ پرکننده',
      'Border color': 'رنگ حاشیه',
      'Border thickness': 'ضخامت حاشیه',
      'Marker size': 'اندازه نشانگر',
      px: 'پیکسل',
      'Layer settings': 'تنظیمات لایه',
      Name: 'نام',
      Description: 'توضیحات',
      'Enter description': 'توضیحات را وارد کنید',
      'Zoom levels': 'سطوح بزرگ‌نمایی',
      Opacity: 'شفافیت',
      'Custom type': 'نوع سفارشی',
      'Choose custom map type.': 'نوع نقشهٔ سفارشی را انتخاب کنید.',
      'Tile Map Service (TMS)': 'سرویس نقشهٔ کاشی',
      'Web Map Service (WMS)': 'سرویس نقشهٔ وب',
      'TMS URL*': 'نشانی TMS*',
      'Raster tile map service URL.': 'نشانی سرویس نقشهٔ کاشی رستری.',
      'TMS attribution': 'انتساب TMS',
      'The attribution for the TMS layer, displayed in the lower-right corner of the map.':
        'انتساب لایهٔ TMS که در گوشهٔ پایین سمت راست نقشه نمایش داده می‌شود.',
      'WMS URL*': 'نشانی WMS*',
      'Web map service URL': 'نشانی سرویس نقشهٔ وب',
      'WMS layers*': 'لایه‌های WMS*',
      'The names of the layers to include in the map image. For more than one name, use a comma-separated list.':
        'نام لایه‌هایی که باید در تصویر نقشه قرار گیرند. برای بیش از یک نام، از فهرست جداشده با ویرگول استفاده کنید.',
      'WMS version*': 'نسخهٔ WMS*',
      'WMS format*': 'قالب WMS*',
      "The format of the map image to return. The most common formats are 'image/png' and 'image/jpeg'.":
        'قالب تصویر نقشهٔ خروجی. رایج‌ترین قالب‌ها image/png و image/jpeg هستند.',
      'WMS CRS': 'سامانهٔ مرجع مختصات سرویس نقشهٔ وب',
      'The coordinate reference system (CRS) to use for the map image.':
        'سیستم مرجع مختصات (CRS) مورداستفاده برای تصویر نقشه.',
      'WMS bbox': 'محدودهٔ WMS',
      'The bounding box of the region to include in the map image.':
        'محدودهٔ جغرافیایی ناحیه‌ای که باید در تصویر نقشه قرار گیرد.',
      'WMS attribution': 'انتساب WMS',
      'The attribution for this WMS layer, displayed at right-bottom map.':
        'انتساب این لایهٔ WMS که در پایین سمت راست نقشه نمایش داده می‌شود.',
      'WMS styles': 'سبک‌های WMS',
      'The styles to be used for each of the layers in the map image.':
        'سبک‌های مورداستفاده برای هر یک از لایه‌های تصویر نقشه.',
      'Timeline expression': 'عبارت خط زمانی',
      'Reformat as HJSON': 'قالب‌بندی مجدد به‌صورت HJSON',
      'Reformat as JSON, delete comments': 'قالب‌بندی مجدد به‌صورت JSON و حذف توضیحات',
      'Event counts from all indexes': 'تعداد رخدادها از همهٔ ایندکس‌ها',
      'OpenSearch Dashboards Vega help': 'راهنمای Vega در داشبورد Ayyza',
      'Ayyza Vega help': 'راهنمای Vega در داشبورد Ayyza',
      'Vega-Lite documentation': 'مستندات Vega-Lite',
      'Vega documentation': 'مستندات Vega',
      'Tag size': 'اندازه برچسب',
      help: 'راهنما',
      Buckets: 'بازه‌ها',
      'Add bucket': 'افزودن بازه',
      'Add بازه': 'افزودن بازه',
      Tags: 'برچسب‌ها',
      'Text scale': 'مقیاس متن',
      Orientations: 'جهت‌گیری‌ها',
      Single: 'تکی',
      'Right angled': 'زاویه‌دار به راست',
      Multiple: 'چندگانه',
      'Font size range in pixels': 'بازهٔ اندازهٔ قلم برحسب پیکسل',
      'Show label': 'نمایش برچسب',
      'Square root': 'ریشهٔ دوم',
      'Update OpenSearch Dashboards filters on each change':
        'به‌روزرسانی فیلترهای داشبورد Ayyza با هر تغییر',
      'Update Ayyza filters on each change': 'به‌روزرسانی فیلترهای Ayyza با هر تغییر',
      'Use time filter': 'استفاده از فیلتر زمان',
      'Pin filters for all applications': 'سنجاق‌کردن فیلترها برای همهٔ برنامه‌ها',
      'Range slider': 'لغزندهٔ بازه',
      'Options list': 'فهرست گزینه‌ها',
      'Control Label': 'برچسب کنترل',
      'Select index pattern...': 'الگوی ایندکس را انتخاب کنید…',
      'Select index pattern…': 'الگوی ایندکس را انتخاب کنید…',
      'Select الگوی ایندکس...': 'الگوی ایندکس را انتخاب کنید…',
      'Select الگوی ایندکس…': 'الگوی ایندکس را انتخاب کنید…',
      'Step Size': 'اندازهٔ گام',
      'Decimal Places': 'تعداد رقم‌های اعشار',
      'Add metric': 'افزودن شاخص',
      'Add Metric': 'افزودن شاخص',
      'Add شاخص': 'افزودن شاخص',
      'Count help': 'راهنمای تعداد',
      'تعداد help': 'راهنمای تعداد',
      'Y-Axis': 'محور عمودی',
      'Y-axes': 'محورهای عمودی',
      'Add Y-axis': 'افزودن محور عمودی',
      'Remove Y-axis': 'حذف محور عمودی',
      'Threshold line': 'خط آستانه',
      'Show threshold line': 'نمایش خط آستانه',
      'Y-axis lines': 'خطوط محور عمودی',
      'Point size': 'اندازهٔ نقطه',
      'محورعمودی': 'محور عمودی',
      'Previous page': 'صفحهٔ قبل',
      'Next page': 'صفحهٔ بعد',
    })
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

  // <ayyza-unified-persian-catalog>
// Generated from ayyza-rtl/translations/runtime-fa.json. Do not edit this block.
const UNIFIED_PERSIAN_TEXT_MAP = new Map(Object.entries({
  "Creating detector": "در حال ایجاد آشکارساز",
  "All detectors": "همهٔ آشکارسازها",
  "All matching detectors are under initialization or stopped for the last 30 minutes. Please adjust filters or come back later.": "همهٔ آشکارسازهای منطبق در ۳۰ دقیقهٔ گذشته در حال راه‌اندازی بوده‌اند یا متوقف شده‌اند. فیلترها را تغییر دهید یا بعداً دوباره مراجعه کنید.",
  "All selected detectors are unable to start. Make sure selected detectors have features and are not already running": "هیچ‌یک از آشکارسازهای انتخاب‌شده قابل شروع نیستند. مطمئن شوید ویژگی دارند و از قبل در حال اجرا نیستند.",
  "All selected detectors are unable to stop. Make sure selected detectors are already running": "هیچ‌یک از آشکارسازهای انتخاب‌شده قابل توقف نیستند. مطمئن شوید در حال اجرا هستند.",
  "Anomalies by index and detector": "ناهنجاری‌ها بر اساس ایندکس و آشکارساز",
  "Anomaly": "ناهنجاری",
  "Anomaly Criteria": "معیار ناهنجاری",
  "Anomaly grade": "درجهٔ ناهنجاری",
  "Anomaly grade / Confidence": "درجهٔ ناهنجاری / اطمینان",
  "Anomaly grade:": "درجهٔ ناهنجاری:",
  "Anomaly occurrences": "رخدادهای ناهنجاری",
  "Average anomaly grade": "میانگین درجهٔ ناهنجاری",
  "Confidence": "اطمینان",
  "Detectors and features": "آشکارسازها و ویژگی‌ها",
  "Detectors with anomalies": "آشکارسازهای دارای ناهنجاری",
  "Indices with anomalies": "ایندکس‌های دارای ناهنجاری",
  "Live": "زنده",
  "Live anomalies": "ناهنجاری‌های زنده",
  "Live anomaly results across detectors for the last 30 minutes. 'The results refresh every 1 minute. 'For each detector, if an anomaly occurrence is detected at the end of the detector interval, 'you will see a bar representing its anomaly grade.": "نتایج زندهٔ ناهنجاری همهٔ آشکارسازها در ۳۰ دقیقهٔ گذشته نمایش داده می‌شود. نتایج هر ۱ دقیقه تازه می‌شوند. اگر در پایان بازهٔ یک آشکارساز ناهنجاری‌ای شناسایی شود، میله‌ای نشان‌دهندهٔ درجهٔ آن خواهید دید.",
  "The inner circle shows anomaly distribution by index. The outer circle shows distribution by detector.": "دایرهٔ داخلی توزیع ناهنجاری بر اساس ایندکس و دایرهٔ بیرونی توزیع آن بر اساس آشکارساز را نشان می‌دهد.",
  "View full screen": "نمایش تمام‌صفحه",
  "Exit full screen": "خروج از تمام‌صفحه",
  "Detector created": "آشکارساز ایجاد شد",
  "View detector and sample data": "مشاهدهٔ آشکارساز و دادهٔ نمونه",
  "Want more details on the sample data?": "جزئیات بیشتری از دادهٔ نمونه می‌خواهید؟",
  "Check out the": "مشاهده کنید:",
  "OpenSearch Dashboards Discover app": "برنامهٔ کاوش داشبورد Ayyza",
  "to view the raw data for sample index '": "برای مشاهدهٔ دادهٔ خام ایندکس نمونه «",
  "Detector configuration": "پیکربندی آشکارساز",
  "Real-time results": "نتایج بی‌درنگ",
  "Real-time detection": "تشخیص بی‌درنگ",
  "Real-time detector": "آشکارساز بی‌درنگ",
  "Running since": "در حال اجرا از",
  "Stop detector": "توقف آشکارساز",
  "Restart detector": "راه‌اندازی مجدد آشکارساز",
  "View detector configuration": "مشاهدهٔ پیکربندی آشکارساز",
  "Attempting to initialize the detector with historical data. This initializing process takes approximately 1 minute if you have data in each of the last": "در حال راه‌اندازی آشکارساز با داده‌های تاریخی. اگر در هر یک از بازه‌های پیوستهٔ اخیر داده داشته باشید، این فرایند حدود ۱ دقیقه زمان می‌برد:",
  "consecutive intervals.": "بازهٔ پیوسته.",
  "Initializing": "در حال راه‌اندازی",
  "Initialization failure": "راه‌اندازی ناموفق",
  "initialization has failed.": "راه‌اندازی ناموفق بوده است.",
  "Not available when the detector": "هنگامی که آشکارساز در حال راه‌اندازی است در دسترس نیست",
  "Detector interval": "بازهٔ آشکارساز",
  "Latest anomaly grade": "آخرین درجهٔ ناهنجاری",
  "Latest confidence": "آخرین میزان اطمینان",
  "No anomalies found during the last 30 minutes across all matching detectors.": "در ۳۰ دقیقهٔ گذشته در هیچ‌یک از آشکارسازهای منطبق ناهنجاری‌ای یافت نشد.",
  "There are no anomalies currently.": "در حال حاضر ناهنجاری‌ای وجود ندارد.",
  "Anomaly overview": "نمای کلی ناهنجاری",
  "Set up alerts": "راه‌اندازی هشدارها",
  "Last anomaly occurrence": "آخرین رخداد ناهنجاری",
  "Feature breakdown": "تفکیک ویژگی‌ها",
  "Feature output": "خروجی ویژگی",
  "Expected Value": "مقدار مورد انتظار",
  "Expected value": "مقدار مورد انتظار",
  "Aggregation method:": "روش تجمیع:",
  "State": "وضعیت",
  "Field": "فیلد",
  "Active": "فعال",
  "End time": "زمان پایان",
  "End time:": "زمان پایان:",
  "Start time": "زمان شروع",
  "Start time:": "زمان شروع:",
  "Quick select": "انتخاب سریع",
  "Apply": "اعمال",
  "Commonly used": "گزینه‌های پرکاربرد",
  "last 24 hours": "۲۴ ساعت گذشته",
  "Last 24 hours": "۲۴ ساعت گذشته",
  "last 7 days": "۷ روز گذشته",
  "Last 7 days": "۷ روز گذشته",
  "last 30 days": "۳۰ روز گذشته",
  "last 90 days": "۹۰ روز گذشته",
  "Week to date": "از ابتدای هفته تا امروز",
  "Month to date": "از ابتدای ماه تا امروز",
  "Year to date": "از ابتدای سال تا امروز",
  "Today": "امروز",
  "You haven't yet set up historical analysis": "هنوز تحلیل تاریخی را راه‌اندازی نکرده‌اید",
  "Historical analysis lets you apply anomaly detection models over long historical data windows (weeks or months). You can identify anomaly patterns, seasonality, and trends.": "تحلیل تاریخی امکان اجرای مدل‌های تشخیص ناهنجاری را روی بازه‌های طولانی داده (چند هفته یا ماه) فراهم می‌کند تا الگوهای ناهنجاری، فصلی‌بودن و روندها را شناسایی کنید.",
  "Historical analysis detection lets you analyze and apply machine learning models over long historical data windows (weeks or months). You can identify anomaly patterns, seasonality, and trends.": "تشخیص در تحلیل تاریخی امکان تحلیل و اجرای مدل‌های یادگیری ماشین را روی بازه‌های طولانی داده (چند هفته یا ماه) فراهم می‌کند تا الگوهای ناهنجاری، فصلی‌بودن و روندها را شناسایی کنید.",
  "Run historical analysis": "اجرای تحلیل تاریخی",
  "Run historical analysis detection": "اجرای تشخیص تاریخی",
  "Historical analysis detection": "تشخیص تحلیل تاریخی",
  "Historical analysis detector": "آشکارساز تحلیل تاریخی",
  "Historical analysis date range": "بازهٔ تاریخ تحلیل تاریخی",
  "Modify historical analysis": "تغییر تحلیل تاریخی",
  "Modify historical analysis range": "تغییر بازهٔ تحلیل تاریخی",
  "Set up historical analysis": "راه‌اندازی تحلیل تاریخی",
  "Initializing the historical analysis.": "در حال راه‌اندازی تحلیل تاریخی.",
  "Running the historical analysis": "تحلیل تاریخی در حال اجراست",
  "Stopping the historical analysis": "در حال توقف تحلیل تاریخی",
  "Stop historical analysis": "توقف تحلیل تاریخی",
  "The historical analysis is stopped": "تحلیل تاریخی متوقف است",
  "The historical analysis has failed unexpectedly. Try restarting the detector.": "تحلیل تاریخی به‌طور غیرمنتظره‌ای ناموفق شد. آشکارساز را دوباره راه‌اندازی کنید.",
  "Detector settings": "تنظیمات آشکارساز",
  "Detector details": "جزئیات آشکارساز",
  "Detector jobs": "کارهای آشکارساز",
  "Detector schedule": "زمان‌بندی آشکارساز",
  "Detector names": "نام آشکارسازها",
  "Detector names and monitors": "نام آشکارسازها و پایشگرها",
  "Detector names and monitors and state": "نام آشکارسازها، پایشگرها و وضعیت",
  "Detector with the most recent anomaly": "آشکارساز دارای جدیدترین ناهنجاری",
  "Detector Anomaly grade": "درجهٔ ناهنجاری آشکارساز",
  "Data source index": "ایندکس منبع داده",
  "Data filter": "فیلتر داده",
  "Data connection": "اتصال داده",
  "Custom expression": "عبارت سفارشی",
  "Custom expression:": "عبارت سفارشی:",
  "View code": "مشاهدهٔ کد",
  "Last Updated": "آخرین به‌روزرسانی",
  "Last updated time": "زمان آخرین به‌روزرسانی",
  "Window delay": "تأخیر پنجره",
  "Model configuration": "پیکربندی مدل",
  "Model configurations are validated": "پیکربندی مدل معتبر است",
  "Model parameters are required to run a detector": "برای اجرای آشکارساز، پارامترهای مدل لازم هستند",
  "Features": "ویژگی‌ها",
  "Feature": "ویژگی",
  "Feature name": "نام ویژگی",
  "Feature definition": "تعریف ویژگی",
  "Feature state": "وضعیت ویژگی",
  "Feature details": "جزئیات ویژگی",
  "Feature details:": "جزئیات ویژگی:",
  "Feature Contribution:": "میزان مشارکت ویژگی:",
  "Feature required to start the detector": "برای شروع آشکارساز ویژگی لازم است",
  "Features are required to run a detector": "برای اجرای آشکارساز ویژگی لازم است",
  "Additional settings": "تنظیمات تکمیلی",
  "Categorical fields": "فیلدهای دسته‌بندی",
  "Category field": "فیلد دسته‌بندی",
  "Shingle size": "اندازهٔ شینگل",
  "Imputation method": "روش جایگذاری دادهٔ گمشده",
  "Custom values": "مقادیر سفارشی",
  "Custom value": "مقدار سفارشی",
  "Sparse data handling": "مدیریت داده‌های پراکنده",
  "Ignore missing value": "نادیده‌گرفتن مقدار گمشده",
  "Running": "در حال اجرا",
  "Finished": "پایان‌یافته",
  "Failed": "ناموفق",
  "Disabled": "غیرفعال",
  "Enabled": "فعال",
  "Edit detector settings": "ویرایش تنظیمات آشکارساز",
  "Edit model configuration": "ویرایش پیکربندی مدل",
  "Edit feature": "ویرایش ویژگی",
  "Edit alert settings": "ویرایش تنظیمات هشدار",
  "Operation settings": "تنظیمات عملیات",
  "Advanced settings": "تنظیمات پیشرفته",
  "Configure model": "پیکربندی مدل",
  "Define detector": "تعریف آشکارساز",
  "Describe the detector": "توضیح آشکارساز",
  "Describe the purpose of the detector.": "هدف آشکارساز را توضیح دهید.",
  "Enter detector name": "نام آشکارساز را وارد کنید",
  "Description Should not exceed 400 characters": "توضیحات نباید بیشتر از ۴۰۰ نویسه باشد",
  "Detection interval:": "بازهٔ تشخیص:",
  "Define how often the detector collects data to generate anomalies. The shorter the interval is, the more real time the detector results will be, and the more computing resources the detector will need.": "مشخص کنید آشکارساز هر چند وقت یک‌بار برای تولید ناهنجاری داده جمع‌آوری کند. بازهٔ کوتاه‌تر نتایج را بی‌درنگ‌تر می‌کند، اما منابع پردازشی بیشتری نیاز دارد.",
  "Specify a unique and descriptive name that is easy to recognize.": "نامی یکتا، گویا و قابل‌تشخیص وارد کنید.",
  "Choose an index, index pattern or alias as the data source.": "یک ایندکس، الگوی ایندکس یا نام مستعار را به‌عنوان منبع داده انتخاب کنید.",
  "Choose the time field you want to use for time filter.": "فیلد زمانی مورد استفاده برای فیلتر زمان را انتخاب کنید.",
  "Specify a window of delay for a detector to fetch data, if you need to account for extra processing time.": "اگر باید زمان پردازش اضافی را در نظر بگیرید، تأخیر پنجرهٔ دریافت داده را مشخص کنید.",
  "Modifying the selected index resets your detector configuration.": "تغییر ایندکس انتخابی، پیکربندی آشکارساز را بازنشانی می‌کند.",
  "Choose how to handle missing data points.": "روش مدیریت نقاط دادهٔ گمشده را انتخاب کنید.",
  "Set the index fields that you want to find anomalies for by defining the model features. You can also set other model parameters such as shingle size.": "با تعریف ویژگی‌های مدل، فیلدهای ایندکسی را که باید برای ناهنجاری بررسی شوند مشخص کنید. پارامترهای دیگری مانند اندازهٔ شینگل را نیز می‌توانید تنظیم کنید.",
  "Specify index fields that you want to find anomalies for by defining features. Once you define the features, you can preview your anomalies from a sample feature output.": "با تعریف ویژگی‌ها، فیلدهای ایندکسی را که باید برای ناهنجاری بررسی شوند مشخص کنید. پس از آن می‌توانید ناهنجاری‌ها را با خروجی نمونهٔ ویژگی پیش‌نمایش کنید.",
  "A feature is the field in your index that you use to check for anomalies. You can add up to 5 features.": "ویژگی، فیلدی از ایندکس است که برای بررسی ناهنجاری استفاده می‌شود. می‌توانید حداکثر ۵ ویژگی اضافه کنید.",
  "Add feature": "افزودن ویژگی",
  "Add another feature": "افزودن ویژگی دیگر",
  "Add row": "افزودن ردیف",
  "Delete row": "حذف ردیف",
  "Aggregation": "تجمیع",
  "Aggregation button group": "گروه دکمه‌های تجمیع",
  "Filter query": "پرس‌وجوی فیلتر",
  "Enable categorical fields": "فعال‌سازی فیلدهای دسته‌بندی",
  "Select categorical fields": "انتخاب فیلدهای دسته‌بندی",
  "Select your categorical fields": "فیلدهای دسته‌بندی را انتخاب کنید",
  "Split a single time series into multiple time series based on categorical fields. You can select up to 2.": "یک سری زمانی را بر اساس فیلدهای دسته‌بندی به چند سری تقسیم کنید. حداکثر ۲ فیلد قابل انتخاب است.",
  "There are no available category fields for the selected index": "برای ایندکس انتخابی فیلد دسته‌بندی مناسبی وجود ندارد",
  "You can only apply the categorical fields to the 'ip' and 'keyword' OpenSearch data types.": "فیلدهای دسته‌بندی فقط برای نوع‌های دادهٔ «آی‌پی» و «کلیدواژه» قابل استفاده‌اند.",
  "You can't change the category fields after you create the detector.": "پس از ایجاد آشکارساز نمی‌توانید فیلدهای دسته‌بندی را تغییر دهید.",
  "You can't change the category fields after you create the detector. Make sure that you only select the fields necessary for your use case.": "پس از ایجاد آشکارساز نمی‌توانید فیلدهای دسته‌بندی را تغییر دهید؛ فقط فیلدهای لازم را انتخاب کنید.",
  "Preview anomalies": "پیش‌نمایش ناهنجاری‌ها",
  "Preview anomalies based on sample feature input": "پیش‌نمایش ناهنجاری‌ها بر اساس ورودی نمونهٔ ویژگی",
  "Sample anomalies": "ناهنجاری‌های نمونه",
  "Sample anomaly occurrences": "رخدادهای ناهنجاری نمونه",
  "Sample feature breakdown": "تفکیک ویژگی‌های نمونه",
  "Refresh preview": "تازه‌سازی پیش‌نمایش",
  "You can preview anomalies based on sample feature input": "می‌توانید ناهنجاری‌ها را بر اساس ورودی نمونهٔ ویژگی پیش‌نمایش کنید",
  "You can preview how your anomalies may look like from sample feature output and adjust the feature settings as needed.": "می‌توانید شکل احتمالی ناهنجاری‌ها را از خروجی نمونهٔ ویژگی پیش‌نمایش کنید و تنظیمات را در صورت نیاز تغییر دهید.",
  "After you set the model features and other optional parameters, you can preview your anomalies from a sample feature output.": "پس از تنظیم ویژگی‌های مدل و پارامترهای اختیاری، می‌توانید ناهنجاری‌ها را از خروجی نمونهٔ ویژگی پیش‌نمایش کنید.",
  "After the initialization is complete, you will see the anomaly results based on your latest configuration changes.": "پس از پایان راه‌اندازی، نتایج ناهنجاری بر اساس آخرین تغییرات پیکربندی نمایش داده می‌شوند.",
  "Use the sample data as a reference to fine tune settings. To see the latest preview with your adjustments, click \"Refresh preview\". Once you are done with your edits, save your changes and run the detector to see real time anomalies for the new data set.": "از دادهٔ نمونه برای تنظیم دقیق استفاده کنید. برای دیدن پیش‌نمایش جدید، «تازه‌سازی پیش‌نمایش» را بزنید. پس از پایان ویرایش، تغییرات را ذخیره و آشکارساز را اجرا کنید تا ناهنجاری‌های بی‌درنگ مجموعه‌دادهٔ جدید نمایش داده شوند.",
  "We identified some areas that might improve your model": "مواردی برای بهبود مدل شناسایی شد",
  "Issues found in the detector settings": "در تنظیمات آشکارساز اشکال وجود دارد",
  "Issues found in the model configuration": "در پیکربندی مدل اشکال وجود دارد",
  "Validating detector configurations": "در حال اعتبارسنجی پیکربندی آشکارساز",
  "Validating model configurations": "در حال اعتبارسنجی پیکربندی مدل",
  "Detector settings are validated": "تنظیمات آشکارساز معتبر است",
  "Please make sure all features have unique names": "مطمئن شوید همهٔ ویژگی‌ها نام یکتا دارند",
  "One or more input fields is invalid": "یک یا چند فیلد ورودی نامعتبر است",
  "Review and create": "بازبینی و ایجاد",
  "Save changes": "ذخیرهٔ تغییرات",
  "Start detector": "شروع آشکارساز",
  "Start detectors": "شروع آشکارسازها",
  "Start real-time detectors": "شروع آشکارسازهای بی‌درنگ",
  "Start automatically": "شروع خودکار",
  "Start manually": "شروع دستی",
  "Start real-time detector automatically (recommended)": "شروع خودکار آشکارساز بی‌درنگ (پیشنهادشده)",
  "Start the detector to see anomalies.": "برای مشاهدهٔ ناهنجاری‌ها آشکارساز را شروع کنید.",
  "Stop detectors": "توقف آشکارسازها",
  "Stop real-time detectors": "توقف آشکارسازهای بی‌درنگ",
  "Stop and proceed to edit": "توقف و ادامهٔ ویرایش",
  "Stop detector to proceed?": "برای ادامه آشکارساز متوقف شود؟",
  "Stop detector will impact associated monitor": "توقف آشکارساز بر پایشگر مرتبط اثر می‌گذارد",
  "Restart the detector to see accurate anomalies based on configuration changes.": "برای مشاهدهٔ دقیق ناهنجاری‌ها بر اساس تغییرات پیکربندی، آشکارساز را دوباره راه‌اندازی کنید.",
  "Set up detector jobs": "راه‌اندازی کارهای آشکارساز",
  "Select a date range": "انتخاب بازهٔ تاریخ",
  "Select a date range for your historical analysis (you may adjust later).": "بازهٔ تاریخ تحلیل تاریخی را انتخاب کنید؛ بعداً قابل تغییر است.",
  "Selected dates are out of the range": "تاریخ‌های انتخابی خارج از محدوده‌اند",
  "No anomalies found in the specified date range.": "در بازهٔ تاریخ مشخص‌شده ناهنجاری‌ای یافت نشد.",
  "Define triggers and actions": "تعریف محرک‌ها و عملیات",
  "Create a monitor": "ایجاد پایشگر",
  "Explore Alerting": "بررسی هشداردهی",
  "View monitor": "مشاهدهٔ پایشگر",
  "View alerts from detector and monitor": "مشاهدهٔ هشدارهای آشکارساز و پایشگر",
  "Triggers specify the thresholds for anomalies to generate alerts. Actions specify the alert message and destination.": "محرک‌ها آستانهٔ تولید هشدار برای ناهنجاری را تعیین می‌کنند و عملیات، پیام و مقصد هشدار را مشخص می‌کند.",
  "A monitor queries a detector on a specific schedule. In Alerting, choose \"Define using anomaly detector\".": "پایشگر طبق یک زمان‌بندی مشخص از آشکارساز پرس‌وجو می‌کند. در بخش هشداردهی، «تعریف با آشکارساز ناهنجاری» را انتخاب کنید.",
  "View anomaly detector alerts on the anomaly history graph. See details of all alerts over time from the monitor.": "هشدارهای آشکارساز ناهنجاری را روی نمودار تاریخچه ببینید و جزئیات همهٔ هشدارهای پایشگر را در طول زمان بررسی کنید.",
  "No data sources configured for this detector.": "برای این آشکارساز منبع داده‌ای پیکربندی نشده است.",
  "No features have been added to this anomaly detector. A feature is a metric that used for anomaly detection. A detector can discover anomalies across one or many features. This system reports an anomaly score based on how strong a signal might be.": "هیچ ویژگی‌ای به این آشکارساز افزوده نشده است. ویژگی، معیاری برای تشخیص ناهنجاری است و آشکارساز می‌تواند یک یا چند ویژگی را بررسی کند. امتیاز ناهنجاری بر اساس شدت سیگنال گزارش می‌شود.",
  "There are no detectors matching your applied filters. Reset your filters to view all detectors.": "هیچ آشکارسازی با فیلترهای اعمال‌شده منطبق نیست. برای مشاهدهٔ همهٔ آشکارسازها فیلترها را بازنشانی کنید.",
  "Reset filters": "بازنشانی فیلترها",
  "Loading anomaly results...": "در حال بارگذاری نتایج ناهنجاری...",
  "Loading detectors...": "در حال بارگذاری آشکارسازها...",
  "No": "خیر",
  "Yes": "بله",
  "Previous": "قبلی",
  "Next": "بعدی",
  "Previous value": "مقدار قبلی",
  "View all": "مشاهدهٔ همه",
  "View by:": "نمایش بر اساس:",
  "By occurrence": "بر اساس رخداد",
  "By severity": "بر اساس شدت",
  "Individual entities": "موجودیت‌های جداگانه",
  "Entities": "موجودیت‌ها",
  "Click on an anomaly entity to view data": "برای مشاهدهٔ داده روی موجودیت ناهنجاری کلیک کنید",
  "Choose a filled rectangle in the heat map for a more detailed view of anomalies within that entity.": "برای مشاهدهٔ جزئیات ناهنجاری‌های یک موجودیت، مستطیل پُر آن را در نقشهٔ حرارتی انتخاب کنید.",
  "Indicates the extent to which a data point is anomalous. Higher grades indicate more unusual data.": "میزان ناهنجاربودن یک نقطهٔ داده را نشان می‌دهد؛ درجهٔ بالاتر یعنی داده غیرعادی‌تر است.",
  "Indicates the level of confidence in the anomaly result.": "سطح اطمینان به نتیجهٔ ناهنجاری را نشان می‌دهد.",
  "Indicates to what extent this data point is anomalous. The scale ranges from 0 to 1.": "میزان ناهنجاربودن این نقطهٔ داده را در مقیاس ۰ تا ۱ نشان می‌دهد.",
  "Daily max": "بیشینهٔ روزانه",
  "Weekly max": "بیشینهٔ هفتگی",
  "Monthly max": "بیشینهٔ ماهانه",
  "Top 10": "۱۰ مورد برتر",
  "Top 20": "۲۰ مورد برتر",
  "Top 30": "۳۰ مورد برتر",
  "Raw": "خام",
  "Combined options": "گزینه‌های ترکیبی",
  "Select options": "انتخاب گزینه‌ها",
  "Select Data": "انتخاب داده",
  "Find clusters": "یافتن کلاسترها",
  "Find indices": "یافتن ایندکس‌ها",
  "Find timestamp": "یافتن زمان ثبت",
  "Clusters": "کلاسترها",
  "Index details": "جزئیات ایندکس",
  "Index field": "فیلد ایندکس",
  "Index fields and types": "فیلدها و نوع‌های ایندکس",
  "Timestamp field": "فیلد زمان ثبت",
  "Log duration:": "مدت لاگ:",
  "Log frequency:": "تناوب لاگ:",
  "Minutes": "دقیقه",
  "Days": "روز",
  "3 weeks": "۳ هفته",
  "Custom result index": "ایندکس سفارشی نتایج",
  "Enable custom result index": "فعال‌سازی ایندکس سفارشی نتایج",
  "Enable custom result index lifecycle management": "فعال‌سازی مدیریت چرخهٔ عمر ایندکس سفارشی نتایج",
  "Enable flattened custom result index": "فعال‌سازی ایندکس تخت‌شدهٔ نتایج",
  "Flatten custom result index": "تخت‌کردن ایندکس سفارشی نتایج",
  "Custom result index min age": "حداقل عمر ایندکس سفارشی نتایج",
  "Custom result index min size": "حداقل اندازهٔ ایندکس سفارشی نتایج",
  "Custom result index TTL": "عمر نگه‌داری ایندکس سفارشی نتایج",
  "Min index age": "حداقل عمر ایندکس",
  "Min Index Age": "حداقل عمر ایندکس",
  "Min index size": "حداقل اندازهٔ ایندکس",
  "Min Index Size": "حداقل اندازهٔ ایندکس",
  "Index TTL": "عمر نگه‌داری ایندکس",
  "Store detector results to your own index.": "نتایج آشکارساز را در ایندکس خود ذخیره کنید.",
  "Flattening the custom result index will make it easier to query them on the dashboard. It also allows you to perform term aggregations on categorical fields.": "تخت‌کردن ایندکس سفارشی نتایج، پرس‌وجوی آن در داشبورد و تجمیع عبارتی فیلدهای دسته‌بندی را آسان‌تر می‌کند.",
  "This setting would define a specific threshold for the age of an index. When this threshold is surpassed, a rollover will be triggered automatically.": "این تنظیم آستانهٔ مشخصی برای عمر ایندکس تعیین می‌کند و پس از عبور از آن، چرخش خودکار ایندکس اجرا می‌شود.",
  "This setting would define a specific threshold for the size of an index. When this threshold is surpassed, a rollover will be triggered automatically.": "این تنظیم آستانهٔ مشخصی برای اندازهٔ ایندکس تعیین می‌کند و پس از عبور از آن، چرخش خودکار ایندکس اجرا می‌شود.",
  "This setting would define the duration after which an index is considered expired and eligible for deletion.": "این تنظیم مدتی را تعیین می‌کند که پس از آن ایندکس منقضی و قابل حذف محسوب می‌شود.",
  "Detector cannot be updated while it is running": "آشکارساز هنگام اجرا قابل به‌روزرسانی نیست",
  "Detector is stopped": "آشکارساز متوقف است",
  "The detector is stopped": "آشکارساز متوقف است",
  "The detector is in unknown state": "وضعیت آشکارساز ناشناخته است",
  "Unknown detector state": "وضعیت آشکارساز ناشناخته است",
  "Unable to find the detector": "آشکارساز پیدا نشد",
  "Unable to find the detector for editing": "آشکارساز برای ویرایش پیدا نشد",
  "Unable to get all detectors": "دریافت همهٔ آشکارسازها ناموفق بود",
  "Unable to set data source.": "تنظیم منبع داده ناموفق بود.",
  "There was a problem creating the detector": "در ایجاد آشکارساز مشکلی رخ داد",
  "There was a problem deleting the detector": "در حذف آشکارساز مشکلی رخ داد",
  "There was a problem previewing the detector": "در پیش‌نمایش آشکارساز مشکلی رخ داد",
  "There was a problem starting the detector job": "در شروع کار آشکارساز مشکلی رخ داد",
  "There was a problem starting the historical analysis": "در شروع تحلیل تاریخی مشکلی رخ داد",
  "There was a problem starting the real-time detector": "در شروع آشکارساز بی‌درنگ مشکلی رخ داد",
  "There was a problem updating the detector": "در به‌روزرسانی آشکارساز مشکلی رخ داد",
  "There was a problem validating the detector": "در اعتبارسنجی آشکارساز مشکلی رخ داد",
  "There was a problem stopping the historical analysis:": "در توقف تحلیل تاریخی مشکلی رخ داد:",
  "Successfully deleted all selected detectors": "همهٔ آشکارسازهای انتخاب‌شده با موفقیت حذف شدند",
  "Successfully deleted the detector": "آشکارساز با موفقیت حذف شد",
  "Successfully loaded the sample detector": "آشکارساز نمونه با موفقیت بارگذاری شد",
  "Successfully started all selected detectors": "همهٔ آشکارسازهای انتخاب‌شده با موفقیت شروع شدند",
  "Successfully started the detector job": "کار آشکارساز با موفقیت شروع شد",
  "Successfully started the historical analysis": "تحلیل تاریخی با موفقیت شروع شد",
  "Successfully started the real-time detector": "آشکارساز بی‌درنگ با موفقیت شروع شد",
  "Successfully stopped all selected detectors": "همهٔ آشکارسازهای انتخاب‌شده با موفقیت متوقف شدند",
  "Successfully stopped the historical analysis": "تحلیل تاریخی با موفقیت متوقف شد",
  "Delete detector": "حذف آشکارساز",
  "Delete detector?": "آشکارساز حذف شود؟",
  "Delete detectors": "حذف آشکارسازها",
  "Are you sure you want to delete the selected detectors?": "از حذف آشکارسازهای انتخاب‌شده مطمئن هستید؟",
  "Are you sure you want to start the selected detectors?": "از شروع آشکارسازهای انتخاب‌شده مطمئن هستید؟",
  "Are you sure you want to stop the selected detectors?": "از توقف آشکارسازهای انتخاب‌شده مطمئن هستید؟",
  "The following detectors and feature configurations will be permanently removed. This action is irreversible.": "آشکارسازها و پیکربندی ویژگی‌های زیر برای همیشه حذف می‌شوند و این عمل بازگشت‌پذیر نیست.",
  "The following detectors will be stopped.": "آشکارسازهای زیر متوقف می‌شوند.",
  "The following detectors will begin initializing.": "راه‌اندازی آشکارسازهای زیر آغاز می‌شود.",
  "To confirm deletion, type": "برای تأیید حذف، عبارت زیر را وارد کنید:",
  "Detector and feature configuration will be permanently removed. This action is irreversible. To confirm deletion, type": "پیکربندی آشکارساز و ویژگی برای همیشه حذف می‌شود و بازگشت‌پذیر نیست. برای تأیید حذف، عبارت زیر را وارد کنید:",
  "Detector name cannot be empty": "نام آشکارساز نمی‌تواند خالی باشد",
  "Duplicate detector name": "نام آشکارساز تکراری است",
  "Must specify an index": "باید یک ایندکس مشخص شود",
  "One of your inputs contains invalid characters or spaces. Please omit: {value1}": "یکی از ورودی‌ها نویسهٔ نامعتبر یا فاصله دارد. این موارد را حذف کنید: {value1}",
  "Detector created: {value1}": "آشکارساز ایجاد شد: {value1}",
  "Detector updated: {value1}": "آشکارساز به‌روزرسانی شد: {value1}",
  "Initializing ({value1} complete)": "در حال راه‌اندازی ({value1} کامل شده)",
  "Running since {value1}": "در حال اجرا از {value1}",
  "Stopped at {value1}": "متوقف‌شده در {value1}",
  "Missing data is only shown since last enabled time: {value1}": "دادهٔ گمشده فقط از آخرین زمان فعال‌سازی نمایش داده می‌شود: {value1}",
  "No anomalies found during the last {value1} intervals ({value2} minutes).": "در {value1} بازهٔ گذشته ({value2} دقیقه) ناهنجاری‌ای یافت نشد.",
  "View anomaly results during the last {value1} intervals ({value2} minutes)": "مشاهدهٔ نتایج ناهنجاری در {value1} بازهٔ گذشته ({value2} دقیقه)",
  "You are viewing {value1} detectors with the most recent anomaly occurrences.": "در حال مشاهدهٔ {value1} آشکارساز دارای جدیدترین رخدادهای ناهنجاری هستید.",
  "{value1} detectors with the most recent anomalies are shown on the chart. Adjust filters if there are specific detectors you would like to monitor.": "{value1} آشکارساز دارای جدیدترین ناهنجاری‌ها در نمودار نمایش داده شده‌اند. برای پایش آشکارسازهای مشخص، فیلترها را تنظیم کنید.",
  "A maximum of {value1} sets of results can be displayed at one time": "حداکثر {value1} مجموعه نتیجه را می‌توان هم‌زمان نمایش داد",
  "Detector initialization is not complete because {value1}.": "راه‌اندازی آشکارساز کامل نشده است، زیرا {value1}.",
  "The detector is not initialized because {value1}.": "آشکارساز راه‌اندازی نشده است، زیرا {value1}.",
  "The detector needs {value1} minutes for initializing. If your data stream is not continuous, it may take even longer.": "آشکارساز برای راه‌اندازی به {value1} دقیقه نیاز دارد. اگر جریان داده پیوسته نباشد، ممکن است بیشتر طول بکشد.",
  "The {value1} is running. Are you sure you want to proceed?": "{value1} در حال اجراست. از ادامه مطمئن هستید؟",
  "You must stop the {value1} to change its configuration. After you reconfigure the detector, be sure to restart it.": "برای تغییر پیکربندی {value1} باید آن را متوقف کنید و پس از پیکربندی دوباره راه‌اندازی کنید.",
  "Successfully stopped the {value1}": "{value1} با موفقیت متوقف شد",
  "There was a problem stopping the {value1}": "در توقف {value1} مشکلی رخ داد",
  "Feature \"{value1}\" in suppression rules does not exist or is not enabled in the feature list.": "ویژگی «{value1}» در قواعد سرکوب وجود ندارد یا در فهرست ویژگی‌ها فعال نیست.",
  "Rule {value1} for feature \"{value2}\" must have either an absolute or relative threshold.": "قاعدهٔ {value1} برای ویژگی «{value2}» باید آستانهٔ مطلق یا نسبی داشته باشد.",
  "The following enabled features are missing in custom values: {value1}.": "ویژگی‌های فعال زیر در مقادیر سفارشی وجود ندارند: {value1}.",
  "The number of custom values ({value1}) does not match the number of enabled features ({value2}).": "تعداد مقادیر سفارشی ({value1}) با تعداد ویژگی‌های فعال ({value2}) برابر نیست.",
  "Your selected dates are not in the range from when the detector last started streaming data ({value1}).": "تاریخ‌های انتخابی در محدودهٔ شروع آخرین جریان دادهٔ آشکارساز ({value1}) نیستند.",
  "Error deleting all selected detectors: {value1}": "خطا در حذف همهٔ آشکارسازهای انتخاب‌شده: {value1}",
  "Error starting all selected detectors: {value1}": "خطا در شروع همهٔ آشکارسازهای انتخاب‌شده: {value1}",
  "Error stopping all selected detectors: {value1}": "خطا در توقف همهٔ آشکارسازهای انتخاب‌شده: {value1}",
  "Failed to get alerts for monitor {value1}": "دریافت هشدارهای پایشگر {value1} ناموفق بود",
  "Failed to get anomaly results for {value1}": "دریافت نتایج ناهنجاری برای {value1} ناموفق بود",
  "Failed to get live anomaly result for detector {value1}": "دریافت نتیجهٔ زندهٔ ناهنجاری آشکارساز {value1} ناموفق بود",
  "Unable to load all sample data, please try again. {value1}": "بارگذاری همهٔ داده‌های نمونه ناموفق بود؛ دوباره تلاش کنید. {value1}",
  "unexpected error {value1}": "خطای غیرمنتظره: {value1}",
  "Delegates list can not be empty or have less then two associated monitors.": "فهرست نمایندگان نمی‌تواند خالی باشد یا کمتر از دو پایشگر مرتبط داشته باشد.",
  "Delegates list can not be empty or have less than two associated monitors.": "فهرست نمایندگان نمی‌تواند خالی باشد یا کمتر از دو پایشگر مرتبط داشته باشد.",
  "INSTALLED": "نصب‌شده",
  "A sample detector to detect anomalies with ecommerce logs.": "یک آشکارساز نمونه برای شناسایی ناهنجاری در لاگ‌های فروشگاه آنلاین.",
  "A sample detector to detect anomalies with HTTP response code logs.": "یک آشکارساز نمونه برای شناسایی ناهنجاری در گزارش‌های کد پاسخ وب.",
  "A sample detector to detect anomalies with logs related to the health of a host.": "یک آشکارساز نمونه برای شناسایی ناهنجاری در لاگ‌های سلامت میزبان.",
  "Alerting in your navigation panel, install it first and follow the instructions below to set up alerts.": "ابتدا افزونهٔ هشداردهی را در پنل ناوبری نصب کنید و سپس برای راه‌اندازی هشدارها دستورالعمل زیر را دنبال کنید.",
  "Alerting plugin": "افزونهٔ هشداردهی",
  "Anomaly detector alerts are powered by the": "هشدارهای آشکارساز ناهنجاری توسط این بخش فراهم می‌شوند:",
  "associated with this detector will not receive any anomaly results to generate alerts.": "پایشگر مرتبط با این آشکارساز برای تولید هشدار نتیجهٔ ناهنجاری‌ای دریافت نخواهد کرد.",
  "Bad Request": "درخواست نامعتبر",
  "Cannot create detector - limit of": "ایجاد آشکارساز ممکن نیست؛ حد مجاز",
  "Custom result index name must contain less than 255 characters including the prefix \"opensearch-ad-plugin-result-\". Valid characters are a-z, 0-9, -(hyphen) and _(underscore).": "نام ایندکس سفارشی نتایج همراه با پیشوند «opensearch-ad-plugin-result-» باید کمتر از ۲۵۵ نویسه باشد. نویسه‌های مجاز شامل a-z، 0-9، خط تیره و زیرخط هستند.",
  "Detector name must contain 1-64 characters. Valid characters are a-z, A-Z, 0-9, -(hyphen), _(underscore) and .(period).": "نام آشکارساز باید ۱ تا ۶۴ نویسه داشته باشد. حروف انگلیسی، اعداد، خط تیره، زیرخط و نقطه مجاز هستند.",
  "detector and historical analysis": "آشکارساز و تحلیل تاریخی",
  "detectors reached": "آشکارساز به حد مجاز رسیده‌اند",
  "Enter result index name": "نام ایندکس نتایج را وارد کنید",
  "Error bulk inserting data:": "خطا در درج گروهی داده:",
  "Error creating sample detector:": "خطا در ایجاد آشکارساز نمونه:",
  "Error creating sample index.": "خطا در ایجاد ایندکس نمونه.",
  "Error getting all indices or aliases": "خطا در دریافت همهٔ ایندکس‌ها یا نام‌های مستعار",
  "Error getting latest anomaly results - index may not exist yet": "خطا در دریافت آخرین نتایج ناهنجاری؛ ممکن است ایندکس هنوز ایجاد نشده باشد",
  "Error getting sample detectors:": "خطا در دریافت آشکارسازهای نمونه:",
  "Error getting sample indices:": "خطا در دریافت ایندکس‌های نمونه:",
  "Error starting sample detector:": "خطا در شروع آشکارساز نمونه:",
  "Field details:": "جزئیات فیلد:",
  "Make sure your source index has sufficient data in the current detector interval and try again.": "مطمئن شوید ایندکس منبع در بازهٔ فعلی آشکارساز دادهٔ کافی دارد و دوباره تلاش کنید.",
  "Most recent anomaly grade": "جدیدترین درجهٔ ناهنجاری",
  "no data could be found": "داده‌ای پیدا نشد",
  "No detectors selected. Please select detectors to delete": "آشکارسازی انتخاب نشده است. آشکارسازهای موردنظر برای حذف را انتخاب کنید",
  "No sample anomaly result generated. Please check detector interval and make sure you have >400 data points{value1}during preview date range": "نتیجهٔ ناهنجاری نمونه تولید نشد. بازهٔ آشکارساز را بررسی کنید و مطمئن شوید در بازهٔ پیش‌نمایش بیش از ۴۰۰ نقطهٔ داده {value1} دارید",
  "of insufficient data": "به‌دلیل دادهٔ ناکافی",
  "for some entities": "برای برخی موجودیت‌ها",
  "in the field.": "در فیلد.",
  "more features.": "ویژگی دیگر.",
  "Once a detector is stopped, monitor": "پس از توقف آشکارساز، پایشگر",
  "Select the time field you want to use for the time filter.": "فیلد زمانی مورد استفاده برای فیلتر زمان را انتخاب کنید.",
  "Set to zero": "تنظیم روی صفر",
  "Some of the selected detectors are currently running.": "برخی آشکارسازهای انتخاب‌شده در حال اجرا هستند.",
  "Suppression Rules": "قواعد سرکوب",
  "The detector configuration has changed since it was last stopped.": "پیکربندی آشکارساز از آخرین توقف تغییر کرده است.",
  "The detector is being initialized based on the latest configuration changes.": "آشکارساز بر اساس آخرین تغییرات پیکربندی در حال راه‌اندازی است.",
  "The monitor associated with this detector will not receive any anomaly results": "پایشگر مرتبط با این آشکارساز هیچ نتیجهٔ ناهنجاری‌ای دریافت نخواهد کرد",
  "The monitors associated with these detectors will not receive any anomaly results.": "پایشگرهای مرتبط با این آشکارسازها هیچ نتیجهٔ ناهنجاری‌ای دریافت نخواهند کرد.",
  "You can use a wildcard (*) in your index pattern.": "می‌توانید در الگوی ایندکس از نویسهٔ عام (*) استفاده کنید.",
  "You can't change the custom result index after creating the detector. You can manage the result index using the following three settings inside Anomaly Detection plugin or with the Index Management plugin.": "پس از ایجاد آشکارساز نمی‌توانید ایندکس سفارشی نتایج را تغییر دهید. ایندکس نتایج را با سه تنظیم زیر در افزونهٔ تشخیص ناهنجاری یا افزونهٔ مدیریت ایندکس مدیریت کنید.",
  "Error getting aggregated anomaly results for detector {value1}:": "خطا در دریافت نتایج تجمیعی ناهنجاری آشکارساز {value1}:",
  "Error getting all anomaly results for all entities: {value1}": "خطا در دریافت همهٔ نتایج ناهنجاری همهٔ موجودیت‌ها: {value1}",
  "Error getting all anomaly summaries for all entities: {value1}": "خطا در دریافت همهٔ خلاصه‌های ناهنجاری همهٔ موجودیت‌ها: {value1}",
  "Error getting anomaly summaries for all entities: {value1}": "خطا در دریافت خلاصهٔ ناهنجاری همهٔ موجودیت‌ها: {value1}",
  "Error getting bucketized anomaly results for all entities: {value1}": "خطا در دریافت نتایج دسته‌بندی‌شدهٔ ناهنجاری همهٔ موجودیت‌ها: {value1}",
  "Fail to get sample anomalies for detector {value1}": "دریافت ناهنجاری‌های نمونهٔ آشکارساز {value1} ناموفق بود",
  "Fail to preview detector {value1}": "پیش‌نمایش آشکارساز {value1} ناموفق بود",
  "Failed to get anomaly results for {value1} during getting latest feature data points": "هنگام دریافت آخرین نقاط دادهٔ ویژگی، دریافت نتایج ناهنجاری {value1} ناموفق بود",
  "Failed to get anomaly results for the following entities: {value1}": "دریافت نتایج ناهنجاری موجودیت‌های زیر ناموفق بود: {value1}",
  "Failed to get atomic anomaly results for {value1}": "دریافت نتایج اتمی ناهنجاری برای {value1} ناموفق بود",
  "is {value1}.": "{value1} است.",
  "Your detector is using custom result index '{value1}', but is not found in the cluster. The index will be recreated when you start a real-time or historical job.": "آشکارساز از ایندکس سفارشی نتایج «{value1}» استفاده می‌کند، اما این ایندکس در کلاستر پیدا نشد. با شروع کار بی‌درنگ یا تاریخی دوباره ایجاد می‌شود.",
  "MM/DD/YY h:mm A": "سال/ماه/روز، ساعت و دقیقه",
  "MM/DD/YYYY hh:mm A": "سال/ماه/روز، ساعت و دقیقه",
  "Menu": "منو",
  "Dev tools": "ابزارهای توسعه",
  "Interact with the OpenSearch API": "کار با رابط برنامه‌نویسی آی‌زا",
  "Interact with the OpenSearch رابط سرور": "کار با رابط برنامه‌نویسی آی‌زا",
  "Make this my landing page": "این صفحه به‌عنوان صفحهٔ آغاز تنظیم شود",
  "Manage": "مدیریت",
  "Manage your data": "مدیریت داده‌ها",
  "Skip cURL and use a JSON interface to work with your data in Console.": "از رابط ساخت‌یافتهٔ کنسول برای کار با داده‌ها استفاده کنید.",
  "View app directory": "مشاهدهٔ فهرست برنامه‌ها",
  "A complete list of apps is in the menu on the left.": "فهرست کامل برنامه‌ها در منوی سمت راست قرار دارد.",
  "Manage your index patterns, saved objects, OpenSearch Dashboards settings, and more.": "الگوهای ایندکس، اشیای ذخیره‌شده، تنظیمات داشبورد Ayyza و موارد دیگر را مدیریت کنید.",
  "Manage your index patterns, saved objects, Ayyza dashboard settings, and more.": "الگوهای ایندکس، اشیای ذخیره‌شده، تنظیمات داشبورد Ayyza و موارد دیگر را مدیریت کنید.",
  "Manage your الگوهای ایندکس, saved objects, Ayyza dashboard settings, and more.": "الگوهای ایندکس، اشیای ذخیره‌شده، تنظیمات داشبورد Ayyza و موارد دیگر را مدیریت کنید.",
  "Management": "مدیریت",
  "Saved objects": "اشیای ذخیره‌شده",
  "Welcome to Dashboards Management": "به مدیریت داشبورد خوش آمدید",
  "now": "اکنون",
  "Field:": "فیلد:",
  "State:": "وضعیت:",
  "Count:": "تعداد:",
  "Value:": "مقدار:",
  "Date:": "تاریخ:",
  "Time:": "زمان:",
  "Series:": "سری:",
  "Category:": "دسته:",
  "Metric:": "سنجه:",
  "Aggregation method": "روش تجمیع",
  "Click to enter Plot title": "برای وارد کردن عنوان نمودار کلیک کنید",
  "Click to enter X axis title": "برای وارد کردن عنوان محور افقی کلیک کنید",
  "Click to enter Y axis title": "برای وارد کردن عنوان محور عمودی کلیک کنید",
  "Click to enter radial axis title": "برای وارد کردن عنوان محور شعاعی کلیک کنید",
  "Click to enter Colorscale title": "برای وارد کردن عنوان طیف رنگ کلیک کنید",
  "Click to enter Component A title": "برای وارد کردن عنوان مؤلفهٔ A کلیک کنید",
  "Click to enter Component B title": "برای وارد کردن عنوان مؤلفهٔ B کلیک کنید",
  "Click to enter Component C title": "برای وارد کردن عنوان مؤلفهٔ C کلیک کنید",
  "Double-click on legend to isolate one trace": "برای نمایش جداگانهٔ یک سری، روی راهنما دوبار کلیک کنید",
  "Double-click to zoom back out": "برای بازگشت از بزرگ‌نمایی دوبار کلیک کنید",
  "Download plot": "دریافت نمودار",
  "Download plot as a png": "دریافت نمودار با قالب تصویر شطرنجی",
  "Edit chart": "ویرایش نمودار",
  "Edit in Chart Studio": "ویرایش در استودیوی نمودار",
  "Taking snapshot - this may take a few seconds": "در حال تهیهٔ تصویر؛ ممکن است چند ثانیه طول بکشد",
  "Snapshot succeeded": "تصویر نمودار با موفقیت تهیه شد",
  "Sorry, there was a problem downloading your snapshot!": "دریافت تصویر نمودار با مشکل روبه‌رو شد.",
  "IE only supports svg.  Changing format to svg.": "این مرورگر فقط از قالب تصویر برداری پشتیبانی می‌کند؛ قالب تغییر یافت.",
  "Zoom": "بزرگ‌نمایی",
  "Zoom in": "بزرگ‌نمایی",
  "Zoom out": "کوچک‌نمایی",
  "Autoscale": "مقیاس خودکار",
  "Reset": "بازنشانی",
  "Reset axes": "بازنشانی محورها",
  "Reset camera to default": "بازنشانی دوربین به حالت پیش‌فرض",
  "Reset camera to last save": "بازنشانی دوربین به آخرین حالت ذخیره‌شده",
  "Reset view": "بازنشانی نما",
  "Reset views": "بازنشانی نماها",
  "Pan": "جابجایی نما",
  "Box Select": "انتخاب مستطیلی",
  "Lasso Select": "انتخاب کمندی",
  "Orbital rotation": "چرخش مداری",
  "Turntable rotation": "چرخش صفحه‌ای",
  "Show closest data on hover": "نمایش نزدیک‌ترین داده هنگام قرارگیری نشانگر",
  "Compare data on hover": "مقایسهٔ داده‌ها هنگام قرارگیری نشانگر",
  "Toggle show closest data on hover": "تغییر وضعیت نمایش نزدیک‌ترین داده هنگام قرارگیری نشانگر",
  "Toggle Spike Lines": "تغییر وضعیت خطوط راهنما",
  "Draw line": "رسم خط",
  "Draw rectangle": "رسم مستطیل",
  "Draw circle": "رسم دایره",
  "Draw open freeform": "رسم شکل آزاد باز",
  "Draw closed freeform": "رسم شکل آزاد بسته",
  "Erase active shape": "پاک‌کردن شکل فعال",
  "new text": "متن جدید",
  "trace": "سری",
  "source:": "مبدأ:",
  "target:": "مقصد:",
  "open:": "آغاز:",
  "close:": "پایان:",
  "high:": "بیشینه:",
  "low:": "کمینه:",
  "min:": "کمینه:",
  "max:": "بیشینه:",
  "mean:": "میانگین:",
  "median:": "میانه:",
  "mean ± σ:": "میانگین ± انحراف معیار:",
  "q1:": "چارک اول:",
  "q3:": "چارک سوم:",
  "lower fence:": "کران پایین:",
  "upper fence:": "کران بالا:",
  "incoming flow count:": "تعداد جریان ورودی:",
  "outgoing flow count:": "تعداد جریان خروجی:",
  "concentration:": "تمرکز:",
  "kde:": "برآورد چگالی:",
  "lat:": "عرض جغرافیایی:",
  "lon:": "طول جغرافیایی:",
  "Axis max": "بیشینهٔ محور",
  "Axis min": "کمینهٔ محور",
  "Axis position": "موقعیت محور",
  "Axis scale": "مقیاس محور",
  "Value axis": "محور مقدار",
  "Bottom axis {axisNumber}": "محور پایین {axisNumber}",
  "Top axis {axisNumber}": "محور بالا {axisNumber}",
  "Left axis {axisNumber}": "محور چپ {axisNumber}",
  "Right axis {axisNumber}": "محور راست {axisNumber}",
  "Toggle {axisName} options": "تغییر وضعیت گزینه‌های {axisName}",
  "Show axis lines and labels": "نمایش خطوط و برچسب‌های محور",
  "Set axis extents": "تنظیم حدود محور",
  "Legend position": "موقعیت راهنما",
  "Hide in legend": "پنهان‌کردن در راهنما",
  "Tooltip": "راهنمای شناور",
  "Show focused values": "نمایش مقادیر متمرکز",
  "Show values on chart": "نمایش مقادیر روی نمودار",
  "Show values": "نمایش مقادیر",
  "Current time marker": "نشانگر زمان فعلی",
  "Time field": "فیلد زمان",
  "Time field (required)": "فیلد زمان (الزامی)",
  "Entire time range": "کل بازهٔ زمانی",
  "Data timerange mode": "حالت بازهٔ زمانی داده",
  "No data to display for the selected metrics": "داده‌ای برای نمایش سنجه‌های انتخاب‌شده وجود ندارد",
  "No results available.": "نتیجه‌ای در دسترس نیست.",
  "No values found": "مقداری پیدا نشد",
  "Press up/down to adjust the chart size": "برای تنظیم اندازهٔ نمودار کلید بالا یا پایین را فشار دهید",
  "The canvas is empty. Add some aggregations before saving.": "بوم نمودار خالی است. پیش از ذخیره چند تجمیع اضافه کنید.",
  "This time range doesn't contain any data. Increase or adjust the time range to see more fields and create charts.": "این بازهٔ زمانی داده‌ای ندارد. برای مشاهدهٔ فیلدهای بیشتر و ساخت نمودار، بازهٔ زمانی را افزایش یا تغییر دهید.",
  "Confidence:": "اطمینان:",
  "Feature output:": "خروجی ویژگی:",
  "Expected value:": "مقدار مورد انتظار:",
  "Actual value": "مقدار واقعی",
  "Actual Value": "مقدار واقعی",
  "Records": "رخدادها",
  "Documents": "اسناد",
  "Count": "تعداد",
  "Average": "میانگین",
  "Maximum": "بیشینه",
  "Minimum": "کمینه",
  "Sum": "مجموع",
  "Median": "میانه",
  "Unique count": "تعداد یکتا",
  "Value count": "تعداد مقادیر",
  "Other": "سایر",
  "Missing": "فاقد مقدار",
  "No data": "داده‌ای وجود ندارد",
  "No data available": "داده‌ای در دسترس نیست",
  "X axis": "محور افقی",
  "Y axis": "محور عمودی",
  "X-axis": "محور افقی",
  "Y-axis": "محور عمودی",
  "Horizontal axis": "محور افقی",
  "Vertical axis": "محور عمودی",
  "Axis": "محور",
  "Chart": "نمودار",
  "Now": "اکنون",
  "second": "ثانیه",
  "seconds": "ثانیه",
  "minute": "دقیقه",
  "minutes": "دقیقه",
  "hour": "ساعت",
  "hours": "ساعت",
  "day": "روز",
  "days": "روز",
  "week": "هفته",
  "weeks": "هفته",
  "month": "ماه",
  "months": "ماه",
  "year": "سال",
  "years": "سال",
  "- optional": "- اختیاری",
  "A detector is an individual anomaly detection task. You can create multiple detectors,": "آشکارساز یک وظیفهٔ مستقل تشخیص ناهنجاری است. می‌توانید چند آشکارساز ایجاد کنید،",
  "and all the detectors can run simultaneously, with each analyzing data from different sources.": "و همهٔ آشکارسازها می‌توانند هم‌زمان اجرا شوند و هرکدام داده‌های منبع متفاوتی را تحلیل کنند.",
  "Alert": "هشدار",
  "Create an anomaly detector to get started.": "برای شروع یک آشکارساز ناهنجاری ایجاد کنید.",
  "Every": "هر",
  "Hide": "پنهان کردن",
  "Show": "نمایش",
  "historical analysis": "تحلیل تاریخی",
  "intervals (": "بازه (",
  "Main": "اصلی",
  "please try again.": "لطفاً دوباره تلاش کنید.",
  "The \"": "«",
  "View anomaly results during the last": "مشاهدهٔ نتایج ناهنجاری در",
  "You can add up to": "می‌توانید حداکثر",
  "AdvancedSettings": "تنظیمات پیشرفته",
  "CategoryField": "فیلد دسته‌بندی",
  "ExpectedValue": "مقدار مورد انتظار",
  "FeatureOutput": "خروجی ویژگی",
  "AnomalyGrade": "درجهٔ ناهنجاری",
  "NameAndDescription": "نام و توضیحات",
  "DetectorDetail": "جزئیات آشکارساز",
  "DetectorList": "فهرست آشکارسازها",
  "HistoricalJob": "کار تاریخی",
  "RealTimeJob": "کار بی‌درنگ",
  "HistoricalRangeModal": "بازهٔ تحلیل تاریخی",
  "EmptyHistoricalDetectorResults": "نتیجه‌ای برای آشکارساز تاریخی وجود ندارد",
  "You are in a dialog. To close this dialog, hit escape.": "در یک پنجرهٔ محاوره‌ای هستید. برای بستن آن کلید گریز را فشار دهید.",
  "Help": "راهنما",
  "Slack Channel": "کانال اسلک",
  "Projects on Github": "پروژه‌ها در گیت‌هاب",
  "Google Group": "گروه گوگل",
  "Agents evolution": "روند عامل‌ها",
  "Alert level evolution": "روند سطح هشدار",
  "Events by rule group": "رخدادها بر اساس گروه قانون",
  "Rule group": "گروه قانون",
  "Source file": "فایل منبع",
  "Yara scanned files": "فایل‌های اسکن‌شده با یارا",
  "Rootcheck data title": "داده‌های بررسی ریشه",
  "File added to the system.": "فایل به سیستم افزوده شد.",
  "File deleted.": "فایل حذف شد.",
  "Anomaly detected in file '{value1}'.": "در فایل «{value1}» ناهنجاری شناسایی شد.",
  "Files hidden inside directory '{value1}'.": "فایل‌هایی در پوشهٔ «{value1}» پنهان شده‌اند.",
  "Host-based anomaly detection event (rootcheck).": "رخداد تشخیص ناهنجاری مبتنی بر میزبان (بررسی ریشه).",
  "Possible kernel level rootkit": "روت‌کیت احتمالی در سطح هسته",
  "added": "افزوده‌شده",
  "deleted": "حذف‌شده",
  "Top {value1} agents by rule group": "{value1} عامل برتر بر اساس گروه قانون",
  "Top {value1} users": "{value1} کاربر برتر",
  "Top {value1} Alert level evolution": "روند {value1} سطح برتر هشدار",
  "Top {value1} MITRE ATT&CKS": "{value1} مورد برتر چارچوب حملهٔ میتر",
  "Top {value1} source ports": "{value1} درگاه مبدأ برتر",
  "Top {value1} destination ports": "{value1} درگاه مقصد برتر",
  "Top {value1} agents by alerts number": "{value1} عامل برتر بر اساس تعداد هشدارها",
  "Top {value1} requirements": "{value1} الزام برتر",
  "Top {value1} requirements over time": "{value1} الزام برتر در طول زمان",
  "Top requirements over time": "الزامات برتر در طول زمان",
  "Alerts volume by agent": "حجم هشدارها بر اساس عامل",
  "Alerts volume by Agent": "حجم هشدارها بر اساس عامل",
  "Most active agents": "فعال‌ترین عامل‌ها",
  "Most active Agents": "فعال‌ترین عامل‌ها",
  "Requirements distribution by agent": "توزیع الزامات بر اساس عامل",
  "Requirements distribution by Agent": "توزیع الزامات بر اساس عامل",
  "found documents": "اسناد یافت‌شده",
  "Disk Content Wipe": "پاک‌سازی محتوای دیسک",
  "Non-Application Layer Protocol": "پروتکل لایهٔ غیرکاربردی",
  "Setuid and Setgid": "مجوزهای ویژهٔ شناسهٔ کاربر و گروه",
  "Sudo and Sudo Caching": "دسترسی مدیریتی و ذخیره‌سازی موقت آن",
  "Rootkit": "روت‌کیت",
  "Disable or Modify Tools": "غیرفعال‌سازی یا تغییر ابزارها",
  "Data Destruction": "تخریب داده‌ها",
  "Command and Control": "فرماندهی و کنترل",
  "Row": "ردیف",
  "Column": "ستون",
  "Row:": "ردیف:",
  "Column:": "ستون:",
  "Field value": "مقدار فیلد",
  "Reconnaissance": "شناسایی",
  "Resource Development": "توسعهٔ منابع",
  "Initial Access": "دسترسی اولیه",
  "Execution": "اجرا",
  "Persistence": "ماندگاری",
  "Privilege Escalation": "ارتقای دسترسی",
  "Defense Evasion": "دور زدن دفاع",
  "Credential Access": "دسترسی به اعتبارنامه",
  "Discovery": "کشف",
  "Lateral Movement": "حرکت جانبی",
  "Collection": "جمع‌آوری",
  "Exfiltration": "استخراج داده",
  "Impact": "اثرگذاری",
  "field": "فیلد",
  "value": "مقدار",
  "state": "وضعیت",
  "count": "تعداد",
  "date": "تاریخ",
  "time": "زمان",
  "series": "سری",
  "category": "دسته",
  "metric": "سنجه",
  "row": "ردیف",
  "column": "ستون",
  "rule level detected": "سطح قانون شناسایی‌شده",
  "Maximum rule level detected": "بیشترین سطح قانون شناسایی‌شده",
  "sample-host-health-detector": "آشکارساز نمونهٔ سلامت میزبان",
  "sample-http-responses-detector": "آشکارساز نمونهٔ پاسخ‌های وب",
  "sample-host-health": "نمونهٔ سلامت میزبان",
  "sample-http-responses": "نمونهٔ پاسخ‌های وب",
  "max_cpu_usage": "بیشینهٔ مصرف پردازنده",
  "max_memory_usage": "بیشینهٔ مصرف حافظه",
  "avg_cpu_usage": "میانگین مصرف پردازنده",
  "avg_memory_usage": "میانگین مصرف حافظه",
  "sum_http_4xx": "مجموع پاسخ‌های خطای کاربر",
  "sum_http_5xx": "مجموع پاسخ‌های خطای سرور",
  "cpu_usage_percentage": "درصد مصرف پردازنده",
  "memory_usage_percentage": "درصد مصرف حافظه",
  "timestamp": "زمان ثبت",
  "avg": "میانگین",
  "max": "بیشینه",
  "min": "کمینه",
  "sum": "مجموع",
  "ignore": "نادیده‌گرفتن",
  "rules": "قانون",
  "Not available when the detector is stopped.": "هنگامی که آشکارساز متوقف است، این بخش در دسترس نیست.",
  "Activate to hide series in graph": "برای پنهان‌کردن سری در نمودار فعال کنید",
  "Closes this modal window": "بستن این پنجره",
  "Clear input": "پاک‌کردن ورودی",
  "Open list of options": "بازکردن فهرست گزینه‌ها",
  "Delete rule": "حذف قانون",
  "Add rule": "افزودن قانون",
  "Enter feature name": "نام ویژگی را وارد کنید",
  "Threshold": "آستانه",
  "Set the index fields that you want to find anomalies for by defining the model features. You can also set other model parameters such as category field and shingle size for more granular views. After you set the model features and other optional parameters, you can preview your anomalies from a sample feature output.": "با تعریف ویژگی‌های مدل، فیلدهای ایندکسی را که باید برای ناهنجاری بررسی شوند مشخص کنید. برای نمایش دقیق‌تر می‌توانید پارامترهایی مانند فیلد دسته‌بندی و اندازهٔ شینگل را نیز تنظیم کنید. سپس ناهنجاری‌ها را با خروجی نمونهٔ ویژگی پیش‌نمایش کنید.",
  "Enter a descriptive, unique name. The name must contain 1-64 characters. Valid characters are a-z, A-Z, 0-9, -(hyphen) and _(underscore).": "یک نام یکتا و گویا وارد کنید. نام باید ۱ تا ۶۴ نویسه باشد و فقط حروف لاتین، رقم، خط تیره و زیرخط مجاز است.",
  "Enable feature": "فعال‌کردن ویژگی",
  "Find anomalies based on": "مبنای تشخیص ناهنجاری",
  "The aggregation method determines what constitutes an anomaly.": "روش تجمیع مشخص می‌کند چه مقداری ناهنجاری محسوب شود.",
  "average()": "میانگین()",
  "count()": "تعداد()",
  "sum()": "مجموع()",
  "min()": "کمینه()",
  "max()": "بیشینه()",
  "E.g, if you choose min(), the detector focuses on finding anomalies based on the minimum values of your feature.": "برای نمونه، با انتخاب کمینه، آشکارساز ناهنجاری‌ها را بر پایهٔ کمترین مقدارهای ویژگی پیدا می‌کند.",
  "Anomaly criteria": "معیار ناهنجاری",
  "Acceptable difference between the expected and actual values": "اختلاف پذیرفتنی میان مقدار مورد انتظار و مقدار واقعی",
  "Deviation in any direction (default)": "انحراف در هر جهت (پیش‌فرض)",
  "Rise above expected value": "افزایش بالاتر از مقدار مورد انتظار",
  "Drop below expected value": "کاهش پایین‌تر از مقدار مورد انتظار",
  "Customize Suppression Rules": "سفارشی‌سازی قوانین سرکوب",
  "Set rules to ignore anomalies by comparing actual values against expected values.": "با مقایسهٔ مقدار واقعی و مقدار مورد انتظار، قانون‌هایی برای نادیده‌گرفتن ناهنجاری‌ها تعیین کنید.",
  "Ignore anomalies when the actual value is no more than:": "ناهنجاری را زمانی نادیده بگیر که مقدار واقعی بیش از این نباشد:",
  "Units": "واحد",
  "above the expected value": "بالاتر از مقدار مورد انتظار",
  "below the expected value": "پایین‌تر از مقدار مورد انتظار",
  "Add suppression rule": "افزودن قانون سرکوب",
  "intervals": "بازه",
  "Sample anomaly history": "تاریخچهٔ ناهنجاری نمونه",
  "Last sample anomaly occurrence": "آخرین رخداد ناهنجاری نمونه",
  "Sample confidence": "اطمینان نمونه",
  "Sample anomaly grade": "درجهٔ ناهنجاری نمونه",
  "Sample Feature output": "خروجی ویژگی نمونه",
  "Sample feature output": "خروجی ویژگی نمونه",
  "Sample": "نمونه",
  "Start date": "تاریخ شروع",
  "End date": "تاریخ پایان",
  "Start date and time": "تاریخ و زمان شروع",
  "End date and time": "تاریخ و زمان پایان",
  "Absolute": "مطلق",
  "Relative": "نسبی",
  "Previous month": "ماه قبل",
  "Next month": "ماه بعد",
  "Show password as plain text. Note: this will visually expose your password on the screen.": "نمایش رمز عبور به‌صورت متن ساده؛ توجه کنید که رمز عبور روی صفحه آشکار می‌شود.",
  "Ayyza home": "خانهٔ آیزا",
  "External link": "پیوند بیرونی",
  "breadcrumb": "مسیر راهنما",
  "series color": "رنگ سری",
  "Stopped": "متوقف‌شده",
  "Select this row": "انتخاب این ردیف",
  "Choose a subset of your data source to focus your data stream and reduce noisy data.": "بخشی از منبع داده را انتخاب کنید تا جریان داده متمرکزتر و نویز کمتر شود.",
  "+ Add data filter": "+ افزودن فیلتر داده",
  "Use query DSL": "استفاده از زبان پرس‌وجو",
  "Use visual editor": "استفاده از ویرایشگر دیداری",
  "OpenSearch query DSL": "عبارت زبان پرس‌وجو",
  "Choose a field": "انتخاب یک فیلد",
  "Choose an operator": "انتخاب یک عملگر",
  "is": "برابر است با",
  "is not": "برابر نیست با",
  "is null": "تهی است",
  "is not null": "تهی نیست",
  "is greater than": "بزرگ‌تر است از",
  "is greater than equal": "بزرگ‌تر یا برابر است با",
  "is less than": "کوچک‌تر است از",
  "is less than equal": "کوچک‌تر یا برابر است با",
  "is in range": "در بازه است",
  "is not in range": "در بازه نیست",
  "Press Enter to start editing.": "برای شروع ویرایش، کلید ورود را بفشارید.",
  "When you're done, press Escape to stop editing.": "پس از پایان، برای توقف ویرایش کلید گریز را بفشارید.",
  "Set the number of intervals to consider in a detection window for your model. The anomaly detector expects the shingle size to be in the range of 1 and 128. The default shingle size is 8. We recommend that you don’t choose 1 unless you have two or more features. Smaller values might increase recall but also false positives. Larger values might be useful for ignoring noise in a signal.": "تعداد بازه‌هایی را که مدل در پنجرهٔ تشخیص بررسی می‌کند تعیین کنید. اندازهٔ شینگل باید بین ۱ تا ۱۲۸ باشد و مقدار پیش‌فرض ۸ است. مگر اینکه دو یا چند ویژگی دارید، مقدار ۱ را انتخاب نکنید. مقادیر کوچک‌تر ممکن است بازیابی و هشدار کاذب را افزایش دهد؛ مقادیر بزرگ‌تر برای نادیده‌گرفتن نویز سیگنال مفیدند.",
  "شروع date": "تاریخ شروع",
  "پایان date": "تاریخ پایان",
  "ayyza-cluster (Local)": "کلاستر Ayyza (محلی)",
  "Loading content": "در حال بارگذاری محتوا",
  "GDPR": "مقررات عمومی حفاظت از داده",
  "HIPAA": "قانون حفاظت از اطلاعات سلامت",
  "MITRE ATT&CK": "چارچوب حملهٔ میتر",
  "NIST 800-53": "استاندارد امنیتی ۸۰۰-۵۳ مؤسسهٔ ملی استانداردها",
  "NIST ۸۰۰-۵۳": "استاندارد امنیتی ۸۰۰-۵۳ مؤسسهٔ ملی استانداردها",
  "PCI DSS": "استاندارد امنیت دادهٔ صنعت پرداخت",
  "TSC": "معیارهای خدمات اعتماد",
  "CDB Lists": "فهرست‌های پایگاه دادهٔ ثابت",
  "فهرست‌های CDB": "فهرست‌های پایگاه دادهٔ ثابت",
  "Logها": "گزارش‌ها",
  "Primary": "پیمایش اصلی",
  "Explore": "کاوش",
  "Indexer management": "مدیریت ایندکسر",
  "Dashboard management": "مدیریت داشبورد",
  "Console": "کنسول",
  "History": "تاریخچه",
  "Export": "برون‌بری",
  "Import": "درون‌ریزی",
  "Send request": "ارسال درخواست",
  "Request options": "گزینه‌های درخواست",
  "Dev Tools Console": "کنسول ابزارهای توسعه",
  "Dev Tools Console output": "خروجی کنسول ابزارهای توسعه",
  "Dev Tools Console editor example": "نمونهٔ ویرایشگر کنسول ابزارهای توسعه",
  "When you’re done, press Escape to stop editing.": "پس از پایان، برای توقف ویرایش کلید گریز را بفشارید.",
  "Press left/right to adjust panels size": "برای تغییر اندازهٔ پنل‌ها کلید جهت‌نمای چپ یا راست را بفشارید",
  "Welcome to Console": "به کنسول خوش آمدید",
  "Quick intro to the UI": "آشنایی سریع با رابط کاربری",
  "The Console UI is split into two panes: an editor pane (left) and a response pane (right). Use the editor to type requests and submit them to OpenSearch. The results will be displayed in the response pane on the right side.": "رابط کنسول از دو پنل تشکیل شده است: پنل ویرایشگر در چپ و پنل پاسخ در راست. درخواست‌ها را در ویرایشگر بنویسید و برای موتور جست‌وجوی Ayyza ارسال کنید؛ نتیجه در پنل پاسخ نمایش داده می‌شود.",
  "Console understands requests in a compact format, similar to cURL:": "کنسول درخواست‌ها را در قالب فشرده‌ای شبیه سی‌یو‌آرال می‌پذیرد:",
  "While typing a request, Console will make suggestions which you can then accept by hitting Enter/Tab. These suggestions are made based on the request structure as well as your indices and types.": "هنگام نوشتن درخواست، کنسول بر اساس ساختار درخواست، ایندکس‌ها و نوع‌های داده پیشنهادهایی ارائه می‌کند؛ با کلید ورود یا جهش می‌توانید پیشنهاد را بپذیرید.",
  "A few quick tips, while I have your attention": "چند نکتهٔ کاربردی کوتاه",
  "Submit requests to OpenSearch using the green triangle button.": "درخواست‌ها را با دکمهٔ مثلث سبز برای موتور جست‌وجوی Ayyza ارسال کنید.",
  "Use the wrench menu for other useful things.": "برای ابزارهای کاربردی دیگر از منوی آچار استفاده کنید.",
  "You can paste requests in cURL format and they will be translated to the Console syntax.": "می‌توانید درخواست‌های قالب سی‌یو‌آرال را جای‌گذاری کنید تا به نگارش کنسول تبدیل شوند.",
  "You can resize the editor and output panes by dragging the separator between them.": "با کشیدن جداکنندهٔ میان ویرایشگر و خروجی می‌توانید اندازهٔ پنل‌ها را تغییر دهید.",
  "Study the keyboard shortcuts under the Help button. Good stuff in there!": "میان‌برهای صفحه‌کلید را در بخش راهنما ببینید.",
  "Not available when the detector is initializing.": "هنگامی که آشکارساز در حال راه‌اندازی است، این بخش در دسترس نیست.",
  "Detector interval {value1} minutes": "بازهٔ آشکارساز: {value1} دقیقه",
  "Latest anomaly grade {value1}": "آخرین درجهٔ ناهنجاری: {value1}",
  "Latest confidence {value1}": "آخرین میزان اطمینان: {value1}",
  "View anomaly results during the last {value1} intervals ({value2} minutes).": "مشاهدهٔ نتایج ناهنجاری در {value1} بازهٔ گذشته ({value2} دقیقه).",
  "detector": "آشکارساز",
  "Per bucket monitor": "پایشگر به‌ازای هر باکت",
  "پایشگر به‌ازای هر Bucket": "پایشگر به‌ازای هر باکت",
  "Per bucket monitors run a query that evaluates trigger criteria based on aggregated values in the dataset.": "پایشگرهای باکت، پرس‌وجویی اجرا می‌کنند که معیارهای محرک را بر اساس مقادیر تجمیع‌شدهٔ مجموعه‌داده ارزیابی می‌کند.",
  "پایشگرهای Bucket کوئری‌ای اجرا می‌کنند که معیارهای محرک را بر اساس مقادیر تجمیع‌شدهٔ مجموعه‌داده ارزیابی می‌کند.": "پایشگرهای باکت، پرس‌وجویی اجرا می‌کنند که معیارهای محرک را بر اساس مقادیر تجمیع‌شدهٔ مجموعه‌داده ارزیابی می‌کند.",
  "Indexes": "ایندکس‌ها",
  "Select one or more indices or index patterns": "یک یا چند ایندکس یا الگوی ایندکس انتخاب کنید",
  "Select one or more indexes or wildcard patterns": "یک یا چند ایندکس یا الگوی دارای نویسهٔ عام انتخاب کنید",
  "یک یا چند ایندکس یا الگوی wildcard انتخاب کنید": "یک یا چند ایندکس یا الگوی دارای نویسهٔ عام انتخاب کنید",
  "You can use a wildcard (*) in your index pattern or date math to separate indices.": "در الگوی ایندکس می‌توانید از نویسهٔ عام (*) یا محاسبات تاریخ برای تفکیک ایندکس‌ها استفاده کنید.",
  "You can use * as a wildcard or date math index resolution in your index pattern.": "در الگوی ایندکس می‌توانید از * به‌عنوان نویسهٔ عام یا از محاسبات تاریخ برای تفکیک ایندکس‌ها استفاده کنید.",
  "در الگوی ایندکس می‌توانید از * به‌عنوان wildcard یا از محاسبات تاریخ برای تفکیک ایندکس استفاده کنید.": "در الگوی ایندکس می‌توانید از * به‌عنوان نویسهٔ عام یا از محاسبات تاریخ برای تفکیک ایندکس‌ها استفاده کنید.",
  "1 (Highest)": "۱ (بیشترین)",
  "2 (High)": "۲ (زیاد)",
  "3 (Medium)": "۳ (متوسط)",
  "4 (Low)": "۴ (کم)",
  "5 (Lowest)": "۵ (کمترین)",
  "IS EXACTLY": "دقیقاً برابر است",
  "This table contains {value1} rows; Page {value2} of {value3}.": "این جدول {value1} ردیف دارد؛ صفحهٔ {value2} از {value3}.",
  "This table contains {value1} row; Page {value2} of {value3}.": "این جدول {value1} ردیف دارد؛ صفحهٔ {value2} از {value3}.",
  "[alerting_exception] [{value1}:{value2}] [bool] failed to parse field [filter]": "خطای هشداردهی [{value1}:{value2}]: تجزیهٔ فیلد فیلتر از نوع منطقی ناموفق بود.",
  "Unknown field": "فیلد ناشناخته",
  "String field": "فیلد متنی",
  "Number field": "فیلد عددی",
  "Boolean field": "فیلد منطقی",
  "Date field": "فیلد تاریخ",
  "Ayyza": "آیزا",
  "minutes).": "دقیقه).",
  "'.": "».",
  "VisBuilder": "سازندهٔ تصویرسازی",
  "DQL": "زبان پرس‌وجوی داشبورد",
  "zoom: {value1}": "بزرگ‌نمایی: {value1}",
  "draw_filter_shape": "رسم محدودهٔ فیلتر",
  "Reset bearing to north": "بازنشانی جهت به شمال",
  "© OpenSearch": "© آیزا",
  "© OpenMapTiles": "© کاشی‌های نقشهٔ باز",
  "© OpenStreetMap contributors": "© مشارکت‌کنندگان نقشهٔ خیابانی باز",
  "Type:": "نوع:",
  "maps-dashboards": "نقشه‌ها",
  "Draw Rectangle": "رسم مستطیل",
  "Draw Polygon": "رسم چندضلعی",
  "Toggle attribution": "نمایش یا پنهان‌کردن انتساب",
  "Min value": "مقدار کمینه",
  "Max value": "مقدار بیشینه",
  "کمینه value": "مقدار کمینه",
  "بیشینه value": "مقدار بیشینه",
  "DualRange with inputs for zoom level": "بازهٔ دوحدی سطح بزرگ‌نمایی با ورودی‌ها",
  "Range for layer opacity": "بازهٔ شفافیت لایه",
  "visualize": "تصویرسازی",
  "Gantt Chart": "نمودار گانت",
  "dashboards": "داشبوردها",
  "تصویرسازی از نوع {value1} جاسازی‌شده در برنامه {value2}": "{value1} در برنامهٔ {value2} جاسازی شده است",
  "Press the down key to open a popover containing color options": "برای بازکردن فهرست گزینه‌های رنگ، کلید جهت‌نمای پایین را بفشارید",
  "all": "همه",
  "Tag size": "اندازهٔ برچسب",
  "Range minimum": "کمینهٔ بازه",
  "Range maximum": "بیشینهٔ بازه",
  "Press space bar to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Some screen readers may require you to be in focus mode or to use your pass through key": "برای شروع کشیدن، کلید فاصله را بفشارید. هنگام کشیدن با کلیدهای جهت‌نما مورد را جابه‌جا کنید و با کلید گریز لغو کنید. برخی صفحه‌خوان‌ها به حالت تمرکز یا کلید عبور نیاز دارند",
  "Vega visualization": "تصویرسازی وگا",
  "Vega help": "راهنمای وگا",
  "Vega editor options": "گزینه‌های ویرایشگر وگا",
  "Select an option: {value1}, is selected": "یک گزینه انتخاب کنید: {value1} انتخاب شده است",
  "You are in a form selector of {value1} items and must select a single option. Use the up and down keys to navigate or escape to close.": "در یک انتخاب‌گر فرم با {value1} مورد هستید و باید یک گزینه را انتخاب کنید. با کلیدهای جهت‌نمای بالا و پایین حرکت کنید یا با کلید گریز ببندید.",
  "Slack": "اسلک",
  "Chime": "چایم",
  "Microsoft Teams": "مایکروسافت تیمز",
  "Custom webhook": "نشانی دریافت رویداد سفارشی",
  "Email": "ایمیل",
  "Amazon SNS": "سرویس اعلان سادهٔ آمازون",
  "Webhook URL": "نشانی دریافت رویداد",
  "Method": "روش ارسال",
  "POST": "ارسال",
  "GET": "دریافت",
  "PUT": "جایگزینی",
  "PATCH": "اصلاح",
  "DELETE": "حذف",
  "Define endpoint by": "روش تعریف پایانه",
  "Define امنیت پایانه by": "روش تعریف پایانه",
  "Custom attributes URL": "نشانی ویژگی‌های سفارشی",
  "Webhook headers": "سربرگ‌های دریافت رویداد",
  "Key": "کلید",
  "Remove header": "حذف سربرگ",
  "Sender type": "نوع فرستنده",
  "SMTP sender": "فرستندهٔ پروتکل انتقال ایمیل",
  "SES sender": "فرستندهٔ سرویس ایمیل ساده",
  "Sender name": "نام فرستنده",
  "A destination only allows one SMTP or SES sender. Use \"Create SMTP sender\" to create a sender with its email address, host, port, encryption method.": "هر مقصد فقط یک فرستندهٔ پروتکل انتقال ایمیل یا سرویس ایمیل ساده می‌پذیرد. با «ایجاد فرستندهٔ پروتکل انتقال ایمیل» فرستنده‌ای با نشانی ایمیل، میزبان، درگاه و روش رمزنگاری بسازید.",
  "Default recipients": "گیرندگان پیش‌فرض",
  "Email address, recipient group name": "نشانی ایمیل یا نام گروه گیرندگان",
  "Add recipient(s) using an email address or pre-created email group. Use \"Create email group\" to create an email group.": "گیرنده‌ها را با نشانی ایمیل یا گروه ایمیل ازپیش‌ساخته اضافه کنید. با «ایجاد گروه ایمیل» یک گروه ایمیل بسازید.",
  "SNS topic ARN": "شناسهٔ منبع موضوع سرویس اعلان ساده",
  "IAM role ARN": "شناسهٔ منبع نقش مدیریت دسترسی",
  "request time": "زمان اجرا",
  "Recurring": "تکرارشونده",
  "Cron based": "بر پایهٔ عبارت زمان‌بندی",
  "frequency": "تناوب",
  "Cannot update": "امکان به‌روزرسانی وجود ندارد",
  "نام گزارش (برای نمونه: گزارش روزانهٔ ترافیک Log)": "نام گزارش (برای نمونه: گزارش روزانهٔ ترافیک رویدادها)",
  "این گزارش را توضیح دهید (برای نمونه: گزارش روزانهٔ صبحگاهی ترافیک Log)": "این گزارش را توضیح دهید (برای نمونه: گزارش روزانهٔ صبحگاهی ترافیک رویدادها)",
  "PDF": "پی‌دی‌اف",
  "PNG": "پی‌ان‌جی",
  "راهنمای NIST برای کنترل‌های امنیتی سامانه‌های اطلاعاتی.": "راهنمای مؤسسهٔ ملی استانداردها برای کنترل‌های امنیتی سامانه‌های اطلاعاتی.",
  "hh:mm:ss.SSS (12 hours)": "ساعت:دقیقه:ثانیه.هزارم‌ثانیه (۱۲ ساعته)",
  "MM/DD hh:mm:ss (12 hours)": "ماه/روز ساعت:دقیقه:ثانیه (۱۲ ساعته)",
  "MM/DD/YY hh:mm (12 hours)": "ماه/روز/سال ساعت:دقیقه (۱۲ ساعته)",
  "hh:mm:ss.SSS (24 hours)": "ساعت:دقیقه:ثانیه.هزارم‌ثانیه (۲۴ ساعته)",
  "MM/DD hh:mm:ss (24 hours)": "ماه/روز ساعت:دقیقه:ثانیه (۲۴ ساعته)",
  "MM/DD/YY hh:mm (24 hours)": "ماه/روز/سال ساعت:دقیقه (۲۴ ساعته)"
}));
// </ayyza-unified-persian-catalog>

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

  const PERSIAN_GREGORIAN_MONTH_INDEX = {
    ژانویه: 0,
    فوریه: 1,
    مارس: 2,
    آوریل: 3,
    مه: 4,
    ژوئن: 5,
    ژوئیه: 6,
    اوت: 7,
    آگوست: 7,
    سپتامبر: 8,
    اکتبر: 9,
    نوامبر: 10,
    دسامبر: 11,
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
    return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
  }

  function toLatinDigits(value) {
    return String(value)
      .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
      .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
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
    const formatGregorianDisplayDate = (year, monthIndex, day, time) => {
      const parsedYear = Number(year);
      const numericYear = parsedYear < 100 ? 2000 + parsedYear : parsedYear;

      // A four-digit value such as 1405/04/26 may already be a Jalali date.
      // Only convert the Gregorian year range emitted by the dashboard.
      if (numericYear < 1900 || numericYear > 2200) {
        return null;
      }

      const date = createUtcDate(numericYear, Number(monthIndex), Number(day));
      if (!date) {
        return null;
      }

      const persianDate = formatPersianDate(date);
      return time ? `${persianDate} ساعت ${toPersianDigits(time)}` : persianDate;
    };

    const normalizeClock = (clock, meridiem) => {
      if (!clock) return undefined;
      const parts = toLatinDigits(clock).split(':');
      let hour = Number(parts[0]);
      if (meridiem) {
        const marker = meridiem.toUpperCase();
        if (marker === 'PM' && hour < 12) hour += 12;
        if (marker === 'AM' && hour === 12) hour = 0;
      }
      parts[0] = String(hour).padStart(2, '0');
      return parts.join(':');
    };

    const inferChartYear = (monthIndex, day) => {
      const now = new Date();
      let year = now.getUTCFullYear();
      const candidate = createUtcDate(year, monthIndex, day);
      if (candidate && candidate.getTime() - now.getTime() > 45 * 86400000) year -= 1;
      return year;
    };

    let translated = value;
    const monthNames = Object.keys(ENGLISH_MONTH_INDEX)
      .sort((left, right) => right.length - left.length)
      .join('|');

    translated = translated.replace(
      new RegExp(
        `\\b(${monthNames})\\s+(\\d{1,2}),\\s+(\\d{4})(?:\\s+@\\s+(\\d{2}:\\d{2}(?::\\d{2})?(?:\\.\\d+)?))?`,
        'g'
      ),
      (match, monthName, day, year, time) =>
        formatGregorianDisplayDate(year, ENGLISH_MONTH_INDEX[monthName], day, time) || match
    );

    // Prebuilt plugins commonly format timestamps with Moment's
    // `MM/DD/YY h:mm A` format. Convert both 2- and 4-digit years and normalize
    // the clock to 24-hour Persian output.
    translated = translated.replace(
      /(^|[^\d])(\d{1,2})\/(\d{1,2})\/(\d{4}|\d{2})(?:\s+(\d{1,2}:\d{2}(?::\d{2})?)\s*(AM|PM))?/gi,
      (match, prefix, month, day, year, time, meridiem) => {
        const formatted = formatGregorianDisplayDate(
          year,
          Number(month) - 1,
          day,
          normalizeClock(time, meridiem)
        );
        return formatted ? `${prefix}${formatted}` : match;
      }
    );

    // Chart axes usually omit the year (for example `07-13 14:00`). Infer the
    // active Gregorian year, preferring the recent past around year boundaries.
    translated = translated.replace(
      /(^|[^\d])(\d{2})-(\d{2})\s+(\d{2}:\d{2}(?::\d{2})?)(?!\d)/g,
      (match, prefix, month, day, time) => {
        const monthIndex = Number(month) - 1;
        const formatted = formatGregorianDisplayDate(
          inferChartYear(monthIndex, Number(day)),
          monthIndex,
          day,
          time
        );
        return formatted ? `${prefix}${formatted}` : match;
      }
    );

    const localizedMonthNames = Object.keys(PERSIAN_GREGORIAN_MONTH_INDEX)
      .sort((left, right) => right.length - left.length)
      .join('|');
    translated = translated.replace(
      new RegExp(
        `(${localizedMonthNames})\\s+([0-9۰-۹٠-٩]{1,2})[،,]\\s+([0-9۰-۹٠-٩]{4})(?:\\s+@\\s+([0-9۰-۹٠-٩]{2}:[0-9۰-۹٠-٩]{2}(?::[0-9۰-۹٠-٩]{2})?(?:\\.[0-9۰-۹٠-٩]+)?))?`,
        'g'
      ),
      (match, monthName, day, year, time) =>
        formatGregorianDisplayDate(
          toLatinDigits(year),
          PERSIAN_GREGORIAN_MONTH_INDEX[monthName],
          toLatinDigits(day),
          time ? toLatinDigits(time) : undefined
        ) || match
    );

    translated = translated.replace(
      /(^|[^\d])(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?)(?:Z|[+-]\d{2}:?\d{2})?/g,
      (match, prefix, year, month, day, time) => {
        const formatted = formatGregorianDisplayDate(year, Number(month) - 1, day, time);
        return formatted ? `${prefix}${formatted}` : match;
      }
    );

    translated = translated.replace(
      /(^|[^\d])(\d{4})([-/])(\d{2})\3(\d{2})(?![\dT])/g,
      (match, prefix, year, separator, month, day) => {
        const formatted = formatGregorianDisplayDate(year, Number(month) - 1, day);
        return formatted ? `${prefix}${formatted}` : match;
      }
    );

    return translated;
  }

  const UNIFIED_PERSIAN_TEMPLATE_TRANSLATIONS = Array.from(UNIFIED_PERSIAN_TEXT_MAP.entries())
    .filter(([source]) => /\{value\d+\}/.test(source))
    .map(([source, target]) => {
      const placeholders = source.match(/\{value\d+\}/g) || [];
      const parts = source.split(/\{value\d+\}/g);
      const pattern = parts
        .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('(.+?)');
      return { regex: new RegExp(`^${pattern}$`, 'i'), placeholders, target };
    });

  function translateUnifiedTemplate(value) {
    for (const { regex, placeholders, target } of UNIFIED_PERSIAN_TEMPLATE_TRANSLATIONS) {
      const match = value.match(regex);
      if (!match) continue;

      const captures = new Map();
      placeholders.forEach((placeholder, index) => {
      const captured = match[index + 1];
      const localizedDate = translateDisplayDate(captured);
      const localizedCapture = UNIFIED_PERSIAN_TEXT_MAP.get(captured.trim());
      captures.set(
        placeholder,
        localizedDate !== captured
          ? localizedDate
          : localizedCapture
          ? localizedCapture
          : /^\d[\d,.]*$/.test(captured)
          ? toPersianDigits(captured)
          : captured
        );
      });
      return target.replace(
        /\{value\d+\}/g,
        (placeholder) => captures.get(placeholder) ?? placeholder
      );
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
    [/^Current API id \[(.+)\]$/, (id) => `شناسه API فعلی [${id}]`],
    [/^Checking current API id \[(.+)\]\.\.\.$/, (id) => `در حال بررسی شناسه API فعلی [${id}]...`],
    [/^Set cluster info in cookie$/, () => 'اطلاعات cluster در cookie تنظیم شد'],
    [/^Current API in cookie: \[(.+)\]$/, (id) => `API فعلی در cookie: [${id}]`],
    [/^Getting API version data\.\.\.$/, () => 'در حال دریافت داده نسخه API...'],
    [/^API version: \[(.+)\]$/, (version) => `نسخه API: [${version}]`],
    [/^Getting the app version\.\.\.$/, () => 'در حال دریافت نسخه برنامه...'],
    [/^App version: \[(.+)\]$/, (version) => `نسخه برنامه: [${version}]`],
    [
      /^Index pattern id in cookie: yes \[(.+)\]$/,
      (id) => `شناسه index pattern در cookie: بله [${id}]`,
    ],
    [/^Index pattern id in cookie: no$/, () => 'شناسه index pattern در cookie: خیر'],
    [/^Index pattern id in cookie: \[(.+)\]$/, (id) => `شناسه index pattern در cookie: [${id}]`],
    [
      /^Getting list of valid index patterns\.\.\.$/,
      () => 'در حال دریافت فهرست index patternهای معتبر...',
    ],
    [/^Valid index patterns found: (.+)$/, (count) => `index patternهای معتبر یافت‌شده: ${count}`],
    [
      /^Found default index pattern with title \[(.+)\]: (yes|no)$/,
      (title, status) =>
        `index pattern پیش‌فرض با عنوان [${title}] یافت شد: ${translateYesNo(status)}`,
    ],
    [
      /^Checking the app default pattern exists: id \[(.+)\]\.\.\.$/,
      (id) => `در حال بررسی وجود pattern پیش‌فرض برنامه: شناسه [${id}]...`,
    ],
    [
      /^Default pattern with id \[(.+)\] exists: (yes|no)$/,
      (id, status) => `pattern پیش‌فرض با شناسه [${id}] وجود دارد: ${translateYesNo(status)}`,
    ],
    [
      /^Default pattern id \[(.+)\] set as default index pattern$/,
      (id) => `شناسه pattern پیش‌فرض [${id}] به عنوان index pattern پیش‌فرض تنظیم شد`,
    ],
    [
      /^Checking the index pattern id \[(.+)\] exists\.\.\.$/,
      (id) => `در حال بررسی وجود شناسه index pattern [${id}]...`,
    ],
    [
      /^Checking index pattern id \[(.+)\] exists\.\.\.$/,
      (id) => `در حال بررسی وجود شناسه index pattern [${id}]...`,
    ],
    [
      /^Index pattern id exists \[(.+)\]: (yes|no)$/,
      (id, status) => `شناسه index pattern [${id}] وجود دارد: ${translateYesNo(status)}`,
    ],
    [
      /^Exist index pattern id \[(.+)\]: (yes|no)$/,
      (id, status) => `شناسه index pattern [${id}] وجود دارد: ${translateYesNo(status)}`,
    ],
    [
      /^Checking if the index pattern id \[(.+)\] exists\.\.\.$/,
      (id) => `در حال بررسی وجود شناسه index pattern [${id}]...`,
    ],
    [
      /^Index pattern id \[(.+)\] found: (yes|no) title \[(.+)\]$/,
      (id, status, title) =>
        `شناسه index pattern [${id}] یافت شد: ${translateYesNo(status)} عنوان [${title}]`,
    ],
    [
      /^Checking if exists a template compatible with the index pattern title \[(.+)\]$/,
      (title) => `در حال بررسی وجود template سازگار با عنوان index pattern [${title}]`,
    ],
    [
      /^Template found for the selected index-pattern title \[(.+)\]: (yes|no)$/,
      (title, status) =>
        `template برای عنوان index-pattern انتخاب‌شده [${title}] یافت شد: ${translateYesNo(
          status
        )}`,
    ],
    [
      /^Getting index pattern data \[(.+)\]\.\.\.$/,
      (id) => `در حال دریافت داده index pattern [${id}]...`,
    ],
    [
      /^Index pattern data found: \[(yes|no)\]$/,
      (status) => `داده index pattern یافت شد: [${translateYesNo(status)}]`,
    ],
    [
      /^Refreshing index pattern fields: title \[(.+)\], id \[(.+)\]\.\.\.$/,
      (title, id) => `در حال تازه‌سازی فیلدهای index pattern: عنوان [${title}]، شناسه [${id}]...`,
    ],
    [
      /^Refreshed index pattern fields: title \[(.+)\], id \[(.+)\]$/,
      (title, id) => `فیلدهای index pattern تازه‌سازی شد: عنوان [${title}]، شناسه [${id}]`,
    ],
    [/^Getting settings\.\.\.$/, () => 'در حال دریافت تنظیمات...'],
    [
      /^Check (.+) setting \[(.+)\]: (.+)$/,
      (source, setting, value) => `بررسی تنظیم ${source} [${setting}]: ${value}`,
    ],
    [/^App setting \[(.+)\]: (.+)$/, (setting, value) => `تنظیم برنامه [${setting}]: ${value}`],
    [
      /^Settings mismatch \[(.+)\]: (yes|no)$/,
      (setting, status) => `ناهماهنگی تنظیمات [${setting}]: ${translateYesNo(status)}`,
    ],
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
      .map((part) => REGISTER_AGENT_FIELD_LABELS.get(part.trim()) || part.trim())
      .join(' و ');
  }

  const DO_NOT_TRANSLATE_PARENT_SELECTOR = [
    'code',
    'pre',
    'textarea',
    'input',
    '.euiCode',
    '.wz-technical',
    '[data-wz-ltr]',
  ].join(',');

  const TRANSLATABLE_ATTRIBUTES = [
    'aria-label',
    'aria-description',
    'aria-valuetext',
    'title',
    'placeholder',
    'data-title',
    'data-label',
    'data-tooltip',
    'data-original-title',
    'alt',
  ];
  const TRANSLATABLE_ATTRIBUTE_SELECTOR = TRANSLATABLE_ATTRIBUTES.map(
    (attribute) => `[${attribute}]`
  ).join(',');

  function ensureGlobalFont() {
    document.documentElement.style.setProperty('--font-text', GLOBAL_FONT_FAMILY);
    document.documentElement.style.setProperty('--oui-font-family', GLOBAL_FONT_FAMILY);

    let stylesheet = document.getElementById(GLOBAL_FONT_STYLESHEET_ID);
    if (!stylesheet) {
      const bootstrapScript = Array.from(document.scripts).find((script) =>
        script.src.includes('/farsi-runtime-bootstrap.js')
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

    const globalFontCss = `
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
    body.ayyza-rtl .euiAccordion__iconWrapper .euiAccordion__icon,
    .ayyza-rtl .euiAccordion__iconWrapper .euiAccordion__icon,
    html[dir='rtl'] .ouiAccordion__iconWrapper .ouiAccordion__icon,
    body.ayyza-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon,
    .ayyza-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon {
      transform: rotate(180deg) !important;
      transform-origin: center;
    }
    html[dir='rtl'] .euiAccordion__iconWrapper .euiAccordion__icon-isOpen,
    body.ayyza-rtl .euiAccordion__iconWrapper .euiAccordion__icon-isOpen,
    .ayyza-rtl .euiAccordion__iconWrapper .euiAccordion__icon-isOpen,
    html[dir='rtl'] .ouiAccordion__iconWrapper .ouiAccordion__icon-isOpen,
    body.ayyza-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon-isOpen,
    .ayyza-rtl .ouiAccordion__iconWrapper .ouiAccordion__icon-isOpen {
      transform: rotate(90deg) !important;
    }
    .header__homeLoaderNavButton .euiHeaderSectionItemButton__content,
    .header__homeLoaderNavButton .ouiHeaderSectionItemButton__content {
      min-width: 48px !important;
    }
    .header__homeLoaderNavButton .homeIconContainer {
      width: 44px !important;
      height: 40px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .header__homeLoaderNavButton .homeIconContainer .logoImage {
      width: 28px !important;
      height: 28px !important;
      max-width: 28px !important;
      flex: 0 0 28px !important;
      object-fit: contain !important;
    }
  `;
    if (style.textContent !== globalFontCss) {
      style.textContent = globalFontCss;
    }
  }

  function ensureHomeLogo(root = document) {
    const bootstrapScript = Array.from(document.scripts).find((script) =>
      script.src.includes('/farsi-runtime-bootstrap.js')
    );
    const uiPublicUrl = bootstrapScript
      ? bootstrapScript.src.replace(/\/farsi-runtime-bootstrap\.js(?:\?.*)?$/, '')
      : `${window.location.origin}/ui`;

    queryAllIncludingRoot(
      root,
      '.header__homeLoaderNavButton .homeIconContainer .logoImage'
    ).forEach((logo) => {
      if (!(logo instanceof HTMLImageElement)) return;

      const targetUrl = `${uiPublicUrl}/logos/wazuh_A_only.svg?v=${FAVICON_CACHE_VERSION}`;
      logo.loading = 'eager';
      logo.decoding = 'async';
      if (logo.src !== targetUrl) logo.src = targetUrl;
      logo.setAttribute('data-test-image-url', targetUrl);
    });
  }

  function ensureFavicon() {
    const bootstrapScript = Array.from(document.scripts).find((script) =>
      script.src.includes('/farsi-runtime-bootstrap.js')
    );
    const uiPublicUrl = bootstrapScript
      ? bootstrapScript.src.replace(/\/farsi-runtime-bootstrap\.js(?:\?.*)?$/, '')
      : `${window.location.origin}/ui`;
    const faviconUrl = (name) => `${uiPublicUrl}/favicons/${name}?v=${FAVICON_CACHE_VERSION}`;

    if (!document.querySelector("link[rel='icon'][sizes='192x192']")) {
      const primaryIcon = document.createElement('link');
      primaryIcon.setAttribute('rel', 'icon');
      primaryIcon.setAttribute('type', 'image/png');
      primaryIcon.setAttribute('sizes', '192x192');
      primaryIcon.setAttribute('href', faviconUrl('android-chrome-192x192.png'));
      document.head.prepend(primaryIcon);
    }

    document.querySelectorAll("link[rel*='icon']").forEach((link) => {
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

  function replaceDisplayedBrand(value) {
    let result = value;

    if (LEGACY_LATIN_BRAND_TEST.test(result)) {
      result = result.replace(LEGACY_LATIN_BRAND_REPLACE, (match) => {
        if (match === match.toUpperCase()) return 'AYYZA';
        if (match[0] === match[0].toUpperCase()) return 'Ayyza';
        return 'ayyza';
      });
    }

    LEGACY_PERSIAN_BRANDS.forEach((brand) => {
      if (result.includes(brand)) result = result.split(brand).join('Ayyza');
    });

    return result;
  }

  const OBSERVED_UI_TEXT_TRANSLATIONS = new Map([
    [
      'Destinations have become channels in Notifications.',
      'مقصدها در بخش اعلان‌ها به کانال تبدیل شده‌اند.',
    ],
    [
      'Your destinations have been migrated to Notifications, a new centralized place to manage your notification channels. Destinations will be deprecated going forward.',
      'مقصدهای شما به بخش اعلان‌ها منتقل شده‌اند؛ بخشی متمرکز و جدید برای مدیریت کانال‌های اعلان شما. از این پس، مقصدها منسوخ خواهند شد.',
    ],
  ]);

  function translateKnownTextBase(value) {
    // Large Discover/log payloads are technical data, not UI labels. Avoid copying and
    // normalizing multi-megabyte text nodes on every incremental DOM scan.
    if (typeof value !== 'string') {
      return value;
    }

    value = replaceDisplayedBrand(value);
    if (value.length > 4096) return value;

    const trimmed = value.trim();
    const normalized = trimmed.replace(/\s+/g, ' ');
    const translated =
      OBSERVED_UI_TEXT_TRANSLATIONS.get(trimmed) ||
      (normalized !== trimmed
        ? OBSERVED_UI_TEXT_TRANSLATIONS.get(normalized)
        : undefined) ||
      UNIFIED_PERSIAN_TEXT_MAP.get(trimmed) ||
      (normalized !== trimmed ? UNIFIED_PERSIAN_TEXT_MAP.get(normalized) : undefined) ||
      VISUALIZATION_PERSIAN_TEXT_MAP.get(trimmed) ||
      (normalized !== trimmed ? VISUALIZATION_PERSIAN_TEXT_MAP.get(normalized) : undefined) ||
      PERSIAN_TEXT_MAP.get(trimmed) ||
      (normalized !== trimmed ? PERSIAN_TEXT_MAP.get(normalized) : undefined);

    if (translated) {
      return value.replace(trimmed, translated);
    }

    const authorizationTokenErrorTitle = normalized.match(
      /^(?:[^:]+:\s*)?Error getting the authorization token$/i
    );
    if (authorizationTokenErrorTitle) {
      return value.replace(trimmed, 'خطا در دریافت توکن مجوز');
    }

    const authorizationTokenHostNotFound = normalized.match(
      /^(\d+)\s*-\s*Error getting the authorization token:\s*API host with ID\s*\[([^\]]+)\]\s*was not found in the registry\.\s*This could be caused by a problem getting and storing the registry data or the API host was removed\.?$/i
    );
    if (authorizationTokenHostNotFound) {
      return value.replace(
        trimmed,
        `${authorizationTokenHostNotFound[1]} - خطا در دریافت توکن مجوز: میزبان رابط سرور با شناسهٔ [${authorizationTokenHostNotFound[2]}] در رجیستری یافت نشد. ممکن است هنگام دریافت یا ذخیرهٔ داده‌های رجیستری مشکلی رخ داده باشد یا میزبان رابط سرور حذف شده باشد.`
      );
    }

    const translatedTemplate = translateUnifiedTemplate(normalized);
    if (translatedTemplate !== normalized) {
      return value.replace(trimmed, translatedTemplate);
    }

    const translatedMetric = translateChartMetricIdentifier(normalized);
    if (translatedMetric !== normalized) {
      return value.replace(trimmed, translatedMetric);
    }

    const ruleCount = normalized.match(/^(\d+)\s+rules?$/i);
    if (ruleCount) {
      return value.replace(trimmed, `${toPersianDigits(ruleCount[1])} قانون`);
    }

    const minuteCount = normalized.match(/^(\d+)\s+minutes?$/i);
    if (minuteCount) {
      return value.replace(trimmed, `${toPersianDigits(minuteCount[1])} دقیقه`);
    }

    const tableRowSummary = normalized.match(/^This table contains\s+(\d+)\s+rows?\.?$/i);
  if (tableRowSummary) {
    return value.replace(trimmed, `این جدول ${toPersianDigits(tableRowSummary[1])} ردیف دارد.`);
  }

  const prefixedAnomalyValue = normalized.match(
    /^(Last anomaly occurrence|Last updated time|Detector with the most recent anomaly|Most recent anomaly grade)\s+(.+)$/i
  );
  if (prefixedAnomalyValue) {
    const labels = {
      'last anomaly occurrence': 'آخرین رخداد ناهنجاری',
      'last updated time': 'زمان آخرین به‌روزرسانی',
      'detector with the most recent anomaly': 'آشکارساز دارای جدیدترین ناهنجاری',
      'most recent anomaly grade': 'جدیدترین درجهٔ ناهنجاری',
    };
    return value.replace(
      trimmed,
      `${labels[prefixedAnomalyValue[1].toLowerCase()]} ${translateDisplayDate(
        prefixedAnomalyValue[2]
      )}`
    );
  }

  const pageSummary = normalized.match(/^Page\s+(\d+)\s+of\s+(\d+)$/i);
  if (pageSummary) {
    return value.replace(
      trimmed,
      `صفحهٔ ${toPersianDigits(pageSummary[1])} از ${toPersianDigits(pageSummary[2])}`
    );
  }

  const primaryNavigation = normalized.match(/^Primary navigation links,\s*(.+)$/i);
  if (primaryNavigation) {
    const group =
      UNIFIED_PERSIAN_TEXT_MAP.get(primaryNavigation[1]) ||
      PERSIAN_TEXT_MAP.get(primaryNavigation[1]) ||
      primaryNavigation[1];
    return value.replace(trimmed, `پیوندهای پیمایش اصلی، ${group}`);
  }

  const disabledStep = normalized.match(/^Step\s+(\d+)\s+is disabled$/i);
  if (disabledStep) {
    return value.replace(trimmed, `مرحلهٔ ${toPersianDigits(disabledStep[1])} غیرفعال است`);
  }

  const removeSelection = normalized.match(/^Remove\s+(.+?)\s+from selection in this group$/i);
  if (removeSelection) {
    return value.replace(
      trimmed,
      `حذف ${removeSelection[1].replace(/\s+\(Local\)$/i, ' (محلی)')} از انتخاب‌های این گروه`
    );
  }

  const seriesColor = normalized.match(/^series color(?::\s*(.+))?$/i);
  if (seriesColor) {
    return value.replace(trimmed, 'رنگ سری');
  }

  const invalidDateTitle = normalized.match(/^Invalid date:\s*(.+)$/i);
  if (invalidDateTitle) {
    const rawDate = invalidDateTitle[1];
    const parsedDate = new Date(rawDate);
    const displayDate =
      rawDate === 'now'
        ? 'اکنون'
        : Number.isNaN(parsedDate.getTime())
        ? 'تاریخ واردشده'
        : formatPersianDate(parsedDate);
    return value.replace(
      trimmed,
      `تاریخ نامعتبر: ${displayDate}`
    );
  }

  const updateNeededTitle = normalized.match(/^Update needed:\s*(.+)$/i);
  if (updateNeededTitle) {
    return value.replace(
      trimmed,
      `نیازمند به‌روزرسانی: ${updateNeededTitle[1] === 'now' ? 'اکنون' : updateNeededTitle[1]}`
    );
  }

  const monthAria = normalized.match(/^month-([0-9۰-۹]{4})-([0-9۰-۹]{2})$/i);
  if (monthAria) {
    return value.replace(
      trimmed,
      `ماه-${toPersianDigits(monthAria[1])}-${toPersianDigits(monthAria[2])}`
    );
  }

  const relativeDateTitle = normalized.match(/^now-(\d+)([smhdwMy])$/);
  if (relativeDateTitle) {
    const units = { s: 'ثانیه', m: 'دقیقه', h: 'ساعت', d: 'روز', w: 'هفته', M: 'ماه', y: 'سال' };
    return value.replace(trimmed, `${toPersianDigits(relativeDateTitle[1])} ${units[relativeDateTitle[2]]} پیش`);
  }

    const chartLegendAction = normalized.match(/^(.+?);\s*Activate to hide series in graph$/i);
    if (chartLegendAction) {
      return value.replace(
        trimmed,
        `${translateChartField(chartLegendAction[1])}؛ برای پنهان‌کردن سری در نمودار فعال کنید`
      );
    }

    const technicalLine = normalized.match(
      /^(Field|فیلد|Aggregation method|روش تجمیع|State|وضعیت)\s*:\s*([A-Za-z0-9_.@-]+)$/i
    );
    if (technicalLine) {
      const label = technicalLine[1].toLowerCase();
      const translatedLabel =
        label === 'field' || label === 'فیلد'
          ? 'فیلد'
          : label === 'state' || label === 'وضعیت'
          ? 'وضعیت'
          : 'روش تجمیع';
    const translatedValue =
      translatedLabel === 'فیلد'
        ? translateChartField(technicalLine[2])
        : translatedLabel === 'روش تجمیع'
        ? translateChartAggregation(technicalLine[2])
        : technicalLine[2].toLowerCase() === 'active'
        ? 'فعال'
        : technicalLine[2].toLowerCase() === 'disabled'
        ? 'غیرفعال'
        : technicalLine[2];
      return value.replace(trimmed, `${translatedLabel}: ${translatedValue}`);
    }

    const controlTitle = normalized.match(/^(range|list):\s*(\d+)$/i);
    if (controlTitle) {
      const label =
        controlTitle[1].toLowerCase() === 'range' ? 'لغزندهٔ بازه' : 'فهرست گزینه‌ها';
      return value.replace(trimmed, `${label}: ${toPersianDigits(controlTitle[2])}`);
    }

    const generatedAxisName = normalized.match(/^(Left|Right|Top|Bottom)Axis-(\d+)$/);
    if (generatedAxisName) {
      const positions = {
        Left: 'چپ',
        Right: 'راست',
        Top: 'بالا',
        Bottom: 'پایین',
      };
      return value.replace(
        trimmed,
        `محور ${positions[generatedAxisName[1]]} ${toPersianDigits(generatedAxisName[2])}`
      );
    }

    const localizedAxisName = normalized.match(/^(Left|Right|Top|Bottom) axis\s+(\d+)$/i);
    if (localizedAxisName) {
      const positions = {
        left: 'چپ',
        right: 'راست',
        top: 'بالا',
        bottom: 'پایین',
      };
      return value.replace(
        trimmed,
        `محور ${positions[localizedAxisName[1].toLowerCase()]} ${toPersianDigits(
          localizedAxisName[2]
        )}`
      );
    }

    const sampleDataDescriptions = [
      [
        'Sample data, visualizations and dashboards for security information',
        'داده‌ها، تصویرسازی‌ها و داشبوردهای نمونه برای اطلاعات امنیتی (پایش یکپارچگی فایل، سرویس‌های وب آمازون، آفیس ۳۶۵، گوگل کلاد، گیت‌هاب، API مایکروسافت گراف، مجوزدهی، SSH و وب).',
      ],
      [
        'Sample data, visualizations and dashboards for events of',
        'داده‌ها، تصویرسازی‌ها و داشبوردهای نمونه برای رخدادهای تشخیص بدافزار (بدافزار، VirusTotal و YARA).',
      ],
      [
        'Sample data, visualizations and dashboards for threat events of detection and response',
        'داده‌ها، تصویرسازی‌ها و داشبوردهای نمونه برای رخدادهای تشخیص و پاسخ‌گویی به تهدید (تشخیص آسیب‌پذیری، Docker و MITRE ATT&CK).',
      ],
      [
        'Sample data, visualizations and dashboards for system inventory',
        'داده‌ها، تصویرسازی‌ها و داشبوردهای نمونه برای موجودی سیستم (گروه‌ها، سخت‌افزار، اصلاحیه‌ها، رابط‌ها، شبکه‌ها، بسته‌ها، درگاه‌ها، پردازش‌ها، پروتکل‌ها، سیستم، کاربران، سرویس‌ها و افزونه‌های مرورگر).',
      ],
      [
        'Sample data, visualizations and dashboards for vulnerabilities inventory',
        'داده‌ها، تصویرسازی‌ها و داشبوردهای نمونه برای موجودی آسیب‌پذیری‌ها.',
      ],
    ];
    const sampleDataDescription = sampleDataDescriptions.find(([prefix]) =>
      normalized.startsWith(prefix)
    );
    if (sampleDataDescription) {
      return value.replace(trimmed, sampleDataDescription[1]);
    }

    // The dashboard locale can translate Gregorian month names and digits before
    // this runtime sees them (for example, "ژوئیه ۱۷، ۲۰۲۶"). Convert dates
    // before the ASCII-only fast path so those localized Gregorian values are
    // still rendered on the Persian calendar.
    const translatedDate = translateDisplayDate(normalized);
    if (translatedDate !== normalized) {
      return value.replace(trimmed, translatedDate);
    }

    // Localize display-only counters and decimal values while leaving
    // identifiers, form values and API payloads untouched.
    if (!/[A-Za-z]/.test(normalized) && /\d/.test(normalized)) {
      return value.replace(trimmed, toPersianDigits(normalized));
    }

    const translatedUnitHint = normalized.match(
      /^(واحد قابل تغییر است و اکنون روی)\s+([smhdwMy])\s+(تنظیم شده است\.)$/
    );
    if (translatedUnitHint) {
      const units = { s: 'ثانیه', m: 'دقیقه', h: 'ساعت', d: 'روز', w: 'هفته', M: 'ماه', y: 'سال' };
      return value.replace(
        trimmed,
        `${translatedUnitHint[1]} ${units[translatedUnitHint[2]]} ${translatedUnitHint[3]}`
      );
    }

    if (normalized.includes('Escape') && /[\u0600-\u06ff]/.test(normalized)) {
      return value.replace(trimmed, normalized.replace(/Escape/g, 'گریز'));
    }

    // Dynamic fallbacks below only match ASCII labels, counters and Gregorian
    // dates that were not handled above. Persian text that missed the exact map
    // cannot match any of them.
    if (!/[A-Za-z0-9]/.test(normalized)) {
      return value;
    }

    const roundedTimeUnit = normalized.match(
      /^(?:Round to the|گردکردن تا|گرد کردن تا)\s+(second|minute|hour|day|week|month|year)$/i
    );
    if (roundedTimeUnit) {
      const units = {
        second: 'ثانیه',
        minute: 'دقیقه',
        hour: 'ساعت',
        day: 'روز',
        week: 'هفته',
        month: 'ماه',
        year: 'سال',
      };
      return value.replace(trimmed, `گرد کردن تا ${units[roundedTimeUnit[1].toLowerCase()]}`);
    }

    const filterForValue = normalized.match(/^Filter for value(?::\s*(.+))?$/i);
    if (filterForValue) {
      return value.replace(
        trimmed,
        filterForValue[1] ? `فیلتر بر اساس مقدار: ${filterForValue[1]}` : 'فیلتر بر اساس این مقدار'
      );
    }

    const filterOutValue = normalized.match(/^Filter out value(?::\s*(.+))?$/i);
    if (filterOutValue) {
      return value.replace(
        trimmed,
        filterOutValue[1] ? `حذف مقدار از نتایج: ${filterOutValue[1]}` : 'حذف این مقدار از نتایج'
      );
    }

    const availableFields = normalized.match(/^(\d[\d,]*)\s+available fields$/i);
    if (availableFields) {
      return value.replace(trimmed, `${toPersianDigits(availableFields[1])} فیلد در دسترس`);
    }

    const sortedFields = normalized.match(/^(\d[\d,]*)\s+fields? sorted$/i);
    if (sortedFields) {
      return value.replace(trimmed, `${toPersianDigits(sortedFields[1])} فیلد مرتب‌شده`);
    }

    const hitCount = normalized.match(/^(?:(\d[\d,]*)\s+hits?|hits?\s+(\d[\d,]*))$/i);
    if (hitCount) {
      return value.replace(trimmed, `${toPersianDigits(hitCount[1] || hitCount[2])} نتیجه`);
    }

    const queryCount = normalized.match(/^(.+?)\s*>\s*count\s*\((\d[\d,]*)\)$/i);
    if (queryCount) {
      return value.replace(
        trimmed,
        `${queryCount[1]} > تعداد (${toPersianDigits(queryCount[2])})`
      );
    }

    const paginationPage = normalized.match(/^(Previous|Next) page,\s*(\d[\d,]*)$/i);
    if (paginationPage) {
      const label =
        paginationPage[1].toLowerCase() === 'previous' ? 'صفحهٔ قبل' : 'صفحهٔ بعد';
      return value.replace(trimmed, `${label}، ${toPersianDigits(paginationPage[2])}`);
    }

    const detailTarget = normalized.match(/^View details of\s+(.+)$/i);
    if (detailTarget) {
      return value.replace(trimmed, `مشاهده جزئیات ${detailTarget[1]}`);
    }

    const permissionDeniedResource = normalized.match(
      /^Permission denied:\s*Resource type\s*(.+)$/i
    );
    if (permissionDeniedResource) {
      return value.replace(trimmed, `دسترسی به نوع منبع ${permissionDeniedResource[1]} مجاز نیست.`);
    }

    const badRequestPermission = normalized.match(
      /^API error:\s*ERR_BAD_REQUEST\s*-\s*Permission denied:\s*Resource type\s*(.+)$/i
    );
    if (badRequestPermission) {
      return value.replace(
        trimmed,
        `خطای API: درخواست نامعتبر است؛ دسترسی به نوع منبع ${badRequestPermission[1]} مجاز نیست.`
      );
    }

    const failedToParseField = normalized.match(
      /^failed to parse field\s+(\[[^\]]+\])(?:\s+(\[[^\]]+\]))?(?:\s+(\[[^\]]+\]))?(?:\s+(\[[^\]]+\]))?$/i
    );
    if (failedToParseField) {
      const details = failedToParseField.slice(2).filter(Boolean).join(' ');
      return value.replace(
        trimmed,
        `تجزیهٔ فیلد ${failedToParseField[1]} ناموفق بود${details ? `: ${details}` : ''}`
      );
    }

    const alertingParseFailure = normalized.match(
      /^\[alerting_exception\]\s+\[([0-9]+):([0-9]+)\]\s+\[bool\]\s+failed to parse field\s+\[filter\]$/i
    );
    if (alertingParseFailure) {
      return value.replace(
        trimmed,
        `خطای هشداردهی [${toPersianDigits(alertingParseFailure[1])}:${toPersianDigits(
          alertingParseFailure[2]
        )}]: تجزیهٔ فیلد فیلتر از نوع منطقی ناموفق بود.`
      );
    }

    const remainingAlertingItems = normalized.match(
      /^You can add up to (\d+) more (triggers|monitors)\.?$/i
    );
    if (remainingAlertingItems) {
      const label = remainingAlertingItems[2].toLowerCase() === 'triggers' ? 'محرک' : 'پایشگر';
      return value.replace(
        trimmed,
        `می‌توانید حداکثر ${toPersianDigits(remainingAlertingItems[1])} ${label} دیگر اضافه کنید.`
      );
    }

    const disabledFilesystemMount = normalized.match(
      /^Ensure mounting of (.+?) filesystems is disabled\.$/i
    );
    if (disabledFilesystemMount) {
      return value.replace(
        trimmed,
        `اطمینان دهید mount شدن فایل‌سیستم ${disabledFilesystemMount[1]} غیرفعال است.`
      );
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
        `${PERSIAN_SEVERITY_PREFIXES.get(severityWithCount[1])} ${severityWithCount[2]}`
      );
    }

    const statusWithCount = normalized.match(
      /^(Active|Disconnected|Pending|Never connected|active)\s+\((\d[\d,]*)\)$/
    );
    if (statusWithCount) {
      return value.replace(
        trimmed,
        `${PERSIAN_STATUS_PREFIXES.get(statusWithCount[1])} (${statusWithCount[2]})`
      );
    }

    const exploreAgentWithCount = normalized.match(/^Explore agent\s*\((\d[\d,]*)\)$/i);
    if (exploreAgentWithCount) {
      return value.replace(trimmed, `بررسی Agent (${toPersianDigits(exploreAgentWithCount[1])})`);
    }

    const anomalyStepWithNumber = normalized.match(
      /^(Define your detector|Configure your detector|Preview your detector|View results)\s*\.?\s*(\d+)$/
    );
    if (anomalyStepWithNumber) {
      return value.replace(
        trimmed,
        `${PERSIAN_TEXT_MAP.get(anomalyStepWithNumber[1])} ${toPersianDigits(
          anomalyStepWithNumber[2]
        )}`
      );
    }

    const mapLayerOutsideZoom = normalized.match(
      /^Layer is hidden outside of zoom range (.+?)[–-](.+)$/
    );
    if (mapLayerOutsideZoom) {
      return value.replace(
        trimmed,
        `لایه خارج از محدودهٔ بزرگ‌نمایی ${toPersianDigits(
          mapLayerOutsideZoom[1]
        )} تا ${toPersianDigits(mapLayerOutsideZoom[2])} پنهان است`
      );
    }

    const mapMaximumLayers = normalized.match(
      /^You've added the maximum number of layers \((\d+)\)\.$/
    );
    if (mapMaximumLayers) {
      return value.replace(
        trimmed,
        `حداکثر تعداد لایه‌ها (${toPersianDigits(mapMaximumLayers[1])}) افزوده شده است.`
      );
    }

    const numberedNewMapLayer = normalized.match(/^New layer\s+(\d+)$/);
    if (numberedNewMapLayer) {
      return value.replace(trimmed, `لایهٔ جدید ${toPersianDigits(numberedNewMapLayer[1])}`);
    }

    const deleteMapLayer = normalized.match(/^Do you want to delete layer\s+(.+?)\?$/);
    if (deleteMapLayer) {
      return value.replace(trimmed, `آیا می‌خواهید لایهٔ ${deleteMapLayer[1]} را حذف کنید؟`);
    }

    const ruleLevelRange = normalized.match(/^Rule level (\d+) to (\d+)$/);
    if (ruleLevelRange) {
      return value.replace(trimmed, `سطح قاعده از ${ruleLevelRange[1]} تا ${ruleLevelRange[2]}`);
    }

    const ruleLevelOrHigher = normalized.match(/^Rule level (\d+) or higher$/);
    if (ruleLevelOrHigher) {
      return value.replace(trimmed, `سطح قاعده ${ruleLevelOrHigher[1]} یا بالاتر`);
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
        nextPage[1] ? `صفحه بعد، ${toPersianDigits(nextPage[1])}` : 'صفحه بعد'
      );
    }

    const tableSummary = normalized.match(
      /^This table contains ([\d,]+) rows out of ([\d,]+) rows; Page ([\d,]+) of ([\d,]+)\.$/
    );
    if (tableSummary) {
      return value.replace(
        trimmed,
        `این جدول ${toPersianDigits(tableSummary[1])} ردیف از ${toPersianDigits(
          tableSummary[2]
        )} ردیف را نشان می‌دهد؛ صفحه ${toPersianDigits(tableSummary[3])} از ${toPersianDigits(
          tableSummary[4]
        )}.`
      );
    }

    const partiallyTranslatedTableSummary = normalized.match(
      /^این جدول ([\d۰-۹٠-٩,]+) rows out of ([\d۰-۹٠-٩,]+) ردیف دارد؛ صفحهٔ ([\d۰-۹٠-٩,]+) از ([\d۰-۹٠-٩,]+)\.$/i
    );
    if (partiallyTranslatedTableSummary) {
      return value.replace(
        trimmed,
        `این جدول ${toPersianDigits(partiallyTranslatedTableSummary[1])} ردیف از ${toPersianDigits(
          partiallyTranslatedTableSummary[2]
        )} ردیف را نشان می‌دهد؛ صفحهٔ ${toPersianDigits(
          partiallyTranslatedTableSummary[3]
        )} از ${toPersianDigits(partiallyTranslatedTableSummary[4])}.`
      );
    }

    const dashboardPanel = normalized.match(/^Dashboard panel(?::\s*(.+))?$/);
    if (dashboardPanel) {
      const title = dashboardPanel[1] ? translateKnownText(dashboardPanel[1]) : '';
      return value.replace(trimmed, title ? `پنل داشبورد: ${title}` : 'پنل داشبورد');
    }

    const panelOptions = normalized.match(/^Panel options(?: for (.+))?$/);
    if (panelOptions) {
      const title = panelOptions[1] ? translateKnownText(panelOptions[1]) : '';
      return value.replace(trimmed, title ? `گزینه‌های پنل ${title}` : 'گزینه‌های پنل');
    }

    const chartCell = normalized.match(/^Row:\s*(\d+),\s*Column:\s*(\d+):$/);
    if (chartCell) {
      return value.replace(
        trimmed,
        `ردیف ${toPersianDigits(chartCell[1])}، ستون ${toPersianDigits(chartCell[2])}:`
      );
    }

    const pleaseSelect = normalized.match(/^Please select the (.+)\.$/);
    if (pleaseSelect) {
      return value.replace(
        trimmed,
        `لطفاً ${translateRegisterAgentFieldList(pleaseSelect[1])} را انتخاب کنید.`
      );
    }

    const fieldsWithErrors = normalized.match(
      /^There are fields with errors\. Please verify them: (.+)\.$/
    );
    if (fieldsWithErrors) {
      return value.replace(
        trimmed,
        `برخی فیلدها خطا دارند. لطفاً بررسی کنید: ${translateRegisterAgentFieldList(
          fieldsWithErrors[1]
        )}.`
      );
    }

    const entityWithCount = normalized.match(
      /^(Agents|Groups|Rules|Decoders|CDB Lists|Reports|Report definitions|Channels|Monitors|Alerts|Detectors|Triggers|Actions|Recipient groups|SMTP senders|SES senders)\s+\(([\d,]+)\)$/
    );
    if (entityWithCount) {
      const labels = {
        Agents: ' رابط‌های سرور',
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
        Actions: 'عملیات',
        'Recipient groups': 'گروه‌های گیرندگان',
        'SMTP senders': 'فرستنده‌های SMTP',
        'SES senders': 'فرستنده‌های SES',
      };

      return value.replace(
        trimmed,
        `${labels[entityWithCount[1]]} (${toPersianDigits(entityWithCount[2])})`
      );
    }

    const leadingCountEntity = normalized.match(
      /^\(([\d,]+)\)\s+(Report definitions|Channels|Monitors|Alerts|Detectors|Reports|Actions|Recipient groups|SMTP senders|SES senders)$/
    );
    if (leadingCountEntity) {
      const labels = {
        'Report definitions': 'تعریف‌های گزارش',
        Channels: 'کانال‌ها',
        Monitors: 'پایشگرها',
        Alerts: 'هشدارها',
        Detectors: 'آشکارسازها',
        Reports: 'گزارش‌ها',
        Actions: 'عملیات',
        'Recipient groups': 'گروه‌های گیرندگان',
        'SMTP senders': 'فرستنده‌های SMTP',
        'SES senders': 'فرستنده‌های SES',
      };

      return value.replace(
        trimmed,
        `${labels[leadingCountEntity[2]]} (${toPersianDigits(leadingCountEntity[1])})`
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
        `${HEALTH_LOG_TYPE_LABELS[healthLog[1]]}: ${translateHealthCheckLogMessage(healthLog[2])}`
      );
    }

    const translatedHealthMessage = translateHealthCheckLogMessage(normalized);
    if (translatedHealthMessage !== normalized) {
      return value.replace(trimmed, translatedHealthMessage);
    }

    return value;
  }

  function translateRequestedTerminology(value) {
    if (typeof value !== 'string') return value;

    return value
      .replace(/^(?:_source|source_)$/i, 'منبع')
      .replace(/\bindex patterns\b/gi, 'الگوهای ایندکس')
      .replace(/\bindex pattern\b/gi, 'الگوی ایندکس')
      .replace(/OpenSearch Dashboards Query Language/gi, 'زبان پرس‌وجوی داشبورد Ayyza')
      .replace(/OpenSearch Dashboards/gi, 'داشبورد Ayyza')
      .replace(/Agentهای/gi, 'عامل‌های')
      .replace(/Agentها/gi, 'عامل‌ها')
      .replace(/Agentی/gi, 'عاملی')
      .replace(/\bAgents\b/gi, 'عامل‌ها')
      .replace(/\bAgent\b/gi, 'عامل')
      .replace(/APIهای/gi, 'رابط‌های سرور')
      .replace(/\bAPIs\b/gi, 'رابط‌های سرور')
      .replace(/\bAPI\b/gi, 'رابط سرور')
      .replace(/امنیت Endpoint/gi, 'امنیت نقطه پایانی')
      .replace(/Endpointهای/gi, 'امنیت پایانه')
      .replace(/Endpointها/gi, 'امنیت پایانه')
      .replace(/\bEndpoints\b/gi, 'امنیت پایانه')
      .replace(/\bEndpoint\b/gi, 'امنیت نقطه پایانی')
      .replace(/\binstances\b/gi, 'نمونه‌ها')
      .replace(/\binstance\b/gi, 'نمونه');
  }

  const TRANSLATION_CACHE_LIMIT = 2048;
  const TRANSLATION_CACHE = new Map();

  function replaceResidualUiTerms(value) {
    if (!/[\u0600-\u06ff]/.test(value)) {
      return value;
    }

    return value
      .replace(
        /این جدول ([\d۰-۹٠-٩,]+) rows out of ([\d۰-۹٠-٩,]+) ردیف دارد؛ صفحهٔ ([\d۰-۹٠-٩,]+) از ([\d۰-۹٠-٩,]+)\./gi,
        (_match, shown, total, page, pages) =>
          `این جدول ${toPersianDigits(shown)} ردیف از ${toPersianDigits(
            total
          )} ردیف را نشان می‌دهد؛ صفحهٔ ${toPersianDigits(page)} از ${toPersianDigits(pages)}.`
      )
      .replace(/«([^\n»]+)'/g, '«$1»')
      .replace(/سازنده(?:ٔ)? سری زمانی\s+سازنده(?:ٔ)? سری زمانی/g, 'سازندهٔ سری زمانی')
      .replace(/maps-داشبوردها/gi, 'نقشه‌ها')
      .replace(/Define امنیت پایانه by/gi, 'روش تعریف پایانه')
      .replace(/\bAyyza\b/gi, 'آیزا')
      .replace(/\bzoom\b/gi, 'بزرگ‌نمایی')
      .replace(/\bTab\b/g, 'جهش')
      .replace(/\bminutes?\b/gi, 'دقیقه')
      .replace(/\bWindows\b/gi, 'ویندوز')
      .replace(/\bMarkdown\b/gi, 'نشانه‌گذاری')
      .replace(/\bHandlebars?\b/gi, 'الگوی قلاب‌دسته‌ای')
      .replace(/\bGantt Chart\b/gi, 'نمودار گانت')
      .replace(/\bdashboards\b/gi, 'داشبوردها')
      .replace(/\bmonitoring\b/gi, 'پایش')
      .replace(/\bsyslog\b/gi, 'ثبت رویداد سامانه')
      .replace(/\bSCAP\b/g, 'پروتکل خودکارسازی محتوای امنیتی')
      .replace(/\bCIS\b/g, 'مرکز امنیت اینترنت')
      .replace(/\bTenants?\b/gi, 'مستأجرها')
      .replace(/\bNetwork\b/gi, 'شبکه')
      .replace(/\bDisable cache\b/gi, 'غیرفعال‌کردن حافظهٔ نهان')
      .replace(/\bF12\b/g, 'کلید تابعی ۱۲')
      .replace(/\bF5\b/g, 'کلید تابعی ۵')
      .replace(/Random Cut Forest(?:\s+یا\s+RCF)?/g, 'جنگل برش تصادفی')
      .replace(/\bRCF\b/g, 'جنگل برش تصادفی')
      .replace(/\bCPU\b/g, 'پردازنده')
      .replace(/\bHTTP\b/g, 'وب')
      .replace(/\bJVM\b/g, 'ماشین مجازی جاوا')
    .replace(/\bOpenSearch\b/g, 'Ayyza')
    .replace(/\bBuckets?\b/gi, 'باکت')
    .replace(/\bwildcards?\b/gi, 'نویسهٔ عام')
    .replace(/\bcache\b/gi, 'حافظهٔ نهان')
    .replace(/\bManager\b/g, 'مدیر')
    .replace(/\bBackend\b/g, 'سامانهٔ پشتیبان')
    .replace(/\bLogs?\b/g, 'گزارش')
    .replace(/\bAzure\b/g, 'آژور')
    .replace(/\bOffice\s*365\b/gi, 'آفیس ۳۶۵')
    .replace(/\bSMTP\b/g, 'پروتکل انتقال ایمیل')
    .replace(/\bSES\b/g, 'سرویس ایمیل ساده')
    .replace(/\bARN\b/g, 'شناسهٔ منبع')
    .replace(/\bAWS\b/g, 'خدمات وب آمازون')
    .replace(/\bIP\b/g, 'آی‌پی')
    .replace(/\bChecksum\b/gi, 'مقدار وارسی')
    .replace(/\bFIM\b/g, 'پایش یکپارچگی فایل')
    .replace(/\bSCA\b/g, 'ارزیابی پیکربندی امنیتی')
    .replace(/\bPCI\s+DSS\b/g, 'استاندارد امنیت دادهٔ صنعت پرداخت')
    .replace(/\bGDPR\b/g, 'مقررات عمومی حفاظت از داده')
    .replace(/\bHIPAA\b/g, 'قانون حفاظت از اطلاعات سلامت')
    .replace(/\bNIST(?:\s+800-53)?\b/g, 'مؤسسهٔ ملی استانداردها')
    .replace(/\bTSC\b/g, 'معیارهای خدمات اعتماد')
    .replace(/\bCDB\b/g, 'پایگاه دادهٔ ثابت')
    .replace(/\bVega-Lite\b/g, 'وگای سبک')
    .replace(/\bVega\b/g, 'وگا')
    .replace(/\bHJSON\b/g, 'اچ‌جیسون')
    .replace(/\bJSON\b/g, 'جیسون')
    .replace(/\bTMS\b/g, 'سرویس نقشهٔ کاشی')
    .replace(/\bWMS\b/g, 'سرویس نقشهٔ وب')
    .replace(/\bCRS\b/g, 'سامانهٔ مرجع مختصات')
    .replace(/\bURL\b/g, 'نشانی')
    .replace(/\bSQL\b/g, 'اس‌کیوال')
    .replace(/\bPPL\b/g, 'زبان پردازش لوله‌ای')
    .replace(/\bDQL\b/g, 'زبان پرس‌وجوی داشبورد')
    .replace(/\bLucene\b/g, 'لوسین')
    .replace(/\bTSVB\b/g, 'سازندهٔ سری زمانی')
    .replace(/\bSLA\b/g, 'توافق سطح خدمات')
    .replace(/\bGA\b/g, 'انتشار عمومی')
      .replace(/\bDSL\b/g, 'زبان پرس‌وجو')
      .replace(/\bAPI\b/g, 'رابط برنامه‌نویسی')
      .replace(/\bLocal\b/g, 'محلی')
      .replace(/\bEscape\b/g, 'گریز')
      .replace(/\bEnter\b/g, 'ورود')
      .replace(/MITRE ATT&CKS?/g, 'چارچوب حملهٔ میتر')
      .replace(/Logها/g, 'گزارش‌ها')
      .replace(/\bSlack\b/g, 'اسلک')
      .replace(/\bGitHub\b|\bGithub\b/g, 'گیت‌هاب')
      .replace(/\bGoogle\b/g, 'گوگل')
      .replace(/\bYARA\b|\bYara\b/g, 'یارا')
      .replace(/\bRootcheck\b/gi, 'بررسی ریشه')
      .replace(/\bWebhook\b/gi, 'نشانی دریافت رویداد')
      .replace(/\bVirusTotal\b/g, 'ویروس‌توتال')
      .replace(/\bPagerDuty\b/g, 'پیجردیوتی')
    .replace(/\bDocker\b/g, 'داکر')
      .replace(/\bAgent\b/g, 'عامل')
      .replace(/\bdate\b/gi, 'تاریخ');
  }

  function translateKnownText(value) {
    if (typeof value !== 'string' || value.length > 4096) {
      return value;
    }

    if (TRANSLATION_CACHE.has(value)) {
      return TRANSLATION_CACHE.get(value);
    }

    const translated = replaceResidualUiTerms(
      translateRequestedTerminology(translateKnownTextBase(value))
    );
    if (TRANSLATION_CACHE.size >= TRANSLATION_CACHE_LIMIT) {
      TRANSLATION_CACHE.delete(TRANSLATION_CACHE.keys().next().value);
    }
    TRANSLATION_CACHE.set(value, translated);
    return translated;
  }

  // <ayyza-unified-deep-chart-runtime>
// Generated from ayyza-rtl/runtime/deep-chart-runtime.js. Do not edit this block.
/*
 * This file is injected verbatim into both the core bootstrap and the RTL
 * plugin by scripts/sync-runtime-catalog.mjs. Keep it free of imports/exports.
 */

const DEEP_CHART_ROOT_SELECTOR = [
  '.ayyza-visualization-chart',
  '.echChart',
  '.echChartBackground',
  '.echarts-for-react',
  '[class*="echarts"]',
  '.elastic-charts',
  '.echChart',
  '.js-plotly-plot',
  '.plot-container',
  '.svg-container',
  'svg.main-svg',
  '.visChart',
  '.visualization',
  '.vislib-chart',
  '.flot-base',
  '.flot-overlay',
  '.flot-text',
  '.flot-tick-label',
  '.tvbVis',
  '.tvbChart',
  '.vega-vis',
  '.vgaVis',
  '.vga-vis',
  '.highcharts-container',
  '.chart',
  '.chart-container',
  '[data-test-subj*="chart"]',
  '[data-test-subj*="visualization"]',
  '[data-wz-rtl-chart]',
  '[data-chart-type]',
  'canvas',
].join(',');

const DEEP_CHART_OVERLAY_SELECTOR = [
  '[role="tooltip"]',
  '.euiToolTipPopover',
  '.ouiToolTipPopover',
  '.visTooltip',
  '.wz-chart-tooltip',
  '.echTooltip',
  '.echarts-tooltip',
  '.vg-tooltip',
  '.plotly-notifier',
  '.hoverlayer',
  '.modebar',
  '.highcharts-tooltip',
  '.highcharts-contextmenu',
  '.leaflet-tooltip',
  '.mapTooltip',
  '.chartTooltip',
  '[role="menu"]',
  '[role="listbox"]',
  '.euiPopover__panel',
  '.ouiPopover__panel',
  '.euiContextMenuPanel',
  '.ouiContextMenuPanel',
  '.euiComboBoxOptionsList',
  '.ouiComboBoxOptionsList',
  '.euiSelectableList',
  '.ouiSelectableList',
  '.euiFlyout',
  '.ouiFlyout',
].join(',');

const DEEP_TRANSLATABLE_ATTRIBUTES = [
  'aria-label',
  'aria-description',
  'aria-valuetext',
  'title',
  'data-title',
  'data-label',
  'data-tooltip',
  'data-original-title',
  'data-unformatted',
  'alt',
];

const CHART_AGGREGATION_LABELS = new Map(
  Object.entries({
    avg: 'میانگین',
    average: 'میانگین',
    cardinality: 'تعداد یکتا',
    count: 'تعداد',
    max: 'بیشینه',
    maximum: 'بیشینه',
    median: 'میانه',
    min: 'کمینه',
    minimum: 'کمینه',
    percentile: 'صدک',
    percentiles: 'صدک‌ها',
    rate: 'نرخ',
    std_deviation: 'انحراف معیار',
    sum: 'مجموع',
    value_count: 'تعداد مقادیر',
    variance: 'واریانس',
  })
);

const CHART_FIELD_LABELS = new Map(
  Object.entries({
    '@timestamp': 'زمان',
    timestamp: 'زمان',
    time: 'زمان',
    date: 'تاریخ',
    feature_output: 'خروجی ویژگی',
    featureoutput: 'خروجی ویژگی',
    expected_value: 'مقدار مورد انتظار',
    expectedvalue: 'مقدار مورد انتظار',
    anomaly_grade: 'درجهٔ ناهنجاری',
    anomalygrade: 'درجهٔ ناهنجاری',
    confidence: 'اطمینان',
    cpu_usage: 'مصرف پردازنده',
    cpu_usage_percentage: 'درصد مصرف پردازنده',
    memory_usage: 'مصرف حافظه',
    memory_usage_percentage: 'درصد مصرف حافظه',
    http_4xx: 'پاسخ‌های HTTP سری 4xx',
    http_5xx: 'پاسخ‌های HTTP سری 5xx',
    records: 'رخدادها',
    documents: 'اسناد',
    doc_count: 'تعداد اسناد',
    _count: 'تعداد',
    'rule.level': 'سطح قانون',
    'rule.id': 'شناسه قانون',
    'rule.description': 'توضیح قانون',
    'rule.groups': 'گروه‌های قانون',
    'rule.group': 'گروه قانون',
    'rule.mitre.tactic': 'تاکتیک MITRE',
    'rule.mitre.technique': 'تکنیک MITRE',
    'agent.name': 'نام عامل',
    'agent.id': 'شناسه عامل',
    'agent.ip': 'نشانی IP عامل',
    'عامل.name': 'نام عامل',
    'عامل.id': 'شناسه عامل',
    'عامل.ip': 'نشانی IP عامل',
    'manager.name': 'نام مدیر',
    'host.name': 'نام میزبان',
    'host.os.name': 'نام سیستم‌عامل میزبان',
    'user.name': 'نام کاربر',
    'source.ip': 'نشانی IP مبدأ',
    'destination.ip': 'نشانی IP مقصد',
    'data.srcip': 'نشانی IP مبدأ',
    'data.dstip': 'نشانی IP مقصد',
    'event.action': 'عملیات رخداد',
    'event.category': 'دستهٔ رخداد',
    'event.module': 'ماژول رخداد',
    'event.outcome': 'نتیجهٔ رخداد',
    'geo.country_name': 'نام کشور',
    severity: 'شدت',
    status: 'وضعیت',
    risk_score: 'امتیاز ریسک',
    response_code: 'کد پاسخ',
    'source ports': 'درگاه‌های مبدأ',
    'destination ports': 'درگاه‌های مقصد',
    users: 'کاربران',
    requirements: 'الزامات',
    'alerts number': 'تعداد هشدارها',
    'alert level': 'سطح هشدار',
    'found documents': 'اسناد یافت‌شده',
    bytes: 'بایت',
    duration: 'مدت',
  })
);

const CHART_WEEKDAY_LABELS = new Map(
  Object.entries({
    Sunday: 'یکشنبه',
    Sun: 'یکشنبه',
    Su: 'یکشنبه',
    Monday: 'دوشنبه',
    Mon: 'دوشنبه',
    Mo: 'دوشنبه',
    Tuesday: 'سه‌شنبه',
    Tue: 'سه‌شنبه',
    Tues: 'سه‌شنبه',
    Tu: 'سه‌شنبه',
    Wednesday: 'چهارشنبه',
    Wed: 'چهارشنبه',
    We: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Thu: 'پنجشنبه',
    Thur: 'پنجشنبه',
    Thurs: 'پنجشنبه',
    Th: 'پنجشنبه',
    Friday: 'جمعه',
    Fri: 'جمعه',
    Fr: 'جمعه',
    Saturday: 'شنبه',
    Sat: 'شنبه',
    Sa: 'شنبه',
  })
);

const CHART_EMBEDDED_VALUE_LABELS = new Map(
  Object.entries({
    'Resource Development': 'توسعهٔ منابع',
    'Privilege Escalation': 'ارتقای دسترسی',
    'Command and Control': 'فرماندهی و کنترل',
    'Credential Access': 'دسترسی به اعتبارنامه',
    'Lateral Movement': 'حرکت جانبی',
    'Defense Evasion': 'دور زدن دفاع',
    Reconnaissance: 'شناسایی',
    'Initial Access': 'دسترسی اولیه',
    Exfiltration: 'استخراج داده',
    Persistence: 'ماندگاری',
    Collection: 'جمع‌آوری',
    Discovery: 'کشف',
    Execution: 'اجرا',
    Impact: 'اثرگذاری',
    Ascending: 'صعودی',
    Descending: 'نزولی',
  })
);

const PERSIAN_CHART_YEAR_FORMATTER =
  typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null;

const PERSIAN_CHART_MONTH_FORMATTER =
  typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        timeZone: 'UTC',
      })
    : null;

function translateChartAggregation(value) {
  return CHART_AGGREGATION_LABELS.get(String(value).trim().toLowerCase()) || value;
}

function translateChartMetricIdentifier(value) {
  const normalized = String(value).trim();
  const direct = CHART_FIELD_LABELS.get(normalized.toLowerCase());
  if (direct) return direct;

  const metric = normalized.match(
    /^(avg|average|cardinality|count|max|maximum|median|min|minimum|percentile|percentiles|rate|std_deviation|sum|value_count|variance)_(.+)$/i
  );
  if (!metric) return value;

  const field = CHART_FIELD_LABELS.get(metric[2].toLowerCase());
  if (!field) return value;
  return `${translateChartAggregation(metric[1])} ${field}`;
}

function translateChartField(value) {
  const normalized = String(value).trim();
  return CHART_FIELD_LABELS.get(normalized.toLowerCase()) || translateChartMetricIdentifier(normalized);
}

function translateChartAggregationPhrase(value) {
  const normalized = String(value).trim();
  const phrase = normalized.match(
    /^(Average|Avg|Cardinality|Count|Maximum|Max|Median|Minimum|Min|Percentile|Percentiles|Rate|Standard deviation|Sum|Unique count|Value count|Variance)(?:\s+of)?\s+(.+)$/i
  );
  if (!phrase) return value;

  const aliases = {
    avg: 'average',
    'standard deviation': 'std_deviation',
    'unique count': 'cardinality',
    'value count': 'value_count',
  };
  const aggregationKey = phrase[1].toLowerCase();
  const field = translateChartField(phrase[2]);
  return `${translateChartAggregation(aliases[aggregationKey] || aggregationKey)} ${field}`;
}

function inferDeepChartYear(monthIndex, day) {
  const now = new Date();
  let year = now.getUTCFullYear();
  const candidate = createUtcDate(year, monthIndex, day);
  if (candidate && candidate.getTime() - now.getTime() > 45 * 86400000) year -= 1;
  return year;
}

function translateDeepChartDate(value) {
  const monthNames = Object.keys(ENGLISH_MONTH_INDEX)
    .sort((left, right) => right.length - left.length)
    .join('|');
  let translated = value;

  const resolveEnglishMonth = (monthName) =>
    Object.keys(ENGLISH_MONTH_INDEX).find(
      (name) => name.toLowerCase() === String(monthName).toLowerCase()
    );
  const normalizeChartClock = (time, meridiem) => {
    if (!time) return '';
    const parts = String(time).split(':');
    let hour = Number(parts[0]);
    if (meridiem?.toUpperCase() === 'PM' && hour < 12) hour += 12;
    if (meridiem?.toUpperCase() === 'AM' && hour === 12) hour = 0;
    parts[0] = String(hour).padStart(2, '0');
    return parts.join(':');
  };
  const formatChartDate = (year, monthIndex, day, time, meridiem) => {
    const date = createUtcDate(Number(year), Number(monthIndex), Number(day));
    if (!date) return null;
    const clock = normalizeChartClock(time, meridiem);
    return `${formatPersianDate(date)}${clock ? ` ساعت ${clock}` : ''}`;
  };

  // Full textual dates that appear in chart tooltips and accessibility tables.
  // These patterns deliberately run before the abbreviated year-less tick
  // pattern below so `Jul 20 2026` is converted as one date.
  translated = translated.replace(
    new RegExp(
      `\\b(${monthNames})\\s+([0-9]{1,2})[،, ]+([12][0-9]{3})(?:\\s+(?:@\\s*)?([0-9]{1,2}:[0-9]{2}(?::[0-9]{2})?(?:\\.[0-9]+)?)\\s*(AM|PM)?)?`,
      'gi'
    ),
    (match, monthName, day, year, time, meridiem) => {
      const canonicalMonth = resolveEnglishMonth(monthName);
      return canonicalMonth
        ? formatChartDate(year, ENGLISH_MONTH_INDEX[canonicalMonth], day, time, meridiem) || match
        : match;
    }
  );
  translated = translated.replace(
    new RegExp(
      `\\b([0-9]{1,2})\\s+(${monthNames})[،, ]+([12][0-9]{3})(?:\\s+([0-9]{1,2}:[0-9]{2}(?::[0-9]{2})?)\\s*(AM|PM)?)?`,
      'gi'
    ),
    (match, day, monthName, year, time, meridiem) => {
      const canonicalMonth = resolveEnglishMonth(monthName);
      return canonicalMonth
        ? formatChartDate(year, ENGLISH_MONTH_INDEX[canonicalMonth], day, time, meridiem) || match
        : match;
    }
  );

  // Numeric date-axis variants without a year use the same recent-year rule.
  translated = translated.replace(
    /(^|[^0-9])([01]?[0-9])[/\-]([0-3]?[0-9])(?:\s+([0-9]{1,2}:[0-9]{2}(?::[0-9]{2})?)\s*(AM|PM)?)?(?![/\-][0-9])/gi,
    (match, prefix, month, day, time, meridiem) => {
      const monthIndex = Number(month) - 1;
      if (monthIndex < 0 || monthIndex > 11 || Number(day) < 1 || Number(day) > 31) return match;
      const formatted = formatChartDate(
        inferDeepChartYear(monthIndex, Number(day)),
        monthIndex,
        day,
        time,
        meridiem
      );
      return formatted ? `${prefix}${formatted}` : match;
    }
  );

  // Plotly/D3 compact ticks often omit the year: `Jul 20`, `Jul 20 14:00`,
  // `07-20` and `07-20 14:00`. Use the same recent-year rule as the main date
  // translator and always display a true Persian-calendar date.
  translated = translated.replace(
    new RegExp(
      `\\b(${monthNames})\\s+([0-9]{1,2})(?![0-9,])(?:[, ]+([0-9]{1,2}:[0-9]{2}(?::[0-9]{2})?)\\s*(AM|PM)?)?`,
      'gi'
    ),
    (match, monthName, day, time, meridiem) => {
      const canonicalMonth = resolveEnglishMonth(monthName);
      if (!canonicalMonth) return match;
      const monthIndex = ENGLISH_MONTH_INDEX[canonicalMonth];
      const date = createUtcDate(inferDeepChartYear(monthIndex, Number(day)), monthIndex, Number(day));
      if (!date) return match;
      const clock = normalizeChartClock(time, meridiem);
      return `${formatPersianDate(date)}${clock ? ` ساعت ${clock}` : ''}`;
    }
  );

  translated = translated.replace(
    /(^|[^0-9])([01][0-9])-([0-3][0-9])(?![-0-9])/g,
    (match, prefix, month, day) => {
      const monthIndex = Number(month) - 1;
      const date = createUtcDate(inferDeepChartYear(monthIndex, Number(day)), monthIndex, Number(day));
      return date ? `${prefix}${formatPersianDate(date)}` : match;
    }
  );

  // Month-only and year-only date-axis ticks otherwise leak Gregorian labels.
  translated = translated.replace(
    new RegExp(`\\b(${monthNames})\\s+([12][0-9]{3})\\b`, 'gi'),
    (match, monthName, year) => {
      const canonicalMonth = resolveEnglishMonth(monthName);
      if (!canonicalMonth || !PERSIAN_CHART_MONTH_FORMATTER) return match;
      const date = createUtcDate(Number(year), ENGLISH_MONTH_INDEX[canonicalMonth], 15);
      return date ? PERSIAN_CHART_MONTH_FORMATTER.format(date) : match;
    }
  );
  translated = translated.replace(/^([12][0-9]{3})$/, (match, year) => {
    if (!PERSIAN_CHART_YEAR_FORMATTER) return match;
    const date = createUtcDate(Number(year), 6, 1);
    return date ? PERSIAN_CHART_YEAR_FORMATTER.format(date) : match;
  });

  const weekdayPattern = Array.from(CHART_WEEKDAY_LABELS.keys())
    .sort((left, right) => right.length - left.length)
    .join('|');
  translated = translated.replace(new RegExp(`\\b(${weekdayPattern})\\b`, 'gi'), (match) => {
    const canonical = Array.from(CHART_WEEKDAY_LABELS.keys()).find(
      (name) => name.toLowerCase() === match.toLowerCase()
    );
    return canonical ? CHART_WEEKDAY_LABELS.get(canonical) : match;
  });

  return translated;
}

function translateChartText(value) {
  if (typeof value !== 'string' || !value.trim()) return value;

  const leading = value.match(/^\s*/)?.[0] || '';
  const trailing = value.match(/\s*$/)?.[0] || '';
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (/^learn more(?:\.|\s+.*)?$/i.test(normalized)) return '';
  const originalMetric = translateChartMetricIdentifier(normalized);
  const originalAggregationPhrase = translateChartAggregationPhrase(normalized);
  const originalTopValues = normalized.match(/^Top\s+([0-9]+)\s+(?:values?\s+of\s+)?(.+)$/i);
  const originalDateHistogram = normalized.match(/^(?:Date histogram|Histogram)\s+of\s+(.+)$/i);
  const originalTimeInterval = normalized.match(
    /^(.+?)\s+(?:per|در هر)\s+([0-9۰-۹٠-٩]+)\s+(seconds?|minutes?|hours?|days?|weeks?|months?|years?|ثانیه|دقیقه|ساعت|روز|هفته|ماه|سال)$/i
  );
  const originalSortLabel = normalized.match(/^(.+?):\s*(Ascending|Descending|صعودی|نزولی)$/i);
  let translated = translateKnownText(normalized);

  if (originalMetric !== normalized) translated = originalMetric;
  if (originalAggregationPhrase !== normalized) translated = originalAggregationPhrase;
  if (originalTopValues && /\bTop\b/i.test(translated)) {
    translated = `${toPersianDigits(originalTopValues[1])} مقدار برتر ${translateChartField(
      originalTopValues[2]
    )}`;
  }
  if (originalDateHistogram) {
    translated = `نمودار زمانی ${translateChartField(originalDateHistogram[1])}`;
  }
  if (originalTimeInterval) {
    const unitKey = originalTimeInterval[3].toLowerCase().replace(/s$/, '');
    const units = {
      second: 'ثانیه',
      minute: 'دقیقه',
      hour: 'ساعت',
      day: 'روز',
      week: 'هفته',
      month: 'ماه',
      year: 'سال',
      ثانیه: 'ثانیه',
      دقیقه: 'دقیقه',
      ساعت: 'ساعت',
      روز: 'روز',
      هفته: 'هفته',
      ماه: 'ماه',
      سال: 'سال',
    };
    translated = `${translateChartField(originalTimeInterval[1])} در هر ${toPersianDigits(
      toLatinDigits(originalTimeInterval[2])
    )} ${units[unitKey]}`;
  }
  if (originalSortLabel) {
    translated = `${translateChartField(originalSortLabel[1])}: ${
      ['ascending', 'صعودی'].includes(originalSortLabel[2].toLowerCase()) ? 'صعودی' : 'نزولی'
    }`;
  }

  const aggregationLine = translated.match(
    /^(?:Aggregation method|روش تجمیع)\s*:\s*([A-Za-z_]+)$/i
  );
  if (aggregationLine) {
    translated = `روش تجمیع: ${translateChartAggregation(aggregationLine[1])}`;
  }

  const embeddedLabels = [
    [/\bField\s+value\s*/gi, 'مقدار فیلد '],
    [/\bField\s*:\s*/gi, 'فیلد: '],
    [/\bState\s*:\s*/gi, 'وضعیت: '],
    [/\bValue\s*:\s*/gi, 'مقدار: '],
    [/\bCount\s*:\s*/gi, 'تعداد: '],
    [/\bDate\s*:\s*/gi, 'تاریخ: '],
    [/\bTime\s*:\s*/gi, 'زمان: '],
    [/\bSeries\s*:\s*/gi, 'سری: '],
    [/\bCategory\s*:\s*/gi, 'دسته: '],
    [/\bMetric\s*:\s*/gi, 'سنجه: '],
    [/\bRow\s*:\s*/gi, 'ردیف: '],
    [/\bColumn\s*:\s*/gi, 'ستون: '],
  ];
  for (const [pattern, replacement] of embeddedLabels) {
    translated = translated.replace(pattern, replacement);
  }

  // Accessibility tooltips often concatenate a translated label with the raw
  // OpenSearch field identifier (for example `field value agent.name`).  Keep
  // those identifiers available to queries, but localize their presentation
  // wherever they appear inside a chart label, tooltip or ARIA description.
  for (const [field, label] of CHART_FIELD_LABELS) {
    if (!/[.@_]/.test(field)) continue;
    const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    translated = translated.replace(
      new RegExp(`(^|[^\\p{L}\\p{N}_@.])${escapedField}(?=$|[^\\p{L}\\p{N}_.])`, 'giu'),
      (match, prefix) => `${prefix}${label}`
    );
  }

  for (const [chartValue, label] of CHART_EMBEDDED_VALUE_LABELS) {
    const escapedValue = chartValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    translated = translated.replace(new RegExp(`\\b${escapedValue}\\b`, 'gi'), label);
  }

  const embeddedChartTerms = [
    [/\bRule level detected\b/gi, 'سطح قانون شناسایی‌شده'],
    [/\bAnomaly grade\s*\/\s*Confidence\b/gi, 'درجهٔ ناهنجاری / اطمینان'],
    [/\bExpected Value\b/gi, 'مقدار مورد انتظار'],
    [/\bActual Value\b/gi, 'مقدار واقعی'],
    [/\bFeature output\b/gi, 'خروجی ویژگی'],
    [/\bAnomaly grade\b/gi, 'درجهٔ ناهنجاری'],
    [/\bConfidence\b/gi, 'اطمینان'],
    [/\bAggregation method\b/gi, 'روش تجمیع'],
    [/\bDetector interval\b/gi, 'بازهٔ آشکارساز'],
  ];
  for (const [pattern, replacement] of embeddedChartTerms) {
    translated = translated.replace(pattern, replacement);
  }

  translated = translateDeepChartDate(translateDisplayDate(translated))
    .replace(/([0-9۰-۹٠-٩])\s*AM\b/gi, '$1 ق.ظ')
    .replace(/([0-9۰-۹٠-٩])\s*PM\b/gi, '$1 ب.ظ')
    .replace(/(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنجشنبه|جمعه|شنبه),/g, '$1،');

  // Numeric ticks are presentation values, not machine-readable form values.
  translated = toPersianDigits(translated);
  return `${leading}${translated}${trailing}`;
}

function translateDeepAttributes(root) {
  const selector = DEEP_TRANSLATABLE_ATTRIBUTES.map((name) => `[${name}]`).join(',');
  queryAllIncludingRoot(root, selector).forEach((node) => {
    DEEP_TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
      const value = node.getAttribute(attribute);
      if (!value) return;
      const translated = translateChartText(value);
      if (translated !== value) node.setAttribute(attribute, translated);
    });
  });
}

function translateDeepTextNodes(root) {
  const ownerDocument = root.ownerDocument || (root.nodeType === 9 ? root : document);
  const nodeFilter = ownerDocument.defaultView?.NodeFilter || NodeFilter;
  const walker = ownerDocument.createTreeWalker(root, nodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue?.trim()) return nodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest('script, style, code, pre, textarea, input')) {
        return nodeFilter.FILTER_REJECT;
      }
      return nodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const translated = translateChartText(node.nodeValue);
    if (translated !== node.nodeValue) node.nodeValue = translated;
  });
}

function isInsideChartSurface(node) {
  return Boolean(
    node?.nodeType === 1 &&
      (node.matches(DEEP_CHART_ROOT_SELECTOR) ||
        node.closest(DEEP_CHART_ROOT_SELECTOR) ||
        node.matches(DEEP_CHART_OVERLAY_SELECTOR) ||
        node.closest(DEEP_CHART_OVERLAY_SELECTOR))
  );
}

function localizeDeepChartSurfaces(root = document) {
  const surfaces = new Set();
  if (
    root?.nodeType === 1 &&
    (root.matches(DEEP_CHART_ROOT_SELECTOR) || root.matches(DEEP_CHART_OVERLAY_SELECTOR))
  ) {
    surfaces.add(root);
  }
  if (root?.nodeType === 1 && isInsideChartSurface(root)) {
    surfaces.add(root);
  }
  queryAllIncludingRoot(root, DEEP_CHART_ROOT_SELECTOR).forEach((node) => surfaces.add(node));
  queryAllIncludingRoot(root, DEEP_CHART_OVERLAY_SELECTOR).forEach((node) => surfaces.add(node));

  // Axis names, ticks, legends, annotations and accessibility descriptions are
  // usually SVG even when the data layer itself is Canvas/WebGL.
  queryAllIncludingRoot(root, 'svg').forEach((svg) => {
    if (isInsideChartSurface(svg) || svg.querySelector('text, title, desc')) surfaces.add(svg);
  });

  surfaces.forEach((surface) => {
    translateDeepTextNodes(surface);
    translateDeepAttributes(surface);
  });

  // Plotly modebar help is stored in data-title and may live outside the SVG.
  queryAllIncludingRoot(
    root,
    '.modebar-btn[data-title], [role="tooltip"], [data-tooltip], [aria-valuetext]'
  ).forEach((node) => translateDeepAttributes(node));
}

const DEEP_ROOT_OBSERVERS = new WeakMap();
const DEEP_IFRAME_LOAD_HANDLERS = new WeakSet();
const DEEP_PENDING_SCAN_ROOTS = new Set();
let deepScanFrame;

function queueDeepTranslationScan(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return;
  DEEP_PENDING_SCAN_ROOTS.add(root);
  if (deepScanFrame !== undefined) return;

  const schedule =
    typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame
      : (callback) => setTimeout(callback, 0);
  deepScanFrame = schedule(() => {
    deepScanFrame = undefined;
    const roots = Array.from(DEEP_PENDING_SCAN_ROOTS);
    DEEP_PENDING_SCAN_ROOTS.clear();
    roots.forEach((pendingRoot) => scanAyyzaRtl(pendingRoot));
    roots.forEach((pendingRoot) => DEEP_ROOT_OBSERVERS.get(pendingRoot)?.takeRecords());
  });
}

function observeDeepTranslationRoot(root) {
  if (
    !root ||
    typeof MutationObserver === 'undefined' ||
    typeof root.querySelectorAll !== 'function' ||
    DEEP_ROOT_OBSERVERS.has(root)
  ) {
    return;
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        queueDeepTranslationScan(mutation.target.parentNode || root);
        continue;
      }
      if (mutation.type === 'attributes') {
        queueDeepTranslationScan(mutation.target);
        continue;
      }
      mutation.addedNodes.forEach((node) => {
        queueDeepTranslationScan(
          typeof node.querySelectorAll === 'function' ? node : node.parentNode || root
        );
      });
    }
  });
  try {
    observer.observe(root, {
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: DEEP_TRANSLATABLE_ATTRIBUTES,
      subtree: true,
    });
    DEEP_ROOT_OBSERVERS.set(root, observer);
  } catch {
    observer.disconnect();
  }
}

let deepRootObserverRegistrar = observeDeepTranslationRoot;

function setDeepRootObserverRegistrar(registrar) {
  deepRootObserverRegistrar = typeof registrar === 'function' ? registrar : undefined;
}

function discoverDeepTranslationRoots(root = document) {
  const discovered = [];
  const seen = new Set();
  const add = (candidate) => {
    if (!candidate || seen.has(candidate)) return;
    seen.add(candidate);
    discovered.push(candidate);
  };
  const inspect = (element) => {
    if (element.shadowRoot?.mode === 'open') add(element.shadowRoot);
    if (element?.tagName?.toLowerCase() === 'iframe') {
      try {
        if (element.contentDocument) add(element.contentDocument);
        if (!DEEP_IFRAME_LOAD_HANDLERS.has(element)) {
          DEEP_IFRAME_LOAD_HANDLERS.add(element);
          element.addEventListener('load', () => {
            try {
              const frameDocument = element.contentDocument;
              if (!frameDocument) return;
              deepRootObserverRegistrar?.(frameDocument);
              scanAyyzaRtl(frameDocument);
            } catch {
              // Ignore cross-origin navigations after a same-origin frame.
            }
          });
        }
      } catch {
        // Cross-origin frames cannot be inspected and are intentionally skipped.
      }
    }
  };

  if (root?.nodeType === 1) inspect(root);
  if (typeof root.querySelectorAll === 'function') {
    root.querySelectorAll('*').forEach(inspect);
  }
  return discovered;
}

const CANVAS_PATCH_FLAG = Symbol.for('ayyza.farsi.canvasText');

function patchCanvasTextPrototype(prototype) {
  if (!prototype || prototype[CANVAS_PATCH_FLAG]) return;
  ['fillText', 'strokeText', 'measureText'].forEach((method) => {
    const original = prototype[method];
    if (typeof original !== 'function') return;
    Object.defineProperty(prototype, method, {
      configurable: true,
      writable: true,
      value(text, ...args) {
        return original.call(this, translateChartText(String(text)), ...args);
      },
    });
  });
  Object.defineProperty(prototype, CANVAS_PATCH_FLAG, { value: true });
}

function installCanvasTextLocalization() {
  if (typeof CanvasRenderingContext2D !== 'undefined') {
    patchCanvasTextPrototype(CanvasRenderingContext2D.prototype);
  }
  if (typeof OffscreenCanvasRenderingContext2D !== 'undefined') {
    patchCanvasTextPrototype(OffscreenCanvasRenderingContext2D.prototype);
  }
}
// </ayyza-unified-deep-chart-runtime>

function queryAllIncludingRoot(root, selector) {
    const nodes = [];

    if (root instanceof Element && root.matches(selector)) {
      nodes.push(root);
    }

    root.querySelectorAll(selector).forEach((node) => nodes.push(node));

    return nodes;
  }

  function hideOpenSearchMapLayerChoice(root = document) {
    const hiddenLabels = new Set([
      'OpenSearch map',
      'نقشه OpenSearch',
      'نقشهٔ OpenSearch',
      'OpenSearch نقشه',
      'نقشه Ayyza',
      'نقشهٔ Ayyza',
      'نقشه آیزا',
      'نقشهٔ آیزا',
    ]);

    queryAllIncludingRoot(root, '.addLayer__types').forEach((choice) => {
      const ariaLabel = choice.getAttribute('aria-label')?.trim();
      const visibleLabel = choice.textContent?.trim().replace(/\s+/g, ' ');
      if (!hiddenLabels.has(ariaLabel) && !hiddenLabels.has(visibleLabel)) {
        return;
      }

      choice.remove();
    });
  }

  function removeExternalLinks(root = document) {
    queryAllIncludingRoot(root, 'a[href], area[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      let target;
      try {
        target = new URL(href, window.location.href);
      } catch {
        link.removeAttribute('href');
        return;
      }

      const isHttp = target.protocol === 'http:' || target.protocol === 'https:';
      const isSameOrigin = isHttp && target.origin === window.location.origin;
      const isLocalResource = target.protocol === 'blob:' || target.protocol === 'data:';
      if (isSameOrigin || isLocalResource) return;

      link.removeAttribute('href');
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.setAttribute('data-ayyza-external-link-removed', 'true');
    });
  }

  const LEARN_MORE_CONTROL_PATTERN = /^learn more(?:\.|\s+.*)?$/i;
  const LEARN_MORE_INLINE_PATTERN = /\blearn more\.?/gi;

  function removeLearnMore(root = document) {
    queryAllIncludingRoot(root, 'a, button, [role="button"]').forEach((control) => {
      const label = control.textContent?.trim().replace(/\s+/g, ' ');
      const ariaLabel = control.getAttribute('aria-label')?.trim();
      const title = control.getAttribute('title')?.trim();
      if ([label, ariaLabel, title].some((value) => value && LEARN_MORE_CONTROL_PATTERN.test(value))) {
        control.remove();
      }
    });

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue?.toLowerCase().includes('learn more') || shouldSkipTextNode(node)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const normalized = node.nodeValue.trim().replace(/\s+/g, ' ');
      node.nodeValue = LEARN_MORE_CONTROL_PATTERN.test(normalized)
        ? ''
        : node.nodeValue.replace(LEARN_MORE_INLINE_PATTERN, '').replace(/\s{2,}/g, ' ');
    });
  }

  function findClosestPanelByText(root, texts) {
    const textSet = new Set(texts);
    const candidates = queryAllIncludingRoot(
      root,
      '.euiPanel .euiText, .euiPanel .ouiText, .ouiPanel .euiText, .ouiPanel .ouiText'
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
    queryAllIncludingRoot(root, TRANSLATABLE_ATTRIBUTE_SELECTOR).forEach((node) => {
      TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
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
    queryAllIncludingRoot(root, "[data-test-subj='superDatePickerNowButton']").forEach((button) => {
      const normalized = button.textContent?.trim().replace(/\s+/g, ' ');
      const translations = {
        'Set start date and time to now': 'تنظیم تاریخ و زمان شروع روی اکنون',
        'Set end date and time to now': 'تنظیم تاریخ و زمان پایان روی اکنون',
      };
      const translated = translations[normalized];
      if (!translated) return;

      const textContainer = button.querySelector('.euiButton__text, .ouiButton__text');
      (textContainer || button).textContent = translated;
    });

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue?.trim() || shouldSkipTextNode(node)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      const translated = translateKnownText(node.nodeValue);
      if (translated !== node.nodeValue) {
        node.nodeValue = translated;
      }
    });

    translateElementAttributes(root);
  }

  function markTechnicalValues(root = document) {
    queryAllIncludingRoot(root, TECHNICAL_VALUE_SELECTOR).forEach((node) => {
      node.setAttribute('dir', 'ltr');
      node.classList.add('wz-ltr-isolate');
    });
  }

  function markCharts(root = document) {
    queryAllIncludingRoot(root, CHART_SELECTOR).forEach((node) => {
      node.setAttribute('dir', 'ltr');
      node.classList.add('wz-ltr-isolate');
      node.setAttribute('data-wz-rtl-chart', 'true');
    });
  }

  function markMenuPopovers(root = document) {
    const isMobile =
      typeof window !== 'undefined' && window.matchMedia?.('(max-width: 767px)').matches;

    queryAllIncludingRoot(root, MENU_POPOVER_SELECTOR).forEach((node) => {
      node.setAttribute('dir', 'rtl');
      node.classList.add('wz-rtl-menu-popover');
      node.style.setProperty('left', 'auto', 'important');
      node.style.setProperty(
        'right',
        isMobile ? '-1px' : 'var(--wz-rtl-menu-anchor-offset)',
        'important'
      );
    });
  }

  function markNavigationFlyouts(root = document) {
    queryAllIncludingRoot(root, NAVIGATION_FLYOUT_SELECTOR).forEach((node) => {
      node.setAttribute('dir', 'rtl');
      node.classList.add('wz-rtl-navigation-flyout');
      node.setAttribute('data-wz-rtl-navigation-flyout', 'true');
      node.style.setProperty('left', 'auto', 'important');
      node.style.setProperty('right', '0', 'important');

      node.querySelectorAll('.searchBarIcon').forEach((child) => {
        child.style.setProperty('left', 'auto', 'important');
        child.style.setProperty('right', '0', 'important');
      });

      node
        .querySelectorAll('.euiFlyout__closeButton--outside, .ouiFlyout__closeButton--outside')
        .forEach((child) => {
          child.style.setProperty('left', '0', 'important');
          child.style.setProperty('right', 'auto', 'important');
          child.style.setProperty('transform', 'translateX(calc(-100% - 24px))', 'important');
        });
    });
  }

  function markAnomalyDetectionOverview(root = document) {
    queryAllIncludingRoot(root, ANOMALY_OVERVIEW_TITLE_SELECTOR).forEach((title) => {
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

    const workflowPanel = findClosestPanelByText(root, ['How it works', 'نحوه کار', 'نحوهٔ کار']);
    workflowPanel?.classList.add('wz-ad-workflow-panel');

    queryAllIncludingRoot(root, ANOMALY_SAMPLE_BUTTON_SELECTOR).forEach((button) => {
      const card = button.closest('.euiCard, .ouiCard');
      if (button.matches("[data-test-subj='createECommerceSampleDetectorButton']")) {
        const container = card?.closest('.euiFlexItem, .ouiFlexItem') || card;
        container?.setAttribute('data-ayyza-hidden-ecommerce-sample', 'true');
        container?.style.setProperty('display', 'none', 'important');
        return;
      }
      card?.classList.add('wz-ad-sample-card');
      card?.closest('.euiPanel, .ouiPanel')?.classList.add('wz-ad-sample-panel');
    });
  }

  const CLOUD_SECURITY_LABELS = new Set(['Cloud security', 'امنیت ابری']);
  const CLOUD_SECURITY_APP_IDS = [
    'docker',
    'amazon-web-services',
    'google-cloud',
    'github',
    'office365',
    'microsoft-graph-api',
  ];
  const CLOUD_SECURITY_NAV_LINK_SELECTOR = CLOUD_SECURITY_APP_IDS.flatMap((id) => [
    `[data-test-subj="collapsibleNavAppLink-${id}"]`,
    `a[href*="/app/${id}"]`,
  ]).join(',');

  function hideCloudSecurityNode(node) {
    if (!node) return;
    node.setAttribute('data-ayyza-hidden-cloud-security', 'true');
    node.setAttribute('aria-hidden', 'true');
    node.style.setProperty('display', 'none', 'important');
  }

  function hideCloudSecurityUi(root = document) {
    queryAllIncludingRoot(
      root,
      '[aria-label="Primary navigation links, Cloud security"], [aria-label="Primary navigation links, امنیت ابری"]'
    ).forEach(hideCloudSecurityNode);

    queryAllIncludingRoot(root, CLOUD_SECURITY_NAV_LINK_SELECTOR).forEach((link) => {
      if (
        !link.closest(
          'nav, .euiSideNav, .ouiSideNav, .euiCollapsibleNav, .ouiCollapsibleNav, .WzManagementSideMenu'
        )
      ) {
        return;
      }
      const collapsibleGroup = link.closest(
        '.euiCollapsibleNavGroup, .ouiCollapsibleNavGroup'
      );
      if (collapsibleGroup) {
        hideCloudSecurityNode(collapsibleGroup);
        return;
      }
      hideCloudSecurityNode(
        link.closest('.nav-link-item, .euiSideNavItem, .ouiSideNavItem, li') || link
      );
    });

    queryAllIncludingRoot(
      root,
      [
        '[aria-label="Cloud security"]',
        '[aria-label="امنیت ابری"]',
        '.euiCollapsibleNavGroup__heading',
        '.ouiCollapsibleNavGroup__heading',
        '.euiCard__betaBadgeWrapper',
        '.ouiCard__betaBadgeWrapper',
        '.euiBadge',
        '.ouiBadge',
      ].join(',')
    ).forEach((label) => {
      const text = label.textContent?.replace(/\s+/g, ' ').trim();
      const ariaLabel = label.getAttribute('aria-label')?.replace(/\s+/g, ' ').trim();
      if (!CLOUD_SECURITY_LABELS.has(text) && !CLOUD_SECURITY_LABELS.has(ariaLabel)) return;

      const collapsibleGroup = label.closest(
        '.euiCollapsibleNavGroup, .ouiCollapsibleNavGroup'
      );
      if (collapsibleGroup) {
        hideCloudSecurityNode(collapsibleGroup);
        return;
      }

      const overviewCard = label.closest('.euiCard, .ouiCard');
      if (overviewCard) {
        hideCloudSecurityNode(
          overviewCard.closest('.euiFlexItem, .ouiFlexItem') || overviewCard
        );
        return;
      }

      const agentMenu = label.closest('.WzManagementSideMenu');
      if (agentMenu) {
        const sideNav = label.closest('.euiSideNav, .ouiSideNav');
        hideCloudSecurityNode(
          sideNav?.closest('.euiFlexItem, .ouiFlexItem') ||
            label.closest('.euiFlexItem, .ouiFlexItem, li')
        );
        return;
      }

      hideCloudSecurityNode(
        label.closest(
          '.nav-link-item-category-item, .euiSideNavItem, .ouiSideNavItem, li'
        ) || label
      );
    });
  }

  function markAyyzaApps(root = document) {
    queryAllIncludingRoot(root, AYYZA_APP_SELECTOR).forEach((node) => {
      node.setAttribute('dir', 'rtl');
      node.classList.add(ROOT_CLASS);
      node.setAttribute('data-wz-rtl-app', 'true');
    });
  }

  function localizeMapUi(root = document) {
    queryAllIncludingRoot(root, '[aria-label], [title]').forEach((element) => {
      for (const attribute of ['aria-label', 'title']) {
        const value = element.getAttribute(attribute);
        if (!value) continue;
        const translated = value.replace(/maps-داشبوردها/gi, 'نقشه‌ها');
        if (translated !== value) element.setAttribute(attribute, translated);
      }
    });

    const scanRoot = root instanceof Document ? root.body : root;
    if (!scanRoot) return;
    const walker = document.createTreeWalker(scanRoot, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const value = node.nodeValue || '';
      if (/^\s*zoom\s*:\s*(?:[0-9۰-۹٠-٩]+\s*)?$/i.test(value)) {
        node.nodeValue = value.replace(/zoom/gi, 'بزرگ‌نمایی');
      }
    }
  }

  function scanAyyzaRtl(root = document, visited = new WeakSet()) {
    if (!root || visited.has(root)) return;
    visited.add(root);
    ensureHomeLogo(root);
    markAyyzaApps(root);
    localizeMapUi(root);
    hideOpenSearchMapLayerChoice(root);
    markTechnicalValues(root);
    markCharts(root);
    markMenuPopovers(root);
    markNavigationFlyouts(root);
    markAnomalyDetectionOverview(root);
    hideCloudSecurityUi(root);
    removeLearnMore(root);
    // Translate chart context before the generic DOM pass so field identifiers,
    // axis intervals and tooltip labels are localized as complete phrases.
    localizeDeepChartSurfaces(root);
    translateVisibleTexts(root);
    localizeMapUi(root);
    removeExternalLinks(root);

    discoverDeepTranslationRoots(root).forEach((deepRoot) => {
      deepRootObserverRegistrar?.(deepRoot);
      scanAyyzaRtl(deepRoot, visited);
    });
  }

  function applyDocumentRtl() {
    const themeClass =
      typeof window !== 'undefined' && window.__osdThemeTag__?.endsWith('dark')
        ? `${THEME_CLASS_PREFIX}dark`
        : `${THEME_CLASS_PREFIX}light`;

    document.documentElement.setAttribute('dir', 'rtl');
    installCanvasTextLocalization();
    ensureFavicon();
    ensureGlobalFont();
    document.documentElement.classList.add(ROOT_CLASS);
    document.documentElement.classList.remove(
      `${THEME_CLASS_PREFIX}dark`,
      `${THEME_CLASS_PREFIX}light`
    );
    document.documentElement.classList.add(themeClass);
    document.body && document.body.classList.add(ROOT_CLASS);
  }

  function clearDocumentRtl() {
    document.documentElement.classList.remove(ROOT_CLASS);
    document.documentElement.classList.remove(
      `${THEME_CLASS_PREFIX}dark`,
      `${THEME_CLASS_PREFIX}light`
    );
    document.body && document.body.classList.remove(ROOT_CLASS);
  }

  const __AYYZA_FARSI_MAX_PENDING_ROOTS = 32;
  const __AYYZA_FARSI_MAX_DIRECT_ADDED_NODES = 16;
  let __ayyzaFarsiEnabled = false;
  let __ayyzaFarsiObserver;
  let __ayyzaFarsiScanFrame;
  const __ayyzaFarsiPendingRoots = new Set();
  const __ayyzaFarsiObservedRoots = new WeakSet();
  const __ayyzaFarsiObserverOptions = {
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [
      'href',
      'aria-label',
      'aria-description',
      'aria-valuetext',
      'title',
      'placeholder',
      'data-title',
      'data-label',
      'data-tooltip',
      'data-original-title',
    ],
    subtree: true,
  };

  function __ayyzaFarsiObserveRoot(root) {
    if (!__ayyzaFarsiObserver || !root || __ayyzaFarsiObservedRoots.has(root)) return;
    const target =
      root instanceof Document ? root.body || root.documentElement : root;
    if (!target) return;
    __ayyzaFarsiObserver.observe(target, __ayyzaFarsiObserverOptions);
    __ayyzaFarsiObservedRoots.add(root);
  }

  function __ayyzaFarsiQueueScan(root) {
    if (!root || typeof root.querySelectorAll !== 'function') {
      return;
    }

    if (__ayyzaFarsiPendingRoots.size >= __AYYZA_FARSI_MAX_PENDING_ROOTS) {
      __ayyzaFarsiPendingRoots.clear();
      __ayyzaFarsiPendingRoots.add(document);
    } else if (!__ayyzaFarsiPendingRoots.has(document)) {
      // Queue each mutation parent once. React often appends hundreds of sibling
      // nodes in one render; comparing every sibling with every other sibling made
      // this batching path quadratic before translation even started.
      __ayyzaFarsiPendingRoots.add(root);
    }
    if (__ayyzaFarsiScanFrame !== undefined) {
      return;
    }

    __ayyzaFarsiScanFrame = window.requestAnimationFrame(() => {
      __ayyzaFarsiScanFrame = undefined;
      const roots = Array.from(__ayyzaFarsiPendingRoots);
      __ayyzaFarsiPendingRoots.clear();
      roots.forEach((root) => scanAyyzaRtl(root));
      // Text translations create characterData records. They are already covered
      // by the scan above, so discard those self-generated records instead of
      // scheduling a second frame that cannot change anything.
      __ayyzaFarsiObserver?.takeRecords();
    });
  }

  function __ayyzaFarsiEnable() {
    if (__ayyzaFarsiEnabled) {
      return;
    }
    __ayyzaFarsiEnabled = true;

    applyDocumentRtl();
    document.documentElement.setAttribute('lang', 'fa-IR');
    scanAyyzaRtl(document);
    if (!__ayyzaFarsiObserver && 'MutationObserver' in window) {
      __ayyzaFarsiObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.target instanceof Element) {
            __ayyzaFarsiQueueScan(mutation.target);
            continue;
          }

          if (mutation.type === 'characterData' && mutation.target.parentElement) {
            __ayyzaFarsiQueueScan(mutation.target.parentElement);
            continue;
          }

          if (mutation.type === 'childList') {
            if (!mutation.addedNodes.length) {
              continue;
            }

            // Portals and popovers are commonly appended as one small child of
            // body. Scanning mutation.target in that case walks the whole app.
            // Scan small additions directly; only collapse genuinely large
            // batches to their shared parent.
            if (mutation.addedNodes.length > __AYYZA_FARSI_MAX_DIRECT_ADDED_NODES) {
              __ayyzaFarsiQueueScan(mutation.target);
              continue;
            }

            mutation.addedNodes.forEach((addedNode) => {
              const addedRoot =
                typeof addedNode.querySelectorAll === 'function'
                  ? addedNode
                  : addedNode.parentElement;
              __ayyzaFarsiQueueScan(addedRoot);
            });
          }
        }
      });
      setDeepRootObserverRegistrar(__ayyzaFarsiObserveRoot);
      __ayyzaFarsiObserveRoot(document);
      discoverDeepTranslationRoots(document).forEach((deepRoot) => {
        __ayyzaFarsiObserveRoot(deepRoot);
        scanAyyzaRtl(deepRoot);
      });
    }
  }
  window.AyyzaFarsiBootstrap = {
    scan: scanAyyzaRtl,
    enable: __ayyzaFarsiEnable,
    translateChartText,
    translateDisplayDate,
    localizeChartSurfaces: localizeDeepChartSurfaces,
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', __ayyzaFarsiEnable, { once: true });
  } else {
    __ayyzaFarsiEnable();
  }
})();
