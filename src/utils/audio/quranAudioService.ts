import { AudioController } from './audioController';

export interface QuranAudioConfig {
  edition?: string;
  bitrate?: 32 | 40 | 48 | 64 | 128 | 192;
}

export class QuranAudioService {
  private controller: AudioController;
  private baseUrl = 'https://cdn.islamic.network/quran/audio';
  private config: QuranAudioConfig;

  constructor(controller: AudioController, config: QuranAudioConfig = {}) {
    this.controller = controller;
    this.config = {
      edition: config.edition || 'ar.alafasy',
      bitrate: config.bitrate || 64
    };
  }

  async playAyah(number: number): Promise<void> {
    if (!number || number < 1) {
      throw new Error('Invalid ayah number');
    }
    const url = this.getAyahAudioUrl(number);
    await this.controller.play(url);
  }

  async playSurah(number: number): Promise<void> {
    if (!number || number < 1) {
      throw new Error('Invalid surah number');
    }
    const url = this.getSurahAudioUrl(number);
    await this.controller.play(url);
  }

  pause(): void {
    this.controller.pause();
  }

  stop(): void {
    this.controller.stop();
  }

  setOnEnded(callback: () => void): void {
    this.controller.setOnEnded(callback);
  }

  private getAyahAudioUrl(number: number): string {
    return `${this.baseUrl}/${this.config.bitrate}/${this.config.edition}/${number}.mp3`;
  }

  private getSurahAudioUrl(number: number): string {
    return `${this.baseUrl}-surah/${this.config.bitrate}/${this.config.edition}/${number}.mp3`;
  }
}