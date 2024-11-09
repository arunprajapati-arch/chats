
"use client"; 
import ChatPage from '@/components/ChatPage/ChatPage';
import Chat from '@/components/ChatPage/ChatPage';
import { useSearchParams } from 'next/navigation';

const ChatsPage = () => {
  const searchParams = useSearchParams();
  let room = searchParams.get('room'); 
  room = "dfd"
  
  if (!room) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <ChatPage/>
    </div>
  );
};

export default ChatsPage;
