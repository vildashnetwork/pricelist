import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios"; // 1. Import axios

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false); // 2. Add loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Validation matching your Schema (name, email, subject, desc are required)
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields, including a subject.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // 4. Map 'message' from form to 'desc' for the backend schema
      const postData = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        desc: form.message
      };

      const response = await axios.post("https://pricebackend-n0qq.onrender.com/api/contact", postData);

      if (response.status === 200) {
        toast({
          title: "Message sent! 🚀",
          description: "We'll get back to you within 24 hours."
        });
        // 5. Clear form on success
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err: any) {
      console.error("Contact Error:", err);
      toast({
        title: "Error",
        description: err.response?.data || "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
                  { icon: Mail, label: "Email", value: "info@vizit.homes" },
                  { icon: Phone, label: "Phone", value: "+237 654598457" },
                  { icon: MapPin, label: "Location", value: "Douala Cameroon At Total Ndobo" },
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
                placeholder="Subject *"
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
              <Button variant="hero" type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Message"}
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