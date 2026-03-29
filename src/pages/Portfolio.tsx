import { motion, AnimatePresence } from "framer-motion";
import { Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/serviceData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PanoramaViewer from "@/components/PanoramaViewer";
import { useState } from "react";

const Portfolio = () => {
  const projects = getAllProjects();
  const [tourProject, setTourProject] = useState<{ image: string; title: string } | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(projects.map((p) => p.service))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.service === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore our collection of premium digital products built for clients worldwide.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-neon-blue text-primary-foreground neon-glow"
                    : "glass-panel text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                layout
                className="glass-panel rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button variant="hero" size="sm" onClick={() => setTourProject({ image: project.tourImage, title: project.title })}>
                      <Eye className="w-4 h-4 mr-1" /> 360° Tour
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-neon-cyan font-medium">{project.service}</span>
                  <h3 className="text-lg font-display font-semibold text-foreground mt-1 mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />

      <AnimatePresence>
        {tourProject && (
          <PanoramaViewer image={tourProject.image} title={tourProject.title} onClose={() => setTourProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
