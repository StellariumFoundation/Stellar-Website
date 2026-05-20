import React, { useState } from 'react';
import { 
  Clapperboard, 
  Eye, 
  Calendar, 
  Sparkles,
  Share2,
  Plus,
  Tv,
  ExternalLink,
  Youtube
} from 'lucide-react';
import { STELLARIUM_VIDEOS, StellariumVideo } from '../media/videos';

export function MediaScreen() {
  const [videoList, setVideoList] = useState<StellariumVideo[]>(STELLARIUM_VIDEOS);
  const [customUrl, setCustomUrl] = useState('');
  const [customError, setCustomError] = useState('');
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState('');

  // Helper function to extract YouTube ID from standard URL strings
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Add custom URL stream handler 
  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError('');

    if (!customUrl.trim()) return;

    const videoId = getYouTubeId(customUrl);
    if (!videoId) {
      setCustomError('Please enter a valid YouTube Watch URL (e.g., https://youtube.com/watch?v=...)');
      return;
    }

    const newVideo: StellariumVideo = {
      id: `custom-${Date.now()}`,
      title: `Custom Live Stream: ${videoId}`,
      description: `Loaded dynamically from provided YouTube content watch link: ${customUrl}`,
      url: `https://www.youtube.com/embed/${videoId}`,
      youtubeUrl: customUrl,
      duration: "Dynamic",
      thumbnail: "📺",
      category: "Vision",
      views: "Live Stream Feed",
      date: "Just Now"
    };

    setVideoList([newVideo, ...videoList]);
    setCustomUrl('');
  };

  // Action: Copy Share Link
  const handleShare = (video: StellariumVideo) => {
    const shareText = `Watch "${video.title}" on YouTube: ${video.youtubeUrl}`;
    
    // Fallback for iframe sandboxes where navigator.clipboard is blocked
    const fallbackCopy = (text: string): boolean => {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999); // Mobile compatibility
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        return successful;
      } catch (err) {
        console.error('Copy fallback execution failed', err);
        return false;
      }
    };

    const showSuccessToast = () => {
      setCopiedTitle(video.title);
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 3000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          showSuccessToast();
        })
        .catch(() => {
          if (fallbackCopy(shareText)) {
            showSuccessToast();
          } else {
            // Fallback: update state to let user know they can copy manually
            setCopiedTitle(`Ctrl+C to copy: ${video.youtubeUrl}`);
            setShowShareNotification(true);
            setTimeout(() => setShowShareNotification(false), 5000);
          }
        });
    } else {
      if (fallbackCopy(shareText)) {
        showSuccessToast();
      } else {
        setCopiedTitle(`Copy link: ${video.youtubeUrl}`);
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 5000);
      }
    }
  };

  return (
    <div id="media-screen-root" className="flex flex-col h-full overflow-y-auto w-full p-4 md:p-6 lg:p-8 items-center bg-transparent">
      {/* Page Title & Header */}
      <div className="mb-4 flex flex-col items-center">
        <div className="bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] border border-[var(--color-tertiary)]/20 p-2.5 rounded-full mb-3 shrink-0 animate-pulse">
          <Clapperboard size={28} />
        </div>
        <h1 className="text-3xl font-normal text-center uppercase tracking-widest text-[var(--color-primary)]">
          Stellarium Portal
        </h1>
        <p className="text-center text-xs text-gray-400 mt-2 max-w-sm tracking-wide">
          Streaming high-velocity wisdom, engineering briefs, and cultural blueprints directly from the YouTube channel.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 pb-28">
        
        {/* LEFT PANEL: VERTICAL STREAMING FEED OF IN-APP EMBEDDED VIDEOS WITH DETAILS */}
        <div className="lg:col-span-8 space-y-6">
          
          {videoList.map((video) => (
            <div 
              key={video.id}
              className="bg-[var(--color-surface)] border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/10"
            >
              {/* Custom YouTube iframe player with absolute in-app embed mode constraint */}
              <div className="relative bg-black rounded-t-2xl overflow-hidden border-b border-white/10 aspect-video transform-gpu">
                <iframe
                  src={`${video.url}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Info Metadata Details Card Body */}
              <div className="p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="inline-block bg-red-600/10 text-red-500 text-[10px] font-bold border border-red-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                      {video.category} Video Spec
                    </span>
                    <h2 className="text-lg md:text-xl font-bold tracking-wide text-white leading-tight">
                      {video.title}
                    </h2>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 self-start shrink-0">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 rounded-xl text-xs font-semibold text-red-400 transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>YouTube</span>
                    </a>
                    <button 
                      onClick={() => handleShare(video)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 transition-colors"
                    >
                      <Share2 size={14} className="text-red-500" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Quick stats grid */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Eye size={13} className="text-gray-500" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-gray-500" />
                    <span>{video.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-bold font-mono text-[10px]">DURATION: {video.duration}</span>
                  </div>
                </div>

                {/* Description Text */}
                <p className="text-xs md:text-sm text-[var(--color-on-background)] leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                  {video.description}
                </p>
              </div>
            </div>
          ))}

          {/* Success toast Notification for Share */}
          {showShareNotification && (
            <div className="fixed bottom-6 right-6 z-50 p-4 bg-zinc-950 border border-red-500/30 text-red-400 rounded-xl text-xs font-medium shadow-2xl animate-pulse flex items-center gap-3.5 max-w-sm">
              <Sparkles size={18} className="text-red-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-[10px] uppercase tracking-widest text-white leading-tight">Share Link Copied!</p>
                <p className="truncate text-gray-400 mt-1 text-[11px] font-sans">{copiedTitle}</p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: SUBSCRIBE CHANNEL PROFILE & STREAM LOADING */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Stunning YouTube Channel Profile Card */}
          <div className="bg-[var(--color-surface)] border border-white/5 rounded-2xl p-4 flex items-center gap-3 shadow-lg relative overflow-hidden group">
            {/* Ambient background decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl group-hover:bg-red-600/10 transition-all duration-300 pointer-events-none" />
            
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow relative shrink-0">
              <Youtube size={20} fill="currentColor" />
              <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-blue-500 rounded-full border border-slate-900 flex items-center justify-center text-[7px] font-extrabold text-white" title="Verified Channel">✓</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <span className="text-xs font-black text-white tracking-wide uppercase truncate block">
                Stellarium Channel
              </span>
              <p className="text-[10px] text-gray-400 font-medium">@stellariumfoundation</p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-red-400 font-bold tracking-tight animate-pulse">
                <span>● 100K+ Active Members</span>
              </div>
            </div>

            <a
              href="https://youtube.com/@stellariumfoundation?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[9px] rounded-lg tracking-wider uppercase transition-colors shrink-0 font-sans"
            >
              Subscribe
            </a>
          </div>

          {/* Dynamic Link Input Form */}
          <div className="bg-[var(--color-surface)] border border-white/5 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-1.5">
              <Tv size={14} className="text-red-500" />
              <span>Stream Any YouTube Link</span>
            </h3>
            
            <form onSubmit={handleAddCustomVideo} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste watch URL..."
                  value={customUrl}
                  onChange={e => setCustomUrl(e.target.value)}
                  className="flex-1 bg-[var(--color-surface-variant)] border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-700 transition-all flex items-center justify-center shadow-lg"
                >
                  <Plus size={16} />
                </button>
              </div>

              {customError && (
                <p className="text-[10px] text-red-400 font-medium tracking-wide">
                  {customError}
                </p>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
