
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DeliveryBoysHeader } from "@/components/delivery/DeliveryBoysHeader";
import { DeliveryBoysTable } from "@/components/delivery/DeliveryBoysTable";
import { DeliveryBoyDetailsDialog } from "@/components/delivery/DeliveryBoyDetailsDialog";
import { DeliveryBoy } from "@/lib/data";

export default function DeliveryBoys() {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    status: "all",
    zone: "all",
  });
  
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState<DeliveryBoy | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const handleAddDeliveryBoy = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleStatusUpdate = (id: string, status: DeliveryBoy['status']) => {
    console.log("Updating delivery boy status:", id, status);
    toast({
      title: "Status Updated",
      description: `Delivery boy status has been updated to ${status}.`,
    });
  };

  return (
    <DashboardLayout>
      <Card>
        <CardContent className="pt-6">
          <DeliveryBoysHeader 
            filters={filters}
            onFilterChange={setFilters}
            onAddDeliveryBoy={handleAddDeliveryBoy}
          />
          <DeliveryBoysTable 
            filters={filters}
            onSelectDeliveryBoy={setSelectedDeliveryBoy}
            onStatusUpdate={handleStatusUpdate}
          />
          
          {selectedDeliveryBoy && (
            <DeliveryBoyDetailsDialog
              deliveryBoy={selectedDeliveryBoy}
              isOpen={!!selectedDeliveryBoy}
              onOpenChange={(open) => {
                if (!open) setSelectedDeliveryBoy(null);
              }}
            />
          )}
          
          <DeliveryBoyDetailsDialog
            deliveryBoy={null}
            isOpen={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            isNewDeliveryBoy={true}
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
