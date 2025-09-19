import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell,
  Calendar,
  Clock,
  Plus,
  Volume2,
  CheckCircle,
  AlertCircle,
  CalendarDays,
  ArrowLeft
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { AddReminderModal } from '@/components/AddReminderModal';
import { CropCalendar } from '@/components/CropCalendar';
import { useNavigate } from 'react-router-dom';

const Reminders = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showAddModal, setShowAddModal] = useState(false);
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Irrigation - Coconut Trees',
      description: 'Water coconut trees in the evening',
      time: '16:30',
      date: '2025-09-19',
      priority: 'high',
      type: 'irrigation',
      icon: '💧',
      recurring: 'Daily',
      completed: false
    },
    {
      id: 2,
      title: 'Fertilizer Application',
      description: 'Apply NPK fertilizer to pepper plants',
      time: '07:00',
      date: '2025-09-20',
      priority: 'medium',
      type: 'fertilizer',
      icon: '🌾',
      recurring: null,
      completed: false
    },
    {
      id: 3,
      title: 'Pest Inspection',
      description: 'Check rice plants for leaf folder damage',
      time: '08:00',
      date: '2025-09-21',
      priority: 'medium',
      type: 'pest-check',
      icon: '🐛',
      recurring: 'Weekly',
      completed: false
    },
    {
      id: 4,
      title: 'Harvest Check',
      description: 'Check rice maturity for harvest timing',
      time: '09:00',
      date: '2025-10-05',
      priority: 'low',
      type: 'harvest',
      icon: '🌾',
      recurring: null,
      completed: false
    },
    {
      id: 5,
      title: 'Soil Testing',
      description: 'Collect soil samples for pH testing',
      time: '10:00',
      date: '2025-09-18',
      priority: 'medium',
      type: 'testing',
      icon: '🧪',
      recurring: null,
      completed: true
    }
  ]);

  const todayReminders = reminders.filter(r => r.date === '2025-09-19' && !r.completed);
  const upcomingReminders = reminders.filter(r => r.date > '2025-09-19' && !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  const handleAddReminder = (newReminder: any) => {
    setReminders(prev => [...prev, newReminder]);
  };

  const handleAddTaskFromCalendar = (date: Date) => {
    setShowAddModal(true);
    // Pre-fill date in modal if needed
  };

  const handleTaskClick = (task: any) => {
    // Handle task click from calendar
    console.log('Task clicked:', task);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-harvest-yellow/20 text-harvest-yellow border-harvest-yellow/30';
      case 'low': return 'bg-farm-green/20 text-farm-green border-farm-green/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getTimeRemaining = (date: string, time: string) => {
    const now = new Date();
    const reminderDate = new Date(`${date}T${time}`);
    const diff = reminderDate.getTime() - now.getTime();
    
    if (diff < 0) return 'Overdue';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return `${Math.floor(diff / 86400000)}d`;
  };

  return (
    <div className="min-h-screen gradient-hero pb-20 pt-24">
      <TopNav />
      <div className="lg:max-w-6xl lg:mx-auto px-4 lg:px-6">
      {/* Header with border & alignment */}
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
                <Bell className="w-6 h-6 mr-2 text-harvest-yellow" />
                Reminders
              </h1>
              <p className="text-foreground/70">Stay on top of farm tasks</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="glass-card border-farm-green bg-farm-green/20 text-farm-green"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
            className={view === 'list' ? '' : 'glass-card border-white/20'}
          >
            <Clock className="w-4 h-4 mr-2" />
            List View
          </Button>
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('calendar')}
            className={view === 'calendar' ? '' : 'glass-card border-white/20'}
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            Calendar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="glass-card text-center">
            <CardContent className="p-3">
              <div className="text-2xl font-bold text-destructive">{todayReminders.length}</div>
              <div className="text-xs text-foreground/70">Today</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-3">
              <div className="text-2xl font-bold text-harvest-yellow">{upcomingReminders.length}</div>
              <div className="text-xs text-foreground/70">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-3">
              <div className="text-2xl font-bold text-farm-green">{completedReminders.length}</div>
              <div className="text-xs text-foreground/70">Completed</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {view === 'list' && (
        <div className="px-6 space-y-6">
          {/* Today's Reminders */}
          {todayReminders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center">
                🔴 Today ({todayReminders.length})
              </h2>
              <div className="space-y-3">
                {todayReminders.map((reminder, index) => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`glass-card-hover border-2 ${getPriorityColor(reminder.priority)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-3 flex-1">
                            <span className="text-2xl">{reminder.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">
                                {reminder.title}
                              </h3>
                              <p className="text-sm text-foreground/70 mb-2">
                                {reminder.description}
                              </p>
                              <div className="flex items-center text-xs text-foreground/60">
                                <Clock className="w-3 h-3 mr-1" />
                                {reminder.time}
                                {reminder.recurring && (
                                  <Badge className="ml-2 bg-white/20 text-xs">
                                    {reminder.recurring}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className="bg-destructive/20 text-destructive text-xs">
                              {getTimeRemaining(reminder.date, reminder.time)}
                            </Badge>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost" className="p-2">
                                <Volume2 className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs px-2">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Done
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming Reminders */}
          {upcomingReminders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center">
                🟡 This Week ({upcomingReminders.length})
              </h2>
              <div className="space-y-3">
                {upcomingReminders.slice(0, 3).map((reminder, index) => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-card-hover">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-3">
                            <span className="text-xl">{reminder.icon}</span>
                            <div>
                              <h3 className="font-medium text-foreground">
                                {reminder.title}
                              </h3>
                              <div className="flex items-center text-xs text-foreground/60 mt-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(reminder.date).toLocaleDateString('en-IN')} at {reminder.time}
                              </div>
                            </div>
                          </div>
                          <Badge className={`text-xs ${getPriorityColor(reminder.priority)}`}>
                            {reminder.priority}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Completed */}
          {completedReminders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-32 lg:mb-8"
            >
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center">
                🟢 Completed ({completedReminders.length})
              </h2>
              <div className="space-y-2">
                {completedReminders.slice(0, 2).map((reminder) => (
                  <Card key={reminder.id} className="glass-card opacity-60">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <span className="text-lg">{reminder.icon}</span>
                          <div>
                            <h4 className="text-sm font-medium text-foreground line-through">
                              {reminder.title}
                            </h4>
                          </div>
                        </div>
                        <CheckCircle className="w-4 h-4 text-farm-green" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {view === 'calendar' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 mb-32 lg:mb-8"
        >
          <CropCalendar 
            tasks={reminders}
            onAddTask={handleAddTaskFromCalendar}
            onTaskClick={handleTaskClick}
          />
        </motion.div>
      )}

      <BottomNav />
      
      {/* Add Reminder Modal */}
      <AddReminderModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddReminder}
      />
      </div>
    </div>
  );
};

export default Reminders;