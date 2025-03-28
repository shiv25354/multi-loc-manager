
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart4 } from "lucide-react";

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            View performance metrics and business insights
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Track key performance indicators across your marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-purple-50 p-6 mb-4">
              <BarChart4 className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-medium text-center">Analytics Dashboard</h3>
            <p className="text-muted-foreground text-center max-w-md mt-2">
              This page will display comprehensive analytics and reporting tools to help you 
              understand your marketplace performance and make data-driven decisions.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
