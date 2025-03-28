
import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ColumnDef, 
  CellContext,
} from "@tanstack/react-table";
import { 
  Calendar, 
  Package,
  Truck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  OrderStatus, 
  Order,
  orders, 
  getOrdersByStatus, 
  statusLabels, 
  statusColors, 
  updateOrderStatus 
} from "@/lib/data";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

interface OrderTableProps {
  filters: {
    status: string;
    dateRange: string;
  };
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

export function OrderTable({ filters, onStatusUpdate }: OrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders based on the current filters
  const filteredOrders = React.useMemo(() => {
    let result = [...orders];
    
    // Filter by status
    if (filters.status !== "all") {
      result = getOrdersByStatus(filters.status as OrderStatus);
    }
    
    // Filter by date range
    // Note: In a real app, you'd implement this based on actual dates
    // For demo purposes, we'll just use the existing data
    
    return result;
  }, [filters]);

  const handleRowClick = (orderId: string) => {
    const order = filteredOrders.find(o => o.id === orderId) || null;
    setSelectedOrder(order);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
  };

  const getNextStatusOptions = (currentStatus: OrderStatus): OrderStatus[] => {
    // ... keep existing code (status transition logic)
    switch (currentStatus) {
      case 'new':
        return ['confirmed', 'cancelled'];
      case 'confirmed':
        return ['processing', 'cancelled'];
      case 'processing':
        return ['ready_to_ship', 'cancelled'];
      case 'ready_to_ship':
        return ['out_for_delivery', 'cancelled'];
      case 'out_for_delivery':
        return ['delivered', 'returned'];
      case 'delivered':
        return ['returned'];
      case 'cancelled':
      case 'returned':
      default:
        return [];
    }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrder = updateOrderStatus(orderId, newStatus, 'current_user');
    if (updatedOrder) {
      onStatusUpdate(orderId, newStatus);
    }
  };

  const StatusCell = ({ row }: CellContext<any, unknown>) => {
    // ... keep existing code (status cell rendering)
    const status = row.original.status;
    const orderId = row.original.id;
    const nextStatusOptions = getNextStatusOptions(status);
    const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';

    return (
      <div className="flex items-center">
        <Badge className={`${colorClass} mr-2`}>
          {statusLabels[status]}
        </Badge>
        {nextStatusOptions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {nextStatusOptions.map(option => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleStatusChange(orderId, option)}
                >
                  {getStatusIcon(option)}
                  <span className="ml-2">{statusLabels[option]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  };

  const getStatusIcon = (status: OrderStatus) => {
    // ... keep existing code (status icon rendering)
    switch (status) {
      case 'confirmed':
        return <Calendar className="h-4 w-4" />;
      case 'processing':
      case 'ready_to_ship':
        return <Package className="h-4 w-4" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <Button 
          variant="link" 
          onClick={() => handleRowClick(row.original.id)}
          className="p-0 h-auto"
        >
          {row.original.id}
        </Button>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
    },
    {
      accessorKey: "vendorName",
      header: "Vendor",
    },
    {
      accessorKey: "locationName",
      header: "Location",
    },
    {
      accessorKey: "totalAmount",
      header: "Amount",
      cell: ({ row }) => <div>${row.original.totalAmount.toFixed(2)}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: StatusCell,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleRowClick(row.original.id)}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={filteredOrders}
        searchColumn="customerName"
        searchPlaceholder="Search orders..."
      />
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={Boolean(selectedOrder)}
          onOpenChange={(open) => {
            if (!open) closeDialog();
          }}
          onStatusUpdate={handleStatusChange}
        />
      )}
    </div>
  );
}
