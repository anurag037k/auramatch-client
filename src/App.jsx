import React, { useState, useEffect } from 'react';
import { Heart, X, MessageCircle, User, Star, ShieldCheck } from 'lucide-react';

// Built-in prototype data so the app always looks good, even if the backend is offline
const PROTOTYPE_PROFILES = [
  { id: 1, name: 'Ananya', age: 24, bio: 'Coffee, code, and good vibes. Looking for someone to debug life with.', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800&h=1000' },
  { id: 2, name: 'Riya', age: 26, bio: 'Frontend engineer & tech explorer. Probably thinking about pizza.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&h=1000' },
  { id: 3, name: 'Priya', age: 25, bio: 'Design systems & UI enthusiast. I swipe right for clean architecture.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800&h=1000' }
];

export default function App() {
  const [profiles, setProfiles] = useState(PROTOTYPE_PROFILES);

  // Attempt to fetch from your backend, fallback to prototype data if it fails
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${API_URL}/api/discover`)
      .then(res => res.json())
      .then(data => {
        if (data?.profiles?.length > 0) setProfiles(data.profiles);
      })
      .catch(err => console.log("Using prototype profiles (Backend waking up)"));
  }, []);

  const handleSwipe = () => {
    setProfiles(prev => prev.slice(1));
  };

  const resetPrototype = () => {
    setProfiles(PROTOTYPE_PROFILES);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white font-sans selection:bg-rose-500 selection:text-white">
      {/* Mobile-first App Container */}
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-neutral-900 md:rounded-[40px] border-neutral-800 md:border-[8px] flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Top Navigation Bar */}
        <div className="p-5 bg-neutral-900/80 backdrop-blur-md flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
              AuraMatch
            </h1>
          </div>
          <button className="bg-neutral-800 p-2 rounded-full text-neutral-400 hover:text-white transition-colors">
            <ShieldCheck size={20} />
          </button>
        </div>

        {/* Main Swipe Area */}
        <div className="flex-grow flex items-center justify-center p-4 relative">
          {profiles.length > 0 ? (
            <div className="absolute w-full max-w-[360px] h-[540px] rounded-3xl overflow-hidden bg-neutral-800 shadow-2xl border border-neutral-700/50 group">
              {/* Profile Image */}
              <img src={profiles[0].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Profile" />
              
              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              {/* Profile Info */}
              <div className="absolute bottom-0 w-full p-6 z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <h2 className="text-3xl font-bold tracking-tight text-white">{profiles[0].name}</h2>
                  <span className="text-2xl font-light text-neutral-300">{profiles[0].age}</span>
                </div>
                <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed">{profiles[0].bio}</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-neutral-800/50 rounded-3xl border border-neutral-700 max-w-[300px] backdrop-blur-sm">
              <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-yellow-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
              <p className="text-neutral-400 text-sm mb-6">You've seen all the prototypes in your area.</p>
              <button onClick={resetPrototype} className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-rose-500/20 hover:opacity-90 transition-opacity">
                Reload Prototype
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {profiles.length > 0 && (
          <div className="flex justify-center gap-6 pb-6 z-10 px-6">
            <button onClick={handleSwipe} className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex justify-center items-center text-rose-500 shadow-xl hover:scale-110 hover:bg-neutral-700 active:scale-95 transition-all duration-200">
              <X size={32} strokeWidth={2.5} />
            </button>
            <button onClick={handleSwipe} className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 flex justify-center items-center text-white shadow-xl shadow-rose-500/30 hover:scale-110 active:scale-95 transition-all duration-200">
              <Heart size={32} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Bottom Tab Navigation */}
        <div className="bg-neutral-900 border-t border-neutral-800 p-4 flex justify-between items-center z-10 px-8">
          <button className="text-rose-500 flex flex-col items-center gap-1 transition-colors">
            <User size={24} /><span className="text-[10px] font-medium">Discover</span>
          </button>
          <button className="text-neutral-500 hover:text-neutral-300 flex flex-col items-center gap-1 transition-colors">
            <Star size={24} /><span className="text-[10px] font-medium">Likes</span>
          </button>
          <button className="text-neutral-500 hover:text-neutral-300 flex flex-col items-center gap-1 transition-colors">
            <MessageCircle size={24} /><span className="text-[10px] font-medium">Chats</span>
          </button>
        </div>

      </div>
    </div>
  );
}