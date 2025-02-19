import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
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
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Shorshe Elish Date',
                image: 'https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/shorshe_date.jpeg',
                description: 'A unique fusion of Bengali and Egyptian flavors'
              },
              {
                name: 'Shorshe Elish Fatta',
                image: 'https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/fatta.jpeg',
                description: 'A unique fusion of Bengali and Egyptian flavors'
              },
              {
                name: 'Shorshe Elish Koshari',
                image: 'https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/koshari.jpeg',
                description: 'A unique fusion of Bengali and Egyptian flavors'
              },
              {
                name: 'Shorshe Elish Fusion',
                image: 'https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/fusion.jpeg',
                description: 'A unique fusion of Bengali and Egyptian flavors'
              },
              {
                name: 'Shorshe Elish Shorba',
                image: 'https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/shorba.jpeg',
                description: 'A unique fusion of Bengali and Egyptian flavors'
              },
              {
                name: 'Shorshe Elish and Fava Beans',
                image: 'https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/fava.jpeg',
                description: 'A unique fusion of Bengali and Egyptian flavors'
              },
              {
                name: 'Fried Shorshe Elish',
                image: 'https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/fried.jpeg',
                description: 'A unique fusion of Bengali and Egyptian flavors'
              },
            ].map((dish) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-[400px] flex flex-col">
                  <div className="h-[66%]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                    <p className="text-muted-foreground">
                      {dish.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
