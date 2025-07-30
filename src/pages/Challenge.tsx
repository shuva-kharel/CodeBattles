import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw, Send, Clock, Trophy, Zap } from 'lucide-react';
import { mockChallenges, mockCodeTemplates } from '../data/mockData';
import { useProgress } from '../hooks/useProgress';

const Challenge: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { progress, completeChallenge } = useProgress();
  
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'cpp'>('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const challenge = mockChallenges.find(c => c.id === id);
  const isCompleted = challenge && progress.completedChallenges.includes(challenge.id);

  useEffect(() => {
    if (challenge && mockCodeTemplates[selectedLanguage]) {
      setCode(mockCodeTemplates[selectedLanguage]);
    }
  }, [selectedLanguage, challenge]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge not found</h2>
          <Link to="/challenges" className="text-purple-600 dark:text-purple-400 hover:underline">
            ← Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running your code...\n');
    
    setTimeout(() => {
      const mockOutput = `>>> Running ${challenge.title}\n\n` +
        `Test Case 1: ✅ Passed\n` +
        `Input: ${challenge.examples[0].input}\n` +
        `Expected: ${challenge.examples[0].output}\n` +
        `Your Output: ${challenge.examples[0].output}\n\n` +
        `All test cases passed! 🎉\n` +
        `Execution time: 0.12ms\n` +
        `Memory usage: 2.1 MB`;
      
      setOutput(mockOutput);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!isCompleted) {
      completeChallenge(challenge.id, challenge.points);
      setIsSubmitted(true);
      setShowCelebration(true);
      
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleReset = () => {
    setCode(mockCodeTemplates[selectedLanguage]);
    setOutput('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Congratulations!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">You've successfully completed this challenge!</p>
            <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 font-semibold">
              <Trophy className="h-5 w-5" />
              <span>+{challenge.points} XP earned!</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/challenges')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Challenges</span>
            </button>
            
            <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
            
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h1>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
                  <Trophy className="h-4 w-4" />
                  <span>{challenge.points} XP</span>
                </div>
                {isCompleted && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold rounded">
                    ✅ Completed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className={`font-mono font-bold ${timeLeft < 300 ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-purple-700 dark:text-purple-300 font-semibold">Level {progress.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Problem Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Problem Description</h2>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {challenge.description}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Examples</h3>
                {challenge.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Input:</span>
                      <code className="ml-2 font-mono text-sm bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                        {example.input}
                      </code>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Output:</span>
                      <code className="ml-2 font-mono text-sm bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                        {example.output}
                      </code>
                    </div>
                  </div>
                ))}

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            {/* Language Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {['python', 'javascript', 'cpp'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang as any)}
                  className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    selectedLanguage === lang
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>

            {/* Code Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-64 font-mono text-sm bg-gray-900 text-green-400 p-4 rounded-lg border-none resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="// Start coding here..."
                  spellCheck={false}
                />
              </div>

              {/* Console Output */}
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Console Output</span>
                </div>
                <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm h-32 overflow-y-auto">
                  {output || 'Click "Run Code" to see output...'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-3">
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    <Play className="h-4 w-4" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isCompleted}
                  className={`flex items-center space-x-2 font-medium py-2 px-6 rounded-lg transition-colors duration-200 ${
                    isCompleted
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                >
                  <Send className="h-4 w-4" />
                  <span>{isCompleted ? 'Completed' : 'Submit Solution'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;