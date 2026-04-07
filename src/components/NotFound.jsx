import React from 'react';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
      <img
        src="/confused_nick.jpg"
        alt="Confused Nick Young"
        className="w-full max-w-2xl rounded-lg shadow-2xl mb-8 object-cover opacity-80"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <h1 className="text-4xl sm:text-6xl font-bold text-zinc-200 tracking-tight mb-4">404</h1>
      <p className="text-xl text-zinc-400 max-w-md">
        Really huh? ulup indo?
      </p>
      <a
        href="/"
        className="mt-8 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium border border-zinc-700"
      >
        Go Back Home
      </a>
    </div>
  );
}
