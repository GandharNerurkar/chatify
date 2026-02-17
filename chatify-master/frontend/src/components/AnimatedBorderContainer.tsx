import { motion } from "framer-motion";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const AnimatedBorderContainer = ({ children }: Props) => {
  return (
  <motion.div
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className="relative w-full h-full rounded-2xl overflow-hidden"
  >
    {/* Gradient Animated Edge */}
    <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br 
      from-cyan-500/40 via-purple-500/40 to-cyan-500/40 
      animate-[spin_12s_linear_infinite] opacity-40" />

    {/* Frosted Surface */}
    <div className="relative w-full h-full rounded-2xl 
      bg-slate-900/70 backdrop-blur-xl 
      border border-white/5 shadow-2xl overflow-hidden">

      {/* Subtle Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r 
          from-transparent via-white/5 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Depth Glow */}
      <div className="absolute inset-0 rounded-2xl 
        shadow-[0_0_60px_rgba(0,255,255,0.05)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  </motion.div>
);

};
export default AnimatedBorderContainer;