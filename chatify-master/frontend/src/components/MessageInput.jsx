import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
// import { SendIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, Send } from "lucide-react"

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-5 border-t border-white/5 backdrop-blur-xl bg-slate-900/70">

  {/* 🔥 Image Preview */}
  <AnimatePresence>
    {imagePreview && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="max-w-3xl mx-auto mb-4"
      >
        <div className="relative w-fit">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-xl shadow-lg border border-white/10"
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={removeImage}
            type="button"
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full 
              bg-slate-800 border border-white/10 flex items-center justify-center 
              text-white shadow-md hover:bg-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* 💬 Input Form */}
  <form
    onSubmit={handleSendMessage}
    className="max-w-4xl mx-auto flex items-center gap-3"
  >
    {/* Text Input */}
    <div className="relative flex-1">
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          isSoundEnabled && playRandomKeyStrokeSound();
        }}
        placeholder="Type your message..."
        className="w-full bg-slate-800/60 border border-white/10 
          rounded-full py-3 px-5 text-sm text-white
          focus:outline-none focus:ring-2 focus:ring-cyan-500
          transition-all duration-300"
      />
    </div>

    {/* Hidden File Input */}
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleImageChange}
      className="hidden"
    />

    {/* Image Upload Button */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      onClick={() => fileInputRef.current?.click()}
      className={`w-11 h-11 flex items-center justify-center rounded-full 
        bg-slate-800 border border-white/10 text-slate-400 
        hover:text-white hover:bg-slate-700 transition
        ${imagePreview ? "text-cyan-400" : ""}`}
    >
      <ImageIcon className="w-5 h-5" />
    </motion.button>

    {/* Send Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      disabled={!text.trim() && !imagePreview}
      className="w-11 h-11 flex items-center justify-center rounded-full 
        bg-gradient-to-r from-cyan-500 to-cyan-600 
        text-white shadow-lg hover:shadow-cyan-500/40
        transition-all duration-300 disabled:opacity-40"
    >
      <Send className="w-5 h-5" />
    </motion.button>
  </form>
</div>
  );
}
export default MessageInput;
