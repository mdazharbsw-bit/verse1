'use client';

import Image from 'next/image';
import { leadership } from '@/data/leadership';

export default function Leadership() {
  return (
    <section 
      id="leadership" 
      className="relative bg-black overflow-hidden border-t border-white/10"
      style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
    >
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-verve relative z-10">
        
        {/* Section Heading */}
        <div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          style={{ marginBottom: '5rem' }}
        >
          <div>
            <h2 className="text-display-md text-primary font-bold uppercase mt-8 tracking-[-0.02em] leading-none">
              The People Behind VERVE
            </h2>
          </div>
          <p className="text-body-lg text-secondary max-w-sm">
            Industry veterans with decades of combined experience in experiential marketing, strategy, and creative leadership.
          </p>
        </div>

        {/* Flex-Expanding Accordion Grid */}
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:h-[650px]">
          {leadership.map((member) => (
            <div 
              key={member.id}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-neutral-950 transition-all duration-700 ease-out cursor-pointer flex-1 h-[400px] lg:h-auto lg:hover:flex-[2.2] flex flex-col justify-end"
              data-cursor="view"
            >
              
              {/* Leader Portrait */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-top grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105 opacity-60 lg:opacity-70 group-hover:opacity-40"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none" />

              {/* Info Overlay (Always visible: Name + Position) */}
              <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end w-full">
                
                <span className="text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 block">
                  {member.title}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase text-white tracking-[-0.01em] transition-all duration-300">
                  {member.name}
                </h3>
                
                {/* Dividers */}
                <hr className="border-white/10 my-4 group-hover:border-primary/40 transition-colors duration-500" />
                
                {/* Expanding Professional Background & Bio details */}
                <div 
                  className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out"
                >
                  <div className="overflow-hidden">
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.bio}
                    </p>
                    
                    {/* Professional Background Orgs */}
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {member.previousOrgs.map((org, index) => (
                        <span 
                          key={index}
                          className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.1em] text-white/70 bg-white/10 border border-white/5 px-2.5 py-1 rounded"
                        >
                          {org}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
