import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react';

export type SoundEffect =
  | 'book-hop'
  | 'window-open'
  | 'window-close'
  | 'cat-purr'
  | 'lamp-on'
  | 'lamp-off'
  | 'day-mode'
  | 'night-mode';

const SOUND_PATHS: Record<SoundEffect, string> = {
  'book-hop': '/sounds/book-hop.mp3',
  'window-open': '/sounds/window-open.mp3',
  'window-close': '/sounds/window-close.mp3',
  'cat-purr': '/sounds/cat-purr.mp3',
  'lamp-on': '/sounds/lamp-on.mp3',
  'lamp-off': '/sounds/lamp-off.mp3',
  'day-mode': '/sounds/day-mode.mp3',
  'night-mode': '/sounds/night-mode.mp3',
};

const MUTE_STORAGE_KEY = 'radhajoshi-muted';

interface SoundContextValue {
  playSound: (effect: SoundEffect, volume?: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
    } catch {
      // Ignore storage errors
    }
  }, [isMuted]);

  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!ctxRef.current) {
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, []);

  const playSynthFallback = useCallback(
    (effect: SoundEffect) => {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (effect === 'cat-purr') {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(1, now);
        masterGain.connect(ctx.destination);

        // 1) Option 2 two-beat triangle purr (0s -> 1.3s)
        const opt2Osc = ctx.createOscillator();
        const opt2Lfo = ctx.createOscillator();
        const opt2LfoGain = ctx.createGain();
        const opt2Gain = ctx.createGain();
        const opt2Filter = ctx.createBiquadFilter();

        opt2Osc.type = 'triangle';
        opt2Osc.frequency.setValueAtTime(30, now);
        opt2Osc.frequency.setValueAtTime(24, now + 0.65);

        opt2Lfo.type = 'sine';
        opt2Lfo.frequency.setValueAtTime(24, now);
        opt2LfoGain.gain.setValueAtTime(7, now);

        opt2Filter.type = 'lowpass';
        opt2Filter.frequency.setValueAtTime(110, now);

        opt2Gain.gain.setValueAtTime(0.001, now);
        opt2Gain.gain.linearRampToValueAtTime(0.26, now + 0.18);
        opt2Gain.gain.linearRampToValueAtTime(0.04, now + 0.6);
        opt2Gain.gain.linearRampToValueAtTime(0.24, now + 0.82);
        opt2Gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

        opt2Lfo.connect(opt2LfoGain);
        opt2LfoGain.connect(opt2Osc.frequency);
        opt2Osc.connect(opt2Filter);
        opt2Filter.connect(opt2Gain);
        opt2Gain.connect(masterGain);

        opt2Osc.start(now);
        opt2Lfo.start(now);
        opt2Osc.stop(now + 1.32);
        opt2Lfo.stop(now + 1.32);

        // 2) Original sawtooth purr right after (1.3s -> 2.5s)
        const origStart = now + 1.3;
        const origOsc = ctx.createOscillator();
        const origLfo = ctx.createOscillator();
        const origLfoGain = ctx.createGain();
        const origGain = ctx.createGain();
        const origFilter = ctx.createBiquadFilter();

        origOsc.type = 'sawtooth';
        origOsc.frequency.setValueAtTime(28, origStart);

        origLfo.type = 'sine';
        origLfo.frequency.setValueAtTime(18, origStart);
        origLfoGain.gain.setValueAtTime(8, origStart);

        origFilter.type = 'lowpass';
        origFilter.frequency.setValueAtTime(120, origStart);

        origGain.gain.setValueAtTime(0.001, origStart);
        origGain.gain.linearRampToValueAtTime(0.18, origStart + 0.2);
        origGain.gain.exponentialRampToValueAtTime(0.001, origStart + 1.2);

        origLfo.connect(origLfoGain);
        origLfoGain.connect(origOsc.frequency);
        origOsc.connect(origFilter);
        origFilter.connect(origGain);
        origGain.connect(masterGain);

        origOsc.start(origStart);
        origLfo.start(origStart);
        origOsc.stop(origStart + 1.25);
        origLfo.stop(origStart + 1.25);
        return;
      }

      if (effect === 'lamp-on' || effect === 'lamp-off') {
        const triggerWallClack = (
          offset: number,
          bodyFreq: number,
          shellFreq: number,
          gainLevel: number
        ) => {
          const t = now + offset;

          // 1) Hollow plastic faceplate resonance ("clack")
          const shellOsc = ctx.createOscillator();
          const shellGain = ctx.createGain();
          shellOsc.type = 'square';
          shellOsc.frequency.setValueAtTime(shellFreq, t);
          shellOsc.frequency.exponentialRampToValueAtTime(shellFreq * 0.45, t + 0.012);

          const shellFilter = ctx.createBiquadFilter();
          shellFilter.type = 'bandpass';
          shellFilter.frequency.setValueAtTime(1150, t);
          shellFilter.Q.setValueAtTime(2.5, t);

          shellGain.gain.setValueAtTime(gainLevel, t);
          shellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.014);

          shellOsc.connect(shellFilter);
          shellFilter.connect(shellGain);
          shellGain.connect(ctx.destination);
          shellOsc.start(t);
          shellOsc.stop(t + 0.016);

          // 2) Wall-box plastic thud
          const thudOsc = ctx.createOscillator();
          const thudGain = ctx.createGain();
          thudOsc.type = 'triangle';
          thudOsc.frequency.setValueAtTime(bodyFreq, t);
          thudOsc.frequency.exponentialRampToValueAtTime(95, t + 0.022);

          thudGain.gain.setValueAtTime(gainLevel * 0.85, t);
          thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

          thudOsc.connect(thudGain);
          thudGain.connect(ctx.destination);
          thudOsc.start(t);
          thudOsc.stop(t + 0.028);

          // 3) Crisp micro-impulse (no airy hiss)
          const bufLen = Math.floor(ctx.sampleRate * 0.004);
          const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
          const ch = buf.getChannelData(0);
          for (let i = 0; i < bufLen; i++) {
            ch[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
          }
          const imp = ctx.createBufferSource();
          imp.buffer = buf;

          const impFilter = ctx.createBiquadFilter();
          impFilter.type = 'bandpass';
          impFilter.frequency.setValueAtTime(1400, t);
          impFilter.Q.setValueAtTime(1.8, t);

          const impGain = ctx.createGain();
          impGain.gain.setValueAtTime(gainLevel * 0.7, t);
          impGain.gain.exponentialRampToValueAtTime(0.001, t + 0.005);

          imp.connect(impFilter);
          impFilter.connect(impGain);
          impGain.connect(ctx.destination);
          imp.start(t);
        };

        const pitchScale = effect === 'lamp-on' ? 1.06 : 0.94;
        triggerWallClack(0, 260 * pitchScale, 980 * pitchScale, 0.22);
        triggerWallClack(0.018, 340 * pitchScale, 1280 * pitchScale, 0.55);
        return;
      }

      if (effect === 'book-hop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.07);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.085);
        return;
      }

      if (effect === 'window-open') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.09);

        gain.gain.setValueAtTime(0.13, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
        return;
      }

      if (effect === 'day-mode') {
        // Warm, bright rising two-note morning chime (C5 -> G5)
        const notes = [523.25, 783.99];
        notes.forEach((freq, idx) => {
          const t = now + idx * 0.085;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.36);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.38);
        });
        return;
      }

      if (effect === 'night-mode') {
        // Airy, lingering descending evening chime (G5 -> C5)
        const notes = [
          { freq: 783.99, offset: 0, attack: 0.025, decay: 0.42 },
          { freq: 523.25, offset: 0.11, attack: 0.035, decay: 0.62 },
        ];

        notes.forEach(({ freq, offset, attack, decay }) => {
          const t = now + offset;
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2400, t);
          filter.frequency.exponentialRampToValueAtTime(750, t + decay);

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.linearRampToValueAtTime(0.16, t + attack);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + decay);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + decay + 0.02);
        });
        return;
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.09);

      gain.gain.setValueAtTime(0.13, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    },
    [getAudioContext]
  );

  const playSound = useCallback(
    (effect: SoundEffect, volume = 0.6) => {
      if (isMuted) return;

      const audio = new Audio(SOUND_PATHS[effect]);
      audio.volume = volume;
      audio.play().catch(() => {
        playSynthFallback(effect);
      });
    },
    [isMuted, playSynthFallback]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ playSound, isMuted, setIsMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSound must be used inside a SoundProvider');
  }
  return ctx;
}