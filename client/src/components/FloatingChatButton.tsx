import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatDrawer from "./ChatDrawer";

export default function FloatingChatButton() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
      <button
        onClick={() => setChatOpen((open) => !open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${
          chatOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-maroon hover:bg-maroon-dark"
        }`}
        title="Chat with Karunya Bot"
      >
        {chatOpen ? (
          <MessageCircle className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white animate-bounce [animation-duration:2s] [animation-iteration-count:3]" />
        )}
      </button>
    </>
  );
}