
"use client"; 
import { useSearchParams } from 'next/navigation';

const ChatsPage = () => {
  const searchParams = useSearchParams();
  const room = searchParams.get('room'); 

  
  if (!room) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h1>Chat Room: {room}</h1>
      {/* Additional chat-related components or logic */}
    </div>
  );
};

export default ChatsPage;
