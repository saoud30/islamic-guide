import { useCallback, useRef } from 'react';
import { useAudioPlayer } from './useAudioPlayer';
import { QuranAudioService, QuranAudioConfig } from '../utils/audio/quranAudioService';
import { AudioController } from '../utils/audio/audioController';

export function useQuranAudio(config?: QuranAudioConfig) {
  const { state, ...controls } = useAudioPlayer();
  const serviceRef = useRef<QuranAudioService | null>(null);

  const getService = useCallback(() => {
    if (!serviceRef.current) {
      const controller = new AudioController(controls.dispatch);
      serviceRef.current = new QuranAudioService(controller, config);
    }
    return serviceRef.current;
  }, [config, controls.dispatch]);

  const playAyah = useCallback(async (number: number) => {
    try {
      if (!number || number < 1) {
        throw new Error('Invalid ayah number');
      }
      const service = getService();
      await service.playAyah(number);
    } catch (error) {
      console.error('Failed to play ayah:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }, [getService]);

  const playSurah = useCallback(async (number: number) => {
    try {
      if (!number || number < 1) {
        throw new Error('Invalid surah number');
      }
      const service = getService();
      await service.playSurah(number);
    } catch (error) {
      console.error('Failed to play surah:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  }, [getService]);

  const pause = useCallback(() => {
    const service = getService();
    service.pause();
  }, [getService]);

  const stop = useCallback(() => {
    const service = getService();
    service.stop();
  }, [getService]);

  const setOnEnded = useCallback((callback: () => void) => {
    const service = getService();
    service.setOnEnded(callback);
  }, [getService]);

  return {
    state,
    playAyah,
    playSurah,
    pause,
    stop,
    setOnEnded
  };
}