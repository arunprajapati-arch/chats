import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import { OutgoingMessage } from "./types";



function getRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export class User {
    public id: string;
    public userId?: string;
    private roomId?: string;
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.id = getRandomString(10);
        this.ws = ws;
        this.initHandlers()
    }

    initHandlers() {
        this.ws.on("message", async (data) => {
            console.log(data)
            const parsedData = JSON.parse(data.toString());
            console.log(parsedData)
            console.log("parsedData")
            switch (parsedData.type) {
                case "join":
                    console.log("jouin receiverdfd")
                    const roomId = parsedData.payload.roomId;
                    const userId = parsedData.payload.userId
                    if (!userId) {
                        this.ws.close()
                        return
                    }
                    // console.log("jouin received 2")
                    // this.userId = userId
                    // const space = await client.space.findFirst({
                    //     where: {
                    //         id: roomId
                    //     }
                    // })
                    // console.log("jouin receiverdfd 3")
                    // if (!space) {
                    //     this.ws.close()
                    //     return;
                    // }
                    // console.log("jouin receiverdfd 4")
                    this.roomId = roomId
                    this.userId = userId
                    RoomManager.getInstance().addUser(roomId, this);

                    this.send({
                        type: "space-joined",
                        payload: {
                            roomId: this.roomId,
                            userId: this.userId,
                            users: RoomManager.getInstance().rooms.get(roomId)?.filter(x => x.id !== this.id)?.map((u) => ({ id: u.id })) ?? []
                        }
                    });
                    // console.log("jouin receiverdf5")
                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            userId: this.userId,

                        }
                    }, this, this.roomId!);
                    break;
                case "chat":
                    RoomManager.getInstance().broadcast({
                        type: "chat",
                        payload: {
                            message: parsedData.payload.message
                        }
                    }, this, this.roomId!);
                    break;
             
                case "getUsers":
                    const userIds = RoomManager.getInstance().getUserIds(this.roomId!)
                    if (userIds) {
                        this.send({
                            type: "users-list",
                            payload: {
                                roomId: this.roomId,
                                users: userIds,
                            }
                        });
                    }
                    break;
            }
         });
    }

    destroy() {
        RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: this.userId
            }
        }, this, this.roomId!);
        RoomManager.getInstance().removeUser(this, this.roomId!);
    }

    send(payload: OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }
}