export type MenuCategory =
  | 'Beef & Steak'
  | 'Chicken'
  | 'Seafood'
  | 'Pasta'
  | 'Pizza'
  | 'Burgers'
  | 'Vegetarian'
  | 'International'
  | 'Desserts'
  | 'Hot Drinks'
  | 'Cold Drinks'
  | 'Shakes & Smoothies'
  | 'Mocktails';

export type DietaryLabel =
  | 'Vegetarian'
  | 'Spicy'
  | "Chef's Choice"
  | 'Popular'
  | 'New'
  | 'Contains Dairy';

export interface CustomizationOption {
  label: string;
  priceModifier: number;
}

export interface CustomizationGroup {
  title: string;
  type: 'single' | 'multi';
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tags?: string[];
  dietaryLabels?: DietaryLabel[];
  featured?: boolean;
  popular?: boolean;
  rating?: number;
  ingredients?: string[];
  preparation?: string;
  customization?: CustomizationGroup[];
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  selectedOptions: { groupTitle: string; optionLabel: string; priceModifier: number }[];
  unitPrice: number;
  totalPrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  initials: string;
}

export type GalleryCategory =
  | 'Interior'
  | 'Dining table'
  | 'Chef preparing food'
  | 'Steak'
  | 'Pasta'
  | 'Dessert'
  | 'Coffee'
  | 'Mocktail'
  | 'Video';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

export interface GalleryVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  poster: string;
  category: 'Video';
}

export interface Specialty {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ReservationData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type OrderType = 'delivery' | 'pickup';
export type PaymentMethod = 'cash_on_delivery' | 'cash_on_pickup' | 'online';
export type OrderStatus = 'received' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  orderNotes: string;
  discountCode: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_type: OrderType;
  delivery_address: string | null;
  payment_method: PaymentMethod;
  order_notes: string | null;
  subtotal: number;
  delivery_fee: number;
  discount_amount: number;
  total: number;
  discount_code: string | null;
  status: OrderStatus;
  reference_number: string;
  items_json: CartItem[];
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string | null;
  status: 'pending' | 'confirmed' | 'seated' | 'cancelled';
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  is_demo: boolean;
  created_at: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  is_active: boolean;
  expires_at: string | null;
  usage_count: number;
  max_uses: number | null;
}

export interface MenuOverride {
  id: string;
  menu_item_id: string;
  price: number | null;
  description: string | null;
  is_available: boolean;
  updated_at: string;
}
