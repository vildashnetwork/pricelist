import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-showroom.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 text-sm text-muted-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan pulse-glow" />
              Next-Gen Digital Solutions
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-10 pt-4"
            >
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "99%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-display text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden neon-glow">
              <img
                src={heroImage}
                alt="VILDASH NETWORK digital products showroom"
                width={1920}
                height={1080}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-neon-purple/20 blur-2xl float-animation" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-neon-blue/20 blur-2xl float-animation" style={{ animationDelay: '3s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
