import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Languages, ChevronDown, Sprout, Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const TopNav = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignOut = () => {
    navigate('/login');
  };

  const handleLanguageChange = (lang: 'english' | 'tamil' | 'hindi' | 'malayalam') => {
    setLanguage(lang);
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  const notifications = [
    {
      id: 1,
      title: 'Heavy rainfall alert',
      message: 'Delay pesticide spraying',
      time: '2 hours ago',
      type: 'urgent',
      read: false
    },
    {
      id: 2,
      title: 'Rice flowering stage',
      message: 'Monitor for pests',
      time: '5 hours ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Irrigation reminder',
      message: 'Coconut trees need watering',
      time: '1 day ago',
      type: 'reminder',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'english': return 'EN';
      case 'tamil': return 'TA';
      case 'hindi': return 'HI';
      case 'malayalam': return 'ML';
      default: return 'EN';
    }
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
                        {/* Notification Icon */}
            <Popover open={showNotifications} onOpenChange={setShowNotifications}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="glass-card border-white/20 relative">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-0 glass-card border-white/30"
                align="end"
                sideOffset={8}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{t('notifications')}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-auto"
                      onClick={() => setShowNotifications(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <Card key={notif.id} className={`glass-card cursor-pointer hover:bg-white/20 ${!notif.read ? 'border-l-4 border-l-farm-green' : ''}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground text-sm">{notif.title}</h4>
                              <p className="text-xs text-foreground/70 mt-1">{notif.message}</p>
                              <p className="text-xs text-foreground/50 mt-2">{notif.time}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-farm-green rounded-full ml-2 flex-shrink-0"></div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 glass-card border-white/20"
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/reminders');
                    }}
                  >
                    {t('view_all')}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="glass-card border-white/20">
                  <Languages className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{getLanguageLabel(language)}</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-card border-white/30 bg-white/95 backdrop-blur-md" align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('english')}>
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('tamil')}>
                  <span>தமிழ் (Tamil)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('hindi')}>
                  <span>हिंदी (Hindi)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('malayalam')}>
                  <span>മലയാളം (Malayalam)</span>
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
