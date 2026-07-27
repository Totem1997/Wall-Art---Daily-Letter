// Web Audio API helper for zero-dependency calm sound effects and ambient noise

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a realistic gentle wax seal crack sound
export function playWaxSealCrackSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Low warm thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);

    // Subtle crisp snap / paper rustle
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now + 0.02);
  } catch {
    // Audio context play error handled silently
  }
}

// Soft paper slide sound
export function playPaperSlideSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(300, now + 0.25);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch {
    // Silently ignore
  }
}

// Ambient morning chime / sound generator
let ambientGainNode: GainNode | null = null;
let ambientOscs: OscillatorNode[] = [];

export function toggleAmbientSound(enable: boolean) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (!enable) {
      if (ambientGainNode) {
        ambientGainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        setTimeout(() => {
          ambientOscs.forEach(o => {
            try { o.stop(); } catch {}
          });
          ambientOscs = [];
          ambientGainNode = null;
        }, 1600);
      }
      return;
    }

    if (ambientGainNode) return; // Already playing

    ambientGainNode = ctx.createGain();
    ambientGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);

    // Warm pentatonic ambient triad (C, G, E)
    const freqs = [130.81, 196.00, 329.63, 392.00];
    ambientOscs = freqs.map((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      // Subtle LFO modulation for organic movement
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(ambientGainNode!);
      osc.start();
      return osc;
    });

    ambientGainNode.connect(ctx.destination);
  } catch {
    // Ignore error
  }
}
