export const defaultLocale = "en";
export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const languageNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export const languageFlags: Record<Locale, string> = {
  en: "🇺🇸",
  vi: "🇻🇳",
};

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};
