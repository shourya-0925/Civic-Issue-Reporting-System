import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin, Upload, CheckCircle, Video, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IssueReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    photo: null as File | null,
    photoLocation: "",
    photoTimestamp: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // Auto-capture location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData(prev => ({ ...prev, location }));
          toast({
            title: "Location detected!",
            description: "Your current location has been automatically captured.",
          });
        },
        () => {
          toast({
            title: "Location access required",
            description: "Please enable location services to continue.",
            variant: "destructive",
          });
        }
      );
    }
  }, []);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to capture photos.",
        variant: "destructive",
      });
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const timestamp = new Date().toISOString();
          const file = new File([blob], `civic-report-${timestamp}.jpg`, { type: 'image/jpeg' });
          
          // Capture location when photo is taken
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const photoLocation = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
                setFormData(prev => ({ 
                  ...prev, 
                  photo: file, 
                  photoLocation,
                  photoTimestamp: timestamp
                }));
                toast({
                  title: "Photo captured!",
                  description: "Photo taken with live location and timestamp verification.",
                });
              },
              () => {
                setFormData(prev => ({ 
                  ...prev, 
                  photo: file,
                  photoTimestamp: timestamp
                }));
                toast({
                  title: "Photo captured (location unavailable)",
                  description: "Photo taken but couldn't verify location.",
                  variant: "destructive",
                });
              }
            );
          }
          closeCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ 
      ...prev, 
      photo: null, 
      photoLocation: "", 
      photoTimestamp: "" 
    }));
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
        photoTimestamp: "",
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

            {/* Live Photo Capture */}
            <div className="space-y-2">
              <Label>Live Photo Capture (Required)</Label>
              {!formData.photo ? (
                <div className="space-y-4">
                  {!isCameraOpen ? (
                    <Button 
                      type="button" 
                      onClick={openCamera}
                      className="w-full border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors"
                      variant="outline"
                    >
                      <Camera className="mr-2 h-8 w-8" />
                      <div className="text-center">
                        <p className="text-sm font-medium">Take Live Photo</p>
                        <p className="text-xs text-muted-foreground">Camera capture only - no gallery uploads</p>
                      </div>
                    </Button>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        <Button
                          type="button"
                          onClick={capturePhoto}
                          className="rounded-full w-16 h-16 bg-white hover:bg-gray-100"
                          variant="outline"
                        >
                          <Camera className="h-6 w-6 text-black" />
                        </Button>
                        <Button
                          type="button"
                          onClick={closeCamera}
                          className="rounded-full w-12 h-12"
                          variant="outline"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-sm font-medium">Photo captured</p>
                        <p className="text-xs text-muted-foreground">
                          {formData.photoTimestamp && `Taken: ${new Date(formData.photoTimestamp).toLocaleString()}`}
                        </p>
                        {formData.photoLocation && (
                          <p className="text-xs text-success">
                            ✓ Location: {formData.photoLocation}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={removePhoto}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Auto-detected Location */}
            <div className="space-y-2">
              <Label>Auto-detected Location</Label>
              <div className="border-2 border-border rounded-lg p-4">
                {formData.location ? (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-sm font-medium">Current Location</p>
                      <p className="text-xs text-muted-foreground">{formData.location}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <p className="text-sm">Detecting location...</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Location is automatically detected for report accuracy
              </p>
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