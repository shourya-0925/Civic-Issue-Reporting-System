import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Fix Leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  const map = useRef<L.Map | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<typeof mockIssues[0] | null>(null);
  const markers = useRef<L.Marker[]>([]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pothole": return "#ef4444";
      case "streetlight": return "#f59e0b";
      case "garbage": return "#10b981";
      case "sidewalk": return "#8b5cf6";
      default: return "#6b7280";
    }
  };

  const createCustomIcon = (category: string) => {
    const color = getCategoryColor(category);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
      ">●</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const initializeMap = () => {
    if (!mapContainer.current) return;

    // Initialize Leaflet map
    map.current = L.map(mapContainer.current).setView([18.5204, 73.8567], 11);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for issues
    mockIssues.forEach((issue) => {
      const customIcon = createCustomIcon(issue.category);
      
      const marker = L.marker([issue.coordinates[1], issue.coordinates[0]], {
        icon: customIcon
      }).addTo(map.current!);

      // Add popup
      const popupContent = `
        <div class="p-3 min-w-[200px]">
          <h4 class="font-semibold text-sm mb-1">${issue.title}</h4>
          <p class="text-xs text-gray-600 mb-2">${issue.location}</p>
          <div class="flex justify-between items-center">
            <span class="text-xs font-medium capitalize px-2 py-1 rounded" style="background-color: ${getCategoryColor(issue.category)}; color: white;">
              ${issue.category}
            </span>
            <span class="text-xs capitalize">${issue.status.replace('-', ' ')}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click event
      marker.on('click', () => {
        setSelectedIssue(issue);
      });

      markers.current.push(marker);
    });
  };

  useEffect(() => {
    initializeMap();
    
    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

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