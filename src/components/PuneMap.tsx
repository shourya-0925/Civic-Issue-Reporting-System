import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for Pune PCMC area
const mockIssues = [
  {
    id: 1,
    title: "Large pothole on Katraj-Kondhwa Road",
    category: "pothole",
    status: "pending",
    location: "Katraj-Kondhwa Road, Near Bharati Vidyapeeth",
    coordinates: [73.8595, 18.4608],
    reportedDate: "2024-01-15",
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Broken street light",
    category: "streetlight",
    status: "in-progress",
    location: "Swargate Bus Stand Area",
    coordinates: [73.8636, 18.5018],
    reportedDate: "2024-01-14",
    photo: "https://images.unsplash.com/photo-1520637836862-4d197d17c89a?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Overflowing garbage bin",
    category: "garbage",
    status: "resolved",
    location: "Market Yard, Gultekdi",
    coordinates: [73.8654, 18.4829],
    reportedDate: "2024-01-13",
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Damaged sidewalk",
    category: "sidewalk",
    status: "pending",
    location: "Balaji Nagar, PCMC",
    coordinates: [73.80, 18.62],
    reportedDate: "2024-01-12",
    photo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
  },
];

const PuneMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<typeof mockIssues[0] | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pothole": return "#ef4444";
      case "streetlight": return "#f59e0b";
      case "garbage": return "#10b981";
      case "sidewalk": return "#8b5cf6";
      default: return "#6b7280";
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [73.8567, 18.5204], // Pune center
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for issues
    mockIssues.forEach((issue) => {
      const markerEl = document.createElement('div');
      markerEl.className = 'marker';
      markerEl.style.backgroundColor = getCategoryColor(issue.category);
      markerEl.style.width = '20px';
      markerEl.style.height = '20px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.border = '3px solid white';
      markerEl.style.cursor = 'pointer';
      markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(issue.coordinates as [number, number])
        .addTo(map.current!);

      // Add click event
      markerEl.addEventListener('click', () => {
        setSelectedIssue(issue);
      });

      // Add popup on hover
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div class="p-2">
          <h4 class="font-semibold text-sm">${issue.title}</h4>
          <p class="text-xs text-gray-600">${issue.location}</p>
          <p class="text-xs font-medium capitalize">${issue.status}</p>
        </div>
      `);

      markerEl.addEventListener('mouseenter', () => {
        popup.addTo(map.current!);
        marker.setPopup(popup);
        popup.addTo(map.current!);
      });

      markerEl.addEventListener('mouseleave', () => {
        popup.remove();
      });
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      setTimeout(initializeMap, 100);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="h-96 lg:h-[600px] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Mapbox Token Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To display the interactive Pune map, please enter your Mapbox public token.
              Get one free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
            </p>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button onClick={handleTokenSubmit} className="w-full">
                Load Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-96 lg:h-[600px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {selectedIssue && (
        <div className="absolute top-4 right-4 w-72 z-10">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{selectedIssue.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{selectedIssue.location}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <img
                src={selectedIssue.photo}
                alt={selectedIssue.title}
                className="w-full h-24 object-cover rounded"
              />
              <div className="flex justify-between items-center text-xs">
                <span className="capitalize font-medium">{selectedIssue.category}</span>
                <span className="capitalize px-2 py-1 rounded text-white" style={{backgroundColor: getCategoryColor(selectedIssue.category)}}>
                  {selectedIssue.status.replace('-', ' ')}
                </span>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs"
                onClick={() => setSelectedIssue(null)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PuneMap;