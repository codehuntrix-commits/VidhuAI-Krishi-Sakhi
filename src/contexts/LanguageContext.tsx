import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface Translations {
  [key: string]: {
    en: string;
    ml: string;
  };
}

const translations: Translations = {
  // Common
  'home': { en: 'Home', ml: 'ഹോം' },
  'diary': { en: 'Diary', ml: 'ഡയറി' },
  'advisory': { en: 'Advisory', ml: 'ഉപദേശം' },
  'reminders': { en: 'Reminders', ml: 'ഓർമ്മപ്പെടുത്തലുകൾ' },
  'schemes': { en: 'Schemes', ml: 'പദ്ധതികൾ' },
  'cropHealth': { en: 'Crop Health', ml: 'വിള ആരോഗ്യം' },
  'marketplace': { en: 'Marketplace', ml: 'മാർക്കറ്റ്പ്ലേസ്' },
  'profile': { en: 'Profile', ml: 'പ്രൊഫൈൽ' },
  
  // Farm Diary
  'farmDiary': { en: 'Farm Diary', ml: 'കാർഷിക ഡയറി' },
  'trackActivities': { en: 'Track your farming activities', ml: 'നിങ്ങളുടെ കൃഷി പ്രവർത്തനങ്ങൾ ട്രാക്ക് ചെയ്യുക' },
  'add': { en: 'Add', ml: 'ചേർക്കുക' },
  'all': { en: 'All', ml: 'എല്ലാം' },
  'done': { en: 'Done', ml: 'പൂർത്തീകരിച്ചു' },
  'pending': { en: 'Pending', ml: 'അവശേഷിക്കുന്നത്' },
  'markDone': { en: 'Mark Done', ml: 'പൂർത്തീകരിച്ചതായി അടയാളപ്പെടുത്തുക' },
  'quickAddActivity': { en: 'Quick Add Activity', ml: 'വേഗത്തിൽ പ്രവർത്തനം ചേർക്കുക' },
  'sowing': { en: 'Sowing', ml: 'വിതയൽ' },
  'irrigation': { en: 'Irrigation', ml: 'ജലസേചനം' },
  'pestControl': { en: 'Pest Control', ml: 'കീടനിയന്ത്രണം' },
  'fertilizer': { en: 'Fertilizer', ml: 'വളം' },
  'harvesting': { en: 'Harvesting', ml: 'വിളവെടുപ്പ്' },
  'pruning': { en: 'Pruning', ml: 'വെട്ടിമാറ്റൽ' },
  
  // Advisory
  'smartAdvisory': { en: 'Smart Advisory', ml: 'സ്മാർട്ട് ഉപദേശം' },
  'aiPoweredInsights': { en: 'AI-powered farming insights', ml: 'AI അടിസ്ഥാനമാക്കിയ കൃഷി ഉൾക്കാഴ്ചകൾ' },
  'urgent': { en: 'Urgent', ml: 'അടിയന്തിരം' },
  'medium': { en: 'Medium', ml: 'ഇടത്തരം' },
  'lowPriority': { en: 'Low Priority', ml: 'കുറഞ്ഞ മുൻഗണന' },
  
  // Home
  'namaskaram': { en: 'Namaskaram, Rajanetta!', ml: 'നമസ്കാരം, രാജനേട്ടാ!' },
  'quickAccess': { en: 'Quick Access', ml: 'വേഗത്തിലുള്ള പ്രവേശനം' },
  'todaysSmartAdvice': { en: "Today's Smart Advice", ml: 'ഇന്നത്തെ സ്മാർട്ട് ഉപദേശം' },
  'farmAtGlance': { en: 'Farm at a Glance', ml: 'ഒറ്റനോട്ടത്തിൽ കൃഷിയിടം' },
  
  // Activity Modal
  'addActivity': { en: 'Add Activity', ml: 'പ്രവർത്തനം ചേർക്കുക' },
  'activityDetails': { en: 'Activity Details', ml: 'പ്രവർത്തന വിശദാംശങ്ങൾ' },
  'description': { en: 'Description', ml: 'വിവരണം' },
  'notes': { en: 'Notes', ml: 'കുറിപ്പുകൾ' },
  'uploadPhoto': { en: 'Upload Photo', ml: 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക' },
  'voiceInput': { en: 'Voice Input', ml: 'വോയിസ് ഇൻപുട്ട്' },
  'save': { en: 'Save', ml: 'സേവ് ചെയ്യുക' },
  'cancel': { en: 'Cancel', ml: 'റദ്ദാക്കുക' },
  'close': { en: 'Close', ml: 'അടയ്ക്കുക' },
  'selectActivityType': { en: 'Select Activity Type', ml: 'പ്രവർത്തന തരം തിരഞ്ഞെടുക്കുക' },
  'activityType': { en: 'Activity Type', ml: 'പ്രവർത്തന തരം' },
  'date': { en: 'Date', ml: 'തീയതി' },
  'status': { en: 'Status', ml: 'നില' },
  'startSpeaking': { en: 'Start speaking about your farm activity...', ml: 'നിങ്ങളുടെ കൃഷി പ്രവർത്തനത്തെക്കുറിച്ച് സംസാരിക്കാൻ തുടങ്ങുക...' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};