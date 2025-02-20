import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export default function CheckoutPage() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemId = location.split("/").pop();
        const response = await fetch(`/api/menu`);
        const menuItems = await response.json();
        const selectedItem = menuItems.find((item: MenuItem) => item.id === Number(itemId));
        
        if (selectedItem) {
          setItem(selectedItem);
        } else {
          toast({
            title: "Error",
            description: "Dish not found",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dish details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [location, toast]);

  const handleFinishOrder = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for your order.",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          Loading...
        </div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Dish Not Found</h1>
          <Button asChild>
            <a href="/menu">Back to Menu</a>
          </Button>
        </div>
      </Layout>
    );
  }

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
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <p className="text-xl">{item.price} EGP</p>
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
