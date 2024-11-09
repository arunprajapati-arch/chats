import React, { useRef, useEffect } from 'react';
import UserImage from './UserImage';

interface Message {
  text: string;
  time: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ">
        
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-center ${msg.isUser ? 'justify-end' : 'justify-start'} gap-2 `}
        >{!msg.isUser && <UserImage/> }
            
          <div
            className={`${
              msg.isUser ? 'bg-lime-500/85 text-white' : 'bg-gray-700 text-white'
            } max-w-xs p-2 rounded-full`}
          >
            <p>{msg.text}</p>
            
          </div>
          {!msg.isUser && <span className="text-xs opacity-70">{msg.time}</span>}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
