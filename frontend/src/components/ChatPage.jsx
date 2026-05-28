import { useState, useRef, useEffect } from "react";

const CURRENT_USER = "Rakesh";

const initialMessages = [
  { id: 1, sender: "Rakesh", text: "Hi", time: "12:53" },
];

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function Avatar({ name }) {
  return (
    <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const typingTimer = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInput = (e) => {
    setInput(e.target.value);
    setTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTyping(false), 1500);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: CURRENT_USER, text: input.trim(), time: getTime() },
    ]);
    setInput("");
    setTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden" style={{ height: "90vh", maxHeight: "700px" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar name="R" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Realtime group chat</p>
              <p className="text-xs text-gray-400">
                {typing ? "Someone is typing..." : "Online"}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Signed in as <span className="font-semibold text-gray-700">{CURRENT_USER}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-gray-50">
          {messages.map((msg) => {
            const isMe = msg.sender === CURRENT_USER;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm shadow-sm ${
                    isMe
                      ? "bg-green-100 text-gray-800 rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex items-center justify-between gap-3 mt-1">
                    <span className="text-xs font-medium text-gray-500">{msg.sender}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-150 ${
              input.trim()
                ? "bg-green-500 hover:bg-green-600 active:scale-95"
                : "bg-green-300 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}