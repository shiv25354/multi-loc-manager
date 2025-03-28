
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DeliveryBoy,
  deliveryBoys,
  locations,
  getDeliveryBoysByZone,
} from "@/lib/data";
import { 
  MoreHorizontal, 
  Check, 
  X, 
  Edit, 
  Trash, 
  MapPin,
  Truck,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeliveryBoysTableProps {
  filters: {
    status: string;
    zone: string;
  };
  onSelectDeliveryBoy: (deliveryBoy: DeliveryBoy) => void;
  onStatusUpdate: (id: string, status: DeliveryBoy['status']) => void;
}

export function DeliveryBoysTable({
  filters,
  onSelectDeliveryBoy,
  onStatusUpdate,
}: DeliveryBoysTableProps) {
  const { toast } = useToast();
  
  // Filter delivery boys based on the current filters
  const filteredDeliveryBoys = React.useMemo(() => {
    let filtered = [...deliveryBoys];
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(db => db.status === filters.status);
    }
    
    if (filters.zone !== 'all') {
      filtered = filtered.filter(db => 
        db.assignedZones.includes(filters.zone)
      );
    }
    
    return filtered;
  }, [filters]);
  
  const handleDelete = (id: string) => {
    toast({
      title: "Not implemented",
      description: "Delete functionality would remove the delivery boy with ID: " + id,
    });
  };
  
  const getStatusBadgeClass = (status: DeliveryBoy['status']) => {
    switch (status) {
      case 'available':
        return "bg-green-100 text-green-800";
      case 'on_delivery':
        return "bg-amber-100 text-amber-800";
      case 'offline':
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };
  
  const getStatusLabel = (status: DeliveryBoy['status']) => {
    switch (status) {
      case 'available':
        return "Available";
      case 'on_delivery':
        return "On Delivery";
      case 'offline':
        return "Offline";
      default:
        return status;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  const getZonesLabel = (zoneIds: string[]) => {
    if (zoneIds.length === 0) return "None";
    
    const zoneNames = zoneIds.map(id => {
      const zone = locations.find(loc => loc.id === id);
      return zone ? zone.name : id;
    });
    
    if (zoneNames.length <= 2) {
      return zoneNames.join(', ');
    }
    
    return `${zoneNames[0]}, ${zoneNames[1]} +${zoneNames.length - 2}`;
  };
  
  const columns: ColumnDef<DeliveryBoy>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const deliveryBoy = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={deliveryBoy.avatar} />
              <AvatarFallback>{getInitials(deliveryBoy.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{deliveryBoy.name}</div>
              <div className="text-sm text-muted-foreground">{deliveryBoy.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "assignedZones",
      header: "Zones",
      cell: ({ row }) => getZonesLabel(row.original.assignedZones),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge className={getStatusBadgeClass(status)}>
            {getStatusLabel(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "totalDeliveries",
      header: "Deliveries",
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.original.rating;
        return (
          <div className="flex items-center">
            <span className="mr-1">{rating.toFixed(1)}</span>
            <svg
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 15.934l-6.18 3.254 1.18-6.875L.083 7.62l6.9-1.002L10 .439l3.018 6.179 6.9 1.002-4.917 4.693 1.18 6.875L10 15.934z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const deliveryBoy = row.original;
        
        return (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onSelectDeliveryBoy(deliveryBoy)}
            >
              <User className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onSelectDeliveryBoy(deliveryBoy)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(deliveryBoy.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusUpdate(deliveryBoy.id, 'available')}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark Available
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusUpdate(deliveryBoy.id, 'offline')}>
                  <X className="mr-2 h-4 w-4" />
                  Mark Offline
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredDeliveryBoys}
      searchColumn="name"
      searchPlaceholder="Search delivery boys..."
      className="mt-6"
    />
  );
}
