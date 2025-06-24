
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DeliveryBoy, locations } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface DeliveryBoyDetailsDialogProps {
  deliveryBoy: DeliveryBoy | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isNewDeliveryBoy?: boolean;
}

export function DeliveryBoyDetailsDialog({
  deliveryBoy,
  isOpen,
  onOpenChange,
  isNewDeliveryBoy = false,
}: DeliveryBoyDetailsDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: deliveryBoy?.name || "",
    email: deliveryBoy?.email || "",
    phone: deliveryBoy?.phone || "",
    status: deliveryBoy?.status || "available",
  });

  const handleSave = () => {
    console.log("Saving delivery boy:", formData);
    toast({
      title: isNewDeliveryBoy ? "Delivery Boy Added" : "Delivery Boy Updated",
      description: `${formData.name} has been ${isNewDeliveryBoy ? "added" : "updated"} successfully.`,
    });
    onOpenChange(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getStatusBadgeClass = (status: DeliveryBoy['status']) => {
    switch (status) {
      case 'available':
        return "bg-green-100 text-green-800";
      case 'on_delivery':
        return "bg-amber-100 text-amber-800";
      case 'offline':
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const zones = locations.filter(loc => loc.type === 'zone');

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isNewDeliveryBoy ? "Add New Delivery Boy" : "Delivery Boy Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={deliveryBoy?.avatar} />
              <AvatarFallback>{getInitials(formData.name || "DB")}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as DeliveryBoy['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="on_delivery">On Delivery</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Performance Stats (only for existing delivery boys) */}
          {!isNewDeliveryBoy && deliveryBoy && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Performance Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {deliveryBoy.totalDeliveries}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Deliveries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {deliveryBoy.rating.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center">
                  <Badge className={getStatusBadgeClass(deliveryBoy.status)}>
                    {deliveryBoy.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isNewDeliveryBoy ? "Add Delivery Boy" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
