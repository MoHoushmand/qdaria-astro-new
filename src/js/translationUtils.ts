
// data
import {
  textTranslations,
  dataTranslations,
  routeTranslations,
} from "../config/translationData.json";
import { locales, defaultLocale } from "../config/siteSettings.json";

interface AstroProps {
  url: URL;
  locals: {
    locale?: string;
  };
}

type TextTranslations = typeof textTranslations;
type Locale = keyof TextTranslations;
type TextKey<T extends Locale> = keyof TextTranslations[T];

type DataTranslations = typeof dataTranslations;
type DataKey<T extends Locale> = keyof DataTranslations[T];

/**
 * * text translation helper function
 * @param Astro: Astro props containing the URL
 * @returns function you can use to translate strings according to the src/config/translations.json file
 *
 * ## Example
 *
 * ```ts
 * import { useTranslations } from "@js/i18nUtils";
 * const t = useTranslations(Astro);
 * t("hero_text"); // translated string for key "hero_text" in the current locale
 * ```
 */
export function useTranslations(Astro: AstroProps) {
  const locale = Astro.locals.locale || defaultLocale;
  return function t<T extends Locale>(key: TextKey<T>) {
    const translations = textTranslations[locale as T] || textTranslations[defaultLocale as T];
    return translations[key] as string;
  };
}
/**
 * * data file translation helper function
 * @param data: key in the data file to translate, like "siteData" or "navData"
 * @param Astro: Astro props containing the URL
 * @returns appropriate data file as specified in src/config/translationData.json.ts
 *
 * ## Example
 *
 * ```ts
 * import { getTranslatedData } from "@js/translations";
 * const siteData = getTranslatedData("siteData", Astro);
 * ```
 */
export function getTranslatedData<K extends keyof DataTranslations[Locale]>(
  data: K,
  locale: Locale,
): DataTranslations[Locale][K] {
  const translations = dataTranslations[locale] || dataTranslations[defaultLocale];
  return translations[data];
}

/**
 * * take in a language (ex "de"), and the current URL, and return correct URL for the passed language
 * This is really only used in the language switcher component
 *
 * @param locale: new language
 * @param url: current URL (Astro.url)
 * @returns new URL pathname as a string
 */
export function getLocalizedPathname(
  locale: (typeof locales)[number],
  url: URL,
): string {
  // Remove any existing locale prefix
  const pathWithoutLocale = url.pathname.replace(/^\/(en|fr)/, '');
  return `/${locale}${pathWithoutLocale}`;
}
