import React, { useEffect, useState } from 'react';
import UserChat from '@/components/UserChat';

import { ChevronRightCircleIcon, Send } from 'lucide-react';



interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

function Chat() {

  const [input, setInput] = useState('');
  const [lastSent, setLastSent] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello!', time: '10:00 AM', isUser: false },
    { text: 'Hi there!', time: '10:01 AM', isUser: true },
    { text: 'How can I help you today?', time: '10:02 AM', isUser: false },
  ]);

  useEffect(() => {
     const socket = new WebSocket("ws://localhost:3001");

  
    
     socket.onopen = () => {
      console.log('WebSocket connected');
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(typeof(parsedData.payload.message));
        const newMessage: Message = {
          text: parsedData.payload.message,
          time: new Date().toLocaleTimeString(),
          isUser: false,
        };
        console.log(newMessage);
        
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        
        
      }
      // Sending a message to the server after connection
      const data = {
        type: "join",
        payload: { roomId: "2",userId:"dfd" },
      };
      socket.send(JSON.stringify(data));
    };
    
  
  }, []);

  

  



  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    
    const now = Date.now();
    if (lastSent && now - lastSent < 5000) {
      // Prevent sending if less than 5 seconds passed
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
    }
    
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 p-4 rounded-lg shadow-lg">
      {/* Message List */}
      <UserChat messages={messages} />

      {/* Input Section */}
      {/* <PlaceholdersAndVanishInput
        placeholders={placeholders}
       
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSendMessage}
      /> */}
      <div className='flex items-center justify-center '>
      <input type="text" placeholder='Type your message....'
      value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className='bg-black p-3 px-8 w-3/5 rounded-full border border-lime-400'
      />
      <ChevronRightCircleIcon onClick={handleSendMessage} size={38} className="cursor-pointer text-white ml-2" />
      </div>
      
       
    </div>
  );
}

export default Chat;
