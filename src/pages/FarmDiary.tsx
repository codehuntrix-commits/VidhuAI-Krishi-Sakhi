import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Calendar,
  CheckCircle,
  Clock,
  Sprout,
  Droplets,
  Bug,
  Scissors,
  ArrowLeft,
  TrendingUp,
  Target
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { useNavigate } from 'react-router-dom';
import { AddActivityModal } from '@/components/AddActivityModal';
import { toast } from '@/hooks/use-toast';

const FarmDiary = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivityType, setSelectedActivityType] = useState<string | undefined>();
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'sowing',
      title: 'Rice Sowing',
      date: '2025-09-15',
      status: 'completed',
      icon: '🌱',
      notes: 'Sowed in 1.5 acres with variety Jyothi'
    },
    {
      id: 2,
      type: 'irrigation',
      title: 'Coconut Irrigation',
      date: '2025-09-18',
      status: 'pending',
      icon: '💧',
      notes: 'Need to water coconut trees in evening'
    },
    {
      id: 3,
      type: 'pest-control',
      title: 'Pest Check',
      date: '2025-09-17',
      status: 'completed',
      icon: '🐛',
      notes: 'Checked for rice leaf folder, all good'
    },
    {
      id: 4,
      type: 'fertilizer',
      title: 'Apply Fertilizer',
      date: '2025-09-20',
      status: 'pending',
      icon: '🌾',
      notes: 'NPK application for pepper plants'
    },
  ]);

  const activityTypes = [
    { id: 'sowing', name: 'Sowing', icon: '🌱' },
    { id: 'irrigation', name: 'Irrigation', icon: '💧' },
    { id: 'pest-control', name: 'Pest Control', icon: '🐛' },
    { id: 'fertilizer', name: 'Fertilizer', icon: '🌾' },
    { id: 'harvesting', name: 'Harvesting', icon: '✂️' },
    { id: 'pruning', name: 'Pruning', icon: '🪚' }
  ];

  const filters = [
    { id: 'all', name: 'All', count: activities.length },
    { id: 'completed', name: 'Done', count: activities.filter(a => a.status === 'completed').length },
    { id: 'pending', name: 'Pending', count: activities.filter(a => a.status === 'pending').length },
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.status === filter);

  const handleQuickAdd = (typeId?: string) => {
    setSelectedActivityType(typeId);
    setIsModalOpen(true);
  };

  const markAsDone = (activityId: number) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, status: 'completed' }
          : activity
      )
    );
    toast({
      title: "Activity completed!",
      description: "Activity marked as done successfully.",
    });
  };

  const addActivity = (activityData: any) => {
    const newActivity = {
      id: activities.length + 1,
      type: activityData.activityType,
      title: activityData.title,
      date: activityData.date,
      status: 'pending',
      icon: activityTypes.find(t => t.id === activityData.activityType)?.icon || '🌱',
      notes: activityData.description
    };
    
    setActivities(prev => [newActivity, ...prev]);
    toast({
      title: "Activity added!",
      description: "New farm activity has been logged successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20 pb-20 pt-16">
      <TopNav />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 px-4 lg:px-6 pt-6 lg:max-w-6xl lg:mx-auto border-t-4 border-farm-green/30"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home')}
              className="mr-3 p-2 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-farm-green to-blue-600 bg-clip-text text-transparent">
                Farm Diary
              </h1>
              <p className="text-foreground/70 font-medium">Track and manage your farming journey</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right mr-2">
              <p className="text-sm font-medium text-farm-green">{activities.length} Activities</p>
              <p className="text-xs text-foreground/60">{activities.filter(a => a.status === 'completed').length} Completed</p>
            </div>
            <Button 
              onClick={() => handleQuickAdd()}
              className="bg-gradient-to-r from-farm-green to-green-600 hover:from-farm-green/90 hover:to-green-600/90 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Add Activity Section - Moved to Top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 lg:px-6 mb-8 lg:max-w-6xl lg:mx-auto"
      >
        <Card className="glass-card border-farm-green/30 bg-gradient-to-r from-farm-green/5 via-blue-50/50 to-purple-50/30 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-foreground flex items-center">
                <Target className="w-5 h-5 mr-2 text-farm-green" />
                Quick Add Activity
              </h3>
              <Badge className="bg-farm-green/20 text-farm-green border-farm-green/30">
                Fast Track
              </Badge>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {activityTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAdd(type.id)}
                  className="glass-card border-white/30 hover:border-farm-green/50 hover:shadow-lg transition-all duration-300 cursor-pointer group p-4 rounded-xl bg-white/40 hover:bg-white/60"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {type.icon}
                    </div>
                    <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {type.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 lg:px-6 mb-6 lg:max-w-6xl lg:mx-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-farm-green" />
            Activity Timeline
          </h3>
          <div className="flex space-x-2">
            {filters.map((filterOption) => (
              <Button
                key={filterOption.id}
                variant={filter === filterOption.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterOption.id)}
                className={`transition-all duration-300 ${
                  filter === filterOption.id 
                    ? 'bg-farm-green hover:bg-farm-green/90 text-white shadow-lg' 
                    : 'glass-card border-white/30 hover:border-farm-green/50 hover:bg-white/60'
                }`}
              >
                {filterOption.name}
                <Badge 
                  className={`ml-2 text-xs ${
                    filter === filterOption.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-farm-green/20 text-farm-green'
                  }`}
                >
                  {filterOption.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Activities Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-4 lg:px-6 lg:max-w-6xl lg:mx-auto"
      >
        <div className="grid gap-4">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Left Border Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-farm-green/50 to-blue-400/50 rounded-full"></div>
              
              <Card className="ml-6 glass-card border-l-0 hover:shadow-xl transition-all duration-300 hover:border-farm-green/40 bg-white/70 backdrop-blur-md dark:bg-gray-800/40 border-r-4 border-r-farm-green/30 mr-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      <div className="relative">
                        <div className="text-4xl drop-shadow-sm">{activity.icon}</div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-farm-green rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-lg text-foreground">
                            {activity.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className="text-xs border-farm-green/40 text-farm-green bg-farm-green/10"
                          >
                            {activity.type}
                          </Badge>
                        </div>
                        <p className="text-foreground/80 mb-3 leading-relaxed">
                          {activity.notes}
                        </p>
                        <div className="flex items-center text-sm text-foreground/60 bg-white/30 dark:bg-gray-700/30 rounded-lg px-3 py-2 w-fit">
                          <Calendar className="w-4 h-4 mr-2 text-farm-green" />
                          {new Date(activity.date).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-3 ml-4">
                      <Badge 
                        className={`px-3 py-1 font-medium ${
                          activity.status === 'completed' 
                            ? 'bg-gradient-to-r from-green-400 to-farm-green text-white shadow-lg border-0' 
                            : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg border-0'
                        }`}
                      >
                        {activity.status === 'completed' ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                      {activity.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => markAsDone(activity.id)}
                          className="bg-farm-green hover:bg-farm-green/90 text-white shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Mark Done
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 lg:px-6 lg:max-w-6xl lg:mx-auto mt-12"
        >
          <Card className="glass-card text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No activities yet</h3>
              <p className="text-foreground/60 mb-6">Start tracking your farm activities to see them here</p>
              <Button 
                onClick={() => handleQuickAdd()}
                className="bg-farm-green hover:bg-farm-green/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Activity
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Add Activity Modal */}
      <AddActivityModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedActivityType={selectedActivityType}
        onAddActivity={addActivity}
      />

      <BottomNav />
    </div>
  );
};

export default FarmDiary;