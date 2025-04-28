import { defaultLocale, locales, type Locale } from "../constants/language";
import commonEn from "../locales/en/common.json";
import commonVi from "../locales/vi/common.json";

export type TranslationKey =
  | `common.${Extract<keyof typeof commonEn.common, string>}`
  | `auth.${Extract<keyof typeof commonEn.auth, string>}`
  | `errors.${Extract<keyof typeof commonEn.errors, string>}`;

const translations = {
  en: commonEn,
  vi: commonVi,
} as const;

export const getTranslation = (locale: Locale = defaultLocale) => {
  return translations[locale];
};

export const t = (key: TranslationKey, locale: Locale = defaultLocale): string => {
  const translation = getTranslation(locale);
  const [namespace, subKey] = key.split(".");

  if (namespace === "common" && subKey in translation.common) {
    return translation.common[subKey as keyof typeof translation.common];
  }
  if (namespace === "auth" && subKey in translation.auth) {
    return translation.auth[subKey as keyof typeof translation.auth];
  }
  if (namespace === "errors" && subKey in translation.errors) {
    return translation.errors[subKey as keyof typeof translation.errors];
  }

  return key;
};

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const getLocaleFromPath = (pathname: string): Locale => {
  const pathLocale = pathname.split("/")[1];
  return isValidLocale(pathLocale) ? pathLocale : defaultLocale;
};
