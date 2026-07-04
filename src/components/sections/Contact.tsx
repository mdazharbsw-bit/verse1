'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import MagneticButton from '@/components/ui/MagneticButton';

const BUDGET_OPTIONS = [
  'Select Budget Range',
  '$10k – $25k',
  '$25k – $50k',
  '$50k – $100k',
  '$100k – $250k',
  '$250k+',
] as const;

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
] as const;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeUp', duration: 900 });
  const formRef = useStaggerAnimation<HTMLDivElement>({
    duration: 800,
    staggerDelay: 100,
    distance: 30,
  });
  const infoRef = useScrollAnimation<HTMLDivElement>({
    type: 'fadeUp',
    duration: 900,
    delay: 200,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-black border-t border-white/10">
      <div className="section-padding">
        <div className="container-verve">
          {/* Header */}
          <div ref={headerRef} className="text-center flex flex-col items-center">
            <h2 className="text-display-md font-display max-w-4xl">
              Let&apos;s Create Something Extraordinary
            </h2>
            <p className="text-body-lg text-secondary mt-6 max-w-2xl">
              Ready to create experiences that move your brand forward? Tell us
              about your project.
            </p>
          </div>

          {/* Content — Centered Form Layout */}
          <div className="mt-16 max-w-2xl mx-auto">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center min-h-[300px]">
                <h3 className="text-display-sm font-display mb-4">
                  Thank You
                </h3>
                <p className="text-body-lg text-secondary max-w-md">
                  We&apos;ve received your enquiry and will be in touch within
                  24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div ref={formRef}>
                  {/* Name */}
                  <div className="mb-8">
                    <label
                      htmlFor="contact-name"
                      className="text-eyebrow block mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      required
                      aria-required="true"
                      className="verve-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-8">
                    <label
                      htmlFor="contact-email"
                      className="text-eyebrow block mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      required
                      aria-required="true"
                      className="verve-input"
                    />
                  </div>

                  {/* Company */}
                  <div className="mb-8">
                    <label
                      htmlFor="contact-company"
                      className="text-eyebrow block mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      placeholder="Company"
                      className="verve-input"
                    />
                  </div>

                  {/* Budget Range */}
                  <div className="mb-8">
                    <label
                      htmlFor="contact-budget"
                      className="text-eyebrow block mb-2"
                    >
                      Budget
                    </label>
                    <div className="relative">
                      <select
                        id="contact-budget"
                        name="budget"
                        aria-label="Select budget range"
                        className="verve-input appearance-none cursor-pointer pr-8"
                      >
                        {BUDGET_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option === 'Select Budget Range' ? '' : option}
                            disabled={option === 'Select Budget Range'}
                            className="bg-surface text-white"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                      {/* Custom arrow */}
                      <ArrowRight
                        size={16}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary pointer-events-none rotate-90"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label
                      htmlFor="contact-message"
                      className="text-eyebrow block mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell us about your project"
                      rows={4}
                      className="verve-textarea"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex justify-center mt-12 mb-8">
                    <MagneticButton
                      variant="primary"
                      type="submit"
                      className="w-full sm:w-auto"
                    >
                      Send Enquiry
                    </MagneticButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
