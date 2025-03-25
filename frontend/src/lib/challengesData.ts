export interface Challenge {
  _id: number;
  problem_header: string;
  problem_description: string;
  difficulty_level: 'low' | 'medium' | 'hard';
  tags?: string[];
  submissions?: number;
  defaultCode: string;
  test_cases: {
    input: unknown;
    expectedOutput: unknown;
    isHidden?: boolean;
  }[];
  timeLimit: number;
  best_time: number;
  best_author: unknown;
}

export interface LeaderboardEntry {
  id: number;
  username: string;
  score: number;
  rank: number;
  solvedChallenges: number;
  avatar?: string;
}

export interface ChallengeLeaderboardEntry {
  id: number;
  username: string;
  completionTime: string;
  rank: number;
  avatar?: string;
}

export const challenges = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    submissions: 458,
    initialCode: "def two_sum(nums, target):\n    # Your code here\n    pass",
    testCases: [
      {
        input: {
          nums: [2, 7, 11, 15],
          target: 9
        },
        expected: [0, 1]
      },
      {
        input: {
          nums: [3, 2, 4],
          target: 6
        },
        expected: [1, 2]
      },
      {
        input: {
          nums: [3, 3],
          target: 6
        },
        expected: [0, 1]
      }
    ]
  },
  {
    id: 2,
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise. A palindrome is a number that reads the same backward as forward.",
    difficulty: "Easy",
    tags: ["Math"],
    submissions: 326,
    initialCode: "def is_palindrome(x):\n    # Your code here\n    pass",
    testCases: [
      {
        input: 121,
        expected: true
      },
      {
        input: -121,
        expected: false
      },
      {
        input: 10,
        expected: false
      }
    ]
  },
  {
    id: 3,
    title: "Merge Sorted Array",
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order.",
    difficulty: "Easy",
    tags: ["Array", "Two Pointers", "Sorting"],
    submissions: 284,
    initialCode: "def merge(nums1, m, nums2, n):\n    # Your code here\n    pass",
    testCases: [
      {
        input: {
          nums1: [1, 2, 3, 0, 0, 0],
          m: 3,
          nums2: [2, 5, 6],
          n: 3
        },
        expected: [1, 2, 2, 3, 5, 6]
      },
      {
        input: {
          nums1: [1],
          m: 1,
          nums2: [],
          n: 0
        },
        expected: [1]
      }
    ]
  },
  {
    id: 4,
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
    difficulty: "Medium",
    tags: ["String", "Stack"],
    submissions: 378,
    initialCode: "def is_valid(s):\n    # Your code here\n    pass",
    testCases: [
      {
        input: "()",
        expected: true
      },
      {
        input: "()[]{}",
        expected: true
      },
      {
        input: "(]",
        expected: false
      }
    ]
  },
  {
    id: 5,
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    submissions: 245,
    initialCode: "def search(nums, target):\n    # Your code here\n    pass",
    testCases: [
      {
        input: {
          nums: [-1, 0, 3, 5, 9, 12],
          target: 9
        },
        expected: 4
      },
      {
        input: {
          nums: [-1, 0, 3, 5, 9, 12],
          target: 2
        },
        expected: -1
      }
    ]
  },
  {
    id: 6,
    title: "First Bad Version",
    description: "You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad. Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad. You are given an API bool isBadVersion(version) which returns whether version is bad.",
    difficulty: "Easy",
    tags: ["Binary Search", "Interactive"],
    submissions: 198,
    initialCode: "def first_bad_version(n):\n    # The isBadVersion API is already defined for you.\n    # def isBadVersion(version):\n    #     return True or False\n    # Your code here\n    pass",
    testCases: [
      {
        input: {
          n: 5,
          bad: 4
        },
        expected: 4
      },
      {
        input: {
          n: 1,
          bad: 1
        },
        expected: 1
      }
    ]
  },
  {
    id: 7,
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    submissions: 356,
    initialCode: "def max_sub_array(nums):\n    # Your code here\n    pass",
    testCases: [
      {
        input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        expected: 6
      },
      {
        input: [1],
        expected: 1
      },
      {
        input: [5, 4, -1, 7, 8],
        expected: 23
      }
    ]
  },
  {
    id: 8,
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    submissions: 287,
    initialCode: "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\ndef merge_two_lists(list1, list2):\n    # Your code here\n    pass",
    testCases: [
      {
        input: {
          list1: [1, 2, 4],
          list2: [1, 3, 4]
        },
        expected: [1, 1, 2, 3, 4, 4]
      },
      {
        input: {
          list1: [],
          list2: []
        },
        expected: []
      },
      {
        input: {
          list1: [],
          list2: [0]
        },
        expected: [0]
      }
    ]
  },
  {
    id: 9,
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Recursion"],
    submissions: 312,
    initialCode: "def climb_stairs(n):\n    # Your code here\n    pass",
    testCases: [
      {
        input: 2,
        expected: 2
      },
      {
        input: 3,
        expected: 3
      },
      {
        input: 45,
        expected: 1836311903
      }
    ]
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    id: 1,
    username: "pythonmaster",
    score: 1250,
    rank: 1,
    solvedChallenges: 45,
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    username: "codegenius",
    score: 1120,
    rank: 2,
    solvedChallenges: 42,
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    username: "algorithmking",
    score: 980,
    rank: 3,
    solvedChallenges: 38,
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    username: "devninja",
    score: 920,
    rank: 4,
    solvedChallenges: 36,
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    username: "codecrafter",
    score: 880,
    rank: 5,
    solvedChallenges: 34,
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 6,
    username: "bitwise",
    score: 840,
    rank: 6,
    solvedChallenges: 32,
    avatar: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: 7,
    username: "syntaxwizard",
    score: 790,
    rank: 7,
    solvedChallenges: 30,
    avatar: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: 8,
    username: "bugslayer",
    score: 750,
    rank: 8,
    solvedChallenges: 28,
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 9,
    username: "pythonista",
    score: 720,
    rank: 9,
    solvedChallenges: 27,
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 10,
    username: "codehacker",
    score: 680,
    rank: 10,
    solvedChallenges: 25,
    avatar: "https://i.pravatar.cc/150?img=10"
  }
];

export const getChallengeLeaderboard = (challengeId: number): ChallengeLeaderboardEntry[] => {
  // This would normally come from an API
  return [
    {
      id: 1,
      username: "pythonmaster",
      completionTime: "00:45:12",
      rank: 1,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      username: "codegenius",
      completionTime: "00:52:33",
      rank: 2,
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      username: "algorithmking",
      completionTime: "01:03:21",
      rank: 3,
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];
};
