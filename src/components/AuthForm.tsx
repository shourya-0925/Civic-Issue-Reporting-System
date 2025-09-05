import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Lock, User, Eye, EyeOff, Shield, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    
    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: mode === "login" ? "Welcome back!" : "Account created!",
      description: mode === "login" 
        ? "You have successfully signed in." 
        : "Your account has been created successfully.",
    });
  };

  const handleGoogleAuth = () => {
    toast({
      title: "Google Sign-In",
      description: "Google authentication will be available after Supabase integration.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Info Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero p-12 flex-col justify-center text-white">
          <div className="max-w-md space-y-8 animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">CivicPulse</h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                {mode === "login" ? "Welcome Back!" : "Join the Movement"}
              </h2>
              <p className="text-xl text-white/90">
                {mode === "login" 
                  ? "Continue making your community better. Your reports matter."
                  : "Be part of the change. Help improve Pune PCMC with every report."
                }
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-white/90">Join 10,000+ active citizens</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span className="text-white/90">Track your impact in real-time</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-white/90">Secure & verified reporting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md space-y-6 animate-scale-in">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center space-y-2">
              <Link to="/" className="inline-flex items-center space-x-2">
                <div className="bg-gradient-hero p-3 rounded-xl shadow-civic">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-foreground">CivicPulse</span>
              </Link>
            </div>

            <Card className="shadow-2xl bg-card/80 backdrop-blur-xl border border-white/20 animate-fade-in">
              <CardHeader className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-civic">
                  {mode === "login" ? (
                    <User className="h-8 w-8 text-white" />
                  ) : (
                    <Shield className="h-8 w-8 text-white" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold">
                    {mode === "login" ? "Welcome Back" : "Get Started"}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {mode === "login" 
                      ? "Sign in to continue your civic journey" 
                      : "Create your account and start reporting"
                    }
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field for registration */}
                  {mode === "register" && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-10 py-3 bg-background/50 border-border/60 focus:border-primary/60 focus:bg-background transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 py-3 bg-background/50 border-border/60 focus:border-primary/60 focus:bg-background transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-12 py-3 bg-background/50 border-border/60 focus:border-primary/60 focus:bg-background transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password field for registration */}
                  {mode === "register" && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          id="confirmPassword"
                          placeholder="Confirm your password"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="pl-10 py-3 bg-background/50 border-border/60 focus:border-primary/60 focus:bg-background transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full py-3 text-base font-semibold bg-gradient-hero hover:shadow-lg hover:shadow-primary/25 transform hover:scale-[1.02] transition-all duration-200" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading 
                      ? (mode === "login" ? "Signing In..." : "Creating Account...")
                      : (mode === "login" ? "Sign In" : "Create Account")
                    }
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-border/60" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground font-medium">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign-In */}
                <Button 
                  variant="outline" 
                  className="w-full py-3 bg-background/50 border-border/60 hover:bg-background hover:border-primary/60 transition-all" 
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>

                {/* Switch Mode Link */}
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <Link 
                    to={mode === "login" ? "/register" : "/login"}
                    className="text-sm text-primary hover:text-primary/80 font-semibold hover:underline transition-colors"
                  >
                    {mode === "login" ? "Sign up for free" : "Sign in"}
                  </Link>
                </div>

                {/* Forgot Password for login */}
                {mode === "login" && (
                  <div className="text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Secure & encrypted</span>
                <span>•</span>
                <span>Trusted by 10,000+ citizens</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;