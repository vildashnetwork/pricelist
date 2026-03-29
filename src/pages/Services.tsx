import { motion } from "framer-motion";
import { Monitor, Smartphone, AppWindow, Cloud, Code, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const services = [
  { icon: Monitor, title: "Web Dashboards", slug: "web-dashboards", description: "Glassmorphism-powered analytics platforms with real-time data visualization and intuitive UX." },
  { icon: Smartphone, title: "Mobile Apps", slug: "mobile-apps", description: "Cross-platform iOS & Android applications with fluid animations and native performance." },
  { icon: AppWindow, title: "Desktop Software", slug: "desktop-software", description: "Enterprise-grade desktop applications with complex workflows and seamless integrations." },
  { icon: Cloud, title: "Cloud Infrastructure", slug: "cloud-infrastructure", description: "Scalable cloud architecture with auto-scaling, load balancing, and 99.99% uptime." },
  { icon: Code, title: "Custom Development", slug: "custom-development", description: "Bespoke software solutions engineered to your exact specifications and business logic." },
  { icon: DollarSign, title: "Competitive Pricing", slug: "competitive-pricing", description: "Transparent pricing models with no hidden fees. Premium quality at accessible rates." },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Full-spectrum digital product development, from concept to deployment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link key={service.slug} to={`/services/${service.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel rounded-2xl p-8 group hover:border-neon-blue/30 transition-all cursor-pointer h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-6 group-hover:neon-glow transition-shadow">
                    <service.icon className="w-6 h-6 text-neon-blue" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 text-neon-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Projects <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Services;
