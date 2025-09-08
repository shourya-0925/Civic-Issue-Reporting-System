import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Star, TrendingUp, Users } from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  rank: number;
  weeklyPoints: number;
  monthlyPoints: number;
  badges: number;
  location: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  users?: LeaderboardUser[];
  currentUserId?: string;
}

// Mock leaderboard data
const mockLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b137?w=150&h=150&fit=crop&crop=face",
    points: 2850,
    level: 23,
    rank: 1,
    weeklyPoints: 280,
    monthlyPoints: 1150,
    badges: 12,
    location: "Downtown",
  },
  {
    id: "2", 
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    points: 2640,
    level: 21,
    rank: 2,
    weeklyPoints: 195,
    monthlyPoints: 980,
    badges: 8,
    location: "Midtown",
    isCurrentUser: true,
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    points: 2420,
    level: 19,
    rank: 3,
    weeklyPoints: 210,
    monthlyPoints: 890,
    badges: 10,
    location: "East Side",
  },
  {
    id: "4",
    name: "Emma Wilson",
    points: 2180,
    level: 18,
    rank: 4,
    weeklyPoints: 165,
    monthlyPoints: 720,
    badges: 7,
    location: "West End",
  },
  {
    id: "5",
    name: "David Park",
    points: 1950,
    level: 16,
    rank: 5,
    weeklyPoints: 140,
    monthlyPoints: 650,
    badges: 6,
    location: "South District",
  },
];

const Leaderboard = ({ users = mockLeaderboardUsers, currentUserId = "2" }: LeaderboardProps) => {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [timeframe, setTimeframe] = useState("all-time");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (rank === 2) return "bg-gray-100 text-gray-800 border-gray-300";
    if (rank === 3) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-muted text-muted-foreground";
  };

  const getPointsForTimeframe = (user: LeaderboardUser, timeframe: string) => {
    switch (timeframe) {
      case "weekly": return user.weeklyPoints;
      case "monthly": return user.monthlyPoints;
      default: return user.points;
    }
  };

  const filteredUsers = users
    .filter(user => selectedLocation === "all" || user.location === selectedLocation)
    .sort((a, b) => getPointsForTimeframe(b, timeframe) - getPointsForTimeframe(a, timeframe))
    .map((user, index) => ({ ...user, rank: index + 1 }));

  const locations = Array.from(new Set(users.map(user => user.location)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Community Leaderboard
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={timeframe} onValueChange={setTimeframe} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="all-time">All Time</TabsTrigger>
        </TabsList>

        <TabsContent value={timeframe} className="space-y-2">
          {filteredUsers.map((user, index) => (
            <Card 
              key={user.id} 
              className={`
                transition-all duration-200 hover:shadow-md
                ${user.isCurrentUser ? "ring-2 ring-primary ring-offset-2 bg-primary/5" : ""}
                ${index < 3 ? "bg-gradient-card" : ""}
              `}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 min-w-12">
                      {getRankIcon(user.rank)}
                      {user.rank <= 3 && (
                        <Badge className={getRankBadgeColor(user.rank)}>
                          #{user.rank}
                        </Badge>
                      )}
                    </div>
                    
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground truncate">
                          {user.name}
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              You
                            </Badge>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Level {user.level}</span>
                        <span>{user.location}</span>
                        <span className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          {user.badges} badges
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      {getPointsForTimeframe(user, timeframe).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {timeframe === "weekly" ? "pts this week" : 
                       timeframe === "monthly" ? "pts this month" : "total points"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {filteredUsers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">Try selecting a different location or timeframe.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Leaderboard;