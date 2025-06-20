
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Tip {
  track: string;
  raceNumber: number;
  horseNumber: number;
}

const Tips = () => {
  const { year, month, day } = useParams();
  
  // Generate sample tips data (in a real app, this would come from an API)
  const generateSampleTips = (): Tip[] => {
    const tracks = ['Churchill Downs', 'Belmont Park', 'Santa Anita', 'Del Mar', 'Gulfstream Park'];
    const tips: Tip[] = [];
    
    for (let i = 0; i < 12; i++) {
      tips.push({
        track: tracks[Math.floor(Math.random() * tracks.length)],
        raceNumber: Math.floor(Math.random() * 10) + 1,
        horseNumber: Math.floor(Math.random() * 12) + 1,
      });
    }
    
    return tips.sort((a, b) => a.track.localeCompare(b.track) || a.raceNumber - b.raceNumber);
  };

  const tips = generateSampleTips();
  const selectedDate = new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      
      <main className="pt-20">
        <div className="container section-padding">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-orange-400" size={24} />
              <h1 className="heading-lg">Tips for {formattedDate}</h1>
            </div>
            
            <p className="body-md text-gray-300">
              Here are today's expert horse racing tips with our data-driven predictions.
            </p>
          </div>

          {/* Tips Table */}
          <div className="glass rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Racing Tips</h2>
              <p className="text-gray-300 text-sm mt-1">
                {tips.length} tips available for this date
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-navy-800/50">
                    <TableHead className="text-orange-400 font-semibold">Track</TableHead>
                    <TableHead className="text-orange-400 font-semibold">Race #</TableHead>
                    <TableHead className="text-orange-400 font-semibold">Horse #</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tips.map((tip, index) => (
                    <TableRow 
                      key={index} 
                      className="border-white/10 hover:bg-navy-800/50 transition-colors"
                    >
                      <TableCell className="text-white font-medium">{tip.track}</TableCell>
                      <TableCell className="text-gray-300">{tip.raceNumber}</TableCell>
                      <TableCell className="text-gray-300">{tip.horseNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 glass p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-3">How to Use These Tips</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Each tip represents our algorithmic prediction for the most likely winner</li>
              <li>• Tips are generated using historical data, current form, and track conditions</li>
              <li>• Always bet responsibly and within your means</li>
              <li>• Check track conditions and late scratches before placing bets</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tips;
