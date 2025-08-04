export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
  points: number;
  solverCount: number;
  tags: string[];
  isFavorited?: boolean;
  isCompleted?: boolean;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  points: number;
  rank: number;
  level: string;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface UserProgress {
  totalXP: number;
  level: number;
  completedChallenges: string[];
  favoriteChallenges: string[];
}

export type Theme = 'dark' | 'light';