export class AudioCache {
  private cache: Map<string, HTMLAudioElement> = new Map();

  set(key: string, audio: HTMLAudioElement): void {
    this.cache.set(key, audio);
  }

  get(key: string): HTMLAudioElement | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.forEach(audio => {
      audio.src = '';
      audio.remove();
    });
    this.cache.clear();
  }
}