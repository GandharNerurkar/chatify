import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { motion } from "framer-motion";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 min-h-0 px-6 pt-8 pb-3 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
  {messages.length > 0 && !isMessagesLoading ? (
    <div className="max-w-4xl mx-auto space-y-6">
      {messages.map((msg, index) => {
        const isOwnMessage = msg.senderId === authUser._id;

        return (
          <motion.div
            key={msg._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative max-w-[75%] px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md
                ${
                  isOwnMessage
                    ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-br-md"
                    : "bg-slate-800/80 text-slate-200 rounded-bl-md border border-white/5"
                }`}
            >
              {/* Image */}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Shared"
                  className="rounded-xl mb-2 max-h-60 object-cover shadow-md"
                />
              )}

              {/* Text */}
              {msg.text && (
                <p className="text-sm leading-relaxed break-words">
                  {msg.text}
                </p>
              )}

              {/* Time */}
              <span className="text-[10px] opacity-60 mt-2 block text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Scroll Target */}
      <div ref={messageEndRef} />
    </div>
  ) : isMessagesLoading ? (
    <MessagesLoadingSkeleton />
  ) : (
    <NoChatHistoryPlaceholder name={selectedUser.fullName} />
  )}
</div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
