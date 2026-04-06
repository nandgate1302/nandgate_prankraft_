import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 4.png, 6.png, and 8.png are the "Swayam Kandethiya" (Invented) Rasas.
// The rest are standard Navarasas.
const INVENTED_RASAS = [4, 6, 8];

export default function Captcha({ onNext, playFaah }) {
  const [captchaState, setCaptchaState] = useState('normal'); // 'normal', 'overqualified'
  const [selectedSquares, setSelectedSquares] = useState(new Set());
  
  // Scramble the display order so they aren't always 1, 2, 3 at the top
  const [gridOrder, setGridOrder] = useState([]);

  useEffect(() => {
    // Generate a random order for the 9 images on load
    const images = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    setGridOrder(images.sort(() => Math.random() - 0.5));
  }, []);

  const toggleSquare = (imageId) => {
    if (captchaState !== 'normal') return;

    const newSet = new Set(selectedSquares);
    if (newSet.has(imageId)) {
      newSet.delete(imageId);
    } else {
      newSet.add(imageId);
      
      // The "Faah!" Trigger: If they click a standard Navarasa, jumpscare sound!
      if (!INVENTED_RASAS.includes(imageId)) {
        playFaah();
      }
    }
    setSelectedSquares(newSet);
  };

  const handleVerify = () => {
    if (captchaState !== 'normal') return;

    // Check if exactly the 3 invented rasas are selected
    const isCorrect = 
      selectedSquares.size === INVENTED_RASAS.length && 
      INVENTED_RASAS.every(id => selectedSquares.has(id));

    if (isCorrect) {
      // The "Success" Deception
      setCaptchaState('overqualified');
      // Reset the puzzle after 4 seconds to force them into a loop
      setTimeout(() => {
        setCaptchaState('normal');
        setSelectedSquares(new Set());
        setGridOrder([...gridOrder].sort(() => Math.random() - 0.5)); // rescramble
      }, 4000);
    } else {
      // If they get it wrong (or give up and hit verify with standard rasas), we crash the app!
      onNext();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-2 rounded border border-zinc-300 shadow-2xl flex flex-col items-center select-none w-full max-w-[420px]"
    >
      {/* CAPTCHA Header */}
      <div className="bg-[#4A90E2] w-full p-4 text-white text-left shadow flex flex-col mb-1 min-h-[120px] justify-center">
        <span className="text-sm font-medium">Select all squares featuring Jagathy's</span>
        <span className="text-xl sm:text-2xl font-bold tracking-tight mt-1 mb-1 leading-snug">
          'Swayam Kandethiya'<br/>
          <span className="text-lg sm:text-xl font-medium text-blue-100">(Self-Discovered) Rasas</span>
        </span>
      </div>

      {/* Grid Area - Touch friendly, responsive aspect ratio */}
      <div className="w-full aspect-square p-2 bg-white relative">
        <AnimatePresence>
          {captchaState === 'overqualified' ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center p-6 text-center"
            >
              <img src="/blink_open.png" alt="Judging you" className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-zinc-200" />
              <h3 className="text-xl font-bold text-zinc-800 mb-2">Overqualified.</h3>
              <p className="text-zinc-600">Please try again with less ego.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-3 gap-1 w-full h-full">
              {gridOrder.map((imageId) => {
                const isSelected = selectedSquares.has(imageId);
                
                return (
                  <div 
                    key={imageId}
                    onClick={() => toggleSquare(imageId)}
                    className="relative cursor-pointer w-full h-full bg-zinc-100 overflow-hidden touch-manipulation"
                  >
                    {/* The Image */}
                    <div 
                      className={`w-full h-full bg-cover bg-center transition-transform duration-200 ${isSelected ? 'scale-75' : 'scale-100'}`}
                      style={{ backgroundImage: `url(/${imageId}.png)` }}
                    />
                    
                    {/* Selection Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/20 border-[3px] border-blue-500 pointer-events-none flex items-start justify-start p-1 sm:p-2">
                        <div className="bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Verification Footer */}
      <div className="w-full flex justify-between items-center px-4 py-3 mt-2 border-t border-zinc-200 text-zinc-500">
        <div className="flex gap-4 text-2xl">
          <button title="Refresh" className="hover:text-zinc-800 transition-colors">↻</button>
          <button title="Audio" className="hover:text-zinc-800 transition-colors">🎧</button>
          <button title="Info" className="hover:text-zinc-800 transition-colors">ℹ️</button>
        </div>
        <button 
          onClick={handleVerify}
          className="bg-[#4A90E2] hover:bg-[#357ABD] text-white px-8 py-3 uppercase text-sm font-bold rounded shadow transition-colors touch-manipulation"
        >
          Verify
        </button>
      </div>
    </motion.div>
  );
}
