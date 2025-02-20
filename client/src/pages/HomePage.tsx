import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

      <section className="container mx-auto px-4 py-0 bg-background/50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-8">Our Vision & Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Vision</h3>
                <p className="text-muted-foreground">
                  To create a fusion of Bengali and Egyptian flavors, celebrating shared cultural richness.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-2xl font-semibold mb-4">Mission</h3>
                <p className="text-muted-foreground">
                  We blend the heritage of Bengal with the tastes of Egypt, offering a unique and innovative culinary experience.
                </p>
              </Card>
            </div>
            
            <Accordion type="single" collapsible className="text-left">
              <AccordionItem value="ceo-message">
                <AccordionTrigger className="text-xl font-semibold">A Message from Our CEO</AccordionTrigger>
                <AccordionContent className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Egypt and Bengal are both lands of spice, history, and deep cultural pride. At Shorshe Elish, we see food as a way to unite these two worlds, merging Bengal's delicate balance of flavors with Egypt's bold and hearty culinary traditions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We recognize Egypt's deep appreciation for rich, slow-cooked dishes—much like our Bengali Biryani, which finds similarities with Egypt's iconic Koshari. Our approach is to respect tradition while bringing fresh, innovative twists that align with Egyptian preferences.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether it's a new take on a classic dish or a fusion that surprises and delights, our goal is to craft an experience that Egyptians will cherish, just as Bengalis do. This is not just food—it's a dialogue between cultures, a celebration of flavors that brings people together.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>
      </section>

      <section className="bg-muted py-20" id="featured-dishes">
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
          )}
        </div>
      </section>
    </Layout>
  );
}
