import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { saveContact } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    saveContact(form);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have a project in mind? Let's talk about how we can bring your vision to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Email", value: "hello@vildash.network" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 000-1234" },
                  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{item.label}</h3>
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-8 space-y-5"
            >
              <Input
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-muted/50 border-border/50"
              />
              <Input
                type="email"
                placeholder="Your Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-muted/50 border-border/50"
              />
              <Input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="bg-muted/50 border-border/50"
              />
              <Textarea
                placeholder="Your Message *"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-muted/50 border-border/50"
              />
              <Button variant="hero" type="submit" className="w-full">
                Send Message
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Contact;
