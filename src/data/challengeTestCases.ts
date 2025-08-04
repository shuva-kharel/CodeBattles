import { TestCase } from "../services/codeExecutionService";

export const challengeTestCases: Record<string, TestCase[]> = {
  "1": [
    // FizzBuzz Fury
    {
      input: "15",
      expectedOutput:
        "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
      description: "Basic FizzBuzz test with n=15",
    },
    {
      input: "5",
      expectedOutput: "1\n2\nFizz\n4\nBuzz",
      description: "Small test case with n=5",
    },
    {
      input: "3",
      expectedOutput: "1\n2\nFizz",
      description: "Edge case with n=3",
    },
  ],
  "2": [
    // Palindrome Clash
    {
      input: "racecar",
      expectedOutput: "true",
      description: "Classic palindrome",
    },
    {
      input: "hello",
      expectedOutput: "false",
      description: "Non-palindrome",
    },
    {
      input: "A man a plan a canal Panama",
      expectedOutput: "true",
      description: "Palindrome with spaces and mixed case",
    },
    {
      input: "race a car",
      expectedOutput: "false",
      description: "Non-palindrome with spaces",
    },
  ],
  "3": [
    // Array Duel (Two Sum)
    {
      input: "2 7 11 15\n9",
      expectedOutput: "0 1",
      description: "Basic two sum test",
    },
    {
      input: "3 2 4\n6",
      expectedOutput: "1 2",
      description: "Two sum with different indices",
    },
    {
      input: "3 3\n6",
      expectedOutput: "0 1",
      description: "Two sum with duplicate values",
    },
  ],
  "4": [
    // Binary Battle
    {
      input: "10",
      expectedOutput: "1010",
      description: "Convert 10 to binary",
    },
    {
      input: "255",
      expectedOutput: "11111111",
      description: "Convert 255 to binary",
    },
    {
      input: "1",
      expectedOutput: "1",
      description: "Convert 1 to binary",
    },
    {
      input: "0",
      expectedOutput: "0",
      description: "Convert 0 to binary",
    },
  ],
  "5": [
    // Stack Storm (Valid Parentheses)
    {
      input: "()[]{}",
      expectedOutput: "true",
      description: "Valid parentheses combination",
    },
    {
      input: "([)]",
      expectedOutput: "false",
      description: "Invalid parentheses order",
    },
    {
      input: "{[]}",
      expectedOutput: "true",
      description: "Nested valid parentheses",
    },
    {
      input: "(((",
      expectedOutput: "false",
      description: "Unmatched opening brackets",
    },
  ],
  "6": [
    // Fibonacci Frenzy
    {
      input: "7",
      expectedOutput: "0 1 1 2 3 5 8",
      description: "First 7 Fibonacci numbers",
    },
    {
      input: "1",
      expectedOutput: "0",
      description: "First Fibonacci number",
    },
    {
      input: "2",
      expectedOutput: "0 1",
      description: "First 2 Fibonacci numbers",
    },
    {
      input: "10",
      expectedOutput: "0 1 1 2 3 5 8 13 21 34",
      description: "First 10 Fibonacci numbers",
    },
  ],
};

// Code templates for different languages
// export const codeTemplates = {
//   python: {
//     "1": `# FizzBuzz Challenge
// n = int(input())
// for i in range(1, n + 1):
//     if i % 15 == 0:
//         print("FizzBuzz")
//     elif i % 3 == 0:
//         print("Fizz")
//     elif i % 5 == 0:
//         print("Buzz")
//     else:
//         print(i)`,

//     "2": `# Palindrome Challenge
// def is_palindrome(s):
//     # Remove spaces and convert to lowercase
//     cleaned = ''.join(s.split()).lower()
//     return cleaned == cleaned[::-1]

// s = input().strip()
// result = is_palindrome(s)
// print(str(result).lower())`,

//     "3": `# Two Sum Challenge
// nums = list(map(int, input().split()))
// target = int(input())

// def two_sum(nums, target):
//     num_map = {}
//     for i, num in enumerate(nums):
//         complement = target - num
//         if complement in num_map:
//             return [num_map[complement], i]
//         num_map[num] = i
//     return []

// result = two_sum(nums, target)
// print(result[0], result[1])`,

//     "4": `# Binary Conversion Challenge
// n = int(input())

// def decimal_to_binary(n):
//     if n == 0:
//         return "0"
//     binary = ""
//     while n > 0:
//         binary = str(n % 2) + binary
//         n = n // 2
//     return binary

// result = decimal_to_binary(n)
// print(result)`,

//     "5": `# Valid Parentheses Challenge
// s = input().strip()

// def is_valid(s):
//     stack = []
//     mapping = {')': '(', '}': '{', ']': '['}

//     for char in s:
//         if char in mapping:
//             if not stack or stack.pop() != mapping[char]:
//                 return False
//         else:
//             stack.append(char)

//     return len(stack) == 0

// result = is_valid(s)
// print(str(result).lower())`,

//     "6": `# Fibonacci Challenge
// n = int(input())

// def fibonacci(n):
//     if n <= 0:
//         return []
//     elif n == 1:
//         return [0]
//     elif n == 2:
//         return [0, 1]

//     fib = [0, 1]
//     for i in range(2, n):
//         fib.append(fib[i-1] + fib[i-2])

//     return fib

// result = fibonacci(n)
// print(' '.join(map(str, result)))`,
//   },

//   javascript: {
//     "1": `// FizzBuzz Challenge
// const n = parseInt(require('fs').readFileSync(0, 'utf8').trim());
// for (let i = 1; i <= n; i++) {
//     if (i % 15 === 0) {
//         console.log("FizzBuzz");
//     } else if (i % 3 === 0) {
//         console.log("Fizz");
//     } else if (i % 5 === 0) {
//         console.log("Buzz");
//     } else {
//         console.log(i);
//     }
// }`,

//     "2": `// Palindrome Challenge
// const input = require('fs').readFileSync(0, 'utf8').trim();

// function isPalindrome(s) {
//     const cleaned = s.replace(/\s+/g, '').toLowerCase();
//     return cleaned === cleaned.split('').reverse().join('');
// }

// const result = isPalindrome(input);
// console.log(result.toString());`,

//     "3": `// Two Sum Challenge
// const lines = require('fs').readFileSync(0, 'utf8').trim().split('\n');
// const nums = lines[0].split(' ').map(Number);
// const target = parseInt(lines[1]);

// function twoSum(nums, target) {
//     const numMap = new Map();
//     for (let i = 0; i < nums.length; i++) {
//         const complement = target - nums[i];
//         if (numMap.has(complement)) {
//             return [numMap.get(complement), i];
//         }
//         numMap.set(nums[i], i);
//     }
//     return [];
// }

// const result = twoSum(nums, target);
// console.log(result[0], result[1]);`,

//     "4": `// Binary Conversion Challenge
// const n = parseInt(require('fs').readFileSync(0, 'utf8').trim());

// function decimalToBinary(n) {
//     if (n === 0) return "0";
//     let binary = "";
//     while (n > 0) {
//         binary = (n % 2) + binary;
//         n = Math.floor(n / 2);
//     }
//     return binary;
// }

// const result = decimalToBinary(n);
// console.log(result);`,

//     "5": `// Valid Parentheses Challenge
// const s = require('fs').readFileSync(0, 'utf8').trim();

// function isValid(s) {
//     const stack = [];
//     const mapping = { ')': '(', '}': '{', ']': '[' };

//     for (const char of s) {
//         if (char in mapping) {
//             if (stack.length === 0 || stack.pop() !== mapping[char]) {
//                 return false;
//             }
//         } else {
//             stack.push(char);
//         }
//     }

//     return stack.length === 0;
// }

// const result = isValid(s);
// console.log(result.toString());`,

//     "6": `// Fibonacci Challenge
// const n = parseInt(require('fs').readFileSync(0, 'utf8').trim());

// function fibonacci(n) {
//     if (n <= 0) return [];
//     if (n === 1) return [0];
//     if (n === 2) return [0, 1];

//     const fib = [0, 1];
//     for (let i = 2; i < n; i++) {
//         fib.push(fib[i-1] + fib[i-2]);
//     }

//     return fib;
// }

// const result = fibonacci(n);
// console.log(result.join(' '));`,
//   },

//   cpp: {
//     "1": `// FizzBuzz Challenge
// #include <iostream>
// using namespace std;

// int main() {
//     int n;
//     cin >> n;

//     for (int i = 1; i <= n; i++) {
//         if (i % 15 == 0) {
//             cout << "FizzBuzz" << endl;
//         } else if (i % 3 == 0) {
//             cout << "Fizz" << endl;
//         } else if (i % 5 == 0) {
//             cout << "Buzz" << endl;
//         } else {
//             cout << i << endl;
//         }
//     }

//     return 0;
// }`,

//     "2": `// Palindrome Challenge
// #include <iostream>
// #include <string>
// #include <algorithm>
// using namespace std;

// bool isPalindrome(string s) {
//     string cleaned = "";
//     for (char c : s) {
//         if (c != ' ') {
//             cleaned += tolower(c);
//         }
//     }
//     string reversed = cleaned;
//     reverse(reversed.begin(), reversed.end());
//     return cleaned == reversed;
// }

// int main() {
//     string s;
//     getline(cin, s);

//     bool result = isPalindrome(s);
//     cout << (result ? "true" : "false") << endl;

//     return 0;
// }`,

//     "3": `// Two Sum Challenge
// #include <iostream>
// #include <vector>
// #include <unordered_map>
// using namespace std;

// vector<int> twoSum(vector<int>& nums, int target) {
//     unordered_map<int, int> numMap;
//     for (int i = 0; i < nums.size(); i++) {
//         int complement = target - nums[i];
//         if (numMap.find(complement) != numMap.end()) {
//             return {numMap[complement], i};
//         }
//         numMap[nums[i]] = i;
//     }
//     return {};
// }

// int main() {
//     vector<int> nums;
//     int num;
//     string line;
//     getline(cin, line);

//     // Parse numbers from first line
//     size_t pos = 0;
//     while ((pos = line.find(' ')) != string::npos) {
//         nums.push_back(stoi(line.substr(0, pos)));
//         line.erase(0, pos + 1);
//     }
//     nums.push_back(stoi(line));

//     int target;
//     cin >> target;

//     vector<int> result = twoSum(nums, target);
//     cout << result[0] << " " << result[1] << endl;

//     return 0;
// }`,

//     "4": `// Binary Conversion Challenge
// #include <iostream>
// #include <string>
// using namespace std;

// string decimalToBinary(int n) {
//     if (n == 0) return "0";
//     string binary = "";
//     while (n > 0) {
//         binary = (char)('0' + n % 2) + binary;
//         n /= 2;
//     }
//     return binary;
// }

// int main() {
//     int n;
//     cin >> n;

//     string result = decimalToBinary(n);
//     cout << result << endl;

//     return 0;
// }`,

//     "5": `// Valid Parentheses Challenge
// #include <iostream>
// #include <stack>
// #include <string>
// #include <unordered_map>
// using namespace std;

// bool isValid(string s) {
//     stack<char> st;
//     unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};

//     for (char c : s) {
//         if (mapping.find(c) != mapping.end()) {
//             if (st.empty() || st.top() != mapping[c]) {
//                 return false;
//             }
//             st.pop();
//         } else {
//             st.push(c);
//         }
//     }

//     return st.empty();
// }

// int main() {
//     string s;
//     getline(cin, s);

//     bool result = isValid(s);
//     cout << (result ? "true" : "false") << endl;

//     return 0;
// }`,

//     "6": `// Fibonacci Challenge
// #include <iostream>
// #include <vector>
// using namespace std;

// vector<int> fibonacci(int n) {
//     if (n <= 0) return {};
//     if (n == 1) return {0};
//     if (n == 2) return {0, 1};

//     vector<int> fib = {0, 1};
//     for (int i = 2; i < n; i++) {
//         fib.push_back(fib[i-1] + fib[i-2]);
//     }

//     return fib;
// }

// int main() {
//     int n;
//     cin >> n;

//     vector<int> result = fibonacci(n);
//     for (int i = 0; i < result.size(); i++) {
//         if (i > 0) cout << " ";
//         cout << result[i];
//     }
//     cout << endl;

//     return 0;
// }`,
//   },
// };
