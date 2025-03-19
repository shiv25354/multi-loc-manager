
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Globe, 
  MapPin, 
  Users,
  ShoppingCart,
  TrendingUp,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon,
  trend,
  className
}) => {
  return (
    <Card className={cn(
      "p-6 flex items-start justify-between transition-all bg-white/95 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1", 
      className
    )}>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            trend >= 0 ? "text-green-500" : "text-red-500"
          )}>
            <TrendingUp className={cn(
              "h-3 w-3 mr-1",
              trend < 0 && "rotate-180"
            )} />
            <span>{Math.abs(trend)}% from last month</span>
          </div>
        )}
      </div>
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </Card>
  );
};

const DashboardHeader: React.FC = () => {
  return (
    <div className="space-y-8 mb-10">
      <div>
        <div className="inline-block">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span>Last updated: June 12, 2023 at 10:45 AM</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor your marketplace performance across all locations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Locations"
          value="24"
          icon={Globe}
          trend={5.2}
        />
        <StatCard
          title="Active Stores"
          value="568"
          icon={MapPin}
          trend={3.1}
        />
        <StatCard
          title="Total Vendors"
          value="1,254"
          icon={Users}
          trend={-2.3}
        />
        <StatCard
          title="Total Orders"
          value="28,456"
          icon={ShoppingCart}
          trend={7.8}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
