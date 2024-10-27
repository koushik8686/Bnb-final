import React, { useState } from "react";
import Chat from "./Chat";

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-black-500 text-white rounded hover:bg-gray-600"
    >
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, onKeyPress }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyPress={onKeyPress}
      className="w-full px-4 py-2 border rounded"
    />
  );
}

function Card({ children }) {
  return <div className="border rounded-lg shadow p-6">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="mb-4 border-b pb-2">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}

function Contact() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "Bot", message: "Hello! How can I assist you today?" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: "You", message }]);
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { sender: "Bot", message: "Thank you for your message. A team member will get back to you soon." },
        ]);
      }, 1000);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <li>
              <a href="/teamleads/registered-games">
                <Button variant="ghost">Registered Games</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/registration-details">
                <Button variant="ghost">Registration Details</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/team-list">
                <Button variant="ghost">Team List</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/table-standing">
                <Button variant="ghost">Table Standing</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/contact">
                <Button variant="ghost">Contact</Button>
              </a>
            </li>
          </ul> 
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>
        <Chat/>
      </main>
    </div>
  );
}

export default Contact;
