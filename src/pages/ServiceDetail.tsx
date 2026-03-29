


// import { useParams, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, ExternalLink, Eye, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useServices } from "@/lib/serviceData"; // Use the hook instead of the direct function
// import Navbar from "@/components/Navbar";
// import FooterSection from "@/components/FooterSection";
// import PanoramaViewer from "@/components/PanoramaViewer";
// import { useState } from "react";

// const ServiceDetail = () => {
//   const { slug } = useParams();
//   const { getServiceBySlug, loading, error } = useServices(); // Access hook states
//   const [tourProject, setTourProject] = useState<{ image: string; title: string } | null>(null);

//   const service = getServiceBySlug(slug || "");

//   // 1. Handle Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="w-10 h-10 text-neon-blue animate-spin" />
//       </div>
//     );
//   }

//   // 2. Handle Error or Missing Service
//   if (error || !service) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-display font-bold text-foreground mb-4">
//             {error ? "Connection Error" : "Service Not Found"}
//           </h1>
//           <p className="text-muted-foreground mb-6">We couldn't find the projects you're looking for.</p>
//           <Link to="/">
//             <Button variant="hero">Go Home</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <section className="pt-28 pb-16">
//         <div className="container px-6">
//           <Link to="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Services
//           </Link>

//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
//             <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
//               <span className="text-gradient">{service.title}</span>
//             </h1>
//             <p className="text-lg text-muted-foreground max-w-2xl">{service.longDescription}</p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
//             {service.projects.map((project, i) => (
//               <motion.div
//                 key={project.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.15 }}
//                 className="glass-panel rounded-2xl overflow-hidden group border border-white/10"
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     loading="lazy"
//                     className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
//                   />

//                   {/* Price Tag Overlay */}
//                   <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-neon-blue/30 text-neon-blue font-mono text-sm">
//                     {Number(project.fromprice).toLocaleString()} - {Number(project.toprice).toLocaleString()} FCFA
//                   </div>

//                   <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                     <Button variant="hero" size="sm" onClick={() => setTourProject({ image: project.tourImage, title: project.title })}>
//                       <Eye className="w-4 h-4 mr-1" /> 360° Tour
//                     </Button>
//                     <Link to={`/start-project?service=${service.slug}&project=${project.title}`}>
//                       <Button variant="heroOutline" size="sm">
//                         <ExternalLink className="w-4 h-4 mr-1" /> Book Now
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-display font-semibold text-foreground">{project.title}</h3>
//                   </div>
//                   <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

//                   <div className="flex flex-wrap gap-2">
//                     {project.tags.map((tag) => (
//                       <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 text-center bg-white/5 p-12 rounded-3xl border border-white/10">
//             <h2 className="text-2xl font-bold mb-2">Interested in {service.title}?</h2>
//             <p className="text-muted-foreground mb-8">Get a tailored quote for your specific needs.</p>
//             <div className="flex gap-4 justify-center">
//               <Link to={`/start-project?service=${service.slug}`}>
//                 <Button variant="hero" size="lg">Start a Project</Button>
//               </Link>
//               <Link to="/get-quote">
//                 <Button variant="heroOutline" size="lg">Get a Quote</Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <FooterSection />

//       <AnimatePresence>
//         {tourProject && (
//           <PanoramaViewer
//             image={tourProject.image}
//             title={tourProject.title}
//             onClose={() => setTourProject(null)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ServiceDetail;








import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Eye, Loader2, Tag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices } from "@/lib/serviceData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PanoramaViewer from "@/components/PanoramaViewer";
import { useState } from "react";

const ServiceDetail = () => {
  const { slug } = useParams();
  const { getServiceBySlug, loading, error } = useServices();

  const [tourProject, setTourProject] = useState<{ images: string[]; title: string } | null>(null);

  const service = getServiceBySlug(slug || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-neon-blue animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            {error ? "Connection Error" : "Service Not Found"}
          </h1>
          <Link to="/">
            <Button variant="hero">Return to Home</Button>
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
          <Link to="/#services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              <span className="text-gradient">{service.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {service.longDescription}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {service.projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden group border border-white/5 hover:border-neon-blue/30 transition-all duration-500 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Price Tag ON IMAGE */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-neon-blue/40 text-neon-blue font-mono text-sm shadow-[0_0_15px_rgba(0,243,255,0.2)] z-10">
                    {Number(project.fromprice).toLocaleString()} FCFA
                  </div>

                  {/* Hover Overlay - Now with 3 Actions */}
                  <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 z-20 p-4">
                    <div className="flex gap-3">
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => setTourProject({
                          images: project.tourImages,
                          title: project.title
                        })}
                      >
                        <Eye className="w-4 h-4 mr-2" /> 360° Tour
                      </Button>

                      {/* Live Demo Button (Opens weblink) */}
                      {project.link && project.link !== "#" && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="heroOutline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                          </Button>
                        </a>
                      )}
                    </div>

                    {/* Booking Button (Goes to start-project) */}
<Link 
  to={`/start-project?service=${service.slug}&project=${encodeURIComponent(project?.id || project?._id)}`} 
  className="w-full max-w-[220px]"
>
  <Button variant="outline" size="sm" className="w-full border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10">
    <ShoppingCart className="w-4 h-4 mr-2" /> Book This Project
  </Button>
</Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-3 group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Price Info Below Description */}
                  <div className="flex items-center gap-2 mb-6 text-neon-blue/80 font-mono text-sm">
                    <Tag className="w-4 h-4" />
                    <span>Starts at {Number(project.fromprice).toLocaleString()} FCFA</span>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/10"
                      >
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
          <PanoramaViewer
            images={tourProject.images}
            title={tourProject.title}
            onClose={() => setTourProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetail;