import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Languages, ChevronDown, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

export const TopNav = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const handleSignOut = () => {
    // Add signout logic here
    navigate('/login');
  };

  const handleLanguageChange = (lang: 'en' | 'ml') => {
    setLanguage(lang);
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-card mx-4 mt-4 rounded-2xl border-white/30 lg:mx-8">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
          {/* Logo - Clickable */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Sprout className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-primary">VithuAI</h1>
              <p className="text-xs text-foreground/70">Krishi Sakhi</p>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="glass-card border-white/20">
                  <Languages className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{language === 'ml' ? 'ML' : 'EN'}</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card border-white/30 bg-white/95 backdrop-blur-md" align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('ml')}>
                  <span>മലയാളം (Malayalam)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Button */}
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-white/20"
              onClick={() => navigate('/profile')}
            >
              <User className="w-4 h-4" />
            </Button>

            {/* Sign Out Button */}
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-white/20 hover:bg-destructive/10 hover:border-destructive/30"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};