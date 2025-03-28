
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash2, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

// Mock product data
const products = [
  {
    id: "1",
    name: "Smartphone X",
    sku: "SKU-12345",
    price: "$999.99",
    stock: 120,
    category: "Electronics",
    status: "approved",
  },
  {
    id: "2",
    name: "Designer T-Shirt",
    sku: "SKU-23456",
    price: "$49.99",
    stock: 350,
    category: "Clothing",
    status: "pending",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    sku: "SKU-34567",
    price: "$299.99",
    stock: 45,
    category: "Furniture",
    status: "approved",
  },
  {
    id: "4",
    name: "Gourmet Coffee Beans",
    sku: "SKU-45678",
    price: "$24.99",
    stock: 200,
    category: "Food",
    status: "rejected",
  },
];

export function ProductTable() {
  return (
    <div className="mt-6 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {product.status === "approved" ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  ) : product.status === "rejected" ? (
                    <XCircle className="h-4 w-4 text-red-500 mr-1" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                  )}
                  <span className="capitalize">
                    {product.status}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
