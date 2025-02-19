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
              Shorshe Ilish brings the authentic taste of Bengali cuisine to Egypt. Our signature dish,
              the Ilish fish prepared with mustard sauce, represents the perfect blend of two rich culinary traditions.
            </p>
          </div>
          <Card>
            <CardContent className="p-0">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
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
            {['Shorshe Ilish Date', 'Shorshe Ilish Fatta', 'Shorshe Ilish Koshari'].map((dish) => (
              <motion.div
                key={dish}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{dish}</h3>
                    <p className="text-muted-foreground">
                      A unique fusion of Bengali and Egyptian flavors
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
