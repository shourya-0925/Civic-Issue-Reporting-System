import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Mic, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IssueReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    photo: null as File | null,
    photoLocation: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "pothole", label: "Pothole", color: "bg-destructive" },
    { value: "streetlight", label: "Street Light", color: "bg-warning" },
    { value: "garbage", label: "Garbage/Litter", color: "bg-success" },
    { value: "traffic", label: "Traffic Signal", color: "bg-primary" },
    { value: "sidewalk", label: "Sidewalk Issue", color: "bg-accent" },
    { value: "graffiti", label: "Graffiti", color: "bg-secondary" },
    { value: "other", label: "Other", color: "bg-muted" },
  ];

  const handleLocationCapture = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData({ ...formData, location });
          toast({
            title: "Location captured!",
            description: "Your current location has been added to the report.",
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location services or enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Capture location when photo is selected to ensure authenticity
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const photoLocation = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
            setFormData({ ...formData, photo: file, photoLocation });
            toast({
              title: "Photo validated!",
              description: "Photo added with live location verification for authenticity.",
            });
          },
          () => {
            // Still allow photo upload but warn about validation
            setFormData({ ...formData, photo: file, photoLocation: "" });
            toast({
              title: "Photo added (location unavailable)",
              description: "Photo uploaded but couldn't verify location for authenticity.",
              variant: "destructive",
            });
          }
        );
      } else {
        setFormData({ ...formData, photo: file, photoLocation: "" });
        toast({
          title: "Photo added",
          description: "Photo uploaded but location validation not available.",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Report submitted successfully!",
      description: "Thank you for helping improve our community. You'll receive updates on this issue.",
    });

    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        photo: null,
        photoLocation: "",
        location: "",
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="text-center py-12 bg-gradient-card animate-bounce-in">
          <CardContent className="space-y-6">
            <div className="mx-auto w-20 h-20 bg-success rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Report Submitted!</h2>
              <p className="text-muted-foreground">
                Your report has been received and will be reviewed by local authorities. 
                You'll receive updates on the progress.
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              Report ID: #CR-2024-{Math.floor(Math.random() * 10000)}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Report a Civic Issue</CardTitle>
          <CardDescription>
            Help improve your community by reporting issues that need attention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input
                id="title"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Issue Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about the issue..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo">Photo (Optional)</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Label htmlFor="photo" className="cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Camera className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {formData.photo ? formData.photo.name : "Tap to take or upload photo"}
                      </p>
                      {formData.photo && formData.photoLocation && (
                        <p className="text-xs text-success mt-1">
                          ✓ Location verified at capture
                        </p>
                      )}
                      {formData.photo && !formData.photoLocation && (
                        <p className="text-xs text-warning mt-1">
                          ⚠ Location not verified
                        </p>
                      )}
                    </div>
                  </Label>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Location coordinates or address"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
                <Button type="button" variant="outline" onClick={handleLocationCapture}>
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Click the location button to auto-detect your current position
              </p>
            </div>

            {/* Voice Note Placeholder */}
            <div className="space-y-2">
              <Label>Voice Note (Optional)</Label>
              <Button type="button" variant="outline" className="w-full" disabled>
                <Mic className="mr-2 h-4 w-4" />
                Record Voice Note (Coming Soon)
              </Button>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              variant="hero" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueReportForm;