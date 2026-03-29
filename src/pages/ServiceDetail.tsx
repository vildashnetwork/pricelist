import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/lib/serviceData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PanoramaViewer from "@/components/PanoramaViewer";
import { useState } from "react";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug || "");
  const [tourProject, setTourProject] = useState<{ image: string; title: string } | null>(null);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/">
            <Button variant="hero">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16">
        <div className="container px-6">
          <Link to="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
              <span className="text-gradient">{service.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{service.longDescription}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="glass-panel rounded-2xl overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button variant="hero" size="sm" onClick={() => setTourProject({ image: project.tourImage, title: project.title })}>
                      <Eye className="w-4 h-4 mr-1" /> 360° Tour
                    </Button>
                    <Link to={`/start-project?service=${service.slug}`}>
                      <Button variant="heroOutline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" /> Book Now
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Ready to build something amazing?</p>
            <div className="flex gap-4 justify-center">
              <Link to={`/start-project?service=${service.slug}`}>
                <Button variant="hero" size="lg">Start a Project</Button>
              </Link>
              <Link to="/get-quote">
                <Button variant="heroOutline" size="lg">Get a Quote</Button>
              </Link>
            </div>
          </motion.div>
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

export default ServiceDetail;
