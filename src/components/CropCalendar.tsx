import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  Eye,
  Trophy,
  Zap,
  Target,
  Star,
  Flame,
  Award,
  TrendingUp,
  CheckCircle2,
  Droplets,
  Bug,
  Scissors,
  Sprout,
  Sun,
  FileText
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, subDays, isAfter } from 'date-fns';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  title: string;
  type: string;
  date: string;
  time?: string;
  notes?: string;
  description?: string;
  recurring?: string;
  priority: string;
  icon: string;
  completed?: boolean;
}

interface CropCalendarProps {
  tasks: Task[];
  onAddTask: (date: Date) => void;
  onTaskClick: (task: Task) => void;
}

export const CropCalendar = ({ tasks, onAddTask, onTaskClick }: CropCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add empty cells for proper grid alignment
  const startDay = monthStart.getDay();
  const endDay = monthEnd.getDay();
  const emptyStartCells = Array.from({ length: startDay }, (_, i) => i);
  const emptyEndCells = Array.from({ length: 6 - endDay }, (_, i) => i);

  // Gamification data
  const completedTasks = tasks.filter(t => t.completed);
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
  const streak = calculateStreak(tasks);
  
  // Get task type icons
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'irrigation': return Droplets;
      case 'fertilizer': return Sprout;
      case 'pest-check': return Bug;
      case 'harvest': return Scissors;
      case 'weather': return Sun;
      default: return FileText;
    }
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date + 'T00:00:00');
      return isSameDay(taskDate, date);
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-harvest-yellow';
      case 'low': return 'bg-farm-green';
      default: return 'bg-muted';
    }
  };

  const getPriorityGlow = (priority: string) => {
    switch (priority) {
      case 'high': return 'shadow-lg shadow-destructive/30';
      case 'medium': return 'shadow-lg shadow-harvest-yellow/30';
      case 'low': return 'shadow-lg shadow-farm-green/30';
      default: return '';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    const dateTasks = getTasksForDate(date);
    if (dateTasks.length > 0) {
      setSelectedDate(date);
    } else {
      onAddTask(date);
    }
  };

  // Calculate streak (mock function)
  function calculateStreak(tasks: Task[]): number {
    // Simple streak calculation - consecutive days with completed tasks
    let streak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = subDays(currentDate, i);
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.date + 'T00:00:00');
        return isSameDay(taskDate, checkDate) && task.completed;
      });
      
      if (dayTasks.length > 0) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  }

  const getDateCompletion = (date: Date) => {
    const dateTasks = getTasksForDate(date);
    if (dateTasks.length === 0) return 0;
    const completed = dateTasks.filter(t => t.completed).length;
    return (completed / dateTasks.length) * 100;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Gamification Stats Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-4 gap-3"
      >
        <Card className="glass-card border-farm-green/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-farm-green/10 to-transparent"></div>
          <CardContent className="p-3 relative z-10">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-harvest-yellow" />
              <div>
                <div className="text-lg font-bold text-foreground">{completionRate.toFixed(0)}%</div>
                <div className="text-xs text-foreground/70">Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-destructive/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent"></div>
          <CardContent className="p-3 relative z-10">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-destructive" />
              <div>
                <div className="text-lg font-bold text-foreground">{streak}</div>
                <div className="text-xs text-foreground/70">Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-harvest-yellow/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-harvest-yellow/10 to-transparent"></div>
          <CardContent className="p-3 relative z-10">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-harvest-yellow" />
              <div>
                <div className="text-lg font-bold text-foreground">{totalTasks}</div>
                <div className="text-xs text-foreground/70">Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <CardContent className="p-3 relative z-10">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-foreground">+{Math.floor(completionRate * 0.1)}</div>
                <div className="text-xs text-foreground/70">XP</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-farm-green/20 hover:text-farm-green transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </motion.div>
          
          <motion.h2 
            key={currentDate.toISOString()}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-foreground"
          >
            {format(currentDate, 'MMMM yyyy')}
          </motion.h2>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-farm-green/20 hover:text-farm-green transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('month')}
            className={viewMode === 'month' ? 'bg-farm-green text-white' : 'glass-card border-white/20'}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('week')}
            className={viewMode === 'week' ? 'bg-farm-green text-white' : 'glass-card border-white/20'}
          >
            Week
          </Button>
        </div>
      </div>

      {/* Enhanced Calendar Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-card border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-farm-green/5 via-transparent to-harvest-yellow/5 pointer-events-none"></div>
          <CardContent className="p-6 relative z-10">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map((day) => (
                <motion.div 
                  key={day} 
                  className="p-3 text-center text-sm font-semibold text-foreground/80 bg-white/5 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {day}
                </motion.div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for start of month */}
              {emptyStartCells.map((_, index) => (
                <div key={`empty-start-${index}`} className="p-2 h-24"></div>
              ))}

              {/* Month days */}
              <AnimatePresence>
                {monthDays.map((date, index) => {
                  const dayTasks = getTasksForDate(date);
                  const isCurrentDay = isToday(date);
                  const completion = getDateCompletion(date);
                  const hasHighPriorityTask = dayTasks.some(t => t.priority === 'high');
                  const isHovered = hoveredDate && isSameDay(date, hoveredDate);
                  
                  return (
                    <motion.div
                      key={date.toISOString()}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        z: 10
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "relative p-3 h-24 border-2 rounded-xl cursor-pointer transition-all duration-300 group",
                        "backdrop-blur-sm overflow-hidden",
                        isCurrentDay 
                          ? "bg-gradient-to-br from-farm-green/20 to-farm-green/10 border-farm-green/60 shadow-lg shadow-farm-green/30" 
                          : "glass-card-hover border-white/20",
                        hasHighPriorityTask && "ring-2 ring-destructive/50 ring-offset-2 ring-offset-background/50",
                        dayTasks.length > 0 && "hover:shadow-xl hover:shadow-farm-green/20",
                        !isSameMonth(date, currentDate) && "opacity-40"
                      )}
                      onClick={() => handleDateClick(date)}
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {/* Background gradient */}
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        "bg-gradient-to-br from-farm-green/10 via-transparent to-harvest-yellow/10"
                      )}></div>

                      {/* Date number */}
                      <div className="relative z-20 flex justify-between items-start h-full">
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          isCurrentDay 
                            ? "text-farm-green drop-shadow-lg" 
                            : "text-foreground",
                          !isSameMonth(date, currentDate) && "text-foreground/30"
                        )}>
                          {format(date, 'd')}
                        </span>
                        
                        {/* Add task icon for empty dates */}
                        {dayTasks.length === 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
                            className="text-farm-green/70"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.div>
                        )}
                      </div>

                      {/* Progress ring for completion */}
                      {completion > 0 && (
                        <div className="absolute top-2 right-2 z-20">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                              completion === 100 
                                ? "bg-gradient-to-r from-farm-green to-green-600 shadow-lg shadow-farm-green/40" 
                                : "bg-gradient-to-r from-harvest-yellow to-orange-500"
                            )}
                          >
                            {completion === 100 ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              `${completion.toFixed(0)}%`
                            )}
                          </motion.div>
                        </div>
                      )}

                      {/* Task indicators with icons */}
                      {dayTasks.length > 0 && (
                        <div className="absolute bottom-2 left-2 right-2 z-20">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {dayTasks.slice(0, 4).map((task, taskIndex) => {
                              const TaskIcon = getTaskIcon(task.type);
                              return (
                                <motion.div
                                  key={taskIndex}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: taskIndex * 0.1 }}
                                  className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs",
                                    getPriorityColor(task.priority),
                                    getPriorityGlow(task.priority),
                                    task.completed && "opacity-60 grayscale"
                                  )}
                                  whileHover={{ scale: 1.2, z: 10 }}
                                >
                                  <TaskIcon className="w-3 h-3" />
                                  {task.completed && (
                                    <CheckCircle2 className="absolute -top-1 -right-1 w-3 h-3 text-farm-green bg-white rounded-full" />
                                  )}
                                </motion.div>
                              );
                            })}
                            {dayTasks.length > 4 && (
                              <motion.div
                                className="w-6 h-6 rounded-full bg-muted/80 flex items-center justify-center text-xs font-bold text-foreground"
                                whileHover={{ scale: 1.2 }}
                              >
                                +{dayTasks.length - 4}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Achievement stars for perfect days */}
                      {completion === 100 && dayTasks.length > 2 && (
                        <motion.div
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          className="absolute -top-1 -left-1 z-30"
                        >
                          <Star className="w-5 h-5 text-harvest-yellow fill-harvest-yellow drop-shadow-lg" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Empty cells for end of month */}
              {emptyEndCells.map((_, index) => (
                <div key={`empty-end-${index}`} className="p-2 h-24"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Task Details Dialog */}
      <Dialog open={selectedDate !== null} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="glass-card border-white/20 max-w-md mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center text-foreground">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <CalendarIcon className="w-5 h-5 mr-2 text-farm-green" />
                </motion.div>
                {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                {selectedDate && getDateCompletion(selectedDate) === 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Trophy className="w-5 h-5 ml-2 text-harvest-yellow" />
                  </motion.div>
                )}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <AnimatePresence>
                {selectedDate && getTasksForDate(selectedDate).map((task, index) => {
                  const TaskIcon = getTaskIcon(task.type);
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={cn(
                        "glass-card-hover border-white/10 relative overflow-hidden",
                        task.completed && "opacity-75 bg-farm-green/10"
                      )}>
                        {task.priority === 'high' && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive to-red-600"></div>
                        )}
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex space-x-3 flex-1">
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center",
                                  getPriorityColor(task.priority),
                                  getPriorityGlow(task.priority)
                                )}
                              >
                                <TaskIcon className="w-5 h-5 text-white" />
                              </motion.div>
                              <div className="flex-1">
                                <h4 className={cn(
                                  "font-semibold text-foreground",
                                  task.completed && "line-through"
                                )}>
                                  {task.title}
                                </h4>
                                {task.time && (
                                  <div className="flex items-center text-xs text-foreground/60 mt-1">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {task.time}
                                  </div>
                                )}
                                {(task.notes || task.description) && (
                                  <p className="text-sm text-foreground/70 mt-1">
                                    {task.notes || task.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <Badge className={cn(
                                "text-xs animate-pulse",
                                getPriorityColor(task.priority), 
                                "text-white border-0"
                              )}>
                                {task.priority}
                              </Badge>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => onTaskClick(task)}
                                  className="p-2 hover:bg-farm-green/20"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                          {task.completed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1"
                            >
                              <CheckCircle2 className="w-6 h-6 text-farm-green bg-white rounded-full" />
                            </motion.div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => {
                    if (selectedDate) {
                      onAddTask(selectedDate);
                      setSelectedDate(null);
                    }
                  }}
                  className="w-full glass-card border-farm-green/30 bg-gradient-to-r from-farm-green/20 to-green-600/20 text-farm-green hover:shadow-lg hover:shadow-farm-green/30 transition-all"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Epic Task for This Date
                  <Zap className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Task Detail Modal */}
      <Dialog open={showTaskDetails !== null} onOpenChange={() => setShowTaskDetails(null)}>
        <DialogContent className="glass-card border-white/20 max-w-md mx-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center text-foreground">
                {showTaskDetails && (
                  <>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                        getPriorityColor(showTaskDetails.priority)
                      )}
                    >
                      {React.createElement(getTaskIcon(showTaskDetails.type), {
                        className: "w-4 h-4 text-white"
                      })}
                    </motion.div>
                    {showTaskDetails.title}
                    {showTaskDetails.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Award className="w-5 h-5 ml-2 text-harvest-yellow" />
                      </motion.div>
                    )}
                  </>
                )}
              </DialogTitle>
            </DialogHeader>
            {showTaskDetails && (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-sm text-foreground/70 font-medium">Description:</span>
                  <p className="text-foreground mt-1 p-3 glass-card rounded-lg">
                    {showTaskDetails.notes || showTaskDetails.description || 'No description provided'}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-3 glass-card rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground/70">Priority:</span>
                    <Badge className={cn(
                      "text-xs animate-pulse",
                      getPriorityColor(showTaskDetails.priority), 
                      "text-white border-0"
                    )}>
                      {showTaskDetails.priority.toUpperCase()}
                    </Badge>
                  </div>
                  {showTaskDetails.time && (
                    <div className="flex items-center text-sm text-foreground/70">
                      <Clock className="w-4 h-4 mr-1" />
                      {showTaskDetails.time}
                    </div>
                  )}
                </motion.div>
                
                {showTaskDetails.recurring && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 glass-card rounded-lg"
                  >
                    <span className="text-sm text-foreground/70">Recurring Schedule:</span>
                    <Badge className="ml-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30">
                      {showTaskDetails.recurring}
                    </Badge>
                  </motion.div>
                )}
                
                {showTaskDetails.completed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center p-4 glass-card rounded-lg bg-gradient-to-r from-farm-green/20 to-green-600/20"
                  >
                    <CheckCircle2 className="w-6 h-6 text-farm-green mr-2" />
                    <span className="text-farm-green font-semibold">Task Completed! 🎉</span>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};