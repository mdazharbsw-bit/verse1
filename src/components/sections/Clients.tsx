'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { clients } from '@/data/clients';

function MarqueeRow({
  items,
  reverse = false,
  speed = "40s"
}: {
  items: typeof clients;
  reverse?: boolean;
  speed?: string;
}) {
  // Quadruple items to ensure seamless looping on ultra-wide screens
  const quadrupled = [...items, ...items, ...items, ...items];

  return (
    <div className="flex w-full overflow-hidden whitespace-nowrap py-4 md:py-6 relative group">
      
      {/* Dynamic Keyframes Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-normal {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}} />
      
      {/* The scrolling track pauses on hover */}
      <div 
        className="flex min-w-full items-center group-hover:[animation-play-state:paused] transition-all duration-300"
        style={{
          animation: `marquee-${reverse ? 'reverse' : 'normal'} ${speed} linear infinite`,
        }}
      >
        {quadrupled.map((client, index) => (
          <span 
            key={`${client.id}-${index}`} 
            className="inline-flex items-center mx-6 md:mx-10 cursor-pointer"
          >
            {/* Outline text that fills on hover */}
            <span
              className="text-5xl md:text-7xl lg:text-[90px] font-display font-bold uppercase tracking-[-0.02em] transition-all duration-300 opacity-40 hover:opacity-100 hover:scale-[1.02]"
              style={{
                WebkitTextStroke: '1.5px rgba(255,255,255,0.4)',
                color: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.WebkitTextStroke = '0px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'transparent';
                e.currentTarget.style.WebkitTextStroke = '1.5px rgba(255,255,255,0.4)';
              }}
            >
              {client.name}
            </span>
            {/* Premium Separator Icon */}
            <span className="text-primary text-2xl md:text-4xl ml-12 md:ml-20 select-none opacity-40" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const sectionRef = useScrollAnimation<HTMLElement>({
    type: 'fadeUp',
    duration: 800,
    distance: 20,
  });

  // Split clients into distinct groups for varied marquee rows
  const row1 = clients.slice(0, 8);
  const row2 = clients.slice(8, 16);

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative bg-black overflow-hidden border-t border-white/10"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="container-verve relative z-10 mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-display-md text-primary font-bold uppercase mt-8 tracking-[-0.02em] leading-tight">
              Trusted By<br />Industry Leaders
            </h2>
          </div>
          
          <p className="text-body-lg text-secondary max-w-md md:text-right">
            We collaborate with the world&apos;s most innovative brands to create experiences that redefine boundaries, captivate audiences, and foster meaningful connections.
          </p>
        </div>
      </div>

      {/* Interactive Marquee Rows */}
      <div className="relative z-10 flex flex-col gap-2 md:gap-4 -rotate-2 scale-[1.02]">
        <MarqueeRow items={row1} speed="45s" />
        <MarqueeRow items={row2} reverse speed="35s" />
        <MarqueeRow items={clients} speed="60s" />
      </div>
      
    </section>
  );
}
