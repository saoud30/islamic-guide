import { AudioCache } from './audioCache';

export class AudioLoader {
  private cache: AudioCache;
  
  constructor() {
    this.cache = new AudioCache();
  }

  async loadAudio(url: string): Promise<HTMLAudioElement> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    const audio = new Audio();
    audio.preload = 'auto';
    
    try {
      audio.src = url;
      await new Promise((resolve, reject) => {
        const loadHandler = () => {
          audio.removeEventListener('canplaythrough', loadHandler);
          audio.removeEventListener('error', errorHandler);
          resolve(undefined);
        };
        
        const errorHandler = (e: ErrorEvent) => {
          audio.removeEventListener('canplaythrough', loadHandler);
          audio.removeEventListener('error', errorHandler);
          reject(new Error(`Failed to load audio: ${e.message}`));
        };

        audio.addEventListener('canplaythrough', loadHandler, { once: true });
        audio.addEventListener('error', errorHandler, { once: true });
        audio.load();
      });
      
      this.cache.set(url, audio);
      return audio;
    } catch (error) {
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}