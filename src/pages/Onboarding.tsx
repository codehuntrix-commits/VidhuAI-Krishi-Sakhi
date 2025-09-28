import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MicButton } from '@/components/MicButton';
import { 
  Mic, 
  Camera, 
  MapPin, 
  Droplets, 
  Wheat, 
  Trees,
  Sprout,
  PartyPopper,
  Languages,
  User,
  Calendar,
  MoreHorizontal,
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserPlus,
  Phone,
  Chrome,
  Facebook,
  Edit,
  CheckCircle,
  Bird,
  Fish
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtherModal, setShowOtherModal] = useState({ show: false, type: '', value: '' });
  const [profile, setProfile] = useState({
    // Sign up fields
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Personal details
    name: '',
    age: '',
    gender: '',
    phone: '',
    location: '',
    experience: 5,
    
    // Land details
    landSize: 2,
    landType: '',
    landTypeOther: '',
    farmingType: '',
    farmingTypeOther: '',
    soilType: '',
    soilTypeOther: '',
    
    // Crop details  
    crops: [],
    cropsOther: '',
    livestock: [],
    livestockOther: '',
    
    // Facilities details
    irrigation: [],
    irrigationOther: '',
    storage: [],
    storageOther: '',
    machinery: [],
    machineryOther: ''
  });

  const steps = [
    'Welcome',
    'Language',
    'Sign Up',
    'Personal Details',
    'Land Details',
    'Crop Details',
    'Available Facilities',
    'Review & Complete'
  ];

  const crops = [
    { id: 'rice', name: 'Rice', icon: '🌾', nameML: 'നെൽ' },
    { id: 'coconut', name: 'Coconut', icon: '🌴', nameML: 'തേങ്ങ' },
    { id: 'rubber', name: 'Rubber', icon: '🌳', nameML: 'റബ്ബർ' },
    { id: 'pepper', name: 'Pepper', icon: '🌶️', nameML: 'കുരുമുളക്' },
    { id: 'cardamom', name: 'Cardamom', icon: '🫚', nameML: 'ഏലം' },
    { id: 'banana', name: 'Banana', icon: '🍌', nameML: 'വാഴ' },
    { id: 'mango', name: 'Mango', icon: '🥭', nameML: 'മാവ്' },
    { id: 'cashew', name: 'Cashew', icon: '🥜', nameML: 'കശുമാവ്' },
    { id: 'other', name: 'Other', icon: '🌱', nameML: 'മറ്റുള്ളവ' }
  ];

  const livestock = [
    { id: 'cattle', name: 'Cattle', icon: '🐄', nameML: 'കന്നുകാലികൾ' },
    { id: 'goats', name: 'Goats', icon: '🐐', nameML: 'ആടുകൾ' },
    { id: 'poultry', name: 'Poultry', icon: '🐔', nameML: 'കോഴികൾ' },
    { id: 'ducks', name: 'Ducks', icon: '🦆', nameML: 'താറാവുകൾ' },
    { id: 'fish', name: 'Fish', icon: '🐟', nameML: 'മത്സ്യം' },
    { id: 'other', name: 'Other', icon: '🐾', nameML: 'മറ്റുള്ളവ' }
  ];

  const landTypes = [
    { id: 'lowland', name: 'Lowland', nameML: 'താഴ്ന്ന പ്രദേശം' },
    { id: 'upland', name: 'Upland', nameML: 'ഉയർന്ന പ്രദേശം' },
    { id: 'coastal', name: 'Coastal', nameML: 'തീരപ്രദേശം' },
    { id: 'hilly', name: 'Hilly', nameML: 'മലയോര പ്രദേശം' },
    { id: 'other', name: 'Other', nameML: 'മറ്റുള്ളവ' }
  ];

  const soilTypes = [
    { id: 'laterite', name: 'Laterite Soil', nameML: 'ലാറ്ററൈറ്റ് മണ്ണ്' },
    { id: 'alluvial', name: 'Alluvial Soil', nameML: 'എണ്ണ മണ്ണ്' },
    { id: 'sandy', name: 'Sandy Soil', nameML: 'മണൽ മണ്ണ്' },
    { id: 'black', name: 'Black Soil', nameML: 'കറുത്ത മണ്ണ്' },
    { id: 'peaty', name: 'Peaty/Marshy Soil', nameML: 'ചതുപ്പ് മണ്ണ്' },
    { id: 'other', name: 'Other', nameML: 'മറ്റുള്ളവ' }
  ];

  const farmingTypes = [
    { id: 'organic', name: 'Organic', nameML: 'ജൈവികം' },
    { id: 'conventional', name: 'Conventional', nameML: 'പരമ്പരാഗതം' },
    { id: 'mixed', name: 'Mixed', nameML: 'മിശ്രിതം' },
    { id: 'cash-crops', name: 'Cash Crops', nameML: 'നാണ്യവിളകൾ' },
    { id: 'plantation', name: 'Plantation', nameML: 'തോട്ടകൃഷി' },
    { id: 'other', name: 'Other', nameML: 'മറ്റുള്ളവ' }
  ];

  const irrigationTypes = [
    { id: 'drip', name: 'Drip Irrigation', icon: '💧', nameML: 'തുള്ളി നനയ്ക്കൽ' },
    { id: 'canal', name: 'Canal Irrigation', icon: '🚰', nameML: 'കനാൽ നനയ്ക്കൽ' },
    { id: 'borewell', name: 'Borewell', icon: '⚪', nameML: 'ബോർവെൽ' },
    { id: 'rainfed', name: 'Rain-fed', icon: '🌧️', nameML: 'മഴ നനയ്ക്കൽ' },
    { id: 'other', name: 'Other', icon: '💦', nameML: 'മറ്റുള്ളവ' }
  ];

  const storageTypes = [
    { id: 'godown', name: 'Godown', icon: '🏪', nameML: 'ഗോഡൗൺ' },
    { id: 'coldstorage', name: 'Cold Storage', icon: '❄️', nameML: 'കോൾഡ് സ്റ്റോറേജ്' },
    { id: 'traditional', name: 'Traditional Storage', icon: '🏠', nameML: 'പരമ്പരാഗത സംഭരണം' },
    { id: 'other', name: 'Other', icon: '📦', nameML: 'മറ്റുള്ളവ' }
  ];

  const machineryTypes = [
    { id: 'tractor', name: 'Tractor', icon: '🚜', nameML: 'ട്രാക്ടർ' },
    { id: 'powertiller', name: 'Power Tiller', icon: '⚙️', nameML: 'പവർ ടില്ലർ' },
    { id: 'harvester', name: 'Harvester', icon: '🌾', nameML: 'വിളവെടുപ്പ് യന്ത്രം' },
    { id: 'thresher', name: 'Thresher', icon: '🥾', nameML: 'മെത്ത് യന്ത്രം' },
    { id: 'other', name: 'Other', icon: '🔧', nameML: 'മറ്റുള്ളവ' }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    toast({
      title: "Welcome to VithuAI! 🎉",
      description: "Your farming assistant is ready to help you."
    });
    navigate('/home');
  };

  const toggleCrop = (cropId: string) => {
    if (cropId === 'other') {
      setShowOtherModal({ show: true, type: 'crop', value: profile.cropsOther });
      return;
    }
    setProfile(prev => ({
      ...prev,
      crops: prev.crops.includes(cropId) 
        ? prev.crops.filter(id => id !== cropId)
        : [...prev.crops, cropId]
    }));
  };

  const toggleLivestock = (livestockId: string) => {
    if (livestockId === 'other') {
      setShowOtherModal({ show: true, type: 'livestock', value: profile.livestockOther });
      return;
    }
    setProfile(prev => ({
      ...prev,
      livestock: prev.livestock.includes(livestockId)
        ? prev.livestock.filter(id => id !== livestockId)
        : [...prev.livestock, livestockId]
    }));
  };

  const toggleFacilityType = (facilityType: string, facilityId: string) => {
    if (facilityId === 'other') {
      setShowOtherModal({ show: true, type: facilityType, value: profile[`${facilityType}Other`] });
      return;
    }
    setProfile(prev => ({
      ...prev,
      [facilityType]: prev[facilityType].includes(facilityId)
        ? prev[facilityType].filter(id => id !== facilityId)
        : [...prev[facilityType], facilityId]
    }));
  };

  const handleOtherSubmit = () => {
    const { type, value } = showOtherModal;
    if (!value.trim()) return;
    
    if (type === 'crop' || type === 'livestock') {
      setProfile(prev => ({
        ...prev,
        [`${type}sOther`]: value,
        [type === 'crop' ? 'crops' : 'livestock']: 
          [...prev[type === 'crop' ? 'crops' : 'livestock'], 'other']
      }));
    } else if (['irrigation', 'storage', 'machinery'].includes(type)) {
      setProfile(prev => ({
        ...prev,
        [`${type}Other`]: value,
        [type]: [...prev[type], 'other']
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [`${type}Other`]: value,
        [type]: 'other'
      }));
    }
    setShowOtherModal({ show: false, type: '', value: '' });
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index <= step ? 'bg-farm-green' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-foreground/70">
            Step {step + 1} of {steps.length}
          </p>
        </div>


        <Card className="glass-card p-8 text-center">
          {/* Step 1: Welcome */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                👋
              </motion.div>
              <h1 className="text-3xl font-bold text-farm-green mb-2">
                Namaskaram!
              </h1>
              <p className="text-lg text-foreground/80 mb-8">
                Welcome to <span className="text-farm-green font-semibold">VithuAI - Krishi Sakhi</span>
                <br />
                Your Malayalam farming assistant
              </p>
              <Button onClick={handleNext} className="w-full bg-sky-blue hover:bg-sky-blue-light" size="lg">
                Let's Setup Your Farm
              </Button>
            </motion.div>
          )}

          {/* Step 2: Language Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Languages className="w-16 h-16 text-farm-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-farm-green">
                Choose Your Language
              </h2>
              <p className="text-foreground/70 mb-6">
                ഭാഷ തെരെഞ്ഞെടുക്കുക
              </p>
              <div className="space-y-3">
                <Button
                  variant={language === 'malayalam' ? 'default' : 'outline'}
                  onClick={() => setLanguage('malayalam')}
                  className={`w-full flex items-center gap-3 ${
                    language !== 'malayalam' ? 'hover:bg-sky-blue/20 hover:border-sky-blue/40' : ''
                  }`}
                  size="lg"
                >
                  <span className="text-xl">🇮🇳</span>
                  Malayalam (മലയാളം)
                </Button>
                <Button
                  variant={language === 'english' ? 'default' : 'outline'}
                  onClick={() => setLanguage('english')}
                  className={`w-full flex items-center gap-3 ${
                    language !== 'english' ? 'hover:bg-sky-blue/20 hover:border-sky-blue/40' : ''
                  }`}
                  size="lg"
                >
                  <span className="text-xl">🇬🇧</span>
                  English
                </Button>
                <Button
                  variant={language === 'hindi' ? 'default' : 'outline'}
                  onClick={() => setLanguage('hindi')}
                  className={`w-full flex items-center gap-3 ${
                    language !== 'hindi' ? 'hover:bg-sky-blue/20 hover:border-sky-blue/40' : ''
                  }`}
                  size="lg"
                >
                  <span className="text-xl">🇮🇳</span>
                  Tamil (தமிழ்)
                </Button>
              </div>
              {language && (
                <Button onClick={handleNext} className="w-full mt-6 bg-sky-blue hover:bg-sky-blue-light">
                  Continue
                </Button>
              )}
            </motion.div>
          )}

          {/* Step 3: Sign Up */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-farm-green">
                Create Your Account
              </h2>
              
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <Input 
                      placeholder="Choose a username"
                      value={profile.username}
                      onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <Input 
                      type="number"
                      placeholder="Enter your number"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <Input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={profile.password}
                      onChange={(e) => setProfile(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <Input 
                    type="password"
                    placeholder="Confirm your password"
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleNext} 
                disabled={!profile.username || !profile.email || !profile.password || !profile.confirmPassword}
                className="w-full bg-sky-blue hover:bg-sky-blue-light"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 4: Personal Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-farm-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-farm-green" />
                  <button className="absolute bottom-0 right-1/2 translate-x-8 w-8 h-8 bg-farm-green rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-farm-green">
                Personal Details
              </h2>
              
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <Input 
                      placeholder="Enter your full name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Mic className="w-4 h-4 text-farm-green" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Age</label>
                    <Input 
                      type="number"
                      placeholder="Age"
                      value={profile.age}
                      onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <select 
                      className="w-full p-2 border rounded-md bg-white/80"
                      value={profile.gender}
                      onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Whatsapp Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <Input 
                      type="number"
                      placeholder="Enter your number"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <Input 
                      placeholder="District, Kerala"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Farming Experience: {profile.experience} years
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={profile.experience}
                    onChange={(e) => setProfile(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-farm-green/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <Button onClick={handleNext} disabled={!profile.name || !profile.phone} className="w-full bg-sky-blue hover:bg-sky-blue-light">
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 5: Land Details */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <MapPin className="w-16 h-16 text-farm-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-farm-green">
                Land Details
              </h2>
              
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-sm font-medium mb-2">
                    Total Land Size: {profile.landSize} acres (max 30)
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.5"
                    value={profile.landSize}
                    onChange={(e) => setProfile(prev => ({ ...prev, landSize: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-farm-green/20 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-medium mb-3">Land Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {landTypes.map(type => (
                      <Button
                        key={type.id}
                        variant={profile.landType === type.id ? 'default' : 'outline'}
                        onClick={() => {
                          if (type.id === 'other') {
                            setShowOtherModal({ show: true, type: 'landType', value: profile.landTypeOther });
                          } else {
                            setProfile(prev => ({ ...prev, landType: type.id }));
                          }
                        }}
                        className={`text-xs p-2 h-auto ${
                          profile.landType !== type.id ? 'hover:bg-sky-blue/20 hover:border-sky-blue/40' : ''
                        }`}
                      >
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs opacity-70">{type.nameML}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-sm font-medium mb-3">Soil Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {soilTypes.map(type => (
                      <Button
                        key={type.id}
                        variant={profile.soilType === type.id ? 'default' : 'outline'}
                        onClick={() => {
                          if (type.id === 'other') {
                            setShowOtherModal({ show: true, type: 'soilType', value: profile.soilTypeOther });
                          } else {
                            setProfile(prev => ({ ...prev, soilType: type.id }));
                          }
                        }}
                        className={`text-xs p-2 h-auto ${
                          profile.soilType !== type.id ? 'hover:bg-sky-blue/20 hover:border-sky-blue/40' : ''
                        }`}
                      >
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs opacity-70">{type.nameML}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-medium mb-3">Farming Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {farmingTypes.map(type => (
                      <Button
                        key={type.id}
                        variant={profile.farmingType === type.id ? 'default' : 'outline'}
                        onClick={() => {
                          if (type.id === 'other') {
                            setShowOtherModal({ show: true, type: 'farmingType', value: profile.farmingTypeOther });
                          } else {
                            setProfile(prev => ({ ...prev, farmingType: type.id }));
                          }
                        }}
                        className={`text-xs p-2 h-auto ${
                          profile.farmingType !== type.id ? 'hover:bg-sky-blue/20 hover:border-sky-blue/40' : ''
                        }`}
                      >
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs opacity-70">{type.nameML}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNext} disabled={!profile.landType || !profile.soilType || !profile.farmingType} className="w-full bg-sky-blue hover:bg-sky-blue-light">
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 6: Crop Details */}
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Wheat className="w-16 h-16 text-farm-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-farm-green">
                Crop & Livestock Details
              </h2>
              
              <div className="space-y-6">
                {/* Crops */}
                <div>
                  <label className="block text-sm font-medium mb-3">What crops do you grow?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {crops.map(crop => (
                      <motion.button
                        key={crop.id}
                        onClick={() => toggleCrop(crop.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          profile.crops.includes(crop.id)
                            ? 'border-farm-green bg-farm-green/10'
                            : 'border-white/20 bg-white/5 hover:bg-sky-blue/10 hover:border-sky-blue/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-2xl mb-2">{crop.icon}</div>
                        <div className="text-sm font-medium">{crop.name}</div>
                        <div className="text-xs text-foreground/60">{crop.nameML}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Livestock */}
                <div>
                  <label className="block text-sm font-medium mb-3">Livestock (if any)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {livestock.map(animal => (
                      <motion.button
                        key={animal.id}
                        onClick={() => toggleLivestock(animal.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          profile.livestock.includes(animal.id)
                            ? 'border-farm-green bg-farm-green/10'
                            : 'border-white/20 bg-white/5 hover:bg-sky-blue/10 hover:border-sky-blue/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-2xl mb-2">{animal.icon}</div>
                        <div className="text-sm font-medium">{animal.name}</div>
                        <div className="text-xs text-foreground/60">{animal.nameML}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNext} disabled={profile.crops.length === 0} className="w-full bg-sky-blue hover:bg-sky-blue-light">
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 7: Available Facilities */}
          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Trees className="w-16 h-16 text-farm-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-farm-green">
                Available Facilities
              </h2>
              
              <div className="space-y-6">
                {/* Irrigation */}
                <div>
                  <label className="block text-sm font-medium mb-3">Irrigation Systems</label>
                  <div className="grid grid-cols-2 gap-3">
                    {irrigationTypes.map(irrigation => (
                      <motion.button
                        key={irrigation.id}
                        onClick={() => toggleFacilityType('irrigation', irrigation.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          profile.irrigation.includes(irrigation.id)
                            ? 'border-farm-green bg-farm-green/10'
                            : 'border-white/20 bg-white/5 hover:bg-sky-blue/10 hover:border-sky-blue/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-2xl mb-2">{irrigation.icon}</div>
                        <div className="text-sm font-medium">{irrigation.name}</div>
                        <div className="text-xs text-foreground/60">{irrigation.nameML}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Storage */}
                <div>
                  <label className="block text-sm font-medium mb-3">Storage Facilities</label>
                  <div className="grid grid-cols-2 gap-3">
                    {storageTypes.map(storage => (
                      <motion.button
                        key={storage.id}
                        onClick={() => toggleFacilityType('storage', storage.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          profile.storage.includes(storage.id)
                            ? 'border-farm-green bg-farm-green/10'
                            : 'border-white/20 bg-white/5 hover:bg-sky-blue/10 hover:border-sky-blue/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-2xl mb-2">{storage.icon}</div>
                        <div className="text-sm font-medium">{storage.name}</div>
                        <div className="text-xs text-foreground/60">{storage.nameML}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Machinery */}
                <div>
                  <label className="block text-sm font-medium mb-3">Machinery & Equipment</label>
                  <div className="grid grid-cols-2 gap-3">
                    {machineryTypes.map(machinery => (
                      <motion.button
                        key={machinery.id}
                        onClick={() => toggleFacilityType('machinery', machinery.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          profile.machinery.includes(machinery.id)
                            ? 'border-farm-green bg-farm-green/10'
                            : 'border-white/20 bg-white/5 hover:bg-sky-blue/10 hover:border-sky-blue/30'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-2xl mb-2">{machinery.icon}</div>
                        <div className="text-sm font-medium">{machinery.name}</div>
                        <div className="text-xs text-foreground/60">{machinery.nameML}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNext} className="w-full bg-sky-blue hover:bg-sky-blue-light">
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 8: Review & Complete */}
          {step === 7 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <CheckCircle className="w-16 h-16 text-farm-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-farm-green">
                Review & Complete
              </h2>
              
              <div className="space-y-4 text-left">
                <Card className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Account Details</h4>
                    <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground/70">
                    Username: {profile.username}<br />
                    Email: {profile.email}
                  </p>
                </Card>
                
                <Card className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Personal Info</h4>
                    <Button variant="ghost" size="sm" onClick={() => setStep(3)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground/70">
                    {profile.name}, {profile.age} years<br />
                    📍 {profile.location}<br />
                    🌾 {profile.experience} years experience
                  </p>
                </Card>
                
                <Card className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Farm Details</h4>
                    <Button variant="ghost" size="sm" onClick={() => setStep(4)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground/70">
                    🌍 {profile.landSize} acres<br />
                    📍 {landTypes.find(t => t.id === profile.landType)?.name}<br />
                    🏞️ {soilTypes.find(t => t.id === profile.soilType)?.name}<br />
                    🌱 {farmingTypes.find(t => t.id === profile.farmingType)?.name}
                  </p>
                </Card>
                
                <Card className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Crops & Livestock</h4>
                    <Button variant="ghost" size="sm" onClick={() => setStep(5)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {profile.crops.map(cropId => {
                      const crop = crops.find(c => c.id === cropId);
                      return (
                        <Badge key={cropId} className="bg-farm-green/20 text-farm-green text-xs">
                          {crop?.icon} {crop?.name}
                        </Badge>
                      );
                    })}
                  </div>
                  {profile.livestock.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {profile.livestock.map(animalId => {
                        const animal = livestock.find(l => l.id === animalId);
                        return (
                          <Badge key={animalId} className="bg-sky-blue/20 text-sky-blue text-xs">
                            {animal?.icon} {animal?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </Card>

                <Card className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Facilities</h4>
                    <Button variant="ghost" size="sm" onClick={() => setStep(6)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-foreground/70">
                    {profile.irrigation.length > 0 && (
                      <div>
                        <span className="font-medium">Irrigation:</span> {
                          profile.irrigation.map(id => irrigationTypes.find(i => i.id === id)?.name).join(', ')
                        }
                      </div>
                    )}
                    {profile.storage.length > 0 && (
                      <div>
                        <span className="font-medium">Storage:</span> {
                          profile.storage.map(id => storageTypes.find(s => s.id === id)?.name).join(', ')
                        }
                      </div>
                    )}
                    {profile.machinery.length > 0 && (
                      <div>
                        <span className="font-medium">Machinery:</span> {
                          profile.machinery.map(id => machineryTypes.find(m => m.id === id)?.name).join(', ')
                        }
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              <div className="pt-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: 2,
                  }}
                  className="text-4xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-xl font-bold text-farm-green mb-2">
                  Ready to Start Your Journey!
                </h3>
                <p className="text-foreground/70 mb-6">
                  Your smart farming companion is ready to help you grow better.
                </p>
                <Button onClick={handleComplete} className="w-full bg-sky-blue hover:bg-sky-blue-light" size="lg">
                  Confirm & Complete Onboarding 🌱
                </Button>
              </div>
            </motion.div>
          )}

          {/* Other Input Modal */}
          {showOtherModal.show && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="glass-card w-full max-w-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Specify Other {showOtherModal.type}
                  </h3>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Enter details..."
                      value={showOtherModal.value}
                      onChange={(e) => setShowOtherModal(prev => ({ ...prev, value: e.target.value }))}
                      className="min-h-[100px]"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleOtherSubmit} className="flex-1 bg-sky-blue hover:bg-sky-blue-light">
                        Add
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowOtherModal({ show: false, type: '', value: '' })}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </Card>
        <div className="flex justify-center items-center">
          <div className="flex-shrink-0 mx-2">
            <MicButton />
          </div>
        </div>
        {step > 0 && step < steps.length - 1 && (
          <Button
            variant="ghost" 
            onClick={() => setStep(step - 1)}
            className="w-full mt-4 text-foreground/70"
          >
            Back
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default Onboarding;
