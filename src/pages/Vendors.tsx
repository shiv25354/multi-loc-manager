
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Vendor, vendors, addVendor, updateVendor, deleteVendor } from "@/lib/data";
import { toast } from "sonner";
import { VendorDetail } from "@/components/vendors/VendorDetail";
import { VendorTable } from "@/components/vendors/VendorTable";
import { VendorHeader } from "@/components/vendors/VendorHeader";
import { VendorStats } from "@/components/vendors/VendorStats";

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

  const handleViewVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage grocery vendors, their products, and performance across all locations
          </p>
        </div>

        <VendorStats vendors={vendorList} />

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
              <VendorHeader 
                isAddVendorOpen={isAddVendorOpen} 
                setIsAddVendorOpen={setIsAddVendorOpen} 
                onAddVendor={handleAddVendor} 
              />
            </CardHeader>
            <CardContent className="pt-6">
              <VendorTable 
                vendors={vendorList} 
                onView={handleViewVendor}
                onEdit={handleViewVendor}
                onDelete={handleDeleteVendor}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Vendors;
