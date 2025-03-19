
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Vendor, locations, vendors, addVendor, updateVendor, deleteVendor } from "@/lib/data";
import { Edit, ExternalLink, MapPin, Plus, Star, Trash2, FileText, CheckCircle } from "lucide-react";
import { VendorForm } from "@/components/vendors/VendorForm";
import { VendorDetail } from "@/components/vendors/VendorDetail";
import { toast } from "sonner";

const Vendors = () => {
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendorList, setVendorList] = useState<Vendor[]>(vendors);

  const handleAddVendor = (data: any) => {
    try {
      const newVendor = addVendor({
        ...data,
        productsCount: 0,
        ordersCount: 0,
        revenue: 0,
        rating: 0,
        joinedDate: new Date().toISOString().split('T')[0],
      });
      
      setVendorList([...vendorList, newVendor]);
      setIsAddVendorOpen(false);
      toast.success("Vendor added successfully");
    } catch (error) {
      toast.error("Failed to add vendor");
      console.error(error);
    }
  };

  const handleUpdateVendor = (updatedVendor: Vendor) => {
    try {
      updateVendor(updatedVendor);
      setVendorList(vendorList.map(v => v.id === updatedVendor.id ? updatedVendor : v));
      setSelectedVendor(null);
      toast.success("Vendor updated successfully");
    } catch (error) {
      toast.error("Failed to update vendor");
      console.error(error);
    }
  };

  const handleDeleteVendor = (vendorId: string) => {
    try {
      deleteVendor(vendorId);
      setVendorList(vendorList.filter(v => v.id !== vendorId));
      setSelectedVendor(null);
      toast.success("Vendor deleted successfully");
    } catch (error) {
      toast.error("Failed to delete vendor");
      console.error(error);
    }
  };

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
      accessorKey: "verified",
      header: "Verification",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.verified ? (
            <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Verified</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="text-amber-500 hover:text-amber-600 flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>Pending</span>
            </Badge>
          )}
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
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSelectedVendor(row.original)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSelectedVendor(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-destructive"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${row.original.name}?`)) {
                handleDeleteVendor(row.original.id);
              }
            }}
          >
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

        {selectedVendor ? (
          <VendorDetail 
            vendor={selectedVendor} 
            onClose={() => setSelectedVendor(null)} 
            onEdit={handleUpdateVendor}
            onDelete={handleDeleteVendor}
          />
        ) : (
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
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Add New Vendor</DialogTitle>
                    <DialogDescription>
                      Register a new vendor to your marketplace
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <VendorForm 
                      onSubmit={handleAddVendor} 
                      onCancel={() => setIsAddVendorOpen(false)} 
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="pt-6">
              <DataTable
                columns={columns}
                data={vendorList}
                searchColumn="name"
                searchPlaceholder="Search vendors..."
              />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vendors;
