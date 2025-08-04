import React, { useState, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Send,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import {
  codeExecutionService,
  SupportedLanguage,
  TestCase,
  ExecutionResult,
} from "../services/codeExecutionService";

interface CodeEditorProps {
  challengeId: string;
  testCases: TestCase[];
  onSubmissionSuccess?: (result: ExecutionResult) => void;
  initialCode?: string;
  language?: SupportedLanguage;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  challengeId,
  testCases,
  onSubmissionSuccess,
  initialCode = "",
  language: initialLanguage = "python",
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(initialLanguage);
  const [code, setCode] = useState(initialCode);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] =
    useState<ExecutionResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [syntaxErrors, setSyntaxErrors] = useState<string[]>([]);

  const availableLanguages = codeExecutionService.getAvailableLanguages();

  useEffect(() => {
    // Validate syntax on code change (debounced)
    const timeoutId = setTimeout(() => {
      if (code.trim()) {
        const validation = codeExecutionService.validateSyntax(
          code,
          selectedLanguage
        );
        setSyntaxErrors(validation.errors);
      } else {
        setSyntaxErrors([]);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [code, selectedLanguage]);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    setExecutionResult(null);
    setShowResults(false);
    setSyntaxErrors([]);
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      alert("Please enter some code first");
      return;
    }

    if (syntaxErrors.length > 0) {
      alert("Please fix syntax errors before running");
      return;
    }

    setIsExecuting(true);
    setShowResults(false);

    try {
      const result = await codeExecutionService.executeCode(
        code,
        selectedLanguage,
        testCases
      );
      setExecutionResult(result);
      setShowResults(true);
    } catch (error) {
      console.error("Execution error:", error);
      setExecutionResult({
        status: "error",
        testCasesPassed: 0,
        totalTestCases: testCases.length,
        testResults: [],
        errorMessage:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      setShowResults(true);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = () => {
    if (
      executionResult &&
      executionResult.testCasesPassed === executionResult.totalTestCases
    ) {
      onSubmissionSuccess?.(executionResult);
    } else {
      alert("Please ensure all test cases pass before submitting");
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setExecutionResult(null);
    setShowResults(false);
    setSyntaxErrors([]);
  };

  const getStatusIcon = (status: ExecutionResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "compilation_error":
      case "runtime_error":
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "timeout":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: ExecutionResult["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200";
      case "compilation_error":
      case "runtime_error":
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      case "timeout":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full">
      {/* Language Selector */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Language:
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) =>
              handleLanguageChange(e.target.value as SupportedLanguage)
            }
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.key} value={lang.key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Syntax Errors */}
        {syntaxErrors.length > 0 && (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              {syntaxErrors.length} syntax error(s)
            </span>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full font-mono text-sm bg-gray-900 text-green-400 p-4 rounded-lg border-none resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder={`// Write your ${selectedLanguage} code here...`}
            spellCheck={false}
          />
        </div>

        {/* Syntax Errors Display */}
        {syntaxErrors.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 bg-red-50 dark:bg-red-900/20 p-4">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
              Syntax Errors:
            </h4>
            <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
              {syntaxErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Execution Results */}
        <div className="overflow-y-auto max-h-[400px]">
          {showResults && executionResult && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <div className="mb-4">
                <div
                  className={`flex items-center space-x-2 p-3 rounded-lg border ${getStatusColor(
                    executionResult.status
                  )}`}
                >
                  {getStatusIcon(executionResult.status)}
                  <div>
                    <div className="font-semibold">
                      {executionResult.testCasesPassed}/
                      {executionResult.totalTestCases} test cases passed
                    </div>
                    {executionResult.executionTime && (
                      <div className="text-sm opacity-75">
                        Execution time:{" "}
                        {executionResult.executionTime.toFixed(3)}s
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Compilation/Runtime Errors */}
              {(executionResult.compilationError ||
                executionResult.errorMessage) && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                    Error:
                  </h4>
                  <pre className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap">
                    {executionResult.compilationError ||
                      executionResult.errorMessage}
                  </pre>
                </div>
              )}

              {/* Test Case Results */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Test Case Results:
                </h4>
                {executionResult.testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      result.passed
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium">Test Case {index + 1}</span>
                      {result.executionTime && (
                        <span className="text-sm text-gray-500">
                          ({result.executionTime.toFixed(3)}s)
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">
                          Input:
                        </div>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                          {result.input || "(no input)"}
                        </pre>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">
                          Expected:
                        </div>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                          {result.expectedOutput}
                        </pre>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 dark:text-gray-300">
                          Your Output:
                        </div>
                        <pre
                          className={`p-2 rounded whitespace-pre-wrap ${
                            result.passed
                              ? "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100"
                              : "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100"
                          }`}
                        >
                          {result.actualOutput || "(no output)"}
                        </pre>
                      </div>
                    </div>

                    {result.errorMessage && (
                      <div className="mt-2">
                        <div className="font-medium text-red-700 dark:text-red-300">
                          Error:
                        </div>
                        <pre className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-red-900 dark:text-red-100 text-sm whitespace-pre-wrap">
                          {result.errorMessage}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <button
              onClick={handleRunCode}
              disabled={isExecuting || syntaxErrors.length > 0}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {isExecuting ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>{isExecuting ? "Running..." : "Run Code"}</span>
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
            disabled={
              !executionResult ||
              executionResult.testCasesPassed !== executionResult.totalTestCases
            }
            className={`flex items-center space-x-2 font-medium py-2 px-6 rounded-lg transition-colors duration-200 ${
              executionResult &&
              executionResult.testCasesPassed === executionResult.totalTestCases
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            <Send className="h-4 w-4" />
            <span>Submit Solution</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
