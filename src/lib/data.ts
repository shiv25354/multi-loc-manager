export interface Location {
  id: string;
  name: string;
  type: 'country' | 'state' | 'city' | 'district' | 'zone';
  parent?: string; // ID of parent location
  vendorCount: number;
  ordersCount: number;
  revenue: number;
  active: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  locations: string[]; // IDs of locations
  productsCount: number;
  ordersCount: number;
  revenue: number;
  rating: number;
  joinedDate: string;
  active: boolean;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  verified?: boolean;
  commissionRate?: number;
}

export const locations: Location[] = [
  {
    id: "us",
    name: "United States",
    type: "country",
    vendorCount: 245,
    ordersCount: 12500,
    revenue: 2450000,
    active: true,
    coordinates: { lat: 37.0902, lng: -95.7129 }
  },
  {
    id: "ca",
    name: "Canada",
    type: "country",
    vendorCount: 87,
    ordersCount: 3200,
    revenue: 520000,
    active: true,
    coordinates: { lat: 56.1304, lng: -106.3468 }
  },
  {
    id: "uk",
    name: "United Kingdom",
    type: "country",
    vendorCount: 112,
    ordersCount: 5400,
    revenue: 980000,
    active: true,
    coordinates: { lat: 55.3781, lng: -3.4360 }
  },
  {
    id: "au",
    name: "Australia",
    type: "country",
    vendorCount: 58,
    ordersCount: 2100,
    revenue: 380000,
    active: true,
    coordinates: { lat: -25.2744, lng: 133.7751 }
  },
  {
    id: "ca-on",
    name: "Ontario",
    type: "state",
    parent: "ca",
    vendorCount: 32,
    ordersCount: 1500,
    revenue: 275000,
    active: true,
    coordinates: { lat: 51.2538, lng: -85.3232 }
  },
  {
    id: "us-ca",
    name: "California",
    type: "state",
    parent: "us",
    vendorCount: 120,
    ordersCount: 7200,
    revenue: 1500000,
    active: true,
    coordinates: { lat: 36.7783, lng: -119.4179 }
  },
  {
    id: "us-ny",
    name: "New York",
    type: "state",
    parent: "us",
    vendorCount: 85,
    ordersCount: 4500,
    revenue: 950000,
    active: true,
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "us-ca-sf",
    name: "San Francisco",
    type: "city",
    parent: "us-ca",
    vendorCount: 48,
    ordersCount: 3100,
    revenue: 620000,
    active: true,
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: "us-ca-la",
    name: "Los Angeles",
    type: "city",
    parent: "us-ca",
    vendorCount: 72,
    ordersCount: 4100,
    revenue: 880000,
    active: true,
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: "us-ny-nyc",
    name: "New York City",
    type: "city",
    parent: "us-ny",
    vendorCount: 85,
    ordersCount: 4500,
    revenue: 950000,
    active: true,
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "us-ny-nyc-manhattan",
    name: "Manhattan",
    type: "district",
    parent: "us-ny-nyc",
    vendorCount: 42,
    ordersCount: 2200,
    revenue: 580000,
    active: true,
    coordinates: { lat: 40.7831, lng: -73.9712 }
  },
  {
    id: "us-ny-nyc-brooklyn",
    name: "Brooklyn",
    type: "district",
    parent: "us-ny-nyc",
    vendorCount: 38,
    ordersCount: 1800,
    revenue: 320000,
    active: true,
    coordinates: { lat: 40.6782, lng: -73.9442 }
  },
  {
    id: "us-ca-sf-downtown",
    name: "Downtown SF",
    type: "zone",
    parent: "us-ca-sf",
    vendorCount: 22,
    ordersCount: 1500,
    revenue: 320000,
    active: true,
    coordinates: { lat: 37.7749, lng: -122.4194 }
  }
];

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Artisan Crafts",
    logo: "https://images.unsplash.com/photo-1572177215152-32f247303126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0aXNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=80",
    locations: ["us-ca-sf", "us-ca-la"],
    productsCount: 120,
    ordersCount: 450,
    revenue: 85000,
    rating: 4.8,
    joinedDate: "2021-06-12",
    active: true,
    description: "Artisan Crafts specializes in handmade products crafted by local artisans across California.",
    email: "info@artisancrafts.com",
    phone: "+1 (415) 555-1234",
    website: "https://artisancrafts.com",
    verified: true,
    commissionRate: 8
  },
  {
    id: "v2",
    name: "Tech Haven",
    logo: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=80",
    locations: ["us-ny-nyc", "ca-on"],
    productsCount: 83,
    ordersCount: 320,
    revenue: 62000,
    rating: 4.5,
    joinedDate: "2020-11-03",
    active: true,
    description: "Tech Haven offers the latest electronics and gadgets for tech enthusiasts.",
    email: "sales@techhaven.com",
    phone: "+1 (212) 555-5678",
    website: "https://techhaven.com",
    verified: true,
    commissionRate: 12
  },
  {
    id: "v3",
    name: "Global Goods",
    logo: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2xvYmFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=80",
    locations: ["us", "ca", "uk", "au"],
    productsCount: 250,
    ordersCount: 1200,
    revenue: 225000,
    rating: 4.7,
    joinedDate: "2019-04-25",
    active: true,
    description: "Global Goods sources unique products from around the world, bringing international flavors to your doorstep.",
    email: "hello@globalgoods.com",
    phone: "+1 (800) 555-9012",
    website: "https://globalgoods.com",
    verified: true,
    commissionRate: 10
  },
  {
    id: "v4",
    name: "Urban Essentials",
    logo: "https://images.unsplash.com/photo-1611348586840-ea9872d33411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJiYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=80",
    locations: ["us-ca-sf-downtown", "us-ny-nyc-manhattan"],
    productsCount: 75,
    ordersCount: 380,
    revenue: 72000,
    rating: 4.6,
    joinedDate: "2022-01-07",
    active: true,
    description: "Urban Essentials provides stylish and functional products for modern city living.",
    email: "contact@urbanessentials.com",
    phone: "+1 (628) 555-3456",
    website: "https://urbanessentials.com",
    verified: false,
    commissionRate: 9.5
  },
  {
    id: "v5",
    name: "Eco Wares",
    logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=80",
    locations: ["us-ca", "ca"],
    productsCount: 92,
    ordersCount: 420,
    revenue: 78000,
    rating: 4.9,
    joinedDate: "2020-08-19",
    active: true,
    description: "Eco Wares specializes in sustainable and eco-friendly products for environmentally conscious consumers.",
    email: "support@ecowares.com",
    phone: "+1 (510) 555-7890",
    website: "https://ecowares.com",
    verified: true,
    commissionRate: 7.5
  }
];

export const getLocationPath = (locationId: string): Location[] => {
  const path: Location[] = [];
  let currentId = locationId;
  
  while (currentId) {
    const location = locations.find(loc => loc.id === currentId);
    if (location) {
      path.unshift(location);
      currentId = location.parent || '';
    } else {
      break;
    }
  }
  
  return path;
};

export const getChildLocations = (parentId?: string): Location[] => {
  return locations.filter(location => location.parent === parentId);
};

export const getVendorsByLocation = (locationId: string): Vendor[] => {
  return vendors.filter(vendor => vendor.locations.includes(locationId));
};

export const getVendorLocations = (vendorId: string): Location[] => {
  const vendor = vendors.find(v => v.id === vendorId);
  if (!vendor) return [];
  
  return locations.filter(location => vendor.locations.includes(location.id));
};

export const getLocationTypeLabel = (type: Location['type']): string => {
  const labels = {
    country: 'Country',
    state: 'State/Province',
    city: 'City',
    district: 'District',
    zone: 'Zone'
  };
  
  return labels[type] || type;
};

export const getLocationStats = () => {
  const stats = {
    totalLocations: locations.length,
    byType: {
      countries: locations.filter(l => l.type === 'country').length,
      states: locations.filter(l => l.type === 'state').length,
      cities: locations.filter(l => l.type === 'city').length,
      districts: locations.filter(l => l.type === 'district').length,
      zones: locations.filter(l => l.type === 'zone').length,
    },
    topLocations: [...locations]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  };
  
  return stats;
};

export const addVendor = (vendor: Omit<Vendor, "id">) => {
  const newVendor = {
    ...vendor,
    id: `v${vendors.length + 1}`,
  };
  vendors.push(newVendor);
  return newVendor;
};

export const updateVendor = (updatedVendor: Vendor) => {
  const index = vendors.findIndex(v => v.id === updatedVendor.id);
  if (index !== -1) {
    vendors[index] = updatedVendor;
    return updatedVendor;
  }
  return null;
};

export const deleteVendor = (vendorId: string) => {
  const index = vendors.findIndex(v => v.id === vendorId);
  if (index !== -1) {
    vendors.splice(index, 1);
    return true;
  }
  return false;
};
