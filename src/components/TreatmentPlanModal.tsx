import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Camera, 
  Calendar,
  Leaf,
  Droplets,
  Bug
} from 'lucide-react';

interface TreatmentStep {
  step: number;
  title: string;
  description: string;
  timing: string;
}

interface Recommendation {
  type: 'fertilizer' | 'pesticide' | 'organic';
  name: string;
  dosage: string;
  application: string;
}

interface DailyProgress {
  date: string;
  image: string;
  notes?: string;
}

interface TreatmentPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropData: {
    name: string;
    issue: string;
    urgency: string;
    confidence: number;
  };
}

export const TreatmentPlanModal = ({ isOpen, onClose, cropData }: TreatmentPlanModalProps) => {
  const [dailyProgress, setDailyProgress] = useState<DailyProgress[]>([]);
  const [uploadingProgress, setUploadingProgress] = useState(false);

  const treatmentSteps: TreatmentStep[] = [
    {
      step: 1,
      title: 'Immediate Action',
      description: 'Remove affected leaves and dispose of them properly away from the field',
      timing: 'Day 1'
    },
    {
      step: 2,
      title: 'Apply Treatment',
      description: 'Spray copper-based fungicide on affected plants during early morning hours',
      timing: 'Day 1-3'
    },
    {
      step: 3,
      title: 'Monitor Progress',
      description: 'Check plants daily for new symptoms and document changes',
      timing: 'Day 1-14'
    },
    {
      step: 4,
      title: 'Follow-up Treatment',
      description: 'Apply second round of treatment if symptoms persist after 7 days',
      timing: 'Day 7-10'
    }
  ];

  const recommendations: Recommendation[] = [
    {
      type: 'fertilizer',
      name: 'Potassium Phosphate',
      dosage: '2-3 grams per liter',
      application: 'Foliar spray every 10 days'
    },
    {
      type: 'pesticide',
      name: 'Copper Oxychloride',
      dosage: '2.5-3 grams per liter',
      application: 'Spray during cool hours'
    },
    {
      type: 'organic',
      name: 'Neem Oil Solution',
      dosage: '30ml per liter water',
      application: 'Early morning spray'
    }
  ];

  const precautions = [
    'Always wear protective gear when applying treatments',
    'Do not spray during peak sun hours (10 AM - 4 PM)',
    'Ensure proper ventilation in greenhouse settings',
    'Keep treatments away from children and pets',
    'Wait 3-5 days between different chemical applications'
  ];

  const handleProgressUpload = () => {
    setUploadingProgress(true);
    // Simulate upload
    setTimeout(() => {
      const newProgress: DailyProgress = {
        date: new Date().toLocaleDateString(),
        image: '/placeholder-progress.jpg',
        notes: 'Daily progress check'
      };
      setDailyProgress(prev => [...prev, newProgress]);
      setUploadingProgress(false);
    }, 1000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-harvest-yellow';
      case 'low': case 'none': return 'text-farm-green';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'fertilizer': return Droplets;
      case 'pesticide': return Bug;
      case 'organic': return Leaf;
      default: return Droplets;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-farm-green" />
              Treatment Plan: {cropData.name}
            </span>
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Issue Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Issue Detected</h3>
                <Badge className={`${getUrgencyColor(cropData.urgency)} border-current`}>
                  {cropData.issue}
                </Badge>
              </div>
              <p className="text-sm text-foreground/70">
                Confidence: {cropData.confidence}% | Urgency: {cropData.urgency}
              </p>
            </CardContent>
          </Card>

          {/* Treatment Steps */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-farm-green" />
              Treatment Steps
            </h3>
            <div className="space-y-3">
              {treatmentSteps.map((step) => (
                <Card key={step.step} className="border-l-4 border-l-farm-green">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-farm-green rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{step.title}</h4>
                        <p className="text-sm text-foreground/70 mt-1">{step.description}</p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {step.timing}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center">
              <Droplets className="w-4 h-4 mr-2 text-sky-blue" />
              Recommended Inputs
            </h3>
            <div className="grid gap-3">
              {recommendations.map((rec, index) => {
                const Icon = getRecommendationIcon(rec.type);
                return (
                  <Card key={index}>
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-sky-blue/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-sky-blue" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground capitalize">{rec.type}: {rec.name}</h4>
                          <p className="text-sm text-foreground/70">Dosage: {rec.dosage}</p>
                          <p className="text-sm text-foreground/70">Application: {rec.application}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Precautions */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-harvest-yellow" />
              Precautions
            </h3>
            <Card className="bg-harvest-yellow/10 border-harvest-yellow/30">
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {precautions.map((precaution, index) => (
                    <li key={index} className="text-sm text-foreground/80 flex items-start">
                      <span className="w-1.5 h-1.5 bg-harvest-yellow rounded-full mr-2 mt-2 flex-shrink-0" />
                      {precaution}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Daily Tracking */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-farm-green" />
              Daily Progress Tracking
            </h3>
            
            <Button 
              onClick={handleProgressUpload}
              disabled={uploadingProgress}
              className="w-full mb-4 bg-farm-green hover:bg-farm-green/90"
            >
              <Camera className="w-4 h-4 mr-2" />
              {uploadingProgress ? 'Uploading...' : 'Upload Progress Photo'}
            </Button>

            <div className="space-y-3">
              {dailyProgress.map((progress, index) => (
                <Card key={index}>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-farm-green/20 rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-farm-green" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{progress.date}</p>
                        <p className="text-sm text-foreground/70">{progress.notes}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {dailyProgress.length === 0 && (
                <Card className="border-2 border-dashed border-muted">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      No progress photos uploaded yet
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TreatmentPlanModal;