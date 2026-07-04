'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const eyebrowRef = useScrollAnimation<HTMLParagraphElement>({
    type: 'fadeUp',
    duration: 800,
    delay: 0,
  });

  const titleRef = useScrollAnimation<HTMLHeadingElement>({
    type: 'fadeUp',
    duration: 800,
    delay: 100,
  });

  const descRef = useScrollAnimation<HTMLParagraphElement>({
    type: 'fadeUp',
    duration: 800,
    delay: 200,
  });

  const alignmentClasses =
    align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignmentClasses}`}>
      {eyebrow && (
        <p ref={eyebrowRef} className="text-eyebrow mb-8">
          {eyebrow}
        </p>
      )}
      <h2
        ref={titleRef}
        className={`text-display-md text-primary ${
          align === 'center' ? 'max-w-4xl' : 'max-w-3xl'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          ref={descRef}
          className={`text-body-lg text-secondary mt-6 ${
            align === 'center' ? 'max-w-2xl' : 'max-w-xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
