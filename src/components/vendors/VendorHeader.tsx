
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { AddVendorDialog } from "./AddVendorDialog";

interface VendorHeaderProps {
  isAddVendorOpen: boolean;
  setIsAddVendorOpen: (open: boolean) => void;
  onAddVendor: (data: any) => void;
}

export function VendorHeader({ isAddVendorOpen, setIsAddVendorOpen, onAddVendor }: VendorHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="space-y-1">
        <CardTitle>Grocery Vendors</CardTitle>
        <CardDescription>
          Manage grocery vendors, their products, and delivery areas across all locations
        </CardDescription>
      </div>
      <AddVendorDialog 
        isOpen={isAddVendorOpen}
        onOpenChange={setIsAddVendorOpen}
        onSubmit={onAddVendor}
      />
    </div>
  );
}
