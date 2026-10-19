import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ChevronDown, Globe, Check, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Global window properties for Google Translate
declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

import { LANGUAGES, GOOGLE_TRANSLATE_CODES } from '@/lib/languages';

interface LanguageSelectorProps {
  mobile?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  mobile = false,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferredLanguage');
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    }
    return 'en';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const translateElementId = 'google_translate_element';
  const scriptId = 'google-translate-script';
  const styleId = 'etcom-hide-google-translate-branding';

  // Add CSS to hide Google Translate default branding, toolbars, and banner frame
  const addHideTranslateCSS = () => {
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      /* Hide Google Translate top banner, toolbar, and balloon popups */
      .skiptranslate,
      .goog-te-banner-frame,
      #goog-gt-tt,
      .goog-te-balloon-frame,
      div#goog-gt-,
      .goog-te-menu-value,
      .goog-logo-link,
      .goog-te-gadget,
      .goog-te-menu-frame {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      /* Prevent Google Translate from altering body top margin/position */
      body {
        top: 0 !important;
        position: initial !important;
      }
      /* Disable tooltip highlight styles */
      .goog-text-highlight {
        background: none !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  // Create hidden anchor div required by Google Translate script
  const createHiddenElement = () => {
    if (document.getElementById(translateElementId)) return;
    const div = document.createElement('div');
    div.id = translateElementId;
    div.style.display = 'none';
    document.body.appendChild(div);
  };

  // Initialize Google Translate callback
  const setupGoogleTranslateCallback = () => {
    window.googleTranslateElementInit = () => {
      const g = window.google;
      if (!g?.translate?.TranslateElement) return;
      try {
        new g.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: GOOGLE_TRANSLATE_CODES,
            multilanguagePage: true,
          },
          translateElementId
        );
      } catch (error) {
        console.error('Etcom Google Translate Init Error:', error);
      }
    };
  };

  // Inject Google Translate script safely
  const addScript = () => {
    if (document.getElementById(scriptId)) return;
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  };

  // Programmatic language change helper with retries
  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    try {
      localStorage.setItem('preferredLanguage', languageCode);
    } catch {
      // Ignore storage errors in private browsing
    }
    const maxAttempts = 15;
    let attempts = 0;
    const tryChangeLanguage = (): boolean => {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = languageCode;
        selectElement.dispatchEvent(new Event('change'));
        return true;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryChangeLanguage, 250);
      }
      return false;
    };
    tryChangeLanguage();
  };

  useEffect(() => {
    addHideTranslateCSS();
    createHiddenElement();
    setupGoogleTranslateCallback();
    addScript();

    const timer = setTimeout(() => {
      setMounted(true);
      if (currentLanguage !== 'en') {
        changeLanguage(currentLanguage);
      }
    }, 100);

    const interval = setInterval(() => {
      if (document.body.style.top !== '0px' && document.body.style.top !== '') {
        document.body.style.top = '0px';
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentLanguage]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filter languages by search query
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return LANGUAGES;
    const q = searchQuery.toLowerCase().trim();
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const ethiopianLangs = filteredLanguages.filter((l) => l.category === 'ethiopian');
  const internationalLangs = filteredLanguages.filter((l) => l.category === 'international');
  const currentLang = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  if (!mounted) {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border bg-card/60 text-xs font-medium text-muted-foreground',
          className
        )}
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="hidden sm:inline">English</span>
      </div>
    );
  }

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:bg-muted/50 hover:border-border transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer',
          isOpen && 'bg-secondary/60 border-primary/40 text-primary',
          mobile && 'px-2'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="text-sm shrink-0 leading-none">{currentLang.flag}</span>
        {!mobile && (
          <span className="max-w-[70px] truncate text-xs font-medium text-foreground">
            {currentLang.nativeName}
          </span>
        )}
        <ChevronDown
          className={cn(
            'h-3 w-3 text-muted-foreground transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180 text-primary'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-w-[90vw] rounded-xl bg-card border border-border shadow-lg overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-2 border-b border-border bg-muted/30">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search language / ቋንቋ ፈልግ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-background border border-border placeholder:text-muted-foreground text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Language Options List */}
          <div className="max-h-72 overflow-y-auto p-1.5 space-y-2">
            {/* Ethiopian & Regional Section */}
            {ethiopianLangs.length > 0 && (
              <div>
                <p className="px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  Ethiopian & Regional
                </p>
                <div className="space-y-0.5">
                  {ethiopianLangs.map((lang) => {
                    const isSelected = currentLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer',
                          isSelected
                            ? 'bg-secondary text-primary font-semibold'
                            : 'text-foreground hover:bg-muted/50'
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base shrink-0 leading-none">{lang.flag}</span>
                          <div className="flex flex-col truncate">
                            <span className="truncate font-medium">{lang.nativeName}</span>
                            <span className="text-xs text-muted-foreground">{lang.name}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* International Section */}
            {internationalLangs.length > 0 && (
              <div>
                <p className="px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  International
                </p>
                <div className="space-y-0.5">
                  {internationalLangs.map((lang) => {
                    const isSelected = currentLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer',
                          isSelected
                            ? 'bg-secondary text-primary font-semibold'
                            : 'text-foreground hover:bg-muted/50'
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base shrink-0 leading-none">{lang.flag}</span>
                          <div className="flex flex-col truncate">
                            <span className="truncate font-medium">{lang.nativeName}</span>
                            <span className="text-xs text-muted-foreground">{lang.name}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredLanguages.length === 0 && (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No matching language found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
