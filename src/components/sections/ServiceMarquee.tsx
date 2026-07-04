'use client';

export default function ServiceMarquee() {
  const items = [
    'Concerts',
    'Festivals',
    'Corporate',
    'Private',
    'Launch Events',
    'Galas',
    'Conferences',
    'Exhibitions',
  ];

  // We render the array twice within each content block to ensure the marquee is wide enough,
  // and we render two matching content blocks side-by-side to make the scroll loop seamless.
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section" data-cursor="pointer">
      <div className="marquee-track-service">
        <div className="marquee-content-service">
          {doubled.map((item, i) => (
            <span key={`main-${i}`}>
              <span>{item}</span>
              <span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
        <div className="marquee-content-service" aria-hidden="true">
          {doubled.map((item, i) => (
            <span key={`dup-${i}`}>
              <span>{item}</span>
              <span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
