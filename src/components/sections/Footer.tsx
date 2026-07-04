'use client';

import { ArrowUp, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-8 relative overflow-hidden">
      <div className="container-verve relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Left Column: Compact CTA */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold uppercase tracking-[-0.03em] leading-[0.95] mb-8">
              Let&apos;s Build <br />
              <span className="text-white/30">Something</span> <br />
              Extraordinary.
            </h2>
            
            <a 
              href="mailto:hello@verve.agency" 
              className="group inline-flex items-center gap-4 text-xl md:text-2xl lg:text-[28px] font-display font-semibold text-primary transition-colors"
              data-cursor="pointer"
            >
              <span className="relative pb-1">
                hello@verve.agency
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
              </div>
            </a>
          </div>
          
          {/* Right Column: Contact Details */}
          <div className="lg:col-span-6 flex flex-col pt-2 lg:pt-0">
            
            {/* Get in Touch */}
            <div className="flex flex-col gap-1 pb-6">
              <h3 className="text-2xl font-semibold text-white mb-1">
                Get in Touch
              </h3>
              <a 
                href="mailto:hello@verve.agency"
                className="text-base text-white/70 hover:text-white transition-colors w-max"
                data-cursor="pointer"
              >
                hello@verve.agency
              </a>
              <span className="text-base text-white/70">
                +91 22 1234 5678
              </span>
            </div>

            <div className="border-t border-white/10 w-full mb-6" />

            {/* Visit Us */}
            <div className="flex flex-col gap-1 pb-6">
              <h3 className="text-2xl font-semibold text-white mb-1">
                Visit Us
              </h3>
              <address className="text-base text-white/70 not-italic leading-[1.6]">
                WeWork BKC <br />
                Bandra Kurla Complex <br />
                Mumbai, 400051 <br />
                India
              </address>
            </div>
            
            <div className="border-t border-white/10 w-full mb-6" />
            
            {/* Follow Us */}
            <div className="flex flex-col gap-1 pb-2">
              <h3 className="text-2xl font-semibold text-white mb-3">
                Follow Us
              </h3>
              <div className="flex flex-row flex-wrap gap-6">
                {socialLinks.map(social => (
                  <a 
                    key={social.label} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white/70 hover:text-white transition-colors"
                    data-cursor="pointer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Logo Image */}
        <div className="w-full flex justify-center mb-16 pointer-events-none select-none overflow-hidden opacity-30">
          <Image 
            src="/logo.png" 
            alt="Verve Logo" 
            width={400} 
            height={100} 
            className="w-auto h-20 md:h-32 object-contain" 
          />
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm font-medium text-white/40 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} VERVE EXP</p>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          
          <button 
            onClick={scrollToTop} 
            className="group flex items-center gap-3 text-sm font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            data-cursor="pointer"
          >
            <span>Back to Top</span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
        
      </div>
    </footer>
  );
}
