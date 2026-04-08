import React, { useState } from "react";
import "../styles/chat.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome! I'm Nutri AI. Ask me about diet, calories, protein, water etc.",
      sender: "bot",
      options: ["Weight Loss Diet", "Weight Gain Diet", "Protein Foods", "Water Intake"]
    }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("weight loss")) {
      return {
        text: "For weight loss choose low calorie foods 🥗",
        options: ["Oats", "Salads", "Fruits", "Green Tea", "Soup"]
      };
    }

    if (msg.includes("weight gain")) {
      return {
        text: "For weight gain eat high calorie foods 💪",
        options: ["Rice", "Milk", "Eggs", "Nuts", "Banana Shake"]
      };
    }

    if (msg.includes("protein")) {
      return {
        text: "Protein rich foods:",
        options: ["Eggs", "Chicken", "Paneer", "Dal", "Soybeans"]
      };
    }

    if (msg.includes("water")) {
      return {
        text: "Stay hydrated 💧",
        options: ["2-3 Liters", "Coconut Water", "Water Timing", "Benefits"]
      };
    }

    return {
      text: "Eat healthy and stay fit 💪",
      options: ["Diet Tips", "Workout Tips"]
    };
  };

  const sendMessage = (msgText = input) => {
    if (!msgText.trim()) return;

    const userMsg = { text: msgText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReply = getReply(msgText);

      setMessages((prev) => [
        ...prev,
        {
          text: botReply.text,
          sender: "bot",
          options: botReply.options
        }
      ]);

      setTyping(false);
    }, 700);
  };

  return (
    <div className="chat-page">

      {/* LEFT SIDE */}
      <div className="chat-left-ui">
        <div className="center-box">
          <div className="logo-circle">🤖</div>
          <h1>Nutri AI</h1>
        </div>
      </div>

      {/* RIGHT CHAT */}
      <div className="chat-box">

        <div className="chat-header">
          <span className="dot"></span>
          Nutri Assistant
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender}`}>
              <div className="bubble">{msg.text}</div>

              {msg.options && (
                <div className="options">
                  {msg.options.map((opt, idx) => (
                    <button key={idx} onClick={() => sendMessage(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && <div className="typing">Typing...</div>}
        </div>

        <div className="chat-footer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={() => sendMessage()}>➤</button>
        </div>

      </div>
    </div>
  );
}

export default ChatBot;