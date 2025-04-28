import { useParams } from "next/navigation";
import { defaultLocale, Locale } from "@/constants/language";
import { t, TranslationKey } from "@/utils/i18n";

export const useTrans = () => {
  const params = useParams();
  const locale = (params?.locale as Locale) || defaultLocale;

  return {
    t: (key: TranslationKey) => t(key, locale),
    locale,
  };
};
