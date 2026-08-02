import { createTranslator, createVariants } from '../../translator.js';

export const messages = Object.freeze({
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
export const osdMessages = Object.freeze({});
export const formats = Object.freeze({});
export const translate = createTranslator(messages);
export const variants = createVariants(messages);
export const packId = "rtl";
