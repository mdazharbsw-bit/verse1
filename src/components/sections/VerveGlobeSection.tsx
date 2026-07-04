'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

interface EventSlide {
  id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

const EVENTS: EventSlide[] = [
  {
    id: 'cla-launch',
    num: '01',
    category: '25–26 April 2026 • Gurugram',
    title: 'Mercedes-Benz CLA Electric Launch',
    description: 'A masquerade-inspired launch experience celebrating the India debut of the Mercedes-Benz CLA Electric through immersive storytelling, dramatic reveals, and contemporary luxury.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cla-vclass',
    num: '02',
    category: '23–28 February 2026 • Bengaluru',
    title: 'CLA Electric & V-Class Preview',
    description: 'A cinematic media experience bringing together automotive innovation, curated test drives, and the exclusive preview of the new Mercedes-Benz V-Class.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mb-press',
    num: '03',
    category: '14 January 2026 • Pune',
    title: 'Mercedes-Benz Press Conference',
    description: 'An annual media event celebrating 140 years of innovation, featuring strategic announcements, leadership presentations, and the EQS SUV Celebration Edition.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50da2fd4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'uni-fair',
    num: '04',
    category: 'May 2026 • Multiple Cities',
    title: 'University Fair & Open House',
    description: 'A nationwide education showcase connecting leading international universities with students, parents, and educators through immersive exhibitions.',
    image: 'https://images.unsplash.com/photo-1523580494112-071d4571596e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bristol-mumbai',
    num: '05',
    category: '24 February 2026 • Mumbai',
    title: 'Bristol Mumbai Celebration',
    description: 'An elegant celebration marking the announcement of the University of Bristol\'s Mumbai Enterprise Campus, highlighting global collaboration.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'asu-gsv',
    num: '06',
    category: '3–5 February 2025 • Gurgaon',
    title: 'ASU + GSV & Emeritus Summit',
    description: 'A premier education and technology summit bringing together global leaders, innovators, and educators for insightful discussions and networking.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mumbai-rising',
    num: '07',
    category: '14 June 2025 • Mumbai',
    title: 'Mumbai Rising – LOI Signing',
    description: 'A landmark ceremony celebrating the arrival of globally renowned universities in India through an event designed to reflect innovation and excellence.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mg-launch',
    num: '08',
    category: '5 July 2025 • Bengaluru',
    title: 'MG Group Launch',
    description: 'A spectacular commercial vehicle launch featuring a purpose-built German hangar, immersive brand storytelling, and corporate identity unveiling.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mb-sales',
    num: '09',
    category: '6–8 August 2025 • Bengaluru',
    title: 'MB Sales & Marketing Conference',
    description: 'A three-day leadership conference focused on innovation, future mobility, and empowering franchise partners through technology and collaboration.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mb-investor',
    num: '10',
    category: '15 January 2025 • Gurugram',
    title: 'Mercedes-Benz Investor Meet',
    description: 'An exclusive annual gathering of investors, dealer principals, and leadership featuring keynote sessions and distinguished guest speakers.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kohler-konnect',
    num: '11',
    category: '14 February 2025 • Gurugram',
    title: 'Kohler Annual Day – Konnect',
    description: 'A vibrant employee celebration featuring awards, entertainment, live performances, and an unforgettable closing act by percussionist Sivamani.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bmw-delhi',
    num: '12',
    category: '15–16 November 2024 • New Delhi',
    title: 'BMW Excellence Club – Delhi',
    description: 'An invitation-only luxury experience combining fine craftsmanship, hospitality, and a Michelin-star culinary journey for distinguished customers.',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bmw-mumbai',
    num: '13',
    category: '30 Nov–1 Dec 2024 • Mumbai',
    title: 'BMW Excellence Club – Mumbai',
    description: 'A refined celebration of luxury, performance, and gastronomy featuring bespoke experiences and an exclusive seven-course dining experience.',
    image: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mb-silver',
    num: '14',
    category: '15–16 February 2025 • Hyderabad',
    title: 'Luxe Soirée – Silver Star',
    description: 'An exclusive customer experience featuring the unveiling of the G 580, luxury hospitality, convoy drives, and curated heritage experiences.',
    image: 'https://images.unsplash.com/photo-1611016186353-9af24d360030?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mb-sundaram',
    num: '15',
    category: '7–8 March 2025 • Coorg',
    title: 'Luxe Soirée – Sundaram Motors',
    description: 'A bespoke luxury journey featuring a women-led convoy, scenic aerial experiences, G-Wagon adventures, and premium hospitality in Coorg.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mb-mahavir',
    num: '16',
    category: '3–5 April 2025 • Tadoba',
    title: 'Luxe Soirée – Mahavir Motors',
    description: 'An extraordinary customer immersion blending luxury convoy drives, wildlife adventures, gourmet dining, and live entertainment in nature.',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'indian-racing',
    num: '17',
    category: 'Season 3 & 4 • Multiple Circuits',
    title: 'Indian Racing Festival',
    description: 'India\'s premier franchise-based motorsport championship featuring world-class racing, street circuits, and unforgettable fan experiences.',
    image: 'https://images.unsplash.com/photo-1515266591878-f93e32bc5937?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'rr-ipl',
    num: '18',
    category: 'Cricket • IPL 2026',
    title: 'Rajasthan Royals – IPL 2026',
    description: 'Creative and commercial partnership supporting one of the IPL\'s leading franchises through strategic brand experiences and fan engagement.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'creta-ev',
    num: '19',
    category: 'Feb–Mar 2025 • 17 Cities',
    title: 'Hyundai Creta EV Activations',
    description: 'A nationwide activation campaign introducing the Hyundai Creta Electric through immersive mall experiences that maximized brand visibility.',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'chess-league',
    num: '20',
    category: '3–12 October 2024 • London',
    title: 'Global Chess League',
    description: 'The world\'s largest franchise chess league, delivering global sponsorship activation and premium event experiences for international chess.',
    image: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1200&q=80',
  }
];

export default function VerveGlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = windowSize.height;

      // Calculate scroll progress from 0 to 1 inside the 500vh container
      const totalScrollable = rect.height - windowHeight;
      const currentScroll = -rect.top;

      if (currentScroll >= 0 && currentScroll <= totalScrollable) {
        setScrollProgress(currentScroll / totalScrollable);
      } else if (currentScroll < 0) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [windowSize.height]);

  // Split the projects: first 5 go to horizontal slider, the rest to the static list below.
  const sliderEvents = EVENTS.slice(0, 5);
  const listEvents = EVENTS.slice(5);

  // Interpolations for Phase 1 (Zooming sequence happens from 0 to 0.1 progress)
  const ZOOM_THRESHOLD = 0.1;
  const globeOpacity = Math.max(0, 1 - scrollProgress * (1 / ZOOM_THRESHOLD)); 
  const globeScale = 1 - scrollProgress * 0.5;
  
  // Floating Photos initial layouts and exit translations (scattering outwards)
  const floatingPhotos = [
    { id: 'p2', x: '8%', y: '15%', w: 140, h: 185, tx: -200, ty: -150, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80' },
    { id: 'p3', x: '82%', y: '15%', w: 150, h: 200, tx: 220, ty: -120, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80' },
    { id: 'p4', x: '6%', y: '65%', w: 130, h: 170, tx: -220, ty: 150, src: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80' },
    { id: 'p5', x: '84%', y: '65%', w: 145, h: 195, tx: 240, ty: 180, src: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=400&q=80' },
  ];

  const scatterProgress = Math.min(1, scrollProgress / ZOOM_THRESHOLD); 
  const scatterOpacity = 1 - scatterProgress;

  // Zooming Photo 1 
  // Segment 1: Move to center (Progress 0 -> 0.05)
  // Segment 2: Expand to fullscreen (Progress 0.05 -> 0.1)
  let zoomLeft = '44%';
  let zoomTop = '4%';
  let zoomWidth = '180px';
  let zoomHeight = '240px';
  let zoomRadius = '16px';

  if (scrollProgress < 0.05) {
    const p = scrollProgress / 0.05; 
    zoomLeft = '44%';
    zoomTop = `calc(4% + ${p} * (50vh - 120px - 4%))`;
    zoomWidth = '180px';
    zoomHeight = '240px';
    zoomRadius = '16px';
  } else if (scrollProgress >= 0.05 && scrollProgress <= 0.1) {
    const p = (scrollProgress - 0.05) / 0.05; 
    zoomLeft = `${(1 - p) * 44}%`;
    zoomTop = `calc((1 - ${p}) * (50vh - 120px) + ${p} * 0px)`;
    zoomWidth = p === 1 ? '100%' : `calc(180px + ${p} * (100vw - 180px))`;
    zoomHeight = p === 1 ? '100%' : `calc(240px + ${p} * (100vh - 240px))`;
    zoomRadius = `${16 * (1 - p)}px`;
  } else {
    zoomLeft = '0%';
    zoomTop = '0%';
    zoomWidth = '100%';
    zoomHeight = '100%';
    zoomRadius = '0px';
  }

  // Horizontal scroll interpolation (starts at 0.1 progress, ends at 1.0)
  const horizontalProgress = Math.max(0, (scrollProgress - ZOOM_THRESHOLD) / (1 - ZOOM_THRESHOLD));
  const translateX = -horizontalProgress * ((sliderEvents.length - 1) * 100); 

  return (
    <>
      <div ref={containerRef} className="relative h-[500vh] bg-black">
        
        {/* Dynamic CSS animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin-globe {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-ring {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.02); }
            100% { transform: rotate(360deg) scale(1); }
          }
          @keyframes spin-ring-reverse {
            0% { transform: rotate(360deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.05); }
            100% { transform: rotate(0deg) scale(1); }
          }
          @keyframes scale-globe-y {
            0% { transform: scaleX(1); }
            50% { transform: scaleX(-1); }
            100% { transform: scaleX(1); }
          }
          .globe-spin {
            animation: spin-globe 60s linear infinite;
          }
          .globe-y-1 {
            animation: scale-globe-y 12s linear infinite;
            transform-origin: 200px 200px;
          }
          .globe-y-2 {
            animation: scale-globe-y 18s linear infinite;
            transform-origin: 200px 200px;
          }
          .globe-y-3 {
            animation: scale-globe-y 8s linear infinite;
            transform-origin: 200px 200px;
          }
          .ring-spin {
            animation: spin-ring 35s linear infinite;
            transform-origin: 200px 200px;
          }
          .ring-spin-reverse {
            animation: spin-ring-reverse 25s linear infinite;
            transform-origin: 200px 200px;
          }
        `}} />

        {/* Sticky Viewport Container */}
        <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
          
          {/* ── PHASE 1: Globe & scattered elements ── */}
          {scrollProgress < ZOOM_THRESHOLD && (
            <div 
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
              style={{ opacity: globeOpacity, transform: `scale(${globeScale})` }}
            >
              {/* Subtle Monochrome Smart Globe */}
              <div className="relative transform rotate-[-15deg] transition-all duration-300">
                <svg
                  viewBox="-50 -50 500 500"
                  className="w-[320px] h-[320px] md:w-[500px] md:h-[500px]"
                  fill="none"
                  strokeWidth="1"
                >
                  <circle cx="200" cy="200" r="160" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                  
                  <ellipse cx="200" cy="200" rx="120" ry="160" stroke="rgba(255,255,255,0.15)" className="globe-y-1" />
                  <ellipse cx="200" cy="200" rx="65" ry="160" stroke="rgba(255,255,255,0.15)" className="globe-y-2" />
                  <ellipse cx="200" cy="200" rx="15" ry="160" stroke="rgba(255,255,255,0.15)" className="globe-y-3" />
                  
                  <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <ellipse cx="200" cy="200" rx="155" ry="50" stroke="rgba(255,255,255,0.15)" />
                  <ellipse cx="200" cy="200" rx="140" ry="95" stroke="rgba(255,255,255,0.15)" />
                  <ellipse cx="200" cy="200" rx="100" ry="135" stroke="rgba(255,255,255,0.15)" />
                  
                  <ellipse cx="200" cy="200" rx="230" ry="50" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4 6" className="ring-spin" />
                  <ellipse cx="200" cy="200" rx="190" ry="40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeDasharray="2 4" className="ring-spin-reverse" />

                  <circle cx="200" cy="40" r="3" fill="rgba(255,255,255,0.8)" className="animate-pulse" />
                  <circle cx="200" cy="360" r="3" fill="rgba(255,255,255,0.8)" className="animate-pulse" />
                  <circle cx="40" cy="200" r="2.5" fill="rgba(255,255,255,0.6)" className="animate-pulse" />
                  <circle cx="360" cy="200" r="2.5" fill="rgba(255,255,255,0.6)" className="animate-pulse" />
                  <circle cx="200" cy="200" r="3.5" fill="rgba(255,255,255,1)" className="animate-pulse" />
                </svg>
              </div>

              {/* Globe Superimposed Tagline */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <h2 className="text-display-sm md:text-display-md text-primary font-bold uppercase tracking-[-0.02em] max-w-2xl leading-none">
                  VERVE.
                  <br />
                  IT&rsquo;S IN EVERYTHING
                  <br />
                  WE DO.
                </h2>
              </div>
            </div>
          )}

          {/* Scattered Background Photos (Phase 1 Only) */}
          {scrollProgress < ZOOM_THRESHOLD && (
            <div className="absolute inset-0 pointer-events-none z-10" style={{ opacity: scatterOpacity }}>
              {floatingPhotos.map((photo) => {
                const xOffset = photo.tx * scatterProgress;
                const yOffset = photo.ty * scatterProgress;
                return (
                  <div
                    key={photo.id}
                    className="absolute rounded-[16px] overflow-hidden bg-neutral-900 border border-white/10 shadow-lg"
                    style={{
                      left: photo.x,
                      top: photo.y,
                      width: `${photo.w}px`,
                      height: `${photo.h}px`,
                      transform: `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${1 - scatterProgress * 0.15})`,
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt="Event gallery item"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── PHASE 2: Fullscreen Zoom & Horizontal Slider Container ── */}
          <div 
            className="absolute inset-0 flex items-center"
            style={{
              width: `${sliderEvents.length * 100}vw`,
              transform: `translate3d(${translateX}vw, 0, 0)`,
              willChange: 'transform',
            }}
          >
            {sliderEvents.map((event, index) => {
              // First slide handles the zoom morphing animation
              if (index === 0) {
                return (
                  <div key={event.id} className="relative w-screen h-screen flex-shrink-0 bg-black">
                    <div
                      className="absolute overflow-hidden bg-neutral-900 shadow-2xl"
                      style={{
                        left: zoomLeft,
                        top: zoomTop,
                        width: zoomWidth,
                        height: zoomHeight,
                        borderRadius: zoomRadius,
                        zIndex: 20,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                      />

                      {/* Slide Details (Fade in when zoom is complete) */}
                      {scrollProgress >= 0.08 && (
                        <div 
                          className="absolute inset-0 z-20 flex items-center transition-opacity duration-500"
                          style={{ opacity: Math.min(1, (scrollProgress - 0.08) / 0.02) }}
                        >
                          <div className="container-verve">
                            <div className="max-w-3xl text-left">
                              <span className="font-display text-[12px] font-semibold text-secondary tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                                {event.num} // {event.category}
                              </span>
                              <h3 className="text-display-md text-primary font-bold uppercase mt-6 leading-tight">
                                {event.title}
                              </h3>
                              <p className="text-body-lg text-secondary mt-6 leading-relaxed">
                                {event.description}
                              </p>
                              
                              <div className="mt-10 flex items-center gap-4 text-white/50 text-xs tracking-wider uppercase font-semibold">
                                <span>Scroll horizontally to view more campaigns</span>
                                <ArrowRight size={14} className="animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Standard layout for slides 2-5
              return (
                <div key={event.id} className="relative w-screen h-screen flex-shrink-0 bg-black flex items-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="container-verve relative z-20">
                    <div className="max-w-3xl text-left">
                      <span className="font-display text-[12px] font-semibold text-secondary tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                        {event.num} // {event.category}
                      </span>
                      <h3 className="text-display-md text-primary font-bold uppercase mt-6 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-body-lg text-secondary mt-6 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── PHASE 3: Standard Flow List for Remaining 15 Projects ── */}
      <div className="relative bg-black border-t border-white/10 z-30" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="container-verve">
          
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-display-sm text-primary font-bold uppercase tracking-[-0.02em]"
              style={{ marginBottom: '6rem' }}
            >
              More Campaigns
            </h2>

            <div className="flex flex-col border-t border-white/10">
              {listEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="group flex flex-col md:flex-row md:items-start justify-between py-8 md:py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors -mx-6 px-6 md:-mx-8 md:px-8 cursor-pointer rounded-xl"
                    data-cursor="view"
                  >
                    <div className="md:w-1/3 mb-4 md:mb-0 pr-8 md:sticky md:top-[120px]">
                      <div className="text-secondary text-xs font-semibold tracking-widest uppercase mb-1">
                        {event.num}
                      </div>
                      <div className="text-white/40 text-sm tracking-wider uppercase font-medium">
                        {event.category}
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <h4 className="text-2xl md:text-3xl font-bold uppercase tracking-[-0.01em] transition-colors text-white/70 group-hover:text-white">
                        {event.title}
                      </h4>
                      
                      {/* Expandable Image & Description on Hover */}
                      <div 
                        className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out mt-0 group-hover:mt-8"
                      >
                        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                          <p className="text-secondary text-base leading-relaxed max-w-2xl mb-8">
                            {event.description}
                          </p>
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 66vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            <div className="flex justify-center" style={{ marginTop: '8rem', paddingBottom: '2rem' }}>
              <MagneticButton
                variant="primary"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                ariaLabel="Contact Vervexp"
              >
                Start Your Project
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
