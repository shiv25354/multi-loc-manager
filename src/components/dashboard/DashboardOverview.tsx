
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { Map } from "@/components/ui/map";
import { 
  getLocationStats, 
  locations, 
  Location,
  getChildLocations
} from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const DashboardOverview: React.FC = () => {
  const stats = getLocationStats();
  const countryLocations = getChildLocations();

  const locationsMapData = countryLocations.map(location => ({
    id: location.id,
    position: location.coordinates || { lat: 0, lng: 0 },
    title: location.name,
    active: location.active,
  }));

  // Data for charts
  const locationTypeData = [
    { name: "Countries", value: stats.byType.countries },
    { name: "States", value: stats.byType.states },
    { name: "Cities", value: stats.byType.cities },
    { name: "Districts", value: stats.byType.districts },
    { name: "Zones", value: stats.byType.zones },
  ];

  const topLocationData = stats.topLocations.map(loc => ({
    name: loc.name,
    value: loc.revenue / 1000, // Convert to K for better display
  }));

  const monthlyOrdersData = [
    { name: "Jan", orders: 2300 },
    { name: "Feb", orders: 2900 },
    { name: "Mar", orders: 3200 },
    { name: "Apr", orders: 3800 },
    { name: "May", orders: 4100 },
    { name: "Jun", orders: 4500 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Locations Overview</CardTitle>
            <CardDescription>
              Global view of all registered marketplace locations
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <Map 
              center={{ lat: 30, lng: 0 }} 
              zoom={1.5} 
              markers={locationsMapData}
              className="h-full w-full rounded-md overflow-hidden"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Location Types</CardTitle>
            <CardDescription>
              Distribution by location category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <PieChart
              data={locationTypeData}
              index="name"
              categories={["value"]}
              valueFormatter={(value) => `${value} locations`}
              colors={["#0066CC", "#4E97F3", "#7FB7FF", "#B1D3FF", "#D8ECFF"]}
              className="h-full w-full max-w-full"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Top Locations by Revenue</CardTitle>
            <CardDescription>
              Highest performing marketplace regions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <BarChart
              data={topLocationData}
              index="name"
              categories={["value"]}
              valueFormatter={(value) => `$${value}K`}
              colors={["#0066CC"]}
              className="h-full w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Monthly Orders Trend</CardTitle>
            <CardDescription>
              Order volume across all locations
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <LineChart
              data={monthlyOrdersData}
              index="name"
              categories={["orders"]}
              valueFormatter={(value) => `${value.toLocaleString()} orders`}
              colors={["#0066CC"]}
              className="h-full w-full"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently Added Locations</CardTitle>
          <CardDescription>
            The latest additions to your marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.topLocations.slice(0, 3).map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{location.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {location.type}
            </p>
          </div>
          <Badge variant={location.active ? "default" : "outline"}>
            {location.active ? "Active" : "Inactive"}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Vendors</span>
            <span className="font-medium">{location.vendorCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Orders</span>
            <span className="font-medium">{location.ordersCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Revenue</span>
            <span className="font-medium">${(location.revenue / 1000).toFixed(1)}K</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOverview;
