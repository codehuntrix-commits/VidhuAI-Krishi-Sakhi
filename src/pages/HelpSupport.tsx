import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  HeadphonesIcon,
  Phone,
  MessageCircle,
  Video,
  Mail,
  PlayCircle,
  ArrowLeft,
  HelpCircle,
  BookOpen,
  Users
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HelpSupport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showChat, setShowChat] = useState(false);

  const quickQuestions = [
    { id: 1, question: 'How do I detect pest on my crops?', questionML: 'എന്റെ വിളകളിൽ കീടങ്ങളെ എങ്ങനെ കണ്ടെത്തും?', icon: '🐛' },
    { id: 2, question: 'Set watering reminder for my crops', questionML: 'എന്റെ വിളകൾക്ക് നനയ്ക്കൽ ഓർമ്മപ്പെടുത്തൽ സജ്ജമാക്കുക', icon: '💧' },
    { id: 3, question: 'How to upload photos for diagnosis?', questionML: 'രോഗനിർണയത്തിനായി ഫോട്ടോകൾ എങ്ങനെ അപ്ലോഡ് ചെയ്യാം?', icon: '📷' },
    { id: 4, question: 'What fertilizer should I use for rice?', questionML: 'നെല്ലിന് ഏത് വളമാണ് ഉപയോഗിക്കേണ്ടത്?', icon: '🌾' },
    { id: 5, question: 'Check soil health status', questionML: 'മണ്ണിന്റെ ആരോഗ്യ സ്ഥിതി പരിശോധിക്കുക', icon: '🔬' }
  ];

  const supportContacts = [
    {
      type: 'phone',
      title: 'Agri Expert Hotline',
      titleML: 'കാർഷിക വിദഗ്ധൻ ഹോട്ട്‌ലൈൻ',
      number: '1800-180-1551',
      availability: '24/7 Available',
      availabilityML: '24/7 ലഭ്യമാണ്',
      icon: Phone,
      color: 'bg-farm-green'
    },
    {
      type: 'whatsapp',
      title: 'WhatsApp Support',
      titleML: 'WhatsApp പിന്തുണ',
      number: '+91 98765 43210',
      availability: '6 AM - 10 PM',
      availabilityML: 'രാവിലെ 6 - രാത്രി 10',
      icon: MessageCircle,
      color: 'bg-green-500'
    },
    {
      type: 'email',
      title: 'Email Support',
      titleML: 'ഇമെയിൽ പിന്തുണ',
      number: 'support@vithuai.com',
      availability: 'Response in 24 hrs',
      availabilityML: '24 മണിക്കൂറിൽ മറുപടി',
      icon: Mail,
      color: 'bg-sky-blue'
    }
  ];

  return (
    <div className="min-h-screen gradient-hero pb-20 pt-24">
      <TopNav />
      
      <div className="lg:max-w-6xl lg:mx-auto px-4 md:px-6 mt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 lg:p-6 lg:max-w-6xl lg:mx-auto"
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
              <HeadphonesIcon className="w-6 h-6 mr-2 text-farm-green" />
              {t('help_support')}
            </h1>
            <p className="text-foreground/70">{t('contact_support')}</p>
          </div>
        </div>
      </motion.div>

      {/* Tutorial Video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 mb-8"
      >
        <Card className="glass-card">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center">
              <Video className="w-5 h-5 mr-2 text-farm-green" />
              {t('app_tutorial')}
            </h2>
            <div className="aspect-video bg-gradient-to-br from-farm-green/20 to-sky-blue/20 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
              <Button size="lg" className="relative z-10 bg-white/90 text-farm-green hover:bg-white">
                <PlayCircle className="w-6 h-6 mr-2" />
                Watch Tutorial (English)
              </Button>
            </div>
            <div className="flex space-x-2 mt-3">
              <Button size="sm" variant="outline" className="text-xs">മലയാളം</Button>
              <Button size="sm" variant="outline" className="text-xs">தமிழ்</Button>
              <Button size="sm" variant="outline" className="text-xs">हिंदी</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-8"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">{t('call_expert')}</h2>
        <div className="space-y-3">
          {supportContacts.map((contact, index) => (
            <Card key={index} className="glass-card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center`}>
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{contact.title}</h3>
                      <p className="text-sm text-foreground/70 font-mono">{contact.number}</p>
                      <p className="text-xs text-foreground/60 mt-1">{contact.availability}</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-farm-green hover:bg-farm-green-dark">
                    {contact.type === 'phone' || contact.type === 'whatsapp' ? 'Call' : 'Email'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* AI Chat Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-6 mb-8"
      >
        <Card className="glass-card border-2 border-farm-green/30">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-lg font-bold text-foreground mb-2">{t('chat_support')}</h2>
              <p className="text-sm text-foreground/70">
                Get instant answers to your farming questions
              </p>
            </div>
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-8"
      >
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-farm-green" />
          {t('quick_questions')}
        </h2>
        <div className="space-y-2">
          {quickQuestions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left glass-card border-white/20 hover:border-farm-green/40 h-auto py-3"
              >
                <span className="text-xl mr-3">{q.icon}</span>
                <span className="text-sm">{q.question}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-6 mb-32 lg:mb-8"
      >
        <h2 className="text-lg font-bold text-foreground mb-4">More Resources</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="glass-card-hover text-center">
            <CardContent className="p-4">
              <BookOpen className="w-8 h-8 text-farm-green mx-auto mb-2" />
              <h4 className="font-semibold text-foreground text-sm">FAQ</h4>
              <p className="text-xs text-foreground/70">Common Questions</p>
            </CardContent>
          </Card>
          <Card className="glass-card-hover text-center">
            <CardContent className="p-4">
              <Users className="w-8 h-8 text-sky-blue mx-auto mb-2" />
              <h4 className="font-semibold text-foreground text-sm">Community</h4>
              <p className="text-xs text-foreground/70">Connect with Farmers</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
        </div>
      <BottomNav />
    </div>
  );
};

export default HelpSupport;