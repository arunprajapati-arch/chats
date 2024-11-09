import React, { useState } from 'react';
import UserChat from '@/components/UserChat';
import { Input } from '../Input';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

function Chat() {

    const placeholders = [
        "Type your message...",
       
      ];

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello!', time: '10:00 AM', isUser: false },
    { text: 'Hi there!', time: '10:01 AM', isUser: true },
    { text: 'How can I help you today?', time: '10:02 AM', isUser: false },
  ]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        time: new Date().toLocaleTimeString(),
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 p-4 rounded-lg shadow-lg">
      {/* Message List */}
      <UserChat messages={messages} />

      {/* Input Section */}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSendMessage}
      />
    </div>
  );
}

export default Chat;
