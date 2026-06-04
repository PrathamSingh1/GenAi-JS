import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 240)}px`;
  };

  const handleSendMessage = (message) => {
    console.log(message);

    setInput("");

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  async function generate(message) {
    setLoading(true);
    // append message to ui
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    // send it to LLM
    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const reply = data.message;

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const message = input.trim();
      if (!message) return;

      handleSendMessage(message);

      generate(message);
    }
  };

  const handleClick = () => {
    const message = input.trim();
    if (!message) return;

    handleSendMessage(message);
    generate(message);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-200 flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-4">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              // user message
              <div
                key={i}
                className="bg-[hsl(15_63%_60%)] px-4 py-2 max-w-fit ml-auto rounded-xl my-4"
              >
                {msg.content}
              </div>
            ) : (
              <div
                key={i}
                className="max-w-fit rounded-xl my-4 prose prose-invert prose-md"
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ),
          )}
          {loading && <div className="my-4 text-neutral-400">Thinking...</div>}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-neutral-900 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-neutral-800 rounded-3xl px-4 py-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              onInput={handleInput}
              onKeyDown={handleEnter}
              placeholder="Type your message..."
              className="w-full resize-none outline-none bg-transparent min-h-10 max-h-60 py-2 overflow-y-auto"
            />

            <div className="flex justify-end mt-2">
              <button
                onClick={handleClick}
                className="px-4 py-1 bg-neutral-900 rounded-md hover:bg-neutral-700 hover:ring-neutral-900 transition-colors duration-300 active:scale-95 cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
