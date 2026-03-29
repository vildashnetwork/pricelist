import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16 px-6">
        <Link to="/" className="font-display font-bold text-lg tracking-widest text-gradient">
          VILDASH
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((item) => (
            <Link key={item.label} to={item.to} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
        <Link to="/start-project">
          <Button variant="hero" size="sm">Start a Project</Button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
