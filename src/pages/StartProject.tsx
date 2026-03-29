// import { motion } from "framer-motion";
// import { useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import Navbar from "@/components/Navbar";
// import FooterSection from "@/components/FooterSection";
// import { saveBooking } from "@/lib/storage";
// import { toast } from "@/hooks/use-toast";
// import { useState } from "react";

// const serviceOptions = [
//   "Web Dashboards", "Mobile Apps", "Desktop Software",
//   "Cloud Infrastructure", "Custom Development", "Other",
// ];

// const budgetOptions = ["$1k - $5k", "$5k - $15k", "$15k - $50k", "$50k+"];

// const StartProject = () => {
//   const [searchParams] = useSearchParams();
//   const preselectedService = searchParams.get("service")?.replace(/-/g, " ") || "";

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     service: serviceOptions.find((s) => s.toLowerCase() === preselectedService.toLowerCase()) || "",
//     budget: "",
//     description: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.service || !form.description) {
//       toast({ title: "Please fill all required fields", variant: "destructive" });
//       return;
//     }
//     saveBooking(form);
//     toast({ title: "Project request submitted! 🎉", description: "We'll contact you within 24 hours." });
//     setForm({ name: "", email: "", phone: "", company: "", service: "", budget: "", description: "" });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <section className="pt-28 pb-16">
//         <div className="container px-6 max-w-2xl">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
//               Start a <span className="text-gradient">Project</span>
//             </h1>
//             <p className="text-muted-foreground">Tell us about your project and we'll get back to you within 24 hours.</p>
//           </motion.div>

//           <motion.form
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             onSubmit={handleSubmit}
//             className="glass-panel rounded-2xl p-8 space-y-5"
//           >
//             <div className="grid sm:grid-cols-2 gap-4">
//               <Input placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-muted/50 border-border/50" />
//               <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-muted/50 border-border/50" />
//             </div>
//             <div className="grid sm:grid-cols-2 gap-4">
//               <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-muted/50 border-border/50" />
//               <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-muted/50 border-border/50" />
//             </div>

//             <div>
//               <label className="text-sm text-muted-foreground mb-2 block">Service *</label>
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                 {serviceOptions.map((s) => (
//                   <button
//                     key={s}
//                     type="button"
//                     onClick={() => setForm({ ...form, service: s })}
//                     className={`px-3 py-2 rounded-lg text-sm transition-all ${
//                       form.service === s
//                         ? "bg-neon-blue text-primary-foreground neon-glow"
//                         : "glass-panel text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="text-sm text-muted-foreground mb-2 block">Budget Range</label>
//               <div className="flex flex-wrap gap-2">
//                 {budgetOptions.map((b) => (
//                   <button
//                     key={b}
//                     type="button"
//                     onClick={() => setForm({ ...form, budget: b })}
//                     className={`px-4 py-2 rounded-lg text-sm transition-all ${
//                       form.budget === b
//                         ? "bg-neon-purple text-secondary-foreground neon-glow"
//                         : "glass-panel text-muted-foreground hover:text-foreground"
//                     }`}
//                   >
//                     {b}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <Textarea
//               placeholder="Describe your project *"
//               rows={5}
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//               className="bg-muted/50 border-border/50"
//             />

//             <Button variant="hero" type="submit" size="lg" className="w-full">
//               Submit Project Request
//             </Button>
//           </motion.form>
//         </div>
//       </section>

//       <FooterSection />
//     </div>
//   );
// };

// export default StartProject;
























import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const serviceOptions = [
  "Web Dashboards", "Mobile Apps", "Desktop Software",
  "Cloud Infrastructure", "Custom Development", "Other",
];

// Default ranges
const defaultBudgets = ["500,000 FCFA", "1,500,000 FCFA", "5,000,000 FCFA+"];

const StartProject = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productIdFromUrl = searchParams.get("project") || "";
  const preselectedService = searchParams.get("service")?.replace(/-/g, " ") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(!!productIdFromUrl);

  // Dynamic list of budget tabs
  const [budgetTabs, setBudgetTabs] = useState(defaultBudgets);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    productId: productIdFromUrl,
    service: serviceOptions.find((s) => s.toLowerCase() === preselectedService.toLowerCase()) || "",
    budget: "",
    desc: "",
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productIdFromUrl) return;
      try {
        const response = await axios.get(`https://pricebackend-n0qq.onrender.com/api/products/all`);
        if (response.data.success) {
          const product = response.data.data.find((p: any) => p._id === productIdFromUrl);
          if (product) {
            const productPrice = `${Number(product.fromprice).toLocaleString()} FCFA`;

            // Add product price to tabs if it doesn't exist and set it active
            setBudgetTabs((prev) => Array.from(new Set([productPrice, ...prev])));

            setForm(prev => ({
              ...prev,
              budget: productPrice,
              desc: `Booking for a website like: ${product.title}. `
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProductDetails();
  }, [productIdFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.budget) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("https://pricebackend-n0qq.onrender.com/api/book", form);
      if (response.status === 200) {
        toast({ title: "Booking Successful! 🎉", description: "Our team will contact you shortly." });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast({ title: "Submission failed", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
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
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="glass-panel rounded-3xl p-6 md:p-10 space-y-8 border border-white/5"
          >
            {/* User Details */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                <Input placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white/5 border-white/10 focus:border-neon-blue/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                <Input type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white/5 border-white/10" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Phone Number</label>
              <Input placeholder="+237 ..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-white/5 border-white/10" />
            </div>

            {/* Budget Tabs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Project Budget</label>
                {isLoadingProduct && <Loader2 className="w-3 h-3 animate-spin text-neon-blue" />}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setForm({ ...form, budget: tab })}
                    className={cn(
                      "relative flex items-center justify-between px-4 py-4 rounded-xl border transition-all duration-300",
                      form.budget === tab
                        ? "bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.15)]"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                    )}
                  >
                    <span className="font-mono font-bold tracking-tight">{tab}</span>
                    {form.budget === tab && (
                      <motion.div layoutId="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-5 h-5 text-neon-blue" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-4">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Service Required</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, service: s })}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-semibold transition-all border",
                      form.service === s
                        ? "bg-white text-black border-white"
                        : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground ml-1">Project Brief</label>
              <Textarea
                placeholder="Briefly describe what you want us to build..."
                rows={4}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="bg-white/5 border-white/10 resize-none"
              />
            </div>

            <Button
              variant="hero"
              type="submit"
              className="w-full py-7 text-lg shadow-xl"
              disabled={isSubmitting || isLoadingProduct}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm & Send Request"}
            </Button>
          </motion.form>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default StartProject;