<script lang="ts">
  import { Volume2, VolumeX } from '@lucide/svelte';
  import { onMount } from 'svelte';

  const tracks = ['/dvorak.opus', '/egmont.opus'];
  let currentIdx = $state(Math.floor(Math.random() * tracks.length));

  let muted = $state(true);
  let audioEl: HTMLAudioElement | undefined = $state();
  let firstClick = $state(true);

  $effect(() => {
    if (audioEl) {
      audioEl.volume = 0.5;
    }
  });

  function nextTrack() {
    currentIdx = (currentIdx + 1) % tracks.length;
    if (!audioEl) return;
    audioEl.src = tracks[currentIdx];
    audioEl.load();
    audioEl.play().catch(() => {});
  }

  function onError() {
    nextTrack();
  }

  function handleFirstInteraction(e: Event) {
    if (!firstClick || !audioEl) return;
    firstClick = false;
    audioEl.muted = false;
    muted = false;
    document.removeEventListener('click', handleFirstInteraction, true);
    document.removeEventListener('touchstart', handleFirstInteraction, true);
    document.removeEventListener('keydown', handleFirstInteraction, true);
  }

  onMount(() => {
    document.addEventListener('click', handleFirstInteraction, true);
    document.addEventListener('touchstart', handleFirstInteraction, true);
    document.addEventListener('keydown', handleFirstInteraction, true);
    setTimeout(() => {
      if (firstClick && audioEl) {
        handleFirstInteraction(new Event('timeout'));
      }
    }, 1000);
  });

  function toggle() {
    if (!audioEl) return;
    if (firstClick) {
      handleFirstInteraction(new Event('manual'));
    } else {
      audioEl.muted = !audioEl.muted;
      muted = audioEl.muted;
    }
  }
</script>

<audio
  bind:this={audioEl}
  src={tracks[currentIdx]}
  preload="auto"
  autoplay
  muted
  onended={nextTrack}
  onerror={onError}
/>

<button
  onclick={toggle}
  class="fixed top-3 right-3 z-[9999] w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer transition-all hover:bg-black/80 hover:border-white/20 active:scale-90"
  aria-label={muted ? 'Unmute background audio' : 'Mute background audio'}
>
  {#if muted}
    <VolumeX size={18} class="text-gray-300 {firstClick ? 'animate-pulse' : ''}" />
  {:else}
    <Volume2 size={18} class="text-emerald-400" />
  {/if}
</button>
