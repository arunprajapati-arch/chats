import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const WS_URL = 'ws://localhost:3001';

export const useSocket = (roomId: string) => {
  const { data: session } = useSession(); // Get the session data from NextAuth
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!session?.user || !roomId) return;

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        console.log("socket connected");
        
      setSocket(ws);
      // Send join message when the connection opens
      const wsData = {
        type: "join",
        payload: { roomId,userId: session.user.name,  },
      };
      ws.send(JSON.stringify(wsData));
    };

    ws.onclose = () => {
      console.log("socket closed");
      
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [session, roomId]); // Reconnect whenever session or roomId changes

  return socket;
};
