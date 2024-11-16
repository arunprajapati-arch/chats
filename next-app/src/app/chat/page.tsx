
"use client"; 
import ChatPage from '@/components/ChatPage/ChatPage';
import Chat from '@/components/ChatPage/ChatPage';
import { useSearchParams } from 'next/navigation';

const ChatsPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room'); 
  
  
  if (!roomId) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <ChatPage roomId={roomId}/>
    </div>
  );
};

export default ChatsPage;
