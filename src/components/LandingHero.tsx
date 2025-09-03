import { Button } from "@/components/ui/button";
import { Camera, MapPin, MessageSquare, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/civic-hero.jpg";
import mobileIcon from "@/assets/mobile-reporting-icon.jpg";
import mapIcon from "@/assets/map-tracking-icon.jpg";

const LandingHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Report Civic Issues{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Instantly
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Help improve your community by reporting potholes, broken streetlights, 
                  and other civic issues with just a few taps. Track progress in real-time.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/report">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    <Camera className="mr-2 h-5 w-5" />
                    Report an Issue
                  </Button>
                </Link>
                <Link to="/map">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    <MapPin className="mr-2 h-5 w-5" />
                    View Issue Map
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Issues Reported</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">892</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24hrs</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-bounce-in">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Modern civic infrastructure" 
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to make your community better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-card shadow-md hover:shadow-lg transition-all">
              <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic">
                <img src={mobileIcon} alt="Mobile Reporting" className="w-12 h-12 rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Report Issues</h3>
              <p className="text-muted-foreground">
                Take a photo, add description, and automatically tag your location. 
                Submit reports in seconds with our mobile-first interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-card shadow-md hover:shadow-lg transition-all">
              <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic">
                <img src={mapIcon} alt="Interactive Map" className="w-12 h-12 rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Track on Map</h3>
              <p className="text-muted-foreground">
                View all community issues on an interactive map. See what's been 
                reported near you and track resolution progress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-card shadow-md hover:shadow-lg transition-all">
              <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Get Updates</h3>
              <p className="text-muted-foreground">
                Receive notifications when your reports are reviewed, assigned, 
                and resolved by the local authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of citizens working together to improve our communities. 
              Your reports help create real change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  Explore Issues
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingHero;