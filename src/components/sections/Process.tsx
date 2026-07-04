'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import SectionHeading from '@/components/ui/SectionHeading';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Deep-dive into your brand, audience, and objectives. We listen, research, and uncover the insights that will shape an extraordinary experience.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Transform insights into a strategic framework. We define the narrative, creative direction, and measurable outcomes for your project.',
  },
  {
    number: '03',
    title: 'Create',
    description:
      'Bring the vision to life through design, content, and production planning. Every detail is crafted to deliver maximum impact.',
  },
  {
    number: '04',
    title: 'Execute',
    description:
      'Flawless delivery from setup to teardown. Our production team ensures every element performs perfectly, on time and on brand.',
  },
  {
    number: '05',
    title: 'Measure',
    description:
      'Quantify success through comprehensive post-event analysis. We measure impact, gather insights, and identify opportunities for future growth.',
  },
];

function StepRow({
  step,
  isActive,
  stepRef,
}: {
  step: ProcessStep;
  isActive: boolean;
  stepRef: (el: HTMLDivElement | null) => void;
}) {
  const animRef = useScrollAnimation<HTMLDivElement>({
    type: 'fadeUp',
    duration: 800,
    distance: 20,
  });

  // Merge refs
  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      // Set the scroll animation ref
      (animRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      // Set the intersection observer ref
      stepRef(el);
    },
    [animRef, stepRef]
  );

  return (
    <div ref={setRefs} className="py-10">
      {/* Step number */}
      <p
        className={`text-display-sm font-display transition-colors duration-700 ${
          isActive ? 'text-white/30' : 'text-white/10'
        }`}
        aria-hidden="true"
      >
        {step.number}
      </p>

      {/* Divider */}
      <div className="border-t border-border mt-6 mb-8" />

      {/* Content: two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
        <h3
          className={`text-display-md font-display transition-colors duration-700 ${
            isActive ? 'text-primary' : 'text-white/40'
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`text-body transition-colors duration-700 ${
            isActive ? 'text-secondary' : 'text-white/20'
          }`}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track which step is most visible
  useEffect(() => {
    const elements = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = elements.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -30% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    []
  );

  return (
    <section id="process" className="section-padding">
      <div className="container-verve">
        <SectionHeading
          eyebrow=""
          title="How We Work"
          description="A proven methodology refined over hundreds of successful projects."
          align="left"
        />

        <div className="mt-16">
          {steps.map((step, index) => (
            <StepRow
              key={step.number}
              step={step}
              isActive={activeIndex === index}
              stepRef={setStepRef(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
