import { menuItems, orders, type MenuItem, type InsertMenuItem, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<number, MenuItem>;
  private orders: Map<number, Order>;
  private currentOrderId: number;

  constructor() {
    this.menuItems = new Map();
    this.orders = new Map();
    this.currentOrderId = 1;

    // Initialize with sample menu items
    const sampleItems: MenuItem[] = [
      {
        id: 1,
        name: "Shorshe Ilish",
        description: "Traditional Bengali fish curry with mustard sauce",
        price: "100",
        category: "main",
        image: "https://example.com/shorshe-ilish.jpg"
      },
      // Add more sample items as needed
    ];

    sampleItems.forEach(item => {
      this.menuItems.set(item.id, item);
    });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
