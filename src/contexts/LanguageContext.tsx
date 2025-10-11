import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'english' | 'tamil' | 'hindi' | 'malayalam';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('vithuai_language');
    return (saved as Language) || 'english';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vithuai_language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.english[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  english: {
    // Common
    'app_name': 'VithuAI - Krishi Sakhi',
    'welcome': 'Welcome',
    'hello': 'Namaskaram',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Sign Out',
    'continue': 'Continue',
    'save': 'Save',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'add': 'Add',
    'done': 'Done',
    'pending': 'Pending',
    'close': 'Close',
    
    // Languages
    'language': 'Language',
    'select_language': 'Choose Your Language',
    
    // Home/Dashboard
    'dashboard': 'Dashboard',
    'quick_access': 'Quick Access',
    'todays_smart_advice': "Today's Smart Advice",
    'farm_at_glance': 'Farm at a Glance',
    'urgent_alerts': 'Urgent Alerts',
    
    // Navigation
    'farm_diary': 'Farm Diary',
    'personalized_advisory': 'Personalized Advisory',
    'crop_health': 'Crop Health',
    'reminders': 'Reminders',
    'help_support': 'Help & Support',
    
    // Farm Diary
    'track_activities': 'Track your farming activities',
    'all': 'All',
    'completed': 'Done',
    'sowing': 'Sowing',
    'irrigation': 'Irrigation',
    'pest_control': 'Pest Control',
    'fertilizer': 'Fertilizer',
    'harvesting': 'Harvesting',
    'pruning': 'Pruning',
    
    // Advisory
    'smart_advisory': 'Smart Advisory',
    'ai_insights': 'AI-powered farming insights',
    'urgent': 'Urgent',
    'medium': 'Medium',
    'low_priority': 'Low Priority',
    'weather': 'Weather',
    'crop_management': 'Crop Management',
    'nutrition': 'Nutrition',
    'recommendation': 'Recommendation',
    
    // Crop & Soil
    'crop_soil_management': 'Crop & Soil Management',
    'soil_health': 'Soil Health',
    'pest_risks': 'Pest Risks',
    'disease_detection': 'Disease Detection',
    'recommendations': 'Recommendations',
    'upload_image': 'Upload Image',
    'ai_recommendations': 'AI Recommendations',
    
    // Help & Support
    'help_center': 'Help Center',
    'app_tutorial': 'App Tutorial',
    'contact_support': 'Contact Support',
    'call_expert': 'Call Agri Expert',
    'chat_support': 'Chat with AI',
    'quick_questions': 'Quick Questions',
    
    // Reminders
    'stay_on_top': 'Stay on top of farm tasks',
    'today': 'Today',
    'upcoming': 'Upcoming',
    'this_week': 'This Week',
    
    // Profile
    'manage_account': 'Manage your account',
    'personal_info': 'Personal Information',
    'land_size': 'Land Size',
    'experience': 'Experience',
    'crops': 'Crops',
    'member_since': 'Member since',
    'achievements': 'Achievements',
    'notifications': 'Notifications',
    'privacy_security': 'Privacy & Security',
    
    // Onboarding
    'welcome_to_vithuai': 'Welcome to VithuAI',
    'your_farming_assistant': 'Your farming assistant',
    'lets_setup': "Let's Setup Your Farm",
    'sign_up': 'Sign Up',
    'create_account': 'Create Your Account',
    'personal_details': 'Personal Details',
    'land_details': 'Land Details',
    'crop_details': 'Crop Details',
    'facilities': 'Available Facilities',
    'review_complete': 'Review & Complete',
    
    // Weather & Stats
    'temp': 'Temperature',
    'humidity': 'Humidity',
    'wind': 'Wind',
    'rain_chance': 'Rain Chance',
    
    // Actions
    'see_more': 'See More',
    'view_all': 'View All',
    'mark_done': 'Mark Done',
    'set_reminder': 'Set Reminder',
    'got_it': 'Got it',
    'remind_later': 'Remind Later',
    'more_info': 'More Info',
  },
  
  tamil: {
    // Common
    'app_name': 'விது AI - கிருஷி சகி',
    'welcome': 'வரவேற்பு',
    'hello': 'வணக்கம்',
    'profile': 'சுயவிவரம்',
    'settings': 'அமைப்புகள்',
    'logout': 'வெளியேறு',
    'continue': 'தொடரவும்',
    'save': 'சேமி',
    'cancel': 'ரத்து செய்',
    'edit': 'திருத்து',
    'delete': 'அழி',
    'add': 'சேர்',
    'done': 'முடிந்தது',
    'pending': 'நிலுவை',
    'close': 'மூடு',
    
    // Languages
    'language': 'மொழி',
    'select_language': 'உங்கள் மொழியைத் தேர்வு செய்யுங்கள்',
    
    // Home/Dashboard
    'dashboard': 'முகப்பு',
    'quick_access': 'விரைவு அணுகல்',
    'todays_smart_advice': 'இன்றைய ஸ்மார்ட் ஆலோசனை',
    'farm_at_glance': 'பண்ணை ஒரு பார்வையில்',
    'urgent_alerts': 'அவசர எச்சரிக்கைகள்',
    
    // Navigation
    'farm_diary': 'பண்ணை நாட்குறிப்பு',
    'personalized_advisory': 'தனிப்பட்ட ஆலோசனை',
    'crop_health': 'பயிர் ஆரோக்கியம்',
    'reminders': 'நினைவூட்டல்கள்',
    'help_support': 'உதவி & ஆதரவு',
    
    // Farm Diary
    'track_activities': 'உங்கள் விவசாய நடவடிக்கைகளைக் கண்காணி',
    'all': 'அனைத்தும்',
    'completed': 'முடிந்தது',
    'sowing': 'விதைத்தல்',
    'irrigation': 'நீர்ப்பாசனம்',
    'pest_control': 'பூச்சி கட்டுப்பாடு',
    'fertilizer': 'உரம்',
    'harvesting': 'அறுவடை',
    'pruning': 'கத்தரித்தல்',
    
    // Advisory
    'smart_advisory': 'ஸ்மார்ட் ஆலோசனை',
    'ai_insights': 'AI சக்தி வாய்ந்த விவசாய நுண்ணறிவு',
    'urgent': 'அவசரம்',
    'medium': 'நடுத்தர',
    'low_priority': 'குறைந்த முன்னுரிமை',
    'weather': 'வானிலை',
    'crop_management': 'பயிர் மேலாண்மை',
    'nutrition': 'ஊட்டச்சத்து',
    'recommendation': 'பரிந்துரை',
    
    // Crop & Soil
    'crop_soil_management': 'பயிர் & மண் மேலாண்மை',
    'soil_health': 'மண் ஆரோக்கியம்',
    'pest_risks': 'பூச்சி அபாயங்கள்',
    'disease_detection': 'நோய் கண்டறிதல்',
    'recommendations': 'பரிந்துரைகள்',
    'upload_image': 'படம் பதிவேற்று',
    'ai_recommendations': 'AI பரிந்துரைகள்',
    
    // Help & Support
    'help_center': 'உதவி மையம்',
    'app_tutorial': 'ஆப் டுடோரியல்',
    'contact_support': 'ஆதரவைத் தொடர்பு கொள்ளுங்கள்',
    'call_expert': 'விவசாய நிபுணரை அழைக்கவும்',
    'chat_support': 'AI உடன் அரட்டை',
    'quick_questions': 'விரைவு கேள்விகள்',
    
    // Reminders
    'stay_on_top': 'பண்ணை பணிகளில் முன்னிலை பெறுங்கள்',
    'today': 'இன்று',
    'upcoming': 'வரவிருக்கும்',
    'this_week': 'இந்த வாரம்',
    
    // Profile
    'manage_account': 'உங்கள் கணக்கை நிர்வகிக்கவும்',
    'personal_info': 'தனிப்பட்ட தகவல்',
    'land_size': 'நில அளவு',
    'experience': 'அனுபவம்',
    'crops': 'பயிர்கள்',
    'member_since': 'உறுப்பினர் முதல்',
    'achievements': 'சாதனைகள்',
    'notifications': 'அறிவிப்புகள்',
    'privacy_security': 'தனியுரிமை & பாதுகாப்பு',
    
    // Onboarding
    'welcome_to_vithuai': 'விது AI-க்கு வரவேற்கிறோம்',
    'your_farming_assistant': 'உங்கள் விவசாய உதவியாளர்',
    'lets_setup': 'உங்கள் பண்ணையை அமைப்போம்',
    'sign_up': 'பதிவு செய்',
    'create_account': 'உங்கள் கணக்கை உருவாக்கவும்',
    'personal_details': 'தனிப்பட்ட விவரங்கள்',
    'land_details': 'நில விவரங்கள்',
    'crop_details': 'பயிர் விவரங்கள்',
    'facilities': 'கிடைக்கும் வசதிகள்',
    'review_complete': 'மதிப்பாய்வு & முடிக்கவும்',
    
    // Weather & Stats
    'temp': 'வெப்பநிலை',
    'humidity': 'ஈரப்பதம்',
    'wind': 'காற்று',
    'rain_chance': 'மழை வாய்ப்பு',
    
    // Actions
    'see_more': 'மேலும் பார்க்க',
    'view_all': 'அனைத்தையும் பார்க்க',
    'mark_done': 'முடிந்ததாகக் குறி',
    'set_reminder': 'நினைவூட்டல் அமை',
    'got_it': 'புரிந்தது',
    'remind_later': 'பின்னர் நினைவூட்டு',
    'more_info': 'மேலும் தகவல்',
  },
  
  hindi: {
    // Common
    'app_name': 'वितु AI - कृषि सखी',
    'welcome': 'स्वागत',
    'hello': 'नमस्कार',
    'profile': 'प्रोफ़ाइल',
    'settings': 'सेटिंग्स',
    'logout': 'साइन आउट',
    'continue': 'जारी रखें',
    'save': 'सहेजें',
    'cancel': 'रद्द करें',
    'edit': 'संपादित करें',
    'delete': 'हटाएं',
    'add': 'जोड़ें',
    'done': 'पूर्ण',
    'pending': 'लंबित',
    'close': 'बंद करें',
    
    // Languages
    'language': 'भाषा',
    'select_language': 'अपनी भाषा चुनें',
    
    // Home/Dashboard
    'dashboard': 'डैशबोर्ड',
    'quick_access': 'त्वरित पहुंच',
    'todays_smart_advice': 'आज की स्मार्ट सलाह',
    'farm_at_glance': 'एक नज़र में फार्म',
    'urgent_alerts': 'तत्काल अलर्ट',
    
    // Navigation
    'farm_diary': 'फार्म डायरी',
    'personalized_advisory': 'व्यक्तिगत सलाह',
    'crop_health': 'फसल स्वास्थ्य',
    'reminders': 'रिमाइंडर',
    'help_support': 'मदद और सहायता',
    
    // Farm Diary
    'track_activities': 'अपनी खेती गतिविधियों को ट्रैक करें',
    'all': 'सभी',
    'completed': 'पूर्ण',
    'sowing': 'बुवाई',
    'irrigation': 'सिंचाई',
    'pest_control': 'कीट नियंत्रण',
    'fertilizer': 'उर्वरक',
    'harvesting': 'कटाई',
    'pruning': 'छंटाई',
    
    // Advisory
    'smart_advisory': 'स्मार्ट सलाह',
    'ai_insights': 'AI-संचालित खेती अंतर्दृष्टि',
    'urgent': 'तत्काल',
    'medium': 'मध्यम',
    'low_priority': 'कम प्राथमिकता',
    'weather': 'मौसम',
    'crop_management': 'फसल प्रबंधन',
    'nutrition': 'पोषण',
    'recommendation': 'सिफारिश',
    
    // Crop & Soil
    'crop_soil_management': 'फसल और मिट्टी प्रबंधन',
    'soil_health': 'मिट्टी स्वास्थ्य',
    'pest_risks': 'कीट जोखिम',
    'disease_detection': 'रोग पहचान',
    'recommendations': 'सिफारिशें',
    'upload_image': 'छवि अपलोड करें',
    'ai_recommendations': 'AI सिफारिशें',
    
    // Help & Support
    'help_center': 'सहायता केंद्र',
    'app_tutorial': 'ऐप ट्यूटोरियल',
    'contact_support': 'सहायता से संपर्क करें',
    'call_expert': 'कृषि विशेषज्ञ को कॉल करें',
    'chat_support': 'AI के साथ चैट करें',
    'quick_questions': 'त्वरित प्रश्न',
    
    // Reminders
    'stay_on_top': 'फार्म कार्यों में सबसे आगे रहें',
    'today': 'आज',
    'upcoming': 'आगामी',
    'this_week': 'इस सप्ताह',
    
    // Profile
    'manage_account': 'अपने खाते का प्रबंधन करें',
    'personal_info': 'व्यक्तिगत जानकारी',
    'land_size': 'भूमि का आकार',
    'experience': 'अनुभव',
    'crops': 'फसलें',
    'member_since': 'से सदस्य',
    'achievements': 'उपलब्धियां',
    'notifications': 'सूचनाएं',
    'privacy_security': 'गोपनीयता और सुरक्षा',
    
    // Onboarding
    'welcome_to_vithuai': 'वितु AI में आपका स्वागत है',
    'your_farming_assistant': 'आपका खेती सहायक',
    'lets_setup': 'आइए अपना फार्म सेट करें',
    'sign_up': 'साइन अप करें',
    'create_account': 'अपना खाता बनाएं',
    'personal_details': 'व्यक्तिगत विवरण',
    'land_details': 'भूमि विवरण',
    'crop_details': 'फसल विवरण',
    'facilities': 'उपलब्ध सुविधाएं',
    'review_complete': 'समीक्षा और पूर्ण करें',
    
    // Weather & Stats
    'temp': 'तापमान',
    'humidity': 'आर्द्रता',
    'wind': 'हवा',
    'rain_chance': 'वर्षा की संभावना',
    
    // Actions
    'see_more': 'और देखें',
    'view_all': 'सभी देखें',
    'mark_done': 'पूर्ण चिह्नित करें',
    'set_reminder': 'रिमाइंडर सेट करें',
    'got_it': 'समझ गया',
    'remind_later': 'बाद में याद दिलाएं',
    'more_info': 'अधिक जानकारी',
  },
  
  malayalam: {
    // Common
    'app_name': 'വിതു AI - കൃഷി സഖി',
    'welcome': 'സ്വാഗതം',
    'hello': 'നമസ്കാരം',
    'profile': 'പ്രൊഫൈൽ',
    'settings': 'ക്രമീകരണങ്ങൾ',
    'logout': 'സൈൻ ഔട്ട്',
    'continue': 'തുടരുക',
    'save': 'സംരക്ഷിക്കുക',
    'cancel': 'റദ്ദാക്കുക',
    'edit': 'എഡിറ്റ്',
    'delete': 'ഇല്ലാതാക്കുക',
    'add': 'ചേർക്കുക',
    'done': 'പൂർത്തിയായി',
    'pending': 'കാത്തിരിപ്പിൽ',
    'close': 'അടയ്ക്കുക',
    
    // Languages
    'language': 'ഭാഷ',
    'select_language': 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    
    // Home/Dashboard
    'dashboard': 'ഡാഷ്ബോർഡ്',
    'quick_access': 'പെട്ടെന്നുള്ള പ്രവേശനം',
    'todays_smart_advice': 'ഇന്നത്തെ സ്മാർട്ട് ഉപദേശം',
    'farm_at_glance': 'ഒറ്റനോട്ടത്തിൽ കൃഷി',
    'urgent_alerts': 'അടിയന്തര അലേർട്ടുകൾ',
    
    // Navigation
    'farm_diary': 'കൃഷി ഡയറി',
    'personalized_advisory': 'വ്യക്തിപരമായ ഉപദേശം',
    'crop_health': 'വിള ആരോഗ്യം',
    'reminders': 'ഓർമ്മപ്പെടുത്തലുകൾ',
    'help_support': 'സഹായം & പിന്തുണ',
    
    // Farm Diary
    'track_activities': 'നിങ്ങളുടെ കൃഷി പ്രവർത്തനങ്ങൾ ട്രാക്ക് ചെയ്യുക',
    'all': 'എല്ലാം',
    'completed': 'പൂർത്തിയായി',
    'sowing': 'വിതയ്ക്കൽ',
    'irrigation': 'നനയ്ക്കൽ',
    'pest_control': 'കീട നിയന്ത്രണം',
    'fertilizer': 'വളം',
    'harvesting': 'വിളവെടുപ്പ്',
    'pruning': 'വെട്ടി മാറ്റൽ',
    
    // Advisory
    'smart_advisory': 'സ്മാർട്ട് ഉപദേശം',
    'ai_insights': 'AI-പവർ ചെയ്ത കൃഷി സൂചനകൾ',
    'urgent': 'അടിയന്തരം',
    'medium': 'ഇടത്തരം',
    'low_priority': 'കുറഞ്ഞ മുൻഗണന',
    'weather': 'കാലാവസ്ഥ',
    'crop_management': 'വിള മാനേജ്മെന്റ്',
    'nutrition': 'പോഷകാഹാരം',
    'recommendation': 'ശുപാർശ',
    
    // Crop & Soil
    'crop_soil_management': 'വിള & മണ്ണ് മാനേജ്മെന്റ്',
    'soil_health': 'മണ്ണിന്റെ ആരോഗ്യം',
    'pest_risks': 'കീട അപകടസാധ്യതകൾ',
    'disease_detection': 'രോഗം കണ്ടെത്തൽ',
    'recommendations': 'ശുപാർശകൾ',
    'upload_image': 'ചിത്രം അപ്ലോഡ് ചെയ്യുക',
    'ai_recommendations': 'AI ശുപാർശകൾ',
    
    // Help & Support
    'help_center': 'സഹായ കേന്ദ്രം',
    'app_tutorial': 'ആപ്പ് ട്യൂട്ടോറിയൽ',
    'contact_support': 'പിന്തുണയെ ബന്ധപ്പെടുക',
    'call_expert': 'കാർഷിക വിദഗ്ദ്ധനെ വിളിക്കുക',
    'chat_support': 'AI-യുമായി ചാറ്റ് ചെയ്യുക',
    'quick_questions': 'പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ',
    
    // Reminders
    'stay_on_top': 'കൃഷി ജോലികളിൽ മുൻപന്തിയിൽ നിൽക്കുക',
    'today': 'ഇന്ന്',
    'upcoming': 'വരാനിരിക്കുന്നവ',
    'this_week': 'ഈ ആഴ്ച',
    
    // Profile
    'manage_account': 'നിങ്ങളുടെ അക്കൗണ്ട് മാനേജ് ചെയ്യുക',
    'personal_info': 'വ്യക്തിഗത വിവരങ്ങൾ',
    'land_size': 'ഭൂമി വലുപ്പം',
    'experience': 'പരിചയം',
    'crops': 'വിളകൾ',
    'member_since': 'മുതൽ അംഗം',
    'achievements': 'നേട്ടങ്ങൾ',
    'notifications': 'അറിയിപ്പുകൾ',
    'privacy_security': 'സ്വകാര്യത & സുരക്ഷ',
    
    // Onboarding
    'welcome_to_vithuai': 'വിതു AI-യിലേക്ക് സ്വാഗതം',
    'your_farming_assistant': 'നിങ്ങളുടെ കൃഷി സഹായി',
    'lets_setup': 'നിങ്ങളുടെ കൃഷി സജ്ജീകരിക്കാം',
    'sign_up': 'സൈൻ അപ്പ്',
    'create_account': 'നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    'personal_details': 'വ്യക്തിഗത വിശദാംശങ്ങൾ',
    'land_details': 'ഭൂമി വിശദാംശങ്ങൾ',
    'crop_details': 'വിള വിശദാംശങ്ങൾ',
    'facilities': 'ലഭ്യമായ സൗകര്യങ്ങൾ',
    'review_complete': 'അവലോകനം & പൂർത്തിയാക്കുക',
    
    // Weather & Stats
    'temp': 'താപനില',
    'humidity': 'ഈർപ്പം',
    'wind': 'കാറ്റ്',
    'rain_chance': 'മഴയുടെ സാധ്യത',
    
    // Actions
    'see_more': 'കൂടുതൽ കാണുക',
    'view_all': 'എല്ലാം കാണുക',
    'mark_done': 'പൂർത്തിയാക്കി എന്ന് അടയാളപ്പെടുത്തുക',
    'set_reminder': 'ഓർമ്മപ്പെടുത്തൽ സജ്ജമാക്കുക',
    'got_it': 'മനസ്സിലായി',
    'remind_later': 'പിന്നീട് ഓർമ്മിപ്പിക്കുക',
    'more_info': 'കൂടുതൽ വിവരം',
  },
};
