import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { saveQuote } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const allServices = [
  "Web Dashboards", "Mobile Apps", "Desktop Software",
  "Cloud Infrastructure", "Custom Development", "UI/UX Design",
];
const budgetOptions = ["$1k - $5k", "$5k - $15k", "$15k - $50k", "$50k+"];
const timelineOptions = ["< 1 month", "1-3 months", "3-6 months", "6+ months"];

const GetQuote = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    services: [] as string[], budget: "", timeline: "", description: "",
  });

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s) ? prev.services.filter((x) => x !== s) : [...prev.services, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || form.services.length === 0) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    saveQuote(form);
    toast({ title: "Quote request sent! 🎉", description: "We'll prepare your custom quote within 48 hours." });
    setForm({ name: "", email: "", phone: "", company: "", services: [], budget: "", timeline: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Get a <span className="text-gradient">Quote</span>
            </h1>
            <p className="text-muted-foreground">Select the services you need and we'll prepare a custom quote.</p>
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
              <label className="text-sm text-muted-foreground mb-2 block">Services Needed * (select multiple)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {allServices.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      form.services.includes(s)
                        ? "bg-neon-blue text-primary-foreground neon-glow"
                        : "glass-panel text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Budget</label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((b) => (
                    <button key={b} type="button" onClick={() => setForm({ ...form, budget: b })}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all ${form.budget === b ? "bg-neon-purple text-secondary-foreground" : "glass-panel text-muted-foreground"}`}
                    >{b}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Timeline</label>
                <div className="flex flex-wrap gap-2">
                  {timelineOptions.map((t) => (
                    <button key={t} type="button" onClick={() => setForm({ ...form, timeline: t })}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all ${form.timeline === t ? "bg-neon-cyan text-primary-foreground" : "glass-panel text-muted-foreground"}`}
                    >{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <Textarea
              placeholder="Additional details about your project..."
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-muted/50 border-border/50"
            />

            <Button variant="hero" type="submit" size="lg" className="w-full">
              Request Custom Quote
            </Button>
          </motion.form>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default GetQuote;
