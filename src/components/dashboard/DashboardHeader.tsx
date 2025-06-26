
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  ShoppingCart, 
  MapPin, 
  Users,
  Package,
  TrendingUp,
  Calendar,
  Truck
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
            <span>Last updated: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Grocery Delivery Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor your grocery delivery performance across all locations in India</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Stores"
          value="142"
          icon={MapPin}
          trend={8.2}
        />
        <StatCard
          title="Total Orders Today"
          value="1,847"
          icon={ShoppingCart}
          trend={12.1}
        />
        <StatCard
          title="Delivery Partners"
          value="324"
          icon={Truck}
          trend={5.4}
        />
        <StatCard
          title="Products Available"
          value="15,678"
          icon={Package}
          trend={-2.1}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
