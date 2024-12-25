import { useReducer, useRef, useCallback } from 'react';
import { AudioController } from '../utils/audio/audioController';
import { audioReducer, initialAudioState } from '../utils/audio/audioReducer';
import type { AudioControls } from '../utils/audio/types';

export function useAudioPlayer(): AudioControls & { state: typeof initialAudioState } {
  const [state, dispatch] = useReducer(audioReducer, initialAudioState);
  const controllerRef = useRef<AudioController | null>(null);

  const getController = useCallback(() => {
    if (!controllerRef.current) {
      controllerRef.current = new AudioController(dispatch);
    }
    return controllerRef.current;
  }, []);

  const play = useCallback(async (url: string) => {
    const controller = getController();
    try {
      await controller.play(url);
    } catch (error) {
      console.error('Failed to play audio:', error);
      throw error;
    }
  }, [getController]);

  const pause = useCallback(() => {
    const controller = getController();
    controller.pause();
  }, [getController]);

  const stop = useCallback(() => {
    const controller = getController();
    controller.stop();
  }, [getController]);

  const cleanup = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.cleanup();
      controllerRef.current = null;
    }
  }, []);

  const setOnEnded = useCallback((callback: () => void) => {
    const controller = getController();
    controller.setOnEnded(callback);
  }, [getController]);

  return {
    state,
    play,
    pause,
    stop,
    cleanup,
    setOnEnded,
    dispatch
  };
}