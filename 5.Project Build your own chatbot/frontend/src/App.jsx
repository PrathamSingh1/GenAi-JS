import { useRef } from "react";

function App() {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 240)}px`;
  };

  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-200 flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-4">
          {/* User message */}
          <div className="bg-amber-600 px-4 py-2 max-w-fit ml-auto rounded-xl my-4">
            Hi, how are you?
          </div>

          {/* Assistent message */}
          <div className="max-w-fit rounded-xl my-4">
            I am fine, how are you?
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-neutral-900 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-neutral-800 rounded-3xl px-4 py-3">
            <textarea
              ref={textareaRef}
              rows={1}
              onInput={handleInput}
              placeholder="Type your message..."
              className="w-full resize-none outline-none bg-transparent min-h-10 max-h-60 py-2 overflow-y-auto"
            />

            <div className="flex justify-end mt-2">
              <button className="px-4 py-1 bg-neutral-900 rounded-md hover:bg-neutral-600 hover:ring-neutral-900 transition-all duration-300 active:scale-95 cursor-pointer">
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
