import React, { useState, useEffect } from 'react';
import { Heart, X, Mic, Sparkles } from 'lucide-react';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    fetch(`${API_URL}/api/discover`)
      .then(res => res.json())
      .then(data => setProfiles(data.profiles))
      .catch(err => console.error("API Error:", err));
  }, [API_URL]);

  const handleSwipe = () => setProfiles(prev => prev.slice(1));

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-sans">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-gray-950 md:rounded-[40px] border-gray-800 md:border-[8px] flex flex-col relative overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-gray-900 to-transparent flex justify-between z-10">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">AuraMatch.</h1>
        </div>

        {/* Swipe Area */}
        <div className="flex-grow flex items-center justify-center p-4 relative">
          {profiles.length > 0 ? (
            <div className="absolute w-full max-w-[360px] h-[500px] rounded-3xl overflow-hidden bg-gray-800 shadow-2xl border border-gray-700">
              <img src={profiles[0].image} className="w-full h-full object-cover" alt="Profile" />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 pt-20 p-6">
                <h2 className="text-3xl font-bold">{profiles[0].name}, {profiles[0].age}</h2>
                <p className="text-sm text-gray-300 mt-2">{profiles[0].bio}</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center">No more profiles!</div>
          )}
        </div>

        {/* Swipe Buttons */}
        {profiles.length > 0 && (
          <div className="flex justify-center gap-6 pb-6 z-10">
            <button onClick={handleSwipe} className="w-16 h-16 rounded-full bg-gray-800 flex justify-center items-center text-red-500 shadow-lg hover:scale-105 transition-transform"><X size={32}/></button>
            <button onClick={handleSwipe} className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex justify-center items-center shadow-lg hover:scale-105 transition-transform"><Heart size={32}/></button>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="bg-gray-900 border-t border-gray-800 p-4 flex justify-around items-center z-10">
          <button className="text-pink-500 flex flex-col items-center"><Sparkles size={24}/><span className="text-[10px] mt-1">Swipe</span></button>
          <button className="bg-gray-800 w-16 h-16 rounded-full flex justify-center items-center -mt-10 border-4 border-gray-900 text-pink-500 shadow-xl"><Mic size={30}/></button>
          <button className="text-gray-500 flex flex-col items-center"><Heart size={24}/><span className="text-[10px] mt-1">Matches</span></button>
        </div>

      </div>
    </div>
  );
}