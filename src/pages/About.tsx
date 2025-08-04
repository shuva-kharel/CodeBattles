import React from 'react';
import { Github, Mail, MessageCircle, Heart, Code, Users, Trophy, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-700 dark:from-purple-700 dark:to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <Zap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">CodeBattles</span>
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of developers through gamified learning and competitive programming challenges.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Helping new coders learn through battle. We believe coding should be engaging, 
              challenging, and most importantly, fun.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
            <div className="text-center mb-12">
              <blockquote className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                "Code. Fail. Learn. Repeat."
              </blockquote>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                CodeBattles transforms the traditional learning experience into an interactive journey. 
                We combine the excitement of gaming with the fundamentals of computer science, 
                creating an environment where beginners can thrive, make mistakes, and grow stronger with each challenge.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-4">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Logic First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Build problem-solving skills and computational thinking through hands-on practice.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Community</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn alongside peers, share solutions, and grow together in a supportive environment.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Achievement</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Track your progress, earn XP, and celebrate milestones as you master new concepts.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Passion</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Foster a genuine love for programming through engaging, well-crafted challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We've designed every aspect of CodeBattles with beginners in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Beginner-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every challenge is designed with clear explanations, examples, and progressive difficulty curves.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Multi-Language Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice in Python, JavaScript, or C++ - choose your preferred language or try them all.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Instant Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get immediate results and learn from mistakes with our interactive code execution environment.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your improvement with XP points, levels, and completion badges.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Competitive Rankings</h3>
              <p className="text-gray-600 dark:text-gray-300">
                See how you stack up against other learners and climb the global leaderboard.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mobile Responsive</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice coding anywhere, anytime with our fully responsive mobile experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Connect With Us</h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join our community, contribute to the project, or just say hello! We'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://github.com/codebattles"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>

              <a
                href="mailto:hello@codebattles.dev"
                className="group flex items-center space-x-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </a>

              <a
                href="https://discord.gg/codebattles"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Note */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Developer Note</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This is a frontend-only demonstration showcasing modern web development practices. 
              All progress, rankings, and user data are simulated using browser storage. 
              The platform is fully backend-ready and can be easily extended with Firebase, Supabase, 
              or any other backend service to support real user accounts, persistent data, and live competitions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;