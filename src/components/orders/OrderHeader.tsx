
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { statusLabels } from "@/lib/data";

interface OrderHeaderProps {
  filters: {
    status: string;
    dateRange: string;
  };
  onFilterChange: (filters: any) => void;
}

export function OrderHeader({ filters, onFilterChange }: OrderHeaderProps) {
  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value });
  };
  
  const handleDateRangeChange = (value: string) => {
    onFilterChange({ ...filters, dateRange: value });
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-4">
      <div className="space-y-1">
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          Manage and track all orders across your marketplace
        </CardDescription>
      </div>
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <div className="space-y-1">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status-filter" className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">{statusLabels.new}</SelectItem>
              <SelectItem value="confirmed">{statusLabels.confirmed}</SelectItem>
              <SelectItem value="processing">{statusLabels.processing}</SelectItem>
              <SelectItem value="ready_to_ship">{statusLabels.ready_to_ship}</SelectItem>
              <SelectItem value="out_for_delivery">{statusLabels.out_for_delivery}</SelectItem>
              <SelectItem value="delivered">{statusLabels.delivered}</SelectItem>
              <SelectItem value="cancelled">{statusLabels.cancelled}</SelectItem>
              <SelectItem value="returned">{statusLabels.returned}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="date-filter">Date Range</Label>
          <Select value={filters.dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger id="date-filter" className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
