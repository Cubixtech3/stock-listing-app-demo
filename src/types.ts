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
