import { pgTable, text, serial, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  menuItemId: serial("menu_item_id").references(() => menuItems.id),
  quantity: numeric("quantity").notNull(),
});

export const insertMenuItemSchema = createInsertSchema(menuItems);
export const insertOrderSchema = createInsertSchema(orders);

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
