import axios from "axios";

// Judge0 API configuration
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY =
  import.meta.env.VITE_RAPIDAPI_KEY || "your-rapidapi-key-here";

// Language IDs for Judge0 API
export const SUPPORTED_LANGUAGES = {
  python: { id: 71, name: "Python 3.8.1", extension: "py" },
  javascript: { id: 63, name: "JavaScript (Node.js 12.14.0)", extension: "js" },
  cpp: { id: 54, name: "C++ (GCC 9.2.0)", extension: "cpp" },
  java: { id: 62, name: "Java (OpenJDK 13.0.1)", extension: "java" },
  c: { id: 50, name: "C (GCC 9.2.0)", extension: "c" },
  csharp: { id: 51, name: "C# (Mono 6.6.0.161)", extension: "cs" },
  go: { id: 60, name: "Go (1.13.5)", extension: "go" },
  rust: { id: 73, name: "Rust (1.40.0)", extension: "rs" },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface ExecutionResult {
  status:
    | "success"
    | "error"
    | "timeout"
    | "compilation_error"
    | "runtime_error";
  output?: string;
  expectedOutput?: string;
  executionTime?: number;
  memoryUsage?: number;
  errorMessage?: string;
  compilationError?: string;
  testCasesPassed: number;
  totalTestCases: number;
  testResults: TestCaseResult[];
}

export interface TestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  executionTime?: number;
  errorMessage?: string;
}

export interface SubmissionResponse {
  token: string;
}

export interface SubmissionStatus {
  status: {
    id: number;
    description: string;
  };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  time?: string;
  memory?: number;
  token: string;
}

class CodeExecutionService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = RAPIDAPI_KEY;
    this.baseURL = JUDGE0_API_URL;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": this.apiKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    };
  }

  /**
   * Submit code for execution
   */
  private async submitCode(
    sourceCode: string,
    languageId: number,
    stdin?: string
  ): Promise<string> {
    try {
      const response = await axios.post<SubmissionResponse>(
        `${this.baseURL}/submissions`,
        {
          source_code: btoa(sourceCode), // Base64 encode
          language_id: languageId,
          stdin: stdin ? btoa(stdin) : undefined,
          cpu_time_limit: 2, // 2 seconds
          memory_limit: 128000, // 128MB
          wall_time_limit: 5, // 5 seconds
          max_processes_and_or_threads: 60,
          enable_per_process_and_thread_time_limit: false,
          enable_per_process_and_thread_memory_limit: false,
          max_file_size: 1024, // 1KB
        },
        {
          headers: this.getHeaders(),
          params: {
            base64_encoded: "true",
            wait: "false",
          },
        }
      );

      return response.data.token;
    } catch (error) {
      console.error("Error submitting code:", error);
      throw new Error("Failed to submit code for execution");
    }
  }

  /**
   * Get submission status and results
   */
  private async getSubmissionStatus(token: string): Promise<SubmissionStatus> {
    try {
      const response = await axios.get<SubmissionStatus>(
        `${this.baseURL}/submissions/${token}`,
        {
          headers: this.getHeaders(),
          params: {
            base64_encoded: "true",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error getting submission status:", error);
      throw new Error("Failed to get submission status");
    }
  }

  /**
   * Wait for submission to complete
   */
  private async waitForCompletion(
    token: string,
    maxAttempts = 30
  ): Promise<SubmissionStatus> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.getSubmissionStatus(token);

      // Status IDs: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 5=Time Limit Exceeded, etc.
      if (status.status.id > 2) {
        return status;
      }

      // Wait 1 second before next attempt
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    throw new Error("Execution timeout - submission took too long to complete");
  }

  /**
   * Execute code against a single test case
   */
  private async executeTestCase(
    sourceCode: string,
    language: SupportedLanguage,
    testCase: TestCase
  ): Promise<TestCaseResult> {
    const languageConfig = SUPPORTED_LANGUAGES[language];

    try {
      // Submit code for execution
      const token = await this.submitCode(
        sourceCode,
        languageConfig.id,
        testCase.input
      );

      // Wait for completion
      const result = await this.waitForCompletion(token);

      // Decode base64 outputs
      const actualOutput = result.stdout ? atob(result.stdout).trim() : "";
      const errorOutput = result.stderr ? atob(result.stderr).trim() : "";
      const compileOutput = result.compile_output
        ? atob(result.compile_output).trim()
        : "";

      const expectedOutput = testCase.expectedOutput.trim();
      const passed = actualOutput === expectedOutput;

      return {
        input: testCase.input,
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
        passed: passed,
        executionTime: result.time ? parseFloat(result.time) : undefined,
        errorMessage: errorOutput || compileOutput || undefined,
      };
    } catch (error) {
      return {
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: "",
        passed: false,
        errorMessage:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Execute code against multiple test cases
   */
  async executeCode(
    sourceCode: string,
    language: SupportedLanguage,
    testCases: TestCase[]
  ): Promise<ExecutionResult> {
    if (!SUPPORTED_LANGUAGES[language]) {
      throw new Error(`Unsupported language: ${language}`);
    }

    if (!this.apiKey || this.apiKey === "your-rapidapi-key-here") {
      throw new Error(
        "RapidAPI key not configured. Please set VITE_RAPIDAPI_KEY environment variable."
      );
    }

    const testResults: TestCaseResult[] = [];
    let totalExecutionTime = 0;
    let hasCompilationError = false;
    let hasRuntimeError = false;
    let compilationErrorMessage = "";

    // Execute each test case
    for (const testCase of testCases) {
      const result = await this.executeTestCase(sourceCode, language, testCase);
      testResults.push(result);

      if (result.executionTime) {
        totalExecutionTime += result.executionTime;
      }

      if (result.errorMessage) {
        if (
          result.errorMessage.includes("compilation") ||
          result.errorMessage.includes("syntax")
        ) {
          hasCompilationError = true;
          compilationErrorMessage = result.errorMessage;
          break; // Stop on compilation error
        } else {
          hasRuntimeError = true;
        }
      }
    }

    const testCasesPassed = testResults.filter((r) => r.passed).length;
    const totalTestCases = testCases.length;

    // Determine overall status
    let status: ExecutionResult["status"] = "success";
    if (hasCompilationError) {
      status = "compilation_error";
    } else if (hasRuntimeError) {
      status = "runtime_error";
    } else if (testCasesPassed === 0) {
      status = "error";
    }

    return {
      status,
      testCasesPassed,
      totalTestCases,
      testResults,
      executionTime: totalExecutionTime,
      compilationError: hasCompilationError
        ? compilationErrorMessage
        : undefined,
      errorMessage: hasRuntimeError
        ? "Runtime error occurred during execution"
        : undefined,
    };
  }

  /**
   * Get available languages
   */
  getAvailableLanguages(): Array<{
    key: SupportedLanguage;
    name: string;
    extension: string;
  }> {
    return Object.entries(SUPPORTED_LANGUAGES).map(([key, config]) => ({
      key: key as SupportedLanguage,
      name: config.name,
      extension: config.extension,
    }));
  }

  /**
   * Validate code syntax without execution (basic check)
   */
  validateSyntax(
    sourceCode: string,
    language: SupportedLanguage
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic syntax validation
    if (!sourceCode.trim()) {
      errors.push("Code cannot be empty");
    }

    // Language-specific basic checks
    switch (language) {
      case "python":
        if (
          sourceCode.includes("import os") ||
          sourceCode.includes("import subprocess")
        ) {
          errors.push("System imports are not allowed for security reasons");
        }
        break;
      case "javascript":
        if (sourceCode.includes("require(") && sourceCode.includes("fs")) {
          errors.push("File system access is not allowed");
        }
        break;
      case "cpp":
      case "c":
        if (
          sourceCode.includes("#include <fstream>") ||
          sourceCode.includes("#include <filesystem>")
        ) {
          errors.push("File system headers are not allowed");
        }
        break;
    }

    // Check for potentially dangerous patterns
    const dangerousPatterns = [
      /system\s*\(/,
      /exec\s*\(/,
      /eval\s*\(/,
      /setTimeout\s*\(/,
      /setInterval\s*\(/,
    ];

    dangerousPatterns.forEach((pattern) => {
      if (pattern.test(sourceCode)) {
        errors.push("Potentially unsafe code detected");
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export const codeExecutionService = new CodeExecutionService();
