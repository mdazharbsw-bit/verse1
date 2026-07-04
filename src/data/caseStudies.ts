export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  challenge: string;
  execution: string;
  outcome: string;
  heroImage: string;
  galleryImages: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "mercedes-cla-launch",
    title: "CLA Launch Experience",
    client: "Mercedes-Benz",
    category: "Product Launch",
    year: "2024",
    challenge:
      "Create an immersive launch event for the new Mercedes CLA that communicates the vehicle's blend of luxury and technology to media, influencers, and VIP guests.",
    execution:
      "A multi-sensory experience combining architectural installations, live performances, and interactive technology demos across a 10,000 sq ft venue. Guests were guided through curated zones that mirrored the CLA's design philosophy.",
    outcome:
      "800+ attendees, 50M+ social media impressions, featured in 120+ publications. The event was recognized as one of the top automotive launches of the year.",
    heroImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
    ],
  },
  {
    id: "mercedes-press-conference",
    title: "Global Press Conference",
    client: "Mercedes-Benz",
    category: "Corporate Event",
    year: "2023",
    challenge:
      "Orchestrate a high-profile press conference for Mercedes-Benz to announce their future mobility strategy to global media.",
    execution:
      "A sleek, cinematic presentation environment with holographic displays, synchronized lighting, and seamless AV production. Every detail was choreographed for maximum media impact.",
    outcome:
      "200+ international journalists, 15 countries represented, 2B+ media reach. The event set a new benchmark for automotive press conferences.",
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50da2fd4?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
      "https://images.unsplash.com/photo-1591115765373-5f9cf1da1731?w=800&q=80",
    ],
  },
  {
    id: "university-fair",
    title: "Global University Fair",
    client: "Education Consortium",
    category: "Exhibition",
    year: "2024",
    challenge:
      "Design and execute a prestigious university fair connecting top global institutions with prospective students across multiple cities.",
    execution:
      "A traveling exhibition featuring custom-designed booths, interactive campus tours via VR, panel discussions with admissions directors, and personalized counseling zones.",
    outcome:
      "12,000+ visitors across 5 cities, 80+ universities represented, 95% visitor satisfaction rate. Generated 3,000+ qualified applications.",
    heroImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    ],
  },
  {
    id: "university-of-bristol",
    title: "Brand Campaign",
    client: "University of Bristol",
    category: "Brand Experience",
    year: "2023",
    challenge:
      "Develop an experiential brand campaign to strengthen the University of Bristol's positioning as a world-leading research institution.",
    execution:
      "A multi-platform campaign combining experiential roadshows, interactive installations on campus, digital storytelling, and a flagship launch event attended by faculty, students, and industry leaders.",
    outcome:
      "40% increase in brand awareness metrics, 25% growth in international applications, and the campaign won a higher education marketing award.",
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80",
    ],
  },
  {
    id: "asu-gsv",
    title: "ASU + GSV Summit",
    client: "ASU + GSV",
    category: "Conference",
    year: "2024",
    challenge:
      "Deliver a world-class summit experience for the ASU + GSV education technology conference, one of the most influential EdTech gatherings globally.",
    execution:
      "End-to-end event production including stage design, speaker management, networking zone architecture, sponsor activations, and a companion digital experience. Focus on creating intimate, high-value interactions within a large-scale setting.",
    outcome:
      "7,000+ attendees, 500+ speakers, $2B+ in deals facilitated. Rated the #1 EdTech conference globally for the third consecutive year.",
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50da2fd4?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587825140708-dfaf18c4df80?w=800&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&q=80",
    ],
  },
  {
    id: "mumbai-rising",
    title: "Mumbai Rising",
    client: "City of Mumbai",
    category: "Experiential",
    year: "2023",
    challenge:
      "Create a large-scale public experience celebrating Mumbai's cultural renaissance, engaging both residents and international visitors.",
    execution:
      "A month-long experiential festival featuring immersive art installations across iconic Mumbai locations, live performances, culinary experiences, and interactive exhibits exploring the city's past, present, and future.",
    outcome:
      "500,000+ visitors, international press coverage in 30+ countries, and established as an annual cultural landmark event for the city.",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&q=80",
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80",
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
    ],
  },
];
