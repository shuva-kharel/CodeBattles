import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, Trophy, Users, Clock, Code } from 'lucide-react';
import { mockChallenges } from '../data/mockData';
import { useProgress } from '../hooks/useProgress';
import { Challenge } from '../types';
import ApiKeySetup from '../components/ApiKeySetup';

const Challenges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const { progress, toggleFavorite } = useProgress();

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredChallenges = useMemo(() => {
    return mockChallenges.filter(challenge => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
      const matchesFavorites = !showFavorites || progress.favoriteChallenges.includes(challenge.id);

      return matchesSearch && matchesDifficulty && matchesFavorites;
    });
  }, [searchTerm, selectedDifficulty, showFavorites, progress.favoriteChallenges]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  const completedCount = progress.completedChallenges.length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Coding <span className="bg-gradient-to-r from-purple-600 to-green-500 dark:from-purple-400 dark:to-green-400 bg-clip-text text-transparent">Challenges</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Test your skills, learn new concepts, and climb the leaderboard through hands-on coding battles.
          </p>

          {/* Progress Badge */}
          <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-900 dark:text-white">
              {completedCount}/{mockChallenges.length} Completed
            </span>
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full ml-2">
              <div
                className="h-2 bg-gradient-to-r from-purple-500 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / mockChallenges.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* API Setup Notice */}
        <div className="mb-8">
          <ApiKeySetup />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Difficulty:</span>
              </div>
              <div className="flex space-x-2">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedDifficulty === difficulty
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>

              {/* Favorites Toggle */}
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  showFavorites
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
                <span>Favorites</span>
              </button>
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No challenges found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <div key={challenge.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-6">
                  {/* Challenge Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                        {challenge.title}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                          <Trophy className="h-4 w-4" />
                          <span className="text-sm">{challenge.points} XP</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavorite(challenge.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      <Heart className={`h-5 w-5 ${progress.favoriteChallenges.includes(challenge.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors duration-200`} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {challenge.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {challenge.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.solverCount.toLocaleString()} solved</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>~25 min</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/challenge/${challenge.id}`}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    {progress.completedChallenges.includes(challenge.id) ? (
                      <>
                        <Trophy className="h-5 w-5" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Code className="h-5 w-5" />
                        <span>Start Challenge</span>
                      </>
                    )}
                  </Link>
                </div>

                {progress.completedChallenges.includes(challenge.id) && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-2 font-semibold">
                    ✅ Challenge Complete!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;