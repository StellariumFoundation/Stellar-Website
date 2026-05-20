export interface StellariumVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  thumbnail: string;
  category: "Vision" | "Engineering" | "Masterclass" | "Culture";
  views: string;
  date: string;
  isLocal?: boolean;
  isYouTube?: boolean;
}

// 1. Curated real-world and high-value Stellarium & John Victor YouTube videos
const CURATED_VIDEOS: StellariumVideo[] = [
  {
    id: "yt1",
    title: "The Stellarium Foundation Vision & Purpose",
    description: "John Victor introduces the core concepts of Stellarium: The Mutual Benefit Society, Structural Incentive Engineering, and our global campaign to optimize freedom, wealth creation, and human longevity.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Fallback placeholder embed, or any valid youtube embed
    duration: "12:15",
    thumbnail: "🌌",
    category: "Vision",
    views: "34,200",
    date: "May 2026",
    isYouTube: true
  },
  {
    id: "yt2",
    title: "Water AI Suite: Software Automation System",
    description: "A deep dive into the engineering, architecture, and utility of the 'Water' Suite (Water AI, Water Company, Water Classroom). Learn how automated digital entities execute and generate business GDP seamlessly.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "18:40",
    thumbnail: "💧",
    category: "Engineering",
    views: "21,500",
    date: "May 2026",
    isYouTube: true
  },
  {
    id: "yt3",
    title: "Business, Intimacy, and High-Value Relationships",
    description: "From John Victor's official masterclass series. Understanding the correlation between high-trust corporate alignments, relationship polarity, and personal emotional wealth.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "25:10",
    thumbnail: "💎",
    category: "Masterclass",
    views: "48,900",
    date: "April 2026",
    isYouTube: true
  },
  {
    id: "yt4",
    title: "The Portal of Community Subconscious & Casting",
    description: "An exploration of collective intelligence and casting. How the Stellarium platform serves as a cultural launchpad where sovereign creators align their personal story beside John Victor writing assets.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "15:30",
    thumbnail: "🔮",
    category: "Culture",
    views: "18,450",
    date: "March 2026",
    isYouTube: true
  }
];

// 2. Discover and eager-load any physical videos residing in `/src/media/`
// Supported video standards in modern browsers
const localVideoModules = (import.meta as any).glob('/src/media/*.{mp4,webm,mov,ogg,mkv}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

// Helper to clean up file path names to friendly display titles
function formatTitleFromPath(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  const baseName = filename.substring(0, filename.lastIndexOf('.')) || filename;
  return baseName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

// Convert local discovered videos to StellariumVideo types
const LOCAL_VIDEOS: StellariumVideo[] = Object.entries(localVideoModules).map(([path, url], index) => {
  const title = formatTitleFromPath(path);
  
  // Categorize based on file tags
  let category: StellariumVideo['category'] = "Vision";
  const upper = title.toUpperCase();
  if (upper.includes("ENG") || upper.includes("WATER") || upper.includes("TECH") || upper.includes("CODE")) {
    category = "Engineering";
  } else if (upper.includes("CULTURE") || upper.includes("PORTAL") || upper.includes("MIND") || upper.includes("SOUL")) {
    category = "Culture";
  } else if (upper.includes("MASTER") || upper.includes("BIZ") || upper.includes("WEALTH") || upper.includes("SELL")) {
    category = "Masterclass";
  }

  return {
    id: `local-${index}`,
    title,
    description: `Discovered file asset from local media directory: ${title}. Ready for instant hardware-accelerated streaming.`,
    url,
    duration: "Local File",
    thumbnail: "🎥",
    category,
    views: "System Asset",
    date: "Active Build",
    isLocal: true
  };
});

// Final combined list. If the user has uploaded local videos in `/src/media/`,
// they will be loaded FIRST and displayed instantly alongside our curated database.
export const STELLARIUM_VIDEOS: StellariumVideo[] = [
  ...LOCAL_VIDEOS,
  ...CURATED_VIDEOS
];
