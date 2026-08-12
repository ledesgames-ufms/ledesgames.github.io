import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundGrid() {
  const { scrollYProgress } = useScroll();

  const rotateX = useTransform(scrollYProgress, [0, 0.2], [75, 0]);
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div 
      className="fixed inset-0 z-[-10] overflow-hidden bg-preto-espacial" 
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{
          rotateX,
          backgroundPositionY,
          backgroundImage: `
            linear-gradient(to right, rgba(41, 255, 198, 0.8) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(41, 255, 198, 0.8) 2px, transparent 2px)
          `,
          backgroundSize: "4rem 4rem",
          filter: "drop-shadow(0px 0px 8px rgba(41, 255, 198, 0.9))",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 60%)",
          maskImage: "linear-gradient(to bottom, transparent 20%, black 60%)",
        }}
        className="absolute left-[-50%] top-[-50%] h-[200%] w-[200%] origin-center"
      />
    </div>
  );
}