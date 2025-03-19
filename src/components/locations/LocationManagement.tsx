import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Globe, Plus, Trash2 } from "lucide-react";
import { Location, getChildLocations, getLocationTypeLabel } from "@/lib/data";
import { cn } from "@/lib/utils";

interface LocationManagementProps {
  selectedLocation?: Location | null;
  onSelectLocation?: (location: Location) => void;
}

const LocationManagement: React.FC<LocationManagementProps> = ({
  selectedLocation,
  onSelectLocation,
}) => {
  const [locations] = useState<Location[]>(() => {
    return selectedLocation 
      ? getChildLocations(selectedLocation.id) 
      : getChildLocations();
  });
  
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);

  const columns: ColumnDef<Location>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.original.name}</div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">
          {getLocationTypeLabel(row.original.type)}
        </div>
      ),
    },
    {
      accessorKey: "vendorCount",
      header: "Vendors",
      cell: ({ row }) => row.original.vendorCount,
    },
    {
      accessorKey: "ordersCount",
      header: "Orders",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.ordersCount.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }) => (
        <div className="font-medium">
          ${(row.original.revenue / 1000).toFixed(1)}K
        </div>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.active ? "default" : "outline"} className={row.original.active ? "bg-green-500 hover:bg-green-600" : ""}>
          {row.original.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSelectLocation?.(row.original)}
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Location Management</CardTitle>
            <CardDescription>
              {selectedLocation
                ? `Manage sub-locations in ${selectedLocation.name}`
                : "Manage all locations in your marketplace"}
            </CardDescription>
          </div>
          <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Location</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>
                  Create a new location for your marketplace
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Location name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger id="type" className="col-span-3">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="state">State/Province</SelectItem>
                      <SelectItem value="city">City</SelectItem>
                      <SelectItem value="district">District</SelectItem>
                      <SelectItem value="zone">Zone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedLocation && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parent" className="text-right">
                      Parent
                    </Label>
                    <Input
                      id="parent"
                      value={selectedLocation.name}
                      readOnly
                      className="col-span-3 bg-muted"
                    />
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coordinates" className="text-right">
                    Coordinates
                  </Label>
                  <div className="col-span-3 flex gap-2">
                    <Input placeholder="Latitude" className="flex-1" />
                    <Input placeholder="Longitude" className="flex-1" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-start-2 col-span-3 flex items-center space-x-2">
                    <Checkbox id="active" defaultChecked />
                    <label
                      htmlFor="active"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Active location
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddLocationOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddLocationOpen(false)}>Add Location</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={locations}
            searchColumn="name"
            searchPlaceholder="Search locations..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationManagement;
