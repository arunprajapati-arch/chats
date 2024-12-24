import type { User } from "./User";
import { OutgoingMessage } from "./types";

export class RoomManager {
    rooms: Map<string, User[]> = new Map();
    static instance: RoomManager;

    private constructor() {
        this.rooms = new Map();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RoomManager();
        }
        return this.instance;
    }

    public removeUser(user: User, roomId: string) {
        if (!this.rooms.has(roomId)) {
            return;
        }
        this.rooms.set(roomId, (this.rooms.get(roomId)?.filter((u) => u.id !== user.id) ?? []));
    }

    public addUser(roomId: string, user: User) {
        if (!this.rooms.has(roomId)) {
            this.rooms.set(roomId, [user]);
            return;
        }
        this.rooms.set(roomId, [...(this.rooms.get(roomId) ?? []), user]);
    }

    public getUserIds(roomId:string){
        const users = this.rooms.get(roomId);
        if(!users) return;
        return users.map(user => user.userId);
    }

   

    public broadcast(message: OutgoingMessage, user: User, roomId: string) {
        if (!this.rooms.has(roomId)) {
            return;
        }
        this.rooms.get(roomId)?.forEach((u) => {
            if (u.id !== user.id) {
                u.send(message);
            }
        });
    }
}