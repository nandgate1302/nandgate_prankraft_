export default function AwSnap({ onReload }) {
  return (
    <div className="fixed inset-0 bg-[#202124] text-[#E8EAED] flex flex-col font-sans z-[100]">
      {/* Fake Browser Top Bar (optional for extra realism if they are in full screen, but usually not needed) */}
      <div className="flex-grow flex flex-col items-center pt-[15vh]">
        <div className="max-w-[600px] w-full px-8 flex flex-col items-start text-left">
          {/* Sad Folder Icon built with pure CSS/SVG */}
          <svg className="w-16 h-16 text-[#9AA0A6] mb-8" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" display="none"/>
             <path fillRule="evenodd" d="M19.5 3h-15C3.12 3 2 4.12 2 5.5v13C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-13C22 4.12 20.88 3 19.5 3zM4.5 5h5.83l2 2h7.17v1.5H4.5V5zm15 13.5h-15v-9h15v9z"/>
             {/* Sad face eyes/mouth */}
             <circle cx="9" cy="13" r="1.5" fill="#202124"/>
             <circle cx="15" cy="13" r="1.5" fill="#202124"/>
             <path d="M9 17.5c1-1 2-1.5 3-1.5s2 .5 3 1.5" stroke="#202124" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>

          <h1 className="text-[28px] font-normal mb-4">Aw, Snap!</h1>
          
          <p className="text-[15px] mb-8 leading-snug">
            Something went wrong while displaying this webpage.
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onReload}
              className="bg-[#8AB4F8] text-[#202124] hover:bg-[#AECBFA] hover:shadow-sm px-6 py-2 rounded text-[13px] font-medium transition-colors"
            >
              Reload
            </button>
          </div>
          
          <div className="mt-8 text-[#9AA0A6] text-[13px]">
            Error code: RESULT_CODE_HUNG
          </div>
        </div>
      </div>
    </div>
  );
}
