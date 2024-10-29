import { WebSocketServer, WebSocket } from 'ws';
import { OutgoingMessage, SupportedMessage as OutgoingSupportedMessages } from "./messages/outgoingMessages";
import { UserManager } from "./UserManager";
import { IncomingMessage, SupportedMessage } from "./messages/incomingMessages";

import { InMemoryStore } from "./store/InMemoryStore";


const wss = new WebSocketServer({ port: 8080 });

const userManager = new UserManager();
const store = new InMemoryStore();

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);



  ws.on('message', function message(data) {
    const parsedData = JSON.parse(data.toString());
    messageHandler(ws, parsedData);
    console.log('received: %s', data);
  });

  ws.send('something');
});

function messageHandler(ws: WebSocket, message: IncomingMessage){

    if (message.type == SupportedMessage.JoinRoom) {
        const payload = message.payload;
        userManager.addUser(payload.name, payload.userId, payload.roomId, ws);
        console.log(`joined room ${payload.roomId}`);
        
    }

    if (message.type === SupportedMessage.SendMessage) {
        const { userId, roomId, message: text } = message.payload;
        const user = userManager.getUser(roomId, userId);

        if (!user) {
            console.error("User not found in the db");
            return;
        }
        
        const chat = store.addChat(userId, user.name, roomId, text);
        if (!chat) return;

        const outgoingPayload: OutgoingMessage = {
            type: OutgoingSupportedMessages.AddChat,
            payload: {
                roomId,
                message: text,
                name: user.name
            },
        };
        userManager.broadcast(roomId, userId, outgoingPayload);
    }

}