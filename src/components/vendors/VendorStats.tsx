
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vendor } from "@/lib/data";
import { Users, Store, TrendingUp, Star, CheckCircle, AlertCircle } from "lucide-react";

interface VendorStatsProps {
  vendors: Vendor[];
}

export function VendorStats({ vendors }: VendorStatsProps) {
  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.active).length,
    verified: vendors.filter(v => v.verified).length,
    totalRevenue: vendors.reduce((sum, v) => sum + v.revenue, 0),
    averageRating: vendors.length > 0 ? vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length : 0,
    totalProducts: vendors.reduce((sum, v) => sum + v.productsCount, 0),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              {stats.active} Active
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              {stats.verified} Verified
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(1)}K</div>
          <p className="text-xs text-muted-foreground mt-2">
            Gross revenue from all vendors
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Total products across all vendors
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center gap-1">
            {stats.averageRating.toFixed(1)}
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Average vendor rating
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
