

// Product Interface
export interface Product {
  id: string;
  name: string;
  author?: string;
  price: number;
  description?: string;
  image: string;
  categoryId?: string;
}
