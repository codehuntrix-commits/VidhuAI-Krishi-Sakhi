import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Mic, MessageSquare, Upload } from 'lucide-react';

export const PestDetectionInput = () => {
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const inputMethods = [
    {
      id: 'image',
      icon: Camera,
      label: 'Image Upload',
      description: '📷 Take or upload photo',
      color: 'bg-farm-green',
      primary: true
    },
    {
      id: 'voice',
      icon: Mic,
      label: 'Voice Input',
      description: '🎤 Describe the issue',
      color: 'bg-sky-blue',
      primary: false
    },
    {
      id: 'text',
      icon: MessageSquare,
      label: 'Text Input',
      description: '⌨️ Type your concern',
      color: 'bg-harvest-yellow',
      primary: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 mb-10"
    >
      <Card className="glass-card-hover border-2 border-farm-green/30 shadow-[0_20px_50px_hsl(var(--shadow-glass))] rounded-3xl overflow-hidden">
        <CardHeader className="pb-6 pt-8 px-8 bg-gradient-to-r from-farm-green/5 to-sky-blue/5">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-center">
            <Upload className="w-7 h-7 mr-3 text-farm-green" />
            Detect Crop Issues
          </CardTitle>
          <p className="text-center text-foreground/70 mt-2">
            Upload images or describe problems for AI-powered analysis
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex gap-6 mb-8">
            {inputMethods.map((method) => (
              <div
                key={method.id}
                className={`flex-1 ${method.primary ? 'flex-[1.2]' : ''}`}
              >
                <Button
                  variant="outline"
                  className={`w-full h-24 flex-col space-y-3 relative glass-card-hover rounded-2xl border-2 transition-all duration-300 ${
                    method.primary 
                      ? 'border-farm-green/40 bg-farm-green/5 hover:bg-farm-green/10 hover:border-farm-green/60' 
                      : 'border-border/30 hover:border-border/50'
                  } ${activeInput === method.id ? 'ring-2 ring-farm-green/30 bg-farm-green/10' : ''}`}
                  onClick={() => setActiveInput(method.id)}
                >
                <div
                className={`w-16 h-32 rounded-full flex items-center justify-center 
                            ${method.color} shadow-md`}
                >
                <method.icon className="w-7 h-14 text-white" />
                </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">{method.label}</div>
                    <div className="text-xs text-foreground/60 mt-1">{method.description}</div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
          
          {activeInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border/20 pt-6"
            >
              {activeInput === 'image' && (
                <div className="text-center py-10 border-2 border-dashed border-farm-green/40 rounded-2xl bg-farm-green/5">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-farm-green" />
                  <p className="text-foreground/80 mb-4 font-medium">
                    Upload crop image for AI analysis
                  </p>
                  <Button className="bg-farm-green hover:bg-farm-green/90 text-white px-8 py-3 rounded-xl shadow-lg">
                    Choose File
                  </Button>
                </div>
              )}
              
              {activeInput === 'voice' && (
                <div className="text-center py-10 bg-sky-blue/5 rounded-2xl">
                  <Mic className="w-12 h-12 mx-auto mb-4 text-sky-blue" />
                  <p className="text-foreground/80 mb-4 font-medium">
                    Hold to record your farming concern
                  </p>
                  <Button className="bg-sky-blue hover:bg-sky-blue/90 text-white px-8 py-3 rounded-xl shadow-lg">
                    🎤 Start Recording
                  </Button>
                </div>
              )}
              
              {activeInput === 'text' && (
                <div className="space-y-4 bg-harvest-yellow/5 p-6 rounded-2xl">
                  <textarea
                    className="w-full p-4 border-2 border-border/30 rounded-xl bg-background text-foreground resize-none focus:border-harvest-yellow/50 focus:ring-2 focus:ring-harvest-yellow/20"
                    rows={4}
                    placeholder="Describe the crop issue you're experiencing in detail..."
                  />
                  <Button className="w-full bg-harvest-yellow hover:bg-harvest-yellow/90 text-foreground font-semibold py-3 rounded-xl shadow-lg">
                    Analyze Issue
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};