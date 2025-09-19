import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  BookOpen, 
  Brain, 
  Bell, 
  Activity,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Calendar,
  TrendingUp,
  Leaf,
  AlertTriangle,
  Bug
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';

const Home = () => {
  const navigate = useNavigate();
  
  const weatherData = {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 78,
    wind: 12,
    rain: 60
  };

  const quickStats = [
    { label: 'Crops', value: '4 types', icon: '🌱' },
    { label: 'Land', value: '2.5 acres', icon: '🌾' },
    { label: 'Tasks', value: '3 pending', icon: '📋' },
    { label: 'Harvest', value: '15 days', icon: '⏰' }
  ];

  const quickActions = [
    {
      title: 'Farm Diary',
      subtitle: 'Track activities',
      icon: BookOpen,
      color: 'bg-purple-500',
      path: '/diary'
    },
    {
      title: 'Personalized Advisory',
      subtitle: 'Smart insights', 
      icon: Brain,
      color: 'bg-sky-blue',
      path: '/advisory'
    },
    {
      title: 'Crop Health',
      subtitle: 'Monitor crops',
      icon: Activity, 
      color: 'bg-emerald-500',
      path: '/crop-soil-management'
    },
    {
      title: 'Schemes',
      subtitle: 'Government schemes',
      icon: Bell,
      color: 'bg-harvest-yellow',
      path: '/schemes'
    }
  ];

  const todaysAdvice = [
    {
      type: 'weather',
      title: 'Rain Alert 🌧️',
      message: 'Light rain expected in 6 hours. Delay pesticide application.',
      urgent: true
    },
    {
      type: 'crop',
      title: 'Rice Stage Update',
      message: 'Your rice is in flowering stage. Monitor for pests.',
      urgent: false
    },
    {
      type: 'irrigation',
      title: 'Irrigation Reminder',
      message: 'Coconut trees need watering. Best time: 4-6 PM.',
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen gradient-hero pb-20 pt-24">
      <TopNav />
      
      {/* Header - Greeting and Weather (First) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 lg:p-6 lg:max-w-6xl lg:mx-auto"
      >
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            👋 Namaskaram, Riyaz!
          </h1>
          <p className="text-foreground/70 text-sm lg:text-base">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Weather Widget */}
        <Card className="glass-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl lg:text-4xl">
                  {weatherData.condition.includes('Rain') ? '🌧️' : 
                   weatherData.condition.includes('Cloud') ? '⛅' : '☀️'}
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold">{weatherData.temp}°C</div>
                  <div className="text-sm lg:text-base text-foreground/70">{weatherData.condition}</div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center text-sm lg:text-base">
                  <Droplets className="w-4 h-4 mr-1 text-sky-blue" />
                  {weatherData.humidity}%
                </div>
                <div className="flex items-center text-sm lg:text-base">
                  <Wind className="w-4 h-4 mr-1 text-foreground/60" />
                  {weatherData.wind} km/h
                </div>
                <div className="flex items-center text-sm lg:text-base">
                  <CloudRain className="w-4 h-4 mr-1 text-sky-blue" />
                  {weatherData.rain}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Urgent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 lg:px-6 mb-6 lg:max-w-6xl lg:mx-auto"
      >
        <div className="space-y-3">
          <Card className="glass-card border-2 border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive text-sm lg:text-base">🚨 Heavy rainfall expected in 12 hrs</h3>
                  <p className="text-xs lg:text-sm text-destructive/80">Delay pesticide spraying until conditions improve</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-2 border-orange/30 bg-orange/5">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange/20 rounded-full flex items-center justify-center">
                  <Bug className="w-5 h-5 text-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange text-sm lg:text-base">🐛 Pest outbreak risk detected</h3>
                  <p className="text-xs lg:text-sm text-orange/80">Monitor banana crops closely for early signs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 lg:px-6 mb-8 lg:max-w-6xl lg:mx-auto"
      >
        <div className="grid grid-cols-4 gap-3 lg:gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="glass-card-hover text-center">
              <CardContent className="p-3 lg:p-4">
                <div className="text-2xl lg:text-3xl mb-1">{stat.icon}</div>
                <div className="text-xs lg:text-sm font-medium">{stat.value}</div>
                <div className="text-xs lg:text-sm text-foreground/60">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 lg:px-6 mb-8 lg:max-w-6xl lg:mx-auto"
      >
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-foreground">Quick Access</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(action.path)}
            >
              <Card className="glass-card-hover animate-tilt-hover cursor-pointer">
                <CardContent className="p-4 lg:p-6">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                    <action.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm lg:text-base">{action.title}</h3>
                  <p className="text-xs lg:text-sm text-foreground/70">{action.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Today's Smart Advice - 2x2 Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 lg:px-6 mb-8 lg:max-w-6xl lg:mx-auto"
      >
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-foreground">Today's Smart Advice</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="glass-card-hover border border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-sky-blue/20 rounded-lg flex items-center justify-center mr-3">
                  <Droplets className="w-4 h-4 text-sky-blue" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">🌾 Best time to irrigate</h4>
              </div>
              <p className="text-sm text-foreground/70 mb-3 leading-relaxed">Water your crops between 4-6 PM today for optimal absorption</p>
              <Button size="sm" variant="ghost" className="text-xs">
                See More →
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card-hover border border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-harvest-yellow/20 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="w-4 h-4 text-harvest-yellow" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">🌦️ Fertilizer schedule</h4>
              </div>
              <p className="text-sm text-foreground/70 mb-3 leading-relaxed">Apply organic compost to pepper plants this week</p>
              <Button size="sm" variant="ghost" className="text-xs">
                See More →
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card-hover border border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-farm-green/20 rounded-lg flex items-center justify-center mr-3">
                  <Bell className="w-4 h-4 text-farm-green" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">🐄 Vaccination reminder</h4>
              </div>
              <p className="text-sm text-foreground/70 mb-3 leading-relaxed">Livestock vaccination due in 3 days - schedule appointment</p>
              <Button size="sm" variant="ghost" className="text-xs">
                See More →
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card-hover border border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-earth-brown/20 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-4 h-4 text-earth-brown" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">🏪 Market price trend</h4>
              </div>
              <p className="text-sm text-foreground/70 mb-3 leading-relaxed">Pepper prices increasing by 15% - good time to sell</p>
              <Button size="sm" variant="ghost" className="text-xs">
                See More →
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Farm Overview Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-4 lg:px-6 mb-32 lg:mb-20 lg:max-w-6xl lg:mx-auto"
      >
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-foreground">Farm at a Glance</h2>
        <div className="flex space-x-4 lg:space-x-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible">
          <Card className="glass-card min-w-[280px] lg:min-w-0">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-base lg:text-lg">Soil Health</h4>
                <TrendingUp className="w-5 h-5 text-farm-green" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm lg:text-base text-foreground/70">pH Level</span>
                  <span className="text-sm lg:text-base font-medium">6.8 (Good)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm lg:text-base text-foreground/70">Moisture</span>
                  <span className="text-sm lg:text-base font-medium">78%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm lg:text-base text-foreground/70">Nutrients</span>
                  <Badge className="bg-farm-green/20 text-farm-green text-xs lg:text-sm">Optimal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card min-w-[280px] lg:min-w-0">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-foreground text-base lg:text-lg">Crop Status</h4>
                <Leaf className="w-5 h-5 text-farm-green" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm lg:text-base text-foreground/70">Rice</span>
                  <Badge className="bg-harvest-yellow/20 text-harvest-yellow text-xs lg:text-sm">Flowering</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm lg:text-base text-foreground/70">Coconut</span>
                  <Badge className="bg-farm-green/20 text-farm-green text-xs lg:text-sm">Healthy</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm lg:text-base text-foreground/70">Pepper</span>
                  <Badge className="bg-farm-green/20 text-farm-green text-xs lg:text-sm">Growing</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Home;