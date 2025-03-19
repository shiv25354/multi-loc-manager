
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Vendor, locations, vendors } from "@/lib/data";
import { Edit, ExternalLink, MapPin, Plus, Star, Trash2 } from "lucide-react";

const Vendors = () => {
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);

  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "Vendor",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.logo} alt={row.original.name} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{row.original.name}</div>
        </div>
      ),
    },
    {
      accessorKey: "locations",
      header: "Locations",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-1">{row.original.locations.length}</span>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
      ),
    },
    {
      accessorKey: "productsCount",
      header: "Products",
      cell: ({ row }) => row.original.productsCount,
    },
    {
      accessorKey: "ordersCount",
      header: "Orders",
      cell: ({ row }) => row.original.ordersCount.toLocaleString(),
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
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-1">{row.original.rating.toFixed(1)}</span>
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
        </div>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.active ? "default" : "outline"}
          className={row.original.active ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {row.original.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <ExternalLink className="h-4 w-4" />
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
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage vendors and their authorized locations
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Vendors</CardTitle>
              <CardDescription>
                Manage vendors across all your marketplace locations
              </CardDescription>
            </div>

            <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Add Vendor</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Vendor</DialogTitle>
                  <DialogDescription>
                    Register a new vendor to your marketplace
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" placeholder="Vendor name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="logo" className="text-right">
                      Logo URL
                    </Label>
                    <Input id="logo" placeholder="https://..." className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="locations" className="text-right">
                      Locations
                    </Label>
                    <Select>
                      <SelectTrigger id="locations" className="col-span-3">
                        <SelectValue placeholder="Select locations" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name} ({location.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-start-2 col-span-3 flex items-center space-x-2">
                      <Checkbox id="active" defaultChecked />
                      <label
                        htmlFor="active"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active vendor
                      </label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddVendorOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddVendorOpen(false)}>Add Vendor</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="pt-6">
            <DataTable
              columns={columns}
              data={vendors}
              searchColumn="name"
              searchPlaceholder="Search vendors..."
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Vendors;
