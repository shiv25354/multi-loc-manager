
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Map } from "@/components/ui/map";

export default function Maps() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Location Maps</h1>
          <p className="text-muted-foreground mt-1">
            Visualize marketplace coverage and delivery zones
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Coverage Map</CardTitle>
            <CardDescription>
              View all active locations, service zones, and delivery areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full rounded-md border overflow-hidden">
              <Map 
                center={{ lat: 37.7749, lng: -122.4194 }}
                zoom={4}
                markers={[
                  { 
                    id: '1', 
                    position: { lat: 37.7749, lng: -122.4194 },
                    title: 'San Francisco',
                    active: true
                  },
                  {
                    id: '2',
                    position: { lat: 34.0522, lng: -118.2437 },
                    title: 'Los Angeles',
                    active: false
                  },
                  {
                    id: '3',
                    position: { lat: 40.7128, lng: -74.0060 },
                    title: 'New York',
                    active: false
                  }
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
