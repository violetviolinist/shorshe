import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

type MenuCategories = {
  [key: string]: MenuItem[];
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("appetizers");
  const [menuItems, setMenuItems] = useState<MenuCategories>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        const items: MenuItem[] = await response.json();
        
        // Group items by category
        const groupedItems = items.reduce((acc: MenuCategories, item) => {
          const category = item.category.toLowerCase();
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});
        
        setMenuItems(groupedItems);
        
        // Set initial active tab to first available category
        if (Object.keys(groupedItems).length > 0) {
          setActiveTab(Object.keys(groupedItems)[0]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load menu items",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [toast]);

  const handleOrder = (itemId: number) => {
    window.location.href = `/checkout/${itemId}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-8">Our Menu</h1>
          <p>Loading menu items...</p>
        </div>
      </Layout>
    );
  }

  if (Object.keys(menuItems).length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-8">Our Menu</h1>
          <p>No menu items available.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Menu</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {Object.keys(menuItems).map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <img
                        src={item.image || "https://ik.imagekit.io/violetviolinist/NEVER_DELETE/Shorshe/placeholder.png?updatedAt=1739984688784"}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <p className="text-lg font-semibold">{item.price} EGP</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => handleOrder(item.id)}
                      >
                        Order Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}