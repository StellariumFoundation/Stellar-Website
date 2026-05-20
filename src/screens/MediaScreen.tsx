import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Search, 
  Tv, 
  Clapperboard, 
  Flame, 
  Eye, 
  Calendar, 
  Sparkles,
  ChevronRight,
  MonitorPlay,
  Share2
} from 'lucide-react';
import { STELLARIUM_VIDEOS, StellariumVideo } from '../media/videos';

export function MediaScreen() {
  const [selectedVideo, setSelectedVideo] = useState<StellariumVideo>(STELLARIUM_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showShareNotification, setShowShareNotification] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Sync state with active video change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [selectedVideo]);

  // Handle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Playback interrupted: ", err));
    }
  };

  // Keyboard navigation / shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Update Time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  // Set Metadata (Duration)
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  // Handle Video Progress Bar seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Handle Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    if (nextMuted) {
      videoRef.current.volume = 0;
    } else {
      videoRef.current.volume = volume;
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error("Could not request fullscreen: ", err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error("Could not exit fullscreen: ", err));
    }
  };

  // Listen for fullscreen change events (e.g. Esc key pressed)
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  // Format Time Helper (mm:ss)
  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return '0:00';
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Filter videos
  const categories = ['All', 'Vision', 'Engineering', 'Culture', 'Masterclass'];
  const filteredVideos = STELLARIUM_VIDEOS.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Action: Copy Share Link
  const handleShare = () => {
    const shareText = `Watch "${selectedVideo.title}" on Stellarium. ${window.location.href}`;
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 2500);
      })
      .catch(err => console.error("Copy failed: ", err));
  };

  return (
    <div id="media-screen-root" className="flex flex-col h-full overflow-y-auto w-full p-4 md:p-6 lg:p-8 items-center bg-transparent">
      {/* Page Title & Sparkles */}
      <div className="mb-4 flex flex-col items-center">
        <div className="bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] border border-[var(--color-tertiary)]/20 p-2.5 rounded-full mb-3 shrink-0 animate-pulse">
          <Clapperboard size={28} />
        </div>
        <h1 className="text-3xl font-normal text-center uppercase tracking-widest text-[var(--color-primary)]">
          Stellarium Portal
        </h1>
        <p className="text-center text-xs text-gray-400 mt-2 max-w-sm tracking-wide">
          Streaming high-velocity wisdom, engineering briefs, and cultural blueprints directly to your consciousness.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 pb-28">
        
        {/* LEFT PANEL: PLAYER & METADATA (8cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Custom Video Player Container */}
          <div 
            ref={playerContainerRef}
            id="video-player-container"
            className="relative group bg-black/95 rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video transform-gpu transition-all"
          >
            {selectedVideo.isYouTube ? (
              <iframe
                src={`${selectedVideo.url}?autoplay=0&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={selectedVideo.url}
                  onClick={togglePlay}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => {
                    setIsPlaying(false);
                    // Auto-advance to next video if matches category
                    const currentIndex = filteredVideos.findIndex(v => v.id === selectedVideo.id);
                    if (currentIndex !== -1 && currentIndex < filteredVideos.length - 1) {
                      setSelectedVideo(filteredVideos[currentIndex + 1]);
                    }
                  }}
                  className="w-full h-full object-contain cursor-pointer"
                  playsInline
                />

                {/* Giant Centered Play/Pause Button State Overlay */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-all cursor-pointer z-10"
                  >
                    <div className="p-5 rounded-full bg-[var(--color-tertiary)] text-black shadow-lg scale-100 hover:scale-110 active:scale-95 transition-all">
                      <Play size={30} fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* CUSTOM PLAYER SKINBAR overlay - triggers on group hover or when paused */}
                <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col space-y-3 z-20 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                  
                  {/* Progress Bar & Seek Slider */}
                  <div className="flex items-center space-x-2">
                    <input 
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/20 accent-[var(--color-tertiary)] hover:h-2 transition-all outline-none"
                    />
                  </div>

                  {/* Controls Grid */}
                  <div className="flex items-center justify-between text-white text-xs">
                    
                    {/* Play, Volume, and Time Controls */}
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={togglePlay} 
                        className="p-1 hover:text-[var(--color-tertiary)] transition-colors"
                        title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                      >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                      </button>

                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={toggleMute} 
                          className="p-1 hover:text-[var(--color-tertiary)] transition-colors"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <input 
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 rounded bg-white/30 accent-[var(--color-tertiary)] outline-none cursor-pointer"
                        />
                      </div>

                      {/* Time Stamp */}
                      <span className="font-mono text-[10px] text-gray-300">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Video Info Indicator & Actions */}
                    <div className="flex items-center space-x-3">
                      <span className="hidden sm:inline bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] text-[10px] border border-[var(--color-tertiary)]/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest font-bold">
                        {selectedVideo.category}
                      </span>

                      <button 
                        onClick={toggleFullscreen}
                        className="p-1 hover:text-[var(--color-tertiary)] transition-colors"
                        title="Toggle Fullscreen"
                      >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                      </button>
                    </div>

                  </div>

                </div>
              </>
            )}
          </div>

          {/* Active Video Info Metadata Details Card */}
          <div className="bg-[var(--color-surface)] border border-white/5 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-[10px] font-bold border border-[var(--color-secondary)]/20 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  {selectedVideo.category} Group Code
                </span>
                <h2 className="text-xl md:text-2xl font-light tracking-wide text-white leading-tight">
                  {selectedVideo.title}
                </h2>
              </div>

              {/* Actions/Share */}
              <div className="flex items-center gap-2 self-start shrink-0">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 transition-colors"
                >
                  <Share2 size={14} className="text-[var(--color-tertiary)]" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-400 border-t border-white/5 pt-3">
              <div className="flex items-center gap-1.5">
                <Eye size={13} className="text-gray-500" />
                <span>{selectedVideo.views} views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-gray-500" />
                <span>Released {selectedVideo.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame size={13} className="text-yellow-500 animate-pulse" />
                <span className="text-[var(--color-tertiary)] font-bold uppercase tracking-wider">Altruism & Wealth</span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-xs md:text-sm text-[var(--color-on-background)] leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
              {selectedVideo.description}
            </p>

            {/* Success toast Notification for Share */}
            {showShareNotification && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-xs font-medium animate-pulse flex items-center gap-2">
                <Sparkles size={14} /> Shared clipboard link copied! Send to partners or governors.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: SEARCH & PLAYLIST (4cols on lg) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Filter, Search & Tab Container */}
          <div className="bg-[var(--color-surface)] border border-white/5 rounded-2xl p-4 space-y-3">
            
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search masterclass, AI, suite..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--color-surface-variant)] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-tertiary)] transition-colors"
              />
            </div>

            {/* Category Filter Chips Horizontal */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[var(--color-tertiary)] text-black border border-[var(--color-tertiary)]/45' 
                      : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Playlist List Display */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center justify-between px-1">
              <span>Streaming Playlist</span>
              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-md font-mono">{filteredVideos.length} items</span>
            </h3>

            <div className="space-y-2 max-h-[380px] lg:max-h-[500px] overflow-y-auto no-scrollbar pr-1">
              {filteredVideos.map((video, index) => {
                const isSelected = video.id === selectedVideo.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`group flex items-center gap-3.5 p-3 rounded-xl cursor-pointer border transition-all ${
                      isSelected 
                        ? 'bg-[var(--color-surface-variant)] border-[var(--color-tertiary)]/40 shadow-md shadow-[var(--color-tertiary)]/5' 
                        : 'bg-[var(--color-surface)] border-white/5 hover:border-white/15'
                    }`}
                  >
                    {/* Circle Icon / Thumbnail representation */}
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-lg shadow-inner shrink-0 transition-transform ${
                      isSelected 
                        ? 'bg-[var(--color-tertiary)]/20 border border-[var(--color-tertiary)]/40 scale-105' 
                        : 'bg-white/5 group-hover:scale-105'
                    }`}>
                      {isSelected && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-5">
                          <span className="w-0.75 h-3 bg-[var(--color-tertiary)] animate-[bounce_1s_infinite]" />
                          <span className="w-0.75 h-5 bg-[var(--color-tertiary)] animate-[bounce_1s_infinite_0.2s]" />
                          <span className="w-0.75 h-4 bg-[var(--color-tertiary)] animate-[bounce_1s_infinite_0.4s]" />
                        </div>
                      ) : (
                        <span>{video.thumbnail}</span>
                      )}
                    </div>

                    {/* Title & Metadata */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs font-medium truncate ${isSelected ? 'text-[var(--color-tertiary)] font-bold' : 'text-white'}`}>
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-gray-500 uppercase font-mono">{video.category}</span>
                        <span className="text-[9px] text-gray-600 font-bold">•</span>
                        <span className="text-[9px] text-gray-500 font-mono">{video.duration} duration</span>
                      </div>
                    </div>

                    {/* Play Arrow Indicator on hover */}
                    <div className="shrink-0 text-gray-500 group-hover:text-[var(--color-tertiary)] transition-colors">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                );
              })}

              {filteredVideos.length === 0 && (
                <div className="p-8 text-center bg-[var(--color-surface)] border border-dashed border-white/10 rounded-xl">
                  <MonitorPlay size={24} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-xs text-gray-500">No media titles found.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
