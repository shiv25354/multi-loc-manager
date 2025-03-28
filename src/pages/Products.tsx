
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ProductHeader } from "@/components/products/ProductHeader";
import { ProductTable } from "@/components/products/ProductTable";

export default function Products() {
  const { toast } = useToast();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleAddProduct = (data: any) => {
    console.log("Adding product:", data);
    toast({
      title: "Product Added",
      description: `${data.name} has been successfully added.`,
    });
    setIsAddProductOpen(false);
  };

  return (
    <DashboardLayout>
      <Card>
        <CardContent className="pt-6">
          <ProductHeader 
            isAddProductOpen={isAddProductOpen} 
            setIsAddProductOpen={setIsAddProductOpen}
            onAddProduct={handleAddProduct}
          />
          <ProductTable />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
