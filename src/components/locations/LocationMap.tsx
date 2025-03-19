
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "@/components/ui/map";
import { Location, locations, getChildLocations, getLocationPath } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationMapProps {
  selectedLocation?: Location | null;
  onSelectLocation?: (location: Location) => void;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  selectedLocation,
  onSelectLocation,
  className,
}) => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(selectedLocation || null);
  
  const childLocations = activeLocation 
    ? getChildLocations(activeLocation.id) 
    : getChildLocations();
  
  const locationPath = activeLocation 
    ? getLocationPath(activeLocation.id) 
    : [];

  const mapMarkers = childLocations.map(location => ({
    id: location.id,
    position: location.coordinates || { lat: 0, lng: 0 },
    title: location.name,
    active: location.active,
    onClick: () => {
      setActiveLocation(location);
      onSelectLocation?.(location);
    }
  }));

  // If we have a selected location, center on it, otherwise show a worldwide view
  const mapCenter = activeLocation?.coordinates || { lat: 25, lng: 0 };
  const mapZoom = activeLocation?.type === 'country' ? 4 : 
                  activeLocation?.type === 'state' ? 6 : 
                  activeLocation?.type === 'city' ? 10 : 
                  activeLocation?.type === 'district' ? 12 :
                  activeLocation?.type === 'zone' ? 14 : 2;

  const handleBreadcrumbClick = (location: Location) => {
    setActiveLocation(location);
    onSelectLocation?.(location);
  };

  const handleReset = () => {
    setActiveLocation(null);
    onSelectLocation?.(null);
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle>Location Explorer</CardTitle>
            <CardDescription>
              {activeLocation 
                ? `Viewing ${activeLocation.name} and its sub-locations` 
                : "Explore all marketplace locations globally"}
            </CardDescription>
          </div>
          
          {activeLocation && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              <Globe className="h-4 w-4 mr-2" />
              View Global
            </Button>
          )}
        </div>
        
        {locationPath.length > 0 && (
          <div className="flex items-center flex-wrap gap-1 pt-2">
            {locationPath.map((loc, index) => (
              <React.Fragment key={loc.id}>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-muted-foreground hover:text-primary"
                  onClick={() => handleBreadcrumbClick(loc)}
                >
                  {loc.name}
                </Button>
                {index < locationPath.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row h-[600px]">
          <div className="w-full md:w-1/3 h-full overflow-auto border-r">
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium">
                {activeLocation ? "Sub-locations" : "Top-level Locations"}
              </h3>
              
              {childLocations.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  No sub-locations found.
                </p>
              ) : (
                <div className="space-y-2">
                  {childLocations.map((location) => (
                    <LocationItem
                      key={location.id}
                      location={location}
                      onClick={() => {
                        setActiveLocation(location);
                        onSelectLocation?.(location);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-2/3 h-full">
            <Map
              center={mapCenter}
              zoom={mapZoom}
              markers={mapMarkers}
              className="h-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface LocationItemProps {
  location: Location;
  onClick: () => void;
}

const LocationItem: React.FC<LocationItemProps> = ({ location, onClick }) => {
  return (
    <Button
      variant="ghost"
      className="flex items-start justify-between w-full p-3 h-auto text-left"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="font-medium">{location.name}</div>
          <div className="text-xs text-muted-foreground capitalize">
            {location.type} · {location.vendorCount} vendors
          </div>
        </div>
      </div>
      <Badge variant={location.active ? "default" : "outline"} className="ml-2 shrink-0">
        {location.active ? "Active" : "Inactive"}
      </Badge>
    </Button>
  );
};

export default LocationMap;
