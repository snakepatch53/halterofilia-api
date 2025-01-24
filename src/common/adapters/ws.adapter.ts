// src/common/adapters/ws.adapter.ts
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplicationContext } from '@nestjs/common';

export class WsAdapter extends IoAdapter {
    constructor(
        app: INestApplicationContext,
        private readonly corsConfig: any,
    ) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions): any {
        // Combina las opciones que internamente usa Nest con tu corsConfig
        const optionsWithCors: ServerOptions = {
            ...options,
            cors: this.corsConfig,
        };

        const server = super.createIOServer(port, optionsWithCors);
        return server;
    }
}
