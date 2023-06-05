/**
 * @fileOverview This module configures the internationalization (i18n) of the application.
 * It uses i18next, i18next-http-backend and i18next-browser-languagedetector.
 */

// Import required modules
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Initialize the LanguageDetector
const languageDetector = new LanguageDetector();

// Configure parameters for the LanguageDetector
languageDetector.init({
  // Order to check the various sources for language detection
  order: [
    'querystring',
    'cookie',
    'localStorage',
    'navigator',
    'htmlTag',
    'path',
    'subdomain',
  ],
  // Lookup parameters for the various sources
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  // Locations to cache the language
  caches: ['localStorage', 'cookie'],

  // Option to check if the detected language is in the whitelist
  checkWhitelist: true,

  // The default language if detection fails
  fallbackLng: 'en',
});

// Use the Backend, LanguageDetector and initReactI18next
i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    // Backend configuration
    backend: {
      // Path to load translations
      loadPath: '/assets/i18n/{{ns}}/{{lng}}.json',
    },
    // Default language
    fallbackLng: 'en',
    // Enable debug logs (disable in production)
    debug: false,
    // Namespaces for translations
    ns: ['common', 'home', 'profile'],

    // Interpolation options
    interpolation: {
      espaceValue: false,
      formatSeparator: ',',
    },
    // React options
    react: {
      useSuspense: true,
    },
  });

// Export configured i18n
export default i18n;
