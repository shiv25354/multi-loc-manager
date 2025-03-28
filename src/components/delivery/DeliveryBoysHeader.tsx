
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { locations, getChildLocations } from "@/lib/data";

interface DeliveryBoysHeaderProps {
  filters: {
    status: string;
    zone: string;
  };
  onFilterChange: (filters: { status: string; zone: string }) => void;
  onAddDeliveryBoy: () => void;
}

export function DeliveryBoysHeader({
  filters,
  onFilterChange,
  onAddDeliveryBoy,
}: DeliveryBoysHeaderProps) {
  // Get all zones (locations with type 'zone')
  const zones = locations.filter(loc => loc.type === 'zone');
  const cities = locations.filter(loc => loc.type === 'city');

  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Delivery Boys</h2>
        <p className="text-muted-foreground">
          Manage delivery personnel, track performance, and assign orders
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <div className="flex gap-2">
          <div className="w-[140px]">
            <Select
              value={filters.status}
              onValueChange={(value) =>
                onFilterChange({ ...filters, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="on_delivery">On Delivery</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-[160px]">
            <Select
              value={filters.zone}
              onValueChange={(value) =>
                onFilterChange({ ...filters, zone: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={onAddDeliveryBoy}>
          <Plus className="h-4 w-4 mr-1" />
          Add Delivery Boy
        </Button>
      </div>
    </div>
  );
}
