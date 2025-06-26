
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Link, 
  Save,
  Users,
  UserCheck,
  UserX,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const userRoles = [
  { id: "admin", name: "Admin", description: "Full system access" },
  { id: "manager", name: "Manager", description: "Store management access" },
  { id: "vendor", name: "Vendor", description: "Product and order management" },
  { id: "delivery", name: "Delivery Partner", description: "Delivery management only" },
  { id: "customer", name: "Customer", description: "Basic shopping access" }
];

const sampleUsers = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@grocery.com", role: "admin", status: "active" },
  { id: 2, name: "Priya Sharma", email: "priya@grocery.com", role: "manager", status: "active" },
  { id: 3, name: "Amit Singh", email: "amit@grocery.com", role: "vendor", status: "inactive" },
];

export default function Settings() {
  const { toast } = useToast();
  const [users, setUsers] = useState(sampleUsers);
  const [profileData, setProfileData] = useState({
    name: "Store Admin",
    email: "admin@grocerystore.com",
    phone: "+91 9876543210",
    storeName: "Fresh Grocery Mart",
    address: "123 Market Street, Mumbai, Maharashtra"
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    toast({
      title: "User Status Updated",
      description: "User status has been changed successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grocery Store Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your grocery delivery system preferences, users, and configurations
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="w-full max-w-2xl">
            <TabsTrigger value="general" className="flex-1">
              <SettingsIcon className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="account" className="flex-1">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              Users & Roles
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex-1">
              <Link className="h-4 w-4 mr-2" />
              Integrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Store Configuration</CardTitle>
                  <CardDescription>
                    Configure basic grocery store settings and delivery preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input id="storeName" defaultValue="Fresh Grocery Mart" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storePhone">Store Phone</Label>
                      <Input id="storePhone" defaultValue="+91 9876543210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                      <Input id="deliveryRadius" type="number" defaultValue="15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
                      <Input id="minOrderValue" type="number" defaultValue="200" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Input id="storeAddress" defaultValue="123 Market Street, Mumbai, Maharashtra" />
                  </div>
                  <Button onClick={() => toast({ title: "Settings Saved", description: "Store configuration updated successfully." })}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your personal account details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                </div>
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Roles</CardTitle>
                  <CardDescription>
                    Define access levels for different user types in your grocery system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userRoles.map((role) => (
                      <div key={role.id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold">{role.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage users, their roles, and access permissions
                    </CardDescription>
                  </div>
                  <Button>Add New User</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {user.role}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? (
                              <UserCheck className="h-4 w-4 text-green-600" />
                            ) : (
                              <UserX className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure when and how you receive notifications for orders, deliveries, and system updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New Order Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Delivery Updates</h4>
                      <p className="text-sm text-muted-foreground">Receive updates on delivery status</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Low Stock Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get alerted when products are running low</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">System Maintenance</h4>
                      <p className="text-sm text-muted-foreground">Notifications about system updates and maintenance</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>
                </div>
                <Button onClick={() => toast({ title: "Notification Settings Saved", description: "Your notification preferences have been updated." })}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Integrations</CardTitle>
                  <CardDescription>
                    Connect payment gateways and delivery services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Razorpay</h3>
                      <p className="text-sm text-muted-foreground mb-3">Online payment processing</p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Paytm</h3>
                      <p className="text-sm text-muted-foreground mb-3">Digital wallet integration</p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">SMS Gateway</h3>
                      <p className="text-sm text-muted-foreground mb-3">Order and delivery notifications</p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Google Maps</h3>
                      <p className="text-sm text-muted-foreground mb-3">Location and route optimization</p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
