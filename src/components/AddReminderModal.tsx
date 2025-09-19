import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon, 
  Clock, 
  Mic, 
  MicOff, 
  Type, 
  Save,
  X 
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminder: any) => void;
}

export const AddReminderModal = ({ isOpen, onClose, onSave }: AddReminderModalProps) => {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [isListening, setIsListening] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: undefined as Date | undefined,
    time: '',
    priority: '',
    category: '',
    recurring: 'one-time'
  });

  const priorities = [
    { value: 'high', label: 'High', color: 'bg-destructive/20 text-destructive' },
    { value: 'medium', label: 'Medium', color: 'bg-harvest-yellow/20 text-harvest-yellow' },
    { value: 'low', label: 'Low', color: 'bg-farm-green/20 text-farm-green' }
  ];

  const categories = [
    { value: 'irrigation', label: 'Irrigation', icon: '💧' },
    { value: 'fertilizer', label: 'Fertilizer', icon: '🌾' },
    { value: 'pest-check', label: 'Pest Control', icon: '🐛' },
    { value: 'harvest', label: 'Harvest', icon: '🌾' },
    { value: 'weather', label: 'Weather', icon: '🌤️' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const recurringOptions = [
    { value: 'one-time', label: 'One-time' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Custom', label: 'Custom' }
  ];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Mock voice functionality - in real app would integrate with speech recognition
    if (!isListening) {
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          title: 'Water coconut trees',
          description: 'Evening irrigation for coconut plantation',
          priority: 'high',
          category: 'irrigation'
        }));
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.time || !formData.priority || !formData.category) {
      return;
    }

    const newReminder = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      date: format(formData.date, 'yyyy-MM-dd'),
      time: formData.time,
      priority: formData.priority,
      type: formData.category,
      icon: categories.find(c => c.value === formData.category)?.icon || '📝',
      recurring: formData.recurring === 'one-time' ? null : formData.recurring,
      completed: false
    };

    onSave(newReminder);
    setFormData({
      title: '',
      description: '',
      date: undefined,
      time: '',
      priority: '',
      category: '',
      recurring: 'one-time'
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-md mx-4 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-foreground">
            <Clock className="w-5 h-5 mr-2 text-farm-green" />
            Add New Reminder
          </DialogTitle>
        </DialogHeader>

        {/* Input Mode Toggle */}
        <div className="flex space-x-2 mb-4">
          <Button
            variant={inputMode === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMode('text')}
            className={inputMode === 'text' ? '' : 'glass-card border-white/20'}
          >
            <Type className="w-4 h-4 mr-2" />
            Text
          </Button>
          <Button
            variant={inputMode === 'voice' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setInputMode('voice')}
            className={inputMode === 'voice' ? '' : 'glass-card border-white/20'}
          >
            {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            Voice
          </Button>
        </div>

        {inputMode === 'voice' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 glass-card border-farm-green/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground/70">Voice Assistant</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceToggle}
                className={isListening ? 'text-destructive' : 'text-farm-green'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            {isListening && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                <span className="text-sm text-foreground/70">Listening... Speak your reminder details</span>
              </div>
            )}
          </motion.div>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Alert Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Water coconut trees"
              className="glass-card border-white/20"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description/Notes</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Additional details..."
              className="glass-card border-white/20 resize-none"
              rows={3}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal glass-card border-white/20",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="glass-card border-white/20"
              />
            </div>
          </div>

          {/* Priority & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="glass-card border-white/20">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center">
                        <Badge className={`mr-2 text-xs ${priority.color}`}>
                          {priority.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="glass-card border-white/20">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Repeat Option */}
          <div>
            <Label>Repeat</Label>
              <Select value={formData.recurring} onValueChange={(value) => setFormData(prev => ({ ...prev, recurring: value }))}>
                <SelectTrigger className="glass-card border-white/20">
                  <SelectValue placeholder="Select repeat option" />
                </SelectTrigger>
              <SelectContent>
                {recurringOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 glass-card border-white/20"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.title || !formData.date || !formData.time || !formData.priority || !formData.category}
            className="flex-1 bg-farm-green/20 text-farm-green border-farm-green/30"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};