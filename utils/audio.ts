// Advanced Audio Synth for "Leather on Willow" Sound & Walkie Talkie
let audioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;
let batSoundBuffer: AudioBuffer | null = null;

// The specific sound requested
const BAT_SOUND_URL = 'https://www.myinstants.com/media/sounds/cricket-bat-hitting-ball.mp3';

const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Attempt to preload the real sound
const loadBatSound = async () => {
  try {
    const ctx = getCtx();
    const response = await fetch(BAT_SOUND_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const arrayBuffer = await response.arrayBuffer();
    batSoundBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (e) {
    console.warn("Could not load external bat sound, falling back to synth.", e);
  }
};

// Trigger load immediately (browser allows loading, just not playing without interaction)
loadBatSound();

// Generate White Noise Buffer (cached)
const getNoiseBuffer = (ctx: AudioContext) => {
  if (!noiseBuffer) {
    const bufferSize = ctx.sampleRate * 1; // 1 second of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    noiseBuffer = buffer;
  }
  return noiseBuffer;
};

// --- Walkie Talkie Static Sound (chk-chk) ---
export const playWalkieTalkie = (duration = 0.15) => {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;
    
    const noise = getNoiseBuffer(ctx);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    
    // Highpass to remove low rumble, make it sound like a radio
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + duration); 
    
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    src.start(t);
    src.stop(t + duration + 0.1);
  } catch (e) {}
};

// --- Sequenced Third Umpire Voice ---
// We use a queue system to play sentences naturally with static in between
export const playUmpireSequence = (lines: string[], onComplete?: () => void) => {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel(); // Clear previous
  
  let index = 0;

  const speakNext = () => {
    if (index >= lines.length) {
      if (onComplete) onComplete();
      return;
    }

    const text = lines[index];
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Tweak to sound more like a radio transmission (Deeper & Faster)
    utterance.rate = 1.1; 
    utterance.pitch = 0.8; 
    utterance.volume = 1;

    // Try to find a male voice (usually sounds better for umpire effect)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google UK English Male') || 
      v.name.includes('Daniel') || 
      v.name.includes('Google US English')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => {
       // Static burst at start of transmission
       playWalkieTalkie(0.1); 
    };

    utterance.onend = () => {
      // Static burst at end of transmission
      playWalkieTalkie(0.1);
      index++;
      // Small pause between radio comms
      setTimeout(speakNext, 400); 
    };

    window.speechSynthesis.speak(utterance);
  };

  speakNext();
};

export const cancelUmpireAudio = () => {
  window.speechSynthesis.cancel();
};


// Realistic Bat Hitting Ball (The "Shot")
export const playHoverSound = () => {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    
    // 1. Priority: Play the real loaded sample if available
    if (batSoundBuffer) {
      const src = ctx.createBufferSource();
      src.buffer = batSoundBuffer;
      
      const gain = ctx.createGain();
      gain.gain.value = 0.3; // Adjust volume to not be startling
      
      src.connect(gain);
      gain.connect(ctx.destination);
      
      // Randomize playback rate slightly for realism (0.95 - 1.05)
      src.playbackRate.value = 0.95 + Math.random() * 0.1;
      
      src.start(0);
      return;
    }

    // 2. Fallback: Synthesized "Leather on Willow"
    const t = ctx.currentTime;
    const noise = getNoiseBuffer(ctx);
    
    // -- Component 1: The Wood Resonance (Thud) --
    const woodSource = ctx.createBufferSource();
    woodSource.buffer = noise;
    
    const woodFilter = ctx.createBiquadFilter();
    woodFilter.type = 'lowpass';
    woodFilter.frequency.setValueAtTime(600, t);
    woodFilter.frequency.exponentialRampToValueAtTime(100, t + 0.1);
    
    const woodGain = ctx.createGain();
    woodGain.gain.setValueAtTime(0.8, t);
    woodGain.gain.exponentialRampToValueAtTime(0.01, t + 0.15); // Short decay
    
    woodSource.connect(woodFilter);
    woodFilter.connect(woodGain);
    woodGain.connect(ctx.destination);
    
    // -- Component 2: The Leather Crack (Snap) --
    const crackSource = ctx.createBufferSource();
    crackSource.buffer = noise;
    
    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = 'bandpass';
    crackFilter.frequency.setValueAtTime(2500, t);
    crackFilter.Q.value = 1;
    
    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(0.3, t);
    crackGain.gain.exponentialRampToValueAtTime(0.01, t + 0.05); // Very fast decay
    
    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(ctx.destination);

    // Start sounds
    woodSource.start(t);
    woodSource.stop(t + 0.2);
    crackSource.start(t);
    crackSource.stop(t + 0.1);

  } catch (e) {
    // Ignore audio errors
  }
};

// Heavier "Drive" Sound for clicks
export const playClickSound = () => {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime;

    // Similar to hover but deeper and longer resonance
    const noise = getNoiseBuffer(ctx);
    
    const src = ctx.createBufferSource();
    src.buffer = noise;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(50, t + 0.2); // Deeper drop
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
    
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    src.start(t);
    src.stop(t + 0.3);

  } catch (e) {}
};

export const playStadiumAmbience = () => {};