import {
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
    // Sin cors si ya lo configuraste globalmente con un adaptador
    // namespace: 'auth', // opcional
})
@Injectable()
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
    // Mapeo de socketId -> socket
    private socketsMap = new Map<string, Socket>();

    // Al conectarse un socket, no pedimos token. Lo dejamos libre.
    handleConnection(@ConnectedSocket() client: Socket) {
        console.log(`Client connected: ${client.id}`);
        // Guardar referencia
        this.socketsMap.set(client.id, client);
    }

    // Al desconectarse
    handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.socketsMap.delete(client.id);
    }

    // Método para notificar a un cliente que se ha logueado
    notifyOnLogin(socketId: string, payload: any) {
        const client = this.socketsMap.get(socketId);
        if (client) client.emit('onlogin', payload);
    }
}
