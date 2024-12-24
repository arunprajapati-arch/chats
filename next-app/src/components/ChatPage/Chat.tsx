import React, { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket'; 
import UserChat from '@/components/UserChat';
import { ChevronRightCircleIcon } from 'lucide-react';

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

type Socket = WebSocket | null 

interface ChatPageProps {
  roomId: string;
  socket: Socket
}

function Chat({ roomId,socket }: ChatPageProps) {
  
  const [input, setInput] = useState('');
  const [lastSent, setLastSent] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  
  
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      
      if(parsedData.type === "chat") {
        const newMessage: Message = {
          text: parsedData.payload.message,
          time: new Date().toLocaleTimeString(),
          isUser: false,
        };
        
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
     
    };


    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  const handleSendMessage = () => {
    const now = Date.now();

    if (lastSent && now - lastSent < 5000) {
      alert('Please wait before sending another message');
      return;
    }

    if (input.trim() === '') return;
    if(socket) {
      const newMessage: Message = {
        text: input,
        time: new Date().toLocaleTimeString(),
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLastSent(now);
      setInput('');

      socket.send(JSON.stringify({
        type: 'chat',
        payload: {roomId , message: newMessage.text},
      }));
    }
  };

  // Handle key press to send message (Enter key)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 p-4 rounded-lg shadow-lg">
      {/* Message List */}
      <UserChat messages={messages} />

      {/* Input Section */}
      <div className='flex items-center justify-center'>
        <input
          type="text"
          placeholder="Type your message...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-black p-3 px-8 w-3/5 rounded-full border border-lime-400"
        />
        <ChevronRightCircleIcon
          onClick={handleSendMessage}
          size={38}
          className="cursor-pointer text-white ml-2"
        />
      </div>
    </div>
  );
}

export default Chat;
