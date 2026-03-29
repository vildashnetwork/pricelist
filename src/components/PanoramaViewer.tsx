


// import { useState, useRef, useCallback, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, RotateCcw, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils"; // Assuming you use shadcn/ui utility

// interface PanoramaViewerProps {
//   images: string[];
//   title: string;
//   onClose: () => void;
// }

// const PanoramaViewer = ({ images = [], title, onClose }: PanoramaViewerProps) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [offsetX, setOffsetX] = useState(0);
//   const [currentOffset, setCurrentOffset] = useState(0);
//   const [zoom, setZoom] = useState(1);
//   const [autoRotate, setAutoRotate] = useState(true);
//   const [showThumbnails, setShowThumbnails] = useState(false);
//   const animRef = useRef<number>();

//   // Safety check to prevent crashes if images array is empty
//   const activeImage = images.length > 0 ? images[currentIndex] : null;

//   useEffect(() => {
//     if (!autoRotate || isDragging) return;
//     const animate = () => {
//       setCurrentOffset((prev) => prev - 0.5);
//       animRef.current = requestAnimationFrame(animate);
//     };
//     animRef.current = requestAnimationFrame(animate);
//     return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
//   }, [autoRotate, isDragging]);

//   const handleMouseDown = useCallback((e: React.MouseEvent) => {
//     setIsDragging(true);
//     setAutoRotate(false);
//     setStartX(e.clientX - offsetX);
//   }, [offsetX]);

//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     if (!isDragging) return;
//     const newOffset = e.clientX - startX;
//     setOffsetX(newOffset);
//     setCurrentOffset(newOffset);
//   }, [isDragging, startX]);

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//     setOffsetX(currentOffset);
//   }, [currentOffset]);

//   // Navigation Logic
//   const nextImage = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//     resetPosition();
//   };

//   const prevImage = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//     resetPosition();
//   };

//   const resetPosition = () => {
//     setCurrentOffset(0);
//     setOffsetX(0);
//     setZoom(1);
//   };

//   if (!activeImage) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col select-none"
//     >
//       {/* --- HEADER --- */}
//       <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 z-20">
//         <div className="flex flex-col">
//           <h3 className="font-display text-lg text-foreground leading-none">{title}</h3>
//           <p className="text-xs text-muted-foreground mt-1 tracking-wider">
//             VIEW {currentIndex + 1} OF {images.length}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setShowThumbnails(!showThumbnails)}
//             className={cn("hidden sm:flex", showThumbnails && "bg-primary text-primary-foreground")}
//           >
//             <LayoutGrid className="w-4 h-4 mr-1" />
//             Gallery
//           </Button>

//           <Button variant="outline" size="sm" onClick={() => setAutoRotate(!autoRotate)} className="hidden md:flex">
//             <RotateCcw className={cn("w-4 h-4 mr-1", autoRotate && "animate-spin-slow")} />
//             {autoRotate ? "Stop" : "Auto Rotate"}
//           </Button>

//           <div className="flex border rounded-md overflow-hidden bg-background">
//             <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.min(z + 0.5, 4))} className="border-r rounded-none">
//               <ZoomIn className="w-4 h-4" />
//             </Button>
//             <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.max(z - 0.5, 0.5))} className="rounded-none">
//               <ZoomOut className="w-4 h-4" />
//             </Button>
//           </div>

//           <Button variant="destructive" size="sm" onClick={onClose} className="ml-2">
//             <X className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>

//       {/* --- VIEWER AREA --- */}
//       <div
//         ref={containerRef}
//         className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing relative bg-black"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//       >
//         {/* Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={(e) => { e.stopPropagation(); prevImage(); }}
//               className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all backdrop-blur-md"
//             >
//               <ChevronLeft className="w-8 h-8" />
//             </button>
//             <button
//               onClick={(e) => { e.stopPropagation(); nextImage(); }}
//               className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all backdrop-blur-md"
//             >
//               <ChevronRight className="w-8 h-8" />
//             </button>
//           </>
//         )}

//         {/* Panorama Strip */}
//         <div
//           className="h-full flex items-center"
//           style={{
//             transform: `translateX(${currentOffset}px) scale(${zoom})`,
//             transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)",
//           }}
//         >
//           {/* Key on index ensures images swap instantly when currentIndex changes */}
//           {[0, 1, 2].map((i) => (
//             <img
//               key={`${currentIndex}-${i}`}
//               src={activeImage}
//               alt={`${title} panorama view`}
//               className="h-full w-auto max-w-none pointer-events-none"
//               draggable={false}
//               onDragStart={(e) => e.preventDefault()}
//             />
//           ))}
//         </div>

//         {/* --- THUMBNAIL OVERLAY --- */}
//         <AnimatePresence>
//           {showThumbnails && (
//             <motion.div
//               initial={{ y: 100, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 100, opacity: 0 }}
//               className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-max max-w-[90vw] overflow-x-auto p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl flex gap-2"
//             >
//               {images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => { setCurrentIndex(idx); resetPosition(); }}
//                   className={cn(
//                     "relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
//                     currentIndex === idx ? "border-neon-blue scale-105" : "border-transparent opacity-50 hover:opacity-100"
//                   )}
//                 >
//                   <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
//                 </button>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Instructions */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-full px-6 py-2 text-xs text-white/70 backdrop-blur-md border border-white/10 pointer-events-none uppercase tracking-tighter">
//           Drag to explore • Use arrows for other rooms
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default PanoramaViewer;


























import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PanoramaViewerProps {
  images: string[];
  title: string;
  onClose: () => void;
}

const PanoramaViewer = ({ images = [], title, onClose }: PanoramaViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const animRef = useRef<number>();

  const activeImage = images.length > 0 ? images[currentIndex] : null;

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const animate = () => {
      setCurrentOffset((prev) => prev - 0.5);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [autoRotate, isDragging]);

  // --- MOUSE HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.clientX - offsetX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX;
    setOffsetX(newOffset);
    setCurrentOffset(newOffset);
  };

  // --- TOUCH HANDLERS (FOR MOBILE) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    // Use the first touch point
    setStartX(e.touches[0].clientX - offsetX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const newOffset = e.touches[0].clientX - startX;
    setOffsetX(newOffset);
    setCurrentOffset(newOffset);
  };

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setOffsetX(currentOffset);
  }, [currentOffset]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetPosition();
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetPosition();
  };

  const resetPosition = () => {
    setCurrentOffset(0);
    setOffsetX(0);
    setZoom(1);
  };

  if (!activeImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col select-none"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50 z-20">
        <div className="flex flex-col">
          <h3 className="font-display text-base sm:text-lg text-foreground leading-none truncate max-w-[150px] sm:max-w-none">{title}</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 tracking-wider uppercase">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={cn("px-2 h-8", showThumbnails && "bg-primary text-primary-foreground")}
          >
            <LayoutGrid className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Gallery</span>
          </Button>

          <div className="flex border rounded-md overflow-hidden bg-background h-8">
            <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.min(z + 0.5, 4))} className="border-r rounded-none px-2">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.max(z - 0.5, 0.5))} className="rounded-none px-2">
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="destructive" size="sm" onClick={onClose} className="h-8 px-2">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* VIEWER AREA */}
      <div
        ref={containerRef}
        // touch-action: none is critical for mobile dragging to work
        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing relative bg-black touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Navigation Arrows - Smaller on Mobile */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-4 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-4 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </>
        )}

        {/* Panorama Strip */}
        <div
          className="h-full flex items-center"
          style={{
            transform: `translateX(${currentOffset}px) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <img
              key={`${currentIndex}-${i}`}
              src={activeImage}
              alt="panorama"
              className="h-full w-auto max-w-none pointer-events-none object-cover"
              draggable={false}
            />
          ))}
        </div>

        {/* THUMBNAIL OVERLAY */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-max max-w-[95vw] overflow-x-auto p-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl flex gap-2 no-scrollbar"
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentIndex(idx); resetPosition(); }}
                  className={cn(
                    "relative w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                    currentIndex === idx ? "border-primary scale-105" : "border-transparent opacity-50"
                  )}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-4 py-1.5 text-[10px] text-white/70 backdrop-blur-md border border-white/10 pointer-events-none uppercase tracking-widest text-center min-w-[200px]">
          {isDragging ? "Exploring..." : "Swipe or Drag to explore"}
        </div>
      </div>
    </motion.div>
  );
};

export default PanoramaViewer;