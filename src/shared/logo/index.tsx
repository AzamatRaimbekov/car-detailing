import React from "react";

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-amber-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative px-4 py-1 bg-black ring-1 ring-amber-500/50 rounded-md flex flex-col items-center justify-center">
          <div className="text-2xl font-black tracking-wider font-display bg-clip-text text-transparent bg-gradient-to-b from-yellow-300 via-amber-500 to-amber-700 drop-shadow-sm">
            SHINE PORT
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-1"></div>
        </div>
      </div>
    </div>
  );
};
