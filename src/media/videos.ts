export interface StellariumVideo {
  id: string;
  title: string;
  description: string;
  url: string; // Embed URL
  youtubeUrl: string; // Link to watch on YouTube
  duration: string;
  thumbnail: string;
  category: "Vision" | "Engineering" | "Masterclass" | "Culture";
  views: string;
  date: string;
}

export const STELLARIUM_VIDEOS: StellariumVideo[] = [
  {
    id: "v1",
    title: "The Stellarium Foundation Vision & Project Genesis",
    description: "An in-depth introduction to the primary mission of Stellarium. John Victor outlines our philosophy of Wealth Activism, our global campaigns, and the construction of our Mutually Beneficial Society.",
    url: "https://www.youtube.com/embed/Oo2-8NT6wiQ",
    youtubeUrl: "https://youtu.be/Oo2-8NT6wiQ",
    duration: "16:24",
    thumbnail: "🌌",
    category: "Vision",
    views: "42,150",
    date: "May 2026"
  },
  {
    id: "v2",
    title: "The Altruistic Sovereign Mindset & System Rules",
    description: "John Victor presents the cognitive foundations and operational mandates for modern systems builders. Learn to harmonize personal wealth creation with deep community-centric altruism and sovereign mindset loops.",
    url: "https://www.youtube.com/embed/JAMCTIpx6s0",
    youtubeUrl: "https://youtu.be/JAMCTIpx6s0",
    duration: "24:10",
    thumbnail: "👑",
    category: "Masterclass",
    views: "31,840",
    date: "May 2026"
  },
  {
    id: "v3",
    title: "Unified Digital AI Workforce: Workspace & Water Automation",
    description: "The technical blueprint of our high-performance automation workspaces. Discover how sovereign digital tools, automatic information pipelines, and automation engines elevate personal enterprise intelligence and GDP.",
    url: "https://www.youtube.com/embed/OaWhWBB0OCE",
    youtubeUrl: "https://youtu.be/OaWhWBB0OCE",
    duration: "12:45",
    thumbnail: "💧",
    category: "Engineering",
    views: "18,920",
    date: "May 2026"
  },
  {
    id: "v4",
    title: "The Blueprint for a Mutually Beneficial Society",
    description: "A deep-dive on modern societal infrastructure design. Discover the structural mechanization built to ensure active participants receive reciprocal value, aligned wealth pathways, and scalable sovereign resources.",
    url: "https://www.youtube.com/embed/ZQ11OXDZvUQ",
    youtubeUrl: "https://youtu.be/ZQ11OXDZvUQ",
    duration: "19:15",
    thumbnail: "⚙️",
    category: "Vision",
    views: "26,400",
    date: "May 2026"
  },
  {
    id: "v5",
    title: "Cultural Integration, Wisdom, & Dynamic Projection",
    description: "Exploring high-velocity creative projection and social synchronicity. This session examines the metaphysical, linguistic, and social models driving the rapid expansion of the Stellarium Network.",
    url: "https://www.youtube.com/embed/2402A7KTNEM",
    youtubeUrl: "https://youtu.be/2402A7KTNEM",
    duration: "22:30",
    thumbnail: "🔮",
    category: "Culture",
    views: "14,580",
    date: "May 2026"
  },
  {
    id: "v6",
    title: "Financial Architecture & High-Profile Systems Scaling",
    description: "An advanced masterclass session on scaling business portfolios, building secure corporate treasury channels, and utilizing technical leverage to fund real-world humanitarian initiatives.",
    url: "https://www.youtube.com/embed/bqFep-M9lGU",
    youtubeUrl: "https://youtu.be/bqFep-M9lGU",
    duration: "15:50",
    thumbnail: "🔥",
    category: "Masterclass",
    views: "34,120",
    date: "May 2026"
  },
  {
    id: "new1",
    title: "Sovereign Financial Freedom & Decentralized Autonomy",
    description: "John Victor breaks down the mechanisms of personal sovereignty, illustrating how decentralized networks and wealth activation safeguard families and elevate local infrastructure.",
    url: "https://www.youtube.com/embed/31riI_s_958",
    youtubeUrl: "https://youtu.be/31riI_s_958",
    duration: "18:45",
    thumbnail: "🦅",
    category: "Masterclass",
    views: "22,140",
    date: "May 2026"
  },
  {
    id: "new2",
    title: "The Masterclass: Autonomous Economic Engines",
    description: "Learn to deploy autonomous assets and run background digital enterprises that sustain your livelihood while funding critical planetary resources and local food forest systems.",
    url: "https://www.youtube.com/embed/g7HIAp5gXw8",
    youtubeUrl: "https://youtu.be/g7HIAp5gXw8",
    duration: "29:12",
    thumbnail: "🚀",
    category: "Masterclass",
    views: "39,520",
    date: "May 2026"
  },
  {
    id: "new3",
    title: "Advanced Workspace Optimization & Smart AI Routines",
    description: "Step-by-step technical scaling of clean digital environments. In this session, our engineering leads lay down instructions for deploying automation macros and streamlining global reporting.",
    url: "https://www.youtube.com/embed/kuj7ukMhUhc",
    youtubeUrl: "https://youtu.be/kuj7ukMhUhc",
    duration: "14:20",
    thumbnail: "🖥️",
    category: "Engineering",
    views: "12,850",
    date: "May 2026"
  },
  {
    id: "new4",
    title: "Building the Mutually Beneficial Society Infrastructure",
    description: "Exploring the socio-economic framework of the Stellarium Foundation. Learn how each node collaborates to yield compounding benefits across real estate, agriculture, and web networks.",
    url: "https://www.youtube.com/embed/dVNW8AJ9kxU",
    youtubeUrl: "https://youtu.be/dVNW8AJ9kxU",
    duration: "21:35",
    thumbnail: "🏗️",
    category: "Vision",
    views: "24,800",
    date: "May 2026"
  },
  {
    id: "new5",
    title: "Social Dynamics, Linguistics, & Creative Expansion",
    description: "Unlocking human potential through language and intentional cultural resonance. Discover our custom-built communications framework designed to unite world-class change agents rapidly.",
    url: "https://www.youtube.com/embed/oUa33X_T8TE",
    youtubeUrl: "https://youtu.be/oUa33X_T8TE",
    duration: "17:50",
    thumbnail: "🗣️",
    category: "Culture",
    views: "15,220",
    date: "May 2026"
  },
  {
    id: "new6",
    title: "Sovereign Treasury Scaling for Modern Innovators",
    description: "An explicit analysis of asset optimization and secure institutional channels. Build a treasury that supports high-profile operations and global philanthropy with zero operational friction.",
    url: "https://www.youtube.com/embed/wxLhO9pBWmg",
    youtubeUrl: "https://youtu.be/wxLhO9pBWmg",
    duration: "25:10",
    thumbnail: "📈",
    category: "Engineering",
    views: "31,400",
    date: "May 2026"
  },
  {
    id: "new7",
    title: "Stellarium Foundation: The Digital Renaissance Roadmap",
    description: "A comprehensive roadmap outlining our active targets. From tech frameworks to physical community retreats, see where the foundation is deploying capital over the next calendar loop.",
    url: "https://www.youtube.com/embed/bdbu5VdWOgA",
    youtubeUrl: "https://youtu.be/bdbu5VdWOgA",
    duration: "19:42",
    thumbnail: "🗺️",
    category: "Vision",
    views: "17,350",
    date: "May 2026"
  }
];
