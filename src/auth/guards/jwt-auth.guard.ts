import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // 1. Leer si la ruta está marcada como pública
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        // 2. Si es pública, permitir acceso sin pasar por JWT
        if (isPublic) {
            return true;
        }

        // 3. De lo contrario, que actúe el AuthGuard('jwt') normal
        return super.canActivate(context);
    }
}
