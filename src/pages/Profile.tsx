import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  User,
  Edit,
  MapPin,
  Phone,
  Mail,
  Languages,
  Volume2,
  Smartphone,
  Shield,
  Bell,
  Moon,
  HelpCircle,
  ArrowLeft,
  Camera,
  Settings,
  Leaf
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  const farmerData = {
    name: 'Riyaz',
    age: 30,
    location: 'Kottayam, Kerala',
    phone: '+91 98765 43210',
    email: 'riyaz@gmail.com',
    landSize: '2.5 acres',
    crops: ['Rice', 'Coconut', 'Pepper', 'Rubber'],
    experience: '10 years',
    joinDate: 'Sept 2025'
  };

  const settingsCategories = [
    {
      title: 'Language & Voice',
      icon: Languages,
      items: [
        { 
          label: 'App Language', 
          value: 'Malayalam', 
          icon: Languages,
          action: 'select'
        },
        { 
          label: 'Voice Guidance', 
          value: true, 
          icon: Volume2,
          action: 'toggle'
        },
        { 
          label: 'Voice Speed', 
          value: 'Normal', 
          icon: Volume2,
          action: 'select'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { 
          label: 'Weather Alerts', 
          value: true, 
          icon: Bell,
          action: 'toggle'
        },
        { 
          label: 'Farming Reminders', 
          value: true, 
          icon: Bell,
          action: 'toggle'
        },
        { 
          label: 'Market Updates', 
          value: false, 
          icon: Bell,
          action: 'toggle'
        }
      ]
    },
    {
      title: 'Accessibility',
      icon: Smartphone,
      items: [
        { 
          label: 'Large Text', 
          value: false, 
          icon: Smartphone,
          action: 'toggle'
        },
        { 
          label: 'Offline SMS Alerts', 
          value: true, 
          icon: Smartphone,
          action: 'toggle'
        },
        { 
          label: 'IVR Support', 
          value: true, 
          icon: Phone,
          action: 'toggle'
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { 
          label: 'Share Location', 
          value: true, 
          icon: MapPin,
          action: 'toggle'
        },
        { 
          label: 'Data Usage', 
          value: 'View Settings', 
          icon: Shield,
          action: 'button'
        },
        { 
          label: 'Export Data', 
          value: 'Download', 
          icon: Shield,
          action: 'button'
        }
      ]
    }
  ];

  const achievements = [
    { title: 'Early Adopter', icon: '🌟', description: 'Joined VithuAI in first month' },
    { title: 'Active Farmer', icon: '🚜', description: 'Logged 50+ farm activities' },
    { title: 'Smart Advisor', icon: '🧠', description: 'Followed 20+ AI recommendations' }
  ];

  return (
    <div className="min-h-screen gradient-hero pb-20 pt-24">
      <TopNav />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 lg:p-6 lg:max-w-6xl lg:mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home')}
              className="mr-3 p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile</h1>
              <p className="text-foreground/70">Manage your account</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="glass-card border-white/20">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-8"
      >
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-farm-green/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-farm-green" />
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-farm-green rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{farmerData.name}</h2>
                <p className="text-foreground/70">{farmerData.age} years old</p>
                <div className="flex items-center mt-2">
                  <MapPin className="w-4 h-4 mr-1 text-foreground/60" />
                  <span className="text-sm text-foreground/70">{farmerData.location}</span>
                </div>
              </div>
              <Button size="sm" variant="outline" className="glass-card border-white/20">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <div className="text-lg font-bold text-foreground">{farmerData.landSize}</div>
                <div className="text-xs text-foreground/70">Land Size</div>
              </div>
              <div className="text-center p-3 bg-white/10 rounded-lg">
                <div className="text-lg font-bold text-foreground">{farmerData.experience}</div>
                <div className="text-xs text-foreground/70">Experience</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">Crops</span>
                <div className="flex flex-wrap gap-1">
                  {farmerData.crops.slice(0, 3).map((crop, i) => (
                    <Badge key={i} className="bg-farm-green/20 text-farm-green text-xs">
                      {crop}
                    </Badge>
                  ))}
                  {farmerData.crops.length > 3 && (
                    <Badge className="bg-white/20 text-xs">
                      +{farmerData.crops.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">Member since</span>
                <span className="text-sm font-medium text-foreground">{farmerData.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-8"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">Achievements</h2>
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement, index) => (
            <Card key={index} className="glass-card-hover">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{achievement.title}</h4>
                    <p className="text-xs text-foreground/70">{achievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 space-y-6"
      >
        {settingsCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center">
              <category.icon className="w-5 h-5 mr-2" />
              {category.title}
            </h2>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4 text-foreground/60" />
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                      </div>
                      <div>
                        {item.action === 'toggle' && (
                          <Switch checked={item.value as boolean} />
                        )}
                        {item.action === 'select' && (
                          <span className="text-sm text-foreground/70">{item.value as string}</span>
                        )}
                        {item.action === 'button' && (
                          <Button size="sm" variant="outline" className="text-xs">
                            {item.value as string}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Help & Support */}
        <Card className="glass-card">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Help & Support
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start glass-card border-white/20">
                <Phone className="w-4 h-4 mr-2" />
                Call Support: 1800-123-4567
              </Button>
              <Button variant="outline" className="w-full justify-start glass-card border-white/20">
                <Mail className="w-4 h-4 mr-2" />
                Email: support@vithuai.com
              </Button>
              <Button variant="outline" className="w-full justify-start glass-card border-white/20">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ & Tutorials
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="glass-card mb-8">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Leaf className="w-6 h-6 text-farm-green mr-2" />
              <span className="font-bold text-foreground">VithuAI - Krishi Sakhi</span>
            </div>
            <p className="text-xs text-foreground/70 mb-2">Version 1.0.0</p>
            <p className="text-xs text-foreground/60">
              Your Malayalam farming assistant
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Profile;