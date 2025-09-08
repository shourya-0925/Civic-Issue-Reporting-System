import { Trophy, Users, Camera, CheckCircle, Star, Award, Target, Zap } from "lucide-react";

export interface BadgeType {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  rarity: "bronze" | "silver" | "gold" | "platinum";
  earnedAt?: string;
  progress?: {
    current: number;
    required: number;
  };
}

// Mock user gamification stats
export const mockUserGamification = {
  points: 1420,
  level: 8,
  rank: 23,
  totalUsers: 1847,
  nextLevelPoints: 1600,
  currentLevelPoints: 1200,
  weeklyPoints: 185,
  monthlyPoints: 650,
  badges: 6,
  streak: 5,
};

// Mock badges system
export const mockBadges: BadgeType[] = [
  {
    id: "first-report",
    name: "First Report",
    description: "Submit your first civic issue report",
    iconName: "award",
    color: "blue",
    rarity: "bronze",
    earnedAt: "2024-01-15",
  },
  {
    id: "community-helper",
    name: "Community Helper",
    description: "Confirm 10 other reports to help the community",
    iconName: "users",
    color: "green",
    rarity: "silver",
    earnedAt: "2024-01-20",
  },
  {
    id: "active-reporter",
    name: "Active Reporter",
    description: "Submit 5 reports in a single week",
    iconName: "zap",
    color: "yellow",
    rarity: "gold",
    earnedAt: "2024-01-25",
  },
  {
    id: "problem-solver",
    name: "Problem Solver",
    description: "Have 3 of your reports marked as resolved",
    iconName: "check",
    color: "purple",
    rarity: "gold",
    earnedAt: "2024-01-28",
  },
  {
    id: "photographer",
    name: "Picture Perfect",
    description: "Include photos in 10 different reports",
    iconName: "camera",
    color: "orange",
    rarity: "silver",
    earnedAt: "2024-01-30",
  },
  {
    id: "super-reporter",
    name: "Super Reporter",
    description: "Submit 20 reports total",
    iconName: "trophy",
    color: "red",
    rarity: "platinum",
    progress: {
      current: 12,
      required: 20,
    }
  },
  {
    id: "weekly-warrior",
    name: "Weekly Warrior",
    description: "Maintain a 7-day reporting streak",
    iconName: "target",
    color: "indigo",
    rarity: "silver",
    earnedAt: "2024-02-01",
  },
  {
    id: "engagement-master",
    name: "Engagement Master",
    description: "Receive 100 upvotes on your reports",
    iconName: "star",
    color: "pink",
    rarity: "gold",
    progress: {
      current: 67,
      required: 100,
    }
  },
];

// Points system
export const pointsSystem = {
  submitReport: 10,
  confirmReport: 2,
  addComment: 1,
  addPhoto: 3,
  firstReportBonus: 5,
  weeklyStreakBonus: 10,
};

// Level thresholds
export const levelThresholds = [
  0,    // Level 1
  100,  // Level 2
  250,  // Level 3
  450,  // Level 4
  700,  // Level 5
  1000, // Level 6
  1350, // Level 7
  1750, // Level 8
  2200, // Level 9
  2700, // Level 10
  3250, // Level 11
  3850, // Level 12
  4500, // Level 13
  5200, // Level 14
  5950, // Level 15
  // Continue pattern...
];

export const calculateLevel = (points: number): number => {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (points >= levelThresholds[i]) {
      return i + 1;
    }
  }
  return 1;
};

export const getNextLevelPoints = (currentLevel: number): number => {
  return levelThresholds[currentLevel] || levelThresholds[levelThresholds.length - 1] + 1000;
};

export const getCurrentLevelPoints = (currentLevel: number): number => {
  return levelThresholds[currentLevel - 1] || 0;
};