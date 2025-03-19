
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Vendor } from "@/lib/data";
import { Edit, ExternalLink, MapPin, Star, Trash2, FileText, CheckCircle } from "lucide-react";

interface VendorTableProps {
  vendors: Vendor[];
  onView: (vendor: Vendor) => void;
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendorId: string) => void;
}

export function VendorTable({ vendors, onView, onEdit, onDelete }: VendorTableProps) {
  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "Vendor",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.logo} alt={row.original.name} />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{row.original.name}</div>
        </div>
      ),
    },
    {
      accessorKey: "locations",
      header: "Locations",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-1">{row.original.locations.length}</span>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
      ),
    },
    {
      accessorKey: "productsCount",
      header: "Products",
      cell: ({ row }) => row.original.productsCount,
    },
    {
      accessorKey: "ordersCount",
      header: "Orders",
      cell: ({ row }) => row.original.ordersCount.toLocaleString(),
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }) => (
        <div className="font-medium">
          ${(row.original.revenue / 1000).toFixed(1)}K
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-1">{row.original.rating.toFixed(1)}</span>
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
        </div>
      ),
    },
    {
      accessorKey: "verified",
      header: "Verification",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.verified ? (
            <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>Verified</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="text-amber-500 hover:text-amber-600 flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>Pending</span>
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.active ? "default" : "outline"}
          className={row.original.active ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {row.original.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onView(row.original)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-destructive"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${row.original.name}?`)) {
                onDelete(row.original.id);
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={vendors}
      searchColumn="name"
      searchPlaceholder="Search vendors..."
    />
  );
}
