import React, { useState, useEffect } from 'react';
import { Heart, X, Mic, Sparkles, ShieldCheck } from 'lucide-react';

const FALLBACK_PROFILES = [
  { id: 1, name: 'Ananya', age: 24, bio: 'Coffee, code, and good vibes.', image: 'https://images.unsplash.com/photo-1615243306649-06b20677a28f?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 2, name: 'Riya', age: 26, bio: 'Frontend engineer & tech explorer.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 3, name: 'Priya', age: 25, bio: 'Design systems & UI enthusiast.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=500' }
];

export default function App() {
  const [profiles, setProfiles] = useState(FALLBACK_PROFILES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${API_URL}/api/discover`)
      .then(res => res.json())
      .then(data => {
        if (data && data.profiles && data.profiles.length > 0) {
          setProfiles(data.profiles);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Using fallback profiles due to network:", err);
        setLoading(false);
      });
  }, []);

  const handleSwipe = () => {
    setProfiles(prev => prev.slice(1));
  };

  const resetProfiles = () => {
    setProfiles(FALLBACK_PROFILES);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white font-sans selection:bg-pink-500 selection:text-white">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-gray-900 md:rounded-[40px] border-gray-800 md:border-[8px] flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">AuraMatch</h1>
            <span className="bg-pink-500/10 text-pink-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-pink-500/20 flex items-center gap-1">
              <ShieldCheck size={10} /> Pro
            </span>
          </div>
        </div>

        {/* Swipe Area */}
        <div className="flex-grow flex items-center justify-center p-4 relative">
          {profiles.length > 0 ? (
            <div className="absolute w-full max-w-[360px] h-[500px] rounded-3xl overflow-hidden bg-gray-800 shadow-2xl border border-gray-700/60 transition-all duration-300 transform">
              <img src={profiles[0].image} className="w-full h-full object-cover" alt="Profile" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
              <div className="absolute bottom-0 w-full p-6 z-10">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-bold tracking-tight">{profiles[0].name}</h2>
                  <span className="text-2xl font-light text-gray-300">{profiles[0].age}</span>
                </div>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2 leading-relaxed">{profiles[0].bio}</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800 max-w-[300px]">
              <p className="text-gray-400 font-medium mb-4">You've explored all profiles!</p>
              <button onClick={resetProfiles} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity">
                Reload Profiles
              </button>
            </div>
          )}
        </div>

        {/* Swipe Buttons */}
        {profiles.length > 0 && (
          <div className="flex justify-center gap-6 pb-6 z-10">
            <button onClick={handleSwipe} className="w-16 h-16 rounded-full bg-gray-800/90 hover:bg-gray-800 border border-gray-700 flex justify-center items-center text-red-400 shadow-lg hover:scale-105 active:scale-95 transition-all">
              <X size={30} strokeWidth={2.5} />
            </button>
            <button onClick={handleSwipe} className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex justify-center items-center text-white shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all">
              <Heart size={30} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 flex justify-around items-center z-10">
          <button className="text-pink-500 flex flex-col items-center gap-1">
            <Sparkles size={22} /><span className="text-[10px] font-medium">Discover</span>
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 w-14 h-14 rounded-full flex justify-center items-center -mt-8 border-4 border-gray-900 text-white shadow-xl hover:scale-105 transition-all">
            <Mic size={24} />
          </button>
          <button className="text-gray-500 hover:text-gray-300 flex flex-col items-center gap-1 transition-colors">
            <Heart size={22} /><span className="text-[10px] font-medium">Matches</span>
          </button>
        </div>

      </div>
    </div>
  );
}