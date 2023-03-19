import { Dish } from './dish.interface';

export interface BackUser {
  username: string;
  email: string;
  role: string;
  orders: number[];
}

export interface User {
  username: string;
  email: string;
  role: string;
  orders: Order[];
}

export interface Order {
  dishes: number[];
  quantities: number[];
  date: string;
}

export interface inOrder {
  id: number;
  dishes: number[];
  quantities: number[];
  date: string;
}

export interface UserOrders {
  id: number;
  dishes: Dish[];
  quantities: number[];
  date: string;
}
