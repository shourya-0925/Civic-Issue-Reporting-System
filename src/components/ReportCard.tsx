import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Eye, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface ReportCardProps {
  report: {
    id: string;
    title: string;
    description: string;
    category: string;
    status: "pending" | "in-progress" | "resolved";
    location: string;
    photo?: string;
    reportedDate: string;
    updatedDate?: string;
  };
  onViewDetails?: (id: string) => void;
}

const ReportCard = ({ report, onViewDetails }: ReportCardProps) => {
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
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "streetlight":
        return "bg-warning/10 text-warning border-warning/20";
      case "garbage":
        return "bg-success/10 text-success border-success/20";
      case "traffic":
        return "bg-primary/10 text-primary border-primary/20";
      case "sidewalk":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
              {report.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1 text-sm">
              <MapPin className="h-3 w-3" />
              {report.location}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(report.status)}>
            {getStatusIcon(report.status)}
            <span className="ml-1 capitalize">{report.status.replace("-", " ")}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Photo */}
        {report.photo && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={report.photo}
              alt={report.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {report.description}
        </p>

        {/* Category and Dates */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline" className={getCategoryColor(report.category)}>
            {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Reported {new Date(report.reportedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Update date if exists */}
        {report.updatedDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Updated {new Date(report.updatedDate).toLocaleDateString()}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            onClick={() => onViewDetails?.(report.id)}
          >
            <Eye className="mr-2 h-3 w-3" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;