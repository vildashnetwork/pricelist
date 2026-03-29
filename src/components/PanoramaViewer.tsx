import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PanoramaViewerProps {
  image: string;
  title: string;
  onClose: () => void;
}

const PanoramaViewer = ({ image, title, onClose }: PanoramaViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const animRef = useRef<number>();

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const animate = () => {
      setCurrentOffset((prev) => prev - 0.5);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [autoRotate, isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.clientX - offsetX);
  }, [offsetX]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startX;
    setOffsetX(newOffset);
    setCurrentOffset(newOffset);
  }, [isDragging, startX]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setOffsetX(currentOffset);
  }, [currentOffset]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.touches[0].clientX - offsetX);
  }, [offsetX]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const newOffset = e.touches[0].clientX - startX;
    setOffsetX(newOffset);
    setCurrentOffset(newOffset);
  }, [isDragging, startX]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h3 className="font-display text-lg text-foreground">{title} — 360° Tour</h3>
        <div className="flex items-center gap-2">
          <Button variant="heroOutline" size="sm" onClick={() => setAutoRotate(!autoRotate)}>
            <RotateCcw className="w-4 h-4 mr-1" />
            {autoRotate ? "Stop" : "Auto Rotate"}
          </Button>
          <Button variant="heroOutline" size="sm" onClick={() => setZoom((z) => Math.min(z + 0.3, 3))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="heroOutline" size="sm" onClick={() => setZoom((z) => Math.max(z - 0.3, 0.5))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="heroOutline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          className="h-full flex items-center select-none"
          style={{
            transform: `translateX(${currentOffset}px) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Repeat the image 3x for seamless loop */}
          {[0, 1, 2].map((i) => (
            <img
              key={i}
              src={image}
              alt={`${title} panorama view ${i + 1}`}
              className="h-full w-auto max-w-none pointer-events-none"
              draggable={false}
            />
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel rounded-full px-6 py-3 text-sm text-muted-foreground">
          👆 Drag to look around • Scroll to zoom • Click buttons to control
        </div>
      </div>
    </motion.div>
  );
};

export default PanoramaViewer;
