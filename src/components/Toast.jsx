import { useEffect, useState } from "react";

export default function Toast() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onMessage(e) {
      const msg = e.detail;
      const id = Date.now() + Math.random();
      setMessages((m) => [...m, { id, ...msg }]);
      setTimeout(() => {
        setMessages((m) => m.filter((x) => x.id !== id));
      }, (msg.duration || 4000));
    }

    window.addEventListener("vs_message", onMessage);
    return () => window.removeEventListener("vs_message", onMessage);
  }, []);

  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
      {messages.map((m) => (
        <div key={m.id} className={`p-3 rounded shadow-md mb-3 max-w-sm ${m.type === 'error' ? 'bg-red-600 text-white' : m.type === 'success' ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'}`}>
          <div style={{ fontWeight: 700 }}>{m.title || (m.type === 'error' ? 'Error' : m.type === 'success' ? 'Success' : 'Notice')}</div>
          <div style={{ marginTop: 4 }}>{m.text}</div>
        </div>
      ))}
    </div>
  );
}
