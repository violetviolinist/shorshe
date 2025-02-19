import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMenuItemSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all menu items
  app.get("/api/menu", async (_req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  // Get menu item by ID
  app.get("/api/menu/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const item = await storage.getMenuItem(id);
    
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(item);
  });

  // Create order
  app.post("/api/orders", async (req, res) => {
    const order = insertOrderSchema.parse(req.body);
    const newOrder = await storage.createOrder(order);
    res.json(newOrder);
  });

  const httpServer = createServer(app);
  return httpServer;
}
