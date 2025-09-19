import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  X, 
  Mic, 
  MicOff, 
  Upload, 
  Calendar,
  Tag,
  FileText,
  Sparkles
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedActivityType?: string;
  onAddActivity?: (activityData: any) => void;
}

export const AddActivityModal = ({ isOpen, onClose, selectedActivityType, onAddActivity }: AddActivityModalProps) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form fields
  const [activityType, setActivityType] = useState(selectedActivityType || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const activityTypes = [
    { id: 'sowing', name: 'Sowing', icon: '🌱' },
    { id: 'irrigation', name: 'Irrigation', icon: '💧' },
    { id: 'pest-control', name: 'Pest Control', icon: '🐛' },
    { id: 'fertilizer', name: 'Fertilizer', icon: '🌾' },
    { id: 'harvesting', name: 'Harvesting', icon: '✂️' },
    { id: 'pruning', name: 'Pruning', icon: '🪚' },
    { id: 'weeding', name: 'Weeding', icon: '🌿' },
    { id: 'planting', name: 'Planting', icon: '🌱' }
  ];

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      setVoiceTranscript('');
      
      // Simulate voice input and AI processing
      const sampleInputs = [
        "I sowed rice today in the morning around 6 AM in the north field. Used Jyothi variety seeds and covered about 1.5 acres. The soil was well prepared and weather conditions were good for sowing.",
        "Watered the coconut trees in the evening. They needed irrigation badly due to the dry weather. Used drip irrigation system for about 2 hours.",
        "Found some pest damage on the rice leaves. Applied organic pesticide and checked the entire field. Need to monitor for the next few days."
      ];
      
      const randomInput = sampleInputs[Math.floor(Math.random() * sampleInputs.length)];
      
      // Simulate real-time transcription
      let currentText = '';
      const words = randomInput.split(' ');
      let wordIndex = 0;
      
      const transcriptionInterval = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
          setVoiceTranscript(currentText);
          wordIndex++;
        } else {
          clearInterval(transcriptionInterval);
          setIsListening(false);
          processVoiceInput(currentText);
        }
      }, 200);
    } else {
      setIsListening(false);
    }
  };

  const processVoiceInput = (transcript: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing and categorization
    setTimeout(() => {
      // Simple keyword-based categorization (in real app, this would be AI-powered)
      if (transcript.toLowerCase().includes('sow') || transcript.toLowerCase().includes('seed')) {
        setActivityType('sowing');
        setTitle('Rice Sowing');
      } else if (transcript.toLowerCase().includes('water') || transcript.toLowerCase().includes('irrigat')) {
        setActivityType('irrigation');
        setTitle('Irrigation Activity');
      } else if (transcript.toLowerCase().includes('pest') || transcript.toLowerCase().includes('spray')) {
        setActivityType('pest-control');
        setTitle('Pest Control');
      } else {
        setActivityType('fertilizer');
        setTitle('General Farm Activity');
      }
      
      setDescription(transcript);
      setIsProcessing(false);
      
      toast({
        title: "Voice input processed!",
        description: "Activity details have been auto-filled based on your input.",
      });
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      toast({
        title: "Image uploaded",
        description: `${file.name} has been attached to your activity.`,
      });
    }
  };

  const handleSubmit = () => {
    if (!activityType || !title || !description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const activityData = {
      activityType,
      title,
      description,
      date,
      time,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image
    };

    onAddActivity?.(activityData);
    
    // Reset form
    setActivityType(selectedActivityType || '');
    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setTime(new Date().toTimeString().slice(0, 5));
    setTags('');
    setImage(null);
    setVoiceTranscript('');
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-white/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-farm-green" />
            Add Farm Activity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Voice Input Section */}
          <motion.div 
            className="glass-card border border-farm-green/30 rounded-xl p-4 bg-gradient-to-r from-farm-green/5 to-transparent"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground flex items-center">
                <Mic className="w-4 h-4 mr-2" />
                AI Voice Assistant
              </h3>
              <Button
                onClick={handleVoiceInput}
                size="sm"
                variant={isListening ? "destructive" : "default"}
                className={isListening ? "animate-pulse" : ""}
              >
                {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isListening ? 'Stop' : 'Start Voice Input'}
              </Button>
            </div>
            
            <div className="min-h-[60px] p-3 rounded-lg bg-white/10 border border-white/20 mb-3">
              {voiceTranscript ? (
                <p className="text-sm text-foreground">{voiceTranscript}</p>
              ) : (
                <p className="text-sm text-foreground/60">
                  {isListening ? 'Listening... Speak about your farm activity' : 'Click "Start Voice Input" and describe your activity'}
                </p>
              )}
            </div>
            
            {isProcessing && (
              <div className="flex items-center text-sm text-farm-green">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 mr-2"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                AI is categorizing your input...
              </div>
            )}
          </motion.div>

          {/* Manual Input Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-white/20 pb-2">
              Manual Input (or review AI suggestions)
            </h3>
            
            {/* Activity Type */}
            <div className="space-y-2">
              <Label htmlFor="activity-type" className="text-sm font-medium text-foreground">
                Activity Type *
              </Label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger className="glass-card border-white/20">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <span className="flex items-center">
                        <span className="mr-2">{type.icon}</span>
                        {type.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Activity Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Rice Sowing"
                className="glass-card border-white/20"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your activity in detail..."
                rows={4}
                className="glass-card border-white/20"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-foreground">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="glass-card border-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-foreground">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="glass-card border-white/20"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium text-foreground">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., organic, field-1, urgent"
                className="glass-card border-white/20"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Attach Photo
              </Label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label
                  htmlFor="image-upload"
                  className="flex items-center px-4 py-2 glass-card border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {image ? image.name : 'Choose file'}
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-white/20">
            <Button
              variant="outline"
              onClick={onClose}
              className="glass-card border-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-farm-green hover:bg-farm-green/90"
            >
              Add Activity
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};