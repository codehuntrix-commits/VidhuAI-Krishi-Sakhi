import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera,
  Upload,
  Scan,
  History,
  Leaf,
  Bug,
  Droplets,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Volume2,
  Calendar
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';
import TreatmentPlanModal from '@/components/TreatmentPlanModal';

const CropHealth = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedScan, setSelectedScan] = useState<any>(null);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  
  const recentScans = [
    {
      id: 1,
      crop: 'Rice',
      issue: 'Leaf Spot Disease',
      severity: 'moderate',
      date: '2025-09-18',
      image: '/placeholder-leaf.jpg',
      treatment: 'Apply copper-based fungicide. Remove affected leaves.',
      confidence: 87
    },
    {
      id: 2,
      crop: 'Coconut',
      issue: 'Healthy Leaf',
      severity: 'none',
      date: '2025-09-15',
      image: '/placeholder-coconut.jpg',
      treatment: 'No action needed. Continue regular care.',
      confidence: 94
    },
    {
      id: 3,
      crop: 'Pepper',
      issue: 'Nutrient Deficiency',
      severity: 'mild',
      date: '2025-09-12',
      image: '/placeholder-pepper.jpg',
      treatment: 'Apply organic compost and micronutrients.',
      confidence: 76
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'moderate': return 'bg-harvest-yellow/20 text-harvest-yellow border-harvest-yellow/30';
      case 'mild': return 'bg-sky-blue/20 text-sky-blue border-sky-blue/30';
      case 'none': return 'bg-farm-green/20 text-farm-green border-farm-green/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'severe': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4" />;
      case 'mild': return <Droplets className="w-4 h-4" />;
      case 'none': return <CheckCircle className="w-4 h-4" />;
      default: return <Scan className="w-4 h-4" />;
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="min-h-screen gradient-hero pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 pt-12"
      >
        <div className="flex items-center mb-6">
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
              <Leaf className="w-6 h-6 mr-2 text-farm-green" />
              Crop Health Scanner
            </h1>
            <p className="text-foreground/70">AI-powered disease detection</p>
          </div>
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-8"
      >
        <Card className="glass-card border-2 border-dashed border-farm-green/30">
          <CardContent className="p-8">
            {!isScanning ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-farm-green/20 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="w-10 h-10 text-farm-green" />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Upload Leaf Photo
                  </h2>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Take a clear photo of the affected leaf against a plain background.
                    Our AI will analyze and provide diagnosis within seconds.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleScan}
                    className="flex flex-col items-center p-6 h-auto space-y-2"
                  >
                    <Camera className="w-6 h-6" />
                    <span>Take Photo</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleScan}
                    className="flex flex-col items-center p-6 h-auto space-y-2 glass-card border-white/20"
                  >
                    <Upload className="w-6 h-6" />
                    <span>Upload Image</span>
                  </Button>
                </div>

                <div className="text-xs text-foreground/60 space-y-1">
                  <p>📸 Best results: Good lighting, clear focus</p>
                  <p>🍃 Supported: Rice, Coconut, Pepper, Rubber</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 bg-farm-green/20 rounded-full flex items-center justify-center mx-auto"
                >
                  <Scan className="w-10 h-10 text-farm-green" />
                </motion.div>
                
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Analyzing Image...
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Our AI is examining the leaf for diseases and issues
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-farm-green rounded-full"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 3, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-foreground/60">Processing...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-8"
      >
        <Card className="glass-card bg-sky-blue/10 border-sky-blue/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center">
              💡 Photography Tips
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-farm-green rounded-full" />
                <span className="text-foreground/80">Good lighting</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-farm-green rounded-full" />
                <span className="text-foreground/80">Clear focus</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-farm-green rounded-full" />
                <span className="text-foreground/80">Plain background</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-farm-green rounded-full" />
                <span className="text-foreground/80">Close-up view</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Scans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center">
            <History className="w-5 h-5 mr-2" />
            Recent Scans
          </h2>
          <Button variant="ghost" size="sm" className="text-foreground/70">
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {recentScans.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card-hover">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    {/* Image Placeholder */}
                    <div className="w-16 h-16 bg-farm-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-8 h-8 text-farm-green" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">
                            {scan.crop} - {scan.issue}
                          </h3>
                          <div className="flex items-center text-xs text-foreground/60 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(scan.date).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getSeverityColor(scan.severity)}>
                            {getSeverityIcon(scan.severity)}
                            {scan.severity === 'none' ? 'Healthy' : scan.severity}
                          </Badge>
                          <Button size="sm" variant="ghost" className="p-1">
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-foreground/80 leading-relaxed">
                        {scan.treatment}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/60">
                          Confidence: {scan.confidence}%
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs px-3 py-1" 
                          onClick={() => {
                            setSelectedScan(scan);
                            setShowTreatmentModal(true);
                          }}
                        >
                          Treatment Plan
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

      <BottomNav />
      
      {/* Treatment Plan Modal */}
      {selectedScan && (
        <TreatmentPlanModal
          isOpen={showTreatmentModal}
          onClose={() => {
            setShowTreatmentModal(false);
            setSelectedScan(null);
          }}
          cropName={selectedScan.crop}
          issue={selectedScan.issue}
          severity={selectedScan.severity}
          confidence={selectedScan.confidence}
        />
      )}
    </div>
  );
};

export default CropHealth;