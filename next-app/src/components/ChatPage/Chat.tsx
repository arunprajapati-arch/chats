import React, { useEffect, useState } from 'react';
import UserChat from '@/components/UserChat';
import { useSession } from "next-auth/react";
import { ChevronRightCircleIcon } from 'lucide-react';

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

interface ChatPageProps {
  roomId: string;
}

function Chat({ roomId }: ChatPageProps) {
  const { data: session } = useSession();
  const [socketInstance, setSocketInstance] = useState<WebSocket | null>(null);
  const [input, setInput] = useState('');
  const [lastSent, setLastSent] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello!', time: '10:00 AM', isUser: false },
    { text: 'Hi there!', time: '10:01 AM', isUser: true },
    { text: 'How can I help you today?', time: '10:02 AM', isUser: false },
  ]);

  // Effect 1: Establish WebSocket connection and send join message
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log('WebSocket connected');
      const wsData = {
        type: "join",
        payload: { roomId, userId: session?.user.name },
      };
      socket.send(JSON.stringify(wsData));
    };

    setSocketInstance(socket);

    // Cleanup WebSocket connection when component unmounts
    return () => {
      if (socketInstance) {
        socket.close();
      }
    };
  }, [roomId, session?.user.name]);

  // Effect 2: Handle incoming messages from the WebSocket server
  useEffect(() => {
    if (!socketInstance) return;

    socketInstance.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log(typeof(parsedData.payload.message));
      const newMessage: Message = {
        text: parsedData.payload.message,
        time: new Date().toLocaleTimeString(),
        isUser: false,
      };
      console.log(newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Cleanup the onmessage handler when the component unmounts
    return () => {
      if (socketInstance) {
        socketInstance.onmessage = null;
      }
    };
  }, [socketInstance]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    const now = Date.now();

    if (lastSent && now - lastSent < 5000) {
      alert('Please wait before sending another message');
      return;
    }

    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        time: new Date().toLocaleTimeString(),
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLastSent(now);
      setInput('');

      // Send the message to the WebSocket server
      if (socketInstance) {
        const wsData = {
          type: "chat",
          payload: { message: newMessage.text, roomId },
        };
        socketInstance.send(JSON.stringify(wsData));
      }
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
