import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Languages, 
  LogIn, 
  Rocket, 
  Sprout, 
  BarChart3, 
  Brain, 
  Globe,
  Heart,
  Github,
  Linkedin,
  Twitter,
  Bug
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sprout,
      title: 'Personalized Crop Advisory',
      description: 'Get recommendations tailored to your land, crops, and local conditions.',
      color: 'bg-primary'
    },
    {
      icon: BarChart3,
      title: 'Smart Data Dashboards',
      description: 'Visualize yields, costs, and performance with intuitive charts and maps.',
      color: 'bg-sky-blue'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Predict risks, optimize resources, and receive real-time alerts.',
      color: 'bg-harvest-yellow'
    },
    {
      icon: Bug,
      title: 'Pest & Disease Detection',
      description: 'Instantly identify crop diseases and pest risks with AI-powered photo and voice inputs.',
      color: 'bg-destructive'
    },
    {
      icon: Globe,
      title: 'Localized for Kerala',
      description: 'Support for Malayalam, integration of Kerala\'s land, crop, and climate data.',
      color: 'bg-earth-brown'
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <motion.header 
        className="flex items-center justify-between p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">VithuAI</h1>
            <p className="text-xs text-foreground/70">Krishi Sakhi</p>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Language Dropdown */}
          <div className="relative group">
            <Button variant="outline" size="sm" className="glass-card border-white/20">
              <Languages className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Language</span>
            </Button>
            <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <Button 
            variant="outline" 
            size="sm" 
            className="glass-card border-white/20"
            onClick={() => navigate('/login')}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Log In
          </Button>
          
          <Button 
            size="sm"
            className="gradient-primary text-white hover:opacity-90"
            onClick={() => navigate('/onboarding')}
          >
            <Rocket className="w-4 h-4 mr-2" />
            Create Account
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="text-center px-6 py-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="mb-8"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-6xl sm:text-8xl mb-4">🌱</div>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-6xl font-bold text-primary mb-4 text-shadow-soft"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          VithuAI – Krishi Sakhi
        </motion.h1>

        <motion.p 
          className="text-xl sm:text-2xl text-primary/80 mb-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          "Your Intelligent Farming Companion"
        </motion.p>

        <motion.p 
          className="text-lg text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Empowering Kerala's farmers with AI-driven insights, smart crop guidance, 
          and personalized decision support for sustainable and profitable agriculture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button 
            size="lg"
            className="gradient-primary text-white hover:opacity-90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/onboarding')}
          >
            <Rocket className="w-5 h-5 mr-3" />
            Start Your Journey
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="px-6 py-16 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Smart Farming Made Simple
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover how VithuAI transforms traditional farming with modern AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="glass-card-hover h-full cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="px-6 py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <Card className="glass-card max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Transform Your Farming?
            </h3>
            <p className="text-foreground/70 mb-6">
              Join thousands of Kerala farmers who are already using VithuAI to make smarter decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="gradient-primary text-white hover:opacity-90"
                onClick={() => navigate('/onboarding')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="glass-card border-white/20"
                onClick={() => navigate('/login')}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Already have an account?
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="px-6 py-8 border-t border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="text-foreground/70">Built with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-foreground/70">by</span>
            <span className="font-semibold text-primary">Code Huntrix</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
