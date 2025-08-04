import axios from "axios";

// Piston API configuration
const PISTON_API_URL =
  import.meta.env.VITE_PISTON_API_URL || "https://emkc.org/api/v2/piston";

// Language mappings for Piston API
export const SUPPORTED_LANGUAGES = {
  python: {
    name: "python",
    version: "3.10.0",
    extension: "py",
    runtime: "python",
  },
  javascript: {
    name: "javascript",
    version: "18.15.0",
    extension: "js",
    runtime: "node",
  },
  cpp: {
    name: "cpp",
    version: "10.2.0",
    extension: "cpp",
    runtime: "gcc",
  },
  java: {
    name: "java",
    version: "15.0.2",
    extension: "java",
    runtime: "java",
  },
  c: {
    name: "c",
    version: "10.2.0",
    extension: "c",
    runtime: "gcc",
  },
  csharp: {
    name: "csharp",
    version: "6.12.0",
    extension: "cs",
    runtime: "dotnet",
  },
  go: {
    name: "go",
    version: "1.16.2",
    extension: "go",
    runtime: "go",
  },
  rust: {
    name: "rust",
    version: "1.68.2",
    extension: "rs",
    runtime: "rust",
  },
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

class CodeExecutionService {
  private baseURL: string;

  constructor() {
    this.baseURL = PISTON_API_URL;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  /**
   * Execute code against a single test case using Piston
   */
  private async executeTestCase(
    sourceCode: string,
    language: SupportedLanguage,
    testCase: TestCase
  ): Promise<TestCaseResult> {
    const languageConfig = SUPPORTED_LANGUAGES[language];
    const startTime = performance.now();

    try {
      const response = await axios.post(
        `${this.baseURL}/execute`,
        {
          language: languageConfig.name,
          version: languageConfig.version,
          files: [
            {
              name: `main.${languageConfig.extension}`,
              content: sourceCode,
            },
          ],
          stdin: testCase.input,
          args: [],
          compile_timeout: 5000,
          run_timeout: 3000,
        },
        {
          headers: this.getHeaders(),
        }
      );

      const result = response.data;
      const executionTime = performance.now() - startTime;

      const actualOutput = result.run.stdout?.trim() || "";
      const errorOutput = result.run.stderr?.trim() || "";
      const compileOutput = result.compile?.stderr?.trim() || "";

      const expectedOutput = testCase.expectedOutput.trim();
      const passed = actualOutput === expectedOutput;

      return {
        input: testCase.input,
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
        passed: passed,
        executionTime: executionTime,
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

    const testResults: TestCaseResult[] = [];
    let totalExecutionTime = 0;
    let hasCompilationError = false;
    let hasRuntimeError = false;
    let compilationErrorMessage = "";

    for (const testCase of testCases) {
      const result = await this.executeTestCase(sourceCode, language, testCase);
      testResults.push(result);

      if (result.executionTime) {
        totalExecutionTime += result.executionTime;
      }

      if (result.errorMessage) {
        if (
          result.errorMessage.includes("compilation") ||
          result.errorMessage.includes("syntax") ||
          result.errorMessage.includes("compile")
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
   * Validate code syntax without execution
   */
  validateSyntax(
    sourceCode: string,
    language: SupportedLanguage
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!sourceCode.trim()) {
      errors.push("Code cannot be empty");
    }

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
