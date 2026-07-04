export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  previousOrgs: string[];
}

export const leadership: LeadershipMember[] = [
  {
    id: "arun-mehta",
    name: "Arun Mehta",
    title: "Co-Founder & CEO",
    bio: "With over 20 years in experiential marketing, Arun has led campaigns for Fortune 500 brands across automotive, technology, and luxury sectors. His vision for VERVE is to redefine how brands connect with audiences through extraordinary experiences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    previousOrgs: ["Ogilvy", "JWT", "WPP"],
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    title: "Co-Founder & Creative Director",
    bio: "Priya brings 18 years of creative leadership spanning advertising, experiential design, and brand strategy. She has directed award-winning campaigns for global brands and believes that every event should be a work of art.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    previousOrgs: ["Dentsu", "Leo Burnett", "McCann"],
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    title: "Head of Strategy",
    bio: "Vikram's expertise lies at the intersection of data and creativity. With 15 years in strategic planning and consumer insights, he ensures every VERVE project is anchored in audience understanding and measurable outcomes.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    previousOrgs: ["McKinsey", "Accenture Interactive", "PHD Media"],
  },
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    title: "Head of Production",
    bio: "Ananya is a production powerhouse with 12 years of experience managing large-scale events and installations. From intimate brand dinners to 10,000-person conferences, she delivers flawless execution every time.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    previousOrgs: ["Live Nation", "IMG", "Wizcraft"],
  },
];
