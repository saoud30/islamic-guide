import { AudioLoader } from './audioLoader';
import { AudioState, AudioAction } from './audioStates';

export class AudioPlayer {
  private currentAudio: HTMLAudioElement | null = null;
  private loader: AudioLoader;
  private dispatch: React.Dispatch<AudioAction>;
  private retryAttempts: Map<string, number> = new Map();
  private maxRetries = 3;
  private retryDelay = 1000;
  private isPlaybackCancelled = false;

  constructor(dispatch: React.Dispatch<AudioAction>) {
    this.loader = new AudioLoader();
    this.dispatch = dispatch;
  }

  private async retry(url: string, attempts: number): Promise<HTMLAudioElement> {
    if (attempts >= this.maxRetries || this.isPlaybackCancelled) {
      throw new Error('Max retry attempts reached or playback cancelled');
    }

    await new Promise(resolve => setTimeout(resolve, this.retryDelay));
    return this.loader.loadAudio(url);
  }

  async play(url: string): Promise<void> {
    try {
      // Reset cancelled flag when starting new playback
      this.isPlaybackCancelled = false;
      
      this.dispatch({ type: 'LOAD_START' });
      
      let audio = await this.loader.loadAudio(url);
      let attempts = this.retryAttempts.get(url) || 0;

      while (attempts < this.maxRetries && !this.isPlaybackCancelled) {
        try {
          this.dispatch({ type: 'PLAY_START' });
          await audio.play();
          this.currentAudio = audio;
          this.dispatch({ type: 'PLAY_SUCCESS' });
          this.retryAttempts.delete(url);
          break;
        } catch (error) {
          // Ignore AbortError if playback was intentionally cancelled
          if (error.name === 'AbortError' && this.isPlaybackCancelled) {
            return;
          }

          attempts++;
          this.retryAttempts.set(url, attempts);
          
          if (attempts >= this.maxRetries || this.isPlaybackCancelled) {
            throw error;
          }
          
          audio = await this.retry(url, attempts);
        }
      }
    } catch (error) {
      // Only dispatch error if playback wasn't intentionally cancelled
      if (!this.isPlaybackCancelled) {
        this.dispatch({ 
          type: 'PLAY_ERROR', 
          error: `Failed to play audio: ${error.message}` 
        });
        throw error;
      }
    }
  }

  pause(): void {
    // Set cancelled flag before pausing
    this.isPlaybackCancelled = true;
    
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.dispatch({ type: 'PAUSE' });
    }
  }

  stop(): void {
    // Set cancelled flag before stopping
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