import { useCallback } from 'react';

export class AudioManager {
  private audioElements: HTMLAudioElement[] = [];
  private currentIndex: number = 0;
  private retryAttempts: { [key: number]: number } = {};
  private maxRetries = 3;
  private isPlaybackCancelled = false;

  constructor(audioUrls: string[]) {
    this.audioElements = audioUrls.map(url => {
      const audio = new Audio();
      audio.preload = 'none';
      audio.src = url;
      return audio;
    });
  }

  public async playAudio(index: number): Promise<void> {
    if (index < 0 || index >= this.audioElements.length) return;

    try {
      // Reset cancelled flag when starting new playback
      this.isPlaybackCancelled = false;
      
      const audio = this.audioElements[index];
      this.currentIndex = index;
      
      // Reset audio if it was previously played
      audio.currentTime = 0;
      
      // Load the audio first
      await audio.load();
      
      // Check if playback was cancelled during loading
      if (this.isPlaybackCancelled) {
        return;
      }
      
      // Attempt to play
      await audio.play();
      
      // Reset retry count on successful play
      this.retryAttempts[index] = 0;
    } catch (error) {
      // Ignore AbortError if playback was intentionally cancelled
      if (error.name === 'AbortError' && this.isPlaybackCancelled) {
        return;
      }

      console.error(`Error playing audio at index ${index}:`, error);
      
      // Initialize retry count if not exists
      if (!this.retryAttempts[index]) {
        this.retryAttempts[index] = 0;
      }
      
      // Retry logic
      if (this.retryAttempts[index] < this.maxRetries && !this.isPlaybackCancelled) {
        this.retryAttempts[index]++;
        console.log(`Retrying playback for index ${index}, attempt ${this.retryAttempts[index]}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        return this.playAudio(index);
      } else {
        // Move to next audio if max retries reached
        throw new Error('Max retries reached');
      }
    }
  }

  public pause(): void {
    // Set cancelled flag before pausing
    this.isPlaybackCancelled = true;
    
    if (this.currentIndex >= 0) {
      this.audioElements[this.currentIndex].pause();
    }
  }

  public stop(): void {
    // Set cancelled flag before stopping
    this.isPlaybackCancelled = true;
    
    this.audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  public cleanup(): void {
    this.stop();
    this.audioElements.forEach(audio => {
      audio.src = '';
      audio.remove();
    });
    this.audioElements = [];
    this.currentIndex = 0;
    this.retryAttempts = {};
    this.isPlaybackCancelled = false;
  }

  public setOnEndedCallback(callback: (index: number) => void): void {
    this.audioElements.forEach((audio, index) => {
      audio.onended = () => {
        if (!this.isPlaybackCancelled) {
          callback(index);
        }
      };
    });
  }
}

export const useAudioManager = (audioUrls: string[]) => {
  const createManager = useCallback(() => {
    return new AudioManager(audioUrls);
  }, [audioUrls]);

  return createManager;
};