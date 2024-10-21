// app/chat/Chat.tsx
'use client'; // Ensure this is a client component
import { useSearchParams } from 'next/navigation';

const ChatPage = () => {
  const searchParams = useSearchParams();
  const item = searchParams.get('item'); // Access the query parameter

  // Check if item is null
  if (!item) {
    return <div>Loading...</div>; // Show a loading state if item is not available
  }

  return (
    <div>
      <h1>Selected Item: {item}</h1>
      {/* Other content based on the item */}
    </div>
  );
};

export default ChatPage;
