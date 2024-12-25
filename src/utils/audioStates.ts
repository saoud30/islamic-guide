export type AudioState = {
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
};

export type AudioAction = 
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS' }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'PLAY_START' }
  | { type: 'PLAY_SUCCESS' }
  | { type: 'PLAY_ERROR'; error: string }
  | { type: 'PAUSE' }
  | { type: 'STOP' };

export const initialAudioState: AudioState = {
  isLoading: false,
  isPlaying: false,
  error: null,
};

export function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null };
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false };
    case 'LOAD_ERROR':
      return { ...state, isLoading: false, error: action.error };
    case 'PLAY_START':
      return { ...state, isPlaying: true, error: null };
    case 'PLAY_SUCCESS':
      return { ...state, isPlaying: true };
    case 'PLAY_ERROR':
      return { ...state, isPlaying: false, error: action.error };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'STOP':
      return { ...state, isPlaying: false };
    default:
      return state;
  }
}