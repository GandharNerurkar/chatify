import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { X } from "lucide-react";


function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="relative flex items-center justify-between 
  px-6 py-4 bg-slate-950/70 backdrop-blur-xl 
  border-b border-white/5 shadow-lg">

  {/* Top Gradient Accent */}
  <div className="absolute top-0 left-0 w-full h-[2px] 
    bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-60" />

  {/* LEFT SECTION */}
  <div className="flex items-center gap-4">

    {/* Avatar */}
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-12 h-12 rounded-full overflow-hidden 
          ring-2 ring-slate-700 shadow-md"
      >
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullName}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Animated Online Indicator */}
      <span
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
          border-2 border-slate-950
          ${isOnline ? "bg-emerald-500" : "bg-slate-500"}`}
      />
      {isOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full 
          bg-emerald-500 animate-ping opacity-60" />
      )}
    </div>

    {/* User Info */}
    <div>
      <h3 className="text-white font-semibold text-base tracking-wide">
        {selectedUser.fullName}
      </h3>

      <p className={`text-xs mt-1 font-medium 
        ${isOnline ? "text-emerald-400" : "text-slate-400"}`}>
        {isOnline ? "Online" : "Offline"}
      </p>
    </div>
  </div>

  {/* RIGHT ACTIONS */}
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => setSelectedUser(null)}
    className="p-2 rounded-lg bg-slate-800/70 
      hover:bg-red-500/20 transition shadow-md"
  >
    <X className="w-4 h-4 text-slate-300 hover:text-red-400 transition-colors" />
  </motion.button>
</div>
  );
}
export default ChatHeader;
