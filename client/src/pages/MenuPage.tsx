import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const menuItems = {
  appetizers: [
    { 
      id: 1, 
      name: "Bengali Shrimp Cutlets", 
      price: 120, 
      description: "Succulent shrimp patties infused with Bengali spices, served with mint chutney" 
    },
    { 
      id: 2, 
      name: "Mashed Potato Chop", 
      price: 80, 
      description: "Crispy potato croquettes stuffed with minced meat and aromatic spices" 
    }
  ],
  main: [
    { 
      id: 3, 
      name: "Shorshe Ilish", 
      price: 450, 
      description: "Hilsa fish cooked in a rich mustard gravy, a Bengali delicacy served with steamed rice" 
    },
    { 
      id: 4, 
      name: "Morog Polao", 
      price: 320, 
      description: "Fragrant rice cooked with tender chicken, aromatic spices, and caramelized onions" 
    }
  ],
  desserts: [
    { 
      id: 5, 
      name: "Roshogolla", 
      price: 60, 
      description: "Soft cottage cheese dumplings soaked in aromatic sugar syrup" 
    },
    { 
      id: 6, 
      name: "Mishti Doi", 
      price: 80, 
      description: "Traditional Bengali sweet yogurt, slow-cooked to perfection" 
    }
  ],
  special: [
    {
      id: 7,
      name: "Mediterranean Delight",
      price: 100,
      description: "Grilled lamb chops marinated in aromatic herbs, served alongside a refreshing Greek salad bursting with ripe tomatoes"
    },
    {
      id: 8,
      name: "Asian Fusion Feast",
      price: 100,
      description: "Crispy tempura shrimp drizzled with a sweet and spicy chili sauce, followed by tender slices of teriyaki-glazed beef"
    }
  ]
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("appetizers");

  const handleOrder = (itemId: number) => {
    window.location.href = `/checkout/${itemId}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Menu</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
            <TabsTrigger value="main">Main Course</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="special">Special Menu</TabsTrigger>
          </TabsList>

          {(Object.keys(menuItems) as Array<keyof typeof menuItems>).map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {menuItems[category].map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <img
                        src={`https://source.unsplash.com/800x600/?food,${item.name}`}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <p className="text-lg font-semibold">₹{item.price}</p>
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