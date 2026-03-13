"use client";

import React from "react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
        {/* Pulsing Outer Ring */}
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-primary/20 duration-[2000ms]"></div>
        
        {/* Spinning Rings */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-primary/30"></div>
          
          {/* Inner Heart/Plus Icon or Brand Specific Element (Using a simple medical plus for now) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 text-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <span className="text-display text-lg font-bold tracking-tight text-primary">
            Siraa <span className="text-secondary">Health</span>
          </span>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
