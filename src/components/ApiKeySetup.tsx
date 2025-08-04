import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ApiKeySetup: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isValidKey, setIsValidKey] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('rapidapi-key');
    const envKey = import.meta.env.VITE_RAPIDAPI_KEY;
    
    if (savedKey) {
      setApiKey(savedKey);
      setIsValidKey(savedKey.length > 20); // Basic validation
    } else if (envKey && envKey !== 'your-rapidapi-key-here') {
      setIsValidKey(true);
    } else {
      setShowSetup(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.length > 20) {
      localStorage.setItem('rapidapi-key', apiKey);
      setIsValidKey(true);
      setShowSetup(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('rapidapi-key');
    setApiKey('');
    setIsValidKey(false);
    setShowSetup(true);
  };

  if (isValidKey && !showSetup) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Code execution is enabled
            </span>
          </div>
          <button
            onClick={() => setShowSetup(true)}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm underline"
          >
            Manage API Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Enable Real Code Execution
          </h3>
          <p className="text-blue-600 dark:text-blue-400 mb-4">
            To run and validate your code, you'll need a free RapidAPI key for the Judge0 service.
            This enables secure code execution in multiple programming languages.
          </p>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Setup:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  Visit{' '}
                  <a
                    href="https://rapidapi.com/judge0-official/api/judge0-ce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                  >
                    RapidAPI Judge0 CE <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>Sign up for a free account (if you don't have one)</li>
                <li>Subscribe to the Judge0 CE API (free tier: 50 requests/day)</li>
                <li>Copy your API key and paste it below</li>
              </ol>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300">
                RapidAPI Key:
              </label>
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your RapidAPI key..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSaveKey}
                  disabled={apiKey.length < 20}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Save
                </button>
              </div>
              {apiKey.length > 0 && apiKey.length < 20 && (
                <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">API key seems too short. Please check your key.</span>
                </div>
              )}
            </div>

            {isValidKey && (
              <div className="flex justify-between items-center pt-3 border-t border-blue-200 dark:border-blue-700">
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                  ✅ API key saved successfully!
                </span>
                <button
                  onClick={handleRemoveKey}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm underline"
                >
                  Remove Key
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              <strong>Note:</strong> Your API key is stored locally in your browser and never sent to our servers.
              It's only used to communicate directly with the Judge0 API for code execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;