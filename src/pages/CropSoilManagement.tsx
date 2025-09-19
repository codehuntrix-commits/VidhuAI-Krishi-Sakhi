import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf,
  Bug,
  TestTube,
  Droplets,
  Upload,
  Camera,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  Thermometer,
  Beaker,
  Plus,
  ArrowLeft,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { PestDetectionInput } from '@/components/PestDetectionInput';
import { TreatmentPlanModal } from '@/components/TreatmentPlanModal';
import { DailyTreatmentTracking } from '@/components/DailyTreatmentTracking';
import { useNavigate } from 'react-router-dom';

const CropSoilManagement = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);

  const quickInfoCards = [
    {
      title: 'Soil Health',
      value: 'Good',
      icon: TestTube,
      color: 'bg-farm-green',
      status: 'healthy'
    },
    {
      title: 'Pest Risks',
      value: 'Medium',
      icon: Bug,
      color: 'bg-harvest-yellow',
      status: 'warning'
    },
    {
      title: 'Disease Detection',
      value: '2 Issues',
      icon: Activity,
      color: 'bg-destructive',
      status: 'alert'
    },
    {
      title: 'Recommendations',
      value: '5 New',
      icon: TrendingUp,
      color: 'bg-sky-blue',
      status: 'info'
    }
  ];

  const soilData = {
    type: 'Laterite Soil',
    fertility: 'Medium',
    ph: 6.2,
    moisture: 68,
    nitrogen: 'Adequate',
    phosphorus: 'Low',
    potassium: 'High'
  };

  const cropHealthData = [
    {
      id: 1,
      name: 'Rice',
      issue: 'Brown Spot Disease',
      urgency: 'high',
      action: 'Apply copper-based fungicide',
      image: '/placeholder-rice.jpg',
      confidence: 89
    },
    {
      id: 2,
      name: 'Coconut',
      issue: 'Leaf Yellowing',
      urgency: 'medium',
      action: 'Check drainage and apply micronutrients',
      image: '/placeholder-coconut.jpg',
      confidence: 75
    },
    {
      id: 3,
      name: 'Pepper',
      issue: 'Healthy',
      urgency: 'none',
      action: 'Continue regular care',
      image: '/placeholder-pepper.jpg',
      confidence: 94
    },
    {
      id: 4,
      name: 'Banana',
      issue: 'Pest Infestation Risk',
      urgency: 'high',
      action: 'Preventive spray recommended',
      image: '/placeholder-banana.jpg',
      confidence: 82
    }
  ];

  const aiRecommendations = [
    {
      id: 1,
      type: 'spray',
      title: 'Preventive Spray Suggestion',
      description: 'Apply neem oil spray on coconut palms tomorrow morning',
      priority: 'medium',
      details: 'Mix 30ml neem oil with 1L water. Spray during early morning hours (6-8 AM) to avoid beneficial insects.'
    },
    {
      id: 2,
      type: 'nutrient',
      title: 'Nutrient Deficiency Alert',
      description: 'Phosphorus levels are low in your soil',
      priority: 'high',
      details: 'Apply bone meal fertilizer (2kg per acre) or rock phosphate. Best applied during evening hours.'
    },
    {
      id: 3,
      type: 'irrigation',
      title: 'Irrigation Schedule',
      description: 'Optimal watering time for pepper plants',
      priority: 'low',
      details: 'Water pepper plants between 4-6 PM. Maintain soil moisture at 60-70% for optimal growth.'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-harvest-yellow/20 text-harvest-yellow border-harvest-yellow/30';
      case 'low': case 'none': return 'bg-farm-green/20 text-farm-green border-farm-green/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-harvest-yellow';
      case 'low': return 'border-l-sky-blue';
      default: return 'border-l-muted';
    }
  };

  return (
    <div className="min-h-screen gradient-hero pb-20 pt-24">

      <TopNav />
      <div className="lg:max-w-6xl lg:mx-auto px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mt-6"
      >
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="mr-4 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Leaf className="w-7 h-7 mr-3 text-farm-green" />
              Crop & Soil Management
            </h1>
            <p className="text-foreground/70 mt-1">AI-powered farming insights</p>
          </div>
        </div>
      </motion.div>

      {/* Pest Detection Input Section */}
      <PestDetectionInput />

      {/* Quick Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-8 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          {quickInfoCards.map((card, index) => (
            <Card key={index} className="glass-card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <Badge variant="outline" className={getUrgencyColor(card.status)}>
                    {card.value}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{card.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Soil Health Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-8 mb-10"
      >
        <h2 className="text-xl font-bold mb-4 text-foreground flex items-center">
          <TestTube className="w-5 h-5 mr-2 text-farm-green" />
          Soil Health
        </h2>
        
        <Card className="glass-card mb-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-foreground/70">Soil Type</span>
                  <span className="text-sm font-medium">{soilData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground/70">Fertility</span>
                  <Badge className="bg-harvest-yellow/20 text-harvest-yellow text-xs">{soilData.fertility}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground/70">pH Level</span>
                  <span className="text-sm font-medium">{soilData.ph}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-foreground/70">Moisture</span>
                  <span className="text-sm font-medium">{soilData.moisture}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground/70">Nitrogen</span>
                  <Badge className="bg-farm-green/20 text-farm-green text-xs">{soilData.nitrogen}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground/70">Phosphorus</span>
                  <Badge className="bg-destructive/20 text-destructive text-xs">{soilData.phosphorus}</Badge>
                </div>
              </div>
            </div>
            
            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add / Update Soil Test Report
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Crop Health & Disease Detection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-8 mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground flex items-center">
            <Bug className="w-5 h-5 mr-2 text-farm-green" />
            Crop Health Detection
          </h2>
          <Button size="sm" variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {cropHealthData.map((crop, index) => (
            <Card key={crop.id} className="glass-card-hover">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="w-16 h-16 bg-farm-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-8 h-8 text-farm-green" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{crop.name}</h3>
                        <p className="text-sm text-foreground/70">{crop.issue}</p>
                      </div>
                      <Badge className={getUrgencyColor(crop.urgency)}>
                        {crop.urgency === 'none' ? 'Healthy' : crop.urgency}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-foreground/80 mb-2">{crop.action}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/60">
                        Confidence: {crop.confidence}%
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          setSelectedCrop(crop);
                          setTreatmentModalOpen(true);
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Treatment Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      
      </motion.div>
      
      {/* Daily Treatment Tracking Section */}
      <DailyTreatmentTracking />

      {/* Treatment Plan Modal */}
      {selectedCrop && (
        <TreatmentPlanModal
          isOpen={treatmentModalOpen}
          onClose={() => {
            setTreatmentModalOpen(false);
            setSelectedCrop(null);
          }}
          cropData={selectedCrop}
        />
      )}
      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-8 mb-10"
      >
        <h2 className="text-xl font-bold mb-4 text-foreground flex items-center">
          <Activity className="w-5 h-5 mr-2 text-farm-green" />
          AI Recommendations
        </h2>

        <div className="space-y-4">
          {aiRecommendations.map((rec, index) => (
            <Card key={rec.id} className={`glass-card border-l-4 ${getPriorityColor(rec.priority)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{rec.title}</h3>
                    <p className="text-sm text-foreground/80 mb-3">{rec.description}</p>
                    
                    {expandedCard === rec.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-foreground/70 bg-muted/30 rounded-lg p-3 mb-3"
                      >
                        {rec.details}
                      </motion.div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        ✅ Apply
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setExpandedCard(expandedCard === rec.id ? null : rec.id)}
                      >
                        {expandedCard === rec.id ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card mt-6 border-2 border-dashed border-farm-green/30 rounded-2xl">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">Other Issue?</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Describe your farming concern using text or voice
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1 rounded-xl">
                💬 Text Input
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl">
                🎤 Voice Input
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>



      <BottomNav />
      </div>
    </div>
  );
};

export default CropSoilManagement;