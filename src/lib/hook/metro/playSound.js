import { useRef, useState, useCallback, useEffect } from "react";
import SectionSoundManager from "../../audio/sectionSoundManager";

function usePlaySound(speed, beats, waveType) {
  const [playing, setPlaying] = useState(false);
  const soundManagerRef = useRef(null);
  useEffect(() => {
    if (!soundManagerRef.current) {
      soundManagerRef.current = new SectionSoundManager();
    }
  }, []);

  const play = useCallback(() => {
    const soundManager = soundManagerRef.current;
    soundManager.play();
    setPlaying(soundManager.playing);
  }, []);

  useEffect(() => {
    const soundManager = soundManagerRef.current;
    soundManager.updateConfig(speed, beats, waveType);
  }, [speed, beats, waveType]);

  const stop = useCallback(() => {
    const soundManager = soundManagerRef.current;
    soundManager.stop();
    soundManager.onBeatChange = null;
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      return;
    }
    play();
  }, [play, stop, playing]);

  return { play, playing, stop, toggle };
}

export default usePlaySound;
