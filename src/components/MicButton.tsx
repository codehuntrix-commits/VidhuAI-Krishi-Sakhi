import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const MicButton = () => {
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleMicClick = () => {
    if (!isListening) {
      setIsListening(true);
      setIsRecording(true);
      setShowPopup(true);
      setTranscript('');
      
      // Simulate real-time transcription
      const transcriptionTexts = [
        "എന്റെ പാടത്തിലെ നെല്ലിന് എന്ത് രോഗം ആണ്?",
        "What disease is affecting my rice crop?",
        "How can I improve soil health?"
      ];
      
      let currentIndex = 0;
      const transcriptionInterval = setInterval(() => {
        if (currentIndex < transcriptionTexts.length) {
          setTranscript(transcriptionTexts[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(transcriptionInterval);
          setIsRecording(false);
          setTimeout(() => {
            setIsListening(false);
          }, 1000);
        }
      }, 1500);
      
    } else {
      setIsListening(false);
      setIsRecording(false);
      setTimeout(() => setShowPopup(false), 500);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsListening(false);
    setIsRecording(false);
    setTranscript('');
  };

  return (
    <motion.div className="relative">
      <Popover open={showPopup}>
        <PopoverTrigger asChild>
          <motion.button
            onClick={handleMicClick}
            className={`
              relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center
              glass-card border-2 transition-all duration-300 group
              ${isListening 
                ? 'border-farm-green bg-farm-green/20 mic-glow' 
                : 'border-white/30 hover:border-farm-green/50'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isRecording ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={isRecording ? {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          >
        {/* Pulse rings when listening */}
        {isListening && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-farm-green/30"
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-farm-green/20"
              animate={{
                scale: [1, 1.8, 2.5],
                opacity: [0.4, 0.2, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3
              }}
            />
          </>
        )}
        
        {/* Mic icon */}
        <motion.div
          animate={isRecording ? { 
            rotate: [-2, 2, -2],
          } : {}}
          transition={isRecording ? {
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          {isListening ? (
            <MicOff className="w-6 h-6 lg:w-8 lg:h-8 text-farm-green" />
          ) : (
            <Mic className="w-6 h-6 lg:w-8 lg:h-8 text-farm-green group-hover:text-farm-green-dark transition-colors" />
          )}
        </motion.div>
        
        {/* Voice wave animation */}
        {isRecording && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-farm-green rounded-full"
                animate={{
                  height: [4, 12, 4],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}
          </motion.button>
        </PopoverTrigger>
        
        <PopoverContent 
          side="top" 
          align="center" 
          sideOffset={8}
          className="w-80 p-0 border-0 bg-transparent shadow-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="glass-card border border-white/30 rounded-2xl p-4 relative"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 20px rgba(139, 195, 74, 0.3)',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            
            {/* Transcription area */}
            <div className="mb-4">
              <div className="min-h-[3rem] p-3 rounded-lg bg-white/10 border border-white/20">
                {transcript ? (
                  <p className="text-black text-sm leading-relaxed">{transcript}</p>
                ) : (
                  <p className="text-black/50 text-sm">Start speaking...</p>
                )}
              </div>
            </div>
            
            {/* AI listening indicator */}
            <div className="flex items-center justify-center space-x-2">
              <span className="text-farm-green text-sm font-medium">
                {isRecording ? 'AI is listening' : isListening ? 'Processing' : 'Ready'}
              </span>
              {(isRecording || isListening) && (
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-farm-green rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </PopoverContent>
      </Popover>
      
      {/* Status text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: isListening && !showPopup ? 1 : 0, 
          y: isListening && !showPopup ? 0 : 10 
        }}
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center"
      >
        <div className="glass-card px-4 py-2 rounded-full">
          <p className="text-sm text-farm-green font-medium">
            {isRecording ? 'Listening...' : 'Processing...'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};