import { io } from 'socket.io-client';
import { SocketServer } from './env';


export const socket = io(SocketServer, {
    path: "/ws",
});