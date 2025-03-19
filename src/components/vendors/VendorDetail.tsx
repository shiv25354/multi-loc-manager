
import React, { useState } from "react";
import { Vendor, getVendorLocations, locations } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Package, ShoppingCart, BarChart3, Wallet, CreditCard, FileText, CheckCircle, XCircle, Edit, Trash2, ArrowLeftRight } from "lucide-react";
import { VendorForm } from "./VendorForm";
import { toast } from "sonner";

interface VendorDetailProps {
  vendor: Vendor;
  onClose: () => void;
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendorId: string) => void;
}

export function VendorDetail({ vendor, onClose, onEdit, onDelete }: VendorDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const vendorLocations = getVendorLocations(vendor.id);
  
  // Sample transaction data for demonstration
  const transactions = [
    { id: "t1", date: "2023-07-15", type: "payment", amount: 1250.00, status: "completed" },
    { id: "t2", date: "2023-07-01", type: "commission", amount: -320.50, status: "completed" },
    { id: "t3", date: "2023-06-15", type: "payment", amount: 980.75, status: "completed" },
    { id: "t4", date: "2023-06-01", type: "commission", amount: -245.20, status: "completed" },
  ];

  // Sample document data for demonstration
  const documents = [
    { id: "d1", name: "Business Registration", status: "verified", date: "2023-01-10" },
    { id: "d2", name: "Tax Certificate", status: "verified", date: "2023-01-15" },
    { id: "d3", name: "Bank Account Details", status: "pending", date: "2023-02-01" },
    { id: "d4", name: "Identity Verification", status: "rejected", date: "2023-02-05" },
  ];

  const handleEdit = (data: any) => {
    const updatedVendor = { ...vendor, ...data };
    onEdit(updatedVendor);
    setIsEditing(false);
    toast.success("Vendor updated successfully");
  };

  const handleDelete = () => {
    // Show a confirmation dialog
    if (window.confirm(`Are you sure you want to delete ${vendor.name}?`)) {
      onDelete(vendor.id);
      toast.success("Vendor deleted successfully");
    }
  };

  if (isEditing) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Edit Vendor</h2>
          <p className="text-muted-foreground">Update vendor information</p>
        </div>
        <VendorForm 
          initialData={vendor} 
          onSubmit={handleEdit} 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={vendor.logo} alt={vendor.name} />
            <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{vendor.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={vendor.active ? "default" : "outline"} className={vendor.active ? "bg-green-500 hover:bg-green-600" : ""}>
                {vendor.active ? "Active" : "Inactive"}
              </Badge>
              {vendor.verified && (
                <Badge variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(vendor.revenue / 1000).toFixed(1)}K</div>
            <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendor.ordersCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+5.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendor.productsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">+3 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="wallet">Wallet & Payouts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                  <p>{vendor.email || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                  <p>{vendor.phone || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
                  <p>{vendor.website || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Joined Date</h4>
                  <p>{vendor.joinedDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Rating</h4>
                  <div className="flex items-center">
                    <span className="mr-1">{vendor.rating.toFixed(1)}</span>
                    <svg className="h-4 w-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Commission Rate</h4>
                  <p>{vendor.commissionRate || 10}%</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                <p className="mt-1">{vendor.description || "No description provided."}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Authorized Locations</CardTitle>
              <CardDescription>
                Locations where this vendor is authorized to operate
              </CardDescription>
            </CardHeader>
            <CardContent>
              {vendorLocations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendorLocations.map((location) => (
                    <div key={location.id} className="flex items-center gap-2 p-3 border rounded-md">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{location.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No locations assigned</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Documents</CardTitle>
              <CardDescription>
                Documents submitted by the vendor for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded on {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === "verified" && (
                        <Badge className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {doc.status === "pending" && (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          Pending
                        </Badge>
                      )}
                      {doc.status === "rejected" && (
                        <Badge variant="outline" className="text-red-500 border-red-500">
                          <XCircle className="h-3 w-3 mr-1" />
                          Rejected
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wallet" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(vendor.revenue * 0.8 / 1000).toFixed(1)}K</div>
                <div className="flex items-center justify-between mt-6">
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payout
                  </Button>
                  <Button variant="outline">
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Transaction History
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Commission Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission Rate:</span>
                    <span className="font-medium">{vendor.commissionRate || 10}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Earnings:</span>
                    <span className="font-medium">${(vendor.revenue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commission Amount:</span>
                    <span className="font-medium">${(vendor.revenue * (vendor.commissionRate || 10) / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Payout:</span>
                    <span className="font-medium">${(vendor.revenue - (vendor.revenue * (vendor.commissionRate || 10) / 100)).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      {transaction.type === "payment" ? (
                        <Wallet className="h-5 w-5 text-green-500" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-amber-500" />
                      )}
                      <div>
                        <p className="font-medium capitalize">{transaction.type}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-amber-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
