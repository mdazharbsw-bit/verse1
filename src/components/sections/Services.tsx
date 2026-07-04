'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ServiceItem {
  num: string;
  title: string;
  description: string;
  image: string;
}

const EVENTS_SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Conferences & Expos',
    description: 'Hosting large-scale gatherings that showcase brands, ideas, and innovations.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50da2fd4?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02',
    title: 'Product Launches',
    description: 'Designing impactful launch experiences that create buzz and memorability.',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e3a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03',
    title: 'Experiential Spaces & Installations',
    description: 'Building physical and phygital environments that immerse audiences in brand stories.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04',
    title: 'Thought Leadership Forums',
    description: 'Curating talks, summits, and panel discussions that drive influence and conversations.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '05',
    title: 'Consumer & Community Engagements',
    description: 'Interactive activations and events that connect brands with people on-ground and online.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
  },
];

const MARKETING_SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Marketing Strategy & Consulting',
    description: 'Crafting data-driven brand strategies, go-to-market roadmaps, and sponsorship solutions that deliver measurable impact.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '02',
    title: 'Content & Creatives',
    description: 'Building powerful narratives through design, video, and storytelling that connect brands with audiences.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '03',
    title: 'Public Relations & Communications',
    description: 'Driving brand reputation with strategic media outreach, thought leadership, and impactful storytelling.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '04',
    title: 'Digital & Social Media Marketing',
    description: 'Engaging communities through tailored digital campaigns, influencer collaborations, and performance-led social content.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    num: '05',
    title: 'Marketing Campaigns & Media Planning',
    description: 'Executing 360° campaigns with smart media planning and integrated outreach across ATL, BTL, and digital.',
    image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Services() {
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(0);
  const [activeMarketingIndex, setActiveMarketingIndex] = useState<number | null>(0);

  // Mouse tracking states for floating image portal
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const portalRef = useRef<HTMLDivElement>(null);

  const headerRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeUp', duration: 900 });
  const contentRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeUp', duration: 1000, delay: 150 });

  // Update mouse position with easing interpolation
  useEffect(() => {
    let reqId: number;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset slightly to center cursor
      const targetX = e.clientX + 25;
      const targetY = e.clientY + 25;

      const updatePosition = () => {
        // Linear interpolation easing (0.1)
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        if (portalRef.current) {
          portalRef.current.style.left = `${currentX}px`;
          portalRef.current.style.top = `${currentY}px`;
        }

        reqId = requestAnimationFrame(updatePosition);
      };

      reqId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <section id="services" className="section-padding bg-background relative z-10">
      
      {/* ── Floating Image Portal (Cursor Follower) ── */}
      <div
        ref={portalRef}
        className={`fixed z-50 pointer-events-none w-[280px] aspect-[4/3] rounded-[20px] overflow-hidden shadow-2xl transition-opacity duration-300 ${
          isHovered && hoverImage ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          position: 'fixed',
          willChange: 'left, top, transform, opacity',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {hoverImage && (
          <Image
            src={hoverImage}
            alt="Service preview"
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="container-verve">
        {/* Header */}
        <div 
          ref={headerRef} 
          className="max-w-3xl"
          style={{ marginBottom: '5rem' }}
        >
          <h2 className="text-display-md text-primary">
            We deliver comprehensive, end-to-end solutions that elevate brand presence.
          </h2>
        </div>

        {/* Split Accordion Layout */}
        <div 
          ref={contentRef} 
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: '5rem' }}
        >
          
          {/* ── Left Column: Events Solutions ── */}
          <div className="flex flex-col">
            <h3 
              className="text-eyebrow text-secondary border-b border-border font-semibold tracking-widest"
              style={{ marginBottom: '2rem', paddingBottom: '1rem' }}
            >
              COMPREHENSIVE EVENTS SOLUTIONS (EXPERIENTIAL)
            </h3>

            <div className="flex flex-col">
              {EVENTS_SERVICES.map((item, index) => {
                const isActive = activeEventIndex === index;
                return (
                  <div
                    key={item.title}
                    className="border-b border-border last:border-0 group cursor-pointer"
                    onMouseEnter={() => {
                      setHoverImage(item.image);
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setActiveEventIndex(isActive ? null : index)}
                  >
                    {/* Header Row */}
                    <div 
                      className="flex justify-between items-center"
                      style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                    >
                      <div className="flex items-center gap-6">
                        <span className="font-display text-[12px] font-semibold text-secondary tracking-widest">
                          {item.num}
                        </span>
                        <h4 className={`text-xl md:text-2xl font-display font-medium transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'
                        }`}>
                          {item.title}
                        </h4>
                      </div>
                      <Plus
                        size={20}
                        className={`text-secondary group-hover:text-primary transition-transform duration-500 ease-out ${
                          isActive ? 'rotate-45 text-primary' : ''
                        }`}
                      />
                    </div>

                    {/* Collapsible Content */}
                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-cubic)] ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}>
                      <div className="overflow-hidden">
                        <p 
                          className="text-body text-secondary leading-relaxed max-w-xl"
                          style={{ paddingLeft: '3rem', paddingBottom: '1.5rem' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Marketing Solutions ── */}
          <div className="flex flex-col">
            <h3 
              className="text-eyebrow text-secondary border-b border-border font-semibold tracking-widest"
              style={{ marginBottom: '2rem', paddingBottom: '1rem' }}
            >
              COMPREHENSIVE MARKETING SOLUTIONS
            </h3>

            <div className="flex flex-col">
              {MARKETING_SERVICES.map((item, index) => {
                const isActive = activeMarketingIndex === index;
                return (
                  <div
                    key={item.title}
                    className="border-b border-border last:border-0 group cursor-pointer"
                    onMouseEnter={() => {
                      setHoverImage(item.image);
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setActiveMarketingIndex(isActive ? null : index)}
                  >
                    {/* Header Row */}
                    <div 
                      className="flex justify-between items-center"
                      style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                    >
                      <div className="flex items-center gap-6">
                        <span className="font-display text-[12px] font-semibold text-secondary tracking-widest">
                          {item.num}
                        </span>
                        <h4 className={`text-xl md:text-2xl font-display font-medium transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'
                        }`}>
                          {item.title}
                        </h4>
                      </div>
                      <Plus
                        size={20}
                        className={`text-secondary group-hover:text-primary transition-transform duration-500 ease-out ${
                          isActive ? 'rotate-45 text-primary' : ''
                        }`}
                      />
                    </div>

                    {/* Collapsible Content */}
                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-cubic)] ${
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}>
                      <div className="overflow-hidden">
                        <p 
                          className="text-body text-secondary leading-relaxed max-w-xl"
                          style={{ paddingLeft: '3rem', paddingBottom: '1.5rem' }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
