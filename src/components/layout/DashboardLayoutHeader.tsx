
import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserMenu from "./UserMenu";

const menuItems = [
  { title: "Dashboard", path: "/" },
  { title: "Locations", path: "/locations" },
  { title: "Vendors", path: "/vendors" },
  { title: "Products", path: "/products" },
  { title: "Orders", path: "/orders" },
  { title: "Inventory", path: "/inventory" },
  { title: "Analytics", path: "/analytics" },
  { title: "Maps", path: "/maps" },
  { title: "Settings", path: "/settings" },
];

const DashboardLayoutHeader: React.FC = () => {
  const location = useLocation();

  return (
    <header className="h-16 flex items-center px-6 border-b bg-white/90 backdrop-blur-sm z-10 sticky top-0">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg hidden sm:inline-block">
            {menuItems.find((item) => item.path === location.pathname)?.title || "Dashboard"}
          </h2>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserMenu />
      </div>
    </header>
  );
};

export default DashboardLayoutHeader;
