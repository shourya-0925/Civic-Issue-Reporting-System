import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";

// Mock data for demonstration
const mockIssues = [
  {
    id: 1,
    title: "Large pothole on Main Street",
    category: "pothole",
    status: "pending",
    location: "Main Street & 2nd Ave",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    reportedDate: "2024-01-15",
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Broken street light",
    category: "streetlight",
    status: "in-progress",
    location: "Oak Avenue",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    reportedDate: "2024-01-14",
    photo: "https://images.unsplash.com/photo-1520637836862-4d197d17c89a?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Overflowing garbage bin",
    category: "garbage",
    status: "resolved",
    location: "Central Park",
    coordinates: { lat: 40.7829, lng: -73.9654 },
    reportedDate: "2024-01-13",
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Damaged sidewalk",
    category: "sidewalk",
    status: "pending",
    location: "Pine Street",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    reportedDate: "2024-01-12",
    photo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
  },
];

const IssueMap = () => {
  const [selectedIssue, setSelectedIssue] = useState<typeof mockIssues[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning text-warning-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      case "resolved":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pothole":
        return "bg-destructive";
      case "streetlight":
        return "bg-warning";
      case "garbage":
        return "bg-success";
      case "sidewalk":
        return "bg-accent";
      default:
        return "bg-muted";
    }
  };

  const filteredIssues = filterStatus === "all" 
    ? mockIssues 
    : mockIssues.filter(issue => issue.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issue Map</h1>
          <p className="text-muted-foreground">View and track civic issues in your area</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All Issues
          </Button>
          <Button
            variant={filterStatus === "pending" ? "warning" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
          >
            <Filter className="mr-1 h-3 w-3" />
            Pending
          </Button>
          <Button
            variant={filterStatus === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("in-progress")}
          >
            In Progress
          </Button>
          <Button
            variant={filterStatus === "resolved" ? "success" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("resolved")}
          >
            Resolved
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card className="h-96 lg:h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="w-full h-full bg-muted rounded-lg flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                {/* Map background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-muted-foreground/20"></div>
                    ))}
                  </div>
                </div>
                
                {/* Map pins */}
                <div className="absolute inset-0">
                  {filteredIssues.map((issue, index) => (
                    <div
                      key={issue.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                        selectedIssue?.id === issue.id ? "scale-125 z-10" : ""
                      }`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`,
                      }}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <div className={`w-6 h-6 rounded-full ${getCategoryColor(issue.category)} border-2 border-white shadow-lg flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative z-20 space-y-4">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground">
                      This would be an interactive map showing all reported issues with location pins.
                      Click on the colored dots to see issue details.
                    </p>
                  </div>
                  <div className="flex justify-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span>Pothole</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span>Light</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span>Garbage</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span>Sidewalk</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issue Details Panel */}
        <div className="space-y-4">
          {selectedIssue ? (
            <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedIssue.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {selectedIssue.location}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(selectedIssue.status)}>
                    {getStatusIcon(selectedIssue.status)}
                    <span className="ml-1 capitalize">{selectedIssue.status.replace("-", " ")}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <img
                  src={selectedIssue.photo}
                  alt={selectedIssue.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Reported on {new Date(selectedIssue.reportedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(selectedIssue.category)}`}></div>
                  <span className="text-sm capitalize font-medium">{selectedIssue.category}</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center p-8">
              <CardContent>
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Select an Issue</h3>
                <p className="text-sm text-muted-foreground">
                  Click on any pin on the map to view issue details
                </p>
              </CardContent>
            </Card>
          )}

          {/* Issue Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Issue Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Issues</span>
                <Badge variant="outline">{mockIssues.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <Badge className="bg-warning text-warning-foreground">
                  {mockIssues.filter(i => i.status === "pending").length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">In Progress</span>
                <Badge className="bg-primary text-primary-foreground">
                  {mockIssues.filter(i => i.status === "in-progress").length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Resolved</span>
                <Badge className="bg-success text-success-foreground">
                  {mockIssues.filter(i => i.status === "resolved").length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IssueMap;