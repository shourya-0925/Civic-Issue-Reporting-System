import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, TrendingUp, Target, Zap, Award } from "lucide-react";

interface GamificationStatsProps {
  userStats: {
    points: number;
    level: number;
    rank: number;
    totalUsers: number;
    nextLevelPoints: number;
    currentLevelPoints: number;
    weeklyPoints: number;
    monthlyPoints: number;
    badges: number;
    streak: number;
  };
}

const GamificationStats = ({ userStats }: GamificationStatsProps) => {
  const progressPercentage = ((userStats.points - userStats.currentLevelPoints) / 
    (userStats.nextLevelPoints - userStats.currentLevelPoints)) * 100;

  const getLevelTitle = (level: number) => {
    if (level < 5) return "Civic Newcomer";
    if (level < 10) return "Community Helper";
    if (level < 20) return "Issue Spotter";
    if (level < 35) return "Neighborhood Guardian";
    if (level < 50) return "City Champion";
    return "Civic Legend";
  };

  const getLevelColor = (level: number) => {
    if (level < 5) return "bg-green-100 text-green-800";
    if (level < 10) return "bg-blue-100 text-blue-800";
    if (level < 20) return "bg-purple-100 text-purple-800";
    if (level < 35) return "bg-orange-100 text-orange-800";
    if (level < 50) return "bg-red-100 text-red-800";
    return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
  };

  return (
    <div className="space-y-4">
      {/* Level and Points Overview */}
      <Card className="bg-gradient-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Level {userStats.level}
              </CardTitle>
              <Badge className={`mt-1 ${getLevelColor(userStats.level)}`}>
                {getLevelTitle(userStats.level)}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{userStats.points.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {userStats.level + 1}</span>
              <span>{userStats.nextLevelPoints - userStats.points} points to go</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-background/50 rounded-lg">
              <div className="text-lg font-bold text-success">{userStats.weeklyPoints}</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
            <div className="p-2 bg-background/50 rounded-lg">
              <div className="text-lg font-bold text-warning">{userStats.monthlyPoints}</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
            <div className="p-2 bg-background/50 rounded-lg">
              <div className="text-lg font-bold text-accent">{userStats.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-2 mx-auto">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xl font-bold text-foreground">#{userStats.rank}</div>
            <div className="text-xs text-muted-foreground">
              of {userStats.totalUsers.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full mb-2 mx-auto">
              <Award className="h-5 w-5 text-accent" />
            </div>
            <div className="text-xl font-bold text-foreground">{userStats.badges}</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-full mb-2 mx-auto">
              <Zap className="h-5 w-5 text-warning" />
            </div>
            <div className="text-xl font-bold text-foreground">{userStats.streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full mb-2 mx-auto">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div className="text-xl font-bold text-foreground">{userStats.level}</div>
            <div className="text-xs text-muted-foreground">Current Level</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamificationStats;