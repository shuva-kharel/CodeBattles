import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Code, Trophy, Users, Zap } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 dark:from-purple-900 dark:via-gray-900 dark:to-green-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Sharpen your{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
                logic
              </span>
              <br />
              Rise through the{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                ranks
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Master coding fundamentals through competitive battles. Perfect for beginners ready to level up their programming skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/challenges"
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 flex items-center space-x-2"
              >
                <span>Start Battling</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/leaderboard"
                className="group border-2 border-purple-500 text-purple-300 hover:text-white hover:bg-purple-500 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Trophy className="h-5 w-5" />
                <span>View Rankings</span>
              </Link>
            </div>

            {/* Preview Card */}
            <div className="max-w-4xl mx-auto bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 shadow-2xl">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="flex items-center space-x-2 bg-gray-800 px-4 py-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">challenge.py</span>
                </div>
                <div className="p-6 text-left font-mono text-sm">
                  <div className="text-green-400">def <span className="text-blue-400">fizzbuzz</span>(<span className="text-orange-400">n</span>):</div>
                  <div className="text-gray-400 ml-4"># Your battleground awaits...</div>
                  <div className="text-purple-400 ml-4">for i in range(1, n + 1):</div>
                  <div className="text-gray-500 ml-8">pass</div>
                  <div className="mt-4 text-gray-400">
                    <span className="text-green-400">▶</span> Ready to code? Let's battle!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose CodeBattles?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We make learning to code engaging, competitive, and fun for beginners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-6">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Learn by Doing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice real coding problems with instant feedback and guidance designed for beginners.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Compete & Grow</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rise through the ranks, earn XP, and compete with other learners in a friendly environment.
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join the Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with fellow beginners, share solutions, and learn from each other's approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of beginners who are already improving their coding skills through our engaging challenges.
          </p>
          
          <Link
            to="/challenges"
            className="group inline-flex items-center bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Zap className="h-5 w-5 mr-2 group-hover:text-green-500 transition-colors duration-300" />
            Start Your First Battle
            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  )
};

export default Landing;