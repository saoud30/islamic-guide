export interface AudioState {
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
}

export interface AudioConfig {
  maxRetries: number;
  retryDelay: number;
}

export type AudioAction = 
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS' }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'PLAY_START' }
  | { type: 'PLAY_SUCCESS' }
  | { type: 'PLAY_ERROR'; error: string }
  | { type: 'PAUSE' }
  | { type: 'STOP' };

export interface AudioControls {
  play: (url: string) => Promise<void>;
  pause: () => void;
  stop: () => void;
  cleanup: () => void;
  setOnEnded: (callback: () => void) => void;
  dispatch: React.Dispatch<AudioAction>;
}