import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { saveBooking } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const serviceOptions = [
  "Web Dashboards", "Mobile Apps", "Desktop Software",
  "Cloud Infrastructure", "Custom Development", "Other",
];

const budgetOptions = ["$1k - $5k", "$5k - $15k", "$15k - $50k", "$50k+"];

const StartProject = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service")?.replace(/-/g, " ") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: serviceOptions.find((s) => s.toLowerCase() === preselectedService.toLowerCase()) || "",
    budget: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.description) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    saveBooking(form);
    toast({ title: "Project request submitted! 🎉", description: "We'll contact you within 24 hours." });
    setForm({ name: "", email: "", phone: "", company: "", service: "", budget: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Start a <span className="text-gradient">Project</span>
            </h1>
            <p className="text-muted-foreground">Tell us about your project and we'll get back to you within 24 hours.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-panel rounded-2xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-muted/50 border-border/50" />
              <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-muted/50 border-border/50" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-muted/50 border-border/50" />
              <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-muted/50 border-border/50" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Service *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, service: s })}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      form.service === s
                        ? "bg-neon-blue text-primary-foreground neon-glow"
                        : "glass-panel text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Budget Range</label>
              <div className="flex flex-wrap gap-2">
                {budgetOptions.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setForm({ ...form, budget: b })}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      form.budget === b
                        ? "bg-neon-purple text-secondary-foreground neon-glow"
                        : "glass-panel text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Describe your project *"
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-muted/50 border-border/50"
            />

            <Button variant="hero" type="submit" size="lg" className="w-full">
              Submit Project Request
            </Button>
          </motion.form>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default StartProject;
