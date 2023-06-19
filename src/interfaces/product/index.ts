import { BakeryInterface } from 'interfaces/bakery';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  price: number;
  availability_status: boolean;
  bakery_id?: string;
  created_at?: any;
  updated_at?: any;

  bakery?: BakeryInterface;
  _count?: {};
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  bakery_id?: string;
}
