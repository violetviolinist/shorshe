import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const menuItems = {
  appetizers: [
    { id: 1, name: "Caprese Crostini", price: 100, description: "Fresh slices of vine-ripened tomatoes and creamy mozzarella cheese" },
    { id: 2, name: "Crispy Calamari", price: 100, description: "Tender rings of calamari are lightly breaded and fried to golden perfection" },
    { id: 3, name: "Stuffed Mushrooms", price: 100, description: "Plump mushroom caps are filled with a flavorful mixture" }
  ],
  main: [
    { id: 4, name: "Grilled Salmon", price: 100, description: "Succulent fillet of Atlantic salmon" },
    { id: 5, name: "Classic Beef Burger", price: 100, description: "Juicy Angus beef patty topped with melted cheddar cheese" },
    { id: 6, name: "Mushroom Risotto", price: 100, description: "Creamy Arborio rice simmered with a medley of wild mushrooms" }
  ],
  desserts: [
    { id: 7, name: "Zesty Lemon Tart", price: 100, description: "A buttery pastry crust cradles a tangy lemon curd filling" },
    { id: 8, name: "Tiramisu", price: 100, description: "Layers of delicate ladyfinger cookies soaked in espresso" }
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
            <TabsTrigger value="main">Main Course</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
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
                      <p className="text-lg font-semibold">${item.price}</p>
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
