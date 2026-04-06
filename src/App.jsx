import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Captcha from './components/Captcha';
import AwSnap from './components/AwSnap';

function App() {
  const [phase, setPhase] = useState(1);
  const [climaxStarted, setClimaxStarted] = useState(false);
  const [rickrollFinished, setRickrollFinished] = useState(false);
  const audioRef = useRef(null);

  const playFaahSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio blocked', e));
    }
  };

  const startClimax = () => {
    setPhase(4);
    setClimaxStarted(true);
    playFaahSound();

    // Stop the Rickroll after ~8.5 seconds (allowing for iframe load time)
    setTimeout(() => {
      setRickrollFinished(true);
    }, 8500);
  };

  const restartPortal = () => {
    setPhase(1);
    setClimaxStarted(false);
    setRickrollFinished(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#09090b] font-sans flex items-center justify-center relative overflow-hidden">

      {/* Ambient background applied only to Phase 1 & 2 */}
      {phase < 3 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/30 blur-[120px]"
          />
          <motion.div
            animate={{ y: [0, 40, 0], x: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/30 blur-[100px]"
          />
        </div>
      )}

      {/* Phase 1: Login */}
      {phase === 1 && (
        <div className="z-10 w-full flex justify-center p-4">
          <Login onNext={() => setPhase(2)} />
        </div>
      )}

      {/* Phase 2: Infinite CAPTCHA */}
      {phase === 2 && (
        <div className="z-10 w-full flex flex-col items-center justify-center p-4 text-zinc-100">
          {/* Context box so the captcha feels integrated */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center bg-zinc-900/50 p-6 rounded-xl w-full max-w-md border border-zinc-800 shadow-xl backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-2">Pending Validation</h2>
            <p className="text-zinc-400 text-sm">Please verify you are human to access your dashboard.</p>
          </motion.div>
          <Captcha onNext={() => setPhase(3)} playFaah={playFaahSound} />
        </div>
      )}

      {/* Phase 3: Fake Out Aw Snap */}
      {phase === 3 && (
        <AwSnap onReload={startClimax} />
      )}

      {/* Phase 4: The Climax / Epilogue */}
      {phase === 4 && (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
          {/* Rickroll Iframe */}
          <iframe
            // the iframe scales up slightly to hide borders
            // It gets pointer-events disabled and fades out when transitioning to Jal Lijiye
            className={`w-full h-full absolute inset-0 scale-[1.05] transition-opacity duration-2000 ${rickrollFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            // Youtube appending URL params for autoplay
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&disablekb=1&modestbranding=1"
            title="Rickroll"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Faah Face Overlay Jumpscare (Only during Rickroll) */}
          {!rickrollFinished && (
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: climaxStarted ? 0 : "100vh" }}
              transition={{ duration: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-x-0 bottom-0 top-auto flex items-end justify-center pointer-events-none"
            >
              <motion.img
                src="/faah.png"
                alt=""
                className="w-full max-w-3xl origin-bottom"
                animate={climaxStarted ? {
                  rotate: [0, 0, 0, 90],
                  y: [0, 0, 0, "100vh"],
                  opacity: [1, 1, 1, 0]
                } : {}}
                transition={{ duration: 2, times: [0, 0.4, 0.5, 1], ease: "easeInOut" }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </motion.div>
          )}

          {/* Epilogue: Jal Lijiye Meme + Repo Button */}
          <AnimatePresence>
            {rickrollFinished && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }} // 2 seconds CSS Fade-In
                className="relative z-50 flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl max-w-2xl w-[90%]"
              >
                <div className="relative mb-10 shadow-xl rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                  {/* Amrita Rao 'Jal Lijiye' meme */}
                  <img
                    src="/jal_lijiye.png"
                    alt="Jal Lijiye"
                    className="w-full max-w-lg object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />

                  {/* Hidden invisible button for the water glass 
                       (Position optimized for typical bottom/middle-right of the Jal Lijiye frame) */}
                  <button
                    onClick={playFaahSound}
                    title="Enjoy your drink"
                    className="absolute"
                    style={{
                      top: '60%',
                      left: '10%',
                      width: '30%',
                      height: '40%',
                      cursor: 'pointer',
                      // border: '2px solid red' 
                    }}
                  />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-zinc-100">Prankraft 2026 Completed.</h2>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a
                    href="https://github.com/your-username/Prankraft" // Update with your actual repo
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium border border-zinc-700"
                  >
                    <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                    GitHub Repo
                  </a>
                  <button
                    onClick={restartPortal}
                    className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium shadow-lg shadow-blue-900/30"
                  >
                    Restart Portal
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Audio Element loaded in DOM so it plays instantly */}
      <audio ref={audioRef} src="/faah.mp3" preload="auto" />
    </div>
  );
}

export default App;
