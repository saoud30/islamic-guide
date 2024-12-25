import { AudioAction } from './types';
import { AudioLoader } from './audioLoader';

export class AudioController {
  private currentAudio: HTMLAudioElement | null = null;
  private loader: AudioLoader;
  private dispatch: React.Dispatch<AudioAction>;
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries: number;
  private retryDelay: number;
  private isPlaybackCancelled: boolean = false;
  private playbackPromise: Promise<void> | null = null;

  constructor(
    dispatch: React.Dispatch<AudioAction>,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ) {
    if (typeof dispatch !== 'function') {
      throw new Error('Dispatch must be a function');
    }
    this.loader = new AudioLoader();
    this.dispatch = dispatch;
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
  }

  async play(url: string): Promise<void> {
    if (!url) {
      throw new Error('URL is required');
    }

    // Cancel any existing playback
    await this.cancelExistingPlayback();

    try {
      this.isPlaybackCancelled = false;
      this.dispatch({ type: 'LOAD_START' });
      
      const audio = await this.loader.loadAudio(url);
      
      if (this.isPlaybackCancelled) return;

      this.dispatch({ type: 'PLAY_START' });
      this.currentAudio = audio;
      
      this.playbackPromise = audio.play();
      await this.playbackPromise;
      
      if (!this.isPlaybackCancelled) {
        this.dispatch({ type: 'PLAY_SUCCESS' });
      }
    } catch (error) {
      if (!this.isPlaybackCancelled) {
        const attempts = (this.retryAttempts.get(url) || 0) + 1;
        this.retryAttempts.set(url, attempts);

        if (attempts < this.maxRetries) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
          return this.play(url);
        }

        this.dispatch({
          type: 'PLAY_ERROR',
          error: error instanceof Error ? error.message : 'Failed to play audio'
        });
        throw error;
      }
    }
  }

  private async cancelExistingPlayback(): Promise<void> {
    this.isPlaybackCancelled = true;
    
    if (this.currentAudio && this.playbackPromise) {
      try {
        await this.playbackPromise;
        this.currentAudio.pause();
      } catch {
        // Ignore errors during cancellation
      }
    }
  }

  pause(): void {
    this.isPlaybackCancelled = true;
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.dispatch({ type: 'PAUSE' });
    }
  }

  stop(): void {
    this.isPlaybackCancelled = true;
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.dispatch({ type: 'STOP' });
    }
  }

  cleanup(): void {
    this.stop();
    this.loader.clearCache();
    this.currentAudio = null;
    this.retryAttempts.clear();
    this.isPlaybackCancelled = false;
    this.playbackPromise = null;
  }

  setOnEnded(callback: () => void): void {
    if (this.currentAudio) {
      this.currentAudio.onended = () => {
        if (!this.isPlaybackCancelled) {
          callback();
        }
      };
    }
  }
}