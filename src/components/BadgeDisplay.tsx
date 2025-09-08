import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, Users, Camera, CheckCircle, Star, Award, Target, Zap } from "lucide-react";
import type { BadgeType } from "@/data/gamificationData";

interface BadgeDisplayProps {
  badges: BadgeType[];
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
}

const BadgeDisplay = ({ badges, showProgress = true, size = "md" }: BadgeDisplayProps) => {
  const getBadgeIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      trophy: <Trophy className="h-4 w-4" />,
      users: <Users className="h-4 w-4" />,
      camera: <Camera className="h-4 w-4" />,
      check: <CheckCircle className="h-4 w-4" />,
      star: <Star className="h-4 w-4" />,
      award: <Award className="h-4 w-4" />,
      target: <Target className="h-4 w-4" />,
      zap: <Zap className="h-4 w-4" />,
    };
    return iconMap[iconName] || <Award className="h-4 w-4" />;
  };

  const getRarityColor = (rarity: BadgeType["rarity"]) => {
    const colorMap = {
      bronze: "bg-amber-100 text-amber-800 border-amber-300",
      silver: "bg-gray-100 text-gray-800 border-gray-300",
      gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
      platinum: "bg-purple-100 text-purple-800 border-purple-300",
    };
    return colorMap[rarity];
  };

  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger asChild>
              <Card 
                className={`
                  ${badge.earnedAt ? "opacity-100" : "opacity-40"}
                  transition-all duration-200 hover:scale-105 cursor-pointer
                  ${badge.earnedAt ? "shadow-sm hover:shadow-md" : ""}
                `}
              >
                <CardContent className={`${sizeClasses[size]} text-center`}>
                  <div className={`
                    inline-flex items-center justify-center w-10 h-10 rounded-full mb-2
                    ${badge.earnedAt ? getRarityColor(badge.rarity) : "bg-muted"}
                  `}>
                    {getBadgeIcon(badge.iconName)}
                  </div>
                  <p className={`text-xs font-medium ${badge.earnedAt ? "text-foreground" : "text-muted-foreground"}`}>
                    {badge.name}
                  </p>
                  
                  {showProgress && badge.progress && !badge.earnedAt && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(badge.progress.current / badge.progress.required) * 100}%` 
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {badge.progress.current}/{badge.progress.required}
                      </p>
                    </div>
                  )}
                  
                  {badge.earnedAt && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Earned
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-sm">
                <p className="font-semibold">{badge.name}</p>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
                {badge.earnedAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                )}
                {badge.progress && !badge.earnedAt && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Progress: {badge.progress.current}/{badge.progress.required}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default BadgeDisplay;