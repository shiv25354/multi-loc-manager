
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  active?: boolean;
  onClick?: () => void;
}

interface MapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}

export const Map: React.FC<MapProps> = ({
  center,
  zoom = 3,
  markers = [],
  className,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a simplified map implementation using an iframe with OpenStreetMap
    // For production, you should use a proper maps API like Google Maps or Mapbox
    setLoading(false);
  }, []);

  // Encode markers for the static map
  const markerParams = markers
    .map(marker => `&marker=${marker.position.lat},${marker.position.lng},${encodeURIComponent(marker.title)}`)
    .join('');

  return (
    <div className={cn("relative", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center">Map Placeholder</h3>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-md">
            This is a placeholder for map integration. <br />
            In a production environment, integrate with Google Maps, Mapbox, or another mapping service.
          </p>
        </div>
      </div>
      
      <iframe 
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 10},${center.lat - 10},${center.lng + 10},${center.lat + 10}&layer=mapnik`}
        style={{ border: 0, width: '100%', height: '100%', opacity: 0.2 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Map"
      />
      
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};
