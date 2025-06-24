
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, CreditCard, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderTrackingProps {
  orderId: string;
  currentDeliveryTime?: string;
  currentPaymentType?: string;
  onUpdate: (orderId: string, deliveryTime: string, paymentType: string) => void;
}

export function OrderTrackingSection({ orderId, currentDeliveryTime, currentPaymentType, onUpdate }: OrderTrackingProps) {
  const { toast } = useToast();
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(currentDeliveryTime || "");
  const [selectedPaymentType, setSelectedPaymentType] = useState(currentPaymentType || "");

  const deliveryTimeSlots = [
    { value: "morning", label: "Morning (9:00 AM - 12:00 PM)", icon: "🌅" },
    { value: "afternoon", label: "Afternoon (12:00 PM - 5:00 PM)", icon: "☀️" },
    { value: "evening", label: "Evening (5:00 PM - 9:00 PM)", icon: "🌆" },
    { value: "anytime", label: "Anytime", icon: "⏰" }
  ];

  const paymentTypes = [
    { value: "cash", label: "Cash on Delivery", icon: "💵" },
    { value: "card", label: "Credit/Debit Card", icon: "💳" },
    { value: "digital", label: "Digital Payment", icon: "📱" },
    { value: "upi", label: "UPI Payment", icon: "🏦" }
  ];

  const handleUpdate = () => {
    if (!selectedDeliveryTime || !selectedPaymentType) {
      toast({
        title: "Missing Selection",
        description: "Please select both delivery time and payment type.",
        variant: "destructive"
      });
      return;
    }

    onUpdate(orderId, selectedDeliveryTime, selectedPaymentType);
    toast({
      title: "Order Updated",
      description: `Delivery preferences updated for order #${orderId}`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Order Delivery Tracking & Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Order #{orderId}
          </Badge>
          {currentDeliveryTime && (
            <Badge className="bg-blue-100 text-blue-800">
              {deliveryTimeSlots.find(slot => slot.value === currentDeliveryTime)?.label || currentDeliveryTime}
            </Badge>
          )}
          {currentPaymentType && (
            <Badge className="bg-green-100 text-green-800">
              {paymentTypes.find(type => type.value === currentPaymentType)?.label || currentPaymentType}
            </Badge>
          )}
        </div>

        {/* Delivery Time Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Preferred Delivery Time
          </Label>
          <RadioGroup value={selectedDeliveryTime} onValueChange={setSelectedDeliveryTime}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deliveryTimeSlots.map((slot) => (
                <div key={slot.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={slot.value} id={`time-${slot.value}`} />
                  <Label htmlFor={`time-${slot.value}`} className="flex items-center gap-2 cursor-pointer flex-1">
                    <span>{slot.icon}</span>
                    <span>{slot.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Payment Type Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Method
          </Label>
          <Select value={selectedPaymentType} onValueChange={setSelectedPaymentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Update Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleUpdate}
            disabled={!selectedDeliveryTime || !selectedPaymentType}
            className="min-w-[120px]"
          >
            Update Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
