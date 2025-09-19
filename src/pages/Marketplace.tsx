import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart,
  Plus,
  Share2,
  MapPin,
  Phone,
  Camera,
  IndianRupee,
  Truck,
  Star,
  ArrowLeft,
  QrCode,
  MessageCircle
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sell' | 'buy'>('sell');
  
  const myListings = [
    {
      id: 1,
      crop: 'Rice',
      variety: 'Jyothi',
      quantity: '500 kg',
      price: 22,
      unit: 'per kg',
      location: 'Kottayam',
      status: 'active',
      posted: '2 days ago',
      views: 15,
      inquiries: 3
    },
    {
      id: 2,
      crop: 'Coconut',
      variety: 'Fresh',
      quantity: '200 pieces',
      price: 15,
      unit: 'per piece',
      location: 'Kottayam',
      status: 'sold',
      posted: '1 week ago',
      views: 28,
      inquiries: 8
    }
  ];

  const nearbyListings = [
    {
      id: 1,
      seller: 'Rajan K',
      crop: 'Pepper',
      variety: 'Black Pepper',
      quantity: '50 kg',
      price: 450,
      unit: 'per kg',
      location: 'Kumily, 5 km away',
      rating: 4.8,
      phone: '+91 98765 43210',
      posted: '1 day ago'
    },
    {
      id: 2,
      seller: 'Maya Nair',
      crop: 'Cardamom',
      variety: 'Premium',
      quantity: '25 kg',
      price: 1200,
      unit: 'per kg',
      location: 'Munnar, 12 km away',
      rating: 4.9,
      phone: '+91 97654 32109',
      posted: '3 days ago'
    },
    {
      id: 3,
      seller: 'Suresh M',
      crop: 'Banana',
      variety: 'Robusta',
      quantity: '100 kg',
      price: 25,
      unit: 'per kg',
      location: 'Pala, 8 km away',
      rating: 4.6,
      phone: '+91 96543 21098',
      posted: '5 days ago'
    }
  ];

  const getCropIcon = (crop: string) => {
    const icons: { [key: string]: string } = {
      'Rice': '🌾',
      'Coconut': '🥥',
      'Pepper': '🌶️',
      'Cardamom': '🫚',
      'Banana': '🍌',
      'Rubber': '🌳'
    };
    return icons[crop] || '🌱';
  };

  return (
    <div className="min-h-screen gradient-hero pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 pt-12"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
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
                <ShoppingCart className="w-6 h-6 mr-2 text-earth-brown" />
                Marketplace
              </h1>
              <p className="text-foreground/70">Sell crops directly to buyers</p>
            </div>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeTab === 'sell' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sell')}
            className={activeTab === 'sell' ? '' : 'glass-card border-white/20'}
          >
            <Plus className="w-4 h-4 mr-2" />
            My Listings
          </Button>
          <Button
            variant={activeTab === 'buy' ? 'default' : 'outline'}
            onClick={() => setActiveTab('buy')}
            className={activeTab === 'buy' ? '' : 'glass-card border-white/20'}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy from Farmers
          </Button>
        </div>
      </motion.div>

      {activeTab === 'sell' && (
        <div className="px-6 space-y-6">
          {/* Add New Listing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-2 border-dashed border-farm-green/30">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-farm-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-farm-green" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  List Your Crops
                </h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Upload photos, set price, and reach buyers directly
                </p>
                <Button className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* My Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-bold text-foreground mb-4">
              Your Active Listings ({myListings.length})
            </h2>
            <div className="space-y-4">
              {myListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card-hover">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex space-x-3">
                          <div className="text-3xl">{getCropIcon(listing.crop)}</div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {listing.crop} - {listing.variety}
                            </h3>
                            <p className="text-sm text-foreground/70">
                              {listing.quantity}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            listing.status === 'active' 
                              ? 'bg-farm-green/20 text-farm-green' 
                              : 'bg-muted/20 text-muted-foreground'
                          }
                        >
                          {listing.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-lg font-bold text-foreground">
                          ₹{listing.price} {listing.unit}
                        </div>
                        <div className="flex items-center text-sm text-foreground/60">
                          <MapPin className="w-3 h-3 mr-1" />
                          {listing.location}
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-foreground/60 mb-3">
                        <span>👀 {listing.views} views</span>
                        <span>📞 {listing.inquiries} inquiries</span>
                        <span>{listing.posted}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <QrCode className="w-3 h-3 mr-1" />
                          QR Code
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-card bg-farm-green/10 border-farm-green/20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  🎉 Success Story
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Your coconut listing sold for <span className="font-semibold">₹3,000</span> last week! 
                  Buyer rating: ⭐⭐⭐⭐⭐ "Fresh quality, good price"
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {activeTab === 'buy' && (
        <div className="px-6 space-y-6">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              placeholder="Search for crops, location..."
              className="glass-card border-white/20"
            />
          </motion.div>

          {/* Nearby Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-bold text-foreground mb-4">
              🗺️ Near You ({nearbyListings.length} listings)
            </h2>
            <div className="space-y-4">
              {nearbyListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card-hover">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex space-x-3">
                          <div className="text-3xl">{getCropIcon(listing.crop)}</div>
                          <div>
                            <h3 className="font-semibold text-foreground text-sm">
                              {listing.crop} - {listing.variety}
                            </h3>
                            <p className="text-xs text-foreground/70">
                              by {listing.seller}
                            </p>
                            <div className="flex items-center mt-1">
                              <Star className="w-3 h-3 text-harvest-yellow mr-1" />
                              <span className="text-xs text-foreground/70">{listing.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">
                            ₹{listing.price}
                          </div>
                          <div className="text-xs text-foreground/60">{listing.unit}</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-foreground/80">
                          <Truck className="w-3 h-3 mr-2 text-farm-green" />
                          {listing.quantity} available
                        </div>
                        <div className="flex items-center text-sm text-foreground/70">
                          <MapPin className="w-3 h-3 mr-2" />
                          {listing.location}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" className="text-xs">
                          <Phone className="w-3 h-3 mr-1" />
                          Call Seller
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs glass-card border-white/20">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Price Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  📊 Today's Market Prices
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🌾</span>
                      <span className="text-sm font-medium">Rice (Jyothi)</span>
                    </div>
                    <span className="text-sm font-bold">₹20-25/kg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🌶️</span>
                      <span className="text-sm font-medium">Pepper (Black)</span>
                    </div>
                    <span className="text-sm font-bold">₹400-500/kg</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">🥥</span>
                      <span className="text-sm font-medium">Coconut</span>
                    </div>
                    <span className="text-sm font-bold">₹12-18/piece</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Marketplace;