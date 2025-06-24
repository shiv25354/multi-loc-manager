
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { OrderHeader } from "@/components/orders/OrderHeader";
import { OrderTable } from "@/components/orders/OrderTable";
import { OrderTrackingSection } from "@/components/orders/OrderTrackingSection";

export default function Orders() {
  const { toast } = useToast();
  const [orderFilters, setOrderFilters] = useState({
    status: "all",
    dateRange: "all",
  });
  
  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log("Updating order status:", orderId, newStatus);
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} has been updated to ${newStatus}.`,
    });
  };

  const handleTrackingUpdate = (orderId: string, deliveryTime: string, paymentType: string) => {
    console.log("Updating order tracking:", orderId, deliveryTime, paymentType);
    // In a real app, this would update the order in the database
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Order Tracking Section */}
        <OrderTrackingSection
          orderId="ORD-001"
          currentDeliveryTime="afternoon"
          currentPaymentType="card"
          onUpdate={handleTrackingUpdate}
        />

        {/* Orders Management */}
        <Card>
          <CardContent className="pt-6">
            <OrderHeader 
              filters={orderFilters}
              onFilterChange={setOrderFilters}
            />
            <OrderTable 
              filters={orderFilters}
              onStatusUpdate={handleStatusUpdate}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
