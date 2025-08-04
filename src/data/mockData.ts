import { Challenge, LeaderboardUser } from '../types';

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'FizzBuzz Fury',
    difficulty: 'Easy',
    description: 'Write a program that prints numbers 1 to n, but for multiples of 3 print "Fizz" instead, for multiples of 5 print "Buzz", and for multiples of both 3 and 5 print "FizzBuzz".',
    examples: [
      { input: 'n = 15', output: '1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz' }
    ],
    points: 100,
    solverCount: 1234,
    tags: ['loops', 'conditionals', 'modulo']
  },
  {
    id: '2',
    title: 'Palindrome Clash',
    difficulty: 'Easy',
    description: 'Determine if a given string is a palindrome. A palindrome reads the same forwards and backwards.',
    examples: [
      { input: '"racecar"', output: 'true' },
      { input: '"hello"', output: 'false' }
    ],
    points: 120,
    solverCount: 987,
    tags: ['strings', 'two-pointers']
  },
  {
    id: '3',
    title: 'Array Duel',
    difficulty: 'Medium',
    description: 'Find the two numbers in an array that add up to a specific target sum.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }
    ],
    points: 250,
    solverCount: 654,
    tags: ['arrays', 'hash-map']
  },
  {
    id: '4',
    title: 'Binary Battle',
    difficulty: 'Medium',
    description: 'Convert a decimal number to its binary representation without using built-in functions.',
    examples: [
      { input: '10', output: '"1010"' },
      { input: '255', output: '"11111111"' }
    ],
    points: 200,
    solverCount: 543,
    tags: ['bit-manipulation', 'math']
  },
  {
    id: '5',
    title: 'Stack Storm',
    difficulty: 'Hard',
    description: 'Implement a valid parentheses checker using a stack data structure.',
    examples: [
      { input: '"()[]{}"', output: 'true' },
      { input: '"([)]"', output: 'false' }
    ],
    points: 400,
    solverCount: 321,
    tags: ['stack', 'validation']
  },
  {
    id: '6',
    title: 'Fibonacci Frenzy',
    difficulty: 'Easy',
    description: 'Generate the first n numbers in the Fibonacci sequence efficiently.',
    examples: [
      { input: 'n = 7', output: '[0,1,1,2,3,5,8]' }
    ],
    points: 150,
    solverCount: 876,
    tags: ['recursion', 'dynamic-programming']
  }
];

export const mockLeaderboard: LeaderboardUser[] = [
  {
    id: '1',
    username: 'CodeMaster2024',
    points: 2850,
    rank: 1,
    level: 'Grandmaster',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    username: 'AlgoNinja',
    points: 2650,
    rank: 2,
    level: 'Expert',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    username: 'ByteWarrior',
    points: 2400,
    rank: 3,
    level: 'Expert',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    username: 'You',
    points: 970,
    rank: 47,
    level: 'Intermediate',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    isCurrentUser: true
  },
  {
    id: '5',
    username: 'DebugDemon',
    points: 2200,
    rank: 4,
    level: 'Expert',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    username: 'LogicLord',
    points: 2050,
    rank: 5,
    level: 'Advanced',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    username: 'SyntaxSage',
    points: 1890,
    rank: 6,
    level: 'Advanced',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    username: 'RecursionRex',
    points: 1750,
    rank: 7,
    level: 'Advanced',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockCodeTemplates = {
  python: `def solve():
    # Your solution here
    pass

# Test your solution
result = solve()
print(result)`,
  javascript: `function solve() {
    // Your solution here
    
}

// Test your solution
const result = solve();
console.log(result);`,
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int solve() {
    // Your solution here
    return 0;
}

int main() {
    int result = solve();
    cout << result << endl;
    return 0;
}`
};