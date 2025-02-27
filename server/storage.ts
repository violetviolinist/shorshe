import { menuItems, orders, type MenuItem, type InsertMenuItem, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private menuItems: Map<number, MenuItem>;
  private featuredItems: Map<number, MenuItem>
  private orders: Map<number, Order>;
  private currentOrderId: number;

  constructor() {
    this.menuItems = new Map();
    this.featuredItems = new Map();
    this.orders = new Map();
    this.currentOrderId = 1;

    // Initialize with menu items
    const items: MenuItem[] = [
      // Appetizers
      {
        id: 1,
        name: "Caprese Crostini",
        description: "Fresh slices of vine-ripened tomatoes and creamy mozzarella cheese are layered atop toasted baguette slices, then drizzled",
        price: "100",
        category: "appetizers",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 2,
        name: "Crispy Calamari",
        description: "Tender rings of calamari are lightly breaded and fried to golden perfection, creating a satisfying crunch",
        price: "100",
        category: "appetizers",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 3,
        name: "Stuffed Mushrooms",
        description: "Plump mushroom caps are filled with a flavorful mixture of seasoned breadcrumbs, garlic, herbs, and melted cheese",
        price: "100",
        category: "appetizers",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      // Main Course
      {
        id: 4,
        name: "Grilled Salmon",
        description: "Succulent fillet of Atlantic salmon, seasoned and grilled to perfection",
        price: "100",
        category: "main",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 5,
        name: "Classic Beef Burger",
        description: "Juicy Angus beef patty topped with melted cheddar cheese, crispy bacon",
        price: "100",
        category: "main",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 6,
        name: "Mushroom Risotto",
        description: "Creamy Arborio rice simmered with a medley of wild mushrooms, garlic",
        price: "100",
        category: "main",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 7,
        name: "Chicken Alfredo Pasta",
        description: "Tender grilled chicken breast tossed with fettuccine pasta in a velvety",
        price: "100",
        category: "main",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 8,
        name: "Vegetable Stir-Fry",
        description: "Colorful array of crisp vegetables, including bell peppers, broccoli, carrots",
        price: "100",
        category: "main",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      // Desserts
      {
        id: 9,
        name: "Zesty Lemon Tart",
        description: "A buttery pastry crust cradles a tangy lemon curd filling, creating a perfect balance of sweetness and citrusy zest",
        price: "100",
        category: "desserts",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 10,
        name: "Velvet Red Velvet Cake",
        description: "Layers of moist red velvet sponge cake are generously filled and frosted with a luxurious cream cheese frosting",
        price: "100",
        category: "desserts",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 11,
        name: "Tiramisu",
        description: "Layers of delicate ladyfinger cookies soaked in espresso and Marsala wine are nestled between luscious mascarpone",
        price: "100",
        category: "desserts",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      // Special Menu
      {
        id: 12,
        name: "Mediterranean Delight",
        description: "Grilled lamb chops marinated in aromatic herbs, served alongside a refreshing Greek salad bursting with ripe tomatoes",
        price: "100",
        category: "special",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      },
      {
        id: 13,
        name: "Asian Fusion Feast",
        description: "Crispy tempura shrimp drizzled with a sweet and spicy chili sauce, followed by tender slices of teriyaki-glazed beef",
        price: "100",
        category: "special",
        image: "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png"
      }
    ];

    const _featuredItems: MenuItem[] = [
      {
        id: 1,
        name: 'Shorshe Elish Date',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/shorshe_date.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '450',
        category: 'special'
      },
      {
        id: 2,
        name: 'Shorshe Elish Fatta',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/fatta.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '500',
        category: 'special'
      },
      {
        id: 3,
        name: 'Shorshe Elish Koshari',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/koshari.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '500',
        category: 'special'
      },
      {
        id: 4,
        name: 'Shorshe Elish Roll',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/fusion.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '300',
        category: 'special'
      },
      {
        id: 5,
        name: 'Shorshe Elish Shorba',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/shorba.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '350',
        category: 'special'
      },
      {
        id: 6,
        name: 'Shorshe Elish and Fava Beans',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/fava.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '340',
        category: 'special'
      },
      {
        id: 7,
        name: 'Fried Shorshe Elish',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/fried.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '200',
        category: 'special'
      },
      {
        id: 8,
        name: 'Shorshe Elish Mulukhiya',
        image: 'https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/mulukhiya.jpeg',
        description: 'A unique fusion of Bengali and Egyptian flavors',
        price: '400',
        category: 'special'
      },
    ];

    items.forEach(item => {
      this.menuItems.set(item.id, item);
    });

    _featuredItems.forEach(item => {
      this.featuredItems.set(item.id, item)
    });
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async getFeaturedMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.featuredItems.values());
  }

  async getFeaturedMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.featuredItems.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      id,
      menuItemId: insertOrder.menuItemId,
      quantity: insertOrder.quantity
    };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
