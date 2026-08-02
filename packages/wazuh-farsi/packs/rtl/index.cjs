const { createTranslator, createVariants } = require('../../translator.cjs');

const messages = Object.freeze({
  "antivirusTitle": {
    "en": "Ayyza Antivirus",
    "fa-IR": "آنتی‌ویروس آیزا"
  },
  "appearance": {
    "en": "Light or dark appearance",
    "fa-IR": "حالت روشن یا تیره"
  },
  "development": {
    "en": "Under development",
    "fa-IR": "در حال توسعه"
  },
  "howItWorks": {
    "en": "How it works",
    "fa-IR": "نحوهٔ کار",
    "aliases": {
      "fa-IR": [
        "نحوه کار"
      ]
    }
  },
  "loading": {
    "en": "Loading",
    "fa-IR": "در حال بارگذاری"
  },
  "notifications": {
    "en": "Notifications",
    "fa-IR": "اعلان‌ها"
  }
});
const osdMessages = Object.freeze({});
const formats = Object.freeze({});
const translate = createTranslator(messages);
const variants = createVariants(messages);
const packId = "rtl";

module.exports = { messages, osdMessages, formats, translate, variants, packId };
