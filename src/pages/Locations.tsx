
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LocationMap from "@/components/locations/LocationMap";
import LocationManagement from "@/components/locations/LocationManagement";
import { Location } from "@/lib/data";

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Location Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage all marketplace locations, territories, and zones
          </p>
        </div>

        <LocationMap 
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />
        
        <LocationManagement 
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />
      </div>
    </DashboardLayout>
  );
};

export default Locations;
