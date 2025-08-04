import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  totalXP: 0,
  level: 1,
  completedChallenges: [],
  favoriteChallenges: []
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem('codebattles-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('codebattles-progress', JSON.stringify(newProgress));
  };

  const addXP = (xp: number) => {
    const newProgress = {
      ...progress,
      totalXP: progress.totalXP + xp,
      level: Math.floor((progress.totalXP + xp) / 500) + 1
    };
    saveProgress(newProgress);
  };

  const completeChallenge = (challengeId: string, xp: number) => {
    if (!progress.completedChallenges.includes(challengeId)) {
      const newProgress = {
        ...progress,
        completedChallenges: [...progress.completedChallenges, challengeId],
        totalXP: progress.totalXP + xp,
        level: Math.floor((progress.totalXP + xp) / 500) + 1
      };
      saveProgress(newProgress);
    }
  };

  const toggleFavorite = (challengeId: string) => {
    const newFavorites = progress.favoriteChallenges.includes(challengeId)
      ? progress.favoriteChallenges.filter(id => id !== challengeId)
      : [...progress.favoriteChallenges, challengeId];
    
    saveProgress({
      ...progress,
      favoriteChallenges: newFavorites
    });
  };

  return {
    progress,
    addXP,
    completeChallenge,
    toggleFavorite
  };
};