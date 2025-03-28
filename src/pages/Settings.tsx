
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your marketplace preferences and configurations
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
            <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="integrations" className="flex-1">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic marketplace settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-gray-50 p-6 mb-4">
                  <SettingsIcon className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-center">Settings Dashboard</h3>
                <p className="text-muted-foreground text-center max-w-md mt-2">
                  This page will allow you to configure your marketplace settings,
                  user accounts, notifications, and third-party integrations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account details and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                <p>Account settings content will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                <p>Notification settings content will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect third-party services and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                <p>Integrations settings content will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
