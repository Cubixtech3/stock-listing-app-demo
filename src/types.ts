export type StockStatus = 'In Stock' | 'Out of Stock';

export interface PartItem {
  id: string;
  name: string;
  brand: string;
  oem: string;
  category: string;
  price: number;
  status: StockStatus;
  description: string;
  fitment: string;
  images: string[];
  crossReference: string[];
}

export interface Inquiry {
  id: string;
  partId: string;
  partName: string;
  brand: string;
  oem: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected';
}
