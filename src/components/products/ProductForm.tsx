
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Image, Tag, CheckSquare } from "lucide-react";

const productFormSchema = z.object({
  name: z.string().min(2, { message: "Product name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.string().min(1, { message: "Price is required" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  stock: z.string().min(1, { message: "Stock amount is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  approvalStatus: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const defaultValues: Partial<ProductFormValues> = {
  name: "",
  description: "",
  price: "",
  sku: "",
  stock: "",
  category: "",
  subcategory: "",
  brand: "",
  approvalStatus: "pending",
};

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
}

export function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const [locations, setLocations] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const handleSubmit = (data: ProductFormValues) => {
    const productData = {
      ...data,
      locations,
      tags,
      createdAt: new Date().toISOString(),
    };
    onSubmit(productData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description" 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU-12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
              
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Categorization */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Categorization</h3>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="food">Food & Beverages</SelectItem>
                      <SelectItem value="health">Health & Beauty</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sub-category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="smartphones">Smartphones</SelectItem>
                      <SelectItem value="laptops">Laptops</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="shirts">Shirts</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="nike">Nike</SelectItem>
                      <SelectItem value="adidas">Adidas</SelectItem>
                      <SelectItem value="ikea">IKEA</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {["New", "Featured", "Sale", "Limited", "Exclusive"].map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant={tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setTags((prev) =>
                        prev.includes(tag)
                          ? prev.filter((t) => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                    className="flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Button>
                ))}
              </div>
              <FormDescription className="mt-2">Select relevant tags for this product</FormDescription>
            </div>
          </div>

          {/* Product Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 flex items-center justify-center hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <Image className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Upload Image</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Location Availability</h3>
            <div className="space-y-2">
              {["Downtown Store", "Mall Location", "Airport Shop", "Online Store"].map((loc) => (
                <div key={loc} className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant={locations.includes(loc) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setLocations((prev) =>
                        prev.includes(loc)
                          ? prev.filter((l) => l !== loc)
                          : [...prev, loc]
                      );
                    }}
                    className="flex items-center justify-start w-full"
                  >
                    <CheckSquare className={`h-4 w-4 mr-2 ${locations.includes(loc) ? '' : 'opacity-50'}`} />
                    {loc}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Approval Status</h3>
            <FormField
              control={form.control}
              name="approvalStatus"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${
                      field.value === "approved" ? "bg-green-100" : 
                      field.value === "rejected" ? "bg-red-100" : "bg-yellow-100"
                    }`}>
                      <CheckCircle className={`h-5 w-5 ${
                        field.value === "approved" ? "text-green-600" : 
                        field.value === "rejected" ? "text-red-600" : "text-yellow-600"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">
                        {field.value === "approved" ? "Approved" : 
                         field.value === "rejected" ? "Rejected" : "Pending Approval"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {field.value === "pending" ? "This product will be reviewed before listing" : 
                         field.value === "approved" ? "This product is approved for listing" : 
                         "This product has been rejected"}
                      </p>
                    </div>
                  </div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Form>
  );
}
