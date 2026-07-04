export interface Service {
  id: string;
  title: string;
  description: string;
  category: "experiential" | "marketing";
  image: string;
}

export const services: Service[] = [
  {
    id: "experiential-events",
    title: "Experiential Events",
    description:
      "Immersive conferences, expos, and thought leadership forums that captivate audiences and create lasting impressions.",
    category: "experiential",
    image: "https://images.unsplash.com/photo-1540575467063-178a50da2fd4?w=800&q=80",
  },
  {
    id: "product-launches",
    title: "Product Launches",
    description:
      "High-impact product reveals that generate buzz, media attention, and unforgettable brand moments.",
    category: "experiential",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  },
  {
    id: "brand-experiences",
    title: "Brand Experiences",
    description:
      "Experiential installations and consumer engagement activations that bring brands to life.",
    category: "experiential",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    id: "exhibitions",
    title: "Exhibitions",
    description:
      "Custom-designed exhibition spaces and booth experiences that command attention on the show floor.",
    category: "experiential",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
  },
  {
    id: "marketing-strategy",
    title: "Marketing Strategy",
    description:
      "Data-driven campaign planning and strategic marketing frameworks that deliver measurable results.",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: "content-creative",
    title: "Content & Creative",
    description:
      "Compelling storytelling, visual content, and creative campaigns that resonate with target audiences.",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  },
  {
    id: "pr",
    title: "Public Relations",
    description:
      "Strategic communications, media relations, and reputation management that build credibility.",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Multi-channel digital strategies, social media campaigns, and performance marketing that drive engagement.",
    category: "marketing",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
  },
];
