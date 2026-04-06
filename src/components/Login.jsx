import { useState, useEffect } from 'react';

// Make sure `blink_open.png` and `blink_closed.png` are exactly named as such in the `public` folder.
export default function Login({ onNext }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);
  const [impatienceLevel, setImpatienceLevel] = useState(0);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Trigger a fast blink
  const triggerBlink = () => {
    if (isPasswordFocused) return; // Don't trigger normal blink if keeping eyes closed
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 150);
  };

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    
    // Check if user is deleting characters
    if (val.length < username.length) {
      setImpatienceLevel(prev => Math.min(prev + 1, 6)); // Max impatience is 6
    } else {
      // Return to calm slowly when typing forward
      setImpatienceLevel(prev => Math.max(0, prev - 1));
    }
    
    setUsername(val);
  };

  // Effect 1: Blink when the user stops typing for 2 seconds (shortened if impatient)
  useEffect(() => {
    if (isPasswordFocused) return;
    const baseDelay = Math.max(400, 2000 - (impatienceLevel * 300));
    
    const timeout = setTimeout(() => {
      triggerBlink();
    }, baseDelay);
    
    return () => clearTimeout(timeout);
  }, [username, impatienceLevel, isPasswordFocused]);

  // Effect 2: If the user is highly impatient, blink periodically anyway!
  useEffect(() => {
    if (impatienceLevel > 0 && !isPasswordFocused) {
      const intervalDelay = Math.max(300, 1500 - (impatienceLevel * 200));
      const interval = setInterval(() => {
        triggerBlink();
      }, intervalDelay);
      
      return () => clearInterval(interval);
    }
  }, [impatienceLevel, isPasswordFocused]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length > 0) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col transform transition-all">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-2">nand_gate ✨</h1>
        <p className="text-sm text-zinc-400">Enter your credentials to manage your dashboard</p>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 relative h-40">
        {/* Profile/Avatar Side-car that blinks judmentally */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-800 relative bg-zinc-800 shadow-inner">
          <img 
            src={(isBlinking || isPasswordFocused) ? "/blink_closed.png" : "/blink_open.png"} 
            alt="Security Avatar"
            className="w-full h-full object-cover object-[center_35%]"
            onError={(e) => {
              // Fallback placeholder if image is missing so the app doesn't break
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-4xl">😐</div>';
            }}
          />
        </div>
        {impatienceLevel > 2 && (
          <span className="absolute -right-2 top-0 text-sm animate-pulse">💢</span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all"
            placeholder="admin"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="off"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 mt-4 bg-white hover:bg-zinc-200 text-zinc-900 font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
