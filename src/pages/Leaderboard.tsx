import React, { useState, useMemo } from 'react';
import { Search, Trophy, Crown, Medal, Star, Info } from 'lucide-react';
import { mockLeaderboard } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'top10' | 'top50' | 'myrank'>('top10');

  const filteredUsers = useMemo(() => {
    let users = [...mockLeaderboard].sort((a, b) => b.points - a.points);
    
    // Apply search filter
    if (searchTerm) {
      users = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply view mode filter
    switch (viewMode) {
      case 'top10':
        return users.slice(0, 10);
      case 'top50':
        return users.slice(0, 50);
      case 'myrank':
        const currentUser = users.find(u => u.isCurrentUser);
        if (currentUser) {
          const userRank = currentUser.rank;
          const start = Math.max(0, userRank - 6);
          const end = Math.min(users.length, userRank + 5);
          return users.slice(start, end);
        }
        return users.slice(0, 10);
      default:
        return users;
    }
  }, [searchTerm, viewMode]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500 dark:text-gray-400">#{rank}</span>;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Grandmaster':
        return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'Expert':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'Advanced':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-green-500 dark:from-purple-400 dark:to-green-400 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            See how you rank against other code warriors. Climb the ladder by completing more challenges!
          </p>
          
          {/* Simulation Notice */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 text-blue-700 dark:text-blue-300">
            <Info className="h-5 w-5" />
            <span className="text-sm font-medium">⚠️ Leaderboard uses simulated data. Your rank is tracked locally.</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex space-x-2">
              {[
                { key: 'top10', label: 'Top 10' },
                { key: 'top50', label: 'Top 50' },
                { key: 'myrank', label: 'My Rank' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setViewMode(key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    viewMode === key
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {viewMode === 'top10' && !searchTerm && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {filteredUsers.slice(0, 3).map((user, index) => (
              <div key={user.id} className={`text-center ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-xl border-2 p-6 ${
                  index === 0 
                    ? 'border-yellow-400 dark:border-yellow-500 transform scale-105' 
                    : index === 1 
                    ? 'border-gray-400 dark:border-gray-500' 
                    : 'border-amber-600 dark:border-amber-500'
                } ${user.isCurrentUser ? 'ring-4 ring-purple-500 ring-opacity-50' : ''}`}>
                  {index === 0 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      👑 Champion
                    </div>
                  )}
                  
                  <div className="relative mb-4">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-700 shadow-lg"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      {getRankIcon(user.rank)}
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 ${user.isCurrentUser ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'}`}>
                    {user.username}
                    {user.isCurrentUser && <span className="text-sm font-normal"> (You)</span>}
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{user.points.toLocaleString()}</span>
                  </div>
                  
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(user.level)}`}>
                    {user.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                      user.isCurrentUser 
                        ? 'bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500 ring-opacity-30' 
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                        />
                        <div>
                          <div className={`font-medium ${user.isCurrentUser ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'}`}>
                            {user.username}
                            {user.isCurrentUser && (
                              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                                <Star className="h-3 w-3 mr-1" />
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(user.level)}`}>
                        {user.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-gray-900 dark:text-white">{user.points.toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No users found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria.</p>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> This is a frontend-only demo. All progress and rankings are simulated using browser storage. 
            Fully backend-ready via Firebase or Supabase if expanded.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;