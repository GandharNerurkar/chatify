import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";


function ContactList() {
const {
  getAllContacts,
  allContacts,
  setSelectedUser,
  selectedUser,   // 🔥 ADD THIS
  isUsersLoading,
} = useChatStore();


  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, []); // ✅ prevent loop

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  if (!allContacts.length)
    return <p className="text-slate-400 p-4">No contacts found</p>;

return (
  <>
    {allContacts.map((contact) => {
  const isOnline = onlineUsers.includes(contact._id);
  const isActive = selectedUser?._id === contact._id; // 🔥 ADD

  return (
    <motion.div
      key={contact._id}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedUser(contact)}
      className={`relative flex items-center gap-4 px-4 py-3 rounded-xl 
        cursor-pointer transition-all duration-300
        ${
          isActive
            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/10 border border-cyan-500/30"
            : "hover:bg-slate-800/60"
        }`}
    >
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-700 shadow-sm">
              <img
                src={contact.profilePic || "/avatar.png"}
                alt={contact.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Online Indicator */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
                border-2 border-slate-900 
                ${isOnline ? "bg-emerald-500" : "bg-slate-500"}`}
            />

            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 
                bg-emerald-500 rounded-full animate-ping opacity-60" />
            )}
          </div>

          {/* Name + Status */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium truncate">
              {contact.fullName}
            </h4>

            <p className="text-xs text-slate-400 truncate">
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </motion.div>
      );
    })}
  </>
);
}

export default ContactList;
