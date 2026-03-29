import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const plans = [
  {
    name: "Starter",
    price: "150,000",
    currency: "FCFA",
    period: "per project",
    description: "Perfect for small businesses & MVPs",
    features: [
      "Single-page web application",
      "Responsive design",
      "Basic animations",
      "3 revision rounds",
      "1 month support",
      "Source code delivery",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "450,000",
    currency: "FCFA",
    period: "per project",
    description: "Ideal for growing businesses",
    features: [
      "Multi-page web application",
      "Custom dashboard",
      "Advanced animations & transitions",
      "API integrations",
      "5 revision rounds",
      "3 months support",
      "Performance optimization",
      "SEO setup",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    currency: "",
    period: "tailored pricing",
    description: "For large-scale digital products",
    features: [
      "Full-stack application",
      "Mobile + Web + Desktop",
      "Cloud infrastructure setup",
      "CI/CD pipeline",
      "Unlimited revisions",
      "12 months support",
      "Dedicated project manager",
      "Priority SLA",
      "Security audit",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Pricing <span className="text-gradient">Plans</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Transparent pricing with no hidden fees. Choose the plan that fits your needs perfectly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`rounded-2xl p-8 relative flex flex-col ${plan.highlighted
                  ? "glass-panel border-neon-blue/40 neon-glow"
                  : "glass-panel"
                  }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-blue text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-display font-semibold text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mt-1 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-3xl font-bold font-display text-gradient">
                    {plan.price}
                  </span>
                  {plan.currency && (
                    <span className="text-lg font-bold text-foreground ml-1">
                      {plan.currency}
                    </span>
                  )}
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">
                    {plan.period}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-neon-blue mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to={`/get-quote?service=${encodeURIComponent(plan.name)}&budget=${encodeURIComponent(plan.price + ' ' + plan.currency)}`}>
                  <Button variant={plan.highlighted ? "hero" : "heroOutline"} className="w-full">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Pricing;