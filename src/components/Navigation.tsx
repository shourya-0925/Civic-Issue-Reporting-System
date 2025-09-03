import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, User, FileText, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-hero p-2 rounded-lg shadow-civic">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">CivicReport</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/report">
              <Button variant="ghost" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Report Issue</span>
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="ghost" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>View Map</span>
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="hero" size="sm">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/report" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </Link>
              <Link to="/map" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Map
                </Button>
              </Link>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="hero" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;