import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DollarSign,
  Search,
  Filter,
  ExternalLink,
  Phone,
  MapPin,
  Calendar,
  Users,
  Mic,
  ArrowLeft,
  Building,
  IndianRupee
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';

const Schemes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const schemes = [
    {
      id: 1,
      title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      shortDesc: '₹6,000 annual income support for small farmers',
      fullDesc: 'Direct income support of ₹6,000 per year to eligible farmer families having cultivable land upto 2 hectares.',
      amount: '₹6,000/year',
      eligibility: 'Farmers with land up to 2 hectares',
      type: 'central',
      category: 'subsidy',
      status: 'active',
      lastDate: '2025-12-31',
      documents: ['Land records', 'Aadhaar', 'Bank account'],
      contact: '1800-115-526',
      website: 'pmkisan.gov.in'
    },
    {
      id: 2,
      title: 'Kerala Karshaka Pension Scheme',
      shortDesc: 'Monthly pension for elderly farmers',
      fullDesc: 'Pension scheme providing monthly financial assistance to farmers above 60 years of age in Kerala.',
      amount: '₹1,200/month',
      eligibility: 'Farmers above 60 years, Kerala residents',
      type: 'state',
      category: 'pension',
      status: 'active',
      lastDate: 'Ongoing',
      documents: ['Age proof', 'Land documents', 'Income certificate'],
      contact: '0471-2305242',
      website: 'kerala.gov.in'
    },
    {
      id: 3,
      title: 'Crop Insurance Scheme (PMFBY)',
      shortDesc: 'Insurance coverage for crop losses',
      fullDesc: 'Comprehensive crop insurance covering pre-sowing to post-harvest losses due to natural calamities.',
      amount: 'Up to ₹2 lakh coverage',
      eligibility: 'All farmers (loanee & non-loanee)',
      type: 'central',
      category: 'insurance',
      status: 'active',
      lastDate: '2025-03-31',
      documents: ['Land records', 'Aadhaar', 'Bank account', 'Crop details'],
      contact: '1800-180-1551',
      website: 'pmfby.gov.in'
    },
    {
      id: 4,
      title: 'Kerala Coconut Development Mission',
      shortDesc: 'Support for coconut farmers and processing',
      fullDesc: 'Financial assistance for coconut plantation, processing units, and value addition activities.',
      amount: '₹50,000-₹5 lakh',
      eligibility: 'Coconut farmers in Kerala',
      type: 'state',
      category: 'development',
      status: 'active',
      lastDate: '2025-06-30',
      documents: ['Land ownership proof', 'Project proposal', 'Bank account'],
      contact: '0471-2301740',
      website: 'coconutboard.gov.in'
    },
    {
      id: 5,
      title: 'Organic Farming Certification Support',
      shortDesc: 'Financial aid for organic certification',
      fullDesc: 'Subsidy for obtaining organic certification and promoting organic farming practices.',
      amount: '₹25,000 per certification',
      eligibility: 'Farmers practicing organic methods',
      type: 'central',
      category: 'subsidy',
      status: 'active',
      lastDate: '2025-09-30',
      documents: ['Organic farming proof', 'Land records', 'Training certificate'],
      contact: '1800-180-1240',
      website: 'pgsindia-ncof.gov.in'
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Schemes', count: schemes.length },
    { id: 'subsidy', label: 'Subsidies', count: schemes.filter(s => s.category === 'subsidy').length },
    { id: 'insurance', label: 'Insurance', count: schemes.filter(s => s.category === 'insurance').length },
    { id: 'loan', label: 'Loans', count: 0 },
    { id: 'central', label: 'Central Govt', count: schemes.filter(s => s.type === 'central').length },
    { id: 'state', label: 'State Govt', count: schemes.filter(s => s.type === 'state').length }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         scheme.category === filterType || 
                         scheme.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    return type === 'central' 
      ? 'bg-sky-blue/20 text-sky-blue' 
      : 'bg-earth-brown/20 text-earth-brown';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'subsidy': return '💰';
      case 'insurance': return '🛡️';
      case 'loan': return '🏦';
      case 'pension': return '👴';
      case 'development': return '🌱';
      default: return '📋';
    }
  };

  return (
    <div className="min-h-screen gradient-hero pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 lg:px-12 pt-12 py-4"
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
              <DollarSign className="w-6 h-6 mr-2 text-earth-brown" />
              Government Schemes
            </h1>
            <p className="text-foreground/70">Find benefits you're eligible for</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-4 h-4" />
          <Input
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 glass-card border-white/20"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Mic className="w-4 h-4 text-farm-green" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
          {filterOptions.map((filter) => (
            <Button
              key={filter.id}
              variant={filterType === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType(filter.id)}
              className={`whitespace-nowrap ${filterType === filter.id ? '' : 'glass-card border-white/20'}`}
            >
              {filter.label}
              <Badge className="ml-2 bg-white/20 text-xs">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Schemes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-6 lg:px-12 space-y-4"
      >
        {filteredSchemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card-hover">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{getCategoryIcon(scheme.category)}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm leading-tight">
                            {scheme.title}
                          </h3>
                          <p className="text-xs text-foreground/70 mt-1">
                            {scheme.shortDesc}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(scheme.type)}>
                          <Building className="w-3 h-3 mr-1" />
                          {scheme.type === 'central' ? 'Central' : 'State'}
                        </Badge>
                        <Badge className="bg-farm-green/20 text-farm-green">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          {scheme.amount}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="p-2">
                      🔊
                    </Button>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <p className="text-foreground/80 leading-relaxed">
                      {scheme.fullDesc}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-start">
                        <Users className="w-4 h-4 mr-2 text-farm-green mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Eligibility: </span>
                          <span className="text-foreground/70">{scheme.eligibility}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="w-4 h-4 mr-2 text-harvest-yellow mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Last Date: </span>
                          <span className="text-foreground/70">{scheme.lastDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Required Documents */}
                    <div>
                      <p className="font-medium mb-2">📋 Required Documents:</p>
                      <div className="flex flex-wrap gap-1">
                        {scheme.documents.map((doc, i) => (
                          <Badge key={i} className="bg-white/20 text-xs text-foreground/70">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                    <Button size="sm" variant="outline" className="glass-card border-white/20 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Apply Online
                    </Button>
                    <Button size="sm" variant="outline" className="glass-card border-white/20 text-xs">
                      <Phone className="w-3 h-3 mr-1" />
                      Call Help
                    </Button>
                    <Button size="sm" variant="outline" className="glass-card border-white/20 text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      Office
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredSchemes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 lg:px-12"
        >
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No schemes found
              </h3>
              <p className="text-foreground/70 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setFilterType('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
};

export default Schemes;