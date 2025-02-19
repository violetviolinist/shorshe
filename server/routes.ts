import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMenuItemSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get menu items
  app.get("/api/menu", async (_req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
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
