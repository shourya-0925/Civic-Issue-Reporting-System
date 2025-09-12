import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, FileText, MapPin, Calendar, Plus, TrendingUp, Clock, Trophy, Award } from "lucide-react";
import ReportCard from "./ReportCard";
import GamificationStats from "./GamificationStats";
import BadgeDisplay from "./BadgeDisplay";
import { Link } from "react-router-dom";
import { mockUserGamification, mockBadges } from "@/data/gamificationData";

// Mock user data
const mockUser = {
  name: "Rahul Patil",
  email: "rahul.patil@email.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  joinDate: "2023-08-15",
  totalReports: 12,
  resolvedReports: 8,
  pendingReports: 3,
  inProgressReports: 1,
};

// Mock reports data
const mockReports = [
  {
    id: "CR-2024-001",
    title: "Large pothole on FC Road",
    description: "There's a large pothole that's been growing in size. It's causing damage to vehicles and is a safety hazard for cyclists.",
    category: "pothole",
    status: "resolved" as const,
    location: "FC Road & JM Road Junction",
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    reportedDate: "2024-01-15",
    updatedDate: "2024-01-20",
  },
  {
    id: "CR-2024-002",
    title: "Broken street light",
    description: "Street light has been out for several days, making the area unsafe for pedestrians at night.",
    category: "streetlight",
    status: "in-progress" as const,
    location: "MG Road, Camp Area",
    photo: "https://images.unsplash.com/photo-1520637836862-4d197d17c89a?w=400&h=300&fit=crop",
    reportedDate: "2024-01-14",
    updatedDate: "2024-01-18",
  },
  {
    id: "CR-2024-003",
    title: "Overflowing garbage bin",
    description: "Garbage bin has been overflowing for several days, attracting pests and creating unpleasant odors.",
    category: "garbage",
    status: "pending" as const,
    location: "Shaniwar Peth Market",
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    reportedDate: "2024-01-13",
  },
  {
    id: "CR-2024-004",
    title: "Damaged sidewalk",
    description: "Sidewalk has several cracks and uneven surfaces that pose a tripping hazard.",
    category: "sidewalk",
    status: "pending" as const,
    location: "Koregaon Park",
    photo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    reportedDate: "2024-01-12",
  },
];

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleViewDetails = (reportId: string) => {
    // This would typically navigate to a detailed view
    console.log("View details for report:", reportId);
  };

  const getFilteredReports = (status?: string) => {
    if (!status) return mockReports;
    return mockReports.filter(report => report.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground">Track your civic reports and community impact</p>
        </div>
        <Link to="/report">
          <Button variant="hero" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Report
          </Button>
        </Link>
      </div>

      {/* User Profile Card */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{mockUser.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Member since {new Date(mockUser.joinDate).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{mockUser.totalReports}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-success">{mockUser.resolvedReports}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-warning">{mockUser.pendingReports}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{mockUser.inProgressReports}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gamification">Rewards</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {Math.round((mockUser.resolvedReports / mockUser.totalReports) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Resolution rate this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {mockUser.pendingReports + mockUser.inProgressReports}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting resolution
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">#23</div>
                <p className="text-xs text-muted-foreground">
                  Top contributor this quarter
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {mockReports.slice(0, 4).map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Gamification Tab */}
        <TabsContent value="gamification" className="space-y-6">
          <GamificationStats userStats={mockUserGamification} />
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Your Achievements
              </CardTitle>
              <CardDescription>
                Collect badges by being an active community member!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BadgeDisplay badges={mockBadges} showProgress={true} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Reports Tab */}
        <TabsContent value="all">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredReports().map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </TabsContent>

        {/* Pending Reports Tab */}
        <TabsContent value="pending">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredReports("pending").map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          {getFilteredReports("pending").length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No Pending Reports</h3>
                <p className="text-muted-foreground">All your reports have been addressed!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resolved Reports Tab */}
        <TabsContent value="resolved">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredReports("resolved").map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;