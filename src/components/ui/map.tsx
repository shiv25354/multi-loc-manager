
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MapPosition {
  lat: number;
  lng: number;
  zoom?: number;
}

interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title?: string;
  active?: boolean;
  onClick?: () => void;
}

interface MapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  onMapClick?: (position: { lat: number; lng: number }) => void;
  onMarkerClick?: (marker: MapMarker) => void;
  onMapMove?: (position: MapPosition) => void;
}

const Map: React.FC<MapProps> = ({
  center,
  zoom = 3,
  markers,
  className,
  onMapClick,
  onMarkerClick,
  onMapMove,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize the map
  useEffect(() => {
    // Skip if already initialized or ref not set
    if (mapInstanceRef.current || !mapRef.current) return;

    // Function to load the Google Maps script dynamically
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Create a global callback function
      window.initMap = initMap;
      
      // Create and load the script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    // Initialize the map after Google Maps loads
    function initMap() {
      const mapOptions = {
        center: center,
        zoom: zoom,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }, { lightness: 17 }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 18 }],
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 16 }],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#dedede" }, { lightness: 21 }],
          },
          {
            featureType: "administrative",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }, { lightness: 16 }],
          },
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
          },
        ],
      };

      if (mapRef.current) {
        mapInstanceRef.current = new google.maps.Map(
          mapRef.current,
          mapOptions
        );

        // Add click event listener to the map
        if (onMapClick) {
          mapInstanceRef.current.addListener("click", (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
              onMapClick({ 
                lat: e.latLng.lat(), 
                lng: e.latLng.lng() 
              });
            }
          });
        }

        // Add move end event listener
        if (onMapMove) {
          mapInstanceRef.current.addListener("idle", () => {
            const mapInstance = mapInstanceRef.current;
            if (mapInstance) {
              const center = mapInstance.getCenter();
              if (center) {
                onMapMove({
                  lat: center.lat(),
                  lng: center.lng(),
                  zoom: mapInstance.getZoom() || zoom,
                });
              }
            }
          });
        }

        setMapLoaded(true);
      }
    }

    loadGoogleMaps();

    // Cleanup
    return () => {
      // Remove global callback if it exists
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [center, zoom, onMapClick, onMapMove]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (mapInstanceRef.current && mapLoaded) {
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [center, zoom, mapLoaded]);

  // Handle markers
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded || !markers) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = {};

    // Add new markers
    markers.forEach((marker) => {
      if (!mapInstanceRef.current) return;

      const markerOptions: google.maps.MarkerOptions = {
        position: marker.position,
        map: mapInstanceRef.current,
        title: marker.title,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: marker.active ? 10 : 8,
          fillColor: marker.active ? "#0066CC" : "#999999",
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: "#FFFFFF",
        },
      };

      const googleMarker = new google.maps.Marker(markerOptions);

      if (marker.onClick || onMarkerClick) {
        googleMarker.addListener("click", () => {
          if (marker.onClick) marker.onClick();
          if (onMarkerClick) onMarkerClick(marker);
        });
      }

      markersRef.current[marker.id] = googleMarker;
    });

    // Cleanup
    return () => {
      Object.values(markersRef.current).forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [markers, mapLoaded, onMarkerClick]);

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      <div ref={mapRef} className="w-full h-full min-h-[300px]" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Map };
