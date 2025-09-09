import { Button } from "@/components/ui/button";
import { Camera, MapPin, MessageSquare, Shield, Users, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import mobileIcon from "@/assets/mobile-reporting-icon.jpg";
import mapIcon from "@/assets/map-tracking-icon.jpg";

const LandingHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-slide-up">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  #1 Civic Reporting Platform in Pune
                </div>
                <h1 className="text-4xl lg:text-7xl font-bold text-foreground leading-tight">
                  CivicPulse:{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                    Report & Track Issues
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  Transform your community with our AI-powered civic reporting platform. 
                  Report issues instantly with live photo capture, earn rewards, and track real-time progress.
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

              {/* Enhanced Stats with animation */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-civic">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Citizens</div>
                </div>
                <div className="text-center group animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-success to-success/80 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-civic">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-success">892</div>
                  <div className="text-sm text-muted-foreground font-medium">Issues Resolved</div>
                </div>
                <div className="text-center group animate-slide-up" style={{animationDelay: '0.6s'}}>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-civic">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-accent">24hrs</div>
                  <div className="text-sm text-muted-foreground font-medium">Avg Response</div>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Graphic */}
            <div className="relative animate-bounce-in">
              <div className="relative bg-gradient-card rounded-3xl p-8 shadow-2xl border border-white/20 hover-lift">
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-success rounded-full animate-float" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-8 -left-2 w-4 h-4 bg-accent rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute -bottom-2 left-1/3 w-6 h-6 bg-warning rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="text-center space-y-4 group">
                    <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic group-hover:shadow-lg transition-all group-hover:scale-105">
                      <Camera className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Live Capture</h3>
                      <p className="text-sm text-muted-foreground">Real-time photo + GPS</p>
                    </div>
                  </div>
                  <div className="text-center space-y-4 group">
                    <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic group-hover:shadow-lg transition-all group-hover:scale-105">
                      <MapPin className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Smart Tracking</h3>
                      <p className="text-sm text-muted-foreground">AI-powered updates</p>
                    </div>
                  </div>
                </div>
                
                {/* Gamification preview */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Earn rewards for reporting</span>
                    </div>
                    <div className="text-primary font-semibold">+10 pts</div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl pointer-events-none"></div>
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
            {/* Feature 1 - Enhanced */}
            <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-card shadow-md hover:shadow-xl transition-all hover-lift group animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="mx-auto w-24 h-24 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic group-hover:shadow-lg transition-all">
                <img src={mobileIcon} alt="Mobile Reporting" className="w-14 h-14 rounded-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Live Photo Reporting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Capture issues instantly with camera-only reports. Every photo is automatically 
                  geo-tagged with GPS coordinates and timestamp for authenticity verification.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                <Camera className="h-4 w-4" />
                Real-time capture only
              </div>
            </div>

            {/* Feature 2 - Enhanced */}
            <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-card shadow-md hover:shadow-xl transition-all hover-lift group animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="mx-auto w-24 h-24 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic group-hover:shadow-lg transition-all">
                <img src={mapIcon} alt="Interactive Map" className="w-14 h-14 rounded-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Smart Map Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered interactive map shows real-time issue status, resolution progress, 
                  and community engagement. Filter by category, priority, and distance.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-accent font-medium">
                <MapPin className="h-4 w-4" />
                Live tracking updates
              </div>
            </div>

            {/* Feature 3 - Enhanced */}
            <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-card shadow-md hover:shadow-xl transition-all hover-lift group animate-slide-up" style={{animationDelay: '0.5s'}}>
              <div className="mx-auto w-24 h-24 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic group-hover:shadow-lg transition-all">
                <Shield className="h-14 w-14 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Gamified Rewards</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Earn points, unlock badges, and climb leaderboards for civic engagement. 
                  Get recognized for making your community better with every report.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-success font-medium">
                <Award className="h-4 w-4" />
                Points & badges system
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-hero overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full text-white text-sm font-medium mb-6 glass-effect">
                <Users className="mr-2 h-4 w-4" />
                Join 10,000+ Active Citizens
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Ready to Transform
                <br />
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Your Community?
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Start earning rewards today! Report your first issue, earn points, unlock badges, 
                and climb the leaderboard while making Pune a better place to live.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
              <Link to="/register">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-bold px-8 py-4 text-lg shadow-xl hover-lift">
                  <Award className="mr-2 h-5 w-5" />
                  Start Earning Rewards
                </Button>
              </Link>
              <Link to="/report">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 text-lg glass-effect">
                  <Camera className="mr-2 h-5 w-5" />
                  Report First Issue
                </Button>
              </Link>
            </div>
            
            {/* Social proof */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-white/70 text-sm mb-4">Trusted by civic leaders and citizens across Pune</p>
              <div className="flex justify-center items-center gap-8 text-white/60">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-xs">Issue Resolution Rate</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9★</div>
                  <div className="text-xs">Community Rating</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-xs">Average Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingHero;