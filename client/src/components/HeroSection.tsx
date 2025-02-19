import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://dvy2gh2r6f3xj.cloudfront.net/NEVER_DELETE/Shorshe/restaurant_view.jpeg?tr=w-1200')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative text-center text-white space-y-6 max-w-3xl mx-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold">
          Where Flavours Swim
        </h1>
        <p className="text-xl md:text-2xl">
          Experience the unique fusion of Bengali and Egyptian cuisine
        </p>
        <Button 
          asChild
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <a href="/menu">Order Now</a>
        </Button>
      </motion.div>
    </div>
  );
}
