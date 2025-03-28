
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { AddProductDialog } from "./AddProductDialog";

interface ProductHeaderProps {
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
  onAddProduct: (data: any) => void;
}

export function ProductHeader({ 
  isAddProductOpen, 
  setIsAddProductOpen, 
  onAddProduct 
}: ProductHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="space-y-1">
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage products across all your marketplace locations
        </CardDescription>
      </div>
      <AddProductDialog
        isOpen={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onSubmit={onAddProduct}
      />
    </div>
  );
}
