import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Volume2,
  CheckCircle,
  Clock,
  TrendingUp,
  CloudRain,
  Bug,
  Leaf,
  ArrowLeft,
  Play
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Advisory = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const advisories = [
    {
      id: 1,
      type: 'weather',
      priority: 'high',
      title: 'Rain Alert - Action Required 🌧️',
      message: 'Heavy rain expected in next 12 hours. Delay pesticide spraying and ensure proper drainage in rice fields.',
      recommendation: 'Wait 48 hours after rain before applying any chemicals. Check for water logging.',
      category: 'Weather',
      time: '2 hours ago',
      actions: ['Got it', 'Remind Later', 'More Info']
    },
    {
      id: 2,
      type: 'crop',
      priority: 'medium', 
      title: 'Rice Flowering Stage Detected 🌾',
      message: 'Your rice crop has entered the flowering stage. This is a critical period for grain formation.',
      recommendation: 'Maintain consistent water levels. Monitor for pests like rice bugs. Apply potash fertilizer if needed.',
      category: 'Crop Management',
      time: '5 hours ago',
      actions: ['Mark Done', 'Set Reminder']
    },
    {
      id: 3,
      type: 'pest',
      priority: 'low',
      title: 'Coconut Pest Prevention 🐛',
      message: 'Weather conditions favor red palm weevil activity. Preventive measures recommended.',
      recommendation: 'Inspect coconut trees weekly. Remove dried fronds. Set up pheromone traps if available.',
      category: 'Pest Control',
      time: '1 day ago',
      actions: ['Schedule Inspection']
    },
    {
      id: 4,
      type: 'nutrition',
      priority: 'medium',
      title: 'Pepper Nutrition Check 🌶️',
      message: 'Pepper plants showing signs of potassium deficiency based on recent weather data.',
      recommendation: 'Apply wood ash or potash fertilizer. Ensure proper drainage to prevent root rot.',
      category: 'Nutrition',
      time: '1 day ago',
      actions: ['Add to Diary', 'Buy Fertilizer']
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-harvest-yellow/20 text-harvest-yellow border-harvest-yellow/30';
      case 'low': return 'bg-farm-green/20 text-farm-green border-farm-green/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'weather': return '🌧️';
      case 'crop': return '🌾';
      case 'pest': return '🐛';
      case 'nutrition': return '🌱';
      default: return '💡';
    }
  };

  return (
    <div className="min-h-screen gradient-hero pb-20 pt-24">
      <TopNav />
      
      {/* Header with border */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 lg:p-6 lg:max-w-6xl lg:mx-auto border-b border-white/20 mb-6"
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
              <h1 className="text-2xl font-bold text-foreground flex items-center">
                <Brain className="w-6 h-6 mr-2 text-sky-blue" />
                {t('smartAdvisory')}
              </h1>
              <p className="text-foreground/70">{t('aiPoweredInsights')}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">1</div>
              <div className="text-xs text-foreground/70">{t('urgent')}</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-harvest-yellow">2</div>
              <div className="text-xs text-foreground/70">{t('medium')}</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-farm-green">1</div>
              <div className="text-xs text-foreground/70">{t('lowPriority')}</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Advisory Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 lg:px-6 lg:max-w-6xl lg:mx-auto space-y-4"
      >
        {advisories.map((advisory, index) => (
          <motion.div
            key={advisory.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`glass-card-hover border-2 ${getPriorityColor(advisory.priority)} mx-4 lg:mx-0`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getCategoryIcon(advisory.type)}</span>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {advisory.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs mr-2">
                          {advisory.category}
                        </Badge>
                        <span className="text-xs text-foreground/60">{advisory.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="p-2">
                    <Volume2 className="w-4 h-4 text-farm-green" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {advisory.message}
                  </p>
                  
                  <div className="bg-farm-green/10 rounded-lg p-3 border-l-4 border-farm-green">
                    <p className="text-sm text-foreground font-medium mb-1">💡 Recommendation:</p>
                    <p className="text-sm text-foreground/80">{advisory.recommendation}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {advisory.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        size="sm"
                        variant={actionIndex === 0 ? 'default' : 'outline'}
                        className={actionIndex === 0 ? '' : 'glass-card border-white/20'}
                      >
                        {action === 'Got it' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {action === 'Remind Later' && <Clock className="w-3 h-3 mr-1" />}
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Weekly Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 lg:px-6 lg:max-w-6xl lg:mx-auto mt-8 mb-32 lg:mb-8"
      >
        <Card className="glass-card">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-sky-blue" />
              7-Day Farm Forecast
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl mr-3">🌧️</span>
                  <div>
                    <div className="text-sm font-medium">Tomorrow</div>
                    <div className="text-xs text-foreground/70">Heavy Rain Expected</div>
                  </div>
                </div>
                <Badge className="bg-destructive/20 text-destructive">High Alert</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl mr-3">☀️</span>
                  <div>
                    <div className="text-sm font-medium">Day 3-4</div>
                    <div className="text-xs text-foreground/70">Sunny Weather</div>
                  </div>
                </div>
                <Badge className="bg-farm-green/20 text-farm-green">Good for Spraying</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Advisory;