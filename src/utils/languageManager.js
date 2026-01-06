import { t, getCurrentLanguage, setLanguage } from '../data/translations.js';

/**
 * Update all UI text elements with translations
 */
export function updateUILanguage() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key);
  });
  
  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = t(key);
  });
  
  // Update select options
  document.querySelectorAll('option[data-i18n]').forEach(option => {
    const key = option.getAttribute('data-i18n');
    option.textContent = t(key);
  });
  
  // Update active language button
  updateLanguageButtons();
}

/**
 * Update language button styles
 */
function updateLanguageButtons() {
  const currentLang = getCurrentLanguage();
  
  // Update all language selectors (including global ones)
  document.querySelectorAll('.language-dropdown').forEach(select => {
    select.value = currentLang;
  });
}

/**
 * Initialize language selector
 */
export function initLanguageSelector() {
  // Set initial language
  const savedLang = getCurrentLanguage();
  updateUILanguage();
  
  // Add event listener to ALL language dropdowns (including global ones)
  document.querySelectorAll('.language-dropdown').forEach(languageSelect => {
    languageSelect.addEventListener('change', (e) => {
      const newLang = e.target.value;
      setLanguage(newLang);
      updateUILanguage();
      
      // Dispatch custom event to notify other components
      const event = new CustomEvent('language-changed', { detail: { language: newLang } });
      document.dispatchEvent(event);
    });
  });
}
