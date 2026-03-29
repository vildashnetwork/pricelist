import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll Watcher
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock Body Scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-panel border-b border-border/50 py-2" : "bg-transparent py-4"
          }`}
      >
        <div className="container flex items-center justify-between h-16 px-6">
          <Link to="/" className="font-display font-bold text-xl tracking-widest text-gradient z-[60]">
            VILDASH
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`hover:text-neon-blue transition-colors ${location.pathname === item.to ? "text-neon-blue" : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/get-quote">
              <Button variant="hero" size="sm">Start a Project</Button>
            </Link>
          </div>

          {/* Mobile Toggle Button - Added motion for tap feedback */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden z-[60] p-2 text-foreground outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-[51] md:hidden"
            />

            {/* Sidebar with Slide */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-card border-l border-border/50 z-[52] p-8 shadow-2xl md:hidden flex flex-col"
            >
              <div className="mt-20 flex flex-col gap-8">
                {navLinks.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                  >
                    <Link
                      to={item.to}
                      className={`text-3xl font-display font-bold transition-colors ${location.pathname === item.to ? "text-neon-blue" : "text-foreground/80"
                        }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-8 border-t border-border/50"
                >
                  <Link to="/get-quote">
                    <Button variant="hero" className="w-full text-xl py-7 rounded-2xl">
                      Start a Project
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <div className="mt-auto pb-4 flex flex-col items-center gap-2">
                <p className="text-muted-foreground text-sm">info@vizit.homes</p>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
                  © 2026 VILDASH Digital
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;