import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur z-50 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-2xl font-semibold text-primary">
            Shorshe Ilish
          </a>
          <div className="flex gap-6">
            <a href="/" className="text-foreground hover:text-primary transition">Home</a>
            <a href="/menu" className="text-foreground hover:text-primary transition">Menu</a>
          </div>
        </div>
      </nav>
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="pt-16"
      >
        {children}
      </motion.main>
      <footer className="bg-muted mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Shorshe Ilish. All rights reserved.</p>
            <p className="mt-2">Open Hours: 09:00 AM - 10:00 PM</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
