import React, { useState } from "react";
import "../styles/chat.css";

function Chat() {

  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! Ask me anything about diet, BMI, calories, protein, water etc.",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState("");

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("diet"))
      return "Eat balanced meals with proteins, carbs & vitamins 🥗";

    if (msg.includes("bmi"))
      return "BMI = weight / height². It shows your fitness level 📏";

    if (msg.includes("protein"))
      return "Protein foods: eggs, milk, paneer, beans 💪";

    if (msg.includes("water"))
      return "Drink at least 6–8 glasses of water daily 💧";

    if (msg.includes("weight loss"))
      return "Reduce sugar, eat healthy, and exercise regularly 🏃";

    if (msg.includes("weight gain"))
      return "Increase calories and protein intake 💪";

    if (msg.includes("hello") || msg.includes("hi"))
      return "Hello 👋 How can I help you?";

    return "I can help with diet, BMI, nutrition & health tips 😊";
  };

  const sendMessage = (text) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg = { text: messageText, sender: "user" };
    const botMsg = { text: getReply(messageText), sender: "bot" };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="chat-page">

      {/* LEFT SIDE */}
      <div className="chat-left">
        <div className="bot-icon">🤖</div>
        <h1>Nutri AI</h1>
      </div>

      {/* RIGHT CHAT */}
      <div className="chat-card">

        <div className="chat-header">🟢 Nutri Assistant</div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {/* QUICK BUTTONS */}
          <div className="quick-btns">
            <button onClick={() => sendMessage("weight loss diet")}>Weight Loss</button>
            <button onClick={() => sendMessage("weight gain diet")}>Weight Gain</button>
            <button onClick={() => sendMessage("protein foods")}>Protein</button>
            <button onClick={() => sendMessage("water intake")}>Water</button>
          </div>
        </div>

        {/* INPUT */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => sendMessage()}>Send</button>
        </div>

      </div>
    </div>
  );
}

export default Chat;