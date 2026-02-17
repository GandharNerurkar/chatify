import { useState, useRef } from "react";
// import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";
import {
  LogOut,
  Volume2,
  VolumeX,
  Camera,
} from "lucide-react"

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="px-6 py-5 border-b border-white/5 
  backdrop-blur-xl bg-slate-900/70 shadow-lg">

  <div className="flex items-center justify-between">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-4">

      {/* AVATAR */}
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current.click()}
          className="relative w-14 h-14 rounded-full overflow-hidden 
            ring-2 ring-slate-700 shadow-md"
        >
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="User"
            className="w-full h-full object-cover"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 
            opacity-0 group-hover:opacity-100 
            flex items-center justify-center transition">
            <Camera className="w-5 h-5 text-white" />
          </div>
        </motion.button>

        {/* Online Dot */}
        <span className="absolute bottom-1 right-1 w-3 h-3 
          bg-emerald-500 rounded-full border-2 border-slate-900 
          shadow-[0_0_8px_#10b981]" />
      </div>

      {/* USER INFO */}
      <div>
        <h3 className="text-white font-semibold text-base truncate max-w-[160px]">
          {authUser.fullName}
        </h3>

        <p className="text-emerald-400 text-xs mt-1">
          Online
        </p>
      </div>
    </div>

    {/* RIGHT ACTION BUTTONS */}
    <div className="flex items-center gap-3">

      {/* SOUND TOGGLE */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          mouseClickSound.currentTime = 0;
          mouseClickSound.play().catch(() => {});
          toggleSound();
        }}
        className="p-2 rounded-lg bg-slate-800/60 
          hover:bg-slate-700 transition shadow-sm"
      >
        {isSoundEnabled ? (
          <Volume2 className="w-4 h-4 text-cyan-400" />
        ) : (
          <VolumeX className="w-4 h-4 text-slate-400" />
        )}
      </motion.button>

      {/* LOGOUT */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={logout}
        className="p-2 rounded-lg bg-slate-800/60 
          hover:bg-red-500/20 transition shadow-sm"
      >
        <LogOut className="w-4 h-4 text-red-400" />
      </motion.button>

    </div>

    {/* Hidden File Input */}
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleImageUpload}
      className="hidden"
    />
  </div>
</div>
  );
}
export default ProfileHeader;
