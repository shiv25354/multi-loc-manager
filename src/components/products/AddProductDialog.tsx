
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Plus } from "lucide-react";

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function AddProductDialog({ isOpen, onOpenChange, onSubmit }: AddProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your marketplace
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ProductForm 
            onSubmit={onSubmit} 
            onCancel={() => onOpenChange(false)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
