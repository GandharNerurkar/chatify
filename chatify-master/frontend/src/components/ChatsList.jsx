import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

function ChatsList() {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
    selectedUser, // ✅ FIXED
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);
        const isActive = selectedUser?._id === chat._id;

        return (
          <motion.div
            key={chat._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedUser(chat)}
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
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
                  border-2 border-slate-900 
                  ${isOnline ? "bg-emerald-500" : "bg-slate-500"}`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate">
                {chat.fullName}
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

export default ChatsList;
