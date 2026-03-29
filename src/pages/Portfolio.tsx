import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/serviceData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PanoramaViewer from "@/components/PanoramaViewer";
import { useState, useEffect } from "react";

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Updated state to handle the full array of tour images
  const [tourProject, setTourProject] = useState<{ images: string[]; title: string } | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Use 'category' for deriving filter tabs
  const categories = ["All", ...new Set(projects.map((p) => p.category || "Uncategorized"))];

  // Logic updated to filter by 'category'
  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => (p.category || "Uncategorized") === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore our collection of premium digital products built with precision and innovation.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={`filter-${cat}`}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  filter === cat
                    ? "bg-neon-blue border-neon-blue text-primary-foreground shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                    : "glass-panel border-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-neon-blue" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => {
                  const safeCategory = project.category || "general";
                  const categorySlug = safeCategory.toLowerCase().replace(/\s+/g, '-');

                  return (
                    <motion.div
                      key={project.id || `proj-${i}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="glass-panel rounded-2xl overflow-hidden group flex flex-col border border-white/5 hover:border-neon-blue/30 transition-all"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                          <Button
                            variant="hero"
                            size="sm"
                            className="w-full max-w-[160px]"
                            onClick={() => {
                              // PASSING THE ARRAY: Pass the entire tourImages array
                              setTourProject({ 
                                images: project.tourImages || [project.image], 
                                title: project.title 
                              });
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" /> 360° Tour
                          </Button>

                          <Link
                            to={`/start-project?service=${categorySlug}&project=${project.id}`}
                            className="w-full max-w-[160px]"
                          >
                            <Button variant="outline" size="sm" className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white">
                              <ShoppingCart className="w-4 h-4 mr-2" /> Book Now
                            </Button>
                          </Link>
                        </div>

                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 shadow-lg">
                          <span className="text-neon-blue font-mono font-bold text-sm">
                            {project.fromprice ? `${Number(project.fromprice).toLocaleString()} FCFA` : "Custom"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-neon-cyan font-bold mb-2">
                          {project.category || "Custom Project"}
                        </span>

                        <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-neon-blue transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                          {project.description}
                        </p>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                          <div className="flex -space-x-2">
                            {project.tags?.slice(0, 3).map((tag: string, tagIdx: number) => (
                              <div
                                key={`${project.id}-tag-${tagIdx}`}
                                className="h-6 px-2 flex items-center bg-muted border border-white/10 rounded text-[9px] text-white/70"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>

                          <Link
                            to={`/start-project?project=${project.id}`}
                            className="text-neon-blue text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Details <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <FooterSection />

      <AnimatePresence>
        {tourProject && (
          <PanoramaViewer
            // Note: Update PanoramaViewer to accept 'images' prop if it handles galleries
            image={tourProject.images[0]} // Fallback for single image viewer
            allImages={tourProject.images} // Passing the full array
            title={tourProject.title}
            onClose={() => setTourProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;