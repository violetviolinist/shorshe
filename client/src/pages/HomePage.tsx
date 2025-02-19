import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export default function HomePage() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await fetch('/api/featuredMenu');
        const items = await response.json();
        setFeaturedItems(items);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load featured dishes",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, [toast]);

  const handleOrder = (itemId: number) => {
    window.location.href = `/featured/checkout/${itemId}`;
  };

  return (
    <Layout>
      <HeroSection />
      
      <section className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              Shorshe Elish brings the authentic taste of Bengali cuisine to Egypt. Our signature dish,
              the Elish fish prepared with mustard sauce, represents the perfect blend of two rich culinary traditions.
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <img 
                src="https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/front.png"
                alt="Restaurant interior"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Dishes</h2>
          
          {loading ? (
            <div className="text-center">Loading featured dishes...</div>
          ) : featuredItems.length === 0 ? (
            <div className="text-center">No featured dishes available.</div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <img
                      src={item.image || "https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/placeholder.png?updatedAt=1739984688784"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{item.name.length > 23 ? `${item.name.substring(0, 20)}...` : item.name}</h3>
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
          )}
        </div>
      </section>
    </Layout>
  );
}
