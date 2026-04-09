import React from 'react';

export default function AnnouncementBar() {
  const announcement = "Limited Stock Available, Grab Now!";
  
  return (
    <div className="fixed top-0 left-0 w-full h-9 bg-black text-white z-[60] overflow-hidden flex items-center border-b border-white/5">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {/* Repeat the text multiple times for a seamless loop */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              {announcement}
            </span>
            <span className="text-gold-500 opacity-50">•</span>
          </div>
        ))}
        {/* Duplicate the set for the animation overlap */}
        {[...Array(12)].map((_, i) => (
          <div key={`dup-${i}`} className="flex items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] px-8">
              {announcement}
            </span>
            <span className="text-gold-500 opacity-50">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
