import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Upload,
  Camera,
  MessageSquare,
  Image
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

interface VoiceInputUploadProps {
  onTextSubmit?: (text: string) => void;
  onImageUpload?: (file: File) => void;
  onVoiceSubmit?: (text: string) => void;
  placeholder?: string;
  className?: string;
}

const VoiceInputUpload = ({ 
  onTextSubmit, 
  onImageUpload, 
  onVoiceSubmit, 
  placeholder = "Describe your farming concern...",
  className = "" 
}: VoiceInputUploadProps) => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceInput = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        const mockVoiceText = "I noticed some yellowing leaves on my pepper plants and some small holes in the rice leaves. The weather has been quite humid lately.";
        setTextInput(mockVoiceText);
        setIsProcessing(false);
        
        if (onVoiceSubmit) {
          onVoiceSubmit(mockVoiceText);
        }
        
        toast({
          title: "Voice input processed",
          description: "Your voice input has been converted to text.",
        });
      }, 2000);
    }, 3000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
      toast({
        title: "Image uploaded",
        description: "Your farm image has been uploaded for analysis.",
      });
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim() && onTextSubmit) {
      onTextSubmit(textInput);
      setTextInput('');
      toast({
        title: "Input submitted",
        description: "Your farming concern has been submitted for analysis.",
      });
    }
  };

  return (
    <Card className={`glass-card border-2 border-dashed border-farm-green/30 ${className}`}>
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-farm-green" />
          Describe Your Farming Concern
        </h3>
        
        {/* Voice Input Section */}
        <div className="mb-6">
          {!isListening && !isProcessing && (
            <Button 
              onClick={handleVoiceInput}
              className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white mb-4"
            >
              <Mic className="w-4 h-4 mr-2" />
              {t('voiceInput')} - Speak Your Concern
            </Button>
          )}

          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 mb-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-20 h-20 bg-sky-blue/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <Mic className="w-10 h-10 text-sky-blue" />
              </motion.div>
              <p className="text-sm text-foreground/70 mb-3">Listening... Describe your farming issue</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsListening(false)}
                className="glass-card border-white/20"
              >
                <MicOff className="w-3 h-3 mr-1" />
                Stop
              </Button>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 mb-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-20 h-20 bg-farm-green/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                🤖
              </motion.div>
              <p className="text-sm text-foreground/70">AI is processing your voice input...</p>
            </motion.div>
          )}
        </div>

        {/* Text Input Section */}
        <div className="mb-6">
          <div className="flex space-x-2 mb-3">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 p-3 rounded-lg glass-card border border-white/20 bg-white/60 text-foreground placeholder:text-foreground/50 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-farm-green/50"
            />
          </div>
          {textInput.trim() && (
            <Button 
              onClick={handleTextSubmit}
              className="w-full bg-farm-green hover:bg-farm-green/90 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Text
            </Button>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="border-t border-white/20 pt-4">
          <p className="text-sm text-foreground/70 mb-3">Or upload an image of your crop/soil issue:</p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="glass-card border-white/20" asChild>
              <label htmlFor="camera-upload" className="cursor-pointer">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
                <input
                  id="camera-upload"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </Button>
            <Button variant="outline" className="glass-card border-white/20" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceInputUpload;