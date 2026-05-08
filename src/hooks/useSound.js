import { useCallback } from 'react';

const audioCache = {};

const useSound = (url) => {
  const play = useCallback(
    (volume = 0.5) => {
      if (!audioCache[url]) {
        audioCache[url] = new Audio(url);
      }
      const audio = audioCache[url];
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    },
    [url],
  );

  return play;
};

export default useSound;
