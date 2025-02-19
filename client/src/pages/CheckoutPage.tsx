import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const itemId = location.split("/").pop();
    // In a real app, we would fetch the item details from an API
    setItem({
      id: itemId,
      name: "Sample Dish",
      price: 100,
      image: "https://source.unsplash.com/800x600/?food"
    });
  }, [location]);

  const handleFinishOrder = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your order.",
    });
  };

  if (!item) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-xl">${item.price}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="outline" asChild className="w-full">
                <a href="/menu">Back to Menu</a>
              </Button>
              <Button onClick={handleFinishOrder} className="w-full">
                Finish Order
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
