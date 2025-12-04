export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum Mood {
  FIRE = 'FIRE', // Highly productive
  NEUTRAL = 'NEUTRAL', // Normal
  TIRED = 'TIRED', // Low energy
  STRESSED = 'STRESSED' // Overwhelmed
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export interface DailyEntry {
  id: string;
  date: string; // ISO Date string YYYY-MM-DD
  tasks: Task[];
  notes: string;
  achievements?: string; // New field for positive reinforcements
  mood: Mood;
  aiSummary?: string;
  imageUrl?: string; // Base64 string for the uploaded photo
}

export const MOOD_EMOJIS: Record<Mood, string> = {
  [Mood.FIRE]: '🔥',
  [Mood.NEUTRAL]: '😐',
  [Mood.TIRED]: '😴',
  [Mood.STRESSED]: '🤯',
};

export const MOOD_LABELS: Record<Mood, string> = {
  [Mood.FIRE]: 'Ambis Membara',
  [Mood.NEUTRAL]: 'Biasa Aja',
  [Mood.TIRED]: 'Butuh Istirahat',
  [Mood.STRESSED]: 'Pening Kepala',
};