
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Boxes } from "lucide-react";

export default function Inventory() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage inventory across all locations
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>
              Monitor stock levels and inventory movement across all locations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-blue-50 p-6 mb-4">
              <Boxes className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-center">Inventory Tracking System</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              This page will display inventory levels, stock alerts, and inventory movement 
              across all marketplace locations.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
