export class AudioLoader {
  private cache: Map<string, HTMLAudioElement> = new Map();
  
  async loadAudio(url: string): Promise<HTMLAudioElement> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    const audio = new Audio();
    audio.preload = 'auto';
    
    try {
      audio.src = url;
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
        audio.load();
      });
      
      this.cache.set(url, audio);
      return audio;
    } catch (error) {
      throw new Error(`Failed to load audio: ${error.message}`);
    }
  }

  clearCache() {
    this.cache.forEach(audio => {
      audio.src = '';
      audio.remove();
    });
    this.cache.clear();
  }
}