import React, { useEffect, useState } from 'react';
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
  horseName: string;
  score: number;
}

const Tips = () => {
  const { year, month, day } = useParams();
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTrack, setSelectedTrack] = useState<string>('All Tracks');
  const [selectedRaceNumber, setSelectedRaceNumber] = useState<number | 'All'>('All');

  const selectedDate = new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    const fetchJSON = async () => {
      setLoading(true);
      setError(null);

      const dateStr = `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`;
      const url = `https://s3.ap-southeast-2.amazonaws.com/data.gunstips.com/${dateStr}.json`; // <- replace for prod

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not fetch tips for ${dateStr}`);

        const data: Tip[] = await response.json();

        const sorted = data.sort((a, b) =>
            a.track.localeCompare(b.track) ||
            a.raceNumber - b.raceNumber ||
            b.score - a.score
        );

        setTips(sorted);
      } catch (err: any) {
        setError(err.message || 'Failed to load tips');
        setTips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJSON();
  }, [year, month, day]);

  const allTracks = Array.from(new Set(tips.map(t => t.track))).sort();
  const raceNumbersForTrack = selectedTrack === 'All Tracks'
      ? []
      : Array.from(new Set(tips.filter(t => t.track === selectedTrack).map(t => t.raceNumber))).sort((a, b) => a - b);

  const filteredTips = tips.filter(tip => {
    return (
        (selectedTrack === 'All Tracks' || tip.track === selectedTrack) &&
        (selectedRaceNumber === 'All' || tip.raceNumber === selectedRaceNumber)
    );
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

            {/* Filters */}
            <div className="glass p-4 rounded-xl mb-6 flex flex-wrap gap-4 items-center">
              <div>
                <label className="text-white font-medium mr-2">Track:</label>
                <select
                    value={selectedTrack}
                    onChange={e => {
                      setSelectedTrack(e.target.value);
                      setSelectedRaceNumber('All');
                    }}
                    className="rounded px-2 py-1 bg-navy-800 text-white"
                >
                  <option>All Tracks</option>
                  {allTracks.map(track => (
                      <option key={track} value={track}>{track}</option>
                  ))}
                </select>
              </div>

              {selectedTrack !== 'All Tracks' && (
                  <div>
                    <label className="text-white font-medium mr-2">Race #:</label>
                    <select
                        value={selectedRaceNumber}
                        onChange={e =>
                            setSelectedRaceNumber(e.target.value === 'All' ? 'All' : parseInt(e.target.value))
                        }
                        className="rounded px-2 py-1 bg-navy-800 text-white"
                    >
                      <option value="All">All Races</option>
                      {raceNumbersForTrack.map(rn => (
                          <option key={rn} value={rn}>{rn}</option>
                      ))}
                    </select>
                  </div>
              )}
            </div>

            {/* Tips Table */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Racing Tips</h2>
                <p className="text-gray-300 text-sm mt-1">
                  {loading
                      ? 'Loading tips...'
                      : error
                          ? `Error: ${error}`
                          : `${filteredTips.length} tip${filteredTips.length !== 1 ? 's' : ''} shown`}
                </p>
              </div>

              {!loading && !error && (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-navy-800/50">
                          <TableHead className="text-orange-400 font-semibold">Track</TableHead>
                          <TableHead className="text-orange-400 font-semibold">Race #</TableHead>
                          <TableHead className="text-orange-400 font-semibold">Horse #</TableHead>
                          <TableHead className="text-orange-400 font-semibold">Horse Name</TableHead>
                          <TableHead className="text-orange-400 font-semibold">Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTips.map((tip, index) => (
                            <TableRow key={index} className="border-white/10 hover:bg-navy-800/50 transition-colors">
                              <TableCell className="text-white font-medium">{tip.track}</TableCell>
                              <TableCell className="text-gray-300">{tip.raceNumber}</TableCell>
                              <TableCell className="text-gray-300">{tip.horseNumber}</TableCell>
                              <TableCell className="text-gray-300">{tip.horseName}</TableCell>
                              <TableCell className="text-gray-300">{tip.score.toFixed(3)}</TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-8 glass p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">How to Use These Tips</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Stake the highest scored horse for a <strong>place</strong></li>
                <li>• Tips are ranked by confidence score from 0 to 1</li>
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
