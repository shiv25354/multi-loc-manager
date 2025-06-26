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

export interface DeliveryBoy {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address: Partial<Address>;
  assignedZones: string[]; // Location IDs
  active: boolean;
  currentLocation?: { lat: number; lng: number };
  rating: number;
  totalDeliveries: number;
  totalEarnings: number;
  joinedDate: string;
  status: 'available' | 'on_delivery' | 'offline';
  currentOrderId?: string;
}

export interface DeliveryPerformance {
  deliveryBoyId: string;
  date: string;
  completedOrders: number;
  earnings: number;
  rating: number;
  averageDeliveryTime: number; // in minutes
}

export interface DeliveryNotification {
  id: string;
  deliveryBoyId: string;
  orderId: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assignment' | 'update' | 'alert';
}

export const locations: Location[] = [
  {
    id: "india",
    name: "India",
    type: "country",
    vendorCount: 1250,
    ordersCount: 45000,
    revenue: 8500000,
    active: true,
    coordinates: { lat: 20.5937, lng: 78.9629 }
  },
  // States
  {
    id: "maharashtra",
    name: "Maharashtra",
    type: "state",
    parent: "india",
    vendorCount: 320,
    ordersCount: 12500,
    revenue: 2450000,
    active: true,
    coordinates: { lat: 19.7515, lng: 75.7139 }
  },
  {
    id: "karnataka",
    name: "Karnataka",
    type: "state",
    parent: "india",
    vendorCount: 280,
    ordersCount: 10200,
    revenue: 2100000,
    active: true,
    coordinates: { lat: 15.3173, lng: 75.7139 }
  },
  {
    id: "delhi",
    name: "Delhi",
    type: "state",
    parent: "india",
    vendorCount: 250,
    ordersCount: 9800,
    revenue: 2000000,
    active: true,
    coordinates: { lat: 28.7041, lng: 77.2090 }
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu",
    type: "state",
    parent: "india",
    vendorCount: 200,
    ordersCount: 7500,
    revenue: 1650000,
    active: true,
    coordinates: { lat: 11.1271, lng: 78.6569 }
  },
  {
    id: "westbengal",
    name: "West Bengal",
    type: "state",
    parent: "india",
    vendorCount: 180,
    ordersCount: 6200,
    revenue: 1400000,
    active: true,
    coordinates: { lat: 22.9868, lng: 87.8550 }
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    type: "state",
    parent: "india",
    vendorCount: 120,
    ordersCount: 4500,
    revenue: 980000,
    active: true,
    coordinates: { lat: 21.2787, lng: 81.8661 }
  },
  {
    id: "andhrapradesh",
    name: "Andhra Pradesh",
    type: "state",
    parent: "india",
    vendorCount: 160,
    ordersCount: 5800,
    revenue: 1250000,
    active: true,
    coordinates: { lat: 15.9129, lng: 79.7400 }
  },
  {
    id: "telangana",
    name: "Telangana",
    type: "state",
    parent: "india",
    vendorCount: 140,
    ordersCount: 5200,
    revenue: 1100000,
    active: true,
    coordinates: { lat: 18.1124, lng: 79.0193 }
  },
  {
    id: "odisha",
    name: "Odisha",
    type: "state",
    parent: "india",
    vendorCount: 110,
    ordersCount: 3900,
    revenue: 850000,
    active: true,
    coordinates: { lat: 20.9517, lng: 85.0985 }
  },
  {
    id: "madhyapradesh",
    name: "Madhya Pradesh",
    type: "state",
    parent: "india",
    vendorCount: 150,
    ordersCount: 5500,
    revenue: 1200000,
    active: true,
    coordinates: { lat: 22.9734, lng: 78.6569 }
  },
  // Cities in Maharashtra
  {
    id: "mumbai",
    name: "Mumbai",
    type: "city",
    parent: "maharashtra",
    vendorCount: 180,
    ordersCount: 7200,
    revenue: 1500000,
    active: true,
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: "pune",
    name: "Pune",
    type: "city",
    parent: "maharashtra",
    vendorCount: 140,
    ordersCount: 5300,
    revenue: 950000,
    active: true,
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  // Cities in Karnataka
  {
    id: "bangalore",
    name: "Bangalore",
    type: "city",
    parent: "karnataka",
    vendorCount: 200,
    ordersCount: 8100,
    revenue: 1650000,
    active: true,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: "mysore",
    name: "Mysore",
    type: "city",
    parent: "karnataka",
    vendorCount: 80,
    ordersCount: 2100,
    revenue: 450000,
    active: true,
    coordinates: { lat: 12.2958, lng: 76.6394 }
  },
  // Cities in Delhi
  {
    id: "newdelhi",
    name: "New Delhi",
    type: "city",
    parent: "delhi",
    vendorCount: 150,
    ordersCount: 6200,
    revenue: 1300000,
    active: true,
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: "gurgaon",
    name: "Gurgaon",
    type: "city",
    parent: "delhi",
    vendorCount: 100,
    ordersCount: 3600,
    revenue: 700000,
    active: true,
    coordinates: { lat: 28.4595, lng: 77.0266 }
  },
  // Cities in Tamil Nadu
  {
    id: "chennai",
    name: "Chennai",
    type: "city",
    parent: "tamilnadu",
    vendorCount: 120,
    ordersCount: 4800,
    revenue: 980000,
    active: true,
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    type: "city",
    parent: "tamilnadu",
    vendorCount: 80,
    ordersCount: 2700,
    revenue: 670000,
    active: true,
    coordinates: { lat: 11.0168, lng: 76.9558 }
  },
  // Cities in West Bengal
  {
    id: "kolkata",
    name: "Kolkata",
    type: "city",
    parent: "westbengal",
    vendorCount: 150,
    ordersCount: 5200,
    revenue: 1200000,
    active: true,
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  // Districts in Mumbai
  {
    id: "mumbai-south",
    name: "South Mumbai",
    type: "district",
    parent: "mumbai",
    vendorCount: 85,
    ordersCount: 3600,
    revenue: 750000,
    active: true,
    coordinates: { lat: 18.9220, lng: 72.8347 }
  },
  {
    id: "mumbai-central",
    name: "Central Mumbai",
    type: "district",
    parent: "mumbai",
    vendorCount: 95,
    ordersCount: 3600,
    revenue: 750000,
    active: true,
    coordinates: { lat: 19.0176, lng: 72.8562 }
  },
  // Districts in Bangalore
  {
    id: "bangalore-north",
    name: "North Bangalore",
    type: "district",
    parent: "bangalore",
    vendorCount: 100,
    ordersCount: 4050,
    revenue: 825000,
    active: true,
    coordinates: { lat: 13.0827, lng: 77.5946 }
  },
  {
    id: "bangalore-south",
    name: "South Bangalore",
    type: "district",
    parent: "bangalore",
    vendorCount: 100,
    ordersCount: 4050,
    revenue: 825000,
    active: true,
    coordinates: { lat: 12.8611, lng: 77.6362 }
  },
  // Districts in Delhi
  {
    id: "central-delhi",
    name: "Central Delhi",
    type: "district",
    parent: "newdelhi",
    vendorCount: 75,
    ordersCount: 3100,
    revenue: 650000,
    active: true,
    coordinates: { lat: 28.6508, lng: 77.2311 }
  },
  {
    id: "south-delhi",
    name: "South Delhi",
    type: "district",
    parent: "newdelhi",
    vendorCount: 75,
    ordersCount: 3100,
    revenue: 650000,
    active: true,
    coordinates: { lat: 28.5355, lng: 77.2467 }
  },
  // Zones in South Mumbai
  {
    id: "bandra-zone",
    name: "Bandra Zone",
    type: "zone",
    parent: "mumbai-south",
    vendorCount: 42,
    ordersCount: 1800,
    revenue: 375000,
    active: true,
    coordinates: { lat: 19.0596, lng: 72.8295 }
  },
  {
    id: "colaba-zone",
    name: "Colaba Zone",
    type: "zone",
    parent: "mumbai-south",
    vendorCount: 43,
    ordersCount: 1800,
    revenue: 375000,
    active: true,
    coordinates: { lat: 18.9067, lng: 72.8147 }
  },
  // Zones in North Bangalore
  {
    id: "whitefield-zone",
    name: "Whitefield Zone",
    type: "zone",
    parent: "bangalore-north",
    vendorCount: 50,
    ordersCount: 2025,
    revenue: 412500,
    active: true,
    coordinates: { lat: 12.9698, lng: 77.7500 }
  },
  {
    id: "koramangala-zone",
    name: "Koramangala Zone",
    type: "zone",
    parent: "bangalore-south",
    vendorCount: 50,
    ordersCount: 2025,
    revenue: 412500,
    active: true,
    coordinates: { lat: 12.9279, lng: 77.6271 }
  }
];

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Spice Bazaar",
    logo: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BpY2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=80",
    locations: ["mumbai", "pune"],
    productsCount: 150,
    ordersCount: 580,
    revenue: 125000,
    rating: 4.8,
    joinedDate: "2021-06-12",
    active: true,
    description: "Spice Bazaar offers authentic Indian spices and traditional ingredients across Maharashtra.",
    email: "info@spicebazaar.in",
    phone: "+91 98765 43210",
    website: "https://spicebazaar.in",
    verified: true,
    commissionRate: 8
  },
  {
    id: "v2",
    name: "Tech Valley",
    logo: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=80",
    locations: ["bangalore", "pune"],
    productsCount: 95,
    ordersCount: 420,
    revenue: 85000,
    rating: 4.6,
    joinedDate: "2020-11-03",
    active: true,
    description: "Tech Valley provides the latest electronics and gadgets for India's tech enthusiasts.",
    email: "sales@techvalley.in",
    phone: "+91 98765 54321",
    website: "https://techvalley.in",
    verified: true,
    commissionRate: 12
  },
  {
    id: "v3",
    name: "Desi Crafts",
    logo: "https://images.unsplash.com/photo-1572177215152-32f247303126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0aXNhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=80",
    locations: ["mumbai", "delhi", "bangalore", "kolkata"],
    productsCount: 280,
    ordersCount: 1450,
    revenue: 320000,
    rating: 4.7,
    joinedDate: "2019-04-25",
    active: true,
    description: "Desi Crafts showcases traditional Indian handicrafts and artisanal products from across the country.",
    email: "hello@desicrafts.in",
    phone: "+91 98765 65432",
    website: "https://desicrafts.in",
    verified: true,
    commissionRate: 10
  },
  {
    id: "v4",
    name: "Metro Fashion",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=80",
    locations: ["bandra-zone", "whitefield-zone"],
    productsCount: 120,
    ordersCount: 650,
    revenue: 145000,
    rating: 4.5,
    joinedDate: "2022-01-07",
    active: true,
    description: "Metro Fashion brings trendy and affordable clothing for urban Indians.",
    email: "contact@metrofashion.in",
    phone: "+91 98765 76543",
    website: "https://metrofashion.in",
    verified: false,
    commissionRate: 9.5
  },
  {
    id: "v5",
    name: "Ayur Wellness",
    logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXl1cnZlZGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=80",
    locations: ["chennai", "bangalore"],
    productsCount: 110,
    ordersCount: 520,
    revenue: 95000,
    rating: 4.9,
    joinedDate: "2020-08-19",
    active: true,
    description: "Ayur Wellness specializes in authentic Ayurvedic products and natural health supplements.",
    email: "support@ayurwellness.in",
    phone: "+91 98765 87654",
    website: "https://ayurwellness.in",
    verified: true,
    commissionRate: 7.5
  }
];

export const deliveryBoys: DeliveryBoy[] = [
  {
    id: "d1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 12345",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    address: {
      street: "123 Delivery Street",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    },
    assignedZones: ["bandra-zone", "colaba-zone"],
    active: true,
    currentLocation: { lat: 19.0760, lng: 72.8777 },
    rating: 4.8,
    totalDeliveries: 345,
    totalEarnings: 52750,
    joinedDate: "2022-01-15",
    status: "available"
  },
  {
    id: "d2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 23456",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    address: {
      street: "456 Tech Park Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India"
    },
    assignedZones: ["whitefield-zone", "koramangala-zone"],
    active: true,
    currentLocation: { lat: 12.9716, lng: 77.5946 },
    rating: 4.7,
    totalDeliveries: 289,
    totalEarnings: 43650,
    joinedDate: "2022-03-22",
    status: "on_delivery",
    currentOrderId: "ORD-003"
  },
  {
    id: "d3",
    name: "Amit Singh",
    email: "amit.singh@example.com",
    phone: "+91 98765 34567",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    address: {
      street: "789 Central Avenue",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India"
    },
    assignedZones: ["central-delhi", "south-delhi"],
    active: false,
    currentLocation: { lat: 28.6139, lng: 77.2090 },
    rating: 4.5,
    totalDeliveries: 156,
    totalEarnings: 23400,
    joinedDate: "2022-08-10",
    status: "offline"
  }
];

export const deliveryPerformances: DeliveryPerformance[] = [
  {
    deliveryBoyId: "d1",
    date: "2023-10-14",
    completedOrders: 8,
    earnings: 156.50,
    rating: 4.9,
    averageDeliveryTime: 28
  },
  {
    deliveryBoyId: "d1",
    date: "2023-10-15",
    completedOrders: 10,
    earnings: 187.25,
    rating: 4.7,
    averageDeliveryTime: 25
  },
  {
    deliveryBoyId: "d2",
    date: "2023-10-14",
    completedOrders: 7,
    earnings: 135.80,
    rating: 4.8,
    averageDeliveryTime: 30
  },
  {
    deliveryBoyId: "d2",
    date: "2023-10-15",
    completedOrders: 9,
    earnings: 168.45,
    rating: 4.6,
    averageDeliveryTime: 32
  }
];

export const deliveryNotifications: DeliveryNotification[] = [
  {
    id: "n1",
    deliveryBoyId: "d1",
    orderId: "ORD-002",
    message: "New delivery assignment: Order #ORD-002",
    timestamp: "2023-10-15T10:30:00Z",
    read: false,
    type: "assignment"
  },
  {
    id: "n2",
    deliveryBoyId: "d2",
    orderId: "ORD-003",
    message: "New delivery assignment: Order #ORD-003",
    timestamp: "2023-10-15T09:15:00Z",
    read: true,
    type: "assignment"
  },
  {
    id: "n3",
    deliveryBoyId: "d1",
    orderId: "ORD-001",
    message: "Customer has changed delivery address for Order #ORD-001",
    timestamp: "2023-10-14T14:20:00Z",
    read: true,
    type: "update"
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

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vendorId: string;
  vendorName: string;
  locationId: string;
  locationName: string;
  deliveryPersonId?: string;
  deliveryPersonName?: string;
  products: OrderProduct[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusUpdate[];
  deliveryAddress: Address;
  notes?: string;
}

export interface OrderProduct {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface StatusUpdate {
  status: OrderStatus;
  timestamp: string;
  updatedBy: string;
  note?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = 'new' | 'confirmed' | 'processing' | 'ready_to_ship' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export const statusLabels: Record<OrderStatus, string> = {
  new: 'New',
  confirmed: 'Confirmed',
  processing: 'Processing',
  ready_to_ship: 'Ready to Ship',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned'
};

export const statusColors: Record<OrderStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-purple-100 text-purple-800',
  processing: 'bg-yellow-100 text-yellow-800',
  ready_to_ship: 'bg-indigo-100 text-indigo-800',
  out_for_delivery: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  returned: 'bg-gray-100 text-gray-800'
};

export const orders: Order[] = [
  {
    id: "ORD-001",
    customerId: "c1",
    customerName: "Arjun Patel",
    customerEmail: "arjun@example.com",
    customerPhone: "+91 98765 11111",
    vendorId: "v1",
    vendorName: "Spice Bazaar",
    locationId: "mumbai",
    locationName: "Mumbai",
    products: [
      {
        id: "op1",
        productId: "p1",
        name: "Garam Masala Blend",
        price: 299,
        quantity: 2,
        subtotal: 598
      }
    ],
    totalAmount: 598,
    status: "new",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    createdAt: "2023-10-15T08:30:00Z",
    updatedAt: "2023-10-15T08:30:00Z",
    statusHistory: [
      {
        status: "new",
        timestamp: "2023-10-15T08:30:00Z",
        updatedBy: "system",
      }
    ],
    deliveryAddress: {
      street: "123 Gandhi Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    }
  },
  {
    id: "ORD-002",
    customerId: "c2",
    customerName: "Sneha Gupta",
    customerEmail: "sneha@example.com",
    customerPhone: "+91 98765 22222",
    vendorId: "v2",
    vendorName: "Tech Valley",
    locationId: "bangalore",
    locationName: "Bangalore",
    deliveryPersonId: "d1",
    deliveryPersonName: "Rajesh Kumar",
    products: [
      {
        id: "op2",
        productId: "p2",
        name: "Wireless Earbuds",
        price: 2999,
        quantity: 1,
        subtotal: 2999
      },
      {
        id: "op3",
        productId: "p3",
        name: "Phone Case",
        price: 599,
        quantity: 1,
        subtotal: 599
      }
    ],
    totalAmount: 3598,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    createdAt: "2023-10-14T14:45:00Z",
    updatedAt: "2023-10-15T10:20:00Z",
    statusHistory: [
      {
        status: "new",
        timestamp: "2023-10-14T14:45:00Z",
        updatedBy: "system",
      },
      {
        status: "confirmed",
        timestamp: "2023-10-14T15:00:00Z",
        updatedBy: "vendor_v2",
      },
      {
        status: "processing",
        timestamp: "2023-10-15T10:20:00Z",
        updatedBy: "vendor_v2",
        note: "Preparing your order"
      }
    ],
    deliveryAddress: {
      street: "456 Brigade Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India"
    }
  },
  {
    id: "ORD-003",
    customerId: "c3",
    customerName: "Vikash Singh",
    customerEmail: "vikash@example.com",
    customerPhone: "+91 98765 33333",
    vendorId: "v3",
    vendorName: "Desi Crafts",
    locationId: "delhi",
    locationName: "Delhi",
    deliveryPersonId: "d2",
    deliveryPersonName: "Priya Sharma",
    products: [
      {
        id: "op4",
        productId: "p4",
        name: "Handwoven Saree",
        price: 4500,
        quantity: 1,
        subtotal: 4500
      }
    ],
    totalAmount: 4500,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    createdAt: "2023-10-10T09:15:00Z",
    updatedAt: "2023-10-12T16:40:00Z",
    statusHistory: [
      {
        status: "new",
        timestamp: "2023-10-10T09:15:00Z",
        updatedBy: "system",
      },
      {
        status: "confirmed",
        timestamp: "2023-10-10T09:30:00Z",
        updatedBy: "vendor_v3",
      },
      {
        status: "processing",
        timestamp: "2023-10-10T11:20:00Z",
        updatedBy: "vendor_v3",
      },
      {
        status: "ready_to_ship",
        timestamp: "2023-10-11T08:45:00Z",
        updatedBy: "vendor_v3",
      },
      {
        status: "out_for_delivery",
        timestamp: "2023-10-12T09:30:00Z",
        updatedBy: "delivery_d2",
      },
      {
        status: "delivered",
        timestamp: "2023-10-12T16:40:00Z",
        updatedBy: "delivery_d2",
        note: "Delivered to customer"
      }
    ],
    deliveryAddress: {
      street: "789 Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      zipCode: "110001",
      country: "India"
    }
  },
  {
    id: "ORD-004",
    customerId: "c4",
    customerName: "Meera Nair",
    customerEmail: "meera@example.com",
    customerPhone: "+91 98765 44444",
    vendorId: "v5",
    vendorName: "Ayur Wellness",
    locationId: "chennai",
    locationName: "Chennai",
    products: [
      {
        id: "op5",
        productId: "p5",
        name: "Ashwagandha Capsules",
        price: 899,
        quantity: 2,
        subtotal: 1798
      },
      {
        id: "op6",
        productId: "p6",
        name: "Turmeric Powder",
        price: 299,
        quantity: 1,
        subtotal: 299
      }
    ],
    totalAmount: 2097,
    status: "ready_to_ship",
    paymentStatus: "paid",
    paymentMethod: "Digital Wallet",
    createdAt: "2023-10-14T16:20:00Z",
    updatedAt: "2023-10-16T11:15:00Z",
    statusHistory: [
      {
        status: "new",
        timestamp: "2023-10-14T16:20:00Z",
        updatedBy: "system",
      },
      {
        status: "confirmed",
        timestamp: "2023-10-14T16:45:00Z",
        updatedBy: "vendor_v5",
      },
      {
        status: "processing",
        timestamp: "2023-10-15T09:30:00Z",
        updatedBy: "vendor_v5",
      },
      {
        status: "ready_to_ship",
        timestamp: "2023-10-16T11:15:00Z",
        updatedBy: "vendor_v5",
        note: "Package ready for pickup"
      }
    ],
    deliveryAddress: {
      street: "101 Anna Salai",
      city: "Chennai",
      state: "Tamil Nadu",
      zipCode: "600002",
      country: "India"
    }
  }
];

export const getOrdersByVendor = (vendorId: string): Order[] => {
  return orders.filter(order => order.vendorId === vendorId);
};

export const getOrdersByLocation = (locationId: string): Order[] => {
  return orders.filter(order => order.locationId === locationId);
};

export const getOrdersByStatus = (status: OrderStatus | 'all'): Order[] => {
  if (status === 'all') return orders;
  return orders.filter(order => order.status === status);
};

export const updateOrderStatus = (
  orderId: string, 
  newStatus: OrderStatus, 
  updatedBy: string, 
  note?: string
): Order | null => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) return null;
  
  const order = orders[orderIndex];
  const now = new Date().toISOString();
  
  const updatedOrder: Order = {
    ...order,
    status: newStatus,
    updatedAt: now,
    statusHistory: [
      ...order.statusHistory,
      {
        status: newStatus,
        timestamp: now,
        updatedBy,
        note
      }
    ]
  };
  
  orders[orderIndex] = updatedOrder;
  return updatedOrder;
};

export const getDeliveryBoyById = (id: string): DeliveryBoy | undefined => {
  return deliveryBoys.find(boy => boy.id === id);
};

export const getDeliveryBoysByZone = (zoneId: string): DeliveryBoy[] => {
  return deliveryBoys.filter(boy => 
    boy.assignedZones.includes(zoneId) && 
    boy.active && 
    boy.status === 'available'
  );
};

export const getDeliveryBoyPerformance = (
  deliveryBoyId: string,
  startDate?: string,
  endDate?: string
): DeliveryPerformance[] => {
  let performances = deliveryPerformances.filter(perf => 
    perf.deliveryBoyId === deliveryBoyId
  );
  
  if (startDate) {
    performances = performances.filter(perf => perf.date >= startDate);
  }
  
  if (endDate) {
    performances = performances.filter(perf => perf.date <= endDate);
  }
  
  return performances;
};

export const getDeliveryBoyNotifications = (
  deliveryBoyId: string,
  unreadOnly: boolean = false
): DeliveryNotification[] => {
  let notifications = deliveryNotifications.filter(
    notif => notif.deliveryBoyId === deliveryBoyId
  );
  
  if (unreadOnly) {
    notifications = notifications.filter(notif => !notif.read);
  }
  
  return notifications.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const markNotificationAsRead = (notificationId: string): boolean => {
  const index = deliveryNotifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    deliveryNotifications[index].read = true;
    return true;
  }
  return false;
};

export const assignOrderToDeliveryBoy = (
  orderId: string,
  deliveryBoyId: string
): boolean => {
  const orderIndex = orders.findIndex(o => o.id === orderId);
  const deliveryBoyIndex = deliveryBoys.findIndex(d => d.id === deliveryBoyId);
  
  if (orderIndex === -1 || deliveryBoyIndex === -1) {
    return false;
  }
  
  if (deliveryBoys[deliveryBoyIndex].status !== 'available') {
    return false;
  }
  
  // Update order with delivery person details
  orders[orderIndex].deliveryPersonId = deliveryBoyId;
  orders[orderIndex].deliveryPersonName = deliveryBoys[deliveryBoyIndex].name;
  
  // Update delivery boy status
  deliveryBoys[deliveryBoyIndex].status = 'on_delivery';
  deliveryBoys[deliveryBoyIndex].currentOrderId = orderId;
  
  // Create notification for delivery boy
  const notification: DeliveryNotification = {
    id: `n${deliveryNotifications.length + 1}`,
    deliveryBoyId,
    orderId,
    message: `New delivery assignment: Order #${orderId}`,
    timestamp: new Date().toISOString(),
    read: false,
    type: 'assignment'
  };
  
  deliveryNotifications.push(notification);
  
  return true;
};

export const updateDeliveryStatus = (
  orderId: string,
  status: OrderStatus,
  deliveryBoyId: string
): boolean => {
  if (!['ready_to_ship', 'out_for_delivery', 'delivered'].includes(status)) {
    return false;
  }
  
  const orderUpdate = updateOrderStatus(orderId, status, `delivery_${deliveryBoyId}`);
  if (!orderUpdate) return false;
  
  // If delivered, update delivery boy status to available
  if (status === 'delivered') {
    const deliveryBoyIndex = deliveryBoys.findIndex(d => d.id === deliveryBoyId);
    if (deliveryBoyIndex !== -1) {
      deliveryBoys[deliveryBoyIndex].status = 'available';
      deliveryBoys[deliveryBoyIndex].currentOrderId = undefined;
      
      // Add to performance record
      const today = new Date().toISOString().split('T')[0];
      const perfIndex = deliveryPerformances.findIndex(
        p => p.deliveryBoyId === deliveryBoyId && p.date === today
      );
      
      if (perfIndex !== -1) {
        deliveryPerformances[perfIndex].completedOrders += 1;
        deliveryPerformances[perfIndex].earnings += orderUpdate.totalAmount * 0.1; // 10% commission
      } else {
        deliveryPerformances.push({
          deliveryBoyId,
          date: today,
          completedOrders: 1,
          earnings: orderUpdate.totalAmount * 0.1,
          rating: 5,
          averageDeliveryTime: 30
        });
      }
    }
  }
  
  return true;
};

export const addDeliveryBoy = (deliveryBoy: Omit<DeliveryBoy, "id">): DeliveryBoy => {
  const newDeliveryBoy = {
    ...deliveryBoy,
    id: `d${deliveryBoys.length + 1}`,
  };
  deliveryBoys.push(newDeliveryBoy);
  return newDeliveryBoy;
};

export const updateDeliveryBoy = (updatedDeliveryBoy: DeliveryBoy): DeliveryBoy | null => {
  const index = deliveryBoys.findIndex(d => d.id === updatedDeliveryBoy.id);
  if (index !== -1) {
    deliveryBoys[index] = updatedDeliveryBoy;
    return updatedDeliveryBoy;
  }
  return null;
};

export const deleteDeliveryBoy = (deliveryBoyId: string): boolean => {
  const index = deliveryBoys.findIndex(d => d.id === deliveryBoyId);
  if (index !== -1) {
    // Check if delivery boy is currently on a delivery
    if (deliveryBoys[index].status === 'on_delivery') {
      return false; // Cannot delete while on delivery
    }
    deliveryBoys.splice(index, 1);
    return true;
  }
  return false;
};
