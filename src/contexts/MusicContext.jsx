import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    if (!userPausedRef.current) {
      timeoutRef.current = setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 120000);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', handleEnded);

    audio.volume = 0.3;
    audio.play().catch(() => {
      document.addEventListener('click', () => audio.play(), { once: true });
    });

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleEnded]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      userPausedRef.current = false;
      audio.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      audio.pause();
    }
  }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, toggle }}>
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/background_music.mp3" type="audio/mpeg" />
      </audio>
      {children}
    </MusicContext.Provider>
  );
};
