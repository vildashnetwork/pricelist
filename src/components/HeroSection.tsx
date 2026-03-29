import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-showroom.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6 pt-24 pb-12 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge - Adjusted margin to not hit the Navbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 text-sm text-muted-foreground border border-white/10"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan pulse-glow" />
              Next-Gen Digital Solutions
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] font-display">
              <span className="text-gradient">VILDASH</span>
              <br />
              <span className="text-foreground">NETWORK</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed font-body">
              We architect premium web dashboards, mobile applications, and enterprise desktop software that redefine digital experiences.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link to="/portfolio">
                <Button variant="hero" size="lg">Explore Our Work</Button>
              </Link>
              <Link to="/get-quote">
                <Button variant="heroOutline" size="lg">Get a Quote</Button>
              </Link>
            </div>

            {/* Stats Block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 md:gap-10 pt-4"
            >
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-display text-gradient">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden glass-panel p-2 border border-white/5">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="VILDASH NETWORK digital products showroom"
                  className="w-full h-auto rounded-xl object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-neon-purple/20 blur-2xl float-animation" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-neon-blue/20 blur-2xl float-animation" style={{ animationDelay: '3s' }} />
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;