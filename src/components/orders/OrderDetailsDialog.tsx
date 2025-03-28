
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order, statusLabels } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Package, Truck, User } from "lucide-react";

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

export function OrderDetailsDialog({
  order,
  isOpen,
  onOpenChange,
  onStatusUpdate,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  // Define the next possible statuses based on current status
  const getNextStatuses = (currentStatus: string): string[] => {
    switch (currentStatus) {
      case "new":
        return ["confirmed", "cancelled"];
      case "confirmed":
        return ["processing", "cancelled"];
      case "processing":
        return ["ready_to_ship", "cancelled"];
      case "ready_to_ship":
        return ["out_for_delivery", "cancelled"];
      case "out_for_delivery":
        return ["delivered", "returned"];
      case "delivered":
        return ["returned"];
      default:
        return [];
    }
  };

  const nextStatuses = getNextStatuses(order.status);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order #{order.id}</span>
            <Badge
              className={
                order.status === "delivered"
                  ? "bg-green-500"
                  : order.status === "cancelled" || order.status === "returned"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }
            >
              {statusLabels[order.status]}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Customer Details
              </h4>
              <p>{order.customerName}</p>
              <p>{order.customerEmail}</p>
              <p>{order.customerPhone}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Delivery Address
              </h4>
              <p>{order.deliveryAddress.street}</p>
              <p>
                {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                {order.deliveryAddress.zipCode}
              </p>
              <p>{order.deliveryAddress.country}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Order Items
            </h4>
            <div className="space-y-2">
              {order.products.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between font-medium">
            <span>Subtotal:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Truck className="h-4 w-4 mr-2" />
              Fulfillment
            </h4>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm text-muted-foreground">
                Last updated: {new Date(order.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>

          {nextStatuses.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {nextStatuses.map((status) => (
                <Button
                  key={status}
                  variant={
                    status === "cancelled" || status === "returned"
                      ? "destructive"
                      : status === "delivered"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    onStatusUpdate(order.id, status);
                    onOpenChange(false);
                  }}
                >
                  Mark as {statusLabels[status]}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
