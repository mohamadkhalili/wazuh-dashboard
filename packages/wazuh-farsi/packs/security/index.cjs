const { createTranslator, createVariants } = require('../../translator.cjs');

const messages = Object.freeze({
  "authenticationNotSupported": {
    "en": "Authentication Type: {authType} is not supported for multiple authentication.",
    "fa-IR": "نوع احراز هویت {authType} برای احراز هویت چندگانه پشتیبانی نمی‌شود."
  },
  "authenticationRequired": {
    "en": "Authentication required",
    "fa-IR": "احراز هویت الزامی است"
  },
  "cancel": {
    "en": "Cancel",
    "fa-IR": "انصراف"
  },
  "chooseCustomTenant": {
    "en": "Choose from custom",
    "fa-IR": "انتخاب از مستأجرهای سفارشی"
  },
  "confirm": {
    "en": "Confirm",
    "fa-IR": "تأیید"
  },
  "enableGlobalTenant": {
    "en": "Contact the administrator to enable global tenant.",
    "fa-IR": "برای فعال‌سازی مستأجر سراسری با مدیر تماس بگیرید."
  },
  "enableMultiTenancy": {
    "en": "Contact the administrator to enable multi tenancy.",
    "fa-IR": "برای فعال‌سازی چندمستأجری با مدیر تماس بگیرید."
  },
  "enablePrivateTenant": {
    "en": "Contact the administrator to enable private tenant.",
    "fa-IR": "برای فعال‌سازی مستأجر خصوصی با مدیر تماس بگیرید."
  },
  "failedToSwitchTenant": {
    "en": "Failed to switch tenant.",
    "fa-IR": "تغییر مستأجر ناموفق بود."
  },
  "global": {
    "en": "Global",
    "fa-IR": "سراسری"
  },
  "globalTenantAccess": {
    "en": "Contact the administrator to get access to global tenant.",
    "fa-IR": "برای دریافت دسترسی به مستأجر سراسری با مدیر تماس بگیرید."
  },
  "globalTenantDescription": {
    "en": "The global tenant is shared between every OpenSearch Dashboards user.",
    "fa-IR": "مستأجر سراسری میان همهٔ کاربران داشبوردهای اوپن‌سرچ مشترک است."
  },
  "innovationFundDetail": {
    "en": "Innovation ecosystem supporter",
    "fa-IR": "اداره کل طرح های کلان و ملی"
  },
  "innovationFundName": {
    "en": "Innovation and Prosperity Fund",
    "fa-IR": "وزارت ارتباطات و فناوری اطلاعات"
  },
  "invalidCredentials": {
    "en": "Invalid username or password. Please try again.",
    "fa-IR": "نام کاربری یا رمز عبور نامعتبر است. دوباره تلاش کنید."
  },
  "invalidCredentialsShort": {
    "en": "Invalid username or password",
    "fa-IR": "نام کاربری یا رمز عبور نامعتبر است"
  },
  "invalidNextUrl": {
    "en": "Invalid nextUrl parameter.",
    "fa-IR": "پارامتر nextUrl نامعتبر است."
  },
  "invalidRequestId": {
    "en": "Invalid requestId",
    "fa-IR": "requestId نامعتبر است"
  },
  "login": {
    "en": "Log in",
    "fa-IR": "ورود"
  },
  "loginAriaLabel": {
    "en": "Login",
    "fa-IR": "ورود"
  },
  "logout": {
    "en": "Log out",
    "fa-IR": "خروج"
  },
  "oidcCaptureTitle": {
    "en": "OSD OIDC Capture",
    "fa-IR": "دریافت OIDC داشبوردهای اوپن‌سرچ"
  },
  "oidcSuccessTitle": {
    "en": "OSD OpenID Success",
    "fa-IR": "ورود موفق OpenID به داشبوردهای اوپن‌سرچ"
  },
  "noTargetTenant": {
    "en": "No target tenant is specified!",
    "fa-IR": "هیچ مستأجر مقصدی مشخص نشده است!"
  },
  "password": {
    "en": "Password",
    "fa-IR": "رمز عبور"
  },
  "private": {
    "en": "Private",
    "fa-IR": "خصوصی"
  },
  "privateTenantAccess": {
    "en": "Contact the administrator to get access to private tenant.",
    "fa-IR": "برای دریافت دسترسی به مستأجر خصوصی با مدیر تماس بگیرید."
  },
  "privateTenantDescription": {
    "en": "The private tenant is exclusive to each user and can't be shared. You might use the private tenant for exploratory work.",
    "fa-IR": "مستأجر خصوصی ویژهٔ هر کاربر است و قابل اشتراک‌گذاری نیست. می‌توانید از آن برای کارهای اکتشافی استفاده کنید."
  },
  "privateTenantReadOnly": {
    "en": "Your account has read-only privileges only, using the private tenant is not possible.",
    "fa-IR": "حساب شما فقط دسترسی خواندن دارد و استفاده از مستأجر خصوصی ممکن نیست."
  },
  "productName": {
    "en": "Wazuh",
    "fa-IR": "آیزا"
  },
  "scienceSponsorDetail": {
    "en": "Technology and knowledge-based economy",
    "fa-IR": "ستاد افتا"
  },
  "scienceSponsorName": {
    "en": "Ministry of Communications Science Department",
    "fa-IR": "معاونت علمی و فناوری ریاست جمهوری"
  },
  "selectCustomTenant": {
    "en": "Select a custom tenant",
    "fa-IR": "یک مستأجر سفارشی انتخاب کنید"
  },
  "selectTenant": {
    "en": "Select your tenant",
    "fa-IR": "مستأجر خود را انتخاب کنید"
  },
  "sponsorAftaDetail": {
    "en": "Production and information exchange security",
    "fa-IR": "پشتیبان زیست‌بوم نوآوری"
  },
  "sponsorAftaName": {
    "en": "AFTA Headquarters",
    "fa-IR": "صندوق نوآوری و شکوفایی"
  },
  "sponsors": {
    "en": "Our sponsors",
    "fa-IR": "حامیان طرح دومین آنتی ویروس ملی"
  },
  "samlCaptureTitle": {
    "en": "OSD SAML Capture",
    "fa-IR": "دریافت SAML داشبوردهای اوپن‌سرچ"
  },
  "samlSuccessTitle": {
    "en": "OSD SAML Success",
    "fa-IR": "ورود موفق SAML به داشبوردهای اوپن‌سرچ"
  },
  "tenantDescription": {
    "en": "Tenants are useful for safely sharing your work with other OpenSearch Dashboards users. You can switch your tenant anytime by clicking the user avatar on top right.",
    "fa-IR": "مستأجرها برای اشتراک‌گذاری امن کار شما با دیگر کاربران داشبوردهای اوپن‌سرچ کاربرد دارند. هر زمان می‌توانید با کلیک روی تصویر کاربر در بالا سمت راست، مستأجر خود را تغییر دهید."
  },
  "username": {
    "en": "Username",
    "fa-IR": "نام کاربری"
  }
});
const osdMessages = Object.freeze({});
const formats = Object.freeze({});
const translate = createTranslator(messages);
const variants = createVariants(messages);
const packId = "security";

module.exports = { messages, osdMessages, formats, translate, variants, packId };
