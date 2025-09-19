import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Camera,
  CheckCircle,
  XCircle,
  Upload,
  Clock
} from 'lucide-react';

interface TrackingEntry {
  id: string;
  date: string;
  status: 'done' | 'not-done' | 'pending';
  image?: string;
  notes?: string;
}

export const DailyTreatmentTracking = () => {
  const [trackingEntries, setTrackingEntries] = useState<TrackingEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      status: 'done',
      image: '/placeholder-progress.jpg',
      notes: 'Applied neem oil spray on coconut palms'
    },
    {
      id: '2',
      date: '2024-01-14',
      status: 'done',
      image: '/placeholder-progress2.jpg',
      notes: 'Phosphorus fertilizer applied to rice field'
    },
    {
      id: '3',
      date: '2024-01-13',
      status: 'not-done',
      notes: 'Missed watering schedule due to rain'
    }
  ]);

  const toggleStatus = (id: string) => {
    setTrackingEntries(prev => 
      prev.map(entry => 
        entry.id === id 
          ? { ...entry, status: entry.status === 'done' ? 'not-done' : 'done' }
          : entry
      )
    );
  };

  const addNewEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry: TrackingEntry = {
      id: Date.now().toString(),
      date: today,
      status: 'pending',
      notes: ''
    };
    setTrackingEntries(prev => [newEntry, ...prev]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return (
          <Badge className="bg-farm-green/20 text-farm-green border-farm-green/40 px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Done
          </Badge>
        );
      case 'not-done':
        return (
          <Badge className="bg-destructive/20 text-destructive border-destructive/40 px-3 py-1 rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Not Done
          </Badge>
        );
      default:
        return (
          <Badge className="bg-harvest-yellow/20 text-harvest-yellow border-harvest-yellow/40 px-3 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="px-8 mb-32 lg:mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center">
          <Calendar className="w-6 h-6 mr-3 text-farm-green" />
          Daily Treatment Tracking
        </h2>
        <Button 
          onClick={addNewEntry}
          className="bg-farm-green hover:bg-farm-green/90 text-white px-4 py-2 rounded-xl shadow-lg"
        >
          Add Today's Entry
        </Button>
      </div>

      <div className="space-y-4">
        {trackingEntries.map((entry, index) => (
          <Card key={entry.id} className="glass-card-hover rounded-2xl border-2 border-border/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-farm-green/10 p-3 rounded-xl">
                    <Calendar className="w-5 h-5 text-farm-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {formatDate(entry.date)}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {entry.notes || 'No notes added'}
                    </p>
                  </div>
                </div>
                {getStatusBadge(entry.status)}
              </div>

              {entry.image && (
                <div className="mb-4">
                  <div className="w-full h-32 bg-farm-green/10 rounded-xl flex items-center justify-center">
                    <Camera className="w-8 h-8 text-farm-green/50" />
                    <span className="ml-2 text-sm text-farm-green/70">Progress Image</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border/20">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-farm-green/30 text-farm-green hover:bg-farm-green/10 rounded-lg"
                  >
                    <Camera className="w-3 h-3 mr-1" />
                    Upload Image
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(entry.id)}
                    className={`rounded-lg ${
                      entry.status === 'done' 
                        ? 'border-destructive/30 text-destructive hover:bg-destructive/10'
                        : 'border-farm-green/30 text-farm-green hover:bg-farm-green/10'
                    }`}
                  >
                    {entry.status === 'done' ? (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Mark Undone
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mark Done
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {trackingEntries.length === 0 && (
        <Card className="glass-card border-2 border-dashed border-farm-green/30 rounded-2xl">
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-farm-green/50" />
            <h3 className="font-semibold text-foreground mb-2">No Tracking Entries</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Start tracking your daily treatment progress
            </p>
            <Button 
              onClick={addNewEntry}
              className="bg-farm-green hover:bg-farm-green/90 text-white px-6 py-2 rounded-xl"
            >
              Add First Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};