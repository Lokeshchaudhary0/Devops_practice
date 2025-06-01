export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  unit: string;
  category: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  address: string;
  landmark?: string;
  isDefault: boolean;
}

export const addresses: Address[] = [
  {
    id: '1',
    type: 'Home',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    landmark: 'Near Central Park',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Work',
    address: '456 Office Ave, Suite 200, New York, NY 10002',
    landmark: 'Glass building with blue facade',
    isDefault: false,
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fruits & Vegetables',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg',
  },
  {
    id: '2',
    name: 'Dairy & Breakfast',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
  },
  {
    id: '3',
    name: 'Snacks & Munchies',
    image: 'https://images.pexels.com/photos/1987042/pexels-photo-1987042.jpeg',
  },
  {
    id: '4',
    name: 'Cold Drinks & Juices',
    image: 'https://images.pexels.com/photos/2531188/pexels-photo-2531188.jpeg',
  },
  {
    id: '5',
    name: 'Instant & Frozen Food',
    image: 'https://images.pexels.com/photos/4553031/pexels-photo-4553031.jpeg',
  },
  {
    id: '6',
    name: 'Tea, Coffee & Health Drinks',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
  },
  {
    id: '7',
    name: 'Bakery & Biscuits',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
  },
  {
    id: '8',
    name: 'Sweet Tooth',
    image: 'https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Bananas',
    price: 40,
    originalPrice: 50,
    discount: 20,
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg',
    unit: '1 kg',
    category: '1',
    description: 'Fresh and ripe bananas from organic farms. Rich in potassium and perfect for smoothies or a quick snack.',
    inStock: true,
  },
  {
    id: '2',
    name: 'Red Apple',
    price: 120,
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    unit: '1 kg',
    category: '1',
    description: 'Crisp and sweet red apples. Perfect for snacking, baking, or adding to salads.',
    inStock: true,
  },
  {
    id: '3',
    name: 'Organic Milk',
    price: 65,
    originalPrice: 75,
    discount: 13,
    image: 'https://images.pexels.com/photos/2510627/pexels-photo-2510627.jpeg',
    unit: '500 ml',
    category: '2',
    description: 'Farm-fresh organic milk. Pasteurized and homogenized for the best taste and nutrition.',
    inStock: true,
  },
  {
    id: '4',
    name: 'Brown Eggs',
    price: 80,
    image: 'https://images.pexels.com/photos/7638155/pexels-photo-7638155.jpeg',
    unit: '6 pcs',
    category: '2',
    description: 'Free-range brown eggs from healthy hens. High in protein and essential nutrients.',
    inStock: true,
  },
  {
    id: '5',
    name: 'Potato Chips',
    price: 30,
    originalPrice: 40,
    discount: 25,
    image: 'https://images.pexels.com/photos/4498177/pexels-photo-4498177.jpeg',
    unit: '100 g',
    category: '3',
    description: 'Crispy potato chips with just the right amount of salt. Perfect for movie nights or parties.',
    inStock: true,
  },
  {
    id: '6',
    name: 'Mixed Nuts',
    price: 200,
    image: 'https://images.pexels.com/photos/1120575/pexels-photo-1120575.jpeg',
    unit: '250 g',
    category: '3',
    description: 'Premium mix of almonds, cashews, and walnuts. A healthy snack packed with nutrients.',
    inStock: true,
  },
  {
    id: '7',
    name: 'Orange Juice',
    price: 95,
    originalPrice: 110,
    discount: 14,
    image: 'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg',
    unit: '1 L',
    category: '4',
    description: 'Freshly squeezed orange juice with no added sugar. Rich in vitamin C and antioxidants.',
    inStock: true,
  },
  {
    id: '8',
    name: 'Cola',
    price: 60,
    image: 'https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg',
    unit: '750 ml',
    category: '4',
    description: 'Classic cola drink. Best served chilled with ice for a refreshing experience.',
    inStock: true,
  },
  {
    id: '9',
    name: 'Frozen Pizza',
    price: 250,
    originalPrice: 300,
    discount: 17,
    image: 'https://images.pexels.com/photos/5792329/pexels-photo-5792329.jpeg',
    unit: '400 g',
    category: '5',
    description: 'Ready-to-bake margherita pizza with a thin, crispy crust and premium cheese topping.',
    inStock: true,
  },
  {
    id: '10',
    name: 'Green Coffee',
    price: 350,
    image: 'https://images.pexels.com/photos/4829069/pexels-photo-4829069.jpeg',
    unit: '250 g',
    category: '6',
    description: 'Premium green coffee beans with rich aroma and flavor. Perfect for weight management.',
    inStock: true,
  },
  {
    id: '11',
    name: 'Chocolate Cake',
    price: 450,
    originalPrice: 500,
    discount: 10,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    unit: '500 g',
    category: '7',
    description: 'Decadent chocolate cake with rich frosting. Perfect for celebrations or dessert.',
    inStock: true,
  },
  {
    id: '12',
    name: 'Chocolate Bar',
    price: 100,
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg',
    unit: '100 g',
    category: '8',
    description: 'Premium dark chocolate bar with 70% cocoa. Rich, smooth, and satisfying for chocolate lovers.',
    inStock: true,
  },
];

export const offers = [
  {
    id: '1',
    title: 'Get 50% off on your first order',
    description: 'Use code WELCOME50',
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg',
    color: '#FFF3CD',
  },
  {
    id: '2',
    title: 'Free delivery on orders above ₹500',
    description: 'Limited time offer',
    image: 'https://images.pexels.com/photos/6169/woman-hand-smartphone-shopping.jpg',
    color: '#D1E7DD',
  },
  {
    id: '3',
    title: 'Buy 1 Get 1 Free on all beverages',
    description: 'This weekend only',
    image: 'https://images.pexels.com/photos/1536355/pexels-photo-1536355.jpeg',
    color: '#CFE2FF',
  },
];

export const recentSearches = [
  'Milk', 'Bread', 'Eggs', 'Bananas', 'Rice', 'Onions'
];

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'canceled';
  date: string;
  deliveryAddress: Address;
  paymentMethod: string;
  estimatedDeliveryTime: string;
}

export const orders: Order[] = [
  {
    id: 'ORD1001',
    items: [
      { ...products[0], quantity: 2 },
      { ...products[2], quantity: 1 },
    ],
    total: 145,
    status: 'delivered',
    date: '2023-04-15T14:30:00Z',
    deliveryAddress: addresses[0],
    paymentMethod: 'Credit Card',
    estimatedDeliveryTime: '15 min',
  },
  {
    id: 'ORD1002',
    items: [
      { ...products[4], quantity: 3 },
      { ...products[7], quantity: 2 },
      { ...products[9], quantity: 1 },
    ],
    total: 550,
    status: 'confirmed',
    date: '2023-04-20T10:15:00Z',
    deliveryAddress: addresses[1],
    paymentMethod: 'UPI',
    estimatedDeliveryTime: '10 min',
  },
];