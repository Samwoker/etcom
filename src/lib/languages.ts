export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  category: 'ethiopian' | 'international';
}

export const LANGUAGES: LanguageOption[] = [
  // Ethiopian & Horn of Africa Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', category: 'ethiopian' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', category: 'ethiopian' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo', flag: '🇪🇹', category: 'ethiopian' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', flag: '🇪🇹', category: 'ethiopian' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴', category: 'ethiopian' },
  // International Languages
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', category: 'international' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', category: 'international' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', category: 'international' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', category: 'international' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', category: 'international' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', category: 'international' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', category: 'international' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', category: 'international' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', category: 'international' },
];

export const GOOGLE_TRANSLATE_CODES = LANGUAGES.map((l) => l.code).join(',');

