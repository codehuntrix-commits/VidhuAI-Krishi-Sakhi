import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Brain, HeadphonesIcon, Leaf } from 'lucide-react';
import { MicButton } from '@/components/MicButton';
import { useLanguage } from '@/contexts/LanguageContext';

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const currentPath = location.pathname;

  const leftItems = [
    { id: 'diary', label: t('farm_diary'), icon: BookOpen, path: '/diary' },
    { id: 'advisory', label: t('personalized_advisory'), icon: Brain, path: '/advisory' }
  ];

  const rightItems = [
    { id: 'crop-soil', label: t('crop_health'), icon: Leaf, path: '/crop-soil-management' },
    { id: 'help-support', label: t('help_support'), icon: HeadphonesIcon, path: '/help-support' }
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="glass-card mx-4 mb-4 rounded-2xl border-white/30 lg:mx-auto lg:max-w-2xl">
        <div className="flex items-center justify-between py-4 px-4 lg:px-8">
          {/* Left Items */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {leftItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-farm-green/20 text-farm-green' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="w-1 h-1 bg-farm-green rounded-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Center Item (Mic Button) */}
          <div className="flex-shrink-0 mx-2">
            <MicButton />
          </div>

          {/* Right Items */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {rightItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-farm-green/20 text-farm-green' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="w-1 h-1 bg-farm-green rounded-full"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};